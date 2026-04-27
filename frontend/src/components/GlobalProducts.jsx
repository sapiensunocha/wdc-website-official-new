import React, { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TagLine from "./Tagline";
import Section from './Section';
import Heading from './Heading';
import { products } from '../assets/data/products';
import { Link } from 'react-router-dom';

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

  // Slice the products to show only the current items
  const currentItems = products.slice(0, currentPage * itemsPerPage);

  // Load More Button Logic
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Section crosses>
      <div className="container">
        <Heading
          title="What We Do"
          text={`Our Global Products are designed to enhance disaster resilience and preparedness worldwide. They leverage advanced analytics, real-time data, and collaborative platforms to empower decision-makers with actionable insights.`}
          tag={`Global Products`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {currentItems.map((item, index) => (
            <Link
              to={item.coming_soon ? '#' : `/global-products/${item.title}`}
              key={index}
              className="block min-h-60 bg-cover bg-center rounded-md overflow-hidden relative group transition-transform duration-300 ease-in-out transform hover:scale-105"
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
          ))}
        </div>

        {/* Load More Button */}
        {currentItems.length < products.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-primary text-white px-6 py-2 rounded-full shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
