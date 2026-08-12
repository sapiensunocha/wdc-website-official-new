import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { curve } from "../assets";
import GIF1 from "../assets/gif/WDC_Shorts.gif";
import VID1 from "../assets/video/Digital World Map.mp4";

const Hero = () => {
  const location = useLocation();

  useEffect(() => {
    // Refresh auth state on route change (used by child components via context)
    JSON.parse(localStorage.getItem("userAuth"));
  }, [location]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden -mt-[6.5rem] lg:-mt-[7rem] pt-[6.5rem] lg:pt-[7rem]">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={VID1} type="video/mp4" />
      </video>

      {/* Overlay — lighter UNOCHA-style gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/80 via-[#005B9F]/60 to-transparent" />

      {/* Content */}
      <div className="container relative z-10 py-16 sm:py-20 lg:py-32">
        <div className="max-w-2xl">
          {/* Eyebrow tag */}
          <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded mb-6">
            Global Early Warning System
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            The Global Disaster{" "}
            <span className="relative inline-block">
              Monitoring &amp; Alert
              <img
                src={curve}
                className="absolute top-full left-0 w-full -mt-1 opacity-70"
                alt=""
                aria-hidden="true"
              />
            </span>{" "}
            System &ldquo;Michael&rdquo;
          </h1>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-xl font-light">
            Michael harnesses advanced AI and real-time data to deliver life-saving insights,
            empowering communities to navigate disasters with confidence and control.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="http://michael.worlddisastercenter.org/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-7 py-3.5 rounded transition-colors duration-200"
            >
              Learn About Michael <ArrowRight size={18} />
            </a>
            <Link
              to="/request-demo"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/40 text-white font-bold px-7 py-3.5 rounded backdrop-blur-sm transition-all duration-200"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Preview frame — UNOCHA clean card style */}
      <div className="container relative z-10 pb-16 hidden lg:block">
        <div className="ml-auto max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl">
          <Link to="/request-demo">
            <img src={GIF1} className="w-full object-contain" alt="Michael AI preview" />
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
