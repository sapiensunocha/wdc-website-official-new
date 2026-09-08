import { useRef, useState, useEffect } from "react";
import { Download, BookOpen, ExternalLink, ChevronDown } from "lucide-react";

// WDC design tokens
const D = {
  bg: "#FFFFFF", bgSubtle: "#F1F5F9", border: "#E2E8F0",
  textPri: "#0D1F2D", textSec: "#475569", textTer: "#94A3B8",
  primary: "#009EDB", primaryMt: "#E8F5FC",
};

export default function GVIBookReader({ onClose }) {
  const iframeRef = useRef(null);
  const [page, setPage]   = useState(0);
  const [total, setTotal] = useState(53);

  useEffect(() => {
    function onMsg(e) {
      if (e.data?.type === "gvi_state") {
        setPage(e.data.page ?? 0);
        setTotal(e.data.total ?? 53);
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <div style={{ background: D.bgSubtle, border: `1px solid ${D.border}`, borderRadius: 16, overflow: "hidden", marginTop: 24 }}>

      {/* ── Header ── */}
      <div style={{ background: D.bg, borderBottom: `1px solid ${D.border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: D.primaryMt, borderRadius: 8, padding: 7 }}>
            <BookOpen size={15} style={{ color: D.primary }} />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: D.textPri, margin: 0, lineHeight: 1.2 }}>Global Vulnerability Index 2027</h3>
            <p style={{ fontSize: 11, color: D.textSec, margin: 0, marginTop: 2 }}>
              Nostradamus Report · Page {page + 1} of {total}
            </p>
          </div>
          <span style={{ fontSize: 11, background: D.primaryMt, border: `1px solid ${D.primary}33`, color: D.primary, borderRadius: 20, padding: "3px 10px", fontWeight: 700 }}>
            Monthly Intelligence
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a
            href="/gvi-2027.pdf"
            download="WDC-Global-Vulnerability-Index-2027.pdf"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: D.primaryMt, border: `1px solid ${D.primary}44`, color: D.primary, textDecoration: "none" }}
          >
            <Download size={12} /> Download PDF
          </a>
          <a
            href="/gvi-reader.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: D.bgSubtle, border: `1px solid ${D.border}`, color: D.textSec, textDecoration: "none" }}
          >
            <ExternalLink size={12} /> Full Page
          </a>
          <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: D.bgSubtle, border: `1px solid ${D.border}`, color: D.textSec, cursor: "pointer" }}>
            <ChevronDown size={14} /> Collapse
          </button>
        </div>
      </div>

      {/* ── Flipbook ── */}
      <iframe
        ref={iframeRef}
        src="/gvi-reader.html"
        title="WDC GVI 2027"
        style={{ width: "100%", height: 640, border: "none", display: "block", background: "#f8fafb" }}
      />
    </div>
  );
}
