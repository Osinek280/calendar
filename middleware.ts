import { NextResponse } from "next/server";

let clerkMiddleware: (arg0: (auth: any, req: any) => any) => { (arg0: any): any; new(): any; }, createRouteMatcher;

try {
  ({ clerkMiddleware, createRouteMatcher } = require("@clerk/nextjs/server"));
} catch (error) {
  console.warn("Clerk modules not available. Auth will be disabled.");
}


const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"])

export default function middleware(req: any) {
  return clerkMiddleware(async (auth, req) => {
    const resolvedAuth = await auth();

    if (!resolvedAuth.userId && isProtectedRoute(req)) {
      return resolvedAuth.redirectToSignIn();
    } else {
      return NextResponse.next();
    }
  })(req);
}

export const middlewareConfig = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};