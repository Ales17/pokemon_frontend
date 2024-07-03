"use server";

import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

/* export async function handleLogin(sessionData: any) {
  const encryptedSessionData = JSON.stringify(sessionData); // TODO Encrypt session data
  cookies().set("session", encryptedSessionData, {
  
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
  // Redirect or handle the response after setting the cookie
  // IMPLEMENTED ON THE LOGIN PAGE - CLIENT SIDE REDIRECT
  
} */

export async function handleLogout() {
  cookies().delete("session")
  redirect("/login")
}