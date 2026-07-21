"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    const result = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });

    setSubmitting(false);

    if (result?.error) {
      router.push("/login");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-12">
      <div className="w-full max-w-xl bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-[#274c77] mb-8 text-center">
          Create an account
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label htmlFor="name" className="block font-medium mb-1.5">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274c77]"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block font-medium mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274c77]"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block font-medium mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274c77]"
            />
          </div>

          <fieldset className="border border-gray-300 rounded-md p-4 mb-4">
            <legend className="font-medium px-1">I am a...</legend>
            <label className="flex items-center gap-2 my-2">
              <input type="radio" name="role" value="buyer" defaultChecked />
              Buyer
            </label>
            <label className="flex items-center gap-2 my-2">
              <input type="radio" name="role" value="seller" />
              Seller
            </label>
          </fieldset>

          {error && (
            <p role="alert" className="text-[#9b1c1c] mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#274c77] text-white font-bold rounded-md hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#274c77] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
