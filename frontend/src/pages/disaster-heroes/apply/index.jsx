import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../../../lib/supabase";
import {
  Shield, Upload, CheckCircle2, ArrowRight, ArrowLeft,
  MapPin, Clock, User, Mail, Briefcase, Globe, Camera,
  AlertCircle, Eye, EyeOff, Check, LogIn,
} from "lucide-react";
import SearchableSelect from "../../../components/SearchableSelect";

const T = {
  bg:      "#F5F5F7",
  surface: "#FFFFFF",
  border:  "rgba(60,60,67,.22)",
  fg:      "#1D1D1F",
  muted:   "rgba(29,29,31,.60)",
  blue:    "#009EDB",
  navy:    "#001129",
  shadow:  "0 2px 8px rgba(0,0,0,.08), 0 0 0 0.5px rgba(0,0,0,.05)",
  shadowLg:"0 8px 30px rgba(0,0,0,.12), 0 0 0 0.5px rgba(0,0,0,.04)",
};

const SECTORS = [
  "Early Warning & Monitoring","Flood & WASH","Earthquake & Structural",
  "Cyclone & Meteorology","Wildfire & Heat","Drought & Food Security",
  "Displacement & Protection","Health Emergencies","GIS & Remote Sensing",
  "Coordination & Logistics","Recovery & Resilience","Climate & Environment",
  "Tech & Data","Communications","Finance & Resource Mobilisation",
];

const SKILLS = [
  "Field Assessment","Cluster Coordination","SITREP Writing","QGIS / ArcGIS",
  "Drone Operations","Damage Assessment","Needs Assessment","Community Mapping",
  "Kobo / ODK","Satellite Imagery Analysis","Python / Data Science",
  "Project Management","Report Writing","Training & Capacity Building",
  "Emergency Telecommunications","Supply Chain / Logistics",
  "Cash & Voucher Assistance","Protection Mainstreaming",
];

const LANGUAGES = [
  "English","French","Arabic","Spanish","Portuguese","Swahili","Hausa",
  "Amharic","Somali","Hindi","Indonesian","Bangla","Kiswahili","Other",
];

const AVAILABILITY = [
  "1–5 hrs/week","5–10 hrs/week","10–20 hrs/week","20–30 hrs/week","Full-time available",
];

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bangladesh","Belgium","Benin","Bolivia","Bosnia",
  "Botswana","Brazil","Burkina Faso","Burundi","Cambodia","Cameroon","Canada",
  "Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo (DRC)","Congo (Republic)","Costa Rica","Côte d'Ivoire","Croatia","Cuba",
  "Djibouti","Dominican Republic","Ecuador","Egypt","El Salvador","Eritrea",
  "Ethiopia","Fiji","France","Gambia","Georgia","Germany","Ghana","Greece",
  "Guatemala","Guinea","Guinea-Bissau","Haiti","Honduras","Hungary","India",
  "Indonesia","Iran","Iraq","Ireland","Italy","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kosovo","Kyrgyzstan","Laos","Lebanon","Lesotho",
  "Liberia","Libya","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
  "Mauritania","Mauritius","Mexico","Moldova","Mongolia","Morocco","Mozambique",
  "Myanmar","Namibia","Nepal","Netherlands","Nicaragua","Niger","Nigeria",
  "North Korea","Norway","Pakistan","Palestine","Panama","Papua New Guinea",
  "Paraguay","Peru","Philippines","Poland","Portugal","Rwanda","Saudi Arabia",
  "Senegal","Sierra Leone","Solomon Islands","Somalia","South Africa",
  "South Sudan","Spain","Sri Lanka","Sudan","Sweden","Syria","Tajikistan",
  "Tanzania","Thailand","Timor-Leste","Togo","Trinidad & Tobago","Tunisia",
  "Turkey","Turkmenistan","Uganda","Ukraine","United Kingdom","United States",
  "Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
  "Other",
];

const PW_RULES = [
  { id: "len",   label: "At least 8 characters",           test: p => p.length >= 8 },
  { id: "upper", label: "One uppercase letter (A–Z)",       test: p => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter (a–z)",       test: p => /[a-z]/.test(p) },
  { id: "num",   label: "One number (0–9)",                 test: p => /[0-9]/.test(p) },
  { id: "spec",  label: "One special character (!@#$%…)",  test: p => /[^A-Za-z0-9]/.test(p) },
];

const STEPS = ["Personal Info","Skills & Expertise","Location & Availability","Motivation","Review"];

export default function DisasterHeroesApply() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [step, setStep]       = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]     = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile]       = useState(null);
  const [showPw, setShowPw]   = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const [form, setForm] = useState({
    full_name:       "",
    email:           "",
    organization:    "",
    hero_role:       "",
    linkedin_url:    "",
    password:        "",
    confirmPassword: "",
    sectors:         [],
    skills:          [],
    languages:       [],
    availability:    "",
    country:         "",
    city:            "",
    motivation:      "",
    experience:      "",
  });

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  function toggleArr(key, val) {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
    }));
  }

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function validateStep() {
    if (step === 0) {
      if (!form.full_name.trim()) return "Full name is required";
      if (!form.email.trim() || !form.email.includes("@")) return "Valid email is required";
      if (!form.password) return "Password is required";
      if (!PW_RULES.every(r => r.test(form.password))) return "Password does not meet all requirements";
      if (form.password !== form.confirmPassword) return "Passwords do not match";
      if (!photoFile) return "Profile photo is required";
    }
    if (step === 1) {
      if (form.sectors.length === 0) return "Select at least one sector";
      if (form.skills.length === 0)  return "Select at least one skill";
    }
    if (step === 2) {
      if (!form.country) return "Country is required";
      if (!form.city.trim()) return "City is required";
      if (!form.availability) return "Availability is required";
    }
    if (step === 3) {
      if (form.motivation.trim().length < 80) return "Tell us more about your motivation (at least 80 characters)";
    }
    return null;
  }

  function next() {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError("");
    setStep(s => s + 1);
  }

  async function submit() {
    setError("");
    setAlreadyExists(false);
    setSubmitting(true);
    try {
      // Create Supabase Auth account first
      const { data: authData, error: authErr } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.full_name } },
      });
      if (authErr) {
        if (authErr.message?.toLowerCase().includes("already registered") || authErr.message?.toLowerCase().includes("already exists")) {
          setAlreadyExists(true);
          setError("This email already has an account. Please log in instead.");
        } else {
          throw new Error(authErr.message);
        }
        return;
      }

      let photo_url = null;

      // Upload photo to Supabase Storage
      if (photoFile) {
        const ext  = photoFile.name.split(".").pop();
        const path = `heroes/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("hero-photos")
          .upload(path, photoFile, { upsert: false });
        if (uploadErr) throw new Error("Photo upload failed: " + uploadErr.message);
        const { data: { publicUrl } } = supabase.storage.from("hero-photos").getPublicUrl(path);
        photo_url = publicUrl;
      }

      // Insert application
      const { error: insertErr } = await supabase.from("disaster_heroes").insert([{
        full_name:    form.full_name,
        email:        form.email,
        organization: form.organization,
        hero_role: form.hero_role,
        linkedin_url: form.linkedin_url,
        sectors:      form.sectors,
        skills:       form.skills,
        languages:    form.languages,
        availability: form.availability,
        country:      form.country,
        city:         form.city,
        motivation:   form.motivation,
        experience:   form.experience,
        photo_url,
        status:       "pending",
      }]);

      if (insertErr) throw new Error(insertErr.message);
      setSubmitted(true);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ background: T.bg, minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `rgba(0,158,219,.12)`,
                        display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <CheckCircle2 size={36} style={{ color: T.blue }} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: T.fg, marginBottom: 10, letterSpacing: "-0.02em" }}>
            Application submitted!
          </h1>
          <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, marginBottom: 24 }}>
            Thank you, <strong style={{ color: T.fg }}>{form.full_name}</strong>. We've received your application and will review it within 5–7 business days. You'll get an email at <strong style={{ color: T.fg }}>{form.email}</strong> once a decision is made.
          </p>
          <p style={{ fontSize: 13, color: T.muted, marginBottom: 28 }}>
            Questions? Write to <a href="mailto:office@worlddisastercenter.org" style={{ color: T.blue }}>office@worlddisastercenter.org</a>
          </p>
          <Link to="/membership"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px",
                     borderRadius: 100, background: T.blue, color: "#fff", fontWeight: 700,
                     fontSize: 14, textDecoration: "none" }}>
            Back to Disaster Heroes
          </Link>
        </div>
      </div>
    );
  }

  const field = {
    background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10,
    padding: "10px 14px", fontSize: 14, color: T.fg, outline: "none",
    width: "100%", fontFamily: "inherit",
    transition: "border-color .15s, box-shadow .15s",
  };

  return (
    <>
      <Helmet>
        <title>Apply — WDC Disaster Heroes</title>
        <meta name="description" content="Apply to join the WDC Disaster Heroes community — open to disaster professionals worldwide." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ background: T.bg, minHeight: "70vh", padding: "40px 24px 80px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <Link to="/membership"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13,
                       color: T.muted, textDecoration: "none", marginBottom: 20 }}>
              <ArrowLeft size={14} /> Back to Disaster Heroes
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Shield size={18} style={{ color: T.blue }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                WDC Disaster Heroes
              </span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: T.fg, margin: 0, letterSpacing: "-0.02em" }}>
              Apply to Join
            </h1>
            <p style={{ fontSize: 14, color: T.muted, marginTop: 6 }}>
              Open to disaster practitioners worldwide. Free to join — apply, get accepted, access everything.
            </p>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
              {STEPS.map((s, i) => (
                <div key={s} style={{ flex: 1, height: 3, borderRadius: 2,
                                      background: i <= step ? T.blue : T.border,
                                      transition: "background .3s" }} />
              ))}
            </div>
            <div style={{ fontSize: 12, color: T.muted }}>
              Step {step + 1} of {STEPS.length} — <strong style={{ color: T.fg }}>{STEPS[step]}</strong>
            </div>
          </div>

          {/* Form card */}
          <div style={{ background: T.surface, borderRadius: 20, padding: "32px 28px", boxShadow: T.shadowLg }}>

            {/* ── STEP 0: Personal Info ── */}
            {step === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: T.fg, margin: 0 }}>Tell us about yourself</h2>

                {alreadyExists && (
                  <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(251,191,36,.08)",
                                border: "1.5px solid rgba(251,191,36,.4)", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <AlertCircle size={16} style={{ color: "#b45309", marginTop: 1, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#92400e", margin: "0 0 2px" }}>
                        This email is already registered
                      </p>
                      <p style={{ fontSize: 12, color: "#78350f", margin: 0 }}>
                        An account with <strong>{form.email}</strong> already exists.
                      </p>
                    </div>
                    <a href="/disaster-heroes/login"
                      style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 8, background: "#009EDB",
                               color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                      Log In
                    </a>
                  </div>
                )}

                {/* Photo upload */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <div
                    onClick={() => fileRef.current?.click()}
                    style={{ width: 96, height: 96, borderRadius: "50%", cursor: "pointer", overflow: "hidden",
                             background: `rgba(0,158,219,.08)`, border: `2px dashed ${T.blue}`,
                             display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                             position: "relative" }}>
                    {photoPreview
                      ? <img src={photoPreview} alt="preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <Camera size={24} style={{ color: T.blue }} />
                    }
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
                  <button onClick={() => fileRef.current?.click()}
                    style={{ fontSize: 13, color: T.blue, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                    {photoPreview ? "Change photo" : "Upload your photo *"}
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>Full name *</label>
                    <input style={field} placeholder="Your full name" value={form.full_name}
                      onChange={e => set("full_name", e.target.value)} />
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>Email address *</label>
                    <input style={field} type="email" placeholder="you@example.com" value={form.email}
                      onChange={e => set("email", e.target.value)} />
                  </div>

                  {/* Password */}
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
                      Password * <span style={{ fontWeight: 400, fontSize: 11 }}>(to access your hero account)</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPw ? "text" : "password"}
                        style={field}
                        placeholder="Create a strong password"
                        value={form.password}
                        onChange={e => set("password", e.target.value)}
                      />
                      <button type="button" onClick={() => setShowPw(v => !v)}
                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                 background: "none", border: "none", cursor: "pointer", color: T.muted }}>
                        {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {/* Password strength */}
                    {form.password && (
                      <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: 10,
                                    background: T.bg, border: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 6 }}>
                        {PW_RULES.map(({ id, label, test }) => {
                          const ok = test(form.password);
                          return (
                            <div key={id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            background: ok ? "#22c55e" : "#e2e8f0" }}>
                                {ok && <Check size={10} color="#fff" />}
                              </div>
                              <span style={{ fontSize: 11, fontWeight: 500, color: ok ? "#16a34a" : "#94a3b8" }}>{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>
                      Confirm Password *
                    </label>
                    <input
                      type={showPw ? "text" : "password"}
                      style={{ ...field, borderColor: form.confirmPassword && form.confirmPassword !== form.password ? "#f87171" : undefined }}
                      placeholder="Repeat your password"
                      value={form.confirmPassword}
                      onChange={e => set("confirmPassword", e.target.value)}
                    />
                    {form.confirmPassword && form.confirmPassword !== form.password && (
                      <p style={{ fontSize: 11, color: "#dc2626", marginTop: 4 }}>Passwords don't match</p>
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>Organisation</label>
                    <input style={field} placeholder="Organisation / Agency" value={form.organization}
                      onChange={e => set("organization", e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>Current role / title</label>
                    <input style={field} placeholder="e.g. Field Coordinator" value={form.hero_role}
                      onChange={e => set("hero_role", e.target.value)} />
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>LinkedIn profile URL</label>
                    <input style={field} placeholder="https://linkedin.com/in/..." value={form.linkedin_url}
                      onChange={e => set("linkedin_url", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 1: Skills & Expertise ── */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: T.fg, margin: 0 }}>Skills & expertise</h2>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 10 }}>
                    Sectors you work in * <span style={{ fontWeight: 400 }}>(select all that apply)</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {SECTORS.map(s => (
                      <button key={s} onClick={() => toggleArr("sectors", s)}
                        style={{ padding: "6px 14px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                                 fontFamily: "inherit", transition: "all .15s",
                                 background: form.sectors.includes(s) ? `rgba(0,158,219,.12)` : T.bg,
                                 border: form.sectors.includes(s) ? `1.5px solid ${T.blue}` : `1px solid ${T.border}`,
                                 color: form.sectors.includes(s) ? T.blue : T.fg, fontWeight: form.sectors.includes(s) ? 600 : 400 }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 10 }}>
                    Technical skills * <span style={{ fontWeight: 400 }}>(select all that apply)</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {SKILLS.map(s => (
                      <button key={s} onClick={() => toggleArr("skills", s)}
                        style={{ padding: "6px 14px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                                 fontFamily: "inherit", transition: "all .15s",
                                 background: form.skills.includes(s) ? `rgba(0,114,188,.10)` : T.bg,
                                 border: form.skills.includes(s) ? `1.5px solid #0072BC` : `1px solid ${T.border}`,
                                 color: form.skills.includes(s) ? "#0072BC" : T.fg, fontWeight: form.skills.includes(s) ? 600 : 400 }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 10 }}>
                    Languages you work in
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {LANGUAGES.map(l => (
                      <button key={l} onClick={() => toggleArr("languages", l)}
                        style={{ padding: "6px 14px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                                 fontFamily: "inherit", transition: "all .15s",
                                 background: form.languages.includes(l) ? `rgba(22,163,74,.10)` : T.bg,
                                 border: form.languages.includes(l) ? `1.5px solid #16A34A` : `1px solid ${T.border}`,
                                 color: form.languages.includes(l) ? "#16A34A" : T.fg, fontWeight: form.languages.includes(l) ? 600 : 400 }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: Location & Availability ── */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: T.fg, margin: 0 }}>Location & availability</h2>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>Country *</label>
                  <SearchableSelect
                    options={COUNTRIES}
                    value={form.country}
                    onChange={v => set("country", v)}
                    placeholder="Select your country…"
                    style={{ ...field }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>City / Town *</label>
                  <input style={field} placeholder="Your city or town" value={form.city}
                    onChange={e => set("city", e.target.value)} />
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 10 }}>
                    Availability per week *
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {AVAILABILITY.map(a => (
                      <button key={a} onClick={() => set("availability", a)}
                        style={{ padding: "12px 16px", borderRadius: 12, fontSize: 14, cursor: "pointer",
                                 textAlign: "left", fontFamily: "inherit", transition: "all .15s",
                                 background: form.availability === a ? `rgba(0,158,219,.08)` : T.surface,
                                 border: form.availability === a ? `2px solid ${T.blue}` : `1px solid ${T.border}`,
                                 color: form.availability === a ? T.blue : T.fg,
                                 fontWeight: form.availability === a ? 600 : 400 }}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, display: "block", marginBottom: 6 }}>Years of experience in disaster / humanitarian work</label>
                  <input style={field} placeholder="e.g. 5 years" value={form.experience}
                    onChange={e => set("experience", e.target.value)} />
                </div>
              </div>
            )}

            {/* ── STEP 3: Motivation ── */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: T.fg, margin: 0 }}>Why do you want to be a Disaster Hero?</h2>
                <p style={{ fontSize: 14, color: T.muted, margin: 0, lineHeight: 1.6 }}>
                  Tell us about the community you serve, the problems you're trying to solve, and what you hope to contribute to and gain from the Disaster Heroes network.
                </p>
                <textarea
                  rows={8} value={form.motivation} onChange={e => set("motivation", e.target.value)}
                  placeholder="Share your story, your field experience, and your motivation to protect and serve your community..."
                  style={{ ...field, resize: "vertical", lineHeight: 1.65 }} />
                <p style={{ fontSize: 12, color: T.muted, margin: 0 }}>
                  {form.motivation.length} characters — minimum 80
                </p>
              </div>
            )}

            {/* ── STEP 4: Review ── */}
            {step === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: T.fg, margin: 0 }}>Review your application</h2>

                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {photoPreview && (
                    <img src={photoPreview} alt="photo"
                      style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
                               border: `2px solid ${T.blue}` }} />
                  )}
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.fg }}>{form.full_name}</div>
                    <div style={{ fontSize: 13, color: T.muted }}>{form.hero_role || "—"} · {form.organization || "—"}</div>
                    <div style={{ fontSize: 13, color: T.muted }}>{form.email}</div>
                  </div>
                </div>

                {[
                  { label: "Location", value: `${form.city}, ${form.country}` },
                  { label: "Availability", value: form.availability },
                  { label: "Experience", value: form.experience || "—" },
                  { label: "LinkedIn", value: form.linkedin_url || "—" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.muted, minWidth: 100 }}>{label}</span>
                    <span style={{ fontSize: 13, color: T.fg }}>{value}</span>
                  </div>
                ))}

                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: T.muted, marginBottom: 8 }}>Sectors</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {form.sectors.map(s => (
                      <span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100,
                                             background: `rgba(0,158,219,.08)`, color: T.blue }}>{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: T.muted, marginBottom: 8 }}>Skills</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {form.skills.map(s => (
                      <span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100,
                                             background: `rgba(0,114,188,.08)`, color: "#0072BC" }}>{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: T.muted, marginBottom: 6 }}>Motivation</p>
                  <p style={{ fontSize: 13, color: T.fg, lineHeight: 1.65, margin: 0 }}>{form.motivation}</p>
                </div>

                <div style={{ padding: "14px 16px", borderRadius: 12, background: `rgba(0,158,219,.06)`,
                              border: `1px solid rgba(0,158,219,.18)`, fontSize: 13, color: T.muted, lineHeight: 1.6 }}>
                  By submitting, you confirm your information is accurate. WDC will review your application within 5–7 business days and notify you at <strong style={{ color: T.fg }}>{form.email}</strong>.
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ marginTop: 16, padding: "10px 14px", borderRadius: 10,
                            background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.2)",
                            display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#DC2626" }}>
                <AlertCircle size={14} /> {error}
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20,
                          borderTop: `1px solid ${T.border}` }}>
              {step > 0 ? (
                <button onClick={() => { setError(""); setStep(s => s - 1); }}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px",
                           borderRadius: 100, background: T.bg, border: `1px solid ${T.border}`,
                           fontSize: 14, fontWeight: 600, color: T.fg, cursor: "pointer" }}>
                  <ArrowLeft size={14} /> Back
                </button>
              ) : <div />}

              {step < STEPS.length - 1 ? (
                <button onClick={next}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 24px",
                           borderRadius: 100, background: T.blue, border: "none",
                           fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button onClick={submit} disabled={submitting}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 28px",
                           borderRadius: 100, background: submitting ? T.border : T.blue, border: "none",
                           fontSize: 14, fontWeight: 700, color: "#fff",
                           cursor: submitting ? "not-allowed" : "pointer" }}>
                  {submitting ? "Submitting…" : "Submit Application"} {!submitting && <ArrowRight size={14} />}
                </button>
              )}
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: T.muted, marginTop: 20 }}>
            Already a Hero? <Link to="/disaster-heroes/login" style={{ color: T.blue, fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
