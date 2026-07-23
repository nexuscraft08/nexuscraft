'use client';

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { SkillCard } from '@/components/profile/SkillCard';
import { ProjectCard } from '@/components/profile/ProjectCard';
import { currentUser, skills, projects } from '@/lib/mock-data';
import Link from 'next/link';
import { Share2, QrCode } from 'lucide-react';

interface PageProps {
  params: {
    username: string;
  };
}

export default function PublicProfilePage({ params }: PageProps) {
  const topSkills = skills.slice(0, 4);
  const featuredProjects = projects.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/profile" className="font-bold text-foreground">
            ECOLearn
          </Link>
          <div className="flex gap-2">
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
              <QrCode className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-12">
        {/* Profile Header */}
        <ProfileHeader profile={currentUser} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">About</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground leading-relaxed">{currentUser.bio}</p>
              </div>
            </section>

            {/* Featured Skills */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Top Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                {topSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </section>

            {/* Featured Projects */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Featured Work</h2>
              <div className="space-y-4">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Connect Button */}
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20 space-y-4">
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Follow
              </button>
              <button className="w-full px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium">
                Send Message
              </button>

              {/* Info Card */}
              <div className="pt-4 border-t border-border space-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                  <p className="font-medium text-foreground">
                    {currentUser.joinDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="font-medium text-foreground">San Francisco, CA</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Experience</p>
                  <p className="font-medium text-foreground">{currentUser.experience.length} roles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
