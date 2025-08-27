import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navig = () => {
  return (
    <Navbar className="custom-navbar py-3" expand="lg">
      <Container>
        {/* Brand logo */}
        <Navbar.Brand href="/">
          <img
            src="/images/heartsavedesf-logo.png"
            alt="Heartsaved ESF Logo"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Nav links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} end to="/" className="fs-5 px-3">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="fs-5 px-3">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/programs" className="fs-5 px-3">
              Programs
            </Nav.Link>
            <Nav.Link as={NavLink} to="/admissions" className="fs-5 px-3">
              Admissions
            </Nav.Link>
            <Nav.Link as={NavLink} to="/policies" className="fs-5 px-3">
              Policies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/apply" className="fs-5 px-3">
              Apply
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="fs-5 px-3">
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navig;
