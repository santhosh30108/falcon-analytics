import ChapterAccordion from '@/components/ui/ChapterAccordion'
import ChapterBarChart from '@/components/charts/ChapterBarChart'
import TrendIndicator from '@/components/ui/TrendIndicator'
import Shimmer from '@/components/ui/Shimmer'
import {
    useChapterPerformance,
    useTopicBreakdown,
    useChapterInsights,
    useTopicInsights,
} from '@/hooks/dashboard.hooks'
import { formatPercentage } from '@/utils/utils'

// Shimmer: Chapter-wise Insights layout
function InsightsChapterShimmer() {
    return (
        <div className="space-y-8">
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Shimmer className="h-6 w-6 rounded" />
                    <Shimmer className="h-5 w-28 rounded" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="p-3 rounded-lg border border-gray-100"
                        >
                            <Shimmer className="h-4 w-full rounded" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white p-6">
                <Shimmer className="h-5 w-48 mb-2 rounded" />
                <Shimmer className="h-4 w-64 mb-6 rounded" />
                <Shimmer className="h-[280px] w-full rounded-lg" />
            </div>
            <div className="space-y-3">
                <Shimmer className="h-6 w-36 mb-4 rounded" />
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-gray-200 overflow-hidden"
                    >
                        <div className="h-16 px-4 sm:px-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shimmer className="h-3 w-3 rounded-full" />
                                <div>
                                    <Shimmer className="h-4 w-44 mb-1 rounded" />
                                    <Shimmer className="h-3 w-16 rounded" />
                                </div>
                            </div>
                            <Shimmer className="h-6 w-14 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Shimmer: Topic-wise Insights layout
function InsightsTopicShimmer() {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Shimmer className="h-6 w-6 rounded" />
                    <Shimmer className="h-5 w-28 rounded" />
                </div>
                <div className="space-y-3">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="p-3 rounded-lg border border-gray-100"
                        >
                            <Shimmer className="h-4 w-full rounded" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-gray-200 p-6 text-center"
                    >
                        <Shimmer className="h-8 w-10 mx-auto mb-2 rounded" />
                        <Shimmer className="h-4 w-20 mx-auto mb-1 rounded" />
                        <Shimmer className="h-3 w-24 mx-auto rounded" />
                    </div>
                ))}
            </div>
            {[1, 2, 3].map((block) => (
                <div
                    key={block}
                    className="rounded-xl border border-gray-200 overflow-hidden bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-1">
                        <Shimmer className="h-3 w-3 rounded-full" />
                        <Shimmer className="h-5 w-40 rounded" />
                    </div>
                    <Shimmer className="h-4 w-72 mb-4 rounded" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="p-3 rounded-lg border border-gray-100"
                            >
                                <Shimmer className="h-4 w-full mb-3 rounded" />
                                <div className="flex gap-6 pt-2">
                                    <Shimmer className="h-4 w-16 rounded" />
                                    <Shimmer className="h-4 w-14 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

// Topic Card Component
function TopicCard({ t, colorClass, textColor }) {
    return (
        <div
            className={`p-3 rounded-lg border ${colorClass} transition-all duration-200 hover:scale-[1.01]`}
        >
            <div className="flex flex-col gap-3">
                <h4 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 leading-tight">
                    {t.topic}
                </h4>

                <div className="flex items-center gap-6 pt-2 border-t border-black/5">
                    <div>
                        <div className="text-xs text-gray-500 font-medium mb-0.5">
                            Accuracy
                        </div>
                        <div className={`text-base font-bold ${textColor}`}>
                            {formatPercentage(t.accuracy, 2)}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 font-medium mb-0.5">
                            Trend
                        </div>
                        <TrendIndicator value={t.trend} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function InsightsContent({
    activeSubTab,
    onSubTabChange,
    selectedBatch,
    selectedSubject,
}) {
    const { data: chapterPerformance, isLoading: isChapterPerformanceLoading } =
        useChapterPerformance({ batchId: selectedBatch })
    const { data: topicBreakdown, isLoading: isTopicBreakdownLoading } =
        useTopicBreakdown({ batchId: selectedBatch })
    const { data: chapterInsights } = useChapterInsights({ batchId: selectedBatch })
    const { data: topicInsights } = useTopicInsights({ batchId: selectedBatch })

    const isLoading = isChapterPerformanceLoading || isTopicBreakdownLoading

    if (isLoading) {
        return activeSubTab === 'chapter' ? (
            <InsightsChapterShimmer />
        ) : (
            <InsightsTopicShimmer />
        )
    }

    return (
        <div className="space-y-6">
            {/* Chapter-wise View */}
            {activeSubTab === 'chapter' && Array.isArray(chapterPerformance) && (
                <div className="space-y-8">
                    {/* AI Insights for Chapter-wise */}
                    <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-lg">🤖</span>
                            <h3 className="subsection-title text-indigo-900">
                                AI Insights
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {Array.isArray(chapterInsights) &&
                            chapterInsights.length > 0 ? (
                                chapterInsights.map((insight, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-3 bg-white/70 rounded-lg"
                                    >
                                        <span className="mt-0.5 text-lg">
                                            {insight.emoji}
                                        </span>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-700">
                                                {insight.message}
                                            </p>
                                            {Array.isArray(insight.chapters) &&
                                                insight.chapters.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {insight.chapters.map(
                                                            (chapter, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
                                                                >
                                                                    {chapter}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                    <span className="text-gray-400 mt-0.5">
                                        💬
                                    </span>
                                    <p className="text-sm text-gray-500">
                                        AI insights will appear here once
                                        performance data is analyzed.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chapter Performance Bar Chart */}
                    <ChapterBarChart data={chapterPerformance} />

                    {/* Chapter Details - sorted by chapter accuracy ascending (low → high) */}
                    <div className="space-y-3">
                        <h2 className="section-title">Chapter Details</h2>
                        {[...chapterPerformance]
                            .sort(
                                (a, b) =>
                                    Number(a.accuracy) - Number(b.accuracy)
                            )
                            .map((chapter) => (
                                <ChapterAccordion
                                    key={chapter.chapter}
                                    chapter={chapter.chapter}
                                    chapterAccuracy={chapter.accuracy}
                                    topics={
                                        topicBreakdown &&
                                        typeof topicBreakdown === 'object' &&
                                        !Array.isArray(topicBreakdown) &&
                                        Array.isArray(topicBreakdown[chapter.chapter])
                                            ? topicBreakdown[chapter.chapter]
                                            : []
                                    }
                                />
                            ))}
                    </div>
                </div>
            )}

            {/* Topic-wise View - Flat ranked list by performance */}
            {activeSubTab === 'topic' &&
                topicBreakdown &&
                typeof topicBreakdown === 'object' &&
                !Array.isArray(topicBreakdown) &&
                (() => {
                    // Flatten all topics with chapter info and sort by accuracy
                    const allTopics = Object.entries(topicBreakdown)
                        .flatMap(([chapter, topics]) =>
                            topics.map((t) => ({ ...t, chapter }))
                        )
                        .sort((a, b) => a.accuracy - b.accuracy)

                    const strugglingTopics = allTopics.filter(
                        (t) => t.accuracy < 55
                    )
                    const averageTopics = allTopics.filter(
                        (t) => t.accuracy >= 55 && t.accuracy < 70
                    )
                    const strongTopics = allTopics.filter((t) => t.accuracy >= 70)

                    return (
                        <div className="space-y-6">
                            {/* AI Insights for Topic-wise */}
                            <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg">🤖</span>
                                    <h3 className="subsection-title text-indigo-900">
                                        AI Insights
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    {Array.isArray(topicInsights) &&
                                    topicInsights.length > 0 ? (
                                        topicInsights.map((insight, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 p-3 bg-white/70 rounded-lg"
                                            >
                                                <span className="mt-0.5 text-lg">
                                                    {insight.emoji}
                                                </span>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-700">
                                                        {insight.message}
                                                    </p>
                                                    {Array.isArray(insight.topics) &&
                                                        insight.topics.length > 0 && (
                                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                                {insight.topics.map(
                                                                    (topic, idx) => (
                                                                        <span
                                                                            key={idx}
                                                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700"
                                                                        >
                                                                            {topic}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                                            <span className="text-gray-400 mt-0.5">
                                                💬
                                            </span>
                                            <p className="text-sm text-gray-500">
                                                AI insights will appear here once
                                                performance data is analyzed.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Summary Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="card text-center bg-danger-50 border border-danger-200">
                                    <div className="text-2xl font-bold text-danger-600">
                                        {strugglingTopics.length}
                                    </div>
                                    <div className="text-sm text-danger-800 font-semibold">
                                        Struggling
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        &lt;55% accuracy
                                    </div>
                                </div>
                                <div className="card text-center bg-warning-50 border border-warning-200">
                                    <div className="text-2xl font-bold text-warning-600">
                                        {averageTopics.length}
                                    </div>
                                    <div className="text-sm text-warning-800 font-semibold">
                                        Average
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        55-70% accuracy
                                    </div>
                                </div>
                                <div className="card text-center bg-success-50 border border-success-200">
                                    <div className="text-2xl font-bold text-success-600">
                                        {strongTopics.length}
                                    </div>
                                    <div className="text-sm text-success-800 font-semibold">
                                        Strong
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        &gt;70% accuracy
                                    </div>
                                </div>
                            </div>

                            {/* Struggling Topics */}
                            {strugglingTopics.length > 0 && (
                                <div className="card">
                                    <h3 className="subsection-title flex items-center gap-2">
                                        <span className="w-3 h-3 bg-danger-500 rounded-full"></span>
                                        Struggling Topics (
                                        {strugglingTopics.length})
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 mb-4">
                                        Topics with accuracy below 55% - needs
                                        immediate attention
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {strugglingTopics.map((t, idx) => (
                                            <TopicCard
                                                key={idx}
                                                t={t}
                                                colorClass="bg-danger-50 border-danger-200"
                                                textColor="text-danger-700"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Average Topics */}
                            {averageTopics.length > 0 && (
                                <div className="card">
                                    <h3 className="subsection-title flex items-center gap-2">
                                        <span className="w-3 h-3 bg-warning-500 rounded-full"></span>
                                        Average Topics ({averageTopics.length})
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 mb-4">
                                        Topics with 55-70% accuracy - room for
                                        improvement
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {averageTopics.map((t, idx) => (
                                            <TopicCard
                                                key={idx}
                                                t={t}
                                                colorClass="bg-warning-50 border-warning-200"
                                                textColor="text-warning-700"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Strong Topics */}
                            {strongTopics.length > 0 && (
                                <div className="card">
                                    <h3 className="subsection-title flex items-center gap-2">
                                        <span className="w-3 h-3 bg-success-500 rounded-full"></span>
                                        Strong Topics ({strongTopics.length})
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 mb-4">
                                        Topics with over 70% accuracy -
                                        performing well
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {strongTopics.map((t, idx) => (
                                            <TopicCard
                                                key={idx}
                                                t={t}
                                                colorClass="bg-success-50 border-success-200"
                                                textColor="text-success-700"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })()}
        </div>
    )
}

