import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { NextResponse, NextRequest } from "next/server";
import instance from "./app/axios";

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: session,
    httpOnly: true,
    expires: expires,
  });
  return res;
}

// JWT methods

function getDecodedJwt() {
  const session = cookies().get("session")?.value;
  if (session) {
    return jwtDecode(session);
  }
  return {};
}

export async function getSessionUsername() {
  return getDecodedJwt().sub || "username"
}

export async function getSessionRoles() {
  //@ts-ignore
  return getDecodedJwt().roles || []
}

export async function isUserAdmin() {
  const roles = await getSessionRoles();
  return roles.includes("ROLE_ADMIN");
}
