import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import dbConnect from "../../../../lib/dbConnect";
import Order from "../../../../models/Order";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await context.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    await dbConnect();
    const order = await Order.findOne({ _id: id, buyerId: session.user.id }).lean();
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({
      id: order._id.toString(),
      items: order.items,
      shippingAddress: order.shippingAddress,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
    });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return NextResponse.json({ error: "Failed to fetch order." }, { status: 500 });
  }
}
