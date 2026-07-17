export default function ArtisanDashboard() {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#274c77]">Seller Dashboard</h1>
          <button className="bg-[#6096ba] text-white px-4 py-2 rounded-md font-semibold">
            + Add New Product
          </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-600">Inventory management and order tracking will go here.</p>
        </div>
      </div>
    );
  }