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
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="mb-3">
          <Container>
            <Navbar.Brand>Pokéweb</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Domů</Nav.Link>
                <Nav.Link href="/pokemon/create">Přidat Pokémona</Nav.Link>
              </Nav>
              <UserPanel />
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>{children}</Container>
      </body>
    </html>
  );
}
