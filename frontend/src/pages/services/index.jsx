import React from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    icon: "🎓",
    title: "Training & Capacity Building",
    description:
      "Professional disaster management training for humanitarian workers, government officials, community responders, and corporate teams — delivered online, virtually, or in-person anywhere in the world.",
    features: [
      "WDC Academy — 7 free online courses with certification",
      "Virtual instructor-led training (live facilitated sessions)",
      "In-person workshops, simulations & field exercises",
      "Training of Trainers (ToT) programmes",
      "Custom curriculum development for organisations",
    ],
    link: { label: "Explore Training", to: "/training" },
    accent: "#418FDE",
  },
  {
    icon: "🛰️",
    title: "Technology Solutions",
    description:
      "End-to-end humanitarian technology — from AI-powered disaster impact assessment to early warning systems and real-time coordination dashboards that transform how organisations prepare and respond.",
    features: [
      "EAGLE — AI-powered real-time disaster impact assessment",
      "Early warning system design and integration",
      "Custom data dashboards and coordination tools",
      "GIS mapping and satellite imagery analysis",
      "Technical implementation support and onboarding",
    ],
    link: { label: "View Global Products", to: "/global-products" },
    accent: "#0066CC",
  },
  {
    icon: "💼",
    title: "Technical Consulting & Advisory",
    description:
      "Expert advisory services to strengthen disaster risk governance, national resilience strategies, and emergency management systems at all levels — from community committees to national governments.",
    features: [
      "Disaster risk assessments (national, sub-national, community)",
      "National DRR Strategy development and peer review",
      "Organisational resilience and capacity assessments",
      "Humanitarian coordination system design",
      "Technical assistance to emergency management agencies",
    ],
    link: { label: "Contact Us", to: "/contact" },
    accent: "#00875A",
  },
  {
    icon: "📋",
    title: "Research & Analysis",
    description:
      "Rigorous applied research that bridges the gap between academic knowledge and operational humanitarian practice — from real-time crisis reporting to long-term policy analysis.",
    features: [
      "Real-time situation analysis and crisis reporting",
      "Rapid and in-depth needs assessments",
      "Post-disaster reviews and lessons learned",
      "Policy briefs for government and UN audiences",
      "Impact evaluations and programme reviews",
    ],
    link: { label: "Contact Us", to: "/contact" },
    accent: "#7C3AED",
  },
];

const PRICING = [
  {
    label: "Online Academy",
    price: "Free",
    sub: "forever",
    note: "Access all WDC online courses with full certification at no cost.",
    features: [
      "7 complete disaster management courses",
      "27+ learning modules",
      "Quizzes, knowledge checks & certificates",
      "Self-paced — access anytime, anywhere",
      "Certificate of completion",
    ],
    cta: { label: "Start Learning Free", to: "/training" },
    highlight: false,
  },
  {
    label: "Virtual Instructor-Led",
    price: "From USD 150",
    sub: "per participant",
    note: "Live facilitated online sessions with WDC-certified trainers.",
    features: [
      "Live sessions with WDC expert facilitators",
      "Interactive exercises and scenario learning",
      "Customisable content to your context",
      "Certificate of participation",
      "Post-training resource pack",
    ],
    cta: { label: "Get a Quote", to: "/training#estimator" },
    highlight: true,
  },
  {
    label: "In-Person Workshop",
    price: "From USD 2,500",
    sub: "per day",
    note: "On-site workshops delivered at your location worldwide.",
    features: [
      "On-site delivery by WDC expert facilitators",
      "Half-day to full-week programmes",
      "Field exercises and practical simulations",
      "Comprehensive participant materials",
      "Certificate of attendance",
    ],
    cta: { label: "Plan Your Workshop", to: "/training#estimator" },
    highlight: false,
  },
  {
    label: "Enterprise",
    price: "Custom",
    sub: "contact us for a quote",
    note: "Organisation-wide solutions for governments, UN agencies & large NGOs.",
    features: [
      "Unlimited staff training access",
      "Custom learning pathways",
      "Technology platform integration",
      "Dedicated WDC account manager",
      "Quarterly impact reporting",
    ],
    cta: { label: "Contact Us", to: "/contact" },
    highlight: false,
  },
];

const CHARGE_TABLE = [
  {
    service: "Training",
    model: "Per participant · Per day · Annual licence",
    detail:
      "Online academy is free. Virtual and in-person sessions are priced per participant or per day. Institutional licences available for organisations wanting to enroll teams of 10+.",
  },
  {
    service: "Technology",
    model: "Annual licence · Project-based",
    detail:
      "EAGLE platform and other tools are licensed annually, with pricing scaled to organisation size and deployment scope. One-off implementation projects are individually scoped and quoted.",
  },
  {
    service: "Consulting",
    model: "Daily rate · Deliverable-based",
    detail:
      "Advisory services are charged at a daily rate (from USD 800/day) or as deliverable-based fixed-cost contracts. Multi-month engagements receive preferential rates.",
  },
  {
    service: "Research",
    model: "Project-based",
    detail:
      "Research projects are scoped and costed individually based on depth, geography, and deliverables. Select outputs — policy briefs, situation reports — are published free as a public good.",
  },
];

function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-1.5 w-full" style={{ backgroundColor: service.accent }} />
      <div className="p-8">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">{service.description}</p>
        <ul className="space-y-2 mb-6">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: service.accent }} />
              {f}
            </li>
          ))}
        </ul>
        <Link
          to={service.link.to}
          className="inline-flex items-center text-sm font-bold gap-1 transition-colors"
          style={{ color: service.accent }}
        >
          {service.link.label} →
        </Link>
      </div>
    </div>
  );
}

function PricingCard({ tier }) {
  return (
    <div
      className={`rounded-lg p-7 flex flex-col border-2 transition-shadow hover:shadow-lg ${
        tier.highlight
          ? "bg-[#418FDE] border-[#418FDE] text-white shadow-md"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {tier.highlight && (
        <span className="text-[10px] font-black uppercase tracking-widest bg-white/25 text-white px-2 py-0.5 rounded self-start mb-3">
          Most Popular
        </span>
      )}
      <h3 className={`font-bold text-lg mb-1 ${tier.highlight ? "text-white" : "text-gray-900"}`}>
        {tier.label}
      </h3>
      <div className="mb-1">
        <span className={`text-3xl font-black ${tier.highlight ? "text-white" : "text-[#418FDE]"}`}>
          {tier.price}
        </span>
        {tier.sub && (
          <span className={`text-xs ml-1 ${tier.highlight ? "text-white/70" : "text-gray-500"}`}>
            / {tier.sub}
          </span>
        )}
      </div>
      <p className={`text-xs mb-5 ${tier.highlight ? "text-white/80" : "text-gray-500"}`}>{tier.note}</p>
      <ul className="space-y-2 mb-7 flex-1">
        {tier.features.map((f, i) => (
          <li key={i} className={`flex items-start gap-2 text-sm ${tier.highlight ? "text-white/90" : "text-gray-700"}`}>
            <span className={`mt-0.5 shrink-0 text-xs font-bold ${tier.highlight ? "text-white" : "text-[#418FDE]"}`}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        to={tier.cta.to}
        className={`block text-center text-sm font-bold py-3 rounded transition-colors ${
          tier.highlight
            ? "bg-white text-[#418FDE] hover:bg-gray-100"
            : "bg-[#418FDE] text-white hover:bg-[#005b9f]"
        }`}
      >
        {tier.cta.label}
      </Link>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#418FDE] py-12 sm:py-16 md:py-20 px-4">
        <div className="container max-w-4xl">
          <span className="text-xs font-black uppercase tracking-widest text-white/70 mb-2 block">
            World Disaster Center
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Our Services</h1>
          <p className="text-white/85 text-lg max-w-2xl leading-relaxed">
            From free online training to government-scale technology deployments — WDC supports every organisation working to reduce disaster risk and save lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              to="/training#estimator"
              className="w-full sm:w-auto bg-white text-[#418FDE] font-bold px-6 py-3 rounded text-sm hover:bg-gray-100 transition-colors text-center"
            >
              Plan Your Training
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto border-2 border-white text-white font-bold px-6 py-3 rounded text-sm hover:bg-white/10 transition-colors text-center"
            >
              Request a Proposal
            </Link>
          </div>
        </div>
      </div>

      {/* Accent stripe */}
      <div className="h-1 w-full bg-[#009EDB]" />

      {/* Services grid */}
      <div className="bg-gray-50 py-12 sm:py-16 md:py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#418FDE] mb-2 block">
              What We Offer
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Service Areas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              WDC operates across four core service areas, each designed to make communities and organisations more resilient.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} service={s} />
            ))}
          </div>
        </div>
      </div>

      {/* Training pricing */}
      <div className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#418FDE] mb-2 block">
              Training Packages
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Training Investment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transparent pricing for every type of learner — from a single volunteer to a national emergency management agency.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING.map((tier, i) => (
              <PricingCard key={i} tier={tier} />
            ))}
          </div>
        </div>
      </div>

      {/* How We Charge */}
      <div className="bg-gray-50 border-t border-gray-200 py-12 sm:py-16 md:py-20 px-4">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#418FDE] mb-2 block">
              Pricing Model
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How We Charge</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              WDC uses a range of pricing models depending on the service. Our goal is to make world-class disaster expertise accessible to all.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <div className="bg-white overflow-hidden">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-[#418FDE] text-white">
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-wide text-xs w-1/5">Service</th>
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-wide text-xs w-1/4">Pricing Model</th>
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-wide text-xs">Detail</th>
                </tr>
              </thead>
              <tbody>
                {CHARGE_TABLE.map((row, i) => (
                  <tr key={i} className={`border-t border-gray-100 ${i % 2 === 1 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-6 py-4 font-bold text-[#418FDE]">{row.service}</td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">{row.model}</td>
                    <td className="px-6 py-4 text-gray-600 leading-relaxed">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            All prices are indicative. Final fees depend on scope, location, duration, and number of participants. NGOs, local governments, and community-based organisations may be eligible for reduced rates.
          </p>
        </div>
      </div>

      {/* Why WDC */}
      <div className="bg-white py-10 sm:py-14 px-4 border-t border-gray-200">
        <div className="container max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Why Choose WDC?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🌍", title: "Truly Global", body: "Active programmes across Africa, Asia-Pacific, the Americas, and Europe. We understand local contexts — not just global frameworks." },
              { icon: "🤝", title: "Mission-Driven", body: "We are a humanitarian organisation first. Our services are designed to serve affected communities, not maximise profit." },
              { icon: "⚡", title: "Operationally Proven", body: "Our tools, training, and consulting are tested in real emergencies — from active conflict zones to climate-driven displacement crises." },
              { icon: "🎓", title: "Certified Expertise", body: "Our facilitators bring decades of combined experience in OCHA, UNHCR, Red Cross, and national disaster management agencies." },
              { icon: "📊", title: "Data-Driven", body: "We integrate the latest IPCC findings, UNDRR data, and field intelligence into everything we design and deliver." },
              { icon: "🔓", title: "Open by Default", body: "We publish research, policy briefs, and training materials freely where possible. Knowledge should not have a paywall." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-lg border border-gray-100 hover:border-[#418FDE]/30 transition-colors">
                <div className="text-3xl shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#418FDE] py-10 sm:py-14 px-4 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Work With WDC?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Tell us about your training or technical needs and our team will respond within 48 hours with a tailored proposal.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          <Link
            to="/training#estimator"
            className="w-full sm:w-auto bg-white text-[#418FDE] font-bold px-8 py-3 rounded hover:bg-gray-100 transition-colors text-center"
          >
            Plan Your Training
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto border-2 border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
          >
            Contact Our Team
          </Link>
          <Link
            to="/request-demo"
            className="w-full sm:w-auto border-2 border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors text-center"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
