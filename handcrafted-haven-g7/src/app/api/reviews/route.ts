import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Reviews";

// GET /api/reviews?productId=123
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID parameter is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { productId, rating, comment } = await req.json();

    if (!productId || !rating || !comment) {
      return NextResponse.json(
        { error: "Product ID, rating, and comment are required" },
        { status: 400 }
      );
    }

    const review = await Review.create({
      productId,
      userId: session.user.id,
      userName: session.user.name || "Anonymous",
      rating: Number(rating),
      comment,
    });

    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}