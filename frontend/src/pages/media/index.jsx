import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, ExternalLink, Play, X, Send, ChevronDown, ChevronUp, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../../lib/supabase";
import AnimateIn from "../../components/AnimateIn";
import WDCLogo from "../../assets/images/wdclogobg.png";
import awardGroup    from "../../assets/media/award_group.jpg";
import awardCloseup  from "../../assets/media/award_closeup.jpg";
import awardStage    from "../../assets/media/award_stage.jpg";
import awardHandshake from "../../assets/media/award_handshake.jpg";
import unescoEvent1  from "../../assets/media/unesco_event1.jpg";
import unescoEvent2  from "../../assets/media/unesco_event2.jpg";
import unescoEvent3  from "../../assets/media/unesco_event3.jpg";
import prrsFramework from "../../assets/media/prrs_framework.jpg";
import lstSenegal    from "../../assets/media/lst_senegal.png";
import wdcBanner2024 from "../../assets/video/WDC-Banner-2024.mp4";

const SOCIAL = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/worlddisastercenter", color: "#0077B5",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "X / Twitter", href: "https://x.com/W_D_Center", color: "#000",
    icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214Z"/></svg> },
  { label: "Facebook",  href: "https://www.facebook.com/share/UE5DJq9PdZdmejjC/", color: "#1877F2",
    icon: <svg viewBox="0 0 8 14" fill="currentColor" className="w-3 h-4"><path d="M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z"/></svg> },
  { label: "Instagram", href: "https://www.instagram.com/worlddisastercenter", color: "#E1306C",
    icon: <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg> },
  { label: "YouTube",   href: "https://www.youtube.com/@WorldDisasterCenterOffice", color: "#FF0000",
    icon: <svg viewBox="0 0 16 12" fill="currentColor" className="w-4 h-3"><path fillRule="evenodd" clipRule="evenodd" d="M13.9191 1.10651C14.558 1.27906 15.0602 1.78251 15.2299 2.42069C15.5388 3.57887 15.5388 5.99687 15.5388 5.99687C15.5388 5.99687 15.5388 8.41487 15.2299 9.57306C15.0578 10.2136 14.5556 10.7171 13.9191 10.8872C12.7638 11.1969 8.12875 11.1969 8.12875 11.1969C8.12875 11.1969 3.49603 11.1969 2.33844 10.8872C1.69952 10.7147 1.19735 10.2112 1.0276 9.57306C0.71875 8.41487 0.71875 5.99687 0.71875 5.99687C0.71875 5.99687 0.71875 3.57887 1.0276 2.42069C1.1997 1.78015 1.70188 1.27669 2.33844 1.10651C3.49603 0.796875 8.12875 0.796875 8.12875 0.796875C8.12875 0.796875 12.7638 0.796875 13.9191 1.10651ZM10.4981 5.99687L6.6481 8.22578V3.76796L10.4981 5.99687Z"/></svg> },
];

const CATEGORY_COLORS = {
  Awards:        "bg-yellow-100 text-yellow-800",
  Events:        "bg-purple-100 text-purple-800",
  "Field Reports": "bg-green-100 text-green-700",
  Videos:        "bg-red-100 text-red-700",
};

const TABS = ["All", "Photos", "Videos", "Awards", "Field Reports"];

const STATIC_POSTS = [
  { id: "award-kigali-1", type: "photo", category: "Awards",
    title: "🏆 WDC Wins KalendMind Innovation Award – Kigali, December 2024",
    body: "We are proud to share that the World Disaster Center received the KalendMind Innovation Award at a ceremony in Kigali, Rwanda on December 20, 2024. This recognition celebrates our commitment to technology-driven disaster resilience and our work empowering communities across Africa and beyond.",
    image: awardGroup, tags: ["Award", "Kigali", "Innovation", "Africa"], date: "December 20, 2024", likes: 47,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "award-kigali-2", type: "photo", category: "Awards",
    title: "Award Ceremony Moments – KalendMind 2024",
    body: "Behind-the-scenes moments from the KalendMind Innovation Award ceremony in Kigali. Thank you to all our partners, supporters, and the Rwandan humanitarian community for this incredible recognition.",
    image: awardCloseup, tags: ["Award", "Rwanda", "Team"], date: "December 20, 2024", likes: 31,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "award-kigali-3", type: "photo", category: "Awards",
    title: "Group Photo – WDC Team at KalendMind Awards",
    body: "Full stage photo from the KalendMind Awards night. Proud to stand alongside innovators, humanitarians, and change-makers dedicated to building resilience in the Global South.",
    image: awardStage, tags: ["Team", "Award", "Kigali"], date: "December 20, 2024", likes: 28,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "award-kigali-4", type: "photo", category: "Awards",
    title: "Receiving the Award – Handshake Moment",
    body: "The moment WDC received the KalendMind Innovation Award. A milestone that reflects years of work building disaster intelligence solutions for the communities that need them most.",
    image: awardHandshake, tags: ["Award", "Milestone"], date: "December 20, 2024", likes: 22,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "unesco-cop-1", type: "photo", category: "Events",
    title: "WDC at UNESCO / COP Climate Event",
    body: "World Disaster Center representatives participated in a UNESCO-linked climate and disaster resilience event, engaging with global policymakers, scientists, and humanitarian practitioners on integrating AI-driven early warning systems into national climate adaptation strategies.",
    image: unescoEvent1, tags: ["UNESCO", "COP", "Climate", "Policy"], date: "2024", likes: 38,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "unesco-cop-2", type: "photo", category: "Events",
    title: "Climate & Disaster Panel – UNESCO Side Event",
    body: "Discussing the intersection of climate change and disaster risk at the UNESCO side event. WDC presented case studies on how Michael and EAGLE are transforming community-level disaster preparedness in climate-vulnerable regions.",
    image: unescoEvent2, tags: ["UNESCO", "Climate", "Michael", "EAGLE"], date: "2024", likes: 19,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "unesco-cop-3", type: "photo", category: "Events",
    title: "WDC Delegation at International Climate Forum",
    body: "Our team at the international climate forum, networking with UN agencies, NGOs, and government delegations. Building the partnerships that make global disaster resilience possible.",
    image: unescoEvent3, tags: ["UN", "Partnerships", "Climate"], date: "2024", likes: 24,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "prrs-framework", type: "photo", category: "Field Reports",
    title: "WDC PRRS Framework – Preparedness · Response · Recovery · Solutions",
    body: "Introducing the WDC PRRS Framework — our integrated approach to disaster management covering Preparedness, Response, Recovery, and Solutions. This framework guides all WDC field missions and product development.",
    image: prrsFramework, tags: ["Framework", "PRRS", "Strategy"], date: "2024", likes: 55,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "lst-senegal", type: "photo", category: "Field Reports",
    title: "Land Surface Temperature Analysis – Senegal 2022",
    body: "Satellite-derived Land Surface Temperature (LST) analysis for Senegal, 2022. This type of geospatial intelligence combines thermal satellite imagery with ground conditions to identify heat-stress zones and support early warning for drought-affected communities.",
    image: lstSenegal, tags: ["Satellite", "Senegal", "Climate", "LST", "Geospatial"], date: "2022", likes: 41,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "youtube-channel", type: "video", category: "Videos",
    title: "WDC YouTube Channel – Disaster Intelligence & Field Reports",
    body: "Subscribe to the World Disaster Center YouTube channel for field mission updates, tool demonstrations, event recordings, and expert interviews on global disaster resilience.",
    image: null, tags: ["YouTube", "Video", "Field Reports"], date: "Ongoing", likes: 63,
    videoUrl: "https://www.youtube.com/@WorldDisasterCenterOffice",
    youtubeEmbed: "https://www.youtube.com/embed?listType=user_uploads&list=WorldDisasterCenterOffice&autoplay=1&mute=1",
    link: "https://www.youtube.com/@WorldDisasterCenterOffice" },
  { id: "video-wdc-banner-local", type: "video", category: "Videos",
    title: "WDC 2024 — Disaster Intelligence Platform Animation",
    body: "Animated platform showcase of World Disaster Center's Michael system — real-time disaster monitoring, AI early warning alerts, and field mission coordination across 40+ countries.",
    image: null, tags: ["Michael", "Platform", "2024", "Animation"], date: "2024", likes: 44,
    localVideo: wdcBanner2024,
    link: "https://www.youtube.com/@WorldDisasterCenterOffice" },
  { id: "video-wdc-banner", type: "video", category: "Videos",
    title: "WDC 2024 — Disaster Intelligence Platform Showcase",
    body: "See how World Disaster Center's Michael platform delivers real-time disaster intelligence, early warning alerts, and field mission coordination across 40+ countries.",
    image: null, tags: ["Michael", "Platform", "2024"], date: "2024", likes: 44,
    videoUrl: "https://www.youtube.com/@WorldDisasterCenterOffice",
    youtubeEmbed: "https://www.youtube.com/embed?listType=user_uploads&list=WorldDisasterCenterOffice&autoplay=1&mute=1",
    link: "https://www.youtube.com/@WorldDisasterCenterOffice" },
  { id: "video-disaster-resilience", type: "video", category: "Videos",
    title: "Disaster Resilience — Sapiens Ndatabaye on WDC's Mission",
    body: "WDC Founder Sapiens Ndatabaye discusses building AI-powered disaster resilience for communities in Africa, the Caribbean, and Southeast Asia.",
    image: null, tags: ["Founder", "Mission", "Resilience"], date: "January 2025", likes: 38,
    videoUrl: "https://www.youtube.com/@WorldDisasterCenterOffice",
    youtubeEmbed: "https://www.youtube.com/embed?listType=user_uploads&list=WorldDisasterCenterOffice&autoplay=1&mute=1",
    link: "https://www.youtube.com/@WorldDisasterCenterOffice" },
  { id: "video-venezuela-eq", type: "video", category: "Videos",
    title: "Venezuela M7.5 Earthquake — WDC Field Intelligence",
    body: "WDC's earthquake response dashboard for the June 2026 Venezuela earthquake — live USGS seismic feeds, structural collapse mapping, and humanitarian needs assessment.",
    image: null, tags: ["Venezuela", "Earthquake", "Michael", "2026"], date: "June 2026", likes: 71,
    videoUrl: "https://www.youtube.com/@WorldDisasterCenterOffice",
    youtubeEmbed: "https://www.youtube.com/embed?listType=user_uploads&list=WorldDisasterCenterOffice&autoplay=1&mute=1",
    link: "https://www.youtube.com/@WorldDisasterCenterOffice" },
  { id: "rising-stars-2025", type: "link", category: "Awards",
    title: "🌟 Geospatial World 50 Rising Stars 2025",
    body: "WDC CEO Sapiens Ndatabaye has been named among the Geospatial World 50 Rising Stars 2025 — one of the top 50 emerging leaders in geospatial technology globally. This recognition highlights WDC's work combining satellite imagery, AI, and geospatial analysis for disaster resilience.",
    image: null, tags: ["Award", "Geospatial", "2025", "Leadership"], date: "February 2025", likes: 89,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "canadian-leaders-2025", type: "link", category: "Awards",
    title: "🇨🇦 Top 20 Dynamic Canadian Business Leaders 2025",
    body: "World Disaster Center has been recognized as one of the Top 20 Dynamic Canadian Business Leaders for 2025 — celebrating WDC's innovative approach to global disaster management and our Canadian headquarters' leadership in international humanitarian technology.",
    image: null, tags: ["Award", "Canada", "2025", "Leadership"], date: "March 2025", likes: 76,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "people-matters-rwanda", type: "link", category: "Awards",
    title: "People Matters Rwanda 2024 – Rising Star Shortlist",
    body: "WDC was shortlisted for the People Matters Rwanda Rising Star Award 2024, recognizing organizations making exceptional contributions to social impact and innovation in the African humanitarian sector.",
    image: null, tags: ["Award", "Rwanda", "2024", "Africa"], date: "December 9, 2024", likes: 34,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "afghanistan-response", type: "link", category: "Field Reports",
    title: "🚨 Afghanistan Earthquake Response – Kunar Province, August 2025",
    body: "Following the 6.0 magnitude earthquake in Kunar Province, Nurgal District on August 31, 2025, WDC produced an access-level situation report mapping affected populations, identifying hazard exposure zones, and evaluating accessibility for aid delivery.",
    image: null, tags: ["Afghanistan", "Earthquake", "2025", "Response"], date: "August 2025", likes: 52,
    link: "https://www.linkedin.com/posts/world-disaster-center_afghanistan-access-level-situation-report-activity-7370729212174827521-5Ixb" },
  { id: "nema-nigeria", type: "link", category: "Field Reports",
    title: "🇳🇬 NEMA-WDC Strategic Partnership – Nigeria Resilient 2025",
    body: "WDC and Nigeria's National Emergency Management Agency (NEMA) have entered a strategic partnership to deploy the MaiLafiya app across Nigeria, train 50,000 local first responders, and establish 200 Resilience Hubs nationwide. Target: disaster response in under 24 hours.",
    image: null, tags: ["Nigeria", "NEMA", "Partnership", "MaiLafiya"], date: "2025", likes: 97,
    link: "https://www.linkedin.com/company/worlddisastercenter" },
  { id: "drc-mission", type: "link", category: "Field Reports",
    title: "🇨🇩 DRC Field Mission – 30 Days in Kinshasa & Goma",
    body: "WDC completed a comprehensive 30-day on-ground mission in Kinshasa and Goma (December 2024 – January 2025). Real-time crisis monitoring, fighting misinformation, and deploying AI tool Michael for predictive analytics. Collaborated with MSF, UNICEF, and the Prime Minister's Office.",
    image: null, tags: ["DRC", "Congo", "Field Mission", "Michael"], date: "December 2024 – January 2025", likes: 71,
    link: "https://www.linkedin.com/posts/sapiens-ndatabaye-227425165_wdc-realtimemonitoring-drcrisis-activity-7290352353885523968-wpZ8" },
];

// ── Comments section ──────────────────────────────────────────────────────────
function CommentsSection({ postId, auth }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error: err } = await supabase
        .from("media_comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });
      setLoading(false);
      if (err) { setError("Comments unavailable."); return; }
      setComments(data || []);
    };
    fetch();
  }, [postId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    setPosting(true);
    const { data, error: err } = await supabase.from("media_comments").insert([{
      post_id: postId,
      user_name: auth.email.split("@")[0],
      user_email: auth.email,
      body: body.trim(),
    }]).select();
    setPosting(false);
    if (err) { setError("Could not post comment."); return; }
    setComments((prev) => [...prev, data[0]]);
    setBody("");
  };

  return (
    <div className="border-t border-gray-100 mt-4 pt-4 space-y-3">
      {loading && <p className="text-xs text-gray-400">Loading comments…</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
      {!loading && !error && comments.length === 0 && (
        <p className="text-xs text-gray-400 italic">No comments yet. Be the first.</p>
      )}
      {comments.map((c) => (
        <div key={c.id} className="flex gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#009EDB]/20 flex items-center justify-center text-[#009EDB] text-xs font-bold shrink-0">
            {c.user_name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="text-xs font-bold text-gray-800">{c.user_name} </span>
            <span className="text-xs text-gray-500">{c.body}</span>
            <p className="text-[10px] text-gray-400 mt-0.5">{new Date(c.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
      {auth ? (
        <form onSubmit={submit} className="flex gap-2 pt-1">
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment…"
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-xs outline-none focus:border-[#009EDB]"
          />
          <button
            type="submit"
            disabled={posting || !body.trim()}
            className="w-8 h-8 rounded-full bg-[#009EDB] flex items-center justify-center text-white disabled:opacity-40 shrink-0"
          >
            <Send size={13} />
          </button>
        </form>
      ) : (
        <Link to="/signin" className="inline-flex items-center gap-1.5 text-xs text-[#009EDB] font-semibold hover:underline">
          <LogIn size={12} /> Sign in to comment
        </Link>
      )}
    </div>
  );
}

// ── Video card with IntersectionObserver autoplay ─────────────────────────────
function VideoEmbed({ post }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Local mp4 video (autoplay natively)
  if (post.localVideo) {
    return (
      <div ref={ref} className="mx-5 mb-3">
        {inView ? (
          <video
            src={post.localVideo}
            autoPlay muted loop playsInline
            controls
            className="w-full rounded-lg"
            style={{ maxHeight: 220 }}
          />
        ) : (
          <div className="flex items-center justify-center gap-3 bg-[#1C2B39] rounded-lg h-40">
            <div className="w-12 h-12 rounded-full bg-[#009EDB] flex items-center justify-center">
              <Play size={22} className="text-white ml-1" fill="white" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">WDC Platform Video</p>
              <p className="text-gray-400 text-xs">Scroll to play</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  const embedSrc = post.youtubeEmbed || post.videoUrl;

  return (
    <div ref={ref} className="mx-5 mb-3">
      {inView ? (
        <iframe
          width="100%"
          height="200"
          src={embedSrc}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="rounded-lg block"
          style={{ width: "100%" }}
        />
      ) : (
        <a href={post.link || post.videoUrl} target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-3 bg-[#1C2B39] rounded-lg h-40 group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play size={22} className="text-white ml-1" fill="white" />
          </div>
          <div>
            <p className="text-white text-sm font-bold">Watch on YouTube</p>
            <p className="text-gray-400 text-xs">World Disaster Center Channel</p>
          </div>
        </a>
      )}
    </div>
  );
}

// ── Post card ─────────────────────────────────────────────────────────────────
function PostCard({ post, auth, liked, onToggleLike }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/media#post-${post.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const catColor = CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-600";

  return (
    <motion.div
      id={`post-${post.id}`}
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Author bar */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <img src={WDCLogo} alt="WDC" className="w-9 h-9 rounded-full object-contain bg-white border border-gray-100 p-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-gray-900">World Disaster Center</span>
            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#009EDB]/10 text-[#009EDB]">Official</span>
          </div>
          <p className="text-xs text-gray-400">{post.date}</p>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${catColor}`}>
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="px-5 pb-3">
        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{post.body}</p>
      </div>

      {/* Media */}
      {post.type === "photo" && post.image && (
        <div className="mx-5 mb-3 overflow-hidden rounded-lg max-h-80">
          <img src={post.image} alt={post.title} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      {post.type === "video" && <VideoEmbed post={post} />}
      {post.type === "link" && (
        <a href={post.link} target="_blank" rel="noreferrer"
          className="mx-5 mb-3 flex items-center gap-3 border border-gray-200 rounded-lg p-4 hover:border-[#009EDB] transition-colors group">
          <div className="w-10 h-10 rounded-lg bg-[#009EDB]/10 flex items-center justify-center shrink-0">
            <ExternalLink size={18} className="text-[#009EDB]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-700 group-hover:text-[#009EDB] transition-colors truncate">View full update</p>
            <p className="text-[10px] text-gray-400 truncate">{post.link}</p>
          </div>
        </a>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="px-5 pb-3 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">#{t}</span>
          ))}
        </div>
      )}

      {/* Action bar */}
      <div className="flex items-center gap-1 px-5 py-3 border-t border-gray-100">
        {/* Like */}
        <button
          onClick={() => onToggleLike(post.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors group"
        >
          <Heart
            size={16}
            className={liked ? "text-red-500" : "text-gray-400 group-hover:text-red-400"}
            fill={liked ? "#ef4444" : "none"}
          />
          <span className={`text-xs font-semibold ${liked ? "text-red-500" : "text-gray-500"}`}>
            {post.likes + (liked ? 1 : 0)}
          </span>
        </button>

        {/* Comments toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors text-gray-400 hover:text-[#009EDB] group"
        >
          <MessageCircle size={16} />
          <span className="text-xs font-semibold">Comments</span>
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors text-gray-400 hover:text-green-600 relative"
        >
          <Share2 size={16} />
          <span className="text-xs font-semibold">{copied ? "Copied!" : "Share"}</span>
        </button>

        {/* External link */}
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noreferrer"
            className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-[#009EDB] transition-colors px-2 py-1.5"
          >
            <ExternalLink size={13} /> LinkedIn
          </a>
        )}
      </div>

      {/* Expanded comments */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden px-5 pb-4"
          >
            <CommentsSection postId={post.id} auth={auth} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MediaPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [likedPosts, setLikedPosts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wdc_liked_posts") || "[]"); }
    catch { return []; }
  });

  const auth = (() => {
    try { return JSON.parse(localStorage.getItem("userAuth") || "null"); }
    catch { return null; }
  })();

  const toggleLike = (postId) => {
    if (!auth) return;
    const updated = likedPosts.includes(postId)
      ? likedPosts.filter((id) => id !== postId)
      : [...likedPosts, postId];
    setLikedPosts(updated);
    localStorage.setItem("wdc_liked_posts", JSON.stringify(updated));
  };

  const filtered = STATIC_POSTS.filter((p) => {
    if (activeTab === "All") return true;
    if (activeTab === "Photos") return p.type === "photo";
    if (activeTab === "Videos") return p.type === "video";
    return p.category === activeTab;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Newsroom & Media — World Disaster Center</title>
        <meta name="description" content="WDC news, field reports, awards, and video updates. Award ceremony from Kigali Rwanda, UNESCO climate events, field missions in DRC and Burundi, and disaster intelligence from 40+ countries." />
        <meta property="og:title" content="Newsroom & Media — World Disaster Center" />
        <meta property="og:description" content="Follow WDC's latest field missions, award ceremonies, disaster intelligence updates, and video reports from the World Disaster Center." />
        <meta name="keywords" content="World Disaster Center news, WDC media, disaster intelligence updates, WDC awards, field mission reports, humanitarian news" />
      </Helmet>
      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-16">
        <div className="container">
          <AnimateIn variant="fadeUp">
            <p className="text-[#009EDB] mb-2 uppercase tracking-widest text-xs font-black">News & Media</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">WDC Newsroom & Media</h1>
            <p className="text-gray-300 max-w-xl text-sm leading-relaxed">
              Field reports, award moments, event coverage, and intelligence updates from World Disaster Center's global operations.{" "}
              {!auth && (
                <Link to="/signin" className="text-[#009EDB] font-bold hover:underline">Sign in</Link>
              )}{!auth && " to like and comment."}
            </p>
          </AnimateIn>
        </div>
      </section>

      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left sidebar ── */}
          <aside className="hidden lg:block lg:w-64 shrink-0 space-y-5 sticky top-24 self-start">
            {/* Auth card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <img src={WDCLogo} alt="WDC" className="w-12 h-12 object-contain mb-3" />
              <p className="text-sm font-bold text-gray-900">World Disaster Center</p>
              <p className="text-xs text-gray-500 mt-0.5">Official Newsroom</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                {auth ? (
                  <p className="text-xs text-green-600 font-semibold">✓ Signed in as {auth.email}</p>
                ) : (
                  <Link to="/signin" className="flex items-center gap-2 text-sm font-bold text-[#009EDB] hover:underline">
                    <LogIn size={14} /> Sign in to interact
                  </Link>
                )}
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Follow WDC</p>
              <div className="space-y-2.5">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#009EDB] transition-colors group">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-110" style={{ backgroundColor: s.color }}>
                      {s.icon}
                    </span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Quick Links</p>
              <div className="space-y-2">
                {[["Impact Map", "/impact"], ["Reports", "/reports"], ["Our Team", "/about/team"], ["Donate", "/donate"]].map(([label, to]) => (
                  <Link key={to} to={to} className="block text-sm text-gray-600 hover:text-[#009EDB] transition-colors">→ {label}</Link>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Main feed ── */}
          <main className="flex-1 min-w-0">
            {/* Filter tabs */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? "bg-[#009EDB] text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-[#009EDB] hover:text-[#009EDB]"
                  }`}
                >
                  {tab}
                </button>
              ))}
              <span className="ml-auto text-xs text-gray-400">{filtered.length} posts</span>
            </div>

            {/* Sign-in nudge (mobile) */}
            {!auth && (
              <div className="bg-[#009EDB]/10 border border-[#009EDB]/20 rounded-xl p-4 mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-700">Sign in to like posts and leave comments.</p>
                <Link to="/signin" className="text-sm font-bold text-[#009EDB] hover:underline ml-4 shrink-0">Sign In</Link>
              </div>
            )}

            {/* Feed */}
            <div className="space-y-5">
              {filtered.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  auth={auth}
                  liked={likedPosts.includes(post.id)}
                  onToggleLike={toggleLike}
                />
              ))}
            </div>
          </main>

          {/* ── Right sidebar ── */}
          <aside className="hidden xl:block xl:w-64 shrink-0 space-y-5 sticky top-24 self-start">
            {/* Social */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">WDC on Social</p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                    style={{ backgroundColor: s.color }}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Latest reports */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Latest Reports</p>
              <div className="space-y-3">
                {["Afghanistan Earthquake Situation Report", "Haiti Zero-Impact Initiative TOR", "Nigeria NEMA Partnership TOR"].map((r) => (
                  <Link key={r} to="/reports" className="block text-xs text-gray-700 hover:text-[#009EDB] transition-colors leading-snug">
                    📄 {r}
                  </Link>
                ))}
                <Link to="/reports" className="block text-xs font-bold text-[#009EDB] hover:underline pt-1">View all reports →</Link>
              </div>
            </div>

            {/* About */}
            <div className="bg-[#1C2B39] rounded-xl p-5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">About WDC</p>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                World Disaster Center is an international nonprofit using AI and satellite intelligence to reduce disaster impact across 25+ countries.
              </p>
              <Link to="/about" className="text-xs font-bold text-[#009EDB] hover:underline">Learn More →</Link>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
