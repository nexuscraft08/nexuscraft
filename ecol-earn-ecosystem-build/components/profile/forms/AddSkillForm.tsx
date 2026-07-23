'use client';

import { useState } from 'react';
import { addSkill } from '@/app/actions/skillActions';
import { Plus, CheckCircle, AlertCircle } from 'lucide-react';

const categories = ['Programming', 'Web Development', 'Data Science', 'Mobile', 'DevOps', 'Design', 'Cloud', 'Other'];
const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export function AddSkillForm({ userId, onSkillAdded }: { userId: string | number; onSkillAdded?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Programming',
    proficiencyLevel: 'Intermediate',
    yearsOfExperience: '1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsLoading(true);
    try {
      const result = await addSkill(userId, {
        name: formData.name,
        category: formData.category,
        proficiencyLevel: formData.proficiencyLevel.toLowerCase(),
        proficiencyPercentage: 50,
        yearsOfExperience: parseFloat(formData.yearsOfExperience),
      } as any);

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', category: 'Programming', proficiencyLevel: 'Intermediate', yearsOfExperience: '1' });
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
          onSkillAdded?.();
        }, 1500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Skill
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-white mb-4">Add New Skill</h2>

        {status === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-900/30 border border-green-700 rounded-lg text-green-300 mb-4">
            <CheckCircle className="h-4 w-4" />
            Skill added successfully
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 mb-4">
            <AlertCircle className="h-4 w-4" />
            Failed to add skill
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Skill Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Skill Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              placeholder="e.g., React, Python, AWS"
              disabled={isLoading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              disabled={isLoading}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Proficiency Level */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Proficiency Level</label>
            <select
              name="proficiencyLevel"
              value={formData.proficiencyLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              disabled={isLoading}
            >
              {proficiencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              min="0"
              step="0.5"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              disabled={isLoading}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading || !formData.name}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Adding...' : 'Add Skill'}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
