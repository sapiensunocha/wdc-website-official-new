import ChatBot, { Button } from "react-chatbotify";
import "../styles/chatbot.css";
import Bot from "../assets/chatbot/robot.png";
import WDCLogo from "../assets/images/wdcimage.png";
import WDCLogo2 from "../assets/images/wdclogobg.png";

// ─── WDC Knowledge Base ────────────────────────────────────────────────────────
// Each entry: { keywords: string[], answer: string }
// keywords = individual significant words/phrases that should trigger this answer.
// The scorer rewards EXACT keyword matches over partial matches, so be specific.
const KB = [
  // ── Roles & careers ────────────────────────────────────────────────────────
  {
    keywords: ["data analyst", "data analysis", "analyst role", "what would analyst do", "analyst at wdc"],
    answer: "A Data Analyst at WDC works with Michael's real-time disaster data streams to extract insights that save lives. Day-to-day work includes: analyzing satellite imagery and sensor telemetry, building dashboards for humanitarian coordinators, running needs assessments and post-disaster reviews, identifying disaster risk patterns across regions, and supporting field teams with data-driven situation reports. WDC analysts also contribute to Nostradamus monthly forecasts and Crisis Atlas weekly overviews. Skills valued: Python/R, GIS/QGIS, SQL, data visualization (Tableau/Power BI), and humanitarian data standards (HDX, OCHA). Apply at worlddisastercenter.org/careers."
  },
  {
    keywords: ["software engineer", "developer", "software developer", "engineer role", "programmer", "coding", "what would engineer do", "what would developer do"],
    answer: "A Software Engineer at WDC builds the systems that protect lives. Core work includes: developing Michael's data ingestion pipelines, building AI/ML models for disaster prediction, creating real-time alert distribution systems (web, mobile, SMS, radio), building partner-facing APIs, and maintaining GIS/mapping infrastructure. WDC engineers work across Python, TypeScript/React, cloud infrastructure (GCP/Firebase), and mobile (Android/iOS). You'd be contributing to one of the most impactful humanitarian tech stacks in the world."
  },
  {
    keywords: ["field officer", "field coordinator", "field mission", "field worker", "humanitarian officer", "deployment officer"],
    answer: "A Field Officer at WDC deploys directly to disaster-affected regions. Responsibilities include: coordinating with local government and NGO partners (UNICEF, MSF, UNDP), collecting ground-truth data to feed into Michael, running community training sessions, facilitating early warning system integration with national authorities, and producing situation reports. Recent deployments include DRC, Burundi, Haiti, Jamaica, and Afghanistan. Field officers work directly under WDC's Executive Director Sapiens Ndatabaye."
  },
  {
    keywords: ["gis", "gis specialist", "remote sensing", "geospatial", "mapping specialist", "gis analyst"],
    answer: "A GIS/Remote Sensing Specialist at WDC is central to Michael's capabilities. Work includes: processing satellite imagery from NASA/ESA, building disaster risk maps, analyzing flood extents and wildfire progression, creating situation maps for field teams and humanitarian clusters, and integrating geospatial data into Michael's real-time dashboard. WDC partners with ESRI and Google for geospatial infrastructure. Skills: QGIS, ArcGIS, Google Earth Engine, Python (rasterio, geopandas), satellite imagery analysis."
  },
  {
    keywords: ["report writer", "report writing", "researcher", "research officer", "what would researcher do", "research role"],
    answer: "A Researcher/Report Writer at WDC produces the intelligence products that inform humanitarian decisions. Work includes: writing post-disaster reviews and lessons learned, drafting policy briefs for governments and UN agencies, producing Crisis Atlas weekly reports, conducting rapid needs assessments, and supporting Nostradamus monthly forecasts. WDC currently has an open vacancy for a Report Writing Consultant — check worlddisastercenter.org/careers."
  },
  {
    keywords: ["ml engineer", "machine learning", "ai engineer", "ai developer", "model", "nlp engineer"],
    answer: "An AI/ML Engineer at WDC builds the brain of Michael. Core responsibilities: training multi-hazard prediction models, developing NLP pipelines that process news/social media in 12+ languages for early disaster detection, building computer vision models for satellite imagery analysis, and improving Michael's data fusion engine. WDC's models work with ACLED conflict data, USGS seismic feeds, WMO meteorological data, and crowdsourced community reports. WDC has already validated 87% accuracy (92% for floods) across 200+ historical events."
  },
  {
    keywords: ["communications", "comms officer", "media officer", "pr", "public relations", "communications officer"],
    answer: "A Communications Officer at WDC manages WDC's global voice and visibility. Work includes: producing content for LinkedIn, X, Instagram, YouTube, writing press releases about Michael deployments and field missions, managing media relations for award announcements (like the UNFCCC Top 10 and People Matters Rwanda Award), and creating awareness campaigns around disaster preparedness. WDC has active channels on LinkedIn (@worlddisastercenter), X (@W_D_Center), Instagram (@worlddisastercenter), and YouTube (@WorldDisasterCenterOffice)."
  },
  {
    keywords: ["finance officer", "accountant", "financial analyst", "budget", "finance role", "fundraising"],
    answer: "A Finance Officer at WDC manages the financial sustainability of humanitarian operations. Responsibilities include: budget planning for field missions, financial reporting to donors and partners, managing grants from partners like the Canadian Government and ESA, processing transactions via Stripe/PayPal donation infrastructure, and supporting partnership financial agreements. WDC's financial partners include Equity Bank and Infinite Future Bank."
  },
  {
    keywords: ["volunteer", "volunteering", "how to volunteer", "intern", "internship", "pro bono"],
    answer: "You can contribute to WDC's mission as a volunteer or pro bono member. Options: (1) Professional Membership — contribute 10 hours of pro bono service (disaster expertise, data analysis, GIS, communications, legal, etc.) in exchange for membership benefits including the Experts Hub listing and priority event access. (2) Community Membership — free, participate in crowdsourcing tasks, earn certificates, contribute local disaster reports via Michael's 'Be a Reporter' feature. Apply at worlddisastercenter.org/roster or worlddisastercenter.org/membership."
  },
  {
    keywords: ["career", "careers", "jobs", "work at wdc", "employment", "vacancy", "open position", "hiring", "apply for job", "join team"],
    answer: "WDC welcomes talent from all disciplines who want to make a global humanitarian impact. Current opening: Report Writing Consultant. WDC hires data analysts, engineers, field officers, GIS specialists, communications officers, researchers, and more. WDC is an equal opportunity employer. Apply at worlddisastercenter.org/careers. Warning: WDC never requests personal info or extends offers unless you've formally applied through the official careers page — beware of phishing scams."
  },

  // ── Michael platform ────────────────────────────────────────────────────────
  {
    keywords: ["what is michael", "michael platform", "michael system", "michael app", "global disaster monitoring", "gdmas", "michael wdc"],
    answer: "Michael is WDC's flagship AI-powered disaster intelligence platform — the Global Disaster Monitoring and Alert System. It works across three dimensions: PREDICTION (up to 72 hours in advance), DETECTION (real-time multi-hazard monitoring), and RESPONSE COORDINATION. It tracks 12+ hazard types across 40+ countries in 12+ languages, with 87% accuracy validated on 200+ historical events (92% for floods)."
  },
  {
    keywords: ["michael accuracy", "how accurate michael", "prediction accuracy", "accuracy rate", "87%", "92%"],
    answer: "Michael has demonstrated 87% accuracy in flagging major disaster escalations at least 24 hours before official alerts, validated across 200+ historical events. For flood events specifically, accuracy reaches 92%. Michael uses a Human-AI hybrid model — every AI-generated alert goes through a validation layer where WDC analysts and local partners can confirm, adjust, or escalate based on on-the-ground context."
  },
  {
    keywords: ["michael data sources", "data sources", "satellite data", "sensor data", "how does michael work", "michael ai", "data fusion"],
    answer: "Michael's data fusion engine ingests: NASA/ESA satellite imagery (computer vision), USGS seismic sensor networks, WMO meteorological feeds, social media (X/Twitter, Telegram, local news via multilingual NLP), ACLED and GDELT conflict event data, IoT sensors, and WDC's 40+ year historical disaster records database. It cross-references all these streams to build continuously updated risk models for every region on Earth."
  },
  {
    keywords: ["michael mobile app", "michael download", "michael android", "michael ios", "mobile features", "app features", "michael phone"],
    answer: "The Michael mobile app features: personalized location alerts (push notifications for hazards near home/family/work), live risk maps updated every 15 minutes, 'Be a Reporter' (submit field reports with photos, GPS, text), evacuation guidance with shelter locations, offline mode (alerts cached when internet drops), community feed of verified reports, and 12+ language support. FREE for communities in 40+ countries, optimized for low-bandwidth conditions. Coming soon to Android and iOS app stores."
  },
  {
    keywords: ["michael languages", "languages supported", "multilingual michael", "french michael", "arabic michael"],
    answer: "Michael supports 12+ languages including French, Arabic, Swahili, Spanish, Portuguese, Amharic, and more — ensuring life-saving disaster intelligence reaches communities across Africa, Latin America, the Middle East, and beyond in their own language."
  },
  {
    keywords: ["michael disasters", "disasters monitored", "hazard types", "what disasters michael", "earthquake monitoring", "flood monitoring", "hurricane monitoring"],
    answer: "Michael monitors: earthquakes, tsunamis, hurricanes/cyclones, floods, wildfires, landslides, volcanoes, tornadoes, storm surges, industrial accidents, armed conflicts, and disease outbreaks — all in one unified platform with real-time alerts via web, mobile, SMS, and radio."
  },
  {
    keywords: ["michael future", "michael roadmap", "michael coming soon", "michael next", "michael api", "michael launch"],
    answer: "Coming next for Michael: public launch on Android and iOS app stores, integration with UN agencies and national meteorological services, a dedicated API for partner organizations, integration with national alert systems in Kenya, DRC, and Bangladesh, and the Michael Reporters Certification Program — training community members as WDC's global civilian early warning network."
  },
  {
    keywords: ["michael stakeholder", "become stakeholder", "michael access", "michael subscription"],
    answer: "Organizations and governments can become Michael stakeholders to receive early access to disaster intelligence, real-time alerts, and predictive risk maps. Stakeholders stay ahead of disasters with data-driven decision support. Fill out the stakeholder form at worlddisastercenter.org or contact office@worlddisastercenter.org."
  },
  {
    keywords: ["reporter", "community reporter", "field reporter", "submit report", "be a reporter", "crowdsourcing", "crowdsourced"],
    answer: "Michael's 'Be a Reporter' feature lets community members submit real-time disaster reports directly from the field via the app — with photos, GPS coordinates, and text. WDC's AI validates and cross-references these reports with satellite and sensor data to improve accuracy and local relevance. Community reporters are the eyes on the ground that AI satellites can't replace."
  },

  // ── Other products ──────────────────────────────────────────────────────────
  {
    keywords: ["nostradamus", "monthly forecast", "monthly report", "monthly disaster overview"],
    answer: "Nostradamus is WDC's LIVE monthly global disaster overview. It delivers projections for the upcoming month, detailed action plans, and prioritized response strategies across regions — giving humanitarian organizations and governments a critical planning edge before disasters escalate."
  },
  {
    keywords: ["crisis atlas", "weekly overview", "weekly disaster", "weekly report", "crisis atlas wdc"],
    answer: "Crisis Atlas is WDC's LIVE weekly global disaster overview covering ongoing disasters worldwide and projecting events expected in the following week. It gives humanitarian coordinators and decision-makers a consistent, actionable picture of the global risk landscape every week."
  },
  {
    keywords: ["eagle", "eagle tool", "impact assessment", "disaster impact assessment"],
    answer: "EAGLE is WDC's AI-powered real-time disaster impact assessment tool. It rapidly analyzes disaster severity, estimates affected populations, and identifies resource needs — enabling governments and NGOs to deploy resources efficiently in the critical first hours of a disaster."
  },
  {
    keywords: ["nova7", "nova 7", "nova7 tool"],
    answer: "Nova7 is WDC's coordination and preparedness tool deployed alongside Michael in field missions. It has been used in Haiti (Hurricane Melissa 2025 response), Kenya, and Nigeria for preparedness training and real-time operational coordination."
  },
  {
    keywords: ["all products", "wdc products", "global products", "what tools", "wdc platforms", "list products"],
    answer: "WDC's product suite: Michael (real-time disaster monitoring & AI alerts — LIVE), Nostradamus (monthly disaster forecasts & action plans — LIVE), Crisis Atlas (weekly global disaster overviews — LIVE), EAGLE (AI impact assessment), Nova7 (coordination tool for field missions), and the Global Disaster Roster Portal (connecting responders worldwide — coming soon)."
  },

  // ── Services ────────────────────────────────────────────────────────────────
  {
    keywords: ["training", "academy", "courses", "course", "learn", "learning", "study", "enroll", "certificate", "certified", "wdc academy", "online course", "free course", "take a course"],
    answer: "WDC Academy offers 7 FREE online self-paced courses with 27+ modules, 17+ hours of content, and certificates — completely free forever. Additional formats: Virtual instructor-led (from USD 150/participant), In-person workshops (from USD 2,500/day), Enterprise custom programs. Topics: Disaster Preparedness, Emergency Response & First Aid, Early Warning Systems, Humanitarian Coordination, Climate Change & DRR, Search & Rescue, WASH in Emergencies, Psychosocial Support (PFA), Gender & Inclusion, and 10+ more. Visit worlddisastercenter.org/training."
  },
  {
    keywords: ["consulting", "advisory", "technical advisory", "drr strategy", "risk assessment", "national strategy"],
    answer: "WDC's Technical Consulting & Advisory services include: national and community disaster risk assessments, DRR Strategy development and peer review, organizational resilience assessments, humanitarian coordination system design, and technical assistance to emergency management agencies at all levels. Pricing: from USD 800/day or fixed-cost deliverable-based contracts. Multi-month engagements receive preferential rates. Contact office@worlddisastercenter.org."
  },
  {
    keywords: ["research", "research services", "needs assessment", "policy brief", "situation report", "lessons learned", "impact evaluation"],
    answer: "WDC's Research & Analysis services deliver: real-time situation analysis and crisis reporting, rapid and in-depth needs assessments, post-disaster reviews and lessons learned, policy briefs for government and UN audiences, and programme impact evaluations. WDC researchers have produced reports covering DRC, Burundi, Haiti, Afghanistan, Sudan, and more. Contact office@worlddisastercenter.org."
  },
  {
    keywords: ["tech solutions", "technology solutions", "custom dashboard", "gis service", "early warning design"],
    answer: "WDC's Technology Solutions include: EAGLE (AI disaster impact assessment), custom early warning system design and integration, data dashboards and coordination tools, GIS mapping and satellite imagery analysis, and full technical implementation support. WDC has delivered tech solutions to governments and NGOs across Africa and the Americas."
  },
  {
    keywords: ["services", "what services", "what do you offer", "offerings", "wdc services"],
    answer: "WDC offers four service areas: (1) Training & Capacity Building — free academy to custom in-person workshops; (2) Technology Solutions — EAGLE, early warning systems, GIS, dashboards; (3) Technical Consulting & Advisory — risk assessments, DRR strategies; (4) Research & Analysis — situation reports, needs assessments, policy briefs. Contact office@worlddisastercenter.org to discuss your organization's needs."
  },

  // ── Roster & membership ─────────────────────────────────────────────────────
  {
    keywords: ["roster", "expert roster", "join roster", "apply roster", "talent pool", "deployment opportunity", "get deployed", "humanitarian expert register"],
    answer: "The WDC Expert Roster connects vetted humanitarian professionals with global disaster response deployment opportunities. We welcome disaster experts, engineers, GIS/remote sensing analysts, data scientists, policy advisors, medical professionals, and emergency managers. Apply at worlddisastercenter.org/roster — complete your profile, our admin team reviews and approves it, then you're matched with paid deployment opportunities worldwide."
  },
  {
    keywords: ["membership", "member benefits", "how to join wdc", "become member", "professional membership", "community membership", "ngo membership"],
    answer: "WDC has three membership tiers: (1) Professionals & Specialists — USD 20/year or 10 hours pro bono; benefits include Experts Hub listing, priority event/conference access, eligible for paid project roles. (2) Community Members — FREE; benefits include training, crowdsourcing tasks, mentorship, certificates. (3) NGOs/Humanitarian Organizations — variable fee; includes global network, co-branding, funding opportunities. Visit worlddisastercenter.org/membership."
  },

  // ── Partnerships ────────────────────────────────────────────────────────────
  {
    keywords: ["partner", "partnership", "become partner", "how to partner", "collaborate", "strategic partner", "technical partner"],
    answer: "WDC welcomes strategic, technical, and financial partnerships. To partner, contact office@worlddisastercenter.org or visit worlddisastercenter.org/partnerWithUs. Partners gain access to WDC's global network, co-branding, joint impact projects, and Michael's disaster intelligence. Current partners include the Canadian Government, ESA, Microsoft, UNDP, Google, ESRI, and 50+ others."
  },
  {
    keywords: ["partners list", "who are partners", "current partners", "wdc partners", "list of partners"],
    answer: "WDC's partner ecosystem: Strategic — Canadian Government, ESA, Microsoft, Orange, KaizenMind, Rapid Growth; Implementation — UNDP, Red Crescent (RHA), GHTC (Congo); Technical Sponsors — Google, ESRI, TechSoup; Collaborators — Ada, Code for Africa, Open Development; Financial — Equity; Technology — Avielon, Infinite Future Bank; Payments — Stripe, PayPal. 50+ partners worldwide."
  },

  // ── Field missions & operations ─────────────────────────────────────────────
  {
    keywords: ["field missions", "operations", "where do you work", "wdc operations", "active missions", "countries"],
    answer: "WDC has operated in: DRC/Congo (30-day Kinshasa & Goma mission 2024-25), Burundi ('30 Days of Disaster Challenges' 2025), Haiti/Jamaica/Cuba/Bahamas/Dominican Republic (Hurricane Melissa 2025), Afghanistan (6.0 earthquake Kunar Province Aug 2025), Sudan (Central Darfur landslide 2025, 1,000+ deaths). Upcoming 2025-26: Kenya, Rwanda, Nigeria (West Africa expansion), Madagascar."
  },
  {
    keywords: ["drc", "congo", "kinshasa", "goma", "democratic republic of congo"],
    answer: "WDC completed a 30-day on-ground mission in DRC (December 2024–January 2025) covering Kinshasa and Goma — fighting misinformation, introducing Michael for predictive analytics and early warnings, collaborating with MSF, UNICEF, and the Prime Minister's Office, and conducting community engagement for urban resilience."
  },
  {
    keywords: ["burundi", "30 days challenge", "climb burundi"],
    answer: "WDC's 'CLIMB — 30 Days of Disaster Challenges' mission ran in Burundi (February–March 2025). WDC introduced Michael to aid agencies and government bodies for Early Warning System integration, and met with the Ministry of Interior to address national disaster risk management gaps."
  },
  {
    keywords: ["haiti", "hurricane melissa", "caribbean", "jamaica hurricane", "cuba disaster"],
    answer: "WDC responded to Hurricane Melissa (2025) across the Caribbean: Haiti (Michael + Nova7 for preparedness training and real-time monitoring), Jamaica (rapid damage assessment), Cuba (Michael real-time intelligence extension), Bahamas (at-risk community identification), Dominican Republic (Caribbean-wide impact coordination)."
  },
  {
    keywords: ["afghanistan earthquake", "kunar", "nurgal", "afghanistan disaster"],
    answer: "WDC responded to the 6.0 magnitude earthquake in Kunar Province, Nurgal District, Afghanistan (August 31, 2025) providing access-level situation reporting and real-time monitoring through Michael."
  },
  {
    keywords: ["sudan landslide", "darfur", "sudan disaster", "central darfur"],
    answer: "WDC responded to a devastating landslide in Central Darfur, Sudan (Marrah Mountains, 2025) that killed over 1,000 people — providing real-time situation reporting and impact analysis through Michael."
  },
  {
    keywords: ["kenya", "rwanda", "nigeria", "madagascar", "east africa", "west africa", "upcoming mission"],
    answer: "WDC's upcoming 2025-26 programs: Kenya (East Africa — climate resilience, Michael + Nova7 deployment), Rwanda (climate change community/agriculture impacts, Michael deployment), Nigeria (West Africa expansion — Michael + Nova7 + preparedness training), Madagascar (cyclone early warning, flood monitoring, community resilience)."
  },

  // ── Awards & recognition ────────────────────────────────────────────────────
  {
    keywords: ["award", "recognition", "achievement", "prize", "winner", "finalist", "unfccc award", "people matters award", "habitable"],
    answer: "WDC's key recognitions: (1) UNFCCC AI Innovation Grand Challenge 2024 — Top 10 Finalist globally from hundreds of projects, for AI-driven disaster monitoring and prediction. (2) People Matters Rwanda Awards 2024 — Early Startup Award (December 20, 2024), accepted by CTO David Kabanga. (3) HABITABLE Final Conference 2024 — Michael presented by Forecast Lead Ruth Ndegwa to global climate resilience audience with strong collaboration interest from leading researchers."
  },

  // ── Organization & people ───────────────────────────────────────────────────
  {
    keywords: ["what is wdc", "about wdc", "who is wdc", "what does wdc do", "wdc mission", "wdc organization", "tell me about wdc"],
    answer: "World Disaster Center (WDC) is a global humanitarian technology organization on a mission to end disaster impacts everywhere. Founded by Sapiens Ndatabaye Kanyunyi, WDC builds AI-powered tools (led by Michael), trains humanitarian professionals, deploys field teams to disaster zones, and connects responders through the Expert Roster. Offices in Ottawa (Canada), New York (USA), and Vienna (Austria). Contact: office@worlddisastercenter.org."
  },
  {
    keywords: ["founder", "sapiens", "ndatabaye", "executive director", "ceo", "cto", "david kabanga", "ruth ndegwa", "team", "who leads wdc"],
    answer: "WDC's leadership: Sapiens Ndatabaye Kanyunyi (Founder & Executive Director) — a young humanitarian innovator who built WDC on the belief that 80% of the global population should not remain exposed to disasters. David Kabanga (CTO) — leads Michael's AI architecture, recipient of the People Matters Rwanda Early Startup Award 2024. Ruth Ndegwa (Forecast Lead) — leads WDC's disaster prediction and intelligence products."
  },
  {
    keywords: ["headquarters", "offices", "locations", "where is wdc based", "ottawa", "vienna", "new york"],
    answer: "WDC operates from three global hubs: Ottawa, Canada (primary coordination, international programs & partnerships), New York, USA (UN engagement, international donors, global humanitarian community), and Vienna, Austria (EU institutions, UN Vienna agencies, European humanitarian partners)."
  },
  {
    keywords: ["statistics", "numbers", "key facts", "wdc impact", "scale", "how many countries", "reach"],
    answer: "Key WDC stats: 80% of the global population is exposed to disasters. Michael achieves 87% prediction accuracy (92% for floods) validated on 200+ historical events. 40+ countries served by Michael. 12+ languages supported. 7 free training courses, 27+ modules, 17+ hours of content. 50+ global partners. Three offices: Ottawa, New York, Vienna."
  },

  // ── Contact, donation, website ──────────────────────────────────────────────
  {
    keywords: ["donate", "donation", "support financially", "fund wdc", "contribute money", "paypal donate", "stripe donate"],
    answer: "Support WDC's mission at worlddisastercenter.org via PayPal or Stripe. Every contribution helps expand Michael's coverage, train more humanitarian professionals, and respond to more disasters. WDC also accepts in-kind contributions and long-term investment partnerships — contact office@worlddisastercenter.org."
  },
  {
    keywords: ["contact", "email wdc", "reach wdc", "get in touch", "phone", "social media"],
    answer: "Contact WDC: email office@worlddisastercenter.org | LinkedIn: @worlddisastercenter | X: @W_D_Center | Instagram: @worlddisastercenter | YouTube: @WorldDisasterCenterOffice | Website: worlddisastercenter.org. For partnerships, training requests, or consulting, email office@worlddisastercenter.org."
  },
  {
    keywords: ["offline", "no internet", "low connectivity", "remote area", "sms alert", "radio alert", "low bandwidth"],
    answer: "WDC designs for last-mile accessibility. Michael includes: offline mode (alerts cached locally when internet drops), SMS alert dissemination for communities without smartphones, radio broadcast integration for remote areas, and an interface optimized for low-bandwidth. No one should miss a life-saving warning because of poor connectivity."
  },

  // ── Greetings ───────────────────────────────────────────────────────────────
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy", "sup"],
    answer: "Hello! I'm WDC's AI assistant. I can answer anything about the World Disaster Center — Michael (our disaster monitoring system), training programs, field missions, the Expert Roster, partnerships, career opportunities, or how to get involved. What would you like to know?"
  },
  {
    keywords: ["thank you", "thanks", "appreciate", "helpful", "great answer"],
    answer: "You're very welcome! If you have any more questions about WDC, Michael, our training, or how to join our mission, I'm here. You can also reach the team directly at office@worlddisastercenter.org."
  },
];

// ─── Matching engine ───────────────────────────────────────────────────────────
function findBestAnswer(rawInput) {
  const q = rawInput.toLowerCase().trim();

  // Score each KB entry
  const scored = KB.map(entry => {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q === kw) { score += 20; continue; }
      if (q.includes(kw)) { score += 10; continue; }
      // Check if all words in the keyword appear in the query
      const kwWords = kw.split(" ").filter(w => w.length > 2);
      const matchedWords = kwWords.filter(w => q.includes(w));
      if (matchedWords.length === kwWords.length && kwWords.length > 0) {
        score += 8; // all words matched
      } else if (matchedWords.length > 0) {
        score += matchedWords.length * 3;
      }
    }
    return { score, answer: entry.answer };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  if (best.score >= 3) return best.answer;

  return "I don't have a specific answer for that yet. For detailed information, visit worlddisastercenter.org or email office@worlddisastercenter.org. You can also ask me about: Michael, our training programs, field missions, the Expert Roster, career opportunities, partnerships, or WDC's products and services!";
}

// ─── Claude AI via backend proxy ───────────────────────────────────────────────
const CHAT_API = `${import.meta.env.VITE_ROSTER_API_URL || "https://wdc-roster-backend-lzjl4ttoxq-uc.a.run.app"}/api/chat`;

async function getResponse(userInput) {
  try {
    const res = await fetch(CHAT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch (err) {
    console.warn("AI backend unavailable, using local KB:", err.message);
  }

  return findBestAnswer(userInput);
}

// ─── Flow ──────────────────────────────────────────────────────────────────────
const flow = {
  start: {
    message: "Hello! I'm WDC's AI assistant. Ask me anything — Michael, training, field missions, the Expert Roster, careers, partnerships, or anything about the World Disaster Center!",
    path: "loop",
  },
  loop: {
    message: async (params) => await getResponse(params.userInput),
    path: "loop",
  },
};

// ─── Component ─────────────────────────────────────────────────────────────────
const ChatBotComponent = () => {
  const settings = {
    general: {
      primaryColor: "#126aa5",
      secondaryColor: "#126aa5",
      fontFamily: "Arial, sans-serif",
      embedded: false,
    },
    chatWindow: { defaultOpen: false, showTypingIndicator: true },
    audio: { disabled: true },
    chatHistory: { storageKey: "wdc_assistant_v4" },
    chatButton: { icon: WDCLogo },
    botBubble: {
      showAvatar: true,
      avatar: Bot,
      simulateStream: true,
      streamSpeed: 20,
    },
    header: {
      title: "WDC AI Assistant",
      showAvatar: true,
      avatar: WDCLogo2,
      buttons: [Button.CLOSE_CHAT_BUTTON],
    },
    notification: { volume: 0, showCount: false },
    footer: { text: "World Disaster Center" },
    tooltip: { text: "Ask me anything about WDC!", mode: "START" },
    chatInput: {
      enabledPlaceholderText: "Ask about WDC, Michael, training, roster...",
      botDelay: 600,
    },
  };

  const styles = {
    headerStyle: { background: "#126aa5", color: "#ffffff", padding: "10px" },
    chatWindowStyle: { backgroundColor: "#f2f2f2" },
  };

  return <ChatBot flow={flow} styles={styles} settings={settings} />;
};

export default ChatBotComponent;
