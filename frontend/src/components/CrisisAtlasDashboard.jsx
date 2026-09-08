import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { X, Activity, RefreshCw, AlertTriangle, Globe, Users, Zap, TrendingDown } from "lucide-react";
import { supabase } from "../lib/supabase";

const SEV_COLOR = {
  critical: "#ef4444",
  high:     "#f97316",
  medium:   "#F59E0B",
  low:      "#22c55e",
};
const SEV_ORDER = ["critical", "high", "medium", "low"];

function normSeverity(raw) {
  if (!raw) return "medium";
  const s = String(raw).toLowerCase();
  if (s.includes("critical") || s === "5") return "critical";
  if (s.includes("high")     || s === "4") return "high";
  if (s.includes("low")      || s === "1") return "low";
  return "medium";
}

function normType(raw) {
  if (!raw) return "Other";
  const t = String(raw).toLowerCase();
  if (t.includes("flood"))      return "Flood";
  if (t.includes("earthquake")) return "Earthquake";
  if (t.includes("storm") || t.includes("cyclone") || t.includes("hurricane")) return "Storm";
  if (t.includes("fire") || t.includes("wildfire")) return "Wildfire";
  if (t.includes("drought"))    return "Drought";
  if (t.includes("volcano"))    return "Volcano";
  if (t.includes("conflict") || t.includes("violence") || t.includes("gbv")) return "Conflict";
  if (t.includes("disease") || t.includes("epidemic")) return "Disease";
  return "Other";
}

const TYPE_ICON = {
  Flood: "💧", Earthquake: "🌍", Storm: "🌀", Wildfire: "🔥",
  Drought: "🌵", Volcano: "🌋", Conflict: "⚔️", Disease: "🦠", Other: "⚠️",
};

function SevBadge({ sev }) {
  const color = SEV_COLOR[sev] ?? "#94a3b8";
  return (
    <span style={{
      background: color + "22", color, borderRadius: 12,
      padding: "2px 8px", fontSize: 10, fontWeight: 800,
      textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap",
    }}>
      {sev}
    </span>
  );
}

function KpiCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16, padding: "16px 18px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ background: color + "22", borderRadius: 8, padding: 7 }}>
          <Icon size={15} style={{ color }} />
        </div>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{sub}</div>}
    </div>
  );
}

export default function CrisisAtlasDashboard({ onClose }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const mapRef = useRef(null);

  const load = async () => {
    setLoading(true);
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data } = await supabase
        .from("sentinel_events")
        .select("event_id,latitude,longitude,event_type,severity_level,location_name,alert_message,event_timestamp,fatalities,magnitude,is_forecast,category")
        .gte("event_timestamp", thirtyDaysAgo)
        .order("event_timestamp", { ascending: false })
        .limit(500);
      if (data) {
        setEvents(data.map(e => ({
          ...e,
          _sev: normSeverity(e.severity_level),
          _type: normType(e.event_type || e.category),
        })));
        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validEvents = events.filter(e => e.latitude && e.longitude);
  const filtered = selectedType === "All" ? validEvents : validEvents.filter(e => e._type === selectedType);

  const countries = new Set(validEvents.map(e => e.location_name).filter(Boolean)).size;
  const fatalities = validEvents.reduce((s, e) => s + (Number(e.fatalities) || 0), 0);
  const criticals = validEvents.filter(e => e._sev === "critical" || e._sev === "high").length;
  const forecasts = validEvents.filter(e => e.is_forecast).length;

  const typeCounts = {};
  validEvents.forEach(e => { typeCounts[e._type] = (typeCounts[e._type] || 0) + 1; });
  const topTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);

  const sevCounts = {};
  validEvents.forEach(e => { sevCounts[e._sev] = (sevCounts[e._sev] || 0) + 1; });

  const allTypes = ["All", ...Object.keys(typeCounts).sort()];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", flexDirection: "column",
        background: "#060d18",
      }}
    >
      {/* ── Top bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.4)", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Activity size={15} style={{ color: "#f97316" }} />
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 13 }}>Crisis Atlas</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>· Weekly Disaster Dashboard</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11,
            background: "#22c55e22", border: "1px solid #22c55e55", color: "#22c55e",
            borderRadius: 20, padding: "2px 10px", fontWeight: 700 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
              display: "inline-block", animation: "pulse 2s infinite" }} />
            Live · 30-day window
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {lastUpdated && (
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Updated {lastUpdated}</span>
          )}
          <button onClick={load} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8, padding: "6px 10px", color: "rgba(255,255,255,0.6)",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 11,
          }}>
            <RefreshCw size={11} /> Refresh
          </button>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8, padding: "6px 10px", color: "rgba(255,255,255,0.6)", cursor: "pointer",
          }}>
            <X size={15} />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── Left panel ── */}
        <div style={{
          width: 300, flexShrink: 0, display: "flex", flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.06)", overflowY: "auto",
          padding: "14px 12px", gap: 12,
        }}>

          {/* KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <KpiCard icon={AlertTriangle} label="Active Events" value={loading ? "—" : validEvents.length} color="#f97316" sub="last 30 days" />
            <KpiCard icon={TrendingDown} label="Fatalities" value={loading ? "—" : fatalities > 1000 ? `${(fatalities/1000).toFixed(1)}k` : fatalities} color="#ef4444" sub="confirmed" />
            <KpiCard icon={Globe} label="Countries" value={loading ? "—" : countries} color="#009EDB" sub="affected" />
            <KpiCard icon={Zap} label="High Severity" value={loading ? "—" : criticals} color="#F59E0B" sub="critical + high" />
          </div>

          {/* Severity breakdown */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Severity Breakdown</div>
            {SEV_ORDER.map(sev => {
              const count = sevCounts[sev] || 0;
              const pct = validEvents.length ? (count / validEvents.length) * 100 : 0;
              return (
                <div key={sev} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 11 }}>
                    <span style={{ color: SEV_COLOR[sev], fontWeight: 700, textTransform: "capitalize" }}>{sev}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{count}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)" }}>
                    <div style={{ height: "100%", borderRadius: 4, width: `${pct}%`, background: SEV_COLOR[sev] }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* By type */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>By Disaster Type</div>
            {topTypes.slice(0, 7).map(([type, count]) => {
              const max = topTypes[0]?.[1] || 1;
              return (
                <div key={type} style={{ marginBottom: 7 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 11 }}>
                    <span style={{ color: "rgba(255,255,255,0.75)" }}>{TYPE_ICON[type]} {type}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{count}</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 3, background: "rgba(255,255,255,0.08)" }}>
                    <div style={{ height: "100%", borderRadius: 3, width: `${(count/max)*100}%`, background: "linear-gradient(90deg,#009EDB,#f97316)" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Forecast count */}
          {forecasts > 0 && (
            <div style={{
              background: "#7c3aed22", border: "1px solid #7c3aed44", borderRadius: 10, padding: "10px 12px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Zap size={14} style={{ color: "#7c3aed" }} />
              <span style={{ fontSize: 12, color: "#a78bfa" }}>
                <strong>{forecasts}</strong> forecast events in pipeline
              </span>
            </div>
          )}
        </div>

        {/* ── Right: Map + Events ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Type filter tabs */}
          <div style={{
            display: "flex", gap: 6, padding: "10px 14px", overflowX: "auto",
            borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0,
            scrollbarWidth: "none",
          }}>
            {allTypes.map(t => (
              <button key={t} onClick={() => setSelectedType(t)} style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: "pointer",
                whiteSpace: "nowrap", transition: "all 0.2s",
                background: selectedType === t ? "#009EDB" : "rgba(255,255,255,0.06)",
                color: selectedType === t ? "#fff" : "rgba(255,255,255,0.5)",
                border: selectedType === t ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}>
                {t === "All" ? `All (${validEvents.length})` : `${TYPE_ICON[t] || "⚠️"} ${t}`}
              </button>
            ))}
          </div>

          {/* Map */}
          <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
            {loading ? (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#060d18" }}>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading disaster data…</div>
              </div>
            ) : (
              <MapContainer
                center={[20, 10]}
                zoom={2}
                minZoom={2}
                maxZoom={8}
                style={{ width: "100%", height: "100%" }}
                zoomControl={false}
              >
                <ZoomControl position="bottomright" />
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com">CARTO</a>'
                />
                {filtered.map((e, i) => {
                  const color = SEV_COLOR[e._sev] ?? "#94a3b8";
                  const radius = e._sev === "critical" ? 10 : e._sev === "high" ? 7 : 5;
                  return (
                    <CircleMarker
                      key={e.event_id ?? i}
                      center={[e.latitude, e.longitude]}
                      radius={radius}
                      pathOptions={{ color, fillColor: color, fillOpacity: 0.7, weight: 1.5, opacity: 0.9 }}
                    >
                      <Popup>
                        <div style={{ minWidth: 180 }}>
                          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>{TYPE_ICON[e._type]} {e._type}</div>
                          <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>{e.location_name || "Unknown location"}</div>
                          {e.fatalities > 0 && <div style={{ fontSize: 11, color: "#ef4444" }}>⚠ {e.fatalities} fatalities</div>}
                          {e.magnitude && <div style={{ fontSize: 11, color: "#888" }}>Magnitude: {e.magnitude}</div>}
                          {e.alert_message && <div style={{ fontSize: 11, color: "#555", marginTop: 4, fontStyle: "italic" }}>{e.alert_message.slice(0, 100)}{e.alert_message.length > 100 ? "…" : ""}</div>}
                          <div style={{ fontSize: 10, color: "#aaa", marginTop: 6 }}>
                            {e.event_timestamp ? new Date(e.event_timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            )}
          </div>

          {/* Recent events strip */}
          <div style={{
            height: 200, overflowY: "auto", borderTop: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}>
            <div style={{ padding: "8px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Recent Events — {filtered.length} shown
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
              {filtered.slice(0, 24).map((e, i) => (
                <div key={e.event_id ?? i} style={{
                  padding: "8px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)",
                  display: "flex", alignItems: "flex-start", gap: 8,
                }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{TYPE_ICON[e._type]}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {e.location_name || e._type}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                      <SevBadge sev={e._sev} />
                      {e.fatalities > 0 && <span style={{ fontSize: 10, color: "#ef4444" }}>↓ {e.fatalities}</span>}
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
                        {e.event_timestamp ? new Date(e.event_timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .leaflet-container { background: #07141e; }
      `}</style>
    </div>
  );
}
