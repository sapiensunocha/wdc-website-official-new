import { useEffect, useRef, useState } from "react";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import { mapCountryCodes } from "../assets/data/impact";

// jsvectormap scale array — exact discrete mapping:
// scale.length - 1 === max - min  →  5 === 5  →  each integer hits one color exactly
const SCALE = ["#22c55e", "#f59e0b", "#009EDB", "#f97316", "#1C2B39", "#9ca3af"];

const VectorMapComponent = ({ onCountrySelect, selectedCode }) => {
  const mapRef      = useRef(null);
  const containerRef = useRef(null);
  const callbackRef = useRef(onCountrySelect);
  const [initKey, setInitKey] = useState(0);
  const [mapHeight, setMapHeight] = useState(400);

  // Keep callback ref fresh without triggering re-init
  useEffect(() => { callbackRef.current = onCountrySelect; }, [onCountrySelect]);

  // Re-init when selected country changes (to update highlighted region)
  useEffect(() => { setInitKey((k) => k + 1); }, [selectedCode]);

  // Responsive height
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = Math.min(Math.max(w * 0.55, 260), window.innerHeight * 0.62);
      setMapHeight(Math.round(h));
      setInitKey((k) => k + 1);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Map init / destroy
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    el.innerHTML = "";

    new jsVectorMap({
      selector: el,
      map: "world",
      backgroundColor: "transparent",
      zoomOnScroll: false,
      zoomButtons: false,
      regionStyle: {
        initial:      { fill: "#d1d5db", stroke: "#ffffff", strokeWidth: 0.4 },
        hover:        { fill: "#60a5fa", cursor: "pointer" },
        selected:     { fill: "#1d4ed8", stroke: "#1e3a8a", strokeWidth: 1.5 },
        selectedHover:{ fill: "#1e40af" },
      },
      series: {
        regions: [{
          values: mapCountryCodes,
          scale: SCALE,
          normalizeFunction: "linear",
        }],
      },
      selectedRegions: selectedCode ? [selectedCode] : [],
      onRegionClick: (_event, code) => {
        if (callbackRef.current) callbackRef.current(code);
      },
    });

    return () => { if (el) el.innerHTML = ""; };
  }, [initKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className="w-full">
      <div ref={mapRef} style={{ width: "100%", height: `${mapHeight}px` }} />
    </div>
  );
};

export default VectorMapComponent;
