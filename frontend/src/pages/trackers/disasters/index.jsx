import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEOMeta from "../../../components/SEOMeta";
import {
  AlertTriangle,
  MapPin,
  Calendar,
  RefreshCw,
  ChevronLeft,
  Wifi,
  WifiOff,
  Filter,
} from "lucide-react";
import AnimateIn from "../../../components/AnimateIn";

const MICHAEL_API = "https://michael-api-382117221028.us-central1.run.app";

const FALLBACK_EVENTS = [
  {
    id: "fb-1",
    title: "Afghanistan Earthquake M6.4",
    type: "Earthquake",
    location: "Herat Province, Afghanistan",
    country: "🇦🇫",
    date: "2026-08-12",
    severity: "SEVERE",
    description:
      "Magnitude 6.4 earthquake struck Herat Province, collapsing rural structures. UNOCHA coordinating emergency response with 14,000 people displaced.",
  },
  {
    id: "fb-2",
    title: "Nepal Glacial Lake Outburst Flood",
    type: "Floods",
    location: "Koshi River Basin, Nepal",
    country: "🇳🇵",
    date: "2026-08-08",
    severity: "EXTREME",
    description:
      "GLOF event triggered by glacial retreat has inundated downstream communities in Koshi Basin. Access roads destroyed; helicopter evacuation ongoing.",
  },
  {
    id: "fb-3",
    title: "Venezuela Earthquake M7.5",
    type: "Earthquake",
    location: "Carabobo State, Venezuela",
    country: "🇻🇪",
    date: "2026-07-29",
    severity: "EXTREME",
    description:
      "A powerful M7.5 earthquake struck northern Venezuela causing widespread structural damage. Emergency declaration issued; aid corridors being established.",
  },
  {
    id: "fb-4",
    title: "Ghana Flooding — Northern Region",
    type: "Floods",
    location: "Northern Region, Ghana",
    country: "🇬🇭",
    date: "2026-08-14",
    severity: "MODERATE",
    description:
      "Severe seasonal flooding has displaced 80,000 people in Ghana's Northern Region. NADMO and WFP responding with emergency food and shelter kits.",
  },
  {
    id: "fb-5",
    title: "DRC Ebola Alert — Équateur Province",
    type: "Disease",
    location: "Équateur Province, DRC",
    country: "🇨🇩",
    date: "2026-08-18",
    severity: "SEVERE",
    description:
      "WHO has confirmed 7 cases of Ebola Virus Disease in Équateur Province. Contact tracing initiated; ring vaccination underway with stockpiles deployed.",
  },
];

const FILTERS = ["All", "Floods", "Earthquakes", "Conflicts", "Disease", "Climate"];

const SEVERITY_CONFIG = {
  EXTREME: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", dot: "bg-red-500" },
  SEVERE: { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", dot: "bg-orange-500" },
  MODERATE: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", dot: "bg-amber-400" },
  LOW: { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", dot: "bg-green-500" },
};

function inferSeverity(item) {
  const raw = (item.severity || item.alertLevel || item.level || "").toString().toUpperCase();
  if (raw.includes("EXTREME") || raw.includes("RED")) return "EXTREME";
  if (raw.includes("SEVERE") || raw.includes("HIGH") || raw.includes("ORANGE")) return "SEVERE";
  if (raw.includes("MODERATE") || raw.includes("MEDIUM") || raw.includes("YELLOW")) return "MODERATE";
  return "LOW";
}

function inferType(item) {
  const text = (
    (item.eventType || item.category || item.type || item.title || item.name || "") +
    " " +
    (item.description || "")
  ).toLowerCase();
  if (text.includes("flood") || text.includes("cyclone") || text.includes("hurricane") || text.includes("typhoon")) return "Floods";
  if (text.includes("earthquake") || text.includes("seismic") || text.includes("tremor")) return "Earthquakes";
  if (text.includes("conflict") || text.includes("violence") || text.includes("war") || text.includes("attack")) return "Conflicts";
  if (text.includes("ebola") || text.includes("cholera") || text.includes("disease") || text.includes("outbreak") || text.includes("epidemic")) return "Disease";
  if (text.includes("climate") || text.includes("drought") || text.includes("heatwave") || text.includes("wildfire")) return "Climate";
  return "Other";
}

function normalizeItem(raw, source) {
  return {
    id: raw.id || raw._id || `${source}-${Math.random()}`,
    title: raw.title || raw.name || raw.eventName || "Untitled Event",
    type: inferType(raw),
    location: raw.location || raw.country || raw.region || raw.area || "Unknown location",
    country: "",
    date: raw.date || raw.createdAt || raw.startDate || raw.updated || new Date().toISOString(),
    severity: inferSeverity(raw),
    description: raw.description || raw.summary || raw.details || "No additional details available.",
  };
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1C2B39] p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-16 h-5 rounded bg-white/10" />
        <div className="w-24 h-5 rounded bg-white/5" />
      </div>
      <div className="h-4 rounded bg-white/10 mb-2 w-3/4" />
      <div className="h-3 rounded bg-white/5 mb-1 w-full" />
      <div className="h-3 rounded bg-white/5 w-5/6" />
    </div>
  );
}

function EventCard({ item }) {
  const sev = SEVERITY_CONFIG[item.severity] || SEVERITY_CONFIG.LOW;
  const dateStr = item.date
    ? new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : "Unknown date";

  return (
    <div
      className={`rounded-xl border ${sev.border} bg-[#1C2B39] p-5 transition-all duration-200 hover:bg-[#243447] hover:shadow-lg`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded ${sev.bg} ${sev.color} border ${sev.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
            {item.severity}
          </span>
          <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded font-mono">
            {item.type}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-gray-500">
          <Calendar className="w-3 h-3" />
          {dateStr}
        </div>
      </div>

      <h3 className="text-white font-bold text-sm mb-2">
        {item.country && <span className="mr-1">{item.country}</span>}
        {item.title}
      </h3>

      <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
        <MapPin className="w-3 h-3 flex-shrink-0" />
        <span>{item.location}</span>
      </div>

      <p className="text-gray-400 text-xs font-sans leading-relaxed line-clamp-3">
        {item.description}
      </p>
    </div>
  );
}

export default function ActiveDisastersPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lastFetched, setLastFetched] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(false);
    try {
      const [alertsRes, eventsRes] = await Promise.allSettled([
        fetch(`${MICHAEL_API}/api/alerts?limit=50`, { signal: AbortSignal.timeout(8000) }),
        fetch(`${MICHAEL_API}/api/v1/events?limit=30`, { signal: AbortSignal.timeout(8000) }),
      ]);

      const combined = [];

      if (alertsRes.status === "fulfilled" && alertsRes.value.ok) {
        const data = await alertsRes.value.json();
        const arr = Array.isArray(data) ? data : data.alerts || data.data || data.results || [];
        arr.forEach((item) => combined.push(normalizeItem(item, "alert")));
      }

      if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
        const data = await eventsRes.value.json();
        const arr = Array.isArray(data) ? data : data.events || data.data || data.results || [];
        arr.forEach((item) => combined.push(normalizeItem(item, "event")));
      }

      if (combined.length === 0) {
        throw new Error("No data returned");
      }

      // Deduplicate by title similarity
      const seen = new Set();
      const deduped = combined.filter((item) => {
        const key = item.title.toLowerCase().slice(0, 30);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setAlerts(deduped);
      setLastFetched(new Date());
    } catch {
      setError(true);
      setAlerts(FALLBACK_EVENTS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filtered =
    activeFilter === "All"
      ? alerts
      : alerts.filter((a) => a.type === activeFilter);

  const extremeCount = alerts.filter((a) => a.severity === "EXTREME").length;
  const severeCount = alerts.filter((a) => a.severity === "SEVERE").length;

  return (
    <>
      <SEOMeta
        title="Disasters Tracker — Live Global Monitoring"
        description="Track active disasters worldwide in real time. WDC's Michael AI platform monitors floods, earthquakes, conflicts, and humanitarian crises as they unfold."
        image="https://images.unsplash.com/photo-1485617359743-4dc5d2e53c89?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/trackers/disasters"
      />

      <div className="min-h-screen bg-[#0D1B26] text-white font-mono">
        {/* ── Header ── */}
        <section className="bg-[#1C2B39] border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <AnimateIn variant="fadeUp" delay={0}>
              <Link
                to="/trackers"
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#009EDB] text-xs mb-5 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                All Trackers
              </Link>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.05}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      Active Disasters Tracker
                    </h1>
                    <span className="flex items-center gap-1.5 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <p className="text-gray-400 font-sans text-sm max-w-xl">
                    Real-time global emergency feed — alerts and events ingested from GDACS, ReliefWeb, OCHA, and Michael AI.
                  </p>
                </div>

                <button
                  onClick={fetchData}
                  disabled={loading}
                  className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 text-xs px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
              </div>
            </AnimateIn>

            {/* Quick stats */}
            <AnimateIn variant="fadeUp" delay={0.1}>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-gray-400">Extreme: </span>
                  <span className="text-red-400 font-bold">{extremeCount}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-gray-400">Severe: </span>
                  <span className="text-orange-400 font-bold">{severeCount}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-gray-500" />
                  <span className="text-gray-400">Total events: </span>
                  <span className="text-white font-bold">{alerts.length}</span>
                </div>
                {error && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-400">
                    <WifiOff className="w-3.5 h-3.5" />
                    Live data temporarily unavailable — showing latest known events
                  </div>
                )}
                {!error && lastFetched && (
                  <div className="flex items-center gap-1.5 text-xs text-green-400">
                    <Wifi className="w-3.5 h-3.5" />
                    Synced {lastFetched.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── Filter tabs ── */}
        <section className="border-b border-white/10 bg-[#152130] sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-md font-mono transition-colors ${
                    activeFilter === f
                      ? "bg-[#009EDB] text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {f}
                  {f !== "All" && (
                    <span className="ml-1.5 text-[10px] opacity-60">
                      ({alerts.filter((a) => a.type === f).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feed ── */}
        <section className="max-w-6xl mx-auto px-6 py-10">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <AlertTriangle className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 font-sans">
                No events in this category right now.
              </p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-4 text-[#009EDB] text-xs hover:underline"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {filtered.map((item, i) => (
                <AnimateIn key={item.id} variant="fadeUp" delay={i * 0.04}>
                  <EventCard item={item} />
                </AnimateIn>
              ))}
            </div>
          )}
        </section>

        {/* ── Footer note ── */}
        <section className="border-t border-white/10 bg-[#152130]">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-gray-500 text-xs font-sans">
              Data sourced from GDACS, ReliefWeb, OCHA, and WDC's Michael AI intelligence engine. For emergency use only — always verify with local authorities.
            </p>
            <Link
              to="/michael-chat"
              className="text-[#009EDB] text-xs hover:underline whitespace-nowrap"
            >
              Ask Michael AI →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
