"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import type { SellerProfile } from "@/lib/seller-data";

const emptyProfile: SellerProfile = {
  id: "",
  name: "",
  shopName: "",
  email: "",
  bio: "",
  avatarUrl: null,
  location: "",
  createdAt: "",
  updatedAt: "",
};

export default function SellerProfileForm() {
  const [profile, setProfile] = useState<SellerProfile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/seller/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => setError("Could not load profile."))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/seller/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed.");
      setProfile(data);
      setMessage("Profile saved successfully.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-[#6096ba]">
        <Loader2 className="animate-spin mr-2" size={20} />
        Loading profile...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <aside className="md:col-span-1">
        <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-28 h-28 rounded-full overflow-hidden bg-[#e7ecef] mb-4 border-2 border-[#a3cef1]">
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#6096ba] text-3xl font-bold">
                  {profile.name.charAt(0) || "?"}
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-[#274c77]">{profile.shopName}</h2>
            <p className="text-sm text-[#8b8c89] mt-1">{profile.location}</p>
          </div>
          <nav className="space-y-2 text-sm">
            <Link
              href="/seller/profile"
              className="block px-3 py-2 rounded-md bg-[#e7ecef] text-[#274c77] font-medium"
            >
              Profile & Shop Info
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-[#6096ba] hover:bg-[#e7ecef] transition-colors"
            >
              Product Dashboard
            </Link>
          </nav>
        </div>
      </aside>

      <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
        <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
          <h2 className="text-lg font-bold text-[#274c77] mb-4">Shop Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#274c77] mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
                required
              />
            </div>
            <div>
              <label htmlFor="shopName" className="block text-sm font-medium text-[#274c77] mb-1">
                Shop Name
              </label>
              <input
                id="shopName"
                type="text"
                value={profile.shopName}
                onChange={(e) => setProfile({ ...profile, shopName: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#274c77] mb-1">
                Contact Email
              </label>
              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-[#274c77] mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="bio" className="block text-sm font-medium text-[#274c77] mb-1">
              Your Story / Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6096ba]"
              placeholder="Tell buyers about your craft and what makes your work special..."
            />
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
          <ImageUpload
            label="Profile Photo"
            value={profile.avatarUrl}
            onChange={(url) => setProfile({ ...profile, avatarUrl: url })}
            aspectSquare
          />
        </div>

        {message && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-3 text-sm">
            <CheckCircle2 size={18} />
            {message}
          </div>
        )}
        {error && (
          <div className="text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#274c77] hover:bg-[#6096ba] disabled:opacity-60 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
          <Link
            href="/dashboard"
            className="text-center border border-[#6096ba] text-[#6096ba] hover:bg-[#e7ecef] px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
}
