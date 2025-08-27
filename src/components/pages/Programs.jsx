import { Container, Row, Col, Card, Image } from "react-bootstrap";
import SectionHeader from "../utils/SectionHeader";

const programs = [
  {
    name: "Behavioral Health Supports",
    image: "/images/program-bh.webp",
    bullets: [
      "Individualized Behavior Support Plans",
      "De-escalation & crisis prevention",
      "Trauma-informed care; recovery-oriented",
    ],
  },
  {
    name: "Clinical & Medication Management",
    image: "/images/program-clinical.avif",
    bullets: [
      "RN oversight & care coordination",
      "Medication administration & monitoring",
      "Provider collaboration & care conferencing",
    ],
  },
  {
    name: "Daily Living & Skills Building",
    image: "/images/program-adls.jpg",
    bullets: [
      "ADLs: bathing, dressing, meals & hygiene",
      "Routines, social engagement, community access",
      "Goal tracking & progress reviews",
    ],
  },
  {
    name: "Environment & Safety",
    image: "/images/program-safety.jpg",
    bullets: [
      "Secured entries & elopement plans",
      "Ligature-risk mitigation where applicable",
      "24/7 staffed supervision",
    ],
  },
  {
    name: "Family & Community",
    image: "/images/program-family.avif",
    bullets: [
      "Care team updates & education",
      "Coordinated visits and supports",
      "Transition & discharge planning",
    ],
  },
];

export default function Programs() {
  return (
    <>
      <SectionHeader
        heading="Programs &"
        highlight="Services"
        /* use site-wide accent token */
        highlightColor="var(--brand-accent)"
        paragraph="State-licensed Enhanced Services Facility providing therapeutic, 24/7 staffed care for adults with complex behavioral and medical needs."
      />

      <Container className="my-5">
        {/* Programs */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {programs.map((p) => (
            <Col key={p.name}>
              <Card className="h-100 shadow-sm border-0" style={{ background: "var(--brand-cream)" }}>
                <Card.Img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold" style={{ color: "var(--brand-primary)" }}>
                    {p.name}
                  </Card.Title>
                  <ul className="mb-0">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Admission Criteria */}
        <Row className="mt-5">
          <Col lg={8}>
            <h3 className="fw-bold" style={{ color: "var(--brand-primary)" }}>
              Admission Criteria & Payers
            </h3>
            <p className="mb-2">
              Heartsaved ESF serves adults who benefit from a secure, structured setting with
              interdisciplinary support. Final admission decisions follow assessment and
              fit with our program scope.
            </p>
            <ul>
              <li>Behavioral health needs requiring 24/7 staffed care</li>
              <li>Ability to participate in a therapeutic milieu with supports</li>
              <li>Medical stability compatible with an ESF level of care</li>
              <li>Funding: Medicaid / State contract / Private pay (contact us)</li>
            </ul>
          </Col>
          <Col lg={4}>
            <div
              className="p-3 rounded-3 shadow-sm"
              style={{ background: "var(--brand-mint)" }}
              aria-labelledby="fast-links-title"
            >
              <h5 id="fast-links-title" className="fw-bold mb-2" style={{ color: "var(--brand-primary)" }}>
                Fast Links
              </h5>
              <ul className="mb-0">
                <li><a href="/admissions">Refer a Client</a></li>
                <li><a href="/policies">Policies & House Rules</a></li>
                <li><a href="/contact">Request a Tour</a></li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Facility Preview Strip */}
        <Row className="mb-5 mt-5 g-3">
          <Col md={4}>
            <Image
              src="/images/facility-hall.jpeg"
              alt="Heartsaved ESF hallway and common area"
              fluid
              rounded
              className="shadow-sm"
              loading="lazy"
            />
          </Col>
          <Col md={4}>
            <Image
              src="/images/facility-room.jpeg"
              alt="Heartsaved ESF resident room"
              fluid
              rounded
              className="shadow-sm"
              loading="lazy"
            />
          </Col>
          <Col md={4}>
            <Image
              src="/images/facility-outdoor.jpeg"
              alt="Heartsaved ESF outdoor garden area"
              fluid
              rounded
              className="shadow-sm"
              loading="lazy"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
