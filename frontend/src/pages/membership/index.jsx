import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Users, Calendar, Globe, MessageSquare, Mail, ArrowRight,
  CheckCircle2, Clock, Award, ExternalLink, Download, Send,
  Hash, Play, Search, Heart, ThumbsUp, Lightbulb, Share2,
  Bookmark, MoreHorizontal, ChevronLeft, ChevronRight, Star,
  FileText, Video, Layers, MapPin, Bell, AlertCircle,
  Activity, Shield, TrendingUp,
} from "lucide-react";

// ── theme — exact values from sada-green-portal globals.css ───────────────────
const T = {
  bg:       "#F5F5F7",               // Apple systemGroupedBackground
  surface:  "#FFFFFF",               // Apple systemBackground (cards)
  border:   "rgba(60,60,67,.22)",    // Apple separator
  fg:       "#1D1D1F",               // Apple label
  muted:    "rgba(29,29,31,.60)",    // Apple secondaryLabel
  blue:     "#009EDB",               // WDC / UNOCHA blue
  navy:     "#001129",
  darkBlue: "#0072BC",
  shadowSm: "0 1px 2px rgba(0,0,0,.06), 0 0 0 0.5px rgba(0,0,0,.06)",
  shadow:   "0 2px 8px rgba(0,0,0,.08), 0 0 0 0.5px rgba(0,0,0,.05)",
  shadowMd: "0 4px 16px rgba(0,0,0,.10), 0 0 0 0.5px rgba(0,0,0,.05)",
  shadowLg: "0 8px 30px rgba(0,0,0,.12), 0 0 0 0.5px rgba(0,0,0,.04)",
};

// ── real team photos ──────────────────────────────────────────────────────────
import ruthImg    from "../../assets/team/Ruth.png";
import zainabImg  from "../../assets/team/Zainab.png";
import sapiensImg from "../../assets/team/sapiens.png";
import davidImg   from "../../assets/team/DavidKabanga.png";
import jamesImg   from "../../assets/team/JamesMbogo.png";
import anselmeImg from "../../assets/team/AnselmeKonan.png";

// ── images ────────────────────────────────────────────────────────────────────
const IMG = {
  slide1: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=900&q=75",
  slide2: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=900&q=75",
  slide3: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=75",
  ev1:    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=70",
  ev2:    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=70",
  ev3:    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=70",
  ev4:    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=70",
  post1:  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=70",
  post2:  "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=500&q=70",
  nl1:    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=70",
  nl2:    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=70",
  nl3:    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=70",
  nl4:    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=70",
  nl5:    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=70",
  nl6:    "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=400&q=70",
};

// ── slides ────────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    title: "Build the World's Early Warning Backbone",
    desc:  "Communities hit by floods, droughts, earthquakes, and cyclones often have zero advance warning. Disaster Heroes design, deploy, and maintain multi-hazard monitoring systems that give families hours — sometimes days — of lead time to reach safety. No other global peer network exists for this work. WDC built it.",
    cta:   "Join the Heroes",
    img:   IMG.slide1,
    accent: T.blue,
    quote: { text: "The Gates Foundation has proven it through Malaria. And The World Disaster Center is doing it as well to tackle the remaining disasters.", author: "Ramesh Rajasingham", role: "Humanitarian Leader", img: null },
  },
  {
    title: "Coordinate When It Matters Most",
    desc:  "When disaster strikes, the first 72 hours are decisive. WDC Heroes are the practitioners on the ground running needs assessments, coordinating UN clusters, and ensuring humanitarian actors have the situational data they need to act. Our community trains together so we can deploy together, fast.",
    cta:   "See how we respond",
    img:   IMG.slide2,
    accent: "#E05F1A",
    quote: { text: "The World Disaster Center's approach to coordinating disaster intelligence and making it actionable for responders is a genuine contribution to the humanitarian ecosystem.", author: "Joyce Msuya", role: "Humanitarian Leader · UN", img: null },
  },
  {
    title: "Turn Field Knowledge Into Global Standards",
    desc:  "Field practitioners across 135 countries generate invaluable knowledge — and most of it disappears into field reports nobody reads. WDC Heroes share, validate, and codify what works: from flood-hardening infrastructure to post-earthquake livelihoods. Your local lesson becomes a global standard.",
    cta:   "Explore the community",
    img:   IMG.slide3,
    accent: "#16A34A",
    quote: { text: "The approach WDC is taking for real-time monitoring and AI-driven alerts is exactly what the humanitarian sector needs to move faster.", author: "Moustapha Fall", role: "UN OCHA", img: null },
  },
];

// ── problem + scope ───────────────────────────────────────────────────────────
const SCOPE_FACTORS = [
  { num: "01", title: "No global peer network", desc: "Disaster practitioners — early warning engineers, field coordinators, GIS analysts — work in silos. No continent-spanning peer mechanism exists for knowledge-sharing across hazard types and response cycles." },
  { num: "02", title: "Active crisis window", desc: "34 active disaster situations. 135 countries with open humanitarian operations. WDC Heroes community outputs — frameworks, tools, assessments — can directly influence response quality this year." },
  { num: "03", title: "Largest knowledge gap in humanitarian tech", desc: "Less than 8% of field-tested disaster response methodologies are ever formalised or shared across organisations. WDC Heroes closes that gap by design." },
  { num: "04", title: "Partner readiness", desc: "OCHA, UNDP, ESA, UNDRR, and WMO have frameworks and datasets ready. The Disaster Heroes community contextualises global tools for field realities — reducing duplication and accelerating adoption." },
];

const LAUNCH_STEPS = [
  {
    step: "Step 1", label: "Apply & Get Accepted", period: "Rolling applications — response within 7 days", accent: T.blue,
    items: [
      "Fill your profile: skills, availability per week, exact location, photo",
      "Tell us why you want to serve your community and the world",
      "WDC reviews your profile in 5–7 business days",
      "Accepted Heroes get onboarding credentials and community access",
    ],
  },
  {
    step: "Step 2", label: "Access Everything, Free", period: "From day one of acceptance", accent: "#0072BC",
    items: [
      "Training on Google, Coursera, LinkedIn Learning — fully covered",
      "Access to laptops and work equipment for your mission",
      "University credits earned through WDC programme participation",
      "Mentoring by leading disaster professionals worldwide",
      "Free access to Michael — AI field assistant for disaster practitioners",
      "WDC certifications in your domain, recognised globally",
      "Priority invitations to the WDC Global Summit and regional events",
    ],
  },
];

// ── community ─────────────────────────────────────────────────────────────────
const PROFILE_IMGS = {
  "Ruth Ndegwa":       ruthImg,
  "Zainab Akhtar":     zainabImg,
  "Sapiens Ndatabaye": sapiensImg,
  "David Kabanga":     davidImg,
  "James Mbogo":       jamesImg,
  "Anselme Konan":     anselmeImg,
};

const CHANNELS = [
  { id: "flood-wash",       label: "flood-wash",       members: 156 },
  { id: "earthquake-geo",   label: "earthquake-geo",   members: 134 },
  { id: "cyclone-climate",  label: "cyclone-climate",  members: 112 },
  { id: "wildfire-heat",    label: "wildfire-heat",    members:  89 },
  { id: "coordination",     label: "coordination",     members: 201 },
  { id: "tech-gis",         label: "tech-gis",         members: 143 },
  { id: "announcements",    label: "announcements",    members: 1840 },
  { id: "general",          label: "general",          members: 1840 },
];

const POSTS = [
  {
    id: "p1", author: "Ruth Ndegwa", org: "WDC · Forecast Lead",   role: "Forecast Lead",  pillar: "P1",
    time: "2h ago",
    text: "Just finished a post-flood WASH assessment in the Saint-Louis region. Key finding: 60% of boreholes contaminated within 500m of overflow zones. Sharing the full field methodology — happy to answer questions from anyone running similar assessments. #flood-wash #WASH #West-Africa",
    image: IMG.post1, doc: null,
    reactions: { "👍": 41, "❤️": 14, "💡": 22, "🎉": 8 }, comments: 17, pinned: true,
  },
  {
    id: "p2", author: "Zainab Akhtar", org: "WDC · Co-Founder & CSO", role: "GIS & Remote Sensing", pillar: "P2",
    time: "5h ago",
    text: "Tested Copernicus EMS rapid mapping on the Miyazaki landslide event. Concordance with field ground-truth data: 87% — strong enough for initial response prioritisation. Sharing the comparison methodology. Anyone else running this validation workflow?",
    image: null,
    doc: { name: "Copernicus_EMS_Validation_Miyazaki_2026.pdf", size: "3.1 MB", pages: 22 },
    reactions: { "👍": 67, "❤️": 21, "💡": 44, "🎉": 9 }, comments: 23, pinned: false,
  },
  {
    id: "p3", author: "Sapiens Ndatabaye", org: "WDC · Co-Founder & CEO", role: "Executive Director", pillar: "P3",
    time: "1d ago",
    text: "Hosting a 30-min session this Wednesday on cluster coordination gaps — drawn from field work across DRC, Burundi, Haiti, Jamaica, and Afghanistan. No slides, just open discussion. Join link in the Events tab. All time zones welcome. #coordination #cluster #field",
    image: IMG.post2, doc: null,
    reactions: { "👍": 89, "❤️": 32, "💡": 27, "🎉": 19 }, comments: 41, pinned: false,
  },
  {
    id: "p4", author: "David Kabanga", org: "WDC · CTO", role: "Chief Technology Officer", pillar: "P4",
    time: "2d ago",
    text: "Updated framework on community-led recovery monitoring across 8 southern African countries. Key finding: community-owned post-disaster tracking reduces recovery timeline by ~23% vs. externally managed assessments. Full methodology below. #recovery #resilience #Southern-Africa",
    image: null,
    doc: { name: "Community_Recovery_Monitoring_Framework_2026.pdf", size: "4.8 MB", pages: 38 },
    reactions: { "👍": 78, "❤️": 34, "💡": 55, "🎉": 16 }, comments: 29, pinned: false,
  },
];

const COMMENTS_MAP = {
  p1: [
    { author: "James Mbogo",    pillar: "P1", text: "We ran a similar assessment in the Niger Delta — the 500m contamination radius matches our findings exactly. Happy to share the borehole testing protocol we used.", time: "1h ago" },
    { author: "Anselme Konan",  pillar: "P2", text: "Ruth, can you share the rapid turbidity test kit you're using in the field? We're equipping a new WASH team for the rainy season.", time: "45m ago" },
  ],
  p3: [
    { author: "David Kabanga", pillar: "P4", text: "I'll be there, Sapiens. Cluster gaps in recovery phase are something I'd like to discuss — specifically handover timing from emergency to recovery clusters.", time: "20h ago" },
  ],
};

// ── events ────────────────────────────────────────────────────────────────────
const EVENTS = [
  { id: 1, img: IMG.ev1, title: "WDC Global Disaster Forum 2026",          date: "14–16 Oct 2026", time: "09:00 UTC", location: "Geneva + Online", format: "Global Forum",  enrolled: 847,  capacity: 1200, desc: "Our flagship annual event. 1,200+ disaster professionals, 60+ sessions, 3 days of knowledge exchange at the intersection of humanitarian action and technology.",    tags: ["Flagship","All Hazards","Global"],    upcoming: true  },
  { id: 2, img: IMG.ev2, title: "AI in Early Warning: Promise and Limits", date: "20 Aug 2026",    time: "14:00 UTC", location: "Online",          format: "Webinar",       enrolled: 412,  capacity: 500,  desc: "Deep-dive on where AI forecasting genuinely improves lead times — and where it still fails field responders.",                                                          tags: ["AI","Early Warning","Tech"],         upcoming: true  },
  { id: 3, img: IMG.ev3, title: "Urban Flood Mapping — Kampala Module",    date: "3–5 Sep 2026",   time: "08:00 UTC", location: "Kampala, Uganda", format: "Field Session", enrolled: 24,   capacity: 30,   desc: "Hands-on 3-day field training using drone surveys, community mapping, and QGIS to build flood inundation models.",                                                   tags: ["GIS","Flood","Field"],               upcoming: true  },
  { id: 4, img: IMG.ev4, title: "Cluster Coordination Essentials",         date: "10 Sep 2026",    time: "09:00 UTC", location: "Nairobi + Online",format: "Workshop",      enrolled: 156,  capacity: 200,  desc: "A practical half-day covering OCHA cluster mechanics, inter-agency coordination, and SITREP writing for field practitioners.",                                        tags: ["Coordination","OCHA","Response"],    upcoming: true  },
  { id: 5, img: IMG.ev1, title: "Cyclone Season Prep — Pacific Briefing",  date: "5 Aug 2026",     time: "11:00 UTC", location: "Online",          format: "Webinar",       enrolled: 203,  capacity: 400,  desc: "Preparedness briefing for the 2026–27 Pacific cyclone season with National Met Services and OCHA ROAP.",                                                              tags: ["Cyclone","Pacific","Preparedness"],  upcoming: false, recording: true,  report: false, attended: 203, rating: 4.7 },
  { id: 6, img: IMG.ev2, title: "Satellite Damage Assessment Workshop",    date: "22 Jul 2026",    time: "13:00 UTC", location: "Online",          format: "Workshop",      enrolled: 88,   capacity: 120,  desc: "Hands-on session with Copernicus EMS and ESA Sentinel imagery for rapid post-disaster damage mapping.",                                                              tags: ["Remote Sensing","Damage","Tech"],    upcoming: false, recording: true,  report: true,  attended: 88,  rating: 4.8 },
  { id: 7, img: IMG.ev3, title: "Recovery Monitoring: Southern Africa",    date: "8 Jul 2026",     time: "10:00 UTC", location: "Online",          format: "Peer Exchange", enrolled: 62,   capacity: 80,   desc: "Cross-country sharing on community-led recovery monitoring — methods, indicators, and what actually works.",                                                          tags: ["Recovery","Africa","Community"],     upcoming: false, recording: true,  report: true,  attended: 62,  rating: 4.6 },
];

const FORMAT_COLORS = { "Global Forum": T.blue, "Webinar": T.darkBlue, "Field Session": "#16A34A", "Workshop": "#7C3AED", "Peer Exchange": "#0D9488" };

// ── newsletters ───────────────────────────────────────────────────────────────
const NEWSLETTERS = [
  { issue: 8, month: "August 2026",   topic: "Early Warning",    title: "AI Forecasting in 2026: What Works, What Doesn't",          excerpt: "Honest review of where AI models improve warning lead times — and where they still fail the field. Six Heroes share their verdict.",           img: IMG.nl1, color: T.blue,     featured: true,  readTime: "8 min" },
  { issue: 7, month: "July 2026",     topic: "Events Recap",     title: "July Sessions: Satellite Tools and Recovery Monitoring",    excerpt: "Key takeaways from our Copernicus EMS workshop and the Southern Africa recovery monitoring peer exchange.",                                 img: IMG.nl2, color: "#0D9488",  featured: false, readTime: "5 min" },
  { issue: 6, month: "June 2026",     topic: "Field Insights",   title: "The Flood WASH Gap: Field Evidence from 4 Countries",      excerpt: "What our Heroes found when they compared borehole contamination data across Bangladesh, Senegal, Nigeria, and Uganda.",                   img: IMG.nl3, color: "#7C3AED",  featured: false, readTime: "7 min" },
  { issue: 5, month: "May 2026",      topic: "Research",         title: "Community Recovery: A Continental Benchmark",               excerpt: "First pan-African study on community-led vs. externally managed recovery — 8 countries, 62 disaster sites, 3 years of data.",            img: IMG.nl4, color: T.darkBlue, featured: false, readTime: "10 min" },
  { issue: 4, month: "April 2026",    topic: "Field Insights",   title: "Cyclone Preparedness: Three Countries, Three Models",       excerpt: "How Mozambique, Vanuatu, and the Philippines approach cyclone preparedness differently — and what each can learn from the others.",       img: IMG.nl5, color: "#DC6B19",  featured: false, readTime: "6 min" },
  { issue: 3, month: "March 2026",    topic: "Community",        title: "Hero Spotlight: Field Lessons from 5 Years in the Sahel",  excerpt: "David Kabanga on drought response, the limits of satellite data, and why community trust matters more than any tool.",                   img: IMG.nl6, color: "#BE185D",  featured: false, readTime: "9 min" },
];

const NL_TOPICS = ["All", "Early Warning", "Field Insights", "Research", "Events Recap", "Community"];

// ── helpers ───────────────────────────────────────────────────────────────────
function initials(name) { return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(); }

function Avatar({ name, size = 36 }) {
  const src = PROFILE_IMGS[name];
  if (src) {
    return (
      <img src={src} alt={name} loading="lazy"
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
                 border: `2px solid ${T.blue}55`, boxShadow: `0 0 0 2px ${T.blue}22`, display: "block" }} />
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg, ${T.blue}, ${T.darkBlue})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: size * 0.3, fontWeight: 700, color: "#fff", flexShrink: 0,
                  border: "2px solid #fff", boxShadow: `0 0 0 2px ${T.blue}33` }}>
      {initials(name)}
    </div>
  );
}

function QuoteAvatar({ name, img, accent }) {
  return (
    <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,${accent},${accent}88)`,
                  position: "relative", overflow: "hidden", flexShrink: 0,
                  border: `2px solid ${accent}66`, boxShadow: `0 0 0 3px ${accent}18` }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, fontWeight: 800, color: "#fff" }}>
        {name.split(" ").map(w => w[0]).join("").slice(0, 2)}
      </div>
      {img && (
        <img src={img} alt={name} loading="lazy"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.currentTarget.style.display = "none"; }} />
      )}
    </div>
  );
}

function AnimatedDesc({ text, slideKey }) {
  const words = text.split(" ");
  return (
    <p style={{ fontSize: 15, lineHeight: 1.85, color: T.fg, margin: 0, fontWeight: 400 }}>
      {words.map((word, i) => (
        <span key={`${slideKey}-${i}`} style={{
          display: "inline-block", marginRight: "0.28em",
          opacity: 0, animation: "wordReveal 0.65s cubic-bezier(0.16,1,0.3,1) forwards",
          animationDelay: `${i * 0.045}s`,
        }}>
          {word}
        </span>
      ))}
    </p>
  );
}

function SlideToJoin() {
  const [offset, setOffset]     = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone]         = useState(false);
  const containerRef             = useRef(null);
  const startX                   = useRef(0);
  const THUMB = 56, PAD = 4;

  function maxOffset() { return (containerRef.current?.offsetWidth ?? 320) - THUMB - PAD * 2; }
  function onStart(x) { setDragging(true); startX.current = x - offset; }
  function onMove(x) { if (!dragging) return; setOffset(Math.min(Math.max(0, x - startX.current), maxOffset())); }
  function onEnd() {
    if (!dragging) return;
    setDragging(false);
    if (offset >= maxOffset() * 0.78) { setOffset(maxOffset()); setDone(true); }
    else setOffset(0);
  }

  return (
    <div ref={containerRef}
      style={{ position: "relative", height: 66, borderRadius: 33,
               background: done ? T.blue : `linear-gradient(90deg,${T.blue},${T.darkBlue})`,
               overflow: "hidden", userSelect: "none", touchAction: "none", width: "100%", maxWidth: 340, cursor: "default" }}
      onMouseMove={e => onMove(e.clientX)} onMouseUp={onEnd} onMouseLeave={onEnd}
      onTouchMove={e => { e.preventDefault(); onMove(e.touches[0].clientX); }} onTouchEnd={onEnd}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: done ? "#fff" : "rgba(255,255,255,.55)",
                       letterSpacing: "0.04em", transition: "color .4s", paddingLeft: done ? 0 : THUMB / 2 }}>
          {done ? "Welcome, Hero 🌍" : "Slide to join →"}
        </span>
      </div>
      <div
        style={{ position: "absolute", left: PAD + offset, top: PAD, width: THUMB, height: THUMB, borderRadius: "50%",
                 background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                 cursor: dragging ? "grabbing" : "grab", boxShadow: "0 4px 20px rgba(0,0,0,.22)",
                 transition: dragging ? "none" : "left .4s cubic-bezier(.22,1,.36,1)", zIndex: 2 }}
        onMouseDown={e => onStart(e.clientX)} onTouchStart={e => onStart(e.touches[0].clientX)}>
        {done
          ? <CheckCircle2 size={24} style={{ color: T.blue }} />
          : <ChevronRight size={24} style={{ color: T.blue, animation: "thumbPulse 1.8s ease-in-out infinite" }} />
        }
      </div>
    </div>
  );
}

function HeroBadge() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 24,
                  background: `rgba(0,158,219,.1)`, border: `1px solid rgba(0,158,219,.3)` }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.blue, display: "block",
                     animation: "badgePulse 2s ease-in-out infinite" }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: T.blue }}>Disaster Hero</span>
      <Award size={14} style={{ color: T.blue }} />
    </div>
  );
}

function Stars({ rating }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={10} fill={i <= Math.round(rating) ? "#f59e0b" : "none"} stroke={i <= Math.round(rating) ? "#f59e0b" : T.border} />
      ))}
      <span style={{ fontSize: 11, color: T.muted, marginLeft: 3 }}>{rating}</span>
    </span>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function DisasterHeroesPage() {
  const [tab, setTab]                     = useState("overview");
  const [slide, setSlide]                 = useState(0);
  const [activeChannel, setActiveChannel] = useState("coordination");
  const [msgText, setMsgText]             = useState("");
  const [reactions, setReactions]         = useState({});
  const [openComments, setOpenComments]   = useState({});
  const [evFilter, setEvFilter]           = useState("all");
  const [evSearch, setEvSearch]           = useState("");
  const [nlSearch, setNlSearch]           = useState("");
  const [nlFilter, setNlFilter]           = useState("All");
  const [email, setEmail]                 = useState("");
  const [subscribed, setSubscribed]       = useState(false);
  const [savedNl, setSavedNl]             = useState({});

  useEffect(() => {
    if (tab !== "overview") return;
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [tab]);

  function handleReact(postId, emoji) {
    setReactions(prev => {
      const cur = prev[postId]?.[emoji] ?? 0;
      return { ...prev, [postId]: { ...(prev[postId] ?? {}), [emoji]: cur > 0 ? 0 : 1 } };
    });
  }

  const filteredEv = EVENTS.filter(ev =>
    (evFilter === "all" || (evFilter === "upcoming" && ev.upcoming) || (evFilter === "past" && !ev.upcoming)) &&
    (evSearch === "" || ev.title.toLowerCase().includes(evSearch.toLowerCase()))
  );

  const filteredNl = NEWSLETTERS.filter(n =>
    (nlFilter === "All" || n.topic === nlFilter) &&
    (nlSearch === "" || n.title.toLowerCase().includes(nlSearch.toLowerCase()) || n.excerpt.toLowerCase().includes(nlSearch.toLowerCase()))
  );

  const TABS = [
    { id: "overview",     label: "Overview",     icon: <Globe size={14} /> },
    { id: "community",    label: "Community",    icon: <MessageSquare size={14} /> },
    { id: "events",       label: "Events",       icon: <Calendar size={14} /> },
    { id: "newsletters",  label: "Newsletters",  icon: <Mail size={14} /> },
  ];

  return (
    <>
      <Helmet>
        <title>Disaster Heroes | World Disaster Center</title>
        <meta name="description" content="Join WDC Disaster Heroes — a global community of 1,840+ disaster practitioners working on early warning, rapid response, and recovery across 72 countries. Apply today." />
        <link rel="canonical" href="https://worlddisastercenter.org/membership" />
        <meta property="og:title" content="WDC Disaster Heroes — Join the Global Community" />
        <meta property="og:description" content="Apply to join 1,840+ disaster professionals across 72 countries working to save lives and build resilience." />
      </Helmet>

      <div style={{ background: T.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 0 80px", fontFamily: '-apple-system, BlinkMacSystemFont, "Geist", "Helvetica Neue", system-ui, sans-serif' }}>

        <style>{`
          @keyframes tabFadeUp  { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
          @keyframes wordReveal { from { opacity:0; transform:translateY(10px) scale(.96); filter:blur(6px); } to { opacity:1; transform:translateY(0) scale(1); filter:blur(0); } }
          @keyframes thumbPulse { 0%,100% { transform:translateX(0); } 50% { transform:translateX(4px); } }
          @keyframes badgePulse { 0%,100% { opacity:1; } 50% { opacity:.4; } }
          .tab-panel  { animation: tabFadeUp .28s cubic-bezier(.22,1,.36,1) forwards; }
          .brief-card { transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s ease; }
          .brief-card:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(0,0,0,.12), 0 0 0 0.5px rgba(0,0,0,.04); }
        `}</style>

        {/* ── page header ─────────────────────────────────────────────────── */}
        <motion.div
          style={{ padding: "24px 24px 0" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <Shield size={15} style={{ color: T.blue }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, letterSpacing: "0.1em", textTransform: "uppercase" }}>WDC · Disaster Heroes Community</span>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", color: T.fg, margin: 0 }}>Disaster Heroes</h1>
              <p style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>1,840 Heroes · 135 countries · 3 focus areas</p>
            </div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/disaster-heroes/apply"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10,
                         background: T.blue, color: "#fff", fontWeight: 700, fontSize: 13, textDecoration: "none",
                         boxShadow: `0 4px 12px rgba(0,158,219,.3)` }}>
                Apply to Join <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

          {/* stat chips */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {[
              { label: "Heroes",       value: "1,840", icon: <Users size={15} />,      color: T.blue },
              { label: "Countries",    value: "135",   icon: <Globe size={15} />,      color: T.darkBlue },
              { label: "Focus Areas",  value: "3",     icon: <Layers size={15} />,     color: "#7C3AED" },
              { label: "Applications", value: "112",   icon: <CheckCircle2 size={15}/>,color: "#DC6B19" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                style={{ borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
                                          background: T.surface, boxShadow: T.shadow }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                              background: s.color + "15", color: s.color, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: T.fg, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── tab bar ─────────────────────────────────────────────────────── */}
        <div className="sticky top-[6.5rem] lg:top-[7rem]"
          style={{ zIndex: 20, background: T.surface, borderBottom: `1px solid ${T.border}`,
                   padding: "0 24px", display: "flex", alignItems: "center", gap: 2,
                   backdropFilter: "blur(8px)", marginTop: 20,
                   boxShadow: "0 1px 0 rgba(60,60,67,.12)" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "14px 18px",
                       fontSize: 13, fontWeight: 600, cursor: "pointer", background: "none", border: "none",
                       borderBottom: tab === t.id ? `2px solid ${T.blue}` : "2px solid transparent",
                       color: tab === t.id ? T.blue : T.muted, transition: "color .15s, border-color .15s", marginBottom: -1 }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "32px 24px 0" }}>

          {/* ════════════════ OVERVIEW ════════════════ */}
          {tab === "overview" && (
            <div key="overview" className="tab-panel" style={{ display: "flex", flexDirection: "column", gap: 48 }}>

              {/* carousel */}
              <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: 440,
                            boxShadow: "0 20px 60px rgba(0,0,0,.15)" }}>
                {SLIDES.map((s, i) => (
                  <div key={i} style={{ position: "absolute", inset: 0, transition: "opacity .7s ease, transform .7s ease",
                                        opacity: slide === i ? 1 : 0, transform: slide === i ? "scale(1)" : "scale(1.02)",
                                        pointerEvents: slide === i ? "auto" : "none" }}>
                    <img src={s.img} alt={s.title} loading={i === 0 ? "eager" : "lazy"}
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,.82) 0%,rgba(0,0,0,.45) 55%,rgba(0,0,0,.1) 100%)" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                                  justifyContent: "center", padding: "48px 56px" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px",
                                    borderRadius: 100, background: s.accent + "33", border: `1px solid ${s.accent}55`,
                                    marginBottom: 18, width: "fit-content" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.accent, display: "block" }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: s.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          Focus {i + 1} of 3
                        </span>
                      </div>
                      <h2 style={{ fontSize: "clamp(20px,2.8vw,34px)", fontWeight: 800, color: "#fff",
                                   lineHeight: 1.2, letterSpacing: "-0.02em", maxWidth: 540, marginBottom: 28 }}>
                        {s.title}
                      </h2>
                      <Link to="/disaster-heroes/apply"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px",
                                 borderRadius: 10, background: s.accent, color: "#fff", fontWeight: 700, fontSize: 14,
                                 textDecoration: "none", width: "fit-content", boxShadow: `0 4px 20px ${s.accent}55` }}>
                        {s.cta} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
                <button onClick={() => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length)}
                  style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                           width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.15)",
                           backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.2)",
                           display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", zIndex: 5 }}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => setSlide(s => (s + 1) % SLIDES.length)}
                  style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                           width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.15)",
                           backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,.2)",
                           display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", zIndex: 5 }}>
                  <ChevronRight size={18} />
                </button>
                <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
                              display: "flex", gap: 8, zIndex: 5 }}>
                  {SLIDES.map((_, i) => (
                    <button key={i} onClick={() => setSlide(i)}
                      style={{ width: slide === i ? 24 : 8, height: 8, borderRadius: 4,
                               background: slide === i ? "#fff" : "rgba(255,255,255,.4)",
                               border: "none", cursor: "pointer", transition: "all .3s ease" }} />
                  ))}
                </div>
              </div>

              {/* animated description + quote */}
              <div style={{ borderRadius: 20, overflow: "hidden", background: T.surface, boxShadow: T.shadow }}>
                <div style={{ height: 3, background: `linear-gradient(90deg,${SLIDES[slide].accent},${SLIDES[slide].accent}44)`,
                              transition: "background .5s ease" }} />
                <div style={{ padding: "32px 36px 28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: SLIDES[slide].accent,
                                   display: "block", flexShrink: 0 }} />
                    <span style={{ fontSize: 10, fontWeight: 800, color: SLIDES[slide].accent,
                                   textTransform: "uppercase", letterSpacing: "0.16em" }}>
                      Focus {slide + 1} of 3
                    </span>
                  </div>
                  <AnimatedDesc key={slide} text={SLIDES[slide].desc} slideKey={slide} />
                </div>
                <div style={{ padding: "20px 36px 26px", borderTop: `1px solid ${T.border}`, background: T.bg,
                              display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: 40, lineHeight: 1, color: SLIDES[slide].accent, opacity: 0.3,
                                fontFamily: "Georgia,serif", flexShrink: 0, marginTop: -8 }}>&ldquo;</div>
                  <p style={{ fontSize: 13, fontStyle: "italic", color: T.muted, lineHeight: 1.7, margin: 0, flex: 1 }}>
                    {SLIDES[slide].quote.text}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                    <QuoteAvatar name={SLIDES[slide].quote.author} img={SLIDES[slide].quote.img} accent={SLIDES[slide].accent} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.fg }}>{SLIDES[slide].quote.author}</div>
                      <div style={{ fontSize: 11, color: T.muted }}>{SLIDES[slide].quote.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* the problem */}
              <div className="brief-card" style={{ borderRadius: 20, padding: "32px 36px", background: T.surface,
                                                   boxShadow: T.shadow, borderLeft: "4px solid #DC2626" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <AlertCircle size={16} style={{ color: "#DC2626" }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.14em" }}>The Problem</span>
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: T.fg, margin: "0 0 24px", fontWeight: 400 }}>
                  Disaster practitioners — field coordinators, early warning engineers, GIS analysts, recovery specialists — work in silos. No global peer network exists for knowledge-sharing across hazard types, response cycles, and regions. Experts in Bangladesh re-invent what experts in Mozambique already know. That gap costs lives.
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    "UN clusters exist for operations",
                    "Academic journals exist for research",
                    "No peer community for field practitioners — until now",
                  ].map((t, i) => (
                    <span key={i} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 100,
                                           background: i === 2 ? `rgba(0,158,219,.1)` : "rgba(0,0,0,.04)",
                                           border: i === 2 ? `1px solid rgba(0,158,219,.25)` : `1px solid ${T.border}`,
                                           color: i === 2 ? T.blue : T.muted, fontWeight: i === 2 ? 600 : 400 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* why this community — 4 factors */}
              <div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Activity size={15} style={{ color: T.blue }} />
                    <span style={{ fontSize: 11, fontWeight: 800, color: T.blue, textTransform: "uppercase", letterSpacing: "0.14em" }}>Why It Matters Now</span>
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: T.fg, letterSpacing: "-0.02em", margin: 0 }}>
                    Four reasons the Disaster Heroes community is needed today
                  </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
                  {SCOPE_FACTORS.map(f => (
                    <div key={f.num} className="brief-card"
                      style={{ borderRadius: 16, padding: "22px 24px", background: T.surface,
                               boxShadow: T.shadowSm, display: "flex", gap: 18 }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: T.blue, opacity: 0.18, lineHeight: 1, flexShrink: 0 }}>
                        {f.num}
                      </div>
                      <div>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: T.fg, marginBottom: 8 }}>{f.title}</h3>
                        <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* how it works — 2 steps */}
              <div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Calendar size={15} style={{ color: T.blue }} />
                    <span style={{ fontSize: 11, fontWeight: 800, color: T.blue, textTransform: "uppercase", letterSpacing: "0.14em" }}>How It Works</span>
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: T.fg, letterSpacing: "-0.02em", margin: 0 }}>Apply once. Access everything.</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
                  {LAUNCH_STEPS.map((ls, idx) => (
                    <div key={ls.step} className="brief-card"
                      style={{ borderRadius: 16, overflow: "hidden", background: T.surface, boxShadow: T.shadowSm }}>
                      <div style={{ height: 4, background: ls.accent }} />
                      <div style={{ padding: "22px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: ls.accent,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 12, fontWeight: 900, color: "#fff", flexShrink: 0 }}>
                            {idx + 1}
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: T.fg }}>{ls.label}</div>
                            <div style={{ fontSize: 11, color: T.muted }}>{ls.period}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {ls.items.map(item => (
                            <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                              <CheckCircle2 size={13} style={{ color: ls.accent, marginTop: 2, flexShrink: 0 }} />
                              <span style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA with slide-to-join */}
              <div style={{ borderRadius: 20, padding: "40px 36px", background: `rgba(0,158,219,.05)`,
                            border: `1px solid rgba(0,158,219,.18)`, display: "flex", flexDirection: "column",
                            alignItems: "center", gap: 20, textAlign: "center" }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: T.fg, letterSpacing: "-0.02em", margin: 0 }}>
                  No practitioner should work in isolation. Join us.
                </h2>
                <p style={{ fontSize: 14, color: T.muted, maxWidth: 480, margin: 0, lineHeight: 1.65 }}>
                  Open to disaster professionals worldwide — field coordinators, GIS analysts, early warning engineers, recovery specialists. Apply, get accepted, and access everything.
                </p>
                <SlideToJoin />
                <p style={{ fontSize: 12, color: T.muted, margin: 0 }}>
                  Or email us at <a href="mailto:office@worlddisastercenter.org" style={{ color: T.blue }}>office@worlddisastercenter.org</a> — <Link to="/disaster-heroes/login" style={{ color: T.muted }}>member login</Link>
                </p>
              </div>

            </div>
          )}

          {/* ════════════════ COMMUNITY ════════════════ */}
          {tab === "community" && (
            <div key="community" className="tab-panel"
              style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>

              {/* sidebar */}
              <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: T.shadow,
                            background: T.surface, display: "flex", flexDirection: "column",
                            height: "fit-content", position: "sticky", top: "calc(6.5rem + 60px)" }}>
                <div style={{ padding: "16px 16px 10px", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Channels</span>
                </div>
                {CHANNELS.map(ch => (
                  <button key={ch.id} onClick={() => setActiveChannel(ch.id)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                             padding: "8px 16px",
                             background: activeChannel === ch.id ? `rgba(0,158,219,.07)` : "transparent",
                             borderLeft: activeChannel === ch.id ? `2px solid ${T.blue}` : "2px solid transparent",
                             border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <Hash size={11} style={{ color: activeChannel === ch.id ? T.blue : T.muted }} />
                      <span style={{ fontSize: 13, fontWeight: activeChannel === ch.id ? 600 : 400,
                                     color: activeChannel === ch.id ? T.fg : T.muted }}>
                        {ch.label}
                      </span>
                    </div>
                    <span style={{ fontSize: 10, color: T.muted }}>{ch.members}</span>
                  </button>
                ))}
                <div style={{ padding: "14px 16px", borderTop: `1px solid ${T.border}`, marginTop: "auto" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: T.muted, textTransform: "uppercase",
                               letterSpacing: "0.08em", marginBottom: 10 }}>Online now</p>
                  {[
                    { n: "Ruth Ndegwa" }, { n: "Zainab Akhtar" }, { n: "Sapiens Ndatabaye" }, { n: "David Kabanga" }
                  ].map((m, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ position: "relative" }}>
                        <Avatar name={m.n} size={26} />
                        <span style={{ position: "absolute", bottom: 0, right: 0, width: 8, height: 8, borderRadius: "50%",
                                       background: "#22C55E", border: "2px solid #f8fafc" }} />
                      </div>
                      <span style={{ fontSize: 11, color: T.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {m.n.split(" ")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* channel header */}
                <div style={{ borderRadius: 14, padding: "16px 20px", background: T.surface,
                              boxShadow: T.shadowSm, display: "flex", alignItems: "center", gap: 10 }}>
                  <Hash size={16} style={{ color: T.blue }} />
                  <span style={{ fontSize: 15, fontWeight: 700, color: T.fg }}>{activeChannel}</span>
                  <span style={{ fontSize: 12, color: T.muted }}>
                    · {CHANNELS.find(c => c.id === activeChannel)?.members} members
                  </span>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <button style={{ padding: "6px 14px", borderRadius: 8, background: `rgba(0,158,219,.08)`,
                                     border: `1px solid rgba(0,158,219,.2)`, color: T.blue,
                                     fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      + Invite
                    </button>
                    <Bell size={16} style={{ color: T.muted, cursor: "pointer" }} />
                  </div>
                </div>

                {/* compose */}
                <div style={{ borderRadius: 14, padding: "16px 20px", background: T.surface, boxShadow: T.shadowSm }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Avatar name="You" size={36} />
                    <div style={{ flex: 1 }}>
                      <textarea value={msgText} onChange={e => setMsgText(e.target.value)}
                        placeholder={`Share something with #${activeChannel}…`} rows={2}
                        style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10,
                                 padding: "10px 14px", fontSize: 13, color: T.fg, resize: "none", outline: "none", lineHeight: 1.5 }} />
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <div style={{ display: "flex", gap: 10 }}>
                          {[["Photo", <Video size={14} />], ["Document", <FileText size={14} />]].map(([l, ic]) => (
                            <button key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12,
                                                      color: T.muted, background: "none", border: "none", cursor: "pointer" }}>
                              {ic} {l}
                            </button>
                          ))}
                        </div>
                        <button onClick={() => setMsgText("")}
                          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 18px", borderRadius: 8,
                                   background: T.blue, border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          <Send size={13} /> Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* posts */}
                {POSTS.map(post => (
                  <div key={post.id}
                    style={{ borderRadius: 16, background: T.surface,
                             boxShadow: post.pinned ? `0 0 0 1.5px rgba(0,158,219,.25), ${T.shadow}` : T.shadow,
                             overflow: "hidden" }}>
                    {post.pinned && (
                      <div style={{ padding: "8px 20px", background: `rgba(0,158,219,.05)`,
                                    borderBottom: `1px solid rgba(0,158,219,.12)`,
                                    fontSize: 11, fontWeight: 600, color: T.blue,
                                    display: "flex", alignItems: "center", gap: 6 }}>
                        <Award size={11} /> Pinned Post
                      </div>
                    )}
                    <div style={{ padding: "18px 20px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                        <Avatar name={post.author} size={42} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: T.fg }}>{post.author}</div>
                          <div style={{ fontSize: 12, color: T.muted }}>{post.role} · {post.org}</div>
                          <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{post.time}</div>
                        </div>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: T.muted }}>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                      <p style={{ fontSize: 14, lineHeight: 1.6, color: T.fg, marginBottom: 14 }}>
                        {post.text.split(/(#\w[\w-]*)/).map((part, i) =>
                          part.startsWith("#")
                            ? <span key={i} style={{ color: T.blue, fontWeight: 500 }}>{part}</span>
                            : part
                        )}
                      </p>
                      {post.image && (
                        <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 14, height: 220, position: "relative" }}>
                          <img src={post.image} alt="post" loading="lazy"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      )}
                      {post.doc && (
                        <div style={{ borderRadius: 12, padding: "14px 16px", background: T.bg, border: `1px solid ${T.border}`,
                                      display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                          <div style={{ width: 40, height: 48, borderRadius: 6, background: "rgba(220,38,38,.08)",
                                        border: "1px solid rgba(220,38,38,.15)", display: "flex", alignItems: "center",
                                        justifyContent: "center", flexShrink: 0 }}>
                            <FileText size={18} style={{ color: "#DC2626" }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: T.fg, marginBottom: 2,
                                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {post.doc.name}
                            </div>
                            <div style={{ fontSize: 11, color: T.muted }}>{post.doc.pages} pages · {post.doc.size} · PDF</div>
                          </div>
                          <button style={{ padding: "6px 14px", borderRadius: 8, background: `rgba(0,158,219,.08)`,
                                           border: `1px solid rgba(0,158,219,.2)`, color: T.blue,
                                           fontSize: 12, fontWeight: 600, cursor: "pointer",
                                           display: "flex", alignItems: "center", gap: 5 }}>
                            <Download size={12} /> Download
                          </button>
                        </div>
                      )}
                      {/* reaction counts */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                                    paddingBottom: 12, borderBottom: `1px solid ${T.border}`, marginBottom: 10 }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          {Object.entries(post.reactions).map(([emoji, count]) => (
                            <span key={emoji} style={{ fontSize: 12, color: T.muted }}>
                              {emoji} {count + (reactions[post.id]?.[emoji] ?? 0)}
                            </span>
                          ))}
                        </div>
                        <button onClick={() => setOpenComments(p => ({ ...p, [post.id]: !p[post.id] }))}
                          style={{ fontSize: 12, color: T.muted, background: "none", border: "none", cursor: "pointer" }}>
                          {post.comments} comments
                        </button>
                      </div>
                      {/* action bar */}
                      <div style={{ display: "flex", gap: 4 }}>
                        {[
                          { icon: <ThumbsUp size={14} />, label: "Like",       emoji: "👍" },
                          { icon: <Heart size={14} />,    label: "Love",       emoji: "❤️" },
                          { icon: <Lightbulb size={14} />,label: "Insightful", emoji: "💡" },
                          { icon: <Share2 size={14} />,   label: "Share",      emoji: null },
                        ].map(a => (
                          <button key={a.label}
                            onClick={() => a.emoji && handleReact(post.id, a.emoji)}
                            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                                     gap: 6, padding: 8, borderRadius: 8, background: "none", border: "none",
                                     cursor: "pointer", fontSize: 12, fontWeight: 500, transition: "background .15s",
                                     color: reactions[post.id]?.[a.emoji] ? T.blue : T.muted }}
                            onMouseEnter={e => e.currentTarget.style.background = T.bg}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}>
                            {a.icon} {a.label}
                          </button>
                        ))}
                      </div>
                      {/* comments */}
                      {openComments[post.id] && (
                        <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.border}`,
                                      display: "flex", flexDirection: "column", gap: 12 }}>
                          {(COMMENTS_MAP[post.id] ?? []).map((c, i) => (
                            <div key={i} style={{ display: "flex", gap: 10 }}>
                              <Avatar name={c.author} size={30} />
                              <div style={{ flex: 1, background: T.bg, borderRadius: 10, padding: "10px 14px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                  <span style={{ fontSize: 12, fontWeight: 700, color: T.fg }}>{c.author}</span>
                                  <span style={{ fontSize: 11, color: T.muted }}>{c.time}</span>
                                </div>
                                <p style={{ fontSize: 13, color: T.fg, margin: 0, lineHeight: 1.5 }}>{c.text}</p>
                              </div>
                            </div>
                          ))}
                          <div style={{ display: "flex", gap: 10 }}>
                            <Avatar name="You" size={30} />
                            <input placeholder="Add a comment…"
                              style={{ flex: 1, padding: "9px 14px", borderRadius: 20, background: T.bg,
                                       border: `1px solid ${T.border}`, fontSize: 13, color: T.fg, outline: "none" }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════ EVENTS ════════════════ */}
          {tab === "events" && (
            <div key="events" className="tab-panel" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
                  <Search size={14} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.muted }} />
                  <input value={evSearch} onChange={e => setEvSearch(e.target.value)} placeholder="Search events…"
                    style={{ width: "100%", padding: "10px 14px 10px 38px", borderRadius: 10, background: T.surface,
                             border: `1px solid ${T.border}`, fontSize: 13, color: T.fg, outline: "none" }} />
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["all","upcoming","past"].map(f => (
                    <button key={f} onClick={() => setEvFilter(f)}
                      style={{ padding: "9px 16px", borderRadius: 8,
                               border: evFilter === f ? `1px solid rgba(0,158,219,.3)` : `1px solid ${T.border}`,
                               background: evFilter === f ? `rgba(0,158,219,.08)` : T.surface,
                               color: evFilter === f ? T.blue : T.muted,
                               fontSize: 13, fontWeight: evFilter === f ? 600 : 400,
                               cursor: "pointer", textTransform: "capitalize", transition: "all .15s" }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* featured hero */}
              {filteredEv.filter(e => e.upcoming)[0] && (
                <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: 320,
                              boxShadow: "0 12px 40px rgba(0,0,0,.12)" }}>
                  <img src={filteredEv.filter(e => e.upcoming)[0].img} alt="featured"
                    style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,.8) 0%,rgba(0,0,0,.4) 60%,transparent 100%)" }} />
                  <div style={{ position: "absolute", inset: 0, padding: "36px 40px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                      {[filteredEv.filter(e=>e.upcoming)[0].format, "Featured"].map((tag, i) => (
                        <span key={tag} style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 100,
                                                 background: i === 0 ? (FORMAT_COLORS[filteredEv.filter(e=>e.upcoming)[0].format]??T.blue)+"33" : "rgba(255,255,255,.15)",
                                                 color: i === 0 ? (FORMAT_COLORS[filteredEv.filter(e=>e.upcoming)[0].format]??T.blue) : "#fff",
                                                 border: i === 0 ? `1px solid ${(FORMAT_COLORS[filteredEv.filter(e=>e.upcoming)[0].format]??T.blue)}55` : "none",
                                                 textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10, maxWidth: 560 }}>
                      {filteredEv.filter(e=>e.upcoming)[0].title}
                    </h2>
                    <div style={{ display: "flex", gap: 20, fontSize: 13, color: "rgba(255,255,255,.7)", marginBottom: 20 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Calendar size={13} />{filteredEv.filter(e=>e.upcoming)[0].date} · {filteredEv.filter(e=>e.upcoming)[0].time}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <MapPin size={13} />{filteredEv.filter(e=>e.upcoming)[0].location}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Users size={13} />{filteredEv.filter(e=>e.upcoming)[0].enrolled}/{filteredEv.filter(e=>e.upcoming)[0].capacity} registered
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Link to="/disaster-heroes/apply"
                        style={{ padding: "10px 22px", borderRadius: 10, background: T.blue, color: "#fff",
                                 fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                        Register Now
                      </Link>
                      <button style={{ padding: "10px 20px", borderRadius: 10, background: "rgba(255,255,255,.12)",
                                       border: "1px solid rgba(255,255,255,.2)", color: "#fff", fontSize: 13,
                                       cursor: "pointer", backdropFilter: "blur(6px)" }}>
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* event grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                {filteredEv.slice(filteredEv.findIndex(e => e.upcoming) === 0 ? 1 : 0).map(ev => (
                  <div key={ev.id}
                    style={{ borderRadius: 16, overflow: "hidden", background: T.surface,
                             boxShadow: T.shadowSm, display: "flex", flexDirection: "column",
                             transition: "transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowMd; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = T.shadowSm; }}>
                    <div style={{ height: 160, position: "relative", flexShrink: 0 }}>
                      <img src={ev.img} alt={ev.title} loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.5),transparent)" }} />
                      <div style={{ position: "absolute", top: 12, left: 12 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100,
                                       background: (FORMAT_COLORS[ev.format]??T.blue)+"cc", color: "#fff",
                                       backdropFilter: "blur(4px)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {ev.format}
                        </span>
                      </div>
                      {!ev.upcoming && ev.recording && (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.9)",
                                        display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Play size={18} style={{ color: "#0d1117", marginLeft: 2 }} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                        {ev.tags.slice(0,2).map(t => (
                          <span key={t} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 100,
                                                  background: "rgba(0,0,0,.04)", color: T.muted, border: `1px solid ${T.border}` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: T.fg, lineHeight: 1.35, marginBottom: 8, flex: 1 }}>
                        {ev.title}
                      </h3>
                      <div style={{ fontSize: 11, color: T.muted, marginBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Calendar size={10} />{ev.date} · {ev.time}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><MapPin size={10} />{ev.location}</span>
                        {!ev.upcoming && ev.attended && (
                          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <Users size={10} />{ev.attended} attended · <Stars rating={ev.rating ?? 4.5} />
                          </span>
                        )}
                      </div>
                      {ev.upcoming ? (
                        <>
                          <div style={{ marginBottom: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.muted, marginBottom: 4 }}>
                              <span>{ev.enrolled} registered</span><span>{ev.capacity} max</span>
                            </div>
                            <div style={{ height: 3, borderRadius: 2, background: T.border }}>
                              <div style={{ height: "100%", borderRadius: 2, background: T.blue, width: `${ev.enrolled/ev.capacity*100}%` }} />
                            </div>
                          </div>
                          <Link to="/disaster-heroes/apply"
                            style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 8,
                                     borderRadius: 8, background: `rgba(0,158,219,.08)`, border: `1px solid rgba(0,158,219,.2)`,
                                     color: T.blue, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
                            Register
                          </Link>
                        </>
                      ) : (
                        <div style={{ display: "flex", gap: 8 }}>
                          {ev.recording && (
                            <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                                             gap: 5, padding: 7, borderRadius: 8, background: `rgba(0,158,219,.06)`,
                                             border: `1px solid rgba(0,158,219,.18)`, color: T.blue,
                                             fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                              <Play size={11} /> Watch
                            </button>
                          )}
                          {ev.report && (
                            <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                                             gap: 5, padding: 7, borderRadius: 8, background: "rgba(0,0,0,.04)",
                                             border: `1px solid ${T.border}`, color: T.muted, fontSize: 11, cursor: "pointer" }}>
                              <Download size={11} /> Report
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════ NEWSLETTERS ════════════════ */}
          {tab === "newsletters" && (
            <div key="newsletters" className="tab-panel" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

              {/* subscribe banner */}
              <div style={{ borderRadius: 20, padding: "32px 36px", background: `rgba(0,158,219,.05)`,
                            border: `1px solid rgba(0,158,219,.16)`, display: "flex", alignItems: "center",
                            justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: T.fg, marginBottom: 6 }}>Heroes Dispatch — Monthly Field Intelligence</h2>
                  <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>
                    Policy updates, field findings, community highlights, and deployment opportunities. No spam, unsubscribe anytime.
                  </p>
                </div>
                {subscribed ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: T.blue }}>
                    <CheckCircle2 size={18} /> You're subscribed!
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                      style={{ padding: "10px 14px", borderRadius: 10, background: T.bg, border: `1px solid ${T.border}`,
                               fontSize: 13, color: T.fg, outline: "none", width: 220 }} />
                    <button onClick={() => { if (email) setSubscribed(true); }}
                      style={{ padding: "10px 20px", borderRadius: 10, background: T.blue, border: "none",
                               color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                               boxShadow: `0 4px 12px rgba(0,158,219,.3)` }}>
                      Subscribe
                    </button>
                  </div>
                )}
              </div>

              {/* search + filter */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                  <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.muted }} />
                  <input value={nlSearch} onChange={e => setNlSearch(e.target.value)} placeholder="Search newsletters…"
                    style={{ width: "100%", padding: "9px 14px 9px 34px", borderRadius: 10, background: T.surface,
                             border: `1px solid ${T.border}`, fontSize: 13, color: T.fg, outline: "none" }} />
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {NL_TOPICS.map(t => (
                    <button key={t} onClick={() => setNlFilter(t)}
                      style={{ padding: "7px 14px", borderRadius: 20,
                               border: nlFilter === t ? `1px solid rgba(0,158,219,.3)` : `1px solid ${T.border}`,
                               background: nlFilter === t ? `rgba(0,158,219,.08)` : T.surface,
                               color: nlFilter === t ? T.blue : T.muted,
                               fontSize: 12, fontWeight: nlFilter === t ? 600 : 400, cursor: "pointer", transition: "all .15s" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* featured newsletter */}
              {filteredNl[0]?.featured && (
                <div style={{ borderRadius: 20, overflow: "hidden", display: "grid", gridTemplateColumns: "2fr 3fr",
                              boxShadow: T.shadowLg }}>
                  <div style={{ position: "relative", minHeight: 260 }}>
                    <img src={filteredNl[0].img} alt={filteredNl[0].title} loading="eager"
                      style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,0,0,.5),rgba(0,0,0,.2))" }} />
                    <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>#{filteredNl[0].issue}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,.7)" }}>{filteredNl[0].month}</div>
                    </div>
                  </div>
                  <div style={{ padding: "28px 32px", background: T.surface }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 100,
                                     background: filteredNl[0].color + "18", color: filteredNl[0].color,
                                     textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {filteredNl[0].topic}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100,
                                     background: `rgba(0,158,219,.08)`, color: T.blue }}>
                        Latest Issue
                      </span>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: T.fg, letterSpacing: "-0.02em", marginBottom: 10 }}>
                      {filteredNl[0].title}
                    </h3>
                    <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.65, marginBottom: 20 }}>{filteredNl[0].excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <span style={{ fontSize: 12, color: T.muted, display: "flex", alignItems: "center", gap: 5 }}>
                        <Clock size={12} />{filteredNl[0].readTime} read
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10,
                                       background: T.blue, border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                        <ExternalLink size={13} /> Read Issue
                      </button>
                      <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", borderRadius: 10,
                                       background: T.bg, border: `1px solid ${T.border}`, color: T.muted, fontSize: 13, cursor: "pointer" }}>
                        <Download size={13} /> PDF
                      </button>
                      <button onClick={() => setSavedNl(p => ({ ...p, [filteredNl[0].issue]: !p[filteredNl[0].issue] }))}
                        style={{ padding: 10, borderRadius: 10,
                                 background: savedNl[filteredNl[0].issue] ? `rgba(0,158,219,.08)` : T.bg,
                                 border: `1px solid ${T.border}`, cursor: "pointer" }}>
                        <Bookmark size={14} style={{ color: savedNl[filteredNl[0].issue] ? T.blue : T.muted,
                                                      fill: savedNl[filteredNl[0].issue] ? T.blue : "none" }} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* newsletter grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                {(filteredNl[0]?.featured ? filteredNl.slice(1) : filteredNl).map(nl => (
                  <div key={nl.issue}
                    style={{ borderRadius: 16, overflow: "hidden", background: T.surface,
                             boxShadow: T.shadowSm, display: "flex", flexDirection: "column",
                             transition: "transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s ease" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = T.shadowMd; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = T.shadowSm; }}>
                    <div style={{ height: 140, position: "relative" }}>
                      <img src={nl.img} alt={nl.title} loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.35)" }} />
                      <div style={{ position: "absolute", top: 12, left: 12 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100,
                                       background: nl.color + "cc", color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {nl.topic}
                        </span>
                      </div>
                      <div style={{ position: "absolute", bottom: 10, left: 12, right: 12,
                                    display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <span style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>#{nl.issue}</span>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>{nl.month}</span>
                      </div>
                    </div>
                    <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: T.fg, lineHeight: 1.35, marginBottom: 8, flex: 1 }}>
                        {nl.title}
                      </h3>
                      <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.5, marginBottom: 14 }}>{nl.excerpt}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={{ fontSize: 11, color: T.muted, display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={10} />{nl.readTime} read
                        </span>
                        <button onClick={() => setSavedNl(p => ({ ...p, [nl.issue]: !p[nl.issue] }))}
                          style={{ background: "none", border: "none", cursor: "pointer" }}>
                          <Bookmark size={13} style={{ color: savedNl[nl.issue] ? T.blue : T.muted,
                                                        fill: savedNl[nl.issue] ? T.blue : "none" }} />
                        </button>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                                         gap: 5, padding: 7, borderRadius: 8, background: `rgba(0,158,219,.06)`,
                                         border: `1px solid rgba(0,158,219,.16)`, color: T.blue,
                                         fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                          <ExternalLink size={10} /> Read
                        </button>
                        <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                                         gap: 5, padding: 7, borderRadius: 8, background: "rgba(0,0,0,.03)",
                                         border: `1px solid ${T.border}`, color: T.muted, fontSize: 11, cursor: "pointer" }}>
                          <Download size={10} /> PDF
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
      </div>
    </>
  );
}
