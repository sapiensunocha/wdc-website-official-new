import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import AnimateIn from "../../components/AnimateIn";
import { Helmet } from "react-helmet-async";

const regions = [
  {
    name: "Africa",
    route: "/where-we-work/africa",
    subtitle: "14 Countries · HQ: Nairobi",
    description:
      "Floods, conflict, disease outbreaks, drought. Africa faces the most disasters with the fewest resources. WDC's largest field presence.",
    flags: "🇨🇩🇧🇮🇸🇩🇳🇬🇰🇪🇷🇼🇲🇬🇲🇼🇿🇦🇲🇱🇨🇲🇬🇭🇨🇮🇺🇬",
    color: "from-emerald-500/10 to-teal-500/5",
    accent: "border-emerald-500",
  },
  {
    name: "Americas",
    route: "/where-we-work/americas",
    subtitle: "9 Countries · Offices: Ottawa, New York, Santiago",
    description:
      "Caribbean hurricane response, Venezuela earthquake intelligence, and WDC's flagship HQ operations.",
    flags: "🇭🇹🇯🇲🇨🇺🇧🇸🇩🇴🇨🇦🇺🇸🇨🇱🇻🇪",
    color: "from-blue-500/10 to-sky-500/5",
    accent: "border-blue-500",
  },
  {
    name: "Asia",
    route: "/where-we-work/asia",
    subtitle: "4 Countries · Offices: Bangkok, Mumbai",
    description:
      "Earthquake emergency response in Afghanistan, GLOF flood monitoring in Nepal, cyclone monitoring in South Asia, flood systems in Southeast Asia.",
    flags: "🇦🇫🇮🇳🇹🇭🇳🇵",
    color: "from-amber-500/10 to-orange-500/5",
    accent: "border-amber-500",
  },
  {
    name: "Europe",
    route: "/where-we-work/europe",
    subtitle: "3 Countries · Offices: Salzburg, Istanbul",
    description:
      "European coordination hub, Middle East gateway, cross-border risk monitoring.",
    flags: "🇦🇹🇩🇪🇹🇷",
    color: "from-violet-500/10 to-purple-500/5",
    accent: "border-violet-500",
  },
];

const stats = [
  { value: "30+", label: "Countries" },
  { value: "6", label: "Continents" },
  { value: "8", label: "Regional & HQ Offices" },
  { value: "8+", label: "Active Missions" },
];

export default function WhereWeWork() {
  return (
    <div className="bg-white">
      <Helmet>
        <title>Where We Work — World Disaster Center</title>
        <meta name="description" content="WDC operates in 30+ countries across Africa, the Americas, Asia, and Europe. Field missions in DRC, Burundi, Haiti, Afghanistan, Nepal and more. Michael AI delivers disaster intelligence across all regions." />
        <meta property="og:title" content="Where We Work — World Disaster Center" />
        <meta property="og:description" content="Active field missions and disaster intelligence operations across Africa, the Americas, Asia, and Europe. 30+ countries, 8 regional offices, 6 continents." />
        <meta name="keywords" content="World Disaster Center operations, WDC global presence, disaster response countries, WDC Africa Americas Asia Europe, Michael AI global coverage, humanitarian operations" />
      </Helmet>
      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-24">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp" delay={0}>
            <p className="text-[#009EDB] mb-3 uppercase tracking-widest text-xs font-black">
              Global Operations
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
              Where We Work
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.2}>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              WDC operates across 5 continents with field missions, regional
              offices, and board network presence.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Stats Bar */}
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

      {/* Regions Grid */}
      <section className="py-20">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <div className="text-center mb-14">
              <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">
                Regions
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-content-primary">
                Our Regions
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((region, i) => (
              <AnimateIn key={i} variant="fadeUp" delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <Link
                    to={region.route}
                    className={`block bg-gradient-to-br ${region.color} border border-gray-200 border-t-4 ${region.accent} rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow group`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-content-primary mb-1 group-hover:text-primary transition-colors">
                          {region.name}
                        </h3>
                        <p className="text-xs font-bold text-primary uppercase tracking-wide">
                          {region.subtitle}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                        <Globe size={18} className="text-primary" />
                      </div>
                    </div>
                    <p className="text-content-secondary text-sm leading-relaxed mb-5">
                      {region.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl leading-loose tracking-wide">
                        {region.flags}
                      </span>
                      <span className="inline-flex items-center gap-1 text-primary font-bold text-sm group-hover:gap-2 transition-all">
                        View Region <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center border-t border-gray-100">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <h2 className="text-2xl font-bold text-content-primary mb-4">
              View the Full Impact Map
            </h2>
            <p className="text-content-secondary text-base mb-8 max-w-lg mx-auto">
              See how WDC's global network translates into real-time protection for
              vulnerable communities worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/impact"
                className="bg-primary text-white font-bold px-8 py-3 rounded-sm text-sm tracking-wide hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Explore Impact Map <ArrowRight size={16} />
              </Link>
              <Link
                to="/donate"
                className="border border-gray-300 text-content-primary font-bold px-8 py-3 rounded-sm text-sm tracking-wide hover:border-primary hover:text-primary transition-colors"
              >
                Support Our Work
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
