import { Navbar, Container, Nav } from "react-bootstrap";

export default function MadatlasNavbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Navbar variant="dark" style={{"background": "#c5050c"}}>
      <Container fluid style={{ color: "white", marginLeft: 2 + 'em'}} className="px-0">
        <Navbar.Brand href="/">MadAtlas</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav className="ms-auto" style={{marginRight: 1 + 'em'}}>
          {user !== null ? <Nav.Link href="/login">{user.name}</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}
