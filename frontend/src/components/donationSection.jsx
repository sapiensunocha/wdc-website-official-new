import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import { FaUserShield, FaUsers, FaSchool, FaHandsHelping, FaTools, FaSatelliteDish, FaCity, FaUserFriends, FaShieldAlt } from "react-icons/fa";
import BeforeAfterVisual from "./BeforeAfterVisual";
import story from "../assets/images/onedollarstory.png";
import AnimateIn from "./AnimateIn";

const DOLLAR_ITEMS = [
  { icon: FaShieldAlt, text: "PROACTIVE DISASTER RISK REDUCTION" },
  { icon: FaTools, text: "EQUIP LOCAL RESPONDERS WITH TOOLS" },
  { icon: FaSatelliteDish, text: "DEVELOP ADVANCED TECHNOLOGIES" },
  { icon: FaCity, text: "REBUILD COMMUNITIES TO BE SAFER" },
  { icon: FaUserFriends, text: "CONNECT EXPERTS AND LOCALS" },
  { icon: FaHandsHelping, text: "DISASTER RESPONSE PROGRAMS" },
];

const DONATION_TIERS = [
  {
    icon: FaUserShield,
    title: "$5 = Access for one person",
    description: "Provide one person with access to the Michael app for disaster preparedness.",
  },
  {
    icon: FaUsers,
    title: "$10 = Access for two people",
    description: "Help two people prepare for disasters with the Michael app and a chance to stay safe.",
  },
  {
    icon: FaSchool,
    title: "$50 = Community Safety",
    description: "Provide safety training for 10 individuals in vulnerable communities.",
  },
];

function DonationSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "But HOPE starts with YOU.";

  const dollarRef = useRef(null);
  const dollarInView = useInView(dollarRef, { once: true, margin: "-60px" });

  const tiersRef = useRef(null);
  const tiersInView = useInView(tiersRef, { once: true, margin: "-60px" });

  // Typewriter Effect
  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText]);

  return (
    <Section className="overflow-hidden" id="donation">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col items-center">
        <AnimateIn variant="fadeUp">
          <Heading tag="Donate Generously" title="Act Now Before It's Too Late." />
        </AnimateIn>

        {/* Section 2: Global Disaster Safety Overview */}
        <AnimateIn variant="fadeUp" delay={0.1} className="rounded-lg shadow-lg p-8 mb-12 w-full max-w-6xl text-center">
          <p className="text-lg text-content-secondary">
            Out of 8 billion people, only 1.4 billion feel safe from disasters. For the rest, every day is a battle against uncertainty.
          </p>
          <div className="flex justify-center mt-8">
            <div className="w-full rounded-lg flex items-center justify-center p-4">
              <p className="text-content-primary text-3xl lg:text-5xl font-bold break-words">
                {displayedText.split("HOPE")[0]}
                <span className="text-primary">HOPE</span>
                {displayedText.split("HOPE")[1]?.split("YOU")[0]}
                <span className="text-primary">YOU</span>
                {displayedText.split("YOU")[1]}
                {showCursor && <span className="blinking-cursor">|</span>}
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Section 3: Impact of $5 Donation */}
        <AnimateIn variant="fadeUp" delay={0.15} className="bg-white rounded-lg shadow-lg p-8 mb-12 w-full max-w-6xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            What Your $5 Can Do
          </h2>
          <p className="text-md sm:text-lg text-gray-700">
            Just $5 provides one family with access to the Michael app, giving them the tools they need to stay safe.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-3xl sm:text-5xl mb-2 text-primary">
                <span className="inline-block">$</span>
                <span className="inline-block">5</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-primary">Donation</p>
            </motion.div>
            <div className="text-2xl sm:text-3xl text-primary">→</div>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-3xl sm:text-5xl mb-2">
                <i className="fas fa-globe"></i>
              </div>
              <p className="text-sm sm:text-2xl font-medium text-primary"><b>Michael</b> App <br />Access</p>
            </motion.div>
            <div className="text-2xl sm:text-3xl text-primary">→</div>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-3xl sm:text-5xl mb-2">
                <i className="fas fa-users"></i>
              </div>
              <p className="text-sm sm:text-2xl font-medium text-primary">Increased <b>Safety</b><br />for 1 Family</p>
            </motion.div>
          </div>
        </AnimateIn>

        {/* Section 4: Where Your $1 Monthly Goes */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 w-full max-w-6xl text-center">
          <AnimateIn variant="fadeUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Journey of Every $1
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Your $1 monthly donation helps empower communities with life-saving tools and sustainable rebuilding solutions.
            </p>
          </AnimateIn>

          <div ref={dollarRef} className="flex flex-wrap justify-center gap-6 mt-8">
            {DOLLAR_ITEMS.map(({ icon: Icon, text }, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center bg-primary-muted rounded-full w-32 h-32 sm:w-40 sm:h-40 p-4 shadow-md"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={dollarInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.1, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
              >
                <Icon className="text-primary text-4xl mb-2" />
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 text-center">
                  {text}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 6: Call to Action with Donation Boxes */}
        <div className="text-center bg-primary text-white rounded-lg p-12 mb-12 w-full max-w-6xl">
          <AnimateIn variant="fadeUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              One Small Step for You, One Giant Leap for Safety
            </h2>
            <p className="text-lg mb-12">
              One donation. Countless lives changed. A safer world for all. Choose a donation tier and help us save lives.
            </p>
          </AnimateIn>

          <div ref={tiersRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DONATION_TIERS.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={tiersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              >
                <Icon className="text-primary text-5xl mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{description}</p>
                <a
                  href="https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    className="bg-primary text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-primary-dark transition-all"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Donate Now
                  </motion.button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default DonationSection;
