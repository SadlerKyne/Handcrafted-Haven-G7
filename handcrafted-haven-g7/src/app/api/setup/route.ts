import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const createUsersTableText = `
      -- Enable pgcrypto for native UUID generation
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
      
      -- Construct the foundational Users table
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        is_seller BOOLEAN DEFAULT false,
        bio TEXT,
        avatar_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Index the email column to optimize authentication lookups
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `;

    // Execute the transaction via the connection pool
    await query(createUsersTableText);

    return NextResponse.json(
      { message: "Database schema for Users instantiated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database initialization anomaly:", error);
    return NextResponse.json(
      { error: "Failed to initialize User schema." },
      { status: 500 }
    );
  }
}