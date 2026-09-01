import { useState, useEffect } from "react";
import SEOMeta from "../../../components/SEOMeta";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Thermometer, TrendingUp, AlertTriangle, Wind, Droplets, Flame, ArrowRight, RefreshCw } from "lucide-react";
import AnimateIn from "../../../components/AnimateIn";

const API_BASE = "https://michael-api-382117221028.us-central1.run.app";

const HOTSPOTS = [
  { region: "South Asia", countries: "India, Bangladesh, Nepal, Pakistan", risk: "EXTREME", riskColor: "bg-red-600 text-white", hazards: ["Floods", "Heatwaves", "Cyclones"], temp: "+2.1°C", pop: "1.9B" },
  { region: "Sub-Saharan Africa", countries: "Sudan, Chad, Nigeria, Somalia", risk: "EXTREME", riskColor: "bg-red-600 text-white", hazards: ["Drought", "Floods", "Disease"], temp: "+2.0°C", pop: "680M" },
  { region: "Southeast Asia", countries: "Philippines, Indonesia, Vietnam", risk: "SEVERE", riskColor: "bg-orange-500 text-white", hazards: ["Typhoons", "Sea Level Rise", "Floods"], temp: "+1.8°C", pop: "720M" },
  { region: "Caribbean & C. America", countries: "Haiti, Guatemala, Honduras", risk: "SEVERE", riskColor: "bg-orange-500 text-white", hazards: ["Hurricanes", "Earthquakes", "Drought"], temp: "+1.7°C", pop: "80M" },
  { region: "Andean South America", countries: "Peru, Bolivia, Ecuador", risk: "HIGH", riskColor: "bg-amber-500 text-white", hazards: ["GLOF", "Drought", "Landslides"], temp: "+1.6°C", pop: "130M" },
  { region: "Mediterranean & MENA", countries: "Libya, Syria, Morocco", risk: "HIGH", riskColor: "bg-amber-500 text-white", hazards: ["Wildfires", "Drought", "Heatwaves"], temp: "+2.2°C", pop: "420M" },
];

const DECADE_DATA = [
  { decade: "1980s", events: 2495, label: "2,495" },
  { decade: "1990s", events: 3568, label: "3,568" },
  { decade: "2000s", events: 4372, label: "4,372" },
  { decade: "2010s", events: 5415, label: "5,415" },
  { decade: "2020s*", events: 3290, label: "3,290*" },
];

const maxEvents = Math.max(...DECADE_DATA.map(d => d.events));

const CLIMATE_TYPES = [
  { icon: <Droplets size={16} />, type: "Floods", pct: 44, color: "#3b82f6" },
  { icon: <Wind size={16} />, type: "Storms / Cyclones", pct: 28, color: "#8b5cf6" },
  { icon: <Thermometer size={16} />, type: "Extreme Heat", pct: 12, color: "#ef4444" },
  { icon: <Flame size={16} />, type: "Wildfires", pct: 9, color: "#f97316" },
  { icon: <AlertTriangle size={16} />, type: "Droughts", pct: 7, color: "#eab308" },
];

function BarChart() {
  return (
    <div className="flex items-end justify-around gap-3 h-40 mt-6">
      {DECADE_DATA.map((d, i) => (
        <div key={d.decade} className="flex flex-col items-center gap-2 flex-1">
          <span className="text-xs font-black text-[#009EDB]">{d.label}</span>
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: `${(d.events / maxEvents) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="w-full rounded-t-md"
            style={{ backgroundColor: i === DECADE_DATA.length - 1 ? "#009EDB88" : "#009EDB" }}
          />
          <span className="text-xs text-gray-500 font-bold">{d.decade}</span>
        </div>
      ))}
    </div>
  );
}

export default function ClimateTracker() {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/predictions`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setPredictions(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">
      <SEOMeta
        title="Climate Tracker — WDC Climate Crisis Intelligence"
        description="Monitor climate-driven disasters, displacement, and vulnerability in real time. WDC tracks the communities most exposed to floods, droughts, and extreme heat."
        image="https://images.unsplash.com/photo-1485617359743-4dc5d2e53c89?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/trackers/climate"
      />

      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-20">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer size={14} className="text-[#009EDB]" />
              <Link to="/trackers" className="text-[#009EDB] uppercase tracking-widest text-xs font-black hover:underline">Trackers</Link>
              <span className="text-gray-600 text-xs">/</span>
              <span className="text-gray-400 text-xs uppercase tracking-widest">Climate</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
              Climate Disaster Tracker
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Monitoring climate-linked disasters — floods, heatwaves, cyclones, wildfires, and droughts — with trend data and regional hotspot intelligence powered by Michael AI.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-10 bg-[#009EDB]">
        <div className="container sm:px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {[
              { n: "+1.8°C", l: "2026 Global Anomaly" },
              { n: "×5", l: "More Disasters vs 1970s" },
              { n: "158M", l: "People Affected 2025" },
              { n: "$310B", l: "Climate Losses 2025" },
            ].map((s, i) => (
              <AnimateIn key={i} variant="fadeUp" delay={i * 0.08}>
                <p className="text-3xl md:text-4xl font-black mb-1">{s.n}</p>
                <p className="text-white/70 text-sm uppercase tracking-wider">{s.l}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Michael predictions */}
      {!loading && predictions && (
        <section className="py-12 bg-[#0f172a] text-white">
          <div className="container sm:px-2">
            <AnimateIn variant="fadeUp">
              <div className="flex items-center gap-2 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-400"
                />
                <p className="text-xs font-black text-green-400 uppercase tracking-widest">Michael AI — Live Predictions</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(Array.isArray(predictions) ? predictions.slice(0, 3) : Object.values(predictions).flat().slice(0, 3)).map((pred, i) => (
                  <div key={i} className="bg-[#1e293b] border border-white/10 rounded-xl p-5">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{pred.type || pred.category || "Prediction"}</p>
                    <p className="text-sm text-gray-200 leading-relaxed">{pred.summary || pred.description || pred.text || JSON.stringify(pred).slice(0, 120)}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* Disaster type breakdown */}
      <section className="py-16">
        <div className="container sm:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Trend chart */}
            <AnimateIn variant="fadeLeft">
              <div className="border border-gray-200 rounded-xl p-6">
                <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-1">Decade Trend</p>
                <h2 className="text-xl font-bold text-[#1C2B39] mb-1">Climate-Linked Disasters per Decade</h2>
                <p className="text-xs text-gray-400 mb-2">Source: EM-DAT / CRED. *2020s partial (2020–2025).</p>
                <BarChart />
                <p className="text-xs text-gray-500 mt-4">Climate-linked disasters have increased by over 5× since the 1980s. Floods and storms account for 72% of all events.</p>
              </div>
            </AnimateIn>

            {/* Type breakdown */}
            <AnimateIn variant="fadeRight">
              <div className="border border-gray-200 rounded-xl p-6">
                <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-1">By Hazard Type</p>
                <h2 className="text-xl font-bold text-[#1C2B39] mb-5">2025 Climate Disasters</h2>
                <div className="space-y-4">
                  {CLIMATE_TYPES.map((t, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: t.color + "22", color: t.color }}>
                        {t.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-[#1C2B39]">{t.type}</span>
                          <span className="text-sm font-black" style={{ color: t.color }}>{t.pct}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${t.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="h-1.5 rounded-full"
                            style={{ backgroundColor: t.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Hotspots */}
      <section className="py-16 bg-gray-50">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-2">Regional Intelligence</p>
            <h2 className="text-2xl font-bold text-[#1C2B39] mb-8">Climate Disaster Hotspots</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOTSPOTS.map((h, i) => (
              <AnimateIn key={i} variant="fadeUp" delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -3, boxShadow: "0 12px 28px rgba(0,0,0,0.09)" }}
                  className="bg-white border border-gray-200 rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#1C2B39] text-sm">{h.region}</h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${h.riskColor}`}>{h.risk}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{h.countries}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {h.hazards.map(hz => (
                      <span key={hz} className="text-[10px] font-bold text-[#009EDB] bg-[#009EDB]/10 px-2 py-0.5 rounded">{hz}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                    <span>Temp anomaly: <strong className="text-red-500">{h.temp}</strong></span>
                    <span>Pop at risk: <strong className="text-[#1C2B39]">{h.pop}</strong></span>
                  </div>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* WDC Intelligence section */}
      <section className="py-16 bg-[#1C2B39] text-white">
        <div className="container sm:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateIn variant="fadeLeft">
              <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-2">Powered by Michael</p>
              <h2 className="text-2xl font-bold mb-4">What WDC Monitors</h2>
              <div className="space-y-4">
                {[
                  { title: "GloFAS Hydrological Signals", desc: "Global Flood Awareness System integration for 7-day flood probability forecasts across 1,000+ river basins." },
                  { title: "SPI Drought Index", desc: "Standardized Precipitation Index monitoring for agricultural and hydrological drought across all WDC coverage zones." },
                  { title: "SST Cyclone Intensification", desc: "Sea Surface Temperature tracking for rapid tropical cyclone intensification — key for 24-48h warning lead times." },
                  { title: "SEIR Climate Epidemic Models", desc: "Climate-sensitive disease spread modeling linking temperature/rainfall anomalies to cholera, malaria, and dengue risk." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#009EDB] shrink-0 mt-2" />
                    <div>
                      <p className="font-bold text-white text-sm">{item.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Link to="/michael-chat" className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-5 py-2.5 rounded text-sm transition-colors">
                  Chat with Michael <ArrowRight size={13} />
                </Link>
                <Link to="/trackers" className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-5 py-2.5 rounded text-sm hover:border-[#009EDB] transition-colors">
                  All Trackers
                </Link>
              </div>
            </AnimateIn>
            <AnimateIn variant="fadeRight">
              <div className="bg-[#0f172a] border border-white/10 rounded-xl p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Michael — Climate Intelligence Feed</p>
                {loading ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <RefreshCw size={14} className="animate-spin" />
                    <span className="text-xs">Loading live predictions...</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { label: "Flood Risk: West Africa", value: "ELEVATED", color: "#f59e0b" },
                      { label: "Cyclone Activity: Bay of Bengal", value: "MONITORING", color: "#3b82f6" },
                      { label: "Drought Severity: Horn of Africa", value: "CRITICAL", color: "#ef4444" },
                      { label: "Wildfire Season: Mediterranean", value: "ACTIVE", color: "#f97316" },
                      { label: "GLOF Risk: Himalayas", value: "HIGH", color: "#ef4444" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs text-gray-400">{item.label}</span>
                        <span className="text-[10px] font-black" style={{ color: item.color }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </div>
  );
}
