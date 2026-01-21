'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart3,
  FileQuestion,
  ClipboardList,
  Target,
  MessageSquare,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Chapter Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Question Analysis', href: '/questions', icon: FileQuestion },
  { name: 'Test Strategy', href: '/test-strategy', icon: ClipboardList },
  { name: 'Teaching Focus', href: '/teaching-focus', icon: Target },
  { name: 'AI Assistant', href: '/ai-chat', icon: MessageSquare },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600">Falcon</h1>
        <p className="text-xs text-gray-500 mt-1">
          Faculty Analytics & Learning Console
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
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
