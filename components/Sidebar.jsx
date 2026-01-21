'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, FileQuestion, ClipboardList, Target, MessageSquare } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Chapter Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Question Analysis', href: '/questions', icon: FileQuestion },
  { name: 'Test Strategy', href: '/test-strategy', icon: ClipboardList },
  { name: 'Teaching Focus', href: '/teaching-focus', icon: Target },
  { name: 'AI Assistant', href: '/ai-chat', icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600">Falcon</h1>
        <p className="text-xs text-gray-500 mt-1">Faculty Analytics & Learning Console</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
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

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p className="font-medium text-gray-700">Dr. Rajesh Kumar</p>
          <p>Physics Faculty</p>
        </div>
      </div>
    </div>
  );
}
