import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8f9fa] border-t border-gray-200 py-12 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-bold text-xl text-[#274c77]">Handcrafted Haven</h2>
            <p className="text-sm text-[#8b8c89] mt-1">© 2026 All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-[#274c77]">
            <Link href="/" className="hover:text-[#6096ba] transition-colors">
              Home
            </Link>
            <Link href="/seller/profile" className="hover:text-[#6096ba] transition-colors">
              Sell on Haven
            </Link>
            <Link href="/dashboard" className="hover:text-[#6096ba] transition-colors">
              Dashboard
            </Link>
            <a href="#" className="hover:text-[#6096ba] transition-colors">
              Contact
            </a>
          </div>

          <div className="text-sm text-[#8b8c89] text-center md:text-right">
            Follow us on social media
          </div>
        </div>
      </div>
    </footer>
  );
}
