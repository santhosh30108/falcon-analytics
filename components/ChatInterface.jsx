'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChatInterface({ responses }) {
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: 'Hello! I\'m your AI analytics assistant. Ask me anything about student performance, test insights, or teaching recommendations.',
    }
  ]);
  const [input, setInput] = useState('');

  const exampleQueries = [
    'Which are the top 5 weakest Physics topics?',
    'Which questions were the trickiest in the last test?',
    'Show me areas of improvement',
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      let response = { type: 'assistant', content: 'I can help you with that. Here\'s what I found:' };
      
      if (input.toLowerCase().includes('weakest') || input.toLowerCase().includes('weak')) {
        response = {
          type: 'assistant',
          content: responses['weakest topics'].answer,
          data: responses['weakest topics'].data,
          chartType: 'topics'
        };
      } else if (input.toLowerCase().includes('tricky') || input.toLowerCase().includes('trickiest')) {
        response = {
          type: 'assistant',
          content: responses['trickiest questions'].answer,
          data: responses['trickiest questions'].data,
          chartType: 'questions'
        };
      } else if (input.toLowerCase().includes('improvement') || input.toLowerCase().includes('improving')) {
        response = {
          type: 'assistant',
          content: responses['improvement areas'].answer,
          data: responses['improvement areas'].data,
          chartType: 'improvement'
        };
      }

      setMessages(prev => [...prev, response]);
    }, 500);

    setInput('');
  };

  const handleExampleClick = (query) => {
    setInput(query);
  };

  return (
    <div className="flex flex-col h-[600px] card">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-4`}>
              <p className="text-sm">{message.content}</p>
              
              {/* Data visualization */}
              {message.data && (
                <div className="mt-4 bg-white rounded-lg p-4">
                  {message.chartType === 'topics' && (
                    <div className="space-y-2">
                      {message.data.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-900">{item.topic}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-900">{item.accuracy.toFixed(1)}%</span>
                            <span className={`text-xs ${item.trend < 0 ? 'text-danger-600' : 'text-success-600'}`}>
                              {item.trend > 0 ? '↑' : '↓'} {Math.abs(item.trend)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {message.chartType === 'questions' && (
                    <div className="space-y-2">
                      {message.data.map((item, idx) => (
                        <div key={idx} className="p-2 bg-gray-50 rounded">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-900 font-medium">{item.question}</span>
                            <span className="text-sm font-bold text-danger-600">{item.accuracy.toFixed(1)}%</span>
                          </div>
                          <span className="text-xs text-gray-500">{item.type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {message.chartType === 'improvement' && (
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={message.data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="topic" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="improvement" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Example Queries */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(query)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors duration-200"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about performance, insights, or recommendations..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          onClick={handleSend}
          className="btn-primary flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>
    </div>
  );
}
