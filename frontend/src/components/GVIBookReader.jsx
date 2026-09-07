import { useRef, useState, useEffect } from "react";
import { X, Download, BookOpen } from "lucide-react";

export default function GVIBookReader({ onClose }) {
  const iframeRef = useRef(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(34);

  useEffect(() => {
    function onMsg(e) {
      if (e.data?.type === "gvi_state") {
        setPage(e.data.page ?? 0);
        setTotal(e.data.total ?? 34);
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col" style={{ background: "#08081a" }}>

      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{ background: "rgba(0,0,0,0.55)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-2.5">
          <BookOpen size={15} className="text-[#009EDB]" />
          <span className="text-white text-xs font-black">Global Vulnerability Index 2027</span>
          <span className="text-white/30 text-xs hidden sm:inline">· Nostradamus Report</span>
        </div>

        <span className="text-white/40 text-xs tabular-nums">
          {page + 1} / {total}
        </span>

        <div className="flex items-center gap-2">
          <a
            href="/gvi-2027.pdf"
            download="WDC-Global-Vulnerability-Index-2027.pdf"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all hover:opacity-80"
            style={{ background: "#009EDB22", border: "1px solid #009EDB44", color: "#009EDB" }}
          >
            <Download size={11} /> Download PDF
          </a>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/20"
            style={{ background: "rgba(255,255,255,0.07)", color: "white" }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* ── PDF Flipbook ── */}
      <iframe
        ref={iframeRef}
        src="/gvi-reader.html"
        title="WDC GVI 2027"
        className="flex-1 w-full border-0"
        style={{ background: "#0a0a18" }}
      />
    </div>
  );
}
