'use client';

import { useState } from 'react';
import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { connections } from '@/lib/mock-data';
import Image from 'next/image';
import { Search, UserPlus, Users } from 'lucide-react';

export default function ConnectionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'following' | 'suggested'>('all');

  const following = connections.filter((c) => c.isFollowing);
  const suggested = connections.filter((c) => c.isSuggested);

  let displayed = connections;
  if (activeTab === 'following') {
    displayed = following;
  } else if (activeTab === 'suggested') {
    displayed = suggested;
  }

  const filtered = displayed.filter((conn) =>
    conn.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: connections.length,
    following: following.length,
    suggested: suggested.length,
  };

  return (
    <ProfileLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Connections</h1>
          <p className="text-muted-foreground">
            Build your network and connect with like-minded learners
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Connections</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Following</p>
            <p className="text-2xl font-bold text-primary">{stats.following}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Suggested</p>
            <p className="text-2xl font-bold text-primary">{stats.suggested}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {(['all', 'following', 'suggested'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {tab === 'all' ? 'All' : tab === 'following' ? 'Following' : 'Suggested'}
            </button>
          ))}
        </div>

        {/* Connections Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((connection) => (
              <div
                key={connection.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                {/* Avatar and Name */}
                <div className="text-center mb-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary/20">
                    <Image
                      src={connection.avatar}
                      alt={connection.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground">{connection.name}</h3>
                  <p className="text-sm text-muted-foreground">{connection.title}</p>
                </div>

                {/* Mutual Connections */}
                <div className="flex items-center justify-center gap-1 mb-4 px-3 py-2 bg-muted/50 rounded-lg">
                  <Users className="h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{connection.mutualCount}</span> mutual
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {connection.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  connection.isFollowing
                    ? 'bg-muted text-foreground hover:bg-muted/80'
                    : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}>
                  {connection.isFollowing ? 'Following' : connection.isSuggested ? 'Connect' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">
              {activeTab === 'suggested' ? 'No suggested connections' : 'No connections found'}
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
              Discover people
            </button>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
}
