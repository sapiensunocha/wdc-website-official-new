import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TeamPage from "../../../components/team";
import AnimateIn from "../../../components/AnimateIn";

// ─── Org Chart Data ───────────────────────────────────────────────────────────

const CSUITE = [
  "Chief Executive Officer",
  "Chief Marketing Officer",
  "Chief Financial Officer",
  "Chief Information Officer",
  "Chief Technology Officer",
  "Chief Digital Officer",
  "Chief Communications Officer",
  "Chief Security Officer",
  "Chief Procurement Officer",
  "Chief Green Officer",
  "Chief Scientific Officer",
];

const PROGRAM_TEAM = [
  { label: "Quality", color: "bg-green-100 border-green-400 text-green-800" },
  { label: "Monitoring & Evaluation", color: "bg-green-100 border-green-400 text-green-800" },
  { label: "Risk Management", color: "bg-green-100 border-green-400 text-green-800" },
  { label: "Fundraising", color: "bg-yellow-100 border-yellow-500 text-yellow-800", isNew: true },
];

const FUNCTIONAL_TEAMS = [
  {
    label: "Information System",
    color: "bg-amber-50 border-amber-400",
    children: [
      { label: "Data Team", color: "bg-green-100 border-green-400 text-green-800" },
      { label: "Development Team", color: "bg-amber-100 border-amber-400 text-amber-800",
        children: [
          { label: "Web Development", color: "bg-pink-100 border-pink-400 text-pink-800" },
          { label: "Mobile Development", color: "bg-pink-100 border-pink-400 text-pink-800" },
        ]
      },
      { label: "AI Team", color: "bg-pink-100 border-pink-400 text-pink-800" },
    ],
  },
  {
    label: "Public Information",
    color: "bg-blue-50 border-blue-400",
    children: [
      { label: "Marketing & Social Media", color: "bg-amber-100 border-amber-400 text-amber-800" },
      { label: "Communication", color: "bg-green-100 border-green-400 text-green-800" },
      { label: "UX", color: "bg-pink-100 border-pink-400 text-pink-800" },
    ],
  },
  { label: "Research, Analysis & Digital Innovation", color: "bg-green-50 border-green-400" },
  { label: "Forecast Team", color: "bg-pink-50 border-pink-400" },
  { label: "Advocacy Team", color: "bg-purple-50 border-purple-400" },
  { label: "Policy & Strategy", color: "bg-indigo-50 border-indigo-400" },
  { label: "Emergency Team", color: "bg-red-50 border-red-400" },
];

const ADMIN_TEAM = ["HR", "Finance", "Logistics", "Procurement", "Supply Chain Management"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function OrgBox({ label, color = "bg-blue-50 border-[#009EDB]", className = "", isNew = false, children }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className={`relative px-3 py-1.5 rounded border text-xs font-semibold text-center whitespace-nowrap ${color}`}>
        {label}
        {isNew && (
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase leading-none">
            New
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function ConnectorV({ height = "h-5" }) {
  return <div className={`w-px ${height} bg-gray-300 mx-auto`} />;
}

function ConnectorH() {
  return <div className="absolute top-0 left-0 right-0 h-px bg-gray-300" />;
}

function FunctionalTeamNode({ team }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`px-3 py-1.5 rounded border text-xs font-semibold text-center ${team.color} text-gray-800`}>
        {team.label}
      </div>
      {team.children && (
        <>
          <ConnectorV />
          <div className="relative flex gap-4 pt-0">
            <ConnectorH />
            {team.children.map((child, i) => (
              <div key={i} className="flex flex-col items-center pt-3">
                <div className={`px-2 py-1 rounded border text-[11px] font-medium text-center ${child.color}`}>
                  {child.label}
                </div>
                {child.children && (
                  <>
                    <ConnectorV />
                    <div className="relative flex gap-3 pt-0">
                      <ConnectorH />
                      {child.children.map((sub, j) => (
                        <div key={j} className="flex flex-col items-center pt-3">
                          <div className={`px-2 py-1 rounded border text-[10px] font-medium text-center ${sub.color}`}>
                            {sub.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function OrgChart() {
  return (
    <div className="overflow-x-auto pb-6">
      <div className="min-w-[900px] flex flex-col items-center gap-0 text-sm">

        {/* Board of Director */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="px-6 py-2 rounded bg-[#1C2B39] text-white text-sm font-bold border border-[#009EDB] text-center min-w-[200px]"
        >
          Board of Director
        </motion.div>
        <ConnectorV />

        {/* Advisory boards */}
        <div className="relative flex gap-4">
          <ConnectorH />
          {["Board of Advisors", "Board of Ambassadors", "Board of Mentors", "Board of Coaches"].map((b) => (
            <div key={b} className="flex flex-col items-center pt-3">
              <div className="px-3 py-1.5 rounded border border-[#009EDB] bg-[#e8f6fc] text-[#1C2B39] text-xs font-semibold text-center whitespace-nowrap">
                {b}
              </div>
            </div>
          ))}
        </div>
        <ConnectorV />

        {/* Founders */}
        <div className="px-6 py-2 rounded bg-[#009EDB] text-white text-sm font-bold text-center min-w-[160px]">
          Founders
        </div>
        <ConnectorV />

        {/* C-Suite */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 w-full max-w-4xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-3">Front Office</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CSUITE.map((role) => (
              <span key={role} className="px-3 py-1 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700 text-center">
                {role}
              </span>
            ))}
          </div>
        </div>
        <ConnectorV />

        {/* Program Team */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 w-full max-w-4xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-3">Program Team</p>
          <div className="flex flex-wrap justify-center gap-2">
            {PROGRAM_TEAM.map(({ label, color, isNew }) => (
              <span key={label} className={`relative px-3 py-1 rounded border text-xs font-semibold text-center ${color}`}>
                {label}
                {isNew && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase leading-none">
                    New
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
        <ConnectorV />

        {/* Functional teams */}
        <div className="relative flex flex-wrap justify-center gap-6 pt-0 w-full max-w-5xl">
          <ConnectorH />
          {FUNCTIONAL_TEAMS.map((team, i) => (
            <div key={i} className="flex flex-col items-center pt-3">
              <FunctionalTeamNode team={team} />
            </div>
          ))}
        </div>
        <ConnectorV />

        {/* Admin Team */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 w-full max-w-3xl">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-3">Admin Team</p>
          <div className="flex flex-wrap justify-center gap-2">
            {ADMIN_TEAM.map((role) => (
              <span key={role} className="px-3 py-1 rounded border border-gray-300 bg-white text-xs font-medium text-gray-700">
                {role}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamAndOrgPage() {
  const [activeTab, setActiveTab] = useState("orgchart");

  return (
    <div className="bg-white">

      {/* Hero */}
      <div className="bg-[#1C2B39] text-white">
        <div className="container py-10 sm:py-14 md:py-16">
          <div className="h-1 w-12 bg-[#009EDB] mb-5" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Team &amp; Organization
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Meet the people driving WDC's mission and see how we are structured
            to deliver real-time disaster intelligence worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-bold px-6 py-3 rounded text-sm transition-colors uppercase tracking-wider w-full sm:w-auto"
            >
              ← Back to About
            </Link>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-6 py-3 rounded text-sm transition-colors uppercase tracking-wider w-full sm:w-auto"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container flex gap-0">
          {[
            { key: "orgchart", label: "Organisational Chart" },
            { key: "team", label: "Meet the Team" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === key
                  ? "border-[#009EDB] text-[#009EDB]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "orgchart" && (
        <div className="container py-12">
          <div className="max-w-3xl mb-8">
            <p className="tagline text-primary mb-2">Structure</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-content-primary mb-3">
              Organisational Chart
            </h2>
            <p className="text-content-secondary">
              WDC operates through a clear hierarchy — from our Board of Director down to specialised
              program and admin teams. The <span className="font-semibold text-yellow-700 bg-yellow-100 px-1 rounded">Fundraising</span> team
              has been added to the Program Team as a critical function.
            </p>
          </div>
          <OrgChart />
        </div>
      )}

      {activeTab === "team" && (
        <div className="pt-4">
          <TeamPage />
        </div>
      )}

    </div>
  );
}
