'use client'

import { useState, useRef, useCallback } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts'
import { getBarColor } from '@/utils/utils'
import AccuracyLegend from './AccuracyLegend'

const MAX_LABEL_LEN = 14

function SingleLineTick({ x, y, payload, tickFormatter }) {
    const value =
        typeof payload?.value !== 'undefined' ? payload.value : payload
    const text = tickFormatter ? tickFormatter(value) : value ?? ''
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={4}
                textAnchor="end"
                fill="#374151"
                fontSize={12}
                style={{ whiteSpace: 'nowrap' }}
            >
                {text}
            </text>
        </g>
    )
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const row = payload[0].payload
        const name = row.fullName ?? ''
        const accuracy = Number(row.accuracy)
        return (
            <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-sm text-gray-600">{`Accuracy: ${accuracy.toFixed(1)}%`}</p>
            </div>
        )
    }
    return null
}

export default function ChapterBarChart({ data }) {
    const [activeBar, setActiveBar] = useState(null)
    const chartRef = useRef(null)

    // Sort by accuracy ascending (low first, high at end).
    // Use fullName as unique category so names don't collide.
    const chartData = (data || [])
        .map((item) => ({
            fullName: item.chapter ?? '',
            accuracy: Number(item.accuracy) || 0,
        }))
        .sort((a, b) => a.accuracy - b.accuracy)

    // Dynamic height based on number of chapters
    const chartHeight = Math.max(300, chartData.length * 35)

    // Handle bar click for mobile
    const handleBarClick = useCallback((data, index) => {
        setActiveBar(activeBar === index ? null : index)
    }, [activeBar])

    // Close tooltip when clicking outside
    const handleChartClick = useCallback((state) => {
        if (!state || !state.activePayload) {
            setActiveBar(null)
        }
    }, [])

    return (
        <div className="card" ref={chartRef}>
            <h3 className="subsection-title">Chapter-wise Performance</h3>
            <p className="text-sm text-gray-500 mb-4">
                Sorted by accuracy (low → high)
            </p>

            <div style={{ height: chartHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ left: 20, right: 30 }}
                        onClick={handleChartClick}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            type="number"
                            domain={[0, 100]}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis
                            dataKey="fullName"
                            type="category"
                            width={150}
                            tick={(props) => (
                                <SingleLineTick
                                    {...props}
                                    tickFormatter={(value) => {
                                        const str = value ?? ''
                                        return str.length > MAX_LABEL_LEN
                                            ? str.slice(0, MAX_LABEL_LEN) + '…'
                                            : str
                                    }}
                                />
                            )}
                        />
                        <Tooltip 
                            content={<CustomTooltip />}
                            cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                            wrapperStyle={{ outline: 'none', zIndex: 100 }}
                        />
                        <Bar
                            dataKey="accuracy"
                            radius={[0, 4, 4, 0]}
                            barSize={20}
                            onClick={handleBarClick}
                            style={{ cursor: 'pointer' }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={entry.fullName || `cell-${index}`}
                                    fill={getBarColor(entry.accuracy)}
                                    style={{ 
                                        cursor: 'pointer',
                                        outline: 'none'
                                    }}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Mobile touch tooltip - shows selected bar info */}
            {activeBar !== null && chartData[activeBar] && (
                <div className="mt-3 p-3 bg-primary-50 border border-primary-200 rounded-lg sm:hidden">
                    <p className="text-sm font-semibold text-gray-900">
                        {chartData[activeBar].fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                        Accuracy: {chartData[activeBar].accuracy.toFixed(1)}%
                    </p>
                    <button 
                        onClick={() => setActiveBar(null)}
                        className="mt-2 text-xs text-primary-600 underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <AccuracyLegend />
        </div>
    )
}

