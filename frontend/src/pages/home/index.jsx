import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimateIn from "../../components/AnimateIn";
import SEOMeta from "../../components/SEOMeta";
import {
  ArrowRight, Share2, X, Loader2,
  Radio, Bell, Shield, UserCheck, Landmark, Building, Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "../../lib/supabase";
import { allPartnerLogos } from "../../constants";

import Hero from "../../components/Hero";
import VideoSection from "../../components/videosection";
import Benefits from "../../components/Benefits";
import Solutions from "../../components/CaseStudies";
import GlobalProducts from "../../components/GlobalProducts";
import Animation from "../../components/animator";
import Testimonials from "../../components/Testimonials";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("News");
  const [solutionsSection, setSolutionsSection] = useState("Solutions");

  const [news, setNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    const fetchLatestIntel = async () => {
      setIsLoadingNews(true);
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("status", "published")
        .eq("category", "Disaster")
        .order("created_at", { ascending: false })
        .limit(3);
      if (data && !error) setNews(data);
      setIsLoadingNews(false);
    };
    fetchLatestIntel();
  }, [activeSection]);

  const handleShare = (id) => {
    const shareUrl = `${window.location.origin}/news?article=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="bg-white overflow-hidden">
      <SEOMeta
        title="World Disaster Center — Monitoring. Alerting. Protecting."
        description="World Disaster Center uses AI to monitor disasters, deliver early warnings, and protect the world's most vulnerable people. The Michael platform. 11 campaigns. Field missions worldwide."
        image="https://images.unsplash.com/photo-1594841343391-97ac1b9a950e?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/"
      />
      <Hero />
      <VideoSection />
      <Benefits />

      {/* ── HOW WE WORK ── */}
      <section style={{ background: "#001129", padding: "clamp(2.5rem, 6vw, 5rem) 0" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.22em", color: "#009EDB", textTransform: "uppercase", marginBottom: 8 }}>Our Approach</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 0 }}>
              Disasters are inevitable.<br />
              <span style={{ color: "#009EDB" }}>Being unprepared isn't.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {[
              {
                num: "01",
                Icon: Radio,
                title: "Monitor",
                desc: "MICHAEL — our AI platform — tracks 1,000+ live crisis events worldwide in real time: earthquakes, floods, conflict, disease outbreaks, and climate emergencies.",
                link: { label: "Open MICHAEL", href: "https://michael.worlddisastercenter.org", external: true },
              },
              {
                num: "02",
                Icon: Bell,
                title: "Alert",
                desc: "Field officers, partner organizations, and AI-powered early warning systems deliver life-saving alerts to communities before disasters escalate into catastrophe.",
                link: { label: "See our campaigns", to: "/campaigns", external: false },
              },
              {
                num: "03",
                Icon: Shield,
                title: "Protect",
                desc: "Disaster Heroes sponsors, WDC partners, and our global network mobilize shelter, health care, education, and emergency relief for the most vulnerable people on Earth.",
                link: { label: "Become a Disaster Hero", to: "/disaster-heroes", external: false },
              },
            ].map((step) => (
              <div key={step.num} style={{ borderTop: "2px solid #009EDB", paddingTop: "1.5rem" }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: "#009EDB", letterSpacing: "0.22em", textTransform: "uppercase" }}>{step.num}</span>
                <div style={{ margin: "0.85rem 0 1rem", color: "#009EDB" }}>
                  <step.Icon size={36} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: "0.75rem" }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "1.25rem" }}>{step.desc}</p>
                {step.link.external ? (
                  <a href={step.link.href} target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 800, color: "#009EDB", textDecoration: "none" }}>
                    {step.link.label} <ArrowRight size={12} />
                  </a>
                ) : (
                  <Link to={step.link.to}
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 800, color: "#009EDB", textDecoration: "none" }}>
                    {step.link.label} <ArrowRight size={12} />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Disaster Heroes callout */}
          <div style={{
            marginTop: "2.5rem",
            background: "linear-gradient(135deg, rgba(0,158,219,0.12) 0%, rgba(0,158,219,0.04) 100%)",
            border: "1px solid rgba(0,158,219,0.25)",
            borderRadius: 12,
            padding: "clamp(1rem, 4vw, 1.5rem) clamp(1rem, 5vw, 2rem)",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flex: "1 1 260px", minWidth: 0 }}>
              <div style={{ background: "#009EDB", borderRadius: 10, padding: 10, flexShrink: 0 }}>
                <Heart size={20} color="#fff" strokeWidth={1.8} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 900, color: "#fff", lineHeight: 1.25 }}>
                  Sponsor a real person in crisis — for as little as $20/month.
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "clamp(11px, 2.5vw, 13px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                  Disaster Heroes connects you directly to verified individuals and families. Your commitment continues for as long as they need you.
                </p>
              </div>
            </div>
            <Link to="/disaster-heroes"
              style={{
                flex: "1 1 auto",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "#009EDB", color: "#fff", borderRadius: 8,
                padding: "11px 22px", fontWeight: 900, fontSize: 13,
                textDecoration: "none",
              }}>
              Find a case to support <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              1 in 4 people live in a country affected by violent conflict or disaster.
            </p>
            <a href="https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#009EDB", color: "#fff", borderRadius: 8, padding: "9px 20px", fontWeight: 800, fontSize: 13, textDecoration: "none" }}>
              Donate to WDC
            </a>
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS MARQUEE ── */}
      <div style={{ background: "#f8fafc", borderTop: "1px solid #e8edf3", borderBottom: "1px solid #e8edf3", padding: "2rem 0", overflow: "hidden" }}>
        <style>{`
          @keyframes partner-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <p style={{ textAlign: "center", fontSize: 10, fontWeight: 900, letterSpacing: "0.22em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "1.25rem" }}>
          Trusted by leading organizations worldwide
        </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            display: "flex",
            gap: 48,
            alignItems: "center",
            animation: "partner-scroll 40s linear infinite",
            whiteSpace: "nowrap",
          }}>
            {[...allPartnerLogos, ...allPartnerLogos].map((p, i) => (
              <div key={i} style={{ flexShrink: 0, width: 110, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={p.src}
                  alt={p.alt}
                  title={p.alt}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "grayscale(100%) opacity(0.55)", transition: "filter 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.filter = "grayscale(0%) opacity(1)"}
                  onMouseLeave={e => e.currentTarget.style.filter = "grayscale(100%) opacity(0.55)"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Switcher */}
      <div className="bg-surface-subtle">
        <div className="container sm:px-2 py-16">
          <div className="flex w-full border-b border-gray-200 mb-10">
            <button
              onClick={() => setSolutionsSection("GlobalProducts")}
              className={`w-1/2 py-3 sm:py-5 font-bold text-sm sm:text-lg transition-all ${
                solutionsSection === "GlobalProducts"
                  ? "text-primary border-b-4 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Global Products
            </button>
            <button
              onClick={() => setSolutionsSection("Solutions")}
              className={`w-1/2 py-3 sm:py-5 font-bold text-sm sm:text-lg transition-all ${
                solutionsSection === "Solutions"
                  ? "text-primary border-b-4 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tailored Solutions
            </button>
          </div>
          <div className="w-full transition-all duration-500">
            {solutionsSection === "Solutions" ? <Solutions /> : <GlobalProducts />}
          </div>
        </div>
      </div>

      {/* Intelligence / News Section */}
      <div className="bg-white">
        <div className="container sm:px-2 py-20">
          {/* Section header */}
          <AnimateIn variant="fadeUp">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
              <div>
                <p className="tagline text-primary mb-2">Latest Updates</p>
                <h2 className="h2 text-content-primary mb-4">Latest Intelligence</h2>
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveSection("News")}
                    className={`pb-1 text-sm font-bold tracking-wider uppercase transition-colors border-b-2 ${
                      activeSection === "News"
                        ? "text-primary border-primary"
                        : "text-gray-400 border-transparent hover:text-gray-600"
                    }`}
                  >
                    News &amp; Info
                  </button>
                  <button
                    onClick={() => setActiveSection("Events")}
                    className={`pb-1 text-sm font-bold tracking-wider uppercase transition-colors border-b-2 ${
                      activeSection === "Events"
                        ? "text-primary border-primary"
                        : "text-gray-400 border-transparent hover:text-gray-600"
                    }`}
                  >
                    Global Events
                  </button>
                </div>
              </div>
              <Link
                to="/news"
                className="flex items-center gap-2 text-primary font-bold hover:underline tracking-wide uppercase text-sm mt-2 sm:mt-0"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {isLoadingNews ? (
              <div className="col-span-3 flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={36} />
              </div>
            ) : news.length > 0 ? (
              news.map((item, newsIdx) => (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveArticle(item)}
                  className="bg-white rounded border border-gray-200 border-t-4 border-t-primary cursor-pointer group flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: newsIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                >
                  {item.image_url && (
                    <div className="w-full h-44 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-primary-muted text-primary rounded mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-content-primary leading-snug group-hover:text-primary transition-colors line-clamp-3 flex-1">
                      {item.title}
                    </h3>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <p className="text-gray-400 text-xs tracking-wider uppercase">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <ArrowRight
                        size={16}
                        className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400 py-10 uppercase tracking-widest text-sm">
                No recent intelligence available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-6"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-4xl max-h-[85vh] overflow-y-auto border-t-4 border-t-primary shadow-2xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-all z-10"
            >
              <X size={18} />
            </button>

            {activeArticle.image_url && (
              <div className="w-full h-[35vh] relative flex-shrink-0">
                <img
                  src={activeArticle.image_url}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}

            <div className="p-8 md:p-12 flex-1">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-primary text-white rounded">
                    {activeArticle.category}
                  </span>
                  <span className="text-gray-400 text-xs tracking-wider uppercase">
                    {new Date(activeArticle.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <button
                  onClick={() => handleShare(activeArticle.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-content-primary mb-6 leading-tight">
                {activeArticle.title}
              </h2>
              <div
                className="text-base text-content-secondary leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(activeArticle.content),
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Join Our Network — 3-audience section */}
      <div className="relative py-16 sm:py-24 overflow-hidden" style={{ background: "#05081a" }}>
        {/* World map watermark */}
        <div
          className="absolute inset-0 opacity-[0.04] bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=60')" }}
        />
        <div className="container relative z-10">
          <AnimateIn variant="fadeUp">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[#009EDB] text-xs font-black tracking-widest uppercase mb-3">Join Our Network</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                Who Are You?<br className="hidden sm:block" />
                <span className="text-[#009EDB]">There's a Role for Everyone.</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                WDC's global network brings together experts, organizations, and partners
                committed to ending preventable disaster impacts.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                Icon: UserCheck,
                color: "#009EDB",
                label: "Expert / Professional",
                heading: "Apply to the Roster",
                body: "Vetted humanitarian professionals — field responders, analysts, logisticians, health workers — deployed where they're needed most.",
                stats: [{ v: "2,000+", l: "Members" }, { v: "72h", l: "Deploy time" }, { v: "47", l: "Countries" }],
                cta: "Apply Now",
                href: "/roster/apply",
              },
              {
                Icon: Landmark,
                color: "#f97316",
                label: "NGO / Government",
                heading: "Request Deployment",
                body: "Access a global pool of vetted experts for your next emergency response, capacity-building mission, or early-warning programme.",
                stats: [{ v: "150+", l: "Deployments" }, { v: "24/7", l: "Availability" }, { v: "60+", l: "Partners" }],
                cta: "Request Experts",
                href: "/roster",
              },
              {
                Icon: Building,
                color: "#a855f7",
                label: "Company / Funder",
                heading: "Partner With WDC",
                body: "Fund life-saving missions, co-develop products, or provide in-kind support. Your investment reaches the communities that need it most.",
                stats: [{ v: "$2M+", l: "Mobilised" }, { v: "11", l: "Campaigns" }, { v: "3x", l: "Impact ratio" }],
                cta: "Become a Partner",
                href: "/about/partner-with-us",
              },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={card.href}
                  className="flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 p-6 group hover:border-white/20 hover:bg-white/8 transition-all duration-300"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div style={{ color: card.color }}>
                      <card.Icon size={22} strokeWidth={1.6} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: card.color }}>{card.label}</span>
                  </div>
                  <h3 className="text-white font-black text-xl mb-3">{card.heading}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">{card.body}</p>
                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10 mb-5">
                    {card.stats.map((s) => (
                      <div key={s.l} className="text-center">
                        <div className="font-black text-base leading-none mb-1" style={{ color: card.color }}>{s.v}</div>
                        <div className="text-white/30 text-[10px] uppercase tracking-wide">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-black transition-all group-hover:gap-2.5" style={{ color: card.color }}>
                    {card.cta} <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Testimonials />
      <Animation />
    </div>
  );
};

export default HomePage;
