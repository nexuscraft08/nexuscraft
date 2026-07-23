import { drizzle } from 'drizzle-orm/neon-http';
import { Pool } from '@neondatabase/serverless';
import * as schema from './schema';

// For development/demo: use in-memory SQLite simulation
// In production: connect to Neon PostgreSQL

let db: ReturnType<typeof drizzle> | null = null;

export function getDatabase() {
  if (!db) {
    // For now, create a mock database client
    // This will be replaced with actual Neon connection when configured
    try {
      const connectionString = process.env.DATABASE_URL;
      if (connectionString) {
        const pool = new Pool({ connectionString });
        db = drizzle(pool, { schema });
      } else {
        console.warn('[v0] DATABASE_URL not set. Using mock database mode.');
        // Return a mock db object for development
        db = {} as any;
      }
    } catch (error) {
      console.error('[v0] Failed to connect to database:', error);
      db = {} as any;
    }
  }
  return db;
}

export type Database = ReturnType<typeof drizzle>;
export { schema };
