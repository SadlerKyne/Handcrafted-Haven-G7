import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { getSellerProducts, getSellerProfile } from "@/lib/seller-data";

export default async function Home() {
  const products = [
    { id: "1", title: "Handcrafted Wooden Bowl", price: "45.00" },
    { id: "2", title: "Silver Pendant Necklace", price: "120.00" },
    { id: "3", title: "Ceramic Coffee Mug", price: "25.00" },
    { id: "4", title: "Vintage Leather Journal", price: "35.00" },
    { id: "5", title: "Handwoven Wool Blanket", price: "85.00" },
    { id: "6", title: "Artisan Soap Set", price: "15.00" },
    { id: "7", title: "Abstract Oil Painting", price: "200.00" },
    { id: "8", title: "Custom Wood Sign", price: "55.00" },
    { id: "9", title: "Handmade Clay Vase", price: "40.00" },
    { id: "10", title: "Knitted Wool Scarf", price: "30.00" },
    { id: "11", title: "Bamboo Cutting Board", price: "20.00" },
    { id: "12", title: "Leather Wallet", price: "50.00" },
    { id: "13", title: "Hand-Painted Ceramic Plate", price: "35.00" },
    { id: "14", title: "Macrame Wall Hanging", price: "60.00" },
    { id: "15", title: "Handmade Beaded Bracelet", price: "25.00" },
    { id: "16", title: "Rustic Wooden Picture Frame", price: "18.00" },
    { id: "17", title: "Organic Cotton Tote Bag", price: "22.00" },
    { id: "18", title: "Hand-Carved Wooden Spoon Set", price: "28.00" },
    { id: "19", title: "Decorative Throw Pillow", price: "45.00" },
    { id: "20", title: "Handwoven Rattan Basket", price: "35.00" },
    { id: "21", title: "Artisan Candle", price: "15.00" },
    { id: "22", title: "Handmade Soap Dish", price: "12.00" },
    { id: "23", title: "Wool Knit Hat", price: "25.00" },
    { id: "24", title: "Handcrafted Wooden Coasters", price: "20.00" },
    { id: "25", title: "Ceramic Plant Pot", price: "30.00" },
    { id: "26", title: "Handmade Dreamcatcher", price: "50.00" },
    { id: "27", title: "Hand-Stitched Leather Belt", price: "45.00" },
    { id: "28", title: "Handwoven Table Runner", price: "40.00" },
    { id: "29", title: "Handmade Wooden Toy", price: "35.00" },
    { id: "30", title: "Artisan Glass Vase", price: "75.00" },
  ];

  const [sellerProducts, sellerProfile] = await Promise.all([
    getSellerProducts(),
    getSellerProfile(),
  ]);

  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Incredible things, made by incredible people.
        </h1>
        <Link href="#popular" className={styles.heroButton}>
          Shop Handcrafted
        </Link>
      </section>

      {sellerProducts.length > 0 && (
        <section className={styles.sellerSection}>
          <h2 className={styles.sellerSectionTitle}>
            From {sellerProfile.shopName}
          </h2>
          <div className={styles.productGrid}>
            {sellerProducts.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className={styles.productCard}
              >
                <span className={styles.sellerBadge}>Seller Listing</span>
                <div className={styles.productImage}>
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover rounded-lg"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8b8c89] text-sm">
                      No image
                    </div>
                  )}
                </div>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="popular">
        <h2 className="text-2xl font-semibold mb-6 text-[#274c77]">Popular right now</h2>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className={styles.productCard}
            >
              <div className={styles.productImage}>
                <img
                  src={`https://picsum.photos/seed/${product.id}/400/400`}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-lg"
                />
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
