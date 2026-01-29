'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { BarChart3, Home, ChartBar, Target, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const falconSubItems = [
  { id: 'overview', name: 'Overview', icon: Home },
  { id: 'insights', name: 'Insights', icon: ChartBar },
  { id: 'strategy-focus', name: 'Strategy & Focus', icon: Target },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';
  const [isFalconExpanded, setIsFalconExpanded] = useState(true);

  const isFalconActive = pathname === '/falcon' || pathname === '/';

  const sidebarContent = (
    <div className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex justify-center">
        <Image
          src="/images/aakash-logo-dark.png"
          alt="Aakash Logo"
          width={150}
          height={40}
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Falcon Menu Item with Sub-items */}
        <div>
          <button
            onClick={() => setIsFalconExpanded(!isFalconExpanded)}
            className={`
              w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${
                isFalconActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5" />
              <span>Falcon</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFalconExpanded ? 'rotate-180' : ''}`} />
          </button>

          {/* Sub-items */}
          {isFalconExpanded && (
            <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-100 space-y-1">
              {falconSubItems.map((item) => {
                const Icon = item.icon;
                const isSubActive = isFalconActive && currentTab === item.id;

                return (
                  <Link
                    key={item.id}
                    href={`/falcon?tab=${item.id}`}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        isSubActive
                          ? 'bg-primary-100 text-primary-800 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-64">
        {sidebarContent}
      </div>

      {/* Mobile sidebar + backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40"
            aria-hidden="true"
            onClick={onClose}
          />
          {/* Panel */}
          <div className="relative z-50 h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
