import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import Order from "../../../models/Order";

type OrderLineInput = { productId: string; quantity: number };

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await dbConnect();
    const orders = await Order.find({ buyerId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      orders.map((order) => ({
        id: order._id.toString(),
        items: order.items,
        shippingAddress: order.shippingAddress,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      }))
    );
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { items, shippingAddress } = body as {
      items: OrderLineInput[];
      shippingAddress: { name: string; address: string; city: string; state: string; zip: string };
    };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }
    if (
      !shippingAddress?.name?.trim() ||
      !shippingAddress?.address?.trim() ||
      !shippingAddress?.city?.trim() ||
      !shippingAddress?.state?.trim() ||
      !shippingAddress?.zip?.trim()
    ) {
      return NextResponse.json({ error: "A complete shipping address is required." }, { status: 400 });
    }

    await dbConnect();

    // Recompute pricing server-side from the current product records rather
    // than trusting client-supplied prices.
    const orderItems = [];
    let total = 0;

    for (const line of items) {
      const quantity = Number(line.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) {
        return NextResponse.json({ error: "Invalid quantity in cart." }, { status: 400 });
      }

      const product = await Product.findById(line.productId);
      if (!product) {
        return NextResponse.json({ error: "One of the items in your cart is no longer available." }, { status: 400 });
      }

      orderItems.push({
        productId: product._id,
        sellerId: product.sellerId,
        title: product.title,
        price: product.price,
        quantity,
        imageUrl: product.images?.[0] ?? null,
      });
      total += product.price * quantity;

      await Product.updateOne(
        { _id: product._id },
        { $inc: { stockQuantity: -quantity } }
      );
    }

    const order = await Order.create({
      buyerId: session.user.id,
      items: orderItems,
      shippingAddress,
      total,
    });

    return NextResponse.json({ id: order._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to place order." }, { status: 500 });
  }
}
