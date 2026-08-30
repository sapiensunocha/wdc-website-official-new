import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "./Section";
import Heading from "./Heading";
import AnimateIn from "./AnimateIn";

import {
  strategicpartner_companyLogos,
  collaborator_companyLogos,
  technicalpartner_companyLogos,
  technicalsponsor_companyLogos,
  implmentationpartner_companyLogos,
  financialpartner_companyLogos,
} from "../constants";

function PartnerGroup({ title, logos, getGridClass }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="mb-16">
      <AnimateIn variant="fadeUp">
        <div className="bg-primary py-4 rounded-lg shadow-md mb-8">
          <h3 className="text-white text-3xl font-semibold text-center">{title}</h3>
        </div>
      </AnimateIn>
      <ul ref={ref} className={`grid gap-10 ${getGridClass(logos.length)}`}>
        {logos.map((logo, index) => (
          <motion.li
            key={index}
            className="w-60 h-36 flex items-center justify-center bg-gray-100 rounded-xl shadow-md p-4"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.08, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
          >
            <img
              src={logo}
              alt={`${title.toLowerCase().replace(/\s/g, '-')}-${index}`}
              className="max-w-full max-h-full object-contain"
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const PartnersPage = ({ className = "" }) => {
  const getGridClass = (logosLength) => {
    if (logosLength === 1) return "grid-cols-1 place-items-center";
    if (logosLength === 3) return "grid-cols-1 sm:grid-cols-3 place-items-center";
    if (logosLength <= 2) return "grid-cols-1 sm:grid-cols-2 place-items-center";
    return "grid-cols-2 sm:grid-cols-4 place-items-center";
  };

  const sections = [
    { title: "Strategic Partners", logos: strategicpartner_companyLogos },
    { title: "Collaborators", logos: collaborator_companyLogos },
    { title: "Implementation Partner", logos: implmentationpartner_companyLogos },
    { title: "Technical Sponsors", logos: technicalsponsor_companyLogos },
    { title: "Financial Partner", logos: financialpartner_companyLogos },
  ];

  return (
    <Section crosses>
      <div className="container">
        <AnimateIn variant="fadeUp">
          <Heading
            title="Our Partners"
            tag="World Disaster Center"
            className="mb-10 text-center"
            crosses
          />
        </AnimateIn>

        <div className={`py-12 px-6 sm:px-10 ${className}`}>
          {sections.map((section) => (
            <PartnerGroup
              key={section.title}
              title={section.title}
              logos={section.logos}
              getGridClass={getGridClass}
            />
          ))}
        </div>

        {/* Partner With Us Section */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <div className="bg-white py-10 px-4 sm:px-6 rounded-lg shadow-md mt-10 text-center">
            <h2 className="text-3xl font-semibold text-primary mb-4">Partner With Us</h2>
            <p className="text-md text-gray-700 mb-2">
              World Disaster Center welcomes partnerships that align with our mission to enhance disaster preparedness, response, and recovery through cutting-edge technology and collaborative solutions.
              We work with governments, NGOs, private-sector organizations, and international bodies to build resilient communities and reduce the impact of disasters worldwide.
              Visit our <a href="/contact" className="text-primary underline hover:text-primary-dark">Contact Us</a> page to submit your request.
            </p>
          </div>
        </AnimateIn>
      </div>
    </Section>
  );
};

export default PartnersPage;
