"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PageContainer from "../../components/PageContainer";
import { useCart } from "../../components/cart/CartProvider";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shipping, setShipping] = useState({
    name: session?.user?.name || "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  if (items.length === 0) {
    return (
      <PageContainer>
        <h1 className="text-3xl font-bold text-[#274c77] mb-6">Checkout</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
          <p className="text-[#8b8c89] mb-4">Your cart is empty, so there&apos;s nothing to check out.</p>
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!/^\d{13,19}$/.test(payment.cardNumber.replace(/\s/g, ""))) {
      setError("Enter a valid mock card number (13-19 digits).");
      setSubmitting(false);
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) {
      setError("Enter a valid expiry date (MM/YY).");
      setSubmitting(false);
      return;
    }
    if (!/^\d{3,4}$/.test(payment.cvc)) {
      setError("Enter a valid CVC.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          shippingAddress: shipping,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Order could not be placed.");

      clearCart();
      router.push(`/checkout/confirmation/${data.id}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Order could not be placed.");
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-[#274c77] mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="font-bold mb-4 text-[#274c77]">Shipping Address</h2>
            <div className="space-y-3">
              <input
                required
                placeholder="Full name"
                value={shipping.name}
                onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
              />
              <input
                required
                placeholder="Street address"
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  required
                  placeholder="City"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className="col-span-1 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
                />
                <input
                  required
                  placeholder="State"
                  value={shipping.state}
                  onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                  className="col-span-1 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
                />
                <input
                  required
                  placeholder="ZIP"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  className="col-span-1 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="font-bold mb-1 text-[#274c77]">Payment</h2>
            <p className="text-xs text-[#8b8c89] mb-4">
              Mock payment form — no real card is charged and no data is sent to a payment processor.
            </p>
            <div className="space-y-3">
              <input
                required
                placeholder="Card number"
                value={payment.cardNumber}
                onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="MM/YY"
                  value={payment.expiry}
                  onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
                />
                <input
                  required
                  placeholder="CVC"
                  value={payment.cvc}
                  onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
                  className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit space-y-4">
          <h2 className="font-bold text-[#274c77]">Order Summary</h2>
          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between text-[#8b8c89]">
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <span className="text-[#274c77]">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-gray-100 pt-3 font-semibold text-[#274c77]">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#274c77] hover:bg-[#6096ba] disabled:opacity-60 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            {submitting ? "Placing order..." : "Place Order (Mock Payment)"}
          </button>
        </div>
      </form>
    </PageContainer>
  );
}
