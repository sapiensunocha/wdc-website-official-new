import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Calendar, Users, Award, Heart, BookOpen, Compass,
  CheckCircle, ArrowRight, ChevronRight, Star, Globe,
  Briefcase, GraduationCap, Zap, Shield, TrendingUp,
  MessageCircle, FileText, Map, Layers,
} from "lucide-react";

// ── Pillars data ───────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: Calendar,
    color: "#009EDB",
    title: "Events & Conferences",
    intro: "You get a front-row seat to the humanitarian world's most important conversations.",
    points: [
      "Annual WDC Global Disaster Forum — our flagship event gathering field leaders, UN agencies, and tech innovators",
      "Regional workshops and field site visits in active mission countries",
      "Monthly expert webinars on early warning, GIS, response coordination, and AI in humanitarian action",
      "UN cluster training sessions (WASH, Protection, Health, Shelter, Nutrition, Logistics)",
      "Mission briefings before deployments and live debrief sessions after",
      "Invitations to external partner events — ESA, OCHA, UNDP, and WMO convenings",
    ],
  },
  {
    icon: Users,
    color: "#0072BC",
    title: "Networking",
    intro: "The right connection can open doors that no CV can. WDC gives you that network.",
    points: [
      "Direct access to 1,200+ certified humanitarian professionals across 68 countries",
      "Private Experts Hub — a directory of WDC-vetted specialists you can contact and collaborate with",
      "Introductions to WDC's institutional partners: OCHA, UNDP, UNICEF, WFP, MSF, and governments",
      "Tech partner network — ESA, Microsoft, Google, ESRI professionals working on humanitarian data",
      "Peer learning groups organized by sector and region",
      "Community forums for sharing field experiences, data, and lessons learned",
    ],
  },
  {
    icon: Award,
    color: "#1A7644",
    title: "Certifications",
    intro: "WDC certifications are recognised by UN agencies and partner organisations as proof of real expertise.",
    points: [
      "WDC Certified Disaster Specialist — our flagship credential, verified and listed on your public profile",
      "Early Warning Systems Design & Implementation Certificate",
      "GIS for Humanitarian Response Certificate",
      "Field Coordination & Cluster System Certificate",
      "Humanitarian Data Management Certificate (HDX / OCHA standards)",
      "AI & Machine Learning in Humanitarian Response Certificate",
      "Digital credentials you can display on LinkedIn and share with employers",
    ],
  },
  {
    icon: Heart,
    color: "#E87722",
    title: "Mentoring",
    intro: "Senior practitioners who have worked in the hardest places in the world — paired with you.",
    points: [
      "1-on-1 mentoring sessions with WDC senior experts and field veterans",
      "Structured 6-month mentoring tracks with clear milestones and check-ins",
      "Mentors currently deployed in active missions — real-world insight, not theory",
      "Group cohort mentoring for professionals at similar career stages",
      "Access to WDC's advisory board members for strategic career conversations",
      "Peer-to-peer mentoring within the Experts Hub community",
    ],
  },
  {
    icon: BookOpen,
    color: "#7C3AED",
    title: "Tools & Materials",
    intro: "Everything you need to do the job well, available to you as a member.",
    points: [
      "WDC Humanitarian Data Toolkit — templates, data models, and reporting frameworks used in the field",
      "Field assessment templates and standard operating procedures (SOPs) for common disaster scenarios",
      "Access to Crisis Atlas — WDC's global disaster risk index covering 190+ countries",
      "Michael platform early access — real-time disaster monitoring intelligence",
      "Research library: post-disaster reviews, policy briefs, field reports, and technical guidelines",
      "Training course materials from all 7 WDC Academy tracks, downloadable and reusable",
    ],
  },
  {
    icon: Compass,
    color: "#CC2936",
    title: "Career Guidance",
    intro: "From your first humanitarian role to leading your own field mission — we help you map the path.",
    points: [
      "Personalised career pathway mapping with WDC advisors",
      "Exclusive job board with openings from WDC's 45+ partner organisations",
      "Profile building and positioning support for the humanitarian job market",
      "Deployment referrals — WDC actively recommends members to partner organisations",
      "Expert Hub listing that makes you discoverable to NGOs, UN agencies, and governments worldwide",
      "CV and application review by WDC professionals ahead of major applications",
    ],
  },
];

// ── Journey steps ──────────────────────────────────────────────────────────────
const JOURNEY = [
  { icon: FileText, step: "1", title: "Join & Get Oriented", desc: "Complete your membership profile. Tell us your background, your goals, and where you want to go. This is the starting point." },
  { icon: GraduationCap, step: "2", title: "Learn & Get Certified", desc: "Work through WDC's training tracks. Earn certifications in your area of focus. Build the credentials the field respects." },
  { icon: Users, step: "3", title: "Connect & Get Mentored", desc: "Join your peer cohort. Get matched with a mentor. Start meeting the people who are already where you want to be." },
  { icon: Zap, step: "4", title: "Deploy & Gain Experience", desc: "Apply to roster opportunities. Attend events. Contribute to field missions. This is where your profile becomes a track record." },
  { icon: Star, step: "5", title: "Lead & Be Recognised", desc: "You've built the expertise. WDC recognises it publicly. You become a mentor. You get featured. You get called first." },
];

// ── Tiers ──────────────────────────────────────────────────────────────────────
const TIERS = [
  {
    title: "Community Member",
    tag: "Free",
    price: "Free",
    for: "Individuals living in disaster-prone areas and anyone beginning their humanitarian journey",
    perks: [
      "Access to WDC training courses and certificates",
      "Participation in webinars and local workshops",
      "Peer mentoring and community forums",
      "WDC newsletter and Crisis Atlas digest",
      "Eligible for paid crowdsourcing tasks via the Michael platform",
    ],
    cta: "Join Free",
    href: "/contact",
    highlight: false,
  },
  {
    title: "Professional Member",
    tag: "Most Popular",
    price: "$20/year or 10 hrs pro bono",
    for: "Disaster experts, GIS analysts, engineers, policy advisors, medical professionals, and humanitarian practitioners",
    perks: [
      "Everything in Community, plus:",
      "Listed in WDC's global Experts Hub",
      "Priority invitations to WDC conferences and global events",
      "1-on-1 mentoring access and 6-month career track",
      "Full career guidance and deployment referrals",
      "Access to WDC tools, templates, and research library",
      "Eligible for project-based and roster deployment roles",
    ],
    cta: "Apply Now",
    href: "/roster/apply",
    highlight: true,
  },
  {
    title: "Organisational Member",
    tag: "For NGOs & Institutions",
    price: "Contact us",
    for: "NGOs, humanitarian organisations, research institutions, and community-based organisations",
    perks: [
      "Co-branded partnership listing on WDC's website",
      "Access to WDC expert pool for project collaboration",
      "Dedicated workshops and training for your team",
      "Special invitations to WDC global convenings",
      "Collaborative funding and joint project opportunities",
      "Early access to WDC intelligence products (Crisis Atlas, Nostradamus)",
    ],
    cta: "Get in Touch",
    href: "/contact",
    highlight: false,
  },
];

export default function MembershipPage() {
  const [openPillar, setOpenPillar] = useState(null);

  return (
    <>
      <Helmet>
        <title>Membership | World Disaster Center</title>
        <meta name="description" content="Join the WDC membership programme. Access events, networking, certifications, mentoring, career guidance, and the tools you need to reach the top of your field in humanitarian response." />
        <meta name="keywords" content="humanitarian membership, disaster response career, WDC membership, humanitarian certification, disaster expert network" />
        <link rel="canonical" href="https://www.worlddisastercenter.org/membership" />
        <meta property="og:title" content="WDC Membership | Build Your Humanitarian Career" />
        <meta property="og:description" content="Events, networking, certifications, mentoring, tools, and career guidance — everything you need to go from where you are to the top of your field." />
      </Helmet>

      <div className="bg-white">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #001129 0%, #002050 60%, #001129 100%)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(0,158,219,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,158,219,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="container relative py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
                <Shield size={13} style={{ color: "#009EDB" }} />
                <span className="text-xs font-bold tracking-wide" style={{ color: "#4DC0E8" }}>WDC Membership Programme</span>
              </div>
              <h1 className="h1 text-n-1 mb-6 leading-tight">
                Everything You Need to Get to the{" "}
                <span style={{ background: "linear-gradient(90deg, #009EDB, #4DC0E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Top of Your Field
                </span>
              </h1>
              <p className="body-1 text-n-3 mb-10 max-w-2xl mx-auto">
                Events. Networking. Certifications. Mentoring. Tools. Career guidance. WDC membership is the most complete professional development programme in humanitarian response — built by practitioners, for practitioners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#tiers"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white hover:scale-105 transition-transform"
                  style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)", boxShadow: "0 8px 32px rgba(0,158,219,0.4)" }}>
                  See Membership Options <ArrowRight size={18} />
                </a>
                <a href="#pillars"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border hover:bg-white/10 transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E6F7FF" }}>
                  What's Included <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick stats strip ─────────────────────────────────────────────── */}
        <div style={{ background: "#009EDB" }}>
          <div className="container py-3">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white text-xs font-semibold tracking-wide">
              {[
                { icon: Users, label: "1,200+ Active Members" },
                { icon: Globe, label: "68 Countries" },
                { icon: Award, label: "7 Certifications" },
                { icon: Calendar, label: "50+ Events per Year" },
                { icon: TrendingUp, label: "45+ Partner Organisations" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={13} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Six pillars ───────────────────────────────────────────────────── */}
        <section id="pillars" className="py-24 bg-surface-subtle">
          <div className="container">
            <div className="text-center mb-14">
              <p className="tagline text-primary mb-3">What You Get</p>
              <h2 className="h2 text-content-primary mb-4">Six Pillars of WDC Membership</h2>
              <p className="body-3 text-content-secondary max-w-xl mx-auto">
                This is not a newsletter subscription. This is a full professional development ecosystem — every pillar designed to move your career forward.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PILLARS.map(({ icon: Icon, color, title, intro, points }) => {
                const isOpen = openPillar === title;
                return (
                  <div key={title}
                    className="bg-white rounded-2xl border border-border hover:shadow-md transition-all duration-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}12` }}>
                          <Icon size={22} style={{ color }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-content-primary text-base leading-snug">{title}</h3>
                          <p className="text-xs text-content-secondary mt-1 leading-relaxed">{intro}</p>
                        </div>
                      </div>

                      <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[600px]" : "max-h-[88px]"}`}>
                        {points.map((p, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-content-secondary leading-relaxed">
                            <CheckCircle size={13} className="shrink-0 mt-0.5" style={{ color }} />
                            {p}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => setOpenPillar(isOpen ? null : title)}
                        className="flex items-center gap-1 text-xs font-bold mt-4 transition-colors"
                        style={{ color }}>
                        {isOpen ? "Show less" : `See all ${points.length} benefits`}
                        <ChevronRight size={13} className={`transition-transform ${isOpen ? "rotate-90" : ""}`} />
                      </button>
                    </div>
                    <div className="h-1 w-full" style={{ background: color }} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Your Journey ──────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="text-center mb-14">
              <p className="tagline text-primary mb-3">The Path</p>
              <h2 className="h2 text-content-primary mb-4">From Member to Field Leader</h2>
              <p className="body-3 text-content-secondary max-w-xl mx-auto">
                WDC membership is not static. You grow with it. Here is how it works in practice — from day one to the top of your field.
              </p>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-border" style={{ margin: "0 10%" }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {JOURNEY.map(({ icon: Icon, step, title, desc }) => (
                  <div key={step} className="relative text-center group">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-border group-hover:border-primary transition-colors bg-white relative z-10"
                      style={{ boxShadow: "0 4px 24px rgba(0,158,219,0.06)" }}>
                      <Icon size={26} style={{ color: "#009EDB" }} />
                    </div>
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-20"
                      style={{ background: "#009EDB", marginTop: "-2px", marginLeft: "22px" }}>
                      {step}
                    </div>
                    <h4 className="font-bold text-content-primary text-sm mb-2 leading-snug">{title}</h4>
                    <p className="text-xs text-content-secondary leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence note */}
            <div className="mt-16 max-w-3xl mx-auto rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #001129, #002050)", border: "1px solid rgba(0,158,219,0.15)" }}>
              <MessageCircle size={28} style={{ color: "#009EDB", margin: "0 auto 12px" }} />
              <h3 className="text-xl font-bold text-n-1 mb-3">We Don't Stop Until You're Confident</h3>
              <p className="text-sm text-n-3 leading-relaxed max-w-xl mx-auto">
                WDC membership is built around one principle: you should leave every interaction — every event, every mentoring session, every training — more capable and more confident than you entered it. We give you the knowledge, the network, and the tools. You bring the drive.
              </p>
            </div>
          </div>
        </section>

        {/* ── What's in the toolkit ─────────────────────────────────────────── */}
        <section className="py-20 bg-surface-subtle">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="tagline text-primary mb-3">Included With Your Membership</p>
                <h2 className="h2 text-content-primary mb-5">The Toolkit That Goes With You Into the Field</h2>
                <p className="body-3 text-content-secondary mb-8">
                  WDC members don't just get advice — they get the actual materials. Templates, frameworks, and platform access that practitioners use on real deployments.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Layers, label: "Humanitarian Data Toolkit", desc: "Field-tested templates, data models, and reporting formats for every phase of disaster response." },
                    { icon: Map, label: "Crisis Atlas Access", desc: "Global disaster risk index — 190+ countries, 12 hazard types, live and historical data." },
                    { icon: Zap, label: "Michael Platform Early Access", desc: "Real-time disaster monitoring intelligence. Members get early access before public release." },
                    { icon: FileText, label: "Research & Policy Library", desc: "Post-disaster reviews, policy briefs, OCHA standards, and WDC field reports — all in one place." },
                    { icon: GraduationCap, label: "All 7 Training Course Materials", desc: "Full course materials from WDC Academy tracks — downloadable and yours to keep." },
                    { icon: Briefcase, label: "Career Resources", desc: "CV templates, application guides, and sector-specific briefings for the humanitarian job market." },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border hover:border-primary/30 transition-colors">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,158,219,0.08)" }}>
                        <Icon size={18} style={{ color: "#009EDB" }} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-content-primary">{label}</p>
                        <p className="text-xs text-content-secondary mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl p-7" style={{ background: "linear-gradient(135deg, #001129, #002050)", border: "1px solid rgba(0,158,219,0.15)" }}>
                  <h3 className="text-lg font-bold text-n-1 mb-4">What Members Say</h3>
                  <div className="space-y-5">
                    {[
                      { name: "Field Coordinator, DRC", quote: "The mentoring programme connected me with someone who had deployed to exactly the crisis I was heading into. That conversation was worth more than any course." },
                      { name: "GIS Analyst, Kenya", quote: "I got my WDC certification six months after joining. Three months later I had a deployment offer from a UN partner. That connection came through the Experts Hub." },
                      { name: "Health Specialist, Haiti", quote: "The toolkit alone saved me days of work. The field assessment templates and SOPs are exactly what you need when you arrive in a new location with no context." },
                    ].map(({ name, quote }) => (
                      <div key={name} className="border-l-2 border-primary pl-4">
                        <p className="text-sm text-n-3 italic leading-relaxed">"{quote}"</p>
                        <p className="text-xs font-bold mt-2" style={{ color: "#4DC0E8" }}>— {name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl p-6 bg-white border border-border">
                  <p className="text-xs font-bold text-content-secondary uppercase tracking-wider mb-4">Recognised By</p>
                  <div className="flex flex-wrap gap-3 text-xs font-semibold text-content-secondary">
                    {["OCHA", "UNDP", "UNICEF", "WFP", "ESA", "MSF", "Government of Canada", "Code for Africa"].map(p => (
                      <span key={p} className="px-3 py-1.5 rounded-full border border-border">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Membership tiers ──────────────────────────────────────────────── */}
        <section id="tiers" className="py-24 bg-white">
          <div className="container">
            <div className="text-center mb-14">
              <p className="tagline text-primary mb-3">Membership Tiers</p>
              <h2 className="h2 text-content-primary mb-4">Choose Your Starting Point</h2>
              <p className="body-3 text-content-secondary max-w-lg mx-auto">
                Whether you're just starting out or bringing a full organisation, there's a tier built for where you are right now.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TIERS.map(({ title, tag, price, for: forWho, perks, cta, href, highlight }) => (
                <div key={title}
                  className={`rounded-2xl p-7 flex flex-col transition-all duration-200 ${highlight ? "shadow-xl" : "border border-border"}`}
                  style={highlight ? { background: "linear-gradient(135deg, #001129, #002050)", border: "2px solid #009EDB" } : {}}>
                  <div className="mb-5">
                    <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full mb-3"
                      style={{ background: highlight ? "rgba(0,158,219,0.2)" : "rgba(0,158,219,0.08)", color: "#009EDB" }}>
                      {tag}
                    </span>
                    <h3 className={`text-xl font-bold mb-1 ${highlight ? "text-n-1" : "text-content-primary"}`}>{title}</h3>
                    <p className="text-xs font-bold mb-3" style={{ color: "#009EDB" }}>{price}</p>
                    <p className={`text-xs leading-relaxed ${highlight ? "text-n-3" : "text-content-secondary"}`}>{forWho}</p>
                  </div>

                  <div className="flex-1 space-y-2.5 mb-7">
                    {perks.map((p, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: highlight ? "#009EDB" : "#1A7644" }} />
                        <span className={`text-xs leading-relaxed ${p.startsWith("Everything") ? "font-semibold" : ""} ${highlight ? "text-n-3" : "text-content-secondary"}`}>{p}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={href}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 ${highlight ? "text-white" : "border border-primary text-primary hover:bg-primary hover:text-white"}`}
                    style={highlight ? { background: "linear-gradient(135deg, #009EDB, #0072BC)", boxShadow: "0 6px 24px rgba(0,158,219,0.4)" } : {}}>
                    {cta} <ArrowRight size={15} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────────────────── */}
        <section className="py-20 text-center" style={{ background: "linear-gradient(135deg, #001129 0%, #002050 100%)" }}>
          <div className="container">
            <h2 className="h2 text-n-1 mb-4 max-w-2xl mx-auto">
              Your Career in Humanitarian Response Starts Here
            </h2>
            <p className="body-3 text-n-3 mb-10 max-w-lg mx-auto">
              Join thousands of practitioners using WDC membership to build careers that matter. The events, the people, the certifications, the tools — it's all here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/roster/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)", boxShadow: "0 8px 32px rgba(0,158,219,0.4)" }}>
                Apply for Professional Membership <ArrowRight size={18} />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border hover:bg-white/10 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E6F7FF" }}>
                Ask a Question <ChevronRight size={18} />
              </Link>
            </div>
            <p className="text-xs text-n-4 mt-8">
              Questions about membership? Write to{" "}
              <a href="mailto:office@worlddisastercenter.org" className="text-primary hover:underline">
                office@worlddisastercenter.org
              </a>
            </p>
          </div>
        </section>

      </div>
    </>
  );
}
