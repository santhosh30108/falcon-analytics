'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Home, BarChart3, FileQuestion, ClipboardList, Target, MessageSquare, Send, ChevronDown, BookOpen, AlertTriangle, Info } from 'lucide-react';

// Dashboard imports
import MetricCard from '@/components/MetricCard';
import PerformanceHeatmap from '@/components/PerformanceHeatmap';
import AlertCard from '@/components/AlertCard';

// Analytics imports
import ChapterAccordion from '@/components/ChapterAccordion';
import ChapterBarChart from '@/components/ChapterBarChart';

// Questions imports
import QuestionTypeBreakdown from '@/components/QuestionTypeBreakdown';

// Test Strategy imports
import RecommendationCard from '@/components/RecommendationCard';

// Data imports
import {
  facultyInfo,
  batchOverview,
  chapterPerformance,
  alerts,
  topicBreakdown,
  questionTypeAnalysis,
  testRecommendations,
  teachingPriorities,
} from '@/data/mockData';

import { groupBySubject, getPriorityColor } from '@/utils/utils';

const tabs = [
  { id: 'overview', name: 'Overview', icon: Home },
  { id: 'insights', name: 'Insights', icon: BarChart3 },
  { id: 'strategy-focus', name: 'Strategy & Focus', icon: Target },
];

const insightSubTabs = [
  { id: 'chapter', name: 'Chapter-wise' },
  { id: 'topic', name: 'Topic-wise' },
  { id: 'question-type', name: 'Question Type-wise' },
];

// Overview Content Component
function OverviewContent({ selectedBranch, selectedClass, selectedBatch, selectedSubject }) {
  // Mock student count based on selections (in real app, this would come from API)
  const studentCount = 245;
  
  return (
    <div className="space-y-8">
      {/* Greeting - Subtle Design */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
        <p className="text-gray-500 text-sm mb-1">Welcome back,</p>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {facultyInfo.name} 👋
        </h2>
        <p className="text-gray-600 text-sm">
          Viewing <span className="font-semibold text-primary-700">{selectedBranch}</span> • Class {selectedClass} • {selectedBatch} • {selectedSubject} • {studentCount} students
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          label="Batch Strength"
          value={studentCount}
          subtitle="Students enrolled"
          tooltip={{
            title: "Batch Strength",
            description: "Total number of students currently enrolled in this batch.",
          }}
        />
        <MetricCard
          label="Avg Test Score"
          value={batchOverview.averageScore}
          unit="%"
          trend={batchOverview.trend.score}
          subtitle="Last 5 tests"
          tooltip={{
            title: "Average Test Score",
            description: "The mean score across all students in the batch over the last 5 tests.",
            formula: "= (Sum of all scores) / (Total students)"
          }}
        />
        <MetricCard
          label="Accuracy Rate"
          value={batchOverview.accuracyPercentage}
          unit="%"
          trend={batchOverview.trend.accuracy}
          subtitle="Last 5 tests"
          tooltip={{
            title: "Accuracy Rate",
            description: "Percentage of questions answered correctly by students.",
            formula: "= (Correct answers / Total attempted) × 100"
          }}
        />
        <MetricCard
          label="Attempt Rate"
          value={batchOverview.attemptRate}
          unit="%"
          trend={batchOverview.trend.attemptRate}
          subtitle="Last 5 tests"
          tooltip={{
            title: "Attempt Rate",
            description: "Percentage of questions that students attempted out of total questions.",
            formula: "= (Questions attempted / Total questions) × 100"
          }}
        />
      </div>

      {/* Important Alerts */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 m-0 leading-tight">Important Alerts</h2>
          <div className="relative group flex items-center">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-100 z-50 shadow-xl">
              <p className="font-semibold mb-1">Important Alerts</p>
              <p className="text-gray-300">Critical insights on student performance drops and challenging topics that need your attention.</p>
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
        {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-8">
            <p className="text-gray-500">✅ No alerts at the moment. All looking good!</p>
          </div>
        )}
      </div>

      {/* Quick Performance Snapshot */}
      <div>
        <h2 className="section-title">Quick Performance Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Performing */}
          <div className="card">
            <h3 className="text-sm font-semibold text-success-700 mb-3">🎯 Top Performing Chapters</h3>
            <div className="space-y-2">
              {chapterPerformance
                .sort((a, b) => b.accuracy - a.accuracy)
                .slice(0, 3)
                .map((chapter, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{chapter.chapter}</span>
                    <span className="font-semibold text-success-600">{chapter.accuracy.toFixed(1)}%</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Needs Attention */}
          <div className="card">
            <h3 className="text-sm font-semibold text-danger-700 mb-3">⚠️ Needs Attention</h3>
            <div className="space-y-2">
              {chapterPerformance
                .filter(c => c.accuracy < 60)
                .sort((a, b) => a.accuracy - b.accuracy)
                .slice(0, 3)
                .map((chapter, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{chapter.chapter}</span>
                    <span className="font-semibold text-danger-600">{chapter.accuracy.toFixed(1)}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Insights Content Component with Sub-tabs
function InsightsContent({ activeSubTab, onSubTabChange }) {
  const subjectGroups = groupBySubject(chapterPerformance);
  
  // Calculate insights from question type data
  const sortedByAccuracy = [...questionTypeAnalysis].sort((a, b) => a.accuracy - b.accuracy);
  const weakest = sortedByAccuracy[0];
  const secondWeakest = sortedByAccuracy[1];
  const strongest = sortedByAccuracy[sortedByAccuracy.length - 1];

  return (
    <div className="space-y-6">

      {/* Chapter-wise View */}
      {activeSubTab === 'chapter' && (
        <div className="space-y-8">
          {/* AI Insights for Chapter-wise */}
          <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🤖</span>
              <h3 className="subsection-title text-indigo-900">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {chapterPerformance.filter(c => c.accuracy < 55).length > 0 && (
                <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                  <span className="text-danger-600 mt-0.5">⚠️</span>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{chapterPerformance.filter(c => c.accuracy < 55).length} chapters</span> need immediate attention. 
                    Consider scheduling revision sessions for <span className="font-medium text-danger-700">
                    {chapterPerformance.filter(c => c.accuracy < 55).slice(0, 2).map(c => c.chapter).join(' and ')}</span>.
                  </p>
                </div>
              )}
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <span className="text-primary-600 mt-0.5">💡</span>
                <p className="text-sm text-gray-700">
                  Based on performance trends, focus teaching effort on chapters with <span className="font-medium">negative trends</span>. 
                  Consider peer learning sessions where students strong in one chapter help others.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <span className="text-success-600 mt-0.5">✨</span>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-success-700">{chapterPerformance.filter(c => c.accuracy >= 70).length} chapters</span> are performing well. 
                  Maintain current teaching approach for these topics.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter Performance Bar Chart */}
          <ChapterBarChart data={chapterPerformance} />

          {/* Chapter Details */}
          <div className="space-y-3">
            <h2 className="section-title">Chapter Details</h2>
            {[...chapterPerformance].sort((a, b) => a.accuracy - b.accuracy).map((chapter) => (
              <ChapterAccordion
                key={chapter.chapter}
                chapter={chapter.chapter}
                topics={topicBreakdown[chapter.chapter] || []}
              />
            ))}
          </div>
        </div>
      )}

      {/* Topic-wise View - Flat ranked list by performance */}
      {activeSubTab === 'topic' && (() => {
        // Flatten all topics with chapter info and sort by accuracy
        const allTopics = Object.entries(topicBreakdown).flatMap(([chapter, topics]) =>
          topics.map(t => ({ ...t, chapter }))
        ).sort((a, b) => a.accuracy - b.accuracy);
        
        const strugglingTopics = allTopics.filter(t => t.accuracy < 55);
        const averageTopics = allTopics.filter(t => t.accuracy >= 55 && t.accuracy < 70);
        const strongTopics = allTopics.filter(t => t.accuracy >= 70).reverse();
        
        const TopicCard = ({ t, colorClass, textColor }) => (
          <div className={`p-3 rounded-lg border ${colorClass} transition-all duration-200 hover:scale-[1.01]`}>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 leading-tight">
                {t.topic}
              </h4>
              
              <div className="flex items-center gap-6 pt-2 border-t border-black/5">
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Accuracy</div>
                  <div className={`text-base font-bold ${textColor}`}>
                    {t.accuracy}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Trend</div>
                  <span className={t.trend >= 0 ? 'text-success-600 font-medium' : 'text-danger-600 font-medium'}>
                    {t.trend >= 0 ? '↑' : '↓'} {Math.abs(t.trend)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

        return (
          <div className="space-y-6">
            {/* AI Insights for Topic-wise */}
            <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🤖</span>
                <h3 className="subsection-title text-indigo-900">AI Insights</h3>
              </div>
              <div className="space-y-3">
                {strugglingTopics.length > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                    <span className="text-danger-600 mt-0.5">🎯</span>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Priority Focus:</span> Start with <span className="font-medium text-danger-700">
                      {strugglingTopics.slice(0, 2).map(t => t.topic).join(' and ')}</span> as they have the lowest accuracy.
                      These topics are blocking overall chapter performance.
                    </p>
                  </div>
                )}
                <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                  <span className="text-primary-600 mt-0.5">📊</span>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{strongTopics.length} topics</span> are performing well. 
                    Use these as confidence builders before tackling harder topics in the same chapter.
                  </p>
                </div>
                {strugglingTopics.filter(t => t.trend < -10).length > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                    <span className="text-warning-600 mt-0.5">📉</span>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{strugglingTopics.filter(t => t.trend < -10).length} topics</span> show declining trends (&gt;10% drop). 
                      Consider concept reinforcement sessions before the next assessment.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card text-center bg-red-50 border border-red-200">
                <div className="text-2xl font-bold text-red-600">{strugglingTopics.length}</div>
                <div className="text-sm text-red-800 font-semibold">Struggling</div>
                <div className="text-xs text-gray-500">&lt;55% accuracy</div>
              </div>
              <div className="card text-center bg-amber-50 border border-amber-200">
                <div className="text-2xl font-bold text-amber-600">{averageTopics.length}</div>
                <div className="text-sm text-amber-800 font-semibold">Average</div>
                <div className="text-xs text-gray-500">55-70% accuracy</div>
              </div>
              <div className="card text-center bg-green-50 border border-green-200">
                <div className="text-2xl font-bold text-green-600">{strongTopics.length}</div>
                <div className="text-sm text-green-800 font-semibold">Strong</div>
                <div className="text-xs text-gray-500">&gt;70% accuracy</div>
              </div>
            </div>

            {/* Struggling Topics */}
            {strugglingTopics.length > 0 && (
              <div className="card">
                <h3 className="subsection-title flex items-center gap-2">
                  <span className="w-3 h-3 bg-danger-500 rounded-full"></span>
                  Struggling Topics ({strugglingTopics.length})
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-4">
                  Topics with accuracy below 55% - needs immediate attention
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strugglingTopics.map((t, idx) => (
                    <TopicCard key={idx} t={t} colorClass="bg-danger-50 border-danger-200" textColor="text-danger-700" />
                  ))}
                </div>
              </div>
            )}

            {/* Average Topics */}
            {averageTopics.length > 0 && (
              <div className="card">
                <h3 className="subsection-title flex items-center gap-2">
                  <span className="w-3 h-3 bg-warning-500 rounded-full"></span>
                  Average Topics ({averageTopics.length})
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-4">
                  Topics with 55-70% accuracy - room for improvement
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {averageTopics.map((t, idx) => (
                    <TopicCard key={idx} t={t} colorClass="bg-warning-50 border-warning-200" textColor="text-warning-700" />
                  ))}
                </div>
              </div>
            )}

            {/* Strong Topics */}
            {strongTopics.length > 0 && (
              <div className="card">
                <h3 className="subsection-title flex items-center gap-2">
                  <span className="w-3 h-3 bg-success-500 rounded-full"></span>
                  Strong Topics ({strongTopics.length})
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-4">
                  Topics with over 70% accuracy - performing well
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strongTopics.map((t, idx) => (
                    <TopicCard key={idx} t={t} colorClass="bg-success-50 border-success-200" textColor="text-success-700" />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Question Type View */}
      {activeSubTab === 'question-type' && (
        <div className="space-y-8">
          {/* AI Insights for Question Type */}
          <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🤖</span>
              <h3 className="subsection-title text-indigo-900">AI Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <span className="text-danger-600 mt-0.5">⚠️</span>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-danger-700">{weakest.type}</span> ({weakest.fullName}) has the lowest accuracy at <span className="font-medium">{weakest.accuracy}%</span>. 
                  Consider dedicated practice sessions focusing on this question format.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <span className="text-warning-600 mt-0.5">👀</span>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-warning-700">{secondWeakest.type}</span> at <span className="font-medium">{secondWeakest.accuracy}%</span> accuracy is also below target. 
                  Focus on time management strategies for this question type.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <span className="text-success-600 mt-0.5">✨</span>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-success-700">{strongest.type}</span> shows excellent performance at <span className="font-medium">{strongest.accuracy}%</span>. 
                  Students are confident with this format - use similar approach for other types.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                <span className="text-primary-600 mt-0.5">💡</span>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Strategy Tip:</span> Practice mixed question sets to improve adaptability between different question formats during exams.
                </p>
              </div>
            </div>
          </div>

          {/* Question Type Breakdown */}
          <QuestionTypeBreakdown data={questionTypeAnalysis} />
        </div>
      )}
    </div>
  );
}

// Strategy & Focus Content Component (Merged)
function StrategyAndFocusContent() {
  const HIGH_TIME_THRESHOLD = 90; // seconds
  
  // Accuracy-based filters
  const strugglingChapters = chapterPerformance.filter(c => c.accuracy < 70);
  const criticalTopics = Object.values(topicBreakdown).flat().filter(t => t.accuracy < 70);
  const problemQuestionTypes = questionTypeAnalysis.filter(t => t.accuracy < 70);
  
  // Time-based filters
  const timeIntensiveChapters = chapterPerformance.filter(c => c.timeSpent > HIGH_TIME_THRESHOLD);
  const slowTopics = Object.values(topicBreakdown).flat().filter(t => t.timeSpent > HIGH_TIME_THRESHOLD);

  return (
    <div className="space-y-8">
      {/* 1. Struggling Chapters */}
      <div className="card border-l-4 border-l-red-500 bg-gradient-to-r from-red-50/50 to-white">
        <h3 className="subsection-title text-red-800 flex items-center gap-2 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-red-600" />
          </div>
          Struggling Chapters
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Focus on these chapters where students have low accuracy (&lt; 70%).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strugglingChapters.map((chapter, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-12 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div>
                  <h4 className="font-bold text-gray-900">{chapter.chapter}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{chapter.difficulty} Difficulty</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-red-50 text-red-700 text-sm font-bold rounded-lg border border-red-100">
                {chapter.accuracy}% Accuracy
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Critical Topics */}
      <div className="card border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50/50 to-white">
        <h3 className="subsection-title text-amber-800 flex items-center gap-2 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Target className="w-5 h-5 text-amber-600" />
          </div>
          Critical Topics
        </h3>
        <div className="flex flex-wrap gap-3">
          {criticalTopics.map((topic, idx) => (
            <div key={idx} className="pl-3 pr-4 py-2 bg-white border border-amber-200 rounded-lg shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm">{topic.topic}</span>
                <span className="text-xs font-bold text-amber-600">
                  {topic.accuracy}% Accuracy
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Problematic Question Types */}
      <div className="card border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-white">
        <h3 className="subsection-title text-blue-800 flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileQuestion className="w-5 h-5 text-blue-600" />
          </div>
          Problematic Question Types
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {problemQuestionTypes.map((type, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-100">
                {type.type.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">{type.fullName}</div>
                <div className="mt-1">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-100">
                    {type.accuracy}% Accuracy
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Time-Intensive Chapters */}
      <div className="card border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-white">
        <h3 className="subsection-title text-purple-800 flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-purple-600" />
          </div>
          Time-Intensive Chapters
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Chapters where students spend more than 1.5 minutes on average per question. Consider additional practice or concept clarity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeIntensiveChapters.length > 0 ? timeIntensiveChapters.map((chapter, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-12 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div>
                  <h4 className="font-bold text-gray-900">{chapter.chapter}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{chapter.accuracy}% Accuracy</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-bold rounded-lg border border-purple-100">
                ⏱ {chapter.timeSpent}s avg
              </span>
            </div>
          )) : (
            <p className="text-sm text-gray-500 col-span-2">All chapters are within acceptable time limits.</p>
          )}
        </div>
      </div>

      {/* 5. Slow Topics */}
      <div className="card border-l-4 border-l-pink-500 bg-gradient-to-r from-pink-50/50 to-white">
        <h3 className="subsection-title text-pink-800 flex items-center gap-2 mb-4">
          <div className="p-2 bg-pink-100 rounded-lg">
            <Target className="w-5 h-5 text-pink-600" />
          </div>
          Slow Topics
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Topics where students take longer than expected. May need better explanations or more examples.
        </p>
        <div className="flex flex-wrap gap-3">
          {slowTopics.length > 0 ? slowTopics.map((topic, idx) => (
            <div key={idx} className="pl-3 pr-4 py-2 bg-white border border-pink-200 rounded-lg shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-200 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm">{topic.topic}</span>
                <span className="text-xs font-bold text-pink-600">
                  ⏱ {topic.timeSpent}s avg
                </span>
              </div>
            </div>
          )) : (
            <p className="text-sm text-gray-500">All topics are within acceptable time limits.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// AI Assistant Content Component
function AIAssistantContent() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <MessageSquare className="w-10 h-10 text-primary-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Assistant</h2>
      <p className="text-lg text-primary-600 font-medium mb-4">Coming Soon!</p>
      <p className="text-sm text-gray-500 text-center max-w-md">
        Our AI-powered teaching assistant will help you analyze student performance, 
        suggest teaching strategies, and provide personalized insights based on your batch data.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <span className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
          Performance Analysis
        </span>
        <span className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
          Teaching Strategies
        </span>
        <span className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
          Test Planning
        </span>
      </div>
    </div>
  );
}

// Filter options
const branches = ['JP001', 'DL002', 'MU003', 'BG004', 'CH005'];
const classes = ['6', '7', '8', '9', '10', '11', '12'];
const batches = ['B1 - Morning', 'B2 - Afternoon', 'B3 - Evening', 'B4 - Weekend', 'B5 - Online'];
const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

// Main Falcon Page Component
export default function FalconPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  
  // Filter states
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [selectedClass, setSelectedClass] = useState(classes[5]); // Default to Class 11
  const [selectedBatch, setSelectedBatch] = useState(batches[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [openDropdown, setOpenDropdown] = useState(null); // null, 'branch', 'class', 'batch', 'subject'
  
  const [insightSubTab, setInsightSubTab] = useState('chapter');
  const [isAIPopupOpen, setIsAIPopupOpen] = useState(false);

  const handleInsightSubTabChange = (subTab) => {
    setInsightSubTab(subTab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent selectedBranch={selectedBranch} selectedClass={selectedClass} selectedBatch={selectedBatch} selectedSubject={selectedSubject} />;
      case 'insights':
        return <InsightsContent activeSubTab={insightSubTab} onSubTabChange={handleInsightSubTabChange} />;
      case 'strategy-focus':
        return <StrategyAndFocusContent />;
      default:
        return <OverviewContent selectedBranch={selectedBranch} selectedClass={selectedClass} selectedBatch={selectedBatch} selectedSubject={selectedSubject} />;
    }
  };

  // Get current tab name for header
  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Overview';
      case 'insights': return 'Insights';
      case 'strategy-focus': return 'Strategy & Focus';
      default: return 'Overview';
    }
  };

  return (
    <div>
      {/* Header with Filter Dropdowns */}
      <div className="fixed top-14 sm:top-16 left-0 right-0 md:left-64 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Current Tab Title + Insights Sub-Tabs */}
            <div className="flex items-center gap-6">
              <h1 className="text-lg font-bold text-gray-900">{getTabTitle()}</h1>
              
              {/* Insights Sub-Tabs */}
              {activeTab === 'insights' && (
                <nav className="flex items-center gap-1">
                  {insightSubTabs.map((subTab) => (
                    <button
                      key={subTab.id}
                      onClick={() => handleInsightSubTabChange(subTab.id)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        insightSubTab === subTab.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                      }`}
                    >
                      {subTab.name}
                    </button>
                  ))}
                </nav>
              )}
            </div>
            
            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2 relative z-50">
              {/* Branch Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'branch' ? null : 'branch')}
                  title="Select Branch"
                  className="flex items-center gap-2 pl-3 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  {selectedBranch}
                  <ChevronDown className={`absolute right-2 w-3 h-3 text-gray-500 transition-transform ${openDropdown === 'branch' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'branch' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 min-w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1 max-h-48 overflow-y-auto">
                      {branches.map((branch) => (
                        <button
                          key={branch}
                          onClick={() => { setSelectedBranch(branch); setOpenDropdown(null); }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 ${selectedBranch === branch ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}`}
                        >
                          {branch}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Class Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'class' ? null : 'class')}
                  title="Select Class"
                  className="flex items-center gap-2 pl-3 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  Class {selectedClass}
                  <ChevronDown className={`absolute right-2 w-3 h-3 text-gray-500 transition-transform ${openDropdown === 'class' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'class' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 min-w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1 max-h-48 overflow-y-auto">
                      {classes.map((cls) => (
                        <button
                          key={cls}
                          onClick={() => { setSelectedClass(cls); setOpenDropdown(null); }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 ${selectedClass === cls ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}`}
                        >
                          Class {cls}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Batch Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'batch' ? null : 'batch')}
                  title="Select Batch"
                  className="flex items-center gap-2 pl-3 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  {selectedBatch}
                  <ChevronDown className={`absolute right-2 w-3 h-3 text-gray-500 transition-transform ${openDropdown === 'batch' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'batch' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 min-w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1 max-h-48 overflow-y-auto">
                      {batches.map((batch) => (
                        <button
                          key={batch}
                          onClick={() => { setSelectedBatch(batch); setOpenDropdown(null); }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 whitespace-nowrap ${selectedBatch === batch ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}`}
                        >
                          {batch}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Subject Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'subject' ? null : 'subject')}
                  title="Select Subject"
                  className="flex items-center gap-2 pl-3 pr-7 py-1.5 bg-primary-50 border border-primary-200 rounded-lg text-xs font-medium text-primary-700 hover:bg-primary-100"
                >
                  {selectedSubject}
                  <ChevronDown className={`absolute right-2 w-3 h-3 text-primary-600 transition-transform ${openDropdown === 'subject' ? 'rotate-180' : ''}`} />
                </button>
                {openDropdown === 'subject' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                    <div className="absolute left-0 top-full mt-1 min-w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1 max-h-48 overflow-y-auto">
                      {subjects.map((subject) => (
                        <button
                          key={subject}
                          onClick={() => { setSelectedSubject(subject); setOpenDropdown(null); }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 ${selectedSubject === subject ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-14">
        {renderContent()}
      </div>

      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setIsAIPopupOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group"
        title="AI Assistant"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* AI Assistant Popup */}
      {isAIPopupOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={() => setIsAIPopupOpen(false)}
          />
          <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">AI Assistant</h3>
                    <p className="text-xs text-white/80">Powered by AI</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAIPopupOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Coming Soon!</h4>
              <p className="text-sm text-gray-500 mb-4">
                Our AI-powered teaching assistant will help you analyze student performance and suggest strategies.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                  Performance Analysis
                </span>
                <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                  Smart Suggestions
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
