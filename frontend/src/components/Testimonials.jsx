import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Building2, User } from "lucide-react";

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
    comment: "Wow this is really cool! At Development Alert, we need you a lot. Your tools for disaster response are exactly what communities in East Africa need. We really need your support with fundraising and mentorship.",
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
    title: "UN OCHA Context",
    type: "person",
    initials: "MF",
    color: "#0072BC",
    comment: "Intéressant. (Interesting.) The approach WDC is taking for real-time monitoring and AI-driven alerts is exactly what the humanitarian sector needs to move faster.",
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
    name: "GeoAI Applicant",
    title: "Technology Professional",
    type: "person",
    initials: "GC",
    color: "#f97316",
    comment: "This opportunity sounds fantastic! I'm genuinely excited about the GeoAI Consultant role and the chance to contribute to the meaningful work at the World Disaster Center.",
    stars: 5,
    context: "WDC GeoAI Consultant Role",
    link: "https://www.linkedin.com/posts/sapiens-ndatabaye-227425165_hiring-gisconsultant-disastermanagement-activity-7299811600692092931-4J64",
  },
  {
    name: "Joyce Msuya",
    title: "Humanitarian Leader, UN",
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
        <svg
          key={i}
          className={`w-4 h-4 ${i <= count ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, color, type }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-sm"
      style={{ backgroundColor: color }}
    >
      {type === "org"
        ? <Building2 size={20} className="text-white/90" />
        : <span>{initials}</span>
      }
    </div>
  );
}

const VISIBLE = 3; // cards visible at once on desktop

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const total = REVIEWS.length;
  const maxIndex = total - VISIBLE;

  const next = useCallback(() => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  return (
    <section className="bg-surface-subtle py-20">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="tagline text-primary mb-2">Community Voice</p>
            <h2 className="h2 text-content-primary">What People Say About WDC</h2>
            <p className="text-content-secondary mt-3 max-w-xl">
              Humanitarian organizations, UN partners, and innovators on the impact of
              World Disaster Center&apos;s tools and missions.
            </p>
          </div>
          {/* Prev / Next controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-5 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${index} * (100% / ${VISIBLE} + 1.25rem)))` }}
          >
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col gap-4 shrink-0"
                style={{ width: `calc(${100 / VISIBLE}% - ${(VISIBLE - 1) * 20 / VISIBLE}px)` }}
              >
                {/* Top: avatar + name + stars */}
                <div className="flex items-start gap-3">
                  <Avatar initials={r.initials} color={r.color} type={r.type} />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-content-primary text-sm leading-snug truncate">{r.name}</p>
                    <p className="text-xs text-content-tertiary truncate">{r.title}</p>
                    <div className="mt-1.5">
                      <StarRating count={r.stars} />
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-content-secondary leading-relaxed flex-1 italic border-l-2 border-primary pl-3">
                  &ldquo;{r.comment}&rdquo;
                </blockquote>

                {/* Context tag + link */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-primary-muted text-primary rounded">
                    {r.context}
                  </span>
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-semibold text-content-tertiary hover:text-primary transition-colors uppercase tracking-wider"
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "bg-primary w-6 h-2" : "bg-gray-300 w-2 h-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
