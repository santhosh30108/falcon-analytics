'use client';

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { formatPercentage } from '@/utils/utils';

export default function ChapterChartOptions({ data }) {
  const chartData = data.map(item => ({
    name: item.chapter.length > 15 ? item.chapter.slice(0, 15) + '...' : item.chapter,
    fullName: item.chapter,
    accuracy: item.accuracy,
    trend: item.trend,
    subject: item.subject
  })).sort((a, b) => b.accuracy - a.accuracy);

  const getBarColor = (accuracy) => {
    if (accuracy >= 70) return '#22c55e';
    if (accuracy >= 55) return '#f59e0b';
    return '#ef4444';
  };

  const Legend = () => (
    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-green-500 rounded"></div>
        <span className="text-xs text-gray-600">Good (≥70%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-amber-500 rounded"></div>
        <span className="text-xs text-gray-600">Average (55-70%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-red-500 rounded"></div>
        <span className="text-xs text-gray-600">Needs Attention (&lt;55%)</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Option 1: Vertical Bar Chart */}
      <div className="card">
        <h3 className="subsection-title">Option 1: Vertical Bar Chart</h3>
        <p className="text-sm text-gray-500 mb-4">Best for comparing accuracy across chapters at a glance</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 100]}
                label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.accuracy)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Legend />
      </div>

      {/* Option 2: Horizontal Bar Chart */}
      <div className="card">
        <h3 className="subsection-title">Option 2: Horizontal Bar Chart</h3>
        <p className="text-sm text-gray-500 mb-4">Best for reading chapter names & comparing many chapters</p>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                dataKey="name" 
                type="category"
                tick={{ fill: '#6b7280', fontSize: 11 }}
                width={120}
              />
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.accuracy)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Legend />
      </div>

      {/* Option 3: Line Chart (Trend view) */}
      <div className="card">
        <h3 className="subsection-title">Option 3: Line Chart</h3>
        <p className="text-sm text-gray-500 mb-4">Best for showing ranking flow from high to low</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Option 4: Scatter Plot (Accuracy vs Trend) */}
      <div className="card">
        <h3 className="subsection-title">Option 4: Scatter Plot (Accuracy vs Trend)</h3>
        <p className="text-sm text-gray-500 mb-4">Best for identifying problem areas (low accuracy + declining trend)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="accuracy" 
                type="number"
                domain={[0, 100]}
                name="Accuracy"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                label={{ value: 'Accuracy (%)', position: 'bottom', offset: -5 }}
              />
              <YAxis 
                dataKey="trend" 
                type="number"
                name="Trend"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                label={{ value: 'Trend (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => [`${value}%`, name]}
              />
              <Scatter name="Chapters" data={chartData} fill="#6366f1">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.accuracy)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <Legend />
      </div>

      {/* Option 5: Radar Chart (Top 6 chapters) */}
      <div className="card">
        <h3 className="subsection-title">Option 5: Radar Chart</h3>
        <p className="text-sm text-gray-500 mb-4">Best for comparing multiple metrics at once (showing top 6 chapters)</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData.slice(0, 6)}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 11 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]}
                tick={{ fill: '#6b7280', fontSize: 10 }}
              />
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              <Radar 
                name="Accuracy" 
                dataKey="accuracy" 
                stroke="#6366f1" 
                fill="#6366f1" 
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
