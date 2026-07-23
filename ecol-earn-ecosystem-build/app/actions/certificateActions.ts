'use server';

import { getDatabase, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';

export async function getCertificatesByUserId(userId: number | string) {
  try {
    const db = getDatabase();
    
    const { mockCertificates } = await import('@/lib/mock-data');
    
    if (!db || Object.keys(db).length === 0) {
      return mockCertificates || [];
    }

    const result = await (db as any)
      .select()
      .from(schema.certificates)
      .where(eq(schema.certificates.userId, Number(userId)))
      .orderBy((t: any) => t.issuedDate);

    return result || [];
  } catch (error) {
    console.error('[v0] Error fetching certificates:', error);
    return [];
  }
}

export async function addCertificate(userId: number | string, data: Omit<typeof schema.certificates.$inferInsert, 'userId' | 'id'>) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Certificate add simulated.');
      return { success: true, message: 'Certificate added (mock mode)' };
    }

    const result = await (db as any)
      .insert(schema.certificates)
      .values({
        ...data,
        userId: Number(userId),
      })
      .returning();

    return { success: true, data: result?.[0] };
  } catch (error) {
    console.error('[v0] Error adding certificate:', error);
    return { success: false, error: String(error) };
  }
}

export async function deleteCertificate(certificateId: number) {
  try {
    const db = getDatabase();
    
    if (!db || Object.keys(db).length === 0) {
      console.log('[v0] Database not configured. Certificate delete simulated.');
      return { success: true, message: 'Certificate deleted (mock mode)' };
    }

    await (db as any)
      .delete(schema.certificates)
      .where(eq(schema.certificates.id, certificateId));

    return { success: true };
  } catch (error) {
    console.error('[v0] Error deleting certificate:', error);
    return { success: false, error: String(error) };
  }
}
