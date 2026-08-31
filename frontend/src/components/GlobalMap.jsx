import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { RefreshCw, Loader, AlertTriangle } from "lucide-react";

// ─── API endpoints ─────────────────────────────────────────────────────────────
const USGS_URL  = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
const EONET_URL = "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=60&days=60";

// ─── Event type config ─────────────────────────────────────────────────────────
export const EVENT_CONFIG = {
  earthquake: { color: "#ef4444", label: "Earthquake",       icon: "🌍" },
  wildfire:   { color: "#f97316", label: "Wildfire",          icon: "🔥" },
  storm:      { color: "#3b82f6", label: "Severe Storm",      icon: "🌀" },
  volcano:    { color: "#a855f7", label: "Volcanic Activity", icon: "🌋" },
  flood:      { color: "#06b6d4", label: "Flood",             icon: "💧" },
  drought:    { color: "#eab308", label: "Drought",           icon: "🌵" },
  other:      { color: "#94a3b8", label: "Other",             icon: "⚠️" },
};

function eonetType(categories = []) {
  const title = (categories[0]?.title || "").toLowerCase();
  if (title.includes("wildfire") || title.includes("fire")) return "wildfire";
  if (title.includes("volcano"))                              return "volcano";
  if (title.includes("storm") || title.includes("cyclone") || title.includes("hurricane") || title.includes("typhoon")) return "storm";
  if (title.includes("flood"))  return "flood";
  if (title.includes("drought") || title.includes("desiccation")) return "drought";
  return "other";
}

// ─── Fetch + normalise ─────────────────────────────────────────────────────────
async function loadEvents() {
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
        id:       f.id,
        type:     "earthquake",
        lat,
        lng,
        title:    f.properties.place || "Earthquake",
        mag:      f.properties.mag,
        detail:   `M${f.properties.mag} — ${f.properties.place}`,
        time:     new Date(f.properties.time).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" }),
        source:   "USGS",
        url:      f.properties.url,
        radius:   Math.max(5, (f.properties.mag || 4) * 2.5),
      });
    });
  }

  if (eonetRes.status === "fulfilled" && eonetRes.value.ok) {
    const data = await eonetRes.value.json();
    (data.events || []).forEach(e => {
      const geo = e.geometry?.[e.geometry.length - 1];
      if (!geo?.coordinates) return;
      let lat, lng;
      if (Array.isArray(geo.coordinates[0])) {
        [lng, lat] = geo.coordinates[0];
      } else {
        [lng, lat] = geo.coordinates;
      }
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;
      events.push({
        id:     e.id,
        type:   eonetType(e.categories),
        lat,
        lng,
        title:  e.title,
        detail: e.categories[0]?.title || "Natural Event",
        time:   new Date(geo.date).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" }),
        source: "NASA EONET",
        url:    e.sources?.[0]?.url || null,
        radius: 7,
      });
    });
  }

  return events;
}

// ─── Animate-to helper (resets view on filter change) ─────────────────────────
function MapFly({ center, zoom }) {
  const map = useMap();
  useEffect(() => { map.setView(center, zoom, { animate: true, duration: 0.8 }); }, [center[0], center[1], zoom]);
  return null;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function GlobalMap({
  height      = 520,
  filter      = null,   // array of event types to show; null = all
  center      = [20, 10],
  zoom        = 2,
  accentColor = "#009EDB",
  showLegend  = true,
  showRefresh = true,
  className   = "",
}) {
  const [events,    setEvents]  = useState([]);
  const [loading,   setLoading] = useState(true);
  const [lastFetch, setLast]    = useState(null);
  const [error,     setError]   = useState(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const evts = await loadEvents();
      setEvents(evts);
      setLast(new Date());
    } catch (e) {
      setError("Could not load live event data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch_(); }, []);

  const visible = filter
    ? events.filter(e => filter.includes(e.type))
    : events;

  const byType = Object.keys(EVENT_CONFIG).reduce((acc, k) => {
    acc[k] = events.filter(e => e.type === k).length;
    return acc;
  }, {});

  return (
    <div className={`relative ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Live Global Events · USGS + NASA EONET
          </span>
        </div>
        <div className="flex items-center gap-3">
          {lastFetch && (
            <span className="text-[9px] text-gray-600">
              Updated {lastFetch.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          {showRefresh && (
            <button
              onClick={fetch_}
              disabled={loading}
              className="text-gray-500 hover:text-gray-300 transition-colors disabled:opacity-40"
              title="Refresh events"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            </button>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="relative rounded-xl overflow-hidden border border-white/10" style={{ height }}>
        {loading && events.length === 0 && (
          <div className="absolute inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f172a]/90 gap-3">
            <Loader size={28} className="animate-spin text-[#009EDB]" />
            <span className="text-xs text-gray-400">Loading live events…</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f172a]/90 gap-2">
            <AlertTriangle size={22} className="text-red-400" />
            <span className="text-xs text-red-400">{error}</span>
          </div>
        )}

        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%", background: "#0f172a" }}
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
            subdomains="abcd"
            maxZoom={19}
          />
          <ZoomControl position="bottomright" />
          <MapFly center={center} zoom={zoom} />

          {visible.map(ev => {
            const cfg = EVENT_CONFIG[ev.type] || EVENT_CONFIG.other;
            const mag = ev.mag;
            return (
              <CircleMarker
                key={ev.id}
                center={[ev.lat, ev.lng]}
                radius={ev.radius || 7}
                pathOptions={{
                  color:       cfg.color,
                  fillColor:   cfg.color,
                  fillOpacity: 0.55,
                  weight:      1.5,
                }}
              >
                <Popup className="leaflet-popup-dark">
                  <div className="min-w-[180px] text-xs">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span>{cfg.icon}</span>
                      <span className="font-black uppercase text-[9px] tracking-wider" style={{ color: cfg.color }}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-100 leading-snug mb-0.5">{ev.title}</p>
                    {mag && <p className="text-gray-400">Magnitude: <strong className="text-white">{mag}</strong></p>}
                    <p className="text-gray-500 mt-0.5">{ev.time} · {ev.source}</p>
                    {ev.url && (
                      <a href={ev.url} target="_blank" rel="noopener noreferrer"
                        className="inline-block mt-1.5 text-[#009EDB] hover:underline text-[9px] font-bold uppercase tracking-wide">
                        View details →
                      </a>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 px-0.5">
          {Object.entries(EVENT_CONFIG).map(([key, cfg]) => {
            const count = byType[key] || 0;
            if (!count && key !== "earthquake") return null;
            return (
              <div key={key} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cfg.color }} />
                <span className="text-[10px] text-gray-400">
                  {cfg.label} {count > 0 && <span className="text-gray-500">({count})</span>}
                </span>
              </div>
            );
          })}
          <div className="ml-auto text-[9px] text-gray-600 flex items-center gap-1">
            <span>Data: USGS · NASA EONET</span>
          </div>
        </div>
      )}

      {/* Popup styles injected globally (once) */}
      <style>{`
        .leaflet-popup-dark .leaflet-popup-content-wrapper {
          background: #1e293b;
          color: #f8fafc;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .leaflet-popup-dark .leaflet-popup-tip { background: #1e293b; }
        .leaflet-popup-dark .leaflet-popup-content { margin: 12px 14px; }
        .leaflet-control-zoom a {
          background: #1e293b !important;
          color: #94a3b8 !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
        .leaflet-control-zoom a:hover { background: #334155 !important; color: #f8fafc !important; }
        .leaflet-control-attribution { display: none; }
      `}</style>
    </div>
  );
}
