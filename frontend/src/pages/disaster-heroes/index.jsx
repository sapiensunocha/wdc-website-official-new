import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, Shield, CheckCircle, Activity } from "lucide-react";
import SEOMeta from "../../components/SEOMeta";
import AnimateIn from "../../components/AnimateIn";
import { CRISIS_CASES } from "../../assets/data/crisis-cases";

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

// ─── Utility ──────────────────────────────────────────────────────────────────
function pct(funded, goal) {
  return Math.min(100, Math.round((funded / goal) * 100));
}

// ─── Case Card ────────────────────────────────────────────────────────────────
function CaseCard({ c, index }) {
  const funded = pct(c.fundedMonthly, c.monthlyGoal);
  const accentColor = URGENCY_COLOR[c.urgency];
  const minMonthly = Math.min(...Object.values(c.needs));

  return (
    <AnimateIn variant="fadeUp" delay={0.04 * index}>
      <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
        <Link
          to={`/disaster-heroes/case/${c.id}`}
          className="group block rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
          style={{ minHeight: 340, background: "#fff", border: "1px solid #e5e7eb" }}
        >
          {/* Urgency top stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 z-20" style={{ backgroundColor: accentColor }} />

          {/* Background image */}
          <div className="absolute inset-0" style={{ height: 160 }}>
            <img
              src={c.photo}
              alt=""
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              style={{ filter: "saturate(0.6) brightness(0.35)" }}
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(180deg, rgba(0,5,18,0.7) 0%, rgba(0,5,18,0.9) 100%)` }}
            />
          </div>

          {/* Image zone content */}
          <div className="relative z-10 p-4" style={{ height: 160, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Top row: flag + urgency badge */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{c.flag}</span>
                <div>
                  <p className="text-white font-black text-xs leading-tight">{c.country}</p>
                  <p className="text-white/60 text-[10px]">{c.region}</p>
                </div>
              </div>
              <span
                className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                style={{ background: accentColor + "22", border: `1px solid ${accentColor}55`, color: accentColor }}
              >
                {URGENCY_LABEL[c.urgency]}
              </span>
            </div>

            {/* Name + crisis type */}
            <div>
              <p className="text-white font-black text-base leading-tight">{c.name}, {c.age}</p>
              <p className="text-white/60 text-[10px] uppercase tracking-wider mt-0.5">{c.crisisType}</p>
            </div>
          </div>

          {/* Card body */}
          <div className="relative z-10 p-4" style={{ background: "#fff" }}>
            {/* Story excerpt */}
            <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 mb-3">
              {c.story}
            </p>

            {/* Needs chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {Object.entries(c.needs).map(([need, amt]) => (
                <span
                  key={need}
                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full"
                  style={{ background: "#f1f5f9", color: "#334155" }}
                >
                  {CATEGORY_ICONS[need]} {need.charAt(0).toUpperCase() + need.slice(1)} ${amt}/mo
                </span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-400 font-medium">Funded monthly</span>
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

            {/* CTA row */}
            <div
              className="flex items-center justify-between pt-3"
              style={{ borderTop: "1px solid #f1f5f9" }}
            >
              <span className="text-[11px] text-gray-400">
                From <strong className="text-gray-700">${minMonthly}/month</strong>
              </span>
              <span
                className="inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl transition-all group-hover:gap-2"
                style={{ background: PRIMARY, color: "#fff" }}
              >
                Sponsor {c.name} <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimateIn>
  );
}

// ─── How It Works Step ────────────────────────────────────────────────────────
function HowStep({ number, title, desc, icon }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{ background: "#fff", border: "1px solid #e5e7eb" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0"
          style={{ background: PRIMARY }}
        >
          {number}
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="font-black text-[#1C2B39] text-base">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DisasterHeroesHome() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const gridRef = useRef(null);

  const FILTERS = [
    { id: "all",       label: "All Cases" },
    { id: "health",    label: "Health" },
    { id: "education", label: "Education" },
    { id: "shelter",   label: "Shelter" },
    { id: "critical",  label: "Critical Only" },
  ];

  const filtered = CRISIS_CASES.filter((c) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "critical" && c.urgency === "critical") ||
      c.category.includes(activeFilter);

    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.crisisType.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEOMeta
        title="Disaster Heroes — Sponsor a Life in Crisis | WDC"
        description="For less than $25/month you can cover health, education, or shelter for a family in a disaster-prone region. Browse verified crisis cases and become a Disaster Hero."
        image="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/disaster-heroes"
      />

      {/* ── HERO ── */}
      <section className="text-white relative overflow-hidden" style={{ minHeight: 540 }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(0.5) brightness(0.28)" }}
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,17,41,0.97) 0%, rgba(0,17,41,0.88) 55%, rgba(0,158,219,0.14) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        </div>

        {/* Glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-[#009EDB]/8 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-blue-800/10 blur-3xl" />
        </div>

        <div className="container relative pt-28 pb-20 sm:py-28">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-5">
              <Shield size={18} style={{ color: PRIMARY }} />
              <span
                className="text-[10px] font-black uppercase tracking-[0.25em]"
                style={{ color: PRIMARY }}
              >
                WDC Disaster Heroes
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5 max-w-3xl">
              Become a Disaster Hero —{" "}
              <span style={{ color: PRIMARY }}>Sponsor a Life in Crisis</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-lg max-w-2xl leading-relaxed mb-8">
              For less than <strong className="text-white">$25/month</strong> you can cover health,
              education, or shelter for a family in a disaster-prone region. You choose who.
              You follow their journey.
            </p>

            {/* Stats bar */}
            <div
              className="inline-flex flex-wrap gap-4 sm:gap-8 px-5 py-3 rounded-2xl mb-8"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",
              }}
            >
              {[
                { value: "1,840", label: "Heroes Active" },
                { value: "142",   label: "Countries" },
                { value: "$25",   label: "avg/month" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-black text-lg sm:text-2xl leading-none">{s.value}</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider mt-0.5">{s.label}</p>
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
                Find Someone to Support <ArrowRight size={14} />
              </button>
              <Link
                to="/disaster-heroes/apply"
                className="inline-flex items-center gap-2 font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#fff",
                }}
              >
                Register Your Case
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: BG, paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p
              className="text-[10px] font-black uppercase tracking-[0.2em] mb-2"
              style={{ color: PRIMARY }}
            >
              Simple Process
            </p>
            <h2 className="text-3xl font-black mb-2" style={{ color: NAVY }}>
              How Disaster Heroes Works
            </h2>
            <p className="text-gray-500 mb-10 max-w-xl text-sm leading-relaxed">
              Direct, transparent, and impactful. Every step is verified by WDC field teams on the ground.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                number: 1,
                icon: "🔍",
                title: "Find a Case",
                desc: "Browse verified crisis cases by region, urgency, or need type. Every profile is confirmed by a WDC field officer on the ground.",
              },
              {
                number: 2,
                icon: "💳",
                title: "Choose Your Support",
                desc: "$5–$25+/month for health, education, or shelter. Pick the area where you want your contribution to go, or cover all three.",
              },
              {
                number: 3,
                icon: "📬",
                title: "Follow the Journey",
                desc: "Receive updates, photos, and progress reports as your contribution creates change. Earn Hero Badges as your impact grows.",
              },
            ].map((step, i) => (
              <AnimateIn key={step.number} variant="fadeUp" delay={0.07 * i}>
                <HowStep {...step} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section
        ref={gridRef}
        style={{ background: "#0a1628", paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p
              className="text-[10px] font-black uppercase tracking-[0.2em] mb-2"
              style={{ color: PRIMARY }}
            >
              Verified Cases
            </p>
            <h2 className="text-3xl font-black text-white mb-2">Open Cases — Choose Who to Support</h2>
            <p className="text-white/50 mb-8 max-w-xl text-sm leading-relaxed">
              Each case is personally verified by a WDC field officer. Your monthly contribution goes
              directly to meeting their specific needs.
            </p>
          </AnimateIn>

          {/* Filter bar */}
          <AnimateIn variant="fadeUp" delay={0.05}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className="text-xs font-bold px-4 py-2 rounded-full transition-all"
                    style={
                      activeFilter === f.id
                        ? { background: PRIMARY, color: "#fff" }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.7)",
                          }
                    }
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, country…"
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl text-white placeholder-white/30 outline-none focus:ring-1"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    focusRingColor: PRIMARY,
                  }}
                />
              </div>

              {/* Count */}
              <span className="text-white/40 text-xs ml-auto">
                Showing <strong className="text-white">{filtered.length}</strong> case{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </AnimateIn>

          {/* Cards grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((c, i) => (
                <CaseCard key={c.id} c={c} index={i} />
              ))}
            </div>
          ) : (
            <AnimateIn variant="fadeUp">
              <div
                className="text-center py-16 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p className="text-white/50 text-sm">No cases match your search. Try a different filter.</p>
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section style={{ background: BG, paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p
                className="text-[10px] font-black uppercase tracking-[0.2em] mb-2"
                style={{ color: PRIMARY }}
              >
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
                  style={{ background: "#fff", border: "1px solid #e5e7eb" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "#EFF9FF" }}
                  >
                    {p.icon}
                  </div>
                  <h3 className="font-black mb-2" style={{ color: NAVY, fontSize: 15 }}>
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn variant="fadeUp" delay={0.1}>
            <div className="text-center">
              <Link
                to="/disaster-heroes/apply"
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                style={{ background: PRIMARY, color: "#fff" }}
              >
                Apply to Register a Case <ArrowRight size={14} />
              </Link>
              <p className="text-gray-400 text-xs mt-3">
                Are you a field officer? <Link to="/disaster-heroes/login" className="underline" style={{ color: PRIMARY }}>Login here</Link>
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ── */}
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
                <h2 className="text-2xl font-black text-white mb-2">
                  Ready to become a Disaster Hero?
                </h2>
                <p className="text-white/50 text-sm">
                  Join 1,840 sponsors making a direct difference for families in crisis.
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
