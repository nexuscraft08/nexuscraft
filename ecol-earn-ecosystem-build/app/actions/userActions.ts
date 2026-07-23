'use server';

import { getDatabase, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function getUserByUsername(username: string) {
  try {
    const db = getDatabase();
    // For mock mode, return data from existing mock data
    const { currentUser } = await import('@/lib/mock-data');
    
    if (username === currentUser.username) {
      return currentUser;
    }
    
    // Try database query if available
    if (db && Object.keys(db).length > 0) {
      const result = await (db as any)
        .select()
        .from(schema.users)
        .where(eq(schema.users.username, username))
        .limit(1);
      
      return result?.[0] || null;
    }
    
    return null;
  } catch (error) {
    console.error('[v0] Error fetching user:', error);
    return null;
  }
}

export async function updateUserProfile(userId: number | string, data: Partial<typeof schema.users.$inferInsert>) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Skipping update.');
      return { success: true, message: 'Mock mode - update simulated' };
    }

    const result = await (db as any)
      .update(schema.users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(schema.users.id, Number(userId)))
      .returning();

    return { success: true, data: result?.[0] };
  } catch (error) {
    console.error('[v0] Error updating user:', error);
    return { success: false, error: String(error) };
  }
}

export async function getUserProfile(userId: number | string) {
  try {
    const db = getDatabase();
    
    // For mock mode, return from mock data
    const { currentUser } = await import('@/lib/mock-data');
    return currentUser;
  } catch (error) {
    console.error('[v0] Error getting user profile:', error);
    return null;
  }
}

export async function getAllUsers() {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      // Return mock data
      const { allUsers } = await import('@/lib/mock-data');
      return allUsers || [];
    }

    const result = await (db as any)
      .select()
      .from(schema.users)
      .limit(100);

    return result || [];
  } catch (error) {
    console.error('[v0] Error fetching users:', error);
    return [];
  }
}
