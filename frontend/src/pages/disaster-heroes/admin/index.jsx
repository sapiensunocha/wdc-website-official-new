import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { adminLoginForHeroes, adminGetHeroes, adminUpdateHeroStatus, logoutDisasterHero } from "../../../api/disasterHeroes";
import {
  Shield, CheckCircle2, X, Clock, Users, Globe, Search,
  ChevronDown, Mail, MapPin, Briefcase, Eye, RefreshCw,
  LogOut, AlertCircle, Filter,
} from "lucide-react";

const T = {
  bg:      "#F5F5F7",
  surface: "#FFFFFF",
  border:  "rgba(60,60,67,.22)",
  fg:      "#1D1D1F",
  muted:   "rgba(29,29,31,.60)",
  blue:    "#009EDB",
  shadow:  "0 2px 8px rgba(0,0,0,.08), 0 0 0 0.5px rgba(0,0,0,.05)",
  shadowMd:"0 4px 16px rgba(0,0,0,.10), 0 0 0 0.5px rgba(0,0,0,.05)",
};

const STATUS_COLORS = {
  pending:  { bg: "rgba(245,158,11,.10)",  color: "#B45309" },
  approved: { bg: "rgba(22,163,74,.10)",   color: "#15803D" },
  rejected: { bg: "rgba(239,68,68,.10)",   color: "#B91C1C" },
};

export default function DisasterHeroesAdmin() {
  const [authed, setAuthed]           = useState(false);
  const [adminEmail, setAdminEmail]   = useState("");
  const [adminPw, setAdminPw]         = useState("");
  const [loginErr, setLoginErr]       = useState("");
  const [loggingIn, setLoggingIn]     = useState(false);

  const [heroes, setHeroes]           = useState([]);
  const [loading, setLoading]         = useState(false);
  const [filter, setFilter]           = useState("pending");
  const [search, setSearch]           = useState("");
  const [selected, setSelected]       = useState(null);
  const [acting, setActing]           = useState(false);
  const [actionErr, setActionErr]     = useState("");

  async function login(e) {
    e.preventDefault();
    setLoginErr("");
    setLoggingIn(true);
    try {
      await adminLoginForHeroes(adminEmail, adminPw);
      setAuthed(true);
    } catch (err) {
      setLoginErr(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoggingIn(false);
    }
  }

  async function fetchHeroes() {
    setLoading(true);
    try {
      const res = await adminGetHeroes({ status: "all", limit: 200 });
      setHeroes(res.data.heroes || []);
    } catch { setHeroes([]); }
    finally { setLoading(false); }
  }

  useEffect(() => { if (authed) fetchHeroes(); }, [authed]);

  async function updateStatus(id, status) {
    setActing(true);
    setActionErr("");
    try {
      await adminUpdateHeroStatus(id, status);
      await fetchHeroes();
      setSelected(s => s ? { ...s, status } : null);
    } catch (err) {
      setActionErr(err.response?.data?.message || "Action failed");
    } finally {
      setActing(false);
    }
  }

  const filtered = heroes.filter(h =>
    (filter === "all" || h.status === filter) &&
    (search === "" ||
      h.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      h.email?.toLowerCase().includes(search.toLowerCase()) ||
      h.country?.toLowerCase().includes(search.toLowerCase()))
  );

  const counts = {
    all:      heroes.length,
    pending:  heroes.filter(h => h.status === "pending").length,
    approved: heroes.filter(h => h.status === "approved").length,
    rejected: heroes.filter(h => h.status === "rejected").length,
  };

  if (!authed) {
    return (
      <>
        <Helmet><title>Admin — WDC Disaster Heroes</title><meta name="robots" content="noindex" /></Helmet>
        <div style={{ background: T.bg, minHeight: "70vh", display: "flex", alignItems: "center",
                      justifyContent: "center", padding: 24 }}>
          <div style={{ maxWidth: 360, width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `rgba(0,158,219,.10)`,
                            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <Shield size={26} style={{ color: T.blue }} />
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: T.fg, margin: 0 }}>Heroes Admin</h1>
              <p style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>WDC staff only</p>
            </div>
            <form onSubmit={login} style={{ background: T.surface, borderRadius: 18, padding: "24px 20px",
                                            boxShadow: T.shadowMd, display: "flex", flexDirection: "column", gap: 14 }}>
              <input type="email" required placeholder="Admin email" value={adminEmail}
                onChange={e => setAdminEmail(e.target.value)}
                style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10,
                         padding: "10px 14px", fontSize: 14, color: T.fg, outline: "none", fontFamily: "inherit" }} />
              <input type="password" required placeholder="Password" value={adminPw}
                onChange={e => setAdminPw(e.target.value)}
                style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10,
                         padding: "10px 14px", fontSize: 14, color: T.fg, outline: "none", fontFamily: "inherit" }} />
              {loginErr && (
                <div style={{ fontSize: 13, color: "#DC2626", display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertCircle size={13} /> {loginErr}
                </div>
              )}
              <button type="submit" disabled={loggingIn}
                style={{ padding: "11px", borderRadius: 100, background: T.blue, border: "none",
                         fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
                {loggingIn ? "Signing in…" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Admin — WDC Disaster Heroes</title><meta name="robots" content="noindex" /></Helmet>

      <div style={{ background: T.bg, minHeight: "80vh", display: "flex" }}>

        {/* Sidebar */}
        <aside style={{ width: 220, background: T.surface, borderRight: `1px solid ${T.border}`,
                        padding: "20px 0", display: "flex", flexDirection: "column",
                        position: "sticky", top: "6.5rem", height: "calc(100vh - 6.5rem)", flexShrink: 0 }}>
          <div style={{ padding: "0 16px 16px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={16} style={{ color: T.blue }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: T.fg }}>Heroes Admin</span>
            </div>
          </div>
          <nav style={{ padding: "12px 8px", flex: 1 }}>
            {[
              { id: "pending",  label: "Pending Review", count: counts.pending,  color: "#B45309" },
              { id: "approved", label: "Approved",       count: counts.approved, color: "#15803D" },
              { id: "rejected", label: "Rejected",       count: counts.rejected, color: "#B91C1C" },
              { id: "all",      label: "All Applications",count: counts.all,     color: T.muted },
            ].map(f => (
              <button key={f.id} onClick={() => { setFilter(f.id); setSelected(null); }}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                         padding: "8px 10px", borderRadius: 10, border: "none", cursor: "pointer",
                         background: filter === f.id ? `rgba(0,158,219,.08)` : "transparent",
                         marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: filter === f.id ? 600 : 400,
                               color: filter === f.id ? T.blue : T.fg }}>{f.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 100,
                               background: `${f.color}18`, color: f.color }}>{f.count}</span>
              </button>
            ))}
          </nav>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${T.border}` }}>
            <button onClick={async () => { try { await logoutDisasterHero(); } catch {} setAuthed(false); }}
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: T.muted,
                       background: "none", border: "none", cursor: "pointer" }}>
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: 24, overflow: "auto" }}>
          {selected ? (
            /* ── Application detail ── */
            <div style={{ maxWidth: 680 }}>
              <button onClick={() => setSelected(null)}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: T.muted,
                         background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}>
                ← Back to list
              </button>

              <div style={{ background: T.surface, borderRadius: 16, padding: 24, boxShadow: T.shadow }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20,
                              paddingBottom: 20, borderBottom: `1px solid ${T.border}` }}>
                  {selected.photoUrl
                    ? <img src={selected.photoUrl} alt={selected.fullName}
                        style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover",
                                 border: `2px solid ${T.blue}`, flexShrink: 0 }} />
                    : <div style={{ width: 72, height: 72, borderRadius: "50%", background: `rgba(0,158,219,.12)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 24, fontWeight: 700, color: T.blue, flexShrink: 0 }}>
                        {selected.fullName?.[0]}
                      </div>
                  }
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: T.fg }}>{selected.fullName}</div>
                    <div style={{ fontSize: 13, color: T.muted }}>{selected.heroRole} · {selected.organization}</div>
                    <div style={{ fontSize: 13, color: T.muted }}>{selected.email}</div>
                    <span style={{ display: "inline-block", marginTop: 6, fontSize: 11, fontWeight: 700,
                                   padding: "3px 10px", borderRadius: 100,
                                   background: STATUS_COLORS[selected.status]?.bg,
                                   color: STATUS_COLORS[selected.status]?.color, textTransform: "capitalize" }}>
                      {selected.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[
                    { label: "Location", value: `${selected.city}, ${selected.country}` },
                    { label: "Availability", value: selected.availability },
                    { label: "Experience", value: selected.experience || "—" },
                    { label: "LinkedIn", value: selected.linkedinUrl || "—" },
                    { label: "Applied", value: new Date(selected.createdAt).toLocaleDateString() },
                    { label: "Languages", value: selected.languages?.join(", ") || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ padding: "10px 14px", borderRadius: 10,
                                              background: T.bg, border: `1px solid ${T.border}` }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: T.muted, marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 13, color: T.fg, wordBreak: "break-all" }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8 }}>Sectors</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selected.sectors?.map(s => (
                      <span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100,
                                             background: `rgba(0,158,219,.08)`, color: T.blue }}>{s}</span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8 }}>Skills</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selected.skills?.map(s => (
                      <span key={s} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100,
                                             background: `rgba(0,114,188,.08)`, color: "#0072BC" }}>{s}</span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8 }}>Motivation</div>
                  <p style={{ fontSize: 14, color: T.fg, lineHeight: 1.7, margin: 0,
                               padding: "14px 16px", background: T.bg, borderRadius: 10,
                               border: `1px solid ${T.border}` }}>
                    {selected.motivation}
                  </p>
                </div>

                {actionErr && (
                  <div style={{ marginBottom: 14, padding: "10px 14px", borderRadius: 10,
                                background: "rgba(239,68,68,.06)", color: "#DC2626", fontSize: 13 }}>
                    {actionErr}
                  </div>
                )}

                {/* Action buttons */}
                {selected.status === "pending" && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => updateStatus(selected.id, "approved")} disabled={acting}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                               gap: 6, padding: "11px", borderRadius: 100, background: "#16A34A",
                               border: "none", fontSize: 14, fontWeight: 700, color: "#fff",
                               cursor: acting ? "not-allowed" : "pointer" }}>
                      <CheckCircle2 size={15} /> {acting ? "Processing…" : "Approve & Send Invite"}
                    </button>
                    <button onClick={() => updateStatus(selected.id, "rejected")} disabled={acting}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                               gap: 6, padding: "11px", borderRadius: 100, background: "#EF4444",
                               border: "none", fontSize: 14, fontWeight: 700, color: "#fff",
                               cursor: acting ? "not-allowed" : "pointer" }}>
                      <X size={15} /> Reject
                    </button>
                  </div>
                )}
                {selected.status === "approved" && (
                  <button onClick={() => updateStatus(selected.id, "rejected")} disabled={acting}
                    style={{ padding: "10px 20px", borderRadius: 100, background: "rgba(239,68,68,.08)",
                             border: "1px solid rgba(239,68,68,.2)", color: "#DC2626", fontSize: 14,
                             fontWeight: 600, cursor: "pointer" }}>
                    Revoke Access
                  </button>
                )}
                {selected.status === "rejected" && (
                  <button onClick={() => updateStatus(selected.id, "approved")} disabled={acting}
                    style={{ padding: "10px 20px", borderRadius: 100, background: `rgba(22,163,74,.08)`,
                             border: "1px solid rgba(22,163,74,.2)", color: "#15803D", fontSize: 14,
                             fontWeight: 600, cursor: "pointer" }}>
                    Approve Instead
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* ── Applications list ── */
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: T.fg, margin: 0, flex: 1 }}>
                  {filter === "all" ? "All Applications" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <span style={{ fontSize: 14, fontWeight: 400, color: T.muted, marginLeft: 8 }}>
                    ({filtered.length})
                  </span>
                </h2>
                <div style={{ position: "relative" }}>
                  <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: T.muted }} />
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search name, email, country…"
                    style={{ paddingLeft: 30, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                             borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface,
                             fontSize: 13, color: T.fg, outline: "none", width: 220, fontFamily: "inherit" }} />
                </div>
                <button onClick={fetchHeroes}
                  style={{ padding: "8px", borderRadius: 10, background: T.surface, border: `1px solid ${T.border}`,
                           cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <RefreshCw size={14} style={{ color: T.muted }} />
                </button>
              </div>

              {loading ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: T.muted, fontSize: 14 }}>
                  Loading applications…
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: T.muted }}>
                  <Users size={32} style={{ opacity: .3, marginBottom: 10 }} />
                  <p style={{ fontSize: 14 }}>No {filter === "all" ? "" : filter} applications yet.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {filtered.map(h => (
                    <div key={h.id} onClick={() => setSelected(h)}
                      style={{ background: T.surface, borderRadius: 14, padding: "16px 18px",
                               boxShadow: T.shadow, cursor: "pointer", display: "flex",
                               alignItems: "center", gap: 14, transition: "box-shadow .15s" }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = T.shadowMd}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = T.shadow}>
                      {h.photoUrl
                        ? <img src={h.photoUrl} alt={h.fullName}
                            style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                        : <div style={{ width: 44, height: 44, borderRadius: "50%",
                                        background: `rgba(0,158,219,.10)`, display: "flex",
                                        alignItems: "center", justifyContent: "center",
                                        fontSize: 16, fontWeight: 700, color: T.blue, flexShrink: 0 }}>
                            {h.fullName?.[0]}
                          </div>
                      }
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: T.fg }}>{h.fullName}</div>
                        <div style={{ fontSize: 12, color: T.muted, display: "flex", gap: 12, marginTop: 2, flexWrap: "wrap" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <Mail size={10} />{h.email}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <MapPin size={10} />{h.city}, {h.country}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <Clock size={10} />{h.availability}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                          {h.sectors?.slice(0,3).map(s => (
                            <span key={s} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 100,
                                                    background: `rgba(0,158,219,.08)`, color: T.blue }}>{s}</span>
                          ))}
                          {(h.sectors?.length || 0) > 3 && (
                            <span style={{ fontSize: 10, color: T.muted }}>+{h.sectors.length - 3} more</span>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, padding: "3px 10px",
                                       borderRadius: 100, textTransform: "capitalize",
                                       background: STATUS_COLORS[h.status]?.bg,
                                       color: STATUS_COLORS[h.status]?.color }}>
                          {h.status}
                        </span>
                        <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>
                          {new Date(h.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}
