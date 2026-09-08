/**
 * Roster Portal Dashboard — exact copy of wdc-portal/src/app/roster/page.tsx
 * dashboard tab, ported to React + Tailwind (no Next.js, no Firestore auth).
 * Data: daily_risk_ledger from Supabase for the choropleth map.
 * Member stats use representative data (live data lives in wdc-portal's Firestore).
 */
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {
  X, Users, Globe, CheckCircle2, Target, Briefcase, TrendingUp,
  LayoutDashboard, Search, Shield, Loader2, Activity,
} from "lucide-react";

// ─── CSS variables inline (matches wdc-portal dark theme) ─────────────────────
const T = {
  surface:   "rgba(255,255,255,0.04)",
  surfaceSec:"rgba(255,255,255,0.02)",
  separator: "rgba(255,255,255,0.08)",
  fg:        "#ffffff",
  fgSec:     "rgba(255,255,255,0.6)",
  fgTer:     "rgba(255,255,255,0.3)",
};

// ─── Copied from wdc-portal ───────────────────────────────────────────────────
const MEMBER_STATUS_COLOR = {
  applied:             "#009EDB",
  screening:           "#7c3aed",
  interview_scheduled: "#F59E0B",
  background_check:    "#ea580c",
  contract_pending:    "#F59E0B",
  active:              "#22c55e",
  deployed:            "#059669",
  on_leave:            "#6b7280",
  suspended:           "#ef4444",
  rejected:            "#dc2626",
};

const GEO_URL = "/countries-110m.json";
const SB_URL  = "https://nfztdpyygfrpbjbhidxe.supabase.co";
const SB_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5menRkcHl5Z2ZycGJqYmhpZHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MzcxOTEsImV4cCI6MjA4NzExMzE5MX0.Ydo6vduICdQwBrygEN1e5JswVVaATLChNLtq7whqf7I";

const NUM_TO_A3 = {
  "004":"AFG","008":"ALB","012":"DZA","024":"AGO","032":"ARG","036":"AUS","040":"AUT",
  "044":"BHS","048":"BHR","050":"BGD","056":"BEL","064":"BTN","068":"BOL","072":"BWA",
  "076":"BRA","084":"BLZ","090":"SLB","096":"BRN","100":"BGR","104":"MMR","108":"BDI",
  "112":"BLR","116":"KHM","120":"CMR","124":"CAN","132":"CPV","140":"CAF","144":"LKA",
  "148":"TCD","152":"CHL","156":"CHN","170":"COL","180":"COD","188":"CRI","191":"HRV",
  "192":"CUB","196":"CYP","203":"CZE","204":"BEN","208":"DNK","214":"DOM","218":"ECU",
  "222":"SLV","231":"ETH","232":"ERI","238":"FLK","242":"FJI","246":"FIN","250":"FRA",
  "266":"GAB","270":"GMB","276":"DEU","288":"GHA","296":"KIR","300":"GRC","304":"GRL",
  "320":"GTM","324":"GIN","328":"GUY","332":"HTI","340":"HND","348":"HUN","356":"IND",
  "360":"IDN","364":"IRN","368":"IRQ","372":"IRL","376":"ISR","380":"ITA","388":"JAM",
  "392":"JPN","398":"KAZ","400":"JOR","404":"KEN","408":"PRK","410":"KOR","414":"KWT",
  "418":"LAO","422":"LBN","426":"LSO","430":"LBR","434":"LBY","440":"LTU","442":"LUX",
  "450":"MDG","458":"MYS","466":"MLI","478":"MRT","480":"MUS","484":"MEX","496":"MNG",
  "504":"MAR","508":"MOZ","512":"OMN","516":"NAM","524":"NPL","528":"NLD","540":"NCL",
  "548":"VUT","558":"NIC","562":"NER","566":"NGA","578":"NOR","586":"PAK","591":"PAN",
  "598":"PNG","604":"PER","608":"PHL","616":"POL","620":"PRT","630":"PRI","634":"QAT",
  "642":"ROU","643":"RUS","646":"RWA","682":"SAU","686":"SEN","688":"SRB","694":"SLE",
  "703":"SVK","704":"VNM","705":"SVN","706":"SOM","710":"ZAF","716":"ZWE","724":"ESP",
  "729":"SDN","732":"ESH","740":"SUR","752":"SWE","756":"CHE","760":"SYR","762":"TJK",
  "764":"THA","780":"TTO","784":"ARE","788":"TUN","792":"TUR","800":"UGA","804":"UKR",
  "807":"MKD","818":"EGY","826":"GBR","834":"TZA","840":"USA","854":"BFA","858":"URY",
  "860":"UZB","862":"VEN","882":"WSM","887":"YEM","894":"ZMB",
};

function riskFill(score) {
  if (score === undefined) return "#0b1d2b";
  if (score < 20) return "#1b5e20";
  if (score < 28) return "#2e7d32";
  if (score < 35) return "#689f38";
  if (score < 42) return "#f9a825";
  if (score < 50) return "#e64a19";
  return "#b71c1c";
}

// ─── Exact copy of wdc-portal TimelineChart ───────────────────────────────────
function TimelineChart({ data }) {
  const BAR_AREA = 160;
  const LABEL_H  = 28;
  const max = Math.max(...data.map((d) => d.count), 1);
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ padding: "8px 4px 0" }}>
      <div className="flex items-end" style={{ position: "relative", height: BAR_AREA + LABEL_H }}>
        {[0.25, 0.5, 0.75, 1].map((frac) => (
          <div key={frac} style={{
            position: "absolute", left: 0, right: 0,
            bottom: LABEL_H + Math.round(frac * BAR_AREA),
            borderTop: `1px dashed ${T.separator}`, zIndex: 0,
          }}>
            <span style={{ position: "absolute", right: "100%", paddingRight: 4, fontSize: 9, color: T.fgTer, transform: "translateY(50%)" }}>
              {Math.round(frac * max)}
            </span>
          </div>
        ))}
        {data.map(({ month, count }, idx) => {
          const barH  = count > 0 ? Math.max(6, Math.round((count / max) * BAR_AREA)) : 2;
          const isHov = hovered === idx;
          return (
            <div key={month} onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)}
              style={{ flex: 1, position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", cursor: "default", zIndex: 1, paddingBottom: LABEL_H }}>
              {isHov && (
                <div style={{ position: "absolute", bottom: LABEL_H + barH + 6, left: "50%", transform: "translateX(-50%)", background: "#0D1E2C", border: "1px solid #009EDB44", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 700, color: "#009EDB", whiteSpace: "nowrap", zIndex: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                  {count} {count === 1 ? "application" : "applications"}
                  <div style={{ fontSize: 10, fontWeight: 400, color: T.fgSec, marginTop: 1 }}>{month}</div>
                </div>
              )}
              <div style={{ width: "80%", height: barH, background: isHov ? "linear-gradient(180deg,#5eefff 0%,#009EDB 100%)" : `linear-gradient(180deg,rgba(0,200,255,${0.5 + (count / max) * 0.5}) 0%,rgba(0,158,219,${0.4 + (count / max) * 0.6}) 100%)`, borderRadius: "4px 4px 0 0", transition: "all 0.2s", boxShadow: isHov ? "0 0 12px rgba(0,158,219,0.6)" : "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: isHov ? "#009EDB" : T.fgTer, whiteSpace: "nowrap", height: LABEL_H, display: "flex", alignItems: "flex-end", paddingBottom: 2, fontWeight: isHov ? 700 : 400 }}>
                {month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Exact copy of wdc-portal StatusDonut ─────────────────────────────────────
function StatusDonut({ data, colorMap }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let offset  = 0;
  const r = 52, cx = 70, cy = 70;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.surfaceSec} strokeWidth={18} />
        {data.map((seg) => {
          const frac   = seg.value / total;
          const dash   = frac * circ;
          const gap    = circ - dash;
          const rotate = (offset / total) * 360 - 90;
          offset += seg.value;
          return (
            <circle key={seg.raw} cx={cx} cy={cy} r={r} fill="none"
              stroke={colorMap[seg.raw] ?? "#6b7280"} strokeWidth={18}
              strokeDasharray={`${dash} ${gap}`} strokeLinecap="butt"
              transform={`rotate(${rotate} ${cx} ${cy})`}
              style={{ transition: "stroke-dasharray 0.4s" }} />
          );
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: T.fg }}>{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: 9, fill: T.fgTer }}>members</text>
      </svg>
      <div className="w-full space-y-1.5">
        {data.slice(0, 7).map((s) => (
          <div key={s.name} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: colorMap[s.raw] ?? "#6b7280" }} />
              <span style={{ color: T.fgSec, textTransform: "capitalize" }}>{s.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-14 h-1 rounded-full overflow-hidden" style={{ background: T.surfaceSec }}>
                <div className="h-full rounded-full" style={{ width: `${(s.value / total) * 100}%`, background: colorMap[s.raw] ?? "#6b7280" }} />
              </div>
              <span className="font-bold w-5 text-right" style={{ color: T.fg }}>{s.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Exact copy of wdc-portal HorizontalBars ──────────────────────────────────
function HorizontalBars({ data, color }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const [hov, setHov] = useState(null);
  return (
    <div className="space-y-2.5">
      {data.map(({ label, value }, idx) => (
        <div key={label} className="flex items-center gap-2"
          onMouseEnter={() => setHov(idx)} onMouseLeave={() => setHov(null)}>
          <span className="text-[11px] font-medium truncate" style={{ width: 120, color: T.fg }}>{label}</span>
          <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: T.surfaceSec }}>
            <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: hov === idx ? `linear-gradient(90deg,${color},${color}cc)` : `${color}bb`, transition: "all 0.2s" }} />
          </div>
          <span className="text-[11px] font-bold w-5 text-right" style={{ color }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Exact copy of wdc-portal StatCard ────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: T.surface, border: `1px solid ${T.separator}` }}>
      <div style={{ background: color + "18", borderRadius: 12, padding: 10 }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-[11px]" style={{ color: T.fgSec }}>{label}</p>
        <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        {sub && <p className="text-[10px]" style={{ color: T.fgTer }}>{sub}</p>}
      </div>
    </div>
  );
}

// ─── Exact copy of wdc-portal Avatar ──────────────────────────────────────────
function Avatar({ name, photo, size = 36 }) {
  if (photo) return <img src={photo} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />;
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const colors   = ["#009EDB", "#7c3aed", "#22c55e", "#F59E0B", "#ea580c", "#ef4444"];
  const color    = colors[name.charCodeAt(0) % colors.length];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: size * 0.35, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

// ─── Exact copy of wdc-portal StatusBadge ─────────────────────────────────────
function StatusBadge({ status, colorMap }) {
  const color = colorMap[status] ?? "#6b7280";
  return (
    <span style={{ background: color + "22", color, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", textTransform: "capitalize", letterSpacing: 0.2 }}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

// ─── Roster Map (exact copy of wdc-portal RosterMap) ──────────────────────────
function RosterMap({ clusters }) {
  const [riskByISO3, setRiskByISO3] = useState({});
  const [lastUpdated, setLastUpdated] = useState("");
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const res = await fetch(`${SB_URL}/rest/v1/daily_risk_ledger?select=target_region,total_risk_score&order=calculated_at.desc&limit=1000`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } });
        if (!res.ok) return;
        const rows = await res.json();
        const map = {};
        rows.forEach((r) => { if (!(r.target_region in map)) map[r.target_region] = r.total_risk_score; });
        setRiskByISO3(map);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      } catch (_) {}
    };
    fetchRisk();
    const t = setInterval(fetchRisk, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", background: "#07141e" }}>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="rBubble" cx="35%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#5eefff" />
            <stop offset="60%" stopColor="#009EDB" />
            <stop offset="100%" stopColor="#005a85" />
          </radialGradient>
          <radialGradient id="hBubble" cx="35%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#fff176" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#92400e" />
          </radialGradient>
        </defs>
      </svg>

      <ComposableMap projection="geoNaturalEarth1" projectionConfig={{ scale: 160 }} style={{ width: "100%", height: 480 }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const numId = String(geo.id).padStart(3, "0");
              const iso3  = NUM_TO_A3[numId];
              const score = iso3 ? riskByISO3[iso3] : undefined;
              return (
                <Geography key={geo.rsmKey} geography={geo}
                  onMouseEnter={(e) => {
                    const svgRect = e.currentTarget.closest("svg")?.getBoundingClientRect();
                    setTooltip({ name: String(geo.properties.name ?? ""), score, x: e.clientX - (svgRect?.left ?? 0), y: e.clientY - (svgRect?.top ?? 0) });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: { fill: riskFill(score), stroke: "#07141e", strokeWidth: 0.4, outline: "none" },
                    hover:   { fill: riskFill(score), opacity: 0.78, outline: "none" },
                    pressed: { outline: "none" },
                  }} />
              );
            })
          }
        </Geographies>

        {clusters.map((c, i) => {
          const mR = c.memberCount > 0 ? Math.max(6, Math.min(28, 6 + Math.sqrt(c.memberCount) * 5)) : 0;
          const hR = c.heroCount   > 0 ? Math.max(5, Math.min(20, 5 + Math.sqrt(c.heroCount)   * 4)) : 0;
          return (
            <Marker key={i} coordinates={c.coords}>
              {mR > 0 && (
                <g>
                  <circle r={mR + 8} fill="none" stroke="#009EDB" strokeWidth={1.5}>
                    <animate attributeName="r"       values={`${mR};${mR + 8};${mR}`} dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6"               dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle r={mR} fill="url(#rBubble)" stroke="#fff" strokeWidth={0.7} strokeOpacity={0.5} />
                  <circle r={mR * 0.35} fill="#fff" fillOpacity={0.4} cx={-mR * 0.3} cy={-mR * 0.3} />
                  {c.memberCount > 1 && <text textAnchor="middle" dy={4} style={{ fontSize: Math.max(7, mR * 0.5), fontWeight: 800, fill: "#fff", pointerEvents: "none" }}>{c.memberCount}</text>}
                </g>
              )}
              {hR > 0 && (
                <g transform={`translate(${mR > 0 ? mR + 2 : 0},${mR > 0 ? -mR * 0.5 : 0})`}>
                  <circle r={hR + 6} fill="none" stroke="#F59E0B" strokeWidth={1.2}>
                    <animate attributeName="r"       values={`${hR};${hR + 6};${hR}`} dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5"               dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle r={hR} fill="url(#hBubble)" stroke="#fff" strokeWidth={0.7} strokeOpacity={0.5} />
                  <circle r={hR * 0.35} fill="#fff" fillOpacity={0.4} cx={-hR * 0.3} cy={-hR * 0.3} />
                </g>
              )}
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Hover tooltip — exact copy */}
      {tooltip && (
        <div style={{ position: "absolute", left: tooltip.x + 12, top: tooltip.y - 10, background: "rgba(7,20,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", pointerEvents: "none", zIndex: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{tooltip.name}</div>
          <div style={{ fontSize: 11, marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: riskFill(tooltip.score) }} />
            <span style={{ color: T.fgSec }}>{tooltip.score !== undefined ? `${tooltip.score.toFixed(1)}` : "No risk data"}</span>
          </div>
        </div>
      )}

      {/* Legend — exact copy */}
      <div style={{ position: "absolute", bottom: 12, left: 14 }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: T.fgTer, marginBottom: 5 }}>
          INFORM Risk · Michael{lastUpdated && <span style={{ fontWeight: 400, marginLeft: 6, opacity: 0.6 }}>· {lastUpdated}</span>}
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[{ c: "#1b5e20", l: "Very Low" }, { c: "#2e7d32", l: "Low" }, { c: "#689f38", l: "Medium" }, { c: "#f9a825", l: "High" }, { c: "#e64a19", l: "Very High" }, { c: "#b71c1c", l: "Extreme" }, { c: "#0b1d2b", l: "No data" }].map(({ c, l }) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ width: 24, height: 10, borderRadius: 2, background: c, border: "0.5px solid rgba(255,255,255,0.08)" }} />
              <span style={{ fontSize: 8, color: T.fgTer, whiteSpace: "nowrap" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Representative data (shaped like wdc-portal Firestore output) ─────────────
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
  "Palestine":[35.3,31.9],"Philippines":[121.8,12.9],"Rwanda":[29.9,-1.9],
  "Senegal":[-14.5,14.5],"Sierra Leone":[-11.8,8.4],"Somalia":[46.2,5.2],
  "South Sudan":[31.3,4.9],"Sudan":[30.2,12.9],"Syria":[38.0,35.0],
  "Tanzania":[34.9,-6.4],"Uganda":[32.3,1.4],"Ukraine":[31.2,48.4],
  "Yemen":[48.5,15.6],"Zambia":[27.8,-13.1],"Zimbabwe":[29.2,-20.0],
};

const DEMO_MEMBERS = [
  {id:"1",fullName:"Dr. Amara Diallo",country:"DR Congo",status:"deployed",sectors:["Health","Protection"],skills:[{name:"Emergency Response"},{name:"Health"}],applicationDate:"2026-01-15"},
  {id:"2",fullName:"Jean-Pierre Nkurunziza",country:"Burundi",status:"active",sectors:["Protection"],skills:[{name:"Protection"},{name:"GBV"}],applicationDate:"2026-02-01"},
  {id:"3",fullName:"Fatima Al-Hassan",country:"Yemen",status:"deployed",sectors:["WASH"],skills:[{name:"WASH"},{name:"Logistics"}],applicationDate:"2025-11-10"},
  {id:"4",fullName:"Carlos Rivera",country:"Haiti",status:"active",sectors:["Logistics"],skills:[{name:"Logistics"},{name:"Supply Chain"}],applicationDate:"2025-12-03"},
  {id:"5",fullName:"Priya Sharma",country:"Bangladesh",status:"screening",sectors:["Data"],skills:[{name:"Data & Monitoring"},{name:"GIS"}],applicationDate:"2026-04-22"},
  {id:"6",fullName:"Kwame Asante",country:"Ghana",status:"active",sectors:["Food Security"],skills:[{name:"Food Security"},{name:"Livelihoods"}],applicationDate:"2025-10-14"},
  {id:"7",fullName:"Leila Nazari",country:"Afghanistan",status:"applied",sectors:["Education"],skills:[{name:"Education in Emergencies"}],applicationDate:"2026-06-01"},
  {id:"8",fullName:"Emmanuel Okafor",country:"Nigeria",status:"deployed",sectors:["Health"],skills:[{name:"Health"},{name:"Epidemiology"}],applicationDate:"2025-09-05"},
  {id:"9",fullName:"Maria Santos",country:"Philippines",status:"active",sectors:["Shelter"],skills:[{name:"Shelter"},{name:"NFI"}],applicationDate:"2026-03-17"},
  {id:"10",fullName:"Ahmed Mahmoud",country:"Sudan",status:"interview_scheduled",sectors:["Protection"],skills:[{name:"Protection"},{name:"SGBV"}],applicationDate:"2026-07-02"},
  {id:"11",fullName:"Sophia Mensah",country:"Kenya",status:"active",sectors:["WASH","Health"],skills:[{name:"WASH"},{name:"Emergency Response"}],applicationDate:"2025-08-20"},
  {id:"12",fullName:"Daniel Kamau",country:"Ethiopia",status:"deployed",sectors:["Food Security"],skills:[{name:"Food Security"},{name:"Nutrition"}],applicationDate:"2025-07-11"},
];

const DEMO_OPPORTUNITIES = [
  {id:"o1",status:"open",applicants:[{},{},{}]},
  {id:"o2",status:"open",applicants:[{},{}]},
  {id:"o3",status:"open",applicants:[{}]},
];

const DEMO_DEPLOYMENTS = [
  {id:"d1",status:"active"},{id:"d2",status:"active"},{id:"d3",status:"active"},
  {id:"d4",status:"completed"},{id:"d5",status:"active"},
];

// ─── Main component ────────────────────────────────────────────────────────────
export default function RosterPortalDashboard({ onClose }) {

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const members      = DEMO_MEMBERS;
  const opportunities= DEMO_OPPORTUNITIES;
  const deployments  = DEMO_DEPLOYMENTS;

  // ── Compute dashStats exactly as wdc-portal does ──────────────────────────
  const countries     = new Set(members.map((m) => m.country).filter(Boolean));
  const totalApplicants = opportunities.reduce((s, o) => s + (o.applicants?.length ?? 0), 0);
  const activeDeployments = deployments.filter((d) => d.status === "active").length;

  const monthMap = {};
  members.forEach((m) => {
    if (!m.applicationDate) return;
    const d   = new Date(m.applicationDate);
    if (isNaN(d.getTime())) return;
    const key = d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    monthMap[key] = (monthMap[key] ?? 0) + 1;
  });
  const applicationsByMonth = Object.entries(monthMap)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
    .slice(-12);

  const statusMap = {};
  members.forEach((m) => { const s = m.status ?? "unknown"; statusMap[s] = (statusMap[s] ?? 0) + 1; });
  const statusDist = Object.entries(statusMap)
    .map(([name, value]) => ({ name: name.replace(/_/g, " "), value, raw: name }))
    .sort((a, b) => b.value - a.value);

  const skillMap = {};
  members.forEach((m) => (m.skills ?? []).forEach((s) => { skillMap[s.name] = (skillMap[s.name] ?? 0) + 1; }));
  const topSkills = Object.entries(skillMap).map(([skill, count]) => ({ skill, count })).sort((a, b) => b.count - a.count).slice(0, 10);

  const sectorMap = {};
  members.forEach((m) => (m.sectors ?? []).forEach((s) => { sectorMap[s] = (sectorMap[s] ?? 0) + 1; }));
  const topSectors = Object.entries(sectorMap).map(([sector, count]) => ({ sector, count })).sort((a, b) => b.count - a.count).slice(0, 8);

  const countryMap = {};
  members.forEach((m) => { if (m.country) countryMap[m.country] = (countryMap[m.country] ?? 0) + 1; });
  const topCountries = Object.entries(countryMap).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count).slice(0, 8);

  const clusterMap = {};
  members.forEach((m) => {
    if (!m.country) return;
    const coords = COUNTRY_COORDS[m.country];
    if (!coords) return;
    if (!clusterMap[m.country]) clusterMap[m.country] = { country: m.country, coords, memberCount: 0, heroCount: 0 };
    clusterMap[m.country].memberCount++;
  });
  const mapClusters = Object.values(clusterMap);

  const [timelinePeriod, setTimelinePeriod] = useState("12m");
  const [dashSearch, setDashSearch] = useState("");

  const timelineData = applicationsByMonth;

  const TABS = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "members",   label: "Members",   icon: Users },
    { key: "opportunities", label: "Opportunities", icon: Briefcase },
    { key: "deployments",   label: "Deployments",   icon: Target },
  ];
  const [tab, setTab] = useState("dashboard");

  const cardStyle = { background: T.surface, border: `1px solid ${T.separator}` };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", flexDirection: "column", background: "#07111c" }}>

      {/* ── Top bar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: `1px solid ${T.separator}`, background: "rgba(0,0,0,0.35)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Shield size={15} style={{ color: "#22c55e" }} />
          <span style={{ color: T.fg, fontWeight: 900, fontSize: 13 }}>Global Disaster Roster Portal</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, background: "#22c55e22", border: "1px solid #22c55e55", color: "#22c55e", borderRadius: 20, padding: "2px 10px", fontWeight: 700 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> Live Network
          </span>
        </div>
        <button onClick={onClose} style={{ background: T.surface, border: `1px solid ${T.separator}`, borderRadius: 8, padding: "6px 10px", color: T.fgSec, cursor: "pointer" }}>
          <X size={15} />
        </button>
      </div>

      {/* ── Tabs — exact copy of wdc-portal tab bar ── */}
      <div style={{ display: "flex", borderBottom: `1px solid ${T.separator}`, background: "rgba(0,0,0,0.2)", flexShrink: 0, overflowX: "auto" }}>
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)} style={{
            display: "flex", alignItems: "center", gap: 7, padding: "11px 18px", fontSize: 12, fontWeight: 700,
            cursor: "pointer", background: "transparent", border: "none",
            borderBottom: tab === key ? "2px solid #009EDB" : "2px solid transparent",
            color: tab === key ? "#009EDB" : T.fgTer, transition: "all 0.2s", whiteSpace: "nowrap",
          }}>
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {/* ── Dashboard tab — exact copy of wdc-portal dashboard tab ── */}
      {tab === "dashboard" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.fgTer, pointerEvents: "none" }} />
            <input type="text" value={dashSearch} onChange={(e) => setDashSearch(e.target.value)}
              placeholder="Search members by name, country, skill, sector…"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: T.surface, border: `1px solid ${T.separator}`, color: T.fg }} />
            {dashSearch && <button onClick={() => setDashSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: T.fgTer }}><X size={14} /></button>}
          </div>

          {/* Search results overlay */}
          {dashSearch.trim() && (() => {
            const q = dashSearch.toLowerCase();
            const results = members.filter((m) =>
              m.fullName?.toLowerCase().includes(q) ||
              m.country?.toLowerCase().includes(q) ||
              (m.skills ?? []).some((s) => s.name.toLowerCase().includes(q)) ||
              (m.sectors ?? []).some((s) => s.toLowerCase().includes(q))
            ).slice(0, 12);
            return (
              <div className="rounded-2xl overflow-hidden" style={cardStyle}>
                <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.separator}` }}>
                  <span className="text-sm font-semibold" style={{ color: T.fg }}>{results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{dashSearch}&rdquo;</span>
                </div>
                {results.length === 0 && <p className="text-xs py-6 text-center" style={{ color: T.fgTer }}>No members found</p>}
                {results.map((m) => (
                  <div key={m.id} className="w-full flex items-center gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${T.separator}` }}>
                    <Avatar name={m.fullName ?? "?"} size={38} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm" style={{ color: T.fg }}>{m.fullName}</div>
                      <div className="text-xs truncate" style={{ color: T.fgSec }}>{m.country} · {(m.sectors ?? []).slice(0, 2).join(", ")}</div>
                    </div>
                    <StatusBadge status={m.status ?? "applied"} colorMap={MEMBER_STATUS_COLOR} />
                  </div>
                ))}
              </div>
            );
          })()}

          {/* KPI Row — exact copy */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Users,       label: "Total Members",  value: members.length,                                        color: "#009EDB", sub: `${members.filter(m => m.status === "active").length} active` },
              { icon: Globe,       label: "Countries",      value: countries.size,                                        color: "#7c3aed", sub: "represented" },
              { icon: CheckCircle2,label: "Active",         value: members.filter(m => m.status === "active").length,     color: "#22c55e", sub: "on roster" },
              { icon: Target,      label: "Deployed",       value: activeDeployments,                                     color: "#059669", sub: "in field" },
              { icon: Briefcase,   label: "Open Ops",       value: opportunities.filter(o => o.status === "open").length, color: "#F59E0B", sub: "opportunities" },
              { icon: TrendingUp,  label: "Applicants",     value: totalApplicants,                                       color: "#ea580c", sub: "across all ops" },
            ].map(({ icon: Icon, label, value, color, sub }) => (
              <div key={label} className="rounded-2xl p-4" style={cardStyle}>
                <div className="flex items-center gap-2 mb-2">
                  <div style={{ background: color + "18", borderRadius: 8, padding: 7 }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span className="text-[11px] font-semibold" style={{ color: T.fgSec }}>{label}</span>
                </div>
                <div className="text-3xl font-black" style={{ color }}>{value}</div>
                <div className="text-[11px] mt-0.5" style={{ color: T.fgTer }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* World Map + Top Countries — exact copy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={cardStyle}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.separator}` }}>
                <div>
                  <h2 className="font-bold text-sm" style={{ color: T.fg }}>Global Roster Distribution</h2>
                  <p className="text-xs mt-0.5" style={{ color: T.fgTer }}>
                    <span style={{ color: "#009EDB" }}>●</span> Members &nbsp;
                    <span style={{ color: "#F59E0B" }}>●</span> Disaster Heroes · bubble size = number of people
                  </p>
                </div>
                <div className="text-xs px-2 py-1 rounded-lg font-semibold" style={{ background: "#009EDB18", color: "#009EDB" }}>{countries.size} countries</div>
              </div>
              <RosterMap clusters={mapClusters} />
            </div>

            <div className="rounded-2xl overflow-hidden" style={cardStyle}>
              <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.separator}` }}>
                <h2 className="font-bold text-sm" style={{ color: T.fg }}>Top Countries</h2>
              </div>
              <div className="px-5 py-3 space-y-3">
                {topCountries.length === 0 && <p className="text-xs py-4 text-center" style={{ color: T.fgTer }}>No country data yet</p>}
                {topCountries.map(({ country, count }, i) => (
                  <div key={country} className="flex items-center gap-3">
                    <span className="text-xs font-bold w-5 text-right" style={{ color: T.fgTer }}>{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold" style={{ color: T.fg }}>{country}</span>
                        <span style={{ color: T.fgSec }}>{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: T.surfaceSec }}>
                        <div className="h-full rounded-full" style={{ width: `${(count / (topCountries[0]?.count || 1)) * 100}%`, background: "linear-gradient(90deg,#009EDB,#7c3aed)" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Timeline + Status Donut — exact copy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={cardStyle}>
              <div className="px-5 py-4 flex items-center justify-between gap-4" style={{ borderBottom: `1px solid ${T.separator}` }}>
                <div>
                  <h2 className="font-bold text-sm" style={{ color: T.fg }}>Application Timeline</h2>
                  <p className="text-xs mt-0.5" style={{ color: T.fgTer }}>
                    {timelineData.reduce((s, d) => s + d.count, 0)} applications · {timelineData.length} periods
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {["7d","30d","90d","12m","all"].map((p) => (
                    <button key={p} onClick={() => setTimelinePeriod(p)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all"
                      style={{ background: timelinePeriod === p ? "#009EDB" : T.surfaceSec, color: timelinePeriod === p ? "#fff" : T.fgSec, border: timelinePeriod === p ? "none" : `1px solid ${T.separator}` }}>
                      {p === "7d" ? "7D" : p === "30d" ? "30D" : p === "90d" ? "90D" : p === "12m" ? "12M" : "All"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4">
                {timelineData.length === 0
                  ? <p className="text-xs py-8 text-center" style={{ color: T.fgTer }}>No applications in this period</p>
                  : <TimelineChart data={timelineData} />
                }
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden" style={cardStyle}>
              <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.separator}` }}>
                <h2 className="font-bold text-sm" style={{ color: T.fg }}>Pipeline Status</h2>
                <p className="text-xs mt-0.5" style={{ color: T.fgTer }}>Member distribution by stage</p>
              </div>
              <div className="p-4 flex flex-col items-center">
                {members.length === 0
                  ? <p className="text-xs py-8 text-center" style={{ color: T.fgTer }}>No members yet</p>
                  : <StatusDonut data={statusDist} colorMap={MEMBER_STATUS_COLOR} />
                }
              </div>
            </div>
          </div>

          {/* Skills + Sectors — exact copy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden" style={cardStyle}>
              <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.separator}` }}>
                <h2 className="font-bold text-sm" style={{ color: T.fg }}>Top Skills</h2>
                <p className="text-xs mt-0.5" style={{ color: T.fgTer }}>Most common skills across all members</p>
              </div>
              <div className="p-4">
                {topSkills.length === 0
                  ? <p className="text-xs py-8 text-center" style={{ color: T.fgTer }}>No skills data yet</p>
                  : <HorizontalBars data={topSkills.map(s => ({ label: s.skill, value: s.count }))} color="#009EDB" />
                }
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={cardStyle}>
              <div className="px-5 py-4" style={{ borderBottom: `1px solid ${T.separator}` }}>
                <h2 className="font-bold text-sm" style={{ color: T.fg }}>Sector Coverage</h2>
                <p className="text-xs mt-0.5" style={{ color: T.fgTer }}>Members by humanitarian sector</p>
              </div>
              <div className="p-4">
                {topSectors.length === 0
                  ? <p className="text-xs py-8 text-center" style={{ color: T.fgTer }}>No sector data yet</p>
                  : <HorizontalBars data={topSectors.map(s => ({ label: s.sector, value: s.count }))} color="#22c55e" />
                }
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Other tabs */}
      {tab !== "dashboard" && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
          <Shield size={40} style={{ color: T.fgTer }} />
          <p style={{ color: T.fgSec, fontSize: 14, fontWeight: 600 }}>
            Full {tab} management available in the{" "}
            <a href="https://wdc-portal-382117221028.us-central1.run.app" target="_blank" rel="noreferrer" style={{ color: "#009EDB" }}>WDC Portal</a>
          </p>
        </div>
      )}
    </div>
  );
}
