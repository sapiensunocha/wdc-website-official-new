import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Zap, Shield } from "lucide-react";
import AnimateIn from "../../../components/AnimateIn";

const countries = [
  {
    name: "Afghanistan",
    flag: "🇦🇫",
    status: "Response",
    focus: "Earthquake emergency response, humanitarian access mapping, conflict-zone intelligence",
    detail:
      "WDC responded to the 6.0 magnitude earthquake in Kunar Province, Nurgal District (31 August 2025). WDC produced an access-level situation report mapping affected populations, identifying hazard exposure zones, and evaluating accessibility for aid delivery — supporting responders with up-to-date disaster intelligence in one of the world's most complex humanitarian environments.",
  },
  {
    name: "India (Mumbai Office)",
    flag: "🇮🇳",
    status: "Office",
    focus: "South Asia coordination, cyclone and flood monitoring, urban resilience",
    detail:
      "WDC Regional Office for South Asia based in Mumbai. Focus areas: cyclones, floods, and urban resilience in one of the world's most densely populated regions. Key partners include SAARC, local governments, and private sector stakeholders. The Mumbai office coordinates WDC programs across the entire Indian subcontinent, including the Bay of Bengal cyclone corridor and the Ganges-Brahmaputra flood basin.",
  },
  {
    name: "Thailand (Bangkok Office)",
    flag: "🇹🇭",
    status: "Office",
    focus: "Southeast Asia coordination, flood and tsunami monitoring",
    detail:
      "WDC Regional Office for Southeast Asia based in Bangkok. Focus areas: floods, tsunamis, and urban disaster resilience across the Mekong basin and coastal Southeast Asia. Key partners include ASEAN, UNESCAP, and local disaster risk reduction agencies. The Bangkok office is the coordination hub for WDC programs from Myanmar to Indonesia.",
  },
  {
    name: "Nepal",
    flag: "🇳🇵",
    status: "Response",
    focus: "Flash flood & glacial lake outburst (GLOF) response, glacial lake monitoring",
    detail:
      "Active flash flood and GLOF emergency response from 26 August 2026 — Bhote Koshi and Trishuli River systems. Nepal Army and police deployed 30,000+ personnel for search & rescue. WDC's Michael GLOF dashboard monitors 21 classified dangerous glacial lakes across Nepal's 3,624 total glacial lakes (52.5 km²), coordinating with IOM Nepal, OCHA, Nepal NDRRMA, and the Nepal Red Cross for real-time alerts and situation intelligence.",
  },
];

const stats = [
  { value: "2", label: "Emergency Responses" },
  { value: "2", label: "Regional Offices" },
  { value: "4.5B+", label: "People in Coverage Zone" },
  { value: "Multi-Hazard", label: "Monitoring Active" },
];

const features = [
  {
    icon: MapPin,
    title: "Earthquake Rapid Response",
    desc: "Access-level situation reports for earthquake events, mapping affected populations and humanitarian corridors within hours of a major seismic event.",
  },
  {
    icon: Zap,
    title: "Cyclone Tracking",
    desc: "Real-time cyclone path analysis for the Bay of Bengal and Arabian Sea, integrated with India's IMD and regional meteorological services for 72-hour advance warnings.",
  },
  {
    icon: Shield,
    title: "Flood Intelligence",
    desc: "River basin monitoring across the Mekong, Brahmaputra, and Indus deltas — some of the world's most flood-prone watersheds, home to hundreds of millions.",
  },
  {
    icon: Users,
    title: "Tsunami Alert Integration",
    desc: "ASEAN Tsunami Warning System and Pacific Tsunami Warning Centre data feeds integrated into Michael's alert platform for coastal Southeast Asian communities.",
  },
];

function StatusBadge({ status }) {
  if (status === "Response") return <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-green-100 text-green-700">Response</span>;
  if (status === "Office") return <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-blue-50 text-[#009EDB]">Regional Office</span>;
  return <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-gray-100 text-gray-600">{status}</span>;
}

function Asia() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-24">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <p className="text-[#009EDB] mb-3 uppercase tracking-widest text-xs font-black">
              Where We Work
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
              WDC in Asia
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Asia accounts for over 40% of all global disaster events. From Afghan earthquake response to cyclone monitoring across the Indian subcontinent, WDC's two regional offices serve 4.5 billion people.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container sm:px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {stats.map((s, i) => (
              <AnimateIn key={i} variant="fadeUp" delay={i * 0.08}>
                <p className="text-3xl md:text-4xl font-black mb-1">{s.value}</p>
                <p className="text-white/70 text-sm uppercase tracking-wider">{s.label}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Country Cards */}
      <section className="py-20">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <div className="text-center mb-14">
              <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">Operations</p>
              <h2 className="text-3xl md:text-4xl font-bold text-content-primary">Countries of Operation</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((c, i) => (
              <AnimateIn key={i} variant="fadeUp" delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(0,0,0,0.10)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-gray-200 border-t-4 border-t-primary rounded p-6 shadow-sm h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{c.flag}</span>
                      <h3 className="font-bold text-content-primary text-base leading-snug">{c.name}</h3>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">{c.focus}</p>
                  <p className="text-content-secondary text-sm leading-relaxed">{c.detail}</p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech section */}
      <section className="py-20 bg-gray-50">
        <div className="container sm:px-2">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <AnimateIn variant="fadeLeft">
                <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">Technology on the Ground</p>
                <h2 className="text-3xl font-bold text-content-primary mb-6">How WDC Serves Asia</h2>
                <div className="space-y-5">
                  {features.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-content-primary text-sm mb-1">{item.title}</h3>
                        <p className="text-content-secondary text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>
            <AnimateIn variant="fadeRight" className="lg:w-1/2">
              <div className="bg-[#1C2B39] text-white rounded-lg p-10">
                <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-3">The Challenge</p>
                <h3 className="text-2xl font-bold mb-4">Asia's Disaster Scale</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Asia accounts for over 40% of all global disaster events. The region spans the Pacific Ring of Fire, the world's most active cyclone basins — the Bay of Bengal, Arabian Sea, and Western Pacific — and some of the largest river deltas on earth. A single Himalayan glacial lake outburst can displace millions.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Afghanistan's disaster context is compounded by conflict, making humanitarian access mapping essential. WDC's two South and Southeast Asian offices give disaster managers real-time intelligence across a combined coverage zone of 4.5 billion people.
                </p>
                <Link
                  to="/global-products"
                  className="inline-flex items-center gap-2 text-[#009EDB] font-bold text-sm hover:underline"
                >
                  Learn About Michael <ArrowRight size={14} />
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center border-t border-gray-100">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <h2 className="text-2xl font-bold text-content-primary mb-4">Support WDC's Asian Operations</h2>
            <p className="text-content-secondary text-base mb-8 max-w-lg mx-auto">
              Regional offices, emergency response missions, and real-time monitoring across 4.5 billion people depend on partnerships and funding.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/donate"
                className="bg-primary text-white font-bold px-8 py-3 rounded-sm text-sm tracking-wide hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Donate <ArrowRight size={16} />
              </Link>
              <Link
                to="/partnerWithUs"
                className="border border-gray-300 text-content-primary font-bold px-8 py-3 rounded-sm text-sm tracking-wide hover:border-primary hover:text-primary transition-colors"
              >
                Partner With Us
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}

export default Asia;
