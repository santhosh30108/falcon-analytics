'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, LogOut, ChevronDown, Menu } from 'lucide-react';

export default function TopBar({ onToggleSidebar }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setShowDropdown(false);
      router.push('/login');
    }
  };

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

        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
          Faculty Dashboard
        </h2>
      </div>

      {/* Right side - Profile Dropdown */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
            RK
          </div>
          {/* Hide text on mobile, show on tablet+ */}
          <div className="hidden sm:block text-left min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[120px] md:max-w-none">
              Dr. Rajesh Kumar
            </p>
            <p className="text-xs text-gray-500 truncate max-w-[120px] md:max-w-none">
              Physics Faculty
            </p>
          </div>
          <ChevronDown className={`hidden sm:block w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            
            {/* Dropdown - Responsive width and positioning */}
            <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-64 max-w-[320px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">Dr. Rajesh Kumar</p>
                <p className="text-xs text-gray-500 mt-1 truncate">rajesh.kumar@institute.edu</p>
              </div>
              
              <Link
                href="/profile"
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors duration-200"
              >
                <User className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">View Profile</p>
                  <p className="text-xs text-gray-500">Manage your account</p>
                </div>
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-danger-50 transition-colors duration-200 text-left border-t border-gray-100"
              >
                <LogOut className="w-5 h-5 text-danger-600 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-danger-700">Logout</p>
                  <p className="text-xs text-danger-600">Sign out of your account</p>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
