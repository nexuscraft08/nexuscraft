'use client';

import { useState } from 'react';
import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { currentUser } from '@/lib/mock-data';
import { Save, Check } from 'lucide-react';
import Image from 'next/image';

export default function EditProfilePage() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    displayName: currentUser.displayName,
    tagline: currentUser.tagline,
    bio: currentUser.bio,
    avatar: currentUser.avatar,
    coverImage: currentUser.coverImage,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ProfileLayout>
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Edit Profile</h1>
          <p className="text-muted-foreground">
            Update your profile information and personalization settings
          </p>
        </div>

        {/* Form */}
        <form className="space-y-8">
          {/* Cover Image Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Cover Image</h2>
            <div className="relative h-40 rounded-lg overflow-hidden bg-muted border-2 border-dashed border-border hover:border-primary/50 transition-colors">
              <Image
                src={formData.coverImage}
                alt="Cover"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
            >
              Change Cover Image
            </button>
          </div>

          {/* Avatar Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Profile Picture</h2>
            <div className="flex items-end gap-6">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden border-2 border-border">
                <Image
                  src={formData.avatar}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                Upload Photo
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                  placeholder="What do you do?"
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {formData.bio.length}/500 characters
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Social Links</h2>
            <div className="space-y-4">
              {['GitHub', 'LinkedIn', 'Twitter', 'Portfolio'].map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {platform}
                  </label>
                  <input
                    type="url"
                    placeholder={`Your ${platform} URL`}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              {saved ? (
                <>
                  <Check className="h-5 w-5" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </ProfileLayout>
  );
}
