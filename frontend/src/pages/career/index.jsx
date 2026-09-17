import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  MapPin, Clock, Building2, ExternalLink, Search, ChevronDown,
  Briefcase, Globe, RefreshCw,
} from "lucide-react";
import AnimateIn from "../../components/AnimateIn";
import SEOMeta from "../../components/SEOMeta";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://wdc-backend-1044744936985.us-central1.run.app";
const WDC_ORG_URL = "https://www.idealist.org/en/nonprofit/059fab99846344a385266ced93563c9f-world-disaster-center-new-york";

const TYPE_COLOR = {
  "Job":        { bg: "#E8F5FC", text: "#009EDB", border: "#009EDB33" },
  "Volunteer":  { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d033" },
  "Internship": { bg: "#fdf4ff", text: "#9333ea", border: "#d8b4fe33" },
  "Fellowship": { bg: "#fff7ed", text: "#ea580c", border: "#fed7aa33" },
  "default":    { bg: "#f1f5f9", text: "#475569", border: "#e2e8f033" },
};

function typeStyle(type) {
  return TYPE_COLOR[type] || TYPE_COLOR["default"];
}

function JobCard({ job, index }) {
  const [expanded, setExpanded] = useState(false);
  const ts = typeStyle(job.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border overflow-hidden"
      style={{
        borderColor: expanded ? "#009EDB" : "#E2E8F0",
        boxShadow: expanded
          ? "0 0 0 2px #009EDB22, 0 8px 32px rgba(0,0,0,0.06)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.25s",
      }}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{ background: ts.bg, color: ts.text, border: `1px solid ${ts.border}` }}
              >
                {job.type || "Position"}
              </span>
              {job.locationType && (
                <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                  {job.locationType}
                </span>
              )}
              <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                Active
              </span>
            </div>

            <h3 className="text-lg font-black leading-snug mb-2" style={{ color: "#0D1F2D" }}>
              {job.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm" style={{ color: "#475569" }}>
              {job.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} style={{ color: "#94A3B8" }} />
                  {job.location}
                </span>
              )}
              {job.commitment && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} style={{ color: "#94A3B8" }} />
                  {job.commitment}
                </span>
              )}
              {job.department && (
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} style={{ color: "#94A3B8" }} />
                  {job.department}
                </span>
              )}
            </div>
          </div>

          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-85"
            style={{ background: "#009EDB" }}
          >
            Apply <ExternalLink size={13} />
          </a>
        </div>

        {job.description && (
          <div className="mt-4">
            <AnimatePresence initial={false}>
              {!expanded ? (
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#64748B" }}>
                  {job.description}
                </p>
              ) : (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                    {job.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(p => !p)}
              className="flex items-center gap-1 mt-2 text-xs font-bold transition-colors hover:opacity-70"
              style={{ color: "#009EDB" }}
            >
              {expanded ? "Show less" : "Show more"}
              <ChevronDown
                size={13}
                style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
              />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex gap-2 mb-3">
            <div className="h-5 w-20 rounded-full bg-slate-100" />
            <div className="h-5 w-16 rounded-full bg-slate-100" />
          </div>
          <div className="h-5 w-3/4 rounded bg-slate-100 mb-2" />
          <div className="h-4 w-1/2 rounded bg-slate-100" />
        </div>
        <div className="h-10 w-20 rounded-xl bg-slate-100 shrink-0" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 rounded bg-slate-100 w-full" />
        <div className="h-3 rounded bg-slate-100 w-5/6" />
      </div>
    </div>
  );
}

export default function CareerPage() {
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");

  async function loadJobs() {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`${API_BASE}/api/idealist/jobs`);
      const data = await res.json();
      if (Array.isArray(data.jobs) && data.jobs.length > 0) {
        setJobs(data.jobs);
      } else {
        setError("No positions returned from Idealist.");
      }
    } catch (err) {
      setError("Could not load positions. Please try again or view on Idealist.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadJobs(); }, []);

  const types    = ["All", ...Array.from(new Set(jobs.map(j => j.type).filter(Boolean)))];
  const filtered = jobs.filter(j => {
    const matchType   = filter === "All" || j.type === filter;
    const matchSearch = !search.trim() ||
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.description?.toLowerCase().includes(search.toLowerCase()) ||
      j.location?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <>
      <SEOMeta
        title="Humanitarian Jobs & Volunteer Careers | Disaster Management, NGO, GIS, WASH Positions"
        description="Search humanitarian jobs and volunteer opportunities worldwide. WDC lists remote NGO careers in disaster management, GIS, WASH, emergency response, early warning, protection, and AI. Updated live from Idealist."
        url="/careers"
      />
      <Helmet>
        <meta name="keywords" content="humanitarian jobs, NGO jobs remote, disaster management jobs, WASH jobs, GIS humanitarian jobs, emergency response coordinator, aid worker jobs, disaster risk reduction jobs, DRR jobs, relief jobs, humanitarian careers, volunteer opportunities NGO, remote humanitarian work, international development jobs, early warning jobs, protection officer jobs" />
        {jobs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(jobs.map(job => ({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              "title": job.title,
              "description": job.description,
              "datePosted": "2026-09-01",
              "validThrough": "2026-12-31",
              "employmentType": job.commitment && job.commitment.includes("Full") ? "FULL_TIME" : "PART_TIME",
              "jobLocationType": "TELECOMMUTE",
              "applicantLocationRequirements": { "@type": "Country", "name": "Worldwide" },
              "hiringOrganization": {
                "@type": "Organization",
                "name": "World Disaster Center",
                "sameAs": "https://www.worlddisastercenter.org",
                "logo": "https://i.ibb.co/kJ63JTV/wdclogobg.png"
              },
              "jobLocation": {
                "@type": "Place",
                "address": { "@type": "PostalAddress", "addressCountry": "US", "addressLocality": "New York" }
              },
              "url": job.applicationUrl,
              "directApply": false
            })))}
          </script>
        )}
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24" style={{ background: "linear-gradient(135deg, #F8FAFB 0%, #E8F5FC 100%)" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-black tracking-widest uppercase">Careers</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4" style={{ color: "#0D1F2D" }}>
                Help Build a Safer World
              </h1>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#475569" }}>
                WDC is on a mission to end preventable disaster impacts across 142 countries. We're looking for talent in AI, disaster intelligence, satellite systems, communications, partnerships, and humanitarian operations — from all backgrounds and all corners of the world.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Jobs section */}
      <section className="py-14 bg-white">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black" style={{ color: "#0D1F2D" }}>Open Positions</h2>
                <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
                  {loading ? "Loading live listings…" : `${filtered.length} position${filtered.length !== 1 ? "s" : ""} available`}
                  {!loading && !error && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold text-green-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Live from Idealist
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadJobs}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all hover:bg-slate-50"
                  style={{ borderColor: "#E2E8F0", color: "#475569" }}
                  title="Refresh listings"
                >
                  <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
                </button>
                <a
                  href={WDC_ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all hover:bg-slate-50"
                  style={{ borderColor: "#E2E8F0", color: "#475569" }}
                >
                  <Globe size={14} /> View on Idealist <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </AnimateIn>

          {/* Search + filter */}
          <AnimateIn variant="fadeUp" delay={0.05}>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94A3B8" }} />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search positions, skills, location…"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E2E8F0", color: "#0D1F2D", background: "#FAFAFA" }}
                />
              </div>
              {!loading && types.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {types.map(t => (
                    <button
                      key={t}
                      onClick={() => setFilter(t)}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold border transition-all"
                      style={{
                        background:  filter === t ? "#009EDB" : "#F8FAFB",
                        color:       filter === t ? "#fff"    : "#475569",
                        borderColor: filter === t ? "#009EDB" : "#E2E8F0",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </AnimateIn>

          {/* SEO keyword-content section — visible to crawlers, unobtrusive to users */}
          <section aria-label="About WDC humanitarian positions">
            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-3xl">
              World Disaster Center (WDC) lists humanitarian job opportunities and volunteer positions across disaster management, early warning systems, GIS &amp; remote sensing, WASH (water, sanitation and hygiene), emergency response coordination, protection, and AI-powered disaster intelligence. All positions are open to international candidates and are primarily remote. WDC is an equal opportunity humanitarian employer serving 142 countries across 6 continents. Browse and apply to NGO jobs, disaster coordinator positions, field assessment roles, and technical volunteer opportunities below.
            </p>
          </section>

          {/* Loading skeletons */}
          {loading && (
            <div className="flex flex-col gap-4">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="flex flex-col items-center py-16 gap-4 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <Briefcase size={22} style={{ color: "#f87171" }} />
              </div>
              <p className="font-bold text-base" style={{ color: "#0D1F2D" }}>{error}</p>
              <div className="flex gap-3 mt-2 flex-wrap justify-center">
                <button
                  onClick={loadJobs}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border"
                  style={{ borderColor: "#E2E8F0", color: "#475569" }}
                >
                  <RefreshCw size={13} /> Try again
                </button>
                <a
                  href={WDC_ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: "#009EDB" }}
                >
                  See all positions on Idealist <ExternalLink size={13} />
                </a>
              </div>
            </div>
          )}

          {/* Job cards */}
          {!loading && !error && filtered.length > 0 && (
            <div className="flex flex-col gap-4">
              {filtered.map((job, i) => (
                <JobCard key={job.id || i} job={job} index={i} />
              ))}
            </div>
          )}

          {/* Empty search state */}
          {!loading && !error && filtered.length === 0 && jobs.length > 0 && (
            <div className="flex flex-col items-center py-20 gap-4 text-center">
              <Briefcase size={32} style={{ color: "#CBD5E1" }} />
              <p className="font-bold text-base" style={{ color: "#0D1F2D" }}>No positions match your search</p>
              <p className="text-sm" style={{ color: "#94A3B8" }}>Try a different filter or clear the search</p>
              <button
                onClick={() => { setSearch(""); setFilter("All"); }}
                className="mt-2 px-5 py-2.5 rounded-xl text-sm font-bold border"
                style={{ borderColor: "#E2E8F0", color: "#475569" }}
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Idealist attribution */}
          {!loading && (
            <AnimateIn variant="fadeUp" delay={0.2}>
              <div className="mt-10 flex items-center justify-center gap-3 pt-8 border-t" style={{ borderColor: "#E2E8F0" }}>
                <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>Positions listed on</span>
                <a
                  href="https://www.idealist.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold hover:opacity-70 transition-opacity"
                  style={{ color: "#009EDB" }}
                >
                  <Globe size={12} /> Idealist.org <ExternalLink size={10} />
                </a>
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* Fraud Alert */}
      <section className="pb-10 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border p-6" style={{ background: "#FFF5F5", borderColor: "#FCA5A5" }}>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-red-100 shrink-0 mt-0.5">
                  <Globe size={16} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-black text-base text-red-700 mb-2">Fraud Alert</h3>
                  <p className="text-sm leading-relaxed text-red-800 mb-2">
                    WDC and other charitable organizations are occasionally subject to phishing attacks — scams involving individuals impersonating WDC or claiming to recruit on our behalf.
                  </p>
                  <p className="text-sm leading-relaxed text-red-800">
                    We do not extend offers of employment or request personal information unless a candidate formally applies through this page. Unsolicited emails are not legitimate — delete them or report at{" "}
                    <a href="https://www.ic3.gov" target="_blank" rel="noopener noreferrer" className="underline font-bold">ic3.gov</a>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border p-6" style={{ background: "#F0F9FF", borderColor: "#BAE6FD" }}>
              <h3 className="font-black text-base mb-2" style={{ color: "#0369A1" }}>Equal Opportunity Employer</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#0C4A6E" }}>
                WDC is an equal-opportunity employer. We conduct hiring without regard to race, color, ancestry, national origin, citizenship, age, sex, marital status, parental status, political ideology, or disability of an otherwise-qualified individual.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </>
  );
}
