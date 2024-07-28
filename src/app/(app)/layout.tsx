"use server";
import "@/app/globals.css";
import {  getSessionRoles, getSessionUsername, isUserAdmin } from "../actions";
import { Navigation } from "../components/Navigation";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
 
  const username = await getSessionUsername();
  const admin = await isUserAdmin() 
  return (
    <html lang="cs">
      <body>
        <Navigation username={username || "..."} admin={admin}/>
        <>{children}</>
      </body>
    </html>
  );
}
