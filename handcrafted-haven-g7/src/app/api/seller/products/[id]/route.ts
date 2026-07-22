import { NextRequest, NextResponse } from "next/server";
import {
  deleteSellerProduct,
  getSellerProductById,
  updateSellerProduct,
} from "@/lib/seller-data";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const product = await getSellerProductById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json({ error: "Failed to fetch product." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { title, description, price, category, imageUrl, stockQuantity } = body;

    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = String(title).trim();
    if (description !== undefined) updates.description = String(description).trim();
    if (category !== undefined) updates.category = String(category).trim();
    if (imageUrl !== undefined) updates.imageUrl = imageUrl || null;

    if (price !== undefined) {
      const parsedPrice = Number(price);
      if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
        return NextResponse.json({ error: "Price must be a valid number." }, { status: 400 });
      }
      updates.price = parsedPrice;
    }

    if (stockQuantity !== undefined) {
      const parsedStock = Number(stockQuantity);
      if (!Number.isInteger(parsedStock) || parsedStock < 0) {
        return NextResponse.json({ error: "Stock must be a whole number." }, { status: 400 });
      }
      updates.stockQuantity = parsedStock;
    }

    const product = await updateSellerProduct(id, updates);
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json({ error: "Failed to update product." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const deleted = await deleteSellerProduct(id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json({ error: "Failed to delete product." }, { status: 500 });
  }
}
