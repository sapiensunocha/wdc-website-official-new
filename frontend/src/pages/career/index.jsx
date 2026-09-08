import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, Building2, ExternalLink, Search, ChevronDown,
  Briefcase, Globe, AlertTriangle, RefreshCw,
} from "lucide-react";
import AnimateIn from "../../components/AnimateIn";
import SEOMeta from "../../components/SEOMeta";

const BACKEND = import.meta.env.VITE_API_BASE_URL || "https://wdc-backend-1044744936985.us-central1.run.app";
const WDC_ORG_URL = "https://www.idealist.org/en/nonprofit/059fab99846344a385266ced93563c9f-world-disaster-center/jobs";

// Fallback jobs shown when the Idealist Listings API key isn't yet configured
const FALLBACK_JOBS = [
  {
    id: "fallback-1",
    title: "Report Writing Consultant",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Part-time",
    description: "Support WDC's intelligence publications by drafting, editing, and formatting global disaster intelligence reports. Help translate complex data into clear, actionable briefings for decision-makers worldwide.",
    applicationUrl: "https://ideali.st/7mvtKk",
    postedAt: null,
    isFallback: true,
  },
];

const TYPE_COLOR = {
  "Job":            { bg: "#E8F5FC", text: "#009EDB", border: "#009EDB33" },
  "Volunteer":      { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d033" },
  "Internship":     { bg: "#fdf4ff", text: "#9333ea", border: "#d8b4fe33" },
  "Fellowship":     { bg: "#fff7ed", text: "#ea580c", border: "#fed7aa33" },
  "default":        { bg: "#f1f5f9", text: "#475569", border: "#e2e8f033" },
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
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border overflow-hidden"
      style={{ borderColor: expanded ? "#009EDB" : "#E2E8F0", boxShadow: expanded ? "0 0 0 2px #009EDB22, 0 8px 32px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.25s" }}
    >
      {/* Card top */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{ background: ts.bg, color: ts.text, border: `1px solid ${ts.border}` }}>
                {job.type || "Position"}
              </span>
              {job.locationType && (
                <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                  {job.locationType}
                </span>
              )}
              {job.isFallback && (
                <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse inline-block" />
                  Open Now
                </span>
              )}
              {!job.isFallback && (
                <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                  Active
                </span>
              )}
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
              {job.postedAt && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} style={{ color: "#94A3B8" }} />
                  {new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              )}
            </div>
          </div>

          {/* Apply button */}
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

        {/* Description preview */}
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
              <ChevronDown size={13} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function CareerPage() {
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [source, setSource]     = useState("loading");
  const [filter, setFilter]     = useState("All");
  const [search, setSearch]     = useState("");

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/idealist/jobs`);
      if (res.ok) {
        const data = await res.json();
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
          setSource("idealist");
        } else {
          setJobs(FALLBACK_JOBS);
          setSource("fallback");
        }
      } else {
        setJobs(FALLBACK_JOBS);
        setSource("fallback");
      }
    } catch {
      setJobs(FALLBACK_JOBS);
      setSource("fallback");
    }
    setLoading(false);
  };

  useEffect(() => { loadJobs(); }, []);

  const types = ["All", ...Array.from(new Set(jobs.map(j => j.type).filter(Boolean)))];

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
        title="Careers — World Disaster Center"
        description="Join the World Disaster Center team. Open positions in disaster intelligence, AI, communications, partnerships, and humanitarian operations."
        url="/careers"
      />

      {/* ── Hero ── */}
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
                WDC is on a mission to end preventable disaster impacts. We're looking for talent in AI, disaster intelligence, communications, partnerships, and humanitarian operations — from all backgrounds.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Jobs section ── */}
      <section className="py-14 bg-white">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black" style={{ color: "#0D1F2D" }}>Open Positions</h2>
                <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
                  {loading ? "Loading…" : `${filtered.length} position${filtered.length !== 1 ? "s" : ""} available`}
                  {source === "idealist" && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold text-green-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Live from Idealist
                    </span>
                  )}
                </p>
              </div>

              {/* View all on Idealist */}
              <a href={WDC_ORG_URL} target="_blank" rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all hover:bg-slate-50"
                style={{ borderColor: "#E2E8F0", color: "#475569" }}>
                <Globe size={14} /> View on Idealist <ExternalLink size={12} />
              </a>
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
              <div className="flex gap-2 flex-wrap">
                {types.map(t => (
                  <button key={t} onClick={() => setFilter(t)}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold border transition-all"
                    style={{
                      background: filter === t ? "#009EDB" : "#F8FAFB",
                      color:      filter === t ? "#fff" : "#475569",
                      borderColor: filter === t ? "#009EDB" : "#E2E8F0",
                    }}>
                    {t}
                  </button>
                ))}
                <button onClick={loadJobs} className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm"
                  style={{ borderColor: "#E2E8F0", color: "#94A3B8" }}>
                  <RefreshCw size={13} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
                </button>
              </div>
            </div>
          </AnimateIn>

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <p className="text-sm" style={{ color: "#94A3B8" }}>Fetching open positions from Idealist…</p>
            </div>
          )}

          {/* Job cards */}
          {!loading && filtered.length > 0 && (
            <div className="flex flex-col gap-4">
              {filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center py-20 gap-4 text-center">
              <Briefcase size={32} style={{ color: "#CBD5E1" }} />
              <p className="font-bold text-base" style={{ color: "#0D1F2D" }}>No positions match your search</p>
              <p className="text-sm" style={{ color: "#94A3B8" }}>Try a different filter or check back soon</p>
              <a href={WDC_ORG_URL} target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "#009EDB" }}>
                See all WDC positions on Idealist <ExternalLink size={13} />
              </a>
            </div>
          )}

          {/* Idealist attribution — required by their ToS */}
          <AnimateIn variant="fadeUp" delay={0.2}>
            <div className="mt-10 flex items-center justify-center gap-3 pt-8 border-t" style={{ borderColor: "#E2E8F0" }}>
              <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>Positions listed on</span>
              <a href="https://www.idealist.org" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold hover:opacity-70 transition-opacity"
                style={{ color: "#009EDB" }}>
                <Globe size={12} /> Idealist.org <ExternalLink size={10} />
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Fraud Alert ── */}
      <section className="pb-10 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border p-6" style={{ background: "#FFF5F5", borderColor: "#FCA5A5" }}>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-red-100 shrink-0 mt-0.5">
                  <AlertTriangle size={16} className="text-red-600" />
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
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </>
  );
}
