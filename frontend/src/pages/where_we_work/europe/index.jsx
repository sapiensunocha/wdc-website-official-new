import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Zap, Shield } from "lucide-react";
import AnimateIn from "../../../components/AnimateIn";

const countries = [
  {
    name: "Austria (Salzburg HQ)",
    flag: "🇦🇹",
    status: "HQ",
    focus: "European headquarters, EU institutional engagement, regulatory compliance",
    detail:
      "WDC's European headquarters in Salzburg, Austria (Wolf-Dietrich-Straße 32/4/2, 5020 Salzburg, Steuernummer: 91 323/2005). The Salzburg office engages with EU institutions, UN Vienna agencies (UNODC, UNIDO, CTBTO), and European humanitarian partners. Handles EU funding compliance and European policy advocacy across WDC's international programs.",
  },
  {
    name: "Turkey (Istanbul Office)",
    flag: "🇹🇷",
    status: "Office",
    focus: "Europe/MENA gateway, earthquake monitoring, refugee crisis coordination",
    detail:
      "WDC Regional Office covering Europe and the Middle East, based in Istanbul. Istanbul sits at the intersection of European and Middle Eastern humanitarian networks at the North Anatolian Fault zone. Focus areas: earthquakes, refugee crises, and transboundary disaster risks. Key partners: EU Civil Protection, AFAD (Turkey's disaster agency), and regional NGOs. The 2023 Turkey earthquakes demonstrated the critical need for real-time disaster intelligence in the region.",
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    status: "Network",
    focus: "Board network, research partnerships, migration and disinformation expertise",
    detail:
      "WDC Board Director Maria Horvat Kohutova is based in Germany. A research consultant specializing in migration, human rights, and project management with over a decade of experience — including work with the Open Society Foundations on disinformation, climate migration, and civic engagement. Her expertise directly informs WDC's policy and advocacy work in Europe.",
  },
];

const stats = [
  { value: "2", label: "Offices & HQ" },
  { value: "EU", label: "Institutional Access" },
  { value: "Europe–MENA", label: "Bridge Coverage" },
  { value: "Board", label: "Research Network" },
];

const features = [
  {
    icon: Shield,
    title: "EU Coordination",
    desc: "Direct engagement with the EU Civil Protection Mechanism and Copernicus Emergency Management Service for satellite disaster data, ensuring European responders have WDC intelligence in every major event.",
  },
  {
    icon: MapPin,
    title: "Earthquake Monitoring",
    desc: "Istanbul's location on the North Anatolian Fault makes it a critical node for earthquake early warning across Turkey, Greece, and the broader Aegean. Michael's seismic integration provides real-time alerts.",
  },
  {
    icon: Users,
    title: "Refugee Crisis Intelligence",
    desc: "Michael integrates displacement tracking and border crossing data for complex mixed-migration and disaster scenarios — vital as climate displacement and conflict-driven movements converge in Europe.",
  },
  {
    icon: Zap,
    title: "Policy & Advocacy",
    desc: "Salzburg HQ leads WDC's engagement with UN Vienna agencies and shapes global disaster risk policy through direct institutional dialogue, influencing standards across the EU and UN systems.",
  },
];

function StatusBadge({ status }) {
  if (status === "HQ") return <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-blue-50 text-[#009EDB]">HQ</span>;
  if (status === "Office") return <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-amber-100 text-amber-700">Regional Office</span>;
  return <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-gray-100 text-gray-600">Board Network</span>;
}

function Europe() {
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
              WDC in Europe
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Europe sits at the crossroads of disaster risk and global humanitarian policy. WDC's Salzburg headquarters and Istanbul regional office bridge European institutions, Middle Eastern crises, and global standards for disaster risk reduction.
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
                <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">Technology & Policy</p>
                <h2 className="text-3xl font-bold text-content-primary mb-6">How WDC Serves Europe</h2>
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
                <h3 className="text-2xl font-bold mb-4">Europe at the Crossroads of Crisis</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Europe faces compounding risks: earthquake threat along the Anatolian and Alpine fault zones, climate-amplified wildfires and floods from the Mediterranean to the Arctic Circle, and the world's most complex refugee movements at the intersection of conflict and climate displacement.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  The 2023 Turkey-Syria earthquakes killed over 50,000 people. Southern European wildfires burned millions of hectares. WDC's Istanbul and Salzburg offices ensure European and Middle Eastern disaster managers have real-time intelligence when it matters most — and that WDC's field experience shapes the global policies that fund and govern disaster response.
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
            <h2 className="text-2xl font-bold text-content-primary mb-4">Support WDC's European Operations</h2>
            <p className="text-content-secondary text-base mb-8 max-w-lg mx-auto">
              Policy advocacy, EU institutional engagement, and cross-border disaster intelligence all depend on sustained partnerships and funding.
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

export default Europe;
