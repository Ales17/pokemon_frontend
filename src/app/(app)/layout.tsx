"use client";
import "@/app/globals.css";
import { Navigation } from "../components/Navigation";
import { Navbar, Container, Nav } from "react-bootstrap";
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
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Domů</Nav.Link>
              <Nav.Link href="/pokemon/create">Nový záznam</Nav.Link>
            </Nav>
            <UserPanel />
          </Container>
        </Navbar>

        

        <Container>{children}</Container>
      </body>
    </html>
  );
}
