import React, { useState } from "react";
import { motion } from "framer-motion";
import ndifanji from "../assets/team/ndifanji.png";
import maria from "../assets/team/maria.png";
import sapiens from "../assets/team/sapiens.png";
import scottwalker from "../assets/team/scottwalker.png";
import WDCLogo from "../assets/images/wdclogobg.png";
import jonathan from "../assets/team/Jonathan_itegwa.png";
import Section from "./Section";
import Heading from "./Heading";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin } from "react-icons/fa";

function TeamPage() {
  const board = [
    {
      location: "Cameroon",
      title: "Board Director, World Disaster Center",
      bio: "Jonathan Itegwa is a seasoned humanitarian leader and project management expert with extensive experience in strategy development, program implementation, and monitoring and evaluation in cross-cultural environments. Currently serving as Head of Mission at Premiere Urgence Internationale, he has successfully led teams and projects across Africa, focusing on impactful humanitarian operations.",
      email: "jitegwa@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/jonathan-itegwa-965466108/",
      name: "Jonathan Itegwa",
      image: jonathan,
    },
    {
      location: "Germany",
      title: "Board Director, World Disaster Center",
      bio: "Maria is a highly skilled research consultant specializing in migration, human rights, and project management. With over a decade of experience, she has worked on impactful projects for organizations like the Open Society Foundations. As a proactive leader, Maria has contributed significantly to addressing global challenges like disinformation, climate migration, and civic engagement.",
      email: "mkohutova@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/maria-horvat-kohutova/",
      name: "Maria Horvat Kohutova",
      image: maria,
    },
    {
      location: "Malawi",
      title: "Board Director, World Disaster Center",
      bio: "Dr. Ndifanji Melia Namacha is a Malawian physician and global health researcher with over seven years of experience in program management, policy development, and advocacy. She earned her MBBS from the University of Malawi, College of Medicine, and has demonstrated expertise in digital health, strategy formulation, and donor engagement.",
      email: "nnamacha@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/ndifanji-melia-namacha-mbbs-mba-001a62123/",
      name: "Ndifandji Namacha",
      image: ndifanji,
    },
    {
      location: "Ottawa, Ontario, Canada",
      title: "Board Director, World Disaster Center",
      bio: "Manuella Kalong is a board director at the World Disaster Center, bringing expertise in policy, research, humanitarian coordination, advocacy, and communication. Appointed October 3, 2025.",
      email: "",
      socials: "https://www.linkedin.com/in/manuella-kalong",
      name: "Manuella Kalong",
      image: WDCLogo,
    },
    {
      location: "",
      title: "Board Director & Technology Developer Lead, World Disaster Center",
      bio: "Elia Buhendwa is a board director and technology developer lead at the World Disaster Center, bringing expertise in software development, technology architecture, and digital innovation. Appointed October 3, 2025.",
      email: "",
      socials: "",
      name: "Elia Buhendwa",
      image: WDCLogo,
    },
    {
      location: "USA",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "",
      socials: "https://www.linkedin.com/in/scot-walker/",
      name: "Johnny (Scot) Walker",
      image: scottwalker,
    },
    {
      location: "Harare, Zimbabwe",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "",
      socials: "https://www.linkedin.com/in/albert-mawungwe-b898241b9/",
      name: "Albert Mawungwe",
      image: WDCLogo,
    },
    {
      location: "Germany",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "rieriedel@africa-aid-project.de",
      socials: "https://www.linkedin.com/in/carstenriedel/",
      name: "Carsten Riedel",
      image: WDCLogo,
    },
    {
      location: "Johannesburg, South Africa",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "clint.leander@here.com",
      socials: "https://www.linkedin.com/in/clint-leander/",
      name: "Clint Leander",
      image: WDCLogo,
    },
    {
      location: "Austria",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "arrahdurran@yahoo.ca",
      socials: "",
      name: "Gilbert Arrah",
      image: WDCLogo,
    },
    {
      location: "United States",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "kubisaingrid@gmail.com",
      socials: "https://www.linkedin.com/in/ingrid-kubisa-06988241bb/",
      name: "Ingrid Kubisa",
      image: WDCLogo,
    },
    {
      location: "Haiti",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "stephanedabone@gmail.com",
      socials: "https://www.linkedin.com/in/jean-stephane-dabone-259a92147/",
      name: "Jean Stephane Dabone",
      image: WDCLogo,
    },
    {
      location: "Kenya",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "lisa.rebelo@digitalearthafrica.org",
      socials: "https://www.linkedin.com/in/lisa-maria-rebelo/",
      name: "Lisa Rebelo",
      image: WDCLogo,
    },
    {
      location: "Bamako, Mali",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "divinstephen.aksanti@gmail.com",
      socials: "https://www.linkedin.com/in/stephen-divin-aksanti-marhegeko-78839712b/",
      name: "Stephen Aksanti",
      image: WDCLogo,
    },
    {
      location: "USA",
      title: "Board Director, World Disaster Center",
      bio: "",
      email: "",
      socials: "",
      name: "Steve Morgan",
      image: WDCLogo,
    },
  ];

  const ClevelExecutives = [
    {
      location: "Paris",
      title: "Founder & Chief Executive Officer",
      bio: "A multidisciplinary humanitarian and technology specialist with expertise spanning Earth Sciences, Information Technologies, and Digital Analytics, with over a decade of professional experience. I have extensive knowledge in satellite imagery analysis, Big Data integration, and cutting-edge technologies such as AI, Blockchain, IoT, and Machine Learning, applied to disaster resilience, response, and sustainable development. My work has empowered global communities across 15+ countries, collaborating with international organizations, governments, and NGOs to implement tailored disaster management strategies and inclusive digital solutions.",
      email: "sndatabaye@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/sapiens-ndatabaye-227425165/",
      name: "Sapiens Ndatabaye",
      image: sapiens,
    },
  ];

  const team_data = {
    board: board,
    executives: ClevelExecutives,
  };

  const [teamkey, setTeamKey] = useState("board");
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  return (
    <Section crosses>
      <div className="container">
        <Heading
          title="Meet Our Team"
          text="At World Disaster Center, our team is the heart and soul of our mission."
          tag="Our People"
        />
        <div className="flex items-center justify-center">
          <div className="flex items-center p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
            <button
              onClick={() => setTeamKey("board")}
              className={`px-4 py-2 text-sm font-medium rounded-xl md:px-12 capitalize ${teamkey === "board" ? "bg-blue-600 text-white" : "text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white"}`}
            >
              Board of Directors
            </button>
            <button
              onClick={() => setTeamKey("executives")}
              className={`px-4 py-2 text-sm font-medium rounded-xl md:px-12 capitalize ${teamkey === "executives" ? "bg-blue-600 text-white" : "text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white"}`}
            >
              Executives
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-3 xl:grid-cols-4">
          {team_data[teamkey].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              className="relative w-full group cursor-pointer rounded-xl"
              onClick={() => handleOpen(member)}
            >
              <img
                className="object-cover w-full h-64 rounded-xl border-4 border-white transition-transform duration-300"
                src={member?.image}
                alt={member.name}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 text-center p-2 rounded-b-xl transition-transform duration-300">
                <h1 className="text-base font-semibold text-gray-900">{member.name}</h1>
                <p className="text-xs text-gray-600 leading-tight mt-0.5">{member.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          className="bg-white p-6 rounded-lg shadow-lg flex"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: "60%" },
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: 30,
          }}
        >
          {selectedMember && (
            <div className="flex w-full flex-col md:flex-row">
              {/* Left Section */}
              <div className="md:w-1/3 flex flex-col items-center bg-gray-100 p-4 rounded-lg">
                <img
                  className="w-full h-auto mt-4 rounded-lg object-cover"
                  src={selectedMember.image}
                  alt={selectedMember.name}
                />
                {selectedMember.location && (
                  <div className="flex items-center mt-4 text-gray-600">
                    <FaMapMarkerAlt className="text-red-500 text-lg" />
                    <span className="ml-1">{selectedMember.location}</span>
                  </div>
                )}
                <div className="flex items-center mt-6 gap-4">
                  {selectedMember.email && (
                    <a href={`mailto:${selectedMember.email}`} className="text-blue-500 hover:scale-110 transition-transform">
                      <FaEnvelope className="text-3xl" />
                    </a>
                  )}
                  {selectedMember.socials && (
                    <a href={selectedMember.socials} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:scale-110 transition-transform cursor-pointer">
                      <FaLinkedin className="text-3xl" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Section */}
              <div className="md:w-2/3 p-6">
                <Typography variant="h4" className="font-bold text-black">
                  {selectedMember.name}
                </Typography>
                <Typography className="italic text-gray-700 mt-1">
                  {selectedMember.title}
                </Typography>
                {selectedMember.bio && (
                  <Typography className="text-gray-600 mt-4 leading-relaxed">
                    {selectedMember.bio}
                  </Typography>
                )}
                <div className="mt-6">
                  <Button variant="contained" color="primary" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </Section>
  );
}

export default TeamPage;
