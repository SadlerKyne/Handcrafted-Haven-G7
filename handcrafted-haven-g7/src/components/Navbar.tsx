"use client";
import { useState } from "react";
import Link from "next/link";
import { User, ShoppingCart, Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 w-full">
      {/* Removed 'max-w-[800px]' so it fills the screen width */}
      <div className="w-full px-6">
        
        {/* Changed 'justify-center' to 'justify-between' to use full width */}
        <div className="flex items-center justify-between h-20">
          
          {/* Left Side: Search & Hamburger */}
          <div className="flex items-center gap-4 w-1/3">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-2 text-[#274c77] hover:text-[#6096ba] cursor-pointer">
              <Search size={20} />
              <span>Search</span>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center w-1/3">
            <Link href="/" className="font-bold text-2xl text-[#274c77] whitespace-nowrap">
              Handcrafted Haven
            </Link>
          </div>

          {/* Right Side: User & Cart */}
          <div className="hidden md:flex items-center justify-end gap-6 w-1/3">
            <Link href="/login" className="flex items-center gap-2 text-[#274c77] hover:text-[#6096ba]">
              <User size={24} />
              <span>Sign In</span>
            </Link>
            <Link href="/cart" className="flex items-center gap-2 text-[#274c77] hover:text-[#6096ba]">
              <ShoppingCart size={24} />
              <span>Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-4 text-center">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/search" onClick={() => setIsMenuOpen(false)}>Search</Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
            <Link href="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link>
          </div>
        )}
      </div>
    </header>
  );
}