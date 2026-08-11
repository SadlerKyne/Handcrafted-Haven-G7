import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import {
  getSellerNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../../../lib/seller-data";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "seller") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const notifications = await getSellerNotifications(session.user.id);
    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json({ error: "Failed to fetch notifications." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "seller") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const { id, all } = body as { id?: string; all?: boolean };

    if (all) {
      await markAllNotificationsRead(session.user.id);
    } else if (id) {
      const updated = await markNotificationRead(id, session.user.id);
      if (!updated) {
        return NextResponse.json({ error: "Notification not found." }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Missing id or all." }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update notification:", error);
    return NextResponse.json({ error: "Failed to update notification." }, { status: 500 });
  }
}
