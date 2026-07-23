'use server';

import { getDatabase, schema } from '@/lib/db';
import { eq, desc } from 'drizzle-orm';

export async function getAnalyticsByUserId(userId: number | string) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      // Generate mock analytics
      return {
        totalXP: 4200,
        weeklyStudyTime: 28,
        performanceScore: 87,
        streak: 15,
        skillProgress: [
          { skill: 'React', progress: 85 },
          { skill: 'TypeScript', progress: 72 },
          { skill: 'Node.js', progress: 68 },
          { skill: 'PostgreSQL', progress: 80 },
        ],
        xpHistory: [
          { week: 'Week 1', xp: 420 },
          { week: 'Week 2', xp: 580 },
          { week: 'Week 3', xp: 650 },
          { week: 'Week 4', xp: 720 },
        ],
      };
    }

    const result = await (db as any)
      .select()
      .from(schema.analyticsSnapshots)
      .where(eq(schema.analyticsSnapshots.userId, Number(userId)))
      .orderBy(desc(schema.analyticsSnapshots.date))
      .limit(30);

    // Aggregate analytics data
    const totalXP = result?.reduce((sum: number, row: any) => sum + (row.xpGained || 0), 0) || 0;
    const weeklyStudyTime = result?.[0]?.studyTimeMinutes || 0;
    const performanceScore = result?.[0]?.performanceScore || 0;

    return {
      totalXP,
      weeklyStudyTime,
      performanceScore,
      streak: 0,
      snapshots: result || [],
    };
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

export async function recordAnalytics(userId: number | string, data: Omit<typeof schema.analyticsSnapshots.$inferInsert, 'userId' | 'id'>) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Analytics record simulated.');
      return { success: true, message: 'Analytics recorded (mock mode)' };
    }

    const result = await (db as any)
      .insert(schema.analyticsSnapshots)
      .values({
        ...data,
        userId: Number(userId),
      })
      .returning();

    return { success: true, data: result?.[0] };
  } catch (error) {
    console.error('[v0] Error recording analytics:', error);
    return { success: false, error: String(error) };
  }
}
