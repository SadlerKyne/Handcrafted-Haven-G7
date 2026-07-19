// Importing the Pool class from the pg package.
import { Pool } from "pg";

// Grabbing the database connection string from my environment variables.
const connectionString = process.env.DATABASE_URL;

// Ensuring the application crashes early if the database URL is missing.
if (!connectionString) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

// Creating a global variable to cache my database pool.
// I do this so Next.js doesn't create thousands of connections during hot-reloads.
let cachedPool = (global as any).pgPool;

// Initializing the pool only if it hasn't been created yet.
if (!cachedPool) {
  cachedPool = (global as any).pgPool = new Pool({
    connectionString,
    max: 10, // Limiting concurrent connections to prevent database exhaustion.
    idleTimeoutMillis: 30000, // Dropping inactive connections after 30 seconds.
  });
}

// Assigning the cached pool to a local constant.
const pool: Pool = cachedPool;

// Creating a helper function to easily run SQL queries throughout my app.
export const query = async (text: string, params?: any[]) => {
  // Tracking how long the query takes to run.
  const start = Date.now();
  // Executing the query using my connection pool.
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  
  // Logging query performance only in development mode.
  if (process.env.NODE_ENV === 'development') {
    console.log('Executed query', { text, duration, rows: res.rowCount });
  }
  
  // Returning the query results.
  return res;
};

// Exporting the raw pool just in case I need direct access to it later.
export default pool;