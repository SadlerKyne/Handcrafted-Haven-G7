export default function Footer() {
  return (
    <footer className="w-full bg-[#f8f9fa] border-t border-gray-200 py-12 mt-auto">
      <div className="w-full px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Footer Logo/Brand */}
          <div className="text-center md:text-left">
            <h2 className="font-bold text-xl text-[#274c77]">Handcrafted Haven</h2>
            <p className="text-sm text-gray-500 mt-1">© 2026 All rights reserved.</p>
          </div>

          {/* Footer Links */}
          <div className="flex gap-8 text-sm font-medium text-[#274c77]">
            <a href="#" className="hover:text-[#6096ba]">About</a>
            <a href="#" className="hover:text-[#6096ba]">Artisans</a>
            <a href="#" className="hover:text-[#6096ba]">Contact</a>
            <a href="#" className="hover:text-[#6096ba]">Privacy</a>
          </div>

          {/* Social Placeholder */}
          <div className="text-sm text-gray-500">
            Follow us on social media
          </div>
        </div>
      </div>
    </footer>
  );
}