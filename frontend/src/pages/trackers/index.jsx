import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  AlertTriangle,
  HandHeart,
  FileText,
  Thermometer,
  Globe,
  Zap,
  BarChart2,
  Cpu,
  ArrowRight,
  Radio,
} from "lucide-react";
import AnimateIn from "../../components/AnimateIn";

const TRACKERS = [
  {
    id: "disasters",
    href: "/trackers/disasters",
    icon: AlertTriangle,
    accentColor: "#EF4444",
    accentBg: "rgba(239,68,68,0.1)",
    borderColor: "border-red-500/30",
    label: "LIVE",
    labelColor: "bg-red-500",
    title: "Active Disasters Tracker",
    description:
      "Real-time monitoring of earthquakes, floods, conflicts, disease outbreaks, and climate emergencies worldwide. Powered by Michael AI with continuous alert ingestion.",
    stat: "50+ alerts monitored",
  },
  {
    id: "aid",
    href: "/trackers/aid",
    icon: HandHeart,
    accentColor: "#F59E0B",
    accentBg: "rgba(245,158,11,0.1)",
    borderColor: "border-amber-500/30",
    label: "Updated",
    labelColor: "bg-amber-500",
    title: "Aid & Response Tracker",
    description:
      "Tracking humanitarian funding gaps, active response operations, and aid delivery accountability across the world's most critical crises.",
    stat: "$2.3M in funds tracked",
  },
  {
    id: "policy",
    href: "/trackers/policy",
    icon: FileText,
    accentColor: "#009EDB",
    accentBg: "rgba(0,158,219,0.1)",
    borderColor: "border-sky-500/30",
    label: "Updated",
    labelColor: "bg-sky-500",
    title: "DRR Policy Tracker",
    description:
      "Monitoring disaster risk reduction legislation, Sendai Framework compliance, and government accountability across 30+ countries.",
    stat: "30+ countries tracked",
  },
  {
    id: "climate",
    href: "/trackers/climate",
    icon: Thermometer,
    accentColor: "#10B981",
    accentBg: "rgba(16,185,129,0.1)",
    borderColor: "border-emerald-500/30",
    label: "LIVE",
    labelColor: "bg-emerald-500",
    title: "Climate Disaster Tracker",
    description:
      "Tracking climate-linked disaster trends, hotspot mapping, temperature anomalies, and decadal comparisons powered by Michael's prediction engine.",
    stat: "+1.8°C above baseline",
  },
];

const STATS = [
  { icon: Globe, value: "30+", label: "Countries Monitored" },
  { icon: Radio, value: "Real-Time", label: "Data Feeds" },
  { icon: BarChart2, value: "4", label: "Active Trackers" },
  { icon: Cpu, value: "Michael", label: "AI Intelligence" },
];

export default function TrackersIndexPage() {
  return (
    <>
      <Helmet>
        <title>WDC Intelligence Trackers | World Disaster Center</title>
        <meta
          name="description"
          content="World Disaster Center's live intelligence trackers: Active Disasters, Aid & Response, DRR Policy, and Climate Disaster data — powered by Michael AI."
        />
        <meta property="og:title" content="WDC Intelligence Trackers" />
        <meta
          property="og:description"
          content="Real-time disaster intelligence across 4 specialized trackers powered by Michael AI."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0D1B26] text-white font-mono">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#1C2B39] border-b border-white/10">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,158,219,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,158,219,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
            <AnimateIn variant="fadeUp" delay={0}>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-[#009EDB] animate-pulse" />
                <span className="text-[#009EDB] text-xs tracking-[0.25em] uppercase">
                  WDC Intelligence Platform
                </span>
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                WDC Intelligence{" "}
                <span className="text-[#009EDB]">Trackers</span>
              </h1>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.2}>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                Live, curated disaster intelligence across active emergencies,
                humanitarian aid, policy compliance, and climate risk — powered
                by the Michael AI engine.
              </p>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.3}>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  SYSTEM ACTIVE
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-xs text-gray-400 tracking-widest">
                  LAST SYNC: {new Date().toUTCString().toUpperCase()}
                </span>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="border-b border-white/10 bg-[#152130]">
          <div className="max-w-6xl mx-auto px-6 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map(({ icon: Icon, value, label }, i) => (
                <AnimateIn key={label} variant="fadeUp" delay={i * 0.07}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[#009EDB]/10 border border-[#009EDB]/20">
                      <Icon className="w-4 h-4 text-[#009EDB]" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm leading-none">
                        {value}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">{label}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tracker Cards ── */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <AnimateIn variant="fadeUp" delay={0}>
            <p className="text-[#009EDB] text-xs tracking-[0.2em] uppercase mb-2">
              Select a tracker
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
              Intelligence Modules
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-6">
            {TRACKERS.map(
              (
                {
                  href,
                  icon: Icon,
                  accentColor,
                  accentBg,
                  borderColor,
                  label,
                  labelColor,
                  title,
                  description,
                  stat,
                },
                i
              ) => (
                <AnimateIn key={href} variant="fadeUp" delay={i * 0.1}>
                  <Link to={href} className="block group h-full">
                    <div
                      className={`h-full relative rounded-xl border ${borderColor} bg-[#1C2B39] p-7 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                      style={{
                        boxShadow: `0 0 0 0 ${accentColor}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 30px 0 ${accentColor}22`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className="p-3 rounded-lg"
                          style={{ background: accentBg }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: accentColor }}
                          />
                        </div>
                        <span
                          className={`${labelColor} text-white text-[10px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full flex items-center gap-1.5`}
                        >
                          {label === "LIVE" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          )}
                          {label}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#009EDB] transition-colors">
                        {title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
                        {description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span
                          className="text-xs font-mono"
                          style={{ color: accentColor }}
                        >
                          {stat}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-white transition-colors">
                          <span>Launch tracker</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              )
            )}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="border-t border-white/10 bg-[#152130]">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <AnimateIn variant="fadeUp" delay={0}>
              <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#009EDB]" />
                How WDC Intelligence Works
              </h2>
            </AnimateIn>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Ingest",
                  desc: "Michael continuously ingests alerts from GDACS, ReliefWeb, OCHA, government feeds, and local partners — 24/7.",
                },
                {
                  step: "02",
                  title: "Analyze",
                  desc: "AI-assisted triage categorizes severity, cross-references geolocation, and flags underreported emergencies.",
                },
                {
                  step: "03",
                  title: "Deliver",
                  desc: "Structured intelligence delivered through these trackers, Michael Chat, and WDC partner API integrations.",
                },
              ].map(({ step, title, desc }, i) => (
                <AnimateIn key={step} variant="fadeUp" delay={i * 0.1}>
                  <div className="flex gap-4">
                    <span className="text-3xl font-bold text-[#009EDB]/20 leading-none select-none">
                      {step}
                    </span>
                    <div>
                      <h3 className="text-white font-bold mb-2">{title}</h3>
                      <p className="text-gray-400 text-sm font-sans leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <AnimateIn variant="zoomIn" delay={0}>
              <div className="inline-block p-8 rounded-2xl border border-[#009EDB]/20 bg-[#1C2B39]">
                <Cpu className="w-10 h-10 text-[#009EDB] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-3">
                  Need Deeper Intelligence?
                </h2>
                <p className="text-gray-400 font-sans text-sm max-w-md mb-6">
                  Launch the Michael AI Dashboard for natural-language queries,
                  custom alerts, and direct access to WDC's full intelligence
                  pipeline.
                </p>
                <Link
                  to="/michael-chat"
                  className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#007ab8] text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  <Cpu className="w-4 h-4" />
                  Launch Michael Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>
      </div>
    </>
  );
}
