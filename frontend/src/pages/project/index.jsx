import React from "react";
import EagleImage from '../../assets/eagle.png'
import { useNavigate } from "react-router-dom";
const ProjectsPage = () => {
  return (
    <>
      <section className="bg-white pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  Our Projects
                </span>
                <h2 className="mb-4 text-3xl font-bold text-content-primary sm:text-4xl md:text-[40px]">
                  Our Recent Works
                </h2>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            <BlogCard
              date="Jun 2024"
              CardTitle="DH APP:  EAGLE: Automated Disaster Assessment Tool"
              CardDescription="EAGLE is a pioneering initiative by Word Disaster Center aimed at revolutionizing disaster assessment through automation. By harnessing advanced technologies, EAGLE is designed to provide comprehensive, real-time data on disasters, encompassing the natural environment, infrastructure damage, and human impact. This tool embodies our commitment to enhancing disaster resilience through innovative solutions."
              image={EagleImage}
            />

          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;

const BlogCard = ({ image, date, CardTitle, CardDescription }) => {
    const navigate = useNavigate();
  return (
    <>
      <div onClick={() => navigate("/projects/eagle")} className="w-full px-4 md:w-1/2 lg:w-1/3 cursor-pointer">
        <div className="mb-10 w-full">
          <div className="mb-8 overflow-hidden rounded">
            <img src={image} alt="" className="w-full" />
          </div>
          <div>
            {date && (
              <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                {date}
              </span>
            )}
            <h3>
              <a
                href="/#"
                className="mb-4 inline-block text-xl font-semibold text-content-primary hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
              >
                {CardTitle}
              </a>
            </h3>
            <p className="text-base text-content-secondary">
              {CardDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
