import TrendIndicator from './TrendIndicator'

export default function MetricCard({
    label,
    value,
    unit = '',
    trend,
    subtitle,
    colorClass,
    tooltip,
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 p-6 relative group">
            {/* Tooltip Overlay - Full Card Size */}
            {tooltip && (
                <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md text-white rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 flex flex-col justify-center shadow-xl border border-white/10">
                    <p className="font-semibold text-sm mb-2 text-white">
                        {tooltip.title}
                    </p>
                    <p className="text-slate-300 text-xs mb-2">
                        {tooltip.description}
                    </p>
                    {tooltip.formula && (
                        <p className="text-primary-300 font-mono text-xs bg-slate-800/50 px-2 py-1 rounded border border-white/5 inline-block">
                            {tooltip.formula}
                        </p>
                    )}
                </div>
            )}

            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
                        {label}
                    </p>
                    <div className="flex flex-wrap items-baseline gap-2 mt-2">
                        <h3
                            className={`text-xl sm:text-2xl md:text-3xl font-bold tabular-nums ${colorClass || 'text-gray-900'}`}
                        >
                            {typeof value === 'number' && value % 1 !== 0
                                ? value.toFixed(2)
                                : value}
                            {unit}
                        </h3>
                        {trend !== undefined && (
                            <TrendIndicator value={trend} size="sm" />
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-1.5">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

