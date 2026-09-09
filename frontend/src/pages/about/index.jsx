import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, Handshake, Cpu, Users, Activity, Globe,
  Globe2, Wifi, Heart, ArrowRight, ChevronRight,
} from "lucide-react";
import AnimateIn from "../../components/AnimateIn";
import SEOMeta from "../../components/SEOMeta";
import FounderPhoto from "../../assets/images/Photoroom_20251006_010721.JPG";

// ── Design tokens ──────────────────────────────────────────────────────────────
const P  = "#009EDB";
const D  = "#05081a";
const W  = "#FFFFFF";
const T1 = "#0D1F2D";
const T2 = "#475569";
const T3 = "#94A3B8";

// ── Social links ───────────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "LinkedIn (WDC)",     href: "https://www.linkedin.com/company/worlddisastercenter",       icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "LinkedIn (Founder)", href: "https://www.linkedin.com/in/sapiens-ndatabaye-227425165",    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "X",                  href: "https://x.com/W_D_Center",                                   icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11.321 8.937L16.492 3.056H15.267l-4.49 5.106L7.191 3.056H3.056l5.422 7.721L3.056 16.945h1.225l4.741-5.393 3.787 5.393h4.136L11.32 8.937zm-1.678 1.908-.549-.769-4.371-6.118h1.882l3.528 4.938.549.769 4.585 6.419H13.385L9.643 10.845z"/></svg> },
  { label: "Instagram",          href: "https://www.instagram.com/worlddisastercenter/",              icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg> },
  { label: "YouTube",            href: "https://www.youtube.com/@WorldDisasterCenterOffice",          icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 12"><path fillRule="evenodd" d="M13.919 1.107C14.558 1.279 15.06 1.783 15.23 2.421 15.539 3.579 15.539 6 15.539 6s0 2.415-.31 3.573c-.17.638-.671 1.142-1.31 1.314C12.764 11.197 8.129 11.197 8.129 11.197s-4.633 0-5.79-.31a1.857 1.857 0 0 1-1.31-1.314C.718 8.415.718 6 .718 6S.718 3.579 1.028 2.421C1.2 1.78 1.702 1.277 2.338 1.107 3.496.797 8.129.797 8.129.797s4.635 0 5.79.31zm-3.421 4.89L6.648 8.226V3.768l3.85 2.229z"/></svg> },
];

const STATS = [
  { value: "2,000+", label: "Vetted Experts" },
  { value: "47",     label: "Countries" },
  { value: "11",     label: "Active Campaigns" },
  { value: "$2M+",   label: "Mobilised" },
];

const PILLARS = [
  {
    Icon: Globe2,
    color: P,
    title: "Connects the World",
    body: "Our global network spans governments, NGOs, businesses, and individuals — ensuring we leverage existing expertise and resources wherever they exist.",
  },
  {
    Icon: Wifi,
    color: "#f97316",
    title: "Operates in Real Time",
    body: "From global systems to local communities, we provide real-time alerts, advice, and data to mitigate disaster impacts before they escalate.",
  },
  {
    Icon: Heart,
    color: "#22c55e",
    title: "Is Inclusive",
    body: "We are a diverse, collaborative hub — uniting people from all backgrounds, ages, and areas of expertise to create holistic, equitable solutions.",
  },
];

const VALUES = [
  { Icon: Zap,       color: P,         title: "Action-Oriented",     body: "We take immediate action to save lives, knowing that every moment counts." },
  { Icon: Handshake, color: "#f97316", title: "Collaboration Based",  body: "We build strong partnerships to deliver swift and impactful solutions." },
  { Icon: Cpu,       color: "#7c3aed", title: "Tech-Driven",          body: "We use cutting-edge technologies like AI and real-time data to improve disaster governance." },
  { Icon: Users,     color: "#22c55e", title: "Inclusive",            body: "We ensure disaster responses meet the needs of all, with a focus on marginalised groups." },
  { Icon: Activity,  color: "#e11d48", title: "Real-Time",            body: "We provide real-time alerts and insights to empower effective decision-making and risk mitigation." },
  { Icon: Globe,     color: "#0891b2", title: "Worldwide",            body: "Our global efforts unite organisations and individuals to build a more resilient and sustainable world." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <SEOMeta
        title="About WDC — World Disaster Center"
        description="World Disaster Center is an AI-powered humanitarian organization founded by young dreamers who believe disasters can be prevented. We build early warning systems, deploy expert rosters, and run 11 protection campaigns worldwide."
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/about"
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 sm:py-36" style={{ background: D }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(0,12,35,0.95) 0%, rgba(0,30,60,0.88) 100%)" }} />
        <div className="container relative z-10">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: P }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: P }}>About World Disaster Center</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 max-w-3xl" style={{ color: W }}>
              We Exist to End<br />
              <span style={{ color: P }}>Disaster Impacts.</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              Some of us have witnessed unimaginable loss. The World Disaster Center was founded by young dreamers who believe disasters can be prevented — or at the very least, their impacts drastically reduced.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/impact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-85"
                style={{ background: P }}>
                Our Impact <ArrowRight size={15} />
              </Link>
              <Link to="/about/partners"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black border transition-all hover:border-white"
                style={{ color: W, borderColor: "rgba(255,255,255,0.25)" }}>
                Our Partners <ArrowRight size={15} />
              </Link>
            </div>
          </AnimateIn>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border p-5"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)" }}>
                <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: P }}>{s.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-4xl">
              <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: P }}>Our Mission</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: T1 }}>
                "We are on a mission to{" "}
                <span style={{ color: P }}>end disaster impacts</span>{" "}
                — everywhere."
              </h2>
              <div className="mt-8 h-px max-w-xs" style={{ background: `linear-gradient(90deg, ${P}, transparent)` }} />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24" style={{ background: "#F8FAFB" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <AnimateIn variant="fadeRight">
              <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: P }}>Who We Are</p>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-6" style={{ color: T1 }}>
                Strengthening Resilience<br className="hidden sm:block" /> Against Disasters
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: T2 }}>
                <p>
                  Some of us have witnessed unimaginable loss — parents taken, communities destroyed, the ability to smile faded. While 80% of the global population is exposed to disasters, the world remains largely unprepared.
                </p>
                <p>
                  WDC was founded by young dreamers who believe disasters can be prevented. We harness advanced technologies to connect initiatives, support individuals and organisations, and equip people with simple, powerful tools to safeguard their lives.
                </p>
                <p>
                  When people feel safe, they can build, grow, and dream. Safety is not a privilege — it is the foundation of progress.
                </p>
              </div>
              <Link to="/impact"
                className="inline-flex items-center gap-2 mt-8 text-sm font-black uppercase tracking-wider transition-all hover:gap-3"
                style={{ color: P }}>
                See Our Impact <ChevronRight size={15} />
              </Link>
            </AnimateIn>

            {/* Visual grid */}
            <AnimateIn variant="fadeLeft" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-48 sm:h-56">
                  <img src="https://images.unsplash.com/photo-1594841343391-97ac1b9a950e?auto=format&fit=crop&w=600&q=80"
                    alt="Disaster response" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 sm:h-56 mt-6">
                  <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
                    alt="Humanitarian work" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 sm:h-56 -mt-6">
                  <img src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&q=80"
                    alt="Global network" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 sm:h-56">
                  <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80"
                    alt="Technology solutions" className="w-full h-full object-cover" />
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 relative overflow-hidden" style={{ background: D }}>
        <div className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=60')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(0,12,35,0.95) 0%, rgba(0,30,60,0.90) 100%)" }} />
        <div className="container relative z-10">
          <AnimateIn variant="fadeUp">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: P }}>How WDC Works</p>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: W }}>
                An Organization That
                <span style={{ color: P }}> Acts.</span>
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border p-8 flex flex-col gap-5"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${p.color}20` }}>
                  <p.Icon size={22} style={{ color: p.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-3" style={{ color: W }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>{p.body}</p>
                </div>
                <div className="mt-auto h-px" style={{ background: `linear-gradient(90deg, ${p.color}60, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-4xl">
              <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: P }}>Our Vision</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: T1 }}>
                "A world where disasters no longer disrupt{" "}
                <span style={{ color: P }}>determination, dreams, or aspiration.</span>"
              </h2>
              <div className="mt-8 h-px max-w-xs" style={{ background: `linear-gradient(90deg, ${P}, transparent)` }} />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── OUR VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24" style={{ background: "#F8FAFB" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-xl mb-12">
              <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: P }}>Our Values</p>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: T1 }}>
                What Guides Every Decision
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border p-6 flex flex-col gap-4 group hover:shadow-lg transition-all duration-300"
                style={{ borderColor: "#E2E8F0" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${v.color}15` }}>
                  <v.Icon size={20} style={{ color: v.color }} />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2 leading-snug" style={{ color: T1 }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T2 }}>{v.body}</p>
                </div>
                <div className="mt-auto h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: v.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ──────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: "#1C2B39" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

            {/* Photo */}
            <AnimateIn variant="zoomIn" className="shrink-0 flex flex-col items-center gap-4">
              <div className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 shadow-2xl" style={{ borderColor: P }}>
                <img src={FounderPhoto} alt="Sapiens Ndatabaye — Founder, World Disaster Center"
                  className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-center">
                <p className="font-black text-white text-lg tracking-wide">Sapiens Ndatabaye</p>
                <p className="text-sm font-bold uppercase tracking-widest mt-0.5" style={{ color: P }}>Founder &amp; Executive Director</p>
                <p className="text-xs mt-0.5" style={{ color: T3 }}>World Disaster Center</p>
              </div>
              <div className="flex items-center gap-3 mt-1">
                {[
                  { href: "https://www.linkedin.com/in/sapiens-ndatabaye-227425165", label: "LinkedIn" },
                  { href: "https://x.com/SapiensNdatabay", label: "X" },
                ].map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="text-xs font-bold px-3 py-1.5 border rounded text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                    {label} ↗
                  </a>
                ))}
              </div>
            </AnimateIn>

            {/* Quote */}
            <AnimateIn variant="fadeRight" delay={0.2} className="flex-1">
              <div className="h-1 w-12 mb-6" style={{ background: P }} />
              <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: P }}>A Message from the Founder</p>
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-white leading-relaxed">
                "The world can no longer afford to face disasters{" "}
                <span className="font-black text-white">unprepared, uninformed, and divided</span>{" "}
                in the moments that matter most. WDC exists to deliver real-time, universal access to critical intelligence —{" "}
                <span className="font-semibold" style={{ color: P }}>because awareness is no longer optional, it is essential to survival.</span>
              </blockquote>
              <p className="text-lg leading-relaxed mt-6 font-light" style={{ color: "rgba(255,255,255,0.65)" }}>
                This is not an initiative of convenience, but a global necessity to protect lives, strengthen resilience, and redefine how humanity responds to crisis."
              </p>
              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row flex-wrap gap-3" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                <motion.a href="https://www.linkedin.com/in/sapiens-ndatabaye-227425165" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white transition-colors"
                  style={{ background: P }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Connect on LinkedIn ↗
                </motion.a>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 border text-white text-sm font-black px-5 py-2.5 rounded-xl transition-colors hover:border-white"
                    style={{ borderColor: "rgba(255,255,255,0.30)" }}>
                    Contact WDC
                  </Link>
                </motion.div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── COMMITMENT ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-4xl">
              <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: P }}>Our Commitment</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight" style={{ color: T1 }}>
                "We are dedicated to transforming{" "}
                <span style={{ color: P }}>challenges into opportunities.</span>"
              </h2>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link to="/campaigns"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-85"
                  style={{ background: P }}>
                  See Our Campaigns <ArrowRight size={15} />
                </Link>
                <Link to="/careers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black border transition-all hover:border-gray-400"
                  style={{ color: T1, borderColor: "#E2E8F0" }}>
                  Join the Team <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FOLLOW ───────────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-10" style={{ background: P }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <AnimateIn variant="fadeLeft">
            <p className="text-white font-black text-xl">Follow World Disaster Center</p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>Stay updated on missions, tools, and disaster intelligence worldwide.</p>
          </AnimateIn>
          <div className="flex flex-wrap items-center gap-3">
            {SOCIALS.map(({ href, label, icon }, i) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-white text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-wider transition-colors"
                style={{ background: "rgba(255,255,255,0.15)" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.28)" }}>
                {icon}{label}
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
