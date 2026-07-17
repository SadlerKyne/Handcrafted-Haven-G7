export default function ProfilePage() {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#274c77] mb-6">Account Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 border border-gray-200 rounded-lg p-6">
            <h2 className="font-bold text-lg mb-2">Navigation</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Purchases & Reviews</li>
              <li>Messages</li>
              <li>Account Settings</li>
            </ul>
          </div>
          <div className="col-span-2 border border-gray-200 rounded-lg p-6">
            <h2 className="font-bold text-lg mb-2">Profile Details</h2>
            <p className="text-gray-600">User details and settings will go here.</p>
          </div>
        </div>
      </div>
    );
  }