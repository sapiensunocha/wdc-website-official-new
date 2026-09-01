import { Link } from "react-router-dom";
import SEOMeta from "../../../components/SEOMeta";
import {
  HandHeart,
  ChevronLeft,
  TrendingDown,
  Users,
  DollarSign,
  Shield,
  CheckCircle,
  Clock,
  ExternalLink,
  AlertCircle,
  Building2,
  Link2,
} from "lucide-react";
import AnimateIn from "../../../components/AnimateIn";

const FUNDING_GAPS = [
  { country: "Yemen", crisis: "Conflict + Famine", funded: 43, total: 4.3, flagEmoji: "🇾🇪" },
  { country: "Sudan", crisis: "Civil War Displacement", funded: 38, total: 2.8, flagEmoji: "🇸🇩" },
  { country: "DRC", crisis: "Ongoing Conflict + MSN", funded: 51, total: 2.1, flagEmoji: "🇨🇩" },
  { country: "Afghanistan", crisis: "Humanitarian Emergency", funded: 29, total: 3.2, flagEmoji: "🇦🇫" },
  { country: "Haiti", crisis: "Gang Violence + Earthquake", funded: 62, total: 0.9, flagEmoji: "🇭🇹" },
];

const OPERATIONS = [
  {
    country: "🇾🇪 Yemen",
    crisisType: "Conflict / Famine",
    wdcStatus: "Monitoring",
    leadAgency: "WFP / OCHA",
    lastUpdated: "Aug 28, 2026",
    statusColor: "text-amber-400",
  },
  {
    country: "🇸🇩 Sudan",
    crisisType: "Mass Displacement",
    wdcStatus: "Active Response",
    leadAgency: "UNHCR / MSF",
    lastUpdated: "Aug 27, 2026",
    statusColor: "text-green-400",
  },
  {
    country: "🇵🇸 Gaza",
    crisisType: "Conflict / Siege",
    wdcStatus: "Advocacy",
    leadAgency: "UNRWA / ICRC",
    lastUpdated: "Aug 29, 2026",
    statusColor: "text-red-400",
  },
  {
    country: "🇲🇿 Mozambique",
    crisisType: "Cyclone Recovery",
    wdcStatus: "Active Response",
    leadAgency: "WDC / INGD",
    lastUpdated: "Aug 22, 2026",
    statusColor: "text-green-400",
  },
  {
    country: "🇦🇫 Afghanistan",
    crisisType: "Multi-Sector Emergency",
    wdcStatus: "Partner Support",
    leadAgency: "UNICEF / IOM",
    lastUpdated: "Aug 20, 2026",
    statusColor: "text-amber-400",
  },
  {
    country: "🇭🇹 Haiti",
    crisisType: "Gang / Displacement",
    wdcStatus: "Monitoring",
    leadAgency: "WFP / MINUJUSTH",
    lastUpdated: "Aug 18, 2026",
    statusColor: "text-amber-400",
  },
  {
    country: "🇸🇸 South Sudan",
    crisisType: "Flood / Conflict",
    wdcStatus: "Active Response",
    leadAgency: "OCHA / IRC",
    lastUpdated: "Aug 15, 2026",
    statusColor: "text-green-400",
  },
];

const WDC_STATS = [
  { icon: DollarSign, value: "$2.3M", label: "Emergency funds tracked", color: "text-green-400" },
  { icon: Building2, value: "47", label: "Partner organizations", color: "text-[#009EDB]" },
  { icon: Users, value: "15", label: "Active response operations", color: "text-amber-400" },
  { icon: Shield, value: "3", label: "Blockchain-verified corridors", color: "text-purple-400" },
];

const STATUS_ICON = {
  "Active Response": CheckCircle,
  "Monitoring": Clock,
  "Advocacy": AlertCircle,
  "Partner Support": Users,
};

function FundingBar({ item }) {
  const gap = 100 - item.funded;
  const gapColor =
    item.funded < 35 ? "text-red-400" : item.funded < 50 ? "text-amber-400" : "text-green-400";
  const barColor =
    item.funded < 35
      ? "bg-red-500"
      : item.funded < 50
      ? "bg-amber-500"
      : "bg-green-500";

  return (
    <div className="py-4 border-b border-white/5 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none">{item.flagEmoji}</span>
          <div>
            <span className="text-white text-sm font-bold">{item.country}</span>
            <span className="text-gray-500 text-xs ml-2 font-sans">{item.crisis}</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-sm font-bold ${gapColor}`}>{item.funded}%</span>
          <span className="text-gray-500 text-xs block font-sans">
            ${item.total}B requested
          </span>
        </div>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${item.funded}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-600">Funded</span>
        <span className={`text-[10px] ${gapColor}`}>{gap}% gap</span>
      </div>
    </div>
  );
}

export default function AidResponsePage() {
  return (
    <>
      <SEOMeta
        title="Aid Tracker — Humanitarian Funding Intelligence"
        description="Track global humanitarian aid flows, funding gaps, and response operations. WDC's AI monitors where aid is needed and where it's going."
        image="https://images.unsplash.com/photo-1746014929708-fcb859fd3185?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/trackers/aid"
      />

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
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <HandHeart className="w-7 h-7 text-amber-400" />
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      Aid & Response Tracker
                    </h1>
                    <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      UPDATED
                    </span>
                  </div>
                  <p className="text-gray-400 font-sans text-sm max-w-xl">
                    Tracking humanitarian funding, response operations, and aid accountability across active global crises.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── WDC Stats ── */}
        <section className="border-b border-white/10 bg-[#152130]">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {WDC_STATS.map(({ icon: Icon, value, label, color }, i) => (
                <AnimateIn key={label} variant="fadeUp" delay={i * 0.07}>
                  <div className="bg-[#1C2B39] border border-white/5 rounded-xl p-4 text-center">
                    <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
                    <p className={`text-xl font-bold ${color}`}>{value}</p>
                    <p className="text-gray-500 text-xs mt-1 font-sans">{label}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12 space-y-14">
          {/* ── Funding Gaps ── */}
          <section>
            <AnimateIn variant="fadeUp" delay={0}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-400" />
                <h2 className="text-xl font-bold text-white">Humanitarian Funding Gaps</h2>
              </div>
              <p className="text-gray-500 text-xs font-sans mb-6">
                Based on OCHA Financial Tracking Service (FTS) — August 2026. Funding gap = % of appeal not yet covered.
              </p>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.05}>
              <div className="bg-[#1C2B39] border border-white/5 rounded-xl p-6">
                {FUNDING_GAPS.map((item) => (
                  <FundingBar key={item.country} item={item} />
                ))}
                <p className="text-gray-600 text-[11px] font-sans mt-4">
                  Critical threshold: &lt;40% funded. WDC flags these crises for partner mobilization.
                </p>
              </div>
            </AnimateIn>
          </section>

          {/* ── Operations Table ── */}
          <section>
            <AnimateIn variant="fadeUp" delay={0}>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-[#009EDB]" />
                <h2 className="text-xl font-bold text-white">Active Response Operations</h2>
              </div>
              <p className="text-gray-500 text-xs font-sans mb-6">
                Operations where WDC is directly engaged, monitoring, or coordinating with lead agencies.
              </p>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.05}>
              <div className="rounded-xl border border-white/5 bg-[#1C2B39] overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-white/5 bg-white/3">
                  {["Country", "Crisis Type", "WDC Status", "Lead Agency", "Last Updated"].map((h) => (
                    <span key={h} className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">
                      {h}
                    </span>
                  ))}
                </div>

                {OPERATIONS.map((op, i) => {
                  const StatusIcon = STATUS_ICON[op.wdcStatus] || Clock;
                  return (
                    <AnimateIn key={i} variant="fadeUp" delay={i * 0.04}>
                      <div className="grid grid-cols-5 gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                        <span className="text-white text-xs font-bold">{op.country}</span>
                        <span className="text-gray-400 text-xs font-sans">{op.crisisType}</span>
                        <span className={`text-xs font-bold flex items-center gap-1.5 ${op.statusColor}`}>
                          <StatusIcon className="w-3 h-3" />
                          {op.wdcStatus}
                        </span>
                        <span className="text-gray-400 text-xs font-sans">{op.leadAgency}</span>
                        <span className="text-gray-500 text-xs font-sans">{op.lastUpdated}</span>
                      </div>
                    </AnimateIn>
                  );
                })}
              </div>
            </AnimateIn>
          </section>

          {/* ── Accountability / Lifeline ── */}
          <section>
            <AnimateIn variant="fadeUp" delay={0}>
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Aid Accountability & Lifeline</h2>
              </div>
              <p className="text-gray-500 text-xs font-sans mb-6">
                WDC's Lifeline tool applies blockchain-based verification to track aid delivery from donor to beneficiary.
              </p>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.05}>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    icon: Link2,
                    title: "Blockchain Traceability",
                    desc: "Every aid disbursement logged on an immutable ledger. Donors can verify that contributions reach intended recipients.",
                    color: "text-purple-400",
                    bg: "bg-purple-400/10",
                    border: "border-purple-500/20",
                  },
                  {
                    icon: Shield,
                    title: "Anti-Diversion Monitoring",
                    desc: "Real-time anomaly detection flags diversions and irregularities in supply chains across 15 active operations.",
                    color: "text-[#009EDB]",
                    bg: "bg-[#009EDB]/10",
                    border: "border-[#009EDB]/20",
                  },
                  {
                    icon: CheckCircle,
                    title: "Beneficiary Verification",
                    desc: "Digital ID verification for beneficiaries ensures that distributions reach vulnerable populations, not intermediaries.",
                    color: "text-green-400",
                    bg: "bg-green-400/10",
                    border: "border-green-500/20",
                  },
                ].map(({ icon: Icon, title, desc, color, bg, border }, i) => (
                  <div
                    key={title}
                    className={`bg-[#1C2B39] border ${border} rounded-xl p-5`}
                  >
                    <div className={`inline-flex p-2.5 rounded-lg ${bg} mb-4`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
                    <p className="text-gray-400 text-xs font-sans leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.1}>
              <div className="mt-6 flex flex-wrap gap-4 items-center justify-between bg-[#1C2B39] border border-white/5 rounded-xl p-5">
                <div>
                  <p className="text-white font-bold text-sm mb-1">Access the Lifeline Platform</p>
                  <p className="text-gray-400 text-xs font-sans">
                    WDC partners and institutional donors can request access to the Lifeline aid accountability dashboard.
                  </p>
                </div>
                <a
                  href="mailto:info@worlddisastercenter.org?subject=Lifeline Platform Access Request"
                  className="flex items-center gap-2 bg-[#009EDB] hover:bg-[#007ab8] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  Request Access
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </AnimateIn>
          </section>

          {/* ── CTA ── */}
          <AnimateIn variant="fadeUp" delay={0}>
            <div className="border-t border-white/10 pt-10 text-center">
              <p className="text-gray-400 font-sans text-sm mb-4">
                Want to support WDC's aid response operations?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  <HandHeart className="w-4 h-4" />
                  Donate to WDC
                </Link>
                <Link
                  to="/partner-with-us"
                  className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/5 text-gray-300 font-bold text-sm px-6 py-3 rounded-lg transition-colors"
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </>
  );
}
