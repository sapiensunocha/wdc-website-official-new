import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getMyHeroProfile, logoutDisasterHero } from "../../../api/disasterHeroes";
import {
  Shield, LogOut, User, BookOpen, Award, Users, Star, Globe,
  ExternalLink, ChevronRight, Bell, Laptop, GraduationCap,
  Cpu, Calendar, Briefcase, MapPin, Clock, CheckCircle,
  AlertCircle, Lock, Heart, MessageSquare, Target, Trophy,
  Send, ChevronDown, ChevronUp
} from "lucide-react";
import { HERO_BADGES } from "../../../assets/data/crisis-cases";

const T = {
  bg:       "#F5F5F7",
  surface:  "#FFFFFF",
  border:   "rgba(60,60,67,.22)",
  fg:       "#1D1D1F",
  muted:    "rgba(29,29,31,.60)",
  blue:     "#009EDB",
  navy:     "#001129",
  darkBlue: "#0072BC",
  shadowSm: "0 1px 2px rgba(0,0,0,.06), 0 0 0 0.5px rgba(0,0,0,.06)",
  shadow:   "0 2px 8px rgba(0,0,0,.08), 0 0 0 0.5px rgba(0,0,0,.05)",
  shadowMd: "0 4px 16px rgba(0,0,0,.10), 0 0 0 0.5px rgba(0,0,0,.05)",
  shadowLg: "0 8px 30px rgba(0,0,0,.12), 0 0 0 0.5px rgba(0,0,0,.04)",
};

const TRAINING_PLATFORMS = [
  {
    name: "Google Digital Skills",
    desc: "Courses on AI, data, digital tools, and emergency response technology.",
    icon: "🟦",
    url: "https://grow.google/certificates/",
    tag: "Free Access",
    tagColor: "#16a34a",
  },
  {
    name: "Coursera",
    desc: "Disaster management, humanitarian logistics, climate adaptation, and leadership.",
    icon: "🟦",
    url: "https://www.coursera.org/",
    tag: "Free Access",
    tagColor: "#16a34a",
  },
  {
    name: "LinkedIn Learning",
    desc: "Professional skills, project management, and disaster communication.",
    icon: "🟦",
    url: "https://www.linkedin.com/learning/",
    tag: "Free Access",
    tagColor: "#16a34a",
  },
  {
    name: "WDC Training Academy",
    desc: "WDC-certified courses in DRR, WASH, shelter, and community resilience.",
    icon: "🟦",
    url: "/training",
    tag: "Exclusive",
    tagColor: T.blue,
    internal: true,
  },
];

const BENEFITS = [
  {
    icon: <Laptop size={20} />,
    title: "Equipment Access",
    desc: "Access to laptops and work tools for field and remote missions through WDC's equipment programme.",
    color: "#7c3aed",
    status: "Contact coordinator",
  },
  {
    icon: <GraduationCap size={20} />,
    title: "University Credits",
    desc: "Credits earned through WDC programme participation accepted at partner universities worldwide.",
    color: "#F59E0B",
    status: "Earn as you work",
  },
  {
    icon: <Star size={20} />,
    title: "Mentoring",
    desc: "Monthly 1:1 sessions with leading disaster professionals, WDC experts, and senior field practitioners.",
    color: "#ec4899",
    status: "Monthly sessions",
  },
  {
    icon: <Cpu size={20} />,
    title: "Michael — AI Field Assistant",
    desc: "Free access to Michael, WDC's AI assistant built for disaster practitioners in the field.",
    color: T.blue,
    status: "Active",
  },
  {
    icon: <Award size={20} />,
    title: "WDC Certifications",
    desc: "Earn globally recognised certifications in your domain — DRR, WASH, shelter, logistics, and more.",
    color: "#16a34a",
    status: "Earn anytime",
  },
  {
    icon: <Calendar size={20} />,
    title: "Summit & Events",
    desc: "Priority invitations to the WDC Global Summit and regional events. Top Heroes per country are awarded participation.",
    color: "#ea580c",
    status: "Annual",
  },
  {
    icon: <Briefcase size={20} />,
    title: "Career Opportunities",
    desc: "25% of WDC Heroes end up working with WDC or our partners. 70% join the WDC Emergency Roster.",
    color: "#0072BC",
    status: "Ongoing",
  },
  {
    icon: <Users size={20} />,
    title: "Community",
    desc: "Connect with 1,840+ disaster practitioners across 135 countries — share knowledge and save lives together.",
    color: "#7c3aed",
    status: "Active",
  },
];

const MOCK_SPONSORSHIPS = [
  {
    caseId: "case-somali-001",
    caseName: "Amina",
    caseCountry: "Somalia",
    caseFlag: "🇸🇴",
    casePhoto: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=400&q=80",
    crisisType: "Drought & Displacement",
    amount: 25,
    category: "All Needs",
    startedAt: "Jul 15, 2026",
    monthsActive: 2,
    totalGiven: 50,
    goal: {
      title: "Amina enrolled in school by December 2026",
      dueDate: "December 2026",
      milestones: [
        { label: "Health assessment completed", done: true, date: "Aug 2026" },
        { label: "School enrollment application submitted", done: true, date: "Aug 2026" },
        { label: "School uniform & supplies purchased", done: false },
        { label: "First day of school", done: false },
        { label: "First school report card", done: false },
      ],
    },
    updates: [
      { id: 3, date: "Sep 15, 2026", type: "health", text: "Amina completed her health check this week. She is now receiving iron supplements and her energy levels have improved significantly. The community health worker reports she is gaining weight as expected." },
      { id: 2, date: "Aug 28, 2026", type: "education", text: "The enrollment application for the local primary school has been submitted. We expect a confirmation within 2 weeks. The school principal has been very welcoming." },
      { id: 1, date: "Aug 10, 2026", type: "shelter", text: "Your first contribution arrived safely. Amina's family has received emergency food supplies and clean water access has been secured through the community borehole." },
    ],
    messages: [
      { id: 1, sender: "coordinator", senderName: "WDC Field Coordinator · Bay Region", text: "Hello! Thank you for sponsoring Amina. We will update you every 2 weeks with verified field reports. Feel free to ask us anything at any time.", date: "Jul 16, 2026" },
      { id: 2, sender: "donor", senderName: "You", text: "Thank you so much for the update. I am glad things are moving in the right direction. Please share a photo when it's safe to do so.", date: "Aug 12, 2026" },
      { id: 3, sender: "coordinator", senderName: "WDC Field Coordinator · Bay Region", text: "Of course! We will include field photos in our next verified report. Amina's mother asked us to pass on her deepest gratitude.", date: "Aug 13, 2026" },
    ],
  },
];

const UPDATE_ICONS = { health: "💊", education: "📚", shelter: "🏠" };

const HERO_RANKS = [
  { name: "Spark Hero",    minBadges: 1 },
  { name: "Shield Bearer", minBadges: 2 },
  { name: "Rescue Angel",  minBadges: 3 },
  { name: "Crisis Guardian", minBadges: 4 },
  { name: "Steadfast Hero", minBadges: 5 },
  { name: "Legendary Hero", minBadges: 6 },
  { name: "Lifesaver",     minBadges: 7 },
];

function SponsorshipCard({ sp }) {
  const [open, setOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [msgInput, setMsgInput] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const doneCount = sp.goal.milestones.filter(m => m.done).length;
  const totalCount = sp.goal.milestones.length;
  const pct = Math.round((doneCount / totalCount) * 100);

  function sendMessage() {
    if (!msgInput.trim()) return;
    setMsgInput("");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  }

  return (
    <div style={{ background: T.surface, borderRadius: 20, boxShadow: T.shadow,
                  border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 20 }}>
      {/* Card header — always visible */}
      <div style={{ padding: "20px 22px", display: "flex", alignItems: "center",
                    gap: 16, cursor: "pointer" }} onClick={() => setOpen(o => !o)}>
        <img src={sp.casePhoto} alt={sp.caseName}
          style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover",
                   border: `2px solid ${T.border}`, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 18 }}>{sp.caseFlag}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: T.fg }}>{sp.caseName}</span>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 100,
                           background: `rgba(0,158,219,.10)`, color: T.blue }}>
              {sp.crisisType}
            </span>
          </div>
          <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>
            {sp.caseCountry} · ${sp.amount}/month · {sp.category} · Since {sp.startedAt}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: T.muted, flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>{open ? "Collapse" : "Expand"}</span>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Expanded body */}
      {open && (
        <div style={{ borderTop: `1px solid ${T.border}`, padding: "24px 22px" }}>

          {/* Section A — WDC Goal */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Target size={15} style={{ color: T.blue }} />
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                             letterSpacing: "0.10em", color: T.blue }}>WDC Goal</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: T.fg, margin: "0 0 4px" }}>
              {sp.goal.title}
            </p>
            <p style={{ fontSize: 12, color: T.muted, margin: "0 0 14px" }}>
              Due: {sp.goal.dueDate}
            </p>

            {/* Progress bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 8, borderRadius: 100,
                            background: "rgba(60,60,67,.10)", overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", borderRadius: 100,
                              background: `linear-gradient(90deg, ${T.blue}, #0072BC)` }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.fg, whiteSpace: "nowrap" }}>
                {doneCount}/{totalCount} milestones
              </span>
            </div>

            {/* Milestone checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sp.goal.milestones.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                                background: m.done ? `rgba(22,163,74,.12)` : "rgba(60,60,67,.08)",
                                border: `1.5px solid ${m.done ? "#16a34a" : T.border}`,
                                display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {m.done
                      ? <CheckCircle size={12} style={{ color: "#16a34a" }} />
                      : <div style={{ width: 6, height: 6, borderRadius: "50%",
                                      background: "rgba(60,60,67,.25)" }} />
                    }
                  </div>
                  <div>
                    <span style={{ fontSize: 13, color: m.done ? T.fg : T.muted,
                                   fontWeight: m.done ? 600 : 400 }}>
                      {m.label}
                    </span>
                    {m.done && m.date && (
                      <span style={{ fontSize: 11, color: T.muted, marginLeft: 8 }}>— {m.date}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B — Growth Timeline */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Heart size={15} style={{ color: "#ec4899" }} />
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                             letterSpacing: "0.10em", color: "#ec4899" }}>Growth Timeline</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 320,
                          overflowY: "auto", paddingRight: 4 }}>
              {sp.updates.map((u) => (
                <div key={u.id} style={{ background: T.bg, borderRadius: 14, padding: "14px 16px",
                                         border: `1px solid ${T.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 16 }}>{UPDATE_ICONS[u.type] || "📋"}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.fg }}>{u.date}</span>
                  </div>
                  <p style={{ fontSize: 13, color: T.fg, margin: "0 0 6px", lineHeight: 1.6 }}>
                    {u.text}
                  </p>
                  <p style={{ fontSize: 11, color: T.muted, margin: 0 }}>
                    Posted by WDC Field Officer · {u.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section C — Message Thread */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <MessageSquare size={15} style={{ color: T.darkBlue }} />
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                             letterSpacing: "0.10em", color: T.darkBlue }}>Message Thread</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 14,
                          maxHeight: 280, overflowY: "auto", paddingRight: 4 }}>
              {sp.messages.map((msg) => {
                const isCoord = msg.sender === "coordinator";
                return (
                  <div key={msg.id} style={{ display: "flex",
                                             flexDirection: isCoord ? "row" : "row-reverse",
                                             alignItems: "flex-end", gap: 8 }}>
                    <div style={{ maxWidth: "72%" }}>
                      <p style={{ fontSize: 11, color: T.muted, margin: "0 0 4px",
                                  textAlign: isCoord ? "left" : "right" }}>
                        {msg.senderName} · {msg.date}
                      </p>
                      <div style={{ padding: "10px 14px", borderRadius: isCoord ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                                    background: isCoord ? "rgba(60,60,67,.08)" : T.blue,
                                    color: isCoord ? T.fg : "#fff", fontSize: 13, lineHeight: 1.6 }}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input row */}
            <div style={{ display: "flex", gap: 10, position: "relative" }}>
              <input
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Type a message to your WDC coordinator…"
                style={{ flex: 1, padding: "10px 16px", borderRadius: 100,
                         border: `1px solid ${T.border}`, fontSize: 13, color: T.fg,
                         background: T.bg, outline: "none", fontFamily: "inherit" }}
              />
              <button onClick={sendMessage}
                style={{ padding: "10px 18px", borderRadius: 100, background: T.blue,
                         border: "none", color: "#fff", cursor: "pointer",
                         display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 }}>
                <Send size={14} /> Send
              </button>
              {toastVisible && (
                <div style={{ position: "absolute", bottom: "calc(100% + 10px)", right: 0,
                              background: "#1D1D1F", color: "#fff", fontSize: 12, fontWeight: 600,
                              padding: "6px 14px", borderRadius: 100, whiteSpace: "nowrap",
                              boxShadow: T.shadowMd, animation: "fadeUp .2s ease both" }}>
                  Message sent ✓
                </div>
              )}
            </div>
          </div>

          {/* Monthly Impact Report */}
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 20 }}>
            <button onClick={() => setReportOpen(r => !r)}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "none",
                       border: "none", cursor: "pointer", padding: 0, marginBottom: reportOpen ? 14 : 0 }}>
              <Trophy size={15} style={{ color: "#F59E0B" }} />
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                             letterSpacing: "0.10em", color: "#F59E0B" }}>Monthly Impact Report</span>
              {reportOpen ? <ChevronUp size={14} style={{ color: T.muted }} /> : <ChevronDown size={14} style={{ color: T.muted }} />}
            </button>
            {reportOpen && (
              <div style={{ background: `linear-gradient(135deg, rgba(245,158,11,.06) 0%, rgba(245,158,11,.02) 100%)`,
                            border: `1px solid rgba(245,158,11,.25)`, borderRadius: 16, padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.fg }}>September 2026</span>
                </div>
                <p style={{ fontSize: 13, color: T.muted, margin: "0 0 10px" }}>
                  Your <strong style={{ color: T.fg }}>$25</strong> this month covered:
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
                  {[
                    { icon: "💊", label: "Health", amount: "$10" },
                    { icon: "📚", label: "Education", amount: "$8" },
                    { icon: "🏠", label: "Shelter", amount: "$7" },
                  ].map(item => (
                    <div key={item.label} style={{ padding: "8px 14px", borderRadius: 100,
                                                   background: T.surface, border: `1px solid ${T.border}`,
                                                   display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 15 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.fg }}>{item.amount}</span>
                      <span style={{ fontSize: 12, color: T.muted }}>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase",
                                letterSpacing: "0.08em", margin: "0 0 4px" }}>Key achievement</p>
                    <p style={{ fontSize: 13, color: T.fg, margin: 0 }}>
                      Amina's school application submitted
                    </p>
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase",
                                letterSpacing: "0.08em", margin: "0 0 4px" }}>Next month goal</p>
                    <p style={{ fontSize: 13, color: T.fg, margin: 0 }}>
                      Purchase school uniform and books
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DisasterHeroesDashboard() {
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    getMyHeroProfile()
      .then(res => { setHero(res.data.hero); setLoading(false); })
      .catch(() => navigate("/disaster-heroes/login"));
  }, [navigate]);

  async function handleSignOut() {
    await logoutDisasterHero().catch(() => {});
    navigate("/disaster-heroes/login");
  }

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: `2px solid rgba(0,158,219,.2)`,
                        borderTopColor: T.blue, animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <p style={{ fontSize: 13, color: T.muted }}>Loading your dashboard…</p>
        </div>
        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
      </div>
    );
  }

  const tabs = [
    { id: "overview",      label: "Overview" },
    { id: "training",      label: "Training" },
    { id: "benefits",      label: "Benefits" },
    { id: "profile",       label: "My Profile" },
    { id: "sponsorships",  label: "My Sponsorships" },
    { id: "badges",        label: "Badges" },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard — WDC Disaster Heroes</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .dash-card { transition: transform .18s ease, box-shadow .18s ease; }
        .dash-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,.12), 0 0 0 0.5px rgba(0,0,0,.04); }
        .platform-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,158,219,.12), 0 0 0 1px rgba(0,158,219,.18); }
        .tab-btn { transition: color .15s, background .15s; }
        @media (max-width: 640px) {
          .dash-grid { grid-template-columns: 1fr !important; }
          .hero-banner { flex-direction: column !important; gap: 12px !important; }
        }
      `}</style>

      <div style={{ background: T.bg, minHeight: "100vh",
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", system-ui, sans-serif' }}>

        {/* Hero banner */}
        <div style={{ background: `linear-gradient(135deg, ${T.navy} 0%, #002a5c 60%, #003d7a 100%)`,
                      padding: "32px 24px", color: "#fff" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="hero-banner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {hero?.photoUrl ? (
                  <img src={hero.photoUrl} alt={hero.fullName}
                    style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover",
                             border: "2.5px solid rgba(255,255,255,.25)" }} />
                ) : (
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0,158,219,.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                border: "2.5px solid rgba(255,255,255,.20)" }}>
                    <User size={28} color="rgba(255,255,255,.8)" />
                  </div>
                )}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <Shield size={14} style={{ color: T.blue }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                      WDC Disaster Hero
                    </span>
                  </div>
                  <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#fff" }}>
                    Welcome back, {hero?.fullName?.split(" ")[0]}
                  </h1>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.60)", marginTop: 4 }}>
                    {hero?.city && hero?.country ? `${hero.city}, ${hero.country}` : hero?.country || ""}
                    {hero?.heroRole ? ` · ${hero.heroRole}` : ""}
                  </p>
                </div>
              </div>

              <button onClick={handleSignOut}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
                         borderRadius: 100, background: "rgba(255,255,255,.10)",
                         border: "1px solid rgba(255,255,255,.20)", color: "rgba(255,255,255,.80)",
                         fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <LogOut size={14} /> Sign out
              </button>
            </div>

            {/* Quick stats */}
            <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
              {[
                { label: "Status", value: "Approved Hero", color: "#22c55e" },
                { label: "Availability", value: hero?.availability || "—" },
                { label: "Focus", value: hero?.sectors?.slice(0,2).join(", ") || "—" },
                { label: "Member since", value: hero?.createdAt ? new Date(hero.createdAt).toLocaleDateString("en", { month: "short", year: "numeric" }) : "—" },
              ].map((s) => (
                <div key={s.label} style={{ padding: "6px 14px", borderRadius: 100,
                                            background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)" }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,.50)" }}>{s.label}: </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: s.color || "rgba(255,255,255,.90)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky tab bar */}
        <div style={{ position: "sticky", top: "6.5rem", zIndex: 40, background: T.surface,
                      borderBottom: `1px solid ${T.border}`, boxShadow: T.shadowSm }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px",
                        display: "flex", gap: 4, overflowX: "auto" }}>
            {tabs.map((t) => (
              <button key={t.id} className="tab-btn" onClick={() => setTab(t.id)}
                style={{ padding: "14px 18px", fontSize: 14, fontWeight: tab === t.id ? 700 : 500,
                         color: tab === t.id ? T.blue : T.muted, background: "none", border: "none",
                         borderBottom: tab === t.id ? `2px solid ${T.blue}` : "2px solid transparent",
                         cursor: "pointer", whiteSpace: "nowrap" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

          {/* OVERVIEW TAB */}
          {tab === "overview" && (
            <div style={{ animation: "fadeUp .35s ease both" }}>

              {/* Announcement banner */}
              <div style={{ background: `linear-gradient(135deg, rgba(0,158,219,.08) 0%, rgba(0,114,188,.06) 100%)`,
                            border: `1px solid rgba(0,158,219,.20)`, borderRadius: 16, padding: "18px 22px",
                            display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 28 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(0,158,219,.12)`,
                              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Bell size={18} style={{ color: T.blue }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: T.fg, margin: "0 0 4px" }}>
                    Your Hero journey starts now
                  </p>
                  <p style={{ fontSize: 13, color: T.muted, margin: 0, lineHeight: 1.6 }}>
                    You're part of a global network of 1,840 disaster practitioners across 135 countries.
                    Explore your training access, benefits, and community resources below.
                  </p>
                </div>
              </div>

              {/* Quick actions */}
              <h2 style={{ fontSize: 13, fontWeight: 700, color: T.muted, textTransform: "uppercase",
                           letterSpacing: "0.10em", marginBottom: 16 }}>Quick Actions</h2>
              <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 32 }}>
                {[
                  { icon: <BookOpen size={20} />, label: "Start Training", desc: "Access your learning platforms", to: null, onClick: () => setTab("training"), color: T.blue },
                  { icon: <Award size={20} />, label: "My Certifications", desc: "Track your WDC certificates", to: null, onClick: () => setTab("benefits"), color: "#16a34a" },
                  { icon: <Users size={20} />, label: "Community", desc: "Connect with fellow Heroes", to: "/membership", color: "#7c3aed" },
                  { icon: <Cpu size={20} />, label: "Ask Michael", desc: "AI field assistant — free for Heroes", to: null, onClick: null, color: "#F59E0B" },
                  { icon: <Calendar size={20} />, label: "Events", desc: "Summits, webinars, and workshops", to: "/events", color: "#ea580c" },
                  { icon: <User size={20} />, label: "Edit Profile", desc: "Update your skills and location", to: null, onClick: () => setTab("profile"), color: T.darkBlue },
                ].map((a) => (
                  <div key={a.label} className="dash-card"
                    style={{ background: T.surface, borderRadius: 16, padding: "18px 20px",
                             boxShadow: T.shadow, cursor: "pointer" }}
                    onClick={a.onClick || (a.to ? () => navigate(a.to) : undefined)}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${a.color}15`,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  color: a.color, marginBottom: 12 }}>
                      {a.icon}
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: T.fg, margin: "0 0 4px" }}>{a.label}</p>
                    <p style={{ fontSize: 12, color: T.muted, margin: 0 }}>{a.desc}</p>
                  </div>
                ))}
              </div>

              {/* Hero stats */}
              <h2 style={{ fontSize: 13, fontWeight: 700, color: T.muted, textTransform: "uppercase",
                           letterSpacing: "0.10em", marginBottom: 16 }}>Your Program Highlights</h2>
              <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 32 }}>
                {[
                  { n: "135", label: "Countries in Network" },
                  { n: "1,840", label: "Active Heroes" },
                  { n: "25%", label: "Joined WDC/Partners" },
                  { n: "70%", label: "On Emergency Roster" },
                ].map((s) => (
                  <div key={s.label} style={{ background: T.surface, borderRadius: 16, padding: "20px",
                                             boxShadow: T.shadow, textAlign: "center" }}>
                    <p style={{ fontSize: 28, fontWeight: 800, color: T.blue, margin: "0 0 6px",
                                letterSpacing: "-0.03em" }}>{s.n}</p>
                    <p style={{ fontSize: 12, color: T.muted, margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Journey path */}
              <h2 style={{ fontSize: 13, fontWeight: 700, color: T.muted, textTransform: "uppercase",
                           letterSpacing: "0.10em", marginBottom: 16 }}>Your Hero Path</h2>
              <div style={{ background: T.surface, borderRadius: 20, padding: "24px", boxShadow: T.shadow }}>
                {[
                  { done: true,  label: "Applied to WDC Disaster Heroes" },
                  { done: true,  label: "Profile approved by WDC team" },
                  { done: false, label: "Complete your first WDC training course" },
                  { done: false, label: "Earn your first WDC certification" },
                  { done: false, label: "Participate in a WDC event or summit" },
                  { done: false, label: "Mentor a fellow Hero in your country" },
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14,
                                        padding: i < 5 ? "0 0 16px" : "0",
                                        borderBottom: i < 5 ? `1px solid ${T.border}` : "none",
                                        marginBottom: i < 5 ? 16 : 0 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%",
                                  background: step.done ? `${T.blue}15` : `rgba(60,60,67,.08)`,
                                  border: `1.5px solid ${step.done ? T.blue : T.border}`,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  flexShrink: 0 }}>
                      {step.done
                        ? <CheckCircle size={14} style={{ color: T.blue }} />
                        : <span style={{ fontSize: 11, fontWeight: 700, color: T.muted }}>{i + 1}</span>
                      }
                    </div>
                    <p style={{ fontSize: 14, color: step.done ? T.fg : T.muted,
                                fontWeight: step.done ? 600 : 400, margin: 0 }}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRAINING TAB */}
          {tab === "training" && (
            <div style={{ animation: "fadeUp .35s ease both" }}>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: T.fg, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                  Your Training Access
                </h2>
                <p style={{ fontSize: 15, color: T.muted, margin: 0, lineHeight: 1.6 }}>
                  As an approved WDC Disaster Hero, you have free access to world-class training across all platforms below.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, marginBottom: 32 }}>
                {TRAINING_PLATFORMS.map((p) => (
                  <a key={p.name}
                    href={p.url}
                    target={p.internal ? undefined : "_blank"}
                    rel={p.internal ? undefined : "noopener noreferrer"}
                    className="platform-card"
                    style={{ display: "block", background: T.surface, borderRadius: 18, padding: "22px",
                             boxShadow: T.shadow, border: `1px solid ${T.border}`, textDecoration: "none",
                             transition: "transform .18s ease, box-shadow .18s ease" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(0,158,219,.10)`,
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                        <BookOpen size={22} style={{ color: T.blue }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100,
                                     background: `${p.tagColor}15`, color: p.tagColor }}>
                        {p.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: T.fg, margin: "0 0 6px" }}>{p.name}</p>
                    <p style={{ fontSize: 13, color: T.muted, margin: "0 0 14px", lineHeight: 1.5 }}>{p.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12,
                                  fontWeight: 700, color: T.blue }}>
                      Open platform <ExternalLink size={12} />
                    </div>
                  </a>
                ))}
              </div>

              {/* Credentials note */}
              <div style={{ background: `rgba(0,158,219,.06)`, border: `1px solid rgba(0,158,219,.18)`,
                            borderRadius: 16, padding: "18px 22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <AlertCircle size={18} style={{ color: T.blue, flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: T.fg, margin: "0 0 4px" }}>
                    Need your access credentials?
                  </p>
                  <p style={{ fontSize: 13, color: T.muted, margin: 0, lineHeight: 1.6 }}>
                    WDC provides dedicated login credentials for Coursera and LinkedIn Learning.
                    Contact your Hero coordinator at{" "}
                    <a href="mailto:office@worlddisastercenter.org"
                      style={{ color: T.blue, fontWeight: 600 }}>
                      office@worlddisastercenter.org
                    </a>
                    {" "}to receive yours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BENEFITS TAB */}
          {tab === "benefits" && (
            <div style={{ animation: "fadeUp .35s ease both" }}>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: T.fg, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                  Your Hero Benefits
                </h2>
                <p style={{ fontSize: 15, color: T.muted, margin: 0, lineHeight: 1.6 }}>
                  Everything included in your WDC Disaster Hero membership — all free.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {BENEFITS.map((b) => (
                  <div key={b.title} className="dash-card"
                    style={{ background: T.surface, borderRadius: 18, padding: "22px", boxShadow: T.shadow,
                             border: `1px solid ${T.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 12, background: `${b.color}12`,
                                    display: "flex", alignItems: "center", justifyContent: "center", color: b.color }}>
                        {b.icon}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100,
                                     background: `${b.color}10`, color: b.color }}>
                        {b.status}
                      </span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: T.fg, margin: "0 0 6px" }}>{b.title}</p>
                    <p style={{ fontSize: 13, color: T.muted, margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
                  </div>
                ))}
              </div>

              {/* Certification CTA */}
              <div style={{ marginTop: 28, background: `linear-gradient(135deg, ${T.navy} 0%, #002a5c 100%)`,
                            borderRadius: 20, padding: "28px", display: "flex", alignItems: "center",
                            gap: 20, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                    Ready for your first WDC certificate?
                  </p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.60)", margin: 0, lineHeight: 1.6 }}>
                    Complete any training track and apply for your domain certification through the WDC Training Academy.
                  </p>
                </div>
                <Link to="/training"
                  style={{ padding: "12px 24px", borderRadius: 100, background: T.blue,
                           color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none",
                           display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  Go to Training Academy <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          )}

          {/* SPONSORSHIPS TAB */}
          {tab === "sponsorships" && (
            <div style={{ animation: "fadeUp .35s ease both" }}>
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: T.fg, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                  My Sponsorships
                </h2>
                <p style={{ fontSize: 15, color: T.muted, margin: 0, lineHeight: 1.6 }}>
                  Track every person you are supporting — their goals, growth, and your messages.
                </p>
              </div>

              {/* Impact summary bar */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                {[
                  { label: "Total given", value: "$50", color: "#16a34a" },
                  { label: "Cases supported", value: "1", color: T.blue },
                  { label: "Months active", value: "2", color: "#7c3aed" },
                  { label: "Lives touched", value: "1", color: "#ec4899" },
                ].map(stat => (
                  <div key={stat.label}
                    style={{ flex: "1 1 140px", background: T.surface, borderRadius: 16,
                             padding: "16px 20px", boxShadow: T.shadow, border: `1px solid ${T.border}`,
                             textAlign: "center" }}>
                    <p style={{ fontSize: 26, fontWeight: 800, color: stat.color, margin: "0 0 4px",
                                letterSpacing: "-0.03em" }}>{stat.value}</p>
                    <p style={{ fontSize: 12, color: T.muted, margin: 0 }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Sponsorship cards */}
              {MOCK_SPONSORSHIPS.map(sp => (
                <SponsorshipCard key={sp.caseId} sp={sp} />
              ))}

              {MOCK_SPONSORSHIPS.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 24px", color: T.muted }}>
                  <Heart size={40} style={{ opacity: 0.25, marginBottom: 12 }} />
                  <p style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>No active sponsorships yet</p>
                  <p style={{ fontSize: 13, margin: 0 }}>
                    Visit <Link to="/sponsor" style={{ color: T.blue, fontWeight: 600 }}>our sponsorship page</Link> to start supporting someone today.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* BADGES TAB */}
          {tab === "badges" && (
            <div style={{ animation: "fadeUp .35s ease both" }}>
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: T.fg, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                  Badges
                </h2>
                <p style={{ fontSize: 15, color: T.muted, margin: 0, lineHeight: 1.6 }}>
                  Earn badges as your impact grows. Every badge reflects a real milestone in someone's life.
                </p>
              </div>

              {/* Hero rank section */}
              {(() => {
                const earnedCount = 1; // mock: First Spark earned
                const currentRank = HERO_RANKS.filter(r => earnedCount >= r.minBadges).pop() || HERO_RANKS[0];
                const nextRank = HERO_RANKS.find(r => r.minBadges > earnedCount);
                const rankPct = Math.round((earnedCount / HERO_BADGES.length) * 100);
                return (
                  <div style={{ background: `linear-gradient(135deg, ${T.navy} 0%, #002a5c 100%)`,
                                borderRadius: 20, padding: "24px 28px", marginBottom: 28, color: "#fff" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                                  gap: 16, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <Trophy size={18} style={{ color: "#F59E0B" }} />
                          <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                                         letterSpacing: "0.12em", color: "rgba(255,255,255,.55)" }}>
                            Your Hero Rank
                          </span>
                        </div>
                        <p style={{ fontSize: 24, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                          {currentRank.name}
                        </p>
                        {nextRank && (
                          <p style={{ fontSize: 13, color: "rgba(255,255,255,.60)", margin: 0 }}>
                            Next rank: <strong style={{ color: "#F59E0B" }}>{nextRank.name}</strong>
                            {nextRank.name === "Shield Bearer" ? " (sponsor $25+/month — you're almost there!)" : ""}
                          </p>
                        )}
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: 28, fontWeight: 800, color: "#F59E0B", margin: "0 0 4px" }}>
                          {earnedCount}/{HERO_BADGES.length}
                        </p>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,.50)", margin: 0 }}>badges earned</p>
                      </div>
                    </div>
                    <div style={{ marginTop: 18 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>Progress to next rank</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#F59E0B" }}>{rankPct}%</span>
                      </div>
                      <div style={{ height: 8, borderRadius: 100, background: "rgba(255,255,255,.12)", overflow: "hidden" }}>
                        <div style={{ width: `${rankPct}%`, height: "100%", borderRadius: 100,
                                      background: "linear-gradient(90deg, #F59E0B, #fbbf24)" }} />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Badge wall grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                {HERO_BADGES.map(badge => {
                  const earned = badge.id === "first_spark";
                  return (
                    <div key={badge.id} className="dash-card"
                      style={{ background: T.surface, borderRadius: 18, padding: "24px 20px",
                               boxShadow: T.shadow, border: `1px solid ${earned ? "rgba(22,163,74,.30)" : T.border}`,
                               textAlign: "center", opacity: earned ? 1 : 0.7,
                               position: "relative", overflow: "hidden" }}>
                      {!earned && (
                        <div style={{ position: "absolute", top: 10, right: 10 }}>
                          <Lock size={14} style={{ color: T.muted }} />
                        </div>
                      )}
                      <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 14px",
                                    background: earned ? "rgba(22,163,74,.10)" : "rgba(60,60,67,.07)",
                                    border: `2px solid ${earned ? "rgba(22,163,74,.30)" : T.border}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 30, filter: earned ? "none" : "grayscale(0.6)" }}>
                        {badge.icon}
                      </div>
                      <p style={{ fontSize: 15, fontWeight: 800, color: T.fg, margin: "0 0 6px" }}>
                        {badge.name}
                      </p>
                      <p style={{ fontSize: 12, color: T.muted, margin: "0 0 14px", lineHeight: 1.5 }}>
                        {badge.desc}
                      </p>
                      {earned ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4,
                                       fontSize: 12, fontWeight: 700, padding: "4px 12px",
                                       borderRadius: 100, background: "rgba(22,163,74,.10)", color: "#16a34a" }}>
                          <CheckCircle size={12} /> Earned
                        </span>
                      ) : (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4,
                                       fontSize: 11, fontWeight: 600, padding: "4px 12px",
                                       borderRadius: 100, background: "rgba(60,60,67,.07)", color: T.muted }}>
                          <Lock size={11} /> {badge.desc}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {tab === "profile" && (
            <div style={{ animation: "fadeUp .35s ease both", maxWidth: 680 }}>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: T.fg, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                  My Profile
                </h2>
                <p style={{ fontSize: 15, color: T.muted, margin: 0 }}>
                  Your Disaster Heroes profile as submitted.
                </p>
              </div>

              <div style={{ background: T.surface, borderRadius: 20, overflow: "hidden", boxShadow: T.shadow }}>
                {/* Photo + name header */}
                <div style={{ background: `linear-gradient(135deg, ${T.navy} 0%, #002a5c 100%)`, padding: "28px 24px",
                              display: "flex", alignItems: "center", gap: 18 }}>
                  {hero?.photoUrl ? (
                    <img src={hero.photoUrl} alt={hero.fullName}
                      style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover",
                               border: "3px solid rgba(255,255,255,.25)" }} />
                  ) : (
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,158,219,.3)",
                                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <User size={36} color="rgba(255,255,255,.8)" />
                    </div>
                  )}
                  <div>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                      {hero?.fullName}
                    </p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,.60)", margin: 0 }}>
                      {hero?.heroRole || "Disaster Hero"}
                      {hero?.organization ? ` · ${hero.organization}` : ""}
                    </p>
                  </div>
                </div>

                {/* Fields */}
                <div style={{ padding: "24px" }}>
                  {[
                    { label: "Email", value: hero?.email, icon: <Globe size={14} /> },
                    { label: "Location", value: [hero?.city, hero?.country].filter(Boolean).join(", "), icon: <MapPin size={14} /> },
                    { label: "Availability", value: hero?.availability, icon: <Clock size={14} /> },
                    { label: "Organization", value: hero?.organization },
                    { label: "Experience", value: hero?.experience },
                    { label: "Languages", value: hero?.languages?.join(", ") },
                    { label: "LinkedIn", value: hero?.linkedinUrl },
                  ].filter(f => f.value).map((f, i, arr) => (
                    <div key={f.label} style={{ display: "flex", gap: 14, padding: "14px 0",
                                               borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: T.muted, minWidth: 110, margin: 0, paddingTop: 2 }}>
                        {f.label}
                      </p>
                      <p style={{ fontSize: 14, color: T.fg, margin: 0, lineHeight: 1.5, flex: 1 }}>
                        {f.label === "LinkedIn"
                          ? <a href={f.value} target="_blank" rel="noopener noreferrer"
                               style={{ color: T.blue, fontWeight: 600 }}>{f.value}</a>
                          : f.value}
                      </p>
                    </div>
                  ))}

                  {hero?.sectors?.length > 0 && (
                    <div style={{ padding: "14px 0", borderTop: `1px solid ${T.border}` }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: T.muted, margin: "0 0 10px" }}>Focus Areas</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {hero.sectors.map((s) => (
                          <span key={s} style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100,
                                                 background: `rgba(0,158,219,.08)`, color: T.blue }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {hero?.skills?.length > 0 && (
                    <div style={{ padding: "14px 0", borderTop: `1px solid ${T.border}` }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: T.muted, margin: "0 0 10px" }}>Skills</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {hero.skills.map((s) => (
                          <span key={s} style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100,
                                                 background: "rgba(60,60,67,.08)", color: T.fg }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {hero?.motivation && (
                    <div style={{ padding: "14px 0", borderTop: `1px solid ${T.border}` }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: T.muted, margin: "0 0 10px" }}>Why I serve</p>
                      <p style={{ fontSize: 14, color: T.fg, margin: 0, lineHeight: 1.7,
                                  fontStyle: "italic", borderLeft: `3px solid ${T.blue}`, paddingLeft: 14 }}>
                        "{hero.motivation}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: 20, padding: "16px 20px", borderRadius: 14,
                            background: `rgba(0,158,219,.06)`, border: `1px solid rgba(0,158,219,.18)`,
                            display: "flex", alignItems: "center", gap: 10 }}>
                <Lock size={14} style={{ color: T.blue, flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>
                  To update your profile information, contact{" "}
                  <a href="mailto:office@worlddisastercenter.org" style={{ color: T.blue, fontWeight: 600 }}>
                    office@worlddisastercenter.org
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
