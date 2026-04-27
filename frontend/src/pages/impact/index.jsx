import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X, Building2 } from "lucide-react";
import Map from "../../components/Map";
import NewsLetter from "../../components/newsletter";
import { impactCountries } from "../../assets/data/impact";

const STATUS_CFG = {
  Completed: { dot: "#22c55e", bg: "bg-green-100",  text: "text-green-800"  },
  Active:    { dot: "#f59e0b", bg: "bg-amber-100",  text: "text-amber-800"  },
  Response:  { dot: "#009EDB", bg: "bg-sky-100",    text: "text-sky-800"    },
  Upcoming:  { dot: "#f97316", bg: "bg-orange-100", text: "text-orange-800" },
  HQ:        { dot: "#1C2B39", bg: "bg-slate-100",  text: "text-slate-800"  },
};

const STATS = [
  { n: "16+",  label: "Countries"      },
  { n: "4",    label: "Continents"     },
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
            <div className="flex items-center gap-3">
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
  const groups = ["Completed", "Active", "Response", "Upcoming", "HQ"];
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
                {status === "HQ" ? "Offices / HQ" : status}
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
          <div className="h-1 w-12 bg-[#009EDB] mb-5" />
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">Where We Work</h1>
          <p className="text-white/70 text-base max-w-2xl leading-relaxed">
            WDC operates across Africa, the Americas, Asia, and Europe — with offices in
            Ottawa, New York, and Vienna — delivering disaster monitoring, early warning
            systems, and community resilience programs worldwide.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-[#009EDB]">{s.n}</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map + Side Panel ── */}
      <div className="container py-10">
        <div className="flex flex-col lg:flex-row border border-gray-200 rounded-xl overflow-hidden shadow-lg min-h-[520px]">

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
                  <span className="text-gray-700">{status === "HQ" ? "Office / HQ" : status}</span>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(STATUS_CFG).map(([status, cfg]) => {
            const countries = impactCountries.filter((c) => c.status === status);
            const isHQ = status === "HQ";
            return (
              <div key={status} className={`border rounded-xl p-5 shadow-sm ${isHQ ? "bg-[#1C2B39] border-slate-700" : "bg-white border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-3">
                  {isHQ
                    ? <Building2 size={13} style={{ color: cfg.dot }} />
                    : <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.dot }} />
                  }
                  <span className={`text-xs font-bold uppercase tracking-wider ${isHQ ? "text-slate-400" : "text-gray-500"}`}>
                    {isHQ ? "Offices / HQ" : status}
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
                      {c.flag} {isHQ && c.city ? `${c.city}, ${c.country}` : c.country}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
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
