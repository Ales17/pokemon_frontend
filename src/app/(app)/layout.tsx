import "@/app/globals.css";
import { Navigation } from "../components/Navigation";
import { getSessionUsername } from "@/lib";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
   
  const username = await getSessionUsername();

  return (
    <html lang="cs">
      <body className="bg-slate-200 min-h-screen">
        <Navigation username={username} />
        <div className="py-2 px-2 md:px-36">{children}</div>
      </body>
    </html>
  );
}
