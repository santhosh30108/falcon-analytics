import { Target } from 'lucide-react'

export default function RecommendationCard({ recommendation }) {
    const impactColors = {
        High: 'badge-danger',
        Medium: 'badge-warning',
        Low: 'badge-success',
    }

    return (
        <div className="card card-hover">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                        {recommendation.title}
                    </h3>
                </div>
                <span
                    className={`badge ${impactColors[recommendation.impact]} ml-4`}
                >
                    {recommendation.impact} Impact
                </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                {recommendation.description}
            </p>

            {/* Reason */}
            <div className="bg-primary-50 border-l-4 border-primary-500 p-3 rounded-r mb-4">
                <p className="text-sm text-primary-900">
                    <span className="font-medium">Rationale: </span>
                    {recommendation.reason}
                </p>
            </div>

            {/* Focus Topics */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-indigo-100 rounded-md">
                        <Target className="w-4 h-4 text-indigo-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                        Chapters & Topics to Focus On:
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {recommendation.topics.map((topic, index) => (
                        <span
                            key={index}
                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

