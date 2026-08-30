import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import DottedWorld from "../assets/hero/dottedWord.jpg";
import { Link } from "react-router-dom";
import AnimateIn from "./AnimateIn";

const Benefits = () => {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <Section id="features" crosses>
      <div className="container relative z-2">
        <AnimateIn variant="fadeUp">
          <Heading
            className="md:max-w-md lg:max-w-2xl"
            title="What We Offer"
            tag="Benefits"
          />
        </AnimateIn>

        <div ref={gridRef} className="flex flex-wrap gap-6 mb-10 justify-center">
          {benefits.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              className="flex-grow md:basis-[45%] lg:basis-[30%]"
            >
              <Link
                to={item.url === "" ? "/" : item.url}
                className="block relative bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 rounded-xl overflow-hidden group h-full"
              >
                <div className="relative z-10 flex flex-col min-h-[22rem] p-8">
                  <h5 className="text-2xl font-bold mb-4 text-gray-900 transition-colors">{item.title}</h5>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{item.text}</p>

                  <div className="flex items-center mt-auto border-t border-gray-100 pt-4">
                    <span className="font-bold uppercase tracking-wider text-xs text-gray-500 group-hover:text-black transition-colors">
                      {item?.url === "" ? "Coming soon" : `Explore ${item.title}`}
                    </span>
                    {item?.url !== "" && (
                       <div className="ml-auto opacity-50 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all">
                         <Arrow />
                       </div>
                    )}
                  </div>
                </div>

                {/* Subtle watermark */}
                <div className="absolute inset-0 opacity-[0.03] grayscale transition-opacity group-hover:opacity-[0.06] pointer-events-none">
                  <img
                    src={DottedWorld}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
