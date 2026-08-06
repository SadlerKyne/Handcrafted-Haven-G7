"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./cart/CartProvider";

type AddToCartButtonProps = {
  productId: string;
  title: string;
  price: number;
  imageUrl: string | null;
  sellerId: string;
  inStock: boolean;
};

export default function AddToCartButton({
  productId,
  title,
  price,
  imageUrl,
  sellerId,
  inStock,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem({ productId, title, price, imageUrl, sellerId }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={!inStock}
        className="w-full bg-[#274c77] hover:bg-[#6096ba] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-full transition-colors shadow-md text-lg"
      >
        {!inStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
      </button>
      {added && (
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="text-sm text-[#6096ba] hover:text-[#274c77] underline text-center"
        >
          View Cart
        </button>
      )}
    </div>
  );
}
