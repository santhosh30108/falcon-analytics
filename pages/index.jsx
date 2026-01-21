import MetricCard from '@/components/MetricCard';
import PerformanceHeatmap from '@/components/PerformanceHeatmap';
import AlertCard from '@/components/AlertCard';
import { batchOverview, chapterPerformance, alerts } from '@/data/mockData';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
          Welcome back, Dr. Rajesh Kumar • Physics Faculty
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          label="Total Students"
          value={batchOverview.totalStudents}
          subtitle="Active in current batch"
        />
        <MetricCard
          label="Average Score"
          value={batchOverview.averageScore}
          unit="%"
          trend={batchOverview.trend.score}
          subtitle="Across all subjects"
        />
        <MetricCard
          label="Overall Accuracy"
          value={batchOverview.accuracyPercentage}
          unit="%"
          trend={batchOverview.trend.accuracy}
          subtitle="Last 5 tests"
        />
        <MetricCard
          label="Attempt Rate"
          value={batchOverview.attemptRate}
          unit="%"
          trend={batchOverview.trend.attemptRate}
          subtitle="Questions attempted"
        />
      </div>

      {/* Alerts */}
      <div>
        <h2 className="section-title">Important Alerts</h2>
        <div className="space-y-3">
          {alerts.slice(0, 3).map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>

      {/* Performance Heatmap */}
      <PerformanceHeatmap
        data={chapterPerformance.slice(0, 12)}
        title="Chapter-wise Performance Overview"
      />

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="subsection-title">Top Performing Chapters</h3>
          <div className="space-y-3 mt-4">
            {chapterPerformance
              .sort((a, b) => b.accuracy - a.accuracy)
              .slice(0, 5)
              .map((chapter, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{chapter.chapter}</p>
                    <p className="text-xs text-gray-500">{chapter.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base sm:text-lg font-bold text-success-700">{chapter.accuracy.toFixed(1)}%</p>
                    <p className="text-xs text-success-600">↑ {chapter.trend}%</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="card">
          <h3 className="subsection-title">Needs Immediate Attention</h3>
          <div className="space-y-3 mt-4">
            {chapterPerformance
              .filter(c => c.accuracy < 60)
              .sort((a, b) => a.accuracy - b.accuracy)
              .slice(0, 5)
              .map((chapter, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-danger-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{chapter.chapter}</p>
                    <p className="text-xs text-gray-500">{chapter.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base sm:text-lg font-bold text-danger-700">{chapter.accuracy.toFixed(1)}%</p>
                    <p className="text-xs text-danger-600">↓ {Math.abs(chapter.trend)}%</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
