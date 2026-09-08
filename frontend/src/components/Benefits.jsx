import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Globe, Users, Handshake } from "lucide-react";
import AnimateIn from "./AnimateIn";

const items = [
  {
    Icon: Layers,
    color: "#009EDB",
    title: "Tailored Solutions",
    text: "Technology-driven solutions that strengthen disaster preparedness, optimize crisis response, and empower decision-makers — tailored to each country's context.",
    url: "/solution",
    cta: "Explore Solutions",
  },
  {
    Icon: Globe,
    color: "#f97316",
    title: "Global Products",
    text: "From monthly strategic intelligence to real-time dashboards — WDC's products give communities and organizations the insight to act before disaster strikes.",
    url: "/global-products",
    cta: "See Our Products",
  },
  {
    Icon: Users,
    color: "#22c55e",
    title: "Roster Membership",
    text: "Vetted humanitarian professionals, local experts, and partner organizations — ready for immediate deployment in disaster-affected areas worldwide.",
    url: "/membership",
    cta: "Join the Roster",
  },
  {
    Icon: Handshake,
    color: "#a855f7",
    title: "Partnerships",
    text: "Strategic, technical, and financial partners who co-build resilience — from long-term investment partners to software providers and in-kind contributors.",
    url: "/about/partners",
    cta: "Become a Partner",
  },
];

export default function Benefits() {
  return (
    <section id="features" className="bg-white py-16 sm:py-24">
      <div className="container">

        <AnimateIn variant="fadeUp">
          <div className="max-w-2xl mb-12">
            <p className="text-[#009EDB] text-xs font-black tracking-widest uppercase mb-3">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
              End Disaster Impacts.<br className="hidden sm:block" />
              <span className="text-[#009EDB]">The World We Are Building.</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              A new era of resilience and empowerment — four pillars that turn data into action, experts into networks, and crises into managed outcomes.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={item.url}
                className="flex flex-col h-full rounded-2xl border border-gray-100 bg-white p-6 group hover:border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}15` }}
                >
                  <item.Icon size={20} style={{ color: item.color }} />
                </div>

                <h3 className="text-gray-900 font-black text-lg mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">{item.text}</p>

                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider transition-all duration-200 mt-auto" style={{ color: item.color }}>
                  {item.cta}
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
