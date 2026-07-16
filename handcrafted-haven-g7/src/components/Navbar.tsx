import Link from "next/link";

const CATEGORIES = ["Jewelry", "Home & Living", "Art", "Clothing", "Woodworking", "Ceramics", "Vintage"];

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="font-bold text-2xl tracking-tight text-[#274c77]">
              Handcrafted Haven
            </Link>
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
              <Link href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

// Extracted SVG Components
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