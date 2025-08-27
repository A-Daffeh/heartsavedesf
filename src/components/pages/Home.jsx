import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ShieldCheck, HeartPulse, ClockHistory, ArrowRight } from "react-bootstrap-icons";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Heartsaved Enhanced Services Facility";
    const desc =
      "Heartsaved Enhanced Services Facility in Marysville, WA delivers 24/7 therapeutic, person-centered care in a safe, structured environment.";
    let metaDescription = document.querySelector("meta[name='description']");
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
      {/* ---------- HERO ---------- */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={6}>
              <p
                className="mb-2 fw-semibold small"
                style={{ letterSpacing: ".08em", color: "var(--brand-secondary)" }}
              >
                STATE-LICENSED ENHANCED SERVICES FACILITY
              </p>
              <h1
                className="display-5 fw-bold"
                style={{ color: "var(--brand-primary)", lineHeight: 1.15 }}
              >
                Therapeutic Care,{" "}
                <span style={{ color: "var(--brand-accent)" }}>24/7 Support</span>, Human Dignity
              </h1>
              <p className="mt-3 fs-5 text-muted">
                We provide structured, around-the-clock support for adults with complex behavioral
                health and daily living needs—delivered by a consistent, trained team in a safe,
                home-like setting.
              </p>
              <div className="d-flex gap-3 mt-4">
                <Button
                  href="/admissions"
                  style={{ backgroundColor: "var(--brand-primary)", border: "none" }}
                  className="px-4"
                >
                  Refer a Client <ArrowRight className="ms-2" />
                </Button>
                <Button variant="outline-brand" href="/programs" className="px-4">
                  Programs & Services
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img
                src="/images/esf-hero.jpg"
                alt="Therapeutic, 24/7 supported environment"
                className="w-100 rounded-4 shadow-sm"
                loading="lazy"
                style={{ objectFit: "cover", maxHeight: 420 }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---------- KPI / STATS ---------- */}
      <section style={{ background: "var(--brand-primary)" }}>
        <Container className="py-4">
          <Row className="text-center text-white g-4">
            <Col md={4}>
              <div className="fw-bold fs-4 d-flex flex-column align-items-center">
                <ClockHistory size={28} className="mb-2" />
                24/7 Staffed Support
              </div>
              <div className="small text-white-50 mt-1">Caregivers on-site at all times</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold fs-4 d-flex flex-column align-items-center">
                <HeartPulse size={28} className="mb-2" />
                RN Oversight
              </div>
              <div className="small text-white-50 mt-1">Medication & clinical coordination</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold fs-4 d-flex flex-column align-items-center">
                <ShieldCheck size={28} className="mb-2" />
                Safe & Structured
              </div>
              <div className="small text-white-50 mt-1">Clear routines, de-escalation practices</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---------- ZIG-ZAG 1 ---------- */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <img
                src="/images/esf-behavioral-supports.avif"
                alt="Individualized behavioral supports"
                className="w-100 rounded-4 shadow-sm"
                loading="lazy"
              />
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold" style={{ color: "var(--brand-primary)" }}>
                Person-Centered Behavioral Supports
              </h2>
              <p className="text-muted fs-5">
                Individualized behavior support plans, de-escalation, and recovery-oriented routines
                help residents stabilize and build skills in daily life.
              </p>
              <ul className="mb-3">
                <li>Behavior support planning & goal tracking</li>
                <li>Trauma-informed approaches & consistent staffing</li>
                <li>Care team coordination & family partnership</li>
              </ul>
              <Button variant="outline-brand" href="/programs">
                Explore Programs
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---------- ZIG-ZAG 2 ---------- */}
      <section className="py-5" style={{ background: "var(--brand-mint)" }}>
        <Container>
          <Row className="align-items-center flex-lg-row-reverse g-5">
            <Col lg={6}>
              <img
                src="/images/esf-medication-care.avif"
                alt="Clinical and medication coordination"
                className="w-100 rounded-4 shadow-sm"
                loading="lazy"
              />
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold" style={{ color: "var(--brand-primary)" }}>
                Clinical & Medication Coordination
              </h2>
              <p className="text-muted fs-5">
                RN oversight, medication administration, and provider collaboration ensure safe care
                delivery aligned with each resident’s plan.
              </p>
              <ul className="mb-3">
                <li>Medication administration & monitoring</li>
                <li>RN oversight & care conferences</li>
                <li>Transitions & discharge planning</li>
              </ul>
              <Button variant="outline-brand" href="/admissions">
                How Admissions Works
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---------- ZIG-ZAG 3 ---------- */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <img
                src="/images/esf-daily-living.jpg"
                alt="Daily living and engagement"
                className="w-100 rounded-4 shadow-sm"
                loading="lazy"
              />
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold" style={{ color: "var(--brand-primary)" }}>
                Daily Living & Meaningful Engagement
              </h2>
              <p className="text-muted fs-5">
                From ADLs to social connection, our routines encourage participation, confidence, and
                a sense of purpose—at a pace that respects the individual.
              </p>
              <ul className="mb-3">
                <li>ADLs: meals, hygiene, routines & appointments</li>
                <li>Skills practice & community access as appropriate</li>
                <li>Calm, home-like spaces with supportive structure</li>
              </ul>
              <Button variant="outline-brand" href="/contact">
                Request a Tour
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section style={{ background: "var(--brand-primary)" }}>
        <Container className="py-5">
          <Row className="align-items-center g-3">
            <Col lg={8}>
              <h3 className="text-white fw-bold mb-2">Ready to talk admissions?</h3>
              <p className="text-white-50 mb-0">
                Send a non-PHI referral introduction and our team will follow up securely.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Button variant="light" href="/admissions" className="px-4">
                Start a Referral
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
