import { BookOpen, Rocket, Trophy, Brain, Leaf, Zap } from 'lucide-react';

interface LessonInfo {
  id: string;
  title: string;
  description?: string;
  learningObjectives?: string[];
  level?: string;
  duration?: string;
}

interface ProjectInfo {
  id: string;
  title: string;
  description?: string;
  lessonRequired?: string;
}

interface TrackData {
  title: string;
  icon: any;
  color: string;
  bgColor: string;
  textColor: string;
  lessons: LessonInfo[];
  projects: ProjectInfo[];
}

export const trackData: Record<string, TrackData> = {
  'ai-innovation': {
    title: 'AI Innovation Track',
    icon: Brain,
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    lessons: [
      { id: '1', title: 'AI Fundamentals' },
      { id: '2', title: 'Data Handling' },
      { id: '3', title: 'Machine Learning Basics' },
    ],
    projects: [
      { id: '1', title: 'Chatbot Builder' },
      { id: '2', title: 'Predictive Model' },
      { id: '3', title: 'Data Dashboard' },
    ],
  },
  'environmental-innovation': {
    title: 'Environmental Innovation Track',
    icon: Leaf,
    color: 'from-emerald-500 to-green-400',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-600',
    lessons: [
      { id: '1', title: 'Climate Basics' },
      { id: '2', title: 'Sustainable Solutions' },
      { id: '3', title: 'Data Analysis for Environment' },
    ],
    projects: [
      { id: '1', title: 'Emission Tracker' },
      { id: '2', title: 'Carbon Calculator' },
      { id: '3', title: 'Sustainability Report' },
    ],
  },
  'soft-skills': {
    title: 'Soft Skills Mastery',
    icon: Zap,
    color: 'from-amber-500 to-yellow-400',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-600',
    lessons: [
      { id: '1', title: 'Communication Skills' },
      { id: '2', title: 'Teamwork & Collaboration' },
      { id: '3', title: 'Time Management' },
    ],
    projects: [
      { id: '1', title: 'Presentation Project' },
      { id: '2', title: 'Team Challenge' },
      { id: '3', title: 'Leadership Exercise' },
    ],
  },
  'english-learning': {
    title: 'English Learning Path',
    icon: BookOpen,
    color: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    lessons: [
      { id: '1', title: 'Grammar Essentials' },
      { id: '2', title: 'Vocabulary Building' },
      { id: '3', title: 'Professional Communication' },
    ],
    projects: [
      { id: '1', title: 'Writing Portfolio' },
      { id: '2', title: 'Speaking Practice' },
      { id: '3', title: 'Business Email' },
    ],
  },
  'interview-skills': {
    title: 'Interview Preparation',
    icon: Trophy,
    color: 'from-red-500 to-orange-400',
    bgColor: 'bg-red-100',
    textColor: 'text-red-600',
    lessons: [
      { id: '1', title: 'Interview Techniques' },
      { id: '2', title: 'Resume Building' },
      { id: '3', title: 'Mock Interview' },
    ],
    projects: [
      { id: '1', title: 'Resume Project' },
      { id: '2', title: 'Mock Interview' },
      { id: '3', title: 'Portfolio Showcase' },
    ],
  },
};
