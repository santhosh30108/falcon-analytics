import { getTrendColor, getTrendIcon } from '@/utils/utils';

export default function MetricCard({ label, value, unit = '', trend, subtitle, colorClass }) {
  const trendColor = trend > 0 ? 'text-success-600' : trend < 0 ? 'text-danger-600' : 'text-gray-600';
  const trendBgColor = trend > 0 ? 'bg-success-50' : trend < 0 ? 'bg-danger-50' : 'bg-gray-50';

  return (
    <div className="card card-hover">
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
