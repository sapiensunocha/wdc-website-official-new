import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Download, BookOpen, Maximize2, Minimize2 } from "lucide-react";

const TOTAL_PAGES_FALLBACK = 10;

export default function GVIBookReader({ onClose }) {
  const iframeRef = useRef(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(TOTAL_PAGES_FALLBACK);
  const [ready, setReady] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const send = useCallback((msg) => {
    iframeRef.current?.contentWindow?.postMessage(
      { source: "gvi_reader", ...msg },
      "*"
    );
  }, []);

  useEffect(() => {
    function onMessage(e) {
      if (!e.data || e.data.type !== "gvi_state") return;
      setPage(e.data.page);
      setTotal(e.data.total);
      if (!ready) setReady(true);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [ready]);

  function onIframeLoad() {
    setTimeout(() => send({ type: "init" }), 120);
  }

  function goTo(n) {
    const clamped = Math.max(0, Math.min(n, total - 1));
    send({ type: "go", page: clamped });
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(page + 1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(page - 1);
    if (e.key === "Escape") onClose();
  }

  function handleDownload() {
    const a = document.createElement("a");
    a.href = "/gvi-2027.html";
    a.download = "WDC-Global-Vulnerability-Index-2027.html";
    a.click();
  }

  const SECTION_LABELS = [
    "Cover",
    "Table of Contents",
    "Executive Summary",
    "Methodology",
    "Global Rankings",
    "Regional Analysis",
    "Thematic Analysis",
    "Country Profiles",
    "Policy Recommendations",
    "Appendix",
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ background: "rgba(5, 10, 25, 0.97)" }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 shrink-0"
        style={{ background: "#0a1628", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Left: branding */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#009EDB22", border: "1px solid #009EDB55" }}
          >
            <BookOpen size={16} className="text-[#009EDB]" />
          </div>
          <div>
            <p className="text-white text-xs font-black leading-tight">
              Global Vulnerability Index 2027
            </p>
            <p className="text-white/40 text-[10px]">
              {SECTION_LABELS[page] ?? `Page ${page + 1}`}
            </p>
          </div>
        </div>

        {/* Center: page nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
            style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
            aria-label="Previous page"
          >
            <ChevronLeft size={15} />
          </button>

          <span className="text-white/60 text-xs tabular-nums min-w-[70px] text-center">
            {ready ? `${page + 1} / ${total}` : "Loading…"}
          </span>

          <button
            onClick={() => goTo(page + 1)}
            disabled={page >= total - 1}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
            style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
            aria-label="Next page"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:opacity-80"
            style={{ background: "#009EDB22", border: "1px solid #009EDB55", color: "#009EDB" }}
          >
            <Download size={12} /> Download
          </button>
          <button
            onClick={() => setFullscreen((f) => !f)}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
            aria-label="Toggle fullscreen"
          >
            {fullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/20"
            style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
            aria-label="Close reader"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* ── Section thumbnail strip ── */}
      <div
        className="flex gap-1 px-3 py-1.5 overflow-x-auto shrink-0 scrollbar-hide"
        style={{ background: "#06101f", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {SECTION_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="shrink-0 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            style={{
              background: i === page ? "#009EDB22" : "rgba(255,255,255,0.04)",
              border: `1px solid ${i === page ? "#009EDB55" : "rgba(255,255,255,0.06)"}`,
              color: i === page ? "#009EDB" : "rgba(255,255,255,0.35)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── iFrame ── */}
      <div className="flex-1 relative overflow-hidden">
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: "#009EDB55", borderTopColor: "#009EDB" }}
              />
              <p className="text-white/40 text-xs">Loading report…</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src="/gvi-2027.html"
          title="WDC Global Vulnerability Index 2027"
          onLoad={onIframeLoad}
          className="w-full h-full border-0"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.4s ease",
            background: "#fff",
          }}
        />
      </div>

      {/* ── Bottom prev/next bar (mobile-friendly) ── */}
      <div
        className="flex items-center justify-between px-4 py-2.5 shrink-0 sm:hidden"
        style={{ background: "#0a1628", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <button
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-30"
          style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
        >
          <ChevronLeft size={14} /> Prev
        </button>
        <span className="text-white/50 text-xs tabular-nums">
          {page + 1} / {total}
        </span>
        <button
          onClick={() => goTo(page + 1)}
          disabled={page >= total - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-30"
          style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
