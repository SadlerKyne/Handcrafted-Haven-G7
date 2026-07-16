// Importing the Next.js response helper.
import { NextResponse } from "next/server";
// Importing my database query helper.
import { query } from "@/lib/db";

// Creating a GET endpoint to quickly seed my database.
export async function GET() {
  try {
    // Clearing existing data so I don't get duplicates if I run this multiple times.
    await query('DELETE FROM products');
    await query('DELETE FROM users');

    // Inserting a dummy artisan user.
    // Returning the generated ID so I can attach products to them.
    const userResult = await query(`
      INSERT INTO users (email, password_hash, name, is_seller, bio)
      VALUES ('artisan@handcraftedhaven.com', 'hashed_password_placeholder', 'Jane Doe', true, 'Creating beautiful things.')
      RETURNING id;
    `);
    const sellerId = userResult.rows[0].id;

    // Inserting a few dummy products tied to my new artisan.
    await query(`
      INSERT INTO products (seller_id, title, description, price, category, image_url)
      VALUES 
      ($1, 'Rustic Ceramic Bowl', 'A beautifully handcrafted ceramic bowl.', 24.99, 'Ceramics', null),
      ($1, 'Silver Leaf Pendant', 'Sterling silver necklace inspired by nature.', 45.00, 'Jewelry', null),
      ($1, 'Woven Wall Hanging', 'Macrame wall art for your living room.', 65.50, 'Home & Living', null),
      ($1, 'Hand-Poured Soy Candle', 'Lavender and cedar scented candle.', 18.00, 'Home & Living', null);
    `, [sellerId]);

    // Sending back a success message.
    return NextResponse.json({ message: "Database seeded successfully with dummy data!" });
  } catch (error) {
    // Logging the error if my seed fails.
    console.error("Seeding error:", error);
    return NextResponse.json({ error: "Failed to seed database." }, { status: 500 });
  }
}