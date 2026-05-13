import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * This app uses API routes (not Server Actions) for all mutations.
 * Intercept POST requests carrying a Next-Action header — these come from
 * deployment health-check probes or stale cached clients. Returning 404 here
 * prevents the action-handler from running and logging spurious errors.
 */
export function proxy(request: NextRequest) {
  if (request.method === "POST" && request.headers.has("next-action")) {
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
