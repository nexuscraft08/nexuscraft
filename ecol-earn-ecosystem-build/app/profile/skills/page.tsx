'use client';

import { useState } from 'react';
import { ProfileLayout } from '@/components/profile/ProfileLayout';
import { SkillCard } from '@/components/profile/SkillCard';
import { skills } from '@/lib/mock-data';
import { Plus, Search } from 'lucide-react';

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group skills by category
  const categories = [...new Set(skills.map((s) => s.category))];
  
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ProfileLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Skills</h1>
          <p className="text-muted-foreground">
            Manage your skills, proficiency levels, and get recommendations
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
            <Plus className="h-5 w-5" />
            Add Skill
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            All Skills
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No skills found</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
              Add your first skill
            </button>
          </div>
        )}

        {/* Skill Gap Analysis */}
        <section className="mt-12 bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recommended Skills</h2>
          <p className="text-muted-foreground mb-4">
            Based on your profile, here are skills that would complement your expertise:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['Kubernetes', 'GraphQL', 'Rust', 'Scala'].map((skill) => (
              <div
                key={skill}
                className="p-3 bg-muted/30 border border-border rounded-lg flex items-center justify-between group hover:border-primary/50 transition-colors"
              >
                <span className="font-medium text-foreground">{skill}</span>
                <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Add
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ProfileLayout>
  );
}
