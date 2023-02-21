import { verifyAuth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('USER_LOGIN')?.value
  console.log(token,'token')
  
  const verifiedToken = token && (await verifyAuth(token.replace('"', "")).catch((err) => { 
    console.log(err,'token0000000000000000001313131')
   }));
  console.log(verifiedToken,'token000000000000000000') 
  if (req.nextUrl.pathname.startsWith('/login') && !verifiedToken) {
    console.log('luong 1')
    return
  }

  if (req.url.includes("/login") && verifiedToken) {
    console.log('luong 2')
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!verifiedToken) {
    console.log('luong 3')
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/login"],
};
