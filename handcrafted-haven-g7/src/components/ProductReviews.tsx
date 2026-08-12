"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface ReviewItem {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/products/${productId}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch {
      console.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to submit review");
      }

      setComment("");
      setRating(5);
      fetchReviews();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="mt-12 bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-transparent hover:border-[#a3cef1] transition-colors">
      <div className="flex items-center justify-between border-b border-[#e7ecef] pb-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#274c77]">Customer Reviews</h2>
          {avgRating && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-amber-500 font-bold text-lg">
                {"★".repeat(Math.round(Number(avgRating)))}
                {"☆".repeat(5 - Math.round(Number(avgRating)))}
              </span>
              <span className="text-[#274c77] font-semibold">{avgRating} out of 5</span>
              <span className="text-sm text-[#8b8c89]">({reviews.length} reviews)</span>
            </div>
          )}
        </div>
      </div>

      {/* Write a Review Form */}
      {session?.user ? (
        <form onSubmit={handleSubmit} className="mb-10 bg-[#e7ecef] p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-[#274c77] mb-3">Leave a Review</h3>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#274c77] mb-1">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-amber-500" : "text-[#8b8c89]"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#274c77] mb-1">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              required
              placeholder="Share your thoughts about this handcrafted item..."
              className="w-full p-3 rounded-lg border border-[#a3cef1] focus:outline-none focus:ring-2 focus:ring-[#6096ba] text-[#274c77]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#274c77] hover:bg-[#6096ba] text-white font-bold py-2 px-6 rounded-full transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-[#8b8c89] mb-8 bg-[#e7ecef] p-4 rounded-xl">
          Please log in to leave a review for this product.
        </p>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-[#8b8c89]">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="border-b border-[#e7ecef] pb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#274c77]">{rev.userName}</span>
                <span className="text-xs text-[#8b8c89]">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="text-amber-500 text-sm mb-2">
                {"★".repeat(rev.rating)}
                {"☆".repeat(5 - rev.rating)}
              </div>
              <p className="text-[#274c77] text-sm leading-relaxed whitespace-pre-wrap">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}