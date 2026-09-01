import { Link } from "react-router-dom";
import SEOMeta from "../../components/SEOMeta";
import {
  Heart, Calendar, Building2, TrendingUp, Gift,
  Landmark, Briefcase, Users, ArrowRight,
} from "lucide-react";

const PAYPAL_URL = "https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE";
const PAYPAL_MONTHLY_URL = "https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE&no_recurring=0";

const OTHER_WAYS = [
  {
    icon: Building2,
    title: "Wire Transfer / Bank Transfer",
    description: "International bank transfers for larger gifts. Contact us for banking details.",
    label: "Get in touch",
    to: "/contact",
  },
  {
    icon: TrendingUp,
    title: "Stocks & Securities",
    description: "Transfer appreciated stocks, ETFs, or other securities tax-efficiently.",
    label: "Get in touch",
    to: "/contact",
  },
  {
    icon: Gift,
    title: "Tribute Gift",
    description: "Make a donation in honour or in memory of a loved one.",
    label: "Get in touch",
    to: "/contact",
  },
  {
    icon: Landmark,
    title: "Planned Giving",
    description: "Include WDC in your will or living trust to create a lasting legacy.",
    label: "Get in touch",
    to: "/contact",
  },
  {
    icon: Briefcase,
    title: "Corporate & Foundation Giving",
    description: "CSR programs, foundation grants, and matched giving.",
    label: "Partner with us",
    to: "/roster",
  },
  {
    icon: Users,
    title: "Organize a Fundraiser",
    description: "Host an event or fundraising campaign in your network.",
    label: "Get in touch",
    to: "/contact",
  },
];

function WayCard({ icon: Icon, title, description, label, to }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
        style={{ backgroundColor: "rgba(0,158,219,0.10)" }}
      >
        <Icon size={20} style={{ color: "#009EDB" }} />
      </div>
      <h3 className="text-base font-black text-[#1C2B39]">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 leading-relaxed flex-1">{description}</p>
      <Link
        to={to}
        className="mt-4 inline-flex items-center gap-1.5 text-[#009EDB] font-bold text-sm hover:underline"
      >
        {label} <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export default function DonorsPage() {
  return (
    <>
      <SEOMeta
        title="Donate — Support WDC's Humanitarian Mission"
        description="Support the World Disaster Center. Donate now, give monthly, or explore other ways to give — wire transfer, stocks, tribute gifts, planned giving, and corporate partnerships."
        image="https://images.unsplash.com/photo-1553775927-a071d5a6a39a?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/donate"
      />

      {/* ── HERO ── */}
      <section className="bg-[#05101f] text-white pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-widest text-[#009EDB] mb-4">
            WDC PROTECT · Humanitarian Impact
          </p>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-5">
            Support the World Disaster Center
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Every contribution protects vulnerable people from disaster, conflict, and crisis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={PAYPAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-black text-base px-8 py-4 rounded-xl transition-colors duration-200"
            >
              <Heart size={18} /> Donate Now
            </a>
            <a
              href={PAYPAL_MONTHLY_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 font-black text-base px-8 py-4 rounded-xl transition-colors duration-200"
            >
              <Calendar size={18} /> Give Monthly
            </a>
          </div>
        </div>
      </section>

      {/* ── OTHER WAYS ── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1C2B39]">Other Ways to Give</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl mx-auto leading-relaxed">
              WDC accepts various forms of support — financial, in-kind, and planned.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {OTHER_WAYS.map((w) => (
              <WayCard key={w.title} {...w} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#1C2B39] py-12 px-4 text-center">
        <p className="text-gray-300 text-sm mb-2">Questions about giving? Email us directly.</p>
        <a
          href="mailto:office@worlddisastercenter.org"
          className="text-white text-lg font-black hover:underline"
        >
          office@worlddisastercenter.org
        </a>
      </section>
    </>
  );
}
