'use client';

import { useState } from 'react';
import { updateUserProfile } from '@/app/actions/userActions';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

export function EditProfileForm({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    displayName: user.displayName || user.displayname || '',
    bio: user.bio || '',
    tagline: user.tagline || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('saving');

    try {
      const result = await updateUserProfile(user.id, formData);
      if (result.success) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('[v0] Error saving profile:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-2 p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-300">
          <CheckCircle className="h-5 w-5" />
          Profile updated successfully
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
          <AlertCircle className="h-5 w-5" />
          Failed to save changes
        </div>
      )}

      {/* Display Name */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
        <input
          type="text"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Your display name"
        />
      </div>

      {/* Tagline */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Tagline</label>
        <input
          type="text"
          name="tagline"
          value={formData.tagline}
          onChange={handleChange}
          maxLength={200}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Your professional tagline"
        />
        <p className="text-xs text-slate-500 mt-1">{formData.tagline.length}/200 characters</p>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={6}
          maxLength={500}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          placeholder="Tell us about yourself..."
        />
        <p className="text-xs text-slate-500 mt-1">{formData.bio.length}/500 characters</p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading || status === 'success'}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-blue-400 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
