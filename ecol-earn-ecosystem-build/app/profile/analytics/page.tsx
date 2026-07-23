'use client';

import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { analyticsData, aiInsights } from '@/lib/mock-data';
import { TrendingUp, Calendar, Target, Zap } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <ProfileLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Learning Analytics</h1>
          <p className="text-muted-foreground">
            Track your progress, insights, and learning patterns
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-xs text-green-500 font-medium">+8900</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {analyticsData.xpHistory[analyticsData.xpHistory.length - 1].xp.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-xs text-green-500 font-medium">+45m</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {analyticsData.studyTimeByDay.reduce((acc, day) => acc + day.minutes, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Weekly Study Time</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-xs text-green-500 font-medium">+5%</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {analyticsData.performanceScore}%
            </p>
            <p className="text-sm text-muted-foreground">Performance Score</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-xs text-green-500 font-medium">+3d</span>
            </div>
            <p className="text-2xl font-bold text-foreground">28</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* XP History */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">XP Progress</h2>
            <div className="space-y-4">
              {analyticsData.xpHistory.map((point, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{point.date}</span>
                    <span className="text-sm font-medium text-foreground">{point.xp.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${(point.xp / analyticsData.xpHistory[analyticsData.xpHistory.length - 1].xp) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Time By Day */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Weekly Study Time</h2>
            <div className="space-y-4">
              {analyticsData.studyTimeByDay.map((day) => (
                <div key={day.day}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{day.day}</span>
                    <span className="text-sm font-medium text-foreground">{day.minutes}m</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${Math.min((day.minutes / 200) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Progress */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Skill Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analyticsData.skillProgress.map((skill) => (
              <div key={skill.skill}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                  <span className="text-sm text-primary font-bold">{skill.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">AI Insights & Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-4 bg-muted/30 border border-border rounded-lg hover:border-primary/30 transition-colors"
              >
                <div className="flex gap-3">
                  <div className="text-2xl flex-shrink-0">{insight.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
