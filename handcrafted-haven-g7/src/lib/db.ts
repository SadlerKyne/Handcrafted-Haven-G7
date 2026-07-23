import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

let cachedPool = (global as typeof globalThis & { pgPool?: Pool }).pgPool;

function getPool(): Pool {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local to use PostgreSQL features."
    );
  }

  if (!cachedPool) {
    cachedPool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
    });
    (global as typeof globalThis & { pgPool?: Pool }).pgPool = cachedPool;
  }

  return cachedPool;
}

export const query = async (text: string, params?: unknown[]) => {
  const pool = getPool();
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;

  if (process.env.NODE_ENV === "development") {
    console.log("Executed query", { text, duration, rows: res.rowCount });
  }

  return res;
};

export default getPool;
