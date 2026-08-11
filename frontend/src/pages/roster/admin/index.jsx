import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  LayoutDashboard, Users, Send, Building2, Calendar, ShieldCheck,
  LogOut, Eye, EyeOff, Search, Plus, X, Check, ChevronDown,
  TrendingUp, Clock, Globe, Award, Edit2, Bell, AlertCircle,
  CheckCircle, Filter, FileText,
} from "lucide-react";
import {
  loginAdmin, logoutAdmin, getAdminDashboard,
  getAdminMembers, getAdminMember, updateMemberStatus, addAdminNote,
  getAdminOpportunities, createOpportunity, updateOpportunity,
  getAdminDeployments, updateDeployment,
  getAdminPartners, createPartner, updatePartnerAccess,
  getAdminEvents, createEvent, deleteEvent,
  getAdmins, createAdminUser,
} from "../../../api/roster";

const MEMBER_STATUSES = ["applied", "screening", "interview_scheduled", "background_check", "contract_pending", "active", "deployed", "on_leave", "suspended", "rejected"];
const STATUS_COLORS = {
  applied: "#009EDB", screening: "#E87722", interview_scheduled: "#418FDE",
  background_check: "#E87722", contract_pending: "#1A7644", active: "#1A7644",
  deployed: "#009EDB", on_leave: "#64748b", suspended: "#CC2936", rejected: "#CC2936",
};

const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm outline-none border border-border focus:border-primary transition-colors bg-white";

// ── Login ─────────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!email || !password) { toast.error("Fill all fields"); return; }
    setLoading(true);
    try {
      const { data } = await loginAdmin({ email, password });
      onLogin(data.admin);
      toast.success("Welcome back, " + data.admin.name);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #001129, #002050)" }}>
            <ShieldCheck size={24} style={{ color: "#009EDB" }} />
          </div>
          <h1 className="text-2xl font-bold text-content-primary">Roster Admin</h1>
          <p className="text-sm text-content-secondary mt-1">WDC Operations — Restricted Access</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">Admin Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} placeholder="office@worlddisastercenter.org" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className={`${inputCls} pr-10`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-60" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
              {loading ? "Signing in..." : "Access Admin Panel"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Panel ───────────────────────────────────────────────────────────
export default function RosterAdminPage() {
  const [admin, setAdmin] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [members, setMembers] = useState([]);
  const [memberTotal, setMemberTotal] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [partners, setPartners] = useState([]);
  const [events, setEvents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [memberStatusFilter, setMemberStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOppForm, setShowOppForm] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  const [newOpp, setNewOpp] = useState({ title: "", description: "", type: "deployment", urgency: "medium", location: { country: "", remote: false }, duration: "", compensationType: "paid", requiredSkills: "", requiredLanguages: "" });
  const [newPartner, setNewPartner] = useState({ name: "", type: "ngo", authEmail: "", password: "", country: "", contactPerson: { name: "", email: "", phone: "" } });
  const [newEvent, setNewEvent] = useState({ title: "", type: "webinar", date: "", host: "", description: "", link: "" });
  const [newAdminUser, setNewAdminUser] = useState({ name: "", email: "", password: "", role: "manager" });

  async function loadTab(t) {
    setTab(t);
    setLoading(true);
    try {
      if (t === "dashboard" && !stats) {
        const { data } = await getAdminDashboard();
        setStats(data);
      } else if (t === "members") {
        const { data } = await getAdminMembers({ search: memberSearch, status: memberStatusFilter });
        setMembers(data.members); setMemberTotal(data.total);
      } else if (t === "opportunities") {
        const { data } = await getAdminOpportunities();
        setOpportunities(data.opportunities);
      } else if (t === "deployments") {
        const { data } = await getAdminDeployments();
        setDeployments(data.deployments);
      } else if (t === "partners") {
        const { data } = await getAdminPartners();
        setPartners(data.partners);
      } else if (t === "events") {
        const { data } = await getAdminEvents();
        setEvents(data.events);
      } else if (t === "admins" && admin?.role === "super") {
        const { data } = await getAdmins();
        setAdmins(data.admins);
      }
    } catch (err) { toast.error("Failed to load data"); }
    finally { setLoading(false); }
  }

  useEffect(() => { if (admin) loadTab("dashboard"); }, [admin]);

  async function searchMembers() {
    setLoading(true);
    try {
      const { data } = await getAdminMembers({ search: memberSearch, status: memberStatusFilter });
      setMembers(data.members); setMemberTotal(data.total);
    } catch { toast.error("Search failed"); }
    finally { setLoading(false); }
  }

  async function handleUpdateStatus(memberId) {
    if (!statusInput) { toast.error("Select a status"); return; }
    try {
      await updateMemberStatus(memberId, { rosterStatus: statusInput, note: noteInput || undefined });
      toast.success("Status updated");
      setSelectedMember(prev => ({ ...prev, rosterStatus: statusInput }));
      setMembers(prev => prev.map(m => m._id === memberId ? { ...m, rosterStatus: statusInput } : m));
      setNoteInput(""); setStatusInput("");
    } catch (err) { toast.error(err.response?.data?.message || "Update failed"); }
  }

  async function handleCreateOpportunity() {
    if (!newOpp.title || !newOpp.description) { toast.error("Title and description required"); return; }
    try {
      const payload = { ...newOpp, requiredSkills: newOpp.requiredSkills.split(",").map(s => s.trim()).filter(Boolean), requiredLanguages: newOpp.requiredLanguages.split(",").map(s => s.trim()).filter(Boolean) };
      const { data } = await createOpportunity(payload);
      setOpportunities(prev => [data.opportunity, ...prev]);
      setShowOppForm(false);
      setNewOpp({ title: "", description: "", type: "deployment", urgency: "medium", location: { country: "", remote: false }, duration: "", compensationType: "paid", requiredSkills: "", requiredLanguages: "" });
      toast.success("Opportunity posted!");
    } catch (err) { toast.error(err.response?.data?.message || "Failed to create"); }
  }

  async function handleCreatePartner() {
    if (!newPartner.name || !newPartner.authEmail || !newPartner.password) { toast.error("Fill required fields"); return; }
    try {
      const { data } = await createPartner(newPartner);
      setPartners(prev => [data.partner, ...prev]);
      setShowPartnerForm(false);
      toast.success("Partner account created!");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  }

  async function handleCreateEvent() {
    if (!newEvent.title || !newEvent.type || !newEvent.date) { toast.error("Fill required fields"); return; }
    try {
      const { data } = await createEvent(newEvent);
      setEvents(prev => [data.event, ...prev]);
      setShowEventForm(false);
      toast.success("Event created!");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  }

  async function handleCreateAdmin() {
    if (!newAdminUser.name || !newAdminUser.email || !newAdminUser.password) { toast.error("Fill required fields"); return; }
    try {
      await createAdminUser(newAdminUser);
      loadTab("admins");
      setShowAdminForm(false);
      toast.success("Admin created!");
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  }

  async function handleLogout() {
    try { await logoutAdmin(); } catch {}
    setAdmin(null);
  }

  if (!admin) return <AdminLogin onLogin={setAdmin} />;

  const NAV = [
    { key: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { key: "members", icon: Users, label: "Members" },
    { key: "opportunities", icon: FileText, label: "Opportunities" },
    { key: "deployments", icon: Send, label: "Deployments" },
    { key: "partners", icon: Building2, label: "Partners" },
    { key: "events", icon: Calendar, label: "Events" },
    ...(admin.role === "super" ? [{ key: "admins", icon: ShieldCheck, label: "Admins" }] : []),
  ];

  return (
    <div className="min-h-screen bg-surface-subtle flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-border flex flex-col h-screen sticky top-0 shrink-0">
        <div className="px-4 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #001129, #002050)" }}>
              <ShieldCheck size={14} style={{ color: "#009EDB" }} />
            </div>
            <div>
              <p className="text-xs font-bold text-content-primary">Roster Admin</p>
              <p className="text-[10px] text-content-tertiary uppercase tracking-wider">{admin.role}</p>
            </div>
          </div>
          <p className="text-xs text-content-secondary mt-2 truncate">{admin.email}</p>
        </div>
        <nav className="flex-1 p-2 overflow-y-auto">
          {NAV.map(({ key, icon: Icon, label }) => (
            <button key={key} onClick={() => loadTab(key)}
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
      <main className="flex-1 overflow-auto p-8">

        {/* ── Dashboard ── */}
        {tab === "dashboard" && stats && (
          <div className="space-y-6 max-w-5xl">
            <div>
              <h1 className="text-xl font-bold text-content-primary">Roster Dashboard</h1>
              <p className="text-sm text-content-secondary mt-1">Global overview — World Disaster Center Talent Pool</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Members", value: stats.totalMembers, color: "#009EDB", icon: Users },
                { label: "Active Roster", value: stats.activeMembers, color: "#1A7644", icon: CheckCircle },
                { label: "Currently Deployed", value: stats.deployed, color: "#E87722", icon: Send },
                { label: "Pending Review", value: stats.pendingApps, color: "#CC2936", icon: Clock },
                { label: "Partners", value: stats.totalPartners, color: "#418FDE", icon: Building2 },
                { label: "Open Opportunities", value: stats.openOpps, color: "#009EDB", icon: FileText },
                { label: "Deployed This Month", value: stats.deploymentsMonth, color: "#1A7644", icon: TrendingUp },
                { label: "Deployed Today", value: stats.deploymentsToday, color: "#E87722", icon: Globe },
              ].map(({ label, value, color, icon: Icon }) => (
                <div key={label} className="p-4 rounded-2xl bg-white border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} style={{ color }} />
                    <span className="text-xs text-content-secondary font-medium">{label}</span>
                  </div>
                  <p className="text-3xl font-bold" style={{ color }}>{value ?? 0}</p>
                </div>
              ))}
            </div>
            {stats.recentMembers?.length > 0 && (
              <div className="bg-white rounded-2xl border border-border p-5">
                <p className="font-bold text-sm text-content-primary mb-4">Recent Applications</p>
                <div className="space-y-3">
                  {stats.recentMembers.map((m, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                          {m.firstName?.[0]}{m.lastName?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-content-primary">{m.firstName} {m.lastName}</p>
                          <p className="text-xs text-content-secondary">{m.email}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${STATUS_COLORS[m.rosterStatus] || "#009EDB"}20`, color: STATUS_COLORS[m.rosterStatus] || "#009EDB" }}>{m.rosterStatus}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Members ── */}
        {tab === "members" && (
          <div className="space-y-4 max-w-6xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-content-primary">Roster Members ({memberTotal})</h2>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-white flex-1">
                <Search size={14} className="text-content-tertiary" />
                <input value={memberSearch} onChange={e => setMemberSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && searchMembers()} placeholder="Search by name or email..." className="bg-transparent text-sm flex-1 outline-none text-content-primary" />
              </div>
              <select value={memberStatusFilter} onChange={e => setMemberStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-xl text-sm border border-border bg-white text-content-secondary outline-none">
                <option value="">All Statuses</option>
                {MEMBER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={searchMembers} className="px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}>Search</button>
            </div>

            <div className="grid gap-3">
              {members.map(m => (
                <div key={m._id} className="bg-white rounded-2xl border border-border p-4 hover:border-primary/40 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                        {m.firstName?.[0]}{m.lastName?.[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-content-primary">{m.firstName} {m.lastName}</p>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: `${STATUS_COLORS[m.rosterStatus] || "#009EDB"}20`, color: STATUS_COLORS[m.rosterStatus] || "#009EDB" }}>{m.rosterStatus?.replace("_", " ")}</span>
                        </div>
                        <p className="text-xs text-content-secondary">{m.email} · {m.countryOfResidence || "—"}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {m.skills?.slice(0, 3).map((s, i) => <span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: "rgba(0,158,219,0.08)", color: "#009EDB" }}>{s.name}</span>)}
                          {m.skills?.length > 3 && <span className="text-[10px] text-content-tertiary">+{m.skills.length - 3} more</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setSelectedMember(m)} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-primary border border-primary/30 hover:bg-primary/5 transition-colors flex items-center gap-1">
                        <Eye size={12} /> View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Member detail modal */}
            {selectedMember && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-content-primary">{selectedMember.firstName} {selectedMember.lastName}</h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${STATUS_COLORS[selectedMember.rosterStatus] || "#009EDB"}20`, color: STATUS_COLORS[selectedMember.rosterStatus] || "#009EDB" }}>{selectedMember.rosterStatus?.replace("_", " ")}</span>
                    </div>
                    <button onClick={() => setSelectedMember(null)}><X size={20} className="text-content-secondary" /></button>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                    {[["Email", selectedMember.email], ["Phone", selectedMember.phone || "—"], ["Country", selectedMember.countryOfResidence || "—"], ["Nationality", selectedMember.nationality || "—"], ["Deployment", selectedMember.deploymentType || "—"], ["Applied", selectedMember.applicationDate ? new Date(selectedMember.applicationDate).toLocaleDateString() : "—"], ["Profile Score", `${selectedMember.profileCompletionScore || 0}%`]].map(([k, v]) => (
                      <div key={k} className="p-2.5 rounded-xl bg-surface-subtle">
                        <p className="text-[10px] text-content-tertiary uppercase tracking-wider mb-0.5">{k}</p>
                        <p className="font-semibold text-content-primary text-xs">{v}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skills preview */}
                  {selectedMember.skills?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-content-secondary mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMember.skills.map((s, i) => <span key={i} className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(0,158,219,0.08)", color: "#009EDB" }}>{s.name}</span>)}
                      </div>
                    </div>
                  )}

                  {/* Admin notes */}
                  {selectedMember.adminNotes?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-content-secondary mb-2">Admin Notes</p>
                      <div className="space-y-2">
                        {selectedMember.adminNotes.map((n, i) => (
                          <div key={i} className="p-3 rounded-xl bg-surface-subtle border border-border text-xs">
                            <p className="font-semibold text-content-primary mb-0.5">{n.note}</p>
                            <p className="text-content-tertiary">{n.addedBy} · {n.date ? new Date(n.date).toLocaleDateString() : ""}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Update status */}
                  <div className="p-4 rounded-xl border border-border bg-surface-subtle space-y-3">
                    <p className="text-xs font-bold text-content-secondary">Update Status & Add Note</p>
                    <select value={statusInput} onChange={e => setStatusInput(e.target.value)} className={inputCls}>
                      <option value="">— Select new status —</option>
                      {MEMBER_STATUSES.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                    </select>
                    <input value={noteInput} onChange={e => setNoteInput(e.target.value)} className={inputCls} placeholder="Admin note (optional)" />
                    <button onClick={() => handleUpdateStatus(selectedMember._id)} className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}>Update</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Opportunities ── */}
        {tab === "opportunities" && (
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-content-primary">Opportunities ({opportunities.length})</h2>
              <button onClick={() => setShowOppForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}><Plus size={15} /> Post Opportunity</button>
            </div>
            <div className="space-y-3">
              {opportunities.map((opp, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{opp.type}</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full uppercase" style={{ background: opp.urgency === "critical" ? "#FDECEA" : "#FEF3E2", color: opp.urgency === "critical" ? "#CC2936" : "#E87722" }}>{opp.urgency}</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: opp.status === "open" ? "rgba(26,118,68,0.1)" : "#f1f5f9", color: opp.status === "open" ? "#1A7644" : "#64748b" }}>{opp.status}</span>
                      </div>
                      <h3 className="font-bold text-content-primary">{opp.title}</h3>
                      <p className="text-xs text-content-secondary mt-1 line-clamp-1">{opp.description}</p>
                      <p className="text-xs text-content-tertiary mt-1">{opp.applicants?.length || 0} applicants · Posted by {opp.postedBy}</p>
                    </div>
                    <button onClick={() => updateOpportunity(opp._id, { status: opp.status === "open" ? "cancelled" : "open" }).then(() => loadTab("opportunities"))} className="text-xs font-semibold text-content-secondary border border-border px-3 py-1.5 rounded-xl hover:border-red-300 hover:text-red-500 transition-colors">{opp.status === "open" ? "Close" : "Reopen"}</button>
                  </div>
                </div>
              ))}
            </div>

            {showOppForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4">
                  <div className="flex items-center justify-between"><h3 className="text-lg font-bold">New Opportunity</h3><button onClick={() => setShowOppForm(false)}><X size={18} /></button></div>
                  <input value={newOpp.title} onChange={e => setNewOpp(v => ({ ...v, title: e.target.value }))} className={inputCls} placeholder="Title*" />
                  <textarea rows={3} value={newOpp.description} onChange={e => setNewOpp(v => ({ ...v, description: e.target.value }))} className={inputCls} placeholder="Description*" />
                  <div className="grid grid-cols-2 gap-3">
                    <select value={newOpp.type} onChange={e => setNewOpp(v => ({ ...v, type: e.target.value }))} className={inputCls}>{["deployment","volunteer","consultancy","training","surge"].map(t => <option key={t}>{t}</option>)}</select>
                    <select value={newOpp.urgency} onChange={e => setNewOpp(v => ({ ...v, urgency: e.target.value }))} className={inputCls}>{["low","medium","high","critical"].map(t => <option key={t}>{t}</option>)}</select>
                    <input value={newOpp.location?.country || ""} onChange={e => setNewOpp(v => ({ ...v, location: { ...v.location, country: e.target.value } }))} className={inputCls} placeholder="Country" />
                    <input value={newOpp.duration} onChange={e => setNewOpp(v => ({ ...v, duration: e.target.value }))} className={inputCls} placeholder="Duration (e.g. 3 months)" />
                    <input value={newOpp.requiredSkills} onChange={e => setNewOpp(v => ({ ...v, requiredSkills: e.target.value }))} className={inputCls} placeholder="Skills (comma-separated)" />
                    <input value={newOpp.requiredLanguages} onChange={e => setNewOpp(v => ({ ...v, requiredLanguages: e.target.value }))} className={inputCls} placeholder="Languages (comma-separated)" />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setShowOppForm(false)} className="px-4 py-2 rounded-xl text-sm font-semibold border border-border text-content-secondary">Cancel</button>
                    <button onClick={handleCreateOpportunity} className="px-6 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}>Post</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Deployments ── */}
        {tab === "deployments" && (
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-xl font-bold text-content-primary">Deployments ({deployments.length})</h2>
            <div className="space-y-3">
              {deployments.map((d, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-content-primary">{d.memberName}</p>
                      <p className="text-sm text-content-secondary">{d.opportunityTitle}</p>
                      <p className="text-xs text-content-tertiary mt-1">{d.partnerName || "WDC Internal"} · {d.startDate ? new Date(d.startDate).toLocaleDateString() : "—"} → {d.endDate ? new Date(d.endDate).toLocaleDateString() : "Ongoing"}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: d.status === "active" ? "rgba(0,158,219,0.1)" : d.status === "completed" ? "rgba(26,118,68,0.1)" : "#f1f5f9", color: d.status === "active" ? "#009EDB" : d.status === "completed" ? "#1A7644" : "#64748b" }}>{d.status}</span>
                      {d.status === "active" && (
                        <button onClick={() => updateDeployment(d._id, { status: "completed" }).then(() => loadTab("deployments"))} className="text-xs font-semibold text-green-600 border border-green-200 px-2 py-1 rounded-lg">Mark Complete</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Partners ── */}
        {tab === "partners" && (
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-content-primary">Partners ({partners.length})</h2>
              <button onClick={() => setShowPartnerForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}><Plus size={15} /> Add Partner</button>
            </div>
            <div className="space-y-3">
              {partners.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-content-primary">{p.name}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{p.type}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: p.status === "active" ? "rgba(26,118,68,0.1)" : "#FEF3E2", color: p.status === "active" ? "#1A7644" : "#E87722" }}>{p.status}</span>
                      </div>
                      <p className="text-xs text-content-secondary">{p.authEmail} · {p.country || "—"} · Access: <strong>{p.accessLevel}</strong></p>
                    </div>
                    <div className="flex gap-2">
                      {p.status === "pending" && <button onClick={() => updatePartnerAccess(p._id, { status: "active" }).then(() => loadTab("partners"))} className="text-xs font-bold px-3 py-1.5 rounded-xl text-white" style={{ background: "#1A7644" }}>Activate</button>}
                      <select value={p.accessLevel} onChange={e => updatePartnerAccess(p._id, { accessLevel: e.target.value }).then(() => loadTab("partners"))} className="text-xs px-2 py-1.5 rounded-xl border border-border bg-white outline-none">
                        {["browse_only","can_request","full_access"].map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showPartnerForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-3">
                  <div className="flex items-center justify-between"><h3 className="text-lg font-bold">New Partner</h3><button onClick={() => setShowPartnerForm(false)}><X size={18} /></button></div>
                  <div className="grid grid-cols-2 gap-3">
                    <input value={newPartner.name} onChange={e => setNewPartner(v => ({ ...v, name: e.target.value }))} className={inputCls} placeholder="Organization name*" />
                    <select value={newPartner.type} onChange={e => setNewPartner(v => ({ ...v, type: e.target.value }))} className={inputCls}>{["ngo","un_agency","government","private_sector","academic","other"].map(t => <option key={t}>{t}</option>)}</select>
                    <input type="email" value={newPartner.authEmail} onChange={e => setNewPartner(v => ({ ...v, authEmail: e.target.value }))} className={inputCls} placeholder="Login email*" />
                    <input type="password" value={newPartner.password} onChange={e => setNewPartner(v => ({ ...v, password: e.target.value }))} className={inputCls} placeholder="Temp password*" />
                    <input value={newPartner.country} onChange={e => setNewPartner(v => ({ ...v, country: e.target.value }))} className={inputCls} placeholder="Country" />
                    <input value={newPartner.contactPerson?.name || ""} onChange={e => setNewPartner(v => ({ ...v, contactPerson: { ...v.contactPerson, name: e.target.value } }))} className={inputCls} placeholder="Contact person name" />
                    <input type="email" value={newPartner.contactPerson?.email || ""} onChange={e => setNewPartner(v => ({ ...v, contactPerson: { ...v.contactPerson, email: e.target.value } }))} className={inputCls} placeholder="Contact email" />
                    <input value={newPartner.contactPerson?.phone || ""} onChange={e => setNewPartner(v => ({ ...v, contactPerson: { ...v.contactPerson, phone: e.target.value } }))} className={inputCls} placeholder="Contact phone" />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setShowPartnerForm(false)} className="px-4 py-2 rounded-xl text-sm font-semibold border border-border text-content-secondary">Cancel</button>
                    <button onClick={handleCreatePartner} className="px-6 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}>Create</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Events ── */}
        {tab === "events" && (
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-content-primary">Events & Training</h2>
              <button onClick={() => setShowEventForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}><Plus size={15} /> Create Event</button>
            </div>
            <div className="space-y-3">
              {events.map((ev, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{ev.type}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: ev.status === "upcoming" ? "rgba(26,118,68,0.1)" : "#f1f5f9", color: ev.status === "upcoming" ? "#1A7644" : "#64748b" }}>{ev.status}</span>
                    </div>
                    <p className="font-bold text-content-primary">{ev.title}</p>
                    <p className="text-xs text-content-secondary mt-0.5">{ev.host ? `Host: ${ev.host} · ` : ""}{new Date(ev.date).toLocaleDateString()} · {ev.registeredMembers?.length || 0} registered</p>
                  </div>
                  <button onClick={() => deleteEvent(ev._id).then(() => loadTab("events"))} className="p-2 rounded-xl text-content-tertiary hover:text-red-500 hover:bg-red-50 transition-colors"><X size={16} /></button>
                </div>
              ))}
            </div>

            {showEventForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-3">
                  <div className="flex items-center justify-between"><h3 className="text-lg font-bold">New Event</h3><button onClick={() => setShowEventForm(false)}><X size={18} /></button></div>
                  <input value={newEvent.title} onChange={e => setNewEvent(v => ({ ...v, title: e.target.value }))} className={inputCls} placeholder="Title*" />
                  <div className="grid grid-cols-2 gap-3">
                    <select value={newEvent.type} onChange={e => setNewEvent(v => ({ ...v, type: e.target.value }))} className={inputCls}>{["webinar","training","mentorship","conference","workshop"].map(t => <option key={t}>{t}</option>)}</select>
                    <input type="datetime-local" value={newEvent.date} onChange={e => setNewEvent(v => ({ ...v, date: e.target.value }))} className={inputCls} />
                    <input value={newEvent.host} onChange={e => setNewEvent(v => ({ ...v, host: e.target.value }))} className={inputCls} placeholder="Host name" />
                    <input value={newEvent.link} onChange={e => setNewEvent(v => ({ ...v, link: e.target.value }))} className={inputCls} placeholder="Meeting link" />
                  </div>
                  <textarea rows={2} value={newEvent.description} onChange={e => setNewEvent(v => ({ ...v, description: e.target.value }))} className={inputCls} placeholder="Description" />
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setShowEventForm(false)} className="px-4 py-2 rounded-xl text-sm font-semibold border border-border text-content-secondary">Cancel</button>
                    <button onClick={handleCreateEvent} className="px-6 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}>Create</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Admins (super only) ── */}
        {tab === "admins" && admin?.role === "super" && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-content-primary">Admin Users</h2>
              <button onClick={() => setShowAdminForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}><Plus size={15} /> Add Admin</button>
            </div>
            <div className="space-y-3">
              {admins.map((a, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-content-primary">{a.name}</p>
                    <p className="text-xs text-content-secondary">{a.email} · Role: <strong>{a.role}</strong></p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: a.isActive ? "rgba(26,118,68,0.1)" : "#FDECEA", color: a.isActive ? "#1A7644" : "#CC2936" }}>{a.isActive ? "Active" : "Inactive"}</span>
                </div>
              ))}
            </div>

            {showAdminForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-3">
                  <div className="flex items-center justify-between"><h3 className="text-lg font-bold">New Admin</h3><button onClick={() => setShowAdminForm(false)}><X size={18} /></button></div>
                  <input value={newAdminUser.name} onChange={e => setNewAdminUser(v => ({ ...v, name: e.target.value }))} className={inputCls} placeholder="Full name*" />
                  <input type="email" value={newAdminUser.email} onChange={e => setNewAdminUser(v => ({ ...v, email: e.target.value }))} className={inputCls} placeholder="Email*" />
                  <input type="password" value={newAdminUser.password} onChange={e => setNewAdminUser(v => ({ ...v, password: e.target.value }))} className={inputCls} placeholder="Password*" />
                  <select value={newAdminUser.role} onChange={e => setNewAdminUser(v => ({ ...v, role: e.target.value }))} className={inputCls}>{["manager","recruiter","analyst"].map(r => <option key={r}>{r}</option>)}</select>
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setShowAdminForm(false)} className="px-4 py-2 rounded-xl text-sm font-semibold border border-border text-content-secondary">Cancel</button>
                    <button onClick={handleCreateAdmin} className="px-6 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}>Create</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
