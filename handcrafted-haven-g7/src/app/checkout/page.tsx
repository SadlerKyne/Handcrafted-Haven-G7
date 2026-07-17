export default function CheckoutPage() {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#274c77] mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="font-bold mb-4">Shipping & Payment</h2>
            <p className="text-gray-600">Forms go here.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="font-bold mb-4">Order Summary</h2>
            <p className="text-gray-600">Cart totals go here.</p>
          </div>
        </div>
      </div>
    );
  }