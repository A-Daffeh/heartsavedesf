import { useEffect } from "react";
import { Container, Row, Col, Card, Accordion, ListGroup, Button, Badge } from "react-bootstrap";
import SectionHeader from "../utils/SectionHeader";
import { ShieldCheck, FileArrowDown, InfoCircle } from "react-bootstrap-icons";

export default function Policies() {
  useEffect(() => {
    document.title = "Policies & House Rules | Heartsaved ESF";
    const meta = document.querySelector("meta[name='description']");
    const desc =
      "Heartsaved ESF policies and house rules: safety, privacy, resident rights, visitors, medications, emergencies, and more. Download PDFs and contact us with questions.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <>
      {/* Top context band */}
      <SectionHeader
        heading="Policies &"
        highlight="House Rules"
        highlightColor="var(--brand-accent)"
        paragraph="Our policies promote a safe, therapeutic environment for residents, families, staff, and visitors. Please review the key areas below and download full documents as needed."
      />

      <Container className="my-5">
        <Row className="g-4">
          {/* Table of contents */}
          <Col lg={4}>
            <Card className="shadow-sm border-0" style={{ background: "var(--brand-mint)" }}>
              <Card.Body>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <ShieldCheck size={22} color="var(--brand-accent)" />
                  <h5 className="fw-bold mb-0" style={{ color: "var(--brand-primary)" }}>At a Glance</h5>
                </div>
                <ListGroup variant="flush">
                  <ListGroup.Item action href="#resident-rights">Resident Rights & Responsibilities</ListGroup.Item>
                  <ListGroup.Item action href="#visitors">Visitors & Communication</ListGroup.Item>
                  <ListGroup.Item action href="#medication">Medication Management</ListGroup.Item>
                  <ListGroup.Item action href="#belongings">Belongings & Safety</ListGroup.Item>
                  <ListGroup.Item action href="#substances">Tobacco, Alcohol & Substances</ListGroup.Item>
                  <ListGroup.Item action href="#emergency">Emergency Procedures & Drills</ListGroup.Item>
                  <ListGroup.Item action href="#privacy">Privacy, Confidentiality & PHI</ListGroup.Item>
                  <ListGroup.Item action href="#grievances">Grievances & Feedback</ListGroup.Item>
                </ListGroup>
                <div className="d-flex align-items-start gap-2 mt-3">
                  <InfoCircle size={16} className="mt-1" />
                  <small className="text-muted">
                    This page is an overview. The downloadable PDFs contain full details and definitions.
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Policy content */}
          <Col lg={8}>
            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header id="resident-rights">Resident Rights & Responsibilities</Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>Right to dignity, respect, and culturally sensitive care.</li>
                    <li>Participation in care planning and decision-making as appropriate.</li>
                    <li>Clear information on services, fees, and house rules.</li>
                    <li>Responsibilities include respectful conduct and adherence to safety guidelines.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header id="visitors">Visitors & Communication</Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>Visiting hours and guidelines support resident privacy and routine.</li>
                    <li>Phone/video calls arranged with staff support as needed.</li>
                    <li>We partner with families and guardians to maintain healthy connections.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header id="medication">Medication Management</Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>RN oversight; medication administration and documentation per care plan.</li>
                    <li>Secure storage; reconciliation on admission, transfer, and discharge.</li>
                    <li>Provider collaboration for changes and monitoring.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header id="belongings">Personal Belongings & Safety</Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>Safe item guidelines and storage options to reduce risk.</li>
                    <li>Environmental safety checks; maintenance reporting process.</li>
                    <li>Support for labeled personal items and inventory at move-in.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header id="substances">Tobacco, Alcohol & Substances</Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>Clear rules to support safety, health, and compliance.</li>
                    <li>Designated areas or restrictions as applicable to licensing and care plans.</li>
                    <li>Staff support for adherence and alternatives when appropriate.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header id="emergency">Emergency Procedures & Drills</Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>Fire, medical, and critical incident procedures posted and practiced.</li>
                    <li>Regular drills; staff training and documentation.</li>
                    <li>Coordination with local responders when needed.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="6">
                <Accordion.Header id="privacy">Privacy, Confidentiality & PHI</Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>We safeguard Protected Health Information (PHI) and personal privacy.</li>
                    <li>Secure channels are used for records and care coordination.</li>
                    <li>Please avoid sending PHI through general contact forms.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="7">
                <Accordion.Header id="grievances">Grievances & Feedback</Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>We welcome concerns and suggestions via staff or the front office.</li>
                    <li>Written grievance process with acknowledgment and response timelines.</li>
                    <li>Escalation pathways available if additional review is requested.</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        {/* Contact + last updated */}
        <Row className="mt-5">
          <Col md={8}>
            <Card className="shadow-sm border-0">
              <Card.Body className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: "var(--brand-primary)" }}>Questions about a policy?</h6>
                  <div className="text-muted small">
                    We’re happy to clarify details or provide translated copies.
                  </div>
                </div>
                <div>
                  <a className="btn btn-brand" href="/contact">Contact Us</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
            <small className="text-muted">
              Last updated: {new Date().toLocaleDateString()}
            </small>
          </Col>
        </Row>
      </Container>
    </>
  );
}
