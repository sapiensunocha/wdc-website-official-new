import React, { useState } from "react";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import Benefits from "../../components/Benefits";
import Solutions from "../../components/CaseStudies";
import GlobalProducts from "../../components/GlobalProducts";
import Collaboration from "../../components/Collaboration";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import Hero from "../../components/Hero";
import NewsGrid from "../../components/NewsGrid";
import Pricing from "../../components/Pricing";
import Roadmap from "../../components/Roadmap";
import Services from "../../components/Services";
import Blogs from "../../components/blogs";
import ContactForm from "../../components/contactForm";
import NewsLetter2 from "../../components/newsletter2";
import VideoSection from "../../components/videosection";
import TopHero from "../../components/TopHero";
import Slideshow from "../../components/Slideshow";
import News from "../news";
import Events from "../events";
import Animation from "../../components/animator";

const HomePage = () => {
    // // State to manage the active section
    const [activeSection, setActiveSection] = useState("News");

    // Function to switch between sections
    const handleSwitchSection = () => {
      setActiveSection((prevSection) =>
        prevSection === "News" ? "Events" : "News"
      );
    };
    
    const [solutionsSection, setSolutionsSection] = useState("Solutions");
    const handleSolutionsSwitch = () => {
      setSolutionsSection((prevSection) =>
        prevSection === "Solutions" ? "GlobalProducts" : "Solutions"
      );
    };

  return (
    <>
    {/* <TopHero/> */}
      <Hero />
      {/* <Slideshow /> */}
      <VideoSection />
      <Benefits />
      <div className="container sm:px-2">
  <button
    onClick={() => setSolutionsSection("GlobalProducts")}
    className={`w-1/2 px-6 py-4 font-semibold text-lg focus:outline-none transition-colors duration-300 relative ${
      solutionsSection === "GlobalProducts"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-blue-400"
    }`}
  >
    Global Products
    {solutionsSection === "GlobalProducts" && (
      <div
        className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2
                   w-0 h-0 border-l-[16px] border-r-[16px] border-t-[16px]
                   border-transparent border-t-blue-600"
      ></div>
    )}
  </button>
  <button
    onClick={() => setSolutionsSection("Solutions")}
    className={`w-1/2 px-6 py-4 font-semibold text-lg focus:outline-none transition-colors duration-300 relative ${
      solutionsSection === "Solutions"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-blue-400"
    }`}
  >
    Tailored Solutions
    {solutionsSection === "Solutions" && (
      <div
        className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2
                   w-0 h-0 border-l-[16px] border-r-[16px] border-t-[16px]
                   border-transparent border-t-blue-600"
      ></div>
    )}
  </button>
</div>

{/* Content for Products/Solutions */}
<div className="w-full rounded-lg">
  {solutionsSection === "Solutions" ? <Solutions /> : <GlobalProducts />}
</div>

{/* Tab Navigation for News/Events */}
<div className="container sm:px-2">
  <button
    onClick={() => setActiveSection("News")}
    className={`w-1/2 px-6 py-4 font-semibold text-lg focus:outline-none transition-colors duration-300 relative ${
      activeSection === "News"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-blue-400"
    }`}
  >
    News & Info
    {activeSection === "News" && (
      <div
        className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2
                   w-0 h-0 border-l-[16px] border-r-[16px] border-t-[16px]
                   border-transparent border-t-blue-600"
      ></div>
    )}
  </button>
  <button
    onClick={() => setActiveSection("Events")}
    className={`w-1/2 px-6 py-4 font-semibold text-lg focus:outline-none transition-colors duration-300 relative ${
      activeSection === "Events"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-blue-400"
    }`}
  >
    Events
    {activeSection === "Events" && (
      <div
        className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2
                   w-0 h-0 border-l-[16px] border-r-[16px] border-t-[16px]
                   border-transparent border-t-blue-600"
      ></div>
    )}
  </button>
</div>


{/* Content for News/Events */}
<div className="w-full rounded-lg">
  {activeSection === "News" ? <News /> : <Events />}
</div>
<Animation />
    </>
    
  );
};

      {/* <Events /> */}
      {/* <Collaboration /> */}
      {/* <Services /> */}
      {/* <Blogs isHome={false} /> */}
      {/* <NewsLetter2 /> */}
      {/* <Pricing /> */}
      {/* <Pricing />
      <Roadmap /> */}
  
const styles = {
  
  sectionContainer: {
    position: "relative",
    marginBottom: "30px",
  },
  arrowButton: {
    position: "absolute",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    fontSize: "28px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#333",
    zIndex: 10,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  leftArrow: {
    left: "100px", // Adjust this value to move it closer to the center
    top: "50%",
    transform: "translateY(-50%)",
  },
  rightArrow: {
    right: "100px", // Adjust this value to move it closer to the center
    top: "50%",
    transform: "translateY(-50%)",
  },

};

export default HomePage;
