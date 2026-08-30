import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import { check } from "../assets";
import { brainwaveServices } from "../constants";
import World from "../assets/services/world.png";
import corevalues from "../assets/services/corevalues.jpg";
import img1 from "../assets/services/img1.png";
import img2 from "../assets/services/img2.png";
import img3 from "../assets/services/img3.png";
import img4 from "../assets/services/img4.png";
import AnimateIn from "./AnimateIn";

import Generating from "./Generating";

const STRENGTHS = [
  { src: img1, alt: "Innovates for People", title: "Innovates for People", desc: "We place people at the heart of every solution, developing tools and insights that are simple, actionable, and transformative." },
  { src: img2, alt: "Connects the World", title: "Connects the World", desc: "Our global network spans governments, NGOs, businesses, and individuals, ensuring that we leverage existing expertise & resources." },
  { src: img3, alt: "Operates in Real Time", title: "Operates in Real Time", desc: "From global systems to local communities, we provide real-time alerts, advice, and data to mitigate disaster impacts effectively." },
  { src: img4, alt: "Is Inclusive", title: "Is Inclusive", desc: "We are a diverse, collaborative hub, uniting people from all backgrounds, ages, and expertise to create holistic solutions." },
];

const VALUES_CIRCLES = [
  { title: "Action-Oriented", description: "We take immediate action to save lives, knowing that every moment counts." },
  { title: "Collaboration Based", description: "We build strong partnerships to deliver swift and impactful solutions." },
  { title: "Tech-Driven", description: "We use cutting-edge technologies like AI and real-time data to improve disaster governance." },
  { title: "Inclusive", description: "We ensure disaster responses meet the needs of all, with a focus on marginalized groups." },
  { title: "Real-Time", description: "We provide real-time alerts and insights to empower effective decision-making and risk mitigation." },
  { title: "Worldwide", description: "Our global efforts unite organizations and individuals to build a more resilient and sustainable world." },
];

const Services = () => {
  const strengthsRef = useRef(null);
  const strengthsInView = useInView(strengthsRef, { once: true, margin: "-80px" });

  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <div className="flex flex-col w-full h-full justify-center items-center p-8">
      <AnimateIn variant="fadeUp">
        <div className="text-4xl font-bold text-center">
          Our Strengths
        </div>
      </AnimateIn>

      <div className="container mx-auto py-8">
        <div ref={strengthsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STRENGTHS.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={strengthsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={item.src}
                alt={item.alt}
                className="w-16 h-16 mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-content-secondary">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimateIn variant="fadeUp">
        <div className="text-4xl font-bold text-center text-content-primary py-16">
          Our Values
        </div>
      </AnimateIn>

      <div className="w-full px-4">
        <div
          ref={valuesRef}
          className="
            grid
            grid-cols-1
            min-[460px]:grid-cols-2
            lg:grid-cols-3
            gap-x-0
            gap-y-6
            place-items-center
          "
        >
          {VALUES_CIRCLES.map((value, index) => (
            <motion.div
              key={index}
              className="
                group
                flex
                flex-col
                items-center
                justify-center
                text-center
                text-white
                font-bold
                border-4
                border-primary-light
                rounded-full
                cursor-pointer
                transition-all
                duration-300
                ease-in-out
                hover:bg-primary
                hover:border-transparent
                hover:text-white
                w-36 h-36
                sm:w-40 sm:h-40
                lg:w-44 lg:h-44
                xl:w-48 xl:h-48
              "
              initial={{ opacity: 0, scale: 0.7 }}
              animate={valuesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08 }}
            >
              <div className="relative w-full h-full flex justify-center items-center p-2">
                <span className="z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                  <span className="text-[10px] sm:text-xs md:text-sm">
                    {value.title}
                  </span>
                </span>

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    justify-center
                    items-center
                    bg-primary
                    bg-opacity-90
                    rounded-full
                    p-2
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                    ease-in-out
                  "
                >
                  <span className="text-[9px] sm:text-xs md:text-sm font-normal">
                    {value.description}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};

export default Services;
