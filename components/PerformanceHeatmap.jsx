import { getPerformanceColor, formatPercentage } from '@/utils/utils';

export default function PerformanceHeatmap({ data, title }) {
  const getColorClass = (accuracy) => {
    if (accuracy >= 70) return 'bg-success-500 hover:bg-success-600';
    if (accuracy >= 55) return 'bg-warning-500 hover:bg-warning-600';
    return 'bg-danger-500 hover:bg-danger-600';
  };

  const getTextColorClass = (accuracy) => {
    return 'text-white';
  };

  return (
    <div className="card">
      <h3 className="subsection-title">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`${getColorClass(item.accuracy)} ${getTextColorClass(item.accuracy)} p-4 rounded-lg transition-all duration-200 cursor-pointer group relative`}
          >
            <div className="text-xs font-medium opacity-90">{item.chapter}</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold mt-1">{formatPercentage(item.accuracy)}</div>
            <div className="text-xs opacity-75 mt-1">{item.subject}</div>
            
            {/* Tooltip */}
            <div className="absolute left-0 top-full mt-2 w-56 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-xl">
              <div className="font-semibold mb-2">{item.chapter}</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="font-medium">{formatPercentage(item.accuracy)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trend:</span>
                  <span className={`font-medium ${item.trend > 0 ? 'text-success-400' : 'text-danger-400'}`}>
                    {item.trend > 0 ? '↑' : '↓'} {Math.abs(item.trend)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-success-500 rounded"></div>
          <span className="text-xs text-gray-600">Good (≥70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-warning-500 rounded"></div>
          <span className="text-xs text-gray-600">Average (55-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-danger-500 rounded"></div>
          <span className="text-xs text-gray-600">Needs Attention (&lt;55%)</span>
        </div>
      </div>
    </div>
  );
}
