import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  GeoAltFill,
  TelephoneFill,
  EnvelopeFill,
  Facebook,
  Instagram,
  Linkedin,
  PrinterFill,
} from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: "var(--brand-mint)", marginTop: "40px" }}>
      <Container className="pt-5 pb-3">
        <Row className="g-4 text-center text-md-start">
          {/* Logo / blurb */}
          <Col md={5} className="d-flex flex-column align-items-center align-items-md-start">
            <img
              src="/images/heartsavedesf-logo.png"
              alt="Heartsaved Enhanced Services Facility logo"
              width="260"
              height="auto"
              className="mb-3"
            />
            <p className="text-muted small mb-0" style={{ maxWidth: 280 }}>
              A Specialized Residential Care Facility Dedicated to the Highest Quality Service
            </p>
          </Col>

          {/* Contact */}
          <Col md={5}>
            <h6 className="fw-bold mb-3" style={{ color: "var(--brand-primary)" }}>Contact Info</h6>
            <p className="mb-2">
              <GeoAltFill className="me-2" />
              8617 36th Ave NE, Marysville, WA 98270
            </p>
            <p className="mb-2">
              <TelephoneFill className="me-2" />
              <a href="tel:+13604362518" className="contact-info">(360) 300-4762</a>
            </p>
            <p className="mb-2">
              <PrinterFill className="me-2" />
              Fax: (360) 245-2778
            </p>
            <p className="mb-0">
              <EnvelopeFill className="me-2" />
              <a href="mailto:info@heartsavedesf.org" className="contact-info">info@heartsavedesf.org</a>
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2}>
            <h6 className="fw-bold mb-3" style={{ color: "var(--brand-primary)" }}>Quick Links</h6>
            <Nav className="flex-column">
              <Nav.Link as={NavLink} end to="/" className="footer-link py-1">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="footer-link py-1">About</Nav.Link>
              <Nav.Link as={NavLink} to="/programs" className="footer-link py-1">Programs</Nav.Link>
              <Nav.Link as={NavLink} to="/admissions" className="footer-link py-1">Admissions</Nav.Link>
              <Nav.Link as={NavLink} to="/policies" className="footer-link py-1">Policies</Nav.Link>
              <Nav.Link as={NavLink} to="/apply" className="footer-link py-1">Apply</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="footer-link py-1">Contact</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>

      {/* Bottom strip */}
      <div style={{ backgroundColor: "var(--brand-primary)", padding: "10px 0" }}>
        <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white small">
          <span>&copy; {new Date().getFullYear()} Heartsaved Enhanced Services Facility. All rights reserved.</span>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
