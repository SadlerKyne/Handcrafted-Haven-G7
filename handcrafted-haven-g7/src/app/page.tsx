import Image from "next/image";

// Mock Data for structural scaffolding
const CATEGORIES = ["Jewelry", "Home & Living", "Art", "Clothing", "Woodworking", "Ceramics", "Vintage"];
const MOCK_PRODUCTS = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `Artisan Handcrafted Item ${i + 1}`,
  artisan: `Maker Studio ${String.fromCharCode(65 + i)}`,
  price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
  rating: (Math.random() * 1 + 4).toFixed(1), // 4.0 to 5.0
}));

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e7ecef] text-[#274c77] font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <span className="font-bold text-2xl tracking-tight text-[#274c77]">
                Handcrafted Haven
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl px-8 hidden md:flex">
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="w-full bg-[#e7ecef] border border-[#8b8c89] rounded-full py-2 pl-5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6096ba] transition-shadow"
                />
                <button aria-label="Search" className="absolute right-0 top-0 mt-2 mr-4 text-[#274c77]">
                  <SearchIcon />
                </button>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <button aria-label="User Profile" className="text-[#274c77] hover:text-[#a3cef1] transition-colors">
                <UserIcon />
              </button>
              <button aria-label="Shopping Cart" className="text-[#274c77] hover:text-[#a3cef1] transition-colors relative">
                <CartIcon />
                <span className="absolute -top-2 -right-2 bg-[#6096ba] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="border-t border-[#e7ecef] bg-white">
          <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 overflow-x-auto py-3 text-sm font-medium text-[#8b8c89] whitespace-nowrap scrollbar-hide">
            {CATEGORIES.map((category) => (
              <li key={category} className="cursor-pointer hover:text-[#274c77] transition-colors">
                {category}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <section className="bg-[#274c77] rounded-2xl p-8 md:p-16 text-center shadow-lg relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Discover Unique, Handmade Treasures
            </h1>
            <p className="text-[#a3cef1] text-lg max-w-2xl mx-auto">
              Support independent artisans and find extraordinary items crafted with passion and precision.
            </p>
            <button className="mt-4 bg-[#6096ba] hover:bg-[#a3cef1] hover:text-[#274c77] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-md">
              Shop Now
            </button>
          </div>
          {/* Subtle background accent */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-[#6096ba] opacity-20 pointer-events-none"></div>
        </section>

        {/* Product Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#274c77]">Curated Picks for You</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map((product) => (
              <div key={product.id} className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-transparent hover:border-[#a3cef1]">
                {/* Image Placeholder */}
                <div className="w-full aspect-[4/3] bg-[#e7ecef] relative overflow-hidden flex items-center justify-center">
                  <span className="text-[#8b8c89] font-medium">Image Placeholder</span>
                </div>
                
                {/* Product Details */}
                <div className="p-4 flex flex-col flex-grow space-y-1">
                  <h3 className="font-semibold text-lg text-[#274c77] truncate group-hover:text-[#6096ba] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[#8b8c89]">{product.artisan}</p>
                  
                  <div className="flex justify-between items-center pt-2 mt-auto">
                    <span className="font-bold text-[#274c77]">{product.price}</span>
                    <div className="flex items-center space-x-1">
                      <StarIcon />
                      <span className="text-sm font-medium text-[#8b8c89]">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Inline SVG Components for portability
function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#274c77]">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}