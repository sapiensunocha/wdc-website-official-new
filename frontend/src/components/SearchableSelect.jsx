import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

/**
 * Searchable combobox — type to filter, click to select.
 * style prop → applied to the visual trigger div (controls border, padding, radius, etc.)
 * Works with both inline-styled forms and Tailwind forms.
 */
export default function SearchableSelect({
  options = [],
  value = "",
  onChange,
  placeholder = "Select…",
  className = "",
  style = {},
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef(null);

  const filtered = options.filter(o =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function select(opt) { onChange(opt); setQuery(""); setOpen(false); }
  function clear(e) { e.stopPropagation(); onChange(""); setQuery(""); }

  return (
    <div ref={ref} className={className} style={{ position: "relative", width: "100%" }}>
      {/* Trigger */}
      <div
        style={{ ...style, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        onClick={() => setOpen(o => !o)}
      >
        {open ? (
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Escape") { setOpen(false); setQuery(""); }
              if (e.key === "Enter" && filtered.length > 0) select(filtered[0]);
            }}
            placeholder="Type to search…"
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              fontSize: "inherit", color: "inherit", fontFamily: "inherit", minWidth: 0,
            }}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span style={{
            flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            color: value ? (style.color || "#1e293b") : "#94a3b8",
          }}>
            {value || placeholder}
          </span>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          {value && !open && (
            <button
              type="button"
              onClick={clear}
              style={{ background: "none", border: "none", cursor: "pointer",
                       color: "#94a3b8", display: "flex", alignItems: "center", padding: 0 }}
            >
              <X size={13} />
            </button>
          )}
          <ChevronDown
            size={14}
            style={{
              color: "#94a3b8", flexShrink: 0,
              transition: "transform .15s",
              transform: open ? "rotate(180deg)" : "none",
            }}
          />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 300,
          background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12,
          boxShadow: "0 8px 30px rgba(0,0,0,.14), 0 0 0 0.5px rgba(0,0,0,.04)",
          maxHeight: 240, overflowY: "auto",
        }}>
          {filtered.length === 0 ? (
            <p style={{ padding: "10px 14px", fontSize: 13, color: "#94a3b8", margin: 0 }}>
              No results for "{query}"
            </p>
          ) : filtered.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => select(opt)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "9px 14px", fontSize: 13, border: "none",
                cursor: "pointer", fontFamily: "inherit",
                background: opt === value ? "rgba(0,158,219,.07)" : "transparent",
                color: opt === value ? "#009EDB" : "#1e293b",
                fontWeight: opt === value ? 600 : 400,
                transition: "background .1s",
              }}
              onMouseEnter={e => { if (opt !== value) e.currentTarget.style.background = "#F8FAFC"; }}
              onMouseLeave={e => { if (opt !== value) e.currentTarget.style.background = "transparent"; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
