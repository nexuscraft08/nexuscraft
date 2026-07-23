'use client';

import { useState } from 'react';
import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { Toggle } from '@/components/ui/toggle';
import { Lock, Bell, Eye, Trash2, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    profileVisibility: 'public',
    activityVisibility: 'connections',
    darkMode: true,
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ProfileLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Account Settings */}
        <section className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Account Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="alex.johnson@email.com"
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <input
                type="text"
                defaultValue="alex-johnson"
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <button className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium">
                Change Password
              </button>
            </div>
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy Controls
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Profile Visibility
              </label>
              <select
                value={settings.profileVisibility}
                onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="public">Public (Everyone can see)</option>
                <option value="connections">Connections Only</option>
                <option value="private">Private (Only you)</option>
              </select>
              <p className="text-xs text-muted-foreground mt-2">
                Control who can view your profile
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Activity Visibility
              </label>
              <select
                value={settings.activityVisibility}
                onChange={(e) => handleSelectChange('activityVisibility', e.target.value)}
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="everyone">Everyone</option>
                <option value="connections">Connections Only</option>
                <option value="private">Private</option>
              </select>
              <p className="text-xs text-muted-foreground mt-2">
                Who can see your learning activity
              </p>
            </div>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Receive emails about your learning activity
                </p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="border-t border-border pt-4" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Receive notifications on your device
                </p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings.pushNotifications ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="border-t border-border pt-4" />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Digest</p>
                <p className="text-xs text-muted-foreground">
                  Get a summary of your weekly progress
                </p>
              </div>
              <button
                onClick={() => handleToggle('weeklyDigest')}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings.weeklyDigest ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                    settings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <h2 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground font-medium mb-2">Delete Account</p>
              <p className="text-xs text-muted-foreground mb-3">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </section>

        {/* Logout */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
}
