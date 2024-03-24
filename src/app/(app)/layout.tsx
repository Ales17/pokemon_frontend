"use server";
import "@/app/globals.css";
import { MyLink } from "@/app/components/MyLink";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { Navigation } from "../components/Navigation";
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const links = [
    { href: "/", name: "Domů" },
    { href: "/pokemon/create", name: "Nový záznam" },
  ];

  return (
    <html lang="cs">
      <body className="p-2 flex flex-col">
        <Navigation className="pb-2" links={links} />
        <div>{children}</div>
      </body>
    </html>
  );
}
