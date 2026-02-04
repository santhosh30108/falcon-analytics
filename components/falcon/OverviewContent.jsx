import { useMemo } from 'react'
import { Target, AlertCircle, TrendingUp } from 'lucide-react'
import MetricCard from '@/components/ui/MetricCard'
import AlertCard from '@/components/ui/AlertCard'
import SectionTooltip from '@/components/ui/SectionTooltip'
import Shimmer from '@/components/ui/Shimmer'
import {
    useFacultyInfo,
    useBatchOverview,
    useAlerts,
    useChapterPerformance,
    useOverviewInsights,
} from '@/hooks/dashboard.hooks'

export default function OverviewContent({ selectedBatch }) {
    const batchId = selectedBatch?.id
    const { data: facultyInfo, isLoading: isFacultyLoading } = useFacultyInfo()
    const { data: batchOverview, isLoading: isOverviewLoading } =
        useBatchOverview({
            batchId,
        })
    const { data: alerts, isLoading: areAlertsLoading } = useAlerts({
        batchId,
    })
    const { data: chapterPerformance, isLoading: isChapterPerformanceLoading } =
        useChapterPerformance({ batchId })
    const { data: overviewInsights } = useOverviewInsights({ batchId })

    const isLoading =
        isFacultyLoading || isOverviewLoading || isChapterPerformanceLoading

    const mappedAlerts = useMemo(() => {
        if (!overviewInsights) return []

        return overviewInsights.map((insight, index) => {
            let type = 'info'
            if (insight.emoji === '🔺') type = 'critical'
            else if (insight.emoji === '⚠️') type = 'warning'
            else if (insight.emoji === '✨') type = 'info'

            return {
                id: `insight-${index}`,
                type,
                message: insight.message,
                subject: selectedBatch?.subject || 'Physics',
                chapter: insight.chapter,
            }
        })
    }, [overviewInsights, selectedBatch])

    if (isLoading) {
        return (
            <div className="space-y-8 pb-4">
                {/* Greeting shimmer */}
                <div className="rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <Shimmer className="h-3 w-24 mb-3 rounded" />
                        <Shimmer className="h-8 w-48 sm:w-64 mb-2 rounded-lg" />
                        <Shimmer className="h-4 w-full max-w-md rounded" />
                    </div>
                </div>

                {/* Key metrics shimmer */}
                <div>
                    <Shimmer className="h-4 w-28 mb-4 rounded" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-gray-200 p-6"
                            >
                                <Shimmer className="h-3 w-20 mb-3 rounded" />
                                <Shimmer className="h-9 w-16 mb-2 rounded-lg" />
                                <Shimmer className="h-3 w-24 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts section shimmer */}
                <div>
                    <Shimmer className="h-6 w-40 mb-4 rounded" />
                    <div className="space-y-3">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-gray-200 p-5"
                            >
                                <Shimmer className="h-4 w-full mb-2 rounded" />
                                <Shimmer className="h-3 w-32 rounded" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick snapshot shimmer */}
                <div>
                    <Shimmer className="h-6 w-56 mb-4 rounded" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-gray-200 overflow-hidden"
                            >
                                <div className="h-12 px-5 flex items-center">
                                    <Shimmer className="h-4 w-44 rounded" />
                                </div>
                                <div className="p-5 space-y-3">
                                    {[1, 2, 3].map((j) => (
                                        <div
                                            key={j}
                                            className="flex justify-between items-center"
                                        >
                                            <Shimmer className="h-4 flex-1 max-w-[70%] rounded" />
                                            <Shimmer className="h-4 w-12 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const topChapters =
        Array.isArray(chapterPerformance) &&
        [...chapterPerformance]
            .filter((c) => c.accuracy >= 70)
            .sort((a, b) => b.accuracy - a.accuracy)
            .slice(0, 3)
    const needsAttentionChapters =
        Array.isArray(chapterPerformance) &&
        [...chapterPerformance]
            .filter((c) => c.accuracy < 55)
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, 3)

    return (
        <div className="space-y-8 pb-4">
            {/* Greeting Card - More polished */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/10 via-primary-50 to-primary-100/80 p-6 sm:p-8 border border-primary-200/80 shadow-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-300/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative">
                    <p className="text-gray-500 text-sm font-medium mb-0.5">
                        Welcome back,
                    </p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                        {facultyInfo?.name} 👋
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                        <span>Viewing</span>
                        <span className="font-semibold text-primary-700 bg-white/60 px-2 py-0.5 rounded-md">
                            {selectedBatch?.name}
                        </span>
                        {selectedBatch?.subject && (
                            <>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-700">
                                    {selectedBatch.subject}
                                </span>
                            </>
                        )}
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-700">
                            {batchOverview?.totalStudents} students
                        </span>
                    </p>
                </div>
            </div>

            {/* Key Metrics - Rounded cards, consistent trend style */}
            <div>
                <h2 className="text-base font-semibold text-gray-700 mb-4 uppercase tracking-wider">
                    Key metrics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                    <MetricCard
                        label="Batch Strength"
                        value={batchOverview?.totalStudents}
                        subtitle="Students enrolled"
                        tooltip={{
                            title: 'Batch Strength',
                            description:
                                'Total number of students currently enrolled in this batch.',
                        }}
                    />
                    <MetricCard
                        label="Avg Test Score"
                        value={batchOverview?.averageScore}
                        unit=""
                        // trend={batchOverview?.trend.score}
                        subtitle="Last 2 tests"
                        tooltip={{
                            title: 'Average Test Score',
                            description:
                                'The mean score across all students in the batch over the last 2 tests.',
                            formula: '= (Sum of all scores) / (Total students)',
                        }}
                    />
                    <MetricCard
                        label="Accuracy Rate"
                        value={batchOverview?.accuracyPercentage}
                        unit="%"
                        trend={batchOverview?.trend.accuracy}
                        subtitle="Last 2 tests"
                        tooltip={{
                            title: 'Accuracy Rate',
                            description:
                                'Percentage of questions answered correctly by students.',
                            formula:
                                '= (Correct answers / Total attempted) × 100',
                        }}
                    />
                    <MetricCard
                        label="Attempt Rate"
                        value={batchOverview?.attemptRate}
                        unit="%"
                        trend={batchOverview?.trend.attemptRate}
                        subtitle="Last 2 tests"
                        tooltip={{
                            title: 'Attempt Rate',
                            description:
                                'Percentage of questions that students attempted out of total questions.',
                            formula:
                                '= (Questions attempted / Total questions) × 100',
                        }}
                    />
                </div>
            </div>

            {/* Important Alerts */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 m-0 leading-tight flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-primary-600" />
                        Important Alerts
                    </h2>
                    <SectionTooltip
                        title="Important Alerts"
                        description="Critical insights on student performance drops and challenging topics that need your attention."
                    />
                </div>
                {mappedAlerts?.length > 0 ? (
                    <div className="space-y-3">
                        {mappedAlerts.slice(0, 3).map((alert) => (
                            <AlertCard key={alert.id} alert={alert} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success-100 text-success-600 mb-3">
                            <Target className="w-6 h-6" />
                        </div>
                        <p className="text-gray-700 font-medium">
                            No alerts right now
                        </p>
                        <p className="text-gray-500 text-sm mt-0.5">
                            All looking good!
                        </p>
                    </div>
                )}
            </div>

            {/* Quick Performance Snapshot */}
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                    Quick Performance Snapshot
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Top Performing */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-success-50/50 to-transparent">
                            <h3 className="text-sm font-semibold text-success-800 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-success-500" />
                                Top Performing Chapters
                            </h3>
                        </div>
                        <div className="p-5">
                            {topChapters?.length > 0 ? (
                                <ul className="space-y-0 divide-y divide-gray-100">
                                    {topChapters.map((chapter, idx) => (
                                        <li
                                            key={idx}
                                            className="flex justify-between items-center py-3 first:pt-0 last:pb-0"
                                        >
                                            <span className="flex items-center gap-2 text-gray-700">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-success-100 text-success-700 text-xs font-bold">
                                                    {idx + 1}
                                                </span>
                                                {chapter.chapter}
                                            </span>
                                            <span className="font-semibold text-success-600 tabular-nums">
                                                {chapter.accuracy.toFixed(1)}%
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm py-2">
                                    No chapters above 70%.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Needs Attention */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-danger-50/50 to-transparent">
                            <h3 className="text-sm font-semibold text-danger-800 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-danger-500" />
                                Needs Attention
                            </h3>
                        </div>
                        <div className="p-5">
                            {needsAttentionChapters?.length > 0 ? (
                                <ul className="space-y-0 divide-y divide-gray-100">
                                    {needsAttentionChapters.map(
                                        (chapter, idx) => (
                                            <li
                                                key={idx}
                                                className="flex justify-between items-center py-3 first:pt-0 last:pb-0"
                                            >
                                                <span className="flex items-center gap-2 text-gray-700">
                                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-danger-100 text-danger-700 text-xs font-bold">
                                                        {idx + 1}
                                                    </span>
                                                    {chapter.chapter}
                                                </span>
                                                <span className="font-semibold text-danger-600 tabular-nums">
                                                    {chapter.accuracy.toFixed(
                                                        1
                                                    )}
                                                    %
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm py-2">
                                    No chapters below 55%.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

