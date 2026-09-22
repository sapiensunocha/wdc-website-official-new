import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
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
          <motion.span
            className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Global Early Warning System
          </motion.span>

          <motion.p
            className="text-xl sm:text-2xl font-light text-white/90 italic mb-4 leading-snug"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            Disasters don't wait.{" "}
            <span className="font-bold not-italic text-white">Neither do we.</span>
          </motion.p>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
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
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-xl font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Michael harnesses advanced AI and real-time data to deliver life-saving insights,
            empowering communities to navigate disasters with confidence and control.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href="http://michael.worlddisastercenter.org/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-7 py-3.5 rounded transition-colors duration-200"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn About Michael <ArrowRight size={18} />
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/request-demo"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/40 text-white font-bold px-7 py-3.5 rounded backdrop-blur-sm transition-all duration-200"
              >
                Request a Demo
              </Link>
            </motion.div>
            <motion.a
              href="https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-7 py-3.5 rounded transition-colors duration-200"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Heart size={15} strokeWidth={2} /> Donate Now
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Preview frame — UNOCHA clean card style */}
      <motion.div
        className="container relative z-10 pb-16 hidden lg:block"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="ml-auto max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-2xl">
          <Link to="/request-demo">
            <img src={GIF1} className="w-full object-contain" alt="Michael AI preview" />
          </Link>
        </div>
      </motion.div>

      {/* Live stat strip */}
      <div className="absolute bottom-24 left-0 right-0 z-10 hidden lg:block">
        <div className="container">
          <div className="flex items-center gap-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 w-fit">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              <span className="text-white font-bold text-sm">LIVE</span>
            </div>
            <span className="text-white/60 text-xs">|</span>
            <span className="text-white/80 text-sm">Tracking <strong className="text-white">1,000+</strong> active crises worldwide</span>
            <span className="text-white/60 text-xs">|</span>
            <span className="text-white/80 text-sm"><strong className="text-white">27</strong> countries with WDC field presence</span>
            <span className="text-white/60 text-xs">|</span>
            <a href="https://michael.worlddisastercenter.org" target="_blank" rel="noreferrer" className="text-[#009EDB] font-bold text-sm hover:underline">
              Open MICHAEL →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;
