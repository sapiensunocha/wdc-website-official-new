import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart2, Users, ArrowRight, ExternalLink,
  BookOpen, ChevronRight, ChevronDown,
} from "lucide-react";
import AnimateIn from "./AnimateIn";
import GVIBookReader from "./GVIBookReader";
import CrisisAtlasDashboard from "./CrisisAtlasDashboard";
import RosterPortalDashboard from "./RosterPortalDashboard";

import nostraImg from "../assets/images/cases/nostra.png";
import crisisImg from "../assets/images/cases/weeklydashboard.png";
import rosterImg from "../assets/images/cases/global_roster.png";

// ─── Live stat ticker from Michael API ─────────────────────────────────────────
const MICHAEL_URL = import.meta.env.VITE_MICHAEL_API_URL || "https://michael-api-382117221028.us-central1.run.app";
const MICHAEL_KEY = import.meta.env.VITE_MICHAEL_API_SECRET || "xeltis-prod-key-2026";

function useLiveStats() {
  const [stats, setStats] = useState({ disasters: 47, affected: "2.3M", countries: 38 });
  useEffect(() => {
    fetch(`${MICHAEL_URL}/api/alerts`, { headers: { "X-API-Key": MICHAEL_KEY } })
      .then(r => r.json())
      .then(json => {
        const events   = Array.isArray(json) ? json : (json.events ?? []);
        const total    = json.total ?? events.length;
        const countries = new Set(events.map(e => e.location_name).filter(Boolean)).size;
        const affected  = events.reduce((s, e) => s + (Number(e.people_affected) || 0), 0);
        setStats({
          disasters: total,
          affected: affected > 1_000_000 ? `${(affected / 1_000_000).toFixed(1)}M`
                  : affected > 1000     ? `${(affected / 1000).toFixed(0)}k`
                  : String(affected || "2.3M"),
          countries: countries || 38,
        });
      })
      .catch(() => {});
  }, []);
  return stats;
}

// ─── Product card ───────────────────────────────────────────────────────────────
function ProductCard({ product, index, active, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className="flex flex-col rounded-2xl overflow-hidden border bg-white group cursor-pointer"
      style={{
        borderColor: active ? product.glowColor : "#E2E8F0",
        boxShadow: active
          ? `0 0 0 2px ${product.glowColor}44, 0 8px 32px ${product.glowColor}22`
          : hovered
            ? "0 8px 32px rgba(0,0,0,0.10)"
            : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.25s, border-color 0.25s",
      }}
    >
      {/* Preview image */}
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, transparent 40%, rgba(255,255,255,0.95) 100%),
                       linear-gradient(135deg, ${product.glowColor}11 0%, transparent 60%)`
        }} />

        {/* Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-white shadow-sm"
            style={{ color: product.glowColor, border: `1px solid ${product.glowColor}33` }}>
            {product.live && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: product.glowColor }} />}
            {product.badge}
          </span>
        </div>

        {/* Icon */}
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center bg-white shadow-sm"
          style={{ border: `1px solid ${product.glowColor}33` }}>
          <product.Icon size={16} style={{ color: product.glowColor }} />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-black text-lg mb-1.5 leading-snug" style={{ color: "#0D1F2D" }}>{product.name}</h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#475569" }}>{product.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y" style={{ borderColor: "#E2E8F0" }}>
          {product.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-black text-base leading-none mb-1" style={{ color: product.glowColor }}>{s.value}</div>
              <div className="text-[10px] uppercase tracking-wide leading-tight" style={{ color: "#94A3B8" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {product.external ? (
          <a href={product.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
            style={{ color: product.glowColor }}
            onClick={e => e.stopPropagation()}>
            {product.cta} <ExternalLink size={14} />
          </a>
        ) : (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold" style={{ color: product.glowColor }}>
              {product.cta} <ArrowRight size={14} />
            </span>
            {active && (
              <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: product.glowColor + "15", color: product.glowColor }}>
                <ChevronDown size={12} /> Open
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────────
export default function GlobalProducts() {
  const liveStats   = useLiveStats();
  const [active, setActive] = useState(null); // null | "nostradamus" | "crisis" | "roster"
  const [gviOpen, setGviOpen] = useState(false);
  const dashboardRef = useRef(null);

  const toggle = (key) => setActive(prev => prev === key ? null : key);

  // Scroll the expanded dashboard into view
  useEffect(() => {
    if (active && active !== "nostradamus" && dashboardRef.current) {
      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [active]);

  const products = [
    {
      key: "nostradamus",
      name: "Nostradamus",
      badge: "Monthly Intelligence",
      live: true,
      external: false,
      image: nostraImg,
      glowColor: "#009EDB",
      Icon: BookOpen,
      description:
        "Monthly global disaster intelligence with 30-day projections, regional risk rankings, and an executive action plan. The definitive briefing for decision-makers and humanitarian leaders.",
      stats: [
        { value: "195",    label: "Countries" },
        { value: "53",     label: "Pages" },
        { value: "30-day", label: "Outlook" },
      ],
      cta: "Read the Report",
    },
    {
      key: "crisis",
      name: "Crisis Atlas",
      badge: "Live Weekly",
      live: true,
      external: false,
      image: crisisImg,
      glowColor: "#f97316",
      Icon: BarChart2,
      description:
        "Real-time global disaster tracking updated every week. Monitor active emergencies, projected events, fatalities, displaced persons, and economic losses — all on one interactive dashboard.",
      stats: [
        { value: liveStats.affected,  label: "Affected" },
        { value: liveStats.countries, label: "Countries" },
        { value: "Weekly",            label: "Updates" },
      ],
      cta: "Open Dashboard",
    },
    {
      key: "roster",
      name: "Global Disaster Roster Portal",
      badge: "Expert Network",
      live: true,
      external: false,
      image: rosterImg,
      glowColor: "#22c55e",
      Icon: Users,
      description:
        "Connecting vetted humanitarian professionals, organisations, and companies worldwide. Rapid deployment, transparent funding flows, and a global talent network — ready when disaster strikes.",
      stats: [
        { value: "2,000+", label: "Experts" },
        { value: "47",     label: "Countries" },
        { value: "72h",    label: "Deploy time" },
      ],
      cta: "Open Portal",
    },
  ];

  return (
    <>
      <section className="py-16 sm:py-24 bg-white">
        <div className="container">

          {/* Section header */}
          <AnimateIn variant="fadeUp">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-black tracking-widest uppercase">Global Products</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-3" style={{ color: "#0D1F2D" }}>
                Intelligence Tools Built<br className="hidden sm:block" /> for the Real World
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "#475569" }}>
                From monthly strategic intelligence to real-time disaster dashboards and expert deployment networks —
                WDC's products give decision-makers the insight and connections they need before the next crisis strikes.
              </p>
            </div>
          </AnimateIn>

          {/* Product cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <ProductCard
                key={product.key}
                product={product}
                index={i}
                active={active === product.key}
                onClick={() => {
                  if (product.key === "nostradamus") {
                    setGviOpen(true);
                  } else {
                    toggle(product.key);
                  }
                }}
              />
            ))}
          </div>

          {/* ── Inline expanded dashboard ── */}
          <div ref={dashboardRef}>
            <AnimatePresence>
              {active === "crisis" && (
                <motion.div
                  key="crisis"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <CrisisAtlasDashboard onClose={() => setActive(null)} />
                </motion.div>
              )}
              {active === "roster" && (
                <motion.div
                  key="roster"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <RosterPortalDashboard onClose={() => setActive(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom CTA strip */}
          <AnimateIn variant="fadeUp" delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-2xl border"
              style={{ borderColor: "#E2E8F0", background: "#F8FAFB" }}>
              <div>
                <p className="font-bold text-sm" style={{ color: "#0D1F2D" }}>Need a customised intelligence briefing?</p>
                <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>WDC analysts deliver bespoke reports for governments, NGOs, and the private sector.</p>
              </div>
              <Link
                to="/contact"
                className="flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-80"
                style={{ background: "#009EDB" }}
              >
                Request a Briefing <ChevronRight size={15} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* GVI Book Reader — full-screen (intentional for a report reader) */}
      {gviOpen && <GVIBookReader onClose={() => setGviOpen(false)} />}
    </>
  );
}
