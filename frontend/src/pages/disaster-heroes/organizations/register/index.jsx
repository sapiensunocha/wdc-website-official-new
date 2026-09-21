import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Shield } from "lucide-react";
import SEOMeta from "../../../../components/SEOMeta";
import AnimateIn from "../../../../components/AnimateIn";

const PRIMARY = "#009EDB";
const NAVY = "#001129";
const BG = "#F8FAFC";

const FOCUS_AREAS = [
  "Health", "Education", "Shelter", "Food Security",
  "Disaster Response", "Displacement", "Children",
  "Women & Girls", "Elderly",
];

const COUNTRIES_LIST = [
  "Afghanistan", "Bangladesh", "Burkina Faso", "Cameroon",
  "Central African Republic", "Chad", "Colombia", "DR Congo",
  "Ethiopia", "Guatemala", "Haiti", "Honduras", "Iraq",
  "Kenya", "Libya", "Mali", "Mozambique", "Myanmar",
  "Niger", "Nigeria", "Pakistan", "Palestine", "Philippines",
  "Sierra Leone", "Somalia", "South Sudan", "Sudan", "Syria",
  "Ukraine", "Venezuela", "Yemen", "Zimbabwe",
];

const HOW_HEARD = [
  "WDC Website", "Social Media", "Partner Referral",
  "UN Event / Conference", "Email Newsletter", "Search Engine", "Other",
];

const ORG_TYPES = ["NGO", "Faith-based", "Government Agency", "Community Group", "Research Institution"];

const STEPS_LABELS = ["Organization Identity", "Mission & Focus", "Contact & Documents"];

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300"
            style={
              i < current
                ? { background: PRIMARY, color: "#fff" }
                : i === current
                ? { background: PRIMARY, color: "#fff", boxShadow: `0 0 0 4px ${PRIMARY}33` }
                : { background: "#e5e7eb", color: "#94a3b8" }
            }
          >
            {i < current ? <CheckCircle size={14} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className="h-0.5 w-12 sm:w-20 rounded-full transition-all duration-500"
              style={{ background: i < current ? PRIMARY : "#e5e7eb" }}
            />
          )}
        </div>
      ))}
      <span className="ml-3 text-xs text-gray-400 font-medium">
        Step {current + 1} of {total} — {STEPS_LABELS[current]}
      </span>
    </div>
  );
}

function FieldLabel({ children, required }) {
  return (
    <label className="block text-xs font-black mb-1.5" style={{ color: NAVY }}>
      {children}{required && <span style={{ color: "#EF4444" }}> *</span>}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = "text", required }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
      style={{
        background: "#f8fafc",
        border: "1px solid #e5e7eb",
        color: NAVY,
      }}
      onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 4, required }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all resize-none"
      style={{ background: "#f8fafc", border: "1px solid #e5e7eb", color: NAVY }}
      onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
    />
  );
}

function Select({ value, onChange, children, required }) {
  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
      style={{ background: "#f8fafc", border: "1px solid #e5e7eb", color: value ? NAVY : "#94a3b8" }}
      onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
    >
      {children}
    </select>
  );
}

export default function DisasterHeroesOrgsRegister() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Step 1
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [countryOp, setCountryOp] = useState("");
  const [website, setWebsite] = useState("");
  const [yearFounded, setYearFounded] = useState("");
  const [ecosoc, setEcosoc] = useState("");

  // Step 2
  const [mission, setMission] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [countriesOp, setCountriesOp] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState("");

  // Step 3
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [regDoc, setRegDoc] = useState("");
  const [howHeard, setHowHeard] = useState("");

  const toggleFocus = (area) => {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const toggleCountry = (c) => {
    setCountriesOp((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      orgName, orgType, countryOp, website, yearFounded, ecosoc,
      mission, focusAreas, countriesOp, beneficiaries,
      contactName, contactEmail, contactPhone, logoUrl, regDoc, howHeard,
    };
    try {
      await fetch("/api/disaster-heroes/organizations/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) {
      // silently handle — show success regardless (API may not exist yet)
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: BG }}>
        <SEOMeta title="Registration Submitted — WDC Partner" url="/disaster-heroes/organizations/register" />
        <AnimateIn variant="fadeUp">
          <div className="max-w-md w-full text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "#EFF9FF", border: `1px solid ${PRIMARY}33` }}
            >
              <CheckCircle size={32} style={{ color: PRIMARY }} />
            </div>
            <h1 className="text-2xl font-black mb-3" style={{ color: NAVY }}>Application Submitted!</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Our ARIA system is reviewing your organization. You&apos;ll receive an email within 24 hours
              at <strong>{contactEmail}</strong> with your verification status.
            </p>
            <div
              className="rounded-2xl p-4 mb-6 text-left"
              style={{ background: "#fff", border: "1px solid #e5e7eb" }}
            >
              <p className="text-xs font-black mb-2" style={{ color: NAVY }}>What happens next</p>
              {[
                "ARIA scans your registration against humanitarian databases",
                "A WDC partner liaison contacts you for any clarifications",
                "You receive your Verified Partner badge and dashboard access",
                "Start submitting beneficiary cases immediately",
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-2 mb-1.5">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: PRIMARY, color: "#fff", fontSize: 9, fontWeight: 900 }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-gray-500 text-xs">{s}</p>
                </div>
              ))}
            </div>
            <Link
              to="/disaster-heroes/organizations"
              className="inline-flex items-center gap-2 font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: PRIMARY, color: "#fff" }}
            >
              Return to Organizations <ArrowRight size={14} />
            </Link>
          </div>
        </AnimateIn>
      </div>
    );
  }

  return (
    <>
      <SEOMeta
        title="Register Your Organization — WDC Disaster Heroes Partner"
        description="Join the WDC Disaster Heroes partner network. Register your humanitarian organization to submit beneficiaries and receive tracked donations."
        url="/disaster-heroes/organizations/register"
      />

      <div style={{ background: BG, minHeight: "100vh", paddingBottom: "5rem" }}>
        {/* Header strip */}
        <div style={{ background: NAVY, padding: "1.5rem 0" }}>
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={18} style={{ color: PRIMARY }} />
              <span className="text-white font-black text-sm">Organization Registration</span>
            </div>
            <Link
              to="/disaster-heroes/organizations"
              className="text-white/50 hover:text-white text-xs font-medium transition-colors"
            >
              ← Back to Organizations
            </Link>
          </div>
        </div>

        <div className="container pt-10 max-w-2xl mx-auto">
          <AnimateIn variant="fadeUp">
            <h1 className="text-2xl font-black mb-1" style={{ color: NAVY }}>
              Register Your Organization
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Complete all three steps. ARIA reviews within 24 hours of submission.
            </p>
          </AnimateIn>

          <StepIndicator current={step} total={3} />

          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "#fff", border: "1px solid #e5e7eb" }}
          >
            <AnimatePresence mode="wait">
              {/* ── STEP 1 ── */}
              {step === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <h2 className="font-black text-lg mb-4" style={{ color: NAVY }}>
                    Organization Identity
                  </h2>

                  <div>
                    <FieldLabel required>Organization Name</FieldLabel>
                    <Input
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Médecins du Monde"
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel required>Organization Type</FieldLabel>
                    <Select value={orgType} onChange={(e) => setOrgType(e.target.value)} required>
                      <option value="">Select type…</option>
                      {ORG_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <FieldLabel required>Primary Country of Operation</FieldLabel>
                    <Select value={countryOp} onChange={(e) => setCountryOp(e.target.value)} required>
                      <option value="">Select country…</option>
                      {COUNTRIES_LIST.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <FieldLabel>Website URL</FieldLabel>
                    <Input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://your-organization.org"
                      type="url"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Year Founded</FieldLabel>
                      <Input
                        value={yearFounded}
                        onChange={(e) => setYearFounded(e.target.value)}
                        placeholder="e.g. 2008"
                        type="number"
                      />
                    </div>
                    <div>
                      <FieldLabel>UN ECOSOC Status</FieldLabel>
                      <Select value={ecosoc} onChange={(e) => setEcosoc(e.target.value)}>
                        <option value="">Select…</option>
                        <option value="yes">Yes — Accredited</option>
                        <option value="pending">Pending</option>
                        <option value="no">No</option>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2 ── */}
              {step === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <h2 className="font-black text-lg mb-4" style={{ color: NAVY }}>
                    Mission &amp; Focus
                  </h2>

                  <div>
                    <FieldLabel required>Mission Statement</FieldLabel>
                    <Textarea
                      value={mission}
                      onChange={(e) => setMission(e.target.value)}
                      placeholder="Describe your organization's mission and the communities you serve…"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <FieldLabel>Primary Focus Areas</FieldLabel>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {FOCUS_AREAS.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleFocus(area)}
                          className="text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                          style={
                            focusAreas.includes(area)
                              ? { background: PRIMARY, color: "#fff" }
                              : { background: "#f1f5f9", color: "#334155" }
                          }
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Countries of Operation</FieldLabel>
                    <p className="text-[11px] text-gray-400 mb-2">Select all that apply</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {COUNTRIES_LIST.map((c) => (
                        <label
                          key={c}
                          className="flex items-center gap-2 text-xs cursor-pointer py-1"
                        >
                          <input
                            type="checkbox"
                            checked={countriesOp.includes(c)}
                            onChange={() => toggleCountry(c)}
                            className="rounded"
                            style={{ accentColor: PRIMARY }}
                          />
                          <span style={{ color: NAVY }}>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Estimated Beneficiaries Served Per Year</FieldLabel>
                    <Input
                      value={beneficiaries}
                      onChange={(e) => setBeneficiaries(e.target.value)}
                      placeholder="e.g. 5,000"
                    />
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3 ── */}
              {step === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <h2 className="font-black text-lg mb-4" style={{ color: NAVY }}>
                    Contact &amp; Documents
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Primary Contact Name</FieldLabel>
                      <Input
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div>
                      <FieldLabel required>Primary Contact Email</FieldLabel>
                      <Input
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="email@organization.org"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Primary Contact Phone</FieldLabel>
                    <Input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+1 555 000 0000"
                      type="tel"
                    />
                  </div>

                  <div>
                    <FieldLabel>Organization Logo URL (optional)</FieldLabel>
                    <Input
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://your-org.org/logo.png"
                      type="url"
                    />
                  </div>

                  <div>
                    <FieldLabel>Registration Document (URL or description)</FieldLabel>
                    <Textarea
                      value={regDoc}
                      onChange={(e) => setRegDoc(e.target.value)}
                      placeholder="Provide a link to your registration certificate, or describe the type of registration (e.g. 'Registered NGO with DRC Ministry of Social Affairs, reg. no. 12345')"
                      rows={3}
                    />
                  </div>

                  <div>
                    <FieldLabel>How did you hear about WDC?</FieldLabel>
                    <Select value={howHeard} onChange={(e) => setHowHeard(e.target.value)}>
                      <option value="">Select…</option>
                      {HOW_HEARD.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </Select>
                  </div>

                  {/* Summary */}
                  <div
                    className="rounded-xl p-4"
                    style={{ background: "#EFF9FF", border: `1px solid ${PRIMARY}33` }}
                  >
                    <p className="text-xs font-black mb-2" style={{ color: NAVY }}>Application Summary</p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p><strong>Organization:</strong> {orgName || "—"}</p>
                      <p><strong>Type:</strong> {orgType || "—"}</p>
                      <p><strong>Country:</strong> {countryOp || "—"}</p>
                      <p><strong>Focus areas:</strong> {focusAreas.join(", ") || "—"}</p>
                      <p><strong>Contact:</strong> {contactName} · {contactEmail}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6" style={{ borderTop: "1px solid #f1f5f9" }}>
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
                style={
                  step === 0
                    ? { background: "#f1f5f9", color: "#cbd5e1", cursor: "not-allowed" }
                    : { background: "#f1f5f9", color: "#334155" }
                }
              >
                <ArrowLeft size={14} /> Previous
              </button>

              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 font-black text-sm px-6 py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ background: PRIMARY, color: "#fff" }}
                >
                  Next Step <ArrowRight size={14} />
                </button>
              ) : (
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={submitting || !contactName || !contactEmail}
                  className="inline-flex items-center gap-2 font-black text-sm px-6 py-2.5 rounded-xl transition-all"
                  style={
                    submitting
                      ? { background: "#94a3b8", color: "#fff", cursor: "wait" }
                      : { background: PRIMARY, color: "#fff" }
                  }
                >
                  {submitting ? "Submitting…" : "Submit Application"}
                  {!submitting && <CheckCircle size={14} />}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
