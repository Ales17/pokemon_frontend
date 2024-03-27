"use client";
import "@/app/globals.css";
import { Navigation } from "../components/Navigation";

import { UserPanel } from "../components/UserPanel";
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const navItems = [
    { href: "/", name: "Domů" },
    { href: "/pokemon/create", name: "Nový záznam" },
  ];

  return (
    <html lang="cs">
      <body className="flex flex-col md:px-[10vw] bg-sky-100">
        <div className="min-h-screen bg-white p-2 md:p-6 ">
          <div className="flex flex-col gap-2 mb-4 md:flex-row md:justify-between ">
            <Navigation items={navItems} />
            <UserPanel />
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
