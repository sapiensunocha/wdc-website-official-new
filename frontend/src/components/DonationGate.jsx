import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Heart, Shield, ArrowRight, Globe } from "lucide-react";

const PAYPAL_URL = "https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE";
const STORAGE_KEY = "wdc_gate_seen_v1";
const DELAY_MS = 4000;

const STATS = [
  { icon: Globe,  value: "1,000+", label: "active crises tracked right now" },
  { icon: Shield, value: "94",     label: "people sponsored via Disaster Heroes" },
  { icon: Heart,  value: "$20",    label: "minimum monthly sponsorship" },
];

const STYLE_ID = "dg-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .dg-overlay {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0,8,24,0.72);
      backdrop-filter: blur(4px);
    }
    .dg-modal {
      position: fixed; z-index: 10001;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: min(560px, 94vw);
      max-height: min(720px, 92dvh);
      overflow-y: auto;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.45);
    }
    .dg-hero { height: 180px; position: relative; overflow: hidden; flex-shrink: 0; }
    .dg-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 16px;
    }
    .dg-body { padding: 18px 20px 16px; }
    .dg-primary-cta {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      background: #009EDB; color: #fff;
      font-weight: 900; font-size: 15px; border-radius: 10px; padding: 13px 20px;
      text-decoration: none; margin-bottom: 10px;
    }
    .dg-secondary-cta {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      background: #f0f9ff; color: #009EDB;
      font-weight: 800; font-size: 13px; border-radius: 10px; padding: 11px 20px;
      text-decoration: none; border: 1px solid #bae6fd; margin-bottom: 14px;
    }
    @media (max-width: 500px) {
      .dg-modal {
        top: auto; bottom: 0; left: 0; right: 0;
        transform: none; width: 100%;
        max-height: 93dvh;
        border-radius: 20px 20px 0 0;
      }
      .dg-hero { height: 150px; }
      .dg-stats { grid-template-columns: repeat(2, 1fr); }
      .dg-body { padding: 14px 14px 12px; }
      .dg-primary-cta { font-size: 14px; padding: 12px 14px; }
      .dg-secondary-cta { font-size: 12px; padding: 10px 14px; }
    }
  `;
  document.head.appendChild(style);
}

export default function DonationGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="dg-backdrop"
            className="dg-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />
          <motion.div
            key="dg-modal"
            className="dg-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0   }}
            exit={  { opacity: 0, scale: 0.95, y: 20  }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Hero image */}
            <div className="dg-hero">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=70"
                alt="Children in crisis"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,17,41,0.35) 0%, rgba(0,17,41,0.82) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 1.2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 9, fontWeight: 900, color: "#fff", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Live — Crises are happening right now
                  </span>
                </div>
                <h2 style={{ margin: 0, fontSize: "clamp(15px, 4.5vw, 21px)", fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
                  Will you stand with the most<br />vulnerable people on Earth?
                </h2>
              </div>
              <button
                onClick={close}
                style={{
                  position: "absolute", top: 10, right: 10,
                  background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "50%", width: 30, height: 30,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="dg-body">
              <p style={{ margin: "0 0 14px", fontSize: "clamp(11px, 3vw, 13px)", color: "#374151", lineHeight: 1.65 }}>
                World Disaster Center monitors 1,000+ crises in real time and mobilizes relief for verified families and individuals.
                Your support — however small — keeps field teams active and people alive.
              </p>

              <div className="dg-stats">
                {STATS.map(({ icon: Icon, value, label }) => (
                  <div key={label} style={{
                    textAlign: "center", background: "#f0f9ff",
                    border: "1px solid #bae6fd", borderRadius: 10, padding: "10px 6px",
                  }}>
                    <Icon size={16} color="#009EDB" strokeWidth={1.8} style={{ margin: "0 auto 4px", display: "block" }} />
                    <div style={{ fontSize: "clamp(14px, 4vw, 17px)", fontWeight: 900, color: "#001129", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: "clamp(8px, 2vw, 9px)", color: "#6b7280", lineHeight: 1.35, marginTop: 3 }}>{label}</div>
                  </div>
                ))}
              </div>

              <a href={PAYPAL_URL} target="_blank" rel="noreferrer" onClick={close} className="dg-primary-cta">
                <Heart size={16} strokeWidth={2} />
                Donate Now — Every Dollar Counts
              </a>

              <Link to="/disaster-heroes" onClick={close} className="dg-secondary-cta">
                <Shield size={14} strokeWidth={2} />
                Sponsor a verified case for $20/month
                <ArrowRight size={13} />
              </Link>

              <div style={{ textAlign: "center", paddingBottom: 2 }}>
                <button
                  onClick={close}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#9ca3af", textDecoration: "underline" }}
                >
                  Continue to the website without donating
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
