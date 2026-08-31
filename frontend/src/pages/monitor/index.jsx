import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import {
  Activity, AlertTriangle, RefreshCw, Globe, Zap,
  ArrowRight, Filter, ExternalLink, Clock, Radio,
  Flame, Wind, Droplets, Mountain, Sun, HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "../../components/AnimateIn";
import GlobalMap, { EVENT_CONFIG } from "../../components/GlobalMap";

const USGS_URL  = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
const EONET_URL = "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=60&days=60";

function eonetType(categories = []) {
  const t = (categories[0]?.title || "").toLowerCase();
  if (t.includes("wildfire") || t.includes("fire")) return "wildfire";
  if (t.includes("volcano"))   return "volcano";
  if (t.includes("storm") || t.includes("cyclone") || t.includes("hurricane") || t.includes("typhoon")) return "storm";
  if (t.includes("flood"))     return "flood";
  if (t.includes("drought"))   return "drought";
  return "other";
}

async function loadAll() {
  const [usgsRes, eonetRes] = await Promise.allSettled([
    fetch(USGS_URL),
    fetch(EONET_URL),
  ]);
  const events = [];

  if (usgsRes.status === "fulfilled" && usgsRes.value.ok) {
    const data = await usgsRes.value.json();
    (data.features || []).forEach(f => {
      const [lng, lat] = f.geometry.coordinates;
      if (!lat || !lng) return;
      events.push({
        id:     f.id,
        type:   "earthquake",
        lat, lng,
        title:  f.properties.place || "Earthquake",
        mag:    f.properties.mag,
        detail: `M${f.properties.mag}`,
        time:   new Date(f.properties.time),
        source: "USGS",
        url:    f.properties.url,
        alert:  f.properties.alert,
        radius: Math.max(5, (f.properties.mag || 4) * 2.5),
      });
    });
  }

  if (eonetRes.status === "fulfilled" && eonetRes.value.ok) {
    const data = await eonetRes.value.json();
    (data.events || []).forEach(e => {
      const geo = e.geometry?.[e.geometry.length - 1];
      if (!geo?.coordinates) return;
      let lat, lng;
      if (Array.isArray(geo.coordinates[0])) { [lng, lat] = geo.coordinates[0]; }
      else { [lng, lat] = geo.coordinates; }
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;
      events.push({
        id:     e.id,
        type:   eonetType(e.categories),
        lat, lng,
        title:  e.title,
        detail: e.categories[0]?.title || "Natural Event",
        time:   new Date(geo.date),
        source: "NASA EONET",
        url:    e.sources?.[0]?.url || null,
        radius: 7,
      });
    });
  }

  return events.sort((a, b) => b.time - a.time);
}

// ─── Type icon map ─────────────────────────────────────────────────────────────
const TYPE_ICON = {
  earthquake: <Zap size={14} />,
  wildfire:   <Flame size={14} />,
  storm:      <Wind size={14} />,
  volcano:    <Mountain size={14} />,
  flood:      <Droplets size={14} />,
  drought:    <Sun size={14} />,
  other:      <HelpCircle size={14} />,
};

// ─── Filter pill ──────────────────────────────────────────────────────────────
function FilterPill({ type, count, active, onClick }) {
  const cfg = EVENT_CONFIG[type];
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
      style={active ? {
        backgroundColor: cfg.color + "25",
        borderColor:     cfg.color + "80",
        color:           cfg.color,
      } : {
        backgroundColor: "transparent",
        borderColor:     "rgba(255,255,255,0.1)",
        color:           "#64748b",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active ? cfg.color : "#475569" }} />
      {cfg.label}
      {count > 0 && <span className="opacity-70">({count})</span>}
    </button>
  );
}

// ─── Event row ────────────────────────────────────────────────────────────────
function EventRow({ ev, index }) {
  const cfg = EVENT_CONFIG[ev.type] || EVENT_CONFIG.other;
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 10) * 0.04 }}
      className="flex items-start gap-3 p-3 bg-white/3 hover:bg-white/6 border border-white/5 rounded-xl transition-colors group"
    >
      <div className="mt-0.5 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: cfg.color + "20", color: cfg.color }}>
        {TYPE_ICON[ev.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium leading-snug truncate">{ev.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[9px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded"
            style={{ backgroundColor: cfg.color + "18", color: cfg.color }}>{cfg.label}</span>
          {ev.mag && (
            <span className="text-[9px] text-gray-500">M{ev.mag}</span>
          )}
          <span className="text-[9px] text-gray-600">
            {ev.time instanceof Date ? ev.time.toLocaleDateString("en-GB", { day:"2-digit", month:"short" }) : ev.time}
          </span>
          <span className="text-[9px] text-gray-700">· {ev.source}</span>
        </div>
      </div>
      {ev.url && (
        <a href={ev.url} target="_blank" rel="noopener noreferrer"
          className="shrink-0 text-gray-700 group-hover:text-[#009EDB] transition-colors mt-1">
          <ExternalLink size={12} />
        </a>
      )}
    </motion.div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatBlock({ label, value, sub, color }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
    >
      <p className="text-4xl font-black" style={{ color }}>{value}</p>
      <p className="text-xs text-gray-300 mt-1 font-semibold">{label}</p>
      {sub && <p className="text-[10px] text-gray-600 mt-0.5">{sub}</p>}
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function GlobalMonitor() {
  const [events,    setEvents]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [lastFetch, setLast]      = useState(null);
  const [activeType, setActive]   = useState(null); // null = all
  const [mapKey,    setMapKey]    = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const evts = await loadAll();
      setEvents(evts);
      setLast(new Date());
    } catch (_) {}
    setLoading(false);
    setMapKey(k => k + 1);
  }, []);

  useEffect(() => { load(); }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [load]);

  const typeCounts = Object.keys(EVENT_CONFIG).reduce((acc, k) => {
    acc[k] = events.filter(e => e.type === k).length;
    return acc;
  }, {});

  const filteredEvents = activeType ? events.filter(e => e.type === activeType) : events;
  const filterProp = activeType ? [activeType] : null;

  const maxMag = events
    .filter(e => e.mag)
    .reduce((m, e) => Math.max(m, e.mag), 0);

  const countriesAffected = new Set(events.map(e => `${Math.round(e.lat)},${Math.round(e.lng)}`)).size;

  return (
    <>
      <Helmet>
        <title>Global Crisis Monitor — World Disaster Center</title>
        <meta name="description" content="Real-time global crisis monitoring: earthquakes, storms, wildfires, floods, and volcanic events tracked from USGS and NASA EONET." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="bg-[#0f172a] text-white border-b border-white/5">
        <div className="container py-16">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-red-400">Live Global Monitor</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-3">
              Global Crisis <span className="text-[#009EDB]">Intelligence</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mb-6">
              Real-time disaster and hazard events worldwide — pulled directly from USGS and NASA EONET. Updated automatically every 5 minutes.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><Globe size={13} className="text-[#009EDB]" /> USGS Earthquake Hazards Program</span>
              <span className="flex items-center gap-1.5"><Activity size={13} className="text-[#009EDB]" /> NASA Earth Observatory Natural Event Tracker</span>
              {lastFetch && (
                <span className="flex items-center gap-1.5 ml-auto">
                  <Clock size={12} />
                  Last updated: {lastFetch.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  <button onClick={load} disabled={loading} className="ml-1 text-gray-500 hover:text-white transition-colors disabled:opacity-40">
                    <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                  </button>
                </span>
              )}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-[#0f172a] pb-10">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatBlock label="Active Events (60 days)" value={events.length} color="#009EDB" sub="USGS + NASA EONET" />
            <StatBlock label="Max Earthquake Magnitude" value={maxMag ? `M${maxMag}` : "—"} color="#ef4444" sub="Past 30 days" />
            <StatBlock label="Active Storms & Fires" value={typeCounts.storm + typeCounts.wildfire} color="#f97316" sub="Open events" />
            <StatBlock label="Regions Affected" value={countriesAffected} color="#a855f7" sub="Unique locations" />
          </div>
        </div>
      </section>

      {/* ── Live map ── */}
      <section className="bg-[#0f172a] pb-10">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#009EDB] mb-1">Live Global Event Map</p>
                <h2 className="text-xl font-black text-white">
                  {filteredEvents.length} events {activeType ? `· ${EVENT_CONFIG[activeType]?.label}` : "· All types"}
                </h2>
              </div>
              {activeType && (
                <button onClick={() => setActive(null)}
                  className="text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5">
                  <Filter size={11} /> Clear filter
                </button>
              )}
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.05}>
            <GlobalMap
              key={mapKey}
              height={560}
              filter={filterProp}
              showRefresh={false}
              showLegend={false}
              className="mb-4"
            />
          </AnimateIn>

          {/* Filter pills */}
          <AnimateIn variant="fadeUp" delay={0.1}>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setActive(null)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  !activeType
                    ? "bg-[#009EDB]/20 border-[#009EDB]/60 text-[#009EDB]"
                    : "bg-transparent border-white/10 text-gray-500"
                }`}
              >
                <Radio size={11} /> All Events ({events.length})
              </button>
              {Object.keys(EVENT_CONFIG).map(type => (
                <FilterPill
                  key={type}
                  type={type}
                  count={typeCounts[type]}
                  active={activeType === type}
                  onClick={() => setActive(activeType === type ? null : type)}
                />
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Event feed ── */}
      <section className="bg-[#080f1a] py-14">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#009EDB] mb-1">Event Feed</p>
                <h2 className="text-2xl font-black text-white">
                  {activeType ? `${EVENT_CONFIG[activeType]?.label} Events` : "All Active Events"}
                </h2>
              </div>
              <span className="text-xs text-gray-600">Sorted by most recent</span>
            </div>
          </AnimateIn>

          {loading && events.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={24} className="animate-spin text-[#009EDB]" />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <AlertTriangle size={32} className="mx-auto mb-3 opacity-40" />
              <p>No events of this type currently tracked.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredEvents.slice(0, 60).map((ev, i) => (
                <EventRow key={ev.id} ev={ev} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Data sources ── */}
      <section className="bg-[#0f172a] py-10 border-t border-white/5">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#009EDB] mb-4">Data Sources</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                <p className="font-black text-white text-sm mb-1">USGS Earthquake Hazards</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">Significant earthquake events from the past 30 days. Updated every 15 minutes.</p>
                <a href="https://earthquake.usgs.gov" target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-[#009EDB] hover:underline flex items-center gap-1">
                  earthquake.usgs.gov <ExternalLink size={9} />
                </a>
              </div>
              <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                <p className="font-black text-white text-sm mb-1">NASA EONET</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">Earth Observatory Natural Event Tracker — wildfires, storms, volcanic activity, and more.</p>
                <a href="https://eonet.gsfc.nasa.gov" target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-[#009EDB] hover:underline flex items-center gap-1">
                  eonet.gsfc.nasa.gov <ExternalLink size={9} />
                </a>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.05} className="mt-8 flex flex-wrap gap-4">
            <Link to="/campaigns" className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
              <Globe size={15} /> Explore Campaigns
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border border-white/15 text-gray-400 hover:text-white hover:border-white/30 font-bold px-6 py-2.5 rounded-xl transition-all text-sm">
              Partner with WDC <ArrowRight size={14} />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
