import React, { useState, useRef } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Section from './Section';
import Heading from './Heading';
import { products } from '../assets/data/products';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import AnimateIn from './AnimateIn';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function GlobalProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  const currentItems = products.slice(0, currentPage * itemsPerPage);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Section crosses>
      <div className="container">
        <AnimateIn variant="fadeUp">
          <Heading
            title="What We Do"
            text={`Our Global Products are designed to enhance disaster resilience and preparedness worldwide. They leverage advanced analytics, real-time data, and collaborative platforms to empower decision-makers with actionable insights.`}
            tag={`Global Products`}
          />
        </AnimateIn>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {currentItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            >
              <Link
                to={item.coming_soon ? '#' : `/global-products/${item.title}`}
                className="block min-h-60 bg-cover bg-center rounded-md overflow-hidden relative group"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
                  {item.coming_soon && (
                    <div className="absolute inset-0 flex items-center justify-center group bg-cover bg-center rounded-md overflow-hidden">
                      <div
                        className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white backdrop-blur-sm bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      >
                        Coming Soon!
                      </div>
                    </div>
                  )}
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div className="mt-2 text-gray-300 line-clamp-2">{item.description}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {currentItems.length < products.length && (
          <AnimateIn variant="fadeUp" delay={0.2}>
            <div className="flex justify-center mt-8">
              <motion.button
                onClick={handleLoadMore}
                className="bg-primary text-white px-6 py-2 rounded-full shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Load More
              </motion.button>
            </div>
          </AnimateIn>
        )}
      </div>
    </Section>
  );
}
