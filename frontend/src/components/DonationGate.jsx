import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Heart, Shield, ArrowRight, Globe } from "lucide-react";

const PAYPAL_URL = "https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE";
const STORAGE_KEY = "wdc_gate_seen_v1";
const DELAY_MS = 4000;

const STATS = [
  { icon: Globe,  value: "1,000+", label: "active crises tracked right now" },
  { icon: Shield, value: "94",     label: "people sponsored through Disaster Heroes" },
  { icon: Heart,  value: "$20",    label: "minimum monthly sponsorship" },
];

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
          {/* Backdrop */}
          <motion.div
            key="gate-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            style={{
              position: "fixed", inset: 0, zIndex: 10000,
              background: "rgba(0,8,24,0.72)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Modal */}
          <motion.div
            key="gate-modal"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            style={{
              position: "fixed", zIndex: 10001,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "min(560px, 94vw)",
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
            }}
          >
            {/* Hero image strip */}
            <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=70"
                alt="Children in crisis"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,17,41,0.4) 0%, rgba(0,17,41,0.85) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 1.2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 10, fontWeight: 900, color: "#fff", letterSpacing: "0.18em", textTransform: "uppercase" }}>Live — Crises are happening right now</span>
                </div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
                  Will you stand with the most<br />vulnerable people on Earth?
                </h2>
              </div>
              <button
                onClick={close}
                style={{
                  position: "absolute", top: 12, right: 12,
                  background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "50%", width: 30, height: 30,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 22px 14px" }}>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "#374151", lineHeight: 1.65 }}>
                World Disaster Center monitors 1,000+ crises in real time and mobilizes relief for verified families and individuals.
                Your support — however small — keeps field teams active and people alive.
              </p>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 18 }}>
                {STATS.map(({ icon: Icon, value, label }) => (
                  <div key={label} style={{
                    textAlign: "center", background: "#f0f9ff",
                    border: "1px solid #bae6fd", borderRadius: 10, padding: "10px 6px",
                  }}>
                    <Icon size={16} color="#009EDB" strokeWidth={1.8} style={{ margin: "0 auto 4px" }} />
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#001129", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 9, color: "#6b7280", lineHeight: 1.35, marginTop: 3 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <a
                href={PAYPAL_URL}
                target="_blank"
                rel="noreferrer"
                onClick={close}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: "#009EDB", color: "#fff",
                  fontWeight: 900, fontSize: 15, borderRadius: 10, padding: "13px 20px",
                  textDecoration: "none", marginBottom: 10,
                }}
              >
                <Heart size={16} strokeWidth={2} />
                Donate Now — Every Dollar Counts
              </a>

              {/* Secondary CTA */}
              <Link
                to="/disaster-heroes"
                onClick={close}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: "#f0f9ff", color: "#009EDB",
                  fontWeight: 800, fontSize: 13, borderRadius: 10, padding: "11px 20px",
                  textDecoration: "none", border: "1px solid #bae6fd", marginBottom: 14,
                }}
              >
                <Shield size={14} strokeWidth={2} />
                Or sponsor a verified case for $20/month
                <ArrowRight size={13} />
              </Link>

              {/* Skip */}
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={close}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 11, color: "#9ca3af", textDecoration: "underline",
                  }}
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
