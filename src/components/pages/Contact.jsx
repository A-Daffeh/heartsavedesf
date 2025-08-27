import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Envelope, GeoAlt, Telephone, InfoCircle, Printer } from "react-bootstrap-icons";
import SectionHeader from "../utils/SectionHeader";

// MSAL instance + init were created in src/auth/msal.js and called in main.jsx
import { msalInstance } from "../../auth/msal";

// ----- config from env -----
const SITE_ID = import.meta.env.VITE_SP_SITE_ID;
const CONTACT_LIST_ID = import.meta.env.VITE_SP_CONTACT_LIST_ID;

// Scopes needed to write to SharePoint Lists
const GRAPH_SCOPES = ["Sites.ReadWrite.All"];

// Get a Graph access token (silent first, fallback to popup)
async function getGraphToken() {
  const account =
    msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];

  try {
    const result = await msalInstance.acquireTokenSilent({
      account,
      scopes: GRAPH_SCOPES,
    });
    return result.accessToken;
  } catch {
    // interactive fallback
    await msalInstance.loginPopup({ scopes: GRAPH_SCOPES });
    const acc = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
    const result2 = await msalInstance.acquireTokenSilent({
      account: acc,
      scopes: GRAPH_SCOPES,
    });
    return result2.accessToken;
  }
}

// Add an item to SharePoint list via Graph
async function addContactToSharePoint(fields) {
  const token = await getGraphToken();

  const url = `https://graph.microsoft.com/v1.0/sites/${encodeURIComponent(
    SITE_ID
  )}/lists/${encodeURIComponent(CONTACT_LIST_ID)}/items`;

  // Graph list item payload shape
  const body = {
    fields: {
      // Must match your list’s internal column names
      Title: fields.Title,                 // Single line of text
      FromName: fields.FromName,           // Single line of text
      FromEmail: fields.FromEmail,         // Single line of text
      Message: fields.Message,             // Multiple lines of text
      Consent: fields.Consent,             // Yes/No column (boolean)
      PageSource: fields.PageSource,       // Single line of text
      SubmittedAt: fields.SubmittedAt,     // DateTime column
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Graph error ${res.status}`);
  }

  return res.json();
}

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null); // "ok" | "fail" | null
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | Heartsaved Enhanced Services Facility";
    const metaDescription = document.querySelector("meta[name='description']");
    const desc =
      "Get in touch with Heartsaved Enhanced Services Facility – reach us by phone, email, or visit our location in Marysville, WA.";
    if (metaDescription) metaDescription.setAttribute("content", desc);
    else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = desc;
      document.head.appendChild(meta);
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

    // Honeypot
    const trap = form.querySelector("input[name='company']");
    if (trap && trap.value) {
      setSubmitted("ok");
      form.reset();
      setConsent(false);
      return;
    }

    const formData = new FormData(form);
    const payload = {
      Title: formData.get("subject") || "Website Contact",
      FromName: formData.get("from_name"),
      FromEmail: formData.get("from_email"),
      Message: formData.get("message"),
      Consent: true,
      PageSource: "Contact",
      SubmittedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      await addContactToSharePoint(payload);
      setSubmitted("ok");
      form.reset();
      setConsent(false);
    } catch (err) {
      console.error("Contact submit error:", err);
      setSubmitted("fail");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SectionHeader
        heading="Contact"
        highlight="Us"
        highlightColor="var(--brand-accent)"
        paragraph="Have a question, referral, or want to schedule a tour? Send a quick note below (no PHI), call us, or email—we’ll respond promptly."
      />

      <Container className="my-5">
        <Row className="g-4">
          {/* Visit */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                <div className="icon-circle mx-auto mb-2">
                  <GeoAlt size={24} color="var(--brand-accent)" />
                </div>
                <h6 className="fw-bold" style={{ color: "var(--brand-primary)" }}>Visit Us</h6>
                <p className="mb-2">
                  8617 36th Ave NE<br />Marysville, WA 98270
                </p>
                <a
                  className="btn btn-outline-brand btn-sm"
                  href="https://maps.google.com/?q=8617%2036th%20Ave%20NE%2C%20Marysville%2C%20WA%2098270"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps
                </a>
              </Card.Body>
            </Card>
          </Col>

          {/* Call */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                <div className="icon-circle mx-auto mb-2">
                  <Telephone size={24} color="var(--brand-accent)" />
                </div>
                <h6 className="fw-bold" style={{ color: "var(--brand-primary)" }}>Call Us</h6>
                <p className="mb-2">(360) 300-4762 / (206) 422-4889</p>
                <a className="btn btn-outline-brand btn-sm" href="tel:+13603004762">
                  Tap to Call
                </a>
              </Card.Body>
            </Card>
          </Col>

          {/* Email */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center">
                <div className="icon-circle mx-auto mb-2">
                  <Envelope size={24} color="var(--brand-accent)" />
                </div>
                <h6 className="fw-bold" style={{ color: "var(--brand-primary)" }}>Email</h6>
                <p className="mb-2">info@heartsavedesf.org</p>
                <a className="btn btn-outline-brand btn-sm" href="mailto:info@heartsavedesf.org">
                  Send Email
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Form + info */}
      <Container className="my-4">
        <Row className="g-5">
          <Col lg={7}>
            {submitted === "ok" && (
              <Alert variant="success">Thanks! Your message was sent. We’ll get back to you soon.</Alert>
            )}
            {submitted === "fail" && (
              <Alert variant="danger">
                Sorry—something went wrong or consent wasn’t checked. Please try again or call our office.
              </Alert>
            )}

            <h5 className="fw-bold mb-3" style={{ color: "var(--brand-primary)" }}>
              Send Us a Message (No PHI)
            </h5>
            <div className="p-4 shadow rounded border" style={{ borderColor: "var(--border-soft)" }}>
              <Form onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <Form.Control
                  type="text"
                  name="company"
                  className="d-none"
                  autoComplete="off"
                  tabIndex={-1}
                />

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control name="from_name" placeholder="Full name" required autoComplete="name" />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="from_email"
                      placeholder="you@domain.com"
                      required
                      autoComplete="email"
                      inputMode="email"
                    />
                  </Col>

                  <Col md={12}>
                    <Form.Label>Subject</Form.Label>
                    <Form.Control name="subject" placeholder="How can we help?" />
                  </Col>

                  <Col md={12}>
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={7}
                      placeholder="Please avoid PHI. Share high-level details and your preferred contact method."
                      required
                    />
                  </Col>

                  <Col xs={12} className="d-flex align-items-start gap-2">
                    <InfoCircle size={18} className="mt-1" />
                    <small className="text-muted">
                      Do not include Protected Health Information (PHI). We’ll arrange a secure exchange if needed.
                    </small>
                  </Col>

                  <Col xs={12}>
                    <Form.Check
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.currentTarget.checked)}
                      label="I consent to be contacted about my inquiry."
                      required
                    />
                  </Col>

                  <Col xs={12} className="pt-1">
                    <Button type="submit" className="px-4 btn-brand" disabled={submitting}>
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>

          {/* Hours / small FAQ */}
          <Col lg={5}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h6 className="fw-bold" style={{ color: "var(--brand-primary)" }}>Office Hours</h6>
                <p className="mb-2 text-muted small">Mon-Fri, 9:00 AM - 5:00 PM (PT)</p>

                <h6 className="fw-bold mt-3" style={{ color: "var(--brand-primary)" }}>Fax</h6>
                <p className="mb-2">
                  <Printer size={16} className="me-2" />
                  (360) 245-2778
                </p>

                <h6 className="fw-bold mt-3" style={{ color: "var(--brand-primary)" }}>What's the best way to reach you?</h6>
                <p className="mb-0 text-muted small">
                  For general questions, use the form or email. For time-sensitive matters, please call.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Map */}
      <Container fluid className="p-0">
        <iframe
          title="Heartsaved ESF Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2665.8634032926075!2d-122.1824614803037!3d48.07427947738167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485538be4d11397%3A0x761df79a823013e8!2s8617%2036th%20Ave%20NE%2C%20Marysville%2C%20WA%2098270!5e0!3m2!1sen!2sus!4v1755547183786!5m2!1sen!2sus"
          width="100%"
          height="480"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Container>
    </>
  );
}
