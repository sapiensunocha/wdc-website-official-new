import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimateIn from "../../components/AnimateIn";
import SEOMeta from "../../components/SEOMeta";
import { ArrowRight, Share2, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "../../lib/supabase";

import Hero from "../../components/Hero";
import VideoSection from "../../components/videosection";
import Benefits from "../../components/Benefits";
import Solutions from "../../components/CaseStudies";
import GlobalProducts from "../../components/GlobalProducts";
import Animation from "../../components/animator";
import Testimonials from "../../components/Testimonials";

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("News");
  const [solutionsSection, setSolutionsSection] = useState("Solutions");

  const [news, setNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    const fetchLatestIntel = async () => {
      setIsLoadingNews(true);
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("status", "published")
        .eq("category", "Disaster")
        .order("created_at", { ascending: false })
        .limit(3);
      if (data && !error) setNews(data);
      setIsLoadingNews(false);
    };
    fetchLatestIntel();
  }, [activeSection]);

  const handleShare = (id) => {
    const shareUrl = `${window.location.origin}/news?article=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="bg-white overflow-hidden">
      <SEOMeta
        title="World Disaster Center — Monitoring. Alerting. Protecting."
        description="World Disaster Center uses AI to monitor disasters, deliver early warnings, and protect the world's most vulnerable people. The Michael platform. 11 campaigns. Field missions worldwide."
        image="https://images.unsplash.com/photo-1594841343391-97ac1b9a950e?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/"
      />
      <Hero />
      <VideoSection />
      <Benefits />

      {/* Solutions Switcher */}
      <div className="bg-surface-subtle">
        <div className="container sm:px-2 py-16">
          <div className="flex w-full border-b border-gray-200 mb-10">
            <button
              onClick={() => setSolutionsSection("GlobalProducts")}
              className={`w-1/2 py-3 sm:py-5 font-bold text-sm sm:text-lg transition-all ${
                solutionsSection === "GlobalProducts"
                  ? "text-primary border-b-4 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Global Products
            </button>
            <button
              onClick={() => setSolutionsSection("Solutions")}
              className={`w-1/2 py-3 sm:py-5 font-bold text-sm sm:text-lg transition-all ${
                solutionsSection === "Solutions"
                  ? "text-primary border-b-4 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tailored Solutions
            </button>
          </div>
          <div className="w-full transition-all duration-500">
            {solutionsSection === "Solutions" ? <Solutions /> : <GlobalProducts />}
          </div>
        </div>
      </div>

      {/* Intelligence / News Section */}
      <div className="bg-white">
        <div className="container sm:px-2 py-20">
          {/* Section header */}
          <AnimateIn variant="fadeUp">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
              <div>
                <p className="tagline text-primary mb-2">Latest Updates</p>
                <h2 className="h2 text-content-primary mb-4">Latest Intelligence</h2>
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveSection("News")}
                    className={`pb-1 text-sm font-bold tracking-wider uppercase transition-colors border-b-2 ${
                      activeSection === "News"
                        ? "text-primary border-primary"
                        : "text-gray-400 border-transparent hover:text-gray-600"
                    }`}
                  >
                    News &amp; Info
                  </button>
                  <button
                    onClick={() => setActiveSection("Events")}
                    className={`pb-1 text-sm font-bold tracking-wider uppercase transition-colors border-b-2 ${
                      activeSection === "Events"
                        ? "text-primary border-primary"
                        : "text-gray-400 border-transparent hover:text-gray-600"
                    }`}
                  >
                    Global Events
                  </button>
                </div>
              </div>
              <Link
                to="/news"
                className="flex items-center gap-2 text-primary font-bold hover:underline tracking-wide uppercase text-sm mt-2 sm:mt-0"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {isLoadingNews ? (
              <div className="col-span-3 flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={36} />
              </div>
            ) : news.length > 0 ? (
              news.map((item, newsIdx) => (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveArticle(item)}
                  className="bg-white rounded border border-gray-200 border-t-4 border-t-primary cursor-pointer group flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: newsIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                >
                  {item.image_url && (
                    <div className="w-full h-44 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-primary-muted text-primary rounded mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-content-primary leading-snug group-hover:text-primary transition-colors line-clamp-3 flex-1">
                      {item.title}
                    </h3>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <p className="text-gray-400 text-xs tracking-wider uppercase">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <ArrowRight
                        size={16}
                        className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400 py-10 uppercase tracking-widest text-sm">
                No recent intelligence available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-6"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-4xl max-h-[85vh] overflow-y-auto border-t-4 border-t-primary shadow-2xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-all z-10"
            >
              <X size={18} />
            </button>

            {activeArticle.image_url && (
              <div className="w-full h-[35vh] relative flex-shrink-0">
                <img
                  src={activeArticle.image_url}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}

            <div className="p-8 md:p-12 flex-1">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-primary text-white rounded">
                    {activeArticle.category}
                  </span>
                  <span className="text-gray-400 text-xs tracking-wider uppercase">
                    {new Date(activeArticle.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <button
                  onClick={() => handleShare(activeArticle.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-content-primary mb-6 leading-tight">
                {activeArticle.title}
              </h2>
              <div
                className="text-base text-content-secondary leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(activeArticle.content),
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Roster CTA */}
      <div className="bg-[#1C2B39] text-white py-10 sm:py-16">
        <div className="container sm:px-2 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10">
          <AnimateIn variant="fadeLeft" className="max-w-xl">
            <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-3">Join Our Network</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
              Are you a disaster response expert?
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              WDC connects vetted humanitarian professionals with global deployment opportunities. Join our expert roster and help communities before, during, and after disasters.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeRight" delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/roster/apply"
                  className="bg-[#009EDB] hover:bg-[#0080b5] text-white font-bold px-8 py-3.5 rounded-sm text-sm tracking-wide transition-colors text-center whitespace-nowrap w-full sm:w-auto block"
                >
                  Apply to the Roster
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/roster"
                  className="border border-white/30 hover:border-white text-white font-bold px-8 py-3.5 rounded-sm text-sm tracking-wide transition-colors text-center whitespace-nowrap w-full sm:w-auto block"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </AnimateIn>
        </div>
      </div>

      <Testimonials />
      <Animation />
    </div>
  );
};

export default HomePage;
