'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
    Home,
    BarChart3,
    Target,
    MessageSquare,
    ChevronDown,
    Send,
    Loader2,
} from 'lucide-react'
import {
    useFacultyInfo,
    useAIAssistant,
    useChapterPerformance,
    useTopicBreakdown,
} from '@/hooks/dashboard.hooks'

// Falcon page components
import OverviewContent from '@/components/falcon/OverviewContent'
import InsightsContent from '@/components/falcon/InsightsContent'
import StrategyAndFocusContent from '@/components/falcon/StrategyAndFocusContent'

const tabs = [
    { id: 'overview', name: 'Overview', icon: Home },
    { id: 'insights', name: 'Insights', icon: BarChart3 },
    { id: 'strategy-focus', name: 'Strategy & Focus', icon: Target },
]

const insightSubTabs = [
    { id: 'chapter', name: 'Chapter-wise' },
    { id: 'topic', name: 'Topic-wise' },
]

// Main Falcon Page Component
export default function FalconPage() {
    const searchParams = useSearchParams()
    const activeTab = searchParams.get('tab') || 'overview'

    const {
        data: facultyInfo,
        isError,
        refetch,
    } = useFacultyInfo()

    // Filter state: subject is derived from selected batch (shown only in greeting card)
    const [selectedBatch, setSelectedBatch] = useState(null)
    const [openDropdown, setOpenDropdown] = useState(null) // null, 'batch'

    const [insightSubTab, setInsightSubTab] = useState('chapter')
    const [isAIPopupOpen, setIsAIPopupOpen] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [messages, setMessages] = useState([]) // [{role: 'user'|'assistant', content: '...'}]
    const { mutate: askAI, isPending: isLoading } = useAIAssistant()

    // Fetch chapter and topic data for AI context
    const { data: chapterData } = useChapterPerformance({
        batchId: selectedBatch?.id,
    })
    const { data: topicData } = useTopicBreakdown({ batchId: selectedBatch?.id })

    const handleAskAI = () => {
        if (!prompt.trim()) return

        // Add user message to history
        const userMessage = { role: 'user', content: prompt }
        setMessages((prev) => [...prev, userMessage])
        setPrompt('')

        // Prepare context data for AI
        const contextData = {
            batch: selectedBatch?.name || 'Unknown Batch',
            subject: selectedBatch?.subject || 'Unknown Subject',
            chapters: chapterData || [],
            topics: topicData || {},
        }

        askAI(
            {
                message: prompt,
                context: contextData,
            },
            {
                onSuccess: (data) => {
                    // Add assistant response to history
                    const assistantMessage = {
                        role: 'assistant',
                        content: data.reply,
                    }
                    setMessages((prev) => [...prev, assistantMessage])
                },
            }
        )
    }

    const handleClearChat = () => {
        setMessages([])
    }

    useEffect(() => {
        if (facultyInfo && facultyInfo.batches.length > 0) {
            setSelectedBatch(facultyInfo.batches[0])
        }
    }, [facultyInfo])

    const handleInsightSubTabChange = (subTab) => {
        setInsightSubTab(subTab)
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewContent selectedBatch={selectedBatch} />
            case 'insights':
                return (
                    <InsightsContent
                        activeSubTab={insightSubTab}
                        onSubTabChange={handleInsightSubTabChange}
                        selectedBatch={selectedBatch?.id}
                        selectedSubject={selectedBatch?.subject}
                    />
                )
            case 'strategy-focus':
                return (
                    <StrategyAndFocusContent
                        selectedBatch={selectedBatch?.id}
                        selectedSubject={selectedBatch?.subject}
                    />
                )
            default:
                return <OverviewContent selectedBatch={selectedBatch} />
        }
    }

    // Get current tab name for header
    const getTabTitle = () => {
        switch (activeTab) {
            case 'overview':
                return 'Overview'
            case 'insights':
                return 'Insights'
            case 'strategy-focus':
                return 'Strategy & Focus'
            default:
                return 'Overview'
        }
    }

    // Error state (kept to match falcon-fe UI structure; mock hooks shouldn't error)
    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Unable to Connect
                    </h2>
                    <p className="text-gray-500 mb-6">
                        We couldn't connect to the server. Please check your
                        connection and make sure the backend service is running.
                    </p>
                    <button
                        onClick={refetch}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* Header with Filter Dropdowns */}
            <div className="fixed top-14 sm:top-16 left-0 right-0 md:left-64 z-20 bg-white border-b border-gray-200 shadow-sm">
                <div className="w-full px-4 sm:px-6 md:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-0 sm:h-14 gap-2 sm:gap-0">
                        {/* Current Tab Title + Insights Sub-Tabs */}
                        <div className="flex items-center gap-4 sm:gap-6">
                            <h1 className="text-base sm:text-lg font-bold text-gray-900">
                                {getTabTitle()}
                            </h1>

                            {/* Insights Sub-Tabs */}
                            {activeTab === 'insights' && (
                                <nav className="flex items-center gap-1">
                                    {insightSubTabs.map((subTab) => (
                                        <button
                                            key={subTab.id}
                                            onClick={() =>
                                                handleInsightSubTabChange(
                                                    subTab.id
                                                )
                                            }
                                            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                                                insightSubTab === subTab.id
                                                    ? 'bg-primary-100 text-primary-700'
                                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                            }`}
                                        >
                                            {subTab.name}
                                        </button>
                                    ))}
                                </nav>
                            )}
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex items-center gap-2 relative z-50">
                            {/* Batch Dropdown */}
                            <div className="relative flex-1 sm:flex-none">
                                <button
                                    onClick={() =>
                                        setOpenDropdown(
                                            openDropdown === 'batch'
                                                ? null
                                                : 'batch'
                                        )
                                    }
                                    title="Select Batch"
                                    className="w-full sm:w-auto flex items-center justify-between gap-2 pl-3 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    <span className="truncate max-w-[120px] sm:max-w-[180px]">
                                        {selectedBatch?.name}
                                    </span>
                                    <ChevronDown
                                        className={`absolute right-2 w-3 h-3 text-gray-500 transition-transform ${openDropdown === 'batch' ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openDropdown === 'batch' && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() =>
                                                setOpenDropdown(null)
                                            }
                                        />
                                        <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-1 w-full sm:w-auto sm:min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1 max-h-48 overflow-y-auto">
                                            {facultyInfo &&
                                                facultyInfo.batches.map(
                                                    (batch) => (
                                                        <button
                                                            key={batch.id}
                                                            onClick={() => {
                                                                setSelectedBatch(
                                                                    batch
                                                                )
                                                                setOpenDropdown(
                                                                    null
                                                                )
                                                            }}
                                                            className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 ${selectedBatch?.id === batch.id ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}`}
                                                        >
                                                            {batch.name}
                                                        </button>
                                                    )
                                                )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="pt-24 sm:pt-14">{renderContent()}</div>

            {/* Floating AI Assistant Button */}
            <button
                onClick={() => setIsAIPopupOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 gemini-button text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group"
                title="AI Assistant"
            >
                <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* AI Assistant Popup */}
            {isAIPopupOpen && (
                <>
                    <div
                        className={`fixed inset-0 z-50 ${messages.length > 0 ? 'bg-black/20 backdrop-blur-[2px]' : 'bg-black/30 backdrop-blur-sm'}`}
                        onClick={() => setIsAIPopupOpen(false)}
                    />
                    <div
                        className={`fixed z-[100] transition-all duration-500 ease-in-out rounded-2xl overflow-hidden
                            ${
                                messages.length > 0
                                    ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl h-[80vh]'
                                    : 'bottom-24 right-6 w-96 h-[500px]'
                            }`}
                    >
                        <div className="gemini-border-wrapper h-full w-full">
                            <div className="gemini-content p-6 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                        AI Assistant
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        {messages.length > 0 && (
                                            <button
                                                onClick={handleClearChat}
                                                className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                                            >
                                                Clear Chat
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                setIsAIPopupOpen(false)
                                            }
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                                    {messages.length > 0 ? (
                                        messages.map((msg, index) => (
                                            <div
                                                key={index}
                                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className="max-w-[85%] px-4 py-2 rounded-2xl text-sm bg-gray-100 text-gray-700">
                                                    <div className="whitespace-pre-wrap">
                                                        {msg.content}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center text-gray-500 mt-20">
                                            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                            <p>
                                                Ask me anything about student
                                                performance or teaching
                                                strategies!
                                            </p>
                                        </div>
                                    )}
                                    {isLoading && (
                                        <div className="p-3 rounded-lg bg-gray-100 text-gray-700 mr-8">
                                            <div className="text-xs font-medium mb-1 opacity-70">
                                                AI Assistant
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) =>
                                            setPrompt(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'Enter' &&
                                                !e.shiftKey
                                            ) {
                                                e.preventDefault()
                                                handleAskAI()
                                            }
                                        }}
                                        placeholder="Ask a question..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-20 pr-12"
                                    />
                                    <button
                                        onClick={handleAskAI}
                                        disabled={isLoading || !prompt.trim()}
                                        className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

