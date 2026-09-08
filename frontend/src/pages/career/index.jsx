import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, Building2, ExternalLink, Search, ChevronDown,
  Briefcase, Globe,
} from "lucide-react";
import AnimateIn from "../../components/AnimateIn";
import SEOMeta from "../../components/SEOMeta";

const WDC_ORG_URL = "https://www.idealist.org/en/nonprofit/059fab99846344a385266ced93563c9f-world-disaster-center-new-york";

const JOBS = [
  {
    id: "e6fb04a0ffb64f57ade40dcaefe84abe",
    title: "Research Fellow / Research Officer (Part-Time, Remote)",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Part-time",
    description: "The World Disaster Center (WDC) is building a next-generation global risk intelligence system to better understand, anticipate, and respond to disasters worldwide. We are seeking a highly capable Research Fellow or Research Officer to contribute to our intelligence publications, policy briefs, and data analysis.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/e6fb04a0ffb64f57ade40dcaefe84abe",
  },
  {
    id: "e2a4a3344f4d4e7692990c7e1961862b",
    title: "Fundraising Coordinator (Part-Time)",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Part-time",
    description: "The World Disaster Center (WDC) is expanding its fundraising efforts to support disaster response and health initiatives, including Ebola response. We are seeking a Fundraising Coordinator to help develop and execute fundraising campaigns, donor outreach, and grant prospecting.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/e2a4a3344f4d4e7692990c7e1961862b",
  },
  {
    id: "a3c8bca58aea47ec92f2db3a05159033",
    title: "Join the World Disaster Global Expert Roster",
    type: "Volunteer",
    location: "Remote / International",
    locationType: "Remote",
    commitment: "Flexible",
    description: "The World Disaster Center (WDC) is building a vetted global network of humanitarian experts ready for rapid deployment to disaster-affected areas worldwide. We are recruiting seasoned professionals across emergency management, public health, logistics, engineering, and more.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/a3c8bca58aea47ec92f2db3a05159033",
  },
  {
    id: "35372f5170984600bbaaf06fb47b34cb",
    title: "Digital Knowledge & Reputation Specialist",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Flexible",
    description: "World Disaster Center is a global initiative focused on advancing disaster resilience, humanitarian innovation, geospatial intelligence, and knowledge-sharing to support communities affected by disasters. We are seeking a Digital Knowledge & Reputation Specialist to manage and grow our digital presence.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/35372f5170984600bbaaf06fb47b34cb",
  },
  {
    id: "bb8a60ffe96a43379cec8a97585134a1",
    title: "Administrative Assistant (2 Open Roles)",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Part-time",
    description: "We are seeking two highly organized and reliable Administrative Assistants to support the operations of the World Disaster Center (WDC) and the Michael App team. Responsibilities include scheduling, communications coordination, document management, and operational support.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/bb8a60ffe96a43379cec8a97585134a1",
  },
  {
    id: "9dba9607d1184449873431986d3b7118",
    title: "Co-Founder (Growth & Capital) – Fintech / Future Banking Initiative",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Full-time",
    description: "We are building Infinite Future Bank (IFB) — a next-generation financial infrastructure platform focused on enabling cross-market access, capital mobility, and scalable financial systems. We are looking for a Co-Founder with deep expertise in fintech, capital markets, or growth strategy.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/9dba9607d1184449873431986d3b7118",
  },
  {
    id: "ae3d5b86217548aaada9e96fc8a1165f",
    title: "Training and Roster Management Specialist (International Volunteer)",
    type: "Volunteer",
    location: "Remote / International",
    locationType: "Remote",
    commitment: "Part-time",
    description: "We are looking for a motivated volunteer to support our disaster management consulting team by managing outreach efforts and coordinating our roster of experts and volunteers. This role is crucial for building our global response capacity.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/ae3d5b86217548aaada9e96fc8a1165f",
  },
  {
    id: "1722956a1cbd4dd0877ab8710112a878",
    title: "Compliance Officer — World Disaster Centre",
    type: "Volunteer",
    location: "Remote / International",
    locationType: "Remote",
    commitment: "Part-time",
    description: "Organization: World Disaster Center (WDC). Department: Compliance, Ethics & Organizational Integrity. Reports to: Founder / Executive Leadership. The Compliance Officer will develop and maintain WDC's policies, ensure regulatory compliance, and uphold ethical standards across all operations.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/1722956a1cbd4dd0877ab8710112a878",
  },
  {
    id: "abded48a84384791bdbacd4c6a37aa7b",
    title: "Space Systems Lead / Director (Satellite Program)",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Full-time",
    description: "The World Disaster Center (WDC) is building a next-generation global disaster intelligence system. We are launching a satellite-enabled program and seeking a Space Systems Lead or Director to guide the design and deployment of our satellite intelligence capabilities.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/abded48a84384791bdbacd4c6a37aa7b",
  },
  {
    id: "f7e65f8c3ba74bf3944718208f54508d",
    title: "Website Design & Development Volunteer",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Flexible",
    description: "Are you passionate about coding and want to use your skills to make a real difference? The World Disaster Center (WDC) is looking for an innovative and driven Website Developer to help build and maintain our digital platforms serving humanitarian and disaster intelligence missions.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/f7e65f8c3ba74bf3944718208f54508d",
  },
  {
    id: "c5476349ecd0418587769be3e4397931",
    title: "Project Manager (Founding Role) – Michael App",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Full-time",
    description: "The World Disaster Center (WDC) is seeking a Project Manager (Founding Role) to lead the development and execution of the Michael App — a platform designed to deliver real-time disaster intelligence, response coordination, and field situational awareness.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/c5476349ecd0418587769be3e4397931",
  },
  {
    id: "86b2abd8b6da4eadb045031da36e1652",
    title: "Multimedia Content Creator (Video & Photo – Marketing Focus)",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Part-time",
    description: "The World Disaster Center (WDC) is building a global disaster intelligence system working with institutions, governments, and partners. We are looking for a Multimedia Content Creator to produce compelling video and photo content that amplifies WDC's mission and reach.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/86b2abd8b6da4eadb045031da36e1652",
  },
  {
    id: "76b076aee9a54f189e91e2b4616cfc07",
    title: "IT Officer (Systems & Infrastructure)",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Part-time",
    description: "The World Disaster Center (WDC) is building a global disaster intelligence system and digital platform. We are seeking an IT Officer to ensure our systems, tools, and infrastructure remain secure, reliable, and scalable.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/76b076aee9a54f189e91e2b4616cfc07",
  },
  {
    id: "5fd98f1e724645549da37aed86d80b0f",
    title: "Fundraising Volunteers Needed",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Flexible",
    description: "The World Disaster Center is seeking passionate Fundraising Volunteers to help expand our efforts in disaster preparedness, response, and recovery. As a volunteer, you'll play a critical role in securing resources that power our global humanitarian mission.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/5fd98f1e724645549da37aed86d80b0f",
  },
  {
    id: "b80619a4178947f38e63b7d825c75dc7",
    title: "Partnership Officer",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Part-time",
    description: "The Partnership Officer will be responsible for building and managing strategic partnerships for WDC and the Michael App. This is a high-impact, founding-level role focused on institutional outreach, NGO engagement, and governmental relations.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/b80619a4178947f38e63b7d825c75dc7",
  },
  {
    id: "d5ca36c57f684c97b06c0e0524728ec5",
    title: "Corporate Partnerships & Business Development Lead",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Part-time",
    description: "World Disaster Center (WDC) is developing a next-generation global disaster intelligence and response platform. We seek a Corporate Partnerships & Business Development Lead to drive revenue-generating partnerships with corporations, foundations, and institutional stakeholders.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/d5ca36c57f684c97b06c0e0524728ec5",
  },
  {
    id: "dadd01fbeebb419daa5c6bf6d88f13e5",
    title: "Full-Stack Aerospace / Systems Engineer – Stratospheric Balloon Intelligence Network",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Full-time",
    description: "The World Disaster Center (WDC) is developing a next-generation stratospheric sensing and early-warning infrastructure designed to improve real-time disaster intelligence and environmental monitoring. We seek a Full-Stack Aerospace / Systems Engineer to lead this initiative.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/dadd01fbeebb419daa5c6bf6d88f13e5",
  },
  {
    id: "9af473401e2543238ff38f8643bfcb92",
    title: "Full-Stack Engineer (React + Supabase + APIs)",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Full-time",
    description: "We are seeking a highly disciplined and execution-focused Software Engineer to support the development and stabilization of our platform (Michael App). This is not a learning role — we need someone who can ship production-quality code independently.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/9af473401e2543238ff38f8643bfcb92",
  },
  {
    id: "e4bfff1b7dcf46fbbf2fc8f623ad7ce4",
    title: "Board of Directors – World Disaster Center (WDC)",
    type: "Volunteer",
    location: "Remote / International",
    locationType: "Remote",
    commitment: "Flexible",
    description: "The World Disaster Center (WDC) is an emerging global initiative focused on transforming disaster resilience, response, and intelligence worldwide. We are recruiting Board members with expertise in governance, international relations, finance, law, or humanitarian operations.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/e4bfff1b7dcf46fbbf2fc8f623ad7ce4",
  },
  {
    id: "f7f498d5428643fabc903fccb511a043",
    title: "Sales Representative",
    type: "Volunteer",
    location: "Remote",
    locationType: "Remote",
    commitment: "Part-time",
    description: "The World Disaster Center (WDC) is building a global disaster intelligence system working with institutions, NGOs, and governments. We are looking for a Sales Representative to help grow our partnerships, drive adoption of our tools, and generate revenue to sustain our mission.",
    applicationUrl: "https://www.idealist.org/en/volunteer-opportunity/f7f498d5428643fabc903fccb511a043",
  },
];

const TYPE_COLOR = {
  "Job":        { bg: "#E8F5FC", text: "#009EDB", border: "#009EDB33" },
  "Volunteer":  { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d033" },
  "Internship": { bg: "#fdf4ff", text: "#9333ea", border: "#d8b4fe33" },
  "Fellowship": { bg: "#fff7ed", text: "#ea580c", border: "#fed7aa33" },
  "default":    { bg: "#f1f5f9", text: "#475569", border: "#e2e8f033" },
};

function typeStyle(type) {
  return TYPE_COLOR[type] || TYPE_COLOR["default"];
}

function JobCard({ job, index }) {
  const [expanded, setExpanded] = useState(false);
  const ts = typeStyle(job.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border overflow-hidden"
      style={{
        borderColor: expanded ? "#009EDB" : "#E2E8F0",
        boxShadow: expanded
          ? "0 0 0 2px #009EDB22, 0 8px 32px rgba(0,0,0,0.06)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.25s",
      }}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{ background: ts.bg, color: ts.text, border: `1px solid ${ts.border}` }}
              >
                {job.type || "Position"}
              </span>
              {job.locationType && (
                <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                  {job.locationType}
                </span>
              )}
              <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                Active
              </span>
            </div>

            <h3 className="text-lg font-black leading-snug mb-2" style={{ color: "#0D1F2D" }}>
              {job.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm" style={{ color: "#475569" }}>
              {job.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} style={{ color: "#94A3B8" }} />
                  {job.location}
                </span>
              )}
              {job.commitment && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} style={{ color: "#94A3B8" }} />
                  {job.commitment}
                </span>
              )}
              {job.department && (
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} style={{ color: "#94A3B8" }} />
                  {job.department}
                </span>
              )}
            </div>
          </div>

          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-85"
            style={{ background: "#009EDB" }}
          >
            Apply <ExternalLink size={13} />
          </a>
        </div>

        {job.description && (
          <div className="mt-4">
            <AnimatePresence initial={false}>
              {!expanded ? (
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#64748B" }}>
                  {job.description}
                </p>
              ) : (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                    {job.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(p => !p)}
              className="flex items-center gap-1 mt-2 text-xs font-bold transition-colors hover:opacity-70"
              style={{ color: "#009EDB" }}
            >
              {expanded ? "Show less" : "Show more"}
              <ChevronDown
                size={13}
                style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
              />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function CareerPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const types = ["All", ...Array.from(new Set(JOBS.map(j => j.type).filter(Boolean)))];

  const filtered = JOBS.filter(j => {
    const matchType   = filter === "All" || j.type === filter;
    const matchSearch = !search.trim() ||
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.description?.toLowerCase().includes(search.toLowerCase()) ||
      j.location?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <>
      <SEOMeta
        title="Careers — World Disaster Center"
        description="Join the World Disaster Center team. Open volunteer positions in disaster intelligence, AI, communications, partnerships, and humanitarian operations."
        url="/careers"
      />

      {/* Hero */}
      <section className="py-16 sm:py-24" style={{ background: "linear-gradient(135deg, #F8FAFB 0%, #E8F5FC 100%)" }}>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-black tracking-widest uppercase">Careers</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4" style={{ color: "#0D1F2D" }}>
                Help Build a Safer World
              </h1>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#475569" }}>
                WDC is on a mission to end preventable disaster impacts. We're looking for talent in AI, disaster intelligence, communications, partnerships, and humanitarian operations — from all backgrounds.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Jobs section */}
      <section className="py-14 bg-white">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black" style={{ color: "#0D1F2D" }}>Open Positions</h2>
                <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
                  {filtered.length} position{filtered.length !== 1 ? "s" : ""} available
                  <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold text-green-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Live
                  </span>
                </p>
              </div>

              <a
                href={WDC_ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all hover:bg-slate-50"
                style={{ borderColor: "#E2E8F0", color: "#475569" }}
              >
                <Globe size={14} /> View on Idealist <ExternalLink size={12} />
              </a>
            </div>
          </AnimateIn>

          {/* Search + filter */}
          <AnimateIn variant="fadeUp" delay={0.05}>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#94A3B8" }} />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search positions, skills, location…"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E2E8F0", color: "#0D1F2D", background: "#FAFAFA" }}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold border transition-all"
                    style={{
                      background:   filter === t ? "#009EDB" : "#F8FAFB",
                      color:        filter === t ? "#fff"    : "#475569",
                      borderColor:  filter === t ? "#009EDB" : "#E2E8F0",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Job cards */}
          {filtered.length > 0 && (
            <div className="flex flex-col gap-4">
              {filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-20 gap-4 text-center">
              <Briefcase size={32} style={{ color: "#CBD5E1" }} />
              <p className="font-bold text-base" style={{ color: "#0D1F2D" }}>No positions match your search</p>
              <p className="text-sm" style={{ color: "#94A3B8" }}>Try a different filter or clear the search</p>
              <a
                href={WDC_ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "#009EDB" }}
              >
                See all WDC positions on Idealist <ExternalLink size={13} />
              </a>
            </div>
          )}

          {/* Idealist attribution */}
          <AnimateIn variant="fadeUp" delay={0.2}>
            <div className="mt-10 flex items-center justify-center gap-3 pt-8 border-t" style={{ borderColor: "#E2E8F0" }}>
              <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>Positions listed on</span>
              <a
                href="https://www.idealist.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold hover:opacity-70 transition-opacity"
                style={{ color: "#009EDB" }}
              >
                <Globe size={12} /> Idealist.org <ExternalLink size={10} />
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Fraud Alert */}
      <section className="pb-10 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border p-6" style={{ background: "#FFF5F5", borderColor: "#FCA5A5" }}>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-red-100 shrink-0 mt-0.5">
                  <Globe size={16} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-black text-base text-red-700 mb-2">Fraud Alert</h3>
                  <p className="text-sm leading-relaxed text-red-800 mb-2">
                    WDC and other charitable organizations are occasionally subject to phishing attacks — scams involving individuals impersonating WDC or claiming to recruit on our behalf.
                  </p>
                  <p className="text-sm leading-relaxed text-red-800">
                    We do not extend offers of employment or request personal information unless a candidate formally applies through this page. Unsolicited emails are not legitimate — delete them or report at{" "}
                    <a href="https://www.ic3.gov" target="_blank" rel="noopener noreferrer" className="underline font-bold">ic3.gov</a>.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border p-6" style={{ background: "#F0F9FF", borderColor: "#BAE6FD" }}>
              <h3 className="font-black text-base mb-2" style={{ color: "#0369A1" }}>Equal Opportunity Employer</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#0C4A6E" }}>
                WDC is an equal-opportunity employer. We conduct hiring without regard to race, color, ancestry, national origin, citizenship, age, sex, marital status, parental status, political ideology, or disability of an otherwise-qualified individual.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </>
  );
}
