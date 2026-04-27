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

export const mapCountryCodes = {
  CD: 1,  // DRC          – Completed
  BI: 2,  // Burundi      – Active
  HT: 3,  // Haiti        – Response
  JM: 3,  // Jamaica      – Response
  CU: 3,  // Cuba         – Response
  BS: 3,  // Bahamas      – Response
  DO: 3,  // Dominican Republic – Response
  AF: 3,  // Afghanistan  – Response
  SD: 3,  // Sudan        – Response
  KE: 4,  // Kenya        – Upcoming
  RW: 4,  // Rwanda       – Upcoming
  NG: 4,  // Nigeria      – Upcoming
  MG: 4,  // Madagascar   – Upcoming
  CA: 5,  // Canada       – HQ (Ottawa)
  US: 5,  // United States – HQ (New York)
  AT: 5,  // Austria      – HQ (Vienna)
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
    status: "Upcoming",
    flag: "🇰🇪",
    banner: null,
    summary:
      "Listed as a served geography for disaster and emergency management. Part of East Africa regional efforts on climate impacts, resilience building, and humanitarian information management. Deployment of Michael and Nova7 planned.",
    ProjectTitle: "East Africa Resilience Program",
    CoveragePeriod: "Planned 2025–2026",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7"],
    link: "https://catalystnow.net/organisations/world-disaster-center/",
    images: [WDCLogo],
    ContactPerson: [{ name: "WDC Operations", email: "office@worlddisastercenter.org" }],
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
    status: "Upcoming",
    flag: "🇳🇬",
    banner: null,
    summary:
      "Planned deployment of Michael and Nova7 tools plus preparedness training for disaster management. Nigeria represents a major expansion target in West Africa for WDC's community resilience and early-warning programs.",
    ProjectTitle: "Nigeria Disaster Preparedness Program",
    CoveragePeriod: "Planned 2025–2026",
    ProjectLeaderOrganization: "World Disaster Center (WDC)",
    LocalImplementationOrganization: null,
    tools: ["Michael", "Nova7"],
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
