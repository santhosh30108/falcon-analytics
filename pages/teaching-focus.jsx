import { teachingPriorities } from '@/data/mockData';
import { getPriorityColor } from '@/utils/utils';

export default function TeachingFocusPage() {
  // Sort by priority: Urgent first, then High, then Medium
  const sortedPriorities = [...teachingPriorities].sort((a, b) => {
    const priorityOrder = { Urgent: 0, High: 1, Medium: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const PriorityCard = ({ priority }) => {
    const priorityColorClass = {
      Urgent: 'border-danger-300 bg-danger-50',
      High: 'border-warning-300 bg-warning-50',
      Medium: 'border-primary-300 bg-primary-50',
    };

    return (
      <div className={`card border-l-4 ${priorityColorClass[priority.priority]}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{priority.topic}</h3>
            <p className="text-sm text-gray-600 mt-1">{priority.subject}</p>
          </div>
          <span className={`badge badge-${getPriorityColor(priority.priority)}`}>
            {priority.priority}
          </span>
        </div>

        <div className="bg-white rounded-lg p-3 mb-3">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Why Focus Here: </span>
            {priority.reason}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {priority.tags.map((tag, index) => (
            <span key={index} className="badge badge-primary">
              {tag}
            </span>
          ))}
        </div>

        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Suggested Teaching Approach:</p>
          <ul className="space-y-1">
            {priority.suggestedActivities.map((activity, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">✓</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Teaching Focus Planner</h1>
        <p className="text-gray-600 mt-2">Prioritized topics based on student performance data</p>
      </div>

      {/* Summary */}
      <div className="card gradient-bg">
        <h3 className="subsection-title">Focus Areas Overview</h3>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-gray-900">{teachingPriorities.length}</div>
            <div className="text-sm text-gray-600 mt-1">Total Focus Areas</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-danger-700">
              {teachingPriorities.filter(p => p.priority === 'Urgent').length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Urgent Priority</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-warning-700">
              {teachingPriorities.filter(p => p.priority === 'High').length}
            </div>
            <div className="text-sm text-gray-600 mt-1">High Priority</div>
          </div>
        </div>
      </div>

      {/* Priority Topics */}
      <div>
        <h2 className="section-title">What You Should Focus On</h2>
        <div className="grid grid-cols-2 gap-6">
          {sortedPriorities.map((priority) => (
            <PriorityCard key={priority.id} priority={priority} />
          ))}
        </div>
      </div>

      {/* Teaching Tips */}
      <div className="card">
        <h3 className="subsection-title">General Teaching Recommendations</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">For Urgent Topics</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-0.5">•</span>
                <span>Dedicate extra class time immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-0.5">•</span>
                <span>Use multiple teaching methods (visual, practical, theoretical)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-0.5">•</span>
                <span>Provide additional practice problems</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-success-50 to-success-100 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">For High Impact Areas</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-success-600 mt-0.5">•</span>
                <span>Focus on fundamental concept clarity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-600 mt-0.5">•</span>
                <span>Address common misconceptions directly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-600 mt-0.5">•</span>
                <span>Regular quick assessments to track progress</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
