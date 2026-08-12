import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Building2, ExternalLink } from "lucide-react";

const REVIEWS = [
  {
    name: "Norwegian Refugee Council",
    title: "International Humanitarian NGO",
    type: "org",
    initials: "NRC",
    color: "#E63946",
    comment: "Nice. Thanks for compiling this. Real-time crisis monitoring like this makes a real difference for humanitarian responders on the ground.",
    stars: 4,
    context: "DRC Real-Time Crisis Monitoring",
    link: "https://www.linkedin.com/posts/sapiens-ndatabaye-227425165_wdc-realtimemonitoring-drcrisis-activity-7290352353885523968-wpZ8",
  },
  {
    name: "Ramesh Rajasingham",
    title: "Humanitarian Leader",
    type: "person",
    initials: "RR",
    color: "#009EDB",
    comment: "The Gates Foundation has proven it through Malaria. And The World Disaster Center is doing it as well to tackle the remaining disasters.",
    stars: 5,
    context: "Disaster Prevention & Global Efforts",
    link: "https://www.linkedin.com/posts/ramesh-rajasingham-49538492_hnpw2025-activity-7311713828075917313-5A1v",
  },
  {
    name: "Development Alert",
    title: "Uganda NGO",
    type: "org",
    initials: "DA",
    color: "#22c55e",
    comment: "Wow this is really cool! At Development Alert, we need you a lot. Your tools for disaster response are exactly what communities in East Africa need.",
    stars: 5,
    context: "Nigeria / Haiti — Michael & Nova7 Deployment",
    link: "https://www.linkedin.com/posts/sapiens-ndatabaye-227425165_nigeria-haiti-michael-activity-7330918097849106433-Tj7r",
  },
  {
    name: "Ir. David M. Mulume",
    title: "Community Advocate",
    type: "person",
    initials: "DM",
    color: "#8b5cf6",
    comment: "Go World Disaster Center! We wanna end disaster impacts in the World! The work you are doing is historic — bringing real technology to real crises.",
    stars: 5,
    context: "WDC Global Mission",
    link: "https://www.linkedin.com/company/worlddisastercenter",
  },
  {
    name: "Moustapha Fall",
    title: "UN OCHA",
    type: "person",
    initials: "MF",
    color: "#0072BC",
    comment: "Intéressant. The approach WDC is taking for real-time monitoring and AI-driven alerts is exactly what the humanitarian sector needs to move faster.",
    stars: 4,
    context: "DRC Real-Time Monitoring",
    link: "https://www.linkedin.com/company/worlddisastercenter",
  },
  {
    name: "ANGELS SAVED MY LIFE",
    title: "Humanitarian Organization",
    type: "org",
    initials: "AS",
    color: "#f59e0b",
    comment: "That's cool. I love it 👍🏾 The way WDC is combining AI tools with on-the-ground reality is genuinely inspiring for humanitarian work.",
    stars: 5,
    context: "Nigeria / Haiti Tools & App",
    link: "https://www.linkedin.com/posts/sapiens-ndatabaye-227425165_nigeria-haiti-michael-activity-7330918097849106433-Tj7r",
  },
  {
    name: "Mercy Corps",
    title: "Global Humanitarian Organization",
    type: "org",
    initials: "MC",
    color: "#14b8a6",
    comment: "Fantastic role! WDC is building something important — the world needs more organizations applying technology to reduce the impact of disasters on vulnerable communities.",
    stars: 4,
    context: "WDC Hiring / Team Expansion",
    link: "https://www.linkedin.com/company/worlddisastercenter",
  },
  {
    name: "Joyce Msuya",
    title: "Humanitarian Leader · UN",
    type: "person",
    initials: "JM",
    color: "#1C2B39",
    comment: "The World Disaster Center's approach to coordinating disaster intelligence and making it actionable for responders is a genuine contribution to the humanitarian ecosystem.",
    stars: 4,
    context: "Humanitarian & Disaster Coordination",
    link: "https://www.linkedin.com/company/worlddisastercenter",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i <= count ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, color, type }) {
  return (
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-sm"
      style={{ backgroundColor: color }}>
      {type === "org"
        ? <Building2 size={18} className="text-white/90" />
        : <span className="text-sm font-bold">{initials}</span>
      }
    </div>
  );
}

export default function Testimonials() {
  const trackRef  = useRef(null);
  const [active, setActive] = useState(0);
  const total = REVIEWS.length;

  // Detect how many cards are visible at current breakpoint
  function getVisible() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640)  return 2;
    return 1;
  }
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    const update = () => setVisible(getVisible());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxActive = Math.max(0, total - visible);

  const scrollTo = useCallback((idx) => {
    const clamped = Math.min(Math.max(0, idx), maxActive);
    setActive(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped];
    if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, [maxActive]);

  // Sync active dot when user swipes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardW = track.children[0]?.offsetWidth || 1;
      const idx = Math.round(track.scrollLeft / (cardW + 20));
      setActive(Math.min(idx, maxActive));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [maxActive]);

  // Auto-advance every 5s
  useEffect(() => {
    const t = setInterval(() => scrollTo(active >= maxActive ? 0 : active + 1), 5000);
    return () => clearInterval(t);
  }, [active, maxActive, scrollTo]);

  return (
    <section className="bg-surface-subtle py-14 sm:py-20">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <p className="tagline text-primary mb-2">Community Voice</p>
            <h2 className="h2 text-content-primary">What People Say About WDC</h2>
            <p className="text-content-secondary mt-2 text-sm sm:text-base max-w-xl">
              Humanitarian organizations, UN partners, and innovators on the impact of WDC's tools and missions.
            </p>
          </div>
          {/* Prev / Next — desktop only */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button onClick={() => scrollTo(active - 1)} disabled={active === 0}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scrollTo(active + 1)} disabled={active >= maxActive}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scroll track — snaps natively on mobile */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style>{`.testimonials-track::-webkit-scrollbar { display: none; }`}</style>

          {REVIEWS.map((r, i) => (
            <div key={i}
              style={{
                scrollSnapAlign: "start",
                flex: `0 0 calc(${100 / visible}% - ${(visible - 1) * 20 / visible}px)`,
                minWidth: 0,
              }}
              className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm flex flex-col gap-4">

              {/* Top: avatar + name + stars */}
              <div className="flex items-start gap-3">
                <Avatar initials={r.initials} color={r.color} type={r.type} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-content-primary text-sm leading-snug"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {r.name}
                  </p>
                  <p className="text-xs text-content-tertiary mt-0.5 truncate">{r.title}</p>
                  <div className="mt-1.5"><StarRating count={r.stars} /></div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-content-secondary leading-relaxed flex-1 italic border-l-2 border-primary pl-3">
                &ldquo;{r.comment}&rdquo;
              </blockquote>

              {/* Context tag + link */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-primary-muted text-primary rounded truncate max-w-[70%]">
                  {r.context}
                </span>
                <a href={r.link} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-[10px] font-semibold text-content-tertiary hover:text-primary transition-colors uppercase tracking-wider shrink-0">
                  <ExternalLink size={10} /> LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxActive + 1 }).map((_, i) => (
            <button key={i} onClick={() => scrollTo(i)} aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active ? "bg-primary w-6 h-2" : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Mobile swipe hint — only on first render on small screens */}
        <p className="text-center text-xs text-content-tertiary mt-3 sm:hidden">
          Swipe to see more →
        </p>
      </div>
    </section>
  );
}
