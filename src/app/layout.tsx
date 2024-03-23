"use server";
import "./globals.css";
import { MyLink } from "./components/MyLink";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const links = [
    { key: 1, href: "/", name: "Domů" },
    { key: 2, href: "/pokemon", name: "Seznam" },
    { key: 3, href: "/pokemon/create", name: "Nový záznam" },
  ];
  const cookie = cookies().get("pika");

  const Navigation = () => {
    return (
      <nav>
        <ul>
          {links.map((e) => {
            return <MyLink key={e.key} href={e.href} name={e.name} />;
          })}
        </ul>
      </nav>
    );
  };

  return (
    <html lang="cs">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
