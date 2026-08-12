import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  LayoutDashboard, User, Award, Briefcase, Calendar, Star,
  LogOut, CheckCircle, Clock, Globe, MapPin, TrendingUp,
  Shield, Send, ChevronRight, Edit2, Save, X, Plus,
} from "lucide-react";
import {
  getMyRosterProfile, updateMyRosterProfile,
  getRosterOpportunities as getOpportunities,
  getMyDeployments, getMyEvents, logoutRosterMember,
  applyToOpportunity,
} from "../../../api/roster";

const SECTORS = ["Early Warning", "Emergency Response", "Health & Medical", "WASH", "Shelter & NFI", "GIS & Remote Sensing", "Data & AI", "Training & Capacity Building", "Protection & Human Rights", "M&E", "Coordination & IM", "Policy & Strategy", "Logistics", "Communications"];
const REGIONS = ["Africa — East", "Africa — West", "Africa — Central", "Africa — Southern", "Africa — North", "Asia — South", "Asia — Southeast", "Middle East", "Europe", "Latin America", "Pacific", "Global / Remote"];
const SKILL_LEVELS = ["beginner", "intermediate", "advanced", "expert"];
const LANG_LEVELS = ["basic", "conversational", "professional", "native"];

const STATUS_COLORS = {
  applied: { bg: "#E8F5FC", text: "#009EDB", label: "Application Submitted" },
  screening: { bg: "#FEF3E2", text: "#E87722", label: "Under Screening" },
  interview_scheduled: { bg: "#EBF4FB", text: "#418FDE", label: "Interview Scheduled" },
  background_check: { bg: "#FEF3E2", text: "#E87722", label: "Background Check" },
  contract_pending: { bg: "#E8F5EE", text: "#1A7644", label: "Contract Pending" },
  active: { bg: "#E8F5EE", text: "#1A7644", label: "Active — Ready to Deploy" },
  deployed: { bg: "rgba(0,158,219,0.1)", text: "#009EDB", label: "Currently Deployed" },
  on_leave: { bg: "#f1f5f9", text: "#64748b", label: "On Leave" },
  suspended: { bg: "#FDECEA", text: "#CC2936", label: "Suspended" },
  rejected: { bg: "#FDECEA", text: "#CC2936", label: "Rejected" },
};

const NAV = [
  { key: "overview", icon: LayoutDashboard, label: "Overview" },
  { key: "profile", icon: User, label: "My Profile" },
  { key: "opportunities", icon: Briefcase, label: "Opportunities" },
  { key: "deployments", icon: Send, label: "My Deployments" },
  { key: "events", icon: Calendar, label: "Events & Training" },
  { key: "certifications", icon: Award, label: "Certifications" },
  { key: "recognitions", icon: Star, label: "Recognitions" },
];

const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm outline-none border border-border focus:border-primary transition-colors bg-white";

// ── Inline Profile Editor ──────────────────────────────────────────────────────
function ProfileEditor({ profile, onSaved, onCancel }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    bio: profile.bio || "",
    phone: profile.phone || "",
    nationality: profile.nationality || "",
    countryOfResidence: profile.countryOfResidence || "",
    city: profile.city || "",
    linkedIn: profile.linkedIn || "",
    website: profile.website || "",
    deploymentType: profile.deploymentType || "both",
    availabilityDate: profile.availabilityDate?.split("T")[0] || "",
    dailyRate: profile.dailyRate || "",
    currency: profile.currency || "USD",
    preferredRegions: profile.preferredRegions || [],
    sectors: profile.sectors || [],
    skills: profile.skills || [],
    languages: profile.languages || [],
    motivationStatement: profile.motivationStatement || "",
  });
  const [newSkill, setNewSkill] = useState({ name: "", level: "intermediate" });
  const [newLang, setNewLang] = useState({ language: "", proficiency: "professional" });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (key, val) => setForm(f => ({
    ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
  }));

  async function save() {
    setSaving(true);
    try {
      const res = await updateMyRosterProfile({
        ...form,
        dailyRate: Number(form.dailyRate) || 0,
        availabilityDate: form.availabilityDate || null,
      });
      toast.success("Profile updated.");
      onSaved(res.data.member || res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed. Please try again.");
    } finally { setSaving(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-content-primary">Edit Profile</h2>
        <div className="flex gap-2">
          <button onClick={onCancel} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-border text-content-secondary hover:bg-surface-subtle transition-colors">
            <X size={14} /> Cancel
          </button>
          <button onClick={save} disabled={saving} className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-60 transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
            <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Basic info */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
        <p className="text-xs font-bold text-content-secondary uppercase tracking-wider">Basic Information</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">Phone</label>
            <input value={form.phone} onChange={e => set("phone", e.target.value)} className={inputCls} placeholder="+1 234 567 8900" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">Nationality</label>
            <input value={form.nationality} onChange={e => set("nationality", e.target.value)} className={inputCls} placeholder="e.g. Kenyan" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">Country of Residence</label>
            <input value={form.countryOfResidence} onChange={e => set("countryOfResidence", e.target.value)} className={inputCls} placeholder="e.g. Kenya" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">City</label>
            <input value={form.city} onChange={e => set("city", e.target.value)} className={inputCls} placeholder="e.g. Nairobi" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">LinkedIn</label>
            <input value={form.linkedIn} onChange={e => set("linkedIn", e.target.value)} className={inputCls} placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">Website</label>
            <input value={form.website} onChange={e => set("website", e.target.value)} className={inputCls} placeholder="https://..." />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-content-secondary mb-1.5">Professional Bio</label>
          <textarea rows={4} value={form.bio} onChange={e => set("bio", e.target.value)} className={inputCls} placeholder="Brief overview of your humanitarian background..." />
        </div>
        <div>
          <label className="block text-xs font-semibold text-content-secondary mb-1.5">Motivation Statement</label>
          <textarea rows={3} value={form.motivationStatement} onChange={e => set("motivationStatement", e.target.value)} className={inputCls} placeholder="Why you joined the WDC roster..." />
        </div>
      </div>

      {/* Deployment preferences */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
        <p className="text-xs font-bold text-content-secondary uppercase tracking-wider">Deployment Preferences</p>
        <div>
          <label className="block text-xs font-semibold text-content-secondary mb-2">Deployment Type</label>
          <div className="flex gap-3">
            {["field", "remote", "both"].map(t => (
              <button key={t} type="button" onClick={() => set("deploymentType", t)}
                className="flex-1 py-2.5 rounded-xl border text-sm font-semibold capitalize transition-all"
                style={{ background: form.deploymentType === t ? "#009EDB" : "transparent", color: form.deploymentType === t ? "#fff" : "#475569", borderColor: form.deploymentType === t ? "#009EDB" : "#e2e8f0" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">Available From</label>
            <input type="date" value={form.availabilityDate} onChange={e => set("availabilityDate", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">Daily Rate</label>
            <input type="number" value={form.dailyRate} onChange={e => set("dailyRate", e.target.value)} className={inputCls} placeholder="200" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">Currency</label>
            <select value={form.currency} onChange={e => set("currency", e.target.value)} className={inputCls}>
              {["USD", "EUR", "GBP", "CHF", "KES", "XOF"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-content-secondary mb-2">Preferred Regions</label>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map(r => (
              <button key={r} type="button" onClick={() => toggleArr("preferredRegions", r)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{ background: form.preferredRegions.includes(r) ? "#009EDB" : "transparent", color: form.preferredRegions.includes(r) ? "#fff" : "#475569", borderColor: form.preferredRegions.includes(r) ? "#009EDB" : "#e2e8f0" }}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-content-secondary mb-2">Sectors of Expertise</label>
          <div className="flex flex-wrap gap-2">
            {SECTORS.map(s => (
              <button key={s} type="button" onClick={() => toggleArr("sectors", s)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{ background: form.sectors.includes(s) ? "#009EDB" : "transparent", color: form.sectors.includes(s) ? "#fff" : "#475569", borderColor: form.sectors.includes(s) ? "#009EDB" : "#e2e8f0" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-3">
        <p className="text-xs font-bold text-content-secondary uppercase tracking-wider">Skills</p>
        <div className="flex gap-2">
          <input value={newSkill.name} onChange={e => setNewSkill(v => ({ ...v, name: e.target.value }))} className={`${inputCls} flex-1`} placeholder="Skill name (e.g. ArcGIS, Python)" />
          <select value={newSkill.level} onChange={e => setNewSkill(v => ({ ...v, level: e.target.value }))} className={`${inputCls} w-36`}>
            {SKILL_LEVELS.map(l => <option key={l}>{l}</option>)}
          </select>
          <button type="button"
            onClick={() => { if (newSkill.name.trim()) { set("skills", [...form.skills, { ...newSkill }]); setNewSkill({ name: "", level: "intermediate" }); } }}
            className="px-3 py-2 rounded-xl text-white" style={{ background: "#009EDB" }}><Plus size={16} /></button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.skills.map((s, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,158,219,0.1)", color: "#009EDB" }}>
              {s.name} <span className="opacity-60">({s.level})</span>
              <button onClick={() => set("skills", form.skills.filter((_, j) => j !== i))}><X size={10} /></button>
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-3">
        <p className="text-xs font-bold text-content-secondary uppercase tracking-wider">Languages</p>
        <div className="flex gap-2">
          <input value={newLang.language} onChange={e => setNewLang(v => ({ ...v, language: e.target.value }))} className={`${inputCls} flex-1`} placeholder="Language (e.g. French, Swahili)" />
          <select value={newLang.proficiency} onChange={e => setNewLang(v => ({ ...v, proficiency: e.target.value }))} className={`${inputCls} w-36`}>
            {LANG_LEVELS.map(l => <option key={l}>{l}</option>)}
          </select>
          <button type="button"
            onClick={() => { if (newLang.language.trim()) { set("languages", [...form.languages, { ...newLang }]); setNewLang({ language: "", proficiency: "professional" }); } }}
            className="px-3 py-2 rounded-xl text-white" style={{ background: "#009EDB" }}><Plus size={16} /></button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.languages.map((l, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-subtle border border-border text-content-secondary">
              {l.language} <span className="opacity-70">({l.proficiency})</span>
              <button onClick={() => set("languages", form.languages.filter((_, j) => j !== i))}><X size={10} /></button>
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-content-tertiary text-center pb-4">
        Questions? <a href="mailto:office@worlddisastercenter.org" className="text-primary hover:underline">office@worlddisastercenter.org</a>
      </p>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function RosterDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    async function load() {
      // Use bootstrap data from login response for instant render
      // (avoids redirect when cross-origin cookies are blocked by browser)
      let hasBootstrap = false;
      try {
        const raw = sessionStorage.getItem("roster_bootstrap");
        if (raw) {
          setProfile(JSON.parse(raw));
          hasBootstrap = true;
          sessionStorage.removeItem("roster_bootstrap");
        }
      } catch {}

      try {
        const [pRes, oRes, dRes, eRes] = await Promise.allSettled([
          getMyRosterProfile(), getOpportunities(), getMyDeployments(), getMyEvents(),
        ]);
        if (pRes.status === "fulfilled") {
          setProfile(pRes.value.data);
        } else if (!hasBootstrap) {
          navigate("/roster/login");
          return;
        }
        if (oRes.status === "fulfilled") setOpportunities(oRes.value.data.opportunities || []);
        if (dRes.status === "fulfilled") setDeployments(dRes.value.data.deployments || []);
        if (eRes.status === "fulfilled") setEvents(eRes.value.data.events || []);
      } catch {
        if (!hasBootstrap) navigate("/roster/login");
      } finally { setLoading(false); }
    }
    load();
  }, []);

  async function handleLogout() {
    try { await logoutRosterMember(); } catch {}
    navigate("/roster/login");
  }

  async function handleApply(id) {
    try {
      await applyToOpportunity(id);
      toast.success("Application submitted.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not apply. Please try again.");
    }
  }

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-content-secondary">Loading your dashboard...</p>
      </div>
    </div>
  );

  if (!profile) return null;

  const status = STATUS_COLORS[profile.rosterStatus] || STATUS_COLORS.applied;
  const completionScore = profile.profileCompletionScore || 10;

  return (
    <>
      <Helmet>
        <title>My Dashboard | WDC Expert Roster</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="bg-surface-subtle flex min-h-[calc(100vh-7rem)]">
        {/* Sidebar — offset accounts for fixed header */}
        <aside className="w-56 bg-white border-r border-border flex flex-col shrink-0 sticky top-[6.5rem] lg:top-[7rem] h-[calc(100vh-6.5rem)] lg:h-[calc(100vh-7rem)]">
          <div className="px-4 pt-5 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                {profile.firstName?.[0]}{profile.lastName?.[0]}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-content-primary truncate">{profile.firstName} {profile.lastName}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: status.bg, color: status.text }}>{status.label}</span>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-2 overflow-y-auto">
            {NAV.map(({ key, icon: Icon, label }) => (
              <button key={key} onClick={() => { setTab(key); setEditingProfile(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all text-left mb-0.5"
                style={{ background: tab === key ? "rgba(0,158,219,0.08)" : "transparent", color: tab === key ? "#009EDB" : "#475569" }}>
                <Icon size={15} />{label}
              </button>
            ))}
          </nav>

          <div className="p-2 border-t border-border">
            <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-content-tertiary hover:text-red-500 hover:bg-red-50 transition-all">
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">

          {/* ── Overview ── */}
          {tab === "overview" && (
            <div className="space-y-5 max-w-4xl">
              <div>
                <h1 className="text-xl font-bold text-content-primary">Welcome back, {profile.firstName}</h1>
                <p className="text-sm text-content-secondary mt-1">Your roster status and activity at a glance.</p>
              </div>

              <div className="p-4 rounded-2xl" style={{ background: status.bg, border: `1px solid ${status.text}30` }}>
                <div className="flex items-center gap-3">
                  <Shield size={18} style={{ color: status.text }} />
                  <div>
                    <p className="font-bold text-sm" style={{ color: status.text }}>Status: {status.label}</p>
                    {profile.rosterStatus === "applied" && <p className="text-xs mt-0.5" style={{ color: status.text, opacity: 0.8 }}>Under review — you'll hear from WDC within 5 business days.</p>}
                    {profile.rosterStatus === "active" && <p className="text-xs mt-0.5" style={{ color: status.text, opacity: 0.8 }}>You're live on the roster. Browse opportunities below.</p>}
                    {profile.rosterStatus === "deployed" && <p className="text-xs mt-0.5" style={{ color: status.text, opacity: 0.8 }}>Active deployment in progress.</p>}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-content-primary text-sm">Profile Completion</p>
                    <p className="text-xs text-content-secondary mt-0.5">Complete your profile to get deployed faster</p>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: "#009EDB" }}>{completionScore}%</span>
                </div>
                <div className="w-full h-2 bg-surface-subtle rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${completionScore}%`, background: "linear-gradient(90deg, #009EDB, #4DC0E8)" }} />
                </div>
                {completionScore < 100 && (
                  <button onClick={() => { setTab("profile"); setEditingProfile(true); }} className="mt-3 text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                    Complete your profile <ChevronRight size={12} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Skills", value: profile.skills?.length || 0, icon: TrendingUp },
                  { label: "Languages", value: profile.languages?.length || 0, icon: Globe },
                  { label: "Certifications", value: profile.certifications?.length || 0, icon: Award },
                  { label: "Deployments", value: profile.deploymentHistory?.length || 0, icon: Send },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="p-4 rounded-2xl bg-white border border-border text-center">
                    <Icon size={18} style={{ color: "#009EDB", margin: "0 auto 8px" }} />
                    <p className="text-2xl font-bold text-content-primary">{value}</p>
                    <p className="text-xs text-content-secondary">{label}</p>
                  </div>
                ))}
              </div>

              {events.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-border">
                  <p className="font-bold text-sm text-content-primary mb-3">Upcoming Events</p>
                  {events.slice(0, 3).map((ev, i) => (
                    <div key={i} className="flex items-start gap-3 py-2.5 border-b last:border-0 border-border">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,158,219,0.08)" }}>
                        <Calendar size={14} style={{ color: "#009EDB" }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-content-primary">{ev.title}</p>
                        <p className="text-xs text-content-secondary">{ev.type} · {new Date(ev.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Profile Tab ── */}
          {tab === "profile" && (
            editingProfile
              ? <ProfileEditor
                  profile={profile}
                  onSaved={updated => { setProfile(p => ({ ...p, ...updated })); setEditingProfile(false); }}
                  onCancel={() => setEditingProfile(false)}
                />
              : (
                <div className="max-w-2xl space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-content-primary">My Profile</h2>
                    <button onClick={() => setEditingProfile(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#009EDB" }}>
                      <Edit2 size={14} /> Edit Profile
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-border p-6 space-y-3">
                    {[
                      ["Name", `${profile.firstName} ${profile.lastName}`],
                      ["Email", profile.email],
                      ["Phone", profile.phone || "—"],
                      ["Nationality", profile.nationality || "—"],
                      ["Location", profile.city && profile.countryOfResidence ? `${profile.city}, ${profile.countryOfResidence}` : "—"],
                      ["Deployment Type", profile.deploymentType || "—"],
                      ["Daily Rate", profile.dailyRate ? `${profile.dailyRate} ${profile.currency}/day` : "—"],
                      ["Available From", profile.availabilityDate ? new Date(profile.availabilityDate).toLocaleDateString() : "—"],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between py-2 border-b last:border-0 border-border text-sm">
                        <span className="text-content-secondary font-medium">{label}</span>
                        <span className="font-semibold text-content-primary text-right max-w-xs">{val}</span>
                      </div>
                    ))}
                  </div>

                  {profile.bio && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <p className="text-xs font-bold text-content-secondary uppercase tracking-wider mb-2">Bio</p>
                      <p className="text-sm text-content-secondary">{profile.bio}</p>
                    </div>
                  )}

                  {profile.skills?.length > 0 && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <p className="text-xs font-bold text-content-secondary uppercase tracking-wider mb-3">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((s, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,158,219,0.08)", color: "#009EDB" }}>
                            {s.name} <span className="opacity-60">({s.level})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.languages?.length > 0 && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <p className="text-xs font-bold text-content-secondary uppercase tracking-wider mb-3">Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.languages.map((l, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-surface-subtle border border-border text-content-secondary">
                            {l.language} <span className="opacity-70">({l.proficiency})</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.preferredRegions?.length > 0 && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <p className="text-xs font-bold text-content-secondary uppercase tracking-wider mb-3">Preferred Regions</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.preferredRegions.map((r, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,158,219,0.08)", color: "#009EDB" }}>{r}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.linkedIn && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <p className="text-xs font-bold text-content-secondary uppercase tracking-wider mb-2">Links</p>
                      <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block">{profile.linkedIn}</a>
                      {profile.website && <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline block mt-1">{profile.website}</a>}
                    </div>
                  )}
                </div>
              )
          )}

          {/* ── Opportunities ── */}
          {tab === "opportunities" && (
            <div className="max-w-4xl space-y-4">
              <h2 className="text-xl font-bold text-content-primary">Open Opportunities</h2>
              {opportunities.length === 0 ? (
                <div className="text-center py-16 rounded-2xl bg-white border border-border">
                  <Briefcase size={32} className="mx-auto mb-3 text-content-tertiary" />
                  <p className="text-content-secondary text-sm">No open opportunities at the moment. Check back soon.</p>
                  <p className="text-xs text-content-tertiary mt-2">Questions? <a href="mailto:office@worlddisastercenter.org" className="text-primary hover:underline">office@worlddisastercenter.org</a></p>
                </div>
              ) : opportunities.map((opp, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-border hover:border-primary/40 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{opp.type}</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full uppercase" style={{ background: opp.urgency === "critical" ? "#FDECEA" : opp.urgency === "high" ? "#FEF3E2" : "#E8F5FC", color: opp.urgency === "critical" ? "#CC2936" : opp.urgency === "high" ? "#E87722" : "#009EDB" }}>{opp.urgency}</span>
                      </div>
                      <h3 className="font-bold text-content-primary mb-1 text-sm">{opp.title}</h3>
                      <p className="text-xs text-content-secondary line-clamp-2 mb-3">{opp.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-content-secondary">
                        {opp.location?.country && <span className="flex items-center gap-1"><MapPin size={11} />{opp.location.country}</span>}
                        {opp.duration && <span className="flex items-center gap-1"><Clock size={11} />{opp.duration}</span>}
                      </div>
                    </div>
                    <button onClick={() => handleApply(opp.id || opp._id)}
                      className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}>
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Deployments ── */}
          {tab === "deployments" && (
            <div className="max-w-3xl space-y-4">
              <h2 className="text-xl font-bold text-content-primary">My Deployments</h2>
              {deployments.length === 0 ? (
                <div className="text-center py-16 rounded-2xl bg-white border border-border">
                  <Send size={32} className="mx-auto mb-3 text-content-tertiary" />
                  <p className="text-content-secondary text-sm">No deployments yet. Keep your profile complete and apply to opportunities.</p>
                </div>
              ) : deployments.map((d, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-content-primary">{d.partnerName || "WDC Internal"}</p>
                      <p className="text-xs text-content-secondary mt-0.5">{d.from ? new Date(d.from).toLocaleDateString() : "—"} → {d.to ? new Date(d.to).toLocaleDateString() : "Ongoing"}</p>
                      {d.rating && <div className="flex items-center gap-1 mt-1">{[...Array(5)].map((_, j) => <Star key={j} size={12} style={{ color: j < d.rating ? "#F59E0B" : "#e2e8f0", fill: j < d.rating ? "#F59E0B" : "none" }} />)}</div>}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full capitalize" style={{ background: d.status === "active" ? "rgba(0,158,219,0.1)" : d.status === "completed" ? "rgba(26,118,68,0.1)" : "#FDECEA", color: d.status === "active" ? "#009EDB" : d.status === "completed" ? "#1A7644" : "#CC2936" }}>{d.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Events ── */}
          {tab === "events" && (
            <div className="max-w-3xl space-y-4">
              <h2 className="text-xl font-bold text-content-primary">Events & Training</h2>
              {events.length === 0 ? (
                <div className="text-center py-16 rounded-2xl bg-white border border-border">
                  <Calendar size={32} className="mx-auto mb-3 text-content-tertiary" />
                  <p className="text-content-secondary text-sm">No upcoming events. Check back soon.</p>
                </div>
              ) : events.map((ev, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-border hover:border-primary/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 text-center" style={{ background: "rgba(0,158,219,0.08)" }}>
                      <span className="text-xs font-bold" style={{ color: "#009EDB" }}>{new Date(ev.date).toLocaleDateString("en", { month: "short" })}</span>
                      <span className="text-lg font-bold leading-none" style={{ color: "#009EDB" }}>{new Date(ev.date).getDate()}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{ev.type}</span>
                      <h3 className="font-bold text-content-primary text-sm mt-1">{ev.title}</h3>
                      {ev.host && <p className="text-xs text-content-secondary mt-0.5">Host: {ev.host}</p>}
                      {ev.description && <p className="text-xs text-content-secondary mt-1 line-clamp-2">{ev.description}</p>}
                    </div>
                    {ev.link && <a href={ev.link} target="_blank" rel="noopener noreferrer" className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: "#009EDB" }}>Register</a>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Certifications ── */}
          {tab === "certifications" && (
            <div className="max-w-3xl space-y-4">
              <h2 className="text-xl font-bold text-content-primary">My Certifications</h2>
              {(!profile.certifications || profile.certifications.length === 0) ? (
                <div className="text-center py-16 rounded-2xl bg-white border border-border">
                  <Award size={32} className="mx-auto mb-3 text-content-tertiary" />
                  <p className="text-sm text-content-secondary mb-3">No certifications added yet.</p>
                  <button onClick={() => { setTab("profile"); setEditingProfile(true); }} className="text-sm font-bold text-primary hover:underline">Add certifications via profile edit →</button>
                </div>
              ) : profile.certifications.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.verified ? "rgba(26,118,68,0.1)" : "rgba(0,158,219,0.08)" }}>
                      {c.verified ? <CheckCircle size={18} style={{ color: "#1A7644" }} /> : <Award size={18} style={{ color: "#009EDB" }} />}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-content-primary">{c.name}</p>
                      <p className="text-xs text-content-secondary">{c.issuer} · {c.date ? new Date(c.date).toLocaleDateString() : "—"}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: c.verified ? "rgba(26,118,68,0.1)" : "rgba(0,158,219,0.08)", color: c.verified ? "#1A7644" : "#009EDB" }}>
                    {c.verified ? "Verified by WDC" : "Pending verification"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── Recognitions ── */}
          {tab === "recognitions" && (
            <div className="max-w-3xl space-y-4">
              <h2 className="text-xl font-bold text-content-primary">Recognitions & Badges</h2>
              {(!profile.recognitions || profile.recognitions.length === 0) ? (
                <div className="text-center py-16 rounded-2xl bg-white border border-border">
                  <Star size={32} className="mx-auto mb-3 text-content-tertiary" />
                  <p className="text-sm text-content-secondary">No recognitions yet. Complete deployments to earn badges.</p>
                </div>
              ) : profile.recognitions.map((r, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)" }}>
                    <Star size={22} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  </div>
                  <div>
                    <p className="font-bold text-content-primary">{r.title}</p>
                    <p className="text-xs text-content-secondary">{r.type} · {r.issuer} · {r.date ? new Date(r.date).toLocaleDateString() : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
