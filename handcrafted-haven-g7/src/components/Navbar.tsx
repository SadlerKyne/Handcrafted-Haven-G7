"use client";
import { useState } from "react";
import Link from "next/link";
import { User, ShoppingCart, Search, Menu, X, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass =
    "text-[#274c77] hover:text-[#6096ba] transition-colors";

  return (
    <header className="bg-white border-b border-gray-200 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4 md:w-1/3">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#274c77]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link
              href="/search"
              className={`hidden md:flex items-center gap-2 ${navLinkClass}`}
            >
              <Search size={20} />
              <span>Search</span>
            </Link>
          </div>

          <div className="flex justify-center md:w-1/3">
            <Link
              href="/"
              className="font-bold text-xl md:text-2xl text-[#274c77] whitespace-nowrap"
            >
              Handcrafted Haven
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-end gap-6 md:w-1/3">
            <Link href="/seller/profile" className={`flex items-center gap-2 ${navLinkClass}`}>
              <LayoutDashboard size={22} />
              <span>Seller</span>
            </Link>
            <Link href="/login" className={`flex items-center gap-2 ${navLinkClass}`}>
              <User size={24} />
              <span>Sign In</span>
            </Link>
            <Link href="/cart" className={`flex items-center gap-2 ${navLinkClass}`}>
              <ShoppingCart size={24} />
              <span>Cart</span>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <Link href="/cart" className={navLinkClass} aria-label="Cart">
              <ShoppingCart size={22} />
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-4 text-center">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
              Home
            </Link>
            <Link href="/search" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
              Search
            </Link>
            <Link href="/seller/profile" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
              Seller Profile
            </Link>
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
              Seller Dashboard
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
              Sign In
            </Link>
            <Link href="/cart" onClick={() => setIsMenuOpen(false)} className={navLinkClass}>
              Cart
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
