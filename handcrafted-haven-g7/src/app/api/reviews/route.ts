import { NextResponse } from "next/server";
import { auth } from "../../../auth";
import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Reviews";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id: productId } = await params;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id: productId } = await params;
    const { rating, comment } = await req.json();

    if (!rating || !comment) {
      return NextResponse.json(
        { error: "Rating and comment are required" },
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