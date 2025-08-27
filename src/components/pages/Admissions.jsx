import { useState, useEffect } from "react";
import {
  Container, Row, Col, Form, Button, Alert, Badge, Card, Accordion
} from "react-bootstrap";
import { ShieldCheck, Telephone, InfoCircle } from "react-bootstrap-icons";

// MSAL instance (init is called in main.jsx before render)
import { msalInstance } from "../../auth/msal";

const SITE_ID = import.meta.env.VITE_SP_SITE_ID;
const ADMISSIONS_LIST_ID = import.meta.env.VITE_SP_ADMISSIONS_LIST_ID;
const GRAPH_SCOPES = ["Sites.ReadWrite.All"];

// token helper
async function getGraphToken() {
  const account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
  try {
    const res = await msalInstance.acquireTokenSilent({ account, scopes: GRAPH_SCOPES });
    return res.accessToken;
  } catch {
    await msalInstance.loginPopup({ scopes: GRAPH_SCOPES });
    const acc = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
    const res2 = await msalInstance.acquireTokenSilent({ account: acc, scopes: GRAPH_SCOPES });
    return res2.accessToken;
  }
}

// Graph POST to SharePoint list
async function addAdmission(fields) {
  const token = await getGraphToken();
  const url = `https://graph.microsoft.com/v1.0/sites/${encodeURIComponent(
    SITE_ID
  )}/lists/${encodeURIComponent(ADMISSIONS_LIST_ID)}/items`;

  // Map to your list’s internal column names
  const body = {
    fields: {
      // adjust these names if your internal names differ
      Title: `Referral: ${fields.ReferrerName || "Website"}`,
      ReferrerName: fields.ReferrerName,
      Organization: fields.Organization,
      ReferrerEmail: fields.ReferrerEmail,
      ReferrerPhone: fields.ReferrerPhone,
      ClientInitials: fields.ClientInitials,
      Urgency: fields.Urgency,
      Summary: fields.Summary,
      Consent: !!fields.Consent,          // Yes/No column
      SubmittedAt: fields.SubmittedAt,    // DateTime
      PageSource: "Admissions",
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function Admissions() {
  const [submitted, setSubmitted] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    document.title = "Admissions & Referrals | Heartsaved ESF";
    const meta = document.querySelector("meta[name='description']");
    const desc =
      "Start a non-PHI referral to Heartsaved Enhanced Services Facility. Learn our simple admissions steps, who we serve, and what to expect.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(null);

    if (!consent) {
      setSubmitted("fail");
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    // honeypot
    if (fd.get("company")) {
      setSubmitted("ok");
      form.reset();
      setConsent(false);
      return;
    }

    const payload = {
      ReferrerName: fd.get("referrer_name"),
      Organization: fd.get("organization"),
      ReferrerEmail: fd.get("referrer_email"),
      ReferrerPhone: fd.get("referrer_phone"),
      ClientInitials: fd.get("client_initials"),
      Urgency: fd.get("urgency"),
      Summary: fd.get("summary"),
      Consent: consent,
      SubmittedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      await addAdmission(payload);
      setSubmitted("ok");
      form.reset();
      setConsent(false);
    } catch (err) {
      console.error("Admissions error:", err);
      setSubmitted("fail");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="py-5" style={{ background: "linear-gradient(180deg,#f7faf8,#ffffff)" }}>
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <p className="mb-2 fw-semibold small" style={{ letterSpacing: ".08em", color: "var(--muted)" }}>
                ADMISSIONS & REFERRALS
              </p>
              <h1 className="display-6 fw-bold" style={{ color: "var(--brand-primary)", lineHeight: 1.15 }}>
                Start a Referral — No PHI Needed
              </h1>
              <p className="mt-2 fs-5 text-muted">
                Share a brief introduction and we’ll follow up securely to complete the intake.
                Our goal is a smooth, prompt process centered on resident needs.
              </p>
            </Col>
            <Col lg={5}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="d-flex align-items-center gap-3">
                  <ShieldCheck size={28} color="var(--brand-accent)" />
                  <div>
                    <div className="fw-bold">HIPAA-aware communications</div>
                    <div className="text-muted small">Please avoid submitting PHI here.</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Steps */}
          <Row className="g-3 mt-4">
            {[
              { n: 1, title: "Intro & Fit", desc: "We review your brief introduction." },
              { n: 2, title: "Secure Exchange", desc: "We collect needed documents securely." },
              { n: 3, title: "Decision & Planning", desc: "Care team assessment and next steps." },
            ].map((s) => (
              <Col md={4} key={s.n}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="d-flex align-items-start gap-3">
                    <Badge className="rounded-pill mt-1" style={{ backgroundColor: "var(--brand-accent)", color: "#212529" }}>
                      {s.n}
                    </Badge>
                    <div>
                      <div className="fw-bold">{s.title}</div>
                      <div className="small text-muted">{s.desc}</div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Main */}
      <Container className="my-5">
        <Row className="g-5">
          <Col lg={7}>
            {submitted === "ok" && (
              <Alert variant="success">Thanks! We received your referral intro. We’ll reach out soon.</Alert>
            )}
            {submitted === "fail" && (
              <Alert variant="danger">
                Sorry—something went wrong or consent wasn’t checked. Please try again or call our office.
              </Alert>
            )}

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Control type="text" name="company" className="d-none" tabIndex={-1} autoComplete="off" />

              <Row className="g-3">
                <Col md={6}>
                  <Form.Label>Referrer Name</Form.Label>
                  <Form.Control name="referrer_name" placeholder="Your full name" required />
                </Col>
                <Col md={6}>
                  <Form.Label>Organization</Form.Label>
                  <Form.Control name="organization" placeholder="Agency / Facility / Practice" />
                </Col>

                <Col md={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="referrer_email" placeholder="you@org.com" required inputMode="email" />
                </Col>
                <Col md={6}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="referrer_phone"
                    placeholder="(XXX) XXX-XXXX"
                    inputMode="tel"
                    pattern="^[0-9()+\\-.\\s]{7,}$"
                    title="Enter a valid phone number"
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Client Initials (no PHI)</Form.Label>
                  <Form.Control name="client_initials" placeholder="e.g., J.D." />
                </Col>
                <Col md={6}>
                  <Form.Label>Urgency</Form.Label>
                  <Form.Select name="urgency" defaultValue="Routine">
                    <option>Routine</option>
                    <option>Priority (7 days)</option>
                    <option>Expedited (3 days)</option>
                  </Form.Select>
                </Col>

                <Col xs={12}>
                  <Form.Label>Brief Referral Summary (no PHI)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="summary"
                    placeholder="High-level needs and goals; we will contact you securely for PHI if appropriate."
                    required
                  />
                </Col>

                <Col xs={12} className="d-flex align-items-start gap-2">
                  <InfoCircle size={18} className="mt-1" />
                  <small className="text-muted">
                    Do not include PHI. We’ll arrange secure exchange for clinical documents.
                  </small>
                </Col>

                <Col xs={12} className="pt-1">
                  <Form.Check
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.currentTarget.checked)}
                    label="I understand this form is for introductions only and consent to being contacted."
                    required
                  />
                </Col>

                <Col xs={12} className="pt-2">
                  <Button type="submit" disabled={submitting} className="btn-brand">
                    {submitting ? "Sending..." : "Send Referral Intro"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>

          {/* Sidebar */}
          <Col lg={5}>
            <div className="sidebar-sticky">
              <div className="p-4 rounded-3 shadow-sm" style={{ background: "var(--brand-mint)" }}>
                <h5 className="fw-bold" style={{ color: "var(--brand-primary)" }}>Who We Serve</h5>
                <ul className="mb-4">
                  <li>Adults with complex behavioral health and daily living needs</li>
                  <li>Those who benefit from a secure, 24/7 staffed setting</li>
                  <li>Medical stability compatible with ESF level of care</li>
                </ul>

                <h6 className="fw-bold mt-2" style={{ color: "var(--brand-primary)" }}>What to Expect</h6>
                <ol className="mb-4">
                  <li>Intro review & eligibility screen</li>
                  <li>Secure information exchange</li>
                  <li>Care team assessment & decision</li>
                  <li>Admission planning & start date</li>
                </ol>

                <div className="d-flex align-items-start gap-2">
                  <Telephone size={18} />
                  <div>
                    <div className="mb-1"><strong>Prefer to call?</strong></div>
                    <div className="mb-0">Front Office: (360) 436-2518 • Weekdays 9–5</div>
                  </div>
                </div>
              </div>

              <Accordion defaultActiveKey="0" className="mt-4 shadow-sm">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What info should I include?</Accordion.Header>
                  <Accordion.Body>Keep it high-level: needs, goals, and considerations. We’ll request PHI securely later.</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>How fast will I hear back?</Accordion.Header>
                  <Accordion.Body>We aim to respond in 1–2 business days. Use “priority” or “expedited” if urgent.</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Do you accept Medicaid?</Accordion.Header>
                  <Accordion.Body>Yes—Medicaid/State contracts and private pay. Details confirmed in follow-up.</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
