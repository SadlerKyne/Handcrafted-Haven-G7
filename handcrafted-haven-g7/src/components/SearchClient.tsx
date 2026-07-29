"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, Trash2, Inbox } from "lucide-react";
import type { SellerProduct } from "../lib/seller-data";

type SearchClientProps = {
  initialProducts: SellerProduct[];
  categories: string[];
  initialFilters: {
    q: string;
    category: string;
    minPrice: string;
    maxPrice: string;
  };
};

export default function SearchClient({
  initialProducts,
  categories,
  initialFilters,
}: SearchClientProps) {
  const router = useRouter();
  const [q, setQ] = useState(initialFilters.q);
  const [category, setCategory] = useState(initialFilters.category);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);

  const applyFilters = (updates?: {
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => {
    const params = new URLSearchParams();
    const activeQ = updates?.q !== undefined ? updates.q : q;
    const activeCategory = updates?.category !== undefined ? updates.category : category;
    const activeMinPrice = updates?.minPrice !== undefined ? updates.minPrice : minPrice;
    const activeMaxPrice = updates?.maxPrice !== undefined ? updates.maxPrice : maxPrice;

    if (activeQ.trim()) params.set("q", activeQ.trim());
    if (activeCategory) params.set("category", activeCategory);
    if (activeMinPrice) params.set("minPrice", activeMinPrice);
    if (activeMaxPrice) params.set("maxPrice", activeMaxPrice);

    router.replace(`/search?${params.toString()}`);
  };

  const handleReset = () => {
    setQ("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    router.replace("/search");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#274c77]">Marketplace Search</h1>
        <p className="text-[#8b8c89] mt-1">Discover unique handcrafted products</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-[#274c77]">
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </div>
            {(q || category || minPrice || maxPrice) && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-medium transition-colors"
              >
                <Trash2 size={12} />
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="search-input" className="block text-xs font-semibold text-[#274c77] uppercase tracking-wider mb-2">
                Keyword Search
              </label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search products..."
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") applyFilters();
                  }}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6096ba] text-sm"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>

            <div>
              <label htmlFor="category-select" className="block text-xs font-semibold text-[#274c77] uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  applyFilters({ category: e.target.value });
                }}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba] text-sm bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#274c77] uppercase tracking-wider mb-2">
                Price Range ($)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  aria-label="Minimum Price"
                  type="number"
                  placeholder="Min"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  onBlur={() => applyFilters()}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba] text-sm"
                />
                <input
                  aria-label="Maximum Price"
                  type="number"
                  placeholder="Max"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onBlur={() => applyFilters()}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba] text-sm"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => applyFilters()}
              className="w-full bg-[#274c77] hover:bg-[#6096ba] text-white py-2 rounded-md font-medium text-sm transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        <main className="lg:col-span-3">
          {initialProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center flex flex-col items-center justify-center">
              <Inbox size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-[#274c77] mb-1">No products found</h3>
              <p className="text-[#8b8c89] text-sm mb-4">Try clearing your filters or using different keywords.</p>
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#274c77] hover:bg-[#6096ba] text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {initialProducts.map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#a3cef1] transition-all flex flex-col"
                >
                  <div className="relative aspect-square w-full bg-[#e7ecef]">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8b8c89] text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-xs uppercase tracking-wider text-[#8b8c89] mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-[#274c77] hover:text-[#6096ba] line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-[#8b8c89] line-clamp-2 mt-1 mb-3 flex-grow">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                      <span className="font-bold text-[#274c77]">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#8b8c89]">
                        {product.stockQuantity} in stock
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
