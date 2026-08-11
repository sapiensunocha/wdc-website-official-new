import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Zap, Users, Award } from "lucide-react";
import FounderPhoto from "../../assets/images/Photoroom_20251006_010721.JPG";

const milestones = [
  {
    year: "2020",
    title: "The Idea is Born",
    description:
      "Sapiens Ndatabaye Kanyunyi, working on the front lines of humanitarian response with OCHA and other UN agencies, witnessed firsthand how fragmented, slow, and reactive disaster systems cost lives. He envisioned a single intelligent platform that could predict disasters before they strike.",
  },
  {
    year: "2021",
    title: "World Disaster Center Founded",
    description:
      "WDC is officially established in Ottawa, Canada. The founding principle: use AI not just to respond to disasters, but to predict and prevent their worst impacts. Early team members are recruited from humanitarian, data science, and engineering backgrounds.",
  },
  {
    year: "2022",
    title: "Michael — First Prototype",
    description:
      "The first version of Michael, WDC's AI-powered disaster intelligence platform, is developed and tested against historical disaster data. Early accuracy metrics exceed expectations — validating the multi-hazard AI approach across earthquakes, floods, and armed conflicts.",
  },
  {
    year: "2023",
    title: "First Field Deployments",
    description:
      "WDC deploys field teams to the DRC and Burundi, collecting real-world data that trains and improves Michael. The EAGLE automated disaster assessment tool is introduced to support field operations. Crisis Atlas launches as WDC's weekly humanitarian intelligence product.",
  },
  {
    year: "2024",
    title: "Global Recognition & Partnerships",
    description:
      "WDC is recognized as a UNFCCC Top 10 Climate Innovation and wins the People Matters Rwanda Award. Strategic partnerships are signed with ESA (European Space Agency), Microsoft, Google, and the Canadian Government. Offices open in New York and Vienna.",
  },
  {
    year: "2025–Present",
    title: "Scaling to 40+ Countries",
    description:
      "Michael reaches 87% accuracy (92% for floods) validated across 200+ historical events. WDC expands to 40+ countries, adds support for 12+ languages, and launches Nostradamus — a monthly global disaster forecast. The Expert Roster grows to include hundreds of vetted humanitarian professionals ready for deployment.",
  },
];

const values = [
  {
    icon: Globe,
    title: "Global Reach, Local Impact",
    desc: "WDC operates where disasters happen — from the DRC to Haiti, Afghanistan to Jamaica — partnering with communities, not just institutions.",
  },
  {
    icon: Zap,
    title: "Speed Saves Lives",
    desc: "Every hour of advance warning matters. Michael's 72-hour predictions give communities time to prepare, evacuate, and survive.",
  },
  {
    icon: Users,
    title: "Human + AI",
    desc: "Every AI-generated alert is validated by WDC analysts and local partners. Technology augments human judgment — it never replaces it.",
  },
  {
    icon: Award,
    title: "Accountability to Communities",
    desc: "WDC measures success not by contracts signed but by lives protected and communities made more resilient against future disasters.",
  },
];

const Story = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-24">
        <div className="container sm:px-2">
          <p className="text-[#009EDB] mb-3 uppercase tracking-widest text-xs font-black">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            Built from the Front Lines of Disaster
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            World Disaster Center was not founded in a boardroom. It was born
            from years of witnessing how the gap between a disaster happening
            and help arriving costs thousands of lives — and the conviction that
            AI could close that gap.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 bg-gray-50">
        <div className="container sm:px-2">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="shrink-0">
              <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-primary shadow-xl">
                <img
                  src={FounderPhoto}
                  alt="Sapiens Ndatabaye — Founder, World Disaster Center"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div>
              <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">
                The Founder
              </p>
              <h2 className="text-3xl font-bold text-content-primary mb-4">
                Sapiens Ndatabaye Kanyunyi
              </h2>
              <p className="text-content-secondary text-base leading-relaxed mb-4">
                Sapiens is a humanitarian technology leader with deep experience
                across UN agencies, international NGOs, and disaster response
                operations in some of the world's most fragile contexts — DRC,
                Sudan, Haiti, and beyond. He saw that existing disaster response
                was reactive, fragmented, and often too late. So he built WDC to
                change that.
              </p>
              <p className="text-content-secondary text-base leading-relaxed mb-6">
                As Executive Director, Sapiens leads WDC's strategy, partnerships,
                field operations, and the ongoing development of Michael —
                the platform he designed to predict disasters before they become catastrophes.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/sapiens-ndatabaye-227425165"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-sm hover:opacity-90 transition-opacity"
                >
                  Connect on LinkedIn
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-gray-300 text-content-primary text-sm font-bold px-5 py-2.5 rounded-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Contact WDC
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container sm:px-2">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">
              Our Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-content-primary">
              From Vision to Global Impact
            </h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={i} className="relative flex gap-8 md:gap-0">
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow md:-translate-x-1/2 top-1 z-10" />
                  <div className={`pl-14 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
                    <span className="inline-block bg-primary text-white text-xs font-black px-3 py-1 rounded mb-2 tracking-widest uppercase">
                      {m.year}
                    </span>
                    <h3 className="text-lg font-bold text-content-primary mb-2">{m.title}</h3>
                    <p className="text-content-secondary text-sm leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container sm:px-2">
          <div className="text-center mb-14">
            <p className="text-primary text-xs font-black uppercase tracking-widest mb-2">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-content-primary">
              The Principles Behind WDC
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-content-primary mb-2">{v.title}</h3>
                <p className="text-content-secondary text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container sm:px-2">
          <h2 className="text-3xl font-bold mb-4">Be Part of the Story</h2>
          <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
            WDC is growing. Join our Expert Roster, partner with us, or support our mission to end disaster impacts everywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/roster/apply"
              className="bg-white text-primary font-bold px-8 py-3 rounded-sm text-sm tracking-wide hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Join the Roster <ArrowRight size={16} />
            </Link>
            <Link
              to="/about/partner-with-us"
              className="border border-white/40 text-white font-bold px-8 py-3 rounded-sm text-sm tracking-wide hover:border-white transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Story;
