import { getTrendColor, getTrendIcon } from '@/utils/utils';
import { Info } from 'lucide-react';

export default function MetricCard({ label, value, unit = '', trend, subtitle, colorClass, tooltip }) {
  const trendColor = trend > 0 ? 'text-success-600' : trend < 0 ? 'text-danger-600' : 'text-gray-600';
  const trendBgColor = trend > 0 ? 'bg-success-50' : trend < 0 ? 'bg-danger-50' : 'bg-gray-50';

  return (
    <div className="card card-hover relative group">
      {/* Tooltip Overlay - Full Card Size */}
      {tooltip && (
        <div className="absolute inset-0 bg-gray-900 text-white rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-100 z-10 flex flex-col justify-center">
          <p className="font-semibold text-sm mb-2">{tooltip.title}</p>
          <p className="text-gray-300 text-xs mb-2">{tooltip.description}</p>
          {tooltip.formula && (
            <p className="text-primary-300 font-mono text-xs bg-gray-800 px-2 py-1 rounded">{tooltip.formula}</p>
          )}
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="metric-label">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className={`metric-value ${colorClass || 'text-gray-900'}`}>
              {value}{unit}
            </h3>
            {trend !== undefined && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${trendColor} ${trendBgColor}`}>
                {getTrendIcon(trend)} {Math.abs(trend)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

