"use server";
import "@/app/globals.css";
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className="h-full bg-white">
      <body className="h-full">{children}</body>
    </html>
  );
}
