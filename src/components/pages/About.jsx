import { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { People, ShieldCheck, HeartPulseFill } from "react-bootstrap-icons";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Heartsaved Enhanced Services Facility";
    const metaDescription = document.querySelector("meta[name='description']");
    const desc =
      "Discover Heartsaved ESF’s mission, values, and care philosophy—delivering 24/7 therapeutic support in Marysville, WA.";
    if (metaDescription) {
      metaDescription.setAttribute("content", desc);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = desc;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      {/* ---------- HERO BANNER ---------- */}
      <section
        style={{
          position: "relative",
          backgroundImage: "url('/images/esf-about-hero.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            /* brand-primary with 0.6 alpha for readable white text */
            backgroundColor: "rgba(1, 68, 33, 0.6)",
          }}
        />
        <Container className="h-100 d-flex flex-column justify-content-center text-white position-relative">
          <h1 className="fw-bold display-6">Compassionate Care for Complex Needs</h1>
          <p className="lead col-lg-12">
            Heartsaved Enhanced Service Facility (Heartsaved ESF) in Marysville, WA is a specialized residential care facility dedicated to serving individuals with complex behavioral 
            health and personal care needs. We provide a safe, supportive, and person-centered environment that prioritizes dignity, respect, and individual choice.
          </p>
        </Container>
      </section>

      {/* ---------- MISSION & VISION ---------- */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="border-0 shadow-lg" style={{ background: "var(--brand-cream)" }}>
                <Card.Body className="p-5">
                  <h3 className="fw-bold" style={{ color: "var(--brand-primary)" }}>Our Mission</h3>
                  <p>
                    At Heartsaved ESF, our mission is to provide compassionate, personalized, and high-quality care that enhances each resident's quality of life.

                    <br /> <br />
                    We are committed to:
                  </p>
                  <ul>
                    <li>Creating an empowering, respectful environment</li>
                    <li>Offering advanced, supportive services</li>
                    <li>Continuously improving through feedback and innovation</li>
                  </ul>
                  <h3 className="fw-bold mt-4" style={{ color: "var(--brand-primary)" }}>Our Vision</h3>
                  <p>
                    A community where individuals with complex needs are seen, supported, and empowered—through person-centered care, family partnership, and continuous quality improvement.
                    To create a safe, structured, and compassionate setting where residents can stabilize, grow skills, and live with dignity—supported by an integrated care team.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---------- OUR VALUES ---------- */}
      <section style={{ background: "var(--brand-mint)" }} className="py-5">
        <Container>
          <h2 className="fw-bold text-center mb-5" style={{ color: "var(--brand-primary)" }}>
            Our Core Commitments
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm" style={{ background: "var(--brand-cream)" }}>
                <Card.Body>
                  <People size={40} color="var(--brand-accent)" className="mb-3" />
                  <h5 className="fw-bold">Person-Centered</h5>
                  <p>
                    Each care plan is tailored to the individual, respecting their history, strengths, and goals.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm" style={{ background: "var(--brand-cream)" }}>
                <Card.Body>
                  <HeartPulseFill size={40} color="var(--brand-accent)" className="mb-3" />
                  <h5 className="fw-bold">Clinical Excellence</h5>
                  <p>
                    RN oversight, medication coordination, and evidence-based practices guide our care delivery.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm" style={{ background: "var(--brand-cream)" }}>
                <Card.Body>
                  <ShieldCheck size={40} color="var(--brand-accent)" className="mb-3" />
                  <h5 className="fw-bold">Safety & Structure</h5>
                  <p>
                    Secure environment, clear routines, and trained staff to reduce risk and promote stability.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---------- HISTORY / STORY ---------- */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <img
                src="/images/esf-story.avif"
                alt="Our story at Heartsaved ESF"
                className="w-100 rounded-4 shadow-sm"
                loading="lazy"
              />
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold" style={{ color: "var(--brand-primary)" }}>Our Story</h2>
              <p>
                Heartsaved ESF was founded to meet the growing need for enhanced residential care in Washington State. We combine a home-like setting with the staffing, training, and clinical coordination needed for complex cases.
              </p>
              <p>
                Today, our interdisciplinary team works side-by-side with residents, families, and providers to create an environment where progress is possible, dignity is preserved, and safety is paramount.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---------- CTA BAND ---------- */}
      <section style={{ background: "var(--brand-primary)" }} className="py-5 text-white">
        <Container className="text-center">
          <h3 className="fw-bold">Want to learn more about our programs?</h3>
          <p className="text-white-50 mb-4">
            Explore our services or contact us to discuss referrals and admissions.
          </p>
          <a href="/programs" className="btn btn-light px-4">
            View Programs
          </a>
        </Container>
      </section>
    </>
  );
}
