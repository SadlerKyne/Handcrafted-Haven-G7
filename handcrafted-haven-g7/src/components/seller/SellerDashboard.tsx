"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit2, Loader2, Package, Trash2 } from "lucide-react";
import ProductForm from "@/components/seller/ProductForm";
import type { SellerProduct, SellerProfile } from "@/lib/seller-data";

export default function SellerDashboard() {
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SellerProduct | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsRes, profileRes] = await Promise.all([
        fetch("/api/seller/products"),
        fetch("/api/seller/profile"),
      ]);
      setProducts(await productsRes.json());
      setProfile(await profileRes.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const response = await fetch(`/api/seller/products/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed.");
      await loadData();
    } catch {
      alert("Could not delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingProduct(null);
    await loadData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-[#6096ba]">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#274c77]">Seller Dashboard</h1>
          <p className="text-[#8b8c89] mt-1">
            Manage inventory for {profile?.shopName || "your shop"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/seller/profile"
            className="text-center border border-[#6096ba] text-[#6096ba] hover:bg-[#e7ecef] px-5 py-2.5 rounded-full font-semibold transition-colors"
          >
            Edit Profile
          </Link>
          {!showForm && !editingProduct && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="bg-[#6096ba] hover:bg-[#274c77] text-white px-5 py-2.5 rounded-full font-semibold transition-colors"
            >
              + Add New Product
            </button>
          )}
        </div>
      </div>

      {(showForm || editingProduct) && (
        <ProductForm
          initial={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Package size={20} className="text-[#6096ba]" />
          <h2 className="font-bold text-[#274c77]">Your Products ({products.length})</h2>
        </div>

        {products.length === 0 ? (
          <div className="p-8 text-center text-[#8b8c89]">
            <p className="mb-4">No products yet. Add your first handcrafted item to get started.</p>
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="bg-[#274c77] hover:bg-[#6096ba] text-white px-6 py-2.5 rounded-full font-semibold transition-colors"
              >
                Add Your First Product
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#e7ecef]/50 text-sm text-[#274c77]">
                <tr>
                  <th className="px-4 md:px-6 py-3 font-semibold">Product</th>
                  <th className="px-4 md:px-6 py-3 font-semibold hidden md:table-cell">Category</th>
                  <th className="px-4 md:px-6 py-3 font-semibold">Price</th>
                  <th className="px-4 md:px-6 py-3 font-semibold hidden md:table-cell">Stock</th>
                  <th className="px-4 md:px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-gray-100">
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[#e7ecef] shrink-0">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-[#8b8c89]">
                              No img
                            </div>
                          )}
                        </div>
                        <div>
                          <Link
                            href={`/product/${product.id}`}
                            className="font-medium text-[#274c77] hover:text-[#6096ba]"
                          >
                            {product.title}
                          </Link>
                          <p className="text-xs text-[#8b8c89] md:hidden">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-[#8b8c89] hidden md:table-cell">
                      {product.category}
                    </td>
                    <td className="px-4 md:px-6 py-4 font-semibold text-[#274c77]">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-[#8b8c89] hidden md:table-cell">
                      {product.stockQuantity}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setEditingProduct(product);
                          }}
                          className="p-2 text-[#6096ba] hover:bg-[#e7ecef] rounded-md transition-colors"
                          aria-label={`Edit ${product.title}`}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                          aria-label={`Delete ${product.title}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
