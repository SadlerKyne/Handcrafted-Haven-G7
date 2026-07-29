import { NextResponse } from "next/server";
import { auth } from "./auth.js";

// Wrapping the middleware in `auth()` gives us `req.auth` (the session, or
// null) on every matched request without an extra database round trip.
export default auth((req) => {
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    // Send the user back to where they were headed after they log in.
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
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
  ],
};
