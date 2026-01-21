import { getAlertIcon, getAlertColor } from '@/utils/utils';

export default function AlertCard({ alert }) {
  const colorClasses = {
    critical: 'border-danger-200 bg-danger-50',
    warning: 'border-warning-200 bg-warning-50',
    info: 'border-primary-200 bg-primary-50',
  };

  const textColorClasses = {
    critical: 'text-danger-800',
    warning: 'text-warning-800',
    info: 'text-primary-800',
  };

  const badgeClasses = {
    critical: 'badge-danger',
    warning: 'badge-warning',
    info: 'badge-primary',
  };

  return (
    <div className={`border-l-4 p-4 rounded-r-lg ${colorClasses[alert.type]}`}>
      <div className="flex items-start gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl flex-shrink-0">{getAlertIcon(alert.type)}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm sm:text-base font-medium ${textColorClasses[alert.type]}`}>
            {alert.message}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`badge ${badgeClasses[alert.type]}`}>
              {alert.subject}
            </span>
            <span className="text-xs text-gray-600">
              {alert.chapter}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
