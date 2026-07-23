/**
 * Data fetching utilities for profile ecosystem
 * Provides unified interface for both server-side and client-side data fetching
 * Works with both database and mock data transparently
 */

import {
  getUserByUsername,
  getUserProfile,
  getAllUsers,
} from '@/app/actions/userActions';
import {
  getSkillsByUserId,
} from '@/app/actions/skillActions';
import {
  getProjectsByUserId,
} from '@/app/actions/projectActions';
import {
  getCertificatesByUserId,
} from '@/app/actions/certificateActions';
import {
  getActivitiesByUserId,
} from '@/app/actions/activityActions';
import {
  getConnectionsByUserId,
} from '@/app/actions/connectionActions';
import {
  getAnalyticsByUserId,
} from '@/app/actions/analyticsActions';

// Server-side data fetching functions
export async function fetchUserProfile(username: string) {
  try {
    return await getUserByUsername(username);
  } catch (error) {
    console.error('[v0] Error fetching user profile:', error);
    return null;
  }
}

export async function fetchUserSkills(userId: string | number) {
  try {
    return await getSkillsByUserId(userId);
  } catch (error) {
    console.error('[v0] Error fetching skills:', error);
    return [];
  }
}

export async function fetchUserProjects(userId: string | number) {
  try {
    return await getProjectsByUserId(userId);
  } catch (error) {
    console.error('[v0] Error fetching projects:', error);
    return [];
  }
}

export async function fetchUserCertificates(userId: string | number) {
  try {
    return await getCertificatesByUserId(userId);
  } catch (error) {
    console.error('[v0] Error fetching certificates:', error);
    return [];
  }
}

export async function fetchUserActivities(userId: string | number, limit?: number) {
  try {
    return await getActivitiesByUserId(userId, limit);
  } catch (error) {
    console.error('[v0] Error fetching activities:', error);
    return [];
  }
}

export async function fetchUserConnections(userId: string | number) {
  try {
    return await getConnectionsByUserId(userId);
  } catch (error) {
    console.error('[v0] Error fetching connections:', error);
    return [];
  }
}

export async function fetchUserAnalytics(userId: string | number) {
  try {
    return await getAnalyticsByUserId(userId);
  } catch (error) {
    console.error('[v0] Error fetching analytics:', error);
    return {
      totalXP: 0,
      weeklyStudyTime: 0,
      performanceScore: 0,
      streak: 0,
    };
  }
}

export async function fetchAllUsers() {
  try {
    return await getAllUsers();
  } catch (error) {
    console.error('[v0] Error fetching users:', error);
    return [];
  }
}

// Client-side fetching functions (for client components using fetch)
export async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('[v0] Fetch error:', error);
    return null;
  }
}
