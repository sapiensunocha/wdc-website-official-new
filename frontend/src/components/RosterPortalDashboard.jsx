import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {
  Users, Globe, CheckCircle2, Target, Briefcase, TrendingUp,
  Search, Shield, ChevronDown, X,
} from "lucide-react";

// ── WDC design tokens ──────────────────────────────────────────────────────────
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

const GEO_URL = "/countries-110m.json";
const SB_URL  = "https://nfztdpyygfrpbjbhidxe.supabase.co";
const SB_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5menRkcHl5Z2ZycGJqYmhpZHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MzcxOTEsImV4cCI6MjA4NzExMzE5MX0.Ydo6vduICdQwBrygEN1e5JswVVaATLChNLtq7whqf7I";

const MEMBER_STATUS_COLOR = {
  applied:             "#009EDB",
  screening:           "#7c3aed",
  interview_scheduled: "#E87722",
  background_check:    "#ea580c",
  contract_pending:    "#E87722",
  active:              "#1A7644",
  deployed:            "#059669",
  on_leave:            "#6b7280",
  suspended:           "#CC2936",
  rejected:            "#CC2936",
};

const NUM_TO_A3 = {
  "004":"AFG","008":"ALB","012":"DZA","024":"AGO","032":"ARG","036":"AUS","040":"AUT",
  "044":"BHS","048":"BHR","050":"BGD","056":"BEL","064":"BTN","068":"BOL","072":"BWA",
  "076":"BRA","084":"BLZ","090":"SLB","096":"BRN","100":"BGR","104":"MMR","108":"BDI",
  "112":"BLR","116":"KHM","120":"CMR","124":"CAN","132":"CPV","140":"CAF","144":"LKA",
  "148":"TCD","152":"CHL","156":"CHN","170":"COL","180":"COD","188":"CRI","191":"HRV",
  "192":"CUB","196":"CYP","203":"CZE","204":"BEN","208":"DNK","214":"DOM","218":"ECU",
  "222":"SLV","231":"ETH","232":"ERI","242":"FJI","246":"FIN","250":"FRA",
  "266":"GAB","270":"GMB","276":"DEU","288":"GHA","300":"GRC","320":"GTM",
  "324":"GIN","328":"GUY","332":"HTI","340":"HND","348":"HUN","356":"IND",
  "360":"IDN","364":"IRN","368":"IRQ","372":"IRL","376":"ISR","380":"ITA","388":"JAM",
  "392":"JPN","398":"KAZ","400":"JOR","404":"KEN","410":"KOR","418":"LAO",
  "422":"LBN","426":"LSO","430":"LBR","434":"LBY","450":"MDG","458":"MYS",
  "466":"MLI","478":"MRT","484":"MEX","496":"MNG","504":"MAR","508":"MOZ",
  "512":"OMN","516":"NAM","524":"NPL","528":"NLD","548":"VUT","558":"NIC",
  "562":"NER","566":"NGA","578":"NOR","586":"PAK","591":"PAN","598":"PNG",
  "604":"PER","608":"PHL","616":"POL","620":"PRT","634":"QAT","642":"ROU",
  "643":"RUS","646":"RWA","682":"SAU","686":"SEN","688":"SRB","694":"SLE",
  "703":"SVK","704":"VNM","705":"SVN","706":"SOM","710":"ZAF","716":"ZWE",
  "724":"ESP","729":"SDN","740":"SUR","752":"SWE","756":"CHE","760":"SYR",
  "762":"TJK","764":"THA","780":"TTO","784":"ARE","788":"TUN","792":"TUR",
  "800":"UGA","804":"UKR","807":"MKD","818":"EGY","826":"GBR","834":"TZA",
  "840":"USA","854":"BFA","858":"URY","860":"UZB","862":"VEN","887":"YEM","894":"ZMB",
};

function riskFill(score) {
  if (score === undefined) return "#E2E8F0";
  if (score < 20) return "#bbf7d0";
  if (score < 28) return "#86efac";
  if (score < 35) return "#fde68a";
  if (score < 42) return "#fcd34d";
  if (score < 50) return "#fb923c";
  return "#f87171";
}

// ── Timeline bar chart ──────────────────────────────────────────────────────────
function TimelineChart({ data }) {
  const BAR_AREA = 140;
  const LABEL_H  = 24;
  const max = Math.max(...data.map(d => d.count), 1);
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ padding: "8px 4px 0" }}>
      <div className="flex items-end" style={{ position: "relative", height: BAR_AREA + LABEL_H }}>
        {[0.25, 0.5, 0.75, 1].map(frac => (
          <div key={frac} style={{
            position: "absolute", left: 0, right: 0,
            bottom: LABEL_H + Math.round(frac * BAR_AREA),
            borderTop: `1px dashed ${D.border}`, zIndex: 0,
          }}>
            <span style={{ position: "absolute", right: "100%", paddingRight: 4, fontSize: 9, color: D.textTer, transform: "translateY(50%)" }}>
              {Math.round(frac * max)}
            </span>
          </div>
        ))}
        {data.map(({ month, count }, idx) => {
          const barH  = count > 0 ? Math.max(4, Math.round((count / max) * BAR_AREA)) : 2;
          const isHov = hovered === idx;
          return (
            <div key={month}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              style={{ flex: 1, position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", cursor: "default", zIndex: 1, paddingBottom: LABEL_H }}
            >
              {isHov && (
                <div style={{ position: "absolute", bottom: LABEL_H + barH + 6, left: "50%", transform: "translateX(-50%)", background: D.bg, border: `1px solid ${D.border}`, borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700, color: D.textPri, whiteSpace: "nowrap", zIndex: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                  {count} application{count !== 1 ? "s" : ""}
                  <div style={{ fontSize: 10, color: D.textSec, marginTop: 1 }}>{month}</div>
                </div>
              )}
              <div style={{ width: "80%", height: barH, background: isHov ? D.primary : D.primaryMt, border: `1px solid ${isHov ? D.primary : D.borderStr}`, borderRadius: "4px 4px 0 0", transition: "all 0.2s" }} />
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: isHov ? D.primary : D.textTer, whiteSpace: "nowrap", height: LABEL_H, display: "flex", alignItems: "flex-end", paddingBottom: 2, fontWeight: isHov ? 700 : 400 }}>
                {month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Status donut ────────────────────────────────────────────────────────────────
function StatusDonut({ data, colorMap }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let offset  = 0;
  const r = 52, cx = 70, cy = 70;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={D.bgSubtle} strokeWidth={18} />
        {data.map(seg => {
          const frac   = seg.value / total;
          const dash   = frac * circ;
          const gap    = circ - dash;
          const rotate = (offset / total) * 360 - 90;
          offset += seg.value;
          return (
            <circle key={seg.raw} cx={cx} cy={cy} r={r} fill="none"
              stroke={colorMap[seg.raw] ?? D.textTer} strokeWidth={18}
              strokeDasharray={`${dash} ${gap}`} strokeLinecap="butt"
              transform={`rotate(${rotate} ${cx} ${cy})`}
              style={{ transition: "stroke-dasharray 0.4s" }} />
          );
        })}
        <text x={cx} y={cy - 6}  textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: D.textPri }}>{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: 9,  fill: D.textTer }}>members</text>
      </svg>
      <div className="w-full space-y-1.5">
        {data.slice(0, 7).map(s => (
          <div key={s.name} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: colorMap[s.raw] ?? D.textTer }} />
              <span style={{ color: D.textSec, textTransform: "capitalize" }}>{s.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-14 h-1 rounded-full overflow-hidden" style={{ background: D.bgSubtle }}>
                <div className="h-full rounded-full" style={{ width: `${(s.value / total) * 100}%`, background: colorMap[s.raw] ?? D.textTer }} />
              </div>
              <span className="font-bold w-5 text-right" style={{ color: D.textPri }}>{s.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Horizontal bars ─────────────────────────────────────────────────────────────
function HorizontalBars({ data, color }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const [hov, setHov] = useState(null);
  return (
    <div className="space-y-2">
      {data.map(({ label, value }, idx) => (
        <div key={label} className="flex items-center gap-2"
          onMouseEnter={() => setHov(idx)} onMouseLeave={() => setHov(null)}>
          <span className="text-[11px] font-medium truncate" style={{ width: 120, color: D.textPri }}>{label}</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: D.bgSubtle }}>
            <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: hov === idx ? color : color + "99", transition: "all 0.2s" }} />
          </div>
          <span className="text-[11px] font-bold w-5 text-right" style={{ color }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

// ── Avatar ──────────────────────────────────────────────────────────────────────
function Avatar({ name, size = 34 }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const palette  = ["#009EDB", "#7c3aed", "#1A7644", "#E87722", "#CC2936"];
  const color    = palette[name.charCodeAt(0) % palette.length];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: size * 0.36, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

// ── Status badge ────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const color = MEMBER_STATUS_COLOR[status] ?? "#6b7280";
  return (
    <span style={{ background: color + "18", color, borderRadius: 20, padding: "2px 9px", fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", textTransform: "capitalize", letterSpacing: 0.2 }}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

// ── World map ───────────────────────────────────────────────────────────────────
function RosterMap({ clusters }) {
  const [riskByISO3, setRiskByISO3] = useState({});
  const [lastUpdated, setLastUpdated] = useState("");
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    fetch(`${SB_URL}/rest/v1/daily_risk_ledger?select=target_region,total_risk_score&order=calculated_at.desc&limit=1000`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    })
      .then(r => r.ok ? r.json() : [])
      .then(rows => {
        const map = {};
        rows.forEach(r => { if (!(r.target_region in map)) map[r.target_region] = r.total_risk_score; });
        setRiskByISO3(map);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      })
      .catch(() => {});
    const t = setInterval(() => {}, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", background: D.bgSubtle }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="rBubbleL" cx="35%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#4DC0E8" />
            <stop offset="60%" stopColor="#009EDB" />
            <stop offset="100%" stopColor="#0072BC" />
          </radialGradient>
        </defs>
      </svg>

      <ComposableMap projection="geoNaturalEarth1" projectionConfig={{ scale: 155 }} style={{ width: "100%", height: 420 }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => {
              const iso3  = NUM_TO_A3[String(geo.id).padStart(3, "0")];
              const score = iso3 ? riskByISO3[iso3] : undefined;
              return (
                <Geography key={geo.rsmKey} geography={geo}
                  onMouseEnter={e => {
                    const svgRect = e.currentTarget.closest("svg")?.getBoundingClientRect();
                    setTooltip({ name: String(geo.properties.name ?? ""), score, x: e.clientX - (svgRect?.left ?? 0), y: e.clientY - (svgRect?.top ?? 0) });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: { fill: riskFill(score), stroke: "#fff", strokeWidth: 0.5, outline: "none" },
                    hover:   { fill: riskFill(score), opacity: 0.75, outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {clusters.map((c, i) => {
          const mR = c.memberCount > 0 ? Math.max(6, Math.min(24, 6 + Math.sqrt(c.memberCount) * 5)) : 0;
          return mR > 0 ? (
            <Marker key={i} coordinates={c.coords}>
              <g>
                <circle r={mR + 6} fill="none" stroke="#009EDB" strokeWidth={1.5}>
                  <animate attributeName="r"       values={`${mR};${mR + 6};${mR}`} dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5"               dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle r={mR} fill="url(#rBubbleL)" stroke="#fff" strokeWidth={1} strokeOpacity={0.7} />
                {c.memberCount > 1 && <text textAnchor="middle" dy={4} style={{ fontSize: Math.max(7, mR * 0.5), fontWeight: 800, fill: "#fff", pointerEvents: "none" }}>{c.memberCount}</text>}
              </g>
            </Marker>
          ) : null;
        })}
      </ComposableMap>

      {tooltip && (
        <div style={{ position: "absolute", left: tooltip.x + 12, top: tooltip.y - 10, background: D.bg, border: `1px solid ${D.border}`, borderRadius: 8, padding: "6px 10px", pointerEvents: "none", zIndex: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: D.textPri }}>{tooltip.name}</div>
          <div style={{ fontSize: 11, marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: riskFill(tooltip.score) }} />
            <span style={{ color: D.textSec }}>{tooltip.score !== undefined ? `Risk: ${tooltip.score.toFixed(1)}` : "No risk data"}</span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{ position: "absolute", bottom: 10, left: 12 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: D.textTer, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
          INFORM Risk · Michael{lastUpdated && <span style={{ fontWeight: 400, marginLeft: 5, opacity: 0.7 }}>· {lastUpdated}</span>}
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {[{ c: "#bbf7d0", l: "Very Low" }, { c: "#86efac", l: "Low" }, { c: "#fde68a", l: "Medium" }, { c: "#fcd34d", l: "High" }, { c: "#fb923c", l: "Very High" }, { c: "#f87171", l: "Extreme" }, { c: D.border, l: "No data" }].map(({ c, l }) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ width: 22, height: 9, borderRadius: 2, background: c, border: `0.5px solid ${D.border}` }} />
              <span style={{ fontSize: 8, color: D.textTer, whiteSpace: "nowrap" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Country coords for map clusters ────────────────────────────────────────────
const COUNTRY_COORDS = {
  "Afghanistan":[67.7,33.9],"Angola":[17.9,-11.2],"Bangladesh":[90.4,23.7],
  "Brazil":[-51.9,-14.2],"Burkina Faso":[-1.6,12.4],"Burundi":[29.9,-3.4],
  "Cameroon":[12.4,3.9],"Chad":[18.7,15.5],"Colombia":[-74.3,4.6],
  "DR Congo":[23.7,-2.9],"Egypt":[30.8,26.8],"Ethiopia":[40.5,9.1],
  "Ghana":[-1.0,7.9],"Guinea":[-11.8,11.0],"Haiti":[-72.3,18.9],
  "India":[78.9,20.6],"Indonesia":[113.9,-0.8],"Iraq":[43.7,33.2],
  "Kenya":[37.9,0.0],"Lebanon":[35.9,33.9],"Libya":[17.2,26.3],
  "Madagascar":[46.9,-18.8],"Mali":[-2.0,17.6],"Morocco":[-7.1,31.8],
  "Mozambique":[35.5,-18.7],"Myanmar":[95.9,21.9],"Nepal":[84.1,28.4],
  "Niger":[8.1,17.6],"Nigeria":[8.7,9.1],"Pakistan":[69.3,30.4],
  "Philippines":[121.8,12.9],"Rwanda":[29.9,-1.9],"Senegal":[-14.5,14.5],
  "Sierra Leone":[-11.8,8.4],"Somalia":[46.2,5.2],"South Sudan":[31.3,4.9],
  "Sudan":[30.2,12.9],"Syria":[38.0,35.0],"Tanzania":[34.9,-6.4],
  "Uganda":[32.3,1.4],"Ukraine":[31.2,48.4],"Yemen":[48.5,15.6],
  "Zambia":[27.8,-13.1],"Zimbabwe":[29.2,-20.0],
};

// resource_type → status mapping
const TYPE_TO_STATUS = {
  wdc_hero:      "deployed",
  ingo:          "active",
  medical:       "active",
  hospital:      "active",
  food_depot:    "active",
  csr_stockpile: "active",
  shelter:       "active",
  evacuation:    "active",
};

// resource_type → sectors mapping
const TYPE_TO_SECTORS = {
  wdc_hero:      ["Emergency Response","Field Operations"],
  ingo:          ["Protection","Shelter","Food Security"],
  medical:       ["Health","Medical"],
  hospital:      ["Health","Surgery"],
  food_depot:    ["Food Security","WASH"],
  csr_stockpile: ["Logistics","Supply Chain"],
  shelter:       ["Shelter","NFI"],
  evacuation:    ["Logistics","Emergency Response"],
};

// ── Main component ──────────────────────────────────────────────────────────────
export default function RosterPortalDashboard({ onClose }) {
  const [dashSearch, setDashSearch] = useState("");
  const [resources, setResources]   = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    fetch(`${SB_URL}/rest/v1/wdc_resources?select=id,name,resource_type,organization,country,city,latitude,longitude,trust_score,capacity_status,services,is_active&order=trust_score.desc&limit=200`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    })
      .then(r => r.ok ? r.json() : [])
      .then(rows => {
        setResources(rows.map(r => ({
          id:              r.id,
          fullName:        r.name,
          organization:    r.organization ?? "",
          country:         r.country ?? "",
          city:            r.city ?? "",
          latitude:        r.latitude,
          longitude:       r.longitude,
          status:          TYPE_TO_STATUS[r.resource_type] ?? "active",
          sectors:         (TYPE_TO_SECTORS[r.resource_type] ?? []).concat(r.services ?? []).filter((v,i,a) => a.indexOf(v) === i).slice(0, 3),
          skills:          (r.services ?? []).map(s => ({ name: s.charAt(0).toUpperCase() + s.slice(1) })),
          resource_type:   r.resource_type,
          trust_score:     r.trust_score,
          capacity_status: r.capacity_status,
          applicationDate: r.capacity_status === "available" ? "2026-01-01" : "2025-06-01",
        })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const members = resources;

  const countries         = new Set(members.map(m => m.country).filter(Boolean));
  const activeDeployments = members.filter(m => m.status === "active").length;

  const monthMap = {};
  members.forEach(m => {
    if (!m.applicationDate) return;
    const d   = new Date(m.applicationDate);
    if (isNaN(d.getTime())) return;
    const key = d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    monthMap[key] = (monthMap[key] ?? 0) + 1;
  });
  const timelineData = Object.entries(monthMap)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => new Date(a.month) - new Date(b.month))
    .slice(-12);

  const statusMap = {};
  members.forEach(m => { const s = m.status ?? "unknown"; statusMap[s] = (statusMap[s] ?? 0) + 1; });
  const statusDist = Object.entries(statusMap)
    .map(([name, value]) => ({ name: name.replace(/_/g, " "), value, raw: name }))
    .sort((a, b) => b.value - a.value);

  const skillMap = {};
  members.forEach(m => (m.skills ?? []).forEach(s => { skillMap[s.name] = (skillMap[s.name] ?? 0) + 1; }));
  const topSkills = Object.entries(skillMap).map(([skill, count]) => ({ skill, count })).sort((a, b) => b.count - a.count).slice(0, 10);

  const sectorMap = {};
  members.forEach(m => (m.sectors ?? []).forEach(s => { sectorMap[s] = (sectorMap[s] ?? 0) + 1; }));
  const topSectors = Object.entries(sectorMap).map(([sector, count]) => ({ sector, count })).sort((a, b) => b.count - a.count).slice(0, 8);

  const countryMap = {};
  members.forEach(m => { if (m.country) countryMap[m.country] = (countryMap[m.country] ?? 0) + 1; });
  const topCountries = Object.entries(countryMap).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count).slice(0, 8);

  // Build map clusters — use actual lat/lng from wdc_resources, fall back to COUNTRY_COORDS
  const clusterMap = {};
  members.forEach(m => {
    const key    = m.country || m.city || "unknown";
    const coords = (m.longitude && m.latitude)
      ? [m.longitude, m.latitude]
      : COUNTRY_COORDS[m.country];
    if (!coords) return;
    if (!clusterMap[key]) clusterMap[key] = { country: m.country || key, coords, memberCount: 0 };
    clusterMap[key].memberCount++;
  });
  const mapClusters = Object.values(clusterMap);

  const searchResults = dashSearch.trim()
    ? members.filter(m => {
        const q = dashSearch.toLowerCase();
        return m.fullName?.toLowerCase().includes(q) ||
          m.country?.toLowerCase().includes(q) ||
          (m.skills ?? []).some(s => s.name.toLowerCase().includes(q)) ||
          (m.sectors ?? []).some(s => s.toLowerCase().includes(q));
      }).slice(0, 12)
    : [];

  const cardStyle = { background: D.bg, border: `1px solid ${D.border}`, borderRadius: 12, overflow: "hidden" };

  return (
    <div style={{ background: D.bgSubtle, border: `1px solid ${D.border}`, borderRadius: 16, overflow: "hidden", marginTop: 24 }}>

      {/* ── Header ── */}
      <div style={{ background: D.bg, borderBottom: `1px solid ${D.border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: "#f0fdf4", borderRadius: 8, padding: 7 }}>
            <Shield size={15} style={{ color: "#1A7644" }} />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: D.textPri, margin: 0, lineHeight: 1.2 }}>Global Disaster Roster Portal</h3>
            <p style={{ fontSize: 11, color: D.textSec, margin: 0, marginTop: 2 }}>Vetted humanitarian professionals ready for rapid deployment</p>
          </div>
          <span style={{ fontSize: 11, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", borderRadius: 20, padding: "3px 10px", fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
            {loading ? "Loading…" : `${members.length} Resources Live`}
          </span>
        </div>
        <button onClick={onClose} style={{ background: D.bgSubtle, border: `1px solid ${D.border}`, borderRadius: 8, padding: "6px 12px", color: D.textSec, cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
          <ChevronDown size={14} /> Collapse
        </button>
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>

        {/* ── Search ── */}
        <div style={{ position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: D.textTer, pointerEvents: "none" }} />
          <input type="text" value={dashSearch} onChange={e => setDashSearch(e.target.value)}
            placeholder="Search members by name, country, skill or sector…"
            style={{ width: "100%", paddingLeft: 36, paddingRight: 36, paddingTop: 10, paddingBottom: 10, borderRadius: 10, border: `1px solid ${D.border}`, background: D.bg, color: D.textPri, fontSize: 13, outline: "none", boxSizing: "border-box" }}
          />
          {dashSearch && (
            <button onClick={() => setDashSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: D.textTer, background: "none", border: "none", cursor: "pointer" }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── Search results ── */}
        {dashSearch.trim() && (
          <div style={cardStyle}>
            <div style={{ padding: "10px 16px", borderBottom: `1px solid ${D.border}` }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: D.textPri }}>{searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{dashSearch}"</span>
            </div>
            {searchResults.length === 0 && <p style={{ textAlign: "center", padding: "20px", color: D.textTer, fontSize: 12 }}>No members found</p>}
            {searchResults.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: `1px solid ${D.bgSubtle}` }}>
                <Avatar name={m.fullName ?? "?"} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: D.textPri }}>{m.fullName}</div>
                  <div style={{ fontSize: 11, color: D.textSec, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.country} · {(m.sectors ?? []).slice(0, 2).join(", ")}</div>
                </div>
                <StatusBadge status={m.status ?? "applied"} />
              </div>
            ))}
          </div>
        )}

        {/* ── KPI Row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }} className="sm:grid-cols-3 lg:grid-cols-6">
          {[
            { icon: Users,        label: "Total Members",  value: members.length,                                    color: D.primary,  sub: `${activeDeployments} active` },
            { icon: Globe,        label: "Countries",      value: countries.size,                                    color: "#7c3aed",  sub: "represented" },
            { icon: CheckCircle2, label: "Active",         value: members.filter(m => m.status === "active").length, color: "#1A7644",  sub: "on roster" },
            { icon: Target,       label: "Deployed",       value: members.filter(m => m.status === "deployed").length, color: "#059669", sub: "in field" },
            { icon: Briefcase,    label: "Skills",         value: Object.keys(skillMap).length,                      color: "#E87722",  sub: "specialisations" },
            { icon: TrendingUp,   label: "Sectors",        value: Object.keys(sectorMap).length,                     color: "#ea580c",  sub: "covered" },
          ].map(({ icon: Icon, label, value, color, sub }) => (
            <div key={label} style={{ background: D.bg, border: `1px solid ${D.border}`, borderRadius: 12, padding: "14px 16px", borderTop: `3px solid ${color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ background: color + "18", borderRadius: 8, padding: 6 }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: D.textSec, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: D.textPri, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 10, color: D.textTer, marginTop: 3 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* ── World Map + Top Countries ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${D.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ fontWeight: 800, fontSize: 13, color: D.textPri, margin: 0 }}>Global Roster Distribution</h4>
                <p style={{ fontSize: 11, color: D.textSec, margin: "2px 0 0" }}>
                  <span style={{ color: D.primary }}>●</span> Members · bubble size = headcount
                </p>
              </div>
              <span style={{ fontSize: 11, background: D.primaryMt, color: D.primary, padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>{countries.size} countries</span>
            </div>
            <RosterMap clusters={mapClusters} />
          </div>

          <div style={cardStyle}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${D.border}` }}>
              <h4 style={{ fontWeight: 800, fontSize: 13, color: D.textPri, margin: 0 }}>Top Countries</h4>
            </div>
            <div style={{ padding: "12px 16px" }}>
              {topCountries.map(({ country, count }, i) => (
                <div key={country} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: D.textTer, width: 16, textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                      <span style={{ fontWeight: 600, color: D.textPri }}>{country}</span>
                      <span style={{ color: D.textSec }}>{count}</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 4, background: D.bgSubtle, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(count / (topCountries[0]?.count || 1)) * 100}%`, background: `linear-gradient(90deg,${D.primary},#7c3aed)`, borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Timeline + Status donut ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${D.border}` }}>
              <h4 style={{ fontWeight: 800, fontSize: 13, color: D.textPri, margin: 0 }}>Application Timeline</h4>
              <p style={{ fontSize: 11, color: D.textSec, margin: "2px 0 0" }}>{timelineData.reduce((s, d) => s + d.count, 0)} applications across {timelineData.length} periods</p>
            </div>
            <div style={{ padding: "12px 16px" }}>
              {timelineData.length === 0
                ? <p style={{ textAlign: "center", color: D.textTer, fontSize: 12, padding: "20px 0" }}>No data</p>
                : <TimelineChart data={timelineData} />}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${D.border}` }}>
              <h4 style={{ fontWeight: 800, fontSize: 13, color: D.textPri, margin: 0 }}>Pipeline Status</h4>
              <p style={{ fontSize: 11, color: D.textSec, margin: "2px 0 0" }}>Member distribution by stage</p>
            </div>
            <div style={{ padding: "16px", display: "flex", justifyContent: "center" }}>
              <StatusDonut data={statusDist} colorMap={MEMBER_STATUS_COLOR} />
            </div>
          </div>
        </div>

        {/* ── Skills + Sectors ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${D.border}` }}>
              <h4 style={{ fontWeight: 800, fontSize: 13, color: D.textPri, margin: 0 }}>Top Skills</h4>
              <p style={{ fontSize: 11, color: D.textSec, margin: "2px 0 0" }}>Most common expertise across all members</p>
            </div>
            <div style={{ padding: "16px" }}>
              <HorizontalBars data={topSkills.map(s => ({ label: s.skill, value: s.count }))} color={D.primary} />
            </div>
          </div>
          <div style={cardStyle}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${D.border}` }}>
              <h4 style={{ fontWeight: 800, fontSize: 13, color: D.textPri, margin: 0 }}>Sector Coverage</h4>
              <p style={{ fontSize: 11, color: D.textSec, margin: "2px 0 0" }}>Members by humanitarian sector</p>
            </div>
            <div style={{ padding: "16px" }}>
              <HorizontalBars data={topSectors.map(s => ({ label: s.sector, value: s.count }))} color="#1A7644" />
            </div>
          </div>
        </div>

        {/* ── Members preview ── */}
        <div style={cardStyle}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${D.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ fontWeight: 800, fontSize: 13, color: D.textPri, margin: 0 }}>Roster Members</h4>
            <a href="/roster" style={{ fontSize: 12, color: D.primary, fontWeight: 700, textDecoration: "none" }}>View Full Roster →</a>
          </div>
          <div>
            {members.map(m => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: `1px solid ${D.bgSubtle}` }}>
                <Avatar name={m.fullName ?? "?"} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: D.textPri }}>{m.fullName}</div>
                  <div style={{ fontSize: 11, color: D.textSec, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {m.country} · {(m.sectors ?? []).join(", ")}
                  </div>
                </div>
                <StatusBadge status={m.status ?? "applied"} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
