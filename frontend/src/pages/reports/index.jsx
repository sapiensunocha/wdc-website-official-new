import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AnimateIn from "../../components/AnimateIn";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, FileText, Download, ArrowRight, BookOpen, Filter, Eye,
         BarChart2, Globe, Users, Cpu, Layers, Shield, BookOpen as BookIcon,
         Heart, TrendingUp, MapPin, Satellite, Activity } from "lucide-react";
import { REPORTS, CATEGORIES, getCategoryColor } from "../../assets/data/reports";
import { PROJECT_REPORTS, getProjectCategoryColor } from "../../assets/data/projectReports";

const getDocCategoryColor = (cat) => getCategoryColor(cat) || getProjectCategoryColor(cat) || "bg-gray-100 text-gray-700";

const ALL_DOCS = [...REPORTS, ...PROJECT_REPORTS];

// ── Per-report unique cover image override map ─────────────────────────────
const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
const COVER_MAP = {
  // Annual Reports — distinct images per year
  "annual-2024":               U("1531482615713-2afd69097998"),
  "annual-2023":               U("1469571486292-0ba58a3f068b"),
  "annual-2022":               U("1517048676732-d65bc937f952"),
  "annual-2021":               U("1504868584819-f8e8b4b6d7e3"),
  // Financial Reports
  "financial-2024":            U("1460925895917-afdab827c52f"),
  "financial-2023":            U("1611974789855-9c2a0a7236a3"),
  "financial-2022":            U("1579621970563-ebec7560ff3e"),
  // Field Missions
  "mission-drc-2023":          U("1593113616828-6f22bca04804"),
  "mission-burundi-2023":      U("1578662996442-48f60103fc96"),
  "mission-haiti-2024":        U("1566125882500-87e10f726cdc"),
  "mission-sudan-2024":        U("1604497181015-76590d828b50"),
  "mission-jamaica-2024":      U("1529390079861-591de354faf5"),
  "mission-afghanistan-2024":  U("1446776811953-b23d57bd21aa"),
  // Technology / Product
  "tech-michael-2024":         U("1518186285589-2f7649de83e0"),
  "tech-eagle-2023":           U("1446776653964-20c1d3a81b06"),
  "tech-accuracy-2024":        U("1551288049-bebda4e38f71"),
  "tech-nostradamus-2024":     U("1526778548025-fa2f459cd5c1"),
  "tech-crisisatlas-2024":     U("1581091226825-a6a2a5aee158"),
  // Thematic & Policy
  "thematic-ai-2024":          U("1558494949-ef010cbdcc31"),
  "thematic-africa-ews-2024":  U("1547471080-7cc2caa01a7e"),
  "strategic-plan-2024":       U("1542393545-10f5cde2c810"),
  "policy-data-2024":          U("1454165804606-c3d57bc86b40"),
  "policy-gender-2024":        U("1573496359142-b8d87734a5a2"),
  // Country Reports
  "country-kenya-2024":        U("1488521787991-ed7bbaae773c"),
  "country-rwanda-2024":       U("1614850523296-d8c1af93d400"),
  "country-bangladesh-2024":   U("1582213782179-e0d53f98f2ca"),
  // Project Products
  "project-argus-2024":        U("1504868584819-f8e8b4b6d7e3"),
  "project-lifeline-2024":     U("1526778548025-fa2f459cd5c1"),
  "project-tectra-2024":       U("1460925895917-afdab827c52f"),
  "project-nova7-2024":        U("1517048676732-d65bc937f952"),
  "project-michael-mobile-2025": U("1581091226825-a6a2a5aee158"),
  "project-drone-iot-2025":    U("1446776653964-20c1d3a81b06"),
  // Field Missions 2025
  "mission-drc-2025":          U("1488521787991-ed7bbaae773c"),
  "mission-burundi-2025":      U("1469571486292-0ba58a3f068b"),
  "mission-west-africa-2024":  U("1529390079861-591de354faf5"),
  // EAGLE Assessments
  "eagle-drc-assessment-2023": U("1518186285589-2f7649de83e0"),
  "eagle-burundi-2023":        U("1446776811953-b23d57bd21aa"),
  "eagle-haiti-2024":          U("1566125882500-87e10f726cdc"),
  // Research & Publications
  "research-climb-2024":       U("1611974789855-9c2a0a7236a3"),
  "research-michael-paper-2025": U("1542393545-10f5cde2c810"),
  "research-founding-2023":    U("1531482615713-2afd69097998"),
  "research-founding-2020":    U("1531482615713-2afd69097998"),
  "book-breaking-barriers-2024": U("1543002588-bfa74002ed7e"),
  // Community Programs
  "program-academy-2024":      U("1522202176988-66273c2fd55f"),
  "program-be-reporter-2024":  U("1593113616828-6f22bca04804"),
  "program-expert-roster-2024": U("1469571486292-0ba58a3f068b"),
  "program-titan-taskforce-2024": U("1604497181015-76590d828b50"),
  "program-30day-challenge-2025": U("1551288049-bebda4e38f71"),
  "program-africa-gap-2024":   U("1547471080-7cc2caa01a7e"),
  "program-united-change-2025": U("1517048676732-d65bc937f952"),
  "program-wdc-partnerships-2024": U("1460925895917-afdab827c52f"),
};

// Resolve the cover image for any doc: COVER_MAP first, then data field
const getDocCover = (doc) => COVER_MAP[doc.id] || doc.coverImage || null;

// ── Per-category visual theme for the no-image designed preview ─────────────
const CAT_THEME = {
  "Annual Reports":           { bg: "#0F2537", accent: "#1F9AD9", label: "Annual Report",       symbol: "AR" },
  "Financial Reports":        { bg: "#064336", accent: "#10B981", label: "Financial Report",    symbol: "FR" },
  "Field Mission Reports":    { bg: "#7C2D12", accent: "#F97316", label: "Field Mission",       symbol: "FM" },
  "Product Reports":          { bg: "#3B0764", accent: "#A855F7", label: "Product Report",      symbol: "PR" },
  "Thematic & Policy Reports":{ bg: "#450A0A", accent: "#EF4444", label: "Thematic Report",    symbol: "TP" },
  "Country Reports":          { bg: "#042F2E", accent: "#14B8A6", label: "Country Report",      symbol: "CR" },
  "Research & Publications":  { bg: "#1E1B4B", accent: "#818CF8", label: "Publication",         symbol: "RS" },
  "Community Programs":       { bg: "#500724", accent: "#EC4899", label: "Program Report",      symbol: "CP" },
};
const defaultTheme = { bg: "#1C2B39", accent: "#1F9AD9", label: "WDC Document", symbol: "WD" };

const ReportsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return ALL_DOCS.filter((r) => {
      const matchCat = activeCategory === "All" || r.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const countByCategory = useMemo(() => {
    const counts = {};
    ALL_DOCS.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>WDC Reports & Documents | World Disaster Center</title>
        <meta name="description" content="Official publications of the World Disaster Center — annual reports, field mission reports, financial summaries, technology documentation, thematic analyses, and country situation reports." />
        <link rel="canonical" href="https://www.worlddisastercenter.org/reports" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WDC Reports & Documents | World Disaster Center" />
        <meta property="og:description" content="50 official publications: annual reports, field missions, technology, policy, and country reports — free to read and download." />
        <meta property="og:url" content="https://www.worlddisastercenter.org/reports" />
        <meta property="og:image" content="https://i.ibb.co/kJ63JTV/wdclogobg.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WDC Reports & Documents | World Disaster Center" />
        <meta name="twitter:description" content="50 official WDC publications — annual reports, field missions, technology, policy, and country reports." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "WDC Reports & Documents",
          "description": "Official publications of the World Disaster Center covering annual reports, field missions, financial summaries, technology documentation, thematic analyses, and country situation reports.",
          "url": "https://www.worlddisastercenter.org/reports",
          "publisher": {
            "@type": "Organization",
            "name": "World Disaster Center",
            "url": "https://www.worlddisastercenter.org",
            "logo": "https://i.ibb.co/kJ63JTV/wdclogobg.png"
          },
          "numberOfItems": ALL_DOCS.length
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-16">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
          <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-3">
            Documentation Hub
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            WDC Reports & Documents
          </h1>
          <p className="text-gray-300 text-base max-w-2xl leading-relaxed mb-8">
            All annual reports, financial summaries, field mission reports, product documentation, thematic analyses, and country situation reports — published and signed by Sapiens Ndatabaye, Founder & Executive Director.
          </p>
          {/* Search */}
          <div className="relative max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports by title, topic, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#009EDB] text-sm"
            />
          </div>
          </AnimateIn>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary py-4 border-b border-primary/80">
        <div className="container sm:px-2">
          <div className="flex flex-wrap gap-6 text-white text-sm">
            <span className="font-bold">{ALL_DOCS.length} Documents</span>
            <span className="text-white/60">|</span>
            <span>{Object.keys(countByCategory).length} Categories</span>
            <span className="text-white/60">|</span>
            <span>All signed by Sapiens Ndatabaye, Founder & CEO</span>
            <span className="text-white/60">|</span>
            <span>Free to read & download</span>
          </div>
        </div>
      </section>

      {/* Main layout */}
      <div className="container sm:px-2 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={16} className="text-primary" />
                <h2 className="text-sm font-black uppercase tracking-widest text-content-primary">
                  Filter by Category
                </h2>
              </div>
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const count = cat === "All" ? ALL_DOCS.length : (countByCategory[cat] || 0);
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded text-sm text-left transition-all ${
                        activeCategory === cat
                          ? "bg-primary text-white font-bold"
                          : "text-content-secondary hover:bg-gray-50 hover:text-primary"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        activeCategory === cat ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-100">
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">
                  All Documents
                </p>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Published by World Disaster Center. Signed by Sapiens Ndatabaye, Founder & Executive Director. Free to read, share, and download.
                </p>
                <p className="text-xs text-content-secondary mt-2">
                  Questions? <a href="mailto:office@worlddisastercenter.org" className="text-primary underline">office@worlddisastercenter.org</a>
                </p>
              </div>
            </div>
          </aside>

          {/* Document grid */}
          <main className="flex-1 min-w-0">
            {/* Result count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-content-secondary">
                {filtered.length === ALL_DOCS.length
                  ? `All ${ALL_DOCS.length} documents`
                  : `${filtered.length} of ${ALL_DOCS.length} documents`}
                {activeCategory !== "All" && ` in "${activeCategory}"`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
              {(activeCategory !== "All" || searchQuery) && (
                <button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="text-xs text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Category groups */}
            {activeCategory === "All" && !searchQuery ? (
              CATEGORIES.filter(c => c !== "All").map((cat) => {
                const catDocs = ALL_DOCS.filter(r => r.category === cat);
                if (!catDocs.length) return null;
                return (
                  <div key={cat} className="mb-12">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                      <h2 className="text-lg font-bold text-content-primary">{cat}</h2>
                      <span className="text-xs text-gray-400">{catDocs.length} documents</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {catDocs.map(doc => <DocCard key={doc.id} doc={doc} />)}
                    </div>
                  </div>
                );
              })
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map(doc => <DocCard key={doc.id} doc={doc} />)}
              </div>
            ) : (
              <div className="text-center py-20 text-content-secondary">
                <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
                <p className="font-bold mb-1">No documents found</p>
                <p className="text-sm">Try a different search term or category.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// ── PDF preview thumbnail ──────────────────────────────────────────────────
const DocPreview = ({ doc }) => {
  const cover = getDocCover(doc);
  const theme = CAT_THEME[doc.category] || defaultTheme;

  if (cover) {
    return (
      <div className="relative overflow-hidden" style={{ height: 210 }}>
        <img
          src={cover}
          alt={doc.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient overlay — stronger at bottom */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${theme.bg}F0 0%, ${theme.bg}80 40%, transparent 100%)` }}
        />
        {/* Top bar: WDC branding + category */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2"
          style={{ background: `${theme.bg}CC` }}>
          <span className="text-[8px] font-black text-white uppercase tracking-widest opacity-80">
            World Disaster Center
          </span>
          <span className="text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-widest"
            style={{ backgroundColor: theme.accent, color: "#fff" }}>
            {theme.symbol}
          </span>
        </div>
        {/* Bottom: title + accent bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6">
          <p className="text-white text-[11px] font-black leading-snug line-clamp-2 uppercase tracking-wide drop-shadow-md">
            {doc.title}
          </p>
          {doc.subtitle && (
            <p className="text-[10px] font-semibold mt-0.5 leading-snug line-clamp-1 drop-shadow-sm"
              style={{ color: theme.accent }}>
              {doc.subtitle}
            </p>
          )}
        </div>
        {/* Accent bar at very bottom left */}
        <div className="absolute bottom-0 left-0 h-[3px] w-14 rounded-tr"
          style={{ backgroundColor: theme.accent }} />
        {/* Year badge top-right */}
        {doc.year && (
          <div className="absolute top-8 right-3 text-white text-[9px] font-black opacity-60">
            {doc.year}
          </div>
        )}
      </div>
    );
  }

  // Designed fallback: no photo — rich category-branded cover
  return (
    <div className="relative overflow-hidden flex flex-col" style={{ height: 210, backgroundColor: theme.bg }}>
      {/* Abstract geometric circle — decorative */}
      <div className="absolute -right-8 -top-8 rounded-full opacity-10"
        style={{ width: 120, height: 120, backgroundColor: theme.accent }} />
      <div className="absolute -left-4 bottom-10 rounded-full opacity-5"
        style={{ width: 80, height: 80, backgroundColor: theme.accent }} />

      {/* Top strip */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <p className="text-[8px] font-black text-white uppercase tracking-widest opacity-60">
          World Disaster Center
        </p>
        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-sm"
          style={{ backgroundColor: theme.accent, color: "#fff" }}>
          PDF
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-3 flex flex-col justify-between relative z-10">
        <div>
          {/* Category label */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-[2px] rounded" style={{ backgroundColor: theme.accent }} />
            <span className="text-[8px] font-black uppercase tracking-widest"
              style={{ color: theme.accent }}>
              {theme.label}
            </span>
          </div>
          {/* Title */}
          <p className="text-white text-[12px] font-black uppercase leading-tight line-clamp-3 tracking-wide">
            {doc.title}
          </p>
          {doc.subtitle && (
            <p className="text-[10px] font-medium mt-1.5 leading-snug line-clamp-2 opacity-70"
              style={{ color: theme.accent }}>
              {doc.subtitle}
            </p>
          )}
        </div>

        {/* Bottom info row */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-[9px] text-white/40 font-bold">{doc.date}</span>
          <span className="text-[9px] text-white/40 font-bold">{doc.pages}pp</span>
        </div>
      </div>

      {/* Accent bar at bottom */}
      <div className="h-[3px]" style={{ backgroundColor: theme.accent }} />
    </div>
  );
};

// ── Main document card ────────────────────────────────────────────────────────
const DocCard = ({ doc }) => {
  const catColor = getDocCategoryColor(doc.category);

  const pdfUrl = `https://github.com/sapiensunocha/wdc-website-official-new/releases/download/v1.0-reports/${doc.id}.pdf`;
  const handleDownload = (e) => {
    e.preventDefault();
    window.open(pdfUrl, "_blank");
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 flex flex-col group overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(0,0,0,0.12)" }}
    >
      {/* ── PDF Preview thumbnail ── */}
      <div className="relative">
        <DocPreview doc={doc} />
        {/* Hover overlay with quick-view */}
        <Link
          to={`/reports/${doc.id}`}
          className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ backgroundColor: "rgba(28, 43, 57, 0.75)" }}
        >
          <Eye size={16} className="text-white" />
          <span className="text-white text-xs font-bold">Preview Document</span>
        </Link>
      </div>

      {/* ── Card body ── */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={`inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-widest rounded ${catColor}`}>
            {doc.category}
          </span>
          <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">{doc.date}</span>
        </div>

        <h3 className="text-sm font-bold text-[#1C2B39] leading-snug mb-1 line-clamp-2">
          {doc.title}
        </h3>
        {doc.subtitle && (
          <p className="text-xs font-medium text-[#1F9AD9] mb-1.5 leading-snug line-clamp-1">
            {doc.subtitle}
          </p>
        )}
        <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-2 mb-3">
          {doc.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {doc.tags.slice(0, 3).map((t) => (
            <span key={t} className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5">
              {t}
            </span>
          ))}
          {doc.tags.length > 3 && (
            <span className="text-[10px] text-gray-400">+{doc.tags.length - 3}</span>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <FileText size={11} />
            <span>{doc.pages}pp</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Link
              to={`/reports/${doc.id}`}
              className="inline-flex items-center gap-1 text-white text-[11px] font-bold px-3 py-1.5 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#1F9AD9" }}
            >
              Read <ArrowRight size={10} />
            </Link>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1 border border-gray-200 text-gray-500 text-[11px] font-bold px-3 py-1.5 hover:border-[#1F9AD9] hover:text-[#1F9AD9] transition-colors"
            >
              <Download size={10} /> PDF
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsPage;
