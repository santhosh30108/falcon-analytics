import { BookOpen, Target, AlertTriangle } from 'lucide-react'
import { useChapterPerformance, useTopicBreakdown } from '@/hooks/dashboard.hooks'
import SectionTooltip from '@/components/ui/SectionTooltip'
import Shimmer from '@/components/ui/Shimmer'

function StrategyFocusShimmer() {
    return (
        <div className="space-y-8">
            {[1, 2, 3, 4].map((section) => (
                <div
                    key={section}
                    className="rounded-xl border border-gray-200 overflow-hidden bg-white"
                >
                    <div className="h-14 px-5 flex items-center gap-3 border-b border-gray-100">
                        <Shimmer className="h-10 w-10 rounded-lg" />
                        <Shimmer className="h-5 w-44 rounded" />
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="rounded-xl border border-gray-100 p-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <Shimmer className="h-12 w-1.5 rounded-full" />
                                        <div>
                                            <Shimmer className="h-4 w-36 mb-1 rounded" />
                                            <Shimmer className="h-3 w-20 rounded" />
                                        </div>
                                    </div>
                                    <Shimmer className="h-7 w-24 rounded-lg" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function StrategyAndFocusContent({ selectedBatch }) {
    const { data: chapterPerformance, isLoading: isChapterPerformanceLoading } =
        useChapterPerformance({ batchId: selectedBatch })
    const { data: topicBreakdown, isLoading: isTopicBreakdownLoading } =
        useTopicBreakdown({ batchId: selectedBatch })

    const isLoading = isChapterPerformanceLoading || isTopicBreakdownLoading

    if (isLoading) {
        return <StrategyFocusShimmer />
    }

    const HIGH_TIME_THRESHOLD = 90 // seconds

    // Accuracy-based filters
    const strugglingChapters = Array.isArray(chapterPerformance)
        ? [...chapterPerformance]
              .filter((c) => c.accuracy < 70)
              .sort((a, b) => a.accuracy - b.accuracy)
        : []
    const criticalTopics =
        topicBreakdown && typeof topicBreakdown === 'object' && !Array.isArray(topicBreakdown)
            ? Object.values(topicBreakdown)
                  .flat()
                  .filter((t) => t.accuracy < 70)
                  .sort((a, b) => a.accuracy - b.accuracy)
            : []

    // Time-based filters
    const timeIntensiveChapters = Array.isArray(chapterPerformance)
        ? [...chapterPerformance]
              .filter((c) => c.timeSpent > HIGH_TIME_THRESHOLD)
              .sort((a, b) => a.timeSpent - b.timeSpent)
        : []
    const slowTopics =
        topicBreakdown && typeof topicBreakdown === 'object' && !Array.isArray(topicBreakdown)
            ? Object.values(topicBreakdown)
                  .flat()
                  .filter((t) => t.timeSpent > HIGH_TIME_THRESHOLD)
                  .sort((a, b) => a.timeSpent - b.timeSpent)
            : []

    return (
        <div className="space-y-8">
            {/* 1. Struggling Chapters */}
            <div className="card border-l-4 border-l-danger-500 bg-gradient-to-r from-danger-50/50 to-white">
                <h3 className="subsection-title text-danger-800 flex items-center gap-2 mb-4">
                    <div className="p-2 bg-danger-100 rounded-lg">
                        <BookOpen className="w-5 h-5 text-danger-600" />
                    </div>
                    Struggling Chapters
                    <SectionTooltip
                        title="Struggling Chapters"
                        description="Chapters where students are underperforming and need additional focus and revision sessions."
                        criteria="Accuracy less than 70%"
                    />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strugglingChapters.length > 0 ? (
                        strugglingChapters.map((chapter, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-white rounded-xl border border-danger-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-12 bg-danger-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">
                                            {chapter.chapter}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {chapter.difficulty} Difficulty
                                        </p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-danger-50 text-danger-700 text-sm font-bold rounded-lg border border-danger-100">
                                    {chapter.accuracy.toFixed(1)}% Accuracy
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 col-span-2">
                            All chapters are performing well!
                        </p>
                    )}
                </div>
            </div>

            {/* 2. Critical Topics */}
            <div className="card border-l-4 border-l-warning-500 bg-gradient-to-r from-warning-50/50 to-white">
                <h3 className="subsection-title text-warning-800 flex items-center gap-2 mb-4">
                    <div className="p-2 bg-warning-100 rounded-lg">
                        <Target className="w-5 h-5 text-warning-600" />
                    </div>
                    Critical Topics
                    <SectionTooltip
                        title="Critical Topics"
                        description="Individual topics within chapters that students find challenging. These specific areas need targeted teaching attention."
                        criteria="Accuracy less than 70%"
                    />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {criticalTopics.length > 0 ? (
                        criticalTopics.map((topic, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-white border border-warning-200 rounded-xl shadow-sm hover:shadow-md hover:border-warning-300 transition-all duration-200 flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-10 bg-warning-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex flex-col">
                                        <h4 className="font-semibold text-gray-900 text-sm">
                                            {topic.topic}
                                        </h4>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-warning-50 text-warning-700 text-xs font-bold rounded-lg border border-warning-100 whitespace-nowrap">
                                    {topic.accuracy.toFixed(1)}% Accuracy
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 col-span-2">
                            All topics are performing well!
                        </p>
                    )}
                </div>
            </div>

            {/* 3. Time-Intensive Chapters */}
            <div className="card border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-white">
                <h3 className="subsection-title text-purple-800 flex items-center gap-2 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-purple-600" />
                    </div>
                    Time-Intensive Chapters
                    <SectionTooltip
                        title="Time-Intensive Chapters"
                        description="Chapters where students spend excessive time answering questions. This may indicate unclear concepts or need for additional practice."
                        criteria="Average time more than 1.5 minutes per question"
                    />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {timeIntensiveChapters.length > 0 ? (
                        timeIntensiveChapters.map((chapter, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-12 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">
                                            {chapter.chapter}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {chapter.accuracy.toFixed(1)}%
                                            Accuracy
                                        </p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-bold rounded-lg border border-purple-100">
                                    ⏱ {Number(chapter.timeSpent).toFixed(1)}s
                                    avg
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 col-span-2">
                            All chapters are within acceptable time limits.
                        </p>
                    )}
                </div>
            </div>

            {/* 4. Slow Topics */}
            <div className="card border-l-4 border-l-pink-500 bg-gradient-to-r from-pink-50/50 to-white">
                <h3 className="subsection-title text-pink-800 flex items-center gap-2 mb-4">
                    <div className="p-2 bg-pink-100 rounded-lg">
                        <Target className="w-5 h-5 text-pink-600" />
                    </div>
                    Slow Topics
                    <SectionTooltip
                        title="Slow Topics"
                        description="Specific topics where students take longer than expected. May need better explanations, more examples, or practice problems."
                        criteria="Average time more than 1.5 minutes per question"
                    />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {slowTopics.length > 0 ? (
                        slowTopics.map((topic, idx) => (
                            <div
                                key={idx}
                                className="p-4 bg-white border border-pink-200 rounded-xl shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-200 flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-10 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex flex-col">
                                        <h4 className="font-semibold text-gray-900 text-sm">
                                            {topic.topic}
                                        </h4>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-bold rounded-lg border border-pink-100 whitespace-nowrap">
                                    ⏱ {Number(topic.timeSpent).toFixed(1)}s avg
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 col-span-2">
                            All topics are within acceptable time limits.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

