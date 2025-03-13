import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // List of valid section IDs
  const validSections = ["work", "testimonials", "faq"];

  if (validSections.includes(path.slice(1))) {
    // Rewrite to home page but maintain the URL
    return NextResponse.rewrite(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/work", "/testimonials", "/faq"],
};
