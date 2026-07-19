// Importing Link to allow navigation back to the homepage.
import Link from "next/link";

// Generating a mock product so I don't need a database connection yet.
const getMockProduct = (id: string) => ({
  id,
  title: `Artisan Handcrafted Item ${id}`,
  category: "Home & Living",
  artisan: "Maker Studio A",
  price: "45.00",
  description: "A beautifully handcrafted item created with passion and precision. This is a placeholder description for my mock product to test the layout.",
  stock_quantity: 5,
});

// Main product details page. Next.js 15+ requires params to be a Promise.
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Awaiting the params object to get the product ID from the URL.
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // Fetching my mock product instead of querying PostgreSQL.
  const product = getMockProduct(productId);

  return (
    // Main background and text wrapper.
    <div className="bg-[#e7ecef] text-[#274c77] font-sans py-12">
      
      {/* Container to center the layout. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back button. */}
        <Link href="/" className="text-[#6096ba] hover:text-[#274c77] mb-8 inline-block transition-colors font-medium">
          &larr; Back to Marketplace
        </Link>

        {/* 2-column CSS grid: Image on left, details on right. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-transparent hover:border-[#a3cef1] transition-colors">
          
          {/* Left Column: Image Placeholder. */}
          <div className="w-full aspect-square bg-[#e7ecef] rounded-xl flex items-center justify-center">
            <span className="text-[#8b8c89] font-medium text-lg">Image Placeholder</span>
          </div>

          {/* Right Column: Product Info. */}
          <div className="flex flex-col">
            {/* Category tag. */}
            <p className="text-sm text-[#8b8c89] uppercase tracking-wider mb-2">{product.category}</p>
            {/* Product title. */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#274c77] mb-2">{product.title}</h1>
            {/* Artisan name. */}
            <p className="text-lg text-[#6096ba] mb-6">Crafted by {product.artisan}</p>
            
            {/* Formatted price. */}
            <span className="text-4xl font-bold text-[#274c77] mb-8">${product.price}</span>
            
            {/* Product description. */}
            <div className="text-[#8b8c89] mb-10 leading-relaxed whitespace-pre-wrap">
              <p>{product.description}</p>
            </div>

            {/* Pushing the cart button to the bottom of the column. */}
            <div className="mt-auto">
              <button className="w-full bg-[#274c77] hover:bg-[#6096ba] text-white font-bold py-4 rounded-full transition-colors shadow-md text-lg">
                Add to Cart
              </button>
              {/* Dynamic stock indicator. */}
              <p className="text-center text-sm text-[#8b8c89] mt-3">
                {product.stock_quantity > 0 ? `${product.stock_quantity} available in stock` : "Out of stock"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}