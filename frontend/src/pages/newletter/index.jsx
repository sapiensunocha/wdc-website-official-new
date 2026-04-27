import React, { useState } from "react";
import Section from "../../components/Section";
import Heading from "../../components/Heading";
import NewsLetter from "../../components/newsletter";

function NewsLetterPage() {
  // Data for the sections
  const sections = [
    {
      title: "Achievements",
      description:
        "Explore WDC’s key milestones in proactive disaster risk reduction, success stories, and our contributions on global stages.",
      iframeSrc:
        "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=a448fd80a1",
      buttonLink:
        "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=a448fd80a1",
      pastNewsletters: [
        { text: "UNFCCC Top 10 Finalist", link: "https://mailchi.mp/783e575b7ace/world-disaster-center-a-new-era-of-resilience-and-empowerment-23940?e=3c28b703f3" },
      ],
    },
    {
      title: "Act Now for Tomorrow",
      description:
        "Receive weekly updates on major disasters that have occurred, insights into upcoming disaster risks, and practical action steps.",
      iframeSrc:
        "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=294e5e5d57",
      buttonLink:
        "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=294e5e5d57",
      pastNewsletters: [
        { text: "Act Now for Tomorrow #1", link: "https://mailchi.mp/55c959ac5075/act-now-for-tomorrow-weekly-newsletter-1?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #2", link: "https://mailchi.mp/dee4807a9b42/act-now-for-tomorrow-weekly-newsletter-23935?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #3", link: "https://mailchi.mp/088c06df2d4c/act-now-for-tomorrow-weekly-newsletter-24753?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #4", link: "https://mailchi.mp/8286c39af8f3/act-now-for-tomorrow-weekly-newsletter-25332?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #5", link: "https://mailchi.mp/9c81f8aab6c0/act-now-for-tomorrow-weekly-newsletter-26062?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #6", link: "https://mailchi.mp/f0bf38885994/act-now-for-tomorrow-weekly-newsletter-26700?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #7", link: "https://mailchi.mp/f3bdf4a7cbf9/act-now-for-tomorrow-weekly-newsletter-27348?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #8", link: "https://mailchi.mp/39f43e77f70b/act-now-for-tomorrow-weekly-newsletter-27948?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #9", link: "https://mailchi.mp/8b1c98a35fef/act-now-for-tomorrow-weekly-newsletter-28356?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #10", link: "https://mailchi.mp/0e4af386d252/act-now-for-tomorrow-weekly-newsletter-29161?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #11", link: "https://mailchi.mp/aefc64fc99d0/act-now-for-tomorrow-weekly-newsletter-29447?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #12", link: "https://mailchi.mp/eaf3e9ae20af/act-now-for-tomorrow-weekly-newsletter-29953?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #13", link: "https://mailchi.mp/11bdf6690d77/act-now-for-tomorrow-weekly-newsletter-30418?e=35f8125fc4" },
        { text: "Act Now for Tomorrow #14", link: "https://mailchi.mp/ca246312bc5c/act-now-for-tomorrow-weekly-newsletter-30734?e=35f8125fc4" },
      ],
    },
    {
      title: "Global Impact",
      description:
        "Learn about our global missions, including the ongoing Democratic Republic of Congo mission for disaster preparedness.",
      iframeSrc:
        "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=008b03f703",
      buttonLink:
        "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=008b03f703",
      pastNewsletters: [
        { text: "DRC Mission Day #1", link: "https://mailchi.mp/4ba37c816f3a/world-disaster-center-a-new-era-of-resilience-and-empowerment-30323?e=35f8125fc4" },
        { text: "DRC Mission Day #2", link: "https://mailchi.mp/2741d3203daf/world-disaster-center-a-new-era-of-resilience-and-empowerment-30404?e=35f8125fc4" },
        { text: "DRC Mission Day #3", link: "https://mailchi.mp/9d99319dd1a1/world-disaster-center-a-new-era-of-resilience-and-empowerment-30413?e=35f8125fc4" },
        { text: "DRC Mission Day #4", link: "https://mailchi.mp/f01c1be7cb42/world-disaster-center-a-new-era-of-resilience-and-empowerment-30574?e=35f8125fc4" },
        { text: "DRC Mission Day #5", link: "https://mailchi.mp/763d45e1275d/world-disaster-center-a-new-era-of-resilience-and-empowerment-30589?e=35f8125fc4" },
        { text: "DRC Mission Day #6", link: "https://mailchi.mp/b787989c4609/world-disaster-center-a-new-era-of-resilience-and-empowerment-30580?e=35f8125fc4" },
        { text: "DRC Mission Day #7", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=0ba57fe5f9" },
        { text: "DRC Mission Day #8", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=76057817bf" },
        { text: "DRC Mission Day #9", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=204f2bc7c6" },
        { text: "DRC Mission Day #10", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=29245358a7" },
        { text: "DRC Mission Day #11", link: "http://eepurl.com/i61AMY" },
        { text: "DRC Mission Day #12", link: "http://eepurl.com/i63YJs" },
        { text: "DRC Mission Day #13", link: "http://eepurl.com/i67ae2" },
        { text: "DRC Mission Day #14", link: "http://eepurl.com/i68KbM" },
        { text: "DRC Mission Day #15", link: "http://eepurl.com/i7az1-/" },
        { text: "DRC Mission Day #16", link: "http://eepurl.com/i7ebVY" },
        { text: "DRC Mission Day #17", link: "http://eepurl.com/i7grvM" },
        { text: "DRC Mission Day #18", link: "http://eepurl.com/i7g9tw" },
        { text: "DRC Mission Day #19", link: "http://eepurl.com/i7k7aQ" },
        { text: "DRC Mission Day #20", link: "http://eepurl.com/i7pvVg" },
        { text: "DRC Mission Day #21", link: "http://eepurl.com/i7uJMA" },
        { text: "DRC Mission Day #22", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=3325199211" },
        { text: "DRC Mission Day #23", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=863a764a23" },
        { text: "DRC Mission Day #24", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=61cd0a6e7a" },
        { text: "DRC Mission Day #25", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=3e392c42f0" },
        { text: "DRC Mission Day #26", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=3ab643e812" },
        { text: "DRC Mission Day #27", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=16bef64757" },
        { text: "DRC Mission Day #28", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=c5e328cd5f" },
        { text: "DRC Mission Day #29", link: "https://us22.campaign-archive.com/?u=c90ad2e6157e6eac27328c681&id=4487709742" },
      ],
    },
  ];

  // State to manage the open/close state of the dropdown
  const [openDropdown, setOpenDropdown] = useState({});

  // Function to toggle dropdown visibility
  const toggleDropdown = (index) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      {/* Main Newsletter Section */}
      <Section className="overflow-hidden" id="newsletter">
        <div className="container flex flex-col items-center justify-center">
          {/* Heading */}
          <Heading
            tag="Stay Connected"
            title="Impact360 Newsletter"
            text="Get the latest updates on disaster resilience efforts, news, and events from World Disaster Center."
          />

          {/* Grid Layout for Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {sections.map((section, index) => (
              <div key={index}>
                {/* Main Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between" style={{ minHeight: "450px" }}>
                  {/* Section Title */}
                  <h3 className="text-2xl font-bold text-primary mb-3 uppercase text-center">
                    {section.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{section.description}</p>

                  {/* Embedded Mailchimp Newsletter */}
                  <iframe
                    src={section.iframeSrc}
                    className="w-full h-64 border-none rounded-lg mb-4"
                    title={section.title}
                    frameBorder="0"
                  ></iframe>

                  {/* Browse on the Internet Button */}
                  <a
                    href={section.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-4 py-2 rounded-lg text-center hover:bg-primary-dark transition-all"
                  >
                    Browse on the Internet
                  </a>
                </div>

                {/* View Past Newsletters Dropdown Box */}
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="bg-gray-200 text-primary px-4 py-2 rounded-lg text-center w-full hover:bg-gray-300 transition-all"
                  >
                    {openDropdown[index] ? "Hide Past Newsletters" : "View Past Newsletters"}
                  </button>

                  {openDropdown[index] && (
                    <div className="mt-4">
                      <table className="w-full text-left border-collapse">
                        <tbody>
                          {section.pastNewsletters.map((newsletter, i) => (
                            <tr key={i}>
                              <td className="py-2 text-black font-medium">{newsletter.text}</td>
                              <td className="py-2">
                                <a
                                  href={newsletter.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary-dark hover:underline"
                                >
                                  Read More
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Newsletter Signup Section at the Bottom */}
      <Section className="bg-primary py-12">
        <div className="container">
          <NewsLetter />
        </div>
      </Section>
    </>
  );
}

export default NewsLetterPage;
