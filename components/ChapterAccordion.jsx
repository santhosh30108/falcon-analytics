'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { formatPercentage, getPerformanceColorClass, getDifficultyColor } from '@/utils/utils';
import TrendIndicator from './TrendIndicator';

export default function ChapterAccordion({ chapter, topics }) {
  const [isOpen, setIsOpen] = useState(false);

  const avgAccuracy = topics.reduce((sum, t) => sum + t.accuracy, 0) / topics.length;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Chapter Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="text-gray-400">
            {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
          <div className="text-left flex-1">
            <h3 className="font-semibold text-gray-900">{chapter}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{topics.length} topics</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className={`text-lg font-bold ${getPerformanceColorClass(avgAccuracy).split(' ')[0]}`}>
              {formatPercentage(avgAccuracy)}
            </div>
            <div className="text-xs text-gray-500">Avg Accuracy</div>
          </div>
        </div>
      </button>

      {/* Topics List */}
      {isOpen && (
        <div className="bg-gray-50 border-t border-gray-200">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="px-6 py-4 border-b border-gray-200 last:border-b-0 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`badge badge-${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">
                      {topic.questions} questions
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className={`text-xl font-bold ${getPerformanceColorClass(topic.accuracy).split(' ')[0]}`}>
                      {formatPercentage(topic.accuracy)}
                    </div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {topic.avgScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Avg Score</div>
                  </div>
                  <div>
                    <TrendIndicator value={topic.trend} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
