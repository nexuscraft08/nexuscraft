import Link from 'next/link';
import Image from 'next/image';
import type { UserProfile } from '@/lib/types';
import { Flame, Star, Share2 } from 'lucide-react';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="mb-8">
      {/* Cover Image */}
      <div className="relative h-48 -mx-8 mb-6 overflow-hidden rounded-lg">
        <Image
          src={profile.coverImage}
          alt="Cover"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Info with Avatar Overlap */}
      <div className="flex items-start justify-between -mt-16 px-8 pb-8">
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="relative h-32 w-32 rounded-lg overflow-hidden border-4 border-card bg-muted flex-shrink-0">
            <Image
              src={profile.avatar}
              alt={profile.displayName}
              fill
              className="object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="pt-4">
            <div className="mb-2">
              <h1 className="text-3xl font-bold text-foreground">
                {profile.displayName}
              </h1>
              <p className="text-lg text-muted-foreground">{profile.tagline}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <div>
                <div className="text-2xl font-bold text-primary">
                  Level {profile.level}
                </div>
                <div className="text-sm text-muted-foreground">
                  {profile.xp.toLocaleString()} XP
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {profile.streak}
                  </div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <Link
            href="/profile/edit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>

      {/* Bio */}
      <div className="px-8 py-4 bg-muted/30 rounded-lg border border-border">
        <p className="text-foreground leading-relaxed">{profile.bio}</p>
      </div>
    </div>
  );
}
