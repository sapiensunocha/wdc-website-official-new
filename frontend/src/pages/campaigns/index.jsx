import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Shield } from "lucide-react";
import AnimateIn from "../../components/AnimateIn";
import { WDC_CAMPAIGNS, PARTNER_TYPES } from "../../assets/data/campaigns";

// ─── Campaign card ────────────────────────────────────────────────────────────
function CampaignCard({ c, index }) {
  return (
    <AnimateIn variant="fadeUp" delay={0.04 * index}>
      <Link
        to={`/campaigns/${c.slug}`}
        className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        {/* Color top bar */}
        <div className="h-1.5 w-full transition-all duration-300" style={{ backgroundColor: c.color }} />

        <div className={`bg-gradient-to-br ${c.gradFrom} ${c.gradTo} px-5 pt-5 pb-4`}>
          <div className="flex items-start justify-between gap-3">
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0">
              {c.emoji}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${c.badgeBg} ${c.badgeText} shrink-0 mt-1`}>
              PROTECT
            </span>
          </div>
          <h3 className="text-base font-black text-[#1C2B39] mt-3 leading-tight group-hover:text-opacity-80">{c.title}</h3>
          <p className="text-xs text-gray-500 mt-1 leading-snug">{c.tagline}</p>
        </div>

        <div className="px-5 py-4">
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{c.shortDesc}</p>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold" style={{ color: c.color }}>
            Explore Campaign <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </AnimateIn>
  );
}

// ─── Hub page ─────────────────────────────────────────────────────────────────
export default function CampaignsHub() {
  return (
    <>
      <Helmet>
        <title>WDC PROTECT — Campaigns — World Disaster Center</title>
        <meta name="description" content="WDC PROTECT: 11 campaign families protecting the world's most vulnerable people. Find the vulnerable. Protect them. Prevent the crisis. Measure the impact." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="bg-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#009EDB]/6 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet-500/6 blur-3xl" />
        </div>
        <div className="container relative py-24">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-[#009EDB]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#009EDB]">WDC PROTECT</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black leading-[1.0] mb-4">
              Protecting the people<br />
              <span className="text-[#009EDB]">most vulnerable to crisis.</span>
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl leading-relaxed mb-8">
              WDC doesn't build campaigns around disasters alone. We build them around <strong className="text-white">vulnerability</strong>. Disasters, violence, displacement, climate, poverty, and digital exclusion are all forms of vulnerability — and WDC's institutional promise is the same for every one:
            </p>
            <div className="flex flex-wrap gap-3 text-sm font-bold">
              {["Find the vulnerable", "Protect them", "Prevent the crisis", "Measure the impact"].map((s, i) => (
                <span key={s} className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                  <span className="text-[#009EDB] font-black">{i + 1}</span> {s}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 11 Campaign Families ── */}
      <section className="bg-[#f8fafc] py-20">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#009EDB] mb-2">11 Campaign Families</p>
            <h2 className="text-3xl font-black text-[#1C2B39] mb-2">WDC PROTECT Campaign Platform</h2>
            <p className="text-gray-500 mb-10 max-w-2xl text-sm leading-relaxed">
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
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#009EDB] mb-2">Coming 2026</p>
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
                  <p className="text-2xl mb-3">{p.icon}</p>
                  <p className="font-black text-[#1C2B39] text-sm mb-1">{p.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn variant="fadeUp" delay={0.1} className="mt-10 flex flex-wrap gap-4">
            <Link to="/partnerWithUs" className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-7 py-3 rounded-xl transition-colors">
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

      {/* ── All campaigns CTA ── */}
      <section className="bg-[#f8fafc] py-14">
        <div className="container text-center">
          <AnimateIn variant="fadeUp">
            <h2 className="text-2xl font-black text-[#1C2B39] mb-3">Choose a Campaign</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto text-sm">
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
                  {c.emoji} {c.title}
                </Link>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
