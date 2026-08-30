import React from "react";
import Section from "./Section";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";
import END_DISASTER_IMPACTS from "../assets/images/END_DISASTER_IMPACTS.png"

function VideoSection() {
  return (
    <Section crosses>
      <div className="container sm:px-2">
        <div className="flex flex-col lg:flex-row bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-xl">

          {/* Image Side */}
          <AnimateIn variant="fadeLeft" className="w-full lg:w-1/2 bg-gray-100">
            <img
              src={END_DISASTER_IMPACTS}
              alt="End disaster impacts"
              className="w-full h-full object-cover"
            />
          </AnimateIn>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 p-10 lg:p-14 bg-white">
            <AnimateIn variant="fadeRight" delay={0.1}>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                The World We Are Building
              </h3>
            </AnimateIn>
            <AnimateIn variant="fadeRight" delay={0.25}>
              <p className="text-xl text-gray-600 font-light mb-2">
                A New Era of Resilience and Empowerment
              </p>
            </AnimateIn>

            <AnimateIn variant="fadeUp" delay={0.4}>
              <div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-8 py-4 rounded-sm transition-all duration-300 uppercase tracking-widest text-xs shadow-md"
                  >
                    Learn About Our Mission &rarr;
                  </Link>
                </motion.div>
              </div>
            </AnimateIn>
          </div>

        </div>
      </div>
    </Section>
  );
}

export default VideoSection;
