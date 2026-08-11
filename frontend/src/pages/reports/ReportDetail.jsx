import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft, Printer, ChevronRight, BookOpen, Globe, Users, Zap, Shield,
  Target, BarChart2, FileText, Heart, Award, AlertTriangle, Cpu, Database,
  Camera, Activity, Droplets, Flame, Wind, Thermometer, Waves, Mountain,
  Clock, TrendingUp, CheckCircle, Info, Star, MessageSquare, Building,
  Truck, Radio, Smartphone, WifiOff, MapPin, Search, Layers, Satellite,
  Download, Book, GraduationCap, Network, Handshake, Megaphone, Lock,
  Eye, Send, RefreshCw, Package, PhoneCall, Crosshair, Flag, LifeBuoy,
  ListOrdered, Home, ShoppingCart, Baby, Stethoscope, Tent,
} from "lucide-react";
import { REPORTS, getCategoryColor } from "../../assets/data/reports";
import { PROJECT_REPORTS, getProjectCategoryColor } from "../../assets/data/projectReports";

const ALL_REPORTS = [...REPORTS, ...PROJECT_REPORTS];
const allCategoryColor = (cat) => getCategoryColor(cat) || getProjectCategoryColor(cat);

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const BLUE   = "#1F9AD9";   // OCHA primary blue
const NAVY   = "#1C2B39";   // WDC dark navy
const ORANGE = "#E87722";   // OCHA secondary / targeting

// ─── ICON REGISTRY ────────────────────────────────────────────────────────────
const ICONS = {
  globe: Globe, users: Users, zap: Zap, shield: Shield, target: Target,
  chart: BarChart2, file: FileText, heart: Heart, award: Award,
  alert: AlertTriangle, cpu: Cpu, database: Database, camera: Camera,
  activity: Activity, droplets: Droplets, flame: Flame, wind: Wind,
  thermometer: Thermometer, waves: Waves, mountain: Mountain, clock: Clock,
  trending: TrendingUp, check: CheckCircle, info: Info, star: Star,
  message: MessageSquare, building: Building, truck: Truck, radio: Radio,
  phone: Smartphone, wifioff: WifiOff, map: MapPin, search: Search,
  layers: Layers, satellite: Satellite, download: Download, book: Book,
  graduation: GraduationCap, network: Network, handshake: Handshake,
  megaphone: Megaphone, lock: Lock, eye: Eye, send: Send, refresh: RefreshCw,
  package: Package, call: PhoneCall, crosshair: Crosshair, flag: Flag,
  lifebuy: LifeBuoy, list: ListOrdered,
};
const I = (name) => ICONS[name] || Shield;

// ─── SHARED: OCHA-STYLE SECTION HEADING ──────────────────────────────────────
const SectionHeading = ({ children, sub }) => (
  <div className="mb-6">
    <h3 className="text-base font-black uppercase tracking-wide leading-snug" style={{ color: NAVY }}>
      {children}
    </h3>
    <div className="mt-2 w-10 h-[3px] rounded" style={{ backgroundColor: BLUE }} />
    {sub && <p className="mt-2 text-xs text-gray-500">{sub}</p>}
  </div>
);

// ─── SECTION RENDERERS ────────────────────────────────────────────────────────

// Text — two-column OCHA body layout
const SectionText = ({ s }) => (
  <div className="mb-12">
    {s.heading && <SectionHeading>{s.heading}</SectionHeading>}
    <div
      className="text-sm text-gray-700 leading-relaxed"
      style={{ columns: s.singleColumn ? 1 : "2 280px", columnGap: "2.25rem" }}
    >
      {s.content.split("\n\n").map((para, i) => {
        if (!para.trim()) return null;
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} style={{ marginBottom: "0.875rem", breakInside: "avoid" }}>
            {parts.map((p2, j) =>
              p2.startsWith("**") && p2.endsWith("**")
                ? <strong key={j} className="font-bold" style={{ color: NAVY }}>{p2.slice(2, -2)}</strong>
                : p2
            )}
          </p>
        );
      })}
    </div>
  </div>
);

// Stats — OCHA "At a Glance" horizontal table
const SectionStats = ({ s }) => {
  const cols = s.items.length;
  return (
    <div className="mb-12">
      <SectionHeading>{s.title || "AT A GLANCE"}</SectionHeading>
      <div className="border border-gray-300 overflow-x-auto">
        {/* Column header row */}
        <div className="grid" style={{ gridTemplateColumns: `180px repeat(${cols}, 1fr)`, minWidth: 480 }}>
          <div className="px-4 py-3" style={{ backgroundColor: NAVY }} />
          {s.items.map((item, i) => {
            const Icon = I(item.icon);
            return (
              <div
                key={i}
                className="px-3 py-3 text-center border-l border-white/20 flex flex-col items-center gap-1"
                style={{ backgroundColor: i % 2 === 0 ? BLUE : ORANGE }}
              >
                <Icon size={15} className="text-white" />
                <p className="text-white text-[10px] font-black uppercase tracking-wide leading-tight">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
        {/* Data row */}
        <div className="grid border-t border-gray-200" style={{ gridTemplateColumns: `180px repeat(${cols}, 1fr)`, minWidth: 480 }}>
          <div className="px-4 py-5 bg-gray-50 flex items-center">
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest leading-snug">
              Key Figures
            </p>
          </div>
          {s.items.map((item, i) => (
            <div key={i} className="px-3 py-5 text-center border-l border-gray-200">
              <p className="text-2xl font-black leading-none" style={{ color: NAVY }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Callout — clean left-border on white (OCHA style)
const SectionCallout = ({ s }) => {
  const borderCol = {
    info:      BLUE,
    warning:   "#F59E0B",
    success:   "#10B981",
    danger:    "#EF4444",
    highlight: NAVY,
  }[s.variant || "info"];
  return (
    <div className="mb-12 border-l-4 pl-6 py-2" style={{ borderColor: borderCol }}>
      {s.heading && (
        <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: borderCol }}>
          {s.heading}
        </p>
      )}
      <p className="text-sm text-gray-700 leading-relaxed">{s.content}</p>
    </div>
  );
};

// Map — full-bleed with title
const SectionMap = ({ s }) => (
  <div className="mb-12 -mx-8 print:hidden">
    {s.title && (
      <div className="px-8 mb-4">
        <SectionHeading>{s.title}</SectionHeading>
      </div>
    )}
    <div className="border-y border-gray-200">
      <iframe
        src={s.src}
        width="100%"
        height={s.height || 440}
        style={{ border: 0, display: "block" }}
        title={s.title || "Map"}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
    {s.caption && (
      <p className="px-8 mt-2 text-[11px] text-gray-400 italic">{s.caption}</p>
    )}
  </div>
);

// Bar chart — OCHA sector breakdown style
const SectionBarChart = ({ s }) => (
  <div className="mb-12">
    {s.title && <SectionHeading>{s.title}</SectionHeading>}
    <div className="space-y-4">
      {s.items.map((item, i) => (
        <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700">{item.label}</span>
            <span className="text-sm font-black" style={{ color: NAVY }}>
              {item.value}{item.unit !== undefined ? item.unit : "%"}
            </span>
          </div>
          <div className="h-4 bg-gray-100 rounded overflow-hidden relative">
            <div
              className="h-full absolute left-0 top-0 rounded"
              style={{
                width: `${Math.min((item.value / (item.max || 100)) * 100, 100)}%`,
                backgroundColor: item.color || BLUE,
              }}
            />
          </div>
          {item.note && <p className="text-[10px] text-gray-400 mt-1">{item.note}</p>}
        </div>
      ))}
    </div>
  </div>
);

// Icon grid — OCHA pictogram style
const SectionIconGrid = ({ s }) => (
  <div className="mb-12">
    {s.title && <SectionHeading>{s.title}</SectionHeading>}
    <div className={`grid gap-0 border border-gray-200 ${
      s.cols === 2 ? "grid-cols-2" :
      s.cols === 4 ? "grid-cols-2 md:grid-cols-4" :
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }`}>
      {s.items.map((item, i) => {
        const Icon = I(item.icon);
        return (
          <div
            key={i}
            className="flex items-start gap-3 p-4 border-b border-r border-gray-200"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${BLUE}18` }}
            >
              <Icon size={17} style={{ color: BLUE }} />
            </div>
            <div>
              <p className="text-xs font-bold leading-snug" style={{ color: NAVY }}>{item.label}</p>
              {item.desc && (
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{item.desc}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// Image — full-bleed OCHA style
const SectionImage = ({ s }) => (
  <div className="mb-12 -mx-8">
    <div className="overflow-hidden">
      <img
        src={s.src}
        alt={s.alt || s.caption || ""}
        className="w-full object-cover"
        style={{ height: s.height || 460 }}
        loading="lazy"
      />
    </div>
    {s.caption && (
      <div className="px-8 py-2.5 bg-gray-50 border-b border-gray-200">
        <p className="text-[11px] text-gray-500 italic">
          <span className="font-bold text-gray-600">Photo: </span>{s.caption}
        </p>
      </div>
    )}
  </div>
);

// Quote — OCHA large pull-quote
const SectionQuote = ({ s }) => (
  <div className="mb-12 py-10 border-y-2 border-gray-100">
    <div className="w-10 h-1 mb-5" style={{ backgroundColor: BLUE }} />
    <p
      className="text-xl md:text-2xl font-black leading-tight italic mb-5"
      style={{ color: NAVY }}
    >
      "{s.text}"
    </p>
    {s.attribution && (
      <p className="text-xs font-black uppercase tracking-widest" style={{ color: BLUE }}>
        — {s.attribution}
      </p>
    )}
  </div>
);

// Table — OCHA clean minimal
const SectionTable = ({ s }) => (
  <div className="mb-12">
    {s.title && <SectionHeading>{s.title}</SectionHeading>}
    <div className="overflow-x-auto border border-gray-200">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr style={{ backgroundColor: NAVY }}>
            {s.headers.map((h, i) => (
              <th
                key={i}
                className="text-left font-black uppercase tracking-wide px-4 py-3 text-white text-[10px]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {s.rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-700 border-b border-gray-100">
                  {j === 0 ? <strong style={{ color: NAVY }}>{cell}</strong> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Two-col — side-by-side comparison
const SectionTwoCol = ({ s }) => {
  const bgs = {
    red: "#FEF2F2", green: "#F0FDF4", blue: "#EFF6FF", navy: "#F8FAFC", amber: "#FFFBEB",
  };
  return (
    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200">
      {[s.left, s.right].map((col, i) => (
        <div
          key={i}
          className={`p-6 ${i === 0 ? "border-b md:border-b-0 md:border-r border-gray-200" : ""}`}
          style={{ backgroundColor: bgs[col?.variant || "blue"] }}
        >
          {col?.heading && (
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: NAVY }}>
              {col.heading}
            </p>
          )}
          <p className="text-sm text-gray-700 leading-relaxed">{col?.content}</p>
        </div>
      ))}
    </div>
  );
};

// Partners — pill row
const SectionPartners = ({ s }) => (
  <div className="mb-12">
    {s.title && <SectionHeading>{s.title}</SectionHeading>}
    <div className="flex flex-wrap gap-2">
      {s.items.map((item, i) => (
        <span
          key={i}
          className="border border-gray-300 text-gray-600 text-xs font-bold px-3 py-2"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

// Timeline — OCHA horizontal dots on desktop, vertical on mobile
const SectionTimeline = ({ s }) => (
  <div className="mb-12">
    {s.title && <SectionHeading>{s.title}</SectionHeading>}

    {/* Desktop: horizontal 3-col grid with dots */}
    <div className="hidden md:grid gap-6" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
      {s.items.map((item, i) => {
        const Icon = I(item.icon || "clock");
        return (
          <div key={i} className="relative pt-6">
            {/* Connector line */}
            {i % 3 !== 2 && (
              <div
                className="absolute top-10 left-[calc(50%+20px)] right-0 h-px"
                style={{ backgroundColor: `${BLUE}50` }}
              />
            )}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-3 border-2 border-white shadow relative z-10"
              style={{ backgroundColor: i % 2 === 0 ? BLUE : NAVY }}
            >
              <Icon size={16} className="text-white" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: BLUE }}>
              {item.year}
            </p>
            <p className="text-xs font-bold leading-snug mb-1" style={{ color: NAVY }}>
              {item.title}
            </p>
            <p className="text-[11px] text-gray-500 leading-snug">{item.content}</p>
          </div>
        );
      })}
    </div>

    {/* Mobile: vertical */}
    <div className="md:hidden relative pl-8 border-l-2 space-y-7" style={{ borderColor: `${BLUE}40` }}>
      {s.items.map((item, i) => {
        const Icon = I(item.icon || "clock");
        return (
          <div key={i} className="relative">
            <div
              className="absolute -left-[29px] w-4 h-4 rounded-full border-2 border-white shadow flex items-center justify-center"
              style={{ backgroundColor: i % 2 === 0 ? BLUE : NAVY }}
            >
              <Icon size={9} className="text-white" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: BLUE }}>
              {item.year}
            </p>
            <p className="text-xs font-bold mb-0.5" style={{ color: NAVY }}>{item.title}</p>
            <p className="text-[11px] text-gray-500 leading-relaxed">{item.content}</p>
          </div>
        );
      })}
    </div>
  </div>
);

// Divider — OCHA chapter opener strip
const SectionDivider = ({ s }) => (
  <div className="mb-12 -mx-8 print:-mx-12">
    <div className="px-8 py-8 print:px-12" style={{ backgroundColor: NAVY }}>
      <div className="w-12 h-1 mb-4 rounded" style={{ backgroundColor: BLUE }} />
      <h2 className="text-2xl font-black text-white uppercase leading-tight tracking-wide">
        {s.title}
      </h2>
    </div>
  </div>
);

// Highlight row — large KPI cells
const SectionHighlightRow = ({ s }) => (
  <div className="mb-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
      {s.items.map((item, i) => (
        <div
          key={i}
          className={`px-6 py-8 text-center ${i < s.items.length - 1 ? "border-b md:border-b-0 md:border-r border-gray-200" : ""}`}
        >
          <p
            className="text-4xl font-black leading-none mb-2"
            style={{ color: i % 2 === 0 ? BLUE : ORANGE }}
          >
            {item.value}
          </p>
          <p className="text-xs font-black uppercase tracking-wide mb-1" style={{ color: NAVY }}>
            {item.label}
          </p>
          {item.note && <p className="text-[11px] text-gray-500">{item.note}</p>}
        </div>
      ))}
    </div>
  </div>
);

// Legacy text (old reports.js format)
const SectionLegacy = ({ s }) => (
  <div className="mb-12">
    {s.title && <SectionHeading>{s.title}</SectionHeading>}
    <div
      className="text-sm text-gray-700 leading-relaxed"
      style={{ columns: "2 280px", columnGap: "2.25rem" }}
    >
      {s.content.split("\n\n").map((para, i) => {
        if (!para.trim()) return null;
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} style={{ marginBottom: "0.875rem", breakInside: "avoid" }}>
            {parts.map((p2, j) =>
              p2.startsWith("**") && p2.endsWith("**")
                ? <strong key={j} style={{ color: NAVY }}>{p2.slice(2, -2)}</strong>
                : p2
            )}
          </p>
        );
      })}
    </div>
  </div>
);

// ─── OCHA HUMANITARIAN CLUSTER ICONS ─────────────────────────────────────────
const CLUSTER_ICONS = {
  food:         ShoppingCart,
  health:       Stethoscope,
  wash:         Droplets,
  shelter:      Home,
  protection:   Shield,
  nutrition:    Baby,
  education:    GraduationCap,
  logistics:    Truck,
  telecom:      Radio,
  coordination: Users,
  emergency:    AlertTriangle,
  livelihoods:  TrendingUp,
  camp:         Tent,
  nfi:          Package,
};
const CI = (name) => CLUSTER_ICONS[name] || Shield;

// ─── NEW SECTION: OCHA Cluster Dashboard ──────────────────────────────────────
// Renders a full sector breakdown table with dual bars (In Need vs Targeted)
const SectionClusterDashboard = ({ s }) => {
  const maxNeed = Math.max(...s.clusters.map((c) => c.needNum || 1));
  return (
    <div className="mb-12">
      {s.title && <SectionHeading>{s.title}</SectionHeading>}
      {/* Legend */}
      <div className="flex items-center gap-6 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 rounded-sm" style={{ backgroundColor: `${BLUE}80` }} />
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">People in Need</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 rounded-sm" style={{ backgroundColor: `${ORANGE}90` }} />
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">People Targeted</span>
        </div>
      </div>
      <div className="border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="grid border-b border-gray-200" style={{ gridTemplateColumns: "200px 1fr 100px 100px" }}>
          <div className="px-4 py-2.5 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">Cluster / Sector</div>
          <div className="px-4 py-2.5 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">Population Reach</div>
          <div className="px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-center border-l border-gray-200" style={{ backgroundColor: `${BLUE}12`, color: BLUE }}>In Need</div>
          <div className="px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-center border-l border-gray-200" style={{ backgroundColor: `${ORANGE}12`, color: ORANGE }}>Targeted</div>
        </div>
        {s.clusters.map((cluster, i) => {
          const Icon = CI(cluster.icon);
          const needPct = ((cluster.needNum || 1) / maxNeed) * 100;
          const targetPct = cluster.needNum ? ((cluster.targetNum || 0) / cluster.needNum) * 100 : 60;
          return (
            <div
              key={i}
              className="grid border-b border-gray-100 last:border-0"
              style={{ gridTemplateColumns: "200px 1fr 100px 100px", backgroundColor: i % 2 === 0 ? "#fff" : "#FAFAFA" }}
            >
              {/* Cluster name + icon */}
              <div className="px-3 py-3 flex items-center gap-2.5 border-r border-gray-100">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: BLUE }}
                >
                  <Icon size={14} className="text-white" />
                </div>
                <p className="text-[11px] font-bold leading-snug" style={{ color: NAVY }}>{cluster.name}</p>
              </div>
              {/* Dual bar */}
              <div className="px-4 py-3 flex flex-col justify-center gap-1.5 border-r border-gray-100">
                <div className="h-3 bg-gray-100 rounded-sm overflow-hidden">
                  <div className="h-full rounded-sm" style={{ width: `${needPct}%`, backgroundColor: `${BLUE}80` }} />
                </div>
                <div className="h-3 bg-gray-100 rounded-sm overflow-hidden">
                  <div className="h-full rounded-sm" style={{ width: `${targetPct}%`, backgroundColor: `${ORANGE}90` }} />
                </div>
              </div>
              {/* In Need */}
              <div className="px-3 py-3 text-center border-r border-gray-100 flex items-center justify-center">
                <p className="text-sm font-black" style={{ color: BLUE }}>{cluster.need}</p>
              </div>
              {/* Targeted */}
              <div className="px-3 py-3 text-center flex items-center justify-center">
                <p className="text-sm font-black" style={{ color: ORANGE }}>{cluster.target}</p>
              </div>
            </div>
          );
        })}
      </div>
      {s.note && <p className="text-[11px] text-gray-400 italic mt-2">{s.note}</p>}
    </div>
  );
};

// ─── NEW SECTION: Severity Map with IPC Legend ────────────────────────────────
const SectionSeverityMap = ({ s }) => (
  <div className="mb-12 -mx-8">
    {s.title && (
      <div className="px-8 mb-4">
        <SectionHeading>{s.title}</SectionHeading>
      </div>
    )}
    <div className="relative">
      {/* Map embed */}
      <div className="border-y border-gray-200 print:hidden">
        <iframe
          src={s.src}
          width="100%"
          height={s.height || 460}
          style={{ border: 0, display: "block" }}
          title={s.title || "Severity Map"}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {/* IPC Legend overlay */}
      {s.legend && (
        <div
          className="absolute top-3 right-3 bg-white border border-gray-200 shadow-md p-3 print:hidden"
          style={{ minWidth: 160 }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">
            {s.legendTitle || "IPC Phase Classification"}
          </p>
          {s.legend.map((l, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5 last:mb-0">
              <div className="w-5 h-3 shrink-0 border border-white/30" style={{ backgroundColor: l.color }} />
              <span className="text-[10px] text-gray-600 leading-tight">{l.label}</span>
            </div>
          ))}
        </div>
      )}
      {/* Print fallback */}
      <div className="hidden print:flex px-8 py-6 bg-gray-50 border-b border-gray-200 items-center gap-3">
        <MapPin size={14} style={{ color: BLUE }} />
        <p className="text-xs text-gray-500 italic">[Map: {s.title || "Geographic Coverage"} — see online version for interactive map]</p>
      </div>
    </div>
    {s.caption && <p className="px-8 mt-2 text-[11px] text-gray-400 italic">{s.caption}</p>}
  </div>
);

// ─── NEW SECTION: Photo Spread ────────────────────────────────────────────────
// 2 or 3-column grid of full-bleed field photographs with captions
const SectionPhotoSpread = ({ s }) => {
  const cols = s.photos?.length === 3 ? "grid-cols-3" : "grid-cols-2";
  return (
    <div className="mb-12 -mx-8">
      <div className={`grid ${cols}`}>
        {(s.photos || []).map((photo, i) => (
          <div key={i} className="relative overflow-hidden" style={{ height: s.height || 260 }}>
            <img
              src={photo.src}
              alt={photo.caption || ""}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(28,43,57,0.80) 0%, rgba(28,43,57,0.10) 50%, transparent 100%)" }}
            />
            {photo.location && (
              <div
                className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white"
                style={{ backgroundColor: BLUE }}
              >
                {photo.location}
              </div>
            )}
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                <p className="text-white text-[11px] leading-snug">
                  <span className="font-bold">Photo: </span>{photo.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const RENDERERS = {
  text:               SectionText,
  stats:              SectionStats,
  callout:            SectionCallout,
  map:                SectionMap,
  "bar-chart":        SectionBarChart,
  "icon-grid":        SectionIconGrid,
  image:              SectionImage,
  quote:              SectionQuote,
  table:              SectionTable,
  "two-col":          SectionTwoCol,
  partners:           SectionPartners,
  timeline:           SectionTimeline,
  divider:            SectionDivider,
  "highlight-row":    SectionHighlightRow,
  "cluster-dashboard": SectionClusterDashboard,
  "severity-map":     SectionSeverityMap,
  "photo-spread":     SectionPhotoSpread,
};

// ─── OCHA-STYLE DOCUMENT COVER ────────────────────────────────────────────────
const DocumentCover = ({ doc }) => {
  const catColor = allCategoryColor(doc.category);
  return (
    <div className="ocha-cover">
      {/* ── Top white header (OCHA style) ── */}
      <div className="bg-white flex items-stretch border-b border-gray-200">
        {/* Left: title block */}
        <div className="flex-1 px-8 py-8">
          <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: BLUE }}>
            WORLD DISASTER CENTER — OFFICIAL PUBLICATION
          </p>
          <span className={`inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-widest mb-5 rounded ${catColor}`}>
            {doc.category}
          </span>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-none tracking-tight mb-3"
            style={{ color: NAVY }}
          >
            {doc.title}
          </h1>
          {doc.subtitle && (
            <p className="text-base font-bold mt-3 leading-snug" style={{ color: BLUE }}>
              {doc.subtitle}
            </p>
          )}
        </div>
        {/* Right: metadata panel */}
        <div
          className="w-44 md:w-52 shrink-0 flex flex-col justify-between px-5 py-7"
          style={{ backgroundColor: NAVY }}
        >
          <div>
            <p className="text-[9px] font-black text-white uppercase tracking-widest mb-4 leading-snug opacity-60">
              World Disaster Center
            </p>
            <div className="space-y-2.5 text-[11px] text-gray-300">
              <p className="leading-snug">
                <span className="text-white font-bold block text-[9px] uppercase tracking-widest opacity-60 mb-0.5">Published</span>
                {doc.date}
              </p>
              <p className="leading-snug">
                <span className="text-white font-bold block text-[9px] uppercase tracking-widest opacity-60 mb-0.5">Pages</span>
                {doc.pages}
              </p>
              <p className="leading-snug">
                <span className="text-white font-bold block text-[9px] uppercase tracking-widest opacity-60 mb-0.5">Signed by</span>
                {doc.signedBy}
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-3">
            <p className="text-[10px] text-gray-400">worlddisastercenter.org</p>
          </div>
        </div>
      </div>

      {/* ── Full-bleed cover photo ── */}
      {doc.coverImage ? (
        <div className="relative overflow-hidden" style={{ height: 380 }}>
          <img
            src={doc.coverImage}
            alt={doc.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Description overlay — bottom right */}
          {doc.description && (
            <div
              className="absolute bottom-0 right-0 max-w-xs px-6 py-4"
              style={{ backgroundColor: `${NAVY}E0` }}
            >
              <p className="text-[11px] text-gray-200 leading-relaxed line-clamp-4">
                {doc.description}
              </p>
            </div>
          )}
          {/* Tags — bottom left */}
          <div className="absolute bottom-4 left-8 flex flex-wrap gap-1.5">
            {doc.tags?.slice(0, 4).map((t) => (
              <span
                key={t}
                className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* No cover image — show description in a gray strip */
        <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mb-3">{doc.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {doc.tags?.slice(0, 6).map((t) => (
              <span key={t} className="bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const ReportDetail = () => {
  const { reportId } = useParams();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); setActiveIdx(0); }, [reportId]);

  const doc = ALL_REPORTS.find((r) => r.id === reportId);
  if (!doc) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <BookOpen size={48} className="text-gray-300 mb-4" />
      <h1 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Document Not Found</h1>
      <Link
        to="/reports"
        className="text-white font-bold px-6 py-3 text-sm hover:opacity-90"
        style={{ backgroundColor: BLUE }}
      >
        Back to All Reports
      </Link>
    </div>
  );

  const isRich = doc.sections?.[0]?.type !== undefined;

  const toc = doc.sections
    .map((s, i) => ({ label: s.title || s.heading, idx: i, isDivider: s.type === "divider" }))
    .filter((t) => t.label);

  const canonicalUrl = `https://www.worlddisastercenter.org/reports/${doc.id}`;
  const ogImage = doc.coverImage || "https://i.ibb.co/kJ63JTV/wdclogobg.png";
  const pageTitle = `${doc.title} | World Disaster Center`;
  const metaDesc = doc.description?.slice(0, 160) || `${doc.title} — official publication by World Disaster Center, signed by ${doc.signedBy}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    "name": doc.title,
    "description": doc.description,
    "datePublished": doc.date,
    "author": {
      "@type": "Person",
      "name": doc.signedBy,
      "jobTitle": doc.signedTitle,
    },
    "publisher": {
      "@type": "Organization",
      "name": "World Disaster Center",
      "url": "https://www.worlddisastercenter.org",
      "logo": "https://i.ibb.co/kJ63JTV/wdclogobg.png",
    },
    "url": canonicalUrl,
    "image": ogImage,
    "about": doc.tags?.map(t => ({ "@type": "Thing", "name": t })),
    "inLanguage": "en",
    "keywords": doc.tags?.join(", "),
  };

  return (
    <div className="min-h-screen print:bg-white" style={{ backgroundColor: "#F0F2F5" }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={doc.title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="World Disaster Center" />
        <meta property="article:published_time" content={doc.date} />
        <meta property="article:author" content={doc.signedBy} />
        <meta property="article:section" content={doc.category} />
        {doc.tags?.map(t => <meta key={t} property="article:tag" content={t} />)}
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={doc.title} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={ogImage} />
        {/* JSON-LD structured data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── OCHA-style top nav bar ── */}
      <div className="print:hidden sticky top-0 z-40" style={{ backgroundColor: NAVY }}>
        <div className="container sm:px-2 flex items-center justify-between py-2.5 gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-300 min-w-0 flex-1">
            <Link
              to="/reports"
              className="hover:text-white flex items-center gap-1 font-bold shrink-0"
            >
              <ArrowLeft size={13} /> Reports
            </Link>
            <ChevronRight size={10} className="text-gray-500 shrink-0" />
            <span className="truncate text-[11px]" style={{ color: BLUE }}>
              {doc.category}
            </span>
            <ChevronRight size={10} className="text-gray-500 shrink-0 hidden md:block" />
            <span className="text-white truncate text-[11px] hidden md:block">{doc.title}</span>
          </div>
          {/* Page strip label */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 shrink-0">
            <span style={{ color: BLUE }}>WDC</span>
            <span>·</span>
            <span>{doc.category.toUpperCase()}</span>
            <span>·</span>
            <span>{doc.date}</span>
          </div>
          {/* Print */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 shrink-0 transition-all hover:border-[#1F9AD9] hover:text-white"
            style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#CBD5E1" }}
          >
            <Printer size={12} /> Print / PDF
          </button>
        </div>
      </div>

      <div className="container sm:px-2 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Sticky sidebar TOC ── */}
          <aside className="lg:w-56 shrink-0 print:hidden">
            <div className="sticky top-16 space-y-3">
              <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3" style={{ backgroundColor: NAVY }}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-0.5" style={{ color: BLUE }}>
                    Contents
                  </p>
                  <p className="text-[11px] text-gray-300 leading-snug line-clamp-2">{doc.title}</p>
                </div>
                <nav className="p-1.5 max-h-[58vh] overflow-y-auto">
                  {toc.map(({ label, idx, isDivider }) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveIdx(idx);
                        document.getElementById(`sec-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="w-full text-left px-3 py-2 text-[11px] leading-snug transition-colors"
                      style={
                        isDivider
                          ? { color: BLUE, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }
                          : activeIdx === idx
                          ? { color: BLUE, fontWeight: 700, backgroundColor: `${BLUE}12`, borderLeft: `2px solid ${BLUE}`, paddingLeft: "10px" }
                          : { color: "#4B5563" }
                      }
                    >
                      {label}
                    </button>
                  ))}
                </nav>
                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                  <p className="text-[10px] font-bold" style={{ color: NAVY }}>{doc.signedBy}</p>
                  <p className="text-[10px] text-gray-400">{doc.date} · {doc.pages} pages</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 px-4 py-3 text-[11px] text-gray-500">
                <p className="font-bold mb-1" style={{ color: NAVY }}>Download as PDF</p>
                <p className="leading-snug">Press <kbd className="bg-gray-100 border border-gray-300 px-1 py-0.5 rounded text-[10px]">⌘P</kbd> and choose <em>Save as PDF</em>.</p>
              </div>
            </div>
          </aside>

          {/* ── Document paper ── */}
          <main className="flex-1 min-w-0">
            <div className="bg-white shadow-lg print:shadow-none">

              {/* OCHA-style cover */}
              <DocumentCover doc={doc} />

              {/* OCHA page header strip */}
              <div
                className="px-8 py-2.5 border-b border-gray-200 flex items-center gap-3"
                style={{ backgroundColor: `${BLUE}10` }}
              >
                <div className="w-1 h-4 rounded" style={{ backgroundColor: BLUE }} />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <span style={{ color: BLUE }}>World Disaster Center</span>
                  {" · "}{doc.category}{" · "}{doc.date}
                </p>
              </div>

              {/* Body sections */}
              <div className="px-8 pt-10 pb-4">
                {doc.sections.map((s, i) => {
                  const Comp = isRich ? (RENDERERS[s.type] || SectionText) : SectionLegacy;
                  return (
                    <div key={i} id={`sec-${i}`} className="scroll-mt-24">
                      <Comp s={s} doc={doc} />
                    </div>
                  );
                })}
              </div>

              {/* OCHA-style signature & footer */}
              <div className="px-8 pb-10">
                <div
                  className="border-t-2 pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
                  style={{ borderColor: BLUE }}
                >
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      Signed
                    </p>
                    <p className="text-2xl font-black italic mb-0.5" style={{ color: NAVY }}>
                      {doc.signedBy}
                    </p>
                    <p className="text-sm text-gray-500">{doc.signedTitle}</p>
                    <p className="text-xs text-gray-400 mt-1">{doc.date}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p
                      className="text-[10px] font-black uppercase tracking-widest mb-1"
                      style={{ color: BLUE }}
                    >
                      World Disaster Center
                    </p>
                    <p className="text-[11px] text-gray-500">office@worlddisastercenter.org</p>
                    <p className="text-[11px] text-gray-500">worlddisastercenter.org</p>
                    <p className="text-[10px] text-gray-400 mt-2">
                      © World Disaster Center · Free to read and share
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between print:hidden">
                  <Link
                    to="/reports"
                    className="flex items-center gap-2 text-sm font-bold hover:underline"
                    style={{ color: BLUE }}
                  >
                    <ArrowLeft size={14} /> All Reports & Documents
                  </Link>
                  <a
                    href={`https://github.com/sapiensunocha/wdc-website-official-new/releases/download/v1.0-reports/${doc.id}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 text-white hover:opacity-90"
                    style={{ backgroundColor: BLUE }}
                  >
                    <Download size={12} /> Download PDF
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── Print CSS ── */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body { margin: 0; font-size: 10pt; color: #1a1a1a; background: white !important; }
          .min-h-screen { background: white !important; }
          .shadow-lg { box-shadow: none !important; }
          .container { max-width: 100% !important; padding: 0 !important; }
          .py-8, .lg\\:flex-row { padding: 0 !important; }
          main { width: 100% !important; }
          h1 { font-size: 22pt !important; }
          h2 { font-size: 14pt !important; }
          h3 { font-size: 11pt !important; }
          p, li { line-height: 1.5; }
          img { max-width: 100%; page-break-inside: avoid; }
          iframe { display: none !important; }
          .ocha-cover { page-break-after: always; }
          .-mx-8 { margin-left: 0 !important; margin-right: 0 !important; }
          .px-8 { padding-left: 1.5cm !important; padding-right: 1.5cm !important; }
          @page {
            margin: 1.5cm 1.5cm 2cm 1.5cm;
            size: A4;
          }
          @page :bottom-center {
            content: counter(page);
          }
        }
      `}</style>
    </div>
  );
};

export default ReportDetail;
