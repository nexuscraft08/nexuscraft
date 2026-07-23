'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, MessageSquare, Settings, BarChart3 } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/activities', label: 'Activities', icon: MessageSquare },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-slate-900 border-r border-slate-700 p-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">ECOLearn Admin</h1>
        <p className="text-sm text-slate-400 mt-1">Content Management System</p>
      </div>

      <div className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
        <p className="text-xs text-slate-400 mb-2">Logged in as</p>
        <p className="text-sm font-medium text-white">Admin User</p>
        <Link href="/" className="text-xs text-blue-400 hover:text-blue-300 mt-2 block">
          ← Back to Profile
        </Link>
      </div>
    </nav>
  );
}
