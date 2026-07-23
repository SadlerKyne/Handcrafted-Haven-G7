import { NextRequest, NextResponse } from "next/server";
import { getSellerProfile, updateSellerProfile } from "@/lib/seller-data";

export async function GET() {
  try {
    const profile = await getSellerProfile();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Failed to fetch seller profile:", error);
    return NextResponse.json({ error: "Failed to fetch seller profile." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, shopName, email, bio, avatarUrl, location } = body;

    const profile = await updateSellerProfile({
      ...(name !== undefined && { name: String(name).trim() }),
      ...(shopName !== undefined && { shopName: String(shopName).trim() }),
      ...(email !== undefined && { email: String(email).trim() }),
      ...(bio !== undefined && { bio: String(bio).trim() }),
      ...(avatarUrl !== undefined && { avatarUrl: avatarUrl || null }),
      ...(location !== undefined && { location: String(location).trim() }),
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Failed to update seller profile:", error);
    return NextResponse.json({ error: "Failed to update seller profile." }, { status: 500 });
  }
}
