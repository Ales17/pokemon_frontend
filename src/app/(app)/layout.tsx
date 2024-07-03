"use server";
import "@/app/globals.css";
import { Container } from "react-bootstrap";
import { cookies } from "next/headers";
import { Navigation } from "../components/Navigation";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let username = "USERNAME";
  async function getUserName() {
    const cookie = cookies().get("session")?.value;
    if (cookie) {
      const cookieJson = JSON.parse(cookie);
      console.log(cookieJson)
      return cookieJson.u;
    }
  }

  username = await getUserName();

  return (
    <html lang="cs">
      <body>
        <Navigation username={username} />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
