import React, { useState, useRef, useEffect } from "react";

/**
 * Text input with optional suggestions dropdown.
 * - Always shows what the user typed (not a select — free-form allowed)
 * - Suggestions filter as user types; click to fill input
 * - onEnter called when user presses Enter with a non-empty value
 * - onChange called on every keystroke AND on suggestion click
 */
export default function AutocompleteInput({
  value,
  onChange,
  suggestions = [],
  placeholder = "",
  className = "",
  onEnter,
  autoComplete = "off",
}) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const containerRef = useRef(null);

  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes((value || "").toLowerCase()) && s.toLowerCase() !== (value || "").toLowerCase()
  ).slice(0, 8);

  const showDropdown = open && value && filtered.length > 0;

  function select(s) {
    onChange(s);
    setOpen(false);
    setActiveIdx(-1);
  }

  function handleKeyDown(e) {
    if (!showDropdown) {
      if (e.key === "Enter" && value?.trim() && onEnter) {
        e.preventDefault();
        onEnter(value.trim());
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && filtered[activeIdx]) {
        select(filtered[activeIdx]);
      } else if (value?.trim() && onEnter) {
        onEnter(value.trim());
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIdx(-1);
    }
  }

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (!containerRef.current?.contains(e.target)) {
        setOpen(false);
        setActiveIdx(-1);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={value || ""}
        onChange={e => { onChange(e.target.value); setOpen(true); setActiveIdx(-1); }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={className}
      />
      {showDropdown && (
        <ul
          className="absolute z-50 w-full mt-1 bg-white border border-border rounded-xl shadow-lg max-h-52 overflow-y-auto"
          role="listbox"
        >
          {filtered.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                role="option"
                aria-selected={i === activeIdx}
                className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                style={{
                  background: i === activeIdx ? "rgba(0,158,219,0.08)" : "transparent",
                  color: i === activeIdx ? "#009EDB" : "#334155",
                  fontWeight: i === activeIdx ? 600 : 400,
                }}
                onMouseDown={e => { e.preventDefault(); select(s); }}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
