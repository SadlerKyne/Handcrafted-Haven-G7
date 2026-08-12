"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, UserPlus, ShoppingCart, Search, Menu, X, LogOut } from "lucide-react";
import { useCart } from "./cart/CartProvider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { itemCount } = useCart();

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
            {session?.user?.role === "seller" && (
              <Link href="/seller/profile" className={`flex items-center gap-2 ${navLinkClass}`}>
                <span>Seller</span>
              </Link>
            )}
            {session ? (
              <>
                <Link href="/profile" className={`flex items-center gap-2 ${navLinkClass}`}>
                  <User size={24} />
                  <span>{session.user?.name || "Account"}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={`flex items-center gap-2 ${navLinkClass}`}
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={`flex items-center gap-2 ${navLinkClass}`}>
                  <User size={24} />
                  <span>Sign In</span>
                </Link>
                <Link href="/register" className={`flex items-center gap-2 ${navLinkClass}`}>
                  <UserPlus size={24} />
                  <span>Register</span>
                </Link>
              </>
            )}
            <Link href="/cart" className={`relative flex items-center gap-2 ${navLinkClass}`}>
              <ShoppingCart size={24} />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#274c77] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <Link href="/cart" className={`relative ${navLinkClass}`} aria-label="Cart">
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#274c77] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-4 text-center">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/search" onClick={() => setIsMenuOpen(false)}>Search</Link>
            {session?.user?.role === "seller" && (
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>Seller Dashboard</Link>
            )}
            {session ? (
              <>
                <Link href="/profile" onClick={() => setIsMenuOpen(false)}>Account</Link>
                <button type="button" onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
            <Link href="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link>
          </div>
        )}
      </div>
    </header>
  );
}
