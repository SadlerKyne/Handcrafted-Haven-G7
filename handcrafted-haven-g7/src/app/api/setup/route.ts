// Importing the Next.js response helper.
import { NextResponse } from "next/server";
// Importing my custom database query helper.
import { query } from "@/lib/db"; 

// Defining the GET endpoint for my setup route.
export async function GET() {
  try {
    // Writing the SQL schema to create my tables.
    const schemaQuery = `
      -- Enabling pgcrypto so I can generate UUIDs automatically.
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
      
      -- Creating the users table if it doesn't already exist.
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

      -- Indexing the email column so login queries are faster.
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

      -- Creating the products table to store artisan inventory.
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url VARCHAR(255),
        stock_quantity INTEGER DEFAULT 1,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Indexing product categories to speed up filtering.
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
      -- Indexing seller_id to quickly find all products by a specific artisan.
      CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
    `;

    // Running the schema query against my database.
    await query(schemaQuery);

    // Returning a success message when the tables are created.
    return NextResponse.json(
      { message: "Database schema for Users and Products instantiated successfully." },
      { status: 200 }
    );
  } catch (error) {
    // Logging the exact error to the terminal if something goes wrong.
    console.error("Database initialization anomaly:", error);
    // Returning a 500 server error response.
    return NextResponse.json(
      { error: "Failed to initialize database schema." },
      { status: 500 }
    );
  }
}