import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Search, Shield, CheckCircle, Activity,
  Zap, ExternalLink, Globe, Building2,
} from "lucide-react";
import SEOMeta from "../../components/SEOMeta";
import AnimateIn from "../../components/AnimateIn";
import { CRISIS_CASES } from "../../assets/data/crisis-cases";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MICHAEL_URL = import.meta.env.VITE_MICHAEL_API_URL || "https://michael-api-lzjl4ttoxq-uc.a.run.app";
const MICHAEL_KEY = import.meta.env.VITE_MICHAEL_API_SECRET || "xeltis-prod-key-2026";

function normType(raw) {
  if (!raw) return "Other";
  const t = String(raw).toLowerCase();
  if (t.includes("flood"))      return "Flood";
  if (t.includes("earthquake")) return "Earthquake";
  if (t.includes("storm") || t.includes("cyclone") || t.includes("hurricane")) return "Storm";
  if (t.includes("fire"))       return "Wildfire";
  if (t.includes("drought"))    return "Drought";
  if (t.includes("conflict") || t.includes("violence")) return "Conflict";
  if (t.includes("disease") || t.includes("epidemic"))  return "Disease";
  if (t.includes("tsunami"))    return "Tsunami";
  return "Crisis";
}

const TYPE_ICON = {
  Flood: "💧", Earthquake: "🌍", Storm: "🌀", Wildfire: "🔥",
  Drought: "🌵", Conflict: "⚔️", Disease: "🦠", Tsunami: "🌊", Crisis: "⚠️",
};

// ─── Design Tokens ────────────────────────────────────────────────────────────
const PRIMARY = "#009EDB";
const NAVY    = "#001129";
const BG      = "#F8FAFC";

const URGENCY_COLOR = {
  critical: "#EF4444",
  high:     "#F97316",
  moderate: "#009EDB",
};

const URGENCY_LABEL = {
  critical: "CRITICAL",
  high:     "HIGH",
  moderate: "MODERATE",
};

const CATEGORY_ICONS = {
  health:    "💊",
  education: "📚",
  shelter:   "🏠",
};

function pct(funded, goal) {
  return Math.min(100, Math.round((funded / goal) * 100));
}

// ─── World Map Section ────────────────────────────────────────────────────────
function MapFallback({ cases }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-3"
      style={{ height: 340, background: "#0a0f1e", borderRadius: 0 }}
    >
      <Globe size={32} style={{ color: PRIMARY, opacity: 0.4 }} />
      <p className="text-white/40 text-xs">Interactive map loading…</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {cases.slice(0, 6).map((c) => (
          <span
            key={c.id}
            className="text-xs px-2 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
          >
            {c.flag} {c.country}
          </span>
        ))}
      </div>
    </div>
  );
}

function WorldMap({ cases, michaelAlerts }) {
  const [mapError, setMapError] = useState(false);

  if (mapError) {
    return <MapFallback cases={cases} />;
  }

  // Filter MICHAEL alerts with lat/lng
  const michaelPoints = michaelAlerts
    .filter((a) => a.latitude && a.longitude)
    .slice(0, 50);

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[10, 20]}
        zoom={2}
        style={{ height: 380, width: "100%", background: "#0a0f1e" }}
        attributionControl={false}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* Crisis cases */}
        {cases.map((c) => {
          if (!c.location?.lat || !c.location?.lng) return null;
          const isFamily = c.caseType === "family";
          const isCritical = c.urgency === "critical";
          const color = isFamily ? "#F97316" : PRIMARY;
          const radius = isFamily ? (isCritical ? 16 : 14) : (isCritical ? 12 : 10);
          const funded = pct(c.fundedMonthly, c.monthlyGoal);

          return (
            <CircleMarker
              key={c.id}
              center={[c.location.lat, c.location.lng]}
              radius={radius}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.75,
                weight: isCritical ? 2 : 1,
                opacity: 0.9,
              }}
            >
              <Popup>
                <div style={{ minWidth: 180, fontFamily: "system-ui, sans-serif" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontSize: 18 }}>{c.flag}</span>
                    <div>
                      <p style={{ fontWeight: 900, fontSize: 13, color: NAVY, margin: 0 }}>
                        {c.caseType === "family" ? c.familyName : `${c.name}${c.age ? `, ${c.age}` : ""}`}
                      </p>
                      <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{c.country} · {c.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      style={{
                        fontSize: 9, fontWeight: 900, padding: "2px 6px", borderRadius: 999,
                        background: (isFamily ? "#F97316" : PRIMARY) + "18",
                        color: isFamily ? "#F97316" : PRIMARY, textTransform: "uppercase", letterSpacing: "0.1em",
                      }}
                    >
                      {isFamily ? "Family" : "Individual"}
                    </span>
                    <span
                      style={{
                        fontSize: 9, fontWeight: 900, padding: "2px 6px", borderRadius: 999,
                        background: URGENCY_COLOR[c.urgency] + "18",
                        color: URGENCY_COLOR[c.urgency], textTransform: "uppercase", letterSpacing: "0.1em",
                      }}
                    >
                      {URGENCY_LABEL[c.urgency]}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 8px" }}>
                    Goal: <strong style={{ color: NAVY }}>${c.monthlyGoal}/mo</strong> · {funded}% funded
                  </p>
                  <a
                    href={`/disaster-heroes/case/${c.id}`}
                    style={{
                      display: "inline-block", background: PRIMARY, color: "#fff",
                      fontWeight: 900, fontSize: 11, padding: "6px 12px", borderRadius: 8,
                      textDecoration: "none",
                    }}
                  >
                    View Case →
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* MICHAEL alerts */}
        {michaelPoints.map((a, i) => (
          <CircleMarker
            key={`michael-${i}`}
            center={[parseFloat(a.latitude), parseFloat(a.longitude)]}
            radius={6}
            pathOptions={{
              color: "#DC2626",
              fillColor: "#DC2626",
              fillOpacity: 0.7,
              weight: 1,
              opacity: 0.8,
            }}
          >
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div
        style={{
          position: "absolute", bottom: 12, right: 12, zIndex: 1000,
          background: "rgba(0,11,24,0.88)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, padding: "8px 12px", backdropFilter: "blur(8px)",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, margin: "0 0 6px" }}>
          Legend
        </p>
        {[
          { color: PRIMARY, label: "Individual" },
          { color: "#F97316", label: "Family" },
          { color: "#DC2626", label: "MICHAEL Alert" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2" style={{ marginBottom: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Case Card ────────────────────────────────────────────────────────────────
function CaseCard({ c, index, hasAlert, alertCount }) {
  const funded = pct(c.fundedMonthly, c.monthlyGoal);
  const accentColor = URGENCY_COLOR[c.urgency];
  const isFamily = c.caseType === "family";
  const displayName = isFamily ? c.familyName : `${c.name}${c.age ? `, ${c.age}` : ""}`;
  const sponsorLabel = isFamily ? "Sponsor this family" : `Sponsor ${c.name}`;

  return (
    <AnimateIn variant="fadeUp" delay={0.04 * index}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link
          to={`/disaster-heroes/case/${c.id}`}
          className="group block rounded-2xl overflow-hidden transition-all duration-300 relative"
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
            e.currentTarget.style.borderColor = isFamily ? "#F97316" : PRIMARY;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          {/* Photo */}
          <div className="relative overflow-hidden" style={{ height: 192 }}>
            <img
              src={c.photo}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ filter: "saturate(0.7) brightness(0.6)" }}
              loading="lazy"
            />

            {/* Top-left: type pill */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span
                className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={
                  isFamily
                    ? { background: "#F97316", color: "#fff" }
                    : { background: PRIMARY, color: "#fff" }
                }
              >
                {isFamily ? "Family" : "Individual"}
              </span>
              {isFamily && (
                <span
                  className="text-[9px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}
                >
                  👨‍👩‍👧‍👦 {c.familySize} members
                </span>
              )}
            </div>

            {/* Top-right: urgency + MICHAEL */}
            <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
              <span
                className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  background: accentColor + "22",
                  border: `1px solid ${accentColor}55`,
                  color: accentColor,
                }}
              >
                {URGENCY_LABEL[c.urgency]}
              </span>
              {hasAlert && (
                <span
                  className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{
                    background: "rgba(251,191,36,0.18)",
                    border: "1px solid rgba(251,191,36,0.45)",
                    color: "#fbbf24",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse inline-block" />
                  LIVE{alertCount > 1 ? ` ·${alertCount}` : ""}
                </span>
              )}
            </div>

            {/* Bottom: name + country */}
            <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: "linear-gradient(to top, rgba(0,11,24,0.85) 0%, transparent 100%)" }}>
              <p className="text-white font-black text-sm leading-tight">{displayName}</p>
              <p className="text-white/60 text-[10px] mt-0.5">{c.crisisType}</p>
            </div>
          </div>

          {/* Card body */}
          <div className="p-4">
            {/* Location + verified */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{c.flag}</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: NAVY }}>{c.country}</p>
                  <p className="text-[10px] text-gray-400">{c.region}</p>
                </div>
              </div>
              <span className="text-[9px] text-gray-400 flex items-center gap-1">
                <CheckCircle size={9} style={{ color: PRIMARY }} />
                {c.verifiedBy?.includes("WDC") ? "WDC Verified" : "Partner Verified"}
              </span>
            </div>

            {/* Needs mini-bars */}
            <div className="space-y-1.5 mb-3">
              {Object.entries(c.needs).map(([need, amt]) => (
                <div key={need} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 w-16 shrink-0">
                    {CATEGORY_ICONS[need]} {need.charAt(0).toUpperCase() + need.slice(1)}
                  </span>
                  <div className="flex-1 h-1 rounded-full" style={{ background: "#f1f5f9" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round((amt / c.monthlyGoal) * 100)}%`,
                        background: PRIMARY,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-bold shrink-0" style={{ color: NAVY }}>${amt}/mo</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-400">Monthly funded</span>
                <span className="text-[10px] font-black" style={{ color: PRIMARY }}>{funded}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${funded}%`, background: funded === 0 ? "#e5e7eb" : PRIMARY }}
                />
              </div>
              <p className="text-[9px] text-gray-400 mt-1">
                ${c.fundedMonthly} of ${c.monthlyGoal}/mo · {c.sponsors} sponsor{c.sponsors !== 1 ? "s" : ""}
              </p>
            </div>

            {/* CTA */}
            <div
              className="flex items-center justify-between pt-3"
              style={{ borderTop: "1px solid #f1f5f9" }}
            >
              <span className="text-[11px] text-gray-400">
                From <strong className="text-gray-700">${Math.min(...Object.values(c.needs))}/month</strong>
              </span>
              <span
                className="inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl transition-all"
                style={{ background: PRIMARY, color: "#fff" }}
              >
                {sponsorLabel} <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimateIn>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DisasterHeroesHome() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("urgent");
  const [search, setSearch] = useState("");
  const gridRef = useRef(null);

  // ── MICHAEL live data ──
  const [michaelAlerts, setMichaelAlerts] = useState([]);
  const [michaelLoading, setMichaelLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${MICHAEL_URL}/api/alerts`, {
      headers: { "X-API-Key": MICHAEL_KEY },
      signal: ctrl.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        const raw = Array.isArray(data) ? data : (data.events ?? []);
        setMichaelAlerts(raw);
      })
      .catch(() => {})
      .finally(() => setMichaelLoading(false));
    return () => ctrl.abort();
  }, []);

  // Build country → alert count map
  const alertsByCountry = {};
  michaelAlerts.forEach((a) => {
    const loc = (a.location_name || "").toLowerCase();
    CRISIS_CASES.forEach((c) => {
      if (
        loc.includes(c.country.toLowerCase()) ||
        c.country.toLowerCase().includes(loc.split(" ")[0])
      ) {
        alertsByCountry[c.id] = (alertsByCountry[c.id] || 0) + 1;
      }
    });
  });

  const criticals = michaelAlerts.filter((a) => a.severity_level >= 4).length;
  const typeCounts = {};
  michaelAlerts.forEach((a) => {
    const t = normType(a.event_type);
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  });
  const topTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);

  // Stats
  const totalCases = CRISIS_CASES.length;
  const totalFamilies = CRISIS_CASES.filter((c) => c.caseType === "family").length;
  const countries = [...new Set(CRISIS_CASES.map((c) => c.country))].length;
  const activeDonors = CRISIS_CASES.reduce((s, c) => s + (c.sponsors || 0), 0);

  const FILTERS = [
    { id: "all",        label: "All" },
    { id: "family",     label: "Families" },
    { id: "individual", label: "Individuals" },
    { id: "critical",   label: "Critical" },
    { id: "education",  label: "Education" },
    { id: "health",     label: "Health" },
    { id: "shelter",    label: "Shelter" },
  ];

  const SORT_OPTIONS = [
    { id: "urgent",  label: "Most Urgent" },
    { id: "funded",  label: "Least Funded" },
    { id: "newest",  label: "Newest" },
  ];

  const filtered = CRISIS_CASES.filter((c) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "family" && c.caseType === "family") ||
      (activeFilter === "individual" && c.caseType === "individual") ||
      (activeFilter === "critical" && c.urgency === "critical") ||
      c.category?.includes(activeFilter);

    const q = search.toLowerCase();
    const name = c.caseType === "family" ? c.familyName || "" : c.name || "";
    const matchesSearch =
      !q ||
      name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.crisisType.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const urgencyRank = { critical: 0, high: 1, moderate: 2 };

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "urgent") return (urgencyRank[a.urgency] ?? 9) - (urgencyRank[b.urgency] ?? 9);
    if (sortBy === "funded")  return pct(a.fundedMonthly, a.monthlyGoal) - pct(b.fundedMonthly, b.monthlyGoal);
    if (sortBy === "newest")  return new Date(b.since) - new Date(a.since);
    return 0;
  });

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEOMeta
        title="Disaster Heroes — Find Someone to Change Forever | WDC"
        description="Browse families and individuals in crisis worldwide. $5–$25/month creates real, measurable impact. Sponsor a verified case today."
        image="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/disaster-heroes"
      />

      {/* ── HERO ── */}
      <section className="text-white relative overflow-hidden" style={{ minHeight: 500, background: NAVY }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(0.4) brightness(0.18)" }}
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,17,41,0.98) 0%, rgba(0,17,41,0.90) 60%, rgba(0,158,219,0.10) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#001129] to-transparent" />
        </div>

        <div className="container relative pt-28 pb-16 sm:py-24">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-5">
              <Shield size={16} style={{ color: PRIMARY }} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: PRIMARY }}>
                WDC Disaster Heroes
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-4 max-w-3xl">
              Find Someone to{" "}
              <span style={{ color: PRIMARY }}>Change Forever</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-lg max-w-xl leading-relaxed mb-8">
              Browse families and individuals in crisis worldwide.{" "}
              <strong className="text-white">$5–$25/month</strong> creates real, measurable impact.
            </p>

            {/* Stats strip */}
            <div
              className="inline-flex flex-wrap gap-4 sm:gap-8 px-5 py-3 rounded-2xl mb-8"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {[
                { value: totalCases.toString(), label: "Open Cases" },
                { value: totalFamilies.toString(), label: "Family Cases" },
                { value: countries.toString(), label: "Countries" },
                { value: activeDonors.toLocaleString(), label: "Active Donors" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-black text-lg sm:text-2xl leading-none">{s.value}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={scrollToGrid}
                className="inline-flex items-center gap-2 font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: PRIMARY, color: "#fff" }}
              >
                Browse Cases <ArrowRight size={14} />
              </button>
              <Link
                to="/disaster-heroes/feed"
                className="inline-flex items-center gap-2 font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#fff",
                }}
              >
                📡 Community Feed
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── MICHAEL LIVE INTEL STRIP ── */}
      <section style={{ background: "#080d1a", borderBottom: "1px solid rgba(251,191,36,0.13)" }}>
        <div className="container py-3.5">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2.5 shrink-0">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)" }}
              >
                <Zap size={14} style={{ color: "#fbbf24" }} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#fbbf24" }}>MICHAEL AI</p>
                <p className="text-white/40 text-[9px]">Live Disaster Intelligence</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            {michaelLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-white/40 text-xs">Loading live data…</span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-white text-xs font-black">{michaelAlerts.length.toLocaleString()}</span>
                  <span className="text-white/40 text-xs">active events</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-white text-xs font-black">{criticals.toLocaleString()}</span>
                  <span className="text-white/40 text-xs">critical</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 flex-wrap">
                  {topTypes.map(([type, count]) => (
                    <span
                      key={type}
                      className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {TYPE_ICON[type] || "⚠️"} {type} ({count})
                    </span>
                  ))}
                </div>
              </div>
            )}
            <a
              href="https://michael.worlddisastercenter.org"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider transition-opacity hover:opacity-70"
              style={{ color: "#fbbf24" }}
            >
              Open MICHAEL <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </section>

      {/* ── WORLD MAP ── */}
      <section style={{ background: "#0a0f1e", position: "relative" }}>
        <WorldMap cases={CRISIS_CASES} michaelAlerts={michaelAlerts} />
        <div
          className="container py-3 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/40 text-xs">
            <strong className="text-white">{CRISIS_CASES.length}</strong> cases shown — click any pin to preview
          </p>
          <div className="flex items-center gap-3 text-[10px] text-white/30">
            <span>🔵 Individual</span>
            <span>🟠 Family</span>
            <span>🔴 MICHAEL Alert</span>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR (sticky) ── */}
      <div
        className="sticky top-0 z-30"
        style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
      >
        <div className="container py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="text-xs font-bold px-3.5 py-1.5 rounded-full transition-all"
                  style={
                    activeFilter === f.id
                      ? { background: PRIMARY, color: "#fff" }
                      : { background: "#f1f5f9", color: "#64748b" }
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold px-3 py-1.5 rounded-full outline-none cursor-pointer"
              style={{ background: "#f1f5f9", color: "#334155", border: "none" }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>

            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#94a3b8" }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by country or name…"
                className="w-full pl-8 pr-4 py-1.5 text-xs rounded-full outline-none"
                style={{
                  background: "#f1f5f9",
                  border: "1px solid #e5e7eb",
                  color: NAVY,
                }}
              />
            </div>

            {/* Community Feed link */}
            <Link
              to="/disaster-heroes/feed"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full ml-auto"
              style={{
                background: "rgba(251,191,36,0.10)",
                border: "1px solid rgba(251,191,36,0.25)",
                color: "#b45309",
              }}
            >
              📡 Community Feed
            </Link>
          </div>
        </div>
      </div>

      {/* ── CASE GRID ── */}
      <section
        ref={gridRef}
        style={{ background: BG, paddingTop: "3rem", paddingBottom: "5rem" }}
      >
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              Showing <strong style={{ color: NAVY }}>{sorted.length}</strong> case{sorted.length !== 1 ? "s" : ""}
            </p>
          </div>

          {CRISIS_CASES.length === 0 ? (
            <AnimateIn variant="fadeUp">
              <div
                className="text-center py-20 rounded-2xl"
                style={{ background: "#fff", border: "2px dashed #e5e7eb" }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>🌍</div>
                <h3 className="font-black text-xl mb-2" style={{ color: NAVY }}>
                  No active cases yet
                </h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed mb-6">
                  Cases are submitted by verified organizations and WDC field teams.
                  The map above shows where MICHAEL is detecting live crises right now.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    to="/disaster-heroes/organizations/register"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-sm"
                    style={{ background: PRIMARY }}
                  >
                    Register your organization <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/disaster-heroes/feed"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
                    style={{ background: "#f1f5f9", color: NAVY }}
                  >
                    View community feed
                  </Link>
                </div>
              </div>
            </AnimateIn>
          ) : sorted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sorted.map((c, i) => (
                <CaseCard
                  key={c.id}
                  c={c}
                  index={i}
                  hasAlert={!!alertsByCountry[c.id]}
                  alertCount={alertsByCountry[c.id] || 0}
                />
              ))}
            </div>
          ) : (
            <AnimateIn variant="fadeUp">
              <div
                className="text-center py-16 rounded-2xl"
                style={{ background: "#fff", border: "1px solid #e5e7eb" }}
              >
                <p className="text-gray-400 text-sm">No cases match your search. Try a different filter.</p>
              </div>
            </AnimateIn>
          )}

          {/* ── ORG CTA ── */}
          <div className="mt-14">
            <AnimateIn variant="fadeUp">
              <div
                className="rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
                style={{
                  background: `linear-gradient(135deg, ${NAVY} 0%, #0a2a5c 100%)`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,158,219,0.15)", border: `1px solid ${PRIMARY}33` }}
                  >
                    <Building2 size={22} style={{ color: PRIMARY }} />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg mb-1">
                      Are you an NGO or humanitarian organization?
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed max-w-xl">
                      Register your beneficiaries through the WDC platform and receive transparent, tracked
                      donations directly to your field operations.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <Link
                    to="/disaster-heroes/organizations/register"
                    className="inline-flex items-center gap-2 font-black text-sm px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{ background: PRIMARY, color: "#fff" }}
                  >
                    Register Your Organization <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/disaster-heroes/organizations"
                    className="inline-flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      color: "#fff",
                    }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section style={{ background: "#fff", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: PRIMARY }}>
                Built on Trust
              </p>
              <h2 className="text-3xl font-black mb-3" style={{ color: NAVY }}>
                Every case is verified by WDC field teams
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                We never publish a case without a physical field visit, identity confirmation, and ongoing
                monitoring. Your contribution goes where it is needed — transparently.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-10">
            {[
              {
                icon: <Shield size={22} style={{ color: PRIMARY }} />,
                title: "ID Verification",
                desc: "Every beneficiary's identity is confirmed by a WDC field officer using official documentation.",
              },
              {
                icon: <Activity size={22} style={{ color: PRIMARY }} />,
                title: "Field Visit",
                desc: "A physical visit to the family's location is conducted before any case is published.",
              },
              {
                icon: <CheckCircle size={22} style={{ color: PRIMARY }} />,
                title: "Ongoing Monitoring",
                desc: "Field officers check in monthly and post updates so sponsors can follow real progress.",
              },
            ].map((p, i) => (
              <AnimateIn key={p.title} variant="fadeUp" delay={0.07 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-2xl p-6 text-center h-full"
                  style={{ background: BG, border: "1px solid #e5e7eb" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "#EFF9FF" }}
                  >
                    {p.icon}
                  </div>
                  <h3 className="font-black mb-2" style={{ color: NAVY, fontSize: 15 }}>{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #0a1f42 100%)`,
          paddingTop: "3.5rem",
          paddingBottom: "3.5rem",
        }}
      >
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">Ready to become a Disaster Hero?</h2>
                <p className="text-white/50 text-sm">
                  Join {activeDonors.toLocaleString()} sponsors making a direct difference for families in crisis.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={scrollToGrid}
                  className="inline-flex items-center gap-2 font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ background: PRIMARY, color: "#fff" }}
                >
                  Browse Open Cases <ArrowRight size={14} />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "#fff",
                  }}
                >
                  Talk to WDC Team
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
