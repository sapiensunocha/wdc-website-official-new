import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, BookOpen, Globe, TrendingUp, FileText } from "lucide-react";
import SEOMeta from "../../components/SEOMeta";
import AnimateIn from "../../components/AnimateIn";
import { WDC_CAMPAIGNS, PARTNER_TYPES } from "../../assets/data/campaigns";
import HumanitarianIcon from "../../components/HumanitarianIcon";
import GVIBookReader from "../../components/GVIBookReader";

// ─── Campaign card ────────────────────────────────────────────────────────────
function CampaignCard({ c, index }) {
  return (
    <AnimateIn variant="fadeUp" delay={0.04 * index}>
      <Link
        to={`/campaigns/${c.slug}`}
        className="group block rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 relative"
        style={{ minHeight: 280 }}
      >
        {/* Background image layer */}
        <div className="absolute inset-0">
          <img
            src={c.heroImage}
            alt=""
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            style={{ filter: "saturate(0.55) brightness(0.3)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Dark-to-accent gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, rgba(0,5,18,0.72) 0%, rgba(0,5,18,0.82) 55%, ${c.color}28 100%)`,
            }}
          />
          {/* Campaign accent top stripe */}
          <div className="absolute top-0 left-0 right-0 h-0.5 z-10" style={{ backgroundColor: c.color }} />
        </div>

        {/* Glass content layer */}
        <div className="relative z-10 p-5 h-full flex flex-col" style={{ minHeight: 280 }}>
          {/* Icon + badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${c.color}55`,
                color: "white",
              }}
            >
              <HumanitarianIcon icon={c.emoji} size={22} />
            </div>
            <span
              className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 mt-1"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: `1px solid ${c.color}40`,
                color: c.color,
              }}
            >
              PROTECT
            </span>
          </div>

          {/* Title + tagline */}
          <h3 className="text-base font-black text-white leading-tight mb-1.5 group-hover:opacity-90 transition-opacity">
            {c.title}
          </h3>
          <p className="text-[11px] leading-snug mb-3" style={{ color: `${c.color}cc` }}>
            {c.tagline}
          </p>

          {/* Short desc */}
          <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2 flex-1">
            {c.shortDesc}
          </p>

          {/* CTA */}
          <div
            className="mt-4 pt-3 flex items-center gap-1.5 text-xs font-bold"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.10)",
              color: c.color,
            }}
          >
            Explore Campaign{" "}
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </AnimateIn>
  );
}

// ─── Hub page ─────────────────────────────────────────────────────────────────
export default function CampaignsHub() {
  const [gviOpen, setGviOpen] = useState(false);

  return (
    <>
      <SEOMeta
        title="WDC PROTECT — 11 Humanitarian Campaigns"
        description="WDC PROTECT: 11 campaign families targeting women, children, climate, food security, displacement, digital safety, and more. Find the vulnerable. Protect them."
        image="https://images.unsplash.com/photo-1553775927-a071d5a6a39a?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/campaigns"
      />

      {/* ── Hero ── */}
      <section className="text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(0.55) brightness(0.35)" }}
            loading="eager"
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(10,18,35,0.96) 0%, rgba(15,23,42,0.88) 55%, rgba(0,158,219,0.12) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8fafc] to-transparent" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#009EDB]/6 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet-500/6 blur-3xl" />
        </div>
        <div className="container relative pt-28 pb-16 sm:py-24">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-[#009EDB]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#009EDB]">WDC PROTECT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-[1.05] sm:leading-[1.0] mb-4">
              Protecting the people<br />
              <span className="text-[#009EDB]">most vulnerable to crisis.</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base lg:text-xl max-w-2xl leading-relaxed mb-8">
              WDC doesn't build campaigns around disasters alone. We build them around <strong className="text-white">vulnerability</strong>. Disasters, violence, displacement, climate, poverty, and digital exclusion are all forms of vulnerability — and WDC's institutional promise is the same for every one:
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
              {["Find the vulnerable", "Protect them", "Prevent the crisis", "Measure the impact"].map((s, i) => (
                <span key={s} className="flex items-center gap-1.5 sm:gap-2 bg-white/10 border border-white/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                  <span className="text-[#009EDB] font-black">{i + 1}</span> {s}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 11 Campaign Families ── */}
      <section className="bg-[#0a1628] py-20">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#009EDB] mb-2">11 Campaign Families</p>
            <h2 className="text-3xl font-black text-white mb-2">WDC PROTECT Campaign Platform</h2>
            <p className="text-white/50 mb-10 max-w-2xl text-sm leading-relaxed">
              Each campaign targets a distinct form of vulnerability — but all share a common identity, a common methodology, and a common institutional promise. Click any campaign to explore its intelligence, outputs, and partnership opportunities.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {WDC_CAMPAIGNS.map((c, i) => (
              <CampaignCard key={c.slug} c={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Vulnerability Index ── */}
      <section className="bg-[#1C2B39] text-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateIn variant="fadeLeft">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#009EDB] mb-2">Nostradamus · 2027 Edition</p>
              <h2 className="text-3xl font-black mb-4">WDC Global Vulnerability Index</h2>
              <p className="text-gray-300 leading-relaxed mb-5">
                Every year, WDC will identify the populations most exposed to different forms of crisis — and publish the evidence globally. This is where WDC's model becomes much more sophisticated.
              </p>
              <div className="space-y-4">
                {[
                  '"These are the 500 communities where women are most vulnerable to disaster-related violence."',
                  '"These are the 200 cities where children face the greatest combination of climate, poverty and displacement risk."',
                  '"These are the communities most likely to experience catastrophic displacement after flooding."',
                ].map((quote) => (
                  <div key={quote} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                    <span className="text-[#009EDB] text-2xl font-black leading-none shrink-0">"</span>
                    <p className="text-sm text-gray-300 italic leading-relaxed">{quote.replace(/^"|"$/g, "")}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-5 leading-relaxed">
                Now WDC isn't merely saying "support women" or "help children." We are producing <strong className="text-white">evidence about vulnerability</strong>, mobilizing resources around it, and measuring whether conditions improve. That is where the model becomes an institution.
              </p>
            </AnimateIn>

            <AnimateIn variant="fadeRight">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#009EDB] mb-4">From Asking for Donations To:</p>
                <div className="space-y-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="text-[10px] font-black uppercase text-red-400 mb-1">Old conversation</p>
                    <p className="text-sm text-gray-300 italic">"Would you donate $50,000 to WDC?"</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight size={18} className="text-[#009EDB]" />
                  </div>
                  <div className="bg-[#009EDB]/10 border border-[#009EDB]/20 rounded-xl p-4">
                    <p className="text-[10px] font-black uppercase text-[#009EDB] mb-1">WDC PROTECT conversation</p>
                    <p className="text-sm text-gray-200 italic">"WDC has identified 50,000 vulnerable people in 12 communities. We have a prevention program with measurable outcomes. Would your company become the national corporate partner for this campaign?"</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-5 leading-relaxed">
                  That is a fundamentally different fundraising conversation — and a fundamentally different institutional identity.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── 7 Partnership Types ── */}
      <section className="bg-white py-20">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#009EDB] mb-2">Partnership Architecture</p>
            <h2 className="text-3xl font-black text-[#1C2B39] mb-2">7 Ways to Partner with WDC PROTECT</h2>
            <p className="text-gray-500 mb-10 max-w-xl text-sm leading-relaxed">
              Instead of competing for the same donor dollars, WDC creates a platform organizations want to associate themselves with.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTNER_TYPES.map((p, i) => (
              <AnimateIn key={p.title} variant="fadeUp" delay={0.05 * i}>
                <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-5 h-full hover:border-[#009EDB]/40 hover:shadow-sm transition-all">
                  <p className="text-2xl mb-3"><HumanitarianIcon icon={p.icon} size={20} /></p>
                  <p className="font-black text-[#1C2B39] text-sm mb-1">{p.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn variant="fadeUp" delay={0.1} className="mt-10 flex flex-wrap gap-4">
            <Link to="/roster" className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-7 py-3 rounded-xl transition-colors">
              <Shield size={16} /> Become a Partner
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-bold px-7 py-3 rounded-xl transition-colors">
              Contact WDC <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── WDC's differentiation ── */}
      <section className="bg-[#009EDB] text-white py-14">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100 mb-2">WDC's Institutional Identity</p>
                <h2 className="text-3xl font-black mb-4">Not Problem → Response.<br />Risk → Identify → Protect → Prevent → Measure.</h2>
                <p className="text-blue-100 leading-relaxed">
                  That is a very different institutional identity. And data is especially important: WDC's differentiation is that it produces evidence about vulnerability, mobilizes resources around it, and measures whether conditions improve — rather than simply reacting to emergencies after they occur.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { old: "Problem", new_: "Risk",     arrow: true },
                  { old: "Response", new_: "Identify", arrow: true },
                  { old: "",         new_: "Protect",  arrow: false },
                  { old: "",         new_: "Prevent",  arrow: false },
                  { old: "",         new_: "Measure",  arrow: false },
                ].filter(r => r.new_).slice(0, 4).map((row) => (
                  <div key={row.new_} className="bg-white/15 border border-white/20 rounded-xl p-4 text-center">
                    <p className="text-lg font-black">{row.new_}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── GVI 2027 Book Section ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #050a19 0%, #0a1628 60%, #0d1f3c 100%)" }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#009EDB 1px, transparent 1px), linear-gradient(90deg, #009EDB 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #009EDB18 0%, transparent 70%)" }}
        />

        <div className="container relative z-10">
          <AnimateIn variant="fadeUp">
            <div className="max-w-4xl mx-auto">
              {/* Label */}
              <div className="flex items-center gap-2 mb-6 justify-center">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#009EDB22", border: "1px solid #009EDB55" }}
                >
                  <BookOpen size={16} className="text-[#009EDB]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#009EDB]">
                  WDC Intelligence Report · 2027 Edition
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center leading-tight mb-4">
                Global Vulnerability<br />
                <span style={{ color: "#009EDB" }}>Index 2027</span>
              </h2>
              <p className="text-center text-white/50 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
                WDC's landmark annual intelligence report — codenamed <strong className="text-white/70">Nostradamus</strong> — ranks all 194 countries across 10 dimensions of vulnerability: conflict, climate, food, health, displacement, poverty, governance, gender, digital access, and disaster exposure.
              </p>

              {/* Stat trio */}
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-10">
                {[
                  { icon: Globe, value: "194", label: "Countries Ranked" },
                  { icon: TrendingUp, value: "10", label: "Dimensions" },
                  { icon: FileText, value: "10", label: "Chapters" },
                ].map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="rounded-xl p-4 text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Icon size={18} className="text-[#009EDB] mx-auto mb-2" />
                    <p className="text-xl font-black text-white">{value}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setGviOpen(true)}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-black text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: "#009EDB", color: "#fff" }}
                >
                  <BookOpen size={16} /> Read the Report
                </button>
                <a
                  href="/gvi-2027.html"
                  download="WDC-Global-Vulnerability-Index-2027.html"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-black text-sm transition-all hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "white",
                  }}
                >
                  <FileText size={16} /> Download
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── All campaigns CTA ── */}
      <section className="bg-[#0a1628] py-14 border-t border-white/5">
        <div className="container text-center">
          <AnimateIn variant="fadeUp">
            <h2 className="text-2xl font-black text-white mb-3">Choose a Campaign</h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto text-sm">
              Every campaign produces data, reports, policy briefs, and measurable outcomes. Explore any campaign to see who is vulnerable, what WDC does, and how to get involved.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {WDC_CAMPAIGNS.map((c) => (
                <Link
                  key={c.slug}
                  to={`/campaigns/${c.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all hover:shadow-sm"
                  style={{ borderColor: c.color + "60", color: c.color, backgroundColor: c.color + "10" }}
                >
                  <HumanitarianIcon icon={c.emoji} size={11} /> {c.title}
                </Link>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── GVI Book Reader modal ── */}
      {gviOpen && <GVIBookReader onClose={() => setGviOpen(false)} />}
    </>
  );
}
