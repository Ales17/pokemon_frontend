"use server";
import "@/app/globals.css";
import { Container, Row, Col } from "react-bootstrap";
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body><Container className="pt-3"><Row className="justify-content-center"><Col sm={6} md={4}>{children}</Col></Row></Container></body>
    </html>
  );
}
