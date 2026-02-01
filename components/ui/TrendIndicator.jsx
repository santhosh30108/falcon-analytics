import { getTrendIcon } from '@/utils/utils'

export default function TrendIndicator({ value, size = 'md' }) {
    // Use white bg + colored border so trend pill doesn't merge with card bg (e.g. danger-50 card)
    const borderColor =
        value > 0
            ? 'border-success-200'
            : value < 0
              ? 'border-danger-200'
              : 'border-gray-200'
    const textColor =
        value > 0
            ? 'text-success-600'
            : value < 0
              ? 'text-danger-600'
              : 'text-gray-600'

    const sizeClasses = {
        sm: 'text-xs px-1.5 py-0.5',
        md: 'text-sm px-2 py-1',
        lg: 'text-base px-3 py-1.5',
    }

    return (
        <span
            className={`inline-flex items-center gap-1 rounded border bg-white shadow-sm font-medium ${borderColor} ${textColor} ${sizeClasses[size]}`}
        >
            <span>{getTrendIcon(value)}</span>
            <span>{Math.abs(value)}%</span>
        </span>
    )
}

