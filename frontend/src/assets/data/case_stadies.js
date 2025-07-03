import React from 'react';
import { motion } from 'framer-motion';
import { caseStudies } from '../assets/data/case_stadies';
import { Link } from 'react-router-dom'; // Use next/link for Next.js
import 'tailwindcss/tailwind.css'; // Assumes Tailwind is set up or use CDN

const CaseStudies = () => {
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)', transition: { duration: 0.3 } }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-blue-800 mb-12"
        >
          Case Studies
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.2 }}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-48 object-cover"
              />
              {study.coming_soon && (
                <span className="absolute top-4 right-4 bg-yellow-400 text-white px-2 py-1 rounded text-sm">
                  Coming Soon
                </span>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-800 mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="flex flex-col space-y-2">
                  {study.video && (
                    <a
                      href={study.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                      Watch Video
                    </a>
                  )}
                  {study.coming_soon ? (
                    <span className="text-gray-400 italic">Details coming soon</span>
                  ) : (
                    <Link
                      to={study.link}
                      className="inline-block bg-blue-200 text-blue-800 px-4 py-2 rounded hover:bg-blue-300 transition duration-300"
                    >
                      Learn More
                    </Link>
                  )}
                  {study.slideShow && (
                    <a
                      href={study.slideShow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-blue-600 hover:underline"
                    >
                      View SlideShare
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;