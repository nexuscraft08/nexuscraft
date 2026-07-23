'use server';

import { getDatabase, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function getConnectionsByUserId(userId: number | string) {
  try {
    const db = getDatabase();
    
    const { mockConnections } = await import('@/lib/mock-data');
    
    if (!db || Object.keys(db).length === 0) {
      return mockConnections || [];
    }

    const result = await (db as any)
      .select()
      .from(schema.connections)
      .where(eq(schema.connections.userId, Number(userId)));

    return result || [];
  } catch (error) {
    console.error('[v0] Error fetching connections:', error);
    return [];
  }
}

export async function addConnection(userId: number | string, connectedUserId: number | string, status: string = 'connected') {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Connection add simulated.');
      return { success: true, message: 'Connection added (mock mode)' };
    }

    const result = await (db as any)
      .insert(schema.connections)
      .values({
        userId: Number(userId),
        connectedUserId: Number(connectedUserId),
        status,
      })
      .returning();

    return { success: true, data: result?.[0] };
  } catch (error) {
    console.error('[v0] Error adding connection:', error);
    return { success: false, error: String(error) };
  }
}

export async function removeConnection(userId: number | string, connectedUserId: number | string) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Connection remove simulated.');
      return { success: true, message: 'Connection removed (mock mode)' };
    }

    await (db as any)
      .delete(schema.connections)
      .where(
        eq(schema.connections.userId, Number(userId)) &&
        eq(schema.connections.connectedUserId, Number(connectedUserId))
      );

    return { success: true };
  } catch (error) {
    console.error('[v0] Error removing connection:', error);
    return { success: false, error: String(error) };
  }
}
