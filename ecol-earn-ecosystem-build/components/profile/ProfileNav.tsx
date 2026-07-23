'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Edit3,
  Zap,
  Code,
  Award,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/profile', icon: Home },
  { name: 'Edit Profile', href: '/profile/edit', icon: Edit3 },
  { name: 'Activity', href: '/profile/activity', icon: Zap },
  { name: 'Projects', href: '/profile/projects', icon: Code },
  { name: 'Skills', href: '/profile/skills', icon: Award },
  { name: 'Certificates', href: '/profile/certificates', icon: Award },
  { name: 'Connections', href: '/profile/connections', icon: Users },
  { name: 'Analytics', href: '/profile/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/profile/settings', icon: Settings },
];

export function ProfileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card p-6 flex flex-col overflow-y-auto">
      {/* Logo/Brand */}
      <Link href="/profile" className="mb-12 flex items-center gap-2">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold">EC</span>
        </div>
        <span className="font-bold text-foreground">ECOLearn</span>
      </Link>

      {/* Navigation Items */}
      <div className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors w-full">
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </nav>
  );
}
