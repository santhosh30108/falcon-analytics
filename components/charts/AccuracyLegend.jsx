// Shared accuracy legend component for charts
export default function AccuracyLegend() {
    return (
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
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
                <span className="text-xs text-gray-600">
                    Needs Attention (&lt;55%)
                </span>
            </div>
        </div>
    )
}

