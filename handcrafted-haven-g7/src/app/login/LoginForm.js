"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
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
          autoComplete="current-password"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274c77]"
        />
      </div>

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
        {submitting ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center mt-6 text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[#274c77] font-medium hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
