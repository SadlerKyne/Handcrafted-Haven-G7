import PageContainer from "@/components/PageContainer";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-[#274c77] mb-6">Account Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 border border-gray-200 rounded-lg p-6">
          <h2 className="font-bold text-lg mb-2">Navigation</h2>
          <ul className="space-y-2 text-[#8b8c89]">
            <li>Purchases & Reviews</li>
            <li>Messages</li>
            <li>Account Settings</li>
            <li>
              <Link href="/seller/profile" className="text-[#6096ba] hover:text-[#274c77]">
                Seller Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-2 border border-gray-200 rounded-lg p-6">
          <h2 className="font-bold text-lg mb-2">Profile Details</h2>
          <p className="text-[#8b8c89] mb-4">
            Buyer account settings will go here. To manage your shop and products, visit the seller area.
          </p>
          <Link
            href="/seller/profile"
            className="inline-block bg-[#274c77] hover:bg-[#6096ba] text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Go to Seller Profile
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
