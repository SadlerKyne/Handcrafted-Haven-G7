import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { getSellerProfile, updateSellerProfile } from "../../../../lib/seller-data";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "seller") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const profile = await getSellerProfile(session.user.id);
    if (!profile) {
      return NextResponse.json({ error: "Seller profile not found." }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Failed to fetch seller profile:", error);
    return NextResponse.json({ error: "Failed to fetch seller profile." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "seller") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { name, shopName, bio, avatarUrl, location } = body;

    if (!name || !shopName) {
      return NextResponse.json(
        { error: "Name and shop name are required." },
        { status: 400 }
      );
    }

    const profile = await updateSellerProfile(session.user.id, {
      name: String(name).trim(),
      shopName: String(shopName).trim(),
      bio: bio !== undefined ? String(bio).trim() : "",
      avatarUrl: avatarUrl || null,
      location: location !== undefined ? String(location).trim() : "",
    });

    if (!profile) {
      return NextResponse.json({ error: "Seller profile not found." }, { status: 404 });
    }

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error("Failed to create seller profile:", error);
    return NextResponse.json({ error: "Failed to create seller profile." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "seller") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { name, shopName, email, bio, avatarUrl, location } = body;

    const profile = await updateSellerProfile(session.user.id, {
      ...(name !== undefined && { name: String(name).trim() }),
      ...(shopName !== undefined && { shopName: String(shopName).trim() }),
      ...(bio !== undefined && { bio: String(bio).trim() }),
      ...(avatarUrl !== undefined && { avatarUrl: avatarUrl || null }),
      ...(location !== undefined && { location: String(location).trim() }),
    });

    if (!profile) {
      return NextResponse.json({ error: "Seller profile not found." }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Failed to update seller profile:", error);
    return NextResponse.json({ error: "Failed to update seller profile." }, { status: 500 });
  }
}
