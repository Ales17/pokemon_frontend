"use client";
import "@/app/globals.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { UserPanel } from "../components/UserPanel";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body>
        <Navbar bg="dark" data-bs-theme="dark" className="mb-3">
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
