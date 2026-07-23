import type { AIInsight, UserProfile, Skill } from './types';

/**
 * Generate personalized AI insights based on user profile and skills
 * This is a mock implementation - ready for real API integration
 */
export function generatePersonalizedInsights(
  profile: UserProfile,
  skills: Skill[]
): AIInsight[] {
  const insights: AIInsight[] = [];

  // Skill gap detection
  const skillNames = skills.map((s) => s.name.toLowerCase());
  if (!skillNames.includes('kubernetes') && skillNames.includes('docker')) {
    insights.push({
      id: 'gap-1',
      type: 'gap_analysis',
      title: 'Learn Kubernetes Next',
      description: 'You&apos;ve mastered Docker. Kubernetes is the natural next step.',
      icon: '🐳',
    });
  }

  // Career path suggestions
  const avgProficiency = skills.reduce((acc, s) => acc + s.proficiency, 0) / skills.length;
  if (avgProficiency > 80) {
    insights.push({
      id: 'career-1',
      type: 'career_path',
      title: 'Senior Engineer Path Available',
      description: `With an average skill proficiency of ${Math.round(avgProficiency)}%, you&apos;re ready for senior roles.`,
      icon: '📈',
    });
  }

  // Learning recommendations based on level
  if (profile.level > 10) {
    insights.push({
      id: 'rec-1',
      type: 'recommendation',
      title: 'Advanced Topics Unlocked',
      description: 'You&apos;ve reached level 10+. Consider exploring system design and architecture.',
      icon: '🏗️',
    });
  }

  // Streak motivation
  if (profile.streak > 20) {
    insights.push({
      id: 'ach-1',
      type: 'achievement',
      title: `${profile.streak}-Day Streak! 🔥`,
      description: 'You&apos;re crushing it! Keep the momentum going.',
      icon: '🔥',
    });
  }

  return insights;
}

/**
 * Calculate learning velocity and trends
 */
export function calculateLearningVelocity(
  xpHistory: { date: string; xp: number }[]
): { trend: 'up' | 'down' | 'stable'; velocity: number } {
  if (xpHistory.length < 2) {
    return { trend: 'stable', velocity: 0 };
  }

  const firstHalf = xpHistory.slice(0, Math.ceil(xpHistory.length / 2));
  const secondHalf = xpHistory.slice(Math.ceil(xpHistory.length / 2));

  const firstAvg = firstHalf.reduce((acc, d) => acc + d.xp, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((acc, d) => acc + d.xp, 0) / secondHalf.length;

  const velocity = secondAvg - firstAvg;
  const trend = velocity > 500 ? 'up' : velocity < -500 ? 'down' : 'stable';

  return { trend, velocity: Math.round(velocity) };
}

/**
 * Suggest skills based on user profile and learning history
 */
export function suggestSkills(currentSkills: Skill[], profile: UserProfile): string[] {
  const suggestions: string[] = [];
  const currentSkillNames = currentSkills.map((s) => s.name.toLowerCase());

  // Skill clusters - skills that complement each other
  const skillClusters: Record<string, string[]> = {
    'Frontend Master': ['React', 'Vue', 'Svelte', 'Next.js', 'Nuxt'],
    'Backend Master': ['Node.js', 'Express', 'Django', 'FastAPI', 'Spring'],
    'Full Stack': ['TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'Kubernetes'],
    'AI/ML Specialist': ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP'],
    'DevOps Expert': ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions'],
  };

  // Check which clusters the user is working towards
  for (const [cluster, skills] of Object.entries(skillClusters)) {
    const matchedSkills = skills.filter((s) =>
      currentSkillNames.includes(s.toLowerCase())
    );
    if (matchedSkills.length > 0 && matchedSkills.length < skills.length) {
      const missing = skills.find((s) => !currentSkillNames.includes(s.toLowerCase()));
      if (missing && !suggestions.includes(missing)) {
        suggestions.push(missing);
      }
    }
  }

  return suggestions.slice(0, 3); // Return top 3 suggestions
}

/**
 * Calculate performance score based on multiple factors
 */
export function calculatePerformanceScore(
  profile: UserProfile,
  skills: Skill[],
  projectCount: number
): number {
  let score = 50; // Base score

  // XP contribution (0-20 points)
  const xpPoints = Math.min((profile.totalXp / 50000) * 20, 20);
  score += xpPoints;

  // Skill proficiency (0-15 points)
  const avgProficiency = skills.reduce((acc, s) => acc + s.proficiency, 0) / skills.length || 0;
  const skillPoints = (avgProficiency / 100) * 15;
  score += skillPoints;

  // Streak bonus (0-10 points)
  const streakPoints = Math.min((profile.streak / 100) * 10, 10);
  score += streakPoints;

  // Project diversity (0-5 points)
  const projectPoints = Math.min(projectCount * 0.5, 5);
  score += projectPoints;

  return Math.round(score);
}
