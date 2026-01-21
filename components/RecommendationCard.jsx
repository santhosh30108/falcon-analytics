export default function RecommendationCard({ recommendation }) {
  const impactColors = {
    High: 'badge-danger',
    Medium: 'badge-warning',
    Low: 'badge-success',
  };

  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{recommendation.title}</h3>
        </div>
        <span className={`badge ${impactColors[recommendation.impact]} ml-4`}>
          {recommendation.impact} Impact
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{recommendation.description}</p>

      {/* Reason */}
      <div className="bg-primary-50 border-l-4 border-primary-500 p-3 rounded-r mb-4">
        <p className="text-sm text-primary-900">
          <span className="font-medium">Rationale: </span>
          {recommendation.reason}
        </p>
      </div>

      {/* Question Distribution */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-700 mb-2">Suggested Question Distribution:</p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-success-50 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-success-700">{recommendation.questions.easy}</div>
            <div className="text-xs text-success-600 mt-1">Easy</div>
          </div>
          <div className="bg-warning-50 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-warning-700">{recommendation.questions.medium}</div>
            <div className="text-xs text-warning-600 mt-1">Medium</div>
          </div>
          <div className="bg-danger-50 rounded-lg p-2 sm:p-3 text-center">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-danger-700">{recommendation.questions.hard}</div>
            <div className="text-xs text-danger-600 mt-1">Hard</div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div>
        <p className="text-xs font-medium text-gray-700 mb-2">Focus Topics:</p>
        <div className="flex flex-wrap gap-2">
          {recommendation.topics.map((topic, index) => (
            <span key={index} className="badge badge-primary">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
