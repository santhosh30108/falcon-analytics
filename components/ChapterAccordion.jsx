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
        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="text-gray-400 flex-shrink-0">
            {isOpen ? <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          </div>
          <div className="text-left flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{chapter}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{topics.length} topics</p>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
          <div className="text-right">
            <div className={`text-base sm:text-lg font-bold ${getPerformanceColorClass(avgAccuracy).split(' ')[0]}`}>
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
              className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 last:border-b-0 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              {/* Mobile Layout - Full Width */}
              <div className="block sm:hidden">
                <h4 className="text-sm font-medium text-gray-900 mb-2 break-words pr-2">{topic.topic}</h4>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className={`badge badge-${getDifficultyColor(topic.difficulty)}`}>
                    {topic.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {topic.questions} questions
                  </span>
                </div>
                {/* Metrics Grid on Mobile */}
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                  <div className="text-center">
                    <div className={`text-base font-bold ${getPerformanceColorClass(topic.accuracy).split(' ')[0]}`}>
                      {formatPercentage(topic.accuracy)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-base font-bold text-gray-900">
                      {topic.avgScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Avg Score</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <TrendIndicator value={topic.trend} />
                  </div>
                </div>
              </div>

              {/* Desktop/Tablet Layout */}
              <div className="hidden sm:flex sm:items-center sm:justify-between gap-4">
                {/* Left side - Topic info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-medium text-gray-900 break-words">{topic.topic}</h4>
                  <div className="flex items-center gap-3 flex-wrap mt-2">
                    <span className={`badge badge-${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {topic.questions} questions
                    </span>
                  </div>
                </div>
                
                {/* Right side - Metrics */}
                <div className="flex items-center gap-6 lg:gap-8 flex-shrink-0">
                  <div className="text-right">
                    <div className={`text-lg lg:text-xl font-bold ${getPerformanceColorClass(topic.accuracy).split(' ')[0]}`}>
                      {formatPercentage(topic.accuracy)}
                    </div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg lg:text-xl font-bold text-gray-900">
                      {topic.avgScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Avg Score</div>
                  </div>
                  <div className="flex-shrink-0">
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
