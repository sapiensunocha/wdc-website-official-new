import { useEffect, useRef, useState } from "react";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";

const CampaignWorldMap = ({ countries = {}, scale, accentColor = "#009EDB" }) => {
  const mapRef       = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(460);

  // Responsive height — taller on wide screens for the full-width panel
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      setHeight(Math.round(Math.min(Math.max(w * 0.48, 320), 560)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Initialize / re-initialize jsvectormap
  // This effect runs on every mount (the parent drives remounts via key prop when data changes)
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    el.innerHTML = "";

    const hasData = Object.keys(countries).length > 0;
    const colorScale = scale || [accentColor + "22", accentColor + "55", accentColor + "88", accentColor + "bb", accentColor];

    try {
      const cfg = {
        selector: el,
        map: "world",
        backgroundColor: "transparent",
        zoomOnScroll: false,
        zoomButtons: false,
        regionStyle: {
          initial:       { fill: accentColor + "18", stroke: "#0a111f", strokeWidth: 0.4 },
          hover:         { fill: accentColor, cursor: "pointer", fillOpacity: 0.9 },
          selected:      { fill: accentColor },
          selectedHover: { fill: accentColor },
        },
        onRegionTooltipShow(_e, tooltip, code) {
          try {
            const name = tooltip.text();
            tooltip.css({ background: "#1e293b", color: "#f8fafc", borderColor: accentColor });
            if (hasData && countries[code] != null) {
              const v = countries[code];
              const score = Math.min(10, Math.max(1, Number(v))).toFixed(1);
              const bar = "█".repeat(Math.round(score)).padEnd(10, "░");
              tooltip.text(
                `<strong>${name}</strong><br/>` +
                `<span style="color:${accentColor};font-size:13px;font-weight:900">${score}</span>` +
                `<span style="color:#64748b;font-size:10px"> / 10</span><br/>` +
                `<span style="color:${accentColor};font-size:9px;letter-spacing:1px">${bar}</span>`,
                true,
              );
            } else {
              tooltip.text(`<strong>${name}</strong><br/><span style="color:#64748b;font-size:10px">No data</span>`, true);
            }
          } catch (_) {}
        },
      };

      if (hasData) {
        cfg.series = {
          regions: [{
            values: countries,
            scale: colorScale,
            normalizeFunction: "linear",
          }],
        };
      }

      new jsVectorMap(cfg);
    } catch (_) {}

    return () => { if (el) el.innerHTML = ""; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // No deps — parent drives remounts via `key` prop when data or accentColor changes

  return (
    <div className="flex flex-col gap-3">
      <div ref={containerRef} className="w-full">
        <div ref={mapRef} style={{ width: "100%", height }} />
      </div>
      {Object.keys(countries).length > 0 && (
        <div className="flex items-center gap-3 px-1">
          <span className="text-[9px] font-bold text-gray-500">1</span>
          <div className="flex-1 h-1.5 rounded-full"
            style={{ background: `linear-gradient(to right, #1e3350, ${accentColor})` }} />
          <span className="text-[9px] font-bold text-gray-500">10</span>
          <span className="text-[9px] text-gray-600">Risk Index</span>
        </div>
      )}
    </div>
  );
};

export default CampaignWorldMap;
