import { useState, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimateIn from "../../components/AnimateIn";
import { ChevronLeft, ChevronRight, ExternalLink, X, Building2, FileText, Play, Award, Star, Cpu, Globe, Users, Zap, Shield, BookOpen, TrendingUp, MapPin } from "lucide-react";
import Map from "../../components/Map";
import NewsLetter from "../../components/newsletter";
import { impactCountries } from "../../assets/data/impact";
import { Link } from "react-router-dom";

// ── Media assets ──────────────────────────────────────────────────────────────
import awardGroup    from "../../assets/media/award_group.jpg";
import awardCloseup  from "../../assets/media/award_closeup.jpg";
import awardStage    from "../../assets/media/award_stage.jpg";
import awardHandshake from "../../assets/media/award_handshake.jpg";
import unescoEvent1  from "../../assets/media/unesco_event1.jpg";
import unescoEvent2  from "../../assets/media/unesco_event2.jpg";
import unescoEvent3  from "../../assets/media/unesco_event3.jpg";
import prrsFramework from "../../assets/media/prrs_framework.jpg";
import lstSenegal    from "../../assets/media/lst_senegal.png";

const STATUS_CFG = {
  Completed: { dot: "#22c55e", bg: "bg-green-100",  text: "text-green-800"  },
  Active:    { dot: "#f59e0b", bg: "bg-amber-100",  text: "text-amber-800"  },
  Response:  { dot: "#009EDB", bg: "bg-sky-100",    text: "text-sky-800"    },
  Upcoming:  { dot: "#f97316", bg: "bg-orange-100", text: "text-orange-800" },
  HQ:        { dot: "#1C2B39", bg: "bg-slate-100",  text: "text-slate-800"  },
  Network:   { dot: "#9ca3af", bg: "bg-gray-100",   text: "text-gray-600"   },
};

const STATS = [
  { n: "25+",  label: "Countries"      },
  { n: "5",    label: "Continents"     },
  { n: "5+",   label: "Active Missions"},
  { n: "1M+",  label: "People Reached" },
];

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || { bg: "bg-gray-100", text: "text-gray-700" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
      {status}
    </span>
  );
}

function HQPanel({ country, index, total, onPrev, onNext, onClose }) {
  const canPrev = index > 0;
  const canNext = index < total - 1;
  return (
    <div className="flex flex-col h-full">
      {/* Header — navy accent for HQ */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-slate-200 bg-[#1C2B39] sticky top-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-3xl shrink-0">{country.flag}</span>
          <div className="min-w-0">
            <h2 className="font-bold text-white text-base leading-snug truncate">{country.country}</h2>
            {country.city && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <Building2 size={11} className="text-[#009EDB] shrink-0" />
                <span className="text-xs text-slate-300">{country.city} Office</span>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-3 shrink-0 text-slate-400 hover:text-white p-1 transition-colors"
          aria-label="Close panel"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* HQ banner stripe */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1C2B39] flex items-center justify-center shrink-0">
            <Building2 size={20} className="text-[#009EDB]" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">WDC Office</p>
            <p className="text-sm font-semibold text-slate-800">{country.city}, {country.country}</p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <p className="text-sm text-gray-600 leading-relaxed">{country.summary}</p>

          {/* Tools available */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tools Available</p>
            <div className="flex flex-wrap gap-2">
              {country.tools.map((t) => (
                <span key={t} className="px-3 py-1 bg-[#E8F5FC] text-[#009EDB] text-xs font-semibold rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact</p>
            <div className="space-y-1">
              {country.ContactPerson.map((p) => (
                <div key={p.email} className="flex flex-wrap items-center gap-x-1.5 text-xs">
                  <span className="font-medium text-gray-700">{p.name}</span>
                  <span className="text-gray-400">·</span>
                  <a href={`mailto:${p.email}`} className="text-[#009EDB] hover:underline">{p.email}</a>
                </div>
              ))}
            </div>
          </div>

          <a
            href={country.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#009EDB] hover:underline"
          >
            <ExternalLink size={14} />
            Visit our LinkedIn
          </a>
        </div>
      </div>

      {/* Prev/Next */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50 sticky bottom-0">
        <button onClick={onPrev} disabled={!canPrev} className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#009EDB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors max-w-[42%] truncate">
          <ChevronLeft size={15} className="shrink-0" />
          <span className="truncate">{canPrev ? impactCountries[index - 1].country : "—"}</span>
        </button>
        <span className="text-xs text-gray-400 shrink-0 px-2">{index + 1} / {total}</span>
        <button onClick={onNext} disabled={!canNext} className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#009EDB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors max-w-[42%] truncate">
          <span className="truncate">{canNext ? impactCountries[index + 1].country : "—"}</span>
          <ChevronRight size={15} className="shrink-0" />
        </button>
      </div>
    </div>
  );
}

function CountryPanel({ country, index, total, onPrev, onNext, onClose }) {
  // HQ locations get a distinct panel design
  if (country.status === "HQ") {
    return <HQPanel country={country} index={index} total={total} onPrev={onPrev} onNext={onNext} onClose={onClose} />;
  }

  const canPrev = index > 0;
  const canNext = index < total - 1;

  const tableRows = [
    ["Project",         country.ProjectTitle],
    ["Coverage",        country.CoveragePeriod],
    ["Lead Org",        country.ProjectLeaderOrganization],
    country.LocalImplementationOrganization
      ? ["Local Partner", country.LocalImplementationOrganization]
      : null,
  ].filter(Boolean);

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-3xl shrink-0">{country.flag}</span>
          <div className="min-w-0">
            <h2 className="font-bold text-gray-900 text-base leading-snug truncate">{country.country}</h2>
            <div className="mt-1">
              <StatusBadge status={country.status} />
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-3 shrink-0 text-gray-400 hover:text-gray-600 p-1 transition-colors"
          aria-label="Close panel"
        >
          <X size={18} />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* Banner image */}
        {country.banner && (
          <div className="w-full h-36 overflow-hidden bg-gray-100">
            <img src={country.banner} alt={country.country} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="p-5 space-y-5">
          <p className="text-sm text-gray-600 leading-relaxed">{country.summary}</p>

          {/* Detail table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {tableRows.map(([label, val]) => (
                  <tr key={label} className="border-b border-gray-100 last:border-0">
                    <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 bg-gray-50 w-[38%] align-top">{label}</th>
                    <td className="py-2 px-3 text-gray-700 text-xs">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tools */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tools Used</p>
            <div className="flex flex-wrap gap-2">
              {country.tools.map((t) => (
                <span key={t} className="px-3 py-1 bg-[#E8F5FC] text-[#009EDB] text-xs font-semibold rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Partner logos */}
          {country.images?.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              {country.images.map((img, i) => (
                <div key={i} className="w-10 h-10 rounded border border-gray-200 overflow-hidden bg-white flex items-center justify-center">
                  <img src={img} alt="org logo" className="w-full h-full object-contain p-0.5" />
                </div>
              ))}
            </div>
          )}

          {/* Contact */}
          <div className="space-y-1">
            {country.ContactPerson.map((p) => (
              <div key={p.email} className="flex flex-wrap items-center gap-x-1.5 text-xs">
                <span className="font-medium text-gray-700">{p.name}</span>
                <span className="text-gray-400">·</span>
                <a href={`mailto:${p.email}`} className="text-[#009EDB] hover:underline">{p.email}</a>
              </div>
            ))}
          </div>

          <a
            href={country.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#009EDB] hover:underline"
          >
            <ExternalLink size={14} />
            View on LinkedIn
          </a>
        </div>
      </div>

      {/* Sticky prev/next footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50 sticky bottom-0">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#009EDB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors max-w-[42%] truncate"
        >
          <ChevronLeft size={15} className="shrink-0" />
          <span className="truncate">{canPrev ? impactCountries[index - 1].country : "—"}</span>
        </button>
        <span className="text-xs text-gray-400 shrink-0 px-2">
          {index + 1} / {total}
        </span>
        <button
          onClick={onNext}
          disabled={!canNext}
          className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#009EDB] disabled:opacity-30 disabled:cursor-not-allowed transition-colors max-w-[42%] truncate"
        >
          <span className="truncate">{canNext ? impactCountries[index + 1].country : "—"}</span>
          <ChevronRight size={15} className="shrink-0" />
        </button>
      </div>
    </div>
  );
}

function CountryList({ onSelect }) {
  const groups = ["Completed", "Active", "Response", "Upcoming", "HQ", "Network"];
  return (
    <div className="p-5 overflow-y-auto h-full">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
        Click a country or the map to explore
      </p>
      {groups.map((status) => {
        const countries = impactCountries.filter((c) => c.status === status);
        if (!countries.length) return null;
        const cfg = STATUS_CFG[status];
        return (
          <div key={status} className="mb-5">
            <div className="flex items-center gap-2 mb-2.5">
              {status === "HQ"
                ? <Building2 size={11} className="shrink-0" style={{ color: cfg.dot }} />
                : <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cfg.dot }} />
              }
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {status === "HQ" ? "Offices / HQ" : status === "Network" ? "Board Network" : status}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => onSelect(c.code)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#009EDB] hover:text-[#009EDB] text-gray-600 transition-colors"
                >
                  <span>{c.flag}</span>
                  <span>{c.country}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ImpactPage() {
  const [selectedCode, setSelectedCode] = useState(null);

  const selectedIndex   = impactCountries.findIndex((c) => c.code === selectedCode);
  const selectedCountry = selectedIndex >= 0 ? impactCountries[selectedIndex] : null;

  const handleCountrySelect = useCallback((code) => {
    const exists = impactCountries.some((c) => c.code === code);
    if (exists) setSelectedCode(code);
  }, []);

  const navigate = (dir) => {
    const next = selectedIndex + dir;
    if (next >= 0 && next < impactCountries.length) {
      setSelectedCode(impactCountries[next].code);
    }
  };

  const closePanel = () => setSelectedCode(null);

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero header ── */}
      <div className="bg-[#1C2B39] text-white">
        <div className="container py-14">
          <AnimateIn variant="fadeUp">
            <div className="h-1 w-12 bg-[#009EDB] mb-5" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">Where We Work</h1>
            <p className="text-white/70 text-base max-w-2xl leading-relaxed">
              WDC operates across Africa, the Americas, Asia, and Europe — with offices in
              Ottawa, New York, and Vienna — delivering disaster monitoring, early warning
              systems, and community resilience programs worldwide.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-3xl font-black text-[#009EDB]">{s.n}</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map + Side Panel ── */}
      <div className="container py-10">
        <div className="flex flex-col lg:flex-row border border-gray-200 rounded-xl overflow-hidden shadow-lg min-h-[350px] sm:min-h-[450px] lg:min-h-[520px]">

          {/* Left: Map */}
          <div className="w-full lg:w-[60%] bg-slate-50 relative flex flex-col">
            {/* Legend */}
            <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md text-xs space-y-2">
              {Object.entries(STATUS_CFG).map(([status, cfg]) => (
                <div key={status} className="flex items-center gap-2">
                  {status === "HQ"
                    ? <Building2 size={12} className="shrink-0" style={{ color: cfg.dot }} />
                    : <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cfg.dot }} />
                  }
                  <span className="text-gray-700">{status === "HQ" ? "Office / HQ" : status === "Network" ? "Board Network" : status}</span>
                </div>
              ))}
            </div>

            <div className="flex-1 p-4 pb-2">
              <Map onCountrySelect={handleCountrySelect} selectedCode={selectedCode} />
            </div>
            <p className="text-center text-xs text-gray-400 pb-3 px-4">
              Click a highlighted country to view mission details
            </p>
          </div>

          {/* Right: Side panel */}
          <div className="w-full lg:w-[40%] border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col overflow-hidden max-h-[620px] lg:max-h-none">
            {selectedCountry ? (
              <CountryPanel
                country={selectedCountry}
                index={selectedIndex}
                total={impactCountries.length}
                onPrev={() => navigate(-1)}
                onNext={() => navigate(1)}
                onClose={closePanel}
              />
            ) : (
              <CountryList onSelect={handleCountrySelect} />
            )}
          </div>
        </div>
      </div>

      {/* ── Country status summary cards ── */}
      <div className="container pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Object.entries(STATUS_CFG).map(([status, cfg]) => {
            const countries = impactCountries.filter((c) => c.status === status);
            if (!countries.length) return null;
            const isHQ = status === "HQ";
            const isNetwork = status === "Network";
            const label = isHQ ? "Offices / HQ" : isNetwork ? "Board Network" : status;
            return (
              <div key={status} className={`border rounded-xl p-5 shadow-sm ${isHQ ? "bg-[#1C2B39] border-slate-700" : isNetwork ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-3">
                  {isHQ
                    ? <Building2 size={13} style={{ color: cfg.dot }} />
                    : <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.dot }} />
                  }
                  <span className={`text-xs font-bold uppercase tracking-wider ${isHQ ? "text-slate-400" : "text-gray-500"}`}>
                    {label}
                  </span>
                </div>
                <div className={`text-3xl font-black mb-1 ${isHQ ? "text-white" : "text-gray-900"}`}>{countries.length}</div>
                <div className="space-y-1">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleCountrySelect(c.code)}
                      className={`block text-xs transition-colors ${isHQ ? "text-slate-300 hover:text-[#009EDB]" : "text-gray-500 hover:text-[#009EDB]"}`}
                    >
                      {c.flag} {(isHQ || isNetwork) && c.city ? `${c.city}, ${c.country}` : c.country}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Key Initiatives & Active Projects ── */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="h-1 w-12 bg-[#009EDB] mb-4" />
            <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-2">Active Work</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2B39] mb-3">Key Initiatives &amp; Field Projects</h2>
            <p className="text-gray-500 text-sm max-w-2xl mb-10">From AI-powered tools to on-ground field missions — WDC's active projects span technology, community resilience, and emergency response across multiple continents.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Cpu size={20} className="text-[#009EDB]" />,
                tag: "TECHNOLOGY · ACTIVE",
                tagColor: "text-blue-600 bg-blue-50",
                title: "EAGLE — Automated Disaster Assessment Tool",
                desc: "AI-driven platform using satellite imagery and real-time data analytics to assess building damage, displaced populations, and casualty counts within hours of a disaster. Features an interactive dashboard, dynamic reporting, and comprehensive multi-hazard coverage.",
                stats: [
                  { n: "Real-Time", l: "Data Analysis" },
                  { n: "Multi-Hazard", l: "Coverage" },
                ],
              },
              {
                icon: <Zap size={20} className="text-[#009EDB]" />,
                tag: "TECHNOLOGY · ACTIVE",
                tagColor: "text-purple-600 bg-purple-50",
                title: "Michael App — AI Disaster Response Platform",
                desc: "Flagship mobile and web application integrating predictive alerts, geolocation tools, early warning systems, and community communication. Deployed in Haiti and piloted across Africa. Enables real-time monitoring and autonomous local response without external assistance.",
                stats: [
                  { n: "AI-Driven", l: "Predictions" },
                  { n: "Multi-Language", l: "Interface" },
                ],
              },
              {
                icon: <Shield size={20} className="text-[#009EDB]" />,
                tag: "TECHNOLOGY · ACTIVE",
                tagColor: "text-teal-600 bg-teal-50",
                title: "Lifeline — Blockchain Aid Distribution System",
                desc: "Transparent financial aid distribution platform using blockchain technology. Ensures accountability, eliminates intermediaries, and guarantees direct, verifiable delivery of funds and resources to disaster-affected communities in real time.",
                stats: [
                  { n: "Blockchain", l: "Transparency" },
                  { n: "Direct", l: "Aid Delivery" },
                ],
              },
              {
                icon: <Globe size={20} className="text-[#009EDB]" />,
                tag: "FIELD MISSION · 2024–2025",
                tagColor: "text-orange-600 bg-orange-50",
                title: "Haiti Zero-Impact Disaster Resilience Initiative",
                desc: "Three-phase program (Nov 2024–Mar 2025) establishing AI-driven early warning, training 500+ local responders, and creating self-sustaining community resilience councils. Target: 90% disaster prediction accuracy and 75% reduction in response times in pilot areas.",
                stats: [
                  { n: "500+", l: "Responders Trained" },
                  { n: "90%", l: "Prediction Accuracy Goal" },
                ],
              },
              {
                icon: <Users size={20} className="text-[#009EDB]" />,
                tag: "PARTNERSHIP · NIGERIA",
                tagColor: "text-green-600 bg-green-50",
                title: "NEMA–WDC Strategic Partnership",
                desc: "Bold partnership with Nigeria's National Emergency Management Agency deploying the MaiLafiya app in 4 languages, building 200 Resilience Hubs with solar energy and emergency supplies, training 50,000 first responders, and launching the Nigeria Resilient 2025 campaign.",
                stats: [
                  { n: "50,000", l: "First Responders" },
                  { n: "200", l: "Resilience Hubs" },
                ],
              },
              {
                icon: <MapPin size={20} className="text-[#009EDB]" />,
                tag: "EXPANSION · PLANNED",
                tagColor: "text-indigo-600 bg-indigo-50",
                title: "Global Regional Offices — 5 Locations",
                desc: "WDC is establishing five regional offices: Nairobi (East Africa — floods, drought), Bangkok (Southeast Asia — tsunamis), Santiago (South America — earthquakes), Istanbul (Europe/Middle East), and Mumbai (South Asia — cyclones). Each will serve as a Center of Excellence for DRR.",
                stats: [
                  { n: "5", l: "Planned Offices" },
                  { n: "4", l: "Continents" },
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, boxShadow: "0 16px 36px rgba(0,0,0,0.1)" }}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F5FC] flex items-center justify-center shrink-0">{item.icon}</div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${item.tagColor}`}>{item.tag}</span>
                </div>
                <h3 className="text-base font-bold text-[#1C2B39] leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.desc}</p>
                <div className="flex gap-6 pt-3 border-t border-gray-100">
                  {item.stats.map((s) => (
                    <div key={s.l}>
                      <p className="text-base font-black text-[#009EDB]">{s.n}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{s.l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Awards & Recognition ── */}
      <div className="bg-[#1C2B39] py-16">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="h-1 w-12 bg-[#009EDB] mb-4" />
            <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-2">Coverage &amp; Recognition</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">WDC in the Spotlight</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Star size={20} className="text-[#009EDB]" />,
                org: "Geospatial World",
                date: "February 2025",
                title: "50 Rising Stars 2025",
                desc: "Sapiens Ndatabaye selected as one of Geospatial World's 50 Rising Stars 2025. Certificate ceremony at Geospatial World Forum, Madrid, Spain — April 22–25, 2025.",
                tag: "GLOBAL RECOGNITION",
              },
              {
                icon: <Award size={20} className="text-[#009EDB]" />,
                org: "The Corporate Magazine",
                date: "March 2025",
                title: "Top 20 Dynamic Canadian Business Leaders 2025",
                desc: "Sapiens Ndatabaye recognized among Canada's Top 20 Dynamic Business Leaders for exceptional leadership in the humanitarian technology landscape.",
                tag: "BUSINESS LEADERSHIP",
              },
              {
                icon: <Award size={20} className="text-[#009EDB]" />,
                org: "KalendMind / PDA · Kigali",
                date: "December 20, 2024",
                title: "Innovation Award — Career Coaching & PDA",
                desc: "World Disaster Center received the KalendMind Innovation Award for Career Coaching & Personal Development Analysis at a black-tie gala at Four Points by Sheraton, Kigali.",
                tag: "INNOVATION AWARD",
              },
              {
                icon: <TrendingUp size={20} className="text-[#009EDB]" />,
                org: "People Matters Rwanda",
                date: "December 2024",
                title: "Rising Star Award — Shortlisted (For Startups)",
                desc: "WDC shortlisted for the 2024 People Matters Rwanda Rising Star Award for Startups, scoring 21.17/30 marks — recognizing outstanding contribution to workplace excellence and employee well-being.",
                tag: "STARTUP RECOGNITION",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-[#009EDB]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#009EDB]/10 flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#009EDB]">{item.tag}</p>
                    <p className="text-[10px] text-white/40">{item.org} · {item.date}</p>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-white/55 leading-relaxed flex-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WDC Intelligence Products ── */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="h-1 w-12 bg-[#009EDB] mb-4" />
            <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-2">Flagship Products</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2B39] mb-3">WDC Intelligence Products</h2>
            <p className="text-gray-500 text-sm max-w-2xl mb-10">Eight named flagship products — from real-time dashboards to annual impact reports — delivering disaster intelligence to governments, NGOs, and communities worldwide.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Nostradamus' Insight", sub: "Predictive Disaster Risk Dashboard", freq: "Quarterly", dot: "#009EDB", bg: "bg-blue-50" },
              { name: "Da Vinci's Plan", sub: "Disaster Preparedness & Infrastructure Report", freq: "Bi-Annual", dot: "#7C3AED", bg: "bg-purple-50" },
              { name: "Atlas of Crisis", sub: "Global Disaster Trends Report", freq: "Annual", dot: "#EF4444", bg: "bg-red-50" },
              { name: "Apollo's Shield", sub: "Preparedness & Prediction Animated Briefing", freq: "Quarterly", dot: "#F97316", bg: "bg-orange-50" },
              { name: "Titan's Watch", sub: "Global Disaster Dashboard", freq: "Monthly", dot: "#14B8A6", bg: "bg-teal-50" },
              { name: "Galileo's Lens", sub: "Real-Time Global Disaster Response Dashboard", freq: "Real-Time", dot: "#22C55E", bg: "bg-green-50" },
              { name: "Einstein's Map", sub: "Climate Change & Disaster Risk Animation", freq: "Annual", dot: "#EAB308", bg: "bg-yellow-50" },
              { name: "Cassandra's Voice", sub: "Humanitarian Aid Impact Report", freq: "Annual", dot: "#EC4899", bg: "bg-pink-50" },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.09)" }}
                className={`border border-gray-100 rounded-xl p-5 flex flex-col gap-2 ${p.bg}`}
              >
                <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: p.dot }} />
                <p className="text-sm font-black text-[#1C2B39] leading-tight">{p.name}</p>
                <p className="text-xs text-gray-600 leading-snug flex-1">{p.sub}</p>
                <span className="self-start text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/70 text-gray-600 border border-white mt-1">{p.freq}</span>
              </motion.div>
            ))}
          </div>
          <AnimateIn variant="fadeUp" delay={0.2} className="mt-8 flex flex-wrap gap-4">
            <Link to="/reports" className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-6 py-3 rounded text-sm transition-colors">
              <FileText size={16} /> View All 50+ Reports
            </Link>
            <Link to="/global-products" className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#009EDB] text-gray-700 hover:text-[#009EDB] font-bold px-6 py-3 rounded text-sm transition-colors">
              Explore Our Products
            </Link>
          </AnimateIn>
        </div>
      </div>

      {/* ── Photo & Media Gallery ── */}
      <div className="bg-gray-50 py-16">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="h-1 w-12 bg-[#009EDB] mb-4" />
            <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-2">Media Gallery</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C2B39] mb-3">Photos, Events &amp; Field Work</h2>
            <p className="text-gray-500 text-sm max-w-2xl mb-10">WDC award ceremonies, UN partnership events, satellite data analyses, and field operations — all documented.</p>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.05}>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">People Matters Rwanda &amp; KalendMind Award Ceremony — December 20, 2024 · Four Points Sheraton, Kigali</p>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[awardGroup, awardCloseup, awardHandshake, awardStage].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-xl aspect-square bg-gray-200 cursor-pointer shadow-sm"
              >
                <img src={src} alt="WDC award ceremony Kigali 2024" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>

          <AnimateIn variant="fadeUp" delay={0.05}>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">UNESCO Partnership Event</p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
            {[unescoEvent1, unescoEvent2, unescoEvent3].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-xl bg-gray-200 cursor-pointer shadow-sm"
              >
                <img src={src} alt="WDC UNESCO partnership event" className="w-full h-56 object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>

          <AnimateIn variant="fadeUp" delay={0.05}>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">WDC Framework &amp; Satellite Intelligence</p>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="overflow-hidden rounded-xl bg-black shadow-md"
            >
              <img src={prrsFramework} alt="WDC PRRS Framework" className="w-full h-64 object-cover opacity-90" loading="lazy" />
              <div className="p-4">
                <p className="text-sm font-bold text-white">PRRS Framework</p>
                <p className="text-xs text-gray-400 mt-1">WDC's four-pillar model: Preparedness · Response · Recovery · Solutions — powering AI-driven disaster management</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="overflow-hidden rounded-xl bg-[#1C2B39] shadow-md"
            >
              <img src={lstSenegal} alt="Land Surface Temperature Senegal 2022" className="w-full h-64 object-contain p-4" loading="lazy" />
              <div className="p-4">
                <p className="text-sm font-bold text-white">Satellite Intelligence — Senegal 2022</p>
                <p className="text-xs text-gray-400 mt-1">Land Surface Temperature (LST) geospatial analysis produced by WDC's data science team using remote sensing satellite data</p>
              </div>
            </motion.div>
          </div>

          <AnimateIn variant="fadeUp" delay={0.1} className="bg-[#1C2B39] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-[#FF0000] flex items-center justify-center shrink-0">
              <Play size={24} className="text-white ml-1" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-white font-bold text-lg">Watch WDC on YouTube</p>
              <p className="text-white/60 text-sm mt-1">Animated briefings, disaster analyses, field reports, and the Disaster resilience video series — all on our official channel.</p>
            </div>
            <a href="https://www.youtube.com/@WorldDisasterCenterOffice" target="_blank" rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#FF0000] hover:bg-red-700 text-white font-bold px-6 py-3 rounded text-sm transition-colors">
              <Play size={15} /> Visit Our Channel
            </a>
          </AnimateIn>
        </div>
      </div>

      {/* ── Reports CTA ── */}
      <div className="bg-[#009EDB] py-12">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <AnimateIn variant="fadeLeft">
            <p className="text-white font-bold text-xl">50+ Official WDC Reports &amp; Documents</p>
            <p className="text-white/80 text-sm mt-1">Annual reports, field missions, country analyses, financial summaries — all published and free to read.</p>
          </AnimateIn>
          <AnimateIn variant="fadeRight">
            <Link to="/reports" className="shrink-0 inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#009EDB] font-bold px-8 py-3 rounded text-sm transition-colors">
              <FileText size={16} /> Browse All Reports
            </Link>
          </AnimateIn>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div className="container pb-16">
        <NewsLetter />
      </div>
    </div>
  );
}

export default ImpactPage;
