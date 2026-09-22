import { Link } from "react-router-dom";
import { Printer, ChevronLeft, Smartphone, Check } from "lucide-react";
import { WDC_CAMPAIGNS, PARTNER_TYPES, PROTECT_CYCLE } from "../../assets/data/campaigns";

const PAYPAL_URL = "https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE";
const WEBSITE    = "worlddisastercenter.org";
const EMAIL      = "info@worlddisastercenter.org";

function FlyerHeader({ rightText }) {
  return (
    <div
      style={{
        background: "#001129",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: "#009EDB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 14,
            color: "#fff",
          }}
        >
          W
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: "0.08em" }}>
            WORLD DISASTER CENTER
          </div>
          <div style={{ fontSize: 9, color: "#009EDB", fontWeight: 700, letterSpacing: "0.15em" }}>
            MONITORING · ALERTING · PROTECTING
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: "#fff" }}>WDC PROTECT CAMPAIGNS 2027</div>
        <div style={{ fontSize: 9, color: "#009EDB" }}>{rightText}</div>
      </div>
    </div>
  );
}

function FlyerFooter() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        background: "#fff",
        borderTop: "4px solid #009EDB",
        gap: 16,
        marginTop: "auto",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 900, color: "#001129" }}>{WEBSITE}</div>
        <div style={{ fontSize: 9, color: "#6b7280", marginTop: 2 }}>
          Donate: <span style={{ color: "#009EDB" }}>{PAYPAL_URL.replace("https://", "")}</span>
        </div>
        <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 2, fontStyle: "italic" }}>
          Monitoring. Alerting. Protecting.
        </div>
      </div>
      <div
        style={{
          width: 56,
          height: 56,
          border: "2px dashed #009EDB60",
          borderRadius: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Smartphone size={18} color="#009EDB" strokeWidth={1.5} />
        <div style={{ fontSize: 7, color: "#9ca3af", textAlign: "center", lineHeight: 1.3, marginTop: 2 }}>
          Scan to donate
        </div>
      </div>
    </div>
  );
}

export default function AllCampaignsFlyerPage() {
  return (
    <>
      {/* ── Print + responsive styles ── */}
      <style>{`
        @media print {
          .flyer-controls { display: none !important; }
          body { margin: 0; padding: 0; }
          .flyer-page {
            width: 210mm; min-height: 297mm; margin: 0;
            box-shadow: none !important; page-break-after: always;
          }
          .flyer-scaler { transform: none !important; }
        }
        @page { size: A4 portrait; margin: 0; }
        .flyer-scaler { transform-origin: top center; }
        @media (max-width: 830px) {
          .flyer-scaler {
            transform: scale(calc((100vw - 16px) / 794));
            margin-bottom: calc(-1123px * (1 - (100vw - 16px) / 794));
          }
        }
        @media (max-width: 500px) {
          .flyer-controls { padding: 8px 12px !important; }
          .flyer-controls-title { display: none; }
        }
      `}</style>

      {/* ── Controls bar (screen only) ── */}
      <div
        className="flyer-controls"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#001129",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 24px",
          gap: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
      >
        <Link
          to="/campaigns"
          style={{
            color: "#009EDB",
            fontWeight: 700,
            fontSize: 13,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ChevronLeft size={15} /> Back to Campaigns
        </Link>
        <span className="flyer-controls-title" style={{ fontWeight: 800, fontSize: 14, color: "#fff", flex: 1, textAlign: "center" }}>
          WDC Campaign Portfolio — All 11 Campaigns
        </span>
        <button
          onClick={() => window.print()}
          style={{
            background: "#009EDB",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Printer size={14} /> Print / Save PDF
        </button>
      </div>

      <div style={{ background: "#e5e7eb", padding: "16px 0", minHeight: "100vh", overflowX: "hidden" }}>
        <div className="flyer-scaler" style={{ width: 794, margin: "0 auto" }}>

        {/* ══════════════════════════════════════════════
            PAGE 1 — Campaign Overview
        ══════════════════════════════════════════════ */}
        <div
          className="flyer-page"
          style={{
            width: 794,
            minHeight: 1123,
            marginBottom: 32,
            background: "#fff",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            overflow: "hidden",
          }}
        >
          <FlyerHeader rightText="11 Campaigns · Worldwide" />

          {/* ── Hero strip ── */}
          <div
            style={{
              background: "#001129",
              padding: "18px 24px",
              borderBottom: "3px solid #009EDB",
            }}
          >
            <h1
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#fff",
                margin: "0 0 6px",
                letterSpacing: "-0.02em",
              }}
            >
              Protecting the Most Vulnerable People on Earth
            </h1>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
              11 Active Campaigns · 27+ Countries · AI-Powered Intelligence
            </p>
          </div>

          {/* ── Campaigns grid ── */}
          <div
            style={{
              padding: "16px 20px",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {WDC_CAMPAIGNS.map((c, i) => (
                <div
                  key={c.slug}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderTop: `3px solid ${c.color}`,
                    borderRadius: 8,
                    padding: "10px 12px",
                    background: "#fff",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, background: c.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Check size={11} color="#fff" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 900, color: "#111827", lineHeight: 1.2 }}>
                      {c.title}
                    </span>
                  </div>
                  <p style={{ fontSize: 9, color: "#6b7280", margin: "0 0 6px", lineHeight: 1.4 }}>
                    {c.tagline}
                  </p>
                  {c.vulnerabilityStats[0] && (
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 900, color: c.color }}>
                        {c.vulnerabilityStats[0].value}
                      </span>
                      <span style={{ fontSize: 8, color: "#9ca3af", lineHeight: 1.3 }}>
                        {c.vulnerabilityStats[0].label}
                      </span>
                    </div>
                  )}
                  <div style={{ fontSize: 8, color: "#009EDB" }}>
                    {WEBSITE}/campaigns/{c.slug}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <div
            style={{
              background: "#001129",
              padding: "10px 24px",
              textAlign: "center",
              fontSize: 11,
              color: "#9ca3af",
            }}
          >
            Partner with us ·{" "}
            <span style={{ color: "#009EDB", fontWeight: 700 }}>{EMAIL}</span>
            {" "}·{" "}
            <span style={{ color: "#fff", fontWeight: 700 }}>{WEBSITE}</span>
          </div>

          <FlyerFooter />
        </div>

        {/* ══════════════════════════════════════════════
            PAGE 2 — Partnership Opportunities
        ══════════════════════════════════════════════ */}
        <div
          className="flyer-page"
          style={{
            width: 794,
            minHeight: 1123,
            margin: "0 auto",
            background: "#fff",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
            overflow: "hidden",
          }}
        >
          <FlyerHeader rightText="Partnership Opportunities" />

          {/* ── Page title ── */}
          <div style={{ padding: "14px 24px 10px", borderBottom: "2px solid #e5e7eb" }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: "#001129",
                margin: "0 0 5px",
              }}
            >
              Partner With WDC — Make Your Impact Measurable
            </h2>
            <p style={{ fontSize: 11, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
              We don't just accept donations. We build structured partnerships with governments, corporations,
              foundations, and NGOs that deliver named, verified outcomes.
            </p>
          </div>

          {/* ── Partner type cards ── */}
          <div style={{ padding: "14px 24px 10px" }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 900,
                color: "#001129",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              7 Ways to Partner
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 8,
              }}
            >
              {PARTNER_TYPES.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: 4, background: "#001129", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 8, fontWeight: 900, color: "#009EDB" }}>0{i + 1}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 900, color: "#111827", marginBottom: 3 }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: 9, color: "#6b7280", lineHeight: 1.4 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
              {/* Last card — centered in 2-col (7 items = 4 rows, last row 1 item) */}
              {/* PARTNER_TYPES already has 7 items, grid handles it naturally */}
            </div>
          </div>

          {/* ── PROTECT Cycle section ── */}
          <div
            style={{
              padding: "12px 24px 10px",
              background: "#f9fafb",
              borderTop: "2px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 900,
                color: "#001129",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              The WDC PROTECT Operating Cycle
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 7,
              }}
            >
              {PROTECT_CYCLE.map((step, i) => (
                <div
                  key={step.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 7,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#001129",
                      color: "#009EDB",
                      fontSize: 10,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 800, color: "#111827" }}>{step.label}</div>
                    <div style={{ fontSize: 8, color: "#9ca3af", lineHeight: 1.3, marginTop: 1 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Engagement box ── */}
          <div
            style={{
              margin: "12px 24px",
              border: "2px solid #009EDB",
              borderRadius: 10,
              padding: "14px 18px",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: "#001129",
                marginBottom: 10,
              }}
            >
              Ready to Partner?
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { num: 1, label: "Email us", value: EMAIL, color: "#009EDB" },
                { num: 2, label: "Visit our partner portal", value: `${WEBSITE}/roster`, color: "#001129" },
                { num: 3, label: "Donate via PayPal", value: PAYPAL_URL.replace("https://", ""), color: "#009EDB" },
              ].map((item) => (
                <div key={item.num} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#009EDB",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.num}
                  </div>
                  <span style={{ fontSize: 10, color: "#6b7280" }}>{item.label}:</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <FlyerFooter />
        </div>
        </div>{/* end flyer-scaler */}
      </div>
    </>
  );
}
