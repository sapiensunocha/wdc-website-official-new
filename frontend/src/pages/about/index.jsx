import Services from "../../components/Services";
import HowWeWork from "../../components/howwework";
import WhoWeAre from "../../components/WhoWeAre";
import OurValues from "../../components/ourValues";
import FounderPhoto from "../../assets/images/Photoroom_20251006_010721.JPG";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimateIn from "../../components/AnimateIn";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn (WDC)",
    href: "https://www.linkedin.com/company/worlddisastercenter",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn (Founder)",
    href: "https://www.linkedin.com/in/sapiens-ndatabaye-227425165",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/W_D_Center",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11.321 8.937L16.492 3.056H15.267l-4.49 5.106L7.191 3.056H3.056l5.422 7.721L3.056 16.945h1.225l4.741-5.393 3.787 5.393h4.136L11.32 8.937zm-1.678 1.908-.549-.769-4.371-6.118h1.882l3.528 4.938.549.769 4.585 6.419H13.385L9.643 10.845z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/worlddisastercenter/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@WorldDisasterCenterOffice",
    icon: (
      <svg className="w-4 h-3.5" fill="currentColor" viewBox="0 0 16 12">
        <path fillRule="evenodd" d="M13.919 1.107C14.558 1.279 15.06 1.783 15.23 2.421 15.539 3.579 15.539 6 15.539 6s0 2.415-.31 3.573c-.17.638-.671 1.142-1.31 1.314C12.764 11.197 8.129 11.197 8.129 11.197s-4.633 0-5.79-.31a1.857 1.857 0 0 1-1.31-1.314C.718 8.415.718 6 .718 6S.718 3.579 1.028 2.421C1.2 1.78 1.702 1.277 2.338 1.107 3.496.797 8.129.797 8.129.797s4.635 0 5.79.31zm-3.421 4.89L6.648 8.226V3.768l3.85 2.229z" />
      </svg>
    ),
  },
];

function FounderSection() {
  return (
    <section className="bg-[#1C2B39] text-white py-20">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">

          {/* Photo */}
          <AnimateIn variant="zoomIn" className="shrink-0 flex flex-col items-center gap-4">
            <div className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-[#009EDB] shadow-2xl">
              <img
                src={FounderPhoto}
                alt="Sapiens Ndatabaye — Founder, World Disaster Center"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-white text-lg tracking-wide">Sapiens Ndatabaye</p>
              <p className="text-[#009EDB] text-sm font-medium uppercase tracking-widest mt-0.5">
                Founder &amp; Executive Director
              </p>
              <p className="text-gray-400 text-xs mt-0.5">World Disaster Center</p>
            </div>

            {/* Founder social links */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { href: "https://www.linkedin.com/in/sapiens-ndatabaye-227425165", label: "LinkedIn" },
                { href: "https://x.com/SapiensNdatabay", label: "X" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold px-3 py-1.5 border border-white/20 rounded text-gray-300 hover:border-[#009EDB] hover:text-[#009EDB] transition-colors uppercase tracking-wider"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </AnimateIn>

          {/* Quote */}
          <AnimateIn variant="fadeRight" delay={0.2} className="flex-1">
            <div className="h-1 w-12 bg-[#009EDB] mb-6" />
            <p className="tagline text-[#009EDB] mb-4">A Message from the Founder</p>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-white leading-relaxed">
              &ldquo;The world can no longer afford to face disasters{" "}
              <span className="font-bold text-white">unprepared, uninformed, and divided</span>{" "}
              in the moments that matter most. The World Disaster Center exists to deliver
              real-time, universal access to critical intelligence&mdash;because{" "}
              <span className="text-[#009EDB] font-semibold">awareness is no longer optional,
              it is essential to survival.</span>
            </blockquote>
            <p className="text-lg text-gray-300 leading-relaxed mt-6 font-light">
              This is not an initiative of convenience, but a global necessity to protect
              lives, strengthen resilience, and redefine how humanity responds to crisis.&rdquo;
            </p>
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row flex-wrap gap-3">
              <motion.a
                href="https://www.linkedin.com/in/sapiens-ndatabaye-227425165"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white text-sm font-bold px-5 py-2.5 rounded transition-colors w-full sm:w-auto"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Connect on LinkedIn ↗
              </motion.a>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-sm font-bold px-5 py-2.5 rounded transition-colors w-full sm:w-auto"
                >
                  Contact WDC
                </Link>
              </motion.div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

function FollowSection() {
  return (
    <section className="bg-[#009EDB] py-8 sm:py-10">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
        <AnimateIn variant="fadeLeft">
          <p className="text-white font-bold text-xl">Follow World Disaster Center</p>
          <p className="text-white/80 text-sm mt-1">Stay updated on missions, tools, and disaster intelligence worldwide.</p>
        </AnimateIn>
        <div className="flex flex-wrap items-center gap-3">
          {SOCIAL_LINKS.map(({ href, label, icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-4 py-2 rounded transition-colors uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── Page hero ── */}
      <div className="bg-[#1C2B39] text-white">
        <div className="container py-10 sm:py-14 md:py-16">
          <AnimateIn variant="fadeUp">
            <div className="h-1 w-12 bg-[#009EDB] mb-5" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">About World Disaster Center</h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              A global organization dedicated to disaster monitoring, early warning systems,
              and humanitarian intelligence — so no community faces a crisis alone.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 sm:mt-8">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/impact"
                  className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-6 py-3 rounded text-sm transition-colors uppercase tracking-wider w-full sm:w-auto"
                >
                  Our Impact
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/about/partners"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-bold px-6 py-3 rounded text-sm transition-colors uppercase tracking-wider w-full sm:w-auto"
                >
                  Our Partners
                </Link>
              </motion.div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── Mission statement ── */}
      <div className="border-b border-gray-100">
        <div className="container py-14">
          <AnimateIn variant="fadeUp">
            <div className="max-w-4xl">
              <p className="tagline text-primary mb-3">Our Mission</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-content-primary leading-tight">
                &ldquo;We are on a mission to{" "}
                <span className="text-primary">end disaster impacts</span>{" "}
                everywhere.&rdquo;
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── Who We Are ── */}
      <div className="bg-white">
        <WhoWeAre />
      </div>

      {/* ── Vision divider ── */}
      <div className="bg-surface-subtle">
        <div className="container py-14">
          <AnimateIn variant="fadeLeft">
            <div className="max-w-4xl">
              <p className="tagline text-primary mb-3">Our Vision</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-content-primary leading-tight">
                &ldquo;We envision a world where disasters no longer disrupt{" "}
                <span className="text-primary">determination, dreams, or aspiration.</span>&rdquo;
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── How We Work ── */}
      <div className="bg-white">
        <HowWeWork />
      </div>

      {/* ── Services ── */}
      <div className="bg-surface-subtle">
        <Services />
      </div>

      {/* ── Our Values ── */}
      <div className="bg-white">
        <OurValues />
      </div>

      {/* ── Founder section ── */}
      <FounderSection />

      {/* ── Dedication quote ── */}
      <div className="bg-white">
        <div className="container py-14">
          <AnimateIn variant="fadeRight">
            <div className="max-w-4xl">
              <p className="tagline text-primary mb-3">Our Commitment</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-content-primary leading-tight">
                &ldquo;We are dedicated to transforming{" "}
                <span className="text-primary">challenges into opportunities.</span>&rdquo;
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── Follow us CTA strip ── */}
      <FollowSection />

    </div>
  );
}

export default AboutPage;
