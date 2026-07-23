'use client';

import { useState } from 'react';
import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { activityFeed } from '@/lib/mock-data';
import { Filter } from 'lucide-react';

const activityTypes = [
  { value: 'all', label: 'All Activity' },
  { value: 'course_completion', label: 'Courses' },
  { value: 'badge_unlock', label: 'Badges' },
  { value: 'project_upload', label: 'Projects' },
  { value: 'skill_endorsed', label: 'Skills' },
  { value: 'achievement', label: 'Achievements' },
];

export default function ActivityPage() {
  const [selectedType, setSelectedType] = useState('all');

  const filteredActivity = selectedType === 'all'
    ? activityFeed
    : activityFeed.filter((activity) => activity.type === selectedType);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return '🏆';
      case 'project_upload':
        return '🚀';
      case 'skill_endorsed':
        return '👍';
      case 'course_completion':
        return '✅';
      case 'badge_unlock':
        return '🎖️';
      case 'connection':
        return '🤝';
      default:
        return '📌';
    }
  };

  return (
    <ProfileLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Activity</h1>
          <p className="text-muted-foreground">
            Your learning journey and recent achievements
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-2">
            {activityTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedType === type.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-6">
          {filteredActivity.length > 0 ? (
            filteredActivity.map((activity, index) => (
              <div key={activity.id} className="relative">
                {/* Timeline Line */}
                {index < filteredActivity.length - 1 && (
                  <div className="absolute left-6 top-16 h-12 w-0.5 bg-border" />
                )}

                {/* Activity Item */}
                <div className="flex gap-4">
                  {/* Avatar Circle */}
                  <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0 text-xl">
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-card border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {activity.title}
                        </h3>
                        {activity.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.description}
                          </p>
                        )}
                        {activity.metadata && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {Object.entries(activity.metadata).map(([key, value]) => {
                              if (key === 'icon') return null;
                              return (
                                <span
                                  key={key}
                                  className="px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground"
                                >
                                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No activity found for this filter</p>
            </div>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
}
