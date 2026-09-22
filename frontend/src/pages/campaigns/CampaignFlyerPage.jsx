import { useParams, Link, Navigate } from "react-router-dom";
import { Printer, Check, ChevronLeft, Smartphone } from "lucide-react";
import { WDC_CAMPAIGNS, PARTNER_TYPES } from "../../assets/data/campaigns";
import { CAMPAIGN_DETAILS } from "../../assets/data/campaignDetails";

const PAYPAL_URL = "https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE";
const WEBSITE    = "worlddisastercenter.org";
const EMAIL      = "info@worlddisastercenter.org";

export default function CampaignFlyerPage() {
  const { slug } = useParams();
  const c = WDC_CAMPAIGNS.find(x => x.slug === slug);
  if (!c) return <Navigate to="/campaigns" replace />;

  const d = CAMPAIGN_DETAILS?.[slug];

  return (
    <>
      {/* ── Print styles ── */}
      <style>{`
        @media print {
          .flyer-controls { display: none !important; }
          body { margin: 0; padding: 0; }
          .flyer-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            box-shadow: none !important;
            page-break-after: always;
          }
        }
        @page { size: A4 portrait; margin: 0; }
      `}</style>

      {/* ── Controls bar (screen only) ── */}
      <div
        className="flyer-controls"
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "#001129", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 24px", gap: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
      >
        <Link
          to={`/campaigns/${slug}`}
          style={{ color: "#009EDB", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}
        >
          <ChevronLeft size={15} /> Back to Campaign
        </Link>
        <span style={{ fontWeight: 800, fontSize: 14, color: "#fff", flex: 1, textAlign: "center" }}>
          {c.title} — Campaign Flyer
        </span>
        <button
          onClick={() => window.print()}
          style={{
            background: c.color, color: "#fff", border: "none", borderRadius: 8,
            padding: "8px 18px", fontWeight: 800, fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <Printer size={14} /> Print / Save PDF
        </button>
      </div>

      {/* ── Flyer page ── */}
      <div style={{ background: "#e5e7eb", padding: "24px 0", minHeight: "100vh" }}>
        <div
          className="flyer-page"
          style={{
            width: 794, minHeight: 1123, margin: "0 auto",
            background: "#fff", boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            display: "flex", flexDirection: "column",
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            overflow: "hidden",
          }}
        >

          {/* ── HEADER ── */}
          <div style={{
            background: "#001129", height: 60,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 24px", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 6, background: "#009EDB",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 14, color: "#fff",
              }}>W</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: "0.08em" }}>
                  WORLD DISASTER CENTER
                </div>
                <div style={{ fontSize: 9, color: "#009EDB", fontWeight: 700, letterSpacing: "0.15em" }}>
                  MONITORING · ALERTING · PROTECTING
                </div>
              </div>
            </div>
            <div style={{
              background: c.color, color: "#fff",
              padding: "4px 14px", borderRadius: 20,
              fontSize: 10, fontWeight: 900, letterSpacing: "0.12em",
            }}>
              PROTECT SERIES
            </div>
          </div>

          {/* ── HERO IMAGE ── */}
          <div style={{ height: 220, position: "relative", overflow: "hidden", flexShrink: 0 }}>
            <img
              src={c.heroImage}
              alt={c.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px 24px 18px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: c.color, borderRadius: 4, padding: "3px 10px",
                marginBottom: 8, alignSelf: "flex-start",
              }}>
                <span style={{ fontSize: 9, fontWeight: 900, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  WDC CAMPAIGN
                </span>
              </div>
              <h1 style={{
                fontSize: 30, fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1.05,
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}>
                {c.title}
              </h1>
              <p style={{
                fontSize: 13, fontWeight: 700, color: c.color, margin: "6px 0 0",
                textShadow: "0 1px 4px rgba(0,0,0,0.6)", letterSpacing: "0.02em",
              }}>
                {c.tagline}
              </p>
            </div>
          </div>

          {/* ── INTRO ── */}
          <div style={{ background: "#fff", padding: "14px 24px 10px" }}>
            <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, margin: 0, columnCount: 2, columnGap: 24 }}>
              {c.shortDesc}
            </p>
          </div>

          {/* ── STATS BAR ── */}
          <div style={{
            background: c.color + "1a", borderTop: `2px solid ${c.color}30`, borderBottom: `2px solid ${c.color}30`,
            padding: "12px 24px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
          }}>
            {c.vulnerabilityStats.slice(0, 4).map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 8px", borderRight: i < 3 ? `1px solid ${c.color}30` : "none" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: c.color, lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: 9, color: "#6b7280", lineHeight: 1.3, marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── WHAT WE DO ── */}
          <div style={{ background: "#fff", padding: "14px 24px 10px" }}>
            <div style={{ fontSize: 10, fontWeight: 900, color: "#001129", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
              HOW WDC ACTS ON {c.title.toUpperCase()}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {c.whatWeDo.slice(0, 6).map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: c.color + "20", border: `1px solid ${c.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color: c.color,
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 900 }}>0{i + 1}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#111827", marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 9, color: "#6b7280", lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── TANGIBLE OUTPUTS ── */}
          <div style={{ background: "#f9fafb", padding: "12px 24px 10px", borderTop: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 10, fontWeight: 900, color: "#001129", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
              WHAT YOU GET AS A PARTNER
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
              {c.tangibleOutputs.slice(0, 4).map((o, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 10px",
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 4,
                    background: c.color, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Check size={12} color="#fff" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#111827", marginBottom: 2 }}>{o.title}</div>
                    <div style={{ fontSize: 9, color: "#6b7280", lineHeight: 1.4 }}>{o.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── PARTNERSHIP STRIP ── */}
          <div style={{ background: "#001129", padding: "12px 24px", borderTop: "2px solid " + c.color }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              PARTNER WITH WDC ON THIS CAMPAIGN
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {PARTNER_TYPES.slice(0, 3).map((p, i) => (
                <div key={i} style={{
                  background: c.color + "25", border: `1px solid ${c.color}50`, borderRadius: 20,
                  padding: "3px 10px", fontSize: 9, fontWeight: 700, color: c.color,
                }}>
                  {p.title}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af" }}>
              Contact us: <span style={{ color: "#009EDB", fontWeight: 700 }}>{EMAIL}</span>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div style={{
            marginTop: "auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 24px", background: "#fff", borderTop: `4px solid ${c.color}`, gap: 16,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: "#001129" }}>{WEBSITE}</div>
              <div style={{ fontSize: 9, color: "#6b7280", marginTop: 2 }}>
                Donate: <span style={{ color: "#009EDB" }}>{PAYPAL_URL.replace("https://", "")}</span>
              </div>
              <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 2, fontStyle: "italic" }}>
                Monitoring. Alerting. Protecting.
              </div>
            </div>
            <div style={{
              width: 56, height: 56,
              border: `2px dashed ${c.color}60`, borderRadius: 6,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              flexShrink: 0, gap: 3,
            }}>
              <Smartphone size={18} color={c.color} strokeWidth={1.5} />
              <div style={{ fontSize: 7, color: "#9ca3af", textAlign: "center", lineHeight: 1.3 }}>
                Scan to donate
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
