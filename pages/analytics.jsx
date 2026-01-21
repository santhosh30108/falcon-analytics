import ChapterAccordion from '@/components/ChapterAccordion';
import { topicBreakdown, chapterPerformance } from '@/data/mockData';
import { groupBySubject } from '@/utils/utils';

export default function AnalyticsPage() {
  const subjectGroups = groupBySubject(chapterPerformance);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Chapter & Topic Analytics
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2">
          Detailed performance breakdown by chapter and topic
        </p>
      </div>

      {/* Subject Tabs */}
      {Object.entries(subjectGroups).map(([subject, chapters]) => (
        <div key={subject}>
          <h2 className="section-title">{subject}</h2>
          <div className="space-y-4">
            {chapters.map((chapter) => (
              <ChapterAccordion
                key={chapter.chapter}
                chapter={chapter.chapter}
                topics={topicBreakdown[chapter.chapter] || []}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Summary Statistics */}
      <div className="card gradient-bg">
        <h3 className="subsection-title">Overall Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-700">
              {chapterPerformance.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Chapters</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-success-700">
              {chapterPerformance.filter(c => c.accuracy >= 70).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Good Performance</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-warning-700">
              {chapterPerformance.filter(c => c.accuracy >= 55 && c.accuracy < 70).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Average Performance</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-danger-700">
              {chapterPerformance.filter(c => c.accuracy < 55).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">Needs Attention</div>
          </div>
        </div>
      </div>
    </div>
  );
}
