import { NextResponse } from "next/server";
import { auth } from "./auth.js";

const SELLER_ONLY_PREFIXES = ["/dashboard", "/seller"];

// Wrapping the proxy in `auth()` gives us `req.auth` (the session, or
// null) on every matched request without an extra database round trip.
export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    // Send the user back to where they were headed after they log in.
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isSellerOnlyPath = SELLER_ONLY_PREFIXES.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix),
  );

  if (isSellerOnlyPath && req.auth.user?.role !== "seller") {
    return NextResponse.redirect(new URL("/seller/profile", req.nextUrl.origin));
  }
});

// Only these routes require a logged-in session. Everything else (home,
// search, product pages, the login/register pages themselves) stays public.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/checkout/:path*",
    "/seller/:path*",
    "/orders/:path*",
  ],
};
