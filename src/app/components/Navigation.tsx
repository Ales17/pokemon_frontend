"use client";
import { Navbar, Container, Nav, Button, Stack } from "react-bootstrap";
import { handleLogout } from "../actions";
export const Navigation = ({ username }: { username: String }) => {
  
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="mb-3">
      <Container>
        <Navbar.Brand>Pokéweb</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Domů</Nav.Link>
            <Nav.Link href="/pokemon/create">Přidat Pokémona</Nav.Link>
          </Nav>
          <Stack
            direction="horizontal"
            gap={3}
            className="d-flex justify-content-center"
          >
            <Navbar.Text>
              <span className="text-white">{username}</span>
            </Navbar.Text>
            <Button onClick={() => handleLogout()}>Odhlásit</Button>
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
