import React, { useState, useRef } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Section from './Section';
import Heading from './Heading';
import { caseStudies } from '../assets/data/case_stadies';
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

export default function CaseStudies() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  const currentItems = caseStudies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Section crosses>
      <div className="container">
        <AnimateIn variant="fadeUp">
          <Heading
            title="What We Do"
            text={`Our innovative solutions strengthen disaster preparedness, accelerate real-time response, empower informed decision-making, and save lives. Tailored to each country, these solutions support vulnerable communities, crisis responders, decision-makers, and organizations to build resilience and drive meaningful impact.`}
            tag={`Tailored Solutions`}
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
                to={item.coming_soon ? '#' : `/cases/${item.title}`}
                className="block min-h-60 bg-cover bg-center rounded-md overflow-hidden relative group"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
                  {item.coming_soon && (
                    <div className="absolute inset-0 flex items-center justify-center group bg-cover bg-center rounded-md overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white backdrop-blur-sm bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
      </div>
    </Section>
  );
}
