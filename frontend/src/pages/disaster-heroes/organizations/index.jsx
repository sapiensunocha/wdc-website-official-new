import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, CheckCircle, BarChart2, Globe, Users, FileText, Zap } from "lucide-react";
import SEOMeta from "../../../components/SEOMeta";
import AnimateIn from "../../../components/AnimateIn";

const PRIMARY = "#009EDB";
const NAVY = "#001129";
const BG = "#F8FAFC";

const STEPS = [
  {
    number: 1,
    icon: "📋",
    title: "Register Your Organization",
    desc: "Complete our multi-step application with your organization's identity, mission, and focus areas. ARIA, our AI verification system, reviews your application within 24 hours.",
  },
  {
    number: 2,
    icon: "👨‍👩‍👧‍👦",
    title: "Submit Beneficiaries",
    desc: "Use the WDC portal to submit individual or family cases. Each case is reviewed by ARIA and a WDC field officer before publication. Families can be in any country.",
  },
  {
    number: 3,
    icon: "💳",
    title: "Receive Tracked Funds",
    desc: "Donor contributions flow through the WDC ledger with full transparency. Monthly disbursements are sent to your verified bank account with automated donor reports.",
  },
];

const BENEFITS = [
  {
    icon: <Shield size={22} style={{ color: PRIMARY }} />,
    title: "Verified Organization Badge",
    desc: "Display the WDC Verified Partner badge on your website and publications. Increases donor trust and credibility.",
  },
  {
    icon: <FileText size={22} style={{ color: PRIMARY }} />,
    title: "Auto-Generated Donor Reports",
    desc: "Monthly PDF reports are automatically generated and sent to each donor. Zero administrative overhead for your team.",
  },
  {
    icon: <BarChart2 size={22} style={{ color: PRIMARY }} />,
    title: "Financial Transparency Dashboard",
    desc: "Real-time dashboard shows every dollar received, disbursed, and pending. Donors see exactly how their money is used.",
  },
  {
    icon: <Zap size={22} style={{ color: PRIMARY }} />,
    title: "MICHAEL Crisis Data Integration",
    desc: "Your cases are automatically cross-referenced with MICHAEL live disaster intelligence, giving donors real-time context.",
  },
  {
    icon: <Globe size={22} style={{ color: PRIMARY }} />,
    title: "Global Donor Network",
    desc: "Access WDC's global donor community — 1,800+ active sponsors looking for verified cases to support monthly.",
  },
  {
    icon: <Users size={22} style={{ color: PRIMARY }} />,
    title: "Field Report Tools",
    desc: "Structured templates for monthly field updates, photo documentation, and beneficiary progress tracking.",
  },
];

const WHO_CAN = [
  { icon: "🌍", title: "International NGOs", desc: "Registered international non-governmental organizations working in disaster-affected regions." },
  { icon: "🏘️", title: "Community Organizations", desc: "Locally-rooted community groups with direct beneficiary access and grassroots accountability." },
  { icon: "⛪", title: "Faith-Based Organizations", desc: "Faith-based groups delivering humanitarian services in crisis areas regardless of denomination." },
  { icon: "🏛️", title: "Government Humanitarian Agencies", desc: "National or sub-national government bodies managing disaster response and relief programmes." },
  { icon: "🔬", title: "Research Institutions", desc: "Academic or research bodies with field presence and humanitarian mandate in crisis zones." },
];

export default function DisasterHeroesOrganizations() {
  return (
    <>
      <SEOMeta
        title="Partner Organizations — WDC Disaster Heroes"
        description="Register your NGO or humanitarian organization on the WDC Disaster Heroes platform. Submit beneficiaries, receive tracked donations, and access ARIA verification."
        url="/disaster-heroes/organizations"
      />

      {/* ── HERO ── */}
      <section className="text-white relative overflow-hidden" style={{ minHeight: 480 }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(0.4) brightness(0.22)" }}
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,17,41,0.97) 0%, rgba(0,17,41,0.88) 55%, rgba(0,158,219,0.12) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        </div>

        <div className="container relative pt-28 pb-20 sm:py-28">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-5">
              <Globe size={18} style={{ color: PRIMARY }} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: PRIMARY }}>
                WDC Partner Network
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-5 max-w-3xl">
              Partner With Us to{" "}
              <span style={{ color: PRIMARY }}>Reach More Families</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-lg max-w-2xl leading-relaxed mb-8">
              Register your organization on WDC Disaster Heroes. Submit verified beneficiaries, receive
              tracked donations, and let ARIA — our AI verification system — handle donor transparency
              so your team can focus on the field.
            </p>

            {/* Stats */}
            <div
              className="inline-flex flex-wrap gap-4 sm:gap-8 px-5 py-3 rounded-2xl mb-8"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",
              }}
            >
              {[
                { value: "0", label: "Partner Orgs (launching soon)" },
                { value: "0", label: "Org-Submitted Cases" },
                { value: "24h", label: "ARIA Review Time" },
                { value: "100%", label: "Financial Transparency" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-black text-lg sm:text-2xl leading-none">{s.value}</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/disaster-heroes/organizations/register"
                className="inline-flex items-center gap-2 font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: PRIMARY, color: "#fff" }}
              >
                Register Your Organization <ArrowRight size={14} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#fff",
                }}
              >
                Learn How It Works
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: BG, paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: PRIMARY }}>
              Simple Process
            </p>
            <h2 className="text-3xl font-black mb-2" style={{ color: NAVY }}>
              How the Partner Programme Works
            </h2>
            <p className="text-gray-500 mb-10 max-w-xl text-sm leading-relaxed">
              From registration to receiving your first donation disbursement — a clear, three-step process
              designed for field organizations.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <AnimateIn key={step.number} variant="fadeUp" delay={0.07 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-2xl p-6 flex flex-col gap-3 h-full"
                  style={{ background: "#fff", border: "1px solid #e5e7eb" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0"
                      style={{ background: PRIMARY }}
                    >
                      {step.number}
                    </div>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="font-black text-base" style={{ color: NAVY }}>{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS GRID ── */}
      <section style={{ background: "#0a1628", paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: PRIMARY }}>
              What You Get
            </p>
            <h2 className="text-3xl font-black text-white mb-2">
              Everything Your Organization Needs
            </h2>
            <p className="text-white/50 mb-10 max-w-xl text-sm leading-relaxed">
              WDC handles the donor experience — you focus on the field. Here's what the platform provides.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <AnimateIn key={b.title} variant="fadeUp" delay={0.06 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-2xl p-6 h-full"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,158,219,0.12)" }}
                  >
                    {b.icon}
                  </div>
                  <h3 className="font-black text-white text-sm mb-2">{b.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO CAN REGISTER ── */}
      <section style={{ background: BG, paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: PRIMARY }}>
              Eligibility
            </p>
            <h2 className="text-3xl font-black mb-2" style={{ color: NAVY }}>
              Who Can Register?
            </h2>
            <p className="text-gray-500 mb-10 max-w-xl text-sm leading-relaxed">
              Any organization with a verifiable humanitarian mandate and direct beneficiary access can apply.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {WHO_CAN.map((w, i) => (
              <AnimateIn key={w.title} variant="fadeUp" delay={0.06 * i}>
                <div
                  className="rounded-2xl p-5 flex gap-4 h-full"
                  style={{ background: "#fff", border: "1px solid #e5e7eb" }}
                >
                  <span className="text-3xl shrink-0 mt-0.5">{w.icon}</span>
                  <div>
                    <h3 className="font-black text-sm mb-1" style={{ color: NAVY }}>{w.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Verification note */}
          <AnimateIn variant="fadeUp" delay={0.1}>
            <div
              className="rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4"
              style={{ background: "#EFF9FF", border: `1px solid ${PRIMARY}33` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: PRIMARY + "22" }}
              >
                <Shield size={20} style={{ color: PRIMARY }} />
              </div>
              <div>
                <h3 className="font-black text-sm mb-1" style={{ color: NAVY }}>ARIA Verification Process</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All organizations are reviewed by ARIA (Automated Risk and Intelligence Assessment), WDC's AI
                  verification system. ARIA cross-checks registration documents, operational history, and
                  beneficiary claims against global humanitarian databases. Organizations receive a Verified
                  Partner badge upon approval. The review typically takes under 24 hours.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #0a1f42 100%)`,
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
      >
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">
                  Ready to bring your beneficiaries to the WDC platform?
                </h2>
                <p className="text-white/50 text-sm">
                  Registration takes under 10 minutes. ARIA reviews within 24 hours.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  to="/disaster-heroes/organizations/register"
                  className="inline-flex items-center gap-2 font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ background: PRIMARY, color: "#fff" }}
                >
                  Register Your Organization <ArrowRight size={14} />
                </Link>
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
