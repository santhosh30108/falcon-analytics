// Utility functions for Falcon Dashboard

export function getPerformanceColor(accuracy) {
  if (accuracy >= 70) return 'success';
  if (accuracy >= 55) return 'warning';
  return 'danger';
}

export function getPerformanceColorClass(accuracy) {
  if (accuracy >= 70) return 'text-success-600 bg-success-50';
  if (accuracy >= 55) return 'text-warning-600 bg-warning-50';
  return 'text-danger-600 bg-danger-50';
}

export function getTrendColor(trend) {
  if (trend > 0) return 'success';
  if (trend < 0) return 'danger';
  return 'gray';
}

export function getTrendIcon(trend) {
  if (trend > 0) return '↑';
  if (trend < 0) return '↓';
  return '→';
}

export function formatPercentage(value, decimals = 1) {
  const num = Number(value);
  return Number.isFinite(num) ? `${num.toFixed(decimals)}%` : '—%';
}

export function formatScore(value) {
  return value.toFixed(1);
}

export function getPriorityColor(priority) {
  switch (priority) {
    case 'Urgent':
      return 'danger';
    case 'High':
      return 'warning';
    case 'Medium':
      return 'primary';
    default:
      return 'gray';
  }
}

export function getWeightageColor(weightage) {
  switch (weightage) {
    case 'High':
      return 'danger';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'success';
    default:
      return 'gray';
  }
}

export function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'Hard':
      return 'danger';
    case 'Medium':
      return 'warning';
    case 'Easy':
      return 'success';
    default:
      return 'gray';
  }
}

export function getAlertIcon(type) {
  switch (type) {
    case 'critical':
      return '⚠️';
    case 'warning':
      return '⚡';
    case 'info':
      return 'ℹ️';
    default:
      return '•';
  }
}

export function getAlertColor(type) {
  switch (type) {
    case 'critical':
      return 'danger';
    case 'warning':
      return 'warning';
    case 'info':
      return 'primary';
    default:
      return 'gray';
  }
}

export function groupBySubject(data) {
  return data.reduce((acc, item) => {
    if (!acc[item.subject]) {
      acc[item.subject] = [];
    }
    acc[item.subject].push(item);
    return acc;
  }, {});
}

export function calculateAverage(values) {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

export function sortByAccuracy(data, ascending = true) {
  return [...data].sort((a, b) => {
    return ascending ? a.accuracy - b.accuracy : b.accuracy - a.accuracy;
  });
}

export function filterByThreshold(data, threshold, key = 'accuracy') {
  return data.filter(item => item[key] < threshold);
}

// Chart bar colors based on accuracy thresholds
export function getBarColor(accuracy) {
  if (accuracy >= 70) return '#22c55e'; // green
  if (accuracy >= 55) return '#f59e0b'; // amber
  return '#ef4444'; // red
}
