import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";

const OurVision = () => {
  return (
    <>
      <section className="py-20 lg:py-[120px] bg-surface-subtle">
        <div className="container mx-auto">
          <div className="relative z-10 overflow-hidden rounded bg-primary py-12 px-8 md:p-[70px]">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full px-4 lg:w-1/2">
                <AnimateIn variant="fadeLeft">
                  <span className="block mb-4 text-2xl font-medium text-white">
                    Our Vision
                  </span>
                  <p className="text-white">
                    Our vision at the World Disaster Center is to cultivate a
                    world where communities are not only resilient to disasters
                    but can also perceive and utilize these events as
                    opportunities for growth and innovation. We envision a future
                    where every community, regardless of location or socioeconomic
                    status, is equipped with the knowledge, tools, and
                    capabilities to effectively manage and transform the
                    challenges posed by natural and anthropogenic disasters into
                    catalysts for development and improvement.
                  </p>
                </AnimateIn>
              </div>
              <div className="w-full px-4 lg:w-1/2">
                <AnimateIn variant="fadeRight" delay={0.2}>
                  <div className="flex flex-wrap lg:justify-end">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        to="/contact"
                        className="inline-flex py-3 my-1 mr-4 text-base font-medium transition bg-color-1 rounded-md hover:bg-shadow-1 text-white px-7"
                      >
                        Stay In Touch
                      </Link>
                    </motion.div>
                  </div>
                </AnimateIn>
              </div>
            </div>

            <div>
              <span className="absolute top-0 left-0 z-[-1]">
                <svg
                  width="189"
                  height="162"
                  viewBox="0 0 189 162"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="16"
                    cy="-16.5"
                    rx="173"
                    ry="178.5"
                    transform="rotate(180 16 -16.5)"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="-157"
                      y1="-107.754"
                      x2="98.5011"
                      y2="-106.425"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0.07" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="absolute bottom-0 right-0 z-[-1]">
                <svg
                  width="191"
                  height="208"
                  viewBox="0 0 191 208"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="173"
                    cy="178.5"
                    rx="173"
                    ry="178.5"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="-3.27832e-05"
                      y1="87.2457"
                      x2="255.501"
                      y2="88.5747"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0.07" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>
        <br/>

    </>
  );
};

export default OurVision;
