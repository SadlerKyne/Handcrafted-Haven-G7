// src/app/page.tsx
import { query } from "@/lib/db";
import Link from "next/link";
import styles from "./page.module.css"; // Importing the CSS module

export default async function Home() {
  // Initialize an empty array for products
  let products = [];

  try {
    // Attempt to fetch data from the database
    const { rows } = await query(`
      SELECT p.id, p.title, p.price, u.name as artisan
      FROM products p
      JOIN users u ON p.seller_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 8;
    `);
    products = rows;
  } catch (error) {
    // Fallback data if the database is not configured
    console.error("Database connection failed, using mock data.");
    products = [
      { id: '1', title: 'Handcrafted Wooden Bowl', price: '45.00', artisan: 'Jane Doe' },
      { id: '2', title: 'Silver Pendant Necklace', price: '120.00', artisan: 'John Smith' },
    ];
  }

  return (
    <div className={styles.homeContainer}>
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1>Incredible things, made by incredible people.</h1>
        <button className={styles.heroButton}>Shop Handcrafted</button>
      </section>

      {/* Main Product Display */}
      <section>
        <h2>Popular right now</h2>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <Link 
              href={`/product/${product.id}`} 
              key={product.id} 
              className={styles.productCard}
            >
              <div className={styles.productImage}>
                {/* Product image would go here */}
              </div>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.productPrice}>${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}