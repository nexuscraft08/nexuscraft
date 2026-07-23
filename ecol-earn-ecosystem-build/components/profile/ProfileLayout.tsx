'use client';

import { ProfileNav } from './ProfileNav';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <ProfileNav />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
