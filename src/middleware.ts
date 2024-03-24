import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.cookies.get("pika")?.value;

  if (!auth && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  } /* else if (auth && request.nextUrl.pathname.startsWith("/logout")) {
    const response = NextResponse.next()
    response.cookies.delete("pika")
    return Response.redirect(new URL("/login", request.url));
  } */
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
