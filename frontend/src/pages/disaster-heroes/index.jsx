import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rss, Grid3X3, Map, BarChart2, Shield, CheckCircle, Activity,
  Zap, ExternalLink, Globe, Building2, ArrowRight, Search,
  Plus, RefreshCw,
} from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SEOMeta from "../../components/SEOMeta";
import AnimateIn from "../../components/AnimateIn";
import { CRISIS_CASES, HERO_BADGES } from "../../assets/data/crisis-cases";
import { COMMUNITY_POSTS } from "../../assets/data/community-posts";

// ─── API Config ───────────────────────────────────────────────────────────────
const MICHAEL_URL =
  import.meta.env.VITE_MICHAEL_API_URL ||
  "https://michael-api-382117221028.us-central1.run.app";
const MICHAEL_KEY =
  import.meta.env.VITE_MICHAEL_API_SECRET || "xeltis-prod-key-2026";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const PRIMARY = "#009EDB";
const NAVY    = "#001129";
const BG      = "#F8FAFC";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function normType(raw) {
  if (!raw) return "Other";
  const t = String(raw).toLowerCase();
  if (t.includes("flood"))      return "Flood";
  if (t.includes("earthquake")) return "Earthquake";
  if (t.includes("storm") || t.includes("cyclone") || t.includes("hurricane")) return "Storm";
  if (t.includes("fire"))       return "Wildfire";
  if (t.includes("drought"))    return "Drought";
  if (t.includes("conflict") || t.includes("violence")) return "Conflict";
  if (t.includes("disease") || t.includes("epidemic"))  return "Disease";
  if (t.includes("tsunami"))    return "Tsunami";
  return "Crisis";
}

const TYPE_ICON = {
  Flood: "💧", Earthquake: "🌍", Storm: "🌀", Wildfire: "🔥",
  Drought: "🌵", Conflict: "⚔️", Disease: "🦠", Tsunami: "🌊", Crisis: "⚠️",
};

const URGENCY_COLOR = { critical: "#EF4444", high: "#F97316", moderate: "#009EDB" };
const URGENCY_LABEL = { critical: "CRITICAL", high: "HIGH", moderate: "MODERATE" };
const CATEGORY_ICONS = { health: "💊", education: "📚", shelter: "🏠" };

function pct(funded, goal) {
  if (!goal) return 0;
  return Math.min(100, Math.round((funded / goal) * 100));
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600)   return `${Math.max(1, Math.floor(diff / 60))}m ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const POST_TYPE_META = {
  new_case:         { label: "New Case",         color: PRIMARY,    bg: "#EFF9FF" },
  crisis_alert:     { label: "Crisis Alert",     color: "#EF4444",  bg: "#FEF2F2" },
  field_update:     { label: "Field Update",     color: "#059669",  bg: "#ECFDF5" },
  impact_story:     { label: "Impact Story",     color: "#d97706",  bg: "#FFFBEB" },
  community_report: { label: "Community Report", color: "#7c3aed",  bg: "#F5F3FF" },
};

const SEVERITY_META = {
  critical: { label: "CRITICAL", color: "#fff", bg: "#EF4444" },
  high:     { label: "HIGH",     color: "#fff", bg: "#F97316" },
  moderate: { label: "MODERATE", color: "#fff", bg: "#F59E0B" },
};

const TRENDING_TAGS  = [];
const ACTIVE_HEROES  = [];

// ─── Compose Modal ────────────────────────────────────────────────────────────
function ComposeModal({ open, onClose }) {
  const [type, setType]       = useState("field_update");
  const [text, setText]       = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags]       = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [posted, setPosted]   = useState(false);

  function handlePost() {
    if (!text.trim()) return;
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      setText(""); setLocation(""); setTags(""); setImageUrl("");
      onClose();
    }, 1800);
  }

  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        style={{
          background: "#fff", borderRadius: 20, width: "100%", maxWidth: 540,
          padding: "1.75rem", boxShadow: "0 24px 64px rgba(0,0,0,0.22)", position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <p style={{ fontWeight: 900, fontSize: 16, color: NAVY }}>Share to Community Feed</p>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94a3b8" }}>×</button>
        </div>

        {/* Type selector */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1rem" }}>
          {Object.entries(POST_TYPE_META).map(([id, m]) => (
            <button
              key={id}
              onClick={() => setType(id)}
              style={{
                fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20,
                border: `1px solid ${type === id ? m.color : "#e2e8f0"}`,
                background: type === id ? m.bg : "transparent",
                color: type === id ? m.color : "#64748b", cursor: "pointer",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Share a crisis, an update, or a story…"
          rows={5}
          style={{
            width: "100%", border: "1px solid #e2e8f0", borderRadius: 12,
            padding: "12px 14px", fontSize: 13, color: NAVY, resize: "vertical",
            outline: "none", fontFamily: "inherit", boxSizing: "border-box",
          }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          <input
            value={location} onChange={e => setLocation(e.target.value)}
            placeholder="Location (e.g. Bay Region, Somalia)"
            style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: NAVY, outline: "none" }}
          />
          <input
            value={tags} onChange={e => setTags(e.target.value)}
            placeholder="#Tags (e.g. #Somalia #Flood)"
            style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: NAVY, outline: "none" }}
          />
        </div>

        <input
          value={imageUrl} onChange={e => setImageUrl(e.target.value)}
          placeholder="Image URL (optional)"
          style={{
            width: "100%", border: "1px solid #e2e8f0", borderRadius: 10,
            padding: "10px 12px", fontSize: 12, color: NAVY, marginTop: 10,
            outline: "none", boxSizing: "border-box",
          }}
        />

        <div style={{ marginTop: 14, padding: "10px 12px", background: "#f8fafc", borderRadius: 10, marginBottom: 4 }}>
          <p style={{ fontSize: 11, color: "#64748b", margin: 0 }}>
            Posts are reviewed by the WDC team before appearing in the public feed.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 12, justifyContent: "flex-end", alignItems: "center" }}>
          {posted && <span style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>Posted!</span>}
          <button
            onClick={handlePost}
            disabled={!text.trim()}
            style={{
              background: text.trim() ? PRIMARY : "#cbd5e1",
              color: "#fff", border: "none", borderRadius: 10,
              padding: "10px 24px", fontWeight: 900, fontSize: 13,
              cursor: text.trim() ? "pointer" : "default",
            }}
          >
            Post to Feed
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────
function PostCard({ post, onTagClick }) {
  const [expanded, setExpanded] = useState(false);
  const [reactions, setReactions] = useState({ ...(post.reactions || { heart: 0, support: 0, alert: 0 }) });
  const [reacted, setReacted] = useState({});
  const [commentText, setCommentText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const meta = POST_TYPE_META[post.type] || POST_TYPE_META.field_update;
  const isTruncatable = (post.text || "").length > 220;
  const displayText = expanded || !isTruncatable
    ? post.text
    : (post.text || "").slice(0, 220) + "…";

  function toggleReaction(key) {
    setReactions(prev => ({ ...prev, [key]: prev[key] + (reacted[key] ? -1 : 1) }));
    setReacted(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function sendComment() {
    if (!commentText.trim()) return;
    setShowToast(true);
    setCommentText("");
    setTimeout(() => setShowToast(false), 2000);
  }

  return (
    <div
      style={{
        background: "#fff", borderRadius: 18, border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden",
        marginBottom: 18, position: "relative",
      }}
    >
      {/* Type badge */}
      <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}>
        <span style={{
          fontSize: 10, fontWeight: 800, letterSpacing: "0.06em",
          padding: "4px 10px", borderRadius: 20,
          background: meta.bg, color: meta.color,
          border: `1px solid ${meta.color}33`,
        }}>
          {meta.label.toUpperCase()}
        </span>
      </div>

      <div style={{ padding: "1rem 1rem 0" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, paddingRight: 110 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
            background: post.author?.color || PRIMARY,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 13, color: "#fff",
          }}>
            {post.author?.initials || "?"}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 900, fontSize: 13, color: NAVY }}>{post.author?.name}</span>
              {post.author?.verified && (
                <span style={{ fontSize: 10, background: PRIMARY + "18", color: PRIMARY, borderRadius: 6, padding: "1px 6px", fontWeight: 700 }}>✓ Verified</span>
              )}
              <span style={{ fontSize: 10, color: "#64748b" }}>{post.author?.role}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: "#64748b" }}>{post.timestamp ? timeAgo(post.timestamp) : ""}</span>
              {post.location && (
                <>
                  <span style={{ color: "#e2e8f0" }}>·</span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>{post.flag} {post.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Severity badge */}
        {post.type === "crisis_alert" && post.severity && (
          <div style={{ marginBottom: 10 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 10, fontWeight: 900, letterSpacing: "0.08em",
              padding: "4px 12px", borderRadius: 20,
              background: SEVERITY_META[post.severity]?.bg || "#EF4444",
              color: SEVERITY_META[post.severity]?.color || "#fff",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
              SEVERITY: {SEVERITY_META[post.severity]?.label}
            </span>
          </div>
        )}

        {/* Text */}
        <p style={{ fontSize: 13, color: NAVY, lineHeight: 1.65, marginBottom: 6 }}>{displayText}</p>
        {isTruncatable && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ background: "none", border: "none", color: PRIMARY, fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 8 }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {/* Image */}
        {post.images?.[0] && (
          <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <img src={post.images[0]} alt="" style={{ width: "100%", maxHeight: 280, objectFit: "cover", display: "block" }} loading="lazy" />
          </div>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {post.tags.map(t => (
              <button
                key={t}
                onClick={() => onTagClick?.(t)}
                style={{
                  fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                  background: PRIMARY + "14", color: PRIMARY, border: "none", cursor: "pointer",
                }}
              >{t}</button>
            ))}
          </div>
        )}

        {/* Case CTA */}
        {post.caseId && (
          <Link
            to={`/disaster-heroes/case/${post.caseId}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 800, color: PRIMARY,
              background: PRIMARY + "12", border: `1px solid ${PRIMARY}30`,
              borderRadius: 10, padding: "8px 14px", marginBottom: 12, textDecoration: "none",
            }}
          >
            View Case & Sponsor <ArrowRight size={12} />
          </Link>
        )}

        {/* MICHAEL tracking bar */}
        {post.type === "crisis_alert" && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#0a0f1e", borderRadius: 10, padding: "8px 12px", marginBottom: 12,
          }}>
            <span style={{ fontSize: 13 }}>⚡</span>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 700 }}>MICHAEL is tracking this region</span>
            <a
              href="https://michael.worlddisastercenter.org"
              target="_blank" rel="noopener noreferrer"
              style={{ marginLeft: "auto", color: "#fbbf24", fontSize: 10, display: "flex", alignItems: "center", gap: 3 }}
            >
              View live <ExternalLink size={9} />
            </a>
          </div>
        )}
      </div>

      {/* Reactions */}
      <div style={{
        display: "flex", alignItems: "center", gap: 4,
        padding: "10px 1rem", borderTop: "1px solid #f1f5f9", flexWrap: "wrap",
      }}>
        {[
          { key: "heart", emoji: "💛", label: "Heart" },
          { key: "support", emoji: "🛡️", label: "Support" },
          { key: "alert", emoji: "🚨", label: "Alert" },
        ].map(({ key, emoji }) => (
          <button
            key={key}
            onClick={() => toggleReaction(key)}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 12, fontWeight: reacted[key] ? 800 : 600,
              padding: "5px 10px", borderRadius: 20, border: "none", cursor: "pointer",
              background: reacted[key] ? "#f1f5f9" : "transparent",
              color: reacted[key] ? NAVY : "#64748b",
            }}
          >
            <span>{emoji}</span>
            <span>{reactions[key]}</span>
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#64748b" }}>
          {(post.comments?.length || 0)} comment{(post.comments?.length || 0) !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Comment input */}
      <div style={{ display: "flex", gap: 8, padding: "8px 1rem 1rem", alignItems: "center" }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: PRIMARY,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 900, color: "#fff", flexShrink: 0,
        }}>ME</div>
        <input
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendComment()}
          placeholder="Add a comment…"
          style={{
            flex: 1, border: "1px solid #e2e8f0", borderRadius: 20,
            padding: "7px 14px", fontSize: 12, color: NAVY, outline: "none", background: BG,
          }}
        />
        {showToast && <span style={{ fontSize: 11, fontWeight: 700, color: "#059669", whiteSpace: "nowrap" }}>Sent!</span>}
      </div>
    </div>
  );
}

// ─── Case Card ────────────────────────────────────────────────────────────────
function CaseCard({ c, index, hasAlert, alertCount }) {
  const funded = pct(c.fundedMonthly, c.monthlyGoal);
  const accentColor = URGENCY_COLOR[c.urgency];
  const isFamily = c.caseType === "family";
  const displayName = isFamily ? c.familyName : `${c.name}${c.age ? `, ${c.age}` : ""}`;

  return (
    <AnimateIn variant="fadeUp" delay={0.04 * index}>
      <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
        <Link
          to={`/disaster-heroes/case/${c.id}`}
          className="group block rounded-2xl overflow-hidden transition-all duration-300"
          style={{ background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
            e.currentTarget.style.borderColor = isFamily ? "#F97316" : PRIMARY;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          {/* Photo */}
          <div className="relative overflow-hidden" style={{ height: 192 }}>
            <img
              src={c.photo} alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ filter: "saturate(0.7) brightness(0.6)" }} loading="lazy"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={isFamily ? { background: "#F97316", color: "#fff" } : { background: PRIMARY, color: "#fff" }}>
                {isFamily ? "Family" : "Individual"}
              </span>
              {isFamily && (
                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}>
                  👨‍👩‍👧‍👦 {c.familySize} members
                </span>
              )}
            </div>
            <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
              <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: accentColor + "22", border: `1px solid ${accentColor}55`, color: accentColor }}>
                {URGENCY_LABEL[c.urgency]}
              </span>
              {hasAlert && (
                <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{ background: "rgba(251,191,36,0.18)", border: "1px solid rgba(251,191,36,0.45)", color: "#fbbf24" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse inline-block" />
                  LIVE{alertCount > 1 ? ` ·${alertCount}` : ""}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3"
              style={{ background: "linear-gradient(to top, rgba(0,11,24,0.85) 0%, transparent 100%)" }}>
              <p className="text-white font-black text-sm leading-tight">{displayName}</p>
              <p className="text-white/60 text-[10px] mt-0.5">{c.crisisType}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-base">{c.flag}</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: NAVY }}>{c.country}</p>
                  <p className="text-[10px] text-gray-400">{c.region}</p>
                </div>
              </div>
              <span className="text-[9px] text-gray-400 flex items-center gap-1">
                <CheckCircle size={9} style={{ color: PRIMARY }} />
                {c.verifiedBy?.includes("WDC") ? "WDC Verified" : "Partner Verified"}
              </span>
            </div>

            {c.needs && (
              <div className="space-y-1.5 mb-3">
                {Object.entries(c.needs).map(([need, amt]) => (
                  <div key={need} className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 w-16 shrink-0">
                      {CATEGORY_ICONS[need]} {need.charAt(0).toUpperCase() + need.slice(1)}
                    </span>
                    <div className="flex-1 h-1 rounded-full" style={{ background: "#f1f5f9" }}>
                      <div className="h-full rounded-full"
                        style={{ width: `${Math.round((amt / c.monthlyGoal) * 100)}%`, background: PRIMARY }} />
                    </div>
                    <span className="text-[10px] font-bold shrink-0" style={{ color: NAVY }}>${amt}/mo</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-gray-400">Monthly funded</span>
                <span className="text-[10px] font-black" style={{ color: PRIMARY }}>{funded}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${funded}%`, background: funded === 0 ? "#e5e7eb" : PRIMARY }} />
              </div>
              <p className="text-[9px] text-gray-400 mt-1">
                ${c.fundedMonthly} of ${c.monthlyGoal}/mo · {c.sponsors} sponsor{c.sponsors !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #f1f5f9" }}>
              <span className="text-[11px] text-gray-400">
                From <strong className="text-gray-700">${c.needs ? Math.min(...Object.values(c.needs)) : 0}/month</strong>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl"
                style={{ background: PRIMARY, color: "#fff" }}>
                Sponsor → <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </AnimateIn>
  );
}

// ─── World Map ────────────────────────────────────────────────────────────────
function WorldMap({ cases, michaelAlerts }) {
  const michaelPoints = michaelAlerts
    .filter(a => a.latitude && a.longitude)
    .slice(0, 50);

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[10, 20]} zoom={2}
        style={{ height: 520, width: "100%", background: "#0a0f1e" }}
        attributionControl={false} zoomControl={true} scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {cases.map(c => {
          if (!c.location?.lat || !c.location?.lng) return null;
          const isFamily = c.caseType === "family";
          const isCritical = c.urgency === "critical";
          const color = isFamily ? "#F97316" : PRIMARY;
          const radius = isFamily ? (isCritical ? 16 : 14) : (isCritical ? 12 : 10);
          return (
            <CircleMarker
              key={c.id}
              center={[c.location.lat, c.location.lng]}
              radius={radius}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.75, weight: isCritical ? 2 : 1, opacity: 0.9 }}
            >
              <Popup>
                <div style={{ minWidth: 180, fontFamily: "system-ui, sans-serif" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontSize: 18 }}>{c.flag}</span>
                    <div>
                      <p style={{ fontWeight: 900, fontSize: 13, color: NAVY, margin: 0 }}>
                        {isFamily ? c.familyName : `${c.name}${c.age ? `, ${c.age}` : ""}`}
                      </p>
                      <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{c.country} · {c.region}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: "#64748b", margin: "0 0 8px" }}>
                    Goal: <strong style={{ color: NAVY }}>${c.monthlyGoal}/mo</strong> · {pct(c.fundedMonthly, c.monthlyGoal)}% funded
                  </p>
                  <a
                    href={`/disaster-heroes/case/${c.id}`}
                    style={{
                      display: "inline-block", background: PRIMARY, color: "#fff",
                      fontWeight: 900, fontSize: 11, padding: "6px 12px", borderRadius: 8, textDecoration: "none",
                    }}
                  >View Case →</a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {michaelPoints.map((a, i) => (
          <CircleMarker
            key={`m-${i}`}
            center={[parseFloat(a.latitude), parseFloat(a.longitude)]}
            radius={6}
            pathOptions={{ color: "#DC2626", fillColor: "#DC2626", fillOpacity: 0.7, weight: 1, opacity: 0.8 }}
          />
        ))}
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: "absolute", bottom: 12, right: 12, zIndex: 1000,
        background: "rgba(0,11,24,0.88)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 10, padding: "8px 12px", backdropFilter: "blur(8px)",
      }}>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>Legend</p>
        {[
          { color: PRIMARY, label: "Individual" },
          { color: "#F97316", label: "Family" },
          { color: "#DC2626", label: "MICHAEL Alert" },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2" style={{ marginBottom: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── VIEW A: Feed ─────────────────────────────────────────────────────────────
function ViewFeed({ michaelAlerts, michaelLoading, onCompose }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("");

  const FILTER_TABS = [
    { id: "all",              label: "All" },
    { id: "new_case",         label: "New Cases" },
    { id: "crisis_alert",     label: "Crisis Alerts" },
    { id: "field_update",     label: "Field Updates" },
    { id: "impact_story",     label: "Impact Stories" },
    { id: "community_report", label: "Community Reports" },
  ];

  const filtered = useMemo(() => COMMUNITY_POSTS.filter(p => {
    const matchType = activeFilter === "all" || p.type === activeFilter;
    const matchTag = !tagFilter || (p.tags || []).some(t => t.toLowerCase() === tagFilter.toLowerCase());
    return matchType && matchTag;
  }), [activeFilter, tagFilter]);

  const criticals = michaelAlerts.filter(a => (a.severity_level || 0) >= 4).length;
  const countries = [...new Set(michaelAlerts.map(a => a.location_name).filter(Boolean))].length;

  return (
    <div className="container" style={{ paddingTop: "1.75rem", paddingBottom: "4rem" }}>
      <div className="dh-feed-grid">
        {/* Left: Feed */}
        <div>
          {/* Compose bar */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: "1rem",
            border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 14,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", background: PRIMARY,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 16, color: "#fff", flexShrink: 0,
              }}>
                <Plus size={18} />
              </div>
              <button
                onClick={() => onCompose("field_update")}
                style={{
                  flex: 1, textAlign: "left", background: BG,
                  border: "1px solid #e2e8f0", borderRadius: 22, padding: "10px 18px",
                  fontSize: 13, color: "#94a3b8", cursor: "pointer",
                }}
              >
                Share a crisis, an update, or a story…
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { icon: "🆕", label: "New Case",     type: "new_case" },
                { icon: "⚡", label: "Crisis Alert", type: "crisis_alert" },
                { icon: "📋", label: "Field Update", type: "field_update" },
                { icon: "💛", label: "Impact Story", type: "impact_story" },
              ].map(b => (
                <button
                  key={b.type}
                  onClick={() => onCompose(b.type)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    fontSize: 11, fontWeight: 700, padding: "7px 12px", borderRadius: 20,
                    border: "1px solid #e2e8f0", background: BG, color: "#64748b", cursor: "pointer",
                  }}
                >
                  {b.icon} {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 6, flexWrap: "nowrap", overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
            {FILTER_TABS.map(f => (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f.id); setTagFilter(""); }}
                style={{
                  fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20,
                  border: "none", cursor: "pointer", whiteSpace: "nowrap",
                  background: activeFilter === f.id && !tagFilter ? PRIMARY : "#fff",
                  color: activeFilter === f.id && !tagFilter ? "#fff" : "#64748b",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                  flexShrink: 0,
                }}
              >{f.label}</button>
            ))}
          </div>

          {/* Posts */}
          {COMMUNITY_POSTS.length === 0 ? (
            <div style={{
              background: "#fff", borderRadius: 18, padding: "3rem 2rem",
              textAlign: "center", border: "2px dashed #e2e8f0",
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📡</div>
              <p style={{ color: NAVY, fontWeight: 800, fontSize: 16, marginBottom: 8 }}>No posts yet</p>
              <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, maxWidth: 360, margin: "0 auto 20px" }}>
                Field officers, partner organizations, and community reporters will share crises, updates, and impact stories here.
              </p>
              <button
                onClick={() => onCompose("field_update")}
                style={{
                  background: PRIMARY, color: "#fff", border: "none",
                  padding: "10px 24px", borderRadius: 100, fontWeight: 700, fontSize: 13, cursor: "pointer",
                }}
              >
                Be the first to post
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{
              background: "#fff", borderRadius: 18, padding: "3rem",
              textAlign: "center", border: "1px solid #e2e8f0",
            }}>
              <p style={{ color: "#64748b", fontSize: 14 }}>No posts match your filter. Try a different tab.</p>
            </div>
          ) : (
            filtered.map(post => (
              <PostCard key={post.id} post={post} onTagClick={t => { setTagFilter(t); setActiveFilter("all"); }} />
            ))
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="dh-feed-sidebar">
          {/* MICHAEL Live */}
          <div style={{
            background: "#0a0f1e", borderRadius: 16, padding: "1.1rem",
            border: "1px solid rgba(251,191,36,0.18)", marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span>⚡</span>
              <span style={{ fontWeight: 900, fontSize: 12, color: "#fbbf24", letterSpacing: "0.06em" }}>MICHAEL LIVE</span>
              {michaelLoading && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fbbf24", display: "inline-block", opacity: 0.7 }} />}
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: 20, lineHeight: 1 }}>{michaelAlerts.length}</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>Live Events</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#EF4444", fontWeight: 900, fontSize: 20, lineHeight: 1 }}>{criticals}</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>Critical</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: 20, lineHeight: 1 }}>{countries}</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>Countries</p>
              </div>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 10 }}>
              MICHAEL is monitoring <strong style={{ color: "#fff" }}>{michaelAlerts.length} live crisis events</strong> worldwide.
            </p>
            <a
              href="https://michael.worlddisastercenter.org"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 11, fontWeight: 800, color: "#fbbf24", textDecoration: "none",
                background: "rgba(251,191,36,0.1)", borderRadius: 8, padding: "6px 12px",
              }}
            >
              Open MICHAEL <ExternalLink size={10} />
            </a>
          </div>

          {/* Trending Hashtags */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "1.1rem", border: "1px solid #e2e8f0", marginBottom: 16 }}>
            <p style={{ fontWeight: 900, fontSize: 13, color: NAVY, marginBottom: 10 }}>Trending Hashtags</p>
            {TRENDING_TAGS.length === 0 ? (
              <p style={{ fontSize: 12, color: "#94a3b8" }}>No trending topics yet</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {TRENDING_TAGS.map(tag => (
                  <button key={tag} style={{
                    fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20,
                    background: PRIMARY + "12", color: PRIMARY, border: "none", cursor: "pointer",
                  }}>{tag}</button>
                ))}
              </div>
            )}
          </div>

          {/* Active Heroes */}
          <div style={{ background: "#fff", borderRadius: 16, padding: "1.1rem", border: "1px solid #e2e8f0", marginBottom: 16 }}>
            <p style={{ fontWeight: 900, fontSize: 13, color: NAVY, marginBottom: 10 }}>Active Heroes</p>
            {ACTIVE_HEROES.length === 0 ? (
              <p style={{ fontSize: 12, color: "#94a3b8" }}>Be the first active hero</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ACTIVE_HEROES.map(h => (
                  <div key={h.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%", background: h.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 900, color: "#fff", flexShrink: 0,
                    }}>{h.initials}</div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>{h.name}</p>
                      <p style={{ fontSize: 10, color: "#64748b" }}>{h.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{
            background: `linear-gradient(135deg, ${NAVY} 0%, #0a1f42 100%)`,
            borderRadius: 16, padding: "1.1rem",
          }}>
            <p style={{ fontWeight: 900, fontSize: 13, color: "#fff", marginBottom: 6 }}>Become a Disaster Hero</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 12, lineHeight: 1.5 }}>
              Sponsor a verified crisis case from $5/month. Follow their journey in real time.
            </p>
            <Link
              to="/disaster-heroes#cases"
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 11, fontWeight: 800, color: "#fff",
                background: PRIMARY, borderRadius: 8, padding: "7px 14px", textDecoration: "none",
              }}
            >
              Browse Open Cases <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VIEW B: Browse Cases ─────────────────────────────────────────────────────
function ViewCases({ alertsByCountry }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("urgent");
  const [search, setSearch] = useState("");

  const FILTERS = [
    { id: "all",        label: "All" },
    { id: "family",     label: "Families" },
    { id: "individual", label: "Individuals" },
    { id: "critical",   label: "Critical" },
    { id: "education",  label: "Education" },
    { id: "health",     label: "Health" },
    { id: "shelter",    label: "Shelter" },
  ];

  const filtered = CRISIS_CASES.filter(c => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "family" && c.caseType === "family") ||
      (activeFilter === "individual" && c.caseType === "individual") ||
      (activeFilter === "critical" && c.urgency === "critical") ||
      c.category?.includes(activeFilter);
    const q = search.toLowerCase();
    const name = c.caseType === "family" ? c.familyName || "" : c.name || "";
    const matchesSearch = !q ||
      name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      (c.crisisType || "").toLowerCase().includes(q) ||
      (c.region || "").toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const urgencyRank = { critical: 0, high: 1, moderate: 2 };
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "urgent") return (urgencyRank[a.urgency] ?? 9) - (urgencyRank[b.urgency] ?? 9);
    if (sortBy === "funded")  return pct(a.fundedMonthly, a.monthlyGoal) - pct(b.fundedMonthly, b.monthlyGoal);
    if (sortBy === "newest")  return new Date(b.since) - new Date(a.since);
    return 0;
  });

  return (
    <div style={{ background: BG, paddingTop: "1.5rem", paddingBottom: "4rem" }}>
      {/* Filter bar */}
      <div className="container" style={{ marginBottom: "1.5rem" }}>
        <div style={{
          background: "#fff", borderRadius: 16, padding: "0.75rem 1rem",
          border: "1px solid #e2e8f0", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                style={{
                  fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                  background: activeFilter === f.id ? PRIMARY : "#f1f5f9",
                  color: activeFilter === f.id ? "#fff" : "#64748b",
                }}>{f.label}</button>
            ))}
          </div>
          <select
            value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{
              fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 20, outline: "none", cursor: "pointer",
              background: "#f1f5f9", color: "#334155", border: "none",
            }}
          >
            <option value="urgent">Most Urgent</option>
            <option value="funded">Least Funded</option>
            <option value="newest">Newest</option>
          </select>
          <div style={{ position: "relative", flex: 1, minWidth: 180, maxWidth: 280 }}>
            <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by country or name…"
              style={{
                width: "100%", paddingLeft: 32, paddingRight: 16, paddingTop: 7, paddingBottom: 7,
                fontSize: 12, borderRadius: 20, outline: "none",
                background: "#f1f5f9", border: "1px solid #e5e7eb", color: NAVY, boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </div>

      <div className="container">
        {CRISIS_CASES.length === 0 ? (
          <AnimateIn variant="fadeUp">
            <div style={{
              textAlign: "center", padding: "5rem 2rem", borderRadius: 20,
              background: "#fff", border: "2px dashed #e2e8f0",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🌍</div>
              <h3 style={{ fontWeight: 900, fontSize: 20, color: NAVY, marginBottom: 8 }}>No verified cases yet</h3>
              <p style={{ color: "#64748b", fontSize: 14, maxWidth: 440, margin: "0 auto 24px", lineHeight: 1.6 }}>
                Cases are submitted by verified organizations and reviewed by WDC field teams.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/disaster-heroes/organizations/register"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 14,
                    background: PRIMARY, textDecoration: "none",
                  }}>
                  Register Organization <ArrowRight size={14} />
                </Link>
                <Link to="/disaster-heroes/organizations"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 20px", borderRadius: 12, color: NAVY, fontWeight: 700, fontSize: 14,
                    background: "#f1f5f9", textDecoration: "none",
                  }}>
                  Learn how it works
                </Link>
              </div>
            </div>
          </AnimateIn>
        ) : sorted.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "3rem", borderRadius: 16,
            background: "#fff", border: "1px solid #e2e8f0",
          }}>
            <p style={{ color: "#64748b", fontSize: 14 }}>No cases match your search. Try a different filter.</p>
          </div>
        ) : (
          <>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
              Showing <strong style={{ color: NAVY }}>{sorted.length}</strong> case{sorted.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sorted.map((c, i) => (
                <CaseCard key={c.id} c={c} index={i}
                  hasAlert={!!alertsByCountry[c.id]}
                  alertCount={alertsByCountry[c.id] || 0}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── VIEW C: World Map ────────────────────────────────────────────────────────
function ViewMap({ michaelAlerts, michaelLoading }) {
  const typeCounts = {};
  michaelAlerts.forEach(a => {
    const t = normType(a.event_type);
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  });
  const topTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const criticals = michaelAlerts.filter(a => (a.severity_level || 0) >= 4).length;
  const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div>
      {/* Map */}
      <div style={{ background: "#0a0f1e" }}>
        <WorldMap cases={CRISIS_CASES} michaelAlerts={michaelAlerts} />
      </div>

      {/* Below map */}
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
        <div className="dh-map-cols">
          {/* Left: Cases list */}
          <div>
            <h3 style={{ fontWeight: 900, fontSize: 16, color: NAVY, marginBottom: 14 }}>Cases on map</h3>
            {CRISIS_CASES.length === 0 ? (
              <div style={{
                background: "#fff", borderRadius: 14, padding: "2rem",
                border: "1px dashed #e2e8f0", color: "#64748b", fontSize: 13, lineHeight: 1.6,
              }}>
                No cases yet — organizations can submit cases through the portal.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CRISIS_CASES.slice(0, 12).map(c => (
                  <div key={c.id} style={{
                    background: "#fff", borderRadius: 12, padding: "12px 14px",
                    border: "1px solid #e2e8f0",
                    display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <span style={{ fontSize: 20 }}>{c.flag}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 800, fontSize: 13, color: NAVY, margin: 0 }}>
                        {c.caseType === "family" ? c.familyName : `${c.name}${c.age ? `, ${c.age}` : ""}`}
                      </p>
                      <p style={{ fontSize: 11, color: "#64748b", margin: 0 }}>{c.country} · {c.region}</p>
                    </div>
                    <Link
                      to={`/disaster-heroes/case/${c.id}`}
                      style={{
                        fontSize: 11, fontWeight: 700, color: PRIMARY,
                        background: PRIMARY + "14", borderRadius: 8, padding: "5px 10px",
                        textDecoration: "none", whiteSpace: "nowrap",
                      }}
                    >View →</Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: MICHAEL intel */}
          <div>
            <div style={{
              background: "#0a0f1e", borderRadius: 16, padding: "1.25rem",
              border: "1px solid rgba(251,191,36,0.2)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span>⚡</span>
                <span style={{ fontWeight: 900, fontSize: 13, color: "#fbbf24" }}>MICHAEL Intelligence</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px" }}>
                  <p style={{ color: "#fff", fontWeight: 900, fontSize: 22, lineHeight: 1 }}>{michaelAlerts.length}</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>Live events</p>
                </div>
                <div style={{ background: "rgba(239,68,68,0.12)", borderRadius: 10, padding: "12px" }}>
                  <p style={{ color: "#EF4444", fontWeight: 900, fontSize: 22, lineHeight: 1 }}>{criticals}</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>Critical</p>
                </div>
              </div>

              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 12 }}>Top crisis types:</p>
              {topTypes.length === 0 && !michaelLoading && (
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>Loading event data…</p>
              )}
              {topTypes.map(([type, count]) => (
                <div key={type} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 14 }}>{TYPE_ICON[type] || "⚠️"}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", flex: 1 }}>{type}</span>
                  <span style={{ fontSize: 12, color: "#fff", fontWeight: 800 }}>{count}</span>
                </div>
              ))}

              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, marginTop: 14 }}>
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VIEW D: Dashboard ────────────────────────────────────────────────────────
function ViewDashboard({ michaelAlerts, michaelLoading, onCompose }) {
  const totalCases    = CRISIS_CASES.length;
  const familyCases   = CRISIS_CASES.filter(c => c.caseType === "family").length;
  const countries     = [...new Set(CRISIS_CASES.map(c => c.country))].length;
  const activeDonors  = CRISIS_CASES.reduce((s, c) => s + (c.sponsors || 0), 0);

  const typeCounts = {};
  michaelAlerts.forEach(a => {
    const t = normType(a.event_type);
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  });
  const topTypes6 = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxTypeCount = topTypes6.length > 0 ? topTypes6[0][1] : 1;
  const criticals = michaelAlerts.filter(a => (a.severity_level || 0) >= 4).length;
  const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const totalHealth    = CRISIS_CASES.reduce((s, c) => s + (c.needs?.health    || 0), 0);
  const totalEducation = CRISIS_CASES.reduce((s, c) => s + (c.needs?.education || 0), 0);
  const totalShelter   = CRISIS_CASES.reduce((s, c) => s + (c.needs?.shelter   || 0), 0);
  const maxNeed        = Math.max(totalHealth, totalEducation, totalShelter, 1);

  const totalGoal    = CRISIS_CASES.reduce((s, c) => s + (c.monthlyGoal    || 0), 0);
  const totalFunded  = CRISIS_CASES.reduce((s, c) => s + (c.fundedMonthly  || 0), 0);

  const recentPosts = COMMUNITY_POSTS.slice(0, 3);

  const STAT_CARDS = [
    { label: "Total Open Cases",  value: totalCases,   icon: "📋" },
    { label: "Family Cases",      value: familyCases,  icon: "👨‍👩‍👧‍👦" },
    { label: "Countries Covered", value: countries,    icon: "🌍" },
    { label: "Active Donors",     value: activeDonors, icon: "💛" },
  ];

  return (
    <div style={{ background: BG, paddingTop: "1.75rem", paddingBottom: "4rem" }}>
      <div className="container">
        {/* Row 1: Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STAT_CARDS.map(s => (
            <div key={s.label} style={{
              background: "#fff", borderRadius: 16, padding: "1.25rem",
              border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <p style={{ fontWeight: 900, fontSize: 28, color: NAVY, lineHeight: 1 }}>{s.value.toLocaleString()}</p>
              <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Row 2: Two columns */}
        <div className="dh-dash-cols">
          {/* Left 2/3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* MICHAEL Global Intelligence */}
            <div style={{
              background: "#0a0f1e", borderRadius: 18, padding: "1.5rem",
              border: "1px solid rgba(251,191,36,0.2)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>⚡</span>
                  <span style={{ fontWeight: 900, fontSize: 14, color: "#fbbf24" }}>MICHAEL LIVE</span>
                  {!michaelLoading && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />}
                </div>
                <button
                  onClick={() => window.location.reload()}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "5px 8px", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <RefreshCw size={12} />
                </button>
              </div>

              {michaelLoading ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fbbf24", animation: "dhpulse 1.5s infinite" }} />
                  Loading live data…
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
                    <div>
                      <p style={{ color: "#fff", fontWeight: 900, fontSize: 28, lineHeight: 1 }}>{michaelAlerts.length.toLocaleString()}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 4 }}>Active Events</p>
                    </div>
                    <div>
                      <p style={{ color: "#EF4444", fontWeight: 900, fontSize: 28, lineHeight: 1 }}>{criticals}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 4 }}>Critical</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {topTypes6.map(([type, count]) => (
                      <div key={type} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 14, width: 20, textAlign: "center", flexShrink: 0 }}>{TYPE_ICON[type] || "⚠️"}</span>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", width: 80, flexShrink: 0 }}>{type}</span>
                        <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
                          <div style={{
                            height: "100%", borderRadius: 3, background: PRIMARY,
                            width: `${Math.round((count / maxTypeCount) * 100)}%`,
                          }} />
                        </div>
                        <span style={{ fontSize: 11, color: "#fff", fontWeight: 700, width: 28, textAlign: "right", flexShrink: 0 }}>{count}</span>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", width: 36, textAlign: "right", flexShrink: 0 }}>
                          {michaelAlerts.length > 0 ? Math.round((count / michaelAlerts.length) * 100) : 0}%
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, marginTop: 16 }}>
                MICHAEL monitors 1,000+ events worldwide in real time ·{" "}
                <a href="https://michael.worlddisastercenter.org" target="_blank" rel="noopener noreferrer" style={{ color: "#fbbf24", textDecoration: "none" }}>
                  Open MICHAEL →
                </a>
              </p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, marginTop: 4 }}>Last updated: {lastUpdated}</p>
            </div>

            {/* Recent Platform Activity */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "1.5rem", border: "1px solid #e2e8f0" }}>
              <p style={{ fontWeight: 900, fontSize: 14, color: NAVY, marginBottom: 14 }}>Recent Platform Activity</p>
              {COMMUNITY_POSTS.length === 0 ? (
                <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>No activity yet — be the first to post</p>
                  <button
                    onClick={() => onCompose("field_update")}
                    style={{
                      background: PRIMARY, color: "#fff", border: "none",
                      borderRadius: 100, padding: "8px 20px", fontWeight: 700, fontSize: 12, cursor: "pointer",
                    }}
                  >Compose Post</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {recentPosts.map(post => {
                    const meta = POST_TYPE_META[post.type] || POST_TYPE_META.field_update;
                    return (
                      <div key={post.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: post.author?.color || PRIMARY,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 900, color: "#fff", flexShrink: 0,
                        }}>{post.author?.initials || "?"}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                            <span style={{ fontWeight: 800, fontSize: 12, color: NAVY }}>{post.author?.name}</span>
                            <span style={{
                              fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 20,
                              background: meta.bg, color: meta.color,
                            }}>{meta.label}</span>
                          </div>
                          <p style={{ fontSize: 11, color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {(post.text || "").slice(0, 80)}
                          </p>
                        </div>
                        <span style={{ fontSize: 10, color: "#94a3b8", flexShrink: 0 }}>
                          {post.timestamp ? timeAgo(post.timestamp) : ""}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right 1/3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Needs Breakdown */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "1.25rem", border: "1px solid #e2e8f0" }}>
              <p style={{ fontWeight: 900, fontSize: 14, color: NAVY, marginBottom: 14 }}>Needs Breakdown</p>
              {CRISIS_CASES.length === 0 ? (
                <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
                  Submit your first case to see needs breakdown
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Health",    value: totalHealth,    color: "#22c55e", icon: "💊" },
                    { label: "Education", value: totalEducation, color: PRIMARY,    icon: "📚" },
                    { label: "Shelter",   value: totalShelter,   color: "#F97316",  icon: "🏠" },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: "#64748b" }}>{item.icon} {item.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>${item.value.toLocaleString()}/mo</span>
                      </div>
                      <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4 }}>
                        <div style={{
                          height: "100%", borderRadius: 4, background: item.color,
                          width: `${Math.round((item.value / maxNeed) * 100)}%`,
                          transition: "width 0.6s ease",
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Organization Activity */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "1.25rem", border: "1px solid #e2e8f0" }}>
              <p style={{ fontWeight: 900, fontSize: 14, color: NAVY, marginBottom: 14 }}>Organization Activity</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                {[
                  { label: "Registered orgs",    value: 0 },
                  { label: "Org-submitted cases", value: 0 },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{item.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/disaster-heroes/organizations/register"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 12, fontWeight: 700, color: PRIMARY,
                  background: PRIMARY + "12", border: `1px solid ${PRIMARY}30`,
                  borderRadius: 10, padding: "8px 14px", textDecoration: "none",
                }}
              >
                Register your organization <ArrowRight size={12} />
              </Link>
            </div>

            {/* Funding Overview */}
            <div style={{ background: "#fff", borderRadius: 18, padding: "1.25rem", border: "1px solid #e2e8f0" }}>
              <p style={{ fontWeight: 900, fontSize: 14, color: NAVY, marginBottom: 14 }}>Funding Overview</p>
              {totalGoal === 0 ? (
                <p style={{ fontSize: 12, color: "#94a3b8" }}>No funding data yet</p>
              ) : (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>Total monthly goal</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>${totalGoal.toLocaleString()}/mo</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>Total funded</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: PRIMARY }}>${totalFunded.toLocaleString()}/mo</span>
                  </div>
                  <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4 }}>
                    <div style={{
                      height: "100%", borderRadius: 4, background: PRIMARY,
                      width: `${pct(totalFunded, totalGoal)}%`,
                    }} />
                  </div>
                  <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>
                    {pct(totalFunded, totalGoal)}% of total monthly goal funded
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DisasterHeroesHome() {
  const [activeView, setActiveView] = useState(() =>
    (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "") || "feed"
  );
  const [composeOpen, setComposeOpen] = useState(false);

  // MICHAEL data
  const [michaelAlerts, setMichaelAlerts] = useState([]);
  const [michaelLoading, setMichaelLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`${MICHAEL_URL}/api/alerts`, {
      headers: { "X-API-Key": MICHAEL_KEY },
      signal: ctrl.signal,
    })
      .then(r => r.json())
      .then(data => {
        const raw = Array.isArray(data) ? data : (data.events ?? []);
        setMichaelAlerts(raw);
      })
      .catch(() => {})
      .finally(() => setMichaelLoading(false));
    return () => ctrl.abort();
  }, []);

  function switchView(view) {
    setActiveView(view);
    if (typeof window !== "undefined") window.location.hash = view;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCompose(type) {
    setComposeOpen(true);
  }

  // Derived MICHAEL stats for hero
  const liveEvents = michaelAlerts.length;
  const criticalAlerts = michaelAlerts.filter(a => (a.severity_level || 0) >= 4).length;
  const countriesAffected = [...new Set(michaelAlerts.map(a => a.location_name).filter(Boolean))].length;

  // Build alertsByCountry map for cases view
  const alertsByCountry = {};
  michaelAlerts.forEach(a => {
    const loc = (a.location_name || "").toLowerCase();
    CRISIS_CASES.forEach(c => {
      if (loc.includes(c.country.toLowerCase()) || c.country.toLowerCase().includes(loc.split(" ")[0])) {
        alertsByCountry[c.id] = (alertsByCountry[c.id] || 0) + 1;
      }
    });
  });

  const TABS = [
    { id: "feed",      label: "Feed",          icon: <Rss size={15} /> },
    { id: "cases",     label: "Browse Cases",  icon: <Grid3X3 size={15} /> },
    { id: "map",       label: "World Map",     icon: <Map size={15} /> },
    { id: "dashboard", label: "Dashboard",     icon: <BarChart2 size={15} /> },
  ];

  return (
    <>
      <SEOMeta
        title="WDC Disaster Heroes — Crisis Connect Platform"
        description="Sponsor families in crisis, follow live disaster intelligence, and connect with the global humanitarian community. Browse verified cases, crisis alerts, and field updates."
        image="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/disaster-heroes"
      />

      {/* ── COMPACT HERO ── */}
      <section style={{ background: NAVY, position: "relative", overflow: "hidden", maxHeight: 280, minHeight: 220 }}>
        {/* Blobs */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%", background: "rgba(0,158,219,0.08)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 80, width: 280, height: 280, borderRadius: "50%", background: "rgba(30,60,120,0.12)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "2.25rem", paddingBottom: "2.25rem" }}>
          <div className="dh-hero-inner">
            {/* Left */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Shield size={13} style={{ color: PRIMARY }} />
                <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.22em", color: PRIMARY, textTransform: "uppercase" }}>
                  WDC Disaster Heroes
                </span>
              </div>
              <h1 style={{
                fontSize: "clamp(1.3rem, 3.5vw, 2rem)", fontWeight: 900, lineHeight: 1.1,
                color: "#fff", margin: "0 0 8px", maxWidth: 420,
              }}>
                Crisis Connect —{" "}
                <span style={{ color: PRIMARY }}>Sponsor. Follow. Impact.</span>
              </h1>
              <Link
                to="/disaster-heroes/organizations/register"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  marginTop: 14, fontSize: 12, fontWeight: 800, color: "#fff",
                  background: PRIMARY, borderRadius: 10, padding: "9px 18px", textDecoration: "none",
                }}
              >
                Register Your Organization <ArrowRight size={12} />
              </Link>
            </div>

            {/* Right: live stats */}
            <div className="dh-hero-stats">
              {[
                { label: "Live Events",      value: michaelLoading ? "—" : liveEvents.toLocaleString(),       pulse: true  },
                { label: "Critical Alerts",  value: michaelLoading ? "—" : criticalAlerts.toLocaleString(),   color: "#EF4444" },
                { label: "Countries",        value: michaelLoading ? "—" : countriesAffected.toLocaleString() },
              ].map((s, i) => (
                <div key={s.label} style={{
                  background: "rgba(255,255,255,0.06)", borderRadius: 12,
                  padding: "12px 16px", border: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 4 }}>
                    {s.pulse && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />}
                    <p style={{ fontWeight: 900, fontSize: 22, color: s.color || "#fff", lineHeight: 1, margin: 0 }}>{s.value}</p>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY VIEW SWITCHER ── */}
      <div
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "#fff", borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <div className="container">
          <div style={{
            display: "flex", gap: 0, overflowX: "auto",
            scrollbarWidth: "none", msOverflowStyle: "none",
          }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => switchView(tab.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "14px 20px", fontSize: 13,
                  fontWeight: activeView === tab.id ? 800 : 500,
                  color: activeView === tab.id ? PRIMARY : "#64748b",
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: activeView === tab.id ? `2.5px solid ${PRIMARY}` : "2.5px solid transparent",
                  transition: "all 0.15s ease", whiteSpace: "nowrap", flexShrink: 0,
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── VIEW PANELS ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {activeView === "feed" && (
            <ViewFeed
              michaelAlerts={michaelAlerts}
              michaelLoading={michaelLoading}
              onCompose={openCompose}
            />
          )}
          {activeView === "cases" && (
            <ViewCases alertsByCountry={alertsByCountry} />
          )}
          {activeView === "map" && (
            <ViewMap michaelAlerts={michaelAlerts} michaelLoading={michaelLoading} />
          )}
          {activeView === "dashboard" && (
            <ViewDashboard
              michaelAlerts={michaelAlerts}
              michaelLoading={michaelLoading}
              onCompose={openCompose}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── COMPOSE MODAL ── */}
      <AnimatePresence>
        {composeOpen && (
          <ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />
        )}
      </AnimatePresence>

      {/* ── Responsive styles ── */}
      <style>{`
        @keyframes dhpulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

        .dh-hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .dh-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          flex-shrink: 0;
        }
        .dh-feed-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          gap: 1.5rem;
          align-items: start;
        }
        .dh-feed-sidebar {
          position: sticky;
          top: 72px;
        }
        .dh-map-cols {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
          align-items: start;
        }
        .dh-dash-cols {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        @media (max-width: 900px) {
          .dh-hero-stats { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .dh-hero-inner { flex-direction: column; align-items: flex-start; }
          .dh-hero-stats { grid-template-columns: repeat(3, 1fr); width: 100%; }
          .dh-feed-grid { grid-template-columns: 1fr; }
          .dh-feed-sidebar { position: static !important; }
          .dh-map-cols { grid-template-columns: 1fr; }
          .dh-dash-cols { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .dh-hero-stats { grid-template-columns: 1fr 1fr; }
          .dh-hero-stats > div:last-child { grid-column: span 2; }
        }
      `}</style>
    </>
  );
}
