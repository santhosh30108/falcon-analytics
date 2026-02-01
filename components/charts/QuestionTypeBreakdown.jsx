'use client'

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

export default function QuestionTypeBreakdown({ data }) {
    const chartData = data.map((item) => ({
        type: item.type,
        accuracy: item.accuracy,
        avgScore: item.avgScore,
    }))

    return (
        <div className="card">
            <h3 className="subsection-title">Performance by Question Type</h3>

            {/* Chart */}
            <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="type"
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            axisLine={{ stroke: '#d1d5db' }}
                        />
                        <YAxis
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            axisLine={{ stroke: '#d1d5db' }}
                            label={{
                                value: 'Accuracy (%)',
                                angle: -90,
                                position: 'insideLeft',
                                style: { fill: '#6b7280' },
                            }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '12px',
                            }}
                            formatter={(value) => `${value.toFixed(1)}%`}
                        />
                        <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getBarColor(entry.accuracy)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <AccuracyLegend />
        </div>
    )
}

