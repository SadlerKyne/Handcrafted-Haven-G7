import PageContainer from "@/components/PageContainer";
import Link from "next/link";

export default function LoginPage() {
  return (
    <PageContainer narrow>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-[#274c77] mb-6 text-center">Welcome Back</h1>
        <p className="text-[#8b8c89] text-center mb-6">
          Login and registration forms will go here.
        </p>
        <p className="text-center text-sm text-[#8b8c89]">
          Selling on Handcrafted Haven?{" "}
          <Link href="/seller/profile" className="text-[#6096ba] hover:text-[#274c77] font-medium">
            Set up your seller profile
          </Link>
        </p>
      </div>
    </PageContainer>
  );
}
