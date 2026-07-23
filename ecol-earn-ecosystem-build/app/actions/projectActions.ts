'use server';

import { getDatabase, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function getProjectsByUserId(userId: number | string) {
  try {
    const db = getDatabase();
    
    const { mockProjects } = await import('@/lib/mock-data');
    
    if (!db || Object.keys(db).length === 0) {
      return mockProjects || [];
    }

    const result = await (db as any)
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.userId, Number(userId)))
      .orderBy((t: any) => t.createdAt);

    return result || [];
  } catch (error) {
    console.error('[v0] Error fetching projects:', error);
    return [];
  }
}

export async function addProject(userId: number | string, data: Omit<typeof schema.projects.$inferInsert, 'userId' | 'id'>) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Project add simulated.');
      return { success: true, message: 'Project added (mock mode)' };
    }

    const result = await (db as any)
      .insert(schema.projects)
      .values({
        ...data,
        userId: Number(userId),
      })
      .returning();

    return { success: true, data: result?.[0] };
  } catch (error) {
    console.error('[v0] Error adding project:', error);
    return { success: false, error: String(error) };
  }
}

export async function updateProject(projectId: number, data: Partial<typeof schema.projects.$inferInsert>) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Project update simulated.');
      return { success: true, message: 'Project updated (mock mode)' };
    }

    const result = await (db as any)
      .update(schema.projects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(schema.projects.id, projectId))
      .returning();

    return { success: true, data: result?.[0] };
  } catch (error) {
    console.error('[v0] Error updating project:', error);
    return { success: false, error: String(error) };
  }
}

export async function deleteProject(projectId: number) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Project delete simulated.');
      return { success: true, message: 'Project deleted (mock mode)' };
    }

    await (db as any)
      .delete(schema.projects)
      .where(eq(schema.projects.id, projectId));

    return { success: true };
  } catch (error) {
    console.error('[v0] Error deleting project:', error);
    return { success: false, error: String(error) };
  }
}
