/**
 * campaignDetails.js
 *
 * Extra SITREP (Situation Report) data for each campaign detail page.
 * Keyed by campaign slug.
 *
 * mapCountries severity scale:
 *   1 = monitoring  |  2 = elevated  |  3 = high  |  4 = crisis  |  5 = emergency
 */

export const CAMPAIGN_DETAILS = {

  // ─────────────────────────────────────────────────────────────────────────
  "protect-women": {
    mapCountries: {
      AF: 5, SS: 5, YE: 5, SO: 5, SY: 4, CD: 4, CF: 4, SD: 4,
      ML: 3, NE: 3, NG: 3, ET: 3, MZ: 3, BD: 3, MM: 4, HT: 3, PK: 3,
    },
    mapScale: ["#fce7f3", "#fda4af", "#fb7185", "#e11d48", "#881337"],

    gaps: [
      {
        label: "Humanitarian programs with gender components",
        current: 38,
        target: 100,
        source: "OCHA 2025",
      },
      {
        label: "Countries with gender-responsive DRR law",
        current: 44,
        target: 100,
        source: "UNDRR 2025",
      },
      {
        label: "GBV services funded at recommended level",
        current: 23,
        target: 100,
        source: "UNFPA 2024",
      },
      {
        label: "Women in disaster leadership roles",
        current: 29,
        target: 50,
        source: "UNDP 2025",
      },
    ],

    reliefwebTheme: "Protection",

    latestReport: {
      title: "Gender Vulnerability Index: Crisis Zones 2025",
      date: "June 2025",
      type: "Intelligence Brief",
      summary:
        "Women and girls in the 12 highest-severity countries face compounding risks of displacement, GBV, and legal exclusion that triple their mortality exposure during disasters. The Index calls for mandatory gender disaggregation in all humanitarian needs assessments and a minimum 40% women's representation in coordination clusters.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "70%",
        label: "of disaster deaths are women and girls",
        source: "UNDRR 2024",
      },
      {
        value: "3×",
        label: "higher GBV risk in displacement settings",
        source: "UNFPA 2025",
      },
      {
        value: "200M+",
        label: "women live with no legal protection from domestic violence",
        source: "UN Women 2024",
      },
    ],

    timeline: [
      {
        date: "Jan 2025",
        event: "Gender Risk Index baseline published for 12 priority countries",
        status: "completed",
      },
      {
        date: "Jun 2025",
        event: "GBV rapid-alert integration launched in Michael AI platform",
        status: "completed",
      },
      {
        date: "Oct 2025",
        event: "Gender-responsive DRR policy brief submitted to UNDRR",
        status: "completed",
      },
      {
        date: "Mar 2026",
        event: "Corporate Gender Impact Fund pilot launched with 3 partner companies",
        status: "active",
      },
      {
        date: "Dec 2026",
        event: "WDC Gender Vulnerability Index 2026 global launch",
        status: "planned",
      },
    ],

    videoEmbed: "7QpKgR_oWIU",

    testimonial: {
      quote:
        "When the floods came, the men left to salvage what they could. We stayed with the children and the elderly — and we had no warning, no shelter, no one counting us. WDC's alert system changed that. Now we are the first to know.",
      author: "Amina Hassan, Community Resilience Coordinator, Mogadishu",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "protect-children": {
    mapCountries: {
      SS: 5, AF: 5, YE: 5, SO: 5, CD: 5, SY: 4, NG: 4, CF: 4,
      SD: 4, ML: 3, ET: 3, NE: 3, HT: 4, MM: 4, MZ: 3, BD: 3,
    },
    mapScale: ["#ffedd5", "#fed7aa", "#fb923c", "#f97316", "#c2410c"],

    gaps: [
      {
        label: "Child protection funding gap covered",
        current: 41,
        target: 100,
        source: "UNICEF 2025",
      },
      {
        label: "Countries with child-specific DRR plans",
        current: 31,
        target: 100,
        source: "UNDRR 2025",
      },
      {
        label: "Access to education in emergencies",
        current: 52,
        target: 100,
        source: "UNESCO 2024",
      },
      {
        label: "Trafficking identification rate",
        current: 18,
        target: 100,
        source: "UNODC 2025",
      },
    ],

    reliefwebTheme: "Protection",

    latestReport: {
      title: "Children on the Frontline: Disaster Exposure and Protection Gaps 2025",
      date: "August 2025",
      type: "SITREP",
      summary:
        "An estimated 426 million children now live in conflict or disaster-affected zones, yet fewer than one in three countries has a child-specific disaster risk reduction plan in place. This situation report documents critical protection gaps across education, trafficking prevention, and psychosocial support, urging donor governments to adopt ring-fenced child-protection budget lines.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "426M",
        label: "children living in conflict and disaster zones",
        source: "UNICEF 2025",
      },
      {
        value: "40%",
        label: "of identified trafficking victims are children",
        source: "UNODC 2024",
      },
      {
        value: "1 in 4",
        label: "children worldwide affected by humanitarian crises",
        source: "Save the Children 2025",
      },
    ],

    timeline: [
      {
        date: "Feb 2025",
        event: "Child Vulnerability Mapping deployed across South Sudan and DRC",
        status: "completed",
      },
      {
        date: "Jul 2025",
        event: "Safe Schools Protocol endorsed by 8 partner NGOs",
        status: "completed",
      },
      {
        date: "Nov 2025",
        event: "AI-powered child trafficking early-warning module released",
        status: "completed",
      },
      {
        date: "Apr 2026",
        event: "Child Protection Rapid Response Fund — first disbursement cycle",
        status: "active",
      },
      {
        date: "Jan 2027",
        event: "Global Child Disaster Index 2026 presented at UNICEF Executive Board",
        status: "planned",
      },
    ],

    videoEmbed: "xZlIGdHounQ",

    testimonial: {
      quote:
        "After the cyclone, no one knew where the unaccompanied children were. WDC's system helped us locate 47 children within 72 hours and reunite 31 of them with family. That tool saved lives.",
      author: "Father Jean-Pierre Ndaya, Child Protection Officer, Beira",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "home-for-everyone": {
    mapCountries: {
      SS: 5, SO: 5, AF: 5, SY: 5, CD: 4, SD: 5, MM: 4, NG: 4,
      MZ: 3, HT: 4, CF: 4, ET: 4, ML: 3, VE: 3, UA: 4,
    },
    mapScale: ["#ccfbf1", "#99f6e4", "#2dd4bf", "#0d9488", "#134e4a"],

    gaps: [
      {
        label: "Shelter funding need met",
        current: 34,
        target: 100,
        source: "UNHCR 2025",
      },
      {
        label: "IDP durable solutions achieved",
        current: 12,
        target: 100,
        source: "IDMC 2025",
      },
      {
        label: "Affordable housing access in post-disaster reconstruction",
        current: 27,
        target: 100,
        source: "UN-Habitat 2024",
      },
      {
        label: "Urban displacement response adequately funded",
        current: 38,
        target: 100,
        source: "OCHA 2025",
      },
    ],

    reliefwebTheme: "Shelter and Non-Food Items",

    latestReport: {
      title: "No Place to Return: Durable Shelter Solutions in Protracted Displacement 2025",
      date: "May 2025",
      type: "Vulnerability Report",
      summary:
        "Seventy-one million people remain internally displaced globally, and only 12% have accessed a durable solution within five years of displacement. This report examines why post-disaster reconstruction funding consistently bypasses the most vulnerable urban IDPs, and proposes a community land titling framework piloted in three WDC partner cities.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "71M",
        label: "people internally displaced worldwide",
        source: "IDMC 2025",
      },
      {
        value: "12%",
        label: "of IDPs reach a durable housing solution within 5 years",
        source: "IDMC 2025",
      },
      {
        value: "$16B",
        label: "annual shelter funding gap in humanitarian response",
        source: "UNHCR 2024",
      },
    ],

    timeline: [
      {
        date: "Mar 2025",
        event: "Shelter Needs Assessment toolkit released for urban displacement contexts",
        status: "completed",
      },
      {
        date: "Aug 2025",
        event: "Community Land Titling pilot launched in Juba, Mogadishu, and Port-au-Prince",
        status: "completed",
      },
      {
        date: "Dec 2025",
        event: "Post-Disaster Reconstruction Standards brief submitted to UN-Habitat",
        status: "completed",
      },
      {
        date: "May 2026",
        event: "IDP Housing Finance Mechanism — seed capital mobilization",
        status: "active",
      },
      {
        date: "Feb 2027",
        event: "Home for Everyone Global Summit co-hosted with UN-Habitat in Nairobi",
        status: "planned",
      },
    ],

    videoEmbed: "5pyT6SCAngI",

    testimonial: {
      quote:
        "I was displaced for six years. Six years moving from camp to camp. WDC's land-titling program gave us something no other organization had offered: a legal address. For the first time, I could enroll my children in school without lying.",
      author: "Grace Akello, Internally Displaced Person, Juba",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "girls-in-tech": {
    mapCountries: {
      TD: 5, NE: 5, ML: 4, BF: 4, CF: 4, MZ: 4, MG: 3, MW: 3,
      SD: 3, AF: 5, BD: 3, KH: 3, MR: 4, GN: 3, SO: 3,
    },
    mapScale: ["#ede9fe", "#c4b5fd", "#a78bfa", "#7c3aed", "#4c1d95"],

    gaps: [
      {
        label: "Gender digital divide closed",
        current: 43,
        target: 100,
        source: "ITU 2025",
      },
      {
        label: "Girls completing STEM secondary education",
        current: 38,
        target: 100,
        source: "UNESCO 2025",
      },
      {
        label: "Internet access in rural areas for women",
        current: 29,
        target: 100,
        source: "World Bank 2024",
      },
      {
        label: "Tech workforce gender parity",
        current: 22,
        target: 50,
        source: "WEF 2025",
      },
    ],

    reliefwebTheme: "Education",

    latestReport: {
      title: "Connecting Girls to the Future: Digital Access and STEM Pathways in Fragile States 2025",
      date: "September 2025",
      type: "Intelligence Brief",
      summary:
        "In the 15 most fragile countries, girls are three times less likely than boys to access the internet and four times less likely to complete secondary STEM education, creating compounding cycles of economic exclusion. WDC's Digital Girls Index identifies targeted infrastructure, mentorship, and curriculum investments that could close the gap by 40% within a decade.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "3×",
        label: "less likely for girls to access internet in fragile states",
        source: "ITU 2025",
      },
      {
        value: "259M",
        label: "girls out of school globally, most in conflict zones",
        source: "UNESCO 2024",
      },
      {
        value: "22%",
        label: "women in the global tech workforce",
        source: "WEF 2025",
      },
    ],

    timeline: [
      {
        date: "Apr 2025",
        event: "Digital Girls Index launched covering 40 low-connectivity countries",
        status: "completed",
      },
      {
        date: "Sep 2025",
        event: "50 community tech hubs equipped with solar-powered devices for girls",
        status: "completed",
      },
      {
        date: "Jan 2026",
        event: "Girls in Tech mentorship network — 200 mentors, 1,000 girls enrolled",
        status: "completed",
      },
      {
        date: "Jun 2026",
        event: "STEM curriculum integration pilot in 12 partner schools across 4 countries",
        status: "active",
      },
      {
        date: "Mar 2027",
        event: "Girls in Tech regional innovation challenge — first cohort showcase",
        status: "planned",
      },
    ],

    videoEmbed: "xM4vEQXXKSI",

    testimonial: {
      quote:
        "My mother never learned to read. I learned to code. The WDC hub in our village gave me something I didn't think was possible — a future that I chose for myself.",
      author: "Mariam Traoré, Age 17, Girls in Tech Program, Bamako",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "climate-protect": {
    mapCountries: {
      BD: 5, MV: 5, SB: 5, VU: 5, FJ: 4, PH: 4, MZ: 5, ZW: 4,
      MW: 4, SO: 4, SS: 4, NE: 5, PK: 4, IN: 3, ID: 3, HT: 4, TJ: 3,
    },
    mapScale: ["#dcfce7", "#86efac", "#4ade80", "#16a34a", "#14532d"],

    gaps: [
      {
        label: "Vulnerable communities with functional early warning systems",
        current: 45,
        target: 100,
        source: "WMO 2025",
      },
      {
        label: "Adaptation finance needs met",
        current: 31,
        target: 100,
        source: "UNEP 2025",
      },
      {
        label: "Loss and damage fund disbursed to frontline communities",
        current: 12,
        target: 100,
        source: "COP28 2024",
      },
      {
        label: "Frontline communities with community-led disaster plans",
        current: 28,
        target: 100,
        source: "UNDRR 2025",
      },
    ],

    reliefwebTheme: "Climate Change and Environment",

    latestReport: {
      title: "Climate on the Frontline: Compounding Shocks in the World's Most Exposed Nations 2025",
      date: "November 2025",
      type: "SITREP",
      summary:
        "Seventeen of the 20 countries most exposed to climate disasters are also among the world's 30 most fragile states, meaning climate shocks strike populations with the least capacity to recover. WDC's Climate Frontline Index maps overlapping climate, conflict, and poverty risk to guide pre-emptive investment before the next disaster cycle.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "3.6B",
        label: "people highly vulnerable to climate change impacts",
        source: "IPCC 2024",
      },
      {
        value: "$400B",
        label: "annual adaptation finance gap in developing countries",
        source: "UNEP 2025",
      },
      {
        value: "55%",
        label: "of climate-displaced people are in the world's 20 poorest countries",
        source: "WDC Analysis 2025",
      },
    ],

    timeline: [
      {
        date: "Feb 2025",
        event: "Climate Frontline Index v1 published — 80 country risk profiles",
        status: "completed",
      },
      {
        date: "Jul 2025",
        event: "Early warning integration with WMO Global Multi-Hazard Alert System",
        status: "completed",
      },
      {
        date: "Nov 2025",
        event: "Climate-DRR Policy Compact presented at COP30 side event",
        status: "completed",
      },
      {
        date: "Apr 2026",
        event: "Community Climate Resilience Grants — 60 villages, 6 countries",
        status: "active",
      },
      {
        date: "Oct 2026",
        event: "Climate Frontline Index v2 launch with real-time satellite integration",
        status: "planned",
      },
    ],

    videoEmbed: "796ysvh3KJM",

    testimonial: {
      quote:
        "We used to guess when the cyclone season would start by watching the sea. Now WDC sends us alerts three days in advance. Three days is the difference between life and death for a fishing village.",
      author: "Siosaia Taufa, Community Resilience Leader, Ha'apai, Tonga",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "protect-disabilities": {
    mapCountries: {
      AF: 5, SS: 5, SY: 5, YE: 4, CD: 4, MM: 4, SO: 4,
      HT: 4, NP: 3, PK: 3, CF: 3, ML: 3, ET: 3, MZ: 3,
    },
    mapScale: ["#dbeafe", "#93c5fd", "#60a5fa", "#2563eb", "#1e3a8a"],

    gaps: [
      {
        label: "Countries with inclusive DRR plans",
        current: 22,
        target: 100,
        source: "UNDRR 2025",
      },
      {
        label: "Accessible early warning systems for persons with disabilities",
        current: 18,
        target: 100,
        source: "WMO 2024",
      },
      {
        label: "Disability data collected in humanitarian response",
        current: 34,
        target: 100,
        source: "OCHA 2025",
      },
      {
        label: "Inclusive evacuation routes in high-risk areas",
        current: 26,
        target: 100,
        source: "UNDP 2025",
      },
    ],

    reliefwebTheme: "Protection",

    latestReport: {
      title: "Left Behind: Disability-Inclusive Disaster Risk Reduction — Global Gap Analysis 2025",
      date: "July 2025",
      type: "Vulnerability Report",
      summary:
        "Persons with disabilities are two to four times more likely to die in disasters than their non-disabled peers, yet fewer than one in five countries has an evacuation plan that accounts for mobility, sensory, or cognitive access needs. WDC's Gap Analysis provides the first globally comparable dataset linking disability prevalence to disaster mortality, calling for mandatory disability-inclusion benchmarks in humanitarian financing.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "2–4×",
        label: "higher disaster mortality risk for persons with disabilities",
        source: "WHO / UNDRR 2024",
      },
      {
        value: "1.3B",
        label: "people live with a significant disability globally",
        source: "WHO 2024",
      },
      {
        value: "18%",
        label: "of early warning systems are fully accessible",
        source: "WMO 2024",
      },
    ],

    timeline: [
      {
        date: "Mar 2025",
        event: "Disability-Inclusive DRR framework co-developed with UNDRR and DPOs",
        status: "completed",
      },
      {
        date: "Aug 2025",
        event: "Accessible alert formats integrated into Michael AI — audio, tactile, simplified text",
        status: "completed",
      },
      {
        date: "Dec 2025",
        event: "Global Gap Analysis 2025 launched at UN CRPD Conference of States Parties",
        status: "completed",
      },
      {
        date: "May 2026",
        event: "Inclusive Evacuation Route Mapping — 10 pilot cities across 5 countries",
        status: "active",
      },
      {
        date: "Jan 2027",
        event: "Disability-Inclusive Humanitarian Finance Compact — donor pledging conference",
        status: "planned",
      },
    ],

    videoEmbed: "Nef5RbBpOB0",

    testimonial: {
      quote:
        "I am deaf. When the earthquake sirens went off, I didn't hear them. My neighbor knocked on my door — but what if she hadn't? WDC's vibration alert on my phone is the first warning system that actually works for me.",
      author: "Dilnoza Yusupova, Disability Rights Advocate, Dushanbe",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "safe-communities": {
    mapCountries: {
      NG: 5, ML: 5, CF: 5, SS: 5, SO: 5, SD: 4, CD: 4, MX: 4,
      GT: 3, HN: 3, SV: 3, KE: 3, ET: 3, BF: 4, TZ: 3,
    },
    mapScale: ["#e0e7ff", "#a5b4fc", "#818cf8", "#4f46e5", "#312e81"],

    gaps: [
      {
        label: "Violence prevention programs adequately funded",
        current: 44,
        target: 100,
        source: "UNODC 2025",
      },
      {
        label: "Post-disaster community security plans in place",
        current: 31,
        target: 100,
        source: "UNDP 2025",
      },
      {
        label: "Inter-community conflict resolution mechanisms functioning",
        current: 29,
        target: 100,
        source: "UN Peacebuilding 2024",
      },
      {
        label: "Community early warning networks operational",
        current: 38,
        target: 100,
        source: "OCHA 2025",
      },
    ],

    reliefwebTheme: "Safety and Security",

    latestReport: {
      title: "Safety Under Siege: Community Security in Conflict-Affected Urban Areas 2025",
      date: "October 2025",
      type: "SITREP",
      summary:
        "In 23 conflict-affected cities monitored by WDC, gang violence, armed group activity, and state-security absence combine to create compounded insecurity that undermines disaster response and reconstruction. This SITREP maps violence hotspots and presents a community-led safety model successfully piloted in Maiduguri and San Pedro Sula that reduced incident rates by 34% within 18 months.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "2B",
        label: "people live in fragile, conflict, or violence-affected settings",
        source: "World Bank 2025",
      },
      {
        value: "34%",
        label: "reduction in violence incidents with WDC community safety model",
        source: "WDC 2025",
      },
      {
        value: "60%",
        label: "of humanitarian access denials linked to community-level insecurity",
        source: "OCHA 2024",
      },
    ],

    timeline: [
      {
        date: "Jan 2025",
        event: "Community Safety Index baseline established for 23 conflict-affected cities",
        status: "completed",
      },
      {
        date: "Jun 2025",
        event: "Community early warning network launched in Maiduguri and San Pedro Sula",
        status: "completed",
      },
      {
        date: "Oct 2025",
        event: "Safe Communities policy brief presented to UN Security Council working group",
        status: "completed",
      },
      {
        date: "Mar 2026",
        event: "Community Safety Model scale-up to 8 additional cities",
        status: "active",
      },
      {
        date: "Nov 2026",
        event: "Safe Communities Global Forum — 40 city governments and 60 NGOs",
        status: "planned",
      },
    ],

    videoEmbed: "bkp_7W3hlWM",

    testimonial: {
      quote:
        "Before, we didn't trust the police and the police didn't trust us. WDC helped us set up a community alert group — neighbors watching out for neighbors. In 18 months, violent incidents in our quarter dropped by half.",
      author: "Ibrahim Coulibaly, Community Safety Coordinator, Bamako",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "reproductive-health-safety": {
    mapCountries: {
      CD: 5, SS: 5, SO: 5, AF: 5, NG: 5, SD: 4, ML: 4, NE: 4,
      CF: 4, MZ: 3, TD: 4, YE: 4, HT: 4, MG: 3,
    },
    mapScale: ["#fce7f3", "#f9a8d4", "#f472b6", "#db2777", "#831843"],

    gaps: [
      {
        label: "Reproductive health services included in humanitarian response",
        current: 28,
        target: 100,
        source: "UNFPA 2025",
      },
      {
        label: "Maternal care access in crisis settings",
        current: 34,
        target: 100,
        source: "WHO 2025",
      },
      {
        label: "Reproductive health kit pre-positioning in at-risk areas",
        current: 42,
        target: 100,
        source: "UNFPA 2024",
      },
      {
        label: "Trained RH providers per 10,000 population in crisis zones",
        current: 31,
        target: 100,
        source: "WHO 2025",
      },
    ],

    reliefwebTheme: "Health",

    latestReport: {
      title: "Crisis Without Care: Reproductive Health Access in Humanitarian Emergencies 2025",
      date: "April 2025",
      type: "Vulnerability Report",
      summary:
        "Maternal mortality rates in humanitarian settings are up to 14 times higher than in stable countries, yet reproductive health remains systematically deprioritized in emergency response budgets. This report documents the gap between MISP (Minimum Initial Service Package) standards and delivery reality in 18 crisis countries, and proposes a pre-positioning financing model to cut kit deployment time from 30 days to 72 hours.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "14×",
        label: "higher maternal mortality risk in humanitarian settings",
        source: "WHO / UNFPA 2024",
      },
      {
        value: "500+",
        label: "women die every day from preventable pregnancy complications in crises",
        source: "UNFPA 2025",
      },
      {
        value: "28%",
        label: "of humanitarian responses include reproductive health from day one",
        source: "UNFPA 2025",
      },
    ],

    timeline: [
      {
        date: "Feb 2025",
        event: "Reproductive Health in Emergencies gap mapping completed for 18 countries",
        status: "completed",
      },
      {
        date: "Jul 2025",
        event: "RH Kit Pre-Positioning Fund established with $4M seed from 3 donors",
        status: "completed",
      },
      {
        date: "Nov 2025",
        event: "72-hour RH deployment protocol piloted in South Sudan and DRC",
        status: "completed",
      },
      {
        date: "Apr 2026",
        event: "RH provider training program — 500 community midwives across 6 countries",
        status: "active",
      },
      {
        date: "Jan 2027",
        event: "Crisis Without Care global advocacy campaign — UNFPA co-launch",
        status: "planned",
      },
    ],

    videoEmbed: "snUowGfOZzI",

    testimonial: {
      quote:
        "I delivered my baby alone in a displacement camp because the clinic had no supplies. My baby survived but I almost didn't. No woman should face that. WDC's kits mean the next mother won't have to.",
      author: "Fatima Al-Rashid, Maternal Health Advocate, Khartoum",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "food-security": {
    mapCountries: {
      YE: 5, SS: 5, SD: 5, SO: 5, AF: 5, MG: 5, MZ: 4, ZW: 4,
      HT: 4, CF: 4, ML: 4, NE: 4, ET: 4, SY: 4, CD: 4,
    },
    mapScale: ["#fefce8", "#fde68a", "#fbbf24", "#ca8a04", "#713f12"],

    gaps: [
      {
        label: "Acute food insecurity response funded",
        current: 38,
        target: 100,
        source: "WFP 2025",
      },
      {
        label: "Early warning to early action mechanism functional",
        current: 24,
        target: 100,
        source: "FEWS NET 2025",
      },
      {
        label: "Food crisis prevention programs at scale",
        current: 19,
        target: 100,
        source: "FAO 2025",
      },
      {
        label: "Nutrition response coverage in IPC Phase 3+ areas",
        current: 44,
        target: 100,
        source: "UNICEF 2025",
      },
    ],

    reliefwebTheme: "Food and Nutrition",

    latestReport: {
      title: "Famine on the Horizon: Global Acute Food Insecurity Outlook 2025–2026",
      date: "December 2025",
      type: "SITREP",
      summary:
        "An estimated 280 million people are acutely food insecure worldwide, with five countries — Yemen, South Sudan, Sudan, Somalia, and Afghanistan — facing famine or famine-like conditions. WDC's Food Security Intelligence Platform integrates FEWS NET, satellite crop monitoring, and conflict data to provide 90-day predictive alerts, enabling pre-emptive food aid positioning before IPC classifications are formally triggered.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "280M",
        label: "people acutely food insecure globally",
        source: "IPC / WFP 2025",
      },
      {
        value: "5",
        label: "countries facing famine or famine-like conditions",
        source: "IPC 2025",
      },
      {
        value: "$16B",
        label: "annual food assistance funding gap",
        source: "WFP 2025",
      },
    ],

    timeline: [
      {
        date: "Jan 2025",
        event: "Food Security Intelligence Platform v1 launched with FEWS NET integration",
        status: "completed",
      },
      {
        date: "Jun 2025",
        event: "90-day predictive food alert system validated against 2024 crisis data",
        status: "completed",
      },
      {
        date: "Oct 2025",
        event: "Early-action pre-positioning triggered for Sudan ahead of lean season",
        status: "completed",
      },
      {
        date: "Mar 2026",
        event: "Food Security Corporate Pledge — 12 agri-business partners commit reserves",
        status: "active",
      },
      {
        date: "Sep 2026",
        event: "Global Food Security Summit side event — WDC Intelligence Platform showcase",
        status: "planned",
      },
    ],

    videoEmbed: "uufNAXmK20Y",

    testimonial: {
      quote:
        "The rains failed for the third year. Normally we would wait for a declaration before anything moved. WDC's alert came 90 days early — the food was already in the warehouse when families started asking for help.",
      author: "Dr. Abebe Girma, Emergency Response Coordinator, WFP Ethiopia",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "digital-safety": {
    mapCountries: {
      NG: 4, PH: 4, KE: 3, BD: 4, ID: 3, IN: 3, GH: 3,
      UA: 5, MM: 5, BY: 4, IR: 4, VE: 3, MX: 3, RU: 4, CN: 3,
    },
    mapScale: ["#cffafe", "#a5f3fc", "#22d3ee", "#0891b2", "#164e63"],

    gaps: [
      {
        label: "Digital literacy programs in crisis and conflict settings",
        current: 29,
        target: 100,
        source: "ITU 2025",
      },
      {
        label: "Platform accountability mechanisms in conflict zones",
        current: 18,
        target: 100,
        source: "UN Special Rapporteur 2025",
      },
      {
        label: "Online safety education access for at-risk populations",
        current: 34,
        target: 100,
        source: "UNICEF 2024",
      },
      {
        label: "Misinformation rapid response capacity in place",
        current: 22,
        target: 100,
        source: "UNESCO 2025",
      },
    ],

    reliefwebTheme: "Safety and Security",

    latestReport: {
      title: "Information as a Weapon: Digital Threats in Conflict and Disaster Settings 2025",
      date: "August 2025",
      type: "Intelligence Brief",
      summary:
        "In 14 active conflict and crisis contexts monitored by WDC, coordinated disinformation campaigns actively undermined evacuation compliance, aid distribution, and ceasefire adherence, with measurable increases in civilian harm as a result. This Intelligence Brief maps disinformation actors, tactics, and amplification networks, and proposes a cross-platform Crisis Information Compact that WDC is presenting to three major social platforms.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "5B+",
        label: "internet users globally, many without digital safety literacy",
        source: "ITU 2025",
      },
      {
        value: "73%",
        label: "of crisis-affected communities encountered harmful misinformation in 2024",
        source: "WDC Survey 2025",
      },
      {
        value: "18%",
        label: "of platforms have active accountability mechanisms in conflict zones",
        source: "UN SR 2025",
      },
    ],

    timeline: [
      {
        date: "Mar 2025",
        event: "Digital Threat Observatory launched — monitoring 14 crisis contexts",
        status: "completed",
      },
      {
        date: "Aug 2025",
        event: "Disinformation Rapid Response Playbook published and shared with UN OCHA",
        status: "completed",
      },
      {
        date: "Jan 2026",
        event: "Crisis Information Compact negotiations opened with 3 major platforms",
        status: "completed",
      },
      {
        date: "Jun 2026",
        event: "Digital Literacy in Emergencies curriculum deployed in 20 partner organizations",
        status: "active",
      },
      {
        date: "Feb 2027",
        event: "Digital Safety Global Standards — submission to ITU plenipotentiary",
        status: "planned",
      },
    ],

    videoEmbed: "BfFG1pOyFjI",

    testimonial: {
      quote:
        "We watched false information travel faster than our evacuation teams. People refused to leave because of what they had seen on social media. WDC's disinformation alert gave us 36 hours to counter the narrative before it cost lives.",
      author: "Lt. Col. Maria Santos, Disaster Risk Reduction Director, Cotabato City",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  "refugee-displaced-protection": {
    mapCountries: {
      SS: 5, SO: 5, AF: 5, SY: 5, CD: 5, SD: 5, MM: 4, NG: 4,
      ET: 4, UG: 3, KE: 3, LB: 4, BD: 4, PK: 4, TR: 3, UA: 5,
    },
    mapScale: ["#fff7ed", "#fed7aa", "#fb923c", "#ea580c", "#7c2d12"],

    gaps: [
      {
        label: "Refugees and IDPs with access to durable solutions",
        current: 14,
        target: 100,
        source: "UNHCR 2025",
      },
      {
        label: "Climate-displaced persons with legal status recognized",
        current: 8,
        target: 100,
        source: "UNHCR 2025",
      },
      {
        label: "Integration programs adequately funded",
        current: 36,
        target: 100,
        source: "IOM 2025",
      },
      {
        label: "Host community support programs funded",
        current: 42,
        target: 100,
        source: "OCHA 2025",
      },
    ],

    reliefwebTheme: "Refugees and Internally Displaced Persons",

    latestReport: {
      title: "120 Million Displaced: Protection Gaps and Durable Solutions in 2025",
      date: "June 2025",
      type: "SITREP",
      summary:
        "For the first time in recorded history, the number of forcibly displaced people worldwide has exceeded 120 million, and the share accessing a durable solution within five years has fallen to a historic low of 14%. WDC's Displacement Protection Index identifies the legal, financial, and political bottlenecks preventing solutions at scale, and presents a Compact for Durable Solutions that has gained the formal endorsement of 11 host governments.",
      link: "/reports",
    },

    keyFacts: [
      {
        value: "120M+",
        label: "people forcibly displaced worldwide — a historic record",
        source: "UNHCR 2025",
      },
      {
        value: "14%",
        label: "of displaced people access a durable solution within 5 years",
        source: "UNHCR 2025",
      },
      {
        value: "8%",
        label: "of climate-displaced persons have recognized legal status",
        source: "UNHCR 2025",
      },
    ],

    timeline: [
      {
        date: "Jan 2025",
        event: "Displacement Protection Index published — 50 country profiles",
        status: "completed",
      },
      {
        date: "Jun 2025",
        event: "Compact for Durable Solutions endorsed by 11 host governments",
        status: "completed",
      },
      {
        date: "Oct 2025",
        event: "Climate Displacement Legal Framework — policy paper submitted to UNHCR ExCom",
        status: "completed",
      },
      {
        date: "Apr 2026",
        event: "Host Community Resilience Fund — $8M mobilized across 6 countries",
        status: "active",
      },
      {
        date: "Dec 2026",
        event: "Global Displacement Solutions Summit — WDC co-organizer with UNHCR and IOM",
        status: "planned",
      },
    ],

    videoEmbed: "eFOSyKZv354",

    testimonial: {
      quote:
        "I have been a refugee for eleven years. In eleven years, no government counted me, no system tracked me, no program was designed for me. WDC looked for us. That alone gave me hope that something would change.",
      author: "Abdul Karim Mansour, Refugee Rights Advocate, Kakuma Camp, Kenya",
    },
  },
};
