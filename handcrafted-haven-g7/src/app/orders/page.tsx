import Link from "next/link";
import PageContainer from "../../components/PageContainer";
import { auth } from "../../auth";
import dbConnect from "../../lib/dbConnect";
import Order from "../../models/Order";

export default async function OrdersPage() {
  const session = await auth();

  await dbConnect();
  const orders = session?.user
    ? await Order.find({ buyerId: session.user.id }).sort({ createdAt: -1 }).lean()
    : [];

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-[#274c77] mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
          <p className="text-[#8b8c89] mb-4">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/"
            className="inline-block bg-[#274c77] hover:bg-[#6096ba] text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#e7ecef]/50 text-sm text-[#274c77]">
              <tr>
                <th className="px-4 md:px-6 py-3 font-semibold">Date</th>
                <th className="px-4 md:px-6 py-3 font-semibold">Items</th>
                <th className="px-4 md:px-6 py-3 font-semibold">Total</th>
                <th className="px-4 md:px-6 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id.toString()} className="border-t border-gray-100">
                  <td className="px-4 md:px-6 py-4 text-[#8b8c89]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-[#8b8c89]">
                    {order.items.reduce(
                      (sum: number, item: { quantity: number }) => sum + item.quantity,
                      0
                    )}{" "}
                    item(s)
                  </td>
                  <td className="px-4 md:px-6 py-4 font-semibold text-[#274c77]">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-[#8b8c89] capitalize">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
