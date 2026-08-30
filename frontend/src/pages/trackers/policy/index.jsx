import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FileText,
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Globe,
  Users,
  BookOpen,
  ExternalLink,
  Building,
  Landmark,
  TrendingUp,
} from "lucide-react";
import AnimateIn from "../../../components/AnimateIn";

const SENDAI_COMPLIANCE = [
  { country: "🇯🇵 Japan", score: 94, tier: "EXCELLENT", change: "+2", priority: "Sendai host — model implementer" },
  { country: "🇩🇪 Germany", score: 87, tier: "GOOD", change: "+4", priority: "EU DRR framework alignment" },
  { country: "🇧🇩 Bangladesh", score: 79, tier: "GOOD", change: "+7", priority: "Cyclone early warning leader" },
  { country: "🇮🇳 India", score: 76, tier: "GOOD", change: "+3", priority: "National DM Act enforcement" },
  { country: "🇰🇪 Kenya", score: 68, tier: "MODERATE", change: "+5", priority: "NDMU capacity building" },
  { country: "🇳🇬 Nigeria", score: 61, tier: "MODERATE", change: "+8", priority: "NEMA legislative reform" },
  { country: "🇵🇭 Philippines", score: 73, tier: "GOOD", change: "+2", priority: "RA 10121 implementation" },
  { country: "🇧🇷 Brazil", score: 65, tier: "MODERATE", change: "-1", priority: "Defesa Civil restructuring" },
  { country: "🇭🇹 Haiti", score: 24, tier: "CRITICAL", change: "-3", priority: "Governance collapse, DGPC suspended" },
  { country: "🇾🇪 Yemen", score: 18, tier: "CRITICAL", change: "-5", priority: "Active conflict, no functioning DRR system" },
];

const RECENT_DEVELOPMENTS = [
  {
    date: "Aug 2026",
    country: "🇪🇺 EU",
    event: "European Disaster Resilience Act adopted",
    impact: "HIGH",
    description: "The EU Parliament passed the EDRA, mandating member states to maintain national DRR strategies aligned with Sendai Framework targets by 2027.",
  },
  {
    date: "Jul 2026",
    country: "🇳🇬 Nigeria",
    event: "NEMA Amendment Bill — Senate 3rd Reading",
    impact: "HIGH",
    description: "Nigeria's Senate passed amendments strengthening NEMA's mandate, adding climate adaptation provisions and increasing the emergency fund allocation by 60%.",
  },
  {
    date: "Jul 2026",
    country: "🇮🇳 India",
    event: "National Flood Early Warning System Launched",
    impact: "MEDIUM",
    description: "India's NDMA launched an integrated multi-hazard early warning system covering 520 districts, integrating satellite, river gauge, and social media data.",
  },
  {
    date: "Jun 2026",
    country: "🇨🇩 DRC",
    event: "DRR National Strategy adopted — first since 2010",
    impact: "MEDIUM",
    description: "DRC adopted its National Disaster Risk Reduction Strategy 2026–2030 with UNDP support, prioritizing volcanic, flood, and conflict-disaster interface risk.",
  },
  {
    date: "May 2026",
    country: "🇵🇭 Philippines",
    event: "PDRRMC annual review tabled in Congress",
    impact: "LOW",
    description: "The PDRRMC submitted its RA 10121 compliance review noting 80% of LGUs now have funded local disaster risk reduction plans.",
  },
  {
    date: "Apr 2026",
    country: "🇺🇳 UN Vienna",
    event: "Sendai Framework Mid-Term Review — WDC contributing",
    impact: "HIGH",
    description: "WDC submitted evidence to the Sendai Mid-Term Review process documenting gaps in Target E (national and local DRR strategies) for 34 fragile states.",
  },
  {
    date: "Mar 2026",
    country: "🇸🇩 Sudan",
    event: "DRR legislation suspended — conflict ongoing",
    impact: "HIGH",
    description: "Sudan's National Council for Civil Defense has suspended operations due to the ongoing civil war. WDC flagged this as a critical governance gap.",
  },
  {
    date: "Feb 2026",
    country: "🇧🇩 Bangladesh",
    event: "Cyclone Preparedness Programme legislation updated",
    impact: "MEDIUM",
    description: "Bangladesh amended its CPP regulations to integrate mobile-based alert dissemination reaching 45 million coastal residents, backed by $180M in IDA financing.",
  },
];

const WDC_ADVOCACY = [
  {
    icon: Globe,
    org: "UN Vienna / UNDRR",
    title: "Sendai Framework Monitoring",
    desc: "WDC contributes data to the Sendai Framework Monitor, submitting annual country profiles on DRR governance for 12 priority fragile states.",
    status: "Active",
    statusColor: "text-green-400",
  },
  {
    icon: Landmark,
    org: "European Commission",
    title: "EU Disaster Resilience Act",
    desc: "WDC participated in public consultations on the EDRA and submitted formal recommendations on fragile state carve-outs and aid conditionality.",
    status: "Completed",
    statusColor: "text-blue-400",
  },
  {
    icon: Building,
    org: "NEMA Nigeria",
    title: "DRR Legislative Reform Support",
    desc: "WDC's policy team provided technical assistance to NEMA's legislative reform working group, contributing to the NEMA Amendment Bill provisions.",
    status: "Active",
    statusColor: "text-green-400",
  },
  {
    icon: Users,
    org: "AU / IGAD",
    title: "Horn of Africa DRR Compact",
    desc: "WDC is supporting African Union negotiations on a regional DRR compact for the Horn of Africa, building cross-border early warning protocols.",
    status: "In progress",
    statusColor: "text-amber-400",
  },
];

const SCORECARD_COUNTRIES = [
  { code: "🇯🇵", name: "Japan", legislation: true, earlyWarning: true, funding: true, crossBorder: true },
  { code: "🇩🇪", name: "Germany", legislation: true, earlyWarning: true, funding: true, crossBorder: true },
  { code: "🇧🇩", name: "Bangladesh", legislation: true, earlyWarning: true, funding: false, crossBorder: false },
  { code: "🇮🇳", name: "India", legislation: true, earlyWarning: true, funding: true, crossBorder: false },
  { code: "🇰🇪", name: "Kenya", legislation: true, earlyWarning: false, funding: false, crossBorder: false },
  { code: "🇳🇬", name: "Nigeria", legislation: true, earlyWarning: false, funding: false, crossBorder: false },
  { code: "🇵🇭", name: "Philippines", legislation: true, earlyWarning: true, funding: false, crossBorder: false },
  { code: "🇧🇷", name: "Brazil", legislation: true, earlyWarning: true, funding: false, crossBorder: false },
  { code: "🇨🇩", name: "DRC", legislation: false, earlyWarning: false, funding: false, crossBorder: false },
  { code: "🇭🇹", name: "Haiti", legislation: false, earlyWarning: false, funding: false, crossBorder: false },
  { code: "🇾🇪", name: "Yemen", legislation: false, earlyWarning: false, funding: false, crossBorder: false },
  { code: "🇸🇩", name: "Sudan", legislation: false, earlyWarning: false, funding: false, crossBorder: false },
];

const TIER_CONFIG = {
  EXCELLENT: { color: "text-green-400", bg: "bg-green-400/10", border: "border-green-500/20" },
  GOOD: { color: "text-[#009EDB]", bg: "bg-[#009EDB]/10", border: "border-[#009EDB]/20" },
  MODERATE: { color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-500/20" },
  CRITICAL: { color: "text-red-400", bg: "bg-red-400/10", border: "border-red-500/20" },
};

const IMPACT_CONFIG = {
  HIGH: { color: "text-red-400", bg: "bg-red-500/10" },
  MEDIUM: { color: "text-amber-400", bg: "bg-amber-500/10" },
  LOW: { color: "text-green-400", bg: "bg-green-500/10" },
};

export default function PolicyTrackerPage() {
  return (
    <>
      <Helmet>
        <title>DRR Policy Tracker | WDC Intelligence</title>
        <meta
          name="description"
          content="Track disaster risk reduction legislation, Sendai Framework compliance, and government accountability worldwide — World Disaster Center policy intelligence."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0D1B26] text-white font-mono">
        {/* ── Header ── */}
        <section className="bg-[#1C2B39] border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <AnimateIn variant="fadeUp" delay={0}>
              <Link
                to="/trackers"
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#009EDB] text-xs mb-5 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                All Trackers
              </Link>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.05}>
              <div className="flex items-start gap-3 mb-2">
                <FileText className="w-7 h-7 text-[#009EDB] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      DRR Policy Tracker
                    </h1>
                    <span className="bg-[#009EDB] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      UPDATED
                    </span>
                  </div>
                  <p className="text-gray-400 font-sans text-sm max-w-xl mt-1">
                    Monitoring disaster risk reduction legislation, Sendai Framework compliance, and government accountability across 30+ nations.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12 space-y-14">
          {/* ── Sendai Compliance ── */}
          <section>
            <AnimateIn variant="fadeUp" delay={0}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#009EDB]" />
                <h2 className="text-xl font-bold text-white">
                  Sendai Framework Compliance Scores
                </h2>
              </div>
              <p className="text-gray-500 text-xs font-sans mb-6">
                WDC composite score (0–100) based on legislation, early warning, funding allocation, and cross-border cooperation. Updated Q3 2026.
              </p>
            </AnimateIn>

            <div className="rounded-xl border border-white/5 bg-[#1C2B39] overflow-hidden">
              <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b border-white/5 bg-white/3">
                {["Country", "Compliance Score", "Tier", "WDC Priority Note"].map((h) => (
                  <span key={h} className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">
                    {h}
                  </span>
                ))}
              </div>

              {SENDAI_COMPLIANCE.map((row, i) => {
                const tier = TIER_CONFIG[row.tier];
                return (
                  <AnimateIn key={i} variant="fadeUp" delay={i * 0.04}>
                    <div className="grid grid-cols-4 gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors items-center">
                      <span className="text-white text-xs font-bold">{row.country}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full max-w-[80px]">
                          <div
                            className={`h-full rounded-full ${tier.color.replace("text-", "bg-")}`}
                            style={{ width: `${row.score}%` }}
                          />
                        </div>
                        <span className="text-white text-xs font-bold">{row.score}</span>
                        <span className={`text-[10px] ${row.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                          {row.change}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded w-fit ${tier.bg} ${tier.color} border ${tier.border}`}
                      >
                        {row.tier}
                      </span>
                      <span className="text-gray-400 text-xs font-sans">{row.priority}</span>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </section>

          {/* ── Recent Policy Developments ── */}
          <section>
            <AnimateIn variant="fadeUp" delay={0}>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-bold text-white">Recent Policy Developments</h2>
              </div>
              <p className="text-gray-500 text-xs font-sans mb-6">
                Legislative and policy events tracked by WDC globally — 2025–2026.
              </p>
            </AnimateIn>

            <div className="space-y-4">
              {RECENT_DEVELOPMENTS.map((dev, i) => {
                const impact = IMPACT_CONFIG[dev.impact];
                return (
                  <AnimateIn key={i} variant="fadeUp" delay={i * 0.05}>
                    <div className="rounded-xl border border-white/5 bg-[#1C2B39] p-5 hover:bg-[#243447] transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[#009EDB] text-xs font-bold">{dev.date}</span>
                          <span className="text-gray-500 text-xs">{dev.country}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${impact.bg} ${impact.color}`}
                          >
                            {dev.impact} IMPACT
                          </span>
                        </div>
                      </div>
                      <h3 className="text-white font-bold text-sm mb-2">{dev.event}</h3>
                      <p className="text-gray-400 text-xs font-sans leading-relaxed">{dev.description}</p>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </section>

          {/* ── WDC Advocacy ── */}
          <section>
            <AnimateIn variant="fadeUp" delay={0}>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-bold text-white">WDC Policy Advocacy</h2>
              </div>
              <p className="text-gray-500 text-xs font-sans mb-6">
                Where WDC is actively engaging with governments and multilateral institutions on DRR policy.
              </p>
            </AnimateIn>

            <div className="grid md:grid-cols-2 gap-5">
              {WDC_ADVOCACY.map(({ icon: Icon, org, title, desc, status, statusColor }, i) => (
                <AnimateIn key={i} variant="fadeUp" delay={i * 0.08}>
                  <div className="rounded-xl border border-white/5 bg-[#1C2B39] p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-[#009EDB]/10">
                          <Icon className="w-4 h-4 text-[#009EDB]" />
                        </div>
                        <span className="text-gray-400 text-xs font-sans">{org}</span>
                      </div>
                      <span className={`text-xs font-bold ${statusColor}`}>{status}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
                    <p className="text-gray-400 text-xs font-sans leading-relaxed">{desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </section>

          {/* ── Scorecard Grid ── */}
          <section>
            <AnimateIn variant="fadeUp" delay={0}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Government Accountability Scorecard</h2>
              </div>
              <p className="text-gray-500 text-xs font-sans mb-6">
                4 dimensions tracked per country: DRR Legislation enacted, Early Warning systems operational, Dedicated DRR Funding, Cross-border protocols established.
              </p>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.05}>
              <div className="rounded-xl border border-white/5 bg-[#1C2B39] overflow-hidden">
                <div className="grid grid-cols-5 gap-2 px-5 py-3 border-b border-white/5 bg-white/3">
                  {["Country", "Legislation", "Early Warning", "DRR Funding", "Cross-Border"].map((h) => (
                    <span key={h} className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">
                      {h}
                    </span>
                  ))}
                </div>

                {SCORECARD_COUNTRIES.map((row, i) => (
                  <AnimateIn key={i} variant="fadeUp" delay={i * 0.03}>
                    <div className="grid grid-cols-5 gap-2 px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors items-center">
                      <span className="text-white text-xs font-bold">
                        {row.code} {row.name}
                      </span>
                      {[row.legislation, row.earlyWarning, row.funding, row.crossBorder].map((val, j) =>
                        val ? (
                          <CheckCircle key={j} className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle key={j} className="w-4 h-4 text-red-400/60" />
                        )
                      )}
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </AnimateIn>
          </section>

          {/* ── CTA ── */}
          <AnimateIn variant="fadeUp" delay={0}>
            <div className="rounded-xl border border-[#009EDB]/20 bg-[#1C2B39] p-8 text-center">
              <AlertCircle className="w-8 h-8 text-[#009EDB] mx-auto mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">Need Full Policy Reports?</h3>
              <p className="text-gray-400 font-sans text-sm max-w-md mx-auto mb-6">
                WDC produces detailed country-level DRR policy briefs, Sendai compliance assessments, and legislative gap analyses for governments and researchers.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:info@worlddisastercenter.org?subject=DRR Policy Report Request"
                  className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#007ab8] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Request Policy Report
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/5 text-gray-300 font-bold text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Contact WDC
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </>
  );
}
