import QuestionTypeBreakdown from '@/components/QuestionTypeBreakdown';
import { questionTypeAnalysis } from '@/data/mockData';

export default function QuestionsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Question-Type & Error Analysis
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
          Understanding student performance patterns and common mistakes
        </p>
      </div>

      {/* Question Type Breakdown */}
      <QuestionTypeBreakdown data={questionTypeAnalysis} />

      {/* Key Insights */}
      <div className="card">
        <h3 className="subsection-title">AI-Generated Insights</h3>
        <div className="space-y-4 mt-4">
          <div className="border-l-4 border-danger-500 bg-danger-50 p-4 rounded-r-lg">
            <h4 className="font-semibold text-danger-900 mb-2">Critical Finding</h4>
            <p className="text-sm text-danger-800">
              Multi-step problems show the lowest accuracy at 58.3%. Students are struggling with breaking down complex problems into manageable steps. Recommend dedicated practice sessions on problem decomposition strategies.
            </p>
          </div>

          <div className="border-l-4 border-warning-500 bg-warning-50 p-4 rounded-r-lg">
            <h4 className="font-semibold text-warning-900 mb-2">Common Pattern</h4>
            <p className="text-sm text-warning-800">
              Numerical questions frequently have sign convention errors, particularly in Electrostatics (capacitor problems) and Mechanics (vector directions). Consider a focused revision session on sign conventions across topics.
            </p>
          </div>

          <div className="border-l-4 border-primary-500 bg-primary-50 p-4 rounded-r-lg">
            <h4 className="font-semibold text-primary-900 mb-2">Strength Area</h4>
            <p className="text-sm text-primary-800">
              Conceptual questions show strong performance at 71.4% accuracy. Students have good theoretical understanding. Focus should be on application and problem-solving skills.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="card">
        <h3 className="subsection-title">Recommended Teaching Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">For Multi-step Problems</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-0.5">•</span>
                <span>Teach systematic problem-solving frameworks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-0.5">•</span>
                <span>Practice breaking problems into sub-problems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-0.5">•</span>
                <span>Emphasize intermediate step verification</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-success-50 to-success-100 p-5 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">For Numerical Accuracy</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-success-600 mt-0.5">•</span>
                <span>Create sign convention reference sheets</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-600 mt-0.5">•</span>
                <span>Regular practice with unit conversions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success-600 mt-0.5">•</span>
                <span>Emphasize dimensional analysis checks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
