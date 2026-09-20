import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Shield, CheckCircle, Share2, Lock,
  MapPin, Calendar, Heart, Zap, AlertTriangle, RefreshCw, ExternalLink,
} from "lucide-react";
import SEOMeta from "../../../components/SEOMeta";
import AnimateIn from "../../../components/AnimateIn";
import { CRISIS_CASES } from "../../../assets/data/crisis-cases";

const MICHAEL_URL = import.meta.env.VITE_MICHAEL_API_URL || "https://michael-api-lzjl4ttoxq-uc.a.run.app";
const MICHAEL_KEY = import.meta.env.VITE_MICHAEL_API_SECRET || "xeltis-prod-key-2026";

const SEV_COLOR = { 5: "#EF4444", 4: "#F97316", 3: "#F59E0B", 2: "#22c55e", 1: "#94A3B8" };
const SEV_LABEL = { 5: "Critical", 4: "High", 3: "Moderate", 2: "Low", 1: "Minimal" };

function normType(raw) {
  if (!raw) return "Crisis";
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

function MichaelPanel({ country }) {
  const [alerts, setAlerts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  const load = () => {
    setLoading(true); setError(false);
    fetch(`${MICHAEL_URL}/api/alerts`, { headers: { "X-API-Key": MICHAEL_KEY } })
      .then(r => r.json())
      .then(data => {
        const raw = Array.isArray(data) ? data : (data.events ?? []);
        const matched = raw.filter(a => {
          const loc = (a.location_name || "").toLowerCase();
          const cLow = country.toLowerCase();
          return loc.includes(cLow) || cLow.includes(loc.split(" ")[0]);
        });
        setAlerts(matched.sort((a, b) => (b.severity_level || 0) - (a.severity_level || 0)).slice(0, 6));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [country]);

  const criticals = alerts.filter(a => a.severity_level >= 4).length;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0a0f1e", border: "1px solid rgba(251,191,36,0.2)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(251,191,36,0.12)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "rgba(251,191,36,0.15)" }}
          >
            <Zap size={12} style={{ color: "#fbbf24" }} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#fbbf24" }}>MICHAEL AI</p>
            <p className="text-white/40 text-[9px]">Live Intelligence · {country}</p>
          </div>
        </div>
        <button
          onClick={load}
          title="Refresh"
          className="text-white/30 hover:text-white/60 transition-colors"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        {loading && (
          <div className="flex items-center gap-2 py-3">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-white/40 text-xs">Fetching live intelligence…</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 py-3 text-white/40 text-xs">
            <AlertTriangle size={12} /> Unable to load MICHAEL data.
          </div>
        )}
        {!loading && !error && alerts.length === 0 && (
          <div className="py-3">
            <p className="text-white/40 text-xs">No active MICHAEL alerts for {country} right now.</p>
          </div>
        )}
        {!loading && alerts.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-white text-xs font-black">{alerts.length}</span>
                <span className="text-white/40 text-[10px]">alerts in region</span>
              </div>
              {criticals > 0 && (
                <span
                  className="text-[9px] font-black px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(239,68,68,0.2)", color: "#f87171" }}
                >
                  {criticals} CRITICAL
                </span>
              )}
            </div>
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <div
                  key={a.event_id || i}
                  className="rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-white text-[11px] font-bold leading-snug">{normType(a.event_type)}</span>
                    <span
                      className="text-[9px] font-black px-1.5 py-0.5 rounded shrink-0"
                      style={{ background: SEV_COLOR[a.severity_level] + "25", color: SEV_COLOR[a.severity_level] || "#94a3b8" }}
                    >
                      {SEV_LABEL[a.severity_level] || "Unknown"}
                    </span>
                  </div>
                  {a.location_name && (
                    <p className="text-white/40 text-[10px]">📍 {a.location_name}</p>
                  )}
                  {a.alert_message && (
                    <p className="text-white/30 text-[10px] mt-1 leading-snug line-clamp-2">{a.alert_message}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <a
          href="https://michael.worlddisastercenter.org"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-1.5 w-full text-[10px] font-black uppercase tracking-wider py-2 rounded-xl transition-opacity hover:opacity-70"
          style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24" }}
        >
          Full MICHAEL Dashboard <ExternalLink size={9} />
        </a>
      </div>
    </div>
  );
}

// ─── Design Tokens ────────────────────────────────────────────────────────────
const PRIMARY = "#009EDB";
const NAVY    = "#001129";
const BG      = "#F8FAFC";

const URGENCY_COLOR = {
  critical: "#EF4444",
  high:     "#F97316",
  moderate: "#009EDB",
};

const CATEGORY_ICONS = {
  health:    { icon: "💊", label: "Health" },
  education: { icon: "📚", label: "Education" },
  shelter:   { icon: "🏠", label: "Shelter" },
};

function pct(funded, goal) {
  return Math.min(100, Math.round((funded / goal) * 100));
}

// ─── Sponsor Sidebar Card ─────────────────────────────────────────────────────
function SponsorCard({ c }) {
  const PRESET_AMOUNTS = [5, 10, 15, 25, 50];
  const CATEGORIES = ["health", "education", "shelter", "all"];

  const [amount, setAmount]           = useState(10);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom]       = useState(false);
  const [category, setCategory]       = useState("all");
  const [shared, setShared]           = useState(false);

  const finalAmount = isCustom ? Number(customAmount) || 0 : amount;
  const funded      = pct(c.fundedMonthly, c.monthlyGoal);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `Sponsor ${c.name} on WDC`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden sticky top-24"
      style={{ background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0a2a5c 100%)` }}
      >
        <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: PRIMARY }}>
          Sponsor {c.name}
        </p>
        <p className="text-white text-sm leading-snug">
          {c.flag} {c.country} · {c.crisisType}
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-500 font-medium">Monthly funding</span>
            <span className="text-xs font-black" style={{ color: PRIMARY }}>{funded}%</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: "#e5e7eb" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${funded}%`, background: PRIMARY }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            ${c.fundedMonthly} of ${c.monthlyGoal}/mo · {c.sponsors} sponsor{c.sponsors !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Amount selector */}
        <div>
          <p className="text-xs font-black mb-2" style={{ color: NAVY }}>Monthly amount</p>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {PRESET_AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => { setAmount(a); setIsCustom(false); setCustomAmount(""); }}
                className="py-2 rounded-xl text-xs font-black transition-all"
                style={
                  !isCustom && amount === a
                    ? { background: PRIMARY, color: "#fff" }
                    : { background: "#f1f5f9", color: "#334155" }
                }
              >
                ${a}
              </button>
            ))}
            <button
              onClick={() => setIsCustom(true)}
              className="py-2 rounded-xl text-xs font-black transition-all"
              style={
                isCustom
                  ? { background: PRIMARY, color: "#fff" }
                  : { background: "#f1f5f9", color: "#334155" }
              }
            >
              Custom
            </button>
          </div>
          {isCustom && (
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black"
                style={{ color: PRIMARY }}
              >
                $
              </span>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-7 pr-4 py-2.5 text-sm rounded-xl outline-none focus:ring-2"
                style={{ background: "#f8fafc", border: `1px solid ${PRIMARY}55` }}
              />
            </div>
          )}
        </div>

        {/* Category selector */}
        <div>
          <p className="text-xs font-black mb-2" style={{ color: NAVY }}>Allocate to</p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => {
              const info = cat === "all" ? { icon: "🌐", label: "All Needs" } : CATEGORY_ICONS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                  style={
                    category === cat
                      ? { background: PRIMARY + "18", border: `1px solid ${PRIMARY}55`, color: NAVY }
                      : { background: "#f8fafc", border: "1px solid #e5e7eb", color: "#64748b" }
                  }
                >
                  <span>{info.icon}</span>
                  <span>{info.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sponsor CTA */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-white text-sm transition-all hover:shadow-lg"
          style={{ background: PRIMARY }}
        >
          <Heart size={15} fill="white" />
          Sponsor {c.name} · ${finalAmount}/mo
        </motion.button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
          style={{ background: "#f1f5f9", color: "#334155" }}
        >
          <Share2 size={14} />
          {shared ? "Link copied!" : "Share this case"}
        </button>

        {/* Trust badges */}
        <div className="space-y-2 pt-1">
          {[
            { icon: <Shield size={12} style={{ color: PRIMARY }} />, text: "WDC Verified" },
            { icon: <MapPin size={12} style={{ color: PRIMARY }} />,  text: "Field Visit Completed" },
            { icon: <CheckCircle size={12} style={{ color: PRIMARY }} />, text: "ID Confirmed" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2">
              {b.icon}
              <span className="text-[11px] text-gray-500">{b.text}</span>
            </div>
          ))}
        </div>

        {/* Small print */}
        <div
          className="pt-3 space-y-1"
          style={{ borderTop: "1px solid #f1f5f9" }}
        >
          {[
            { icon: <Lock size={10} />, text: "Stripe secured payment" },
            { icon: <CheckCircle size={10} />, text: "Cancel anytime, no fees" },
            { icon: <Heart size={10} />, text: "Funds go directly to beneficiary" },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-1.5 text-gray-400">
              {t.icon}
              <span className="text-[10px]">{t.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MICHAEL wrapper that receives country prop ───────────────────────────────
function MichaelPanelWrapper({ country }) {
  return <MichaelPanel country={country} />;
}

// ─── Case Detail Page ─────────────────────────────────────────────────────────
export default function DisasterHeroesCase() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const c        = CRISIS_CASES.find((x) => x.id === id);

  if (!c) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: BG }}
      >
        <p className="text-2xl font-black" style={{ color: NAVY }}>Case not found.</p>
        <Link
          to="/disaster-heroes"
          className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-sm"
          style={{ background: PRIMARY, color: "#fff" }}
        >
          <ArrowLeft size={14} /> Back to cases
        </Link>
      </div>
    );
  }

  const accentColor = URGENCY_COLOR[c.urgency];

  return (
    <>
      <SEOMeta
        title={`Sponsor ${c.name} in ${c.country} | WDC Disaster Heroes`}
        description={c.story.slice(0, 160)}
        image={c.photo}
        url={`/disaster-heroes/case/${c.id}`}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: 360 }}>
        {/* Urgency stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 z-30" style={{ backgroundColor: accentColor }} />

        <div className="absolute inset-0">
          <img
            src={c.photo}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(0.5) brightness(0.25)" }}
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,17,41,0.97) 0%, rgba(0,17,41,0.85) 60%, rgba(0,158,219,0.10) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        </div>

        <div className="container relative pt-24 pb-16 sm:pt-28 sm:pb-20">
          <AnimateIn variant="fadeUp">
            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white font-bold text-xs mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Back to cases
            </button>

            <div className="flex flex-wrap items-start gap-4">
              {/* Flag + meta */}
              <div className="flex items-center gap-3">
                <span className="text-5xl">{c.flag}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{ background: accentColor + "22", border: `1px solid ${accentColor}55`, color: accentColor }}
                    >
                      {c.urgency.toUpperCase()}
                    </span>
                    <span
                      className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
                    >
                      WDC Verified
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    {c.name}, {c.age}
                  </h1>
                  <p className="text-white/60 text-sm mt-1">
                    {c.country} · {c.region} · {c.crisisType}
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ background: BG, paddingBottom: "5rem" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── LEFT: Story + details ── (2/3) */}
            <div className="lg:col-span-2 space-y-8 pt-8">

              {/* Story */}
              <AnimateIn variant="fadeUp">
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#fff", border: "1px solid #e5e7eb" }}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.2em] mb-3"
                    style={{ color: PRIMARY }}
                  >
                    Their Story
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">{c.story}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
                    {[
                      { icon: <MapPin size={14} style={{ color: PRIMARY }} />, label: "Region", value: c.region },
                      { icon: <Calendar size={14} style={{ color: PRIMARY }} />, label: "Case opened", value: new Date(c.since).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) },
                      { icon: <Shield size={14} style={{ color: PRIMARY }} />, label: "Verified by", value: c.verifiedBy },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl p-3"
                        style={{ background: BG, border: "1px solid #e5e7eb" }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">{m.icon}<span className="text-[10px] text-gray-400 uppercase tracking-wider">{m.label}</span></div>
                        <p className="text-xs font-bold" style={{ color: NAVY }}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              {/* Needs breakdown */}
              <AnimateIn variant="fadeUp" delay={0.05}>
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#fff", border: "1px solid #e5e7eb" }}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                    style={{ color: PRIMARY }}
                  >
                    Needs Breakdown
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                          <th className="text-left py-2 pr-4 text-xs font-black" style={{ color: NAVY }}>Need</th>
                          <th className="text-left py-2 pr-4 text-xs font-black" style={{ color: NAVY }}>Monthly</th>
                          <th className="text-left py-2 text-xs font-black" style={{ color: NAVY }}>What it covers</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(c.needs).map(([need, amt], i) => {
                          const descriptions = {
                            health:    "Clinic visits, medication, health screening",
                            education: "School fees, books, supplies, tutoring",
                            shelter:   "Repairs, rental subsidy, emergency materials",
                          };
                          return (
                            <tr
                              key={need}
                              style={{ borderBottom: i < Object.keys(c.needs).length - 1 ? "1px solid #f8fafc" : "none" }}
                            >
                              <td className="py-3 pr-4">
                                <span className="flex items-center gap-2 font-bold" style={{ color: NAVY }}>
                                  {CATEGORY_ICONS[need].icon} {CATEGORY_ICONS[need].label}
                                </span>
                              </td>
                              <td className="py-3 pr-4">
                                <span className="font-black text-sm" style={{ color: PRIMARY }}>${amt}/mo</span>
                              </td>
                              <td className="py-3 text-gray-500 text-xs">{descriptions[need]}</td>
                            </tr>
                          );
                        })}
                        <tr style={{ borderTop: "2px solid #f1f5f9" }}>
                          <td className="py-3 pr-4 font-black text-xs" style={{ color: NAVY }}>Total</td>
                          <td className="py-3 font-black" style={{ color: PRIMARY }}>
                            ${Object.values(c.needs).reduce((a, b) => a + b, 0)}/mo
                          </td>
                          <td className="py-3 text-gray-400 text-xs">Full needs coverage</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AnimateIn>

              {/* Updates feed */}
              <AnimateIn variant="fadeUp" delay={0.08}>
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "#fff", border: "1px solid #e5e7eb" }}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.2em] mb-5"
                    style={{ color: PRIMARY }}
                  >
                    Field Updates
                  </p>
                  <div className="space-y-5">
                    {(c.updates || []).map((u, i) => (
                      <div key={i} className="flex gap-4">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center gap-1 shrink-0">
                          <div
                            className="w-3 h-3 rounded-full mt-0.5 shrink-0"
                            style={{ background: PRIMARY }}
                          />
                          {i < (c.updates.length - 1) && (
                            <div className="flex-1 w-px" style={{ background: "#e5e7eb", minHeight: 32 }} />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: "#94a3b8" }}>
                            {new Date(u.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">{u.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              {/* Photo gallery placeholder */}
              <AnimateIn variant="fadeUp" delay={0.1}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid #e5e7eb" }}
                >
                  <div className="relative" style={{ height: 200 }}>
                    <img
                      src={c.photo}
                      alt="Case community photo"
                      className="w-full h-full object-cover"
                      style={{ filter: "saturate(0.75) brightness(0.7)" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="px-5 py-3 rounded-2xl text-center"
                        style={{ background: "rgba(0,17,41,0.7)", backdropFilter: "blur(8px)" }}
                      >
                        <p className="text-white font-black text-sm">Community Context Photo</p>
                        <p className="text-white/60 text-xs mt-0.5">Field team documentation</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1" style={{ background: "#f8fafc" }}>
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="flex items-center justify-center text-gray-300 text-xs"
                        style={{ height: 70, background: "#e5e7eb", borderRadius: 4 }}
                      >
                        Photo {n + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* ── RIGHT: Sticky sponsor card + MICHAEL intel ── (1/3) */}
            <div className="lg:col-span-1 pt-8 flex flex-col gap-5">
              <AnimateIn variant="fadeRight" delay={0.1}>
                <SponsorCard c={c} />
              </AnimateIn>
              <AnimateIn variant="fadeRight" delay={0.18}>
                <MichaelPanel country={c.country} />
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Similar Cases ── */}
      <section style={{ background: "#0a1628", paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p
              className="text-[10px] font-black uppercase tracking-[0.2em] mb-2"
              style={{ color: PRIMARY }}
            >
              Other Open Cases
            </p>
            <h2 className="text-2xl font-black text-white mb-6">Continue Exploring</h2>
          </AnimateIn>
          <div className="flex flex-wrap gap-3">
            {CRISIS_CASES.filter((x) => x.id !== c.id)
              .slice(0, 4)
              .map((rel) => (
                <AnimateIn key={rel.id} variant="fadeUp" delay={0.05}>
                  <Link
                    to={`/disaster-heroes/case/${rel.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                    }}
                  >
                    {rel.flag} {rel.name}, {rel.country}
                  </Link>
                </AnimateIn>
              ))}
            <AnimateIn variant="fadeUp" delay={0.2}>
              <Link
                to="/disaster-heroes"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ background: PRIMARY, color: "#fff" }}
              >
                View All Cases
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
