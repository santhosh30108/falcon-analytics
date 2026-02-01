import { getAlertIcon } from '@/utils/utils'

export default function AlertCard({ alert }) {
    const colorClasses = {
        critical: 'border-danger-200 bg-danger-50',
        warning: 'border-warning-200 bg-warning-50',
        info: 'border-primary-200 bg-primary-50',
    }

    const textColorClasses = {
        critical: 'text-danger-800',
        warning: 'text-warning-800',
        info: 'text-primary-800',
    }

    const badgeClasses = {
        critical: 'badge-danger',
        warning: 'badge-warning',
        info: 'badge-primary',
    }

    return (
        <div
            className={`border-l-4 rounded-xl shadow-sm overflow-hidden p-4 sm:p-5 ${colorClasses[alert.type]}`}
        >
            <div className="flex items-start gap-3">
                <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.type)}
                </span>
                <div className="flex-1 min-w-0">
                    <p
                        className={`text-sm sm:text-base font-medium ${textColorClasses[alert.type]}`}
                    >
                        {alert.message}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span
                            className={`badge rounded-md px-2.5 py-0.5 ${badgeClasses[alert.type]}`}
                        >
                            {alert.subject}
                        </span>
                        <span className="text-xs text-gray-600">
                            {alert.chapter}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

