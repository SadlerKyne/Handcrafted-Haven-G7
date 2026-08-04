"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import PageContainer from "../../components/PageContainer";
import { useCart } from "../../components/cart/CartProvider";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <PageContainer>
        <h1 className="text-3xl font-bold text-[#274c77] mb-6">Your Cart</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
          <p className="text-[#8b8c89] mb-4">Your cart is currently empty.</p>
          <Link
            href="/"
            className="inline-block bg-[#274c77] hover:bg-[#6096ba] text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Keep Shopping
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-[#274c77] mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[#e7ecef] shrink-0">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#8b8c89]">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.productId}`}
                  className="font-medium text-[#274c77] hover:text-[#6096ba] line-clamp-1"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-[#8b8c89] mt-1">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="p-1.5 border border-gray-200 rounded-md text-[#274c77] hover:bg-[#e7ecef]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="p-1.5 border border-gray-200 rounded-md text-[#274c77] hover:bg-[#e7ecef]"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <p className="font-semibold text-[#274c77] w-20 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                type="button"
                onClick={() => removeItem(item.productId)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                aria-label={`Remove ${item.title}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit space-y-4">
          <h2 className="font-bold text-[#274c77]">Order Summary</h2>
          <div className="flex justify-between text-[#8b8c89]">
            <span>Subtotal</span>
            <span className="font-semibold text-[#274c77]">${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block text-center bg-[#274c77] hover:bg-[#6096ba] text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
