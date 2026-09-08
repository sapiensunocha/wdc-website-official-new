import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Activity, RefreshCw, AlertTriangle, Globe, Zap, TrendingDown, ChevronDown } from "lucide-react";

const MICHAEL_URL = import.meta.env.VITE_MICHAEL_API_URL || "https://michael-api-382117221028.us-central1.run.app";
const MICHAEL_KEY = import.meta.env.VITE_MICHAEL_API_SECRET || "xeltis-prod-key-2026";

const D = {
  bg: "#FFFFFF", bgRaised: "#F8FAFB", bgSubtle: "#F1F5F9",
  border: "#E2E8F0", textPri: "#0D1F2D", textSec: "#475569", textTer: "#94A3B8",
  primary: "#009EDB", primaryMt: "#E8F5FC",
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
  Flood:"💧", Earthquake:"🌍", Storm:"🌀", Wildfire:"🔥",
  Drought:"🌵", Volcano:"🌋", Tsunami:"🌊", Conflict:"⚔️",
  Disease:"🦠", Landslide:"⛰️", Other:"⚠️",
};

const TYPE_COLOR = {
  Flood:"#3b82f6", Earthquake:"#8b5cf6", Storm:"#06b6d4", Wildfire:"#f97316",
  Drought:"#d97706", Volcano:"#dc2626", Tsunami:"#0891b2", Conflict:"#be123c",
  Disease:"#16a34a", Landslide:"#92400e", Other:"#6b7280",
};

// Expose Leaflet map instance to parent for custom zoom controls
function MapController({ mapRef }) {
  const map = useMap();
  useEffect(() => { mapRef.current = map; }, [map, mapRef]);
  return null;
}

export default function CrisisAtlasDashboard({ onClose }) {
  const [events, setEvents]           = useState([]);
  const [total, setTotal]             = useState(0);
  const [loading, setLoading]         = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const mapRef = useRef(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${MICHAEL_URL}/api/alerts`, { headers: { "X-API-Key": MICHAEL_KEY } });
      if (res.ok) {
        const json = await res.json();
        const raw  = Array.isArray(json) ? json : (json.events ?? []);
        setTotal(json.total ?? raw.length);
        setEvents(raw.filter(e => e.latitude && e.longitude).map(e => ({
          ...e,
          _sev:  Number(e.severity_level) || 3,
          _type: normType(e.event_type),
        })));
        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered   = selectedType === "All" ? events : events.filter(e => e._type === selectedType);
  const countries  = new Set(events.map(e => e.location_name).filter(Boolean)).size;
  const fatalities = events.reduce((s, e) => s + (Number(e.fatalities || e.people_killed) || 0), 0);
  const criticals  = events.filter(e => e._sev >= 4).length;
  const affected   = events.reduce((s, e) => s + (Number(e.people_affected) || 0), 0);

  const typeCounts = {};
  events.forEach(e => { typeCounts[e._type] = (typeCounts[e._type] || 0) + 1; });
  const topTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const sevCounts = {};
  events.forEach(e => { sevCounts[e._sev] = (sevCounts[e._sev] || 0) + 1; });
  const allTypes = ["All", ...Object.keys(typeCounts).sort()];

  const cardStyle = { background: D.bg, border: `1px solid ${D.border}`, borderRadius: 12 };

  return (
    <div style={{ background: D.bgSubtle, border: `1px solid ${D.border}`, borderRadius: 16, overflow: "hidden", marginTop: 24 }}>

      {/* ── Header ── */}
      <div style={{ background: D.bg, borderBottom: `1px solid ${D.border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: "#fff7ed", borderRadius: 8, padding: 7 }}>
            <Activity size={15} style={{ color: "#f97316" }} />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: D.textPri, margin: 0 }}>Crisis Atlas</h3>
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
          <button onClick={load} disabled={loading} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: D.bgSubtle, border: `1px solid ${D.border}`, color: D.textSec, cursor: "pointer" }}>
            <RefreshCw size={12} style={{ animation: loading ? "atlas-spin 1s linear infinite" : "none" }} /> Refresh
          </button>
          <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: D.bgSubtle, border: `1px solid ${D.border}`, color: D.textSec, cursor: "pointer" }}>
            <ChevronDown size={14} /> Collapse
          </button>
        </div>
      </div>

      {/* ── KPI row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, padding: "16px 20px" }}>
        {[
          { icon: AlertTriangle, label: "Active Events",   value: loading ? "…" : events.length.toLocaleString(), accent: D.primary,  sub: `of ${total.toLocaleString()} tracked` },
          { icon: TrendingDown,  label: "Fatalities",      value: loading ? "…" : fatalities > 999 ? `${(fatalities/1000).toFixed(1)}k` : fatalities || "—", accent: "#CC2936", sub: "confirmed" },
          { icon: Globe,         label: "Locations",       value: loading ? "…" : countries,  accent: "#7c3aed", sub: "distinct areas" },
          { icon: Zap,           label: "High / Critical", value: loading ? "…" : criticals,  accent: "#E87722", sub: "severity 4–5" },
        ].map(({ icon: Icon, label, value, accent, sub }) => (
          <div key={label} style={{ ...cardStyle, padding: "14px 16px", borderTop: `3px solid ${accent}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
              <div style={{ background: accent + "18", borderRadius: 8, padding: 6 }}><Icon size={14} style={{ color: accent }} /></div>
              <span style={{ fontSize: 10, fontWeight: 700, color: D.textSec, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: D.textPri, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 10, color: D.textTer, marginTop: 3 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Body: left panel + map ── */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", borderTop: `1px solid ${D.border}` }}>

        {/* Left: type filter + severity bars */}
        <div style={{ background: D.bg, borderRight: `1px solid ${D.border}`, padding: 14, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto", maxHeight: 580 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: D.textTer, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Filter by Type</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {allTypes.map(t => (
                <button key={t} onClick={() => setSelectedType(t)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "6px 9px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  cursor: "pointer", width: "100%", textAlign: "left",
                  border: selectedType === t ? `1px solid ${D.primary}` : "1px solid transparent",
                  background: selectedType === t ? D.primaryMt : "transparent",
                  color: selectedType === t ? D.primary : D.textSec,
                }}>
                  <span>{t === "All" ? "All Types" : `${TYPE_ICON[t] || "⚠️"} ${t}`}</span>
                  <span style={{ fontSize: 11, color: D.textTer }}>{t === "All" ? events.length : (typeCounts[t] || 0)}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: D.textTer, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Severity</p>
            {SEV_ORDER.map(sev => {
              const count = sevCounts[sev] || 0;
              const pct   = events.length ? (count / events.length) * 100 : 0;
              return (
                <div key={sev} style={{ marginBottom: 7 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
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

          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: D.textTer, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>By Disaster Type</p>
            {topTypes.slice(0, 8).map(([type, count]) => {
              const max = topTypes[0]?.[1] || 1;
              return (
                <div key={type} style={{ marginBottom: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
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

        {/* Map — ESRI Ocean Basemap: deep blue oceans, true depth colors, hillshade terrain */}
        <div style={{ position: "relative", minHeight: 580 }}>
          {loading ? (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, background: D.bgSubtle }}>
              <Activity size={28} style={{ color: D.primary }} />
              <span style={{ color: D.textSec, fontSize: 13 }}>Fetching live disaster data from Michael AI…</span>
            </div>
          ) : (
            <>
              {/* Custom zoom controls */}
              <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000, display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { label: "+", action: () => mapRef.current?.zoomIn() },
                  { label: "−", action: () => mapRef.current?.zoomOut() },
                  { label: "↺", action: () => mapRef.current?.setView([20, 0], 2) },
                ].map(({ label, action }) => (
                  <button key={label} onClick={action} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${D.border}`, background: D.bg, cursor: "pointer", fontSize: label === "↺" ? 14 : 18, fontWeight: 700, color: D.textSec, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
                    {label}
                  </button>
                ))}
              </div>

              <MapContainer
                center={[20, 0]}
                zoom={2}
                minZoom={1}
                maxZoom={13}
                style={{ width: "100%", height: 580 }}
                scrollWheelZoom={true}
                zoomControl={false}
              >
                <MapController mapRef={mapRef} />

                {/* ESRI Ocean Base — deep ocean blues, bathymetry, coastal features, hillshade */}
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
                  attribution='Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
                  maxZoom={13}
                />
                {/* ESRI Ocean Reference — country names, city labels, borders on top */}
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}"
                  maxZoom={13}
                  opacity={0.85}
                />

                {filtered.map((e, i) => {
                  const color  = SEV_COLOR[e._sev] ?? "#94A3B8";
                  const tColor = TYPE_COLOR[e._type] ?? "#6b7280";
                  const r      = e._sev === 5 ? 11 : e._sev === 4 ? 8 : e._sev === 3 ? 6 : 4;
                  return (
                    <CircleMarker
                      key={e.event_id ?? i}
                      center={[e.latitude, e.longitude]}
                      radius={r}
                      pathOptions={{
                        fillColor: tColor,
                        fillOpacity: 0.82,
                        color,
                        weight: e._sev >= 4 ? 2 : 1,
                        opacity: 0.95,
                        className: e._sev === 5 ? "crisis-critical-dot" : "",
                      }}
                    >
                      <Tooltip sticky direction="top" offset={[0, -r]}>
                        <div style={{ minWidth: 190, fontFamily: "inherit" }}>
                          <div style={{ fontWeight: 800, fontSize: 13, color: D.textPri, marginBottom: 4 }}>
                            {TYPE_ICON[e._type]} {e._type}
                          </div>
                          <div style={{ fontSize: 12, color: D.textSec, marginBottom: 5 }}>
                            {e.location_name || "Location unknown"}
                          </div>
                          {(Number(e.fatalities || e.people_killed) > 0) && (
                            <div style={{ fontSize: 11, color: "#CC2936", marginBottom: 2 }}>
                              ⚠ {e.fatalities || e.people_killed} fatalities
                            </div>
                          )}
                          {Number(e.people_affected) > 0 && (
                            <div style={{ fontSize: 11, color: "#E87722", marginBottom: 2 }}>
                              👥 {Number(e.people_affected).toLocaleString()} affected
                            </div>
                          )}
                          {e.short_description && (
                            <div style={{ fontSize: 11, color: D.textSec, marginTop: 4, fontStyle: "italic" }}>
                              {e.short_description.slice(0, 100)}{e.short_description.length > 100 ? "…" : ""}
                            </div>
                          )}
                          <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", color, background: color + "18", padding: "1px 6px", borderRadius: 6 }}>
                              {SEV_LABEL[e._sev]}
                            </span>
                            {e.timestamp && (
                              <span style={{ fontSize: 10, color: D.textTer }}>
                                {new Date(e.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </span>
                            )}
                            {e.is_forecast && <span style={{ fontSize: 10, color: "#7c3aed", fontWeight: 700 }}>· AI Forecast</span>}
                          </div>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  );
                })}
              </MapContainer>

              {/* Legend */}
              <div style={{ position: "absolute", bottom: 10, left: 12, zIndex: 900, background: "rgba(255,255,255,0.93)", border: `1px solid ${D.border}`, borderRadius: 8, padding: "6px 10px", backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: D.textTer, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Severity Border</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {SEV_ORDER.map(sev => (
                    <div key={sev} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#94a3b8", border: `2px solid ${SEV_COLOR[sev]}` }} />
                      <span style={{ fontSize: 9, color: D.textTer }}>{SEV_LABEL[sev]}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: D.textTer, marginTop: 5, marginBottom: 3 }}>Fill = disaster type</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {Object.entries(TYPE_COLOR).slice(0, 6).map(([t, c]) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                      <span style={{ fontSize: 8, color: D.textTer }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Events strip ── */}
      <div style={{ background: D.bg, borderTop: `1px solid ${D.border}` }}>
        <div style={{ padding: "10px 20px", borderBottom: `1px solid ${D.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: D.textSec, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {filtered.length.toLocaleString()} events · Michael AI Intelligence Platform
          </span>
          <span style={{ fontSize: 11, color: D.textTer }}>{lastUpdated && `Last updated ${lastUpdated}`}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", maxHeight: 160, overflowY: "auto" }}>
          {filtered.slice(0, 48).map((e, i) => (
            <div key={e.event_id ?? i} style={{ padding: "8px 14px", borderBottom: `1px solid ${D.bgSubtle}`, borderRight: `1px solid ${D.bgSubtle}`, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{TYPE_ICON[e._type]}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: D.textPri, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {e.location_name || e._type}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", color: SEV_COLOR[e._sev], background: SEV_COLOR[e._sev] + "18", padding: "1px 5px", borderRadius: 5 }}>{SEV_LABEL[e._sev]}</span>
                  <span style={{ fontSize: 10, color: D.textTer }}>{e.timestamp ? new Date(e.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes atlas-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .crisis-critical-dot {
          animation: crisis-pulse-ring 2s ease-in-out infinite;
        }
        @keyframes crisis-pulse-ring {
          0%, 100% { stroke-opacity: 0.95; stroke-width: 2; }
          50% { stroke-opacity: 0.35; stroke-width: 5; }
        }
        .leaflet-tooltip {
          border-radius: 10px !important;
          border: 1px solid #E2E8F0 !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;
          padding: 10px 14px !important;
          font-size: 12px !important;
        }
        .leaflet-tooltip::before { display: none !important; }
      `}</style>
    </div>
  );
}
