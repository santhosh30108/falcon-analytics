import { useEffect, useMemo, useRef, useState } from 'react'
import {
    alerts as mockAlerts,
    batchOverview as mockBatchOverview,
    chapterPerformance as mockChapterPerformance,
    chatResponses,
    facultyInfo as mockFacultyInfo,
    topicBreakdown as mockTopicBreakdown,
} from '@/data/mockData'

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Lightweight, mock-data "query" hook.
 * Returns a react-query-like shape used by falcon-fe UI components.
 */
function useMockQuery({ enabled = true, queryFn, initialData, queryKey = [] }) {
    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(Boolean(enabled))
    const [isError, setIsError] = useState(false)
    const mountedRef = useRef(true)

    const run = async () => {
        if (!enabled) return
        setIsLoading(true)
        setIsError(false)
        try {
            const result = await queryFn()
            if (!mountedRef.current) return
            setData(result)
        } catch (e) {
            if (!mountedRef.current) return
            setIsError(true)
        } finally {
            if (!mountedRef.current) return
            setIsLoading(false)
        }
    }

    useEffect(() => {
        mountedRef.current = true
        run()
        return () => {
            mountedRef.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, ...queryKey])

    return {
        data,
        isLoading,
        isError,
        refetch: run,
    }
}

export const useFacultyInfo = () => {
    return useMockQuery({
        enabled: true,
        initialData: undefined,
        queryFn: async () => {
            // Small delay so shimmer/loading UI can render
            await delay(250)
            return mockFacultyInfo
        },
    })
}

export const useBatchOverview = (params) => {
    const batchId = params?.batchId

    return useMockQuery({
        queryKey: [batchId],
        enabled: Boolean(batchId),
        initialData: undefined,
        queryFn: async () => {
            await delay(250)
            const batch =
                mockFacultyInfo?.batches?.find((b) => b.id === batchId) || null
            return {
                totalStudents: batch?.students ?? mockBatchOverview.totalStudents,
                averageScore: batch?.averageScore ?? mockBatchOverview.averageScore,
                accuracyPercentage: batch?.accuracyPercentage ?? mockBatchOverview.accuracyPercentage,
                attemptRate: batch?.attemptRate ?? mockBatchOverview.attemptRate,
                trend: batch?.trend ?? mockBatchOverview.trend,
            }
        },
    })
}

export const useChapterPerformance = (params) => {
    const batchId = params?.batchId

    return useMockQuery({
        queryKey: [batchId],
        enabled: Boolean(batchId),
        initialData: [],
        queryFn: async () => {
            await delay(250)
            // In mock mode we keep the same dataset; could be filtered per batchId if desired.
            return Array.isArray(mockChapterPerformance) ? mockChapterPerformance : []
        },
    })
}

export const useTopicBreakdown = (params) => {
    const batchId = params?.batchId

    return useMockQuery({
        queryKey: [batchId],
        enabled: Boolean(batchId),
        initialData: {},
        queryFn: async () => {
            await delay(250)
            return mockTopicBreakdown && typeof mockTopicBreakdown === 'object'
                ? mockTopicBreakdown
                : {}
        },
    })
}

export const useAlerts = (params) => {
    const batchId = params?.batchId
    return useMockQuery({
        queryKey: [batchId],
        enabled: Boolean(batchId),
        initialData: [],
        queryFn: async () => {
            await delay(250)
            return Array.isArray(mockAlerts) ? mockAlerts : []
        },
    })
}

function buildChapterInsights(chapters = []) {
    const sorted = [...chapters]
        .map((c) => ({ ...c, accuracy: Number(c.accuracy) }))
        .filter((c) => Number.isFinite(c.accuracy))
        .sort((a, b) => a.accuracy - b.accuracy)

    const weakest = sorted.slice(0, 2).map((c) => c.chapter).filter(Boolean)
    const strong = sorted
        .slice(-2)
        .reverse()
        .map((c) => c.chapter)
        .filter(Boolean)

    return [
        {
            emoji: '🔺',
            message: `Immediate revision recommended for ${weakest.join(' and ') || 'key chapters'} due to low accuracy.`,
            chapters: weakest,
        },
        {
            emoji: '⚠️',
            message: 'Monitor chapters showing negative trends and reinforce fundamentals with targeted practice.',
            chapters: sorted.filter((c) => Number(c.trend) < 0).slice(0, 3).map((c) => c.chapter),
        },
        {
            emoji: '✨',
            message: `Keep the current approach for ${strong.join(' and ') || 'top chapters'} — performance is strong.`,
            chapters: strong,
        },
    ]
}

function buildTopicInsights(breakdown = {}) {
    const allTopics = Object.entries(breakdown)
        .flatMap(([chapter, topics]) =>
            (topics || []).map((t) => ({ ...t, chapter }))
        )
        .map((t) => ({ ...t, accuracy: Number(t.accuracy) }))
        .filter((t) => Number.isFinite(t.accuracy))
        .sort((a, b) => a.accuracy - b.accuracy)

    const weakest = allTopics.slice(0, 3).map((t) => t.topic).filter(Boolean)
    const slow = allTopics
        .filter((t) => Number(t.timeSpent) > 90)
        .slice(0, 3)
        .map((t) => t.topic)
        .filter(Boolean)

    return [
        {
            emoji: '🎯',
            message: 'Prioritize targeted practice on the lowest-accuracy topics first.',
            topics: weakest,
        },
        {
            emoji: '📉',
            message: 'Some topics are also time-intensive; reinforce concepts and time-management strategies.',
            topics: slow,
        },
    ]
}

export const useChapterInsights = (params) => {
    const batchId = params?.batchId

    return useMockQuery({
        queryKey: [batchId],
        enabled: Boolean(batchId),
        initialData: [],
        queryFn: async () => {
            await delay(250)
            return buildChapterInsights(
                Array.isArray(mockChapterPerformance) ? mockChapterPerformance : []
            )
        },
    })
}

export const useTopicInsights = (params) => {
    const batchId = params?.batchId
    return useMockQuery({
        queryKey: [batchId],
        enabled: Boolean(batchId),
        initialData: [],
        queryFn: async () => {
            await delay(250)
            return buildTopicInsights(
                mockTopicBreakdown && typeof mockTopicBreakdown === 'object'
                    ? mockTopicBreakdown
                    : {}
            )
        },
    })
}

export const useOverviewInsights = (params) => {
    const batchId = params?.batchId

    return useMockQuery({
        queryKey: [batchId],
        enabled: Boolean(batchId),
        initialData: [],
        queryFn: async () => {
            await delay(250)
            // Convert existing mock alerts into the "overviewInsights" shape used by falcon-fe.
            return (Array.isArray(mockAlerts) ? mockAlerts : []).slice(0, 3).map((a) => ({
                emoji:
                    a.type === 'critical'
                        ? '🔺'
                        : a.type === 'warning'
                          ? '⚠️'
                          : '✨',
                message: a.message,
                chapter: a.chapter,
            }))
        },
    })
}

function formatChatReply(entry) {
    if (!entry) return null
    const lines = [entry.answer]
    if (Array.isArray(entry.data) && entry.data.length > 0) {
        lines.push('')
        entry.data.forEach((row) => {
            if (row.topic) {
                lines.push(
                    `- ${row.topic}${row.accuracy != null ? ` (${row.accuracy}%` : ''}${row.trend != null ? `, ${row.trend > 0 ? '↑' : '↓'} ${Math.abs(row.trend)}%` : ''}${row.accuracy != null ? ')' : ''}`
                )
                return
            }
            if (row.question) {
                lines.push(
                    `- ${row.question}${row.accuracy != null ? ` (${row.accuracy}% accuracy)` : ''}${row.type ? ` • ${row.type}` : ''}`
                )
                return
            }
            // Fallback for other shapes
            lines.push(`- ${JSON.stringify(row)}`)
        })
    }
    return lines.join('\n')
}

/**
 * Mock mutation hook for AI assistant chat.
 * Provides the same surface area as react-query's useMutation: { mutate, isPending }.
 */
export const useAIAssistant = () => {
    const [isPending, setIsPending] = useState(false)

    const mutate = async (payload, opts = {}) => {
        const message = (payload?.message || '').toString().toLowerCase()
        setIsPending(true)
        try {
            await delay(700)

            const keys = Object.keys(chatResponses || {})
            const matchedKey =
                keys.find((k) => message.includes(k)) ||
                (message.includes('weak') ? 'weakest topics' : null) ||
                (message.includes('tricky') ? 'trickiest questions' : null) ||
                (message.includes('improve') ? 'improvement areas' : null)

            const reply =
                formatChatReply(chatResponses?.[matchedKey]) ||
                "I'm here to help. Try asking: “weakest topics”, “trickiest questions”, or “improvement areas”."

            opts?.onSuccess?.({ reply })
        } catch (e) {
            opts?.onError?.(e)
        } finally {
            setIsPending(false)
        }
    }

    return { mutate, isPending }
}

