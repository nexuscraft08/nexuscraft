'use client';

import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { SkillCard } from '@/components/profile/SkillCard';
import { ProjectCard } from '@/components/profile/ProjectCard';
import { AIChatPanel } from '@/components/profile/AIChatPanel';
import { currentUser, skills, projects, activityFeed, aiInsights } from '@/lib/mock-data';
import { Award, Code, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProfileDashboard() {
  const topSkills = skills.slice(0, 6);
  const featuredProjects = projects.slice(0, 3);
  const recentActivity = activityFeed.slice(0, 5);

  return (
    <ProfileLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ProfileHeader profile={currentUser} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-xs text-green-500 font-medium">+12%</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {currentUser.totalXp.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-xs text-green-500 font-medium">+2</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {skills.length}
                </p>
                <p className="text-sm text-muted-foreground">Skills Mastered</p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="text-xs text-green-500 font-medium">+1</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {projects.length}
                </p>
                <p className="text-sm text-muted-foreground">Projects Built</p>
              </div>
            </div>

            {/* Top Skills */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Top Skills</h2>
                <Link
                  href="/profile/skills"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {topSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </section>

            {/* Featured Projects */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Featured Projects</h2>
                <Link
                  href="/profile/projects"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  View All →
                </Link>
              </div>
              <div className="grid gap-4">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
                <Link
                  href="/profile/activity"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  View All →
                </Link>
              </div>
              <div className="bg-card border border-border rounded-lg divide-y divide-border">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{activity.metadata?.icon || '🎯'}</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{activity.title}</h3>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          {activity.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - AI Insights */}
          <div className="lg:col-span-1">
            <AIChatPanel insights={aiInsights} />
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
