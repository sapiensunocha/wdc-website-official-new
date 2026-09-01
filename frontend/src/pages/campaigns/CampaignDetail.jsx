import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SEOMeta from "../../components/SEOMeta";
import {
  ChevronLeft, ChevronRight, Shield, Heart, Share2, ArrowRight,
  AlertTriangle, Activity, RefreshCw, ExternalLink, Download,
  Clock, CheckCircle, Circle, TrendingUp, Globe, Users, Zap,
  FileText, MapPin, Quote, Play, BookOpen, Radio
} from "lucide-react";
import { getCampaignScores, CAMPAIGN_MAP_META } from "../../assets/data/riskScores";
import HumanitarianIcon from "../../components/HumanitarianIcon";
import AnimateIn from "../../components/AnimateIn";
import CampaignWorldMap from "../../components/CampaignWorldMap";
import { WDC_CAMPAIGNS, PARTNER_TYPES } from "../../assets/data/campaigns";
import { CAMPAIGN_DETAILS } from "../../assets/data/campaignDetails";

// ─── Live alert / ReliefWeb config (used for the intel feed only) ────────────
const MICHAEL_API = "https://michael-api-382117221028.us-central1.run.app";

// ── Static campaign-specific risk scores (replaces WB + MICHAEL API) ─────────
// getCampaignScores(slug) returns { ISO2: score 1-10 } for all ~240 countries
// Each campaign has an independent index — see riskScores.js for full methodology

// ── Placeholder so the old COUNTRY_BASELINE references compile (unused now) ──
const COUNTRY_BASELINE = {
  // Critical / Active Crisis (9–10)
  AF:9,SS:9,SO:9,YE:9,CD:9,CF:9,SD:8,ET:8,ER:8,ML:8,NE:8,BF:8,BI:8,GW:8,
  SY:9,HT:8,LY:8,
  // Low Income / High Vulnerability (7–8)
  TD:8,MG:7,MW:7,MZ:7,LR:7,SL:7,GM:7,GN:7,UG:7,ZW:7,KP:8,
  CG:6,TG:6,ZM:6,RW:6,TZ:6,CM:6,NP:6,PG:6,SB:6,KI:6,MH:6,PW:5,FM:5,
  VU:6,TO:5,WS:5,TV:5,NR:5,
  // Lower-Middle Income (5–6)
  BD:6,MM:7,PK:7,NG:7,KE:6,GH:5,SN:5,CI:6,BJ:5,TL:6,KH:5,LA:5,
  MR:7,DJ:6,LS:6,SZ:5,CV:4,ST:5,MV:4,KM:5,BT:5,
  IN:5,EG:5,MA:4,TN:4,JO:5,PS:7,IQ:7,
  BO:5,HN:6,SV:6,NI:6,GT:6,PY:5,BZ:4,
  VN:4,PH:5,ID:5,LK:5,
  UA:7,KG:5,TJ:6,UZ:4,GE:4,MD:5,
  MK:4,BA:4,AL:4,XK:5,RS:4,ME:4,
  // Upper-Middle Income (3–4)
  CN:4,BR:5,MX:5,CO:5,AR:4,PE:4,EC:4,VE:7,CU:5,DO:4,JM:4,TT:3,
  ZA:5,NA:4,BW:3,GQ:4,GA:4,AO:5,
  DZ:4,LB:6,IR:6,AZ:4,AM:4,
  RU:5,TR:5,BY:4,
  MY:3,TH:4,MN:4,FJ:4,BN:2,
  BG:4,RO:4,HR:3,HU:3,
  KZ:4,TM:4,GY:4,SR:4,
  // Caribbean islands
  LC:3,VC:3,GD:3,DM:3,AG:3,KN:3,BB:2,BS:2,TT:3,JM:4,CU:5,DO:4,HT:8,
  // High Income / Low Vulnerability (1–3)
  US:2,CA:1,AU:1,NZ:1,JP:1,KR:2,SG:1,HK:1,TW:1,
  DE:1,FR:1,GB:1,IT:2,ES:2,PT:2,NL:1,BE:1,CH:1,AT:1,SE:1,NO:1,
  DK:1,FI:1,IE:1,LU:1,IS:1,MT:1,CY:2,GR:2,PL:2,CZ:2,SK:2,SI:2,
  EE:2,LV:2,LT:2,LI:1,SM:1,MC:1,AD:1,
  IL:2,AE:2,QA:2,KW:2,SA:3,BH:2,OM:3,
  CL:3,UY:2,PA:3,CR:3,
  MU:3,SC:3,
  // Pacific territories & islands
  NC:2,PF:2,WF:5,AS:3,GU:2,PR:2,VI:2,CK:3,NU:3,
  // Other territories
  EH:7,GQ:4,AW:2,CW:2,SX:2,TC:2,KY:1,VG:2,AI:2,MS:3,
  // European territories & dependencies
  GL:2,FO:2,SJ:1,GI:1,IM:1,JE:1,GG:1,AX:1,LI:1,AD:1,SM:1,MC:1,VA:1,
  // French overseas
  RE:3,YT:5,GP:3,MQ:3,GF:4,PM:1,BL:2,MF:3,TF:1,
  // British overseas & South Atlantic
  SH:3,FK:2,GS:2,BM:1,
  // Pacific/Indian Ocean territories
  MO:1,HK:1,CX:2,CC:2,NF:3,
};
// Cache version — increment to bust stale sessionStorage
const CACHE_VER = "v4";

// Per-campaign: Michael event category + World Bank indicator for precision fill
const CAMPAIGN_CFG = {
  "food-security":              { cat: "food security", wb: "SN.ITK.DEFC.ZS",     wbInvert: false, label: "Global Food Insecurity Risk Index", src: "MICHAEL/WFP · World Bank · IPC" },
  "safe-communities":           { cat: "security",      wb: "VC.IHR.PSRC.P5",     wbInvert: false, label: "Community Safety Risk Index",        src: "MICHAEL/ACLED · World Bank · UNODC" },
  "protect-women":              { cat: "security",      wb: "SH.STA.MMRT",        wbInvert: false, label: "Women's Protection Risk Index",       src: "MICHAEL · World Bank · WHO" },
  "protect-children":           { cat: "food security", wb: "SH.DYN.MORT",        wbInvert: false, label: "Child Vulnerability Risk Index",      src: "MICHAEL/UNICEF · World Bank" },
  "home-for-everyone":          { cat: "food security", wb: "SI.POV.DDAY",        wbInvert: false, label: "Poverty & Displacement Risk Index",   src: "MICHAEL/UNHCR · World Bank" },
  "climate-protect":            { cat: "environmental", wb: "EN.ATM.CO2E.PC",     wbInvert: false, label: "Climate Crisis Risk Index",           src: "MICHAEL/GDACS · World Bank" },
  "refugee-displaced-protection":{ cat: "security",     wb: "SM.POP.REFG",        wbInvert: false, label: "Displacement & Refugee Risk Index",  src: "MICHAEL/UNHCR · World Bank" },
  "reproductive-health-safety": { cat: "food security", wb: "SP.UWT.TFRT",        wbInvert: false, label: "Reproductive Health Risk Index",      src: "MICHAEL/UNFPA · World Bank · WHO" },
  "girls-in-tech":              { cat: "security",      wb: "IT.NET.USER.ZS",     wbInvert: true,  label: "Digital Exclusion Risk Index",        src: "MICHAEL · World Bank · ITU" },
  "protect-disabilities":       { cat: "food security", wb: "SH.XPD.CHEX.PC.CD", wbInvert: true,  label: "Health Access Risk Index",            src: "MICHAEL/WHO · World Bank" },
  "digital-safety":             { cat: "security",      wb: "IT.NET.USER.ZS",     wbInvert: false, label: "Digital Safety Risk Index",           src: "MICHAEL · World Bank · ITU" },
};

// Country name → ISO2 (for Michael event.country strings)
const NAME_TO_ISO2 = {
  "afghanistan":"AF","albania":"AL","algeria":"DZ","angola":"AO","argentina":"AR",
  "armenia":"AM","australia":"AU","azerbaijan":"AZ","bangladesh":"BD","belarus":"BY",
  "belgium":"BE","benin":"BJ","bolivia":"BO","bosnia":"BA","botswana":"BW","brazil":"BR",
  "burkina faso":"BF","burundi":"BI","cambodia":"KH","cameroon":"CM","canada":"CA",
  "central african republic":"CF","car":"CF","chad":"TD","chile":"CL","china":"CN",
  "colombia":"CO","colombias":"CO","comoros":"KM","congo":"CG","dr congo":"CD","drc":"CD",
  "costa rica":"CR","cote d'ivoire":"CI","croatia":"HR","cuba":"CU","cyprus":"CY",
  "czech republic":"CZ","denmark":"DK","djibouti":"DJ","dominican republic":"DO",
  "ecuador":"EC","egypt":"EG","el salvador":"SV","equatorial guinea":"GQ","eritrea":"ER",
  "ethiopia":"ET","fiji":"FJ","finland":"FI","france":"FR","gabon":"GA","gambia":"GM",
  "georgia":"GE","germany":"DE","ghana":"GH","greece":"GR","guatemala":"GT","guinea":"GN",
  "guinea-bissau":"GW","guyana":"GY","haiti":"HT","honduras":"HN","hungary":"HU",
  "india":"IN","indonesia":"ID","iran":"IR","iraq":"IQ","ireland":"IE","israel":"IL",
  "italy":"IT","jamaica":"JM","japan":"JP","jordan":"JO","kazakhstan":"KZ","kenya":"KE",
  "kosovo":"XK","kuwait":"KW","kyrgyzstan":"KG","laos":"LA","latvia":"LV","lebanon":"LB",
  "lesotho":"LS","liberia":"LR","libya":"LY","lithuania":"LT","madagascar":"MG",
  "malawi":"MW","malaysia":"MY","mali":"ML","mauritania":"MR","mauritius":"MU",
  "mexico":"MX","moldova":"MD","mongolia":"MN","montenegro":"ME","morocco":"MA",
  "mozambique":"MZ","myanmar":"MM","namibia":"NA","nepal":"NP","netherlands":"NL",
  "nicaragua":"NI","niger":"NE","nigeria":"NG","north korea":"KP","north macedonia":"MK",
  "norway":"NO","oman":"OM","pakistan":"PK","palestine":"PS","gaza":"PS","west bank":"PS",
  "panama":"PA","papua new guinea":"PG","paraguay":"PY","peru":"PE","philippines":"PH",
  "poland":"PL","portugal":"PT","qatar":"QA","romania":"RO","russia":"RU","rwanda":"RW",
  "saudi arabia":"SA","senegal":"SN","serbia":"RS","sierra leone":"SL","somalia":"SO",
  "south africa":"ZA","south korea":"KR","south sudan":"SS","spain":"ES","sri lanka":"LK",
  "sudan":"SD","suriname":"SR","sweden":"SE","switzerland":"CH","syria":"SY","taiwan":"TW",
  "tajikistan":"TJ","tanzania":"TZ","thailand":"TH","timor-leste":"TL","togo":"TG",
  "tunisia":"TN","turkey":"TR","turkmenistan":"TM","uganda":"UG","ukraine":"UA",
  "united arab emirates":"AE","uae":"AE","united kingdom":"GB","uk":"GB",
  "united states":"US","usa":"US","uruguay":"UY","uzbekistan":"UZ","venezuela":"VE",
  "vietnam":"VN","yemen":"YE","zambia":"ZM","zimbabwe":"ZW","maldives":"MV",
  "cox's bazar":"BD","rohingya":"BD","sahel":"ML","small island states":"FJ",
};

function eventNameToISO2(raw) {
  if (!raw) return null;
  let s = raw.toLowerCase()
    .replace(/\s*\(.*?\)/g, "")
    .replace(/\b(sam|wasting|idps?|camp\w*|isis\s*k?|taliban|rebel\s*zones?|ngos?|anglophone|girls|children|women|aid\s*threat|eln|north|south|unity|lac|darfur|wfp|ocha|ipc|phase\s*\d)\b/g, "")
    .replace(/[,;]/g, "").trim();
  if (NAME_TO_ISO2[s]) return NAME_TO_ISO2[s];
  for (const [k, v] of Object.entries(NAME_TO_ISO2)) {
    if (s.startsWith(k) || k.startsWith(s)) return v;
  }
  return null;
}

// ─── Hook: static campaign-specific risk index (instant, all countries) ──────
// Each campaign uses an independent index derived from campaign-specific data.
// See riskScores.js for full methodology and sources per campaign.
function useLiveCampaignData(slug) {
  const meta = CAMPAIGN_MAP_META[slug] || { label: "Global Risk Index", src: "WDC Analysis" };
  const countries = getCampaignScores(slug);
  return {
    countries,
    dataLabel: meta.label,
    srcLabel:  meta.src,
    refining:  false,
    lastFetch: null,
  };
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimCount({ target, prefix = "", suffix = "", duration = 1600 }) {
  const [val, setVal]   = useState(0);
  const ref             = useRef(null);
  const inView          = useInView(ref, { once: true, margin: "-60px" });
  const started         = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let frame;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) frame = requestAnimationFrame(tick);
      else setVal(target);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

// ─── Animated progress bar ────────────────────────────────────────────────────
function GapBar({ gap, accentColor, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const pct    = Math.round((gap.current / gap.target) * 100);
  const remaining = gap.target - gap.current;

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-white leading-snug flex-1">{gap.label}</p>
        <div className="text-right shrink-0">
          <p className="text-lg font-black" style={{ color: accentColor }}>{gap.current}%</p>
          <p className="text-[9px] text-gray-500">of {gap.target}%</p>
        </div>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accentColor }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-gray-500">{gap.source}</span>
        <span className="text-red-400 font-bold">{remaining}% gap remaining</span>
      </div>
    </div>
  );
}

// ─── Severity badge ────────────────────────────────────────────────────────────
function SevBadge({ sev = "ACTIVE" }) {
  const v = (sev || "").toUpperCase();
  const cl = v.includes("CRITICAL") || v === "RED" ? "bg-red-500/20 text-red-400 border-red-500/30"
    : v.includes("HIGH") || v === "ORANGE"         ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
    : "bg-amber-500/20 text-amber-400 border-amber-500/30";
  return (
    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${cl} shrink-0`}>{sev}</span>
  );
}

// ─── ReliefWeb + Michael live hook ────────────────────────────────────────────
function useLiveData(theme) {
  const [alerts, setAlerts] = useState([]);
  const [reports]           = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetch, setLast]  = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Try MICHAEL alerts — silently falls back if auth fails
      const aRes = await fetch(`${MICHAEL_API}/api/alerts`).catch(() => null);
      if (aRes && aRes.ok) {
        const d = await aRes.json();
        setAlerts((Array.isArray(d) ? d : d.alerts || d.data || []).slice(0, 4));
      }
    } catch (_) {}
    setLoading(false);
    setLast(new Date());
  };

  useEffect(() => { fetchData(); }, [theme]);
  return { alerts, reports, loading, lastFetch, refresh: fetchData };
}

const FALLBACK_ALERTS = [
  { id: 1, title: "Nepal GLOF Emergency",    country: "Nepal",   type: "Flood",    severity: "CRITICAL" },
  { id: 2, title: "West Africa Floods 2026", country: "Ghana",   type: "Flood",    severity: "HIGH" },
  { id: 3, title: "DRC Ebola PHEIC 2026",   country: "DR Congo", type: "Epidemic", severity: "CRITICAL" },
  { id: 4, title: "Afghanistan Drought",     country: "Afghanistan", type: "Drought", severity: "HIGH" },
];

// ─── Timeline item ─────────────────────────────────────────────────────────────
function TimelineItem({ item, index, accentColor }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const statusIcon = item.status === "completed"
    ? <CheckCircle size={16} className="shrink-0" style={{ color: accentColor }} />
    : item.status === "active"
    ? <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center shrink-0" style={{ color: accentColor }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
      </div>
    : <Circle size={16} className="text-gray-600 shrink-0" />;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex gap-4 items-start"
    >
      <div className="flex flex-col items-center">
        {statusIcon}
        {index < 4 && <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: accentColor + "30", minHeight: 28 }} />}
      </div>
      <div className="pb-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">{item.date}</p>
        <p className={`text-sm ${item.status === "planned" ? "text-gray-500 italic" : "text-white"} leading-snug`}>{item.event}</p>
        {item.status === "active" && (
          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded mt-1 inline-block" style={{ backgroundColor: accentColor + "20", color: accentColor }}>In Progress</span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ stat, accentColor, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
    >
      <p className="text-3xl sm:text-4xl font-black" style={{ color: accentColor }}>{stat.value}</p>
      <p className="text-xs text-gray-300 mt-1.5 leading-snug">{stat.label}</p>
      <p className="text-[9px] text-gray-600 mt-1">{stat.source}</p>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function CampaignDetail() {
  const { slug }  = useParams();
  const c         = WDC_CAMPAIGNS.find(x => x.slug === slug);
  const d         = CAMPAIGN_DETAILS?.[slug];

  if (!c) return <Navigate to="/campaigns" replace />;

  const { alerts, reports, loading, lastFetch: liveLastFetch, refresh } = useLiveData(d?.reliefwebTheme || c.title);
  const {
    countries: mapCountries,
    dataLabel: mapDataLabel,
    srcLabel:  mapSrcLabel,
    refining:  mapRefining,
    lastFetch: mapLastFetch,
  } = useLiveCampaignData(slug);

  const liveAlerts  = alerts.length  ? alerts  : FALLBACK_ALERTS;
  const currentIdx  = WDC_CAMPAIGNS.findIndex(x => x.slug === slug);
  const prev        = WDC_CAMPAIGNS[currentIdx - 1] || null;
  const next        = WDC_CAMPAIGNS[currentIdx + 1] || null;

  const handleShare = () => {
    navigator.share?.({ title: `WDC PROTECT: ${c.title}`, url: window.location.href, text: c.shortDesc });
  };

  // Scrollspy anchors
  const sections = [
    { id: "situation", label: "Situation" },
    { id: "data",      label: "Data" },
    { id: "gap",       label: "The Gap" },
    { id: "response",  label: "WDC Response" },
    { id: "evidence",  label: "Evidence" },
    { id: "report",    label: "Latest Report" },
  ];

  return (
    <>
      <SEOMeta
        title={`${c.title} — WDC PROTECT`}
        description={c.shortDesc}
        image={c.heroImage ? c.heroImage.replace(/w=\d+/, 'w=1200') + '&h=630' : undefined}
        url={`/campaigns/${c.slug}`}
      />

      {/* ════════════════════════════════════════════════════════
          HERO SITREP BANNER — photo background
      ════════════════════════════════════════════════════════ */}
      <section className="text-white relative overflow-hidden">
        {/* Real photo background with layered gradients */}
        <div className="absolute inset-0">
          <img
            src={c.heroImage || "/campaign-hero.jpg"}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "saturate(0.7) brightness(0.45)" }}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
          {/* Dark-to-campaign gradient overlay */}
          <div className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(0,5,15,0.92) 0%, rgba(0,5,15,0.70) 50%, ${c.color}22 100%)`,
            }} />
          {/* Bottom fade into page */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#05101f] to-transparent" />
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        </div>

        {/* Campaign accent top stripe */}
        <div className="relative h-1 w-full" style={{ backgroundColor: c.color }} />

        <div className="container relative pt-24 sm:pt-16 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/40 mb-8 sm:mb-10">
            <Link to="/campaigns" className="hover:text-white/70 flex items-center gap-1 transition-colors">
              <ChevronLeft size={12} /> WDC PROTECT
            </Link>
            <span>/</span>
            <span style={{ color: c.color }}>{c.title}</span>
          </div>

          <AnimateIn variant="fadeUp">
            {/* Live SITREP pill */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Live SITREP</span>
              </div>
              <span className="text-[10px] text-white/40">
                {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} · Michael AI Intelligence
              </span>
            </div>

            {/* Identity row */}
            <div className="flex items-start gap-5 mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `${c.color}20`, border: `1px solid ${c.color}40`, backdropFilter: "blur(12px)" }}>
                <HumanitarianIcon icon={c.emoji} size={36} style={{ color: "white" }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={11} className="text-[#009EDB]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#009EDB]">WDC PROTECT</span>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight drop-shadow-lg">
                  {c.title}
                </h1>
              </div>
            </div>

            <p className="text-lg sm:text-xl font-bold mb-4 drop-shadow" style={{ color: c.color }}>{c.tagline}</p>
            <p className="text-white/70 max-w-2xl leading-relaxed text-sm sm:text-base mb-10">{c.longDesc}</p>

            {/* Key facts strip */}
            {d?.keyFacts && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-xl">
                {d.keyFacts.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22,1,0.36,1] }}
                    className="rounded-xl p-2.5 sm:p-4 text-center"
                    style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(12px)", border: `1px solid ${c.color}30` }}
                  >
                    <p className="text-lg sm:text-2xl font-black drop-shadow" style={{ color: c.color }}>{f.value}</p>
                    <p className="text-[9px] sm:text-[10px] text-white/50 mt-1 leading-snug">{f.label}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <a href="https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-opacity hover:opacity-85 text-sm shadow-lg"
                style={{ backgroundColor: c.color }}>
                <Heart size={15} /> Fund This Campaign
              </a>
              <Link to="/roster"
                className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
                <Shield size={15} /> Become a Partner
              </Link>
              <button onClick={handleShare}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
                style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <Share2 size={15} /> Share
              </button>
            </div>
          </AnimateIn>
        </div>

        {/* Section anchor nav */}
        <div className="relative border-t bg-black/50 backdrop-blur-md" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="container flex overflow-x-auto gap-0">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className="shrink-0 px-4 sm:px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-white/40 hover:text-white border-b-2 border-transparent transition-all min-h-[44px] flex items-center"
                onMouseEnter={e => { e.target.style.borderColor = c.color; e.target.style.color = "white"; }}
                onMouseLeave={e => { e.target.style.borderColor = "transparent"; e.target.style.color = ""; }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          VULNERABILITY STATS (4 counters)
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#0f172a] text-white py-12 border-b border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {c.vulnerabilityStats.map((s, i) => (
              <StatCard key={i} stat={s} accentColor={c.color} index={i} />
            ))}
          </div>
          <p className="text-[10px] text-gray-600 mt-4 text-center">
            Sources: UN agencies, OCHA, and WDC field intelligence · Updated 2025–2026
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          GLOBAL RISK INDEX MAP — Banner + Full Map
      ════════════════════════════════════════════════════════ */}
      <section id="situation" className="text-white overflow-hidden" style={{ background: "#05101f" }}>

        {/* ── Banner header ── */}
        <div className="relative overflow-hidden">
          {/* Radial accent glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${c.color}18 0%, transparent 70%)` }} />
          {/* Grid dot pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="container relative pt-12 pb-0">
            <AnimateIn variant="fadeUp">
              {/* Top label row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ backgroundColor: c.color }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ backgroundColor: c.color }} />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                    Global Risk Index — Campaign Specific
                  </p>
                </div>
                {/* Source badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[9px] font-bold text-gray-400 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                    WDC PROTECT INDEX
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[9px] font-bold text-gray-500">
                    UN AGENCIES
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[9px] font-bold text-gray-500">
                    UNHCR · WHO · UNICEF
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-black leading-[1.05] tracking-tight">
                    Every Country.<br />
                    <span style={{ color: c.color }}>Indexed 1–10.</span>
                  </h2>
                  {mapDataLabel && (
                    <p className="text-sm text-gray-400 mt-3 font-medium">{mapDataLabel}</p>
                  )}
                  {mapSrcLabel && (
                    <p className="text-[10px] text-gray-600 mt-1">{mapSrcLabel}</p>
                  )}
                </div>

                {/* Live stat cards */}
                <div className="grid grid-cols-3 gap-3 lg:w-auto shrink-0">
                  {[
                    {
                      value: `${Object.keys(mapCountries).length}`,
                      label: "Countries Indexed",
                      accent: true,
                    },
                    { value: "1–10", label: "Risk Scale", accent: false },
                    {
                      value: "2025",
                      label: "Dataset Vintage",
                      accent: false,
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22,1,0.36,1] }}
                      className="rounded-xl p-3 sm:p-4 text-center border"
                      style={{
                        background: s.accent ? `${c.color}15` : "rgba(255,255,255,0.03)",
                        borderColor: s.accent ? `${c.color}40` : "rgba(255,255,255,0.07)",
                      }}
                    >
                      <p className="text-xl sm:text-2xl font-black tabular-nums"
                        style={{ color: s.accent ? c.color : "white" }}>
                        {s.value}
                      </p>
                      <p className="text-[9px] text-gray-500 mt-0.5 leading-snug">{s.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* ── Full-width map panel ── */}
        <AnimateIn variant="fadeUp" delay={0.08}>
          <div className="container pb-12">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #0a1628 0%, #071020 100%)",
                border: `1px solid ${c.color}22`,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.5), 0 0 80px ${c.color}10`,
              }}
            >
              {/* Non-blocking refining badge — map always visible */}
              <AnimatePresence>
                {mapRefining && (
                  <motion.div
                    key="refining"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: "rgba(5,16,31,0.88)", backdropFilter: "blur(8px)", border: `1px solid ${c.color}30` }}
                  >
                    <div className="w-3 h-3 rounded-full border border-t-current animate-spin shrink-0"
                      style={{ color: c.color }} />
                    <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">Refining data…</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Map */}
              <div className="p-5 sm:p-8">
                <CampaignWorldMap
                  key={`${slug}-${Object.keys(mapCountries).length}`}
                  countries={mapCountries}
                  accentColor={c.color}
                  campaignLabel={mapDataLabel}
                />
              </div>

              {/* Bottom attribution bar */}
              <div className="border-t px-5 sm:px-8 py-3 flex items-center justify-between flex-wrap gap-2"
                style={{ borderColor: `${c.color}15` }}>
                <p className="text-[9px] text-gray-600">
                  {mapSrcLabel || "WDC campaign-specific risk index · Scale 1 (lowest) → 10 (highest)"}
                </p>
                <div className="flex items-center gap-3 text-[9px] text-gray-600">
                  <span>WDC PROTECT Research · 2025</span>
                  <span className="text-white/10">|</span>
                  <span>{Object.keys(mapCountries).length} countries</span>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* ── Live intel feed ── */}
        <div className="container pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* MICHAEL alerts */}
            <AnimateIn variant="fadeLeft">
              <div className="rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${c.color}18` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: c.color }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: c.color }} />
                    </span>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: c.color }}>
                      MICHAEL · Live Alerts
                    </p>
                  </div>
                  <button onClick={refresh}
                    className="flex items-center gap-1 text-[9px] text-gray-600 hover:text-gray-300 transition-colors">
                    <RefreshCw size={9} className={loading ? "animate-spin" : ""} />
                    {liveLastFetch && liveLastFetch.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </button>
                </div>
                <div className="space-y-2">
                  {loading
                    ? [1,2,3].map(i => (
                        <div key={i} className="h-11 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
                      ))
                    : liveAlerts.map((a, i) => (
                        <motion.div
                          key={a.id || i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.4 }}
                          className="flex items-start gap-3 rounded-xl px-3 py-2.5"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                          <span className="relative flex h-1.5 w-1.5 mt-1.5 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white truncate">{a.title || a.name || "Active Alert"}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{a.country || a.location || "Global"} · {a.type || "Alert"}</p>
                          </div>
                          <SevBadge sev={a.severity} />
                        </motion.div>
                      ))
                  }
                </div>
              </div>
            </AnimateIn>

            {/* ReliefWeb reports */}
            <AnimateIn variant="fadeRight">
              <div className="rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText size={13} style={{ color: c.color }} />
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: c.color }}>
                      ReliefWeb · Latest Reports
                    </p>
                  </div>
                  <a href={`https://reliefweb.int/search?search=${encodeURIComponent(d?.reliefwebTheme || c.title)}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 text-[9px] font-bold transition-opacity hover:opacity-70"
                    style={{ color: c.color }}>
                    View all <ExternalLink size={8} />
                  </a>
                </div>
                <div className="space-y-2">
                  {loading
                    ? [1,2,3].map(i => (
                        <div key={i} className="h-12 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
                      ))
                    : reports.length > 0
                      ? reports.map((r, i) => (
                          <motion.a
                            key={i}
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.4 }}
                            href={`https://reliefweb.int${r.fields?.url_alias || ""}`}
                            target="_blank" rel="noreferrer"
                            className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 transition-colors group"
                            style={{ background: "rgba(255,255,255,0.04)" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                          >
                            <FileText size={12} className="text-gray-600 shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-300 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                                {r.fields?.title || "Report"}
                              </p>
                              <p className="text-[10px] text-gray-600 mt-0.5">
                                {r.fields?.date?.created?.slice(0,10) || "Recent"}
                              </p>
                            </div>
                            <ExternalLink size={9} className="text-gray-700 shrink-0 mt-0.5" />
                          </motion.a>
                        ))
                      : (
                        <div className="text-center py-6">
                          <p className="text-xs text-gray-500">No live reports available.</p>
                          <Link to="/reports" className="text-xs mt-1.5 inline-block font-bold transition-opacity hover:opacity-70"
                            style={{ color: c.color }}>
                            View WDC Reports →
                          </Link>
                        </div>
                      )
                  }
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE GAP — What Still Needs to Happen
      ════════════════════════════════════════════════════════ */}
      <section id="gap" className="bg-[#1C2B39] text-white py-20">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp size={18} style={{ color: c.color }} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: c.color }}>Gap Analysis</p>
            </div>
            <h2 className="text-3xl font-black mb-2">The Gap — What Still Needs to Happen</h2>
            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed mb-10">
              Current coverage versus what is needed. These gaps drive WDC's campaign priorities, funding asks, and policy advocacy — translating evidence into institutional change.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-7">
              {(d?.gaps || c.whatWeDo.slice(0, 2).map((w, i) => ({ label: w.title, current: 30 + i * 8, target: 100, source: "WDC Assessment" }))).slice(0, 2).map((gap, i) => (
                <GapBar key={i} gap={gap} accentColor={c.color} index={i} />
              ))}
            </div>
            <div className="space-y-7">
              {(d?.gaps || c.whatWeDo.slice(2, 4).map((w, i) => ({ label: w.title, current: 22 + i * 10, target: 100, source: "WDC Assessment" }))).slice(2, 4).map((gap, i) => (
                <GapBar key={i} gap={gap} accentColor={c.color} index={i + 2} />
              ))}
            </div>
          </div>

          {/* Funding gap callout */}
          <AnimateIn variant="fadeUp" delay={0.15} className="mt-12">
            <div className="bg-white/5 border rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
              style={{ borderColor: c.color + "30" }}>
              {[
                { value: "< 40%", label: "Average coverage achieved across all indicators", color: "text-red-400" },
                { value: "60%+", label: "Gap remaining — requiring urgent funding and policy action", color: "text-amber-400" },
                { value: "2026", label: "WDC target year for measurable progress on all four indicators", color: null },
              ].map((s, i) => (
                <div key={i}>
                  <p className={`text-3xl font-black mb-1 ${s.color || ""}`} style={!s.color ? { color: c.color } : {}}>{s.value}</p>
                  <p className="text-xs text-gray-400 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DATA — Indicators & What We Do
      ════════════════════════════════════════════════════════ */}
      <section id="data" className="bg-[#f8fafc] py-20">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-2">
              <Radio size={16} style={{ color: c.color }} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: c.color }}>Key Indicators</p>
            </div>
            <h2 className="text-3xl font-black text-[#1C2B39] mb-8">WDC Tracks. WDC Measures. WDC Reports.</h2>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.whatWeDo.map((item, i) => (
              <AnimateIn key={i} variant="fadeUp" delay={0.06 * i}>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4 border"
                    style={{ backgroundColor: c.color + "15", borderColor: c.color + "30" }}>
                    <HumanitarianIcon icon={item.icon} size={20} style={{ color: c.color }} />
                  </div>
                  <h3 className="font-black text-[#1C2B39] mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          WDC RESPONSE — Timeline
      ════════════════════════════════════════════════════════ */}
      <section id="response" className="bg-[#0a1628] text-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Timeline */}
            <AnimateIn variant="fadeLeft">
              <div className="flex items-center gap-3 mb-6">
                <Clock size={16} style={{ color: c.color }} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: c.color }}>WDC Activity Timeline</p>
              </div>
              <div>
                {(d?.timeline || [
                  { date: "Q1 2025", event: "Campaign baseline assessment published", status: "completed" },
                  { date: "Q3 2025", event: "Michael AI monitoring integration launched", status: "completed" },
                  { date: "Q1 2026", event: "First corporate partner CSR program activated", status: "active" },
                  { date: "Q3 2026", event: "Policy brief submitted to relevant UN body", status: "planned" },
                  { date: "Q4 2026", event: "Annual vulnerability index published", status: "planned" },
                ]).map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} accentColor={c.color} />
                ))}
              </div>
            </AnimateIn>

            {/* Right: Tangible outputs */}
            <AnimateIn variant="fadeRight">
              <div className="flex items-center gap-3 mb-6">
                <Zap size={16} style={{ color: c.color }} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: c.color }}>Tangible Outputs</p>
              </div>
              <div className="space-y-4">
                {c.tangibleOutputs.map((o, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors"
                  >
                    <span className="shrink-0" style={{ color: c.color }}><HumanitarianIcon icon={o.icon} size={18} /></span>
                    <div>
                      <p className="font-bold text-white text-sm mb-0.5">{o.title}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{o.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Partner types mini */}
              <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: c.color }}>
                  Partnership Opportunities
                </p>
                <div className="flex flex-wrap gap-2">
                  {PARTNER_TYPES.map(p => (
                    <span key={p.title} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-gray-300">
                      <HumanitarianIcon icon={p.icon} size={12} className="shrink-0" /> {p.title}
                    </span>
                  ))}
                </div>
                <Link to="/roster" className="mt-3 text-xs font-bold flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: c.color }}>
                  Explore partnerships <ChevronRight size={11} />
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          EVIDENCE — Testimonial + Related Links
      ════════════════════════════════════════════════════════ */}
      <section id="evidence" className="bg-white py-20">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen size={16} style={{ color: c.color }} />
              <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: c.color }}>Evidence & Proof</p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Testimonial */}
            <AnimateIn variant="fadeLeft">
              {d?.testimonial ? (
                <div className="relative bg-[#0a1628] text-white rounded-2xl p-8 h-full flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-4 right-6 opacity-10">
                    <Quote size={72} style={{ color: c.color }} />
                  </div>
                  <div>
                    <Quote size={22} className="mb-4" style={{ color: c.color }} />
                    <p className="text-base leading-relaxed text-gray-200 italic mb-6">
                      "{d.testimonial.quote}"
                    </p>
                  </div>
                  <div>
                    <div className="w-8 h-0.5 mb-3" style={{ backgroundColor: c.color }} />
                    <p className="text-sm font-bold text-white">{d.testimonial.author}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-8 flex flex-col gap-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Field Assessment</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.longDesc}</p>
                  <Link to="/reports" className="text-sm font-bold flex items-center gap-1 mt-auto" style={{ color: c.color }}>
                    Read full WDC reports <ArrowRight size={13} />
                  </Link>
                </div>
              )}
            </AnimateIn>

            {/* Video placeholder + related */}
            <AnimateIn variant="fadeRight">
              <div className="space-y-4 h-full flex flex-col">
                {/* YouTube video embed */}
                {d?.videoEmbed ? (
                  <div className="rounded-2xl overflow-hidden aspect-video bg-black shadow-2xl">
                    <iframe
                      src={`https://www.youtube.com/embed/${d.videoEmbed}?rel=0&modestbranding=1`}
                      title={`${c.title} — WDC PROTECT`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <div className="bg-[#0a1628] border border-white/10 rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative">
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${c.color}20 0%, transparent 70%)` }} />
                    <div className="text-center relative z-10">
                      <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3">
                        <Play size={24} className="text-white ml-1" />
                      </div>
                      <p className="text-xs text-gray-400">Campaign Video</p>
                    </div>
                  </div>
                )}

                {/* Related resources */}
                <div className={`bg-gradient-to-br ${c.gradFrom} ${c.gradTo} border ${c.border} rounded-2xl p-5 flex-1`}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: c.color }}>
                    Related WDC Resources
                  </p>
                  <div className="space-y-2">
                    {c.relatedLinks.map(l => (
                      <Link key={l.to} to={l.to}
                        className="flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border border-gray-100 hover:border-gray-300 transition-colors text-sm font-medium text-[#1C2B39] group">
                        {l.label}
                        <ChevronRight size={13} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          LATEST REPORT — SITREP card
      ════════════════════════════════════════════════════════ */}
      <section id="report" className="bg-[#0a1628] text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <AnimateIn variant="fadeLeft">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={16} style={{ color: c.color }} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: c.color }}>Latest Intelligence Product</p>
              </div>
              <div className="bg-white/5 border rounded-2xl p-7 hover:bg-white/8 transition-colors" style={{ borderColor: c.color + "30" }}>
                {/* SITREP document header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: c.color }}>
                    <FileText size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                      {d?.latestReport?.type || "Intelligence Brief"}
                    </p>
                    <p className="text-[10px] text-gray-400">{d?.latestReport?.date || "2026"}</p>
                  </div>
                  <span className="ml-auto text-[9px] font-black uppercase px-2 py-0.5 rounded border"
                    style={{ borderColor: c.color + "50", color: c.color, backgroundColor: c.color + "15" }}>
                    WDC PROTECT
                  </span>
                </div>

                <h3 className="text-lg font-black text-white mb-3">
                  {d?.latestReport?.title || `${c.title} — Vulnerability Assessment 2026`}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  {d?.latestReport?.summary || c.shortDesc}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link to={d?.latestReport?.link || "/reports"}
                    className="inline-flex items-center gap-2 text-white font-bold px-5 py-3 rounded-lg text-sm transition-opacity hover:opacity-90 min-h-[44px]"
                    style={{ backgroundColor: c.color }}>
                    <Download size={14} /> Download Report
                  </Link>
                  <Link to="/newsletter"
                    className="inline-flex items-center gap-2 border border-white/20 text-gray-300 hover:text-white font-bold px-5 py-3 rounded-lg text-sm transition-colors min-h-[44px]">
                    Subscribe for Updates
                  </Link>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeRight">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Also from WDC</p>
                {[
                  { title: "WDC Global Vulnerability Index 2026", type: "Annual Report", link: "/reports" },
                  { title: "Michael AI Intelligence Brief — August 2026", type: "Monthly Digest", link: "/reports" },
                  { title: "WDC PROTECT — Campaign Platform Overview", type: "Institutional Brief", link: "/campaigns" },
                ].map((r, i) => (
                  <Link key={i} to={r.link}
                    className="flex items-start gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 transition-colors group">
                    <FileText size={16} className="text-gray-500 mt-0.5 group-hover:text-white shrink-0 transition-colors" />
                    <div>
                      <p className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{r.title}</p>
                      <p className="text-[10px] text-gray-600 mt-0.5">{r.type}</p>
                    </div>
                    <Download size={12} className="text-gray-600 ml-auto mt-0.5 shrink-0" />
                  </Link>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CALL TO ACTION
      ════════════════════════════════════════════════════════ */}
      <section className="text-white py-20 relative overflow-hidden" style={{ backgroundColor: c.color }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
        </div>
        <div className="container relative text-center">
          <AnimateIn variant="fadeUp">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-3 text-white/70">Take Action Now</p>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
              {c.title}.<br />This is the moment.
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-10 text-base leading-relaxed">
              Every dollar is tracked. Every outcome is reported. WDC turns your support into verified, measurable protection for the world's most vulnerable people.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white font-black px-8 py-4 rounded-xl transition-opacity hover:opacity-90 text-sm"
                style={{ color: c.color }}>
                <Heart size={16} className="fill-current" /> Fund This Campaign
              </a>
              <Link to="/roster"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-colors text-sm">
                <Shield size={16} /> Corporate Partnership
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/20 text-white/80 hover:text-white hover:border-white/40 font-bold px-7 py-4 rounded-xl transition-colors text-sm">
                <ArrowRight size={16} /> Contact WDC
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PREV / NEXT CAMPAIGN NAVIGATION
      ════════════════════════════════════════════════════════ */}
      <section className="bg-[#f8fafc] border-t border-gray-200 py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            {prev ? (
              <Link to={`/campaigns/${prev.slug}`}
                className="flex-1 flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-sm transition-all group">
                <ChevronLeft size={18} className="text-gray-400 group-hover:text-gray-700 shrink-0" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-gray-400">Previous</p>
                  <p className="text-sm font-bold text-[#1C2B39] mt-0.5 flex items-center gap-1.5">
                    <HumanitarianIcon icon={prev.emoji} size={13} style={{ color: prev.color }} />
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : <div className="flex-1" />}

            <Link to="/campaigns"
              className="flex items-center justify-center gap-2 border border-gray-200 bg-white rounded-xl px-6 py-4 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Shield size={14} /> All Campaigns
            </Link>

            {next ? (
              <Link to={`/campaigns/${next.slug}`}
                className="flex-1 flex items-center justify-end gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-sm transition-all group text-right">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-wider text-gray-400">Next</p>
                  <p className="text-sm font-bold text-[#1C2B39] mt-0.5 flex items-center gap-1.5 justify-end">
                    <HumanitarianIcon icon={next.emoji} size={13} style={{ color: next.color }} />
                    {next.title}
                  </p>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-700 shrink-0" />
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </section>
    </>
  );
}
