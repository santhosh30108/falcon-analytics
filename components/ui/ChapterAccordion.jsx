'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { formatPercentage, getPerformanceColorClass } from '@/utils/utils'
import TrendIndicator from './TrendIndicator'

export default function ChapterAccordion({ chapter, topics, chapterAccuracy }) {
    const [isOpen, setIsOpen] = useState(false)

    // Sort topics by accuracy ascending (lowest first, like the bar chart)
    const sortedTopics = [...(topics || [])].sort(
        (a, b) => Number(a.accuracy) - Number(b.accuracy)
    )
    const avgAccuracy = topics?.length
        ? topics.reduce((sum, t) => sum + Number(t.accuracy), 0) / topics.length
        : 0
    // Use chapter-level accuracy when provided so it matches bar chart and list order
    const displayAccuracy =
        chapterAccuracy != null ? Number(chapterAccuracy) : avgAccuracy

    const getAccuracyColor = (accuracy) => {
        if (accuracy >= 70) return 'bg-success-500'
        if (accuracy >= 55) return 'bg-warning-500'
        return 'bg-danger-500'
    }

    const getAccuracyBgColor = (accuracy) => {
        if (accuracy >= 70) return 'bg-success-50 border-success-200'
        if (accuracy >= 55) return 'bg-warning-50 border-warning-200'
        return 'bg-danger-50 border-danger-200'
    }

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Chapter Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center justify-between gap-4"
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Accuracy indicator dot */}
                    <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${getAccuracyColor(displayAccuracy)}`}
                    ></div>

                    <div className="text-left flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate text-wrap">
                            {chapter}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {topics.length} topics
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <div className="text-right">
                        <div
                            className={`text-base sm:text-lg font-bold ${getPerformanceColorClass(displayAccuracy).split(' ')[0]}`}
                        >
                            {formatPercentage(displayAccuracy)}
                        </div>
                    </div>

                    {/* Animated chevron */}
                    <div
                        className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    >
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
            </button>

            {/* Topics List with smooth animation */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="bg-gray-50 border-t border-gray-200 p-3 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {sortedTopics.map((topic, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg border ${getAccuracyBgColor(topic.accuracy)} transition-all duration-200 hover:scale-[1.01]`}
                            >
                                <div className="flex flex-col gap-3">
                                    <h4 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 leading-tight">
                                        {topic.topic}
                                    </h4>

                                    <div className="flex items-center gap-6 pt-2 border-t border-black/5">
                                        <div>
                                            <div className="text-xs text-gray-500 font-medium mb-0.5">
                                                Accuracy
                                            </div>
                                            <div
                                                className={`text-base font-bold ${getPerformanceColorClass(Number(topic.accuracy)).split(' ')[0]}`}
                                            >
                                                {formatPercentage(
                                                    topic.accuracy,
                                                    2
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 font-medium mb-0.5">
                                                Trend
                                            </div>
                                            <TrendIndicator
                                                value={topic.trend}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

