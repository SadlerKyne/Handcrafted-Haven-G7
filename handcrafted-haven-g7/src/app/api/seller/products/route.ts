import { NextRequest, NextResponse } from "next/server";
import {
  createSellerProduct,
  getSellerProducts,
} from "@/lib/seller-data";

export async function GET() {
  try {
    const products = await getSellerProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, price, category, imageUrl, stockQuantity } = body;

    if (!title?.trim() || !description?.trim() || !category?.trim()) {
      return NextResponse.json(
        { error: "Title, description, and category are required." },
        { status: 400 }
      );
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ error: "Price must be a valid number." }, { status: 400 });
    }

    const parsedStock = Number(stockQuantity ?? 1);
    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      return NextResponse.json({ error: "Stock must be a whole number." }, { status: 400 });
    }

    const product = await createSellerProduct({
      title: String(title).trim(),
      description: String(description).trim(),
      price: parsedPrice,
      category: String(category).trim(),
      imageUrl: imageUrl || null,
      stockQuantity: parsedStock,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}
