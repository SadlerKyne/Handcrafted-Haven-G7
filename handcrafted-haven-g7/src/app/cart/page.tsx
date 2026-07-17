export default function CartPage() {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#274c77] mb-6">Your Cart</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
          <p className="text-gray-600 mb-4">Your cart is currently empty.</p>
          <button className="bg-[#274c77] text-white px-6 py-2 rounded-full font-semibold">
            Keep Shopping
          </button>
        </div>
      </div>
    );
  }