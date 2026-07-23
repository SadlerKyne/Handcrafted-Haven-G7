import PageContainer from "@/components/PageContainer";
import Link from "next/link";

export default function CartPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-[#274c77] mb-6">Your Cart</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-[#8b8c89] mb-4">Your cart is currently empty.</p>
        <Link
          href="/"
          className="inline-block bg-[#274c77] hover:bg-[#6096ba] text-white px-6 py-2 rounded-full font-semibold transition-colors"
        >
          Keep Shopping
        </Link>
      </div>
    </PageContainer>
  );
}
