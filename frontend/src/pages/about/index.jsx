import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import {
  Zap, Handshake, Cpu, Users, Activity, Globe, Globe2, Wifi, Heart,
  ArrowRight, ChevronRight, Target, Shield, TrendingUp, AlertTriangle,
  BookOpen, BarChart2, MapPin, Award, Clock, Lightbulb,
} from "lucide-react";
import AnimateIn from "../../components/AnimateIn";
import SEOMeta from "../../components/SEOMeta";

import FounderPhoto   from "../../assets/images/Photoroom_20251006_010721.JPG";
import workshopBanner from "../../assets/images/workshop_banner.jpg";
import case1          from "../../assets/images/cases/case1.jpeg";
import case3          from "../../assets/images/cases/case3.jpeg";
import crisisImg      from "../../assets/images/cases/weeklydashboard.png";
import rosterImg      from "../../assets/images/cases/global_roster.png";
import nostraImg      from "../../assets/images/cases/nostra.png";
import lifelineImg    from "../../assets/images/cases/lifeline.jpg";
import sapiensWdc     from "../../assets/images/events/sapiens_wdc.jpeg";
import workshopLive   from "../../assets/images/events/wdc_live_workshop.png";
import conferenceImg  from "../../assets/images/events/conference_david.jpeg";
import esriImg        from "../../assets/images/events/esri_wdc.png";

const P  = "#009EDB";
const D  = "#05081a";
const W  = "#FFFFFF";
const T1 = "#0D1F2D";
const T2 = "#475569";
const T3 = "#94A3B8";

// ── Animated counter ────────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(ease * end));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setCount(end);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ── Chapter label ────────────────────────────────────────────────────────────────
function Chapter({ n, label, light }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-black tracking-widest uppercase" style={{ color: P }}>
        Chapter {n.toString().padStart(2, "0")}
      </span>
      <span className="w-px h-3 opacity-40" style={{ background: P }} />
      <span className="text-xs font-bold tracking-wider uppercase" style={{ color: light ? T3 : "rgba(255,255,255,0.45)" }}>
        {label}
      </span>
    </div>
  );
}

// ── Real timeline — Dr. Sapiens Ndatabaye's actual career ───────────────────────
const TIMELINE = [
  {
    year: "2012",
    title: "The First Step — Bukavu, DRC",
    body: "Dr. Sapiens Ndatabaye begins his career at Centre Kitumaini in Bukavu, South Kivu — one of the most disaster-prone and conflict-affected regions on earth. Youth programs in a community shaped by crisis plant the seeds of everything that follows.",
    img: case1,
    color: P,
  },
  {
    year: "2018–2020",
    title: "Fieldwork Across Africa's Hardest Contexts",
    body: "USAID/Counterpart International (Kinshasa) — M&E for 150,000 beneficiaries. Then Search for Common Ground in Goma as Country GIS Specialist. Then World Food Programme, Goma — national information management covering 4.5 million people assisted.",
    img: case3,
    color: "#f97316",
  },
  {
    year: "2021",
    title: "Founding Xeltis & IFB",
    body: "Xeltis Ltd is incorporated in London — the World Intelligent Resources System (WIRS) maps and optimises natural and human resources across 20+ countries. Infinite Future Bank is founded: next-generation development finance for Africa and the Global South.",
    img: workshopBanner,
    color: "#22c55e",
  },
  {
    year: "2022–2023",
    title: "UN OCHA — 24 Countries, 80M+ People",
    body: "As Regional Information Manager for UN OCHA in Dakar, Senegal, Dr. Ndatabaye leads the largest OCHA IM portfolio across 24 African countries. He manages HNO/HRP processes impacting 80M+ people and deploys emergency systems across 6 simultaneous conflict situations. This is where the gap becomes undeniable.",
    img: conferenceImg,
    color: "#7c3aed",
  },
  {
    year: "Dec 2023",
    title: "World Disaster Center Is Founded",
    body: "After 15 years in the field, Dr. Ndatabaye founds the World Disaster Center — the AI platform for global crisis prevention the world was missing. Simultaneously begins a PhD in Earth Observation & Geospatial Analysis at the University of Salzburg.",
    img: sapiensWdc,
    color: P,
  },
  {
    year: "2024",
    title: "WDC Goes Live — MICHAEL, Crisis Atlas, Nostradamus",
    body: "The MICHAEL AI platform goes live serving governments in real-time. The Crisis Atlas weekly dashboard tracks active emergencies globally. Nostradamus — the 53-page monthly intelligence report for 195 countries — is launched. Dr. Ndatabaye speaks at COP29 (Baku), ESRI International, EGU24 (Vienna), Harvard, and the World Bank Annual Conference.",
    img: crisisImg,
    color: "#e11d48",
  },
  {
    year: "2025 → Now",
    title: "130+ Countries · 138 Governments · UNGA80",
    body: "WDC engages 138 governments across 5 continents. $9.2M raised. Dr. Ndatabaye speaks at the UN General Assembly (UNGA80). Named Geospatial World Rising Star and Top 20 Dynamic CEOs in Canada. Mining Innovation Winner (2026). The platform now reaches 142 countries.",
    img: esriImg,
    color: "#0891b2",
  },
];

// ── Products ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { Icon: BookOpen,  color: P,         name: "Nostradamus",          sub: "Monthly Intelligence",   img: nostraImg,   desc: "53-page monthly briefing with 30-day global disaster projections for 195 countries — the definitive report for decision-makers." },
  { Icon: BarChart2, color: "#f97316", name: "Crisis Atlas",          sub: "Live Weekly Dashboard",  img: crisisImg,   desc: "Real-time tracking of active emergencies, fatalities, displaced populations, and economic losses — updated every week." },
  { Icon: Users,     color: "#22c55e", name: "Global Roster Portal",  sub: "Expert Network",         img: rosterImg,   desc: "2,000+ vetted professionals deployable within 72 hours anywhere in the world. Transparent funding. Global talent." },
  { Icon: Zap,       color: "#7c3aed", name: "EAGLE AI",              sub: "Early Warning System",   img: case3,       desc: "Machine-learning powered disaster impact assessment and satellite-fed alerts — from field data to actionable intelligence." },
  { Icon: Shield,    color: "#e11d48", name: "11 Campaigns",          sub: "Humanitarian Protection",img: lifelineImg, desc: "Active campaigns covering child protection, climate risk, gender-based violence, and more — live in 142 countries." },
  { Icon: Award,     color: "#0891b2", name: "WDC Academy",           sub: "Capacity Building",      img: workshopLive,desc: "7 free certified disaster management courses, ToT programmes, and in-person workshops for governments and NGOs worldwide." },
];

// ── World map countries ───────────────────────────────────────────────────────────
const MAP_COUNTRIES = [
  { name: "United States",    lat: 37.09,  lon: -95.71 },
  { name: "Kenya",            lat: -1.28,  lon: 36.82 },
  { name: "Nigeria",          lat: 9.08,   lon: 8.68 },
  { name: "DRC Congo",        lat: -4.04,  lon: 21.76 },
  { name: "Burundi",          lat: -3.38,  lon: 29.92 },
  { name: "France",           lat: 46.23,  lon: 2.21 },
  { name: "United Kingdom",   lat: 55.38,  lon: -3.44 },
  { name: "Switzerland",      lat: 46.82,  lon: 8.23 },
  { name: "Japan",            lat: 36.20,  lon: 138.25 },
  { name: "India",            lat: 20.59,  lon: 78.96 },
  { name: "Philippines",      lat: 12.88,  lon: 121.77 },
  { name: "Bangladesh",       lat: 23.68,  lon: 90.36 },
  { name: "Pakistan",         lat: 30.38,  lon: 69.35 },
  { name: "South Africa",     lat: -30.56, lon: 22.94 },
  { name: "Rwanda",           lat: -1.94,  lon: 29.87 },
  { name: "Ghana",            lat: 7.95,   lon: -1.02 },
  { name: "Tanzania",         lat: -6.37,  lon: 34.89 },
  { name: "Germany",          lat: 51.17,  lon: 10.45 },
  { name: "Netherlands",      lat: 52.13,  lon: 5.29 },
  { name: "Argentina",        lat: -38.42, lon: -63.62 },
  { name: "Canada",           lat: 56.13,  lon: -106.35 },
  { name: "Cameroon",         lat: 7.37,   lon: 12.35 },
  { name: "Zimbabwe",         lat: -19.02, lon: 29.15 },
  { name: "Nepal",            lat: 28.39,  lon: 84.12 },
  { name: "Lebanon",          lat: 33.85,  lon: 35.86 },
  { name: "Spain",            lat: 40.46,  lon: -3.75 },
  { name: "Sweden",           lat: 60.13,  lon: 18.64 },
  { name: "Mauritius",        lat: -20.35, lon: 57.55 },
  { name: "Indonesia",        lat: -0.79,  lon: 113.92 },
  { name: "Brazil",           lat: -14.24, lon: -51.93 },
  { name: "Ethiopia",         lat: 9.15,   lon: 40.49 },
  { name: "Haiti",            lat: 18.97,  lon: -72.29 },
  { name: "Mozambique",       lat: -18.67, lon: 35.53 },
  { name: "Myanmar",          lat: 21.91,  lon: 95.96 },
  { name: "Colombia",         lat: 4.57,   lon: -74.30 },
  { name: "Mexico",           lat: 23.63,  lon: -102.55 },
  { name: "Egypt",            lat: 26.82,  lon: 30.80 },
  { name: "Morocco",          lat: 31.79,  lon: -7.09 },
  { name: "Australia",        lat: -25.27, lon: 133.77 },
  { name: "Ukraine",          lat: 48.38,  lon: 31.17 },
  { name: "Turkey",           lat: 38.96,  lon: 35.24 },
  { name: "Ivory Coast",      lat: 7.54,   lon: -5.55 },
  { name: "Senegal",          lat: 14.50,  lon: -14.45 },
  { name: "Uganda",           lat: 1.37,   lon: 32.29 },
  { name: "Mali",             lat: 17.57,  lon: -3.99 },
  { name: "Vietnam",          lat: 14.06,  lon: 108.28 },
  { name: "Thailand",         lat: 15.87,  lon: 100.99 },
  { name: "Venezuela",        lat: 6.42,   lon: -66.59 },
  { name: "Peru",             lat: -9.19,  lon: -75.02 },
  { name: "Sudan",            lat: 12.86,  lon: 30.22 },
  { name: "Somalia",          lat: 5.15,   lon: 46.20 },
  { name: "Syria",            lat: 34.80,  lon: 38.99 },
  { name: "Yemen",            lat: 15.55,  lon: 48.52 },
  { name: "Israel",           lat: 31.05,  lon: 34.85 },
  { name: "Austria",          lat: 47.52,  lon: 14.55 },
  { name: "Belgium",          lat: 50.50,  lon: 4.47 },
  { name: "South Korea",      lat: 35.91,  lon: 127.77 },
  { name: "New Zealand",      lat: -40.90, lon: 174.89 },
  { name: "Azerbaijan",       lat: 40.14,  lon: 47.58 },
  { name: "South Sudan",      lat: 6.88,   lon: 31.31 },
  { name: "Chad",             lat: 15.45,  lon: 18.73 },
  { name: "Niger",            lat: 17.61,  lon: 8.08 },
];

// ── What is WDC ───────────────────────────────────────────────────────────────────
const PILLARS = [
  { Icon: Globe2, color: P,         title: "A Global Intelligence Hub",    body: "WDC aggregates satellite feeds, field data, and the MICHAEL AI platform to produce real-time disaster intelligence used by 138 governments across 5 continents." },
  { Icon: Wifi,   color: "#f97316", title: "A Real-Time Response Network", body: "From weekly Crisis Atlas dashboards to 72-hour expert deployments via the Global Roster Portal — WDC closes the gap between early warning and effective action." },
  { Icon: Heart,  color: "#22c55e", title: "An Inclusive Human Platform",  body: "2,000+ vetted experts, 11 protection campaigns, and a free Academy — ensuring no community is left unprotected, regardless of resources or location." },
];

// ── Values ────────────────────────────────────────────────────────────────────────
const VALUES = [
  { Icon: Zap,       color: P,         title: "Action-Oriented",    body: "We take immediate action to save lives, knowing every moment counts." },
  { Icon: Handshake, color: "#f97316", title: "Collaboration Based", body: "We build strong partnerships to deliver swift and impactful solutions." },
  { Icon: Cpu,       color: "#7c3aed", title: "Tech-Driven",         body: "We use cutting-edge AI and real-time data to improve disaster governance worldwide." },
  { Icon: Users,     color: "#22c55e", title: "Inclusive",           body: "We ensure responses meet the needs of all, with a focus on marginalised communities." },
  { Icon: Activity,  color: "#e11d48", title: "Real-Time",           body: "We provide real-time alerts and insights for effective decision-making." },
  { Icon: Globe,     color: "#0891b2", title: "Worldwide",           body: "Our global efforts unite organisations and individuals for a more resilient world." },
];

// ── Recognition ────────────────────────────────────────────────────────────────────
const RECOGNITION = [
  { label: "UNGA80 Speaker",               org: "United Nations General Assembly · New York 2025",              color: P },
  { label: "COP29 Keynote",                org: "UNFCCC · Baku, Azerbaijan 2024",                              color: "#22c55e" },
  { label: "Geospatial Rising Star",        org: "Geospatial World Forum · 2025 (p.26)",                       color: "#f97316" },
  { label: "Top 20 Dynamic CEOs — Canada", org: "Dynamic CEO Magazine · 2025",                                 color: "#7c3aed" },
  { label: "World Bank Annual Conference",  org: "Washington DC · 2024",                                       color: "#D4A84B" },
  { label: "ESRI International Speaker",   org: "ESRI Users Conference · San Diego 2024",                      color: P },
  { label: "EGU24 — Vienna",               org: "European Geosciences Union · 2024",                           color: "#e11d48" },
  { label: "Harvard GIS Summit Speaker",   org: "Harvard University · Cambridge 2024",                         color: "#A51C30" },
  { label: "UNFCCC Climate Champion",      org: "UN Framework Convention on Climate Change · 2024",            color: "#22c55e" },
  { label: "Mining Innovation Winner",     org: "Mining Innovation 2026 · African Mining Indaba",              color: "#D4A84B" },
];

// ── Roadmap ────────────────────────────────────────────────────────────────────────
const ROADMAP = [
  { Icon: Globe2,     color: P,         label: "200 Countries by 2027",     desc: "Expanding the WDC intelligence network to 200 countries through regional ambassador networks and institutional partnerships." },
  { Icon: Lightbulb,  color: "#f97316", label: "Satellite Integration",     desc: "Sub-hour disaster alert delivery through direct ESA and NASA satellite feed integration into the MICHAEL platform." },
  { Icon: Award,      color: "#22c55e", label: "WDC Academy Global Reach",  desc: "In-person capacity bootcamps on four continents — certifying 5,000 disaster professionals annually by 2027." },
  { Icon: TrendingUp, color: "#7c3aed", label: "EAGLE AI v2",               desc: "Next-generation early warning with predicted displacement and infrastructure damage modelling — 6-hour advance alerts." },
];

// ── Socials ────────────────────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "LinkedIn",    href: "https://www.linkedin.com/company/worlddisastercenter",     icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "X / Twitter", href: "https://x.com/W_D_Center",                                icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11.321 8.937L16.492 3.056H15.267l-4.49 5.106L7.191 3.056H3.056l5.422 7.721L3.056 16.945h1.225l4.741-5.393 3.787 5.393h4.136L11.32 8.937zm-1.678 1.908-.549-.769-4.371-6.118h1.882l3.528 4.938.549.769 4.585 6.419H13.385L9.643 10.845z"/></svg> },
  { label: "Instagram",   href: "https://www.instagram.com/worlddisastercenter/",           icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg> },
  { label: "YouTube",     href: "https://www.youtube.com/@WorldDisasterCenterOffice",       icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 12"><path fillRule="evenodd" d="M13.919 1.107C14.558 1.279 15.06 1.783 15.23 2.421 15.539 3.579 15.539 6 15.539 6s0 2.415-.31 3.573c-.17.638-.671 1.142-1.31 1.314C12.764 11.197 8.129 11.197 8.129 11.197s-4.633 0-5.79-.31a1.857 1.857 0 0 1-1.31-1.314C.718 8.415.718 6 .718 6S.718 3.579 1.028 2.421C1.2 1.78 1.702 1.277 2.338 1.107 3.496.797 8.129.797 8.129.797s4.635 0 5.79.31zm-3.421 4.89L6.648 8.226V3.768l3.85 2.229z"/></svg> },
  { label: "Founder",     href: "https://www.linkedin.com/in/sapiens-ndatabaye-227425165",  icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
];

// ═══════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  return (
    <div className="bg-white">
      <SEOMeta
        title="About WDC — World Disaster Center"
        description="Founded in 2023 by Dr. Sapiens Ndatabaye Kanyunyi after 15 years of field humanitarian work across 24 African countries. WDC now serves 138 governments in 142 countries with real-time AI disaster intelligence."
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/about"
      />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: D }}>
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')", opacity: 0.18 }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(0,4,20,0.97) 0%, rgba(0,20,50,0.90) 55%, rgba(0,30,60,0.85) 100%)" }} />

        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full opacity-20"
            style={{ width: 3 + i * 2, height: 3 + i * 2, background: P, top: `${15 + i * 13}%`, left: `${8 + i * 15}%` }}
            animate={{ y: [-8, 8, -8], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }} />
        ))}

        <div className="container relative z-10 py-32 sm:py-40">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: P }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: P }}>About World Disaster Center</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6 max-w-4xl" style={{ color: W }}>
              15 Years in the Field.<br />
              <span style={{ color: P }}>Built to Close the Gap.</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              From Bukavu, DRC to the UN General Assembly — World Disaster Center was founded in 2023
              by Dr. Sapiens Ndatabaye Kanyunyi after a decade and a half leading humanitarian information management
              across 24 African countries. The platform that should have existed all along.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#origin" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-85" style={{ background: P }}>
                Read the Story <ArrowRight size={15} />
              </a>
              <Link to="/impact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black border transition-all hover:border-white" style={{ color: W, borderColor: "rgba(255,255,255,0.25)" }}>
                See Our Impact <ChevronRight size={15} />
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {[
              { end: 142,   suffix: "",   label: "Countries" },
              { end: 138,   suffix: "",   label: "Governments Engaged" },
              { end: 15,    suffix: "+",  label: "Years of Field Experience" },
              { end: 9,     suffix: ".2M", prefix: "$", label: "Raised", raw: true },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-2xl border p-5 sm:p-6"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)" }}>
                <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: P }}>
                  {s.raw ? `${s.prefix}${s.end}${s.suffix}` : <AnimatedCounter end={s.end} suffix={s.suffix} prefix={s.prefix || ""} duration={1800} />}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.42)" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Scroll</span>
          <div className="w-px h-8 opacity-30" style={{ background: P }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER 01 — THE ORIGIN
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="origin" className="relative overflow-hidden py-20 sm:py-32" style={{ background: "#0A1628" }}>
        <div className="absolute inset-0 bg-cover bg-top opacity-15"
          style={{ backgroundImage: `url(${sapiensWdc})` }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,22,40,0.65) 0%, rgba(10,22,40,0.98) 55%)" }} />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <AnimateIn variant="fadeRight">
              <Chapter n={1} label="The Origin" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-8" style={{ color: W }}>
                Born in Bukavu.<br /><span style={{ color: P }}>Built for the World.</span>
              </h2>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.68)" }}>
                <p>
                  <span className="font-bold text-white">Dr. Sapiens Ndatabaye Kanyunyi</span> was born in Bukavu,
                  in the Democratic Republic of Congo — one of the most disaster-prone regions on earth.
                  Growing up in South Kivu meant growing up alongside crisis: conflict, floods, volcanic eruptions,
                  and the slow collapse of systems that were supposed to protect people.
                </p>
                <p>
                  He began his humanitarian career in 2012 at Centre Kitumaini, working with youth in communities
                  shaped by perpetual emergency. What he saw was not a lack of courage or compassion among
                  responders — it was a catastrophic lack of information. The data existed. The satellites existed.
                  The expertise existed. But no one had built the system to connect them.
                </p>
                <p>
                  Over the next decade, he took that question into the world's hardest contexts: USAID operations
                  in Kinshasa, WFP emergency management in Goma, the World Bank across East Africa — and finally,
                  UN OCHA's regional information management across{" "}
                  <span className="font-bold text-white">24 African countries, serving 80 million people</span> in active crises.
                </p>
              </div>
              <div className="mt-8 pl-5 border-l-2" style={{ borderColor: P }}>
                <p className="text-lg font-light italic" style={{ color: "rgba(255,255,255,0.82)" }}>
                  "A weather forecast can tell you 180 mm of rain is coming. It cannot tell you
                  which bridge closes, which road floods, which neighbourhood loses power.
                  <span className="font-bold text-white"> That gap costs lives. WDC exists to close it."</span>
                </p>
                <p className="text-sm font-black mt-3" style={{ color: P }}>— Dr. Sapiens Ndatabaye Kanyunyi, Founder & CEO</p>
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeLeft" delay={0.15}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden h-64 sm:h-80 shadow-2xl">
                  <img src={conferenceImg} alt="Dr. Sapiens Ndatabaye at conference" className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                </div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                  className="absolute -bottom-6 -left-6 rounded-2xl overflow-hidden w-36 h-36 sm:w-44 sm:h-44 border-4 shadow-xl" style={{ borderColor: "#0A1628" }}>
                  <img src={sapiensWdc} alt="WDC" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.45 }}
                  className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 text-center shadow-xl" style={{ background: P }}>
                  <div className="text-2xl font-black text-white">2012</div>
                  <div className="text-[10px] font-bold text-white opacity-80 uppercase tracking-wider">Started</div>
                </motion.div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER 02 — THE GAP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <Chapter n={2} label="The Gap" light />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6 max-w-3xl" style={{ color: T1 }}>
              What Dr. Ndatabaye Saw<br />
              <span style={{ color: "#e11d48" }}>That the World Was Missing.</span>
            </h2>
            <p className="text-base leading-relaxed max-w-2xl mb-14" style={{ color: T2 }}>
              After 15 years managing information across the world's most complex humanitarian crises,
              the pattern was always the same: fragmented data, siloed systems, delayed alerts.
              Not because the technology didn't exist — but because no one had built the platform to make it work together.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { value: 80,  suffix: "%",   label: "of the global population lives in disaster-exposed zones",        color: "#e11d48" },
              { value: 190, suffix: "+",   label: "countries with no dedicated disaster intelligence system",         color: "#f97316" },
              { value: 24,  suffix: "",    label: "African countries Dr. Ndatabaye personally led IM operations in",  color: "#7c3aed" },
              { value: 80,  suffix: "M+",  label: "people served by his OCHA information management systems",         color: P },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-3xl p-8 border group hover:shadow-xl transition-all duration-300"
                style={{ borderColor: "#E2E8F0", background: "#F8FAFB" }}>
                <div className="text-5xl sm:text-6xl font-black leading-none mb-3" style={{ color: s.color }}>
                  <AnimatedCounter end={s.value} suffix={s.suffix} duration={2200} />
                </div>
                <div className="h-0.5 w-12 rounded-full mb-4 transition-all duration-500 group-hover:w-20" style={{ background: s.color }} />
                <p className="text-base leading-relaxed font-medium" style={{ color: T1 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER 03 — THE JOURNEY (Timeline)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32" style={{ background: "#F8FAFB" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <Chapter n={3} label="The Journey" light />
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: T1 }}>
              15 Years That Led to <span style={{ color: P }}>WDC.</span>
            </h2>
            <p className="text-base max-w-xl mb-16" style={{ color: T2 }}>
              Every role, every country, every crisis that Dr. Ndatabaye moved through was a step toward the platform the world needed.
            </p>
          </AnimateIn>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: "linear-gradient(180deg, transparent, #E2E8F0 10%, #E2E8F0 90%, transparent)" }} />

            <div className="space-y-10 lg:space-y-0">
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div key={item.year}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative lg:grid lg:grid-cols-2 lg:gap-12">

                    <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-10 h-10 rounded-full border-4 items-center justify-center z-10"
                      style={{ background: item.color, borderColor: "#F8FAFB" }}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>

                    <div className={`${isLeft ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"}`}>
                      <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                        style={{ borderColor: "#E2E8F0" }}>
                        <div className="flex items-center gap-3 mb-4 lg:hidden">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: item.color }}>{i + 1}</div>
                          <span className="font-black text-sm" style={{ color: item.color }}>{item.year}</span>
                        </div>
                        <span className="hidden lg:block font-black text-2xl mb-1" style={{ color: item.color }}>{item.year}</span>
                        <h3 className="font-black text-lg mb-3" style={{ color: T1 }}>{item.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: T2 }}>{item.body}</p>
                        {item.img && (
                          <div className="mt-4 rounded-xl overflow-hidden h-32 sm:h-36">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                    {!isLeft && <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER 04 — THE IMPACT (Products)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 relative overflow-hidden" style={{ background: D }}>
        <div className="absolute inset-0 opacity-12 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,8,26,0.97) 0%, rgba(0,20,50,0.93) 100%)" }} />
        <div className="container relative z-10">
          <AnimateIn variant="fadeUp">
            <Chapter n={4} label="What WDC Built" />
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: W }}>
              Six Products. One Platform. <span style={{ color: P }}>$9.2M Raised.</span>
            </h2>
            <p className="text-base max-w-xl mb-12" style={{ color: "rgba(255,255,255,0.58)" }}>
              Since WDC's founding in December 2023, the team has shipped six intelligence products
              now serving 138 governments across 142 countries.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <motion.div key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border group transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="relative h-40 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(5,8,26,0.95) 100%)" }} />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: p.color + "25" }}>
                      <p.Icon size={14} style={{ color: p.color }} />
                    </div>
                    <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: p.color }}>{p.sub}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-base mb-2" style={{ color: W }}>{p.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>{p.desc}</p>
                  <div className="mt-4 h-px" style={{ background: `linear-gradient(90deg, ${p.color}50, transparent)` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER 05 — 142 COUNTRIES (World Map)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32" style={{ background: "#F8FAFB" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <Chapter n={5} label="Global Reach" light />
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: T1 }}>
              <span style={{ color: P }}>142 Countries.</span> 138 Governments. One Mission.
            </h2>
            <p className="text-base max-w-xl mb-10" style={{ color: T2 }}>
              From New York to Nairobi, Geneva to Tokyo, Baku to San Diego — WDC's intelligence
              reaches governments and communities on every continent.
            </p>
          </AnimateIn>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7 }} className="rounded-3xl overflow-hidden border shadow-xl" style={{ borderColor: "#E2E8F0", height: 460 }}>
            <MapContainer center={[10, 15]} zoom={2} style={{ height: "100%", width: "100%" }}
              zoomControl={false} scrollWheelZoom={false} dragging={false}>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
              />
              {MAP_COUNTRIES.map((c, i) => (
                <CircleMarker key={`${c.name}-${i}`} center={[c.lat, c.lon]} radius={5}
                  pathOptions={{ color: P, fillColor: P, fillOpacity: 0.85, weight: 1.5 }}>
                  <Tooltip>{c.name}</Tooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Africa",       count: "54+",  color: "#f97316" },
              { label: "Asia-Pacific", count: "38+",  color: "#22c55e" },
              { label: "Americas",     count: "28+",  color: P },
              { label: "Europe & ME",  count: "22+",  color: "#7c3aed" },
            ].map((r, i) => (
              <motion.div key={r.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl border p-5 text-center" style={{ borderColor: "#E2E8F0", background: W }}>
                <div className="text-2xl font-black mb-1" style={{ color: r.color }}>{r.count}</div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: T3 }}>{r.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          RECOGNITION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: D }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,8,26,0.97) 0%, rgba(0,20,50,0.95) 100%)" }} />
        <div className="container relative z-10">
          <AnimateIn variant="fadeUp">
            <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: P }}>Recognition</p>
            <h2 className="text-3xl sm:text-4xl font-black mb-10" style={{ color: W }}>
              Where Dr. Ndatabaye Has <span style={{ color: P }}>Represented WDC.</span>
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECOGNITION.map((r, i) => (
              <motion.div key={r.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-xl border p-5 flex items-start gap-4"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: r.color }} />
                <div>
                  <p className="font-black text-sm" style={{ color: W }}>{r.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{r.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WHAT IS WDC?
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-4xl mb-16">
              <p className="text-xs font-black tracking-widest uppercase mb-5" style={{ color: P }}>What is World Disaster Center?</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6" style={{ color: T1 }}>
                The Global Intelligence System<br />
                <span style={{ color: P }}>Disaster Response Has Been Missing.</span>
              </h2>
              <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: T2 }}>
                WDC is a New York-based nonprofit combining real-time AI intelligence, a global expert roster,
                humanitarian protection campaigns, and free capacity building — ensuring every government, NGO,
                community, and individual can prepare for, respond to, and recover from any disaster.
                Founded in December 2023 by Dr. Sapiens Ndatabaye Kanyunyi. Headquartered in Washington DC.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.14 }}
                className="rounded-2xl border p-8 flex flex-col gap-5 hover:shadow-lg transition-all duration-300"
                style={{ borderColor: "#E2E8F0" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${p.color}15` }}>
                  <p.Icon size={22} style={{ color: p.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-3" style={{ color: T1 }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T2 }}>{p.body}</p>
                </div>
                <div className="mt-auto h-px" style={{ background: `linear-gradient(90deg, ${p.color}60, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OUR VALUES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32" style={{ background: "#F8FAFB" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-xl mb-14">
              <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: P }}>Our Values</p>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: T1 }}>What Guides Every Decision.</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
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
                <div className="mt-auto h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500" style={{ background: v.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          THE FOUNDER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 relative overflow-hidden" style={{ background: "#1C2B39" }}>
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <AnimateIn variant="zoomIn" className="shrink-0 flex flex-col items-center gap-5">
              <div className="relative">
                <div className="w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 shadow-2xl" style={{ borderColor: P }}>
                  <img src={FounderPhoto} alt="Dr. Sapiens Ndatabaye Kanyunyi" className="w-full h-full object-cover object-top" />
                </div>
                <motion.div className="absolute -bottom-3 -right-3 rounded-2xl px-3 py-2 text-center shadow-xl" style={{ background: P }}
                  animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <div className="text-xs font-black text-white uppercase tracking-wider">Founder & CEO</div>
                </motion.div>
              </div>
              <div className="text-center">
                <p className="font-black text-white text-xl tracking-wide">Dr. Sapiens Ndatabaye Kanyunyi</p>
                <p className="text-sm font-bold uppercase tracking-widest mt-1" style={{ color: P }}>Founder &amp; Executive Director</p>
                <p className="text-xs mt-0.5" style={{ color: T3 }}>World Disaster Center · Washington DC</p>
              </div>
              <div className="flex items-center gap-3">
                {[
                  { href: "https://www.linkedin.com/in/sapiens-ndatabaye-227425165", label: "LinkedIn" },
                  { href: "https://x.com/SapiensNdatabay", label: "X" },
                ].map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="text-xs font-bold px-4 py-2 border rounded-lg text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}>{label} ↗</a>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeRight" delay={0.2} className="flex-1">
              <div className="h-1 w-12 mb-6" style={{ background: P }} />
              <p className="text-xs font-black tracking-widest uppercase mb-5" style={{ color: P }}>A Message from the Founder</p>
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed" style={{ color: W }}>
                "The world can no longer afford to face disasters{" "}
                <span className="font-black">unprepared, uninformed, and divided</span>{" "}
                in the moments that matter most. WDC exists to deliver real-time, universal access to critical intelligence —{" "}
                <span className="font-semibold" style={{ color: P }}>because awareness is no longer optional, it is essential to survival.</span>
              </blockquote>
              <p className="text-lg leading-relaxed mt-6 font-light" style={{ color: "rgba(255,255,255,0.62)" }}>
                This is not an initiative of convenience, but a global necessity to protect lives, strengthen resilience, and redefine how humanity responds to crisis."
              </p>
              {/* Bio credentials */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "UNGA80 & COP29 Speaker",
                  "UN OCHA — 24 Countries",
                  "Geospatial World Rising Star 2025",
                  "PhD — University of Salzburg",
                  "Top 20 Dynamic CEOs — Canada 2025",
                  "Author — Breaking Barriers, Building Dreams",
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: P }} />
                    {c}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row flex-wrap gap-3" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                <motion.a href="https://www.linkedin.com/in/sapiens-ndatabaye-227425165" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white" style={{ background: P }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>Connect on LinkedIn ↗</motion.a>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/contact" className="inline-flex items-center gap-2 border text-white text-sm font-black px-5 py-2.5 rounded-xl hover:border-white transition-colors"
                    style={{ borderColor: "rgba(255,255,255,0.30)" }}>Contact WDC</Link>
                </motion.div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CHAPTER 06 — WHAT IS NEXT
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <Chapter n={6} label="What Is Next" light />
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: T1 }}>
              The Next Chapter of <span style={{ color: P }}>WDC.</span>
            </h2>
            <p className="text-base max-w-xl mb-14" style={{ color: T2 }}>
              The foundation is built. 142 countries. 138 governments. $9.2M raised. Now we scale.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ROADMAP.map((r, i) => (
              <motion.div key={r.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="bg-white rounded-2xl border p-7 flex gap-5 group hover:shadow-lg transition-all duration-300"
                style={{ borderColor: "#E2E8F0" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${r.color}15` }}>
                  <r.Icon size={22} style={{ color: r.color }} />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-2" style={{ color: T1 }}>{r.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T2 }}>{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: D }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(0,12,35,0.96) 0%, rgba(0,28,58,0.92) 100%)" }} />
        <div className="container relative z-10 text-center">
          <AnimateIn variant="fadeUp">
            <p className="text-xs font-black tracking-widest uppercase mb-5" style={{ color: P }}>Be Part of the Story</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6 max-w-3xl mx-auto" style={{ color: W }}>
              "We are dedicated to transforming{" "}
              <span style={{ color: P }}>challenges into opportunities</span>{" "}
              — for everyone, everywhere."
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">
              <Link to="/campaigns" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-85" style={{ background: P }}>
                See Our Campaigns <ArrowRight size={15} />
              </Link>
              <Link to="/careers" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-black border transition-all hover:border-white" style={{ color: W, borderColor: "rgba(255,255,255,0.25)" }}>
                Join the Team <ArrowRight size={15} />
              </Link>
              <Link to="/donate" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-black transition-all"
                style={{ color: P, background: "rgba(0,158,219,0.12)", border: "1px solid rgba(0,158,219,0.3)" }}>
                Support WDC <ArrowRight size={15} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOLLOW
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 sm:py-10" style={{ background: P }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6 flex-wrap">
          <AnimateIn variant="fadeLeft">
            <p className="text-white font-black text-xl">Follow World Disaster Center</p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.75)" }}>Stay updated on missions, intelligence, and disaster news worldwide.</p>
          </AnimateIn>
          <div className="flex flex-wrap items-center gap-3">
            {SOCIALS.map(({ href, label, icon }, i) => (
              <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-white text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-wider"
                style={{ background: "rgba(255,255,255,0.15)" }}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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
