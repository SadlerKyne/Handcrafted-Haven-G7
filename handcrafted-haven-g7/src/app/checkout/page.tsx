import PageContainer from "@/components/PageContainer";

export default function CheckoutPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-[#274c77] mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-bold mb-4">Shipping & Payment</h2>
          <p className="text-[#8b8c89]">Forms go here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="font-bold mb-4">Order Summary</h2>
          <p className="text-[#8b8c89]">Cart totals go here.</p>
        </div>
      </div>
    </PageContainer>
  );
}
