import PageContainer from "@/components/PageContainer";
import SellerProfileForm from "@/components/seller/SellerProfileForm";

export default function SellerProfilePage() {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#274c77]">Seller Profile</h1>
        <p className="text-[#8b8c89] mt-2">
          Set up your shop profile so buyers can learn about you and your craft.
        </p>
      </div>
      <SellerProfileForm />
    </PageContainer>
  );
}
