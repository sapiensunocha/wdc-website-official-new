import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, Zap, Shield } from "lucide-react";

const countries = [
  {
    name: "Democratic Republic of Congo",
    flag: "🇨🇩",
    status: "Active",
    focus: "Conflict-driven displacement, flood monitoring, disease outbreak alerts",
    detail:
      "WDC field teams work alongside local authorities and UN clusters to monitor multi-hazard risks including armed conflict, floods, and cholera outbreaks. Michael integrates ACLED conflict data with satellite imagery to provide 72-hour warnings.",
  },
  {
    name: "Burundi",
    flag: "🇧🇮",
    status: "Active",
    focus: "Flood early warning, displacement tracking, community resilience",
    detail:
      "WDC supports Burundi's national disaster management authority with real-time flood and landslide alerts. Community reporters on the ground submit field data via Michael's 'Be a Reporter' feature.",
  },
  {
    name: "Sudan",
    flag: "🇸🇩",
    status: "Active",
    focus: "Conflict monitoring, drought and flood alerts, humanitarian access mapping",
    detail:
      "Sudan's complex emergency requires simultaneous monitoring of armed conflict, extreme weather, and displacement. WDC's Crisis Atlas includes Sudan in its weekly intelligence briefings distributed to OCHA, UNHCR, and NGO partners.",
  },
  {
    name: "Haiti",
    flag: "🇭🇹",
    status: "Active",
    focus: "Hurricane and earthquake prediction, gang violence alerts, cholera tracking",
    detail:
      "Haiti sits at the intersection of natural and human-caused disasters. WDC monitors seismic activity, hurricane tracks, and conflict dynamics to provide integrated early warnings to humanitarian coordinators.",
  },
  {
    name: "Kenya",
    flag: "🇰🇪",
    status: "Upcoming",
    focus: "Drought, flash floods, integration with national meteorological service",
    detail:
      "WDC is establishing partnerships with Kenya's Meteorological Department and county disaster offices to integrate Michael with national alert systems. Launch planned for 2025.",
  },
  {
    name: "Rwanda",
    flag: "🇷🇼",
    status: "Partner",
    focus: "Landslide monitoring, regional coordination hub",
    detail:
      "Rwanda hosts WDC's regional coordination activities. WDC received the People Matters Rwanda Award here and continues to engage Rwanda's National Disaster Management Authority as a model for proactive disaster governance.",
  },
];

const stats = [
  { value: "4+", label: "Active African Countries" },
  { value: "12+", label: "Languages Including Swahili & Amharic" },
  { value: "72h", label: "Advance Warning for Communities" },
  { value: "200+", label: "Historical Events Validated" },
];

function Africa() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-24">
        <div className="container sm:px-2">
          <p className="text-[#009EDB] mb-3 uppercase tracking-widest text-xs font-black">
            Where We Work
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            WDC in Africa
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Africa faces a disproportionate share of the world's disasters —
            floods, droughts, conflict displacement, disease outbreaks — with
            some of the least-resourced response systems. WDC is here to change
            that ratio.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container sm:px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-4xl font-black mb-1">{s.value}</p>
                <p className="text-white/70 text-sm uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Cards */}
      <section className="py-20">
        <div className="container sm:px-2">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">
              Operations
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-content-primary">
              Countries of Operation
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((c, i) => (
              <div key={i} className="bg-white border border-gray-200 border-t-4 border-t-primary rounded p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{c.flag}</span>
                    <h3 className="font-bold text-content-primary text-base leading-snug">{c.name}</h3>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                    c.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : c.status === "Upcoming"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-50 text-primary"
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">{c.focus}</p>
                <p className="text-content-secondary text-sm leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Michael Works in Africa */}
      <section className="py-20 bg-gray-50">
        <div className="container sm:px-2">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">
                Technology on the Ground
              </p>
              <h2 className="text-3xl font-bold text-content-primary mb-6">
                How Michael Serves African Communities
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    title: "Multilingual Alerts",
                    desc: "Michael sends alerts in Swahili, French, Amharic, and other African languages via mobile, SMS, and radio — reaching communities without smartphones.",
                  },
                  {
                    icon: Users,
                    title: "Community Reporters",
                    desc: "Local residents submit real-time field reports via Michael's app, providing ground truth that satellites can't capture — flooding in a village road, a cholera case cluster, a bridge collapse.",
                  },
                  {
                    icon: Zap,
                    title: "Offline Mode",
                    desc: "Michael works in low-bandwidth and offline environments. Alerts are cached and delivered when connectivity is restored — critical in remote African contexts.",
                  },
                  {
                    icon: Shield,
                    title: "Partner Integration",
                    desc: "WDC shares Michael intelligence directly with OCHA, UNHCR, UNICEF, and national disaster management authorities so response is coordinated, not duplicated.",
                  },
                ].map((item, i) => (
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
            </div>
            <div className="lg:w-1/2 bg-[#1C2B39] text-white rounded-lg p-10">
              <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-3">The Challenge</p>
              <h3 className="text-2xl font-bold mb-4">Africa's Disaster Gap</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Africa accounts for over 30% of global disaster-related deaths but receives less than 5% of disaster risk financing. Early warning systems that exist in high-income countries — NOAA, ECMWF, Japan's JMA — have no equivalent coverage for most of sub-Saharan Africa.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                WDC exists to close that gap. Michael's multi-source data fusion — combining satellite imagery, seismic sensors, social media monitoring, and on-the-ground community reports — gives African communities the same quality of disaster intelligence that protects people in wealthy nations.
              </p>
              <Link
                to="/global-products"
                className="inline-flex items-center gap-2 text-[#009EDB] font-bold text-sm hover:underline"
              >
                Learn About Michael <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center border-t border-gray-100">
        <div className="container sm:px-2">
          <h2 className="text-2xl font-bold text-content-primary mb-4">Support WDC's African Operations</h2>
          <p className="text-content-secondary text-base mb-8 max-w-lg mx-auto">
            Field missions, community training, and Michael's Africa coverage are funded by partners and donors. Your support directly protects lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/donate"
              className="bg-primary text-white font-bold px-8 py-3 rounded-sm text-sm tracking-wide hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Donate <ArrowRight size={16} />
            </Link>
            <Link
              to="/about/partner-with-us"
              className="border border-gray-300 text-content-primary font-bold px-8 py-3 rounded-sm text-sm tracking-wide hover:border-primary hover:text-primary transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Africa;
