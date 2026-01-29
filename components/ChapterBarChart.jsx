'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info } from 'lucide-react';

export default function ChapterBarChart({ data }) {
  // Sort by accuracy ascending (low first, high at end)
  const chartData = data.map(item => ({
    name: item.chapter.length > 20 ? item.chapter.slice(0, 20) + '...' : item.chapter,
    fullName: item.chapter,
    accuracy: item.accuracy,
  })).sort((a, b) => a.accuracy - b.accuracy);

  const getBarColor = (accuracy) => {
    if (accuracy >= 70) return '#22c55e';
    if (accuracy >= 55) return '#f59e0b';
    return '#ef4444';
  };

  // Dynamic height based on number of chapters
  const chartHeight = Math.max(300, chartData.length * 35);

  return (
    <div className="card">
      <h3 className="subsection-title">Chapter-wise Performance</h3>
      <p className="text-sm text-gray-500 mb-4">Sorted by accuracy (low → high)</p>
      
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              tick={{ fill: '#374151', fontSize: 12 }}
              width={150}
            />
            <Tooltip 
              formatter={(value) => [`${value.toFixed(1)}%`, 'Accuracy']}
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} barSize={20}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.accuracy)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-xs text-gray-600">Needs Attention (&lt;55%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded"></div>
          <span className="text-xs text-gray-600">Average (55-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-xs text-gray-600">Good (≥70%)</span>
        </div>
      </div>
    </div>
  );
}
