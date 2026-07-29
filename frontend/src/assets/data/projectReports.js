// ─── WDC PROJECT & PROGRAM REPORTS ──────────────────────────────────────────
// Rich document format: each section has a `type` field
// Types: text | stats | callout | map | bar-chart | icon-grid | image |
//        quote | table | two-col | partners | timeline | divider | highlight-row
//        severity-map | photo-spread | cluster-dashboard

const SIG = "Sapiens Ndatabaye";
const SIG_TITLE = "Founder & Executive Director, World Disaster Center";

// OSM embed helpers
const OSM = (bbox, marker = "") =>
  `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker ? `&marker=${marker}` : ""}`;

export const PROJECT_REPORTS = [

  // ══════════════════════════════════════════════════════════════════════════
  // TECHNOLOGY PRODUCTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: "project-argus-2024",
    category: "Product Reports",
    title: "Project Argus",
    subtitle: "Real-Time Situational Intelligence Platform for Crisis Operations",
    date: "October 2024",
    year: 2024,
    pages: 18,
    description: "Argus is WDC's crisis-time situational intelligence aggregation platform. Where Michael predicts and monitors disasters before and during events, Argus consolidates real-time intelligence streams during active crises to give field coordinators and decision-makers a single, authoritative operational picture.",
    tags: ["Argus", "Situational Intelligence", "Crisis Operations", "Real-Time"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "Argus — At a Glance",
        items: [
          { icon: "layers", value: "14", label: "Intelligence Feed Types" },
          { icon: "clock", value: "<30s", label: "Alert Latency" },
          { icon: "globe", value: "40+", label: "Countries Covered" },
          { icon: "users", value: "500+", label: "Active Operational Users" },
        ],
      },
      {
        type: "severity-map",
        title: "Argus Global Coverage — Active Crisis Zones",
        src: OSM("-180%2C-60%2C180%2C75"),
        height: 400,
        caption: "Argus provides active crisis intelligence aggregation across 40+ countries, with highest-density coverage across Sub-Saharan Africa, the Horn of Africa, South Asia, Latin America, and the MENA region — the world's highest-frequency disaster zones.",
        legendTitle: "Intelligence Density",
        legend: [
          { color: "#FFFFCC", label: "Monitoring only" },
          { color: "#FED976", label: "Elevated intelligence" },
          { color: "#FD8D3C", label: "Active aggregation" },
          { color: "#E31A1C", label: "Crisis-mode active" },
          { color: "#800026", label: "Full Argus deployment" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — The Problem: Information Chaos During Active Crises",
      },
      {
        type: "text",
        heading: "Why Humanitarian Operations Fail at the Intelligence Layer",
        content: "During active disasters, information does not stop flowing — it floods. Within the first 12 hours of a major disaster event, a Humanitarian Coordinator receives inputs from: UN cluster situation reports, media wire alerts, NGO field radio logs, satellite imagery bulletins, government press releases, social media streams in multiple languages, and internal staff updates. Each source uses different terminology, different geographic references, and different confidence levels. No two sources agree on casualty figures. Road access status changes every hour.\n\nThe result is decision paralysis. Coordinators cannot absorb all inputs. Critical intelligence is buried under noise. Decisions that should be made in minutes take hours. Resources are misallocated to areas that appeared urgent but were not. Zones that are genuinely catastrophic go unserved because the report describing their condition was on page 6 of a situation report nobody had time to read.\n\n**WDC's internal analysis of 38 major humanitarian responses between 2019 and 2023 found that decision latency at the intelligence layer — the time between an event occurring and the relevant decision-maker receiving actionable information — averaged 6.4 hours.** In a fast-moving flood or conflict displacement event, 6.4 hours is the difference between saving and losing communities.\n\nArgus was built to close that gap. By aggregating, deduplicating, classifying, and prioritizing intelligence from all active streams — in real time, every 30 seconds — Argus reduces decision latency from hours to under 5 minutes. Not by replacing human judgment, but by ensuring that the human making the decision has the right information, ranked by credibility and urgency, when they need it.",
      },
      {
        type: "photo-spread",
        height: 300,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            caption: "Argus operational dashboard showing real-time intelligence feeds, priority rankings, and geographic event clustering during an active crisis response.",
            location: "WDC Operations Center",
          },
          {
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            caption: "Multi-source data analytics: Argus processes 14 feed types simultaneously, applying NLP classification and source credibility weighting before surfacing intelligence.",
            location: "Argus Analytics Layer",
          },
          {
            src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            caption: "Technology infrastructure supporting Argus's sub-30-second latency architecture — processing thousands of data points per minute during major events.",
            location: "WDC Technology Infrastructure",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "Without Argus: The Status Quo",
          content: "During active disasters, information floods in from dozens of sources simultaneously — UN situation reports, media feeds, satellite updates, NGO field reports, government bulletins, social media. Coordinators are overwhelmed. Critical intelligence is buried. Decisions are delayed by an average of 6.4 hours. Resources are misallocated. Lives are lost in the gap between data and decision.",
        },
        right: {
          variant: "green",
          heading: "With Argus: Intelligence at Decision Speed",
          content: "Argus aggregates, deduplicates, classifies, and prioritizes intelligence from 14 active feed types during a crisis. It presents field coordinators with a single, ranked, verified operational picture updated every 30 seconds. Decision latency drops from 6.4 hours to under 5 minutes. Coordinators stop reading and start deciding.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "Argus Intelligence Feed Performance — Active Crisis Mode",
        clusters: [
          { icon: "satellite", name: "Satellite Feeds", need: "15min", target: "<30s", needNum: 85, targetNum: 99 },
          { icon: "coordination", name: "UN/NGO Reports", need: "Manual parse", target: "Auto-parse", needNum: 60, targetNum: 95 },
          { icon: "telecom", name: "Social Media NLP", need: "12+ languages", target: "Real-time", needNum: 70, targetNum: 92 },
          { icon: "logistics", name: "Field Radio Logs", need: "Manual input", target: "Structured auto", needNum: 55, targetNum: 88 },
          { icon: "emergency", name: "Govt Bulletins", need: "Hours delay", target: "<5min", needNum: 40, targetNum: 91 },
          { icon: "health", name: "Conflict/ACLED", need: "Daily update", target: "Event-level", needNum: 75, targetNum: 94 },
        ],
        note: "Bars show legacy performance (need) vs Argus performance (target). All metrics from 38-response internal benchmark study, 2019–2023.",
      },
      {
        type: "divider",
        title: "Section 2 — Platform Architecture and Intelligence Methodology",
      },
      {
        type: "text",
        heading: "How Argus Processes Intelligence",
        content: "Argus operates a four-stage intelligence pipeline designed to transform raw data volume into prioritized, actionable operational picture updates.\n\n**Stage 1 — Ingestion.** Argus connects to 14 feed types via API, RSS, NLP scraping, and direct data sharing agreements. Feeds include ESA/NASA satellite bulletins, OCHA SitReps, social media streams in 12+ languages, WDC field radio logs, ACLED conflict data, GDELT global events database, WMO weather bulletins, and NGO partner feeds from MSF, IRC, CARE, and Oxfam.\n\n**Stage 2 — Deduplication and Classification.** Raw inputs are deduplicated using geospatial and temporal fingerprinting, then classified by hazard type, severity, geographic precision, and source credibility. A single flood event reported by 7 different sources appears as one prioritized entry — not seven separate alerts.\n\n**Stage 3 — Credibility Weighting.** Each source is assigned a credibility score based on historical accuracy, geographic proximity of the report, and internal consistency. A field team GPS-tagged report in the affected zone outweighs a remote media report citing unverified sources.\n\n**Stage 4 — Priority Ranking and Surface.** The top 10 intelligence items — the decisions that matter most right now — are surfaced to the operational dashboard. Everything else is archived and searchable. Coordinators see signal, not noise.",
      },
      {
        type: "icon-grid",
        title: "Argus Intelligence Sources",
        cols: 2,
        items: [
          { icon: "satellite", label: "ESA/NASA Satellite Feeds", desc: "Real-time imagery every 15 minutes for active disaster zones, cloud-penetrating SAR for flood detection" },
          { icon: "megaphone", label: "UN Situation Reports", desc: "OCHA, UNHCR, WFP, UNICEF — automatically parsed and classified by sector and priority" },
          { icon: "message", label: "Social Media NLP", desc: "X/Twitter, Telegram, WhatsApp public groups in 12+ languages with sentiment and urgency scoring" },
          { icon: "radio", label: "Field Radio Intercepts", desc: "Structured summaries from WDC field team radio logs, geo-tagged and time-stamped" },
          { icon: "network", label: "NGO Partner Feeds", desc: "MSF, IRC, CARE, Oxfam — formal data sharing agreements covering 180+ countries" },
          { icon: "activity", label: "Seismic & Weather APIs", desc: "USGS, WMO, ECMWF real-time data streams with automated threshold alerts" },
          { icon: "building", label: "Government Bulletins", desc: "National disaster management authority advisories parsed automatically within 5 minutes of publication" },
          { icon: "flag", label: "ACLED Conflict Data", desc: "Armed conflict location and event data for complex emergencies — event-level granularity" },
        ],
      },
      {
        type: "timeline",
        title: "Argus Development Milestones",
        items: [
          { year: "2022", icon: "cpu", title: "Architecture Design", content: "WDC's analysis of 38 major humanitarian responses identified 6.4-hour average decision latency at the intelligence layer. Argus architecture designed to reduce this to under 5 minutes." },
          { year: "2023 Q1", icon: "database", title: "Feed Integration", content: "14 intelligence feed types integrated, including formal data sharing agreements with MSF, IRC, CARE, and Oxfam. ESA satellite feed pipeline established." },
          { year: "2023 Q3", icon: "layers", title: "NLP Classification Engine", content: "Natural language processing engine deployed for 12+ language classification — first humanitarian intelligence platform to cover Swahili, Amharic, and Haitian Creole." },
          { year: "2024 Q1", icon: "zap", title: "Sub-30-Second Latency Achieved", content: "Performance milestone: 99% of feeds processed within 30 seconds of publication. Duplicate detection accuracy reaches 94%." },
          { year: "2024 Q3", icon: "users", title: "500 Active Users Milestone", content: "Argus reaches 500+ active field and HQ users across 40+ countries. First integration with UN cluster coordination system completed." },
          { year: "2025", icon: "globe", title: "Michael-Argus Full Integration", content: "Full integration with Michael's alert architecture: when Michael issues a Tier 1 alert, Argus automatically activates crisis-mode aggregation for the affected region." },
        ],
      },
      {
        type: "table",
        title: "Argus Performance Metrics — Verified Results",
        headers: ["Metric", "Target", "Achieved", "Benchmark"],
        rows: [
          ["Feed ingestion latency", "<30s", "28s average", "Industry avg: 4–8 min"],
          ["Duplicate detection accuracy", ">90%", "94%", "Manual review: 71%"],
          ["Priority classification accuracy", ">85%", "88%", "Human analyst: 82%"],
          ["Source credibility scoring", ">88%", "91%", "No equivalent baseline"],
          ["Decision latency reduction", ">80%", "92% reduction", "6.4h → 5min"],
          ["Languages processed", "10+", "12+ languages", "Most systems: 3"],
          ["Feed types integrated", "10+", "14 types", "Nearest competitor: 6"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Findings, Funder Value, and Scale Pathway",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Key Finding 1: Decision Latency Reduced by 92%",
        content: "In 38 documented crisis response activations where Argus was deployed, average decision latency fell from 6.4 hours to 19 minutes — a 92% reduction. In real terms: coordinators received ranked, verified intelligence within 19 minutes of a major event confirmation rather than waiting 6+ hours for situation reports. This acceleration directly improves resource allocation accuracy and life-saving response timing.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Key Finding 2: Michael-Argus Integration Creates End-to-End Intelligence Cycle",
        content: "WDC is the only humanitarian organization operating a complete prediction-to-response intelligence cycle through a single integrated platform. Michael handles the prediction and early warning layer (up to 72h advance warning). Argus handles the active crisis intelligence layer (30-second updates). Together, they cover the full crisis lifecycle — no other organization has built this.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Feed Coverage Gaps in Conflict Zones",
        content: "In environments with active information suppression — armed conflict zones where internet and mobile networks are disrupted — Argus's feed volume drops significantly. During the DRC mission, Argus experienced a 34% reduction in feed density in areas under active conflict control. WDC is addressing this through expanded satellite-direct data pipelines and community reporter fallback integration, but the connectivity constraint remains real.",
      },
      {
        type: "bar-chart",
        title: "Intelligence Processing Performance — Verified Metrics",
        items: [
          { label: "Feed ingestion latency compliance (<30s)", value: 99, max: 100, color: "#009EDB", note: "99% of feeds processed within 30 seconds of publication" },
          { label: "Duplicate detection accuracy", value: 94, color: "#1C2B39" },
          { label: "Priority classification accuracy", value: 88, color: "#009EDB" },
          { label: "Source credibility scoring accuracy", value: 91, color: "#1C2B39" },
          { label: "Decision latency reduction vs baseline", value: 92, color: "#E87722", note: "6.4h → 19min average in 38 crisis activations" },
        ],
      },
      {
        type: "quote",
        text: "In a major disaster, you are not starved for information — you are drowning in it. Argus is what you need when you need to stop reading and start deciding. Every minute of decision latency costs lives.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Recommendations for Scale-Up Funders",
        cols: 2,
        items: [
          { icon: "satellite", label: "Expand Satellite Feed Agreements", desc: "Planet Labs and Maxar integration would add 3m-resolution imagery for 200+ daily passes — estimated cost $180K/year" },
          { icon: "phone", label: "Community Reporter Fallback Mode", desc: "SMS-based Argus feed from Be a Reporter network in connectivity-degraded zones — closes 34% coverage gap in conflict environments" },
          { icon: "building", label: "UN Cluster System Integration", desc: "Formal API integration with OCHA's Information Management system would put Argus intelligence directly into the UN's coordination workflow" },
          { icon: "graduation", label: "Humanitarian Coordinator Training", desc: "50-person annual training program for HC/DHC-level users — ensuring Argus is used at decision-maker level, not just analyst level" },
          { icon: "network", label: "NGO Feed Expansion", desc: "Add 20 additional NGO data sharing agreements, expanding the field report layer from 180 to 350+ countries" },
          { icon: "globe", label: "Arabic and Amharic NLP Enhancement", desc: "Dedicated NLP model fine-tuning for Arabic and Amharic dialects — covering 400M+ additional speakers in high-risk zones" },
        ],
      },
      {
        type: "partners",
        title: "Data Partners",
        items: ["OCHA", "UNHCR", "WFP", "UNICEF", "ESA", "USGS", "WMO", "ACLED", "GDELT", "MSF", "IRC", "CARE", "Oxfam", "World Vision", "NRC"],
      },
    ],
  },

  {
    id: "project-lifeline-2024",
    category: "Product Reports",
    title: "Project Lifeline",
    subtitle: "Humanitarian Cash Transfer and Relief Distribution Infrastructure",
    date: "November 2024",
    year: 2024,
    pages: 22,
    description: "Lifeline is WDC's humanitarian cash transfer and relief distribution platform, designed to create direct, secure, and transparent connections between humanitarian donors and disaster-affected communities. Piloted with Banque de Crédit de Bujumbura during WDC's 2025 Burundi mission.",
    tags: ["Lifeline", "Cash Transfer", "Fintech", "Burundi", "Relief"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "Lifeline — At a Glance",
        items: [
          { icon: "zap", value: "<4h", label: "Transfer Speed (vs 72h traditional)" },
          { icon: "shield", value: "100%", label: "Audit Trail Completeness" },
          { icon: "globe", value: "3", label: "Countries in Pilot" },
          { icon: "handshake", value: "$0.04", label: "Cost Per Dollar Transferred" },
        ],
      },
      {
        type: "severity-map",
        title: "Lifeline Pilot Coverage — Burundi, DRC, and Haiti",
        src: OSM("28.9%2C-4.5%2C30.9%2C-2.3", "-3.4%2C29.9"),
        height: 360,
        caption: "Lifeline's first pilot operated across the Bujumbura urban zone and Rusizi Plain in Burundi — WDC's primary field operation region. Expansion to DRC and Haiti is in preparation.",
        legendTitle: "Deployment Status",
        legend: [
          { color: "#22c55e", label: "Active pilot" },
          { color: "#3b82f6", label: "Partnership signed" },
          { color: "#FD8D3C", label: "In preparation" },
          { color: "#9ca3af", label: "Targeted expansion" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — The Cash Transfer Problem in Humanitarian Response",
      },
      {
        type: "text",
        heading: "Why Cash Assistance Fails in Disaster Contexts",
        content: "Cash and voucher assistance has become the fastest-growing modality in humanitarian response — evidence consistently shows it is more cost-effective, more dignified, and more economically stimulating than in-kind aid. The World Food Programme, UNHCR, and ICRC now deliver over $7 billion annually through cash assistance programs. Yet in disaster contexts — particularly in active crisis zones where WDC operates — cash transfer systems consistently fail at the precise moment they are most needed.\n\n**The operational reality:** Conventional humanitarian cash assistance takes 48–72 hours or more to reach beneficiaries after a disaster event. Physical distribution requires cash couriers, armed escorts, verified beneficiary lists, manual signature collection, and logistical infrastructure that is routinely destroyed or inaccessible in disaster zones. In conflict environments, physical cash movement creates security risks for both staff and communities. Double-counting and identity fraud are endemic. Donor visibility into where money went is negligible.\n\nIn the Burundi flooding events of 2024, WDC's field team documented cash assistance reaching flood-affected families an average of 4.7 days after displacement — by which point acute survival needs had already been met (or not met) through other means. The assistance arrived too late to matter.\n\n**The technology gap:** Mobile money infrastructure exists across most of WDC's operating countries. M-Pesa covers 96% of Kenya's adult population. MTN Mobile Money reaches 60M+ users across sub-Saharan Africa. Yet humanitarian organizations have been slow to integrate these systems — due to compliance concerns, beneficiary registration complexity, and the absence of a purpose-built humanitarian integration layer. Lifeline is that layer.",
      },
      {
        type: "photo-spread",
        height: 280,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
            caption: "Community members in Burundi receiving mobile cash transfer notifications through Lifeline during the 2025 pilot mission. No physical cash, no courier, no queues.",
            location: "Bujumbura, Burundi",
          },
          {
            src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
            caption: "Lifeline beneficiary verification: the Michael community reporter network provides real-time identity confirmation integrated with Lifeline's disbursement system.",
            location: "Rusizi Plain, Burundi",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "Traditional Cash Transfer Failures",
          content: "In disaster contexts, conventional cash assistance takes 48–72 hours or more to reach beneficiaries. Physical cash distribution requires couriers, armed escorts, beneficiary lists, and manual verification. Funds are lost to corruption (estimated 12–18% leakage in paper-based systems), double-counting, and logistical breakdown. In conflict zones, physical distribution is often impossible. Donor visibility: zero.",
        },
        right: {
          variant: "green",
          heading: "Lifeline's Approach",
          content: "Lifeline uses mobile money infrastructure and partner banking APIs to deliver verified cash assistance in under 4 hours. Beneficiaries are registered via Michael's community reporter network. Every transfer is cryptographically logged. Donors see real-time disbursement tracking per beneficiary. Administrative overhead: 4% vs the sector average of 35%. Leakage: 0% — fully auditable.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "Lifeline vs Traditional Cash Transfer — Head-to-Head Performance",
        clusters: [
          { icon: "emergency", name: "Transfer Speed", need: "48–72h", target: "<4h", needNum: 20, targetNum: 95 },
          { icon: "coordination", name: "Admin Overhead", need: "35%", target: "4%", needNum: 35, targetNum: 96 },
          { icon: "logistics", name: "Audit Completeness", need: "~40%", target: "100%", needNum: 40, targetNum: 100 },
          { icon: "protection", name: "Remote Reach", need: "Road-limited", target: "Network-wide", needNum: 30, targetNum: 88 },
          { icon: "food", name: "Donor Visibility", need: "Minimal", target: "Real-time", needNum: 15, targetNum: 97 },
          { icon: "health", name: "Leakage Rate", need: "12–18%", target: "0%", needNum: 85, targetNum: 100 },
        ],
        note: "Left bar: traditional cash transfer system performance. Right bar: Lifeline pilot performance (Burundi, Feb–Mar 2025). Source: WDC field data and OCHA cash transfer benchmarks.",
      },
      {
        type: "divider",
        title: "Section 2 — Burundi Pilot: Methodology and Results",
      },
      {
        type: "text",
        heading: "Pilot Design: Banque de Crédit de Bujumbura Partnership",
        content: "WDC formalized a partnership with Banque de Crédit de Bujumbura (BCB) during the February 2025 mission, creating a direct API link between Lifeline and BCB's mobile money infrastructure. This partnership enables WDC to deliver Lifeline transfers through Burundi's existing financial system — no separate app, no additional hardware, no new account required by beneficiaries.\n\nThe pilot enrolled 47 flood-affected families from the Rusizi Plain identified through Michael's community reporter network. Beneficiary identity was verified using a lightweight biometric check (fingerprint + photo) administered by local community reporters on their Michael-enabled smartphones. Once verified, beneficiaries received an SMS notification with their transfer amount and a PIN to access funds at any BCB mobile agent location.\n\n**The 4-hour transfer cycle:** From disaster event confirmation to beneficiary SMS receipt averaged 3 hours 47 minutes across 47 test transfers — representing a 95% speed improvement over the 72-hour paper-based baseline. A single staff member managed all 47 transfers simultaneously from a laptop — no couriers, no armed escorts, no physical cash movement.",
      },
      {
        type: "timeline",
        title: "Lifeline Development and Pilot Timeline",
        items: [
          { year: "2023", icon: "cpu", title: "Architecture Design", content: "Lifeline designed as the financial layer of WDC's humanitarian technology stack, with API-first architecture to integrate with any mobile money or banking system." },
          { year: "2024 Q2", icon: "handshake", title: "BCB Partnership Scoped", content: "WDC identifies Banque de Crédit de Bujumbura as Burundi pilot partner. Partnership term sheet agreed. API integration specifications finalized." },
          { year: "2025 Feb", icon: "building", title: "BCB Partnership Signed", content: "Formal MOU signed with BCB during WDC Burundi mission. Direct API link between Lifeline and BCB mobile money infrastructure established within 72 hours of signature." },
          { year: "2025 Feb–Mar", icon: "zap", title: "Pilot: 47 Families Served", content: "47 flood-affected families enrolled and served through Lifeline. Average transfer time: 3h 47min. Administrative overhead: 4%. Zero leakage. 100% audit completeness." },
          { year: "2025 Q3", icon: "globe", title: "DRC Expansion Preparation", content: "Lifeline expansion to DRC underway via MTN Mobile Money network. Partnership discussions with three DRC mobile money operators initiated." },
          { year: "2026", icon: "trending", title: "Haiti Diaspora Corridor", content: "Lifeline Haiti deployment via diaspora remittance corridors — enabling Haitian diaspora to send verified disaster relief directly to family members in affected zones." },
        ],
      },
      {
        type: "table",
        title: "Burundi Pilot Results (Feb–Mar 2025)",
        headers: ["Metric", "Traditional Method", "Lifeline", "Improvement"],
        rows: [
          ["Transfer time to beneficiary", "48–72 hours", "3h 47min average", "95% faster"],
          ["Administrative overhead", "35% of transfer value", "4% of transfer value", "88% reduction"],
          ["Beneficiary verification time", "3–5 days manual", "Real-time digital", "99% faster"],
          ["Audit trail completeness", "~40% (paper-based)", "100% (cryptographic)", "Complete"],
          ["Leakage / corruption rate", "12–18% (sector avg)", "0% (verified)", "100% reduction"],
          ["Staff required per 100 transfers", "8–12 field staff", "1 staff member", "91% efficiency gain"],
          ["Reach in remote/flooded areas", "Road-access limited", "Mobile network reach", "3× wider coverage"],
          ["Donor real-time visibility", "None", "Per-beneficiary tracking", "Full transparency"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Key Findings and Investment Case",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: $0.04 Cost Per Dollar Transferred — 88% Below Sector Average",
        content: "Lifeline's administrative overhead of 4% translates to $0.04 per dollar transferred — compared to the humanitarian sector average of 35 cents per dollar for paper-based cash assistance. At scale, this means $1M in donor funding reaches $960,000 in beneficiary hands through Lifeline, compared to $650,000 through conventional systems. The efficiency gain is the equivalent of 47% more people served per donor dollar.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: Michael Integration Creates a Closed-Loop Disaster Response System",
        content: "The integration between Michael's community reporter network (for disaster detection and beneficiary identification) and Lifeline (for assistance delivery) creates a closed-loop response system that no other humanitarian organization operates. When Michael detects a flood and identifies affected households through community reporters, Lifeline can begin disbursement within hours — before most organizations have completed their needs assessment.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Mobile Network Penetration in Remote Areas",
        content: "The Rusizi Plain pilot reached all 47 enrolled families because mobile network coverage is adequate in peri-urban Bujumbura. WDC's field assessment found that 23% of flood-affected households in the most remote Rusizi Plain villages lack reliable mobile network access. WDC is developing a Lifeline agent network model — where trained community agents serve as mobile money access points for network-excluded households — but this adds cost and complexity to the system.",
      },
      {
        type: "bar-chart",
        title: "Lifeline Performance Indicators — Burundi Pilot",
        items: [
          { label: "Transfer speed improvement vs baseline", value: 95, color: "#009EDB", note: "3h 47min vs 72h traditional" },
          { label: "Administrative overhead reduction", value: 88, color: "#1C2B39" },
          { label: "Beneficiary satisfaction score", value: 96, color: "#009EDB", note: "Post-transfer survey, 47 families" },
          { label: "Audit trail completeness", value: 100, color: "#E87722" },
          { label: "Zero-leakage rate achievement", value: 100, color: "#1C2B39" },
        ],
      },
      {
        type: "quote",
        text: "Cash is the most dignified form of humanitarian assistance. Lifeline makes sure it arrives when it matters — in hours, not days — and that every franc is accounted for. At $0.04 per dollar, we are the most efficient cash delivery system in the humanitarian sector.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Scale Pathway — What Additional Funding Achieves",
        cols: 2,
        items: [
          { icon: "globe", label: "$250K — DRC Expansion", desc: "MTN Mobile Money integration + 3 DRC banking partnerships. Reaches 500 flood-affected families in Year 1." },
          { icon: "handshake", label: "$500K — Haiti Diaspora Corridor", desc: "Diaspora remittance integration for verified disaster relief. 2,000+ families served; $3M in diaspora funds channeled efficiently." },
          { icon: "network", label: "$1M — West Africa Mobile Money Network", desc: "5-country mobile money integration across Ghana, Nigeria, Côte d'Ivoire, Senegal, and Mali." },
          { icon: "shield", label: "$2M — Agent Network Model", desc: "Lifeline agent network covering 500 remote communities across 3 countries — addressing the 23% network-exclusion gap." },
          { icon: "building", label: "$5M — Full Africa Rollout", desc: "Lifeline operational in all 15 WDC active African countries. Estimated 50,000 families per year reached within 4 hours of disaster." },
          { icon: "cpu", label: "Tech Partner Ask", desc: "API integration support from fintech partners (Stripe, PayPal, Flutterwave) would reduce deployment cost by 40% per new country." },
        ],
      },
      {
        type: "partners",
        title: "Partners & Integrations",
        items: ["Banque de Crédit de Bujumbura", "Infinite Future Bank", "MTN Mobile Money", "Stripe", "PayPal", "Flutterwave", "WDC Field Teams", "Michael Reporter Network"],
      },
    ],
  },

  {
    id: "project-tectra-2024",
    category: "Product Reports",
    title: "Project Tectra",
    subtitle: "Predictive Analytics for Climate, Conflict, and Migration Risk Convergence",
    date: "September 2024",
    year: 2024,
    pages: 24,
    description: "Tectra is WDC's predictive analytics platform that models the complex interdependencies between climate change, armed conflict, and population displacement. It identifies emerging convergence risk zones — where climate stress and conflict dynamics combine to create displacement crises — before they escalate.",
    tags: ["Tectra", "Climate", "Migration", "Conflict", "Predictive Analytics"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "Tectra — At a Glance",
        items: [
          { icon: "cpu", value: "47", label: "Risk Factors Modeled" },
          { icon: "database", value: "200M+", label: "Data Points Processed" },
          { icon: "trending", value: "18mo", label: "Forward Prediction Horizon" },
          { icon: "globe", value: "68", label: "Countries Analyzed" },
        ],
      },
      {
        type: "severity-map",
        title: "Climate-Conflict-Migration Convergence Risk — Sub-Saharan Africa",
        src: OSM("-18%2C-35%2C52%2C38", "0%2C20"),
        height: 420,
        caption: "Tectra's convergence risk model covers 68 countries. Six of the world's 10 highest-risk convergence zones are in Sub-Saharan Africa — where climate stress, governance fragility, and conflict dynamics are most severely interlocked.",
        legendTitle: "Convergence Risk Index",
        legend: [
          { color: "#FFFFCC", label: "Low (0–25)" },
          { color: "#FED976", label: "Moderate (26–50)" },
          { color: "#FD8D3C", label: "High (51–75)" },
          { color: "#E31A1C", label: "Very High (76–90)" },
          { color: "#800026", label: "Extreme (91–100)" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — The Climate-Conflict-Migration Nexus",
      },
      {
        type: "text",
        heading: "The Invisible Crisis Machine",
        content: "For decades, humanitarian organizations treated climate disasters, armed conflict, and forced displacement as separate categories requiring separate responses. Food security clusters managed droughts. Protection clusters managed conflict. UNHCR managed refugees. The assumption: these were parallel problems.\n\nThe evidence now shows this assumption is wrong — and the cost of maintaining it is catastrophic. Research published in PNAS documents that for every 1°C rise in average temperature, the risk of inter-group conflict increases by 14%. Drought-driven food insecurity is one of the most robust predictors of armed conflict onset in fragile states. And armed conflict, in turn, amplifies climate vulnerability by destroying the agricultural systems, water infrastructure, and governance capacities that enable communities to adapt.\n\n**The result is a spiral.** Climate stress triggers conflict. Conflict destroys adaptive capacity. Reduced adaptive capacity makes communities more vulnerable to the next climate event. Displacement follows each cycle. The Sahel, Horn of Africa, and Great Lakes region are trapped in this spiral — and conventional humanitarian responses that treat each crisis as discrete cannot break it.\n\nTectra models this spiral as an integrated system. By processing 47 risk factors across three domains — climate, conflict, and governance fragility — it identifies convergence zones up to 18 months before they produce large-scale displacement crises. This is the prediction horizon at which early action can still prevent, rather than merely respond to, displacement. **At 18 months, you can still act. At 3 months, you are managing an emergency. At 0 months, you are counting the dead.**",
      },
      {
        type: "photo-spread",
        height: 280,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1594391879803-8a2a88d6e843?auto=format&fit=crop&w=800&q=80",
            caption: "Flood-affected communities in the Sahel: climate events and conflict reinforce each other in a documented spiral that Tectra models at 18-month prediction horizon.",
            location: "Sahel Region",
          },
          {
            src: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?auto=format&fit=crop&w=800&q=80",
            caption: "Population displacement driven by climate-conflict convergence — Tectra identifies these zones 18 months before mass displacement events, enabling preventive humanitarian positioning.",
            location: "East Africa",
          },
          {
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            caption: "Tectra analytics layer: 47 risk factors modeled simultaneously across 68 countries, producing a Convergence Risk Index updated monthly.",
            location: "WDC Analytics Platform",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "The Status Quo: Reactive Humanitarian Response",
          content: "Conventional humanitarian early warning systems detect disasters after they occur. UNHCR begins tracking displacement after people move. WFP food security alerts activate when acute hunger is already present. Conflict early warning systems identify violence after the first casualties. The 18-month window for preventive action is systematically missed because no tool models the three forces together.",
        },
        right: {
          variant: "green",
          heading: "Tectra: 18-Month Convergence Prediction",
          content: "Tectra processes 47 risk factors across climate, conflict, and governance simultaneously to identify zones where convergence is building — 18 months before displacement crises materialize. This is the only tool of its type in the humanitarian sector. Early warning at this horizon enables pre-positioning, diplomatic intervention, and community resilience investment rather than emergency response.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "Convergence Risk by Region — 2024 Tectra Assessment",
        clusters: [
          { icon: "emergency", name: "Sudan — Darfur/Nile", need: "Extreme risk", target: "94/100", needNum: 94, targetNum: 94 },
          { icon: "protection", name: "DRC — Kivu Provinces", need: "Very high", target: "89/100", needNum: 89, targetNum: 89 },
          { icon: "food", name: "Somalia — Jubbaland", need: "Very high", target: "85/100", needNum: 85, targetNum: 85 },
          { icon: "wash", name: "Chad — Lake Chad Basin", need: "High", target: "82/100", needNum: 82, targetNum: 82 },
          { icon: "shelter", name: "Haiti — Artibonite/South", need: "High", target: "78/100", needNum: 78, targetNum: 78 },
          { icon: "nutrition", name: "Afghanistan — Helmand", need: "High", target: "75/100", needNum: 75, targetNum: 75 },
        ],
        note: "Tectra Convergence Risk Index (0–100). Scores above 75 indicate active risk of large-scale displacement within 18 months. Updated monthly from 47 data sources.",
      },
      {
        type: "divider",
        title: "Section 2 — Platform Architecture and CLIMB Integration",
      },
      {
        type: "text",
        heading: "Methodology: 47 Risk Factors, Three Domains",
        content: "Tectra's predictive architecture processes 47 risk factors across three primary domains — climate, conflict, and governance — using a weighted ensemble model calibrated against 15 years of historical displacement events.\n\n**Climate domain (18 factors):** CMIP6 climate projections, ERA5 reanalysis, drought indices (PDSI, NDVI), flood frequency from Sentinel-1 SAR, sea surface temperature anomalies (ENSO), land degradation from ESA CCI, crop yield anomalies from MODIS, and precipitation deficits from WMO partners.\n\n**Conflict domain (15 factors):** ACLED event-level conflict data, Uppsala Conflict Data Program incidents, GDELT global events, government territorial control estimates, armed group activity indicators, border crossing events, market disruption signals, and humanitarian access constraints from OCHA.\n\n**Governance fragility domain (14 factors):** World Bank fragility index, Freedom House governance scores, OECD fragility framework, fiscal capacity measures, security sector effectiveness, informal economy share, and social cohesion proxies.\n\nThe three domains are integrated through a convergence scoring algorithm that weights their interactions — because climate impact in a high-governance state produces a fundamentally different outcome than the same climate impact in a fragile state. This interaction modeling is Tectra's core intellectual property.",
      },
      {
        type: "icon-grid",
        title: "Tectra Data Sources — 47 Factors",
        cols: 2,
        items: [
          { icon: "thermometer", label: "Climate Models", desc: "CMIP6, ERA5, MODIS, WMO — 18 climate indicators with 6-month to 18-month forecast horizons" },
          { icon: "flag", label: "Conflict Data", desc: "ACLED, GDELT, Uppsala — event-level granularity, updated within 24 hours of conflict incidents" },
          { icon: "users", label: "Displacement Tracking", desc: "UNHCR, IOM DTM, IDMC — real-time and historical displacement stocks and flows" },
          { icon: "droplets", label: "Environmental Stress", desc: "Drought indices (PDSI), ESA CCI land degradation, Sentinel-1 flood frequency mapping" },
          { icon: "building", label: "Governance Fragility", desc: "World Bank, OECD, Freedom House — 14 governance indicators updated annually with monthly adjustment factors" },
          { icon: "activity", label: "Economic Indicators", desc: "Food price volatility (FAO GIEWS), GDP per capita, unemployment, World Bank commodity indices" },
        ],
      },
      {
        type: "timeline",
        title: "Tectra Development and Validation Milestones",
        items: [
          { year: "2022", icon: "database", title: "Research Foundation: CLIMB Project", content: "Tectra's architecture informed by CLIMB Project findings on climate-displacement causality. Harvard IQSS, Malmö University, and ESA satellite data provide the academic validation foundation." },
          { year: "2023 Q1", icon: "cpu", title: "47-Factor Model Calibration", content: "Tectra's ensemble model calibrated against 15 years of historical displacement events across 68 countries. Convergence Risk Index algorithm finalized." },
          { year: "2023 Q3", icon: "check", title: "Retrospective Validation", content: "Tectra scored 34 historical displacement crises that occurred between 2018–2022. In 31 of 34 cases, Tectra's model assigned a score above 70 at the 18-month-prior point — a 91% retrospective accuracy rate." },
          { year: "2024 Q1", icon: "globe", title: "68-Country Coverage", content: "Tectra expanded to full 68-country coverage across Africa, South Asia, Latin America, and MENA. Monthly Convergence Risk Index reports produced for all countries." },
          { year: "2024 Q3", icon: "trending", title: "Sudan Alert Validation", content: "Tectra scored Sudan at 94 (extreme) in January 2024. The Khartoum and Darfur displacement crises that followed in March–June 2024 validated the 18-month prediction model in real time." },
          { year: "2025", icon: "network", title: "UN Integration Discussions", content: "OCHA and WFP in discussion to integrate Tectra's Convergence Risk Index into their strategic planning frameworks — which would make Tectra the first NGO-built tool integrated into UN early warning systems." },
        ],
      },
      {
        type: "table",
        title: "Tectra Predictive Validation Results",
        headers: ["Test Case", "Tectra Score (18mo prior)", "Outcome", "Accuracy"],
        rows: [
          ["Sudan — Darfur/Khartoum 2024", "94 (Extreme)", "Major displacement crisis: 2.4M displaced", "Confirmed"],
          ["DRC — North Kivu 2024–25", "89 (Very High)", "M23/AFC displacement: 1.2M displaced", "Confirmed"],
          ["Somalia — Jubbaland 2023", "82 (Very High)", "Drought-conflict displacement: 870,000", "Confirmed"],
          ["Ethiopia — Tigray 2022", "79 (High)", "Post-conflict displacement: 1.1M", "Confirmed"],
          ["Haiti — Artibonite 2024", "78 (High)", "Gang-conflict displacement: 340,000", "Confirmed"],
          ["Chad — Lake Chad 2023", "81 (Very High)", "Climate-conflict displacement: 620,000", "Confirmed"],
          ["Overall retrospective accuracy", "31/34 crises above threshold", "91% accuracy", "Validated"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Findings and Funder Value",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: 91% Retrospective Accuracy Across 34 Historical Crises",
        content: "Tectra's ensemble model assigned Convergence Risk Index scores above 70 for 31 of 34 historical displacement crises tested in retrospective validation — 18 months before those crises occurred. This 91% accuracy rate represents the strongest validated performance of any climate-conflict-migration prediction model in the humanitarian sector, and is directly comparable to commercial geopolitical risk tools that charge governments $500,000+ annually.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: Only Tool Integrating All Three Convergence Domains",
        content: "Every existing humanitarian risk tool models climate, conflict, or displacement in isolation. INFORM Risk Index covers climate and governance but not conflict dynamics. ACLED covers conflict but not climate. UNHCR's Displacement Early Warning covers displacement stocks but not drivers. Tectra is the only tool that models the causal interactions between all three — and this is precisely why it achieves 18-month prediction horizons that no single-domain tool can reach.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Early Action Funding Remains the Missing Link",
        content: "Tectra can identify displacement crises 18 months in advance. But prediction without funding for preventive action is an academic exercise. WDC's internal analysis found that the 6 crises validated by Tectra in 2024 received a combined $40M in preventive/anticipatory action funding — compared to $2.1B in reactive humanitarian response funding after the crises occurred. The ratio is 2:100. Funders who invest in Tectra-informed early action achieve roughly 50:1 cost efficiency over reactive response.",
      },
      {
        type: "bar-chart",
        title: "Tectra Performance — Key Metrics",
        items: [
          { label: "Retrospective prediction accuracy (18-month horizon)", value: 91, color: "#009EDB", note: "31/34 historical crises correctly flagged" },
          { label: "Countries covered by Convergence Risk Index", value: 68, max: 100, color: "#1C2B39" },
          { label: "Data sources integrated (% of target)", value: 94, color: "#009EDB" },
          { label: "Model update frequency compliance", value: 98, color: "#E87722", note: "Monthly updates delivered on schedule" },
          { label: "Cost efficiency vs reactive response", value: 98, color: "#1C2B39", note: "$1 in early action = $50 in avoided reactive response costs" },
        ],
      },
      {
        type: "quote",
        text: "We built Tectra because disasters do not happen in isolation. Climate change, conflict, and displacement are a single system. To predict displacement, you have to model all three together — and you have to do it 18 months out, when prevention is still possible.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Recommendations for Funders",
        cols: 2,
        items: [
          { icon: "database", label: "Expand to 100-Country Coverage", desc: "17 high-risk countries outside current 68-country scope. $120K/year in additional data licensing closes the coverage gap." },
          { icon: "building", label: "UN Strategic Planning Integration", desc: "Fund the technical integration of Tectra's CRI into OCHA and WFP strategic planning tools — estimated 12-month project at $350K." },
          { icon: "globe", label: "Anticipatory Action Fund Linkage", desc: "Connect Tectra alerts to CERF, ECHO, and USAID anticipatory action funding triggers — automating the early action financing that is currently the missing link." },
          { icon: "graduation", label: "Government Capacity Building", desc: "Train disaster management authorities in 15 target countries to use Tectra's monthly reports for national contingency planning." },
          { icon: "satellite", label: "Higher-Resolution Climate Data", desc: "Planet Labs climate data integration would improve spatial resolution from 25km to 3km — critical for sub-national risk differentiation in fragile states." },
          { icon: "network", label: "Academic Peer Review", desc: "Submit Tectra's methodology for peer-reviewed publication — the Harvard IQSS partnership provides the academic validation pathway." },
        ],
      },
      {
        type: "partners",
        title: "Research & Data Partners",
        items: ["Harvard IQSS", "Malmö University", "Paris Lodron University Salzburg", "ESA", "WMO", "ACLED", "UNHCR", "IOM", "World Bank", "IDMC", "GDELT", "Uppsala Conflict Data Program"],
      },
    ],
  },

  {
    id: "project-nova7-2024",
    category: "Product Reports",
    title: "Project Nova7",
    subtitle: "Multi-Hazard Early Alert System: Automated Community Notifications Across 7 Hazard Types",
    date: "August 2024",
    year: 2024,
    pages: 14,
    description: "Nova7 is WDC's multi-hazard alert dissemination engine — the delivery layer that translates Michael's predictions and Argus's intelligence into actionable community alerts across 7 hazard types, 6 channel types, and 12+ languages. Nova7 delivered 2M+ alert impressions in 2024 across 40+ countries.",
    tags: ["Nova7", "Alerts", "Communications", "Multi-Hazard", "Community"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "Nova7 — At a Glance",
        items: [
          { icon: "zap", value: "7", label: "Hazard Types Covered" },
          { icon: "megaphone", value: "6", label: "Alert Channels" },
          { icon: "globe", value: "40+", label: "Countries Reached" },
          { icon: "eye", value: "2M+", label: "Annual Alert Impressions" },
        ],
      },
      {
        type: "severity-map",
        title: "Nova7 Alert Network — Global Coverage",
        src: OSM("-180%2C-60%2C180%2C75"),
        height: 380,
        caption: "Nova7's alert dissemination network reaches 40+ countries through a combination of mobile push notifications, SMS, social media, radio broadcast integration, and email. Highest alert density in Sub-Saharan Africa, South Asia, and the Caribbean.",
        legendTitle: "Alert Channel Availability",
        legend: [
          { color: "#FFFFCC", label: "Digital only" },
          { color: "#FED976", label: "Digital + SMS" },
          { color: "#FD8D3C", label: "Digital + SMS + Radio" },
          { color: "#E31A1C", label: "Full channel stack" },
          { color: "#800026", label: "WDC field presence" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — The Last-Mile Alert Delivery Problem",
      },
      {
        type: "text",
        heading: "Why Prediction Without Delivery Is Not Early Warning",
        content: "The most sophisticated disaster prediction platform in the world is worthless if its alerts cannot reach the people at risk. This is the last-mile delivery problem — and it is the most consistently underinvested layer of early warning system architecture globally.\n\nMost investment in early warning systems goes to the detection and prediction layers: satellites, seismic networks, weather modeling. These systems generate alerts that are distributed to government officials, meteorological offices, and emergency management agencies. The assumption is that these institutions then relay warnings to communities.\n\nIn practice, this relay frequently does not happen, is heavily delayed, or uses channels that communities at risk cannot access. A flood warning on a government website is irrelevant to a farmer in the Rusizi Plain with no internet access. A meteorological bulletin in French is useless to a community that speaks Kirundi. An SMS alert sent only to registered mobile numbers misses the 30–40% of households in sub-Saharan Africa that lack mobile connectivity.\n\n**Nova7 is WDC's answer to the last-mile delivery problem.** It operates a six-channel alert stack — mobile push notifications, SMS (including feature phones), radio broadcast integration, social media (6 platforms), email, and Argus dashboard alerts — ensuring that WDC's predictions reach communities in the format, language, and channel they can actually use.\n\nThe seven hazard types covered — floods, earthquakes, cyclones/hurricanes, droughts, landslides, volcanic events, and armed conflict displacement — represent 94% of the displacement events WDC monitored in 2024.",
      },
      {
        type: "photo-spread",
        height: 280,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
            caption: "Communities receiving Nova7 food security and flood alerts via SMS in local languages — the feature phone delivery channel that reaches households without smartphones.",
            location: "West Africa",
          },
          {
            src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
            caption: "Radio broadcast integration: Nova7 distributes automated alert scripts to partner FM stations in DRC, Burundi, and West Africa in local languages.",
            location: "DRC / Burundi",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "The Last-Mile Gap",
          content: "Government early warning systems reach officials, not communities. Digital alerts require smartphones and internet connectivity that 40–60% of disaster-risk households lack. Most alerts are in official languages, not local community languages. Radio — the most universal channel in Africa — is systematically ignored by digital-first alert systems. Result: communities at highest risk receive alerts last.",
        },
        right: {
          variant: "green",
          heading: "Nova7's Six-Channel Stack",
          content: "Nova7 delivers alerts through: (1) Mobile push notifications for smartphone users; (2) SMS for feature phone users; (3) Radio broadcast scripts sent automatically to partner FM stations; (4) Social media across 6 platforms in 12+ languages; (5) Email for NGO and government partners; (6) Argus dashboard integration for field coordinators. All channels, one alert, zero delay.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "Nova7 Alert Delivery — 2024 Performance by Channel",
        clusters: [
          { icon: "telecom", name: "SMS / Feature Phone", need: "40% of target reach", target: "400K recipients", needNum: 40, targetNum: 400 },
          { icon: "coordination", name: "Mobile Push", need: "Smartphone users", target: "800K recipients", needNum: 60, targetNum: 800 },
          { icon: "logistics", name: "Radio Integration", need: "3 stations (2023)", target: "12 stations (2024)", needNum: 30, targetNum: 120 },
          { icon: "emergency", name: "Social Media", need: "Pre-Nova7 reach", target: "2M impressions", needNum: 20, targetNum: 200 },
          { icon: "camp", name: "NGO/Govt Email", need: "Manual distribution", target: "500 organizations", needNum: 30, targetNum: 500 },
          { icon: "protection", name: "Argus Dashboard", need: "HQ only", target: "500+ field users", needNum: 10, targetNum: 500 },
        ],
        note: "Left bar represents pre-Nova7 baseline reach. Right bar represents 2024 Nova7 performance. All figures normalized to 1000-point scale for visualization.",
      },
      {
        type: "divider",
        title: "Section 2 — Platform Capabilities and 2024 Results",
      },
      {
        type: "icon-grid",
        title: "Nova7 Seven Hazard Types",
        cols: 2,
        items: [
          { icon: "droplets", label: "Floods", desc: "River gauge thresholds, flash flood watch, coastal surge — the #1 hazard by WDC alert volume (41% of all 2024 alerts)" },
          { icon: "waves", label: "Earthquakes", desc: "USGS real-time seismic integration; alerts within 90 seconds of M4.5+ events in populated areas" },
          { icon: "wind", label: "Cyclones & Hurricanes", desc: "Atlantic, Pacific, Indian Ocean basin monitoring; 72h pre-landfall community alerts" },
          { icon: "thermometer", label: "Droughts", desc: "SPI/NDVI-based slow-onset drought alerts; 6-month early warning for food security planning" },
          { icon: "mountain", label: "Landslides", desc: "Rainfall-triggered landslide risk models; slope vulnerability maps for community-level alerts" },
          { icon: "flame", label: "Volcanic Events", desc: "VAAC volcanic ash advisory integration + ground deformation satellite monitoring" },
          { icon: "shield", label: "Armed Conflict / Displacement", desc: "ACLED-triggered displacement risk alerts for communities in conflict-active zones" },
        ],
      },
      {
        type: "timeline",
        title: "Nova7 Development and Channel Expansion Timeline",
        items: [
          { year: "2022", icon: "zap", title: "Core Alert Engine Built", content: "Nova7's core alert routing engine connects Michael's prediction outputs to digital notification channels. First alerts delivered to Michael mobile app users." },
          { year: "2023 Q1", icon: "radio", title: "Radio Integration: DRC and Burundi", content: "First radio broadcast integration: 3 FM stations in DRC and Burundi begin receiving automated Nova7 alert scripts in French and Swahili. Reaches 180,000+ listeners." },
          { year: "2023 Q3", icon: "phone", title: "SMS Layer Added", content: "Nova7 adds feature phone SMS delivery for markets with low smartphone penetration. Kirundi and Amharic SMS alerts added for Burundi and Ethiopia." },
          { year: "2024 Q1", icon: "globe", title: "12+ Language Coverage", content: "Nova7 achieves 12+ language delivery: Swahili, French, Arabic, Amharic, Spanish, Portuguese, Haitian Creole, Kirundi, Somali, Tigrinya, Wolof, English." },
          { year: "2024 Q3", icon: "megaphone", title: "2M Impressions Milestone", content: "Nova7 delivers its 2-millionth alert impression of 2024, across 40+ countries. Radio network expanded to 12 stations across 4 countries." },
          { year: "2025", icon: "satellite", title: "Satellite Messaging Integration", content: "Nova7 begins Iridium satellite messaging integration — enabling alerts to reach communities in areas with zero cellular coverage." },
        ],
      },
      {
        type: "table",
        title: "2024 Nova7 Alert Performance by Hazard Type",
        headers: ["Hazard Type", "Alerts Issued", "People Reached", "Advance Warning", "Accuracy Rate"],
        rows: [
          ["Floods", "847", "52,000+", "24–72h", "91%"],
          ["Earthquakes", "312", "28,000+", "Post-event (<90s)", "100% (seismic)"],
          ["Cyclones/Hurricanes", "94", "180,000+", "48–120h", "87%"],
          ["Droughts", "67", "340,000+", "3–6 months", "78%"],
          ["Landslides", "143", "12,000+", "6–24h", "82%"],
          ["Volcanic", "28", "45,000+", "12–72h", "89%"],
          ["Armed Conflict/Displacement", "219", "89,000+", "12–48h", "74%"],
          ["TOTAL 2024", "1,710", "746,000+", "Variable", "88% avg"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Key Findings and Investment Case",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: Radio Remains the Highest-Impact Channel in WDC's Operating Countries",
        content: "Despite digital-first assumptions, WDC's 2024 analysis found that radio integration delivered the highest community reach per alert in sub-Saharan Africa. A single alert script sent to one FM station reaches 30,000–180,000 listeners simultaneously, costs $0.0001 per person reached, and works on any radio — including battery-powered sets in off-grid communities. The 12 Nova7-integrated stations reached an estimated 1.2M listeners in 2024 — more than all digital channels combined.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: Multi-Language Coverage Creates Measurable Equity Impact",
        content: "Communities receiving alerts in their local language respond 340% faster than communities receiving alerts in a second language, based on WDC's community response time analysis across 23 alert events in 2024. Nova7's 12+ language coverage is not a feature — it is the core equity mechanism of WDC's early warning system. English-only early warning is not early warning for 80% of communities in WDC's operating countries.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Conflict-Displacement Alert Accuracy Lags at 74%",
        content: "Nova7's conflict-displacement alerts achieve 74% accuracy — below the 80% threshold WDC has set as the minimum for community trust. The primary reason: armed conflict event data from ACLED and GDELT has a 12–24 hour reporting lag that undermines Nova7's real-time alert value for fast-moving conflict events. WDC is addressing this through direct community reporter integration for conflict reporting, but this remains the weakest link in Nova7's hazard coverage.",
      },
      {
        type: "bar-chart",
        title: "Nova7 Performance by Channel — 2024",
        items: [
          { label: "Radio broadcast accuracy and timeliness", value: 94, color: "#009EDB", note: "Highest-reach channel at lowest cost per person" },
          { label: "Mobile push notification delivery rate", value: 97, color: "#1C2B39" },
          { label: "SMS delivery rate (feature + smartphone)", value: 91, color: "#009EDB" },
          { label: "Overall alert accuracy across hazard types", value: 88, color: "#E87722" },
          { label: "Language equity score (% of communities in own language)", value: 79, color: "#1C2B39", note: "Target: 95% by 2026" },
        ],
      },
      {
        type: "quote",
        text: "Nova7 delivered 2 million alert impressions in 2024. But what matters is not the number — it is whether the right person received the right alert in time to act. Every channel, every language, every improvement we make is measured by that standard.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Scale Recommendations for Funders",
        cols: 2,
        items: [
          { icon: "radio", label: "Radio Network Expansion", desc: "Scale from 12 to 50 partner FM stations across Africa. Each station adds 30,000–180,000 listeners at $2,000/year per station integration cost." },
          { icon: "satellite", label: "Satellite Messaging", desc: "Iridium satellite messaging reaches communities with zero cellular coverage. Covers estimated 8M people in WDC's target countries currently unreached by any channel." },
          { icon: "globe", label: "Language Expansion to 20+", desc: "Add Bambara, Hausa, Zarma, Fulfuldé, Tigrinya, and Somali dialects — covering 120M+ additional speakers in high-risk Sahel and Horn of Africa communities." },
          { icon: "zap", label: "Conflict Alert Accuracy Fix", desc: "Community reporter integration for conflict alerts: $150K for 200 conflict-zone reporters, expected to lift accuracy from 74% to 88% within 12 months." },
          { icon: "phone", label: "Offline SMS Cache", desc: "Pre-cached SMS hazard guides for 72-hour offline delivery — when disasters destroy connectivity, cached alerts still reach phones." },
          { icon: "network", label: "Government System Integration", desc: "Integrate Nova7 into national meteorological and DRM authority alert systems in 10 target countries — giving government-mandated reach to Nova7 alerts." },
        ],
      },
      {
        type: "partners",
        title: "Alert Network Partners",
        items: ["OCHA", "WMO", "USGS", "ACLED", "Radio Maendeleo (DRC)", "Radio Okapi (DRC)", "Radio Isanganiro (Burundi)", "MTN Mobile Money", "Africell", "Michael Reporter Network"],
      },
    ],
  },

  {
    id: "project-michael-mobile-2025",
    category: "Product Reports",
    title: "Michael Mobile Application",
    subtitle: "Community-First Disaster Alert App for Android and iOS — 12+ Languages, Free Always",
    date: "February 2025",
    year: 2025,
    pages: 20,
    description: "The Michael Mobile Application brings the full power of WDC's Global Disaster Monitoring and Alert System directly to community members' phones. Featuring personalized location alerts, live risk maps, evacuation guidance, offline mode, and 12+ language support — free, always.",
    tags: ["Michael", "Mobile", "Android", "iOS", "Early Warning"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "Michael Mobile App — At a Glance",
        items: [
          { icon: "globe", value: "12+", label: "Languages Supported" },
          { icon: "wifioff", value: "72h", label: "Offline Cache Duration" },
          { icon: "zap", value: "30s", label: "Alert Delivery Speed" },
          { icon: "phone", value: "Free", label: "Cost to Communities — Always" },
        ],
      },
      {
        type: "severity-map",
        title: "Michael App Launch Markets — 2025",
        src: OSM("22.0%2C-19.0%2C54.0%2C37.0"),
        height: 380,
        caption: "Michael Mobile launches first in DRC, Burundi, Kenya, Sudan, and Rwanda — five countries where WDC already has active field presence and community reporter networks. West Africa expansion follows in 2025 Q3.",
        legendTitle: "App Deployment Status",
        legend: [
          { color: "#22c55e", label: "Active — full deployment" },
          { color: "#3b82f6", label: "Beta — field testing" },
          { color: "#FD8D3C", label: "Q3 2025 launch" },
          { color: "#9ca3af", label: "2026 pipeline" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — The Mobile Early Warning Gap",
      },
      {
        type: "text",
        heading: "Why Communities Need a Purpose-Built Disaster App — Free",
        content: "Smartphone penetration in sub-Saharan Africa has grown from 11% in 2013 to 47% in 2024. This means that in WDC's primary operating countries, nearly half of all households now have access to a device capable of receiving real-time disaster alerts, interactive risk maps, and evacuation guidance. Yet the apps designed for this purpose — if they exist at all — are built for wealthy-country users: English-only, designed for 5G connectivity, expensive in app store data terms, and missing the offline functionality that communities need when disasters knock out infrastructure.\n\nThe humanitarian technology gap is not about phone access anymore. It is about purpose-built apps designed for the people who need them most.\n\n**Michael Mobile was built from the ground up for communities in disaster-prone countries.** Every design decision prioritized the user in Goma with an Android phone and 200MB of remaining data, not the emergency manager in Brussels with a MacBook on fibre. The result is a 12-language app that works offline for 72 hours, delivers 30-second personalized alerts, shows live risk maps, guides users to evacuation routes, and — critically — enables communities to become part of the early warning system themselves through the Be a Reporter function.\n\nThe cost to communities: free. The cost to WDC to run the app infrastructure per user per year: $2.40 — less than the price of a bottle of water in Vienna. At scale, with 1M users, that is $2.4M annually to provide life-saving early warning to one million people. No other humanitarian technology investment approaches this cost efficiency.",
      },
      {
        type: "photo-spread",
        height: 300,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
            caption: "Communities in DRC using Michael Mobile for real-time disaster alerts and Be a Reporter submissions — the app delivers alerts in Swahili and French with 30-second latency.",
            location: "North Kivu, DRC",
          },
          {
            src: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=800&q=80",
            caption: "WDC field training session for Michael Mobile community reporters — enabling local people to submit structured disaster intelligence directly from the field.",
            location: "Bujumbura, Burundi",
          },
          {
            src: "https://images.unsplash.com/photo-1606189273671-b6e62a68a8d1?auto=format&fit=crop&w=800&q=80",
            caption: "Healthcare workers using Michael Mobile to track disease outbreak risk alerts and access health facility status during disaster events.",
            location: "Eastern Africa",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "Existing Apps: Built for the Wrong User",
          content: "Existing disaster apps are English-only, require constant connectivity, are designed for 4G/5G networks, offer no offline mode, do not function on entry-level Android handsets, and — critically — treat communities as passive alert recipients rather than active contributors. They were designed for emergency managers in high-income countries, not for farmers in the Rusizi Plain.",
        },
        right: {
          variant: "green",
          heading: "Michael Mobile: Designed for Disaster-Prone Communities",
          content: "Michael Mobile works on $50 Android phones. Offline for 72 hours. Alerts in 12+ languages including Swahili, Amharic, and Haitian Creole. Data-light (under 5MB/month normal use). Community reporters submit intelligence through the same app. SMS integration for feature phone users. Radio alert push for users without any smartphone. Free, always.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "Michael Mobile Feature Coverage vs Competitors",
        clusters: [
          { icon: "telecom", name: "Language Support", need: "1–3 languages (competitors)", target: "12+ (Michael)", needNum: 25, targetNum: 100 },
          { icon: "emergency", name: "Offline Capability", need: "None (most competitors)", target: "72h cache", needNum: 0, targetNum: 95 },
          { icon: "coordination", name: "Community Reporting", need: "Not available", target: "Integrated", needNum: 0, targetNum: 90 },
          { icon: "logistics", name: "SMS/Radio Fallback", need: "Not available", target: "Fully integrated", needNum: 0, targetNum: 85 },
          { icon: "protection", name: "Cost to User", need: "$0.99–$4.99/month", target: "Free always", needNum: 0, targetNum: 100 },
          { icon: "camp", name: "Low-End Device Support", need: "Requires mid-range+", target: "$50 Android+", needNum: 30, targetNum: 95 },
        ],
        note: "Competitor benchmark based on analysis of 8 leading emergency alert apps (Ready.gov, FEMA, Red Cross, Everbridge, etc.). Michael Mobile outperforms on all equity-critical features.",
      },
      {
        type: "divider",
        title: "Section 2 — Feature Architecture and Technical Specifications",
      },
      {
        type: "icon-grid",
        title: "Michael Mobile Core Features",
        cols: 2,
        items: [
          { icon: "crosshair", label: "Personalized Location Alerts", desc: "Alerts scoped to GPS location and user-selected watched areas (up to 5 locations). Push delivery within 30 seconds of Michael alert issuance." },
          { icon: "layers", label: "Live Risk Maps", desc: "Interactive risk overlays updated every 15 minutes. Flood extent, earthquake epicentres, conflict displacement zones, cyclone tracks." },
          { icon: "truck", label: "Evacuation Guidance", desc: "Nearest shelters, safe routes, road accessibility status, bridge condition — updated in real time from Argus and community reporter feeds." },
          { icon: "wifioff", label: "72-Hour Offline Mode", desc: "Cached alerts, maps, and evacuation guides remain functional for 72 hours without internet. Critical for disaster-degraded connectivity environments." },
          { icon: "flag", label: "Be a Reporter Integration", desc: "Submit field reports with GPS-tagged photos, structured hazard data, and severity assessments — directly from the same app." },
          { icon: "globe", label: "12+ Language Support", desc: "Swahili, French, Arabic, Amharic, Spanish, Portuguese, Haitian Creole, Kirundi, Somali, Tigrinya, Wolof, English — auto-detected from device settings." },
          { icon: "radio", label: "SMS & Radio Fallback", desc: "Alerts pushed to SMS when push delivery fails. Radio alert scripts transmitted automatically to 12+ partner FM stations in Nova7's network." },
          { icon: "users", label: "Community Network View", desc: "See nearby reporter updates and community observations on the live map — transforming Michael from an alert system into a community intelligence network." },
        ],
      },
      {
        type: "timeline",
        title: "Michael Mobile Development Timeline",
        items: [
          { year: "2022", icon: "cpu", title: "Design Principles Established", content: "Michael Mobile designed around three non-negotiable principles: works on $50 Android, works offline, free always. User research conducted in DRC and Burundi informed every feature priority." },
          { year: "2023 Q2", icon: "phone", title: "Alpha Build — DRC Field Test", content: "Alpha version tested with 50 community reporters in North Kivu. Offline mode and GPS alert targeting validated. 87% of testers on devices costing under $80." },
          { year: "2023 Q4", icon: "globe", title: "12-Language Beta", content: "12+ language version released for beta testing across DRC, Burundi, Haiti, and Kenya. Language auto-detection deployed. NLP alert translation accuracy: 94%." },
          { year: "2024 Q2", icon: "flag", title: "Be a Reporter Integration", content: "Be a Reporter function integrated into Michael Mobile — enabling community reporters to submit structured field intelligence without a separate app or training device." },
          { year: "2025 Q1", icon: "zap", title: "Full Launch — 5 Countries", content: "Official launch in DRC, Burundi, Kenya, Sudan, and Rwanda. App Store and Google Play listings published. Radio integration active in all 5 launch markets." },
          { year: "2025 Q3", icon: "satellite", title: "Satellite Messaging Integration", content: "Iridium satellite messaging integration enables Michael Mobile to push alerts in areas with zero cellular coverage — covering an estimated 8M additional people." },
        ],
      },
      {
        type: "table",
        title: "Michael Mobile — Technical Specifications",
        headers: ["Specification", "Value", "Rationale"],
        rows: [
          ["Minimum Android version", "Android 5.0 (2014+)", "Covers 96%+ of devices in use in WDC target countries"],
          ["App size (install)", "12MB", "Designed for low-storage devices and expensive mobile data markets"],
          ["Monthly data usage (normal)", "<5MB", "Below most African mobile data plan thresholds for automatic charging"],
          ["Offline cache duration", "72 hours", "Covers the acute phase of most disaster events"],
          ["Alert delivery latency", "30 seconds avg", "From Michael alert issuance to user push notification receipt"],
          ["Languages supported", "12+ (auto-detect)", "Based on device locale setting; additional languages added quarterly"],
          ["Minimum device cost", "$50 Android", "Entry-level Tecno, Itel, and Infinix devices dominant in target markets"],
          ["Cost to user", "$0.00 — always free", "Core equity principle; no freemium tier, no data monetization"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Findings and Funder Case",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: $2.40 Per User Per Year — Most Cost-Efficient Early Warning Delivery in the Sector",
        content: "WDC's infrastructure cost analysis puts Michael Mobile at $2.40 per active user per year for server, bandwidth, and push notification costs. At 100,000 active users, that is $240,000/year to provide life-saving early warning to 100,000 people. NOAA's Wireless Emergency Alerts system costs the US government approximately $18 per protected person per year — and serves a country with infinitely more infrastructure. WDC delivers comparable alert quality for 87% less, in harder environments.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: Language Equity is the Most Under-Resourced Feature in Disaster Apps",
        content: "WDC's competitive analysis of 8 leading emergency alert apps found that 6 of 8 offer alerts in 1–3 languages. None cover Swahili (200M+ speakers), Amharic (40M+ speakers), or Haitian Creole (12M speakers) — languages that represent hundreds of millions of people in the world's highest-risk disaster zones. Michael Mobile's 12+ language support is not a feature; it is WDC's primary equity statement in product form.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Satellite Connectivity Remains the Unclosed Last-Mile Gap",
        content: "Even with SMS and radio fallback, an estimated 8M people in WDC's target countries live in areas where no mobile network signal reaches during normal operations — and this number grows to 15M+ when disaster damages network infrastructure. WDC's Iridium satellite integration is in development but requires $400K in hardware and licensing investment to cover full target-country geographic scope. This is the single highest-impact investment WDC can make in Michael Mobile's reach.",
      },
      {
        type: "bar-chart",
        title: "Michael Mobile — Key Performance Metrics",
        items: [
          { label: "Alert delivery speed compliance (<30s)", value: 97, color: "#009EDB", note: "97% of alerts delivered within 30 seconds" },
          { label: "Offline mode reliability (72h cache)", value: 99, color: "#1C2B39" },
          { label: "NLP translation accuracy (12 languages)", value: 94, color: "#009EDB" },
          { label: "Be a Reporter submission GPS accuracy", value: 96, color: "#E87722" },
          { label: "User retention (30-day active rate)", value: 73, color: "#1C2B39", note: "Target: 80% by end 2025" },
        ],
      },
      {
        type: "quote",
        text: "We built Michael's mobile app because the people who need disaster warnings most are not in office buildings with computers. They are in villages. They need alerts on a phone, in their language, that work when the internet goes down. And they need it free — not as charity, but as a right.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Investment Priorities for Funders",
        cols: 2,
        items: [
          { icon: "satellite", label: "$400K — Satellite Connectivity", desc: "Iridium integration covering 8M+ people in zero-cellular-coverage areas across WDC's 5 launch countries." },
          { icon: "globe", label: "$180K — Language Expansion", desc: "Add 8 more languages (Bambara, Hausa, Zarma, Fulfuldé, Dinka, Nuer, Tigrinya dialects) — covering 80M+ additional speakers." },
          { icon: "phone", label: "$120K — SMS Enhancement", desc: "Bulk SMS infrastructure for 1M+ monthly SMS alerts across 5 countries. Closes the non-smartphone gap entirely." },
          { icon: "users", label: "$200K — User Growth Campaign", desc: "Targeted community enrollment campaigns in 5 launch countries. Target: 250,000 active users by end 2025." },
          { icon: "cpu", label: "$300K — Offline AI", desc: "On-device AI model for offline hazard risk assessment — enabling Michael Mobile to generate local risk scores without any connectivity." },
          { icon: "radio", label: "$80K — Radio Network Expansion", desc: "Add 15 more partner FM stations. Each station = 30,000–180,000 additional listeners per alert." },
        ],
      },
      {
        type: "partners",
        title: "Technology and Distribution Partners",
        items: ["Google Play Store", "Apple App Store", "Africell", "MTN Mobile Money", "Airtel Africa", "Radio Maendeleo", "Radio Okapi", "Iridium Satellite", "Google.org", "ESRI"],
      },
    ],
  },

  {
    id: "project-drone-iot-2025",
    category: "Product Reports",
    title: "WDC Drone & IoT Field Intelligence Program",
    subtitle: "Ground-Level Disaster Intelligence Through UAVs and Sensor Networks — Geospatial World 50 Rising Stars 2025",
    date: "March 2025",
    year: 2025,
    pages: 16,
    description: "WDC's Drone and IoT Sensor Program extends disaster intelligence from the satellite level to the ground level, deploying unmanned aerial vehicles and solar-powered sensor networks in disaster-prone communities — recognized by Geospatial World as a Rising Star innovation in 2025.",
    tags: ["Drones", "IoT", "Field Intelligence", "Sensors", "Geospatial"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "Drone & IoT Program — At a Glance",
        items: [
          { icon: "camera", value: "4", label: "Sensor Types Deployed" },
          { icon: "crosshair", value: "50km²", label: "Coverage Per Drone Flight" },
          { icon: "clock", value: "15min", label: "Sensor Refresh Rate" },
          { icon: "award", value: "2025", label: "Geospatial World 50 Rising Stars" },
        ],
      },
      {
        type: "severity-map",
        title: "IoT Sensor Network Deployment — WDC Active Countries",
        src: OSM("22.0%2C-19.0%2C54.0%2C37.0"),
        height: 380,
        caption: "WDC's IoT sensor network is currently deployed in 3 countries (DRC, Burundi, Burundi highlands) with drone rapid-response capability in all 5 active field countries. Sensors transmit environmental data to Michael every 15 minutes via SIM connectivity.",
        legendTitle: "Hardware Deployment Status",
        legend: [
          { color: "#22c55e", label: "Active IoT sensor network" },
          { color: "#3b82f6", label: "Drone rapid-response staging" },
          { color: "#FD8D3C", label: "2025 expansion target" },
          { color: "#9ca3af", label: "Partner-supported deployment" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — The Ground Truth Gap in Disaster Intelligence",
      },
      {
        type: "text",
        heading: "What Satellites Cannot See",
        content: "Satellites represent the backbone of modern disaster monitoring. ESA's Sentinel-1 SAR satellite can detect flooded areas as small as 0.1 hectares through cloud cover. NASA's MODIS tracks fires in near real-time. WMO weather satellites provide global atmospheric monitoring at 15-minute intervals. WDC depends on all of these — they form the first layer of Michael's intelligence architecture.\n\nBut satellites see the world from 400–800km above the surface. At that distance, they miss what happens at village level: a bridge that partially collapsed but still appears structurally sound from space. A levee that developed a crack overnight. A river that is rising 40% faster upstream than downstream sensors detect. A school building that satellite imagery classifies as intact but that community reporters know is structurally compromised from last month's earthquake aftershocks.\n\n**The ground truth gap is real, systematic, and operationally consequential.** In WDC's 2025 DRC mission, satellite imagery classified 3 road corridors as passable that community reporters and subsequent drone flights revealed were impassable due to landslide debris — debris too thin to detect at satellite resolution but thick enough to block vehicle access. Field teams that relied on satellite imagery alone would have sent convoys into blocked routes.\n\nWDC's Drone and IoT Sensor Program fills this gap through two complementary technologies: **Community-installed IoT sensors** for continuous environmental monitoring at village scale, and **drone-based visual assessment** for rapid confirmation and detailed damage mapping when sensor alerts trigger.",
      },
      {
        type: "photo-spread",
        height: 300,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
            caption: "UAV drone deployment over flooded community in eastern DRC — providing 50km² visual assessment coverage per flight, fed directly into EAGLE's damage classification engine.",
            location: "North Kivu, DRC",
          },
          {
            src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            caption: "WDC IoT sensor unit: solar-powered, SIM-connected, monitoring flood levels, temperature, humidity, and soil moisture at 15-minute intervals year-round.",
            location: "Rusizi Plain, Burundi",
          },
          {
            src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
            caption: "Field technician calibrating IoT sensor deployment alongside community leaders — sensor maintenance is managed by trained community members, not WDC staff.",
            location: "Beni Territory, DRC",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "The Satellite-Only Intelligence Gap",
          content: "Satellites detect large-scale damage, broad flood extents, and major infrastructure failures. They miss: bridge cracks, partial road blockages, upstream river acceleration, village-level structural compromise, thin debris layers, soil saturation before visible flooding. These are precisely the details that determine whether a response vehicle gets through, whether a community evacuates in time, and whether an emergency team finds survivors.",
        },
        right: {
          variant: "green",
          heading: "WDC's Two-Layer Ground Intelligence",
          content: "IoT sensors transmit environmental data every 15 minutes — detecting accelerating river levels, soil moisture thresholds, and seismic micro-events before satellite detection. When sensors cross thresholds, drone deployment is triggered for visual confirmation and detailed assessment. Two layers: automated early detection (IoT) + precision confirmation (UAV). Ground truth that no satellite provides.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "IoT Sensor Network — Environmental Parameters Monitored",
        clusters: [
          { icon: "wash", name: "Flood/Water Level", need: "Satellite (6h lag)", target: "IoT (15min)", needNum: 20, targetNum: 95 },
          { icon: "health", name: "Temperature/Humidity", need: "Weather station (daily)", target: "IoT (15min)", needNum: 25, targetNum: 97 },
          { icon: "shelter", name: "Soil Moisture", need: "Satellite (2-day lag)", target: "IoT (15min)", needNum: 10, targetNum: 88 },
          { icon: "emergency", name: "Seismic Micro-Events", need: "Regional network only", target: "Village-level", needNum: 15, targetNum: 78 },
          { icon: "food", name: "Air Quality", need: "Not monitored", target: "IoT (15min)", needNum: 0, targetNum: 85 },
          { icon: "logistics", name: "Road/Bridge Integrity", need: "Manual inspection", target: "UAV visual", needNum: 5, targetNum: 91 },
        ],
        note: "Left bar: data availability from conventional sources. Right bar: WDC IoT/UAV program performance. Shows the ground truth gap closed by hardware deployment.",
      },
      {
        type: "divider",
        title: "Section 2 — Technology Architecture and Field Results",
      },
      {
        type: "icon-grid",
        title: "Sensor Network Components",
        cols: 2,
        items: [
          { icon: "thermometer", label: "Environmental Sensor Units", desc: "Solar-powered units monitoring temperature, humidity, air quality, and soil moisture. SIM-connected, transmitting to Michael every 15 minutes. Battery backup: 72h." },
          { icon: "droplets", label: "River Gauge / Flood Sensors", desc: "Ultrasonic water level sensors on key river gauges. Automated threshold alerts to Michael at 60%, 80%, and 95% flood-risk water levels." },
          { icon: "activity", label: "Seismic Micro-Sensors", desc: "Low-cost MEMS accelerometers detecting local ground motion below regional seismograph thresholds. Early sub-M4.0 detection at community scale." },
          { icon: "camera", label: "UAV Visual Assessment Platform", desc: "DJI Matrice-class UAVs with multispectral and RGB cameras. Imagery feeds directly into EAGLE's damage classification models within 2 hours of flight." },
        ],
      },
      {
        type: "timeline",
        title: "Drone & IoT Program Milestones",
        items: [
          { year: "2023 Q1", icon: "cpu", title: "Sensor Architecture Designed", content: "WDC designs the IoT sensor unit specification: solar-powered, SIM-connected, rugged for field conditions, maintainable by community members with 2-hour training." },
          { year: "2023 Q3", icon: "activity", title: "First Sensor Deployment — Burundi", content: "12 IoT sensor units deployed across the Rusizi Plain. First real-time flood level data transmitted to Michael within 24 hours of installation." },
          { year: "2024 Q1", icon: "camera", title: "UAV Program Launch", content: "First drone deployment in DRC during February flood event. 50km² assessed in single flight. EAGLE integration validated — imagery processed within 2 hours of drone return." },
          { year: "2024 Q3", icon: "award", title: "Geospatial World 50 Rising Stars", content: "Sapiens Ndatabaye named in Geospatial World 50 Rising Stars 2025 at the Geospatial World Forum in Amsterdam — specifically recognizing WDC's drone and IoT innovation program." },
          { year: "2025 Q1", icon: "globe", title: "DRC Expansion — 25 Sensors", content: "25 additional IoT units deployed across North Kivu. First seismic micro-sensor deployment detects 3 M2.8–M3.4 events not registered by regional network." },
          { year: "2025 Q3", icon: "satellite", title: "Satellite-IoT Fusion Layer", content: "Michael begins fusing IoT sensor data with satellite imagery in real time — producing combined risk assessments that outperform either source alone." },
        ],
      },
      {
        type: "table",
        title: "Drone & IoT Program — Field Performance Results",
        headers: ["Use Case", "Satellite-Only Baseline", "WDC IoT/UAV Result", "Improvement"],
        rows: [
          ["River level detection lead time", "6–12h (satellite pass lag)", "15min (continuous IoT)", "97% faster"],
          ["Flood area assessment accuracy", "0.1 ha resolution, 2-day lag", "0.5m resolution, 2h", "90% time reduction"],
          ["Road corridor passability status", "Not detectable from space", "UAV visual: 100% coverage", "New capability"],
          ["Seismic event detection threshold", "M4.5+ regional network", "M2.8+ village level", "60% sensitivity gain"],
          ["Damage assessment per event", "$8,000 ground team cost", "$400 drone flight", "95% cost reduction"],
          ["Area assessed per day", "Ground: 5km²", "UAV: 150km²", "30× coverage increase"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Key Findings and Investment Case",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: 95% Cost Reduction in Damage Assessment — $400 vs $8,000 Per Event",
        content: "A ground team damage assessment in eastern DRC costs approximately $8,000 — including staff, vehicle, security, fuel, and 2–5 days of field time. A WDC drone flight assessing the same area costs $400 in fuel and operator time, delivers imagery within 2 hours instead of 2–5 days, covers 30× more area per day, and feeds directly into EAGLE for automated damage classification without additional analyst time. At $400 per assessment vs $8,000, the drone program pays for its own capital cost within 20 deployments.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: IoT Sensors Create a Permanent Early Warning Infrastructure",
        content: "Unlike field missions that end, IoT sensors remain in place and transmit data indefinitely after WDC's deployment teams depart. The 12 sensors deployed in Burundi's Rusizi Plain in 2023 are still transmitting data to Michael as of 2025 — two years of continuous environmental monitoring that has contributed to 340+ flood alerts and informed WDC's 2025 mission planning. Each sensor unit represents a permanent early warning investment with a 5+ year useful life.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Community Maintenance Capacity and SIM Connectivity Costs",
        content: "IoT sensors require basic maintenance every 3–4 months: solar panel cleaning, SIM card top-up, and battery check. WDC has trained community maintenance teams in Burundi successfully, but the $15/month SIM connectivity cost per sensor is a barrier in the most resource-constrained communities. WDC is developing a community cost-sharing model and exploring satellite SIM alternatives, but connectivity costs remain the primary barrier to sensor network scale-up.",
      },
      {
        type: "bar-chart",
        title: "Drone & IoT Program — Performance Indicators",
        items: [
          { label: "IoT sensor uptime (% of time transmitting)", value: 94, color: "#009EDB", note: "6% downtime primarily due to SIM connectivity issues" },
          { label: "UAV imagery quality (% meeting EAGLE standards)", value: 97, color: "#1C2B39" },
          { label: "Damage assessment cost reduction vs ground teams", value: 95, color: "#009EDB", note: "$400 vs $8,000 per assessment" },
          { label: "EAGLE processing time for drone imagery", value: 88, color: "#E87722", note: "88% of flights processed within 2h of landing" },
          { label: "Community sensor maintenance compliance", value: 82, color: "#1C2B39", note: "Target: 90% by end 2025" },
        ],
      },
      {
        type: "quote",
        text: "Satellites tell us what a disaster looks like from space. Drones and sensors tell us what it looks like from the ground, in real time, in communities where it is actually happening. The combination is what makes WDC's intelligence architecture genuinely different.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Scale Pathway for Funders",
        cols: 2,
        items: [
          { icon: "activity", label: "$300K — 100 Sensor Units", desc: "Deploy 100 IoT sensor units across 5 countries. Covers 100 high-risk communities with permanent 15-minute flood and environmental monitoring." },
          { icon: "camera", label: "$150K — Drone Fleet Expansion", desc: "Add 3 additional drone units with multispectral capability. Enables simultaneous multi-country rapid assessment within 24h of any major event." },
          { icon: "satellite", label: "$200K — Satellite SIM Integration", desc: "Replace GSM SIM connectivity with satellite SIM for the 30% of sensors in zero-cellular-coverage areas. Eliminates the primary uptime failure mode." },
          { icon: "graduation", label: "$80K — Community Tech Hubs", desc: "Establish community technology maintenance hubs in 10 target locations — trained community technicians maintaining sensor networks independently." },
          { icon: "cpu", label: "$250K — Sensor-Satellite Fusion", desc: "Full integration of IoT sensor data and satellite imagery in Michael's real-time analysis engine. Expected 15% improvement in flood prediction accuracy." },
          { icon: "globe", label: "$500K — West Africa Expansion", desc: "Full drone and IoT deployment across 3 West Africa countries (Ghana, Nigeria, Côte d'Ivoire). 50 sensor units + 2 drone teams." },
        ],
      },
      {
        type: "partners",
        title: "Technology Partners",
        items: ["ESA (Sentinel satellite data)", "Geospatial World", "DJI", "ESRI", "MTN Mobile (SIM connectivity)", "WDC Community Maintenance Teams", "EAGLE Assessment Platform"],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FIELD MISSIONS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: "mission-drc-2025",
    category: "Field Mission Reports",
    title: "Operation Congo 2025",
    subtitle: "Democratic Republic of Congo — 30-Day Emergency Deployment · North Kivu, South Kivu & Ituri",
    date: "March 2025",
    year: 2025,
    pages: 32,
    description: "WDC's February 2025 intensive 30-day field deployment to eastern DRC — the world's most complex compound humanitarian emergency. The mission activated Michael's community reporter network across 12 villages, engaged 50+ partners, and validated EAGLE satellite damage assessment in a live conflict-flood environment.",
    tags: ["DRC", "Congo", "North Kivu", "South Kivu", "Ituri", "Field Mission", "Michael", "EAGLE"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1400&q=80",
    sections: [

      // ── AT A GLANCE ──────────────────────────────────────────────────────────
      {
        type: "stats",
        title: "Operation Congo 2025 — At a Glance",
        items: [
          { icon: "users",     value: "7.8M",  label: "People in Need (Eastern DRC)" },
          { icon: "flag",      value: "5.9M",  label: "People Targeted" },
          { icon: "handshake", value: "50+",   label: "Organizations Engaged" },
          { icon: "clock",     value: "30",    label: "Days in Country" },
        ],
      },

      // ── SEVERITY MAP ─────────────────────────────────────────────────────────
      {
        type: "severity-map",
        title: "Geographic Coverage — Eastern Democratic Republic of Congo",
        src: OSM("23.9%2C-5.0%2C31.4%2C5.4", "-1.5%2C28.8"),
        height: 460,
        caption: "WDC Operation Congo 2025 covered North Kivu, South Kivu, and Ituri — the three provinces with the highest concentration of armed groups (120+), flood-prone river systems, and IDP population in eastern DRC.",
        legendTitle: "Severity Classification",
        legend: [
          { color: "#FFFFCC", label: "Phase 1 — Minimal" },
          { color: "#FED976", label: "Phase 2 — Stressed" },
          { color: "#FD8D3C", label: "Phase 3 — Crisis" },
          { color: "#E31A1C", label: "Phase 4 — Emergency" },
          { color: "#800026", label: "Phase 5 — Catastrophic" },
        ],
      },

      // ── SECTION 1: CONTEXT ───────────────────────────────────────────────────
      {
        type: "divider",
        title: "Section 1 — Situation Analysis: Eastern DRC",
      },

      {
        type: "text",
        heading: "The DRC Emergency: A Compound Crisis",
        content: "Eastern Democratic Republic of Congo represents one of the world's most protracted and complex humanitarian emergencies — a compound crisis sustained by decades of armed conflict involving 120+ active armed groups, recurrent seasonal flooding along the Congo Basin tributaries, cholera and mpox outbreaks, and the displacement of more than 7.8 million people.\n\nThe provinces of North Kivu, South Kivu, and Ituri account for the majority of this displacement. In North Kivu alone, M23/AFC advance operations in 2024–2025 triggered the largest single wave of internal displacement since 2012, with over 1.2 million people displaced in a 90-day period. Communities fled without any advance warning. No early alert system existed at village level.\n\n**Humanitarian response is severely fragmented.** More than 300 humanitarian organizations operate in eastern DRC, yet coordination gaps are extreme. Information from the field reaches cluster leads in Goma 24–72 hours after events occur. OCHA situation reports are published weekly, not daily. Critical decisions are made on the basis of incomplete, delayed data.\n\nWDC deployed to the Democratic Republic of Congo in February 2025 with one mission objective: **test whether Michael's community-driven disaster intelligence model could operate effectively in the world's most difficult humanitarian environment** — and demonstrate that technology-enabled early warning is achievable even under active armed conflict conditions.",
      },

      // ── FIELD PHOTOS ─────────────────────────────────────────────────────────
      {
        type: "photo-spread",
        height: 300,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=800&q=80",
            caption: "WDC field team conducting Michael community reporter training session, North Kivu. February 2025.",
            location: "Goma, North Kivu",
          },
          {
            src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
            caption: "Food distribution point at IDP site, South Kivu. WDC observed and mapped 14 active distribution sites during the mission.",
            location: "Bukavu, South Kivu",
          },
          {
            src: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=800&q=80",
            caption: "Community members accessing water point flagged as contaminated risk by Michael field reporter network.",
            location: "Beni, North Kivu",
          },
        ],
      },

      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "Root Causes of the Crisis",
          content: "Armed conflict between M23/AFC, FARDC, and 120+ other armed groups has made eastern DRC ungovernable across large territories. Conflict drives displacement, destroys livelihoods, blocks humanitarian access, and creates secondary crises (disease outbreaks, sexual violence, child recruitment). Flooding compounds conflict displacement seasonally along the Ulindi, Elila, and Congo River tributaries.",
        },
        right: {
          variant: "blue",
          heading: "Why WDC Chose DRC as Pilot Site",
          content: "If Michael and EAGLE work in eastern DRC, they work anywhere. The compound crisis environment — active armed conflict + recurrent flooding + disease + mass displacement — represents the hardest possible test for a community-based early warning system. WDC deliberately chose DRC as the validation environment for this reason.",
        },
      },

      // ── HUMANITARIAN NEEDS BY SECTOR ─────────────────────────────────────────
      {
        type: "cluster-dashboard",
        title: "Humanitarian Needs by Sector — Eastern DRC 2025",
        clusters: [
          { icon: "protection", name: "Protection",    need: "7.8M", target: "4.9M", needNum: 7.8, targetNum: 4.9 },
          { icon: "food",       name: "Food Security", need: "6.9M", target: "5.1M", needNum: 6.9, targetNum: 5.1 },
          { icon: "wash",       name: "WASH",          need: "5.8M", target: "3.9M", needNum: 5.8, targetNum: 3.9 },
          { icon: "health",     name: "Health",        need: "5.2M", target: "3.6M", needNum: 5.2, targetNum: 3.6 },
          { icon: "shelter",    name: "Shelter / NFI", need: "3.4M", target: "2.3M", needNum: 3.4, targetNum: 2.3 },
          { icon: "nutrition",  name: "Nutrition",     need: "2.1M", target: "1.7M", needNum: 2.1, targetNum: 1.7 },
          { icon: "education",  name: "Education",     need: "2.6M", target: "1.9M", needNum: 2.6, targetNum: 1.9 },
          { icon: "logistics",  name: "Logistics",     need: "—",    target: "All",  needNum: 1,   targetNum: 1   },
        ],
        note: "Source: OCHA DRC Humanitarian Overview 2025 & WDC field data. Figures represent eastern DRC only (North Kivu, South Kivu, Ituri).",
      },

      // ── SECTION 2: WDC OPERATION ─────────────────────────────────────────────
      {
        type: "divider",
        title: "Section 2 — WDC Operation Congo 2025",
      },

      {
        type: "text",
        heading: "Mission Design & Methodology",
        content: "WDC's 30-day deployment followed a four-phase methodology designed to validate technology performance under real humanitarian crisis conditions, not laboratory or controlled environments.\n\n**Phase 1 (Days 1–7): Mapping & Engagement.** The field team arrived in Goma and immediately began stakeholder mapping — identifying key NGOs, UN agency focal points, government counterparts, and community leaders within the target provinces. 50+ meetings were conducted during the mission.\n\n**Phase 2 (Days 8–16): Community Network Activation.** WDC trained 87 community reporters across 12 villages in North Kivu and South Kivu on the Michael mobile reporting interface. Each reporter received a smartphone, a SIM card with data, and a 4-hour training session covering disaster observation, GPS tagging, photo documentation, and event classification.\n\n**Phase 3 (Days 17–25): Live Monitoring & EAGLE Validation.** Michael monitoring was activated for the two provinces. During this period, two separate flood events occurred — one on the Ulindi River (South Kivu) and one in Beni territory (North Kivu). Both were detected and reported through the community network. EAGLE satellite processing was applied to both events.\n\n**Phase 4 (Days 26–30): Synthesis & Handover.** WDC produced preliminary field findings, conducted exit meetings with government and UN partners, and established a handover protocol for sustained monitoring by the community reporter network after the field team's departure.",
      },

      // ── MISSION TIMELINE ─────────────────────────────────────────────────────
      {
        type: "timeline",
        title: "Mission Timeline — Key Milestones",
        items: [
          { year: "Day 1–3",   icon: "map",      title: "Arrival & Orientation",        content: "Field team deployed to Goma. Security briefings, partner mapping, first stakeholder meetings with UN cluster leads and local NGOs." },
          { year: "Day 4–7",   icon: "handshake", title: "50+ Partner Engagements",     content: "Meetings with OCHA, UNICEF, WFP, MSF, IRC, CARE, national NGOs, provincial DIVID, and faith-based organizations." },
          { year: "Day 8–16",  icon: "users",    title: "87 Community Reporters Trained", content: "Field training conducted across 12 villages. Each reporter received a smartphone, SIM, and Michael mobile access. First live reports submitted Day 12." },
          { year: "Day 17",    icon: "waves",    title: "Ulindi River Flood Event",      content: "Community reporters in South Kivu submitted 14 flood reports 4–6 hours before satellite detection. Michael Tier 2 alert issued." },
          { year: "Day 21",    icon: "satellite", title: "EAGLE Deployed for Beni Flood", content: "Second flood event in Beni territory. EAGLE processed ESA imagery within 18 hours. Damage extent mapped — 340 ha inundated, 2,100 households affected." },
          { year: "Day 26–30", icon: "check",    title: "Synthesis & Government Handover", content: "Exit meetings with Ministry of Interior, OCHA DRC, and 4 provincial government partners. Community reporter network handed to local civil society lead for continued operation." },
        ],
      },

      // ── PERFORMANCE RESULTS ───────────────────────────────────────────────────
      {
        type: "table",
        title: "Mission Performance Against Objectives",
        headers: ["Objective", "Target", "Achieved", "Variance"],
        rows: [
          ["Community reporters trained",   "50",  "87",  "+74%"],
          ["Organizations engaged",         "30",  "52",  "+73%"],
          ["Michael field reports received","200", "340", "+70%"],
          ["Government partnerships signed","2",   "4",   "+100%"],
          ["EAGLE assessments completed",   "2",   "2",   "On target"],
          ["Radio station integrations",    "1",   "3",   "+200%"],
          ["Villages covered by network",   "8",   "12",  "+50%"],
          ["Early warning lead time (avg)", "2h",  "4.8h","Exceeded"],
        ],
      },

      // ── FIELD PHOTO SPREAD ────────────────────────────────────────────────────
      {
        type: "photo-spread",
        height: 320,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
            caption: "Health clinic assessment during the mission. WDC mapped 23 functional health facilities and 8 non-functional due to security incidents.",
            location: "North Kivu",
          },
          {
            src: "https://images.unsplash.com/photo-1594391879803-8a2a88d6e843?auto=format&fit=crop&w=800&q=80",
            caption: "Flood-affected area in Beni territory documented by EAGLE satellite assessment. 340 ha inundated, 2,100 households impacted.",
            location: "Beni Territory",
          },
        ],
      },

      // ── SECTION 3: KEY FINDINGS ───────────────────────────────────────────────
      {
        type: "divider",
        title: "Section 3 — Key Findings & Recommendations",
      },

      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: Community Reporters Outperform Satellite-Only Detection",
        content: "In 23 documented cases, community reporters submitted flood alerts via Michael 4–6 hours before satellite detection confirmed the event. This validates WDC's core hypothesis: human ground-truth intelligence, when systematically organized and technology-enabled, is faster and more granular than remote sensing alone.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: The 50+ Partners Demonstrate Demand for WDC Coordination Role",
        content: "The volume of partnership requests received during the mission — 50+ organizations engaged in 30 days — demonstrates strong demand for a dedicated disaster intelligence and coordination platform in eastern DRC. Multiple partners requested ongoing Michael data feeds and expressed interest in formal data-sharing agreements.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Finding 3: Data Connectivity Remains the Critical Bottleneck",
        content: "20 of the 87 trained community reporters reported difficulty submitting data consistently due to poor mobile network coverage in remote areas. WDC recommends investment in SMS-based offline reporting as a fallback mode for Michael, enabling reporters to submit data during network outages.",
      },

      {
        type: "bar-chart",
        title: "Community Reporter Network — Field Data Quality Assessment",
        items: [
          { label: "Reports with GPS coordinates",           value: 94, color: "#1F9AD9", note: "94% of reports geotagged" },
          { label: "Reports with photo documentation",       value: 78, color: "#1C2B39" },
          { label: "Reports submitted within 2h of event",  value: 86, color: "#1F9AD9" },
          { label: "Reports independently verified",        value: 91, color: "#E87722" },
          { label: "Reporter retention rate (30 days)",     value: 97, color: "#1C2B39", note: "Only 3 reporters did not complete the 30-day period" },
        ],
      },

      {
        type: "quote",
        text: "In 30 days in eastern DRC — the hardest humanitarian environment on earth — WDC proved that community-driven disaster intelligence works. The 87 reporters didn't just submit data. They became the early warning system.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },

      {
        type: "icon-grid",
        title: "Recommendations for Scale-Up",
        cols: 2,
        items: [
          { icon: "phone",      label: "SMS Offline Mode for Michael",         desc: "Develop SMS-based fallback to capture reports in low-connectivity areas" },
          { icon: "radio",      label: "Radio Integration in All Provinces",   desc: "Expand FM radio alert delivery beyond the 3 stations piloted in this mission" },
          { icon: "building",   label: "Formalize Government MOU",             desc: "Convert the 4 informal government partnerships into formal MOU-backed data-sharing agreements" },
          { icon: "satellite",  label: "Permanent EAGLE Coverage for DRC",     desc: "Establish automated EAGLE processing for eastern DRC — currently requires manual activation" },
          { icon: "graduation", label: "Community Reporter Certification",      desc: "Create a WDC Community Reporter certification programme to standardize training across all deployments" },
          { icon: "network",    label: "Inter-Agency Data Sharing Protocol",   desc: "Negotiate data-sharing agreements with OCHA, UNICEF, and WFP for mutual early warning data exchange" },
        ],
      },

      {
        type: "partners",
        title: "Organizations Engaged During Operation Congo 2025",
        items: [
          "OCHA DRC", "UNICEF DRC", "WFP DRC", "UNHCR DRC", "WHO DRC",
          "MSF Belgique", "IRC DRC", "CARE International", "Oxfam DRC",
          "World Vision DRC", "Catholic Relief Services", "Lutheran World Federation",
          "Mercy Corps DRC", "Save the Children DRC", "NRC DRC",
          "ACTED DRC", "IMC DRC", "Caritas Congo", "Diakonia DRC",
          "Ministry of Interior (DRC)", "DIVID North Kivu", "DIVID South Kivu",
          "DIVID Ituri", "MONUSCO", "Radio Maendeleo", "Radio Okapi",
        ],
      },
    ],
  },

  {
    id: "mission-burundi-2025",
    category: "Field Mission Reports",
    title: "Operation Burundi 2025",
    subtitle: "30-Day Mission — Flood Early Warning, Ministry Partnership, and Lifeline Cash Transfer Pilot",
    date: "April 2025",
    year: 2025,
    pages: 28,
    description: "WDC's 30-day Burundi field mission establishing flood early warning systems along the Rusizi Plain, meeting with the Ministry of Interior, launching the Lifeline cash transfer pilot with Banque de Crédit de Bujumbura, and expanding the community reporter network established in 2023.",
    tags: ["Burundi", "Field Mission", "Lifeline", "Flood Early Warning", "30-Day Challenge"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "Operation Burundi 2025 — At a Glance",
        items: [
          { icon: "clock", value: "30", label: "Days in Country" },
          { icon: "building", value: "3", label: "Government Meetings" },
          { icon: "handshake", value: "1", label: "Banking Partner (BCB)" },
          { icon: "users", value: "420+", label: "Community Members Reached" },
        ],
      },
      {
        type: "severity-map",
        title: "Mission Area: Burundi — Bujumbura and Rusizi Plain",
        src: OSM("28.9%2C-4.5%2C30.9%2C-2.3", "-3.4%2C29.9"),
        height: 380,
        caption: "The Rusizi Plain is Burundi's highest-risk flood zone — a low-lying agricultural corridor along the Rusizi River where seasonal flooding displaces thousands of families annually. WDC's community reporter network now covers 28 villages across the plain.",
        legendTitle: "Flood Risk Zones",
        legend: [
          { color: "#FFFFCC", label: "Low flood risk" },
          { color: "#FED976", label: "Moderate risk — annual flooding" },
          { color: "#FD8D3C", label: "High risk — recurring displacement" },
          { color: "#E31A1C", label: "Very high — Rusizi Plain core" },
          { color: "#22c55e", label: "WDC community reporter coverage" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — Situation Analysis: Burundi's Flood Vulnerability",
      },
      {
        type: "text",
        heading: "Burundi's Flood Crisis: Chronic and Underserved",
        content: "Burundi is a small, landlocked country that ranks consistently among the world's most food-insecure nations, with 71% of the population living below the poverty line and a per-capita GDP of $270. It is also one of Sub-Saharan Africa's most flood-prone countries — the Rusizi Plain, Lake Tanganyika shoreline, and highland river systems produce annual flooding events that displace tens of thousands of families and destroy agricultural yields that represent the primary livelihood for over 85% of the rural population.\n\nBurundi's national disaster management system is severely under-resourced. The country has no satellite-based flood monitoring, no community-level early warning system, and limited government capacity to respond when floods occur. International humanitarian response is chronically underfunded — Burundi receives a fraction of the disaster risk financing that goes to more internationally visible emergencies.\n\n**WDC first deployed to Burundi in 2023**, establishing an initial community reporter network of 12 villages in the Rusizi Plain. The 2025 mission returned with three specific objectives: **expand the reporter network to 28 villages; formalize government recognition of WDC's early warning role; and pilot the Lifeline cash transfer system with Banque de Crédit de Bujumbura as the first humanitarian fintech deployment in Burundi's history.**\n\nThe mission achieved all three objectives — and added a fourth that was not planned: the first formal government recognition of WDC's community reporter network as a complementary national early warning asset.",
      },
      {
        type: "photo-spread",
        height: 280,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
            caption: "Community reporter network meeting in the Rusizi Plain — 28 trained reporters representing villages across Burundi's highest-risk flood corridor.",
            location: "Rusizi Plain, Burundi",
          },
          {
            src: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=800&q=80",
            caption: "Water source monitoring near the Rusizi River — IoT sensors and community reporters provide 15-minute interval data on river levels during the flood season.",
            location: "Rusizi River, Burundi",
          },
          {
            src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
            caption: "Lifeline cash transfer pilot: 47 flood-affected families in the Rusizi Plain received digital assistance through Banque de Crédit de Bujumbura within 4 hours of verification.",
            location: "Bujumbura, Burundi",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "Before the 2025 Mission",
          content: "12 community reporters in the Rusizi Plain (2023 baseline). No government recognition of WDC's role. No cash transfer mechanism. Flood alerts reaching communities 6–18 hours after events. No banking partnership for humanitarian disbursements. Limited government disaster management capacity.",
        },
        right: {
          variant: "green",
          heading: "After the 2025 Mission",
          content: "28 community reporters across the Rusizi Plain. Formal Ministry of Interior recognition as national early warning asset. Lifeline pilot: 47 families served in under 4 hours. Banking partnership with BCB formalized. Average flood alert lead time: 4.2 hours. First government MOU for data sharing signed.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "Mission Objectives — Achievement Status",
        clusters: [
          { icon: "coordination", name: "Reporter Network", need: "12 villages (2023)", target: "28 villages (2025)", needNum: 43, targetNum: 100 },
          { icon: "protection", name: "Govt Recognition", need: "Informal (2023)", target: "Formal MOU (2025)", needNum: 20, targetNum: 100 },
          { icon: "food", name: "Cash Transfer Pilot", need: "Not operational", target: "47 families served", needNum: 0, targetNum: 100 },
          { icon: "health", name: "Alert Lead Time", need: "6–18h (pre-mission)", target: "4.2h average", needNum: 30, targetNum: 88 },
          { icon: "wash", name: "Banking Partnership", need: "None (pre-mission)", target: "BCB MOU signed", needNum: 0, targetNum: 100 },
          { icon: "logistics", name: "Radio Integration", need: "1 station (2023)", target: "3 stations (2025)", needNum: 33, targetNum: 100 },
        ],
        note: "Left bar: 2023 baseline. Right bar: 2025 mission achievement. All objectives met or exceeded.",
      },
      {
        type: "divider",
        title: "Section 2 — Mission Operations and Key Partnerships",
      },
      {
        type: "text",
        heading: "The Ministry of Interior Meeting: A Historic Milestone",
        content: "The single most significant outcome of the 2025 Burundi mission was not technological — it was political. On Day 12 of the mission, WDC met with Permanent Secretary Gnl. NDAYAMBAJE André of Burundi's Ministry of Interior — the senior official responsible for Burundi's national disaster management architecture.\n\nThe meeting resulted in formal recognition of WDC's community reporter network as a **complementary early warning asset to Burundi's national disaster management system**. This is the first time any African government has formally recognized a WDC community reporter network as part of its national disaster architecture.\n\n**What this recognition means in practice:** WDC's flood alerts now carry government authority in Burundi. Community reporters can request government support when needed. WDC's data is formally incorporated into national disaster situation reports. And the government agreed to a data-sharing MOU that gives WDC access to official meteorological and flood data to improve Michael's predictions for the Rusizi Plain.\n\nThis is the model WDC intends to replicate across all 15 active African countries: not building a parallel system, but **integrating WDC's community intelligence into national disaster management frameworks**, giving governments the ground-truth data they lack while giving WDC the institutional reach and authority that NGOs alone cannot achieve.",
      },
      {
        type: "timeline",
        title: "Mission Timeline — Key Milestones",
        items: [
          { year: "Week 1", icon: "map", title: "Arrival and Network Re-activation", content: "Field team deployed to Bujumbura. First meetings with local NGOs and UN cluster leads. Community reporter network re-activated from 2023 mission. 12 existing reporters re-briefed and provided updated Michael mobile app." },
          { year: "Week 2", icon: "building", title: "Government Meetings — Ministry of Interior", content: "Meeting with Permanent Secretary Gnl. NDAYAMBAJE André, Ministry of Interior. Agreement on formal recognition of WDC's early warning role. Government data-sharing MOU signed. First such formal recognition for WDC in Africa." },
          { year: "Week 3", icon: "zap", title: "Lifeline Pilot Launch — BCB Partnership", content: "Formal partnership signed with Banque de Crédit de Bujumbura. First Lifeline test transfers completed. Cash assistance reached 47 flood-affected families in the Rusizi Plain within 3h 47min — 95% faster than paper-based baseline." },
          { year: "Week 4 (Part 1)", icon: "users", title: "Network Expansion — 16 New Villages", content: "Community reporter training expanded to 16 additional villages. Michael monitoring scope extended to cover the Lake Tanganyika shoreline flood zone in addition to the Rusizi Plain." },
          { year: "Week 4 (Part 2)", icon: "radio", title: "Radio Integration Expansion", content: "Radio integration expanded from 1 to 3 FM stations: Radio Isanganiro, Radio Bonesha, Radio Publique Africaine. Combined estimated listener reach: 420,000." },
          { year: "Day 30", icon: "check", title: "Exit and Handover", content: "Mission documentation complete. Exit meetings with all partners. Community reporter network handover to local civil society coordinator. Michael continues monitoring remotely." },
        ],
      },
      {
        type: "table",
        title: "Mission Performance Against Objectives",
        headers: ["Objective", "2023 Baseline", "2025 Target", "2025 Achieved", "Status"],
        rows: [
          ["Community reporters", "12", "25", "28", "Exceeded (+12%)"],
          ["Government meetings", "0 formal", "2", "3", "Exceeded"],
          ["Government MOU signed", "None", "1", "1", "Met"],
          ["Banking partnership", "None", "1", "1 (BCB)", "Met"],
          ["Lifeline transfers", "0", "20 families", "47 families", "Exceeded (+135%)"],
          ["Radio stations integrated", "1", "2", "3", "Exceeded"],
          ["Alert lead time", "6–18h", "4h average", "4.2h average", "Met"],
          ["NGOs engaged", "8", "15", "22", "Exceeded (+47%)"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Key Findings and Funder Investment Case",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: Government Recognition Is the Force Multiplier for NGO Impact",
        content: "The Ministry of Interior's formal recognition of WDC's community reporter network transformed WDC's operational reach in Burundi overnight. Community reporters can now identify themselves as recognized national early warning assets when approaching local authorities, community leaders, and other NGOs. WDC's data is formally cited in national situation reports. This government integration multiplies WDC's impact without multiplying WDC's staff count — a highly capital-efficient model for scale.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: Lifeline Proves the Humanitarian Fintech Model Is Viable in the Field",
        content: "47 flood-affected families receiving cash assistance within 3 hours 47 minutes — through a partnership built and operationalized in 14 days — proves that Lifeline's integration model works in the field, not just in design documents. The BCB partnership required no new technology on the beneficiary side. No new apps. No new accounts. Just an SMS notification and a PIN code. This simplicity is the system's strength — and it is directly replicable in any country with mobile money infrastructure.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Burundi's Political Context Requires Careful Navigation",
        content: "Burundi's political environment remains sensitive following the 2015 crisis. Government engagement requires careful protocol management — meetings must be requested through formal channels, and WDC must present its work as complementary to government capacity rather than critical of it. This is not a barrier to engagement, but it slows the pace. The Ministry of Interior recognition took 14 days of relationship building before the formal meeting was possible. WDC has learned to factor this into mission planning for all African government engagements.",
      },
      {
        type: "bar-chart",
        title: "Community Reporter Coverage — Before vs After 2025 Mission",
        items: [
          { label: "Villages covered (Rusizi Plain)", value: 28, max: 50, color: "#009EDB", note: "Up from 12 in 2023 — target: 50 by end 2025" },
          { label: "Radio station reach (listeners, 000s)", value: 84, max: 100, color: "#1C2B39", note: "420,000 listeners vs 140,000 in 2023" },
          { label: "Alert accuracy rate", value: 89, color: "#009EDB" },
          { label: "Average alert lead time (% of 6h target)", value: 70, color: "#E87722", note: "4.2h achieved vs 6h target — target exceeded" },
          { label: "Government integration score", value: 85, color: "#1C2B39", note: "Formal MOU + data sharing + recognition = highest score achieved in any WDC country" },
        ],
      },
      {
        type: "quote",
        text: "Burundi showed us that government partnership is not just possible in Africa — it is essential. When the Ministry of Interior recognized our community reporter network, it transformed WDC from an NGO into part of the national early warning architecture. That is the model we are replicating everywhere.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Recommendations for Funders",
        cols: 2,
        items: [
          { icon: "users", label: "Expand to 50 Villages", desc: "Scale Rusizi Plain network from 28 to 50 villages. 22 additional villages, $85K budget, completes the full Rusizi Plain coverage zone." },
          { icon: "building", label: "Replicate Government MOU Model", desc: "Fund government engagement missions in 5 additional WDC countries using the Burundi Ministry of Interior approach as the template." },
          { icon: "zap", label: "Scale Lifeline to 500 Families", desc: "$150K enables Lifeline to serve 500 flood-affected families per year in Burundi — 10× the pilot scale, same infrastructure." },
          { icon: "radio", label: "Expand Radio to 10 Stations", desc: "Add 7 more FM stations across Burundi's flood-prone provinces. Estimated additional reach: 800,000 listeners per alert." },
          { icon: "activity", label: "IoT Sensor Expansion", desc: "Deploy 20 additional IoT flood sensors across the Rusizi Plain — moving from spot measurements to continuous river corridor monitoring." },
          { icon: "satellite", label: "Permanent EAGLE Coverage", desc: "Automate EAGLE satellite processing for Burundi — eliminating the manual activation step and enabling 24/7 damage assessment capability." },
        ],
      },
      {
        type: "partners",
        title: "Partners Engaged — Operation Burundi 2025",
        items: [
          "Ministry of Interior (Burundi)", "Banque de Crédit de Bujumbura",
          "OCHA Burundi", "UNICEF Burundi", "WFP Burundi", "UNHCR Burundi",
          "Radio Isanganiro", "Radio Bonesha", "Radio Publique Africaine",
          "Caritas Burundi", "World Vision Burundi", "Save the Children Burundi",
          "Infinite Future Bank", "MTN Burundi", "Econet Leo",
        ],
      },
    ],
  },

  {
    id: "mission-west-africa-2024",
    category: "Field Mission Reports",
    title: "West Africa Flood Watch 2024",
    subtitle: "Multi-Country Real-Time Flood Monitoring Across Ghana, Côte d'Ivoire, and Nigeria",
    date: "October 2024",
    year: 2024,
    pages: 20,
    description: "WDC's 2024 West Africa Flood Watch operation deployed Michael's monitoring capabilities across Ghana, Côte d'Ivoire, and Nigeria during the September–October peak flood season, issuing 147 community-level alerts and demonstrating Michael's multi-country simultaneous monitoring at scale.",
    tags: ["West Africa", "Ghana", "Nigeria", "Côte d'Ivoire", "Floods", "Michael"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "West Africa Flood Watch 2024 — At a Glance",
        items: [
          { icon: "globe", value: "3", label: "Countries Simultaneously Monitored" },
          { icon: "zap", value: "147", label: "Community Alerts Issued" },
          { icon: "users", value: "89,000+", label: "People Reached by Alerts" },
          { icon: "check", value: "91%", label: "Alert Accuracy Rate" },
        ],
      },
      {
        type: "severity-map",
        title: "West Africa Flood Watch — Coverage Area",
        src: OSM("-5.5%2C4.0%2C10.0%2C14.0"),
        height: 400,
        caption: "Michael's monitoring covered the Niger River delta (Nigeria), Volta River basin (Ghana), and Bandama River system (Côte d'Ivoire) — the region's three highest-risk flood corridors, covering a combined catchment area of approximately 1.2 million km².",
        legendTitle: "Flood Risk — September/October Peak",
        legend: [
          { color: "#FFFFCC", label: "Minimal flood risk" },
          { color: "#FED976", label: "Seasonal flood risk" },
          { color: "#FD8D3C", label: "High risk — active monitoring" },
          { color: "#E31A1C", label: "Flash flood zone" },
          { color: "#800026", label: "Major event (2024)" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — West Africa's Flood Vulnerability",
      },
      {
        type: "text",
        heading: "Why West Africa's Flood Season Demands Regional Monitoring",
        content: "West Africa experiences one of the most predictable but consistently underserved flood patterns in the world. The September–October peak of the West African monsoon season reliably produces major flooding events in the Niger Delta (Nigeria), Volta River basin (Ghana), and the coastal lowlands of Côte d'Ivoire — every single year, for decades. Yet early warning coverage for these events has historically been nationally fragmented, late, and inaccessible to the farming communities most at risk.\n\nIn 2024, the pattern held. The September–October season produced 17 major flood events across the three countries WDC monitored — events that were entirely predictable by seasonal pattern and that, in 14 of 17 cases, arrived faster and at greater intensity than national meteorological services anticipated. Communities in the Niger Delta have experienced the same flooding cycle since the 1980s, but most still received no advance warning in 2024 — they watched the water rise.\n\n**The West Africa Flood Watch was WDC's first multi-country simultaneous monitoring operation** — a deliberate test of Michael's ability to maintain high-accuracy alert performance across three countries at once, rather than the single-country focus of the DRC and Burundi missions. The results established that Michael's monitoring architecture is genuinely regional in capability: 147 alerts, 89,000+ people reached, 91% accuracy across 17 events, three countries monitored simultaneously by a team of four WDC staff.",
      },
      {
        type: "photo-spread",
        height: 280,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
            caption: "West Africa's flood season: the Niger Delta in Nigeria during the October 2024 peak. WDC issued 67 alerts covering this region with 93% accuracy.",
            location: "Niger Delta, Nigeria",
          },
          {
            src: "https://images.unsplash.com/photo-1594391879803-8a2a88d6e843?auto=format&fit=crop&w=800&q=80",
            caption: "Volta River basin flooding in Ghana — Michael's monitoring detected rising water levels 24–36 hours before peak events in 5 documented Ghana flood events.",
            location: "Volta Basin, Ghana",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "National System Failures",
          content: "Ghana's Meteorological Agency, Nigeria's NEMA, and Côte d'Ivoire's SODEXAM are all under-resourced for real-time community-level flood monitoring. In 2024, national alerts for the September–October flood season reached community leaders in affected areas an average of 11 hours after Michael's alerts — in 6 cases, national alerts arrived after flooding had already begun.",
        },
        right: {
          variant: "green",
          heading: "Michael's Regional Solution",
          content: "Michael monitored all three countries simultaneously from WDC's operations center, processing Volta, Niger, and Bandama river system data in parallel. 147 community-level alerts issued with 24h+ advance warning in 91% of cases. Cost: $0 to communities. Per-alert infrastructure cost: $0.31. A regional flood monitoring system at a fraction of the cost of national meteorological agency upgrades.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "West Africa Flood Watch — Country-Level Performance",
        clusters: [
          { icon: "wash", name: "Nigeria — Niger Delta", need: "67 alerts", target: "52,000+ reached", needNum: 93, targetNum: 93 },
          { icon: "food", name: "Ghana — Volta Basin", need: "48 alerts", target: "28,000+ reached", needNum: 90, targetNum: 90 },
          { icon: "health", name: "Côte d'Ivoire — Bandama", need: "32 alerts", target: "9,000+ reached", needNum: 88, targetNum: 88 },
          { icon: "emergency", name: "Regional Average", need: "147 total alerts", target: "89,000+ total", needNum: 91, targetNum: 91 },
          { icon: "logistics", name: "Advance Warning", need: "11h national avg", target: "28h Michael avg", needNum: 39, targetNum: 100 },
          { icon: "coordination", name: "Cost Per Alert", need: "$12 national avg", target: "$0.31 Michael", needNum: 3, targetNum: 97 },
        ],
        note: "Left bar: national meteorological agency performance (2024). Right bar: Michael West Africa Flood Watch performance. Accuracy % used as bar value for top 4 rows.",
      },
      {
        type: "divider",
        title: "Section 2 — Methodology and Results",
      },
      {
        type: "text",
        heading: "How Michael Monitored Three Countries Simultaneously",
        content: "The West Africa Flood Watch used Michael's satellite-driven monitoring architecture augmented by three specific data integrations: **Volta River Authority (Ghana)** daily discharge data, **Nigerian Hydrological Services Agency** gauge station readings, and **ECMWF (European Centre for Medium-Range Weather Forecasts)** 10-day ensemble forecasts for the West African monsoon system.\n\nThis combination — satellite imagery (Sentinel-1 SAR for flood extent, MODIS for surface water change) + ground gauge data + weather forecast ensemble — gave Michael a three-layer verification system for each alert. An alert was only issued when at least two of the three layers confirmed elevated risk. This validation approach explains the 91% accuracy rate across 147 alerts — a significant improvement over satellite-only or gauge-only monitoring approaches.\n\n**Community alert delivery used Nova7's full six-channel stack:** SMS alerts to registered community leader phones in local languages (Twi, Yoruba, Hausa, Dioula, French); radio alert scripts to 8 partner FM stations across the three countries; social media posts on X, Facebook, and WhatsApp group broadcasts; and email alerts to 340 registered NGO and government partners across West Africa.\n\nAll 147 alerts, 89,000+ alert recipients, and 4 WDC staff. The model demonstrates that Michael scales to regional monitoring without proportional staff increases — the technology does the work.",
      },
      {
        type: "timeline",
        title: "West Africa Flood Watch 2024 — Timeline",
        items: [
          { year: "August 2024", icon: "globe", title: "Pre-Season Monitoring Activated", content: "Michael activates West Africa regional monitoring in August — one month before the September–October peak season. ECMWF monsoon forecasts integrated. 8 FM radio partnerships secured across 3 countries." },
          { year: "Sept 12", icon: "waves", title: "First Major Alert — Niger Delta", content: "Michael issues first Tier 2 alert for Niger Delta flooding. 22 community-level alerts delivered across 3 Nigerian states. Alert issued 31 hours before peak flood level — communities evacuate livestock and reinforce barriers." },
          { year: "Sept 24", icon: "droplets", title: "Volta Basin Event — Ghana", content: "5 consecutive flood events on the Volta River. Michael issues 48 alerts over 6 days — 90% accuracy rate. 28,000+ people reached. National meteorological service alerts: 11 hours after Michael." },
          { year: "Oct 8", icon: "flag", title: "Bandama Flooding — Côte d'Ivoire", content: "4 flood events on the Bandama River system. 32 alerts issued, 9,000+ people reached. WDC's first operational presence in Côte d'Ivoire — partner NGOs express interest in Michael integration." },
          { year: "Oct 31", icon: "check", title: "Season Close — 147 Alerts Total", content: "West Africa flood season concludes. 17 major events, 147 alerts, 89,000+ people reached, 91% accuracy. First multi-country simultaneous monitoring operation validated." },
          { year: "Nov 2024", icon: "trending", title: "After-Action Report and 2025 Planning", content: "WDC publishes West Africa Flood Watch After-Action Report. Preliminary discussions for permanent West Africa monitoring program initiated with ECOWAS and USAID/OFDA." },
        ],
      },
      {
        type: "table",
        title: "Country-Level Results — West Africa Flood Watch 2024",
        headers: ["Country", "Flood Events", "Alerts Issued", "People Reached", "Accuracy", "Advance Warning"],
        rows: [
          ["Nigeria (Niger Delta)", "8 major events", "67 alerts", "52,000+", "93%", "28h avg"],
          ["Ghana (Volta Basin)", "5 major events", "48 alerts", "28,000+", "90%", "31h avg"],
          ["Côte d'Ivoire (Bandama)", "4 major events", "32 alerts", "9,000+", "88%", "22h avg"],
          ["TOTAL / AVERAGE", "17 events", "147 alerts", "89,000+", "91%", "27h avg"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Findings and Investment Case",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: Michael Outperformed National Systems by 17 Hours Average Lead Time",
        content: "Across 17 flood events in three countries, Michael's alerts arrived at community level an average of 27 hours before flood peaks — compared to 10 hours for national meteorological agency alerts that reached the same communities. In 6 events, national alerts arrived after flooding had already begun. Michael's alerts: never late. The 17-hour advantage translates directly into evacuation time, livestock protection, and pre-positioning that would otherwise be impossible.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: $0.31 Per Alert — 97% Below National System Cost",
        content: "WDC's total operational cost for the West Africa Flood Watch 2024 — including staff time, data licensing, SMS delivery, and radio partnership costs — was $45,570 for 147 alerts reaching 89,000+ people. That is $0.31 per alert issued and $0.51 per person reached. National meteorological service costs per equivalent community-level alert in the three countries average $12.40 — 40 times higher. WDC's model is not just faster: it is radically more cost-efficient.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: No Community Reporter Network in West Africa — Yet",
        content: "The West Africa Flood Watch operated without a WDC community reporter network in any of the three countries — relying entirely on Michael's satellite and gauge data. This meant WDC had no ground-truth validation layer and no direct community feedback on alert quality. In 13 of 147 alerts where accuracy was uncertain, WDC could not verify outcomes. The planned 2025 West Africa field mission will establish community reporter networks in all three countries, adding the human intelligence layer that made DRC and Burundi results stronger.",
      },
      {
        type: "bar-chart",
        title: "West Africa Flood Watch — Performance Metrics",
        items: [
          { label: "Alert accuracy rate across 17 events", value: 91, color: "#009EDB", note: "91% vs 78% national baseline" },
          { label: "Advance warning lead time (% of >24h target)", value: 85, color: "#1C2B39", note: "85% of alerts delivered with >24h advance warning" },
          { label: "Community reach per alert (normalized)", value: 89, color: "#009EDB" },
          { label: "Cost efficiency vs national systems", value: 97, color: "#E87722", note: "$0.31 vs $12.40 per alert — 97% more efficient" },
          { label: "Multi-country simultaneous monitoring reliability", value: 98, color: "#1C2B39", note: "No cross-country data errors or alert routing failures" },
        ],
      },
      {
        type: "quote",
        text: "89,000 people received early warning of floods that would have otherwise arrived without notice. That is the entire point of the World Disaster Center. Not technology for its own sake — technology that reaches people in time to act.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "2025 West Africa Scale-Up Investment Case",
        cols: 2,
        items: [
          { icon: "users", label: "Community Reporter Network", desc: "Establish 150-reporter network across Ghana, Nigeria, and Côte d'Ivoire. Ground-truth layer expected to lift accuracy from 91% to 95%+. Budget: $280K." },
          { icon: "radio", label: "Radio Network Expansion", desc: "Add 15 more FM stations to the current 8-station network. Combined reach: 2M+ listeners per alert across West Africa." },
          { icon: "globe", label: "ECOWAS Integration", desc: "Formal integration of Michael's West Africa monitoring into ECOWAS's Regional Integrated Early Warning System (RIEWS). Gives Michael data official regional reach." },
          { icon: "building", label: "Government MOU — 3 Countries", desc: "Replicate the Burundi Ministry of Interior MOU model across Ghana NADMO, Nigeria NEMA, and Côte d'Ivoire CNPS. Transforms Michael from NGO tool to national asset." },
          { icon: "globe", label: "Expand to 5 Countries", desc: "Add Senegal and Mali to the monitoring scope. Both countries have significant flood vulnerability and no community-level early warning systems." },
          { icon: "zap", label: "Permanent Monitoring Program", desc: "$400K/year sustains permanent West Africa monitoring across 5 countries, 12-month coverage, full radio network, and community reporter network." },
        ],
      },
      {
        type: "partners",
        title: "West Africa Partners — 2024",
        items: [
          "Volta River Authority (Ghana)", "NEMA (Nigeria)", "SODEXAM (Côte d'Ivoire)",
          "ECMWF", "USGS", "WMO", "ACLED",
          "8 Partner FM Stations (West Africa)", "340 NGO/Govt email recipients",
          "ECOWAS", "OCHA West Africa",
        ],
      },
    ],
  },

  {
    id: "eagle-drc-assessment-2023",
    category: "Field Mission Reports",
    title: "EAGLE DRC Flood Assessment 2023",
    subtitle: "Complete Post-Disaster Damage Assessment Delivered in 4 Hours — 90% Faster Than the 48–72h Baseline",
    date: "August 2023",
    year: 2023,
    pages: 16,
    description: "Following a major flood event in eastern DRC in August 2023, EAGLE processed satellite imagery and produced a comprehensive geo-referenced damage assessment in 4 hours — compared to the 48–72 hour baseline for traditional on-the-ground assessments. A validated proof of EAGLE's field capability.",
    tags: ["EAGLE", "DRC", "Damage Assessment", "Satellite", "Floods"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "EAGLE DRC 2023 — At a Glance",
        items: [
          { icon: "clock", value: "4h", label: "Assessment Completion Time" },
          { icon: "target", value: "90%", label: "Time Reduction vs Baseline" },
          { icon: "shield", value: "98%", label: "Structural Coverage Rate" },
          { icon: "satellite", value: "847km²", label: "Flood Extent Mapped" },
        ],
      },
      {
        type: "severity-map",
        title: "EAGLE Assessment Area — South Kivu, Eastern DRC",
        src: OSM("27.5%2C-3.5%2C30.0%2C0.5", "-1.7%2C29.2"),
        height: 400,
        caption: "EAGLE processed ESA Sentinel-1 SAR imagery for the flooded corridor across South Kivu province, identifying affected zones that remained inaccessible to ground teams for 36+ hours post-event. Flood extent: 847km². Structures assessed: 2,340.",
        legendTitle: "EAGLE Assessment Outputs",
        legend: [
          { color: "#3b82f6", label: "Flood extent boundary" },
          { color: "#E31A1C", label: "Structures — critical damage" },
          { color: "#FD8D3C", label: "Structures — severe damage" },
          { color: "#FED976", label: "Structures — moderate damage" },
          { color: "#22c55e", label: "Roads — accessible" },
          { color: "#800026", label: "Roads — blocked" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — The Damage Assessment Bottleneck in Disaster Response",
      },
      {
        type: "text",
        heading: "Why Post-Disaster Assessment Is the Critical First Bottleneck",
        content: "In the immediate aftermath of a major disaster, humanitarian coordinators face a decision chain that depends almost entirely on one piece of information: **where is the damage, and how severe is it?** Without a reliable damage assessment, response resources cannot be allocated, road access cannot be planned, supply quantities cannot be estimated, and search-and-rescue priorities cannot be determined.\n\nIn the traditional model, this assessment requires physical access — ground teams must physically reach affected areas, photograph structures, assess road conditions, and compile reports. In eastern DRC, where road infrastructure is poor, security conditions are volatile, and disaster events frequently compromise the road access needed to conduct the assessment, this process routinely takes 48–72 hours or more. In a major flood or earthquake, the 48-72 hour window is the life-saving window. Decisions made in that period determine whether survivors are reached in time.\n\n**EAGLE (Emergency Assessment and Geospatial Logistics Engine) was designed to break this bottleneck.** By processing ESA Sentinel satellite imagery — including cloud-penetrating Synthetic Aperture Radar (SAR) imagery that works regardless of weather conditions — EAGLE produces a geo-referenced damage assessment without requiring physical access to affected areas. The August 2023 DRC flood was EAGLE's first real-world validation deployment, and the results exceeded WDC's performance targets on every metric.",
      },
      {
        type: "photo-spread",
        height: 280,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
            caption: "Satellite imagery processing: EAGLE's damage classification engine analyzing Sentinel-1 SAR data for the South Kivu flood area — cloud-penetrating imagery delivered results while the affected area was still under storm cover.",
            location: "EAGLE Processing — South Kivu",
          },
          {
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            caption: "EAGLE damage map output: 2,340 structures classified by damage severity across 847km² of flooded area — delivered to humanitarian coordinators 4 hours after satellite pass.",
            location: "EAGLE Output Dashboard",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "Before EAGLE: Traditional Assessment",
          content: "Physical assessment teams required road access to affected areas. Eastern DRC roads were impassable for 36+ hours post-flood. Preliminary damage estimates were based on aerial observation from one helicopter — subjective, incomplete, slow to process. Full ground assessment: 48–72 hours. During that window: decisions made blind, resources misallocated, search and rescue delayed.",
        },
        right: {
          variant: "green",
          heading: "With EAGLE: 4-Hour Satellite Assessment",
          content: "EAGLE processed Sentinel-1 SAR imagery (cloud-penetrating) within 2 hours of satellite pass. Sentinel-2 optical pass processed 1 hour later for visual confirmation. Full geo-referenced damage map delivered in 4 hours — while ground teams were still unable to reach the area. 2,340 structures classified. 423km of roads assessed. 38 bridges evaluated. All from space.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "EAGLE vs Traditional Assessment — Performance Comparison",
        clusters: [
          { icon: "emergency", name: "Assessment Time", need: "48–72h (traditional)", target: "4h (EAGLE)", needNum: 6, targetNum: 94 },
          { icon: "logistics", name: "Road Access Required", need: "Yes (traditional)", target: "No (EAGLE)", needNum: 0, targetNum: 100 },
          { icon: "coordination", name: "Structural Coverage", need: "40–60% typical", target: "98% (EAGLE)", needNum: 50, targetNum: 98 },
          { icon: "camp", name: "Cloud Cover Impact", need: "Blocks assessment", target: "SAR: cloud-proof", needNum: 0, targetNum: 100 },
          { icon: "protection", name: "Cost Per Assessment", need: "$8,000 ground team", target: "$400 (satellite)", needNum: 5, targetNum: 95 },
          { icon: "food", name: "Bridge/Road Data", need: "Manual inspection", target: "38 bridges assessed", needNum: 20, targetNum: 89 },
        ],
        note: "Traditional assessment baseline from WDC's analysis of 12 post-disaster assessment operations in eastern DRC, 2018–2022. EAGLE 2023 performance from documented outputs.",
      },
      {
        type: "divider",
        title: "Section 2 — Assessment Methodology and Outputs",
      },
      {
        type: "text",
        heading: "EAGLE's Two-Pass Processing Architecture",
        content: "EAGLE's August 2023 DRC assessment used a two-pass satellite processing architecture that combined the speed of SAR imagery with the visual confirmation of optical imagery — producing results within 4 hours of the first satellite pass over the affected area.\n\n**Pass 1 — Sentinel-1 SAR (2 hours 10 minutes post-event confirmation):** SAR imagery is cloud-independent and provides reliable flood extent mapping regardless of weather conditions. EAGLE processed the Sentinel-1 pass using a change-detection algorithm comparing the post-event image to a 90-day pre-event baseline. Output: 847km² flood extent boundary, initial road accessibility classification, preliminary structure-impact zones.\n\n**Pass 2 — Sentinel-2 Optical (1 hour later):** The follow-up optical pass provided visual confirmation of the SAR-derived extent and enabled EAGLE's machine-learning damage classification to assign severity ratings to individual structures — critical, severe, moderate, or intact — with 94–96% accuracy. Output: 2,340 structures classified individually, 14 health facility functional status assessments, 38 bridge integrity ratings.\n\n**Delivery:** Complete geo-referenced damage map delivered to OCHA DRC and WFP coordination teams in Goma via EAGLE's web dashboard at the 4-hour mark — while the nearest ground assessment team was still 6 hours from the affected area by road.",
      },
      {
        type: "timeline",
        title: "EAGLE DRC 2023 — Hour-by-Hour Timeline",
        items: [
          { year: "T+0", icon: "waves", title: "Flood Event Confirmed", content: "Major flooding confirmed along the Ulindi River, South Kivu. WDC activates EAGLE. Ground teams determine road access will take 36+ hours." },
          { year: "T+1h", icon: "satellite", title: "Sentinel-1 SAR Pass Scheduled", content: "EAGLE requests priority processing of the next Sentinel-1 SAR pass over South Kivu. ESA confirms pass timing and priority data delivery." },
          { year: "T+2h10min", icon: "database", title: "SAR Imagery Received and Processing Begins", content: "Sentinel-1 SAR data received. EAGLE begins change-detection processing. Flood extent boundary computation: 22 minutes. Preliminary road classification: 38 minutes." },
          { year: "T+3h", icon: "camera", title: "Sentinel-2 Optical Pass Processed", content: "Sentinel-2 optical imagery received and processed. Machine-learning damage classification applied to 2,340 identified structures. Health facility and bridge assessments completed." },
          { year: "T+4h", icon: "check", title: "Full Assessment Delivered", content: "Complete geo-referenced damage map delivered to OCHA DRC and WFP Goma. Road accessibility map shows 3 routes blocked, 2 alternative routes identified. Coordinators begin resource allocation." },
          { year: "T+40h", icon: "truck", title: "Ground Teams Confirm EAGLE Results", content: "First ground teams reach affected areas 40 hours after event. Physical inspection confirms EAGLE's structural damage classifications: 96% match rate. Road blockage identification: 100% accurate." },
        ],
      },
      {
        type: "table",
        title: "EAGLE Assessment Outputs — DRC Flood 2023",
        headers: ["Output Type", "Coverage", "Accuracy", "Delivery Time"],
        rows: [
          ["Flooded area extent", "847 km²", "94%", "2h 10min post-satellite pass"],
          ["Residential structures assessed", "2,340 structures", "96%", "3h 45min"],
          ["Road accessibility map", "423km of roads classified", "91%", "3h 50min"],
          ["Hospital/clinic functionality status", "14 health facilities", "100%", "4h 00min"],
          ["Bridge integrity assessment", "38 bridges", "89%", "4h 00min"],
          ["Alternative route identification", "2 viable alternatives found", "Confirmed by ground teams", "4h 00min"],
          ["Total assessment time", "4 hours", "vs 48–72h baseline", "90% faster"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Key Findings and Funder Value",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: 96% Structural Assessment Accuracy Confirmed by Ground Teams",
        content: "When ground teams finally reached the affected area 40 hours after the flood event, they conducted independent physical inspections of 200 randomly selected structures from EAGLE's classified dataset. EAGLE's damage classification matched ground team assessments with 96% accuracy — above WDC's 90% target threshold. This is the strongest field-validated accuracy result in WDC's technical history, and establishes EAGLE as a peer of the sector's best commercial damage assessment tools.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: Road Assessment Was the Most Operationally Critical Output",
        content: "The most immediately consequential EAGLE output was not the structural damage map — it was the road accessibility assessment. EAGLE correctly identified 3 blocked road corridors that ground teams had planned to use for convoy routing, and identified 2 viable alternative routes. This prevented response convoys from losing an estimated 8–12 hours attempting to traverse blocked routes. In a 72-hour life-saving window, 8 hours is significant.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: EAGLE Requires Manual Satellite Request Activation",
        content: "The August 2023 assessment required a manual request to ESA for priority Sentinel-1 processing — a process that added approximately 45 minutes to EAGLE's timeline and requires WDC staff to be alert and active at the moment of event confirmation. WDC has since negotiated a standing priority agreement with ESA for its active field countries, but the dependency on human activation remains a vulnerability. Automated event-triggered satellite requests are in development for 2025.",
      },
      {
        type: "bar-chart",
        title: "EAGLE DRC 2023 — Accuracy by Output Type",
        items: [
          { label: "Structural damage classification accuracy", value: 96, color: "#009EDB", note: "Confirmed by independent ground team inspection" },
          { label: "Flood extent mapping accuracy", value: 94, color: "#1C2B39" },
          { label: "Road accessibility assessment accuracy", value: 91, color: "#009EDB" },
          { label: "Bridge integrity assessment accuracy", value: 89, color: "#E87722" },
          { label: "Health facility status accuracy", value: 100, color: "#1C2B39", note: "All 14 facilities correctly classified" },
        ],
      },
      {
        type: "quote",
        text: "When eastern DRC flooded in August 2023, our field teams could not reach the affected area for 36 hours. But humanitarian coordinators had a complete damage map in 4 hours. EAGLE gave them the information to make life-saving decisions before the roads were clear.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Investment Priorities — EAGLE Scale-Up",
        cols: 2,
        items: [
          { icon: "satellite", label: "Automated Event Triggering", desc: "Eliminate the manual satellite request step. When Michael issues a Tier 1 alert, EAGLE automatically requests satellite priority processing — target: sub-2-hour total assessment time." },
          { icon: "globe", label: "Permanent DRC Coverage Agreement", desc: "Negotiate standing ESA priority agreement for eastern DRC — ensuring EAGLE can assess any event within the province within 4 hours, year-round." },
          { icon: "camera", label: "Commercial Satellite Integration", desc: "Add Planet Labs 3m-resolution imagery for visual assessment of small structures (latrines, water points, individual shelter units) — currently below Sentinel-2 resolution threshold." },
          { icon: "cpu", label: "AI Damage Classification Upgrade", desc: "Fine-tune EAGLE's ML classification model on 5,000+ additional DRC-specific building types. Expected accuracy improvement: 94% to 97%+." },
          { icon: "network", label: "UN System Integration", desc: "EAGLE outputs currently delivered via web dashboard. Formal API integration with OCHA's Information Management tools would automate data flow to coordination teams." },
          { icon: "building", label: "Government DRM Integration", desc: "Integrate EAGLE outputs into Burundi and DRC national disaster management dashboards — giving government disaster managers direct access without WDC intermediary step." },
        ],
      },
      {
        type: "partners",
        title: "Data and Technical Partners",
        items: ["ESA (Sentinel-1 and Sentinel-2)", "OCHA DRC", "WFP DRC", "USGS", "Copernicus Emergency Management Service", "WDC Field Teams"],
      },
    ],
  },

  {
    id: "eagle-burundi-2023",
    category: "Field Mission Reports",
    title: "EAGLE Burundi Landslide Mapping 2023",
    subtitle: "127 Affected Structures and 3 Blocked Road Corridors Identified — Preventing 8-Hour Response Delay",
    date: "October 2023",
    year: 2023,
    pages: 14,
    description: "Following a major landslide event in Burundi's highlands in October 2023, EAGLE's satellite imagery analysis identified 127 affected structures and 3 blocked road corridors — enabling emergency response teams to prioritize access routes and direct resources to the highest-need zones.",
    tags: ["EAGLE", "Burundi", "Landslide", "Satellite Mapping", "Damage Assessment"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "EAGLE Burundi 2023 — At a Glance",
        items: [
          { icon: "shield", value: "127", label: "Structures Identified and Classified" },
          { icon: "truck", value: "3", label: "Blocked Road Corridors Found" },
          { icon: "clock", value: "6h", label: "Full Assessment Delivered" },
          { icon: "check", value: "8h", label: "Response Delay Prevented" },
        ],
      },
      {
        type: "severity-map",
        title: "EAGLE Assessment Area — Burundi Highlands Landslide Zone",
        src: OSM("29.1%2C-3.8%2C30.5%2C-2.6", "-3.2%2C29.7"),
        height: 380,
        caption: "The landslide event affected three villages in Burundi's central highlands — an area with steep terrain, highly erodible soils, and seasonal rainfall patterns that produce 3–5 major landslide events per year. EAGLE mapped the full affected area from Sentinel-2 optical and Sentinel-1 SAR imagery within 6 hours.",
        legendTitle: "EAGLE Landslide Outputs",
        legend: [
          { color: "#800026", label: "Fully destroyed structures" },
          { color: "#E31A1C", label: "Severely damaged structures" },
          { color: "#FD8D3C", label: "Moderately damaged structures" },
          { color: "#800026", label: "Landslide debris extent" },
          { color: "#9ca3af", label: "Road corridors — blocked" },
          { color: "#22c55e", label: "Alternative route — viable" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — Landslide Risk in Burundi's Highlands",
      },
      {
        type: "text",
        heading: "Burundi's Landslide Vulnerability: Chronic, Predictable, Poorly Monitored",
        content: "Burundi's central and northern highlands experience some of the highest landslide frequency in Sub-Saharan Africa. Steep terrain, highly erodible volcanic soils, population pressure that has pushed settlements onto marginal slopes, and seasonal rainfall events that regularly exceed 200mm in 24 hours — the conditions for destructive landslides are present for 4–6 months of every year.\n\nThe October 2023 event followed a 72-hour rainfall period that produced 310mm of precipitation across Burundi's central highlands — 155% of the monthly average. Three villages in the central highlands were affected when multiple slopes failed simultaneously. The landslide debris blocked all three road corridors connecting the villages to the nearest district hospital and response depot.\n\n**The operational problem:** Response teams in Bujumbura knew the event had occurred but had no reliable information on which roads were passable, which villages were most severely affected, or how many structures had sustained critical damage. Two response convoys were already loaded and ready to depart — but in opposite directions, because teams could not confirm which route to the affected area was viable.\n\n**EAGLE was activated 2 hours after the event confirmation.** The assessment gave response teams the routing intelligence they needed before the convoys left — preventing an estimated 8-hour delay from attempting blocked routes and having to retreat and reroute. At the 6-hour mark, response teams were moving on EAGLE-confirmed viable routes. By hour 9, the first convoy had reached the most severely affected village.",
      },
      {
        type: "photo-spread",
        height: 280,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
            caption: "Landslide-affected highland terrain in Burundi — EAGLE's assessment of three blocked road corridors prevented response convoys from losing 8+ hours on impassable routes.",
            location: "Burundi Central Highlands",
          },
          {
            src: "https://images.unsplash.com/photo-1594391879803-8a2a88d6e843?auto=format&fit=crop&w=800&q=80",
            caption: "EAGLE damage classification: 127 structures across three villages assessed via satellite imagery, classified by severity, and mapped for response team navigation.",
            location: "EAGLE Assessment Output",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "amber",
          heading: "Without EAGLE: The Road Assessment Problem",
          content: "Response teams in Bujumbura faced a 3-way routing decision with no reliable information. All three corridors appeared viable on the standard road map. A pilot survey flight was not available until the following morning. Two response convoys sat loaded for 3 hours while teams debated routes. The risk: convoys committed to blocked routes would lose 8+ hours retreating and rerouting.",
        },
        right: {
          variant: "green",
          heading: "With EAGLE: Confirmed Routes Before Departure",
          content: "EAGLE's road assessment identified all 3 blocked corridors and confirmed 1 viable alternative route — 14km longer but fully passable. This information was in response team hands 2 hours before the first convoy departed. No wasted routes. No retreats. First convoy arrived at worst-affected village in 3 hours rather than the 11+ hours the alternative scenario would have required.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "EAGLE Burundi 2023 — Output Assessment",
        clusters: [
          { icon: "emergency", name: "Structures Identified", need: "127 total", target: "96% accuracy", needNum: 96, targetNum: 96 },
          { icon: "logistics", name: "Road Assessment", need: "3 blocked confirmed", target: "1 alternative found", needNum: 91, targetNum: 100 },
          { icon: "shelter", name: "Critical Damage", need: "34 fully destroyed", target: "S&R priority", needNum: 80, targetNum: 100 },
          { icon: "protection", name: "Severe Damage", need: "51 structures", target: "Evacuation priority", needNum: 85, targetNum: 100 },
          { icon: "wash", name: "Assessment Time", need: "48h traditional", target: "6h EAGLE", needNum: 12, targetNum: 88 },
          { icon: "health", name: "Response Delay Avoided", need: "8h potential loss", target: "Fully avoided", needNum: 0, targetNum: 100 },
        ],
        note: "Assessment performance from EAGLE Burundi October 2023 after-action review. Response delay calculation based on convoy route simulation and actual road condition confirmation by ground teams.",
      },
      {
        type: "divider",
        title: "Section 2 — Assessment Methodology and Results",
      },
      {
        type: "text",
        heading: "How EAGLE Assessed a Landslide Zone in 6 Hours",
        content: "Landslide assessment presents different technical challenges from flood assessment. Where floods produce large-scale spectral changes detectable in SAR imagery, landslide damage is often smaller in geographic extent — concentrated in specific slope failure zones with debris deposition covering roads and individual structures rather than flooding entire plains.\n\nEAGLE's Burundi landslide assessment used three imagery sources: **Sentinel-1 SAR** for debris mass detection (the landslide debris produces a distinct backscatter signature different from surrounding soil); **Sentinel-2 optical** for building damage classification and structural deformation detection; and **Pleiades commercial optical imagery** (acquired through emergency tasking) for sub-meter resolution detail needed to classify individual structure damage severity.\n\nThe road assessment used a change-detection comparison between Sentinel-1 pre-event and post-event passes — landslide debris on road surfaces produces detectable SAR returns that differ from clear road surfaces. Three corridors showed debris signatures. EAGLE also identified the Kayanza–Kirundo highway section as debris-free — the 14km-longer alternative route that response teams used successfully.\n\nAll three villages were assessed. All 127 structures across the landslide impact zone were classified. The landslide debris extent (2.3km²) was mapped and an exclusion zone perimeter was generated for safety briefing of response teams.",
      },
      {
        type: "timeline",
        title: "EAGLE Burundi Landslide Response — Timeline",
        items: [
          { year: "T+0", icon: "mountain", title: "Landslide Event Confirmed", content: "Three-village landslide confirmed in Burundi central highlands following 72-hour rainfall event (310mm). Road teams in Bujumbura identify 3-way routing dilemma. EAGLE activated." },
          { year: "T+2h", icon: "satellite", title: "Satellite Data Acquisition", content: "Sentinel-1 SAR and Sentinel-2 optical data requested. Emergency commercial tasking for Pleiades sub-meter imagery placed. First SAR data received." },
          { year: "T+3h30min", icon: "database", title: "Road Assessment Complete", content: "EAGLE's road assessment delivered: 3 corridors confirmed blocked by landslide debris. Kayanza–Kirundo highway confirmed clear. Response teams briefed immediately. First convoy departs on confirmed route." },
          { year: "T+5h", icon: "building", title: "Structural Assessment Complete", content: "127 structures classified by damage severity: 34 critical, 51 severe, 42 moderate. 14 structures requiring immediate search-and-rescue assessment identified and geolocated." },
          { year: "T+6h", icon: "check", title: "Full Assessment Package Delivered", content: "Complete assessment including 2.3km² debris extent map, safety exclusion zone, and structure-level damage classification delivered to OCHA Burundi and response team leads." },
          { year: "T+9h", icon: "truck", title: "First Convoy Reaches Worst-Affected Village", content: "Response convoy arrives at most-severely-affected village using EAGLE-confirmed route. EAGLE structural assessment used to direct search-and-rescue teams to 34 critical-damage locations." },
        ],
      },
      {
        type: "table",
        title: "EAGLE Assessment Outputs — Burundi Landslide 2023",
        headers: ["Classification", "Count", "Severity", "Action Required"],
        rows: [
          ["Structures — fully destroyed", "34", "Critical", "Immediate search & rescue priority"],
          ["Structures — severely damaged", "51", "High", "Immediate evacuation — unsafe to return"],
          ["Structures — moderately damaged", "42", "Medium", "Structural inspection needed before occupation"],
          ["Road corridors blocked", "3 corridors, 18km total", "Critical", "Route 1 identified as viable alternative"],
          ["Landslide debris extent", "2.3km²", "High", "Exclusion zone mapped and distributed to all teams"],
          ["Health facility impact", "1 clinic in zone", "Severe", "Non-functional — patients referred 22km to district hospital"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Key Findings and Investment Case",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: Road Assessment Was the Highest-Value Output — 8-Hour Delay Prevented",
        content: "EAGLE's identification of the 3 blocked road corridors and confirmation of 1 viable alternative was the most operationally critical output of the assessment. Response teams had been preparing to use two of the three blocked corridors. EAGLE's assessment — delivered 2 hours before convoy departure — prevented an estimated 8-hour loss to convoy reversal and rerouting. In a landslide where 34 structures were critically destroyed and survivors were under debris, 8 hours is a meaningful survival window.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: Sub-Meter Imagery Is Essential for Landslide Assessment",
        content: "The Pleiades commercial imagery was the key differentiator from the DRC flood assessment — landslide structural damage classification requires sub-meter resolution to distinguish between fully destroyed, severely damaged, and moderately damaged structures. WDC's standard Sentinel-2 (10m resolution) imagery produced only 71% structural classification accuracy in the landslide zone, while the Pleiades overlay improved this to 96%. This finding has updated EAGLE's standard operating procedure for landslide events: commercial imagery is now requested as standard, not optional.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Commercial Imagery Cost Adds $2,400 Per Assessment",
        content: "Emergency Pleiades tasking for the Burundi landslide assessment cost $2,400 — affordable for a one-off event, but potentially limiting if EAGLE is activated for multiple simultaneous landslide events. WDC is in discussion with Airbus Defence and Space for a humanitarian emergency imagery partnership that would provide Pleiades access at subsidized cost, but this agreement has not yet been finalized. Until it is, commercial imagery dependency remains a cost constraint for high-frequency deployment scenarios.",
      },
      {
        type: "bar-chart",
        title: "EAGLE Burundi 2023 — Performance Metrics",
        items: [
          { label: "Structural classification accuracy (Pleiades-enhanced)", value: 96, color: "#009EDB" },
          { label: "Road corridor assessment accuracy", value: 100, color: "#1C2B39", note: "3 blocked, 1 clear — all confirmed by ground teams" },
          { label: "Assessment time reduction vs traditional", value: 88, color: "#009EDB", note: "6h vs 48h traditional baseline" },
          { label: "Search-and-rescue prioritization accuracy", value: 92, color: "#E87722", note: "34 critical structures correctly identified for S&R priority" },
          { label: "Exclusion zone mapping accuracy", value: 95, color: "#1C2B39" },
        ],
      },
      {
        type: "quote",
        text: "EAGLE told our response teams which roads were blocked before they left Bujumbura. That is the difference between a 3-hour response and an 11-hour response. In a landslide, that difference is whether survivors are reached in time.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Recommendations: EAGLE Improvement Priorities",
        cols: 2,
        items: [
          { icon: "satellite", label: "Humanitarian Imagery Partnership", desc: "Negotiate Airbus/Pleiades and Maxar humanitarian pricing agreement. Estimated cost reduction: 60% per emergency tasking." },
          { icon: "cpu", label: "Landslide-Specific ML Model", desc: "Train dedicated EAGLE model on 500+ Burundi and DRC landslide events. Expected accuracy improvement from 96% to 98%+ without commercial imagery." },
          { icon: "activity", label: "IoT Slope Monitoring Integration", desc: "Deploy slope stability sensors on highest-risk escarpments in Burundi highlands. IoT early warning triggers EAGLE monitoring 12–24h before landslide events." },
          { icon: "building", label: "Pre-Event Vulnerability Mapping", desc: "EAGLE can pre-map structural vulnerability for all highland villages — enabling faster post-event classification by pre-loading building footprint data." },
          { icon: "globe", label: "Rwanda and Ethiopia Expansion", desc: "Rwanda's Albertine Rift and Ethiopia's highland zones share Burundi's landslide risk profile. EAGLE deployment in these countries would protect an additional 3M+ people." },
          { icon: "network", label: "Automated Alert Trigger", desc: "When Michael's rainfall threshold model predicts landslide-risk conditions, EAGLE should automatically pre-position satellite tasking — reducing response time from 6h to under 3h." },
        ],
      },
      {
        type: "partners",
        title: "Data and Response Partners",
        items: ["ESA (Sentinel-1, Sentinel-2)", "Airbus Defence and Space (Pleiades)", "OCHA Burundi", "Ministry of Interior Burundi", "WDC Field Team Burundi", "Caritas Burundi"],
      },
    ],
  },

  {
    id: "eagle-haiti-2024",
    category: "Field Mission Reports",
    title: "EAGLE Haiti Pre-Positioning Assessment 2024",
    subtitle: "First Proactive Disaster Logistics Operation in Haiti: 23,000 People Served Faster",
    date: "June 2024",
    year: 2024,
    pages: 16,
    description: "In advance of Haiti's 2024 hurricane season, EAGLE produced predictive vulnerability maps identifying the highest-risk zones for hurricane damage — enabling humanitarian teams to pre-position supplies before landfall, a first-of-its-kind proactive disaster logistics deployment in Haiti.",
    tags: ["EAGLE", "Haiti", "Hurricane", "Pre-Positioning", "Vulnerability Mapping"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        title: "EAGLE Haiti 2024 — At a Glance",
        items: [
          { icon: "clock", value: "72h", label: "Advance Supply Pre-Positioning" },
          { icon: "map", value: "14", label: "Pre-Staging Locations Identified" },
          { icon: "users", value: "23,000", label: "People Served Faster" },
          { icon: "trending", value: "First", label: "Proactive Pre-Position Op in Haiti" },
        ],
      },
      {
        type: "severity-map",
        title: "EAGLE Haiti Pre-Positioning Map — Southern Peninsula and Artibonite",
        src: OSM("-74.5%2C18.0%2C-71.6%2C20.1", "18.9%2C-72.3"),
        height: 400,
        caption: "EAGLE identified 14 pre-staging locations across Haiti's Southern Peninsula and Artibonite region — the areas historically most affected by hurricane-driven flooding and structural damage. Supplies pre-positioned 72 hours before landfall enabled under-6-hour response in highest-risk zones.",
        legendTitle: "Vulnerability Index",
        legend: [
          { color: "#FFFFCC", label: "Low vulnerability" },
          { color: "#FED976", label: "Moderate — seasonal risk" },
          { color: "#FD8D3C", label: "High — structurally vulnerable" },
          { color: "#E31A1C", label: "Very High — compound risk" },
          { color: "#22c55e", label: "Pre-staging location" },
        ],
      },
      {
        type: "divider",
        title: "Section 1 — Haiti's Humanitarian Context",
      },
      {
        type: "text",
        heading: "Haiti: Where Every Disaster Becomes a Catastrophe",
        content: "Haiti is the most disaster-vulnerable country in the Western Hemisphere — and chronic under-investment in disaster risk reduction has ensured that every natural hazard event produces disproportionate humanitarian consequences. The January 2010 earthquake killed 200,000+ people; a comparable earthquake in Japan killed 18. The difference was not seismic intensity — it was building quality, emergency response systems, and early warning infrastructure.\n\nHurricane season in Haiti follows a pattern that is entirely predictable: the Atlantic hurricane season runs June–November, with peak activity from August to October. Haiti's Southern Peninsula and Artibonite region are struck by significant hurricanes in 3–4 of every 10 years. The physical exposure is known. The vulnerable population is mapped. The historical damage patterns are documented.\n\nYet until 2024, Haiti's humanitarian response to hurricanes remained almost entirely reactive: supplies were dispatched after landfall, through road networks that the hurricane had damaged, to communities that had already spent 4–7 days without water, food, or shelter. The acute emergency window — the 72 hours after landfall when survival outcomes are most determined — was systematically missed.\n\n**EAGLE Haiti 2024 was designed to test whether predictive vulnerability mapping could enable proactive pre-positioning that closes this window.** The answer, documented in this report, is unambiguous: yes. And the result — 23,000 people reached within 6 hours of landfall rather than 4–7 days — demonstrates the operational and life-saving value of prevention over reaction.",
      },
      {
        type: "photo-spread",
        height: 280,
        photos: [
          {
            src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
            caption: "Haiti's communities: EAGLE's vulnerability mapping identified the 14 highest-risk zones where pre-positioned supplies would most rapidly reach affected populations post-landfall.",
            location: "Southern Peninsula, Haiti",
          },
          {
            src: "https://images.unsplash.com/photo-1559067096-49ebca3406aa?auto=format&fit=crop&w=800&q=80",
            caption: "Pre-positioning logistics: supplies staged at one of 14 EAGLE-identified locations 72 hours before hurricane landfall — enabling under-6-hour response in highest-risk zones.",
            location: "Artibonite Region, Haiti",
          },
        ],
      },
      {
        type: "two-col",
        left: {
          variant: "amber",
          heading: "The Old Haiti Model: Reactive and Too Late",
          content: "Traditional post-hurricane supply distribution in Haiti has been delayed by road damage, supply chain collapse, and security deterioration in the post-landfall period. Supplies typically arrive 4–7 days after hurricane impact — when communities have already been without water, food, and shelter for the acute emergency window. The 2016 Hurricane Matthew response took 5 days to reach worst-affected communities. 546 people died.",
        },
        right: {
          variant: "green",
          heading: "EAGLE Pre-Positioning: Prevention Over Reaction",
          content: "By mapping vulnerability zones 72 hours before landfall and pre-positioning supplies at 14 dispersed staging points, WDC and partner organizations reduced response time to under 6 hours post-landfall in the highest-risk areas. Supplies were already in communities when the storm cleared. This is the first documented proactive disaster logistics operation of this type in Haiti's modern humanitarian history.",
        },
      },
      {
        type: "cluster-dashboard",
        title: "Haiti Pre-Positioning — Impact Assessment",
        clusters: [
          { icon: "food", name: "Food Supplies", need: "4–7 days post-landfall (old)", target: "<6h post-landfall", needNum: 14, targetNum: 94 },
          { icon: "wash", name: "Water/WASH", need: "5+ days lag (2016 baseline)", target: "<6h via pre-pos", needNum: 10, targetNum: 92 },
          { icon: "shelter", name: "Emergency Shelter", need: "7+ days (old model)", target: "<6h via pre-pos", needNum: 8, targetNum: 88 },
          { icon: "health", name: "Medical Supplies", need: "3–5 days lag", target: "Pre-positioned +6h", needNum: 20, targetNum: 90 },
          { icon: "protection", name: "People Served", need: "Delayed service", target: "23,000 within 6h", needNum: 15, targetNum: 100 },
          { icon: "logistics", name: "Road Access Factor", need: "Post-storm damaged", target: "Pre-positioned avoided", needNum: 20, targetNum: 100 },
        ],
        note: "Left bar: reactive response baseline (2016 Hurricane Matthew). Right bar: EAGLE pre-positioning performance (2024 hurricane season). Bars represent relative performance index.",
      },
      {
        type: "divider",
        title: "Section 2 — EAGLE Vulnerability Mapping Methodology",
      },
      {
        type: "text",
        heading: "Building Haiti's Vulnerability Map: 14 Pre-Staging Locations",
        content: "EAGLE Haiti 2024 used a four-layer vulnerability mapping methodology to identify the 14 highest-priority pre-staging locations for hurricane supply pre-positioning.\n\n**Layer 1 — Historical Damage Patterns:** EAGLE processed damage assessment data from 8 historical hurricane events in Haiti (2004–2021), identifying the geographic zones that consistently experience the highest structural damage, flooding, and access loss in hurricane events.\n\n**Layer 2 — Current Structural Vulnerability:** EAGLE processed Pleiades high-resolution imagery of Haiti's Southern Peninsula and Artibonite region, mapping the distribution of informal settlements (highest structural vulnerability), reinforced structures (lower vulnerability), and high-density urban areas (high population concentration).\n\n**Layer 3 — Road Network Fragility:** Using OpenStreetMap data validated against field reports from WDC partners in Haiti, EAGLE mapped the road network sections most likely to be damaged or flooded by a Category 3+ hurricane — identifying which supply corridors would be unavailable post-landfall and which staging points must therefore be positioned on the community side of vulnerable road sections.\n\n**Layer 4 — Population Distribution:** WorldPop high-resolution population data was overlaid to ensure staging points were positioned to reach the maximum number of people in the minimum time, given the structural vulnerability and road fragility layers.\n\nThe output: 14 pre-staging locations, ranked by priority, with supply quantity recommendations based on local population estimates and historical event consumption rates. All 14 were pre-positioned by partner organizations 72 hours before landfall.",
      },
      {
        type: "timeline",
        title: "EAGLE Haiti Pre-Positioning — Timeline",
        items: [
          { year: "June 2024", icon: "globe", title: "Pre-Season Vulnerability Assessment", content: "EAGLE produces full Haiti Southern Peninsula and Artibonite vulnerability map. 14 pre-staging locations identified and ranked. Partner organizations briefed on pre-positioning framework." },
          { year: "August 2024 (T-120h)", icon: "wind", title: "Hurricane Track Confirmed", content: "NHC confirms Category 3 hurricane track targeting Haiti's Southern Peninsula. EAGLE activates real-time monitoring. Pre-positioning advisory issued to all partner organizations." },
          { year: "T-72h", icon: "truck", title: "All 14 Staging Points Pre-Positioned", content: "All 14 EAGLE-identified pre-staging locations receive supply consignments: food rations (7-day supply for population estimates), water purification, emergency shelter kits, and medical supplies." },
          { year: "T-24h", icon: "satellite", title: "Final Pre-Landfall Assessment", content: "EAGLE processes final Sentinel-1 and Pleiades imagery. Pre-staging locations confirmed accessible. Response team routing plans confirmed. All road corridor vulnerability updates distributed to partner leads." },
          { year: "T+0 (Landfall)", icon: "waves", title: "Hurricane Makes Landfall", content: "Category 3 hurricane makes landfall on Southern Peninsula. Road damage begins within 2 hours. 8 of 14 pre-staging locations on community side of damaged road sections — inaccessible from main supply depots within 24h of landfall." },
          { year: "T+6h", icon: "check", title: "23,000 People Reached", content: "Partner organizations deliver supplies from pre-staged locations to 23,000 people in highest-risk communities. 8 staging locations already inaccessible from Port-au-Prince supply chain. Pre-positioning: the only thing that worked." },
        ],
      },
      {
        type: "table",
        title: "EAGLE Haiti Pre-Positioning — Results vs Baseline",
        headers: ["Metric", "2016 Matthew Baseline", "2024 EAGLE Pre-Positioning", "Improvement"],
        rows: [
          ["Response time to worst-affected communities", "5–7 days", "Under 6 hours", "96% faster"],
          ["People reached in first 24h", "<2,000 (logistics breakdown)", "23,000", "11.5× more people"],
          ["Road corridors accessible post-landfall", "4 of 12 main routes", "Pre-positioned (not road-dependent)", "Road-independent"],
          ["Supply waste from damage/looting", "Estimated 22% (post-landfall logistics)", "Estimated 3% (pre-positioned)", "86% reduction"],
          ["Cost per person reached in first 24h", "$47 (reactive logistics)", "$6.20 (pre-positioned)", "87% reduction"],
          ["Staging locations identified by EAGLE", "0 (reactive model)", "14 locations", "New capability"],
        ],
      },
      {
        type: "divider",
        title: "Section 3 — Key Findings and Investment Case",
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding 1: Pre-Positioning Reduced Cost Per Person From $47 to $6.20 — 87% Saving",
        content: "The reactive disaster logistics model costs $47 per person reached in the first 24 hours — because post-landfall supply chains require emergency airlift, security escorts, and logistics improvisation at premium cost. Pre-positioned supplies are delivered through standard logistics before the storm, at standard cost, from pre-selected locations already verified as accessible. The $6.20 per-person cost in the first 24 hours of the 2024 response represents an 87% cost reduction — and 11.5× more people served per dollar.",
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding 2: 8 of 14 Staging Points Were Inaccessible From Port-au-Prince Within 24h of Landfall",
        content: "EAGLE's road fragility mapping proved its value: 8 of the 14 pre-staging locations were cut off from the main Port-au-Prince supply chain within 24 hours of landfall due to road damage. If those 14 locations had not been pre-positioned, they would have received zero supplies for 4–7 days. The communities served by those 8 locations — approximately 14,000 people — would have been entirely unreachable in the acute window. Pre-positioning was not an enhancement to the response. For those communities, it was the response.",
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Pre-Positioning Requires Advance Funding Commitment",
        content: "The Haiti pre-positioning operation required partner organizations to commit supply budgets 72+ hours before landfall — before damage was confirmed, before media attention was focused on Haiti, and before most institutional donors had activated emergency funding mechanisms. Several partner organizations could not participate because their funding approval processes required confirmed damage before releasing emergency funds. This is the institutional barrier to anticipatory action that WDC is working with CERF and OCHA to address at the system level.",
      },
      {
        type: "bar-chart",
        title: "EAGLE Haiti 2024 — Performance Against Targets",
        items: [
          { label: "Pre-staging location identification accuracy", value: 93, color: "#009EDB", note: "13 of 14 locations confirmed accessible pre-landfall; 1 was flooded earlier than modeled" },
          { label: "Road fragility prediction accuracy", value: 91, color: "#1C2B39" },
          { label: "Population reach in first 24h vs 2016 baseline", value: 96, color: "#009EDB", note: "23,000 vs <2,000 in equivalent 2016 event" },
          { label: "Cost per person reduction vs reactive baseline", value: 87, color: "#E87722", note: "$6.20 vs $47 per person in first 24h" },
          { label: "Supply pre-positioning completeness", value: 100, color: "#1C2B39", note: "All 14 locations fully pre-stocked 72h before landfall" },
        ],
      },
      {
        type: "quote",
        text: "For the first time in Haiti, humanitarian supplies were already in the right places when the hurricane hit. EAGLE made that possible — not luck, not heroism, just better intelligence used earlier. That is the model for every hurricane season everywhere.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "icon-grid",
        title: "Scale Pathway — EAGLE Anticipatory Action",
        cols: 2,
        items: [
          { icon: "globe", label: "Annual Haiti Pre-Season Assessment", desc: "Permanent annual vulnerability mapping and pre-positioning plan for Haiti's hurricane season. Estimated cost: $85K/year. Protects 50,000+ people with pre-positioned supplies annually." },
          { icon: "wind", label: "Caribbean-Wide Expansion", desc: "EAGLE anticipatory action framework expanded to Cuba, Dominican Republic, Jamaica, and Puerto Rico. Combined coverage: 25M+ people in the hurricane belt." },
          { icon: "building", label: "CERF Anticipatory Action Linkage", desc: "Fund the technical integration of EAGLE's vulnerability maps with CERF's Anticipatory Action Window — automating pre-positioning fund release when EAGLE identifies imminent high-risk scenarios." },
          { icon: "network", label: "WFP Supply Chain Integration", desc: "Formal integration of EAGLE's pre-staging location recommendations into WFP Haiti's supply chain planning system — institutionalizing the pre-positioning model." },
          { icon: "satellite", label: "Daily Hurricane Season Monitoring", desc: "During June–November, EAGLE processes daily satellite updates of Haiti vulnerability indicators — detecting structural changes, seasonal flooding, and population movement that affect pre-positioning plans." },
          { icon: "users", label: "Community Evacuation Route Mapping", desc: "Extend EAGLE outputs to include community evacuation route maps — distributed to households before hurricane season through Michael Mobile and radio broadcast." },
        ],
      },
      {
        type: "partners",
        title: "Haiti Response Partners — 2024",
        items: [
          "OCHA Haiti", "WFP Haiti", "UNICEF Haiti", "CARE Haiti",
          "ACTED Haiti", "MSF Haiti", "World Vision Haiti", "Catholic Relief Services Haiti",
          "NHC (National Hurricane Center)", "USGS", "ESA (Sentinel data)",
          "Airbus Defence and Space (Pleiades)", "WorldPop (Oxford)", "OpenStreetMap Haiti",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RESEARCH & PUBLICATIONS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: "research-climb-2024",
    category: "Research & Publications",
    title: "CLIMB Programme Research Report 2024",
    subtitle: "Climate Intelligence & Machine-Based Warning — Vienna Pilot Results",
    date: "November 2024",
    year: 2024,
    pages: 24,
    description: "CLIMB (Climate Intelligence & Machine-Based Warning) is WDC's joint research programme with IIASA Vienna. This report documents the Vienna pilot: integrating IIASA's global climate impact models with Michael's real-time early warning infrastructure across 12 Central Asian and Eastern European countries.",
    tags: ["CLIMB", "IIASA", "Vienna", "Research", "Climate Intelligence", "Machine Learning"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "cpu", value: "12", label: "Countries in CLIMB Pilot" },
          { icon: "target", value: "84%", label: "Climate Impact Forecast Accuracy" },
          { icon: "database", value: "40yr", label: "Historical Climate Dataset" },
          { icon: "graduation", value: "IIASA", label: "Research Partner" },
        ],
      },
      {
        type: "divider",
        title: "SECTION 1 — CLIMB PROGRAMME OVERVIEW",
      },
      {
        type: "text",
        heading: "CLIMB: Where Long-Range Climate Science Meets Operational Early Warning",
        content: "CLIMB is WDC's most academically rigorous programme — a formal research partnership with IIASA (International Institute for Applied Systems Analysis) in Vienna, one of the world's leading climate research institutions. The programme bridges the gap between IIASA's long-range climate impact modeling (projections at 5–30 year horizons) and WDC's operational early warning infrastructure (real-time to 180-day forecasts through Michael and Nostradamus).\n\nThe core research question: **can 5–30 year climate projections be disaggregated to the community level with sufficient spatial resolution to inform early warning system design?** IIASA's global models operate at 0.5° spatial resolution (~50km grid cells). Michael operates at 250m. The CLIMB programme's technical contribution is the downscaling methodology that bridges that gap — using machine learning to train a statistical downscaling model on 40 years of historical climate data, calibrated against WDC's community-level ground truth from 417 community reporters across 6 field missions.\n\nVienna pilot results (2024): 84% accuracy on 12-month seasonal forecast for extreme precipitation events in pilot countries. The CLIMB downscaling methodology improved Michael's Nostradamus seasonal forecast accuracy by 7 percentage points for Central Asian contexts. Three CLIMB research papers submitted to Nature Climate Change and Environmental Research Letters."
      },
      {
        type: "icon-grid",
        title: "CLIMB Research Outputs 2024",
        cols: 2,
        items: [
          { icon: "book", label: "3 Peer-Reviewed Papers Submitted", desc: "Nature Climate Change, ERL, and GEC — all under review as of November 2024." },
          { icon: "cpu", label: "Downscaling Methodology Published", desc: "CLIMB's ML downscaling approach published as an open-source toolkit on GitHub — available to all researchers." },
          { icon: "database", label: "40-Year Climate Dataset Released", desc: "IIASA-WDC joint dataset released on OCHA HDX: daily extreme event records for 12 countries, 1984–2024." },
          { icon: "graduation", label: "3 IIASA PhD Researchers", desc: "Three IIASA doctoral researchers embedded in WDC field missions in 2024 — generating academic outputs from operational contexts." },
        ],
      },
      {
        type: "quote",
        text: "CLIMB is proof that the gap between academic climate science and operational humanitarian action is bridgeable — but only if researchers spend time in the field and practitioners spend time in the lab. Vienna and Goma are 6,000 kilometres apart. CLIMB makes them one programme.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
      {
        type: "partners",
        title: "CLIMB Partners",
        items: ["IIASA (International Institute for Applied Systems Analysis), Vienna", "Austrian Development Agency", "ECMWF (ERA5 data)", "Copernicus Climate Change Service", "OCHA HDX (data publishing)", "Nature Portfolio", "Environmental Research Letters (IOP Publishing)"],
      },
    ],
  },

  {
    id: "research-michael-paper-2025",
    category: "Research & Publications",
    title: "Michael Platform: Peer-Reviewed Technical Paper 2025",
    subtitle: "AI-Powered Multi-Hazard Early Warning in Fragile Contexts — Methodology & Validation",
    date: "February 2025",
    year: 2025,
    pages: 18,
    description: "The first peer-reviewed academic paper documenting Michael's complete technical methodology and 2024 validation results — submitted to Nature Sustainability. This paper establishes the academic evidence base for WDC's humanitarian AI claims.",
    tags: ["Michael", "Peer Review", "Nature Sustainability", "Academic", "Methodology", "Validation"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "book", value: "Nature", label: "Target Journal (Sustainability)" },
          { icon: "target", value: "247", label: "Events in Validation Dataset" },
          { icon: "users", value: "4", label: "Co-Authors (IIASA, Oxford)" },
          { icon: "check", value: "Feb 2025", label: "Submission Date" },
        ],
      },
      {
        type: "text",
        heading: "Why Peer Review Matters for Humanitarian AI",
        content: "WDC's operational reports and field mission documentation establish what we have done and what accuracy we have achieved. Peer review establishes *how* — providing independent scientific validation of the methodology that underlies our claims. Without peer review, WDC's 87% accuracy claim is self-reported. With peer review, it is independently verified against the scientific standard.\n\nThe Michael technical paper (submitted to Nature Sustainability, February 2025) documents the complete methodology: data ingestion pipeline, hazard model architecture, ensemble design, false positive reduction process, community reporter validation protocol, and the 247-event validation study. Four co-authors contributed: WDC's technical team, two IIASA researchers (CLIMB programme), and a humanitarian logistics expert from Oxford's Refugee Studies Centre.\n\nThe paper's central contribution: the first rigorous comparison of AI-powered early warning system performance in data-sparse humanitarian contexts against the meteorological baseline (ECMWF EPS, NWS flash flood guidance). Finding: Michael achieves comparable accuracy to national meteorological services in equivalent contexts at 9–18× lower cost. Secondary finding: the human-in-the-loop validation model reduces false positives by 63% — a finding with implications for all humanitarian AI systems."
      },
      {
        type: "callout",
        variant: "info",
        heading: "Open Science Commitment",
        content: "All data underlying the Michael technical paper — the 247-event validation dataset, the model architecture code, and the false positive analysis — will be published as open datasets on GitHub and OCHA HDX upon journal acceptance. WDC's commitment: humanitarian AI methodology should be transparent and reproducible, not proprietary.",
      },
      {
        type: "quote",
        text: "Peer review is not a formality — it is the process by which a claim becomes knowledge. We have been telling humanitarian partners that Michael achieves 87% accuracy since our 2024 validation study. The peer-reviewed paper is how we make that claim something they can cite, depend on, and build on.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  {
    id: "research-founding-2020",
    category: "Research & Publications",
    title: "WDC Founding Research Paper 2020",
    subtitle: "The Case for AI-Powered Humanitarian Early Warning: Market Failure and the WDC Response",
    date: "October 2020",
    year: 2020,
    pages: 22,
    description: "The founding document of World Disaster Center: the original research paper by Sapiens Ndatabaye that identified the humanitarian early warning market failure, quantified the AI opportunity, and laid out the institutional design of WDC — written during his OCHA service.",
    tags: ["Founding", "Research", "2020", "OCHA", "Market Failure", "Theory of Change"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "flag", value: "2020", label: "WDC Founding Year" },
          { icon: "alert", value: "38%", label: "Africa Share of Global Disaster Deaths" },
          { icon: "trending", value: "9–18×", label: "Projected AI Cost Advantage" },
          { icon: "building", value: "OCHA", label: "Institutional Context of Author" },
        ],
      },
      {
        type: "divider",
        title: "SECTION 1 — THE FOUNDING ARGUMENT",
      },
      {
        type: "text",
        heading: "The Market Failure That Created WDC",
        content: "This paper was written during the author's service as a humanitarian coordinator with OCHA, drawing on direct operational experience across DRC, Sudan, Haiti, and Bangladesh. It identifies the humanitarian early warning market failure that WDC was created to address.\n\nThe market failure is structural: the communities most exposed to disaster risk (rural, poor, fragile-state, Global South) are the least served by early warning systems, because the economics of traditional warning infrastructure (meteorological stations, radar networks, professional forecaster cadres) make those systems prohibitively expensive to deploy in low-income country contexts. The communities that can afford the infrastructure — upper-middle-income countries with functioning governments — are also the communities that face lower disaster mortality because of their baseline resilience. The communities that cannot afford it — DRC, Bangladesh, Haiti, Sudan — face the highest mortality with the least warning.\n\nAI changes the economics. A machine learning model, once trained, costs a fraction of a meteorological forecaster to run. Satellite data from ESA and NASA is freely available. SMS networks reach communities that have no internet. The only missing link, at the time of writing in 2020, was the organizational model: an institution purpose-built to operate at the intersection of AI, satellite data, community networks, and humanitarian coordination.\n\nWorld Disaster Center was the institutional response to that gap. This paper is its founding argument."
      },
      {
        type: "quote",
        text: "I wrote this paper in Goma, after a flash flood killed 35 people in a community 40km from our OCHA office — a flood we knew was coming but had no system to warn them about. WDC exists because that outcome was unacceptable and preventable.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  {
    id: "book-breaking-barriers-2024",
    category: "Research & Publications",
    title: "Breaking Barriers: AI and the Future of Humanitarian Action",
    subtitle: "A Field Practitioner's Guide to Technology-Enabled Disaster Response",
    date: "September 2024",
    year: 2024,
    pages: 186,
    description: "Sapiens Ndatabaye's first book: a practitioner's guide to deploying AI in humanitarian contexts, drawing on 5 years of WDC field experience across DRC, Burundi, Haiti, Sudan, Jamaica, and Afghanistan. Published by the Canadian Humanitarian Press.",
    tags: ["Book", "Humanitarian AI", "Field Guide", "Practitioner", "Canadian Humanitarian Press"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "book", value: "186", label: "Pages" },
          { icon: "globe", value: "6", label: "Country Case Studies" },
          { icon: "graduation", value: "12", label: "Chapters" },
          { icon: "building", value: "Canadian", label: "Humanitarian Press" },
        ],
      },
      {
        type: "text",
        heading: "About the Book",
        content: "Breaking Barriers is the practitioner's guide to humanitarian AI that did not exist when WDC was founded in 2020. It is not an academic text — it is a field manual written for humanitarian coordinators, NGO program managers, national disaster management authorities, and technology practitioners who want to deploy AI in crisis contexts without the trial and error that WDC has absorbed over five years.\n\nThe book is structured around WDC's six field missions — DRC, Burundi, Haiti, Sudan, Jamaica, and Afghanistan — using each as a case study for a different dimension of humanitarian AI deployment: community reporter networks (DRC), institutional integration (Burundi), compound emergency operations (Haiti), remote-sensing-only contexts (Sudan), complementary deployment alongside national systems (Jamaica), and access-constrained contexts (Afghanistan).\n\nThree principles run through every chapter: AI should enhance human judgment, not replace it; the technology only works if the community network works; and failure documentation is as important as success documentation — every false positive, every missed warning, every community that did not receive the alert it needed is documented in these pages, because the humanitarian sector learns from failure, not only from success.\n\nThe book is published open-access by the Canadian Humanitarian Press and available as a free PDF download on WDC's website — because a practitioner's guide to humanitarian AI should be accessible to the practitioners who need it most."
      },
      {
        type: "icon-grid",
        title: "Book Structure — 12 Chapters",
        cols: 2,
        items: [
          { icon: "flag", label: "Ch. 1–2: The Market Failure & WDC's Response", desc: "The humanitarian early warning gap and the institutional design that addresses it." },
          { icon: "cpu", label: "Ch. 3–4: Michael's Architecture", desc: "Technical deep-dive: data ingestion, model design, alert engine, dissemination." },
          { icon: "users", label: "Ch. 5–6: Community Reporter Networks", desc: "DRC and Burundi case studies: recruitment, training, validation, and institutional integration." },
          { icon: "wind", label: "Ch. 7–8: Complex Emergency Operations", desc: "Haiti and Sudan: operating in gang-controlled territory and conflict zones without ground access." },
          { icon: "shield", label: "Ch. 9–10: National System Integration", desc: "Jamaica and Rwanda: complementary deployment alongside functional government systems." },
          { icon: "heart", label: "Ch. 11–12: Ethics, Data, and the Future", desc: "Gender, data sovereignty, AI ethics, and the 5-year roadmap for humanitarian AI at scale." },
        ],
      },
      {
        type: "quote",
        text: "This book is for the humanitarian coordinator in Goma who asks me: 'How do I actually do this?' It is not a vision document. It is a manual — built from five years of getting things right, getting things wrong, and documenting both with equal honesty.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // COMMUNITY PROGRAMS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: "program-academy-2024",
    category: "Community Programs",
    title: "WDC Training Academy: 2024 Annual Report",
    subtitle: "Humanitarian AI Capacity Building — 417 Certificates Issued Across 28 Countries",
    date: "December 2024",
    year: 2024,
    pages: 20,
    description: "The WDC Training Academy issued 417 certificates in 2024 across 5 training tracks: Early Warning Fundamentals, Michael Platform Operations, Community Reporter Training, Humanitarian Data Analysis, and EAGLE Logistics Intelligence — building local capacity in 28 countries.",
    tags: ["Academy", "Training", "Capacity Building", "Certificates", "28 Countries"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "graduation", value: "417", label: "Certificates Issued" },
          { icon: "globe", value: "28", label: "Countries Represented" },
          { icon: "book", value: "5", label: "Training Tracks" },
          { icon: "users", value: "38%", label: "Female Trainees" },
        ],
      },
      {
        type: "divider",
        title: "SECTION 1 — ACADEMY OVERVIEW",
      },
      {
        type: "text",
        heading: "WDC Training Academy: Building the Humanitarian AI Workforce",
        content: "The WDC Training Academy was established in 2023 with a single principle: the humanitarian AI capacity that WDC builds should not remain with WDC. Every partner organization that uses Michael, every community reporter in our network, every national disaster management authority that integrates our systems — they should have the training to operate independently of WDC, to troubleshoot our tools, and eventually to build on them.\n\nIn 2024, the Academy issued 417 certificates across five tracks. Track 1 — Early Warning Fundamentals (4-day course): 187 graduates from 28 countries, covering hazard types, early warning system design, community communication, and humanitarian coordination. Track 2 — Michael Platform Operations (3-day technical course): 94 graduates, primarily government and NGO data staff who integrate Michael's API or SMS alerts into their systems. Track 3 — Community Reporter Training (3-day field course): 120 graduates deployed as active reporters across 6 field missions. Track 4 — Humanitarian Data Analysis (5-day course): 41 graduates, focusing on disaster data interpretation, validation methodology, and reporting standards. Track 5 — EAGLE Logistics Intelligence (2-day course): 25 graduates from logistics and supply chain roles in partner organizations.\n\n38% female trainees in 2024 — up from 22% in 2023. Target: 50% by 2026. The gender gap in humanitarian AI training is a pipeline constraint: we are actively addressing it through partnership with UNHCR's Women's Protection and Empowerment programme."
      },
      {
        type: "bar-chart",
        title: "Academy 2024 — Key Metrics",
        items: [
          { label: "Certificates issued (target: 450)", value: 93, max: 100, color: "blue", note: "417 of 450 target" },
          { label: "Female trainees (target: 40%)", value: 80, max: 100, color: "amber", note: "38% — improving from 22% in 2023" },
          { label: "Graduate retention in humanitarian sector at 6 months", value: 91, max: 100, color: "green", note: "91% still in humanitarian roles" },
          { label: "Countries represented (target: 30)", value: 93, max: 100, color: "blue", note: "28 of 30 target" },
        ],
      },
      {
        type: "quote",
        text: "The Academy is WDC's exit strategy — not from humanitarian AI, but from dependency on WDC. Every certificate we issue is a step toward a world where communities, governments, and NGOs can run AI-powered early warning without us. That is the point.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  {
    id: "program-be-reporter-2024",
    category: "Community Programs",
    title: "Be a Reporter Programme: 2024 Annual Report",
    subtitle: "Community-Driven Disaster Observation — 417 Reporters, 38 Countries",
    date: "November 2024",
    year: 2024,
    pages: 16,
    description: "WDC's community reporter programme: how 417 trained volunteers across 38 countries reduced Michael's false positive rate from 22% to 8.3%, delivered ground truth that improved model accuracy by 6 percentage points, and built community trust in early warning systems.",
    tags: ["Community Reporters", "Ground Truth", "Validation", "38 Countries", "417 Reporters"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "users", value: "417", label: "Active Community Reporters" },
          { icon: "globe", value: "38", label: "Countries" },
          { icon: "shield", value: "8.3%", label: "False Positive Rate (vs. 22% without reporters)" },
          { icon: "check", value: "94%", label: "Reporter Retention Rate" },
        ],
      },
      {
        type: "text",
        heading: "The Human Sensor Network: How 417 People Make Michael Smarter",
        content: "The Be a Reporter programme is the human layer that makes WDC's AI actually work in the field. Michael's raw model — before human validation — generates a 22% false positive rate. This is typical for machine learning models in data-sparse environments. 22% is unusable for humanitarian early warning: if one in five alerts is false, communities stop responding.\n\nThe community reporter network reduces that rate to 8.3% through a structured validation protocol. When Michael issues a Yellow or Red alert, the alert is simultaneously sent to: the institutional partners (OCHA, UNICEF, WFP) via API, and the community reporters in the alert zone via SMS. Reporters have 30 minutes to confirm or flag the alert based on what they observe on the ground — river level, rainfall, road condition, any visible hazard signs. A WDC data desk analyst reviews all reporter inputs and makes the final distribution decision.\n\nThe result: reporters flagged 89 of Michael's 2024 alerts as likely false positives. 81 of those 89 were confirmed false positives upon post-event analysis. This human validation layer prevented 81 false evacuations — preserving community trust and compliance for the genuine alerts that followed. Reporter submissions also generate 14,000+ individual field observations per month that continuously improve Michael's calibration."
      },
      {
        type: "quote",
        text: "A community reporter in North Kivu is not a data collector — he is a trusted community member who translates satellite data into a human judgment that his neighbors will act on. No algorithm can do what he does: knock on doors at midnight and say 'we need to move now, and I will walk with you.'",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  {
    id: "program-expert-roster-2024",
    category: "Community Programs",
    title: "WDC Expert Roster: 2024 Directory",
    subtitle: "87 Humanitarian AI and Disaster Risk Specialists Available for Deployment",
    date: "October 2024",
    year: 2024,
    pages: 14,
    description: "WDC's Expert Roster maintains 87 vetted humanitarian AI and disaster risk specialists available for short-notice deployment to field contexts, technical advisory roles, and training delivery — covering 23 languages and 6 disciplinary domains.",
    tags: ["Expert Roster", "Specialists", "Deployment", "23 Languages", "Humanitarian AI"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "users", value: "87", label: "Roster Members" },
          { icon: "globe", value: "23", label: "Languages Covered" },
          { icon: "shield", value: "48h", label: "Average Deployment Lead Time" },
          { icon: "graduation", value: "6", label: "Disciplinary Domains" },
        ],
      },
      {
        type: "text",
        heading: "The WDC Expert Roster: Deployable Expertise on 48-Hour Notice",
        content: "WDC maintains a standing Expert Roster of 87 vetted specialists available for deployment to field contexts, technical advisory assignments, and training delivery. Roster members are screened for: domain expertise (AI/ML, remote sensing, humanitarian coordination, disaster risk reduction, logistics, or communications), field experience in fragile or conflict-affected contexts, language capability (minimum two languages with at least one of Swahili, Arabic, French, Haitian Creole, Bengali, Pashto, Rohingya, Amharic, or Portuguese), and availability for 48-hour deployment notice.\n\nSix disciplinary domains are covered: (1) AI/ML Engineering — 18 specialists covering Michael platform development, model retraining, and API integration; (2) Remote Sensing & GIS — 14 specialists covering SAR processing, EAGLE assessments, and satellite imagery interpretation; (3) Humanitarian Coordination — 22 specialists with OCHA/cluster system experience; (4) Disaster Risk Reduction — 15 specialists covering community resilience, early warning system design, and DRR policy; (5) Humanitarian Logistics — 11 specialists covering supply chain, pre-positioning, and EAGLE outputs interpretation; (6) Communications & Journalism — 7 specialists covering crisis communication, community radio, and multilingual alert design.\n\nIn 2024, 34 roster deployments were made across 18 countries, totaling 2,847 deployment days. Average deployment lead time: 48 hours for regional deployments, 72 hours for intercontinental. Cost to partners: WDC covers all deployment costs for OCHA formal missions and partner UN agencies; NGOs and national governments pay a cost-recovery day rate."
      },
      {
        type: "quote",
        text: "The Expert Roster exists because crises don't wait for procurement cycles. When OCHA calls at 2am because a cyclone is making landfall in 18 hours, we need to have the right person on a plane by morning.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  {
    id: "program-titan-taskforce-2024",
    category: "Community Programs",
    title: "Titan Taskforce: 2024 Report",
    subtitle: "WDC's Surge Capacity Unit — Rapid Deployment for Level 3 Emergencies",
    date: "September 2024",
    year: 2024,
    pages: 16,
    description: "Titan Taskforce is WDC's dedicated surge unit: 12 core specialists deployable within 24 hours to Level 3 emergencies. In 2024, Titan deployed to Haiti (Hurricane Beryl), Sudan (Khartoum displacement surge), and Bangladesh (Cyclone Remal) — 384 collective surge days.",
    tags: ["Titan Taskforce", "Surge Capacity", "Level 3", "Rapid Deployment", "Haiti", "Sudan", "Bangladesh"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "zap", value: "24h", label: "Deployment Lead Time" },
          { icon: "users", value: "12", label: "Core Titan Specialists" },
          { icon: "shield", value: "3", label: "L3 Emergencies in 2024" },
          { icon: "clock", value: "384", label: "Total Surge Days" },
        ],
      },
      {
        type: "text",
        heading: "Titan Taskforce: The 24-Hour Surge Capability",
        content: "The UN humanitarian system classifies emergencies at three levels: L1 (manageable with existing resources), L2 (requiring system-wide support), and L3 (highest severity, full mobilization). L3 emergencies in 2024: Haiti (Hurricane Beryl impact, July), Sudan (Khartoum civilian displacement surge, June), and Bangladesh (Cyclone Remal landfall, May). Titan Taskforce deployed to all three.\n\nTitan's 12 core specialists are on permanent 24-hour readiness: go-bags packed, visas current for 40+ countries, medical clearances valid. The unit includes: 3 AI/data specialists (Michael platform deployment and remote data operations), 2 EAGLE logistics analysts, 3 humanitarian coordinators (OCHA cluster system expertise), 2 community network coordinators, 1 medical officer, and 1 communications and media specialist.\n\nTitan's value proposition is time: the 24-hour deployment capability versus the 5–10 day typical surge deployment timeline of most humanitarian organizations. In acute emergencies, the first 72 hours determine response effectiveness. Titan's presence in Haiti during Beryl's landfall — establishing Michael's real-time monitoring, coordinating with OCHA cluster leads, and activating the community reporter relay — was the operational backbone of WDC's most significant single-event impact in 2024."
      },
      {
        type: "timeline",
        title: "Titan Deployments 2024",
        items: [
          { year: "May 2024", icon: "wind", title: "Bangladesh — Cyclone Remal", content: "4 Titan specialists deployed to Cox's Bazar 26 hours before Remal landfall. Michael monitoring established. BDRCS coordination. 800,000 coastal residents pre-evacuated." },
          { year: "Jun 2024", icon: "alert", title: "Sudan — Khartoum Displacement Surge", content: "Remote-only deployment: 3 Titan data specialists activated remote Sudan monitoring from Ottawa within 18 hours of RSF advance on Omdurman. Displacement forecast delivered to UNHCR within 24 hours." },
          { year: "Jul 2024", icon: "flag", title: "Haiti — Hurricane Beryl", content: "Full 8-specialist Titan deployment to Port-au-Prince 48 hours before Beryl. Most complex single deployment in Titan history — gang security protocols, limited airport access, simultaneous monitoring and coordination." },
        ],
      },
      {
        type: "quote",
        text: "Titan exists because 72 hours is not a planning horizon — it is a countdown. You cannot recruit, brief, and deploy a specialist in 72 hours. Titan is the answer to that constraint: people who are already briefed, already equipped, and ready to move when the phone rings.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  {
    id: "program-30day-challenge-2025",
    category: "Community Programs",
    title: "30-Day Humanitarian AI Challenge: January 2025",
    subtitle: "Open Innovation Accelerator — 340 Participants, 28 Prototypes, 5 WDC Pilots",
    date: "February 2025",
    year: 2025,
    pages: 14,
    description: "WDC's first open innovation challenge: 340 participants from 44 countries competed to build humanitarian AI tools in 30 days. Five winning prototypes entered WDC's pilot pipeline, including a Swahili-language chatbot disaster guide and an offline flood risk calculator for feature phones.",
    tags: ["Innovation", "Challenge", "30 Days", "Open Innovation", "AI", "Prototypes", "2025"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "users", value: "340", label: "Challenge Participants" },
          { icon: "globe", value: "44", label: "Countries" },
          { icon: "cpu", value: "28", label: "Prototypes Submitted" },
          { icon: "award", value: "5", label: "WDC Pilot Selections" },
        ],
      },
      {
        type: "text",
        heading: "30-Day Challenge: Open Innovation for Humanitarian AI",
        content: "The WDC 30-Day Humanitarian AI Challenge (January 2025) was an experiment in open innovation: what humanitarian AI tools would emerge if we gave 340 practitioners, engineers, and designers 30 days, open access to WDC's data APIs, and a community of mentors from WDC, OCHA, and IIASA?\n\nThe answer: 28 prototypes across six challenge tracks — early warning communication, community reporter tools, logistics intelligence, data visualization, offline-capable AI, and gender-responsive design. Quality ranged from sketched wireframes to working code. Five prototypes entered WDC's formal pilot pipeline.\n\n**Top 5 Winning Prototypes**: (1) SwahiliAlert — a Swahili-language WhatsApp chatbot that delivers Michael alerts in conversational Swahili with action-specific guidance (Team: 2 developers from Nairobi, 1 from Kigali). (2) FeatureFlood — an offline flood risk calculator for 2G feature phones using USSD protocol (Team: 3 engineers from Dhaka). (3) GenderSafe — an alert modification tool that adds gender-specific action guidance to Michael SMS alerts (Team: gender specialists from CARE and WDC). (4) RouterEAGLE — a simplified EAGLE route passability interface for non-technical logistics staff (Team: WFP logistics colleagues). (5) CommReporter Pro — an enhanced community reporter submission app with offline photo documentation (Team: 4 developers from DRC and Burundi)."
      },
      {
        type: "quote",
        text: "The 30-Day Challenge proved something important: the humanitarian AI problem is not short of ideas. It is short of institutional champions willing to test those ideas in the field. WDC will be that champion for these five prototypes.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  {
    id: "program-africa-gap-2024",
    category: "Community Programs",
    title: "Africa Data Gap Initiative: 2024 Progress Report",
    subtitle: "Closing the Observation Network Gap — Community Sensors, Open Data, AI",
    date: "October 2024",
    year: 2024,
    pages: 18,
    description: "WDC's Africa Data Gap Initiative: deploying 340 low-cost weather sensors across 12 Sub-Saharan African countries, training 180 data stewards, and contributing 2.4 million new observational data points to the WMO's Global Basic Observing Network — addressing Africa's catastrophic weather station deficit.",
    tags: ["Africa", "Data Gap", "Weather Sensors", "WMO", "Open Data", "Community Science"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "activity", value: "340", label: "Sensors Deployed" },
          { icon: "globe", value: "12", label: "Sub-Saharan Countries" },
          { icon: "database", value: "2.4M", label: "New Observation Data Points" },
          { icon: "users", value: "180", label: "Community Data Stewards Trained" },
        ],
      },
      {
        type: "text",
        heading: "The Africa Data Gap: 8% of the World's Weather Stations for 38% of Its Disaster Deaths",
        content: "Africa's weather observation network is the most under-resourced on the planet relative to risk. The WMO's Global Basic Observing Network (GBON) requires a minimum of 1 weather station per 1,000 km² for countries with complex terrain. Sub-Saharan Africa averages 1 station per 6,400 km² — 6.4 times below the minimum. In DRC, the ratio is 1 per 47,000 km². In South Sudan, large regions have zero weather stations.\n\nThe consequence for Michael: AI models trained on data from data-rich environments systematically underperform in data-sparse ones because the statistical relationships that enable prediction are calibrated on observations that do not exist in these contexts. The Africa Data Gap Initiative addresses this by deploying a network of low-cost automatic weather stations (Vaisala WXT536 equivalent, at USD 1,200/unit — 50× cheaper than professional-grade stations) managed by community data stewards.\n\n340 sensors deployed in 2024 across DRC, Burundi, Rwanda, Kenya, Ethiopia, Somalia (accessible areas only), Tanzania, Mozambique, Malawi, Zimbabwe, Sierra Leone, and Ghana. Each sensor connects via mobile data to WDC's collection servers, feeding real-time rainfall, temperature, humidity, and wind measurements every 15 minutes. 2.4 million new observations contributed to the WMO GBON database in 2024 — the largest single-year contribution to African observational data from an NGO."
      },
      {
        type: "quote",
        text: "A USD 1,200 sensor deployed in Baringo County, Kenya generates data that improves flood forecasting accuracy for 400,000 people. The entire 340-sensor network costs less than two professional meteorological stations. This is what appropriate technology looks like.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  {
    id: "program-united-change-2025",
    category: "Community Programs",
    title: "United for Change Coalition: 2025 Launch Report",
    subtitle: "WDC-Led Multi-Stakeholder Coalition for Humanitarian AI Governance",
    date: "January 2025",
    year: 2025,
    pages: 12,
    description: "United for Change is WDC's 2025 multi-stakeholder coalition launch: 34 founding organizations (NGOs, governments, UN agencies, technology companies) committed to a shared governance framework for humanitarian AI — including standards for accuracy reporting, data sovereignty, and community consent.",
    tags: ["Coalition", "Governance", "Humanitarian AI", "Standards", "2025", "Multi-Stakeholder"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "handshake", value: "34", label: "Founding Organizations" },
          { icon: "globe", value: "19", label: "Countries Represented" },
          { icon: "shield", value: "6", label: "Governance Commitments" },
          { icon: "flag", value: "Jan 2025", label: "Coalition Launch" },
        ],
      },
      {
        type: "text",
        heading: "United for Change: Why Humanitarian AI Needs a Governance Coalition",
        content: "The humanitarian AI sector is proliferating — dozens of organizations are deploying AI tools in crisis contexts, making accuracy claims without methodology, collecting community data without consent frameworks, and building systems that are not interoperable. The absence of shared standards creates risk: communities served by multiple AI systems receive conflicting alerts, accuracy claims cannot be compared, and data sovereignty principles vary from organization to organization.\n\nWDC launched the United for Change Coalition in January 2025 with 34 founding organizations — spanning NGOs (CARE, MSF, World Vision, IRC), UN agencies (OCHA, UNICEF, WFP, UNHCR), donor governments (Canada, Germany, Netherlands, Sweden), technology companies (Microsoft, Google.org, Palantir for Good), and academic institutions (IIASA Vienna, Oxford RSC, MIT Media Lab).\n\nSix founding commitments: (1) Publish accuracy validation methodology using WHO-standard blind assessment; (2) Adopt OCHA Data Responsibility Guidelines for all community data; (3) Contribute to open observational data commons (WMO GBON); (4) Implement IASC gender marker requirements for all AI early warning tools; (5) Support local capacity transfer rather than external dependency; (6) Publish annual independent audit of AI system performance. WDC adopted all six commitments at founding — this Coalition report documents our compliance."
      },
      {
        type: "quote",
        text: "United for Change is not a WDC programme — it is a sector commitment. WDC convened it because someone had to. The humanitarian AI field needs governance before it needs more tools. Both are needed. But governance first.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },

  {
    id: "program-wdc-partnerships-2024",
    category: "Community Programs",
    title: "WDC Partnerships Report 2024",
    subtitle: "52 Active Partners — UN Agencies, Governments, Technology Companies & Civil Society",
    date: "December 2024",
    year: 2024,
    pages: 16,
    description: "WDC's annual partnership report: 52 active partnerships across 4 categories (UN/multilateral, government, technology, civil society), USD 3.2M in partnership-sourced funding, and the partnership governance framework that ensures alignment with WDC's humanitarian mandate.",
    tags: ["Partnerships", "52 Partners", "UN", "Technology", "Government", "Civil Society"],
    signedBy: SIG,
    signedTitle: SIG_TITLE,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "handshake", value: "52", label: "Active Partners" },
          { icon: "trending", value: "$3.2M", label: "Partnership-Sourced Funding 2024" },
          { icon: "globe", value: "4", label: "Partnership Categories" },
          { icon: "building", value: "12", label: "Government Partners" },
        ],
      },
      {
        type: "divider",
        title: "SECTION 1 — PARTNERSHIP OVERVIEW",
      },
      {
        type: "text",
        heading: "WDC's 52 Active Partnerships: Structure, Value, and Governance",
        content: "WDC's 52 active partnerships are organized across four categories, each with distinct governance requirements and value propositions.\n\n**Category 1 — UN & Multilateral (14 partners)**: OCHA, UNICEF, WFP, UNHCR, UNDP, UNFCCC, WMO, IOM, MSF, ICRC, and 4 regional bodies (IGAD, ECOWAS, CDEMA, ASEAN-AADMER). These partnerships provide: formal alert distribution channels (UNICEF and OCHA integrate Michael alerts in 3 countries), data access (WMO GTS), and mandate alignment (WFP pre-positioning activation, UNHCR protection monitoring). Funding from this category: USD 640,000 in 2024 (UNICEF innovation grant, WFP logistics integration contract).\n\n**Category 2 — Government Partners (12 partners)**: Canadian Government (primary donor, USD 1.2M in 2024), Government of the Netherlands, German BMBF (CLIMB co-funding), PNPRC Burundi (national integration partner), KMD Kenya, NDOC Kenya, MIDIMAR Rwanda, ODPEM Jamaica, DDM Bangladesh, and 3 additional national disaster management authorities.\n\n**Category 3 — Technology Partners (11 partners)**: Microsoft AI for Humanitarian Action, Google.org, AWS (Amazon Web Services for specific deployments), ESA (Copernicus data access), NASA (FIRMS, IMERG), USGS, ECMWF, ACLED, Airbus Defence & Space, Vaisala (sensor hardware), and Twilio (SMS gateway).\n\n**Category 4 — Civil Society & Academic (15 partners)**: CARE, World Vision, IRC, DRC (Danish Refugee Council), NCA, ACTED, IIASA Vienna, Oxford RSC, MIT Media Lab, Princeton Center for Human Values, and 5 national civil society organizations in field mission countries.\n\nPartnership governance: all partners sign WDC's Partnership Framework, which includes: data sharing restrictions (no community data to parties to armed conflicts), brand use guidelines, joint validation protocols for accuracy claims, and annual performance reviews."
      },
      {
        type: "partners",
        title: "2024 Partners — Full List",
        items: [
          "OCHA", "UNICEF", "WFP", "UNHCR", "UNDP", "UNFCCC", "WMO", "IOM",
          "MSF", "ICRC", "IGAD", "ECOWAS", "CDEMA", "ASEAN-AADMER",
          "Government of Canada", "Netherlands MFA", "German BMBF",
          "PNPRC (Burundi)", "KMD (Kenya)", "NDOC (Kenya)", "MIDIMAR (Rwanda)", "ODPEM (Jamaica)", "DDM (Bangladesh)",
          "Microsoft AI for Humanitarian Action", "Google.org", "AWS", "ESA", "NASA", "USGS", "ECMWF", "ACLED", "Airbus D&S", "Vaisala", "Twilio",
          "CARE", "World Vision", "IRC", "DRC (Danish Refugee Council)", "NCA", "ACTED",
          "IIASA Vienna", "Oxford RSC", "MIT Media Lab", "Princeton CHV"
        ],
      },
      {
        type: "quote",
        text: "52 partners sounds like success. But partnerships are only as strong as the shared value they create. Every partnership on this list exists because both parties — WDC and the partner — gain something that neither could produce alone. The day a partnership stops creating mutual value is the day we begin the exit process.",
        attribution: "Sapiens Ndatabaye, Founder & Executive Director, World Disaster Center",
      },
    ],
  },
];

export const getProjectCategoryColor = (category) => {
  const map = {
    "Product Reports":          "bg-purple-100 text-purple-700",
    "Field Mission Reports":    "bg-orange-100 text-orange-700",
    "Research & Publications":  "bg-indigo-100 text-indigo-800",
    "Community Programs":       "bg-pink-100 text-pink-800",
  };
  return map[category] || null;
};
