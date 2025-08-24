import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect main app routes but skip static files
    "/((?!_next|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|css|js|json)$).*)",
    "/documents/:path*", // ✅ Protect document routes only for real IDs
    "/(api|trpc)(.*)", // ✅ Protect API routes
  ],
};
