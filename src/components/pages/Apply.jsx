import { useState, useEffect } from "react";
import {
  Container, Row, Col, Form, Button, Alert, Card
} from "react-bootstrap";
import { Briefcase, Upload, InfoCircle } from "react-bootstrap-icons";
import { msalInstance } from "../../auth/msal";
import SectionHeader from "../utils/SectionHeader";

// Constants from .env
const SITE_ID = import.meta.env.VITE_SP_SITE_ID;
const APPLY_LIST_ID = import.meta.env.VITE_SP_APPLY_LIST_ID;
const UPLOAD_DRIVE_ID = import.meta.env.VITE_SP_UPLOAD_DRIVE_ID;
const UPLOAD_FOLDER_ID = import.meta.env.VITE_SP_UPLOAD_FOLDER_ID;
const GRAPH_SCOPES = ["Sites.ReadWrite.All"];

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

async function uploadLargeFile(file) {
  const token = await getGraphToken();
  const createUrl = `https://graph.microsoft.com/v1.0/drives/${UPLOAD_DRIVE_ID}/items/${UPLOAD_FOLDER_ID}:/${encodeURIComponent(file.name)}:/createUploadSession`;

  const sessionRes = await fetch(createUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ item: { "@microsoft.graph.conflictBehavior": "rename" } }),
  });

  if (!sessionRes.ok) throw new Error(await sessionRes.text());
  const { uploadUrl } = await sessionRes.json();

  const chunkSize = 5 * 1024 * 1024; // 5 MB chunks
  let start = 0;

  while (start < file.size) {
    const next = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, next);

    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Length": String(chunk.size),
        "Content-Range": `bytes ${start}-${next - 1}/${file.size}`,
      },
      body: chunk,
    });

    // 202 = still uploading, 200/201 = done
    if (!res.ok && res.status !== 202) throw new Error(await res.text());
    start = next;
  }

  // After finishing, Graph returns the uploaded item metadata
  const finalRes = await fetch(uploadUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const item = await finalRes.json();
  return item.webUrl;
}


async function uploadFileToDrive(file) {
  if (file.size > 4 * 1024 * 1024) {
    // larger than 4MB → use chunked upload
    return await uploadLargeFile(file);
  }

  
  const token = await getGraphToken();
  const uploadUrl = `https://graph.microsoft.com/v1.0/drives/${UPLOAD_DRIVE_ID}/items/${UPLOAD_FOLDER_ID}:/${file.name}:/content`;

  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!res.ok) throw new Error(await res.text());
  const uploaded = await res.json();
  return uploaded.webUrl;
}

async function addApplication(fields) {
  const token = await getGraphToken();
  const url = `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${APPLY_LIST_ID}/items`;

  const body = {
    fields: {
      Title: `Application: ${fields.FullName}`,
      FullName: fields.FullName,
      Email: fields.Email,
      Phone: fields.Phone,
      Position: fields.Position,
      ResumeLink: fields.ResumeLink,
      CertificationsLink: fields.CertificationsLink,
      Consent: !!fields.Consent,
      SubmittedAt: fields.SubmittedAt,
      PageSource: "Apply",
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

export default function Apply() {
  const [submitted, setSubmitted] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    document.title = "Apply Now | Heartsaved ESF";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    if (fd.get("company")) {
      setSubmitted("ok");
      form.reset();
      setConsent(false);
      return;
    }

    if (!consent) {
      setSubmitted("fail");
      return;
    }

    const resumeFile = fd.get("resume");
    const certsFile = fd.get("certifications");

    try {
      setSubmitting(true);
      const resumeLink = resumeFile?.name ? await uploadFileToDrive(resumeFile) : "";
      const certsLink = certsFile?.name ? await uploadFileToDrive(certsFile) : "";

      const payload = {
        FullName: fd.get("full_name"),
        Email: fd.get("email"),
        Phone: fd.get("phone"),
        Position: fd.get("role"),
        ResumeLink: resumeLink,
        CertificationsLink: certsLink,
        Consent: consent,
        SubmittedAt: new Date().toISOString(),
      };

      await addApplication(payload);
      setSubmitted("ok");
      form.reset();
      setConsent(false);
    } catch (err) {
      console.error("Application error:", err);
      setSubmitted("fail");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Top context */}
      <SectionHeader
        heading="Apply to Join"
        highlight="Heartsaved ESF"
        highlightColor="var(--brand-accent)"
        paragraph="Submit your interest to join our dedicated team. We’ll review and follow up as soon as possible."
      />

      <Container className="my-5">
        <Row className="g-5">
          {/* Main Form */}
          <Col lg={8}>
            {submitted === "ok" && (
              <Alert variant="success">✅ Application received. Thank you!</Alert>
            )}
            {submitted === "fail" && (
              <Alert variant="danger">❌ Something went wrong. Please try again or email us directly.</Alert>
            )}

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Control type="text" name="company" className="d-none" tabIndex={-1} autoComplete="off" />

              <Row className="g-3">
                <Col md={6}>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control name="full_name" required placeholder="Your name" />
                </Col>
                <Col md={6}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" required inputMode="email" placeholder="you@example.com" />
                </Col>
                <Col md={6}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control name="phone" inputMode="tel" placeholder="(XXX) XXX-XXXX" />
                </Col>
                <Col md={6}>
                  <Form.Label>Role You’re Applying For</Form.Label>
                  <Form.Control name="role" placeholder="e.g., Caregiver, LPN, Admin" />
                </Col>
                <Col md={6}>
                  <Form.Label>Upload Resume</Form.Label>
                  <Form.Control type="file" name="resume" accept=".pdf,.doc,.docx" />
                </Col>
                <Col md={6}>
                  <Form.Label>Upload Certifications (Optional)</Form.Label>
                  <Form.Control type="file" name="certifications" accept=".pdf,.doc,.docx" />
                </Col>

                <Col xs={12} className="d-flex align-items-start gap-2">
                  <InfoCircle size={18} className="mt-1" />
                  <small className="text-muted">
                    Please upload only non-sensitive documents. We’ll reach out securely for additional info.
                  </small>
                </Col>

                <Col xs={12}>
                  <Form.Check
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.currentTarget.checked)}
                    label="I consent to being contacted regarding this application."
                    required
                  />
                </Col>

                <Col xs={12}>
                  <Button type="submit" className="btn-brand" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Body className="d-flex align-items-start gap-3">
                <Briefcase size={28} color="var(--brand-accent)" />
                <div>
                  <div className="fw-bold">Join Our Team</div>
                  <p className="mb-0 small text-muted">
                    We’re hiring compassionate professionals dedicated to exceptional care. Applications are reviewed weekly.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
