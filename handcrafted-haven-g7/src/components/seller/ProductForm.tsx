"use client";

import { FormEvent, useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import type { SellerProduct } from "@/lib/seller-data";

const CATEGORIES = [
  "Home & Living",
  "Jewelry",
  "Ceramics",
  "Textiles",
  "Woodwork",
  "Art",
  "Other",
];

type ProductFormProps = {
  initial?: SellerProduct | null;
  onSuccess: () => void;
  onCancel: () => void;
};

const emptyForm = {
  title: "",
  description: "",
  price: "",
  category: CATEGORIES[0],
  imageUrl: null as string | null,
  stockQuantity: "1",
};

export default function ProductForm({ initial, onSuccess, onCancel }: ProductFormProps) {
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          price: String(initial.price),
          category: initial.category,
          imageUrl: initial.imageUrl,
          stockQuantity: String(initial.stockQuantity),
        }
      : emptyForm
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const url = initial
        ? `/api/seller/products/${initial.id}`
        : "/api/seller/products";
      const method = initial ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: form.price,
          category: form.category,
          imageUrl: form.imageUrl,
          stockQuantity: form.stockQuantity,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed.");
      onSuccess();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm space-y-5">
      <h2 className="text-lg font-bold text-[#274c77]">
        {initial ? "Edit Product" : "Add New Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-[#274c77] mb-1">
            Product Title
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-[#274c77] mb-1">
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
            required
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-[#274c77] mb-1">
            Stock Quantity
          </label>
          <input
            id="stock"
            type="number"
            min="0"
            step="1"
            value={form.stockQuantity}
            onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="category" className="block text-sm font-medium text-[#274c77] mb-1">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba] bg-white"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-[#274c77] mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
            required
          />
        </div>
      </div>

      <ImageUpload
        label="Product Image"
        value={form.imageUrl}
        onChange={(url) => setForm({ ...form, imageUrl: url })}
      />

      {error && (
        <div className="text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#274c77] hover:bg-[#6096ba] disabled:opacity-60 text-white px-6 py-2.5 rounded-full font-semibold transition-colors"
        >
          {saving ? "Saving..." : initial ? "Update Product" : "Publish Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 text-[#8b8c89] hover:bg-[#e7ecef] px-6 py-2.5 rounded-full font-semibold transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
