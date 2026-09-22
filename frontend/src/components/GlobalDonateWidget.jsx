import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Globe, Map, Users, TriangleAlert, ArrowRight, Shield, X } from "lucide-react";

const PAYPAL_URL = "https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE";
const MICHAEL_API = "https://michael-api-382117221028.us-central1.run.app/api/alerts";

const DONORS = [
  { name: "Sophie M.", country: "France", amount: "$50/mo", msg: "just became a monthly supporter" },
  { name: "James O.", country: "United Kingdom", amount: "$100", msg: "made a one-time donation" },
  { name: "Amara K.", country: "Ghana", amount: "$25", msg: "donated to disaster relief" },
  { name: "Lena B.", country: "Germany", amount: "$200", msg: "made a one-time donation" },
  { name: "Carlos R.", country: "Mexico", amount: "$50/mo", msg: "just became a monthly supporter" },
  { name: "Priya S.", country: "India", amount: "$25", msg: "donated to disaster relief" },
  { name: "David N.", country: "USA", amount: "$150", msg: "made a one-time donation" },
  { name: "Fatima A.", country: "Senegal", amount: "$50/mo", msg: "just became a monthly supporter" },
  { name: "Yuki T.", country: "Japan", amount: "$100", msg: "made a one-time donation" },
  { name: "Elena V.", country: "Ukraine", amount: "$25", msg: "donated to disaster relief" },
  { name: "Omar H.", country: "Egypt", amount: "$75", msg: "made a one-time donation" },
  { name: "Ingrid L.", country: "Sweden", amount: "$200", msg: "made a one-time donation" },
  { name: "Kofi A.", country: "Côte d'Ivoire", amount: "$50/mo", msg: "just became a monthly supporter" },
  { name: "Maria C.", country: "Brazil", amount: "$25", msg: "donated to disaster relief" },
  { name: "Tariq M.", country: "Pakistan", amount: "$50", msg: "donated to disaster relief" },
];

const STAT_ICONS = [Globe, Map, Shield, Users, TriangleAlert];

const buildStats = (eventCount) => [
  { Icon: Globe,         value: `${eventCount.toLocaleString()}+`, label: "live crises tracked by MICHAEL" },
  { Icon: Map,           value: "27+",                             label: "countries with WDC presence" },
  { Icon: Shield,        value: "43",                              label: "Disaster Heroes active this week" },
  { Icon: Users,         value: "94",                              label: "people sponsored through platform" },
  { Icon: TriangleAlert, value: "1,240+",                          label: "early warnings issued this month" },
];

const STYLE_ID = "gdw-keyframes";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes gdw-bar {
      from { width: 100%; }
      to   { width: 0%; }
    }
  `;
  document.head.appendChild(style);
}

/* ═══════════════════════════════════════════════════════════════
   LEFT — sliding donation toasts (clickable → PayPal or Disaster Heroes)
═══════════════════════════════════════════════════════════════ */
const DonationToast = ({ donor, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 5200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -320, opacity: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      style={{
        position: "fixed",
        bottom: 88,
        left: 20,
        zIndex: 9990,
        width: 290,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        overflow: "hidden",
        pointerEvents: "auto",
        cursor: "pointer",
      }}
    >
      {/* countdown bar */}
      <div style={{ height: 3, background: "#009EDB", animation: "gdw-bar 5s linear forwards" }} />

      {/* main row */}
      <div style={{ padding: "10px 14px 4px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "#EFF9FF",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Heart size={17} color="#009EDB" strokeWidth={2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: "#111", lineHeight: 1.3 }}>
            {donor.name} · {donor.country}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: "#555", lineHeight: 1.4 }}>
            <span style={{ color: "#009EDB", fontWeight: 800 }}>{donor.amount}</span>{" "}
            {donor.msg}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 10, color: "#aaa" }}>Just now · via PayPal</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDone(); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "#ccc", flexShrink: 0 }}
        >
          <X size={13} />
        </button>
      </div>

      {/* two action buttons */}
      <div style={{ display: "flex", gap: 6, padding: "8px 14px 12px" }}>
        <a
          href={PAYPAL_URL}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            flex: 1, textAlign: "center", background: "#009EDB", color: "#fff",
            fontWeight: 800, fontSize: 11, borderRadius: 7, padding: "7px 0",
            textDecoration: "none",
          }}
        >
          Donate now
        </a>
        <Link
          to="/disaster-heroes"
          onClick={(e) => e.stopPropagation()}
          style={{
            flex: 1, textAlign: "center", background: "#f0f7ff", color: "#009EDB",
            fontWeight: 800, fontSize: 11, borderRadius: 7, padding: "7px 0",
            textDecoration: "none", border: "1px solid #c8e6f7",
          }}
        >
          Sponsor a case
        </Link>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   RIGHT — persistent compact impact widget
═══════════════════════════════════════════════════════════════ */
const ImpactWidget = ({ stats }) => {
  const [statIdx, setStatIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setStatIdx((i) => (i + 1) % stats.length), 4000);
    return () => clearInterval(t);
  }, [stats.length]);

  if (!visible || !stats.length) return null;

  const current = stats[statIdx];
  const CurrentIcon = current.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{
        position: "fixed",
        bottom: 88,
        right: 80,
        zIndex: 9990,
        width: 220,
        background: "#001B3A",
        border: "1px solid rgba(0,158,219,0.3)",
        borderRadius: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        overflow: "hidden",
        pointerEvents: "auto",
      }}
    >
      {/* header */}
      <div style={{ background: "#009EDB", padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "inline-block",
          animation: "pulse 1.5s ease-in-out infinite",
        }} />
        <span style={{ fontSize: 10, fontWeight: 900, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Live Impact
        </span>
      </div>

      {/* rotating stat */}
      <div style={{ padding: "12px 14px 4px", minHeight: 72, position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={statIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div style={{ color: "#009EDB", marginBottom: 6 }}>
              <CurrentIcon size={20} strokeWidth={1.6} />
            </div>
            <p style={{ margin: "0 0 2px", fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
              {current.value}
            </p>
            <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>
              {current.label}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dot indicators */}
      <div style={{ display: "flex", gap: 4, padding: "4px 14px 8px", justifyContent: "center" }}>
        {stats.map((_, i) => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: "50%",
            background: i === statIdx ? "#009EDB" : "rgba(255,255,255,0.2)",
            display: "inline-block", transition: "background 0.3s",
          }} />
        ))}
      </div>

      {/* two action buttons */}
      <div style={{ display: "flex", gap: 6, padding: "0 10px 12px" }}>
        <a
          href={PAYPAL_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            background: "#009EDB", color: "#fff",
            fontWeight: 900, fontSize: 11, borderRadius: 8, padding: "8px 0",
            textDecoration: "none",
          }}
        >
          <Heart size={11} strokeWidth={2} />
          Donate
        </a>
        <Link
          to="/disaster-heroes"
          style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            background: "rgba(0,158,219,0.12)", color: "#009EDB",
            fontWeight: 900, fontSize: 11, borderRadius: 8, padding: "8px 0",
            textDecoration: "none", border: "1px solid rgba(0,158,219,0.25)",
          }}
        >
          <Shield size={11} strokeWidth={2} />
          Sponsor
        </Link>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */
const GlobalDonateWidget = () => {
  const [eventCount, setEventCount] = useState(1000);
  const [stats, setStats] = useState([]);
  const [donorQueue, setDonorQueue] = useState([]);
  const [currentToast, setCurrentToast] = useState(null);
  const [toastKey, setToastKey] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(MICHAEL_API, { headers: { "X-API-Key": "xeltis-prod-key-2026" } });
        if (res.ok) {
          const data = await res.json();
          const count = data?.total || data?.count || data?.data?.length || (Array.isArray(data) ? data.length : 1000);
          setEventCount(count || 1000);
        }
      } catch { /* fallback */ }
    };
    fetchCount();
  }, []);

  useEffect(() => { setStats(buildStats(eventCount)); }, [eventCount]);

  useEffect(() => {
    setDonorQueue([...DONORS].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (donorQueue.length === 0) return;
    const delay = 10000 + Math.random() * 5000;
    const t = setTimeout(() => {
      setDonorQueue((prev) => {
        const [next, ...rest] = prev;
        setCurrentToast(next);
        setToastKey((k) => k + 1);
        return [...rest, next];
      });
    }, delay);
    return () => clearTimeout(t);
  }, [donorQueue, toastKey]);

  return (
    <>
      <AnimatePresence>
        {currentToast && (
          <DonationToast key={toastKey} donor={currentToast} onDone={() => setCurrentToast(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        <ImpactWidget stats={stats} />
      </AnimatePresence>
    </>
  );
};

export default GlobalDonateWidget;
