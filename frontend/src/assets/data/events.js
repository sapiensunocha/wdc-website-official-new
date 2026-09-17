import SAPIENS        from '../../assets/images/events/sapiens_wdc.jpeg'
import ESRI           from '../../assets/images/events/esri_wdc.png'
import DMULUME        from '../../assets/images/events/conference_david.jpeg'
import cifrrica       from '../../assets/images/events/CIFRRICA.jpeg'
import workshop       from '../../assets/images/events/workshop.jpg'
import zainab         from '../../assets/images/events/ZainabScience.jpg'
import liveWorkshop   from '../../assets/images/events/wdc_live_workshop.png'
import linkedinWorkshop from '../../assets/images/events/linkedin_workshop_2.png'

export const eventItems = []

// ── Upcoming events (shown first, with badge) ──
export const eventItemsUpcoming = [

  {
    title: "UN System Data Commons Builders' Day",
    image: zainab,
    description: "UPCOMING · 22 September 2026, New York — WDC joins the United Nations as a featured builder, presenting how MICHAEL AI and the Disaster Heroes network contribute structured disaster intelligence to the UN System Data Commons.",
    link: "",
    doc: [
      { type: "header",    content: "Date: September 22, 2026" },
      { type: "header",    content: "Location: United Nations Headquarters, New York, USA" },
      {
        type: "paragraph",
        content: "The World Disaster Center has been selected as a featured participant in the UN System Data Commons Builders' Day — an exclusive convening of organisations that are actively shaping the shared data infrastructure of the United Nations system. WDC will present how its MICHAEL AI platform, EAGLE early warning system, Global Expert Roster, and Disaster Heroes network generate and contribute structured, interoperable disaster intelligence that serves the entire humanitarian ecosystem."
      },
      {
        type: "paragraph",
        content: "WDC's participation reflects a significant milestone: recognition by the UN system that WDC's data architecture — spanning 142 countries, 138 governments, and 1,840 Disaster Heroes across 135 countries — is ready to feed directly into the Commons and transform how the UN responds to crises."
      },
      {
        type: "list",
        items: [
          "Presentation of WDC's MICHAEL AI platform as a multi-hazard data contributor to UN SDC",
          "Live demonstration of Disaster Heroes field intelligence flowing into standardized UN data schemas",
          "Collaboration sessions with OCHA, WFP, UNHCR, and UNDRR data teams",
          "Announcement of WDC's commitment to open-source disaster intelligence for the UN system",
          "Signing of data-sharing framework with UN partner agencies"
        ]
      },
      {
        type: "quote",
        content: "The UN System Data Commons is not just an infrastructure play — it is the backbone of the world's collective memory of disasters. WDC is honoured to build on it and contribute to it. — Dr. Sapiens Ndatabaye Kanyunyi, Founder & CEO, WDC"
      }
    ]
  },

  {
    title: "WDC Global Disaster Intelligence Summit 2026",
    image: liveWorkshop,
    description: "UPCOMING · 20–22 October 2026, Nairobi — WDC's flagship annual summit brings together 500+ disaster professionals, ministers, UN agency heads, and technology leaders for three days of intelligence, partnerships, and deployment coordination.",
    link: "",
    doc: [
      { type: "header", content: "Date: October 20–22, 2026" },
      { type: "header", content: "Location: Kenyatta International Convention Centre (KICC), Nairobi, Kenya" },
      {
        type: "paragraph",
        content: "The WDC Global Disaster Intelligence Summit is WDC's flagship annual convening — a three-day gathering of the world's leading disaster risk reduction practitioners, government ministers, UN agency heads, technology innovators, and humanitarian partners. The 2026 edition is themed 'Intelligence Without Borders: From Prediction to Protection' and will feature the global launch of EAGLE AI v2 and the expansion of WDC's operations to 200 countries."
      },
      {
        type: "list",
        items: [
          "Global launch of EAGLE AI v2 — 6-hour advance disaster alerts with displacement prediction modelling",
          "Ministerial Roundtable: 20 African government ministers on national disaster data governance",
          "WDC Disaster Heroes Awards — honouring the top Hero per country for 2026",
          "Live MICHAEL AI demonstration: real-time multi-hazard situational awareness across 5 crises",
          "WDC Academy graduation ceremony — first cohort of 5,000 certified disaster professionals",
          "Partnership signing sessions with ESA, UNDRR, World Bank, and 12 national governments",
          "Side events: GIS & Satellite Intelligence Masterclass, Protection Data Standards Workshop"
        ]
      },
      {
        type: "quote",
        content: "This Summit is where prediction meets protection. Every expert in that room represents a community safer from disaster. We are not gathering to talk — we are gathering to act. — Dr. Sapiens Ndatabaye Kanyunyi"
      }
    ]
  },

  {
    title: "COP31 — AI & Climate Disaster Risk Forum",
    image: cifrrica,
    description: "UPCOMING · November 2026, Belém, Brazil — WDC returns to COP as a Climate Champion, presenting EAGLE AI and MICHAEL as the humanitarian sector's most advanced climate-disaster intelligence tools.",
    link: "",
    doc: [
      { type: "header", content: "Date: November 2026" },
      { type: "header", content: "Location: Belém, Pará, Brazil" },
      {
        type: "paragraph",
        content: "Following WDC's landmark keynote at COP29 in Baku (2024), the World Disaster Center returns to the Conference of the Parties as a recognized UNFCCC Climate Champion. At COP31, WDC will lead a dedicated side event on the role of AI-powered early warning systems in closing the climate-disaster gap — presenting MICHAEL and EAGLE as operational proof that the technology to protect communities from climate-driven disasters already exists."
      },
      {
        type: "paragraph",
        content: "WDC will also announce new partnerships with the UNFCCC Technology Executive Committee and present findings from the first year of EAGLE AI v2 deployment, covering climate-linked flood, drought, and cyclone events across 50+ countries."
      },
      {
        type: "list",
        items: [
          "Side event: 'AI Early Warning at Scale — From Data to Deployment in 6 Hours'",
          "EAGLE AI v2 climate performance review: floods, droughts, cyclones across 50+ countries",
          "Partnership announcement with UNFCCC Technology Executive Committee",
          "Presentation of WDC's NDC-aligned climate risk datasets to 50 national governments",
          "Launch of WDC Climate Heroes initiative — targeting 10,000 community climate responders by 2027"
        ]
      },
      {
        type: "quote",
        content: "Climate change is not a future threat. It is the engine of today's disasters. At COP31, WDC will show the world that we already have the tools to stop it from killing people — we just need the will to deploy them. — Dr. Sapiens Ndatabaye Kanyunyi"
      }
    ]
  },

  {
    title: "WDC Africa Resilience Bootcamp — Kigali 2026",
    image: linkedinWorkshop,
    description: "UPCOMING · 1–5 December 2026, Kigali — WDC's first in-person Academy bootcamp on African soil, certifying 250 disaster professionals across 30 countries in GIS, EAGLE operations, community resilience, and Disaster Heroes leadership.",
    link: "",
    doc: [
      { type: "header", content: "Date: December 1–5, 2026" },
      { type: "header", content: "Location: Kigali Convention Centre, Kigali, Rwanda" },
      {
        type: "paragraph",
        content: "The WDC Africa Resilience Bootcamp is the first in a series of four continental in-person training intensives planned for 2026–2027. Over five days, 250 disaster professionals from 30 African countries will be trained and certified across WDC's core competency tracks. The bootcamp is free for all participants; WDC covers tuition, course materials, and digital equipment access."
      },
      {
        type: "list",
        items: [
          "Track 1 — GIS & Satellite Intelligence: QGIS, ArcGIS, drone operations, EAGLE platform operation",
          "Track 2 — Community Resilience: risk assessment facilitation, community mapping, early warning design",
          "Track 3 — Humanitarian Data & AI: KoboToolbox, ODK, Python for disaster data, MICHAEL AI dashboard",
          "Track 4 — Disaster Heroes Leadership: sector coordination, SITREP writing, partner engagement",
          "Graduation & certification ceremony — WDC globally-recognised credentials",
          "Heroes networking dinner: 250 practitioners, 30 countries, one network"
        ]
      },
      {
        type: "quote",
        content: "Africa bears the heaviest burden of climate disasters and the thinnest margin of response capacity. This bootcamp exists to close that gap — one certified Hero at a time."
      }
    ]
  },

]

// ── Past events (recent, impressive, ordered newest first) ──
export const eventItemsPast = [
  {
    title: "UNGA80 — Address to the United Nations General Assembly",
    image: SAPIENS,
    description: "September 2025, New York — Dr. Sapiens Ndatabaye Kanyunyi addressed world leaders at the 80th United Nations General Assembly on the role of AI and human intelligence in ending preventable disaster deaths.",
    link: "",
    doc: [
      { type: "header", content: "Date: September 2025" },
      { type: "header", content: "Location: United Nations Headquarters, New York, USA" },
      {
        type: "paragraph",
        content: "In one of the most significant milestones in WDC's history, Founder and CEO Dr. Sapiens Ndatabaye Kanyunyi delivered an address at the 80th United Nations General Assembly — bringing WDC's vision of AI-powered disaster prevention to the world stage. Speaking before representatives of 193 member states, Dr. Ndatabaye presented MICHAEL, the Crisis Atlas, and the Global Disaster Heroes network as operational solutions available to every government on earth today."
      },
      {
        type: "paragraph",
        content: "The address called for a global commitment to universal early warning coverage by 2027 — aligned with the UN Secretary-General's Early Warnings for All initiative — and announced WDC's commitment to make all disaster intelligence products available free of charge to Least Developed Countries and Small Island Developing States."
      },
      {
        type: "quote",
        content: "No government should face a disaster blind. The data exists. The AI exists. The experts exist. What has been missing is the architecture to connect them — and that is what WDC has built. — Dr. Sapiens Ndatabaye Kanyunyi, UNGA80"
      }
    ]
  },

  {
    title: "Geospatial World Forum 2025 — Rising Star Award",
    image: SAPIENS,
    description: "April 22–25, 2025, Madrid — WDC CEO Dr. Sapiens Ndatabaye named Geospatial World Rising Star 2025 at the Geospatial World Forum, the sector's most prestigious global recognition.",
    link: "",
    doc: [
      { type: "header", content: "Date: April 22–25, 2025" },
      { type: "header", content: "Location: IFEMA Congress Centre, Madrid, Spain" },
      {
        type: "paragraph",
        content: "At the Geospatial World Forum in Madrid — the world's premier gathering of Earth observation, GIS, and spatial intelligence leaders — WDC Founder Dr. Sapiens Ndatabaye was honoured with the Geospatial World Rising Star 2025 award. The award recognizes individuals under 40 who are transforming how geospatial data is used for societal benefit. WDC's MICHAEL platform and EAGLE disaster assessment system were cited as exemplary applications of satellite intelligence for humanitarian outcomes."
      },
      {
        type: "paragraph",
        content: "Dr. Ndatabaye received the award in a ceremony attended by ESA executives, national mapping agency directors, and senior UN officials — and delivered a keynote on WDC's roadmap to cover 200 countries with sub-hour satellite-powered disaster alerts by 2027."
      },
      {
        type: "quote",
        content: "Geospatial data is not geography. It is the science of understanding where people are, what threatens them, and how fast we can reach them. That is all WDC has ever done with it."
      }
    ]
  },

  {
    title: "Esri Developer & Technology Summit",
    image: ESRI,
    description: "March 11–14, 2025, Palm Springs — WDC CEO presented MICHAEL at ESRI's global developer summit, showcasing how Geo-AI is redefining disaster response precision at planetary scale.",
    link: "",
    doc: [
      { type: "header",    content: "Date: March 11–14, 2025" },
      { type: "header",    content: "Location: Palm Springs, California, USA" },
      {
        type: "paragraph",
        content: "WDC's Co-Founder and CEO presented MICHAEL at the Esri Developer & Technology Summit — the world's largest gathering of GIS developers, spatial data scientists, and geospatial product leaders. The presentation focused on WDC's integration of satellite data, AI prediction models, and field-collected human intelligence into a single, actionable disaster response platform."
      },
      {
        type: "paragraph",
        content: "MICHAEL's architecture — built on Esri's ArcGIS platform integrated with USGS, GloFAS, and NASA EONET feeds — was presented as a flagship case study in humanitarian Geo-AI. The session drew standing-room attendance from developers working across climate, emergency management, and government sectors."
      },
      {
        type: "quote",
        content: "Don't miss this chance to hear about WDC's journey in advancing technology for global resilience and how MICHAEL is shaping the future of disaster response."
      }
    ]
  },

  {
    title: "CIFRRICA 2025 — Climate Change Resilience in Africa",
    image: cifrrica,
    description: "February 24–26, 2025, Alexandria — WDC's Head of Research & Digital Innovation presented MICHAEL's AI climate resilience capabilities at the Bibliotheca Alexandrina, demonstrating real-time early warning across African disaster zones.",
    link: "",
    doc: [
      { type: "header", content: "Date: February 24–26, 2025" },
      { type: "header", content: "Location: Bibliotheca Alexandrina & Senghor University, Alexandria, Egypt" },
      {
        type: "paragraph",
        content: "WDC's Head of Research, Analysis and Digital Innovation, David Mulume, presented MICHAEL at CIFRRICA 2025 — the leading African forum on climate change resilience and risk reduction. The presentation demonstrated how WDC's system leverages AI, satellite imagery, and local participatory data to provide real-time climate disaster alerts tailored to African geographic and institutional contexts."
      },
      {
        type: "image",
        src: DMULUME,
        alt: "David Mulume presenting at CIFRRICA 2025",
        caption: "David Mulume, WDC Head of Research & Digital Innovation, at CIFRRICA 2025, Alexandria"
      },
      {
        type: "paragraph",
        content: "The session highlighted WDC's work in 54 African countries, including active deployments responding to Sahel drought, East African flooding, and Central African displacement crises — and drew strong interest from African Union representatives and national disaster management authorities."
      },
      {
        type: "quote",
        content: "Africa does not lack data. Africa lacks systems that turn data into decisions fast enough. MICHAEL was built to close that gap."
      }
    ]
  },

  {
    title: "Workshop on Disaster Resilience — Kinshasa, DRC",
    image: workshop,
    description: "December 23, 2024, Kinshasa — WDC and GHTC (Global Hub of Technology in Congo) unveiled Mickaeli — the DRC localization of MICHAEL — to key government, civil society, and technology stakeholders.",
    link: "",
    doc: [
      { type: "header", content: "Date: December 23, 2024 · 08:30 – 16:30 GMT+1" },
      { type: "header", content: "Location: COTEX Concession No. 63, Avenue Colonel Mondjiba, Kinshasa, DRC" },
      {
        type: "paragraph",
        content: "The World Disaster Center, in partnership with the Global Hub of Technology in Congo (GHTC), unveiled Mickaeli — a locally adapted version of WDC's MICHAEL platform — live from Kinshasa. The workshop brought together DRC government officials, civil society leaders, UN agency representatives, and technology practitioners to explore how AI-powered disaster intelligence can address the DRC's unique and acute humanitarian landscape."
      },
      {
        type: "image",
        src: workshop,
        alt: "WDC Disaster Resilience Workshop, Kinshasa",
        caption: "WDC & GHTC Workshop, Kinshasa, December 2024"
      },
      {
        type: "list",
        items: [
          "In-depth discussions on disaster trends and compounding crises in the DRC",
          "Live demonstration of Mickaeli — real-time alerts tailored to DRC's geographic and linguistic context",
          "Collaborative sessions with OCHA DRC, MONUSCO, and national civil protection authorities",
          "Recognition of local disaster management champions across eastern DRC provinces",
          "Partnership framework signed between WDC and GHTC for ongoing DRC operations"
        ]
      },
      {
        type: "quote",
        content: "The DRC faces some of the world's most complex overlapping crises — conflict, disease, flood, and displacement simultaneously. Mickaeli is built for exactly this reality."
      }
    ]
  }
]

// Legacy alias — keeps existing imports that use eventItemsSpecial working
export const eventItemsSpecial = [...eventItemsUpcoming, ...eventItemsPast]
