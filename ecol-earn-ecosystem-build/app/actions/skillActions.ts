'use server';

import { getDatabase, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function getSkillsByUserId(userId: number | string) {
  try {
    const db = getDatabase();
    
    // For mock mode, return from mock data
    const { mockSkills } = await import('@/lib/mock-data');
    
    if (!db || Object.keys(db).length === 0) {
      return mockSkills || [];
    }

    const result = await (db as any)
      .select()
      .from(schema.skills)
      .where(eq(schema.skills.userId, Number(userId)))
      .orderBy((t: any) => t.proficiencyPercentage);

    return result || [];
  } catch (error) {
    console.error('[v0] Error fetching skills:', error);
    return [];
  }
}

export async function addSkill(userId: number | string, data: Omit<typeof schema.skills.$inferInsert, 'userId' | 'id'>) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Skill add simulated.');
      return { success: true, message: 'Skill added (mock mode)' };
    }

    const result = await (db as any)
      .insert(schema.skills)
      .values({
        ...data,
        userId: Number(userId),
      })
      .returning();

    return { success: true, data: result?.[0] };
  } catch (error) {
    console.error('[v0] Error adding skill:', error);
    return { success: false, error: String(error) };
  }
}

export async function updateSkill(skillId: number, data: Partial<typeof schema.skills.$inferInsert>) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Skill update simulated.');
      return { success: true, message: 'Skill updated (mock mode)' };
    }

    const result = await (db as any)
      .update(schema.skills)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(schema.skills.id, skillId))
      .returning();

    return { success: true, data: result?.[0] };
  } catch (error) {
    console.error('[v0] Error updating skill:', error);
    return { success: false, error: String(error) };
  }
}

export async function deleteSkill(skillId: number) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Skill delete simulated.');
      return { success: true, message: 'Skill deleted (mock mode)' };
    }

    await (db as any)
      .delete(schema.skills)
      .where(eq(schema.skills.id, skillId));

    return { success: true };
  } catch (error) {
    console.error('[v0] Error deleting skill:', error);
    return { success: false, error: String(error) };
  }
}
