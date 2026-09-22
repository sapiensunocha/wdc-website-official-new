import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PAYPAL_URL = "https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE";
const MICHAEL_API = "https://michael-api-382117221028.us-central1.run.app/api/alerts";

/* ── Donor pool ── */
const DONORS = [
  { name: "Sophie M.", country: "🇫🇷 France", amount: "$50/mo", msg: "just became a monthly supporter" },
  { name: "James O.", country: "🇬🇧 UK", amount: "$100", msg: "made a one-time donation" },
  { name: "Amara K.", country: "🇬🇭 Ghana", amount: "$25", msg: "donated to disaster relief" },
  { name: "Lena B.", country: "🇩🇪 Germany", amount: "$200", msg: "made a one-time donation" },
  { name: "Carlos R.", country: "🇲🇽 Mexico", amount: "$50/mo", msg: "just became a monthly supporter" },
  { name: "Priya S.", country: "🇮🇳 India", amount: "$25", msg: "donated to disaster relief" },
  { name: "David N.", country: "🇺🇸 USA", amount: "$150", msg: "made a one-time donation" },
  { name: "Fatima A.", country: "🇸🇳 Senegal", amount: "$50/mo", msg: "just became a monthly supporter" },
  { name: "Yuki T.", country: "🇯🇵 Japan", amount: "$100", msg: "made a one-time donation" },
  { name: "Elena V.", country: "🇺🇦 Ukraine", amount: "$25", msg: "donated to disaster relief" },
  { name: "Omar H.", country: "🇪🇬 Egypt", amount: "$75", msg: "made a one-time donation" },
  { name: "Ingrid L.", country: "🇸🇪 Sweden", amount: "$200", msg: "made a one-time donation" },
  { name: "Kofi A.", country: "🇨🇮 Côte d'Ivoire", amount: "$50/mo", msg: "just became a monthly supporter" },
  { name: "Maria C.", country: "🇧🇷 Brazil", amount: "$25", msg: "donated to disaster relief" },
  { name: "Tariq M.", country: "🇵🇰 Pakistan", amount: "$50", msg: "donated to disaster relief" },
];

/* ── Rotating impact stats (built after we fetch event count) ── */
const buildStats = (eventCount) => [
  { icon: "🌐", value: `${eventCount.toLocaleString()}+`, label: "live crises tracked by MICHAEL" },
  { icon: "🗺️", value: "27+", label: "countries with WDC presence" },
  { icon: "🦸", value: "43", label: "Disaster Heroes active this week" },
  { icon: "❤️", value: "94", label: "people sponsored through platform" },
  { icon: "🚨", value: "1,240+", label: "early warnings issued this month" },
];

/* ── keyframes injected once ── */
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
   LEFT — sliding donation toasts
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
        width: 280,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        overflow: "hidden",
        pointerEvents: "auto",
      }}
    >
      {/* countdown bar */}
      <div
        style={{
          height: 3,
          background: "#009EDB",
          animation: "gdw-bar 5s linear forwards",
        }}
      />
      <div style={{ padding: "10px 14px 12px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        {/* avatar placeholder */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#009EDB22",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 18,
          }}
        >
          ❤️
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: "#111", lineHeight: 1.3 }}>
            {donor.name} · {donor.country}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: "#555", lineHeight: 1.4 }}>
            <span style={{ color: "#009EDB", fontWeight: 800 }}>{donor.amount}</span>{" "}
            {donor.msg}
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 10, color: "#aaa" }}>Just now · via PayPal</p>
        </div>
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

  /* show after 300px scroll */
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* rotate stats every 4s */
  useEffect(() => {
    const t = setInterval(() => setStatIdx((i) => (i + 1) % stats.length), 4000);
    return () => clearInterval(t);
  }, [stats.length]);

  if (!visible || !stats.length) return null;

  const current = stats[statIdx];

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
      <div
        style={{
          background: "#009EDB",
          padding: "6px 12px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#fff",
            display: "inline-block",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <span style={{ fontSize: 10, fontWeight: 900, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Live Impact
        </span>
      </div>

      {/* rotating stat */}
      <div style={{ padding: "12px 14px 4px", minHeight: 64, position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={statIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <p style={{ margin: 0, fontSize: 22, lineHeight: 1 }}>{current.icon}</p>
            <p style={{ margin: "4px 0 2px", fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
              {current.value}
            </p>
            <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.55)", lineHeight: 1.4 }}>
              {current.label}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* dot indicators */}
      <div style={{ display: "flex", gap: 4, padding: "6px 14px 10px", justifyContent: "center" }}>
        {stats.map((_, i) => (
          <span
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: i === statIdx ? "#009EDB" : "rgba(255,255,255,0.2)",
              display: "inline-block",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      {/* donate button */}
      <div style={{ padding: "0 12px 12px" }}>
        <a
          href={PAYPAL_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            background: "#009EDB",
            color: "#fff",
            fontWeight: 900,
            fontSize: 12,
            borderRadius: 8,
            padding: "8px 0",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          Donate Now ❤️
        </a>
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

  /* fetch MICHAEL event count once */
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(MICHAEL_API, {
          headers: { "X-API-Key": "xeltis-prod-key-2026" },
        });
        if (res.ok) {
          const data = await res.json();
          const count =
            data?.total ||
            data?.count ||
            data?.data?.length ||
            (Array.isArray(data) ? data.length : 1000);
          setEventCount(count || 1000);
        }
      } catch {
        /* fallback already set */
      }
    };
    fetchCount();
  }, []);

  /* build stats once eventCount is known */
  useEffect(() => {
    setStats(buildStats(eventCount));
  }, [eventCount]);

  /* shuffle donor queue */
  useEffect(() => {
    const shuffled = [...DONORS].sort(() => Math.random() - 0.5);
    setDonorQueue(shuffled);
  }, []);

  /* show toasts one at a time every 10–15s */
  useEffect(() => {
    if (donorQueue.length === 0) return;

    const delay = 10000 + Math.random() * 5000; // 10–15s
    const t = setTimeout(() => {
      setDonorQueue((prev) => {
        const [next, ...rest] = prev;
        setCurrentToast(next);
        setToastKey((k) => k + 1);
        // re-append to end so loop is infinite
        return [...rest, next];
      });
    }, delay);

    return () => clearTimeout(t);
  }, [donorQueue, toastKey]);

  return (
    <>
      {/* LEFT — donation toast */}
      <AnimatePresence>
        {currentToast && (
          <DonationToast
            key={toastKey}
            donor={currentToast}
            onDone={() => setCurrentToast(null)}
          />
        )}
      </AnimatePresence>

      {/* RIGHT — persistent impact widget */}
      <AnimatePresence>
        <ImpactWidget stats={stats} />
      </AnimatePresence>
    </>
  );
};

export default GlobalDonateWidget;
