"use client";

import { useEffect, useState } from "react";
import { Bell, Loader2, Package } from "lucide-react";

type SellerNotification = {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  quantity: number;
  buyerName: string;
  read: boolean;
  createdAt: string;
};

function formatTimeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function SellerNotifications() {
  const [notifications, setNotifications] = useState<SellerNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = () => {
    setLoading(true);
    fetch("/api/seller/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch(() => setError("Could not load notifications."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    await fetch("/api/seller/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  const markAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await fetch("/api/seller/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ all: true }),
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-[#6096ba]">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#274c77] flex items-center gap-2">
          <Bell size={18} />
          Order Notifications
        </h2>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className="text-sm text-[#6096ba] hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-sm text-[#8b8c89] py-8 text-center">
          No notifications yet. You&apos;ll be notified here when someone orders one of your items.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`flex items-start gap-3 py-4 px-2 -mx-2 rounded-md ${
                notification.read ? "" : "bg-[#e7ecef]"
              }`}
            >
              <div className="mt-0.5 text-[#6096ba]">
                <Package size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#274c77]">
                  <span className="font-semibold">{notification.buyerName}</span> ordered{" "}
                  <span className="font-semibold">
                    {notification.quantity}x {notification.productTitle}
                  </span>
                </p>
                <p className="text-xs text-[#8b8c89] mt-1">
                  {formatTimeAgo(notification.createdAt)}
                </p>
              </div>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => markRead(notification.id)}
                  className="text-xs text-[#6096ba] hover:underline whitespace-nowrap"
                >
                  Mark read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
