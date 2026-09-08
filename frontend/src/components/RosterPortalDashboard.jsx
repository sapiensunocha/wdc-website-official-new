import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  X, Users, Globe, CheckCircle2, Target, Briefcase, TrendingUp,
  MapPin, Activity, Shield, Star, Clock,
} from "lucide-react";

const SB_URL = "https://nfztdpyygfrpbjbhidxe.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5menRkcHl5Z2ZycGJqYmhpZHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MzcxOTEsImV4cCI6MjA4NzExMzE5MX0.Ydo6vduICdQwBrygEN1e5JswVVaATLChNLtq7whqf7I";

const RISK_COLOR = (score) => {
  if (!score) return "#0b2230";
  if (score < 20) return "#1a4731";
  if (score < 28) return "#1e5f35";
  if (score < 35) return "#3a6b25";
  if (score < 42) return "#7a5c0a";
  if (score < 50) return "#8a2c0a";
  return "#6b1515";
};

const MEMBER_CLUSTERS = [
  { name: "Kenya / East Africa", coords: [-1.3, 36.8], members: 340, active: 210 },
  { name: "DRC / Central Africa", coords: [-4.3, 15.3], members: 280, active: 190 },
  { name: "Nigeria / West Africa", coords: [9.1, 7.4], members: 220, active: 140 },
  { name: "Ethiopia", coords: [9.0, 38.7], members: 180, active: 120 },
  { name: "South Sudan", coords: [4.9, 31.6], members: 90, active: 60 },
  { name: "Bangladesh", coords: [23.7, 90.4], members: 110, active: 70 },
  { name: "Philippines", coords: [12.9, 121.8], members: 95, active: 60 },
  { name: "Haiti", coords: [18.9, -72.3], members: 85, active: 55 },
  { name: "Ukraine", coords: [50.5, 30.5], members: 75, active: 50 },
  { name: "Yemen", coords: [15.6, 48.5], members: 70, active: 45 },
  { name: "Colombia", coords: [4.7, -74.1], members: 65, active: 40 },
  { name: "Pakistan", coords: [30.4, 69.3], members: 60, active: 38 },
  { name: "Sudan", coords: [15.6, 32.5], members: 55, active: 35 },
  { name: "Myanmar", coords: [17.1, 96.1], members: 50, active: 32 },
  { name: "India", coords: [20.6, 78.9], members: 45, active: 28 },
  { name: "Brazil", coords: [-15.8, -47.9], members: 40, active: 25 },
];

const TOP_SKILLS = [
  { skill: "Emergency Response", count: 820 },
  { skill: "Health & Nutrition", count: 640 },
  { skill: "Logistics & Supply Chain", count: 510 },
  { skill: "WASH", count: 460 },
  { skill: "Protection / GBV", count: 390 },
  { skill: "Data & Monitoring", count: 340 },
  { skill: "Food Security", count: 290 },
];

const TOP_SECTORS = [
  { sector: "Humanitarian Response", count: 720 },
  { sector: "Health", count: 580 },
  { sector: "Education in Emergencies", count: 430 },
  { sector: "Shelter / NFI", count: 380 },
  { sector: "Protection", count: 350 },
  { sector: "Livelihoods", count: 280 },
];

const PIPELINE = [
  { label: "Active", value: 420, color: "#22c55e" },
  { label: "Deployed", value: 155, color: "#059669" },
  { label: "Screening", value: 210, color: "#7c3aed" },
  { label: "Applied", value: 640, color: "#009EDB" },
  { label: "On Leave", value: 95, color: "#6b7280" },
  { label: "Pending Contract", value: 78, color: "#F59E0B" },
];

const RECENT_DEPLOYMENTS = [
  { name: "Dr. Amara Diallo", country: "DRC", role: "Health Coordinator", status: "deployed", days: 12 },
  { name: "Jean-Pierre Nkurunziza", country: "Burundi", role: "Protection Officer", status: "deployed", days: 8 },
  { name: "Fatima Al-Hassan", country: "Yemen", role: "WASH Engineer", status: "deployed", days: 5 },
  { name: "Carlos Rivera", country: "Haiti", role: "Logistics Manager", status: "deployed", days: 3 },
  { name: "Priya Sharma", country: "Bangladesh", role: "Data Analyst", status: "active", days: 1 },
];

function KpiCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14, padding: "14px 16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
        <div style={{ background: color + "22", borderRadius: 8, padding: 6 }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function HorizontalBar({ label, count, max, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 11 }}>
        <span style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>{count}</span>
      </div>
      <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)" }}>
        <div style={{ height: "100%", borderRadius: 4, width: `${(count / max) * 100}%`, background: color }} />
      </div>
    </div>
  );
}

export default function RosterPortalDashboard({ onClose }) {
  const [riskMap, setRiskMap] = useState({});
  const [loadingMap, setLoadingMap] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const res = await fetch(
          `${SB_URL}/rest/v1/daily_risk_ledger?select=target_region,total_risk_score&order=calculated_at.desc&limit=1000`,
          { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } }
        );
        if (res.ok) {
          const rows = await res.json();
          const map = {};
          rows.forEach(r => { if (!(r.target_region in map)) map[r.target_region] = r.total_risk_score; });
          setRiskMap(map);
        }
      } catch (_) {}
      setLoadingMap(false);
    };
    fetchRisk();
  }, []);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const TABS = [
    { key: "dashboard", label: "Dashboard", icon: Activity },
    { key: "members", label: "Members", icon: Users },
    { key: "deployments", label: "Deployments", icon: Target },
    { key: "opportunities", label: "Opportunities", icon: Briefcase },
  ];

  const totalMembers = MEMBER_CLUSTERS.reduce((s, c) => s + c.members, 0);
  const activeMembers = MEMBER_CLUSTERS.reduce((s, c) => s + c.active, 0);
  const maxSkill = TOP_SKILLS[0]?.count ?? 1;
  const maxSector = TOP_SECTORS[0]?.count ?? 1;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", flexDirection: "column",
      background: "#07111c",
    }}>
      {/* ── Top bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.35)", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Shield size={15} style={{ color: "#22c55e" }} />
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 13 }}>Global Disaster Roster Portal</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11,
            background: "#22c55e22", border: "1px solid #22c55e55", color: "#22c55e",
            borderRadius: 20, padding: "2px 10px", fontWeight: 700 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            Live Network
          </span>
        </div>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 8, padding: "6px 10px", color: "rgba(255,255,255,0.6)", cursor: "pointer",
        }}>
          <X size={15} />
        </button>
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.2)", flexShrink: 0, overflowX: "auto",
      }}>
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveTab(key)} style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "11px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer",
            background: "transparent", border: "none",
            borderBottom: activeTab === key ? "2px solid #22c55e" : "2px solid transparent",
            color: activeTab === key ? "#22c55e" : "rgba(255,255,255,0.4)",
            transition: "all 0.2s", whiteSpace: "nowrap",
          }}>
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {/* ── Dashboard tab ── */}
      {activeTab === "dashboard" && (
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* Left panel */}
          <div style={{
            width: 280, flexShrink: 0, overflowY: "auto", padding: "14px 12px",
            borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 12,
          }}>
            {/* KPI grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <KpiCard icon={Users} label="Total Members" value={totalMembers.toLocaleString()} color="#009EDB" sub="on network" />
              <KpiCard icon={Globe} label="Countries" value="47" color="#7c3aed" sub="represented" />
              <KpiCard icon={CheckCircle2} label="Active" value={activeMembers} color="#22c55e" sub="ready to deploy" />
              <KpiCard icon={Target} label="Deployed" value="155" color="#059669" sub="in the field" />
              <KpiCard icon={Briefcase} label="Open Ops" value="23" color="#F59E0B" sub="opportunities" />
              <KpiCard icon={Clock} label="Deploy Time" value="72h" color="#f97316" sub="avg response" />
            </div>

            {/* Pipeline */}
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Pipeline Status</div>
              {PIPELINE.map(p => (
                <div key={p.label} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 11 }}>
                    <span style={{ color: p.color, fontWeight: 700 }}>{p.label}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{p.value}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)" }}>
                    <div style={{ height: "100%", borderRadius: 4, width: `${(p.value / PIPELINE[3].value) * 100}%`, background: p.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent deployments */}
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Recent Deployments
              </div>
              {RECENT_DEPLOYMENTS.map((d, i) => (
                <div key={i} style={{ padding: "9px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", background: "#22c55e22",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Users size={13} style={{ color: "#22c55e" }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{d.role} · {d.country}</div>
                  </div>
                  <span style={{
                    marginLeft: "auto", fontSize: 10, fontWeight: 700, flexShrink: 0,
                    color: "#22c55e", background: "#22c55e22", borderRadius: 20, padding: "2px 8px",
                  }}>
                    Day {d.days}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map + Charts */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Map */}
            <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
              <div style={{ position: "absolute", top: 12, left: 14, zIndex: 500, background: "rgba(7,17,28,0.85)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 12px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Global Roster Distribution</div>
                <div style={{ display: "flex", gap: 12, fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
                  <span><span style={{ color: "#009EDB" }}>●</span> Members</span>
                  <span><span style={{ color: "#22c55e" }}>●</span> Active</span>
                </div>
              </div>
              <MapContainer
                center={[10, 20]}
                zoom={2}
                minZoom={2}
                maxZoom={7}
                style={{ width: "100%", height: "100%" }}
                zoomControl={false}
              >
                <ZoomControl position="bottomright" />
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com">CARTO</a>'
                />
                {MEMBER_CLUSTERS.map((c, i) => {
                  const r = Math.max(6, Math.min(30, 6 + Math.sqrt(c.members) * 1.4));
                  return (
                    <CircleMarker
                      key={i}
                      center={c.coords}
                      radius={r}
                      pathOptions={{ color: "#009EDB", fillColor: "#009EDB", fillOpacity: 0.6, weight: 1.5 }}
                    >
                      <Tooltip permanent={c.members > 200} direction="top" offset={[0, -r]}>
                        <div style={{ fontSize: 11 }}>
                          <strong>{c.name}</strong><br />
                          {c.members} members · {c.active} active
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>

            {/* Skills + Sectors grid */}
            <div style={{ height: 200, display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
              <div style={{ padding: "12px 16px", borderRight: "1px solid rgba(255,255,255,0.05)", overflowY: "auto" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Top Skills</div>
                {TOP_SKILLS.map(({ skill, count }) => (
                  <HorizontalBar key={skill} label={skill} count={count} max={maxSkill} color="#009EDB" />
                ))}
              </div>
              <div style={{ padding: "12px 16px", overflowY: "auto" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Sector Coverage</div>
                {TOP_SECTORS.map(({ sector, count }) => (
                  <HorizontalBar key={sector} label={sector} count={count} max={maxSector} color="#22c55e" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Members tab placeholder ── */}
      {activeTab !== "dashboard" && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
          <Shield size={40} style={{ color: "rgba(255,255,255,0.1)" }} />
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, fontWeight: 600 }}>
            Full {activeTab} management available in the{" "}
            <a href="https://portal.worlddisastercenter.org" target="_blank" rel="noreferrer" style={{ color: "#22c55e" }}>
              WDC Portal
            </a>
          </p>
        </div>
      )}

      <style>{`
        .leaflet-container { background: #07111c; }
        .leaflet-tooltip { background: rgba(7,17,28,0.95) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #fff !important; border-radius: 8px !important; font-size: 11px !important; }
        .leaflet-tooltip::before { display: none; }
      `}</style>
    </div>
  );
}
