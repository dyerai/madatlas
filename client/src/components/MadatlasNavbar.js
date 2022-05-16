import { Navbar, Container, Nav } from "react-bootstrap";

export default function MadatlasNavbar() {
  return (
    <Navbar variant="dark" style={{"background": "#c5050c"}}>
      <Container style={{ color: "white", marginLeft: 2 + 'em'}} className="px-0">
        <Navbar.Brand href="/">MadAtlas</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
