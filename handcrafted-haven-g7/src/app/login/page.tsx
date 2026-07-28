import PageContainer from "@/components/PageContainer";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <PageContainer narrow>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-[#274c77] mb-6 text-center">Welcome Back</h1>
        <LoginForm />
        <p className="text-[#8b8c89] text-center mb-6">
          Selling on Handcrafted Haven?{" "}
          <Link href="/seller/profile" className="text-[#6096ba] hover:text-[#274c77] font-medium">
            Set up your seller profile
          </Link>
        </p>
      </div>
    </PageContainer>
  );
}
