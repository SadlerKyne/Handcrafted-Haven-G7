import { query } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  let products = [];

  try {
    // Attempt to fetch real data from Postgres
    const { rows } = await query(`
      SELECT p.id, p.title, p.price, p.category, u.name as artisan
      FROM products p
      JOIN users u ON p.seller_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 12;
    `);
    products = rows;
  } catch (error) {
    // Graceful fallback for local development
    products = [
      { id: '1', title: 'Handcrafted Wooden Bowl', price: '45.00', artisan: 'Jane Doe' },
      { id: '2', title: 'Silver Pendant Necklace', price: '120.00', artisan: 'John Smith' },
      { id: '3', title: 'Ceramic Coffee Mug', price: '25.00', artisan: 'Alice Joy' },
      { id: '4', title: 'Woven Wall Hanging', price: '65.00', artisan: 'Bob Lee' },
      { id: '5', title: 'Vintage Leather Bag', price: '85.00', artisan: 'LeatherCrafts' },
      { id: '6', title: 'Minimalist Ring', price: '30.00', artisan: 'JewelsByJ' },
    ];
  }

  return (
    <div className="bg-white text-gray-900 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Etsy-style Minimalist Hero */}
        <section className="bg-[#e7ecef] rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#274c77] mb-6">
            Incredible things, made by incredible people.
          </h1>
          <button className="bg-[#274c77] hover:bg-[#6096ba] text-white font-bold py-3 px-8 rounded-full transition-colors shadow-sm">
            Shop Handcrafted
          </button>
        </section>

        {/* Product Grid Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Popular right now</h2>
          
          {/* Tighter grid matching Etsy's density */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-y-8 gap-x-4">
            {products.map((product) => (
              <Link 
                href={`/product/${product.id}`} 
                key={product.id} 
                className="group flex flex-col cursor-pointer"
              >
                {/* Square Image Placeholder */}
                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden relative mb-2">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300">
                    Image
                  </div>
                </div>
                
                {/* Etsy-style Typography */}
                <h3 className="text-sm text-gray-900 font-medium truncate group-hover:underline">
                  {product.title}
                </h3>
                
                <div className="flex items-center space-x-1 my-0.5">
                  <span className="text-xs font-bold text-gray-800">5.0</span>
                  <StarIcon />
                  <span className="text-xs text-gray-500">(24)</span>
                </div>
                
                <span className="font-bold text-gray-900">${product.price}</span>
                <span className="text-xs text-gray-500 truncate">{product.artisan}</span>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-800">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}