import { getTrendIcon } from '@/utils/utils';

export default function TrendIndicator({ value, size = 'md' }) {
  const color = value > 0 ? 'text-success-600' : value < 0 ? 'text-danger-600' : 'text-gray-600';
  const bgColor = value > 0 ? 'bg-success-50' : value < 0 ? 'bg-danger-50' : 'bg-gray-50';
  
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded font-medium ${color} ${bgColor} ${sizeClasses[size]}`}>
      <span>{getTrendIcon(value)}</span>
      <span>{Math.abs(value)}%</span>
    </span>
  );
}
