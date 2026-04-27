import {
  benefitIcon1,
  chromecast,
  disc02,
  discordBlack,
  facebook,
  file02,
  homeSmile,
  instagram,
  plusSquare,
  recording01,
  recording03,
  searchMd,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

import Volcano from "../assets/volcano.png";
import Tornado from "../assets/tornado.png";
import Wave from "../assets/wave.png";
import Mud from "../assets/mud.png";
import Floods from "../assets/floods.png";
import Fire from "../assets/fire.png";
// import Earthquake from "../assets/earthquake.png";
// import desert from "../assets/desert.png";
import Flooding from "../assets/floooding.png";
import avielon from "../assets/logos/Avielon_logo.png";
import ghtc from "../assets/logos/GHTC_logo.jpeg";
import opendeved from "../assets/logos/opendeved_logo.png";
import rha from "../assets/logos/rha_logo.png";
import equity from "../assets/logos/equity_logo.png";
import codeforafrica from "../assets/logos/codeforafrica_logo.png";
import rapidgrowth from "../assets/logos/rapidgrowth_logo.jpeg";
import orange from "../assets/logos/orange_logo.png";
import kaizenmind from "../assets/logos/kaizenmind_logo.png";
import pui from "../assets/logos/pui_logo.png";
import undp from "../assets/logos/undp_logo.png";
import gcse from "../assets/logos/gsce_logo.png";
import esri from "../assets/logos/esri_logo.png";
import google from "../assets/logos/google_logo.png";
import burohelp from "../assets/logos/burohelp_logo.png";
import canadagovernment from "../assets/logos/govermentofcanada_logo.png";
import ada from "../assets/logos/ada_logo.png";
import esa from "../assets/logos/esa_logo.png";
import ifb from "../assets/logos/ifb-logo.jpeg";
import microsoft from "../assets/logos/Microsoft-Logo.png";
import techsoup from "../assets/logos/TechSoup_Logo.svg.png";
import stripe from "../assets/logos/Stripe_Logo,_revised_2016.svg.png";
import paypal from "../assets/logos/paypal-new-logo-v0-rn30nd8uqzpd1.jpg";
// import raindrop from '../assets/'

export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "/",
  },
  {
    id: "1",
    title: "Blogs",
    url: "/blogs",
  },
  {
    id: "2",
    title: "About",
    url: "/about",
  },
  {
    id: "3",
    title: "Services",
    url: "/services",
  },
  {
    id: "7",
    title: "Contact",
    url: "/contact",
  },
  {
    id: "4",
    title: "Sign up",
    url: "/signup",
    onlyMobile: true,
    notconnected: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "/signin",
    onlyMobile: true,
    notconnected: true,
  },
  {
    id: "6",
    title: "Profile",
    url: "/profile",
    onlyMobile: true,
    onlyConnected: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [];

// export const companyLogos = [ghtc, avielon, pui, opendeved, ada];
export const strategicpartner_companyLogos = [canadagovernment, esa, orange, gcse, pui, kaizenmind, burohelp, rapidgrowth, microsoft, stripe, paypal];
export const collaborator_companyLogos = [ada, codeforafrica, opendeved];
export const technicalsponsor_companyLogos = [google, esri, techsoup];
export const implmentationpartner_companyLogos = [undp, rha, ghtc];
export const financialpartner_companyLogos = [equity];
export const technicalpartner_companyLogos = [avielon, ifb];

export const brainwaveServices = ["Detection System", "Real-Time Alerts"];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const collabText =
  "The Michael software system monitors various types of disasters \
  worldwide including earthquakes, tsunamis, hurricanes, floods, \
  wildfires, and industrial accidents.";

export const collabContent = [
  {
    id: "0",
    title: "Real-Time Alerts and Analytics",
    text: "With the Michael system, stakeholders receive real-time alerts and access to advanced analytics.\
     This allows them to stay informed about ongoing disasters and make data-driven decisions to mitigate risks and respond effectively.",
  },
  {
    id: "1",
    title: "Comprehensive Data Sources",
    text: "The Michael platform leverages a wide range of data sources, including satellite imagery\
    weather stations, seismic sensors, social media feeds, and other relevant sources. By aggregating and \
    analyzing this data, it provides comprehensive insights into disaster events and their potential impact",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Volcano",
    icon: Volcano,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Tornado",
    icon: Tornado,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Rain",
    icon: Floods,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Floods",
    icon: Flooding,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Fire",
    icon: Fire,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Wave",
    icon: Wave,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Landslide",
    icon: Mud,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: Floods,
    width: 38,
    height: 32,
  },
];

export const roadmap = [];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "00",
    title: "Tailored Solutions",
    text: "At WDC, we provide technology-driven solutions designed to strengthen disaster preparedness, optimize crisis response, and empower decision-makers. Our services focus on equipping vulnerable communities with the tools and insights needed to mitigate risks, respond effectively, and recover sustainably.",
    backgroundUrl: "assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: "",
    hyperlink: "",
    comingsoon: false,
    url: "/solution",
  },
  {
    id: "02",
    title: "Global Products",
    text: "WDC's Global Products are designed to strengthen disaster resilience and preparedness globally. By providing actionable insights, connecting resources, and offering comprehensive analyses, they empower communities and organizations to make informed decisions and respond effectively.",
    backgroundUrl: "assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: "",
    hyperlink: "",
    comingsoon: false,
    url: "/global-products",
  },
  {
    id: "03",
    title: "Roster Membership",
    text: "WDC’s roster includes experienced professionals, local experts, partner organizations, private companies, all ready for immediate action in disaster-affected areas. We value the unique contributions of every member, recognizing that a range of perspectives, skills, and local experiences enhance our ability to respond effectively.",
    backgroundUrl: "assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: "",
    hyperlink: "",
    comingsoon: false,
    url: "/membership",
  },
  {
    id: "04",
    title: "Partnerships",
    text: "WDC partners with strategic, technical, and funding collaborators, including financial sponsors and software providers, to bring our solutions to life. Supported by long-term investment partners and in-kind contributions, these collaborations drive sustainable and impactful disaster preperadness, response and recovery innovations.",
    backgroundUrl: "assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: "",
    hyperlink: "",
    comingsoon: true,
    url: "/about/partners",
  },
  // {
  //   id: "1",
  //   title: "Real-Time Alerts",
  //   text: "Notifies stakeholders of potential disasters as they are detected, enabling immediate response.",
  //   backgroundUrl: "assets/benefits/card-1.svg",
  //   iconUrl: benefitIcon1,
  //   imageUrl: benefitImage2,
  // },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];


export const dropdownData = [
  {
    title: "About Us",
    routings: {
      "About WDC": "/about",
      // "Our Mission": "/about/mission",
      // "Our Story": "/about/story",
      // "Our Values": "/about/values",
      // "Our Team": "/about/team",
      "Our Partners": "/about/partners",
      "Partner With Us": "/about/partner-with-us",
      // "Partner With Us": "/about/partnerwithus",
    },
  },
  // {
  //   title: "Where We Work",
  //   routings: {
  //     Africa: "/where-we-work/africa",
  //     // Asia: "/",
  //     // "South America": "/",
  //     // Europe: "/about",
  //     // "North America": "/",
  //     // Antarctica: "/",
  //     // Oceania: "/",
  //   },
  // },
  {
    title: "What We Do",
    routings: {
      "Tailored Solutions": "/solution",
      "Global Products": "/global-products",
    },
  },
  // {
  //   title: "Impact",
  //   route: "/impact",
  // },
  {
    title: "Resources",
    routings: {
      Events: "/Events",
      News: "/News",
      Newsletter:  "/newsletter",
    },
  },
  {
    title: "Get Involved",
    routings: {
      // "Get Involved":"/",
      "Donate & Ways to Give": "/donate",
      Careers:"/careers",
      "Contact Us": "/contact",
    },
  },
  
];