export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { message, history, context } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const apiKey = process.env.AZURE_OPENAI_API_KEY;

        // Build context summary for the AI
        let contextSummary = '';
        if (context) {
            contextSummary = `\n\nCURRENT DATA CONTEXT:\n`;
            contextSummary += `Batch: ${context.batch}\n`;
            contextSummary += `Subject: ${context.subject}\n\n`;
            
            // Add chapter performance data
            if (context.chapters && context.chapters.length > 0) {
                contextSummary += `CHAPTER PERFORMANCE:\n`;
                context.chapters.forEach(ch => {
                    contextSummary += `- ${ch.chapter}: Accuracy ${ch.accuracy}%, Avg Score ${ch.avgScore}, Trend ${ch.trend > 0 ? '+' : ''}${ch.trend}%\n`;
                });
                contextSummary += '\n';
            }
            
            // Add topic breakdown data
            if (context.topics && Object.keys(context.topics).length > 0) {
                contextSummary += `TOPIC BREAKDOWN BY CHAPTER:\n`;
                Object.entries(context.topics).forEach(([chapter, topics]) => {
                    if (topics && topics.length > 0) {
                        contextSummary += `\n${chapter}:\n`;
                        topics.forEach(t => {
                            contextSummary += `  - ${t.topic}: Accuracy ${t.accuracy}%, ${t.questions} questions, Trend ${t.trend > 0 ? '+' : ''}${t.trend}%\n`;
                        });
                    }
                });
            }
        }

        const systemPrompt = `You are an AI teaching assistant for Falcon, a platform for analyzing student performance in educational settings. You help faculty understand student performance data and provide actionable insights.

When answering questions:
1. Reference specific data from the chapter and topic performance when relevant
2. Identify patterns, trends, and areas needing attention
3. Provide actionable teaching strategies based on the data
4. Be concise but comprehensive
5. Use bullet points for clarity when listing recommendations
6. Remember the conversation context and refer back to previous messages when appropriate
${contextSummary}`;

        // Build messages array with conversation history
        const conversationMessages = [
            { role: 'system', content: systemPrompt },
        ];
        
        // Add conversation history if provided
        if (history && Array.isArray(history)) {
            history.forEach(msg => {
                if (msg.role && msg.content) {
                    conversationMessages.push({
                        role: msg.role,
                        content: msg.content
                    });
                }
            });
        } else {
            // Fallback: just add the current message
            conversationMessages.push({ role: 'user', content: message });
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({
                messages: conversationMessages,
                max_tokens: 1000,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Azure OpenAI Error:', response.status, errorData);
            return res.status(response.status).json({
                message: 'Error from AI provider',
                details: errorData,
            });
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('AI Assistant API Error:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
