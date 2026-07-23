'use server';

import { getDatabase, schema } from '@/lib/db';
import { eq, desc } from 'drizzle-orm';

export async function getActivitiesByUserId(userId: number | string, limit: number = 50) {
  try {
    const db = getDatabase();
    
    const { mockActivities } = await import('@/lib/mock-data');
    
    if (!db || Object.keys(db).length === 0) {
      return mockActivities?.slice(0, limit) || [];
    }

    const result = await (db as any)
      .select()
      .from(schema.activities)
      .where(eq(schema.activities.userId, Number(userId)))
      .orderBy(desc(schema.activities.timestamp))
      .limit(limit);

    return result || [];
  } catch (error) {
    console.error('[v0] Error fetching activities:', error);
    return [];
  }
}

export async function addActivity(userId: number | string, data: Omit<typeof schema.activities.$inferInsert, 'userId' | 'id'>) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Activity add simulated.');
      return { success: true, message: 'Activity added (mock mode)' };
    }

    const result = await (db as any)
      .insert(schema.activities)
      .values({
        ...data,
        userId: Number(userId),
      })
      .returning();

    return { success: true, data: result?.[0] };
  } catch (error) {
    console.error('[v0] Error adding activity:', error);
    return { success: false, error: String(error) };
  }
}
