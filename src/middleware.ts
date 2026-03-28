import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // eventos.alcaincaac.pt → /admin/eventos
  if (host === "eventos.alcaincaac.pt" || host === "eventos.localhost:3000") {
    if (!pathname.startsWith("/admin/eventos") && !pathname.startsWith("/_next") && !pathname.startsWith("/api") && !pathname.startsWith("/images")) {
      const url = request.nextUrl.clone();
      url.pathname = `/admin/eventos${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // caixa.alcaincaac.pt → /admin/caixa
  if (host === "caixa.alcaincaac.pt" || host === "caixa.localhost:3000") {
    if (!pathname.startsWith("/admin/caixa") && !pathname.startsWith("/_next") && !pathname.startsWith("/api") && !pathname.startsWith("/images")) {
      const url = request.nextUrl.clone();
      url.pathname = `/admin/caixa${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
