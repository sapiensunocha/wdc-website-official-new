import { useEffect, useRef, useState } from "react";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";

// Risk bands — 5 tiers mapped to integer scores 1-10
const RISK_BANDS = [
  { label: "Very Low", range: "1–2", color: "#22c55e", lo: 1, hi: 2 },
  { label: "Low",      range: "3–4", color: "#84cc16", lo: 3, hi: 4 },
  { label: "Medium",   range: "5–6", color: "#facc15", lo: 5, hi: 6 },
  { label: "High",     range: "7–8", color: "#f97316", lo: 7, hi: 8 },
  { label: "Critical", range: "9–10",color: "#dc2626", lo: 9, hi: 10 },
];

function colorForScore(score) {
  const s = Math.min(10, Math.max(1, Math.round(Number(score))));
  if (s >= 9) return "#dc2626";
  if (s >= 7) return "#f97316";
  if (s >= 5) return "#facc15";
  if (s >= 3) return "#84cc16";
  return "#22c55e";
}

function bandFor(score) {
  const s = Math.min(10, Math.max(1, Number(score)));
  return RISK_BANDS.find(b => s >= b.lo && s <= b.hi) || RISK_BANDS[4];
}

// jsvectormap uses OrdinalScale: scale[value] → color.
// We pass an object keyed 1–10 so scale[7] = "#f97316".
const ORDINAL_SCALE = {
  1: "#22c55e", 2: "#22c55e",
  3: "#84cc16", 4: "#84cc16",
  5: "#facc15", 6: "#facc15",
  7: "#f97316", 8: "#f97316",
  9: "#dc2626", 10: "#dc2626",
};

// Inline shield SVG for tooltip (monochrome, works in HTML strings)
const SHIELD_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:5px"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;

const CampaignWorldMap = ({ countries = {}, accentColor = "#009EDB", campaignLabel = "Global Risk Index" }) => {
  const mapRef       = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(460);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      setHeight(Math.round(Math.min(Math.max(w * 0.50, 340), 580)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    el.innerHTML = "";

    const hasData = Object.keys(countries).length > 0;

    // jsvectormap OrdinalScale: values must be integers 1–10 matching ORDINAL_SCALE keys.
    // Round every score so scale lookup always hits a key.
    const roundedValues = {};
    for (const [iso, score] of Object.entries(countries)) {
      roundedValues[iso] = Math.min(10, Math.max(1, Math.round(Number(score))));
    }

    try {
      const cfg = {
        selector: el,
        map: "world",
        backgroundColor: "transparent",
        zoomOnScroll: false,
        zoomButtons: false,
        regionStyle: {
          initial:       { fill: "#1e3a5f", stroke: "#0a1828", strokeWidth: 0.4, fillOpacity: 1 },
          hover:         { fillOpacity: 0.70, cursor: "pointer" },
          selected:      { fillOpacity: 0.9 },
          selectedHover: { fillOpacity: 0.70 },
        },
        onRegionTooltipShow(_e, tooltip, code) {
          try {
            const name = tooltip.text();
            const rawScore = countries[code];
            if (hasData && rawScore != null) {
              const score  = Math.min(10, Math.max(1, Number(rawScore)));
              const band   = bandFor(score);
              const filled = Math.round(score);
              const bar = Array.from({ length: 10 }, (_, i) =>
                `<span style="color:${i < filled ? band.color : "#1e3a5f"}">█</span>`
              ).join("");
              tooltip.css({
                background: "#08111e",
                color: "#f1f5f9",
                borderColor: band.color,
                borderWidth: "2px",
                padding: "10px 14px",
                borderRadius: "8px",
                boxShadow: `0 8px 28px rgba(0,0,0,0.7), 0 0 0 1px ${band.color}25`,
                minWidth: "190px",
                fontSize: "12px",
              });
              tooltip.text(
                `<div style="font-weight:900;font-size:13px;margin-bottom:4px">${SHIELD_SVG}${name}</div>` +
                `<div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;padding-left:18px">${campaignLabel}</div>` +
                `<div style="display:flex;align-items:baseline;gap:5px;margin-bottom:6px">` +
                  `<span style="color:${band.color};font-size:30px;font-weight:900;line-height:1">${score.toFixed(1)}</span>` +
                  `<span style="color:#475569;font-size:11px">/10</span>` +
                  `<span style="margin-left:5px;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:1px;` +
                    `background:${band.color}22;color:${band.color};padding:2px 7px;border-radius:4px">${band.label} Risk</span>` +
                `</div>` +
                `<div style="font-family:monospace;letter-spacing:2px;font-size:11px">${bar}</div>`,
                true,
              );
            } else {
              tooltip.css({
                background: "#08111e", color: "#475569",
                borderColor: "#1e293b", borderWidth: "1px",
                padding: "8px 12px", borderRadius: "8px",
              });
              tooltip.text(
                `<div style="font-weight:700;color:#94a3b8">${SHIELD_SVG}${name}</div>` +
                `<div style="font-size:10px;margin-top:3px;color:#334155;padding-left:18px">No index data</div>`,
                true,
              );
            }
          } catch (_) {}
        },
      };

      if (hasData) {
        cfg.series = {
          regions: [{
            attribute: "fill",
            values: roundedValues,   // { ISO2: integer 1–10 }
            scale: ORDINAL_SCALE,    // OrdinalScale: scale[7] → "#f97316"
          }],
        };
      }

      new jsVectorMap(cfg);
    } catch (_) {}

    return () => { if (el) el.innerHTML = ""; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const counts = RISK_BANDS.map(b => ({
    ...b,
    count: Object.values(countries).filter(v => v >= b.lo && v <= b.hi).length,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="w-full rounded-xl overflow-hidden"
        style={{ background: "linear-gradient(145deg, #07111f 0%, #0c1a2e 50%, #07111f 100%)" }}
      >
        <div ref={mapRef} style={{ width: "100%", height }} />
      </div>

      {Object.keys(countries).length > 0 && (
        <>
          <div className="flex gap-1.5 sm:gap-2">
            {counts.map(b => (
              <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                <span className="text-[8px] sm:text-[9px] font-bold text-center leading-tight" style={{ color: b.color }}>
                  {b.label}
                </span>
                <span className="text-[7px] sm:text-[8px] text-gray-600 font-mono">{b.range}</span>
                <span className="text-[7px] sm:text-[8px] text-gray-500">{b.count}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-gray-600 px-0.5">
            <span>← Safer</span>
            <span className="text-gray-500">{Object.keys(countries).length} countries indexed</span>
            <span>More at risk →</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignWorldMap;
