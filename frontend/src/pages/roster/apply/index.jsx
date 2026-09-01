import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEOMeta from "../../../components/SEOMeta";
import { toast } from "react-toastify";
import {
  User, Briefcase, Globe, Award, MapPin, Users, FileText,
  ChevronRight, ChevronLeft, Check, Plus, X, Eye, EyeOff,
  AlertCircle, LogIn,
} from "lucide-react";
import { registerRosterMember, updateMyRosterProfile } from "../../../api/roster";
import SearchableSelect from "../../../components/SearchableSelect";
import AutocompleteInput from "../../../components/AutocompleteInput";

const SECTORS = ["Early Warning", "Emergency Response", "Health & Medical", "WASH", "Shelter & NFI", "GIS & Remote Sensing", "Data & AI", "Training & Capacity Building", "Protection & Human Rights", "M&E", "Coordination & IM", "Policy & Strategy", "Logistics", "Communications", "Finance", "Legal & Compliance", "Psychosocial Support"];
const REGIONS = ["Africa — East", "Africa — West", "Africa — Central", "Africa — Southern", "Africa — North", "Asia — South", "Asia — Southeast", "Asia — Central", "Middle East", "Europe", "Latin America", "Pacific", "Global / Remote"];
const SKILL_LEVELS = ["beginner", "intermediate", "advanced", "expert"];
const LANG_LEVELS = ["basic", "conversational", "professional", "native"];

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
  "Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe","Other",
];

const LANG_LIST = [
  "English","French","Arabic","Spanish","Portuguese","Russian",
  "Swahili","Hausa","Amharic","Somali","Tigrinya","Oromo","Lingala",
  "Kinyarwanda","Kirundi","Luganda","Shona","Zulu","Wolof","Bambara",
  "Dioula","Twi","Yoruba","Igbo","Kiswahili",
  "Hindi","Urdu","Pashto","Dari","Bengali","Indonesian","Malay",
  "Filipino","Burmese","Khmer","Chinese (Mandarin)","Chinese (Cantonese)",
  "Japanese","Korean","Turkish","Persian/Farsi","Kurdish",
  "German","Italian","Dutch","Polish","Ukrainian","Haitian Creole","Other",
];

const SKILL_SUGGESTIONS = [
  "ArcGIS","QGIS","Kobo Toolbox","ODK","Power BI","Tableau","Python","R","SQL",
  "Excel / Data Analysis","HEAT Training","FirstAid / CICO","Project Management","PMP",
  "Proposal Writing","Report Writing","Needs Assessment","Situation Analysis",
  "Cluster Coordination","OCHA Tools","MISP","ActivityInfo","DHIS2","CommCare",
  "Surge Capacity","Cash & Voucher Assistance","PSEA","Child Safeguarding",
  "Logistics / Supply Chain","Procurement","Financial Management","WASH Engineering",
  "Shelter Design","Protection Monitoring","Psychosocial Support","Training Facilitation",
  "Community Engagement","Media & Communications","Photography","Video Production",
  "Drone / UAV Operation","Remote Sensing","Machine Learning","GIS Mapping",
];

const PW_RULES = [
  { id: "len",   label: "At least 8 characters",             test: (p) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter (A–Z)",         test: (p) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter (a–z)",         test: (p) => /[a-z]/.test(p) },
  { id: "num",   label: "One number (0–9)",                   test: (p) => /[0-9]/.test(p) },
  { id: "spec",  label: "One special character (!@#$%^&*_…)", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const STEPS = [
  { icon: User,     label: "Personal Info" },
  { icon: Briefcase,label: "Professional Background" },
  { icon: Globe,    label: "Skills & Languages" },
  { icon: Award,    label: "Certifications & Education" },
  { icon: MapPin,   label: "Deployment Preferences" },
  { icon: Users,    label: "References" },
  { icon: FileText, label: "Review & Submit" },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
      {STEPS.map(({ icon: Icon, label }, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1 min-w-[56px]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{ background: done ? "#009EDB" : active ? "#002050" : "#f1f5f9", color: done || active ? "#fff" : "#94a3b8", border: active ? "2px solid #009EDB" : "none" }}>
                {done ? <Check size={16} /> : <Icon size={16} />}
              </div>
              <span className="text-[10px] font-medium text-center leading-tight max-w-[56px]"
                style={{ color: active ? "#009EDB" : done ? "#475569" : "#94a3b8" }}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 transition-all duration-300"
                style={{ background: i < current ? "#009EDB" : "#e2e8f0" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Field({ label, required, children, hint, error }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-content-secondary mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error  && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} />{error}</p>}
      {!error && hint && <p className="text-[11px] text-content-tertiary mt-1">{hint}</p>}
    </div>
  );
}

const inputCls    = "w-full px-3 py-2.5 rounded-xl text-sm outline-none border border-border focus:border-primary transition-colors bg-white";
const inputErrCls = "w-full px-3 py-2.5 rounded-xl text-sm outline-none border border-red-400 focus:border-red-500 transition-colors bg-white";

const selectStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 12, fontSize: 14,
  border: "1px solid #E2E8F0", background: "#fff", color: "#1e293b",
  transition: "border-color .2s", fontFamily: "inherit",
};
const selectErrStyle = { ...selectStyle, border: "1px solid #f87171" };

function PasswordStrength({ password }) {
  if (!password) return null;
  return (
    <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
      {PW_RULES.map(({ id, label, test }) => {
        const ok = test(password);
        return (
          <div key={id} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${ok ? "bg-green-500" : "bg-gray-200"}`}>
              {ok && <Check size={10} color="#fff" />}
            </div>
            <span className={`text-[11px] font-medium transition-colors ${ok ? "text-green-600" : "text-gray-400"}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function RosterApplyPage() {
  const navigate = useNavigate();
  const [step, setStep]         = useState(0);
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [fieldErrors, setFieldErrors]     = useState({});

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", phone: "",
    nationality: "", countryOfResidence: "", city: "", gender: "Prefer not to say",
    bio: "", linkedIn: "", website: "", motivationStatement: "",
    sectors: [], experience: [],
    skills: [], languages: [],
    education: [], certifications: [],
    deploymentType: "both", availabilityDate: "", preferredRegions: [],
    dailyRate: "", currency: "USD",
    references: [],
  });

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));
  const addToArray    = (key, item) => setForm(f => ({ ...f, [key]: [...f[key], item] }));
  const removeFromArray = (key, idx) => setForm(f => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));

  const [newSkill, setNewSkill] = useState({ name: "", level: "intermediate" });
  const [newLang,  setNewLang]  = useState({ language: "", proficiency: "professional" });
  const [newEdu,   setNewEdu]   = useState({ institution: "", degree: "", field: "", country: "", from: "", to: "" });
  const [newCert,  setNewCert]  = useState({ name: "", issuer: "", date: "" });
  const [newRef,   setNewRef]   = useState({ name: "", organization: "", email: "", phone: "" });

  const pwValid = PW_RULES.every(r => r.test(form.password));

  async function handleNext() {
    const errors = {};

    if (step === 0) {
      if (!form.firstName)  errors.firstName = "Required";
      if (!form.lastName)   errors.lastName  = "Required";
      if (!form.email)      errors.email     = "Required";
      if (!form.phone)      errors.phone     = "Required";
      if (!form.password)   errors.password  = "Required";
      else if (!pwValid)    errors.password  = "Password doesn't meet all requirements above";

      if (Object.keys(errors).length) { setFieldErrors(errors); return; }
      setFieldErrors({});

      if (!memberId) {
        setLoading(true);
        setAlreadyExists(false);
        try {
          const { data } = await registerRosterMember({
            firstName: form.firstName, lastName: form.lastName,
            email: form.email, password: form.password, phone: form.phone,
          });
          setMemberId(data.member?._id || "new");
          toast.success("Account created! Now complete your profile.");
        } catch (err) {
          const msg = err.response?.data?.message || "";
          if (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("exist") || err.response?.status === 409) {
            setAlreadyExists(true);
          } else {
            toast.error(msg || "Registration failed");
          }
          setLoading(false);
          return;
        } finally { setLoading(false); }
      }
    }
    if (step < STEPS.length - 1) setStep(s => s + 1);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      await updateMyRosterProfile({
        nationality: form.nationality, countryOfResidence: form.countryOfResidence,
        city: form.city, gender: form.gender, bio: form.bio,
        linkedIn: form.linkedIn, website: form.website,
        motivationStatement: form.motivationStatement,
        sectors: form.sectors, experience: form.experience,
        skills: form.skills, languages: form.languages,
        education: form.education, certifications: form.certifications,
        deploymentType: form.deploymentType,
        availabilityDate: form.availabilityDate || null,
        preferredRegions: form.preferredRegions,
        dailyRate: Number(form.dailyRate) || 0, currency: form.currency,
      });
      toast.success("Application submitted! WDC will review your profile shortly.");
      navigate("/roster/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <>
      <SEOMeta
        title="Apply as Expert — WDC Global Roster"
        description="Join the WDC Global Roster. Apply as a certified disaster expert and get deployed to the world's most critical humanitarian missions."
        url="/roster/apply"
        noindex={false}
      />

      <div className="bg-surface-subtle py-12 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/roster" className="inline-flex items-center gap-1 text-sm text-primary font-medium mb-4 hover:underline">
              <ChevronLeft size={14} /> Back to Roster
            </Link>
            <h1 className="h2 text-content-primary">Join the WDC Expert Roster</h1>
            <p className="body-3 text-content-secondary mt-2 max-w-lg mx-auto">
              Complete all 7 steps to submit your application. Quality profiles get deployed first.
            </p>
            {/* Prominent login link always visible */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-sm text-content-secondary shadow-sm">
              <LogIn size={14} className="text-primary" />
              Already applied?{" "}
              <Link to="/roster/login" className="text-primary font-bold hover:underline">Sign in to your account →</Link>
            </div>
          </div>

          {/* Already-registered banner */}
          {alreadyExists && (
            <div className="mb-6 p-4 rounded-2xl border-2 border-amber-300 bg-amber-50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <AlertCircle size={22} className="text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-amber-800 text-sm">This email is already registered</p>
                <p className="text-amber-700 text-xs mt-0.5">
                  An account with <strong>{form.email}</strong> already exists.
                  Log in to continue your application or access your dashboard.
                </p>
              </div>
              <Link to="/roster/login"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                <LogIn size={14} /> Log In Now
              </Link>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-border">
            <StepIndicator current={step} />

            {/* ── Step 0: Personal Info ── */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-content-primary mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" required error={fieldErrors.firstName}>
                    <input value={form.firstName} onChange={e => { set("firstName", e.target.value); setFieldErrors(f => ({ ...f, firstName: "" })); }}
                      className={fieldErrors.firstName ? inputErrCls : inputCls} placeholder="John" />
                  </Field>
                  <Field label="Last Name" required error={fieldErrors.lastName}>
                    <input value={form.lastName} onChange={e => { set("lastName", e.target.value); setFieldErrors(f => ({ ...f, lastName: "" })); }}
                      className={fieldErrors.lastName ? inputErrCls : inputCls} placeholder="Doe" />
                  </Field>
                </div>
                <Field label="Email Address" required error={fieldErrors.email}>
                  <input type="email" value={form.email}
                    onChange={e => { set("email", e.target.value); setFieldErrors(f => ({ ...f, email: "" })); setAlreadyExists(false); }}
                    className={fieldErrors.email ? inputErrCls : inputCls} placeholder="you@example.com" />
                </Field>
                <Field label="Password" required error={fieldErrors.password}>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} value={form.password}
                      onChange={e => { set("password", e.target.value); setFieldErrors(f => ({ ...f, password: "" })); }}
                      className={`${fieldErrors.password ? inputErrCls : inputCls} pr-10`} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary">
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <PasswordStrength password={form.password} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone Number" required error={fieldErrors.phone}>
                    <input value={form.phone} onChange={e => { set("phone", e.target.value); setFieldErrors(f => ({ ...f, phone: "" })); }}
                      className={fieldErrors.phone ? inputErrCls : inputCls} placeholder="+1 234 567 8900" />
                  </Field>
                  <Field label="Gender">
                    <select value={form.gender} onChange={e => set("gender", e.target.value)} className={inputCls}>
                      {["Male", "Female", "Other", "Prefer not to say"].map(g => <option key={g}>{g}</option>)}
                    </select>
                  </Field>
                  <Field label="Nationality">
                    <SearchableSelect
                      options={COUNTRIES}
                      value={form.nationality}
                      onChange={v => set("nationality", v)}
                      placeholder="Select nationality…"
                      style={selectStyle}
                    />
                  </Field>
                  <Field label="Country of Residence">
                    <SearchableSelect
                      options={COUNTRIES}
                      value={form.countryOfResidence}
                      onChange={v => set("countryOfResidence", v)}
                      placeholder="Select country…"
                      style={selectStyle}
                    />
                  </Field>
                  <Field label="City">
                    <input value={form.city} onChange={e => set("city", e.target.value)} className={inputCls} placeholder="e.g. Nairobi" />
                  </Field>
                </div>
              </div>
            )}

            {/* ── Step 1: Professional Background ── */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-content-primary mb-4">Professional Background</h2>
                <Field label="Professional Bio" hint="Tell us about your background in 2–3 sentences.">
                  <textarea rows={4} value={form.bio} onChange={e => set("bio", e.target.value)} className={inputCls}
                    placeholder="I am a disaster risk reduction specialist with 8 years of experience across sub-Saharan Africa..." />
                </Field>
                <Field label="Motivation Statement" hint="Why do you want to join the WDC Roster?">
                  <textarea rows={3} value={form.motivationStatement} onChange={e => set("motivationStatement", e.target.value)} className={inputCls}
                    placeholder="My motivation to join WDC..." />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="LinkedIn Profile">
                    <input value={form.linkedIn} onChange={e => set("linkedIn", e.target.value)} className={inputCls} placeholder="https://linkedin.com/in/..." />
                  </Field>
                  <Field label="Personal Website">
                    <input value={form.website} onChange={e => set("website", e.target.value)} className={inputCls} placeholder="https://..." />
                  </Field>
                </div>
                <Field label="Sectors of Expertise" hint="Select all that apply">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {SECTORS.map(s => (
                      <button key={s} type="button"
                        onClick={() => set("sectors", form.sectors.includes(s) ? form.sectors.filter(x => x !== s) : [...form.sectors, s])}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                        style={{ background: form.sectors.includes(s) ? "#009EDB" : "transparent", color: form.sectors.includes(s) ? "#fff" : "#475569", borderColor: form.sectors.includes(s) ? "#009EDB" : "#e2e8f0" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {/* ── Step 2: Skills & Languages ── */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-content-primary">Skills & Languages</h2>

                {/* Skills */}
                <div>
                  <p className="text-sm font-semibold text-content-secondary mb-3">Skills</p>
                  <div className="flex flex-col gap-2 mb-4">
                    <AutocompleteInput
                      value={newSkill.name}
                      onChange={v => setNewSkill(prev => ({ ...prev, name: v }))}
                      suggestions={SKILL_SUGGESTIONS}
                      placeholder="Type a skill (e.g. ArcGIS, Python, HEAT)"
                      className={inputCls}
                      onEnter={() => { if (newSkill.name.trim()) { addToArray("skills", { ...newSkill }); setNewSkill({ name: "", level: "intermediate" }); }}}
                    />
                    <div className="flex gap-2">
                      <select value={newSkill.level} onChange={e => setNewSkill(v => ({ ...v, level: e.target.value }))} className={`${inputCls} flex-1`}>
                        {SKILL_LEVELS.map(l => <option key={l}>{l}</option>)}
                      </select>
                      <button type="button"
                        onClick={() => { if (newSkill.name.trim()) { addToArray("skills", { ...newSkill }); setNewSkill({ name: "", level: "intermediate" }); }}}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm shrink-0 transition-opacity hover:opacity-90"
                        style={{ background: "#009EDB" }}>
                        <Plus size={16} /> Add
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.skills.length === 0 && (
                      <p className="text-xs text-content-tertiary italic">No skills added yet — type a skill above and click Add.</p>
                    )}
                    {form.skills.map((s, i) => (
                      <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,158,219,0.1)", color: "#009EDB" }}>
                        {s.name} <span className="opacity-60">({s.level})</span>
                        <button onClick={() => removeFromArray("skills", i)} className="hover:opacity-70 transition-opacity"><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <p className="text-sm font-semibold text-content-secondary mb-3">Languages</p>
                  <div className="flex flex-col gap-2 mb-4">
                    <AutocompleteInput
                      value={newLang.language}
                      onChange={v => setNewLang(prev => ({ ...prev, language: v }))}
                      suggestions={LANG_LIST}
                      placeholder="Type a language (e.g. French, Swahili)"
                      className={inputCls}
                      onEnter={() => { if (newLang.language.trim()) { addToArray("languages", { ...newLang }); setNewLang({ language: "", proficiency: "professional" }); }}}
                    />
                    <div className="flex gap-2">
                      <select value={newLang.proficiency} onChange={e => setNewLang(v => ({ ...v, proficiency: e.target.value }))} className={`${inputCls} flex-1`}>
                        {LANG_LEVELS.map(l => <option key={l}>{l}</option>)}
                      </select>
                      <button type="button"
                        onClick={() => { if (newLang.language.trim()) { addToArray("languages", { ...newLang }); setNewLang({ language: "", proficiency: "professional" }); }}}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold shrink-0 transition-opacity hover:opacity-90"
                        style={{ background: "#009EDB" }}>
                        <Plus size={16} /> Add
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.languages.length === 0 && (
                      <p className="text-xs text-content-tertiary italic">No languages added yet — type a language above and click Add.</p>
                    )}
                    {form.languages.map((l, i) => (
                      <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-subtle border border-border text-content-secondary">
                        {l.language} <span className="opacity-70">({l.proficiency})</span>
                        <button onClick={() => removeFromArray("languages", i)} className="hover:opacity-70 transition-opacity"><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3: Education & Certifications ── */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-content-primary">Certifications & Education</h2>
                <div>
                  <p className="text-sm font-semibold text-content-secondary mb-3">Certifications</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    <input value={newCert.name}   onChange={e => setNewCert(v => ({ ...v, name: e.target.value }))}   className={inputCls} placeholder="Certification name" />
                    <input value={newCert.issuer} onChange={e => setNewCert(v => ({ ...v, issuer: e.target.value }))} className={inputCls} placeholder="Issuing organization" />
                    <div className="flex gap-2 sm:col-span-2">
                      <input type="date" value={newCert.date} onChange={e => setNewCert(v => ({ ...v, date: e.target.value }))} className={`${inputCls} flex-1`} />
                      <button type="button"
                        onClick={() => { if (newCert.name.trim()) { addToArray("certifications", { ...newCert, verified: false }); setNewCert({ name: "", issuer: "", date: "" }); }}}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold shrink-0" style={{ background: "#009EDB" }}>
                        <Plus size={16} /> Add
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {form.certifications.map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-border text-sm">
                        <div>
                          <span className="font-semibold text-content-primary">{c.name}</span>
                          <span className="text-content-secondary ml-2">— {c.issuer} {c.date && `(${c.date})`}</span>
                        </div>
                        <button onClick={() => removeFromArray("certifications", i)}><X size={14} className="text-content-tertiary" /></button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-content-secondary mb-3">Education</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    <input value={newEdu.institution} onChange={e => setNewEdu(v => ({ ...v, institution: e.target.value }))} className={inputCls} placeholder="Institution" />
                    <input value={newEdu.degree}      onChange={e => setNewEdu(v => ({ ...v, degree: e.target.value }))}      className={inputCls} placeholder="Degree (e.g. MSc, PhD)" />
                    <input value={newEdu.field}       onChange={e => setNewEdu(v => ({ ...v, field: e.target.value }))}       className={inputCls} placeholder="Field of study" />
                    <SearchableSelect
                      options={COUNTRIES}
                      value={newEdu.country}
                      onChange={v => setNewEdu(prev => ({ ...prev, country: v }))}
                      placeholder="Country…"
                      style={selectStyle}
                    />
                    <input type="date" value={newEdu.from} onChange={e => setNewEdu(v => ({ ...v, from: e.target.value }))} className={inputCls} />
                    <div className="flex gap-2">
                      <input type="date" value={newEdu.to} onChange={e => setNewEdu(v => ({ ...v, to: e.target.value }))} className={`${inputCls} flex-1`} />
                      <button type="button"
                        onClick={() => { if (newEdu.institution.trim()) { addToArray("education", { ...newEdu }); setNewEdu({ institution: "", degree: "", field: "", country: "", from: "", to: "" }); }}}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold shrink-0" style={{ background: "#009EDB" }}>
                        <Plus size={16} /> Add
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {form.education.map((e, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-border text-sm">
                        <span className="font-semibold text-content-primary">{e.degree} in {e.field} — {e.institution}, {e.country}</span>
                        <button onClick={() => removeFromArray("education", i)}><X size={14} className="text-content-tertiary" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 4: Deployment Preferences ── */}
            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-lg font-bold text-content-primary">Deployment Preferences</h2>
                <Field label="Deployment Type">
                  <div className="flex gap-3">
                    {["field", "remote", "both"].map(t => (
                      <button key={t} type="button" onClick={() => set("deploymentType", t)}
                        className="flex-1 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all"
                        style={{ background: form.deploymentType === t ? "#009EDB" : "transparent", color: form.deploymentType === t ? "#fff" : "#475569", borderColor: form.deploymentType === t ? "#009EDB" : "#e2e8f0" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Available From">
                    <input type="date" value={form.availabilityDate} onChange={e => set("availabilityDate", e.target.value)} className={inputCls} />
                  </Field>
                  <Field label="Currency">
                    <select value={form.currency} onChange={e => set("currency", e.target.value)} className={inputCls}>
                      {["USD", "EUR", "GBP", "CHF", "KES", "XOF"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Daily Rate (approx.)" hint="Expected daily rate for paid deployments">
                    <input type="number" value={form.dailyRate} onChange={e => set("dailyRate", e.target.value)} className={inputCls} placeholder="200" />
                  </Field>
                </div>
                <Field label="Preferred Regions" hint="Select where you can be deployed">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {REGIONS.map(r => (
                      <button key={r} type="button"
                        onClick={() => set("preferredRegions", form.preferredRegions.includes(r) ? form.preferredRegions.filter(x => x !== r) : [...form.preferredRegions, r])}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                        style={{ background: form.preferredRegions.includes(r) ? "#009EDB" : "transparent", color: form.preferredRegions.includes(r) ? "#fff" : "#475569", borderColor: form.preferredRegions.includes(r) ? "#009EDB" : "#e2e8f0" }}>
                        {r}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {/* ── Step 5: References ── */}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-content-primary">Professional References</h2>
                <p className="text-sm text-content-secondary">Provide at least one professional reference who can vouch for your humanitarian experience.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  <input value={newRef.name}         onChange={e => setNewRef(v => ({ ...v, name: e.target.value }))}         className={inputCls} placeholder="Full name" />
                  <input value={newRef.organization} onChange={e => setNewRef(v => ({ ...v, organization: e.target.value }))} className={inputCls} placeholder="Organization" />
                  <input type="email" value={newRef.email} onChange={e => setNewRef(v => ({ ...v, email: e.target.value }))}  className={inputCls} placeholder="Email" />
                  <div className="flex gap-2">
                    <input value={newRef.phone} onChange={e => setNewRef(v => ({ ...v, phone: e.target.value }))} className={`${inputCls} flex-1`} placeholder="Phone" />
                    <button type="button"
                      onClick={() => { if (newRef.name.trim()) { addToArray("references", { ...newRef }); setNewRef({ name: "", organization: "", email: "", phone: "" }); }}}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold shrink-0" style={{ background: "#009EDB" }}>
                      <Plus size={16} /> Add
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {form.references.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-border text-sm">
                      <div>
                        <span className="font-semibold text-content-primary">{r.name}</span>
                        <span className="text-content-secondary ml-2">{r.organization} — {r.email}</span>
                      </div>
                      <button onClick={() => removeFromArray("references", i)}><X size={14} className="text-content-tertiary" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 6: Review ── */}
            {step === 6 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-content-primary">Review & Submit</h2>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-content-secondary">
                  <p className="font-semibold text-content-primary mb-1">What happens next?</p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>WDC team reviews your application within 5 business days</li>
                    <li>If shortlisted, you'll receive an interview invitation</li>
                    <li>Credentials and references are verified</li>
                    <li>You sign the WDC Roster contract</li>
                    <li>Your profile goes live and you start receiving deployment opportunities</li>
                  </ol>
                </div>
                <div className="rounded-xl bg-surface-subtle border border-border p-4 space-y-2 text-sm">
                  {[
                    ["Name",           `${form.firstName} ${form.lastName}`],
                    ["Email",          form.email],
                    ["Location",       `${form.city}, ${form.countryOfResidence}`],
                    ["Skills",         `${form.skills.length} added`],
                    ["Languages",      `${form.languages.length} added`],
                    ["Certifications", `${form.certifications.length} added`],
                    ["References",     `${form.references.length} added`],
                    ["Deployment",     form.deploymentType],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-content-secondary">{k}:</span>
                      <span className="font-semibold capitalize">{v}</span>
                    </div>
                  ))}
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 accent-primary" />
                  <span className="text-xs text-content-secondary">
                    I confirm that all information provided is accurate. I agree to the WDC Roster terms and conditions and understand that WDC will conduct background and reference checks as part of the vetting process.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button onClick={() => step > 0 && setStep(s => s - 1)} disabled={step === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border disabled:opacity-40 disabled:cursor-not-allowed border-border text-content-secondary hover:bg-surface-subtle transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <span className="text-xs text-content-tertiary font-medium">Step {step + 1} of {STEPS.length}</span>
              {step < STEPS.length - 1 ? (
                <button onClick={handleNext} disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60 transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                  {loading ? "Please wait…" : "Continue"} <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading}
                  className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60 transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                  {loading ? "Submitting…" : "Submit Application"} <Check size={16} />
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-content-tertiary mt-6">
            Having trouble?{" "}
            <a href="mailto:office@worlddisastercenter.org" className="text-primary hover:underline font-medium">
              office@worlddisastercenter.org
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
