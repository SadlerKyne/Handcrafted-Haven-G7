// Importing Link to make my product cards clickable.
import Link from "next/link";

// Generating 8 mock products for the UI grid so I don't need a database yet.
const MOCK_PRODUCTS = Array.from({ length: 8 }).map((_, i) => ({
  id: i.toString(),
  title: `Artisan Handcrafted Item ${i + 1}`,
  artisan: `Maker Studio ${String.fromCharCode(65 + i)}`,
  price: (Math.random() * 100 + 10).toFixed(2), // Random price.
  rating: (Math.random() * 1 + 4).toFixed(1), // Random rating.
}));

// Main homepage component. Removed 'async' since I am not querying a database right now.
export default function Home() {
  return (
    // Main background and text color wrapper.
    <div className="bg-[#e7ecef] text-[#274c77] font-sans">
      
      {/* Constraining the main content width. */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Hero Section. */}
        <section className="bg-[#274c77] rounded-2xl p-8 md:p-16 text-center shadow-lg relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
          
          {/* Keeps text above the background. */}
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Discover Unique, Handmade Treasures
            </h1>
            <p className="text-[#a3cef1] text-lg max-w-2xl mx-auto">
              Support independent artisans and find extraordinary items crafted with passion and precision.
            </p>
            {/* Shop now button. */}
            <button className="mt-4 bg-[#6096ba] hover:bg-[#a3cef1] hover:text-[#274c77] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-md">
              Shop Now
            </button>
          </div>
          
          {/* Subtle gradient overlay. */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-[#6096ba] opacity-20 pointer-events-none"></div>
        </section>

        {/* Product Grid Section. */}
        <section>
          {/* Section header. */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#274c77]">Curated Picks for You</h2>
          </div>
          
          {/* Responsive CSS grid. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* Looping through my mock products instead of database rows. */}
            {MOCK_PRODUCTS.map((product) => (
              // Wrapping the entire card in a Link to navigate to the product details page.
              <Link 
                href={`/product/${product.id}`} 
                key={product.id} 
                className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-[#a3cef1]"
              >
                
                {/* Product image placeholder with 4:3 aspect ratio. */}
                <div className="w-full aspect-[4/3] bg-[#e7ecef] relative overflow-hidden flex items-center justify-center">
                  <span className="text-[#8b8c89] font-medium">Image Placeholder</span>
                </div>
                
                {/* Product data area. */}
                <div className="p-4 flex flex-col flex-grow space-y-1">
                  {/* Product title. */}
                  <h3 className="font-semibold text-lg text-[#274c77] truncate group-hover:text-[#6096ba] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[#8b8c89]">{product.artisan}</p>
                  
                  {/* Pushing price and rating to the bottom. */}
                  <div className="flex justify-between items-center pt-2 mt-auto">
                    <span className="font-bold text-[#274c77]">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <StarIcon />
                      <span className="text-sm font-medium text-[#8b8c89]">{product.rating}</span>
                    </div>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

// SVG Star icon component.
function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#274c77]">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}