import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Building2, LogOut, Search, Filter, Eye, EyeOff, Globe, MapPin,
  Star, Send, Briefcase, ChevronDown, X, CheckCircle, Clock, AlertCircle,
  Users, FileText, Shield, Layers, BarChart2, Plus
} from "lucide-react";
import {
  loginPartner, logoutPartner, getPartnerProfile,
  browseRoster, requestDeployment, getPartnerDeployments
} from "../../../api/roster";

// ─── Partner Login Gate ────────────────────────────────────────────────────────
function PartnerLoginGate({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) { toast.error("Enter email and password"); return; }
    setLoading(true);
    try {
      const res = await loginPartner({ email, password });
      toast.success(`Welcome, ${res.data.partner?.orgName || "Partner"}!`);
      onLogin(res.data.partner);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  }

  const inp = "w-full px-4 py-3 rounded-xl text-sm border border-border outline-none focus:border-primary transition-colors bg-white";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface-subtle px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, #001129, #002050)" }}>
            <Building2 size={24} style={{ color: "#009EDB" }} />
          </div>
          <h1 className="text-2xl font-bold text-content-primary">Partner Portal</h1>
          <p className="text-sm text-content-secondary mt-2">Access WDC's certified talent pool</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">Organization Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className={inp} placeholder="org@example.org" autoComplete="email" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`${inp} pr-10`} placeholder="••••••••" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-content-tertiary">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-60 transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
              {loading ? "Signing in..." : "Access Partner Portal"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center space-y-2">
            <p className="text-xs text-content-tertiary">Don't have partner access yet?</p>
            <a href="mailto:office@worlddisastercenter.org"
              className="text-xs font-semibold text-primary hover:underline">
              Contact WDC to become a partner →
            </a>
          </div>
          <div className="mt-3 text-center">
            <Link to="/roster/login" className="text-xs text-content-secondary hover:text-primary transition-colors">
              Are you a roster member? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Talent Card ───────────────────────────────────────────────────────────────
function TalentCard({ member, accessLevel, onRequestDeploy }) {
  const [expanded, setExpanded] = useState(false);
  const canContact = accessLevel === "can_request" || accessLevel === "full_access";

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-lg"
            style={{ background: "linear-gradient(135deg, #001129, #009EDB)" }}>
            {member.firstName?.[0]}{member.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-content-primary text-sm">
                {member.firstName} {member.lastName}
              </h3>
              {member.availabilityStatus === "available" && (
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "#e6f9f0", color: "#0d7a4e" }}>Available</span>
              )}
              {member.availabilityStatus === "deployed" && (
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: "#fff3e0", color: "#b45309" }}>Deployed</span>
              )}
            </div>
            <p className="text-xs text-content-secondary mt-0.5">{member.currentTitle || "Disaster Professional"}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-content-tertiary">
              <MapPin size={11} />
              <span>{member.country || "International"}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs font-semibold text-content-secondary">Profile Score</div>
            <div className="text-lg font-bold" style={{ color: "#009EDB" }}>{member.profileCompletionScore || 0}%</div>
          </div>
        </div>

        {member.skills?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {member.skills.slice(0, 4).map((s, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-surface-subtle text-content-secondary font-medium">{s}</span>
            ))}
            {member.skills.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-surface-subtle text-content-tertiary">+{member.skills.length - 4}</span>
            )}
          </div>
        )}

        {member.languages?.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-content-tertiary">
            <Globe size={11} />
            <span>{member.languages.map(l => l.language || l).join(", ")}</span>
          </div>
        )}

        {expanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            {member.bio && (
              <p className="text-xs text-content-secondary leading-relaxed">{member.bio}</p>
            )}
            {member.sectors?.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-content-secondary mb-1.5">Sectors</div>
                <div className="flex flex-wrap gap-1.5">
                  {member.sectors.map((s, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-md font-medium"
                      style={{ background: "#e8f4fd", color: "#0072BC" }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {member.deploymentType && (
              <div className="text-xs text-content-secondary">
                <span className="font-semibold">Deployment: </span>{member.deploymentType}
              </div>
            )}
            {member.dailyRate && canContact && (
              <div className="text-xs text-content-secondary">
                <span className="font-semibold">Daily Rate: </span>${member.dailyRate} USD
              </div>
            )}
            {member.certifications?.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-content-secondary mb-1.5">Certifications</div>
                <div className="space-y-1">
                  {member.certifications.slice(0, 3).map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-content-secondary">
                      <CheckCircle size={11} style={{ color: "#009EDB" }} />
                      <span>{c.name || c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {canContact && member.email && (
              <div className="p-3 rounded-xl" style={{ background: "#e8f4fd" }}>
                <div className="text-xs font-semibold mb-0.5" style={{ color: "#0072BC" }}>Contact Info</div>
                <div className="text-xs text-content-secondary">{member.email}</div>
                {member.phone && <div className="text-xs text-content-secondary">{member.phone}</div>}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <button onClick={() => setExpanded(v => !v)}
            className="flex-1 py-2 rounded-xl text-xs font-semibold border border-border text-content-secondary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5">
            <Eye size={13} />
            {expanded ? "Show Less" : "View Profile"}
          </button>
          {accessLevel !== "browse_only" && member.availabilityStatus !== "deployed" && (
            <button onClick={() => onRequestDeploy(member)}
              className="flex-1 py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
              <Send size={13} />
              Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Request Deployment Modal ──────────────────────────────────────────────────
function RequestModal({ member, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: `Deployment Request: ${member?.firstName} ${member?.lastName}`,
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    urgency: "medium",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.description || !form.location || !form.startDate) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ ...form, memberId: member._id });
      toast.success("Deployment request submitted!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed");
    } finally { setLoading(false); }
  }

  const inp = "w-full px-3 py-2.5 rounded-xl text-sm border border-border outline-none focus:border-primary transition-colors bg-white";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #001129, #002050)" }}>
          <div>
            <h2 className="font-bold text-white">Request Deployment</h2>
            <p className="text-xs mt-0.5" style={{ color: "#009EDB" }}>
              {member?.firstName} {member?.lastName}
            </p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">Assignment Title *</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className={inp} placeholder="e.g. Emergency Response Coordinator" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-content-secondary mb-1.5">Description & Requirements *</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className={`${inp} resize-none`} rows={4}
              placeholder="Describe the role, responsibilities, and specific requirements..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">Location *</label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className={inp} placeholder="Country / Region" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">Urgency</label>
              <select value={form.urgency} onChange={e => setForm(f => ({ ...f, urgency: e.target.value }))}
                className={inp}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">Start Date *</label>
              <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                className={inp} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-content-secondary mb-1.5">End Date</label>
              <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                className={inp} />
            </div>
          </div>
          <div className="p-3 rounded-xl text-xs text-content-secondary" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
            <strong>Note:</strong> WDC will review your request and confirm the deployment within 48 hours.
            Your first deployment is covered under the 1-month free partnership agreement.
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border text-content-secondary hover:border-content-secondary transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60 hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Partner Portal ───────────────────────────────────────────────────────
export default function RosterPartnerPage() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("browse");

  // Browse state
  const [roster, setRoster] = useState([]);
  const [rosterLoading, setRosterLoading] = useState(false);
  const [filters, setFilters] = useState({ skill: "", language: "", sector: "", country: "", deploymentType: "", page: 1 });
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Deployments state
  const [deployments, setDeployments] = useState([]);
  const [deploymentsLoading, setDeploymentsLoading] = useState(false);

  // Request modal
  const [requestTarget, setRequestTarget] = useState(null);

  // Filter panel
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getPartnerProfile()
      .then(res => setPartner(res.data.partner))
      .catch(() => setPartner(null))
      .finally(() => setLoadingAuth(false));
  }, []);

  useEffect(() => {
    if (partner && activeTab === "browse") fetchRoster();
  }, [partner, activeTab, filters.page]);

  useEffect(() => {
    if (partner && activeTab === "deployments") fetchDeployments();
  }, [partner, activeTab]);

  async function fetchRoster() {
    setRosterLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ""));
      const res = await browseRoster(params);
      setRoster(res.data.members || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalCount(res.data.total || 0);
    } catch (err) {
      toast.error("Failed to load roster");
    } finally { setRosterLoading(false); }
  }

  async function fetchDeployments() {
    setDeploymentsLoading(true);
    try {
      const res = await getPartnerDeployments();
      setDeployments(res.data.deployments || []);
    } catch { } finally { setDeploymentsLoading(false); }
  }

  async function handleRequestDeployment(data) {
    await requestDeployment(data);
    fetchDeployments();
  }

  async function handleLogout() {
    await logoutPartner().catch(() => {});
    setPartner(null);
    toast.success("Logged out");
  }

  function applyFilters(e) {
    e.preventDefault();
    setFilters(f => ({ ...f, page: 1 }));
    fetchRoster();
  }

  function resetFilters() {
    setFilters({ skill: "", language: "", sector: "", country: "", deploymentType: "", page: 1 });
  }

  if (loadingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!partner) return <PartnerLoginGate onLogin={setPartner} />;

  const statusBadge = {
    active: { label: "Active Partner", bg: "#e6f9f0", color: "#0d7a4e" },
    pending: { label: "Pending Approval", bg: "#fff3e0", color: "#b45309" },
    suspended: { label: "Suspended", bg: "#fee2e2", color: "#b91c1c" },
  };
  const badge = statusBadge[partner.status] || statusBadge.pending;

  const accessDescriptions = {
    browse_only: "You can view talent profiles but contact info is hidden. Upgrade to request deployments.",
    can_request: "You can browse profiles and submit deployment requests.",
    full_access: "Full access: browse profiles, contact directly, and request deployments.",
  };

  const navItems = [
    { id: "browse", icon: <Users size={16} />, label: "Browse Talent" },
    { id: "deployments", icon: <Briefcase size={16} />, label: "My Deployments" },
    { id: "profile", icon: <Building2 size={16} />, label: "Organization" },
  ];

  const sectors = [
    "Emergency Response", "Food Security", "WASH", "Health",
    "Protection", "Shelter", "Education", "Logistics",
    "Information Management", "Finance", "Communications", "Coordination"
  ];

  const inp = "w-full px-3 py-2 rounded-xl text-sm border border-border outline-none focus:border-primary transition-colors bg-white";

  return (
    <>
    <Helmet>
      <title>Partner Portal | WDC Expert Roster</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="flex min-h-[calc(100vh-7rem)]" style={{ background: "#f8fafc" }}>
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-border flex flex-col shadow-sm sticky top-[6.5rem] lg:top-[7rem] h-[calc(100vh-6.5rem)] lg:h-[calc(100vh-7rem)]">
        <div className="p-5 border-b border-border" style={{ background: "linear-gradient(135deg, #001129, #002050)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(0,158,219,0.2)" }}>
              <Building2 size={18} style={{ color: "#009EDB" }} />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-white text-sm truncate">{partner.orgName}</div>
              <div className="text-xs truncate" style={{ color: "#009EDB" }}>{partner.orgType}</div>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: badge.bg, color: badge.color }}>
            {badge.label}
          </span>
        </div>

        <div className="p-3 border-b border-border">
          <div className="p-2.5 rounded-xl text-xs" style={{ background: "#e8f4fd" }}>
            <div className="font-semibold mb-0.5" style={{ color: "#0072BC" }}>Access Level</div>
            <div className="text-content-secondary capitalize">{partner.accessLevel?.replace(/_/g, " ")}</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "text-white"
                  : "text-content-secondary hover:bg-surface-subtle"
              }`}
              style={activeTab === item.id ? { background: "linear-gradient(135deg, #009EDB, #0072BC)" } : {}}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <Link to="/roster" className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-content-secondary hover:bg-surface-subtle transition-colors">
            <Globe size={14} />
            WDC Roster Home
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Browse Talent Tab */}
        {activeTab === "browse" && (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-content-primary">Browse Certified Talent</h1>
              <p className="text-sm text-content-secondary mt-1">
                {totalCount > 0 ? `${totalCount} verified experts available` : "Find your next deployment expert"}
              </p>
            </div>

            {/* Access level notice */}
            {partner.accessLevel === "browse_only" && (
              <div className="mb-5 p-4 rounded-2xl flex items-start gap-3"
                style={{ background: "#fff3e0", border: "1px solid #fcd34d" }}>
                <AlertCircle size={18} style={{ color: "#b45309", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#92400e" }}>Browse Only Access</div>
                  <div className="text-xs mt-0.5 text-content-secondary">{accessDescriptions.browse_only}</div>
                  <a href="mailto:office@worlddisastercenter.org"
                    className="text-xs font-semibold mt-1 inline-block" style={{ color: "#0072BC" }}>
                    Contact WDC to upgrade →
                  </a>
                </div>
              </div>
            )}

            {/* Search & Filter Bar */}
            <div className="bg-white rounded-2xl border border-border p-4 mb-5">
              <form onSubmit={applyFilters}>
                <div className="flex gap-3 mb-3">
                  <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-content-tertiary" />
                    <input
                      placeholder="Search by skill (e.g. Logistics, WASH)..."
                      value={filters.skill}
                      onChange={e => setFilters(f => ({ ...f, skill: e.target.value }))}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-border outline-none focus:border-primary transition-colors bg-surface-subtle"
                    />
                  </div>
                  <button type="button" onClick={() => setShowFilters(v => !v)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border hover:border-primary transition-colors"
                    style={showFilters ? { background: "#e8f4fd", borderColor: "#009EDB", color: "#0072BC" } : {}}>
                    <Filter size={14} />
                    Filters
                    <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
                  </button>
                  <button type="submit"
                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                    style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                    Search
                  </button>
                </div>

                {showFilters && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-border">
                    <div>
                      <label className="block text-xs font-semibold text-content-secondary mb-1">Language</label>
                      <input value={filters.language} onChange={e => setFilters(f => ({ ...f, language: e.target.value }))}
                        className={inp} placeholder="e.g. French, Arabic" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-content-secondary mb-1">Sector</label>
                      <select value={filters.sector} onChange={e => setFilters(f => ({ ...f, sector: e.target.value }))}
                        className={inp}>
                        <option value="">All Sectors</option>
                        {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-content-secondary mb-1">Country</label>
                      <input value={filters.country} onChange={e => setFilters(f => ({ ...f, country: e.target.value }))}
                        className={inp} placeholder="e.g. Kenya, France" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-content-secondary mb-1">Deployment Type</label>
                      <select value={filters.deploymentType} onChange={e => setFilters(f => ({ ...f, deploymentType: e.target.value }))}
                        className={inp}>
                        <option value="">All Types</option>
                        <option value="field">Field</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="any">Any</option>
                      </select>
                    </div>
                    <div className="col-span-full flex justify-end">
                      <button type="button" onClick={resetFilters}
                        className="text-xs font-semibold text-content-secondary hover:text-content-primary transition-colors flex items-center gap-1">
                        <X size={12} /> Reset Filters
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Roster Grid */}
            {rosterLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : roster.length === 0 ? (
              <div className="text-center py-20 text-content-secondary">
                <Users size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No experts found</p>
                <p className="text-sm mt-1">Try adjusting your search filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roster.map(member => (
                    <TalentCard
                      key={member._id}
                      member={member}
                      accessLevel={partner.accessLevel}
                      onRequestDeploy={setRequestTarget}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-8">
                    <button disabled={filters.page <= 1}
                      onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}
                      className="px-4 py-2 rounded-xl text-sm font-semibold border border-border disabled:opacity-40 hover:border-primary transition-colors">
                      Previous
                    </button>
                    <span className="text-sm text-content-secondary">
                      Page {filters.page} of {totalPages}
                    </span>
                    <button disabled={filters.page >= totalPages}
                      onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
                      className="px-4 py-2 rounded-xl text-sm font-semibold border border-border disabled:opacity-40 hover:border-primary transition-colors">
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Deployments Tab */}
        {activeTab === "deployments" && (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-content-primary">My Deployments</h1>
              <p className="text-sm text-content-secondary mt-1">Track all active and past expert deployments</p>
            </div>

            {partner.freeMonthUsed === false && (
              <div className="mb-5 p-4 rounded-2xl flex items-start gap-3"
                style={{ background: "linear-gradient(135deg, #001129, #002050)" }}>
                <Star size={18} style={{ color: "#009EDB", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div className="text-sm font-bold text-white">1 Month Free Deployment Available</div>
                  <div className="text-xs mt-0.5" style={{ color: "#93c5fd" }}>
                    Your organization hasn't used the complimentary first-month deployment yet. Request an expert today.
                  </div>
                </div>
              </div>
            )}

            {deploymentsLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : deployments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-12 text-center">
                <Briefcase size={40} className="mx-auto mb-3 text-content-tertiary opacity-40" />
                <p className="font-semibold text-content-secondary">No deployments yet</p>
                <p className="text-sm text-content-tertiary mt-1">Browse the talent pool and submit your first deployment request</p>
                <button onClick={() => setActiveTab("browse")}
                  className="mt-4 px-5 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                  Browse Talent
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {deployments.map(dep => {
                  const statusMap = {
                    requested: { label: "Requested", bg: "#fff3e0", color: "#b45309" },
                    active: { label: "Active", bg: "#e6f9f0", color: "#0d7a4e" },
                    completed: { label: "Completed", bg: "#f0f9ff", color: "#0072BC" },
                    cancelled: { label: "Cancelled", bg: "#fee2e2", color: "#b91c1c" },
                  };
                  const s = statusMap[dep.status] || statusMap.requested;
                  return (
                    <div key={dep._id} className="bg-white rounded-2xl border border-border p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-content-primary text-sm">{dep.opportunityTitle || dep.title}</h3>
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: s.bg, color: s.color }}>
                              {s.label}
                            </span>
                          </div>
                          <div className="text-sm text-content-secondary mt-1">
                            Expert: <span className="font-semibold">{dep.memberName}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-content-tertiary">
                            {dep.startDate && (
                              <span className="flex items-center gap-1">
                                <Clock size={11} />
                                {new Date(dep.startDate).toLocaleDateString()} — {dep.endDate ? new Date(dep.endDate).toLocaleDateString() : "Ongoing"}
                              </span>
                            )}
                            {dep.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={11} />
                                {dep.location}
                              </span>
                            )}
                          </div>
                        </div>
                        {dep.status === "completed" && dep.performanceRating && (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < dep.performanceRating ? "#f59e0b" : "none"}
                                style={{ color: i < dep.performanceRating ? "#f59e0b" : "#d1d5db" }} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Organization Profile Tab */}
        {activeTab === "profile" && (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-content-primary">Organization Profile</h1>
              <p className="text-sm text-content-secondary mt-1">Your partner account details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="font-bold text-content-primary mb-4 flex items-center gap-2">
                  <Building2 size={16} style={{ color: "#009EDB" }} />
                  Organization Details
                </h2>
                <div className="space-y-3 text-sm">
                  {[
                    ["Organization Name", partner.orgName],
                    ["Type", partner.orgType],
                    ["Country", partner.country],
                    ["Contact Email", partner.authEmail],
                    ["Website", partner.website],
                    ["Focus Areas", partner.focusAreas?.join(", ")],
                  ].map(([label, val]) => val && (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-content-secondary font-medium flex-shrink-0">{label}</span>
                      <span className="text-content-primary text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="font-bold text-content-primary mb-4 flex items-center gap-2">
                  <Shield size={16} style={{ color: "#009EDB" }} />
                  Partnership Status
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#f8fafc" }}>
                    <span className="text-sm text-content-secondary font-medium">Account Status</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: badge.bg, color: badge.color }}>{badge.label}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#f8fafc" }}>
                    <span className="text-sm text-content-secondary font-medium">Access Level</span>
                    <span className="text-sm font-semibold text-content-primary capitalize">
                      {partner.accessLevel?.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#f8fafc" }}>
                    <span className="text-sm text-content-secondary font-medium">Free Month</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${partner.freeMonthUsed ? "bg-gray-100 text-gray-500" : "text-green-700"}`}
                      style={!partner.freeMonthUsed ? { background: "#e6f9f0" } : {}}>
                      {partner.freeMonthUsed ? "Used" : "Available"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl text-xs text-content-secondary" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
                    {accessDescriptions[partner.accessLevel] || ""}
                  </div>
                  <a href="mailto:office@worlddisastercenter.org"
                    className="block text-center py-2.5 rounded-xl text-sm font-semibold border border-primary transition-colors hover:bg-primary hover:text-white"
                    style={{ color: "#009EDB" }}>
                    Contact WDC Support
                  </a>
                </div>
              </div>

              {partner.docsToSign?.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-6 md:col-span-2">
                  <h2 className="font-bold text-content-primary mb-4 flex items-center gap-2">
                    <FileText size={16} style={{ color: "#009EDB" }} />
                    Documents to Sign
                  </h2>
                  <div className="space-y-3">
                    {partner.docsToSign.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border">
                        <div>
                          <div className="text-sm font-semibold text-content-primary">{doc.name}</div>
                          <div className="text-xs text-content-tertiary mt-0.5">{doc.description}</div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          doc.signed ? "" : "bg-amber-50 text-amber-700"
                        }`} style={doc.signed ? { background: "#e6f9f0", color: "#0d7a4e" } : {}}>
                          {doc.signed ? "Signed" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-content-tertiary mt-3">
                    Contact <a href="mailto:office@worlddisastercenter.org" className="text-primary">office@worlddisastercenter.org</a> to complete document signing.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Request Deployment Modal */}
      {requestTarget && (
        <RequestModal
          member={requestTarget}
          onClose={() => setRequestTarget(null)}
          onSubmit={handleRequestDeployment}
        />
      )}
    </div>
    </>
  );
}
