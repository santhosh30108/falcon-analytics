import { Menu, User } from 'lucide-react'
import { useFacultyInfo } from '@/hooks/dashboard.hooks'

export default function TopBar({ onToggleSidebar }) {
    const { data: facultyInfo } = useFacultyInfo()
    const facultyName = facultyInfo?.name || 'Loading...'

    return (
        <div className="fixed top-0 left-0 right-0 md:left-64 h-14 sm:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 z-30">
            {/* Left side */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {/* Mobile menu button */}
                <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 flex-shrink-0"
                    onClick={onToggleSidebar}
                    aria-label="Open navigation"
                >
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="flex items-baseline gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-primary-600 tracking-tight">
                        Falcon
                    </h1>
                    <span className="text-sm text-gray-300 hidden sm:inline">
                        |
                    </span>
                    <p className="text-sm text-gray-500 hidden sm:inline italic">
                        Faculty Analytics & Learning Console
                    </p>
                </div>
            </div>

            {/* Right side - Profile */}
            <div className="flex items-center gap-3">
                <p className="hidden sm:block text-sm font-medium text-gray-900">
                    {facultyName}
                </p>
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                </div>
            </div>
        </div>
    )
}

