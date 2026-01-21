'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatPercentage } from '@/utils/utils';

export default function QuestionTypeBreakdown({ data }) {
  const chartData = data.map(item => ({
    type: item.type,
    accuracy: item.accuracy,
    avgScore: item.avgScore,
  }));

  const getBarColor = (accuracy) => {
    if (accuracy >= 70) return '#22c55e';
    if (accuracy >= 55) return '#f59e0b';
    return '#ef4444';
  };

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
              label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
              formatter={(value) => `${value.toFixed(1)}%`}
            />
            <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.accuracy)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Breakdown */}
      <div className="mt-8 space-y-4">
        {data.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{item.type}</h4>
                <p className="text-sm text-gray-500 mt-1">{item.totalQuestions} questions analyzed</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{formatPercentage(item.accuracy)}</div>
                <div className="text-xs text-gray-500">Accuracy</div>
              </div>
            </div>

            {/* Common Errors */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-700 mb-2">Common Errors:</p>
              <ul className="space-y-1">
                {item.commonErrors.map((error, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-danger-500 mt-0.5">•</span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Misconception */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-700 mb-1">Key Insight:</p>
              <p className="text-xs text-gray-600 italic">{item.misconceptions}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
