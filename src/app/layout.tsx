import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

/* export const metadata: Metadata = {
  title: "REST API app",
  description: "Generated by create next app",
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  interface LinkProps {
    href: string;
    name: string;
  }

  const MyLink = ({ href, name }: LinkProps) => {
    return (
      <>
        <Link className="bg-cyan-950 text-white p-4" href={href}>
          {name}
        </Link>
      </>
    );
  };

  const nav = [
    { id: 1, href: "/", name: "Domů" },
    { id: 2, href: "/pokemon/create", name: "Přidat záznam" },
  ];

  return (
    <html lang="cs">
      <body className={inter.className}>
        <nav className="flex justify-center gap-5">
          {nav.map((e) => (
            <>
              <MyLink key={e.id} href={e.href} name={e.name}></MyLink>
            </>
          ))}
        </nav>
        {children}
      </body>
    </html>
  );
}
