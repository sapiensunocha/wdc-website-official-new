import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe, BarChart2, Users, ArrowRight, ExternalLink,
  Zap, Radio, BookOpen, ChevronRight, Activity
} from "lucide-react";
import AnimateIn from "./AnimateIn";

import nostraImg   from "../assets/images/cases/nostra.png";
import crisisImg   from "../assets/images/cases/weeklydashboard.png";
import rosterImg   from "../assets/images/cases/global_roster.png";

// ─── Live stat ticker pulled from Michael data ─────────────────────────────
function useLiveStats() {
  const [stats, setStats] = useState({ disasters: 47, affected: "2.3M", countries: 38 });
  useEffect(() => {
    // Lightweight ping to get current active disaster count
    const base = import.meta.env.VITE_API_BASE_URL || "https://wdc-backend-service-325766897035.us-central1.run.app";
    fetch(`${base}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Give me ONLY a JSON object (no explanation) with 3 fields: activeDisasters (number of current active disaster events worldwide), affectedPeople (string like '2.1M'), countriesAffected (number). Use your latest knowledge.",
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        const text = d.reply || d.message || "";
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            const parsed = JSON.parse(match[0]);
            setStats({
              disasters: parsed.activeDisasters ?? 47,
              affected: parsed.affectedPeople ?? "2.3M",
              countries: parsed.countriesAffected ?? 38,
            });
          } catch (_) {}
        }
      })
      .catch(() => {});
  }, []);
  return stats;
}

// ─── Single product card ────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-[#0d1321] group"
      style={{ boxShadow: hovered ? `0 24px 60px ${product.glowColor}33` : "0 4px 24px rgba(0,0,0,0.3)" }}
    >
      {/* Preview area */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "saturate(0.8) brightness(0.7)" }}
        />
        {/* gradient overlay */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, transparent 30%, #0d1321 100%),
                       linear-gradient(135deg, ${product.glowColor}22 0%, transparent 60%)`
        }} />

        {/* Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase"
            style={{ background: `${product.glowColor}22`, color: product.glowColor, border: `1px solid ${product.glowColor}55` }}
          >
            {product.live && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: product.glowColor }} />}
            {product.badge}
          </span>
          {product.comingSoon && (
            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-white/10 text-white/60 border border-white/15">
              Coming Soon
            </span>
          )}
        </div>

        {/* Icon */}
        <div
          className="absolute bottom-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${product.glowColor}22`, border: `1px solid ${product.glowColor}44` }}
        >
          <product.Icon size={18} style={{ color: product.glowColor }} />
        </div>
      </div>

      {/* Info area */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-white font-black text-xl mb-2 leading-snug">{product.name}</h3>
        <p className="text-white/55 text-sm leading-relaxed mb-5 flex-1">{product.description}</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-5 py-4 border-y border-white/10">
          {product.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-white font-black text-base leading-none mb-1" style={{ color: product.glowColor }}>{s.value}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-wide leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {product.comingSoon ? (
          <div className="flex items-center gap-2 text-white/30 text-sm font-bold cursor-default select-none">
            <Users size={14} /> Join Waitlist
          </div>
        ) : product.external ? (
          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
            style={{ color: product.glowColor }}
          >
            {product.cta} <ExternalLink size={14} />
          </a>
        ) : (
          <Link
            to={product.href}
            className="flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
            style={{ color: product.glowColor }}
          >
            {product.cta} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── Crisis Atlas live embed modal ─────────────────────────────────────────
function CrisisAtlasEmbed({ open, onClose }) {
  if (!open) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col"
        style={{ background: "rgba(5,8,20,0.95)" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[#009EDB]" />
            <span className="text-white text-xs font-black">Crisis Atlas — Weekly Disaster Dashboard</span>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white text-xs px-3 py-1.5 rounded bg-white/10 transition-colors">
            Close ✕
          </button>
        </div>
        <iframe
          src="https://public.tableau.com/views/WorldDisasterCentreReport-ActNowforTomorrow/WeeklyDashboard?:showVizHome=no&:embed=true&:toolbar=no"
          className="flex-1 w-full border-0"
          title="WDC Crisis Atlas"
          allowFullScreen
        />
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function GlobalProducts() {
  const liveStats = useLiveStats();
  const [atlasOpen, setAtlasOpen] = useState(false);

  const products = [
    {
      name: "Nostradamus",
      badge: "Monthly Intelligence",
      live: true,
      comingSoon: false,
      external: false,
      image: nostraImg,
      glowColor: "#009EDB",
      Icon: BookOpen,
      description:
        "Monthly global disaster intelligence with 30-day projections, regional risk rankings, and an executive action plan. The definitive briefing for decision-makers and humanitarian leaders.",
      stats: [
        { value: "195",        label: "Countries" },
        { value: liveStats.disasters, label: "Active events" },
        { value: "30-day",     label: "Outlook" },
      ],
      href: "/campaigns",
      cta: "Read the Report",
    },
    {
      name: "Crisis Atlas",
      badge: "Live Weekly",
      live: true,
      comingSoon: false,
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
      href: "#crisis-atlas",
      cta: "Open Dashboard",
      onCardClick: () => setAtlasOpen(true),
    },
    {
      name: "Global Disaster Roster Portal",
      badge: "Expert Network",
      live: true,
      comingSoon: false,
      external: false,
      image: rosterImg,
      glowColor: "#22c55e",
      Icon: Users,
      description:
        "Connecting vetted humanitarian professionals, organizations, and companies worldwide. Rapid deployment, transparent funding flows, and a global talent network — ready when disaster strikes.",
      stats: [
        { value: "2,000+", label: "Experts" },
        { value: "47",     label: "Countries" },
        { value: "72h",    label: "Deploy time" },
      ],
      href: "/roster",
      cta: "Explore the Portal",
    },
  ];

  return (
    <>
      <section className="py-16 sm:py-24" style={{ background: "#05081a" }}>
        <div className="container">

          {/* Section header */}
          <AnimateIn variant="fadeUp">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#009EDB] animate-pulse" />
                <span className="text-[#009EDB] text-xs font-black tracking-widest uppercase">Global Products</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                Intelligence Tools Built<br className="hidden sm:block" /> for the Real World
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                From monthly strategic intelligence to real-time disaster dashboards and expert deployment networks —
                WDC's products give decision-makers the insight and connections they need before the next crisis strikes.
              </p>
            </div>
          </AnimateIn>

          {/* Product cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <div
                key={product.name}
                onClick={product.onCardClick}
                style={{ cursor: product.onCardClick ? "pointer" : "default" }}
              >
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <AnimateIn variant="fadeUp" delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-2xl border border-white/10 bg-white/5">
              <div>
                <p className="text-white font-bold text-sm">Need a customised intelligence briefing?</p>
                <p className="text-white/40 text-xs mt-0.5">WDC analysts deliver bespoke reports for governments, NGOs, and the private sector.</p>
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

      {/* Crisis Atlas full-screen embed */}
      <CrisisAtlasEmbed open={atlasOpen} onClose={() => setAtlasOpen(false)} />
    </>
  );
}
