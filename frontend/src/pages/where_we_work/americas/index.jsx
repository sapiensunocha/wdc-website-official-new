import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Zap, Shield, FileText } from "lucide-react";
import SEOMeta from "../../../components/SEOMeta";
import AnimateIn from "../../../components/AnimateIn";

const COUNTRY_REPORTS = {
  "Haiti": [
    { label: "Haiti Mission Report 2024", id: "mission-haiti-2024" },
    { label: "EAGLE Haiti Assessment", id: "eagle-haiti-2024" },
  ],
  "Jamaica": [
    { label: "Jamaica Mission Report", id: "mission-jamaica-2024" },
  ],
  "Venezuela": [
    { label: "Annual Report 2024 — Venezuela Response", id: "annual-2024" },
  ],
  "Canada (Ottawa HQ)": [
    { label: "WDC Annual Report 2024", id: "annual-2024" },
    { label: "Strategic Plan 2024", id: "strategic-plan-2024" },
  ],
  "United States (New York)": [
    { label: "WDC Annual Report 2024", id: "annual-2024" },
  ],
  "Chile (Santiago Office)": [
    { label: "Annual Report 2024", id: "annual-2024" },
  ],
};

const countries = [
  {
    name: "Haiti",
    flag: "🇭🇹",
    status: "Response",
    focus: "Hurricane response, gang violence monitoring, earthquake preparedness",
    detail:
      "Haiti is one of WDC's most active response zones. During Hurricane Melissa (2025), WDC deployed Michael's real-time intelligence extension for situation awareness, CASH assistance coordination, logistics, and identifying at-risk communities. WDC also monitors seismic activity and gang-controlled territorial shifts that complicate humanitarian access.",
  },
  {
    name: "Jamaica",
    flag: "🇯🇲",
    status: "Response",
    focus: "Hurricane damage assessment, real-time monitoring",
    detail:
      "Hit by Hurricane Melissa (2025). Michael performed rapid damage assessment, real-time storm tracking, and community risk profiling for Jamaican disaster management authorities and NGO partners coordinating relief.",
  },
  {
    name: "Cuba",
    flag: "🇨🇺",
    status: "Response",
    focus: "Hurricane intelligence, community risk assessment",
    detail:
      "Affected by Hurricane Melissa (2025). WDC provided situational intelligence and real-time monitoring data to support humanitarian response coordination across affected Cuban communities.",
  },
  {
    name: "Bahamas",
    flag: "🇧🇸",
    status: "Response",
    focus: "Hurricane early warning, community risk profiling",
    detail:
      "Michael's early-warning capabilities were activated during Hurricane Melissa (2025) to identify at-risk island communities, track storm surge data, and support relief logistics for the Bahamian islands.",
  },
  {
    name: "Dominican Republic",
    flag: "🇩🇴",
    status: "Response",
    focus: "Caribbean-wide hurricane coordination, population risk mapping",
    detail:
      "Part of WDC's Caribbean-wide Hurricane Melissa response. Michael provided real-time community risk assessments and coordinated intelligence for cross-border humanitarian operations across Hispaniola.",
  },
  {
    name: "Canada (Ottawa HQ)",
    flag: "🇨🇦",
    status: "HQ",
    focus: "Global headquarters, program coordination, donor engagement",
    detail:
      "WDC's Canadian headquarters in Ottawa (586 Prince Albert St, Ottawa ON K1K1Y6). The Ottawa office serves as the primary coordination hub for international programs, partnerships, funding (CRA: 721487825 RC 0001), and strategic planning.",
  },
  {
    name: "United States (New York)",
    flag: "🇺🇸",
    status: "HQ",
    focus: "UN liaison, donor relations, North America operations",
    detail:
      "WDC's New York office (1660 Madison Ave, New York 10029, EIN: 33-1869013) is positioned near UN headquarters, enabling direct engagement with UN agencies, OCHA, UNDP, and the global humanitarian community. Leads North America fundraising and policy advocacy.",
  },
  {
    name: "Chile (Santiago Office)",
    flag: "🇨🇱",
    status: "Office",
    focus: "South America coordination, earthquake and wildfire monitoring",
    detail:
      "WDC Regional Office for South America based in Santiago. Focus: earthquakes, volcanic eruptions, and wildfire management. Partners with regional governments and research institutions to deploy Michael across South America's high-risk disaster zones.",
  },
  {
    name: "Venezuela",
    flag: "🇻🇪",
    status: "Response",
    focus: "M7.5 earthquake response, urban search & rescue intelligence, aftershock monitoring",
    detail:
      "Two powerful earthquakes struck northern Venezuela on 24 June 2026 — a M7.2 foreshock followed 39 seconds later by a M7.5 mainshock near San Felipe, Yaracuy State — the most destructive seismic event in Venezuela's recorded history. WDC deployed Michael's earthquake intelligence dashboard with live USGS seismic monitoring, structural collapse mapping across Caracas, and humanitarian needs assessment coordinating with OCHA Venezuela, UNICEF, and the Venezuelan Red Cross.",
  },
];

const stats = [
  { value: "6", label: "Response Countries" },
  { value: "3", label: "Offices & HQ" },
  { value: "Americas", label: "Full Coverage" },
  { value: "2026", label: "Venezuela M7.5 Response" },
];

const techFeatures = [
  {
    icon: MapPin,
    title: "Multilingual Alerts",
    desc: "Michael delivers alerts in Spanish, French, English, and Haitian Creole — ensuring life-saving information reaches every community regardless of language.",
  },
  {
    icon: Zap,
    title: "Hurricane Tracking",
    desc: "Real-time storm surge, wind speed, and community risk scoring updated continuously during active hurricane events across the Caribbean basin.",
  },
  {
    icon: Shield,
    title: "Earthquake Monitoring",
    desc: "Seismic sensor integration for Pacific and Caribbean fault zones, providing early detection and impact assessment for earthquake events.",
  },
  {
    icon: Users,
    title: "Coordination Bridge",
    desc: "Direct data feeds to OCHA, PAHO, and national civil protection agencies ensure WDC intelligence is embedded in official response operations.",
  },
];

export default function Americas() {
  return (
    <div className="bg-white">
      <SEOMeta
        title="WDC in the Americas — Disaster Response & Early Warning"
        description="World Disaster Center operations across the Americas — disaster monitoring, early warning systems, and humanitarian campaigns."
        image="https://images.unsplash.com/photo-1728320764872-2eebb4f95e4e?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/where-we-work/americas"
      />
      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-24">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp" delay={0}>
            <p className="text-[#009EDB] mb-3 uppercase tracking-widest text-xs font-black">
              Where We Work
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
              WDC in the Americas
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.2}>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Caribbean hurricane response, earthquake preparedness, and WDC's flagship
              headquarters operations — spanning eight countries across North America,
              the Caribbean, and South America.
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
                <p className="text-4xl font-black mb-1">{s.value}</p>
                <p className="text-white/70 text-sm uppercase tracking-wider">
                  {s.label}
                </p>
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
              <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">
                Operations
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-content-primary">
                Countries of Operation
              </h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((c, i) => (
              <AnimateIn key={i} variant="fadeUp" delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <div className="bg-white border border-gray-200 border-t-4 border-t-primary rounded p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{c.flag}</span>
                        <h3 className="font-bold text-content-primary text-base leading-snug">
                          {c.name}
                        </h3>
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded shrink-0 ml-2 ${
                          c.status === "Response"
                            ? "bg-green-100 text-green-700"
                            : c.status === "HQ"
                            ? "bg-blue-50 text-[#009EDB]"
                            : c.status === "Office"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
                      {c.focus}
                    </p>
                    <p className="text-content-secondary text-sm leading-relaxed flex-1">
                      {c.detail}
                    </p>
                    {COUNTRY_REPORTS[c.name] && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">WDC Reports</p>
                        <div className="flex flex-col gap-1">
                          {COUNTRY_REPORTS[c.name].map((r) => (
                            <Link key={r.id} to={`/reports`}
                              className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold">
                              <FileText size={11} className="shrink-0" /> {r.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="py-20 bg-gray-50">
        <div className="container sm:px-2">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <AnimateIn variant="fadeLeft" className="lg:w-1/2">
              <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">
                Technology on the Ground
              </p>
              <h2 className="text-3xl font-bold text-content-primary mb-6">
                How WDC Serves the Americas
              </h2>
              <div className="space-y-5">
                {techFeatures.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-content-primary text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="text-content-secondary text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeRight" className="lg:w-1/2">
              <div className="bg-[#1C2B39] text-white rounded-lg p-10">
                <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-3">
                  The Challenge
                </p>
                <h3 className="text-2xl font-bold mb-4">
                  The Americas' Disaster Challenge
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  The Caribbean and Latin America face compound disasters: hurricanes
                  amplified by climate change, seismic risk along the Pacific Ring of
                  Fire, and complex humanitarian crises where conflict and natural
                  disaster overlap. Haiti alone has faced three major crises in five
                  years.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  WDC's presence across eight countries ensures real-time monitoring
                  and intelligence for every major event.
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
            <h2 className="text-2xl font-bold text-content-primary mb-4">
              Support WDC's Americas Operations
            </h2>
            <p className="text-content-secondary text-base mb-8 max-w-lg mx-auto">
              Field missions, hurricane response, and Michael's Americas coverage are
              funded by partners and donors. Your support directly protects lives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/donate"
                className="bg-primary text-white font-bold px-8 py-3 rounded-sm text-sm tracking-wide hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Donate <ArrowRight size={16} />
              </Link>
              <Link
                to="/roster"
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
