import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  LayoutDashboard, User, Award, Briefcase, Calendar, Star,
  LogOut, CheckCircle, Clock, Globe, MapPin, TrendingUp,
  Shield, BookOpen, Send, Bell, ChevronRight, Edit2, AlertCircle,
} from "lucide-react";
import { getMyRosterProfile, getRosterOpportunities as getOpportunities, getMyDeployments, getMyEvents, logoutRosterMember } from "../../../api/roster";

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

export default function RosterDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [pRes, oRes, dRes, eRes] = await Promise.allSettled([
          getMyRosterProfile(), getOpportunities(), getMyDeployments(), getMyEvents(),
        ]);
        if (pRes.status === "fulfilled") setProfile(pRes.value.data);
        else { navigate("/roster/login"); return; }
        if (oRes.status === "fulfilled") setOpportunities(oRes.value.data.opportunities || []);
        if (dRes.status === "fulfilled") setDeployments(dRes.value.data.deployments || []);
        if (eRes.status === "fulfilled") setEvents(eRes.value.data.events || []);
      } catch { navigate("/roster/login"); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  async function handleLogout() {
    try { await logoutRosterMember(); } catch {}
    navigate("/roster/login");
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle">
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
    <div className="min-h-screen bg-surface-subtle flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-border flex flex-col h-screen sticky top-0 shrink-0">
        <div className="px-4 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
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
            <button key={key} onClick={() => setTab(key)}
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

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">

        {/* ── Overview ── */}
        {tab === "overview" && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h1 className="text-xl font-bold text-content-primary">Welcome back, {profile.firstName}</h1>
              <p className="text-sm text-content-secondary mt-1">Here's your roster status and activity overview.</p>
            </div>

            {/* Status banner */}
            <div className="p-5 rounded-2xl" style={{ background: status.bg, border: `1px solid ${status.text}30` }}>
              <div className="flex items-center gap-3">
                <Shield size={20} style={{ color: status.text }} />
                <div>
                  <p className="font-bold text-sm" style={{ color: status.text }}>Roster Status: {status.label}</p>
                  {profile.rosterStatus === "applied" && <p className="text-xs mt-0.5" style={{ color: status.text, opacity: 0.8 }}>Your application is being reviewed. You'll hear from WDC within 5 business days.</p>}
                  {profile.rosterStatus === "active" && <p className="text-xs mt-0.5" style={{ color: status.text, opacity: 0.8 }}>You're live on the roster! Browse opportunities and apply to deployments.</p>}
                  {profile.rosterStatus === "deployed" && <p className="text-xs mt-0.5" style={{ color: status.text, opacity: 0.8 }}>You have an active deployment. Keep your project log updated.</p>}
                </div>
              </div>
            </div>

            {/* Profile completion */}
            <div className="p-5 rounded-2xl bg-white border border-border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-content-primary text-sm">Profile Completion</p>
                  <p className="text-xs text-content-secondary mt-0.5">Complete your profile to increase your deployment chances</p>
                </div>
                <span className="text-2xl font-bold" style={{ color: "#009EDB" }}>{completionScore}%</span>
              </div>
              <div className="w-full h-2 bg-surface-subtle rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${completionScore}%`, background: "linear-gradient(90deg, #009EDB, #4DC0E8)" }} />
              </div>
              {completionScore < 100 && (
                <button onClick={() => setTab("profile")} className="mt-3 text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                  Complete your profile <ChevronRight size={12} />
                </button>
              )}
            </div>

            {/* Quick stats */}
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

            {/* Upcoming events */}
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
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-content-primary">My Profile</h2>
              <Link to="/roster/apply" className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#009EDB" }}>
                <Edit2 size={14} /> Edit Profile
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
              {[
                ["Name", `${profile.firstName} ${profile.lastName}`],
                ["Email", profile.email],
                ["Phone", profile.phone || "—"],
                ["Nationality", profile.nationality || "—"],
                ["Location", profile.city && profile.countryOfResidence ? `${profile.city}, ${profile.countryOfResidence}` : "—"],
                ["Deployment Type", profile.deploymentType || "—"],
                ["Daily Rate", profile.dailyRate ? `${profile.dailyRate} ${profile.currency}/day` : "—"],
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
          </div>
        )}

        {/* ── Opportunities Tab ── */}
        {tab === "opportunities" && (
          <div className="max-w-4xl space-y-4">
            <h2 className="text-xl font-bold text-content-primary">Open Opportunities</h2>
            {opportunities.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-white border border-border">
                <Briefcase size={32} className="mx-auto mb-3 text-content-tertiary" />
                <p className="text-content-secondary text-sm">No open opportunities at the moment. Check back soon.</p>
              </div>
            ) : opportunities.map((opp, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-border hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{opp.type}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full uppercase" style={{ background: opp.urgency === "critical" ? "#FDECEA" : opp.urgency === "high" ? "#FEF3E2" : "#E8F5FC", color: opp.urgency === "critical" ? "#CC2936" : opp.urgency === "high" ? "#E87722" : "#009EDB" }}>{opp.urgency}</span>
                    </div>
                    <h3 className="font-bold text-content-primary mb-1">{opp.title}</h3>
                    <p className="text-xs text-content-secondary line-clamp-2 mb-3">{opp.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-content-secondary">
                      {opp.location?.country && <span className="flex items-center gap-1"><MapPin size={11} />{opp.location.country}</span>}
                      {opp.duration && <span className="flex items-center gap-1"><Clock size={11} />{opp.duration}</span>}
                    </div>
                  </div>
                  <button className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#009EDB" }}>Apply</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Deployments Tab ── */}
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
                    <p className="font-bold text-content-primary">{d.partnerId ? `${d.partnerName}` : "WDC Internal"}</p>
                    <p className="text-xs text-content-secondary mt-0.5">{d.from ? new Date(d.from).toLocaleDateString() : "—"} → {d.to ? new Date(d.to).toLocaleDateString() : "Ongoing"}</p>
                    {d.rating && <div className="flex items-center gap-1 mt-1">{[...Array(5)].map((_, j) => <Star key={j} size={12} style={{ color: j < d.rating ? "#F59E0B" : "#e2e8f0", fill: j < d.rating ? "#F59E0B" : "none" }} />)}</div>}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full capitalize" style={{ background: d.status === "active" ? "rgba(0,158,219,0.1)" : d.status === "completed" ? "rgba(26,118,68,0.1)" : "#FDECEA", color: d.status === "active" ? "#009EDB" : d.status === "completed" ? "#1A7644" : "#CC2936" }}>{d.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Events Tab ── */}
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
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{ev.type}</span>
                    </div>
                    <h3 className="font-bold text-content-primary text-sm">{ev.title}</h3>
                    {ev.host && <p className="text-xs text-content-secondary mt-0.5">Host: {ev.host}</p>}
                    {ev.description && <p className="text-xs text-content-secondary mt-1 line-clamp-2">{ev.description}</p>}
                  </div>
                  {ev.link && <a href={ev.link} target="_blank" rel="noopener noreferrer" className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: "#009EDB" }}>Register</a>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Certifications Tab ── */}
        {tab === "certifications" && (
          <div className="max-w-3xl space-y-4">
            <h2 className="text-xl font-bold text-content-primary">My Certifications</h2>
            {(!profile.certifications || profile.certifications.length === 0) ? (
              <div className="text-center py-16 rounded-2xl bg-white border border-border">
                <Award size={32} className="mx-auto mb-3 text-content-tertiary" />
                <p className="text-sm text-content-secondary mb-3">No certifications added yet.</p>
                <button onClick={() => navigate("/roster/apply")} className="text-sm font-bold text-primary hover:underline">Add certifications to your profile →</button>
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

        {/* ── Recognitions Tab ── */}
        {tab === "recognitions" && (
          <div className="max-w-3xl space-y-4">
            <h2 className="text-xl font-bold text-content-primary">Recognitions & Badges</h2>
            {(!profile.recognitions || profile.recognitions.length === 0) ? (
              <div className="text-center py-16 rounded-2xl bg-white border border-border">
                <Star size={32} className="mx-auto mb-3 text-content-tertiary" />
                <p className="text-sm text-content-secondary">No recognitions yet. Complete deployments and projects to earn badges.</p>
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
  );
}
