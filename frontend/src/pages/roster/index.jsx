import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Globe, Shield, Award, Zap, Users, CheckCircle, ArrowRight,
  MapPin, Clock, Star, TrendingUp, BookOpen, Briefcase,
  Radio, Heart, Droplets, Home, Activity, Cpu, ChevronRight,
  Play, Building2, GraduationCap, FileText, UserCheck, Send,
} from "lucide-react";

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(Math.floor(start)); }
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Verified Experts", value: 1200, suffix: "+", icon: Users },
  { label: "Countries Represented", value: 68, suffix: "", icon: Globe },
  { label: "Open Opportunities", value: 24, suffix: "", icon: Zap },
  { label: "Partner Organizations", value: 45, suffix: "+", icon: Building2 },
  { label: "Avg. Days to Deploy", value: 18, suffix: " days", icon: Clock },
  { label: "Total Deployments", value: 340, suffix: "+", icon: CheckCircle },
];

const STEPS_TALENT = [
  { icon: FileText, step: "01", title: "Apply & Complete Profile", desc: "Submit your application with your full professional background, skills, certifications, languages, and deployment preferences." },
  { icon: Shield, step: "02", title: "Screening & Interview", desc: "Our team reviews your profile thoroughly. Top candidates are invited to a structured interview with WDC specialists." },
  { icon: Award, step: "03", title: "Certification & Vetting", desc: "We verify your credentials, check references, and certify your expertise. You must meet all requirements before activation." },
  { icon: FileText, step: "04", title: "Sign WDC Contract", desc: "Sign your WDC roster agreement that defines terms, protections, and professional standards for all deployments." },
  { icon: Send, step: "05", title: "Get Deployed", desc: "You're live on the roster. Get matched with opportunities, deployed to organizations, and build your global impact profile." },
];

const STEPS_PARTNER = [
  { icon: Building2, step: "01", title: "Register Your Organization", desc: "Create a partner account and tell us about your organization, sector, and typical talent needs." },
  { icon: Users, step: "02", title: "Browse Verified Talent", desc: "Access the roster of WDC-certified experts filtered by skill, language, sector, and deployment availability." },
  { icon: Send, step: "03", title: "Request a Deployment", desc: "Submit your deployment brief. WDC matches you with the best-fit expert within 48 hours." },
  { icon: CheckCircle, step: "04", title: "Launch with Protection", desc: "WDC manages the contract, compliance, and ongoing support. Your first month is free." },
];

const SECTORS = [
  { icon: Radio, label: "Early Warning & Monitoring", count: 87 },
  { icon: Activity, label: "Emergency Response", count: 124 },
  { icon: Heart, label: "Health & Medical", count: 98 },
  { icon: Droplets, label: "WASH & Sanitation", count: 63 },
  { icon: Home, label: "Shelter & NFI", count: 71 },
  { icon: Globe, label: "GIS & Remote Sensing", count: 95 },
  { icon: Cpu, label: "Data & AI Systems", count: 82 },
  { icon: BookOpen, label: "Training & Capacity", count: 56 },
  { icon: Shield, label: "Protection & Rights", count: 74 },
  { icon: TrendingUp, label: "M&E & Reporting", count: 67 },
  { icon: Briefcase, label: "Coordination & IM", count: 91 },
  { icon: GraduationCap, label: "Policy & Strategy", count: 48 },
];

const ADVANTAGES = [
  { icon: Clock, title: "18-Day Avg. to First Deployment", desc: "From acceptance to boots on the ground. The fastest humanitarian talent pipeline in the sector.", highlight: "18 days" },
  { icon: Shield, title: "WDC Contract — You're Never Alone", desc: "Every deployment is governed by a WDC contract. Rates, protections, and accountability — fully managed for you.", highlight: "100% protected" },
  { icon: Globe, title: "Global Exposure Across 68 Countries", desc: "Your profile is visible to UN agencies, INGOs, and governments in 68 countries actively seeking certified experts.", highlight: "68 countries" },
  { icon: Award, title: "Internationally Recognised Credentials", desc: "WDC certification is recognised by OCHA, UNDP, and partner organisations as a mark of verified humanitarian expertise.", highlight: "UN-recognised" },
  { icon: TrendingUp, title: "Build a Verified Impact Track Record", desc: "Every deployment goes on your WDC profile — a living portfolio of impact that no standard CV can match.", highlight: "Lifetime record" },
  { icon: Users, title: "Network of 1,200+ Certified Peers", desc: "Join a closed community of vetted humanitarian specialists. Collaborate, refer, and grow alongside the world's best.", highlight: "1,200+ peers" },
];

const BENEFITS_TALENT = [
  "Unique roster profile with full project history and recognition badges",
  "Access to WDC training modules, webinars, and mentorship sessions",
  "Deployed by WDC — you're protected, never left to negotiate alone",
  "Recognised globally — featured in WDC's Experts Hub",
  "Participate in events, conferences, and WDC-led missions",
  "Earn certifications that validate your expertise internationally",
  "Work on the world's most impactful humanitarian projects",
  "Competitive rates negotiated by WDC on your behalf",
];

const BENEFITS_PARTNER = [
  "First month of deployment completely free",
  "Access to 1,200+ pre-vetted, certified disaster specialists",
  "WDC handles contracts, compliance, and legal protections",
  "Match within 48 hours for urgent deployments",
  "Filter by skills, languages, certifications, and regions",
  "Full background checks and credential verification done",
  "Ongoing support throughout the deployment lifecycle",
  "Transparent performance tracking and quality assurance",
];

const URGENCY_COLOR = { critical: "#ef4444", high: "#f59e0b", medium: "#009EDB", low: "#22c55e" };
const SAMPLE_OPPS = [
  { title: "GIS Analyst — Flood Response DRC", type: "Deployment", urgency: "critical", location: "Kinshasa, DRC", duration: "3 months", sectors: ["GIS", "Emergency Response"], compensation: "Paid" },
  { title: "Health Coordinator — Somalia Famine Response", type: "Surge", urgency: "critical", location: "Mogadishu, Somalia", duration: "6 weeks", sectors: ["Health", "Nutrition"], compensation: "Paid + DSA" },
  { title: "Logistics Coordinator — Sudan Displacement", type: "Surge", urgency: "critical", location: "Port Sudan, Sudan", duration: "2 months", sectors: ["Logistics", "NFI"], compensation: "Paid" },
  { title: "WASH Engineer — Bangladesh Flood Recovery", type: "Deployment", urgency: "high", location: "Sylhet, Bangladesh", duration: "5 months", sectors: ["WASH", "Engineering"], compensation: "Paid" },
  { title: "Protection Officer — Kenya Climate Displacement", type: "Consultancy", urgency: "high", location: "Turkana, Kenya", duration: "3 months", sectors: ["Protection", "Climate"], compensation: "Stipend" },
  { title: "M&E Specialist — Kenya Climate Programme", type: "Consultancy", urgency: "medium", location: "Remote / Nairobi", duration: "4 months", sectors: ["M&E", "Climate"], compensation: "Paid" },
  { title: "Data Analyst — Haiti Earthquake Response", type: "Deployment", urgency: "high", location: "Port-au-Prince, Haiti", duration: "3 months", sectors: ["Data", "Early Warning"], compensation: "Paid" },
  { title: "Field Coordinator — Burundi Early Warning", type: "Deployment", urgency: "medium", location: "Bujumbura, Burundi", duration: "6 months", sectors: ["Coordination", "Early Warning"], compensation: "Paid" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function RosterPage() {
  const [activeTab, setActiveTab] = useState("talent");

  return (
    <>
    <Helmet>
      <title>WDC Expert Roster | Global Humanitarian Talent Pool</title>
      <meta name="description" content="Join the WDC Global Expert Roster — a network of 1,200+ certified humanitarian professionals deployed to disaster response missions in 68 countries. Apply as an expert or find talent for your organisation." />
      <meta name="keywords" content="humanitarian roster, disaster response experts, WDC roster, humanitarian deployment, disaster specialists, NGO talent" />
      <link rel="canonical" href="https://www.worlddisastercenter.org/roster" />
      <meta property="og:title" content="WDC Expert Roster | Global Humanitarian Talent Pool" />
      <meta property="og:description" content="1,200+ certified disaster experts. 68 countries. 18-day average deployment. Join the world's most rigorous humanitarian talent platform." />
      <meta property="og:url" content="https://www.worlddisastercenter.org/roster" />
    </Helmet>
    <div className="bg-white overflow-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-dark overflow-hidden" style={{ background: "linear-gradient(135deg, #001129 0%, #002050 50%, #001129 100%)" }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(0,158,219,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,158,219,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #009EDB 0%, transparent 70%)" }} />

        <div className="container relative pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-light/30 bg-primary/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
              <span className="tagline text-primary-light">WDC Global Roster — Talent Pool</span>
            </div>

            <h1 className="h1 text-n-1 mb-6 leading-tight">
              Deploy World-Class<br />
              <span style={{ background: "linear-gradient(90deg, #009EDB, #4DC0E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Disaster Experts
              </span>
              <br />in Hours, Not Weeks
            </h1>

            <p className="body-1 text-n-3 mb-10 max-w-2xl mx-auto">
              The world's most rigorous humanitarian talent platform. Every expert is certified, vetted, interviewed, and contract-protected by WDC before deployment. Partners get the right specialist — guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/roster/apply"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)", boxShadow: "0 8px 32px rgba(0,158,219,0.4)" }}>
                Apply as Expert <ArrowRight size={18} />
              </Link>
              <Link to="/roster/partner"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border transition-all hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E6F7FF" }}>
                Find Talent for Your Org <ChevronRight size={18} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {STATS.map(({ label, value, suffix, icon: Icon }) => {
                const isLive = label === "Open Opportunities";
                return (
                  <div key={label} className="rounded-2xl p-4 text-center relative" style={{ background: isLive ? "rgba(0,158,219,0.15)" : "rgba(255,255,255,0.05)", border: isLive ? "1px solid rgba(0,158,219,0.4)" : "1px solid rgba(255,255,255,0.08)" }}>
                    {isLive && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400 animate-pulse" />}
                    <Icon size={18} style={{ color: "#009EDB", margin: "0 auto 6px" }} />
                    <div className="text-2xl font-bold text-n-1 mb-0.5">
                      <Counter end={value} suffix={suffix} />
                    </div>
                    <div className="text-[11px] text-n-3 font-medium leading-tight">{label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Pulse Strip ──────────────────────────────────────────────────── */}
      <div style={{ background: "#009EDB" }}>
        <div className="container py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white text-xs font-semibold tracking-wide">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse shrink-0" />
              <span>24 Open Opportunities Right Now</span>
            </div>
            <span className="hidden md:block opacity-30">|</span>
            <div className="flex items-center gap-1.5"><Globe size={13} /><span>Active in 18 Countries</span></div>
            <span className="hidden md:block opacity-30">|</span>
            <div className="flex items-center gap-1.5"><Building2 size={13} /><span>45+ Partner Organisations</span></div>
            <span className="hidden md:block opacity-30">|</span>
            <div className="flex items-center gap-1.5"><Clock size={13} /><span>Average 18 Days from Acceptance to Deployment</span></div>
            <span className="hidden md:block opacity-30">|</span>
            <Link to="/roster/apply" className="underline underline-offset-2 hover:no-underline">Apply Now →</Link>
          </div>
        </div>
      </div>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-surface-subtle">
        <div className="container">
          <p className="tagline text-primary text-center mb-3">The Process</p>
          <h2 className="h2 text-center text-content-primary mb-3">How the WDC Roster Works</h2>
          <p className="body-3 text-content-secondary text-center max-w-xl mx-auto mb-10">
            The most thorough talent pipeline in humanitarian response. No shortcuts — every expert earns their place.
          </p>

          {/* Tab toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 rounded-xl" style={{ background: "#e2e8f0" }}>
              {[["talent", "For Experts & Professionals"], ["partner", "For Organizations & Partners"]].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all"
                  style={{ background: activeTab === key ? "#009EDB" : "transparent", color: activeTab === key ? "#fff" : "#475569" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(activeTab === "talent" ? STEPS_TALENT : STEPS_PARTNER).map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="relative p-6 rounded-2xl bg-white border border-border text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: "#009EDB" }}>{step}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 mt-2" style={{ background: "rgba(0,158,219,0.08)" }}>
                  <Icon size={22} style={{ color: "#009EDB" }} />
                </div>
                <h3 className="font-bold text-content-primary mb-2 text-sm leading-tight">{title}</h3>
                <p className="text-xs text-content-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            {activeTab === "talent" ? (
              <Link to="/roster/apply" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                Start Your Application <ArrowRight size={16} />
              </Link>
            ) : (
              <Link to="/roster/partner" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                Register Your Organization <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Expertise sectors ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container">
          <p className="tagline text-primary text-center mb-3">Areas of Expertise</p>
          <h2 className="h2 text-center text-content-primary mb-10">12 Critical Domains Covered</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SECTORS.map(({ icon: Icon, label, count }) => (
              <div key={label} className="p-4 rounded-2xl border border-border text-center hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors" style={{ background: "rgba(0,158,219,0.08)" }}>
                  <Icon size={18} style={{ color: "#009EDB" }} />
                </div>
                <p className="text-xs font-semibold text-content-primary mb-1 leading-tight">{label}</p>
                <p className="text-[11px] font-bold" style={{ color: "#009EDB" }}>{count} experts</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits split ────────────────────────────────────────────────── */}
      <section className="py-20 bg-surface-subtle">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Talent benefits */}
            <div className="p-8 rounded-3xl" style={{ background: "linear-gradient(135deg, #001129, #002050)", border: "1px solid rgba(0,158,219,0.15)" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-bold" style={{ background: "rgba(0,158,219,0.15)", color: "#4DC0E8" }}>
                <Users size={12} /> For Disaster Professionals
              </div>
              <h3 className="text-2xl font-bold text-n-1 mb-6">Why Join the WDC Roster?</h3>
              <div className="space-y-3">
                {BENEFITS_TALENT.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "#009EDB" }} />
                    <span className="text-sm text-n-3">{b}</span>
                  </div>
                ))}
              </div>
              <Link to="/roster/apply" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                Apply Now <ArrowRight size={14} />
              </Link>
            </div>

            {/* Partner benefits */}
            <div className="p-8 rounded-3xl bg-white" style={{ border: "2px solid #009EDB", boxShadow: "0 0 40px rgba(0,158,219,0.08)" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-bold" style={{ background: "rgba(0,158,219,0.08)", color: "#009EDB" }}>
                <Building2 size={12} /> For NGOs, UN Agencies & Governments
              </div>
              <h3 className="text-2xl font-bold text-content-primary mb-2">Partner With WDC</h3>
              <p className="text-sm text-content-secondary mb-5">Your first month of deployment is completely free. No risk, just results.</p>
              <div className="space-y-3">
                {BENEFITS_PARTNER.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="shrink-0 mt-0.5 text-green-500" />
                    <span className="text-sm text-content-secondary">{b}</span>
                  </div>
                ))}
              </div>
              <Link to="/roster/partner" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
                Get Started Free <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Join — Advantages ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container">
          <p className="tagline text-primary text-center mb-3">Why It Matters</p>
          <h2 className="h2 text-center text-content-primary mb-3">The WDC Roster Advantage</h2>
          <p className="body-3 text-content-secondary text-center max-w-xl mx-auto mb-12">
            This isn't a job board. It's a career-defining platform for humanitarian professionals who want guaranteed deployments, international recognition, and full institutional protection.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADVANTAGES.map(({ icon: Icon, title, desc, highlight }) => (
              <div key={title} className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,158,219,0.08)" }}>
                    <Icon size={20} style={{ color: "#009EDB" }} />
                  </div>
                  <div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2" style={{ background: "rgba(0,158,219,0.1)", color: "#009EDB" }}>{highlight}</span>
                    <h4 className="font-bold text-content-primary mb-1.5 text-sm leading-snug">{title}</h4>
                    <p className="text-xs text-content-secondary leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/roster/apply" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white hover:scale-105 transition-transform" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
              Start Your Application <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Live Opportunities ────────────────────────────────────────────── */}
      <section className="py-20 bg-surface-subtle">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <p className="tagline text-primary">Live Board</p>
              </div>
              <h2 className="h2 text-content-primary">Open Deployments</h2>
              <p className="text-sm text-content-secondary mt-1">
                <span className="font-bold text-content-primary">24 openings</span> across <span className="font-bold text-content-primary">18 countries</span> — updated in real time
              </p>
            </div>
            <Link to="/roster/apply" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)" }}>
              Apply to Join <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_OPPS.map((opp, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-border hover:border-primary/40 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(0,158,219,0.1)", color: "#009EDB" }}>{opp.type}</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase" style={{ background: `${URGENCY_COLOR[opp.urgency]}18`, color: URGENCY_COLOR[opp.urgency] }}>
                    {opp.urgency}
                  </span>
                </div>
                <h4 className="font-bold text-content-primary mb-3 leading-snug text-sm">{opp.title}</h4>
                <div className="space-y-1 mb-3 text-xs text-content-secondary">
                  <div className="flex items-center gap-1.5"><MapPin size={11} />{opp.location}</div>
                  <div className="flex items-center gap-1.5"><Clock size={11} />{opp.duration}</div>
                  <div className="flex items-center gap-1.5"><Star size={11} />{opp.compensation}</div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {opp.sectors.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(0,158,219,0.08)", color: "#009EDB" }}>{s}</span>
                  ))}
                </div>
                <Link to="/roster/apply" className="flex items-center gap-1 text-xs font-bold transition-colors" style={{ color: "#009EDB" }}>
                  Apply for this role <ChevronRight size={13} />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-content-secondary mt-8">
            Showing 8 of <span className="font-bold text-content-primary">24 open opportunities</span>.{" "}
            <Link to="/roster/apply" className="font-bold underline underline-offset-2" style={{ color: "#009EDB" }}>Join the roster to see all openings.</Link>
          </p>
        </div>
      </section>

      {/* ── Quality promise ───────────────────────────────────────────────── */}
      <section className="py-16 bg-surface-subtle">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, label: "Zero Tolerance", desc: "Full background checks. Every single roster member." },
              { icon: Award, label: "Certified Only", desc: "All certifications verified before roster activation." },
              { icon: Zap, label: "48hr Matching", desc: "Urgent requests matched within 48 hours." },
              { icon: CheckCircle, label: "Contract Protected", desc: "WDC contract ensures quality and accountability." },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-6 rounded-2xl bg-white border border-border">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(0,158,219,0.08)" }}>
                  <Icon size={22} style={{ color: "#009EDB" }} />
                </div>
                <h4 className="font-bold text-content-primary mb-1">{label}</h4>
                <p className="text-xs text-content-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #001129 0%, #002050 100%)" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(0,158,219,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,158,219,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-light/30 bg-primary/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="tagline text-primary-light">Deploying experts daily</span>
          </div>
          <h2 className="h2 text-n-1 mb-4 max-w-2xl mx-auto">
            Join the World's Premier<br />Disaster Expert Network
          </h2>
          <p className="body-3 text-n-3 mb-10 max-w-xl mx-auto">
            Whether you're an expert ready to make an impact or an organization needing certified specialists — WDC Roster connects you with the world's best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/roster/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, #009EDB, #0072BC)", boxShadow: "0 8px 32px rgba(0,158,219,0.4)" }}>
              Apply as an Expert <ArrowRight size={18} />
            </Link>
            <Link to="/roster/partner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border hover:bg-white/10 transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "#E6F7FF" }}>
              Partner With WDC <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
