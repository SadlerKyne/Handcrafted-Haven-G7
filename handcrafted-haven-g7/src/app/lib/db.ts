import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

/**
 * Global is utilized to instantiate a cached connection pool across hot reloads
 * in development. This mitigates connection exhaustion when API routes recompile.
 */
let cachedPool = (global as any).pgPool;

if (!cachedPool) {
  cachedPool = (global as any).pgPool = new Pool({
    connectionString,
    max: 10, // Restrict maximum concurrent connections for serverless compatibility
    idleTimeoutMillis: 30000,
  });
}

const pool: Pool = cachedPool;

/**
 * A standardized wrapper for executing SQL queries asynchronously.
 */
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  
  // Optional: Console logging for performance monitoring during development
  if (process.env.NODE_ENV === 'development') {
    console.log('Executed query', { text, duration, rows: res.rowCount });
  }
  
  return res;
};

export default pool;