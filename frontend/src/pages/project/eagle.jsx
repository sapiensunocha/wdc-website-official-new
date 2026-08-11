import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Database, Map, AlertTriangle, Cpu, Globe } from "lucide-react";
import EagleImage from "../../assets/eagle.png";

const features = [
  {
    icon: Camera,
    title: "Automated Visual Assessment",
    desc: "EAGLE uses computer vision on satellite and drone imagery to automatically detect structural damage, road blockages, and flooded areas — within minutes of a disaster event.",
  },
  {
    icon: Database,
    title: "Multi-Source Data Fusion",
    desc: "Ingests data from NASA/ESA satellites, UAV feeds, ground sensors, and community reports. Every source is cross-validated to produce a single authoritative damage picture.",
  },
  {
    icon: Map,
    title: "Real-Time Damage Maps",
    desc: "Outputs geo-referenced damage maps showing affected areas, severity levels, and infrastructure status — delivered directly to field coordinators and UN clusters.",
  },
  {
    icon: AlertTriangle,
    title: "Infrastructure Impact Analysis",
    desc: "Automatically classifies road accessibility, bridge integrity, hospital functionality, and shelter availability — the critical logistics data first responders need immediately.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Classification",
    desc: "Trained on 40+ years of WDC historical disaster records, EAGLE's models classify damage severity across residential, commercial, agricultural, and infrastructure sectors.",
  },
  {
    icon: Globe,
    title: "Michael Integration",
    desc: "EAGLE feeds its assessment outputs back into Michael in real time, enabling the platform to continuously update risk models and improve accuracy for future disaster predictions.",
  },
];

const useCases = [
  {
    event: "DRC Flood Assessment (2023)",
    outcome:
      "EAGLE produced a damage assessment for a major flood event in eastern DRC within 4 hours of the event — reducing the traditional 48-72 hour assessment timeline by 90%.",
  },
  {
    event: "Burundi Landslide Mapping",
    outcome:
      "Satellite imagery processed by EAGLE identified 127 affected structures and 3 blocked road corridors, enabling emergency teams to prioritize access routes.",
  },
  {
    event: "Haiti Earthquake Pre-positioning",
    outcome:
      "EAGLE's predictive vulnerability maps helped humanitarian teams pre-position supplies in highest-risk areas before a seasonal storm — a first for proactive disaster logistics in the region.",
  },
];

function EagleProject() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-24">
        <div className="container sm:px-2">
          <p className="text-[#009EDB] mb-3 uppercase tracking-widest text-xs font-black">
            WDC Projects
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
            EAGLE
          </h1>
          <p className="text-[#009EDB] text-lg font-bold mb-4">
            Automated Disaster Assessment Tool
          </p>
          <p className="text-gray-300 text-base max-w-2xl leading-relaxed">
            EAGLE revolutionizes how the humanitarian community assesses disasters.
            Where traditional post-disaster assessments take 48–72 hours, EAGLE
            delivers geo-referenced damage maps and impact analysis within hours
            — giving first responders the intelligence they need when every minute counts.
          </p>
        </div>
      </section>

      {/* Hero image */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={EagleImage}
          alt="EAGLE — Automated Disaster Assessment Tool"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 container sm:px-2">
          <span className="inline-block bg-[#009EDB] text-white text-xs font-black px-3 py-1.5 rounded uppercase tracking-widest">
            Launched 2023 — Active in Field Operations
          </span>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-20">
        <div className="container sm:px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-red-50 border border-red-100 rounded p-8">
              <h3 className="text-lg font-bold text-red-700 mb-3">The Problem</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                After a major disaster, humanitarian coordinators desperately need to know: What's damaged? Where can trucks reach? Which hospitals are functional? Which neighborhoods need immediate evacuation?
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Traditional damage assessments require teams to physically visit affected areas — a process that takes 48–72 hours, during which critical decisions are made blind. Lives are lost in that gap.
              </p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded p-8">
              <h3 className="text-lg font-bold text-green-700 mb-3">The EAGLE Solution</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                EAGLE uses AI-powered analysis of satellite imagery, drone feeds, and community reports to produce a comprehensive damage assessment automatically — in hours, not days.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                The output: geo-referenced maps that show exactly where damage is, how severe, what infrastructure is affected, and which access routes are open. Delivered directly to field coordinators' devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container sm:px-2">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-content-primary">
              What EAGLE Does
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-content-primary text-base mb-2">{f.title}</h3>
                <p className="text-content-secondary text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="container sm:px-2">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">Field Results</p>
            <h2 className="text-3xl font-bold text-content-primary">EAGLE in Action</h2>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto">
            {useCases.map((u, i) => (
              <div key={i} className="border border-gray-200 border-l-4 border-l-primary rounded p-6">
                <h3 className="font-bold text-content-primary mb-2">{u.event}</h3>
                <p className="text-content-secondary text-sm leading-relaxed">{u.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Michael integration */}
      <section className="py-16 bg-[#1C2B39] text-white">
        <div className="container sm:px-2 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-3">Part of the Ecosystem</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">EAGLE + Michael</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              EAGLE doesn't operate in isolation. Every assessment it produces feeds back into Michael, WDC's global disaster intelligence platform. This creates a continuous learning loop: EAGLE assessments improve Michael's models, and Michael's predictions guide where EAGLE focuses its analysis next.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              to="/global-products"
              className="bg-[#009EDB] hover:bg-[#0080b5] text-white font-bold px-8 py-3.5 rounded-sm text-sm tracking-wide transition-colors text-center inline-flex items-center gap-2"
            >
              Explore Michael <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="border border-white/30 hover:border-white text-white font-bold px-8 py-3.5 rounded-sm text-sm tracking-wide transition-colors text-center"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EagleProject;
