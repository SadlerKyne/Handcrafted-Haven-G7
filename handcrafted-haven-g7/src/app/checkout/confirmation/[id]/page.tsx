import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import PageContainer from "../../../../components/PageContainer";
import { auth } from "../../../../auth";
import dbConnect from "../../../../lib/dbConnect";
import Order from "../../../../models/Order";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    notFound();
  }

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    notFound();
  }

  await dbConnect();
  const order = await Order.findOne({ _id: id, buyerId: session.user.id }).lean();
  if (!order) {
    notFound();
  }

  return (
    <PageContainer narrow>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <CheckCircle2 className="mx-auto text-green-600 mb-4" size={48} />
        <h1 className="text-2xl font-bold text-[#274c77] mb-2">Order Placed!</h1>
        <p className="text-[#8b8c89] mb-6">
          This is a mock order — no real payment was processed.
        </p>

        <div className="text-left border-t border-gray-100 pt-4 space-y-2">
          {order.items.map((item: { title: string; price: number; quantity: number }, index: number) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-[#8b8c89]">
                {item.title} &times; {item.quantity}
              </span>
              <span className="text-[#274c77]">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t border-gray-100 mt-4 pt-4 font-semibold text-[#274c77]">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/orders"
            className="bg-[#274c77] hover:bg-[#6096ba] text-white px-6 py-2.5 rounded-full font-semibold transition-colors"
          >
            View My Orders
          </Link>
          <Link
            href="/"
            className="text-[#6096ba] hover:text-[#274c77] font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
