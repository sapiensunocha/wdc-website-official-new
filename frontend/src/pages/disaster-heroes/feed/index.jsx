import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import SEOMeta from "../../../components/SEOMeta";
import { COMMUNITY_POSTS } from "../../../assets/data/community-posts";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  bg: "#F8FAFC",
  surface: "#fff",
  border: "#E2E8F0",
  fg: "#0D1F2D",
  muted: "#475569",
  primary: "#009EDB",
  navy: "#001129",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const TYPE_META = {
  new_case:         { label: "New Case",         color: "#009EDB", bg: "#EFF9FF" },
  crisis_alert:     { label: "Crisis Alert",     color: "#EF4444", bg: "#FEF2F2" },
  field_update:     { label: "Field Update",     color: "#059669", bg: "#ECFDF5" },
  impact_story:     { label: "Impact Story",     color: "#d97706", bg: "#FFFBEB" },
  community_report: { label: "Community Report", color: "#7c3aed", bg: "#F5F3FF" },
};

const SEVERITY_META = {
  critical: { label: "CRITICAL", color: "#fff", bg: "#EF4444" },
  high:     { label: "HIGH",     color: "#fff", bg: "#F97316" },
  moderate: { label: "MODERATE", color: "#fff", bg: "#F59E0B" },
};

const TRENDING_TAGS = [];

const ACTIVE_HEROES = [];

const FILTER_TABS = [
  { id: "all",              label: "All" },
  { id: "new_case",         label: "New Cases" },
  { id: "crisis_alert",     label: "Crisis Alerts" },
  { id: "field_update",     label: "Field Updates" },
  { id: "impact_story",     label: "Impact Stories" },
  { id: "community_report", label: "Community Reports" },
];

const UNSPLASH_PLACEHOLDER = "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80";

// ─── Compose Modal ────────────────────────────────────────────────────────────
function ComposeModal({ open, onClose }) {
  const [type, setType] = useState("field_update");
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [posted, setPosted] = useState(false);

  function handlePost() {
    if (!text.trim()) return;
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      setText("");
      setLocation("");
      setTags("");
      setImageUrl("");
      onClose();
    }, 1800);
  }

  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.55)", display: "flex",
        alignItems: "center", justifyContent: "center", padding: "1rem",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: T.surface, borderRadius: 20, width: "100%", maxWidth: 540,
          padding: "1.75rem", boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <p style={{ fontWeight: 900, fontSize: 16, color: T.fg }}>Share to Community Feed</p>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: T.muted }}>×</button>
        </div>

        {/* Type selector */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1rem" }}>
          {Object.entries(TYPE_META).map(([id, m]) => (
            <button
              key={id}
              onClick={() => setType(id)}
              style={{
                fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20,
                border: `1px solid ${type === id ? m.color : T.border}`,
                background: type === id ? m.bg : "transparent",
                color: type === id ? m.color : T.muted,
                cursor: "pointer",
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
            width: "100%", border: `1px solid ${T.border}`, borderRadius: 12,
            padding: "12px 14px", fontSize: 13, color: T.fg, resize: "vertical",
            outline: "none", fontFamily: "inherit", boxSizing: "border-box",
          }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Location (e.g. Bay Region, Somalia)"
            style={{
              border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 12px",
              fontSize: 12, color: T.fg, outline: "none",
            }}
          />
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="#Tags (e.g. #Somalia #Flood)"
            style={{
              border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 12px",
              fontSize: 12, color: T.fg, outline: "none",
            }}
          />
        </div>

        <input
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="Image URL (optional Unsplash link)"
          style={{
            width: "100%", border: `1px solid ${T.border}`, borderRadius: 10,
            padding: "10px 12px", fontSize: 12, color: T.fg, marginTop: 10,
            outline: "none", boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end", alignItems: "center" }}>
          {posted && (
            <span style={{ fontSize: 13, fontWeight: 700, color: "#059669" }}>Posted!</span>
          )}
          <button
            onClick={handlePost}
            disabled={!text.trim()}
            style={{
              background: text.trim() ? T.primary : "#cbd5e1",
              color: "#fff", border: "none", borderRadius: 10,
              padding: "10px 24px", fontWeight: 900, fontSize: 13, cursor: text.trim() ? "pointer" : "default",
            }}
          >
            Post to Feed
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────
function PostCard({ post, onTagClick }) {
  const [expanded, setExpanded] = useState(false);
  const [reactions, setReactions] = useState({ ...post.reactions });
  const [reacted, setReacted] = useState({});
  const [commentText, setCommentText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const meta = TYPE_META[post.type] || TYPE_META.field_update;
  const isTruncatable = post.text.length > 220;
  const displayText = expanded || !isTruncatable ? post.text : post.text.slice(0, 220) + "…";

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
        background: T.surface, borderRadius: 18, border: `1px solid ${T.border}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)", overflow: "hidden",
        marginBottom: 18, position: "relative",
      }}
    >
      {/* Type badge top-right */}
      <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2 }}>
        <span
          style={{
            fontSize: 10, fontWeight: 800, letterSpacing: "0.06em",
            padding: "4px 10px", borderRadius: 20,
            background: meta.bg, color: meta.color,
            border: `1px solid ${meta.color}33`,
          }}
        >
          {meta.label.toUpperCase()}
        </span>
      </div>

      <div style={{ padding: "1rem 1rem 0" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, paddingRight: 110 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
              background: post.author.color, display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff",
            }}
          >
            {post.author.initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 900, fontSize: 13, color: T.fg }}>{post.author.name}</span>
              {post.author.verified && (
                <span style={{ fontSize: 10, background: T.primary + "18", color: T.primary, borderRadius: 6, padding: "1px 6px", fontWeight: 700 }}>✓ Verified</span>
              )}
              <span style={{ fontSize: 10, color: T.muted }}>{post.author.role}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: T.muted }}>{timeAgo(post.timestamp)}</span>
              {post.location && (
                <>
                  <span style={{ color: T.border }}>·</span>
                  <span style={{ fontSize: 11, color: T.muted }}>{post.flag} {post.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Crisis alert severity badge */}
        {post.type === "crisis_alert" && post.severity && (
          <div style={{ marginBottom: 10 }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 10, fontWeight: 900, letterSpacing: "0.08em",
                padding: "4px 12px", borderRadius: 20,
                background: SEVERITY_META[post.severity]?.bg || "#EF4444",
                color: SEVERITY_META[post.severity]?.color || "#fff",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "pulse 1.5s infinite" }} />
              SEVERITY: {SEVERITY_META[post.severity]?.label}
            </span>
          </div>
        )}

        {/* Text */}
        <p style={{ fontSize: 13, color: T.fg, lineHeight: 1.65, marginBottom: 6 }}>{displayText}</p>
        {isTruncatable && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ background: "none", border: "none", color: T.primary, fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0, marginBottom: 8 }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {/* Image */}
        {post.images && post.images.length > 0 && (
          <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
            <img
              src={post.images[0]}
              alt=""
              style={{ width: "100%", maxHeight: 280, objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {post.tags.map(t => (
              <button
                key={t}
                onClick={() => onTagClick && onTagClick(t)}
                style={{
                  fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                  background: T.primary + "14", color: T.primary, border: "none", cursor: "pointer",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Case CTA */}
        {post.caseId && (
          <Link
            to={`/disaster-heroes/case/${post.caseId}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 800, color: T.primary,
              background: T.primary + "12", border: `1px solid ${T.primary}30`,
              borderRadius: 10, padding: "8px 14px", marginBottom: 12,
              textDecoration: "none",
            }}
          >
            View Case & Sponsor <ArrowRight size={12} />
          </Link>
        )}

        {/* MICHAEL tracking note for crisis alerts */}
        {post.type === "crisis_alert" && (
          <div
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#0a0f1e", borderRadius: 10, padding: "8px 12px", marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13 }}>⚡</span>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 700 }}>MICHAEL is tracking this region</span>
            <a
              href="https://michael.worlddisastercenter.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: "auto", color: "#fbbf24", fontSize: 10, display: "flex", alignItems: "center", gap: 3 }}
            >
              View live <ExternalLink size={9} />
            </a>
          </div>
        )}
      </div>

      {/* Reactions */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 4, padding: "10px 1rem",
          borderTop: `1px solid ${T.border}`, flexWrap: "wrap",
        }}
      >
        {[
          { key: "heart",   emoji: "💛", label: "Heart" },
          { key: "support", emoji: "🛡️", label: "Support" },
          { key: "alert",   emoji: "🚨", label: "Alert" },
        ].map(({ key, emoji, label }) => (
          <button
            key={key}
            onClick={() => toggleReaction(key)}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 12, fontWeight: reacted[key] ? 800 : 600,
              padding: "5px 10px", borderRadius: 20, border: "none", cursor: "pointer",
              background: reacted[key] ? "#f1f5f9" : "transparent",
              color: reacted[key] ? T.fg : T.muted,
            }}
          >
            <span>{emoji}</span>
            <span>{reactions[key]}</span>
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: T.muted }}>
          {post.comments.length} comment{post.comments.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Comments */}
      {post.comments.length > 0 && (
        <div style={{ padding: "8px 1rem 0", borderTop: `1px solid ${T.bg}` }}>
          {post.comments.slice(0, 2).map(c => (
            <div key={c.id} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: "50%", background: c.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 900, color: "#fff", flexShrink: 0,
                }}
              >
                {c.initials}
              </div>
              <div
                style={{
                  background: T.bg, borderRadius: 10, padding: "6px 10px", flex: 1,
                }}
              >
                <div style={{ display: "flex", gap: 6, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.fg }}>{c.author}</span>
                  <span style={{ fontSize: 10, color: T.muted }}>{c.time}</span>
                </div>
                <p style={{ fontSize: 12, color: T.fg, margin: 0, marginTop: 2 }}>{c.text}</p>
              </div>
            </div>
          ))}
          {post.comments.length > 2 && (
            <button style={{ background: "none", border: "none", color: T.primary, fontSize: 12, fontWeight: 700, cursor: "pointer", paddingLeft: 36, marginBottom: 8 }}>
              View all {post.comments.length} comments
            </button>
          )}
        </div>
      )}

      {/* Comment input */}
      <div style={{ display: "flex", gap: 8, padding: "8px 1rem 1rem", alignItems: "center" }}>
        <div
          style={{
            width: 28, height: 28, borderRadius: "50%", background: T.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 900, color: "#fff", flexShrink: 0,
          }}
        >
          ME
        </div>
        <input
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendComment()}
          placeholder="Add a comment…"
          style={{
            flex: 1, border: `1px solid ${T.border}`, borderRadius: 20,
            padding: "7px 14px", fontSize: 12, color: T.fg, outline: "none", background: T.bg,
          }}
        />
        {showToast && (
          <span style={{ fontSize: 11, fontWeight: 700, color: "#059669", whiteSpace: "nowrap" }}>Sent!</span>
        )}
      </div>
    </div>
  );
}

// ─── Right Sidebar ────────────────────────────────────────────────────────────
function Sidebar({ onTagClick }) {
  const liveCount = COMMUNITY_POSTS.length;
  const countries = [...new Set(COMMUNITY_POSTS.map(p => p.country).filter(Boolean))].length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* MICHAEL Live panel */}
      <div
        style={{
          background: "#0a0f1e", borderRadius: 16, padding: "1.1rem",
          border: "1px solid rgba(251,191,36,0.18)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 15 }}>⚡</span>
          <span style={{ fontWeight: 900, fontSize: 12, color: "#fbbf24", letterSpacing: "0.06em" }}>MICHAEL LIVE</span>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: 12 }}>
          MICHAEL is monitoring <strong style={{ color: "#fff" }}>{liveCount} active feed events</strong> across{" "}
          <strong style={{ color: "#fff" }}>{countries} countries</strong>. Crisis posts from this community feed are reviewed for humanitarian intelligence integration.
        </p>
        <a
          href="https://michael.worlddisastercenter.org"
          target="_blank"
          rel="noopener noreferrer"
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
      <div style={{ background: T.surface, borderRadius: 16, padding: "1.1rem", border: `1px solid ${T.border}` }}>
        <p style={{ fontWeight: 900, fontSize: 13, color: T.fg, marginBottom: 10 }}>Trending Hashtags</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TRENDING_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              style={{
                fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20,
                background: T.primary + "12", color: T.primary, border: "none", cursor: "pointer",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Active Heroes */}
      <div style={{ background: T.surface, borderRadius: 16, padding: "1.1rem", border: `1px solid ${T.border}` }}>
        <p style={{ fontWeight: 900, fontSize: 13, color: T.fg, marginBottom: 10 }}>Active Heroes</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ACTIVE_HEROES.map(h => (
            <div key={h.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34, height: 34, borderRadius: "50%", background: h.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 900, color: "#fff", flexShrink: 0,
                }}
              >
                {h.initials}
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: T.fg }}>{h.name}</p>
                <p style={{ fontSize: 10, color: T.muted }}>{h.activity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disaster Heroes CTA */}
      <div
        style={{
          background: `linear-gradient(135deg, ${T.navy} 0%, #0a1f42 100%)`,
          borderRadius: 16, padding: "1.1rem",
        }}
      >
        <p style={{ fontWeight: 900, fontSize: 13, color: "#fff", marginBottom: 6 }}>Become a Disaster Hero</p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 12, lineHeight: 1.5 }}>
          Sponsor a verified crisis case from $5/month. Follow their journey in real time.
        </p>
        <Link
          to="/disaster-heroes"
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 11, fontWeight: 800, color: "#fff",
            background: T.primary, borderRadius: 8, padding: "7px 14px",
            textDecoration: "none",
          }}
        >
          Browse Open Cases <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DisasterHeroesFeed() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeType, setComposeType] = useState("field_update");

  const openCompose = (type) => {
    setComposeType(type);
    setComposeOpen(true);
  };

  const handleTagClick = (tag) => {
    setTagFilter(prev => prev === tag ? "" : tag);
    setActiveFilter("all");
  };

  const filtered = useMemo(() => {
    return COMMUNITY_POSTS.filter(p => {
      const matchType = activeFilter === "all" || p.type === activeFilter;
      const matchTag = !tagFilter || (p.tags || []).some(t => t.toLowerCase() === tagFilter.toLowerCase());
      return matchType && matchTag;
    });
  }, [activeFilter, tagFilter]);

  const stats = {
    posts: COMMUNITY_POSTS.length,
    countries: [...new Set(COMMUNITY_POSTS.map(p => p.country).filter(Boolean))].length,
    heroes: ACTIVE_HEROES.length,
  };

  return (
    <>
      <SEOMeta
        title="WDC Community Feed — Crisis Reports & Humanitarian Updates"
        description="Field officers, donors, and community reporters sharing crises in real time. Every post is a signal. Every signal can save a life."
        keywords="humanitarian social media, crisis reports, disaster updates, WDC community, field reports, Somalia drought, Yemen famine, Bangladesh flood, DRC conflict"
        url="/disaster-heroes/feed"
      />

      {/* ── HERO HEADER ── */}
      <section
        style={{
          background: T.navy,
          position: "relative",
          overflow: "hidden",
          minHeight: 420,
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(0,17,41,0.98) 0%, rgba(0,17,41,0.88) 55%, rgba(0,158,219,0.14) 100%)",
          }}
        />
        {/* Background texture blobs */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 480, height: 480, borderRadius: "50%", background: "rgba(0,158,219,0.07)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 40, left: 40, width: 320, height: 320, borderRadius: "50%", background: "rgba(30,60,120,0.1)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #F8FAFC, transparent)" }} />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "5rem", paddingBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.22em", color: T.primary, textTransform: "uppercase" }}>
              WDC Community Feed
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(1.9rem, 5vw, 3.4rem)", fontWeight: 900, lineHeight: 1.08,
              color: "#fff", maxWidth: 720, marginBottom: 16,
            }}
          >
            Field Officers, Donors &{" "}
            <span style={{ color: T.primary }}>Community Reporters</span>{" "}
            — Sharing Crises in Real Time
          </h1>

          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, maxWidth: 600, lineHeight: 1.7, marginBottom: 24 }}>
            Every post is a signal. Every signal can save a life. Follow field updates, new cases, and impact stories from the frontlines of humanitarian response.
          </p>

          {/* Stats bar */}
          <div
            style={{
              display: "inline-flex", flexWrap: "wrap", gap: 28,
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16,
              padding: "14px 24px", marginBottom: 24,
            }}
          >
            {[
              { value: stats.posts, label: "live posts" },
              { value: stats.countries, label: "countries" },
              { value: "1,840+", label: "Heroes contributing" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: 20, lineHeight: 1 }}>{s.value}</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 3 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* MICHAEL badge */}
          <div>
            <a
              href="https://michael.worlddisastercenter.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.28)",
                borderRadius: 10, padding: "8px 16px", textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 13 }}>⚡</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#fbbf24" }}>MICHAEL reads this feed</span>
              <ExternalLink size={10} color="#fbbf24" />
            </a>
          </div>
        </div>
      </section>

      {/* ── COMPOSE BAR ── */}
      <section style={{ background: T.surface, borderBottom: `1px solid ${T.border}` }}>
        <div
          className="container"
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <div
            style={{
              display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 38, height: 38, borderRadius: "50%", background: T.primary,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 12, color: "#fff", flexShrink: 0,
              }}
            >
              ME
            </div>
            <button
              onClick={() => setComposeOpen(true)}
              style={{
                flex: 1, minWidth: 180, textAlign: "left", background: T.bg,
                border: `1px solid ${T.border}`, borderRadius: 22, padding: "10px 18px",
                fontSize: 13, color: T.muted, cursor: "pointer",
              }}
            >
              Share a crisis, an update, or a story…
            </button>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { icon: "🆕", label: "New Case",     type: "new_case" },
                { icon: "⚡", label: "Crisis Alert", type: "crisis_alert" },
                { icon: "📋", label: "Field Update", type: "field_update" },
                { icon: "💛", label: "Impact Story", type: "impact_story" },
              ].map(b => (
                <button
                  key={b.type}
                  onClick={() => openCompose(b.type)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    fontSize: 11, fontWeight: 700, padding: "7px 12px", borderRadius: 20,
                    border: `1px solid ${T.border}`, background: T.bg, color: T.muted, cursor: "pointer",
                  }}
                >
                  {b.icon} {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}>
        <div className="container" style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            {FILTER_TABS.map(f => (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f.id); setTagFilter(""); }}
                style={{
                  fontSize: 12, fontWeight: 700, padding: "6px 16px", borderRadius: 20,
                  border: "none", cursor: "pointer",
                  background: activeFilter === f.id && !tagFilter ? T.primary : T.surface,
                  color: activeFilter === f.id && !tagFilter ? "#fff" : T.muted,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                {f.label}
              </button>
            ))}
            {tagFilter && (
              <button
                onClick={() => setTagFilter("")}
                style={{
                  fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20,
                  background: T.primary + "18", color: T.primary, border: `1px solid ${T.primary}30`, cursor: "pointer",
                }}
              >
                {tagFilter} ×
              </button>
            )}
            <span style={{ marginLeft: "auto", fontSize: 11, color: T.muted }}>
              {filtered.length} post{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div
        className="container"
        style={{ paddingTop: "1.75rem", paddingBottom: "4rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          {/* Feed Column */}
          <div>
            {COMMUNITY_POSTS.length === 0 ? (
              <div
                style={{
                  background: T.surface, borderRadius: 18, padding: "3rem 2rem",
                  textAlign: "center", border: `2px dashed ${T.border}`,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>📡</div>
                <p style={{ color: T.fg, fontWeight: 800, fontSize: 16, marginBottom: 8 }}>
                  No posts yet
                </p>
                <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.6, maxWidth: 360, margin: "0 auto 20px" }}>
                  This feed is open to WDC field officers, partner organizations, and verified community reporters.
                  Posts will appear here as cases are submitted and crises are reported.
                </p>
                <button
                  onClick={() => setComposeOpen(true)}
                  style={{
                    background: T.primary, color: "#fff", border: "none",
                    padding: "10px 24px", borderRadius: 100, fontWeight: 700,
                    fontSize: 13, cursor: "pointer",
                  }}
                >
                  Be the first to post
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div
                style={{
                  background: T.surface, borderRadius: 18, padding: "3rem",
                  textAlign: "center", border: `1px solid ${T.border}`,
                }}
              >
                <p style={{ color: T.muted, fontSize: 14 }}>No posts match your filter. Try a different tab or clear the tag filter.</p>
              </div>
            ) : (
              filtered.map(post => (
                <PostCard key={post.id} post={post} onTagClick={handleTagClick} />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 24 }}>
            <Sidebar onTagClick={handleTagClick} />
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      <ComposeModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        defaultType={composeType}
      />

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .feed-grid { grid-template-columns: 1fr !important; }
          .feed-sidebar { position: static !important; }
        }
      `}</style>
    </>
  );
}
