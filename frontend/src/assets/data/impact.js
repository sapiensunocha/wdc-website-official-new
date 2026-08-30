import WDCLogo from "../../assets/images/wdclogobg.png";
import GHTCLogo from "../../assets/images/GHTC.jpeg";
import banner from "../../assets/images/workshop_banner.jpg";
import burundi from "../../assets/images/burundi.png";

// Status values used by the map color scale:
//  1 = Completed   → green
//  2 = Active      → amber
//  3 = Response    → OCHA blue
//  4 = Upcoming    → orange
//  5 = HQ/Office   → deep navy (#1C2B39)
//  6 = Network     → slate-gray (#9ca3af)

export const mapCountryCodes = {
  // ── Completed missions ────────────────────────────────────────────────────
  CD: 1,  // DRC              – Completed
  // ── Active operations ────────────────────────────────────────────────────
  BI: 2,  // Burundi          – Active
  NG: 2,  // Nigeria          – Active (NEMA partnership)
  // ── Disaster response ────────────────────────────────────────────────────
  HT: 3,  // Haiti            – Response
  JM: 3,  // Jamaica          – Response
  CU: 3,  // Cuba             – Response
  BS: 3,  // Bahamas          – Response
  DO: 3,  // Dominican Republic – Response
  AF: 3,  // Afghanistan      – Response
  SD: 3,  // Sudan            – Response
  // ── Upcoming missions ────────────────────────────────────────────────────
  RW: 4,  // Rwanda           – Upcoming
  MG: 4,  // Madagascar       – Upcoming
  // ── HQ & Regional Offices ────────────────────────────────────────────────
  CA: 5,  // Canada           – HQ (Ottawa)
  US: 5,  // United States    – HQ (New York)
  AT: 5,  // Austria          – HQ (Salzburg)
  KE: 5,  // Kenya            – Regional Office (Nairobi, East Africa)
  TH: 5,  // Thailand         – Regional Office (Bangkok, SE Asia)
  CL: 5,  // Chile            – Regional Office (Santiago, South America)
  TR: 5,  // Turkey           – Regional Office (Istanbul, Europe/Middle East)
  IN: 5,  // India            – Regional Office (Mumbai, South Asia)
  // ── Board network presence ───────────────────────────────────────────────
  CM: 6,  // Cameroon         – Board (Jonathan Itegwa)
  DE: 6,  // Germany          – Board (Maria Horvat Kohutova)
  MW: 6,  // Malawi           – Board (Dr. Ndifanji Namacha)
  ZA: 6,  // South Africa     – Board (Clint Leander, Johannesburg)
  ML: 6,  // Mali             – Board (Stephen Aksanti, Bamako)
};

// Full country detail records — used in the side panel
export const impactCountries = [
  {
    code: "CD",
    country: "Democratic Republic of Congo",
    continent: "Africa",
    status: "Completed",
    flag: "🇨🇩",
    banner: banner,
    summary:
      "Conducted a comprehensive 30-day on-ground mission in Kinshasa and Goma. Real-time crisis monitoring, fighting misinformation, and introducing AI tool Michael for predictive analytics and early warnings. Collaborated with MSF, UNICEF, Prime Minister's Office; field visits and community engagement for urban resilience.",
    ProjectTitle:
      "Michael: Global Disaster Monitoring and Alert System Implementation",
    CoveragePeriod: "19 December 2024 – 19 January 2025",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: "Global Hub of Technology in Congo (GHTC)",
    tools: ["Michael"],
    link: "https://www.linkedin.com/posts/sapiens-ndatabaye-227425165_wdc-realtimemonitoring-drcrisis-activity-7290352353885523968-wpZ8",
    images: [WDCLogo, GHTCLogo],
    ContactPerson: [
      { name: "Sapiens Ndatabaye", email: "sndatabaye@worlddisastercenter.org" },
      { name: "Ormiel Maganga", email: "magnamwenge@gmail.com" },
    ],
  },
  {
    code: "BI",
    country: "Burundi",
    continent: "Africa",
    status: "Active",
    flag: "🇧🇮",
    banner: burundi,
    summary:
      "Launched the '30 Days of Disaster Challenges' mission. Introduced Michael to aid agencies and government for crisis response and Early Warning Systems. Met with Ministry of Interior officials to address disaster risk management gaps and foster partnerships for resilient communities.",
    ProjectTitle:
      "Michael: Global Disaster Monitoring and Alert System Implementation",
    CoveragePeriod: "3 February 2025 – 3 March 2025",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [
      { name: "Rolande Namegabe", email: "rnamegabe@worlddisastercenter.org" },
      { name: "Sheila Ndamama", email: "sndamama@worlddisastercenter.org" },
    ],
  },
  {
    code: "HT",
    country: "Haiti",
    continent: "Americas",
    status: "Response",
    flag: "🇭🇹",
    banner: null,
    summary:
      "Deployed Michael and Nova7 tools for preparedness training and real-time monitoring. Response to Hurricane Melissa (2025) using Michael extension for situation intelligence, CASH assistance, logistics, and identifying at-risk communities.",
    ProjectTitle: "Hurricane Melissa 2025 – Disaster Response & Preparedness",
    CoveragePeriod: "2025",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "JM",
    country: "Jamaica",
    continent: "Americas",
    status: "Response",
    flag: "🇯🇲",
    banner: null,
    summary:
      "Hurricane Melissa (2025) response: Used Michael extension for rapid damage assessment, real-time monitoring, situation intelligence, logistics, and data-driven decisions for impacted Caribbean communities.",
    ProjectTitle: "Hurricane Melissa 2025 – Rapid Response",
    CoveragePeriod: "2025",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "CU",
    country: "Cuba",
    continent: "Americas",
    status: "Response",
    flag: "🇨🇺",
    banner: null,
    summary:
      "Affected by Hurricane Melissa (2025). Deployed Michael extension for real-time intelligence and humanitarian response coordination, supporting affected communities with up-to-date situational data.",
    ProjectTitle: "Hurricane Melissa 2025 – Disaster Intelligence",
    CoveragePeriod: "2025",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "BS",
    country: "Bahamas",
    continent: "Americas",
    status: "Response",
    flag: "🇧🇸",
    banner: null,
    summary:
      "Hit by Hurricane Melissa (2025). Michael used for situation intelligence, identifying at-risk communities, and supporting relief efforts with real-time data and early-warning capabilities.",
    ProjectTitle: "Hurricane Melissa 2025 – Early Warning Support",
    CoveragePeriod: "2025",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "DO",
    country: "Dominican Republic",
    continent: "Americas",
    status: "Response",
    flag: "🇩🇴",
    banner: null,
    summary:
      "Part of Hurricane Melissa (2025) Caribbean-wide impact. Michael tool applied for real-time monitoring, community risk assessment, and humanitarian response support across affected regions.",
    ProjectTitle: "Hurricane Melissa 2025 – Caribbean Response",
    CoveragePeriod: "2025",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "AF",
    country: "Afghanistan",
    continent: "Asia",
    status: "Response",
    flag: "🇦🇫",
    banner: null,
    summary:
      "Responded to the 6.0 magnitude earthquake (31 August 2025) in Kunar Province, Nurgal District. Conducted an access-level situation report to map affected populations, identify hazard exposure, evaluate accessibility for aid delivery, and support responders with up-to-date information on disaster effects.",
    ProjectTitle: "Afghanistan Earthquake 2025 – Access-Level Situation Report",
    CoveragePeriod: "August – September 2025",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/posts/world-disaster-center_afghanistan-access-level-situation-report-activity-7370729212174827521-5Ixb",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "SD",
    country: "Sudan",
    continent: "Africa",
    status: "Response",
    flag: "🇸🇩",
    banner: null,
    summary:
      "Responded to the devastating landslide in Central Darfur (Marrah Mountains, 2025) that killed over 1,000 people. Provided responders with up-to-date information on the disaster's effects to support relief delivery to impacted communities in a complex conflict zone.",
    ProjectTitle: "Central Darfur Landslide 2025 – Situation Intelligence",
    CoveragePeriod: "2025",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "KE",
    country: "Kenya",
    continent: "Africa",
    status: "HQ",
    flag: "🇰🇪",
    banner: null,
    city: "Nairobi",
    summary:
      "WDC Regional Office for East Africa, based in Nairobi. Focus areas: climate-related disasters, drought, floods, and community resilience. Key partners: African Union, local governments, and regional NGOs. Serves as the coordination hub for all WDC programs across Eastern Africa.",
    ProjectTitle: "WDC East Africa Regional Office",
    CoveragePeriod: "2025–Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC East Africa", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "RW",
    country: "Rwanda",
    continent: "Africa",
    status: "Upcoming",
    flag: "🇷🇼",
    banner: null,
    summary:
      "Listed as a served geography. Part of East Africa regional work addressing climate change impacts on communities, agriculture, and livelihoods. Planned deployment of Michael for early warning systems.",
    ProjectTitle: "East Africa Resilience Program",
    CoveragePeriod: "Planned 2025–2026",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://catalystnow.net/organisations/world-disaster-center/",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "NG",
    country: "Nigeria",
    continent: "Africa",
    status: "Active",
    flag: "🇳🇬",
    banner: null,
    summary:
      "Active strategic partnership with NEMA (National Emergency Management Agency). Deploying the MaiLafiya app with predictive alerts in Hausa, Yoruba, Igbo, and English. Training 50,000 local first responders, establishing 200 Resilience Hubs nationwide with solar energy and digital tools. Target: disaster response in under 24 hours and 5 million active users within 12 months.",
    ProjectTitle: "NEMA–WDC Strategic Partnership: Nigeria Resilient 2025",
    CoveragePeriod: "2025–2026",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: "National Emergency Management Agency (NEMA), Nigeria",
    tools: ["MaiLafiya", "Michael", "Nova7"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "MG",
    country: "Madagascar",
    continent: "Africa",
    status: "Upcoming",
    flag: "🇲🇬",
    banner: null,
    summary:
      "Upcoming mission targeting one of the world's most climate-vulnerable nations. Planned deployment of Michael for cyclone early warning, flood monitoring, and community resilience training across disaster-prone coastal regions.",
    ProjectTitle: "Madagascar Disaster Resilience Mission",
    CoveragePeriod: "Planned 2025–2026",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
  },
  // ── Regional Offices ──────────────────────────────────────────────────────
  {
    code: "TH",
    country: "Thailand",
    continent: "Asia",
    status: "HQ",
    flag: "🇹🇭",
    banner: null,
    city: "Bangkok",
    summary:
      "WDC Regional Office for Southeast Asia, based in Bangkok. Focus areas: floods, tsunamis, and urban disaster resilience. Key partners: ASEAN, UNESCAP, and local disaster risk reduction agencies. Coordinates WDC programs across the broader Southeast Asia region.",
    ProjectTitle: "WDC Southeast Asia Regional Office",
    CoveragePeriod: "2025–Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Southeast Asia", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "CL",
    country: "Chile",
    continent: "Americas",
    status: "HQ",
    flag: "🇨🇱",
    banner: null,
    city: "Santiago",
    summary:
      "WDC Regional Office for South America, based in Santiago. Focus areas: earthquakes, volcanic eruptions, and wildfire management. Key partners: regional governments and research institutions. Serves as the coordination hub for WDC programs across South America.",
    ProjectTitle: "WDC South America Regional Office",
    CoveragePeriod: "2025–Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "EAGLE"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC South America", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "TR",
    country: "Turkey",
    continent: "Europe",
    status: "HQ",
    flag: "🇹🇷",
    banner: null,
    city: "Istanbul",
    summary:
      "WDC Regional Office covering Europe and the Middle East, based in Istanbul. Focus areas: earthquakes, refugee crises, and transboundary disaster risks. Key partners: EU Civil Protection, local agencies, and NGOs. Bridges WDC's European and Middle Eastern operations.",
    ProjectTitle: "WDC Europe & Middle East Regional Office",
    CoveragePeriod: "2025–Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Europe/MENA", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "IN",
    country: "India",
    continent: "Asia",
    status: "HQ",
    flag: "🇮🇳",
    banner: null,
    city: "Mumbai",
    summary:
      "WDC Regional Office for South Asia, based in Mumbai. Focus areas: cyclones, floods, and urban resilience. Key partners: SAARC, local governments, and private sector stakeholders. Coordinates WDC programs across the Indian subcontinent and South Asia.",
    ProjectTitle: "WDC South Asia Regional Office",
    CoveragePeriod: "2025–Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7", "EAGLE"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC South Asia", email: "office@worlddisastercenter.org" }],
  },
  // ── Board network presence ─────────────────────────────────────────────────
  {
    code: "CM",
    country: "Cameroon",
    continent: "Africa",
    status: "Network",
    flag: "🇨🇲",
    banner: null,
    summary:
      "WDC Board Director Jonathan Itegwa is based in Cameroon, where he serves as Head of Mission at Premiere Urgence Internationale. A seasoned humanitarian leader with extensive experience in strategy development and program implementation across Africa.",
    ProjectTitle: "WDC Board Network",
    CoveragePeriod: "Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/in/jonathan-itegwa-965466108/",
    images: [WDCLogo],
    ContactPerson: [{ name: "Jonathan Itegwa", email: "jitegwa@worlddisastercenter.org" }],
  },
  {
    code: "DE",
    country: "Germany",
    continent: "Europe",
    status: "Network",
    flag: "🇩🇪",
    banner: null,
    summary:
      "WDC Board Director Maria Horvat Kohutova is based in Germany. A research consultant specializing in migration, human rights, and project management with over a decade of experience working with international organizations including the Open Society Foundations.",
    ProjectTitle: "WDC Board Network",
    CoveragePeriod: "Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/in/maria-horvat-kohutova/",
    images: [WDCLogo],
    ContactPerson: [{ name: "Maria Horvat Kohutova", email: "mkohutova@worlddisastercenter.org" }],
  },
  {
    code: "MW",
    country: "Malawi",
    continent: "Africa",
    status: "Network",
    flag: "🇲🇼",
    banner: null,
    summary:
      "WDC Board Director Dr. Ndifanji Melia Namacha is based in Malawi. A physician and global health researcher with expertise in digital health, policy development, and donor engagement. Represents WDC's health and humanitarian networks across Southern Africa.",
    ProjectTitle: "WDC Board Network",
    CoveragePeriod: "Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/in/ndifanji-melia-namacha-mbbs-mba-001a62123/",
    images: [WDCLogo],
    ContactPerson: [{ name: "Dr. Ndifanji Namacha", email: "nnamacha@worlddisastercenter.org" }],
  },
  {
    code: "ZA",
    country: "South Africa",
    continent: "Africa",
    status: "Network",
    flag: "🇿🇦",
    banner: null,
    city: "Johannesburg",
    summary:
      "WDC Board Director Clint Leander is based in Johannesburg, South Africa. WDC maintains a network presence in Southern Africa through board leadership, supporting regional disaster management collaboration.",
    ProjectTitle: "WDC Board Network",
    CoveragePeriod: "Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/in/clint-leander/",
    images: [WDCLogo],
    ContactPerson: [{ name: "Clint Leander", email: "clint.leander@here.com" }],
  },
  {
    code: "ML",
    country: "Mali",
    continent: "Africa",
    status: "Network",
    flag: "🇲🇱",
    banner: null,
    city: "Bamako",
    summary:
      "WDC Board Director Stephen Divin Aksanti Marhegeko is based in Bamako, Mali. WDC maintains a West Africa network presence through board leadership, contributing to regional disaster risk reduction efforts across the Sahel region.",
    ProjectTitle: "WDC Board Network",
    CoveragePeriod: "Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael"],
    link: "https://www.linkedin.com/in/stephen-divin-aksanti-marhegeko-78839712b/",
    images: [WDCLogo],
    ContactPerson: [{ name: "Stephen Aksanti", email: "divinstephen.aksanti@gmail.com" }],
  },
  // ── HQ / Office locations ──────────────────────────────────────────────
  {
    code: "CA",
    country: "Canada",
    continent: "Americas",
    status: "HQ",
    flag: "🇨🇦",
    banner: null,
    city: "Ottawa",
    summary:
      "World Disaster Center's Canadian headquarters, located in Ottawa. The Ottawa office serves as the primary coordination hub for WDC's international programs, partnerships, and strategic initiatives.",
    ProjectTitle: "WDC Global Headquarters",
    CoveragePeriod: "Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Headquarters", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "US",
    country: "United States",
    continent: "Americas",
    status: "HQ",
    flag: "🇺🇸",
    banner: null,
    city: "New York",
    summary:
      "WDC's New York office, strategically positioned near the United Nations headquarters. The New York presence enables direct engagement with UN agencies, international donors, and the global humanitarian community.",
    ProjectTitle: "WDC New York Office",
    CoveragePeriod: "Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC New York", email: "office@worlddisastercenter.org" }],
  },
  {
    code: "AT",
    country: "Austria",
    continent: "Europe",
    status: "HQ",
    flag: "🇦🇹",
    banner: null,
    city: "Vienna",
    summary:
      "WDC's Vienna office, located in the heart of Europe and the international organizations community. Vienna serves as WDC's European hub, facilitating engagement with EU institutions, the UN Vienna agencies, and European humanitarian partners.",
    ProjectTitle: "WDC Vienna Office",
    CoveragePeriod: "Ongoing",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7"],
    link: "https://www.linkedin.com/company/worlddisastercenter",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Vienna", email: "office@worlddisastercenter.org" }],
  },
];

// Legacy grouped export (used by old impact page)
export const impact = {
  Completed: impactCountries.filter((c) => c.status === "Completed"),
  "In Progress": impactCountries.filter((c) => c.status === "Active"),
  Response: impactCountries.filter((c) => c.status === "Response"),
  Upcoming: impactCountries.filter((c) => c.status === "Upcoming"),
};
