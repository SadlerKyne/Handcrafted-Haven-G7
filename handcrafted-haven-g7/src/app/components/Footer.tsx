import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#8b8c89]/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-[#8b8c89]">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <span className="font-bold text-xl text-[#274c77] tracking-tight">
              Handcrafted Haven
            </span>
            <p className="leading-relaxed">
              Connecting independent artisans with discerning buyers seeking unique, high-quality handcrafted treasures.
            </p>
          </div>

          {/* Marketplace Navigation */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-[#274c77] uppercase tracking-wider text-xs">
              Explore
            </h3>
            <Link href="/categories" className="hover:text-[#a3cef1] transition-colors">All Categories</Link>
            <Link href="/artisans" className="hover:text-[#a3cef1] transition-colors">Meet the Artisans</Link>
            <Link href="/about" className="hover:text-[#a3cef1] transition-colors">Our Story</Link>
          </div>

          {/* Support & Legal */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-[#274c77] uppercase tracking-wider text-xs">
              Support
            </h3>
            <Link href="/faq" className="hover:text-[#a3cef1] transition-colors">Help Center & FAQ</Link>
            <Link href="/terms" className="hover:text-[#a3cef1] transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-[#a3cef1] transition-colors">Privacy Policy</Link>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="border-t border-[#8b8c89]/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}