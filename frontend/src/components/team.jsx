import React, { useState } from "react";
import { motion } from "framer-motion";
import billy from "../assets/team/billy.png";
import jietong from "../assets/team/jietong.png";
import jane from "../assets/team/Jane.png";
import chaitra from "../assets/team/chaitra.png";
import srinivasa from "../assets/team/srinivasa.png";
import ndifanji from "../assets/team/ndifanji.png";
import davidboard from "../assets/team/davidk.png";
import davidm from "../assets/team/davidm.png";
import ayushi from "../assets/team/ayushi.png";
import grace from "../assets/team/mariegrace.png";
import doddy from "../assets/team/DoddyMatabaro.png";
import josephb from "../assets/team/joseph.png";
import kibwe from "../assets/team/kibwe.png";
import maria from "../assets/team/maria.png";
import Ruth from "../assets/team/Ruth.png";
import sapiens from "../assets/team/sapiens.png";
import WDCLogo from "../assets/images/wdclogobg.png";
import lilla from "../assets/team/lilla.png";
import manho from "../assets/team/man-ho.png";
import francine from "../assets/team/francine.png";
import norbert from "../assets/team/norbert.png";
import doux from "../assets/team/doux.png";
import boaz from "../assets/team/boaz.png";
import elvis from "../assets/team/elvis.png";
import jamesmbogo from "../assets/team/JamesMbogo.png";
import david from "../assets/team/david_kabanga.png";
import hugues from "../assets/team/hugues_bisimwa.png"
import jonathan from "../assets/team/Jonathan_itegwa.png"
import Section from "./Section";
import Heading from "./Heading";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin } from "react-icons/fa"; // Import icons

function TeamPage() {
  const board = [
    {
      location: "USA",
      title: "Board Member, World Disaster Center",
      bio: "",
      email: "",
      socials: "",
      name: "Steve Morgan",
      image: WDCLogo,
    },
    // {
    //   location: "USA",
    //   title: "",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Gilbert Arrah",
    //   image: WDCLogo,
    // },
    // {
    //   location: "",
    //   title: "Country Director @ Première Urgence International",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Eugide Lalé Mbunda",
    //   image: WDCLogo,
    // },
    // {
    //   location: "",
    //   title: "Policy Aide to the Commissioner of the 1st District @ Hennepin County",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Ingrid Kubisa",
    //   image: WDCLogo,
    // },
    // {
    //   location: "USA",
    //   title: "Information Management Delegate @ International Federation of Red Cross and Red Crescent Societies - IFRC",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Jean Stephane Dabone",
    //   image: WDCLogo,
    // },
    {
      location: "Cameroon",
      title: "Head of Mission @ Première Urgence Internationale",
      bio: "Jonathan Itegwa is a seasoned humanitarian leader and project management expert with extensive experience in strategy development, program implementation, and monitoring and evaluation in cross-cultural environments. Currently serving as Head of Mission at Première Urgence Internationale, he has successfully led teams and projects across Africa, focusing on impactful humanitarian operations.",
      email: "jitegwa@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/jonathan-itegwa-965466108/",
      name: "Jonathan Itegwa",
      image: jonathan,
    },
    {
      location: "Germany",
      title: "PhD Research Consultant, Migration & Human Rights @  Erasmus University Rotterdam",
      bio: "Maria is a highly skilled research consultant specializing in migration, human rights, and project management. With over a decade of experience, she has worked on impactful projects for organizations like the Open Society Foundations. As a proactive leader, Maria has contributed significantly to addressing global challenges like disinformation, climate migration, and civic engagement.",
      email: "mkohutova@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/maria-horvat-kohutova/",
      name: "Maria Kohutova",
      image: maria,
    },
    {
      location: "Malawi",
      title: "Vice Chair Advisory Panel @ Aidsfonds & Policy Manager @ Transform Health",
      bio: "Dr. Ndifanji Melia Namacha is a Malawian physician and global health researcher with over seven years of experience in program management, policy development, and advocacy. She earned her MBBS from the University of Malawi, College of Medicine, and has demonstrated expertise in digital health, strategy formulation, and donor engagement.",
      email: "nnamacha@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/ndifanji-melia-namacha-mbbs-mba-001a62123/",
      name: "Ndifandji Namacha",
      image: ndifanji,
    },
    // {
    //   location: "USA",
    //   title: "Multi-Country Consortium Coordinator & Chief Of Party PARIC_Mali-Burkina Faso @ International Rescue",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Stephen Aksanti",
    //   image: WDCLogo,
    // },
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
    {
      location: "Democratic Republic of the Congo",
      title: "Chief Technical Officer",
      bio: "A passionate and results-driven software developer with expertise in the MERN stack (MongoDB, Express.js, React.js, and Node.js). I specialize in building robust, scalable, and efficient web applications that deliver seamless user experiences. I thrive on solving complex problems, learning emerging technologies, and collaborating with teams to deliver innovative solutions. My projects showcase my ability to create cutting-edge applications that balance functionality with a great user experience.",
      email: "davidkabanga@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/kabanga-david/",
      name: "David Kabanga",
      image: david,
    },
    {
      location: "Kenya",
      title: "Chief Information Officer",
      bio: "A self driven Geo-Information management specialist/GIS/IMSMA expert and a practicing GPS Land Surveyor with over 20 years' professional experience. I have in-depth knowledge in Biometrics Information systems, Information Management Systems for mine Action (IMSMA), Geographic Information System (GIS), Geospatial analysis, Remote sensing and GPS mapping, relational database and related information management systems field with extensive experience with international organizations, NGOs, private and international organizations including the UNICEF, UNOCHA, IMMAP UNSOS, AMISOM, UN-DPKO, UNOPS, UNMAS and other UN agencies. I have implemented state-of-the-art technology transfer, through knowledge of best practices in capacity building and enterprise-wide data and application systems including decision support systems incorporating socio-economic and biophysical information of multiple formats and sources. I have also professional experience of inter-agency/inter-cluster collaboration and management between multiple organizations to develop inter-agency GIS/IM/IMSMA/IT systems.",
      email: "jmbogo@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/james-mbogo-a3b41739/",
      name: "James Mbogo",
      image: jamesmbogo,
    },
    
  ];
  const TeamLeads = [
    {
      location: "Switzerland",
      title: "Advocacy Lead",
      bio: "Lilla Albert is an international development professional specializing in governance, climate change, and reform systems. She holds an MSc in Environment and Development from the University of Leeds and a BSc in International Relations and Sociology from Aston University. Lilla has worked with the United Nations, including the Office of the High Commissioner for Human Rights, where she contributed to humanitarian responses and early warning systems. At DCAF, she addressed military and police security sector reform challenges, designing and delivering professional development programs while also advocating for accountability and transparency in governance systems. Currently, Lilla serves as the Head of Advocacy at the World Disaster Center, where she leads global efforts in disaster risk reduction and resilience. A seasoned speaker and trainer, she has facilitated workshops on human rights, climate resilience, and security reform, empowering diverse audiences to drive sustainable and inclusive solutions.",
      email: "lalbert@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/lillaalbert/",
      name: "Lilla Albert",
      image: lilla,
    },
    {
      location: "Kenya",
      title: "Forecast Lead",
      bio: "Ruth Ndegwa is passionate about making a real difference in disaster management by utilizing cutting-edge Artificial Intelligence (AI) and Human Intelligence (HUMINT) to revolutionize global catastrophe management. She has a special viewpoint on disaster risk management based on her background in humanitarian operations, data analysis, and strategic planning. She has worked in academic research, corporate strategy, and as a field worker for the UN World Food Programme, where she enhanced the delivery of humanitarian food by streamlining data gathering procedures. Ruth's goal at the World Disaster Center is to improve response plans and our knowledge of disasters by combining cutting-edge analytical technologies with real-time, crowdsourced data. Her approach focuses on uplifting marginalized groups and encouraging technology and ground-level efforts to work together.  Moreoever, her enthusiasm lies in spearheading inventive, data-centric solutions that not only address calamities but also foster resilience and sustainable growth. Ruth's purpose is in line with WDC's mission to end disaster impacts globally.",
      email: "rndegwa@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/ruth-ndegwa-615377167/",
      name: "Ruth Ndegwa",
      image: Ruth,
    },
    {
      location: "Egypt",
      title: "Research Analysis and Digital Innovation",
      bio: "Leading a multidisciplinary team within WDC to advance global disaster preparedness through research and digital innovation. Overseeing disaster risk reduction and recovery projects, implementing advanced digital tools, aligning research with practical disaster management needs, and contributing to strategic planning and project impact assessment. With a strong background in program management and conservation, experience spans roles such as Program Assistant at SOS Children's Villages International (2020–2023) and Ideas For Us DRC (2016–2017), Project Manager at Virunga Foundation (2018–2020), and Researcher and Consultant at Wildlife Conservation Society (2017–2018). These roles demonstrate expertise in project management, research, and supporting initiatives focused on social and environmental impact.",
      email: "davidmulume@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/david-mulume/",
      name: "David Mulume",
      image: davidm,
    },
  ]
  const staffs = [
    {
      location: "USA",
      title: "LLM Developer",
      bio: "I am a data scientist passionate about leveraging data-driven insights to solve complex problems and guide strategic decision-making. With extensive experience in the healthcare sector, I have delivered advanced AI/ML solutions for disease diagnosis, product launches, sales forecasting, and promotional strategy optimization. My expertise spans omni-channel analytics, patient and market access analysis, predictive modeling, and reporting.Academically, I am pursuing a graduate degree in Data Science from UMBC, set to complete in August 2024, and hold a Master of Technology in Computer Science and Analytics from NIT Delhi. Proficient in Python, SQL, PySpark, R, and advanced machine learning techniques, I excel in predictive modeling, time series forecasting, NLP, and optimization. I am committed to continuous innovation and driving impactful, data-driven transformations.",
      email: "ayushi@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/ayushi-bhujade/",
      name: "Ayushi Bhujade",
      image: ayushi,
    },
    {
      location: "usa",
      title: "Data Scientist",
      bio: "I have a strong foundation in data science and experience in building robust data pipelines using Python and SQL. My background includes working with cloud platforms like AWS and GCP to develop scalable ETL workflows and integrating APIs for seamless system connectivity. I am passionate about leveraging data-driven solutions to support World Disaster Center, and I always eager to learn new thing.",
      email: "blibang@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/libang-xia-156523264/",
      name: "Billy Libang",
      image: billy,
    },
    {
      location: "Demoractic Republic of the Congo",
      title: "GIS Analyst",
      bio: "Boaz MULIRI is a researcher at the World Disaster Center, where he works in Research, Analysis and digital Innovation (RADI) team. Boaz is a crop production engineer with a year and a half of experience in the field. After graduating in Agricultural Engineering from the Université Évangélique en Afrique, where he is currently pursuing a Master's Degree in Environmental Information Systems, he began his career as an evaluator of soil conservation techniques promoted locally by World Vision and Mercy Corps. His role involved conducting a scientific evaluation of the techniques. He subsequently joined a local organization (RAPD asbl) as a technical assistant for the development of a wetland, and the International Organization for Migration as a field officer for humanitarian aid. His skills include scientific research with data collection and analysis. His main research focus is climate change and carbon sequestration. Outside of work and study, Boaz is a farmer and mentor students at various stages of their research. He is passionate about developing innovative strategies and aims to continue pushing the boundaries of progress.",
      email: "bmuliri@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/boaz-muliri-517543185/",
      name: "Boaz Muliri",
      image: boaz,
    },
    {
      location: "USA",
      title: "Dashboard Specialist",
      bio: "Responsible for creating data-driven reports, disaster preparedness guidebooks, media reports, animated data visualizations, real-time dashboards, and multimedia outputs. With a Master's in Computer Information Systems from Colorado State University - College of Business, I have a strong foundation in advanced data analytics, visualization, and information management - skills that align with WDC's mission to use data for disaster resilience and response. Additionally, I bring six years of experience in data analysis, business intelligence, and quality assurance from my work at HP Inc., where I enhanced operational efficiency and customer satisfaction through expertise in operational data analysis, customer retention strategies, and team mentoring - key factors in driving performance and process improvements.",
      email: "ckumar@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/chaitra-venu-kumar-453348b1/",
      name: "Chaitra Venu Kumar",
      image: chaitra,
    },
    {
      location: "Demoractic Republic of the Congo",
      title: "Full Stack Developer",
      bio: "Doddy Matabaro is a skilled software developer with expertise in JavaScript frameworks, PHP, and web application testing. He previously developed a school management application for high schools, streamlining activities like grading, HRM, and fee collection, which enhanced his proficiency in PHP, HTML/CSS, JavaScript, and TypeScript. Fluent in French, English, and Swahili, Doddy is a fast learner, adaptable to new technologies and skills.",
      email: "davidmulume@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/doddy-matabaro-0a9666211/",
      name: "Doddy Matabaro",
      image: doddy,
    },
    {
      location: "Kenya",
      title: "IT and Cyber Security Officer",
      bio: "Elvis Matara has a Diploma of Education in Cyber Security from the Institute of Software Technologies and currently works on cyber security at the World Disaster Center",
      email: "ematara@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/elvis-matara-aa1888248/",
      name: "Elvis Matara",
      image: elvis,
    },
    {
      location: "Demoractic Republic of the Congo",
      title: "HR Officer",
      bio: "I'm Francine NABINTU, Finance and HR officer at WDC Master's degree student in business management, Graduated in social sciences in the department of social communication peace and conflict management, I have my degree diploma in organizational communication and i have some professional trainings certificates in women's empowerment, gender and of course Human Resources management, administration, logistics and supply chain management as well as accounting. I have some experience in communication as i finished in social science in department of communication where all my internships were based on organizational communication and social communication in general. I now have 4 years of experience as a full-time employee, taking care of some administrative tasks, human resources but also some financial tasks  I am characterized by a sense of organization and of proposing pragmatic solutions, a sense of initiative, capacity for conception ability to write and summarize, good oral communication skills.",
      email: "fnabintu@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/francine-nabintu-365603206/",
      name: "Francine Nabintu",
      image: francine,
    },
    {
      location: "Demoractic Republic of the Congo",
      title: "Monitoring and Evaluation Specialist",
      bio: "",
      email: "hbisimwa@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/hugues-bisimwa-8453639a/",
      name: "Hugues Bisimwa",
      image: hugues,
    },
    // {
    //   location: "Ivory Coast",
    //   title: "Data Scientist",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Jietong Lee",
    //   image: jietong,
    // },
    {
      location: "Demoractic Republic of the Congo",
      title: "UX Designer",
      bio: "John Kibwe is a UI-UX, Web & Motion Designer who works as a freelancer. He currently works for WDC (World Disaster Center) where his responsibilities include design work and video/motion footage editing for the organization.",
      email: "jkibwe@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/john-kibwe-97347324a/",
      name: "John Kibwe",
      image: kibwe,
    },
    // {
    //   location: "DRC",
    //   title: "Information System",
    //   bio: "Hi there! I'm a passionate programmer, full-stack developer, and game developer enthusiast with a flair for creative coding. As a Game Developer, I work with Unity, pygame, and have some experience with Unreal Engine and 3D modeling. I love crafting immersive experiences and building gameplay mechanics. In my full-stack development work, I use JavaScript, React, and Node.js, working with both SQL databases and MongoDB. I enjoy bridging front-end and back-end development to create comprehensive solutions. Creative coding is another passion of mine - I experiment with generative art and interactive installations, always looking to push boundaries and try new approaches. When I'm not coding, you'll find me playing chess or piano.",
    //   email: "",
    //   socials: [],
    //   name: "Joseph Bakulikira",
    //   image: josephb,
    // },
    {
      location: "UK",
      title: "Forecast Developer",
      bio: "Man Ho is a volunteer developer at the World Disaster Center, where he works in the Forecast team. Man Ho is a career switcher who is currently pursuing a Master's degree in Computer Science at the Georgia Institute of Technology. Before this, he worked as a neuroscience researcher at various institutions in the US, after completing his doctoral study in neuroscience at the International Max Planck Research School in Germany. He also holds a Bachelor's degree in biotechnology from the Hong Kong Polytechnic University. Throughout his academic journey, he has cultivated a strong interest in data science and scientific software development. Additionally, he is passionate about global development and human-centered technology, hoping to use his skills to contribute to the betterment of global society.",
      email: "mwong@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/mh-wong/",
      name: "Man Ho Wong",
      image: manho,
    },
    // {
    //   location: "Ivory Coast",
    //   title: "Full Stack Developer",
    //   bio: "Marie-Grace is a Software Developer specializing in full-stack web development, trained at Microverse remote school. She has completed over 15 projects, working both independently and in international teams, and solved more than 20 coding challenges alongside global developers. Her technical expertise spans HTML, CSS, JavaScript, React, TypeScript, and Ruby on Rails. Beyond coding, she has developed strong capabilities in communication, time management, technical writing, problem-solving, and teamwork. She emphasizes hands-on learning and maintains a strong focus on creating meaningful solutions to real-world problems through software development, with a commitment to continuous learning and adaptability to new technologies.",
    //   email: "",
    //   socials: [],
    //   name: "Marie Grâce Bahati",
    //   image: grace,
    // },
    {
      location: "Uganda",
      title: "GIS Visualization Expert",
      bio: "With a background in environmental science and geographic information systems, she currently serves as a GIS Analyst at the World Disaster Center, where she works remotely from Kampala, Uganda. Her expertise spans Python programming and geospatial data analysis. Since 2022, she has also worked as an Environmental Consultant at ECO Innovations International, focusing on Environment, Health, and Safety (EHS) and GIS applications. Her career in environmental management began with an internship at the National Environment Management Authority Uganda, where she gained hands-on experience conducting environmental compliance inspections. This combination of technical GIS skills and environmental expertise allows her to contribute effectively to both disaster management and environmental conservation efforts.",
      email: "nakato@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/nakato-jane-hope-a31779276/",
      name: "Nakato Jane Hope",
      image: jane,
    },
    // {
    //   location: "",
    //   title: "UI and UX Designer",
    //   bio: "I'm a passionate web and mobile developer, specializing in user interface (UI) design and user experience (UX). With over two years' experience, I've cultivated a remarkable expertise in creating intuitive and attractive digital solutions. After graduating with a degree in computer science, I quickly became interested in user experience design and honed my skills using Figma, an essential design tool, to create interactive prototypes that meet user needs while respecting modern aesthetic criteria.",
    //   email: "",
    //   socials: [],
    //   name: "Norbert Balisha",
    //   image: norbert,
    // },
    {
      location: "USA",
      title: "Full Stack Developer",
      bio: "I'm a driven and highly motivated Computer Science student with a strong foundation in programming, passionate about exploring the evolving fields of Machine Learning (ML), AI, Software Development and Full Stack Web Development. I thrive on solving complex problems and I am eager to deepen my understanding of computer science and its real world impact. I'm always looking for opportunities to learn from experienced professionals and to push the boundaries of what technology can do.",
      email: "sperisetla@worlddisastercenter.org",
      socials: "https://www.linkedin.com/in/srinivasaperisetla/",
      name: "Srinivasa  Perisetla",
      image: srinivasa,
    },
    // {
    //   location: "Ivory Coast",
    //   title: "Data Analyst",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Anselme Konan",
    //   image: WDCLogo,
    // },
    // {
    //   location: "",
    //   title: "Forecast Intern",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Gagana Md",
    //   image: WDCLogo,
    // },
    // {
    //   location: "Ghana",
    //   title: "Drones Expert",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Ayuba Abubakar",
    //   image: WDCLogo,
    // },
    // {
    //   location: "DRC",
    //   title: "GIS Analyst",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Danny Kikwaya",
    //   image: WDCLogo,
    // },
    // {
    //   location: "DRC",
    //   title: "Data Scientist",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Le Doux Medi",
    //   image: WDCLogo,
    // },
    // {
    //   location: "DRC",
    //   title: "AI Specialist",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Joseph Kaniki",
    //   image: WDCLogo,
    // },

    // {
    //   location: "USA",
    //   title: "Visualization Specialist",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Oluwandosin Agbolabori",
    //   image: WDCLogo,
    // },
    // {
    //   location: "Italy",
    //   title: "Information Management Specialist",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Lorenzo Libertini",
    //   image: WDCLogo,
    // },
    // {
    //   location: "",
    //   title: "Forecast Consultant",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Narayan Adhikari",
    //   image: WDCLogo,
    // },
    // {
    //   location: "",
    //   title: "AI Developer",
    //   bio: "",
    //   email: "",
    //   socials: [],
    //   name: "Seraphin Baributsa",
    //   image: WDCLogo,
    // },
  ];

  const team_data = {
    clevelexecutives: ClevelExecutives,
    "team leads": TeamLeads,
    staff: staffs,
    board: board,
  };

  const handleChangeTeamKey = (new_key) => {
    setTeamKey(new_key);
  };

  const [teamkey, setTeamKey] = useState("clevelexecutives");
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
          tag="Disaster Heroes"
        />
        <div className="flex items-center justify-center">
          <div className="flex items-center p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
            <button
              onClick={() => handleChangeTeamKey("clevelexecutives")}
              className={`px-4 py-2 text-sm font-medium rounded-xl md:px-12 capitalize ${teamkey === "clevelexecutives" ? "bg-blue-600 text-white" : "text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white"}`}
            >
              Executives
            </button>
            <button
                onClick={() => {
                  handleChangeTeamKey("team leads");
                }}
                className={`px-4 py-2 text-sm font-medium md:py-3  rounded-xl md:px-12 capitalize ${
                  teamkey === "team leads"
                    ? "bg-blue-600 text-white"
                    : "transition-colors duration-300 md:py-3 text-blue-600 dark:text-blue-400 dark:hover:text-white focus:outline-none hover:bg-blue-600 hover:text-white"
                }`}
              >
                Team Lead
              </button>
            <button
              onClick={() => handleChangeTeamKey("staff")}
              className={`px-4 py-2 text-sm font-medium rounded-xl md:px-12 capitalize ${teamkey === "staff" ? "bg-blue-600 text-white" : "text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white"}`}
            >
              Staff
            </button>
            <button
              onClick={() => handleChangeTeamKey("board")}
              className={`px-4 py-2 text-sm font-medium rounded-xl md:px-12 capitalize ${teamkey === "board" ? "bg-blue-600 text-white" : "text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white"}`}
            >
              Board
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-15 mt-8 xl:mt-16 md:grid-cols-3 xl:grid-cols-3">
          {team_data[teamkey].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              className="relative w-full group cursor-pointer rounded-xl"
              onClick={() => handleOpen(member)}
            >
              <img
                className="object-cover w-full h-full rounded-xl border-4 border-white transition-transform duration-300"
                src={member?.image}
                alt={member.name}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 text-center p-2 rounded-b-xl transition-transform duration-300">
                <h1 className="text-lg font-semibold text-gray-900">{member.name}</h1>
                <p className="text-xs text-gray-600">{member.title}</p>
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
      width: "60%",
      boxShadow: 30,
    }}
  >
    {selectedMember && (
      <div className="flex w-full">
        {/* Left Section - Image & Icons */}
        <div className="w-1/3 flex flex-col items-center bg-gray-100 p-4 rounded-lg">
          <img className="w-full h-auto mt-10 rounded-lg object-cover" src={selectedMember.image} alt={selectedMember.name} />
          
          {/* Location */}
          <div className="flex items-center mt-5 text-gray-600">
            <FaMapMarkerAlt className="text-red-500 text-lg" />
            <span className="ml-1 mt-1">{selectedMember.location}</span>
          </div>

          {/* Email & LinkedIn*/}
          <div className="flex items-center mt-10">
            <a href={`mailto:${selectedMember.email}`} className="flex items-center text-blue-500 hover:scale-110">
              <FaEnvelope className="text-3xl" />
            </a>
            <a href={selectedMember.socials} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-700 hover:scale-110 cursor-pointer">
              <FaLinkedin className="ml-5 text-3xl" />
            </a>
          </div>
        </div>

        {/* Right Section - Name, Title, Bio */}
        <div className="w-2/3 p-6 -mt-6">
          <Typography variant="h3" className="font-bold text-black">
            {selectedMember.name}
          </Typography>
          <Typography className="italic text-gray-700 mt-1">
            {selectedMember.title}
          </Typography>
          <Typography className="text-gray-600" sx={{ mt: 4 }}>
            {selectedMember.bio}
          </Typography>

          {/* Close Button */}
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
