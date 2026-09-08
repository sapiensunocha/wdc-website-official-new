import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Activity, RefreshCw, AlertTriangle, Globe, Zap, TrendingDown, ChevronDown } from "lucide-react";

const MICHAEL_URL = import.meta.env.VITE_MICHAEL_API_URL || "https://michael-api-382117221028.us-central1.run.app";
const MICHAEL_KEY = import.meta.env.VITE_MICHAEL_API_SECRET || "xeltis-prod-key-2026";

// WDC design tokens
const D = {
  bg:        "#FFFFFF",
  bgRaised:  "#F8FAFB",
  bgSubtle:  "#F1F5F9",
  border:    "#E2E8F0",
  borderStr: "#CBD5E1",
  textPri:   "#0D1F2D",
  textSec:   "#475569",
  textTer:   "#94A3B8",
  primary:   "#009EDB",
  primaryMt: "#E8F5FC",
};

const SEV_COLOR = { 5: "#CC2936", 4: "#E87722", 3: "#F59E0B", 2: "#1A7644", 1: "#94A3B8" };
const SEV_LABEL = { 5: "critical", 4: "high", 3: "moderate", 2: "low", 1: "minimal" };
const SEV_ORDER = [5, 4, 3, 2, 1];

function normType(raw) {
  if (!raw) return "Other";
  const t = String(raw).toLowerCase();
  if (t.includes("flood"))      return "Flood";
  if (t.includes("earthquake")) return "Earthquake";
  if (t.includes("storm") || t.includes("cyclone") || t.includes("hurricane") || t.includes("typhoon")) return "Storm";
  if (t.includes("fire") || t.includes("wildfire")) return "Wildfire";
  if (t.includes("drought"))    return "Drought";
  if (t.includes("volcano"))    return "Volcano";
  if (t.includes("tsunami"))    return "Tsunami";
  if (t.includes("conflict") || t.includes("violence")) return "Conflict";
  if (t.includes("disease") || t.includes("epidemic")) return "Disease";
  if (t.includes("landslide"))  return "Landslide";
  return "Other";
}

const TYPE_ICON = {
  Flood: "💧", Earthquake: "🌍", Storm: "🌀", Wildfire: "🔥",
  Drought: "🌵", Volcano: "🌋", Tsunami: "🌊", Conflict: "⚔️",
  Disease: "🦠", Landslide: "⛰️", Other: "⚠️",
};

function KpiCard({ icon: Icon, label, value, accent, sub }) {
  return (
    <div style={{ background: D.bg, border: `1px solid ${D.border}`, borderRadius: 12, padding: "14px 16px", borderTop: `3px solid ${accent}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div style={{ background: accent + "18", borderRadius: 8, padding: 6 }}>
          <Icon size={14} style={{ color: accent }} />
        </div>
        <span style={{ fontSize: 11, color: D.textSec, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 900, color: D.textPri, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: D.textTer, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export default function CrisisAtlasDashboard({ onClose }) {
  const [events, setEvents]         = useState([]);
  const [total, setTotal]           = useState(0);
  const [loading, setLoading]       = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedType, setSelectedType] = useState("All");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${MICHAEL_URL}/api/alerts`, {
        headers: { "X-API-Key": MICHAEL_KEY },
      });
      if (res.ok) {
        const json = await res.json();
        const raw  = Array.isArray(json) ? json : (json.events ?? []);
        setTotal(json.total ?? raw.length);
        setEvents(raw
          .filter(e => e.latitude && e.longitude)
          .map(e => ({ ...e, _sev: Number(e.severity_level) || 3, _type: normType(e.event_type) }))
        );
        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = selectedType === "All" ? events : events.filter(e => e._type === selectedType);
  const countries  = new Set(events.map(e => e.location_name).filter(Boolean)).size;
  const fatalities = events.reduce((s, e) => s + (Number(e.fatalities || e.people_killed) || 0), 0);
  const criticals  = events.filter(e => e._sev >= 4).length;

  const typeCounts = {};
  events.forEach(e => { typeCounts[e._type] = (typeCounts[e._type] || 0) + 1; });
  const topTypes   = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const sevCounts  = {};
  events.forEach(e => { sevCounts[e._sev] = (sevCounts[e._sev] || 0) + 1; });
  const allTypes   = ["All", ...Object.keys(typeCounts).sort()];

  return (
    <div style={{ background: D.bgSubtle, border: `1px solid ${D.border}`, borderRadius: 16, overflow: "hidden", marginTop: 24 }}>

      {/* ── Header ── */}
      <div style={{ background: D.bg, borderBottom: `1px solid ${D.border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: D.primaryMt, borderRadius: 8, padding: 7 }}>
            <Activity size={15} style={{ color: D.primary }} />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: D.textPri, margin: 0, lineHeight: 1.2 }}>Crisis Atlas</h3>
            <p style={{ fontSize: 11, color: D.textSec, margin: 0, marginTop: 2 }}>Live Global Disaster Dashboard · Powered by Michael AI</p>
          </div>
          {!loading && (
            <span style={{ fontSize: 11, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", borderRadius: 20, padding: "3px 10px", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
              Live · {total.toLocaleString()} events
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {lastUpdated && <span style={{ fontSize: 11, color: D.textTer }}>Updated {lastUpdated}</span>}
          <button onClick={load} disabled={loading} style={{ background: D.bgSubtle, border: `1px solid ${D.border}`, borderRadius: 8, padding: "6px 12px", color: D.textSec, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600 }}>
            <RefreshCw size={12} style={{ animation: loading ? "atlas-spin 1s linear infinite" : "none" }} /> Refresh
          </button>
          <button onClick={onClose} style={{ background: D.bgSubtle, border: `1px solid ${D.border}`, borderRadius: 8, padding: "6px 12px", color: D.textSec, cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
            <ChevronDown size={14} /> Collapse
          </button>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, padding: "16px 20px" }}>
        <KpiCard icon={AlertTriangle} label="Active Events"  value={loading ? "…" : events.length.toLocaleString()} accent={D.primary}   sub={`of ${total.toLocaleString()} total tracked`} />
        <KpiCard icon={TrendingDown}  label="Fatalities"     value={loading ? "…" : fatalities > 1000 ? `${(fatalities/1000).toFixed(1)}k` : fatalities || "—"} accent="#CC2936" sub="confirmed deaths" />
        <KpiCard icon={Globe}         label="Locations"      value={loading ? "…" : countries}   accent="#7c3aed"  sub="distinct areas" />
        <KpiCard icon={Zap}           label="High / Critical" value={loading ? "…" : criticals}  accent="#E87722"  sub="severity 4–5 events" />
      </div>

      {/* ── Body: Left panel + Map ── */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 0, borderTop: `1px solid ${D.border}` }}>

        {/* Left panel */}
        <div style={{ background: D.bg, borderRight: `1px solid ${D.border}`, padding: "16px", display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", maxHeight: 520 }}>

          {/* Type filter */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: D.textTer, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Filter by Type</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {allTypes.map(t => (
                <button key={t} onClick={() => setSelectedType(t)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "6px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  cursor: "pointer", border: selectedType === t ? `1px solid ${D.primary}` : `1px solid transparent`,
                  background: selectedType === t ? D.primaryMt : "transparent",
                  color: selectedType === t ? D.primary : D.textSec,
                  textAlign: "left", width: "100%",
                }}>
                  <span>{t === "All" ? "All Types" : `${TYPE_ICON[t] || "⚠️"} ${t}`}</span>
                  <span style={{ fontSize: 11, color: D.textTer }}>
                    {t === "All" ? events.length : (typeCounts[t] || 0)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Severity breakdown */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: D.textTer, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Severity Breakdown</p>
            {SEV_ORDER.map(sev => {
              const count = sevCounts[sev] || 0;
              const pct   = events.length ? (count / events.length) * 100 : 0;
              return (
                <div key={sev} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 11 }}>
                    <span style={{ color: SEV_COLOR[sev], fontWeight: 700, textTransform: "capitalize" }}>Sev {sev} — {SEV_LABEL[sev]}</span>
                    <span style={{ color: D.textTer }}>{count}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 4, background: D.bgSubtle }}>
                    <div style={{ height: "100%", borderRadius: 4, width: `${pct}%`, background: SEV_COLOR[sev] }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top disaster types */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: D.textTer, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Top Disaster Types</p>
            {topTypes.slice(0, 7).map(([type, count]) => {
              const max = topTypes[0]?.[1] || 1;
              return (
                <div key={type} style={{ marginBottom: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 11 }}>
                    <span style={{ color: D.textSec }}>{TYPE_ICON[type]} {type}</span>
                    <span style={{ color: D.textTer }}>{count}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 3, background: D.bgSubtle }}>
                    <div style={{ height: "100%", borderRadius: 3, width: `${(count/max)*100}%`, background: `linear-gradient(90deg,${D.primary},#7c3aed)` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map */}
        <div style={{ position: "relative", minHeight: 520 }}>
          {/* Type filter pill row above map */}
          <div style={{ position: "absolute", top: 10, left: 10, right: 10, zIndex: 1000, display: "flex", gap: 5, flexWrap: "wrap" }}>
            {allTypes.slice(0, 10).map(t => (
              <button key={t} onClick={() => setSelectedType(t)} style={{
                padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                cursor: "pointer", border: selectedType === t ? "none" : `1px solid ${D.border}`,
                background: selectedType === t ? D.primary : D.bg,
                color: selectedType === t ? "#fff" : D.textSec,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}>
                {t === "All" ? `All (${events.length})` : `${TYPE_ICON[t] || "⚠️"} ${t}`}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: D.bgSubtle, flexDirection: "column", gap: 12 }}>
              <Activity size={28} style={{ color: D.primary }} />
              <span style={{ color: D.textSec, fontSize: 13 }}>Fetching live disaster data from Michael AI…</span>
            </div>
          ) : (
            <MapContainer center={[20, 10]} zoom={2} minZoom={2} maxZoom={8} style={{ width: "100%", height: "100%", minHeight: 520 }} zoomControl={false}>
              <ZoomControl position="bottomright" />
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>'
              />
              {filtered.map((e, i) => {
                const color  = SEV_COLOR[e._sev] ?? "#94A3B8";
                const radius = e._sev === 5 ? 9 : e._sev === 4 ? 6 : 4;
                return (
                  <CircleMarker
                    key={e.event_id ?? i}
                    center={[e.latitude, e.longitude]}
                    radius={radius}
                    pathOptions={{ color, fillColor: color, fillOpacity: 0.75, weight: 1.5, opacity: 0.9 }}
                  >
                    <Popup>
                      <div style={{ minWidth: 200, fontFamily: "inherit" }}>
                        <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4, color: D.textPri }}>{TYPE_ICON[e._type]} {e._type}</div>
                        <div style={{ fontSize: 12, color: D.textSec, marginBottom: 6 }}>{e.location_name || "Location unknown"}</div>
                        {(e.fatalities || e.people_killed) > 0 && <div style={{ fontSize: 11, color: "#CC2936", marginBottom: 2 }}>⚠ {e.fatalities || e.people_killed} fatalities</div>}
                        {e.people_affected > 0 && <div style={{ fontSize: 11, color: "#E87722", marginBottom: 2 }}>👥 {Number(e.people_affected).toLocaleString()} affected</div>}
                        {e.short_description && <div style={{ fontSize: 11, color: D.textSec, marginTop: 4, fontStyle: "italic" }}>{e.short_description.slice(0, 120)}{e.short_description.length > 120 ? "…" : ""}</div>}
                        <div style={{ fontSize: 10, color: D.textTer, marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ background: (SEV_COLOR[e._sev] ?? "#94A3B8") + "20", color: SEV_COLOR[e._sev] ?? "#94A3B8", padding: "1px 6px", borderRadius: 8, fontWeight: 700, textTransform: "capitalize" }}>
                            {SEV_LABEL[e._sev]}
                          </span>
                          {e.timestamp ? new Date(e.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                          {e.is_forecast && <span style={{ color: "#7c3aed", fontWeight: 700 }}>· AI Forecast</span>}
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          )}
        </div>
      </div>

      {/* ── Recent events strip ── */}
      <div style={{ background: D.bg, borderTop: `1px solid ${D.border}` }}>
        <div style={{ padding: "10px 20px", borderBottom: `1px solid ${D.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: D.textSec, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {filtered.length.toLocaleString()} events showing · Michael AI Intelligence Platform
          </span>
          {lastUpdated && <span style={{ fontSize: 11, color: D.textTer }}>Last updated {lastUpdated}</span>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", maxHeight: 160, overflowY: "auto" }}>
          {filtered.slice(0, 40).map((e, i) => (
            <div key={e.event_id ?? i} style={{ padding: "8px 16px", borderBottom: `1px solid ${D.bgSubtle}`, borderRight: `1px solid ${D.bgSubtle}`, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{TYPE_ICON[e._type]}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: D.textPri, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {e.location_name || e._type}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", color: SEV_COLOR[e._sev], background: (SEV_COLOR[e._sev]) + "18", padding: "1px 5px", borderRadius: 6 }}>
                    {SEV_LABEL[e._sev]}
                  </span>
                  <span style={{ fontSize: 10, color: D.textTer }}>
                    {e.timestamp ? new Date(e.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes atlas-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .leaflet-container { background: #e8f0f5; }
      `}</style>
    </div>
  );
}
