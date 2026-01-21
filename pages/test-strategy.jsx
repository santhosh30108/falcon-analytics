import RecommendationCard from '@/components/RecommendationCard';
import { testRecommendations } from '@/data/mockData';

export default function TestStrategyPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Next Test Creation Strategy</h1>
        <p className="text-gray-600 mt-2">AI-powered recommendations for optimizing your next test</p>
      </div>

      {/* Overview */}
      <div className="card gradient-bg">
        <h3 className="subsection-title">Strategy Overview</h3>
        <p className="text-gray-700 mt-2">
          Based on analysis of recent test performance, student weaknesses, and exam weightage patterns, 
          here are personalized recommendations for your next test. Each recommendation includes the rationale, 
          suggested difficulty distribution, and focus topics.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary-700">{testRecommendations.length}</div>
            <div className="text-sm text-gray-600 mt-1">Recommendations</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-danger-700">
              {testRecommendations.filter(r => r.impact === 'High').length}
            </div>
            <div className="text-sm text-gray-600 mt-1">High Impact Changes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success-700">
              {testRecommendations.reduce((sum, r) => sum + r.questions.easy + r.questions.medium + r.questions.hard, 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Questions Affected</div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="section-title">AI-Generated Recommendations</h2>
        <div className="grid grid-cols-2 gap-6">
          {testRecommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      </div>

      {/* Expected Impact */}
      <div className="card">
        <h3 className="subsection-title">Expected Impact</h3>
        <p className="text-sm text-gray-600 mb-4">
          If these recommendations are considered for your next test design:
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Projected Accuracy Improvement</p>
              <p className="text-sm text-gray-600 mt-1">Based on targeted topic coverage</p>
            </div>
            <div className="text-3xl font-bold text-success-700">+8.5%</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Better Alignment with Exam Pattern</p>
              <p className="text-sm text-gray-600 mt-1">Weightage distribution match</p>
            </div>
            <div className="text-3xl font-bold text-primary-700">92%</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-warning-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Student Confidence Boost</p>
              <p className="text-sm text-gray-600 mt-1">Based on difficulty balance</p>
            </div>
            <div className="text-3xl font-bold text-warning-700">High</div>
          </div>
        </div>
      </div>
    </div>
  );
}
