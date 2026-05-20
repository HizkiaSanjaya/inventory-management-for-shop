import { NextResponse } from "next/server";

export function middleware(request) {
  // Ambil data token sesi dari browser (nantinya diganti token asli dari database Supabase)
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;
  const { pathname } = request.nextUrl;

  // Skenario A: Pengguna belum login tapi nekat ingin masuk ke dashboard utama (/)
  if (!isLoggedIn && pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Skenario B: Pengguna sudah sukses login tapi iseng ingin kembali membuka halaman /login
  if (isLoggedIn && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Tentukan rute halaman mana saja yang wajib diawasi oleh pos satpam ini
export const config = {
  matcher: ["/", "/login"],
};