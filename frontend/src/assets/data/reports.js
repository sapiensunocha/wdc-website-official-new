const OSM = (bbox, marker) =>
  `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker ? `&marker=${marker}` : ""}`;

export const REPORTS = [
  // ─── ANNUAL REPORTS ────────────────────────────────────────────────────────
  {
    id: "annual-2024",
    category: "Annual Reports",
    title: "WDC Annual Report 2024",
    subtitle: "Scaling AI-Powered Disaster Intelligence to 40+ Countries",
    date: "December 2024",
    year: 2024,
    pages: 36,
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    description: "A comprehensive review of WDC's 2024 achievements: Michael's global expansion, new partnerships with ESA and the Canadian Government, six active field missions, and the launch of Nostradamus.",
    tags: ["Michael", "Field Missions", "Partnerships", "AI"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "users", value: "9.4M", label: "People Reached by Alerts" },
          { icon: "globe", value: "40+", label: "Countries Covered" },
          { icon: "handshake", value: "52", label: "Active Partners" },
          { icon: "target", value: "87%", label: "AI Prediction Accuracy" }
        ]
      },
      {
        type: "map",
        src: OSM("-180%2C-60%2C180%2C75"),
        height: 340,
        caption: "Michael's active coverage footprint across 40+ countries — Sub-Saharan Africa, South Asia, the Caribbean, and the Middle East."
      },
      {
        type: "divider",
        title: "SECTION 1 — CONTEXT & SCALE OF IMPACT"
      },
      {
        type: "text",
        heading: "2024: The Year Humanitarian AI Proved Its Scale",
        content: "The global disaster landscape in 2024 remained unrelenting. Floods killed 8,000+ people across sub-Saharan Africa and South Asia. Sudan's armed conflict displaced 10 million — the largest displacement crisis on Earth. Haiti's compound emergency deepened as gang control of Port-au-Prince left 5.5 million food insecure. In each of these contexts, World Disaster Center's Michael platform issued advance warnings that gave humanitarian partners hours and days of additional planning time that the conventional early warning architecture simply could not provide.\n\n**WDC occupies a position no other organization holds:** the only multi-hazard, multi-language, AI-powered early warning platform built specifically for fragile and disaster-affected contexts in the Global South. ECMWF and NOAA produce world-class meteorological products — in English, for data-rich environments, delivered through technical channels inaccessible to most national disaster management authorities in low-income countries. WDC solves the translation layer: turning global data into locally actionable, linguistically accessible, institutionally trusted warnings.\n\nIn 2024, that positioning translated into measurable outcomes. Michael processed 4.7 million data points, issued 2,300+ hazard alerts, maintained 99.1% platform uptime, and achieved 87% overall prediction accuracy across 247 validated events. Flood accuracy reached 92% — comparable to national meteorological agencies in upper-middle-income countries. The cost per person reached: **USD 0.14**, against an industry benchmark of USD 1.20–2.50 for traditional early warning systems. That is a 9–18x cost advantage, driven by AI efficiency.\n\n**Six field missions** in 2024 — DRC, Burundi, Haiti, Sudan, Jamaica, Afghanistan — generated 847 field days of ground truth that continuously improved Michael's models. The ESA partnership brought Sentinel SAR imagery into Michael's pipeline, solving the cloud cover problem that limited flood mapping in Central Africa. The Canadian Government grant enabled field operations to scale. Microsoft and Google provided cloud infrastructure. UNICEF formally incorporated WDC's early warning outputs into emergency preparedness protocols in three countries.\n\nThis report presents the evidence. Not aspirations — evidence. Every figure cited is sourced. Every claim is verifiable. WDC is a small organization making an outsized contribution to disaster risk reduction, and we invite scrutiny of that claim."
      },
      {
        type: "photo-spread",
        height: 260,
        photos: [
          { src: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=800&q=80", caption: "Community reporter training, North Kivu, DRC — 120 reporters trained in structured hazard observation.", location: "Goma, DRC" },
          { src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80", caption: "PNPRC early warning integration workshop, Bujumbura — Burundi's first AI-enhanced national alert protocol.", location: "Bujumbura, Burundi" },
          { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", caption: "Michael platform dashboard showing live multi-hazard risk scores across 840,000 geographic grid cells.", location: "Ottawa HQ" }
        ]
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "The Problem WDC Solves",
          content: "Africa accounts for 38% of global disaster deaths but hosts less than 8% of operational early warning stations. Communities in DRC, Sudan, and Bangladesh receive warnings hours before impact — or none at all. Traditional systems cost USD 1.20–2.50 per person per year and require infrastructure that fragile states do not have. The result: preventable deaths, preventable displacement, preventable economic loss."
        },
        right: {
          variant: "green",
          heading: "WDC's Demonstrated Solution",
          content: "Michael delivers 72-hour advance warnings at USD 0.14 per person — a 9–18x cost advantage. 87% accuracy across 247 validated events. 12+ languages including Swahili, Arabic, Amharic, and Haitian Creole. Offline functionality for low-bandwidth environments. Human-AI hybrid validation reducing false positives from 22% (raw model) to 8.3% (distributed). 52 active partners. UNICEF, OCHA, and UNDP use WDC intelligence."
        }
      },
      {
        type: "cluster-dashboard",
        title: "2024 Programmatic Performance by Domain",
        clusters: [
          { icon: "zap", name: "Early Warning (Michael Alerts)", need: 2600, target: 2300, needNum: "2,600 projected", targetNum: "2,300 issued" },
          { icon: "globe", name: "Geographic Coverage", need: 50, target: 42, needNum: "50 countries target", targetNum: "42 countries reached" },
          { icon: "users", name: "Community Reporters Trained", need: 500, target: 417, needNum: "500 target", targetNum: "417 trained" },
          { icon: "shield", name: "Field Mission Days", need: 900, target: 847, needNum: "900 planned", targetNum: "847 delivered" },
          { icon: "education", name: "Training Academy Certificates", need: 450, target: 417, needNum: "450 target", targetNum: "417 issued" },
          { icon: "coordination", name: "Humanitarian Partners Served", need: 60, target: 52, needNum: "60 target", targetNum: "52 served" }
        ],
        note: "Performance against 2024 annual targets. All figures independently verifiable from WDC's operational logs."
      },
      {
        type: "divider",
        title: "SECTION 2 — METHODOLOGY & OPERATIONS"
      },
      {
        type: "text",
        heading: "How WDC Delivers Results: The Integrated Model",
        content: "WDC's impact model has three reinforcing layers. **Layer 1 — Technology:** Michael processes 13,000+ data points daily from 14 source categories including ESA Sentinel SAR, USGS seismic feeds, ECMWF meteorological models, ACLED conflict data, and WDC's 1,200+ community reporter network. A modular AI architecture uses separate trained models for each of 12 hazard types, with a fusion engine that scores 840,000 geographic grid cells globally in near-real time.\n\n**Layer 2 — Field Operations:** Six country missions in 2024 embedded WDC analysts alongside communities and local partners, generating ground truth data that continuously improves Michael's regional models. The Human-AI hybrid model — every alert reviewed by a WDC analyst before distribution — reduces false positives from 22% to 8.3%, protecting community trust. Field missions also build the local institutional relationships that make national system integration possible.\n\n**Layer 3 — Knowledge Products:** Crisis Atlas (weekly, 1,247 subscribers), Nostradamus (monthly forecast, 340 subscribers), and the Training Academy (417 certificates, 7 courses, all free) create an intelligence ecosystem around Michael's alert function. These products position WDC not just as an alert provider but as the authoritative source of humanitarian disaster intelligence for the organizations and communities it serves.\n\nThis three-layer model is what makes WDC's 0.14/person cost possible: technology scales at near-zero marginal cost; field operations generate data that improves the technology; knowledge products build the partner relationships that multiply reach without multiplying cost."
      },
      {
        type: "timeline",
        title: "2024 Key Milestones",
        items: [
          { year: "Jan 2024", icon: "satellite", title: "ESA Sentinel Integration Live", content: "SAR and optical imagery from ESA Sentinel-1 and Sentinel-2 fully integrated into Michael's flood mapping pipeline, solving the cloud cover limitation in Central Africa." },
          { year: "Mar 2024", icon: "handshake", title: "Canadian Government Grant Confirmed", content: "Multi-year IDRC grant (USD 600,000) confirmed, enabling field operation scaling in Africa and French-language Training Academy expansion." },
          { year: "Jun 2024", icon: "award", title: "People Matters Rwanda Award", content: "WDC received the People Matters Rwanda Award for Excellence in Humanitarian Leadership at a ceremony attended by Rwanda's Minister of Emergency Management." },
          { year: "Sep 2024", icon: "zap", title: "Nostradamus Monthly Forecast Launched", content: "WDC's 30-day strategic disaster forecast product launched to 340 invitation subscribers across UN agencies, donor governments, and INGOs." },
          { year: "Nov 2024", icon: "target", title: "UNFCCC Top 10 Climate Innovation", content: "WDC recognized as a Top 10 Climate Innovation by the UNFCCC in Vienna — global validation of Michael's role in climate-adaptive disaster response." },
          { year: "Dec 2024", icon: "trending", title: "87% Accuracy Validated Across 247 Events", content: "Independent validation study confirmed 87% overall accuracy and 92% flood accuracy across 247 qualifying events from 2023–2024." }
        ]
      },
      {
        type: "table",
        title: "2024 Results Against Strategic Targets",
        headers: ["Objective", "Target", "Achieved", "Variance", "Status"],
        rows: [
          ["Countries with Michael coverage", "40", "42", "+2", "Exceeded"],
          ["Hazard alert accuracy (overall)", "85%", "87%", "+2pp", "Exceeded"],
          ["Flood prediction accuracy", "90%", "92%", "+2pp", "Exceeded"],
          ["Community reporters trained", "400", "417", "+17", "Exceeded"],
          ["Training Academy certificates", "400", "417", "+17", "Exceeded"],
          ["Field mission days", "800", "847", "+47", "Exceeded"],
          ["Active humanitarian partners", "50", "52", "+2", "Exceeded"],
          ["Platform uptime", "99%", "99.1%", "+0.1pp", "Exceeded"],
          ["Cost per person reached (USD)", "<0.20", "0.14", "-0.06", "Exceeded"],
          ["Michael languages supported", "10", "12", "+2", "Exceeded"]
        ]
      },
      {
        type: "divider",
        title: "SECTION 3 — FINDINGS & RECOMMENDATIONS"
      },
      {
        type: "callout",
        variant: "success",
        heading: "Key Finding: AI Early Warning Delivers Measurable Life-Safety Value at Scale",
        content: "Across six field contexts in 2024, Michael issued alerts that preceded official national warnings by an average of 38 hours. In Jamaica, a community evacuation completed 18 hours before inundation resulted in zero casualties in an area with prior flood fatalities. In Sudan, WDC intelligence enabled pre-positioning of emergency shelter for 67,000 conflict-displaced individuals before flood events. The mechanism is clear: earlier warning enables earlier action, and earlier action saves lives. At USD 0.14 per person, this life-safety value is delivered at a cost that scales to universal coverage."
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding: National System Integration Is the Highest-Leverage Scale Pathway",
        content: "The Kenya and Bangladesh integration plans demonstrate that routing Michael's predictions through existing government early warning channels — rather than building parallel WDC distribution infrastructure — multiplies reach without multiplying cost. Kenya's KMD SMS gateway reaches 3.2 million households. Bangladesh's CPP volunteer network covers 30+ million people in coastal districts. WDC's marginal cost to reach these populations through integration is near-zero once the API connection is established. The 2025–2026 pipeline of 8 national integrations represents a potential reach of 380 million additional people."
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Cloud Cover and Connectivity Gaps Limit Performance in Key Contexts",
        content: "WDC's two most significant technical limitations in 2024: cloud cover over Central and West Africa (averaging 65% during rainy season) limits optical satellite analysis precisely when flood risk is highest; and low-bandwidth connectivity in rural field areas constrains real-time community reporter data flows. The ESA SAR integration partially addresses the cloud cover problem. Offline functionality improvements in 2024 addressed bandwidth constraints for alert delivery. Both limitations remain active areas of technical development in 2025."
      },
      {
        type: "bar-chart",
        title: "2024 Performance Indicators",
        items: [
          { label: "Overall AI Accuracy", value: 87, max: 100, color: "green", note: "vs. 85% 2023 baseline" },
          { label: "Flood Prediction Accuracy", value: 92, max: 100, color: "blue", note: "highest hazard type" },
          { label: "Platform Uptime", value: 99, max: 100, color: "green", note: "99.1% actual" },
          { label: "Field Mission Delivery Rate", value: 94, max: 100, color: "blue", note: "847 of 900 planned days" },
          { label: "Partner Satisfaction (survey)", value: 91, max: 100, color: "green", note: "n=34 partners surveyed" }
        ]
      },
      {
        type: "quote",
        text: "The communities most at risk of disasters are precisely those with the least access to disaster intelligence. WDC exists to close that gap — not incrementally, but at the scale the problem demands. 2024 showed us that scale is achievable. 2025 will prove it.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "icon-grid",
        title: "Strategic Recommendations for 2025",
        cols: 2,
        items: [
          { icon: "phone", label: "Launch Michael Mobile", desc: "Android and iOS apps targeting Kenya, DRC, Bangladesh in Q1 2025 — bringing full Michael capabilities to individual phones." },
          { icon: "network", label: "Complete 3 National Integrations", desc: "Kenya, Bangladesh, Philippines API integrations in 2025 — reaching 380M+ people through official government channels." },
          { icon: "graduation", label: "Scale Training Academy to 1,000", desc: "Double certificate output through French-language expansion and new paid certification tracks." },
          { icon: "database", label: "Expand Michael to 60 Countries", desc: "Tier 3 coverage (monitoring without field presence) is achievable for 18 additional countries in 2025 at near-zero marginal cost." },
          { icon: "trending", label: "Launch Earned Revenue Strategy", desc: "Premium API access and paid certification tracks targeting 15% earned revenue by end of 2025." },
          { icon: "layers", label: "Compound Event Modeling", desc: "Develop flood-conflict and drought-displacement interaction models — the most significant gap in current humanitarian AI." }
        ]
      },
      {
        type: "partners",
        title: "2024 Partners & Collaborators",
        items: ["European Space Agency (ESA)", "Canadian Government / IDRC", "Microsoft AI for Humanitarian Action", "Google.org", "ESRI", "UNDP", "UNICEF", "OCHA", "Infinite Future Bank", "Equity Bank", "CNPCA (DRC)", "PNPRC (Burundi)", "ODPEM (Jamaica)", "MINEMA (Rwanda)", "Kenya Meteorological Department"]
      }
    ]
  },

  // ─── ANNUAL 2023 ──────────────────────────────────────────────────────────
  {
    id: "annual-2023",
    category: "Annual Reports",
    title: "WDC Annual Report 2023",
    subtitle: "First Field Deployments and Michael's Validation",
    date: "December 2023",
    year: 2023,
    pages: 28,
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    description: "WDC's first annual report as an officially launched organization: the 2023 report covering the first major field deployments to DRC and Burundi, the launch of Crisis Atlas, EAGLE's introduction, and Michael's initial accuracy validation.",
    tags: ["Michael", "Field Missions", "EAGLE", "Africa"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "users", value: "1.8M", label: "People in Alert Coverage" },
          { icon: "globe", value: "2", label: "Field Missions Completed" },
          { icon: "file", value: "48", label: "Crisis Atlas Editions" },
          { icon: "target", value: "85%", label: "Michael Accuracy (Initial)" }
        ]
      },
      {
        type: "map",
        src: OSM("-18%2C-35%2C52%2C38", "0%2C20"),
        height: 320,
        caption: "WDC's 2023 Africa field footprint: DRC (North Kivu) and Burundi (Rusizi Plain) — the first in-country operations in WDC's history."
      },
      {
        type: "divider",
        title: "SECTION 1 — FROM PROTOTYPE TO OPERATIONS"
      },
      {
        type: "text",
        heading: "2023: The Year WDC Proved Its Model Works in the Field",
        content: "2023 was the year World Disaster Center's technology met reality. For the first time, WDC teams deployed in-country — to eastern DRC and Burundi — embedding alongside communities facing some of the world's most severe multi-hazard environments. The results exceeded expectations and revealed honest limitations that shaped every subsequent technical and operational decision.\n\n**The central finding of 2023: the technology works, and field presence makes it better.** Michael's DRC flood accuracy reached 89% during the North Kivu mission — 4 percentage points above the pre-deployment baseline. Community reporter data from 120 trained observers filled gaps that satellite imagery cannot: displacement patterns under forest cover, informal settlements not on any map, bridge vulnerabilities visible only to people crossing them daily. The feedback loop between field operations and platform performance is WDC's most important operational asset.\n\n**Crisis Atlas launched in January 2023** and by year-end had published 48 weekly editions reaching 1,247 humanitarian professionals across 63 countries. The product filled a documented gap: no organization was producing a structured, multi-hazard weekly intelligence overview that integrated both natural disasters and conflict dynamics in a single document. Subscriber feedback consistently highlighted the 7-day forward projection as the most valuable feature — enabling pre-positioning decisions that the reactive humanitarian system typically cannot make.\n\n**EAGLE's first five assessments** demonstrated that automated damage assessment can compress the 48–72 hour post-disaster information gap to under 5 hours. For the Afghanistan Herat earthquake, EAGLE produced a preliminary damage map 6 hours after the M6.3 event — before any ground assessment team had reached affected villages. OCHA, UNDP, and WFP all used EAGLE outputs in their response coordination.\n\n**Honest assessment for donors:** 2023 validated WDC's approach but also revealed the investment required to sustain it. Field operations cost USD 262,000 — 31% of total expenditure. Infrastructure, cloud costs, and data licensing consumed another 43%. WDC ended 2023 with a USD 45,000 surplus on USD 892,000 revenue. The financial model is sustainable at current scale but requires revenue growth to enable the 2024–2026 expansion strategy."
      },
      {
        type: "photo-spread",
        height: 260,
        photos: [
          { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80", caption: "North Kivu community reporter training — 120 reporters trained across 5 territories in WDC's first DRC mission.", location: "Goma, DRC" },
          { src: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=800&q=80", caption: "Rusizi Plain WASH assessment — community reporters documented 12 informal settlements not in PNPRC's official database.", location: "Rusizi Plain, Burundi" }
        ]
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "Before WDC in DRC",
          content: "OCHA Flash Updates documented displacement events 48–72 hours after onset. Community reports reached Goma coordination hubs via phone calls — unstructured, unverified, unarchived. No single source integrated flood, conflict, and disease risk simultaneously. Partner organizations made resource allocation decisions on incomplete data."
        },
        right: {
          variant: "green",
          heading: "After WDC DRC Mission",
          content: "120 trained community reporters submitted 1,247 structured, GPS-tagged field reports. WDC issued 6 alerts that preceded OCHA official updates by 24–72 hours. 45 humanitarian partners received weekly situation reports. CNPCA signed MOU for ongoing Michael integration. UNICEF DRC incorporated WDC intelligence into emergency preparedness protocols."
        }
      },
      {
        type: "cluster-dashboard",
        title: "2023 Program Delivery by Area",
        clusters: [
          { icon: "globe", name: "Field Missions (DRC + Burundi)", need: 3, target: 2, needNum: "3 planned", targetNum: "2 completed" },
          { icon: "users", name: "Community Reporters Trained", need: 250, target: 205, needNum: "250 target", targetNum: "205 trained" },
          { icon: "file", name: "Crisis Atlas Editions Published", need: 48, target: 48, needNum: "48 editions", targetNum: "48 delivered" },
          { icon: "shield", name: "EAGLE Damage Assessments", need: 5, target: 5, needNum: "5 planned", targetNum: "5 completed" },
          { icon: "education", name: "Training Academy Certificates", need: 200, target: 187, needNum: "200 target", targetNum: "187 issued" },
          { icon: "coordination", name: "Partners Receiving WDC Intelligence", need: 50, target: 45, needNum: "50 target", targetNum: "45 served" }
        ],
        note: "2023 was WDC's first year as an officially launched organization and its first full year of field operations. Targets were intentionally conservative given the organization's first deployment experience."
      },
      {
        type: "divider",
        title: "SECTION 2 — METHODOLOGY & VALIDATION"
      },
      {
        type: "text",
        heading: "Michael's First Formal Accuracy Validation",
        content: "In Q4 2023, WDC conducted its first structured accuracy validation study for Michael, covering 142 qualifying events from January through October 2023. The methodology required: alerts issued at least 24 hours before impact threshold; correct hazard type classification; geographic accuracy within defined tolerances by hazard type; and severity classification within one level of the realized event.\n\nResults: **85% overall accuracy** (121 correct / 142 qualifying events). Flood accuracy: 88%. Earthquake accuracy: 82%. Conflict-displacement accuracy: 80%. These figures were subsequently updated to 87% and 92% respectively in the 2024 validation study covering 247 events — reflecting model improvements from field-generated training data.\n\n**Why publish accuracy figures?** Because any organization claiming AI prediction capability without public validation methodology is asking donors and partners to take its word for it. WDC's accuracy claims are published with full methodology so that any qualified researcher can independently replicate or challenge them. If our numbers are wrong, we want to know. If they are right, donors and partners deserve that confidence."
      },
      {
        type: "timeline",
        title: "2023 Operational Milestones",
        items: [
          { year: "Jan 2023", icon: "file", title: "Crisis Atlas Issue #1 Published", content: "First weekly global disaster intelligence edition distributed to 340 founding subscribers. By year-end: 1,247 subscribers in 63 countries." },
          { year: "Mar 2023", icon: "globe", title: "DRC Mission Deployment", content: "Four-person WDC team deployed to Goma, North Kivu — WDC's first in-country mission. Three months, 120 reporters trained, 1,247 field reports processed." },
          { year: "Jul 2023", icon: "globe", title: "Burundi Mission Deployment", content: "Three-person team deployed to Bujumbura for six weeks. Michael integrated with PNPRC national early warning system. Warning lead time increased from 9 to 51–69 hours." },
          { year: "Sep 2023", icon: "shield", title: "EAGLE First 5 Assessments Complete", content: "Five damage assessments completed: DRC, Burundi, Haiti (remote), Sudan, Afghanistan Herat earthquake. Average turnaround: 4.8 hours from event." },
          { year: "Nov 2023", icon: "target", title: "85% Accuracy Validated", content: "First formal Michael accuracy validation: 85% across 142 events. Flood: 88%. Provides foundation for 2024 study confirming 87% across 247 events." },
          { year: "Dec 2023", icon: "handshake", title: "CNPCA and PNPRC MOUs Signed", content: "Formal MOUs signed with DRC's and Burundi's national civil protection authorities — the first government-level recognition of Michael as an official partner intelligence product." }
        ]
      },
      {
        type: "table",
        title: "2023 Results vs. Targets",
        headers: ["Indicator", "2023 Target", "Achieved", "Notes"],
        rows: [
          ["Field missions deployed", "2", "2", "DRC + Burundi"],
          ["Community reporters trained", "200", "205", "Exceeded by 5"],
          ["Community reports processed", "800", "1,247", "Exceeded by 56%"],
          ["Crisis Atlas subscribers", "1,000", "1,247", "Exceeded by 25%"],
          ["EAGLE assessments", "5", "5", "All 5 shared with OCHA/UNDP"],
          ["Michael accuracy (overall)", "82%", "85%", "Updated to 87% in 2024 study"],
          ["Partner organizations served", "40", "45", "Including UNICEF, OCHA, UNDP"],
          ["Training certificates issued", "150", "187", "Free, 7-course Academy"]
        ]
      },
      {
        type: "divider",
        title: "SECTION 3 — FINDINGS & RECOMMENDATIONS"
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding: Community Reporter Networks Outperform Satellite Imagery for Real-Time Ground Truth",
        content: "In 12 documented cases in DRC and Burundi, community reporters identified displacement events, flooded settlements, or infrastructure damage before satellite imagery confirmed the situation — sometimes by 24–36 hours. The bottleneck is not satellite coverage but satellite revisit frequency (3–6 days per area) and cloud cover (65% in DRC rainy season). Human ground observers with mobile phones and structured reporting protocols fill this gap in ways no remote sensing system currently can."
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding: Crisis Atlas Precedes UN Flash Appeals by Average 4.2 Days",
        content: "Analysis of 2023 humanitarian response timelines shows Crisis Atlas projections preceded official OCHA Flash Appeals by an average of 4.2 days. For humanitarian coordinators who follow WDC intelligence, this represents over four additional days of planning time before formal international response mechanisms activate — time to pre-position supplies, mobilize funding, and activate contingency plans."
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: EAGLE's Rural Infrastructure Models Required Retraining",
        content: "EAGLE's damage classification models, trained primarily on urban imagery from the xBD benchmark dataset, underperformed in Burundi's rural context — misclassifying 31% of traditional mud-brick structures as undamaged when they had experienced partial collapse. Three retraining cycles using WDC field-validated imagery improved accuracy from 76% to 84% by year-end. This experience established WDC's protocol of mandatory field validation for every new geographic context before EAGLE outputs are shared with partners."
      },
      {
        type: "bar-chart",
        title: "2023 Quality and Performance Indicators",
        items: [
          { label: "Michael Overall Accuracy", value: 85, max: 100, color: "green", note: "142 validated events" },
          { label: "EAGLE Damage Classification Accuracy", value: 84, max: 100, color: "blue", note: "after 3 retraining cycles" },
          { label: "Crisis Atlas Subscriber Retention", value: 93, max: 100, color: "green", note: "monthly opt-out rate <1%" },
          { label: "Community Report Validation Rate", value: 89, max: 100, color: "blue", note: "reports passing QC" },
          { label: "Field Mission Objective Achievement", value: 82, max: 100, color: "amber", note: "4/5 primary objectives met per mission" }
        ]
      },
      {
        type: "quote",
        text: "In eastern DRC, our community reporters submitted field data from their phones at personal risk. That intelligence improved Michael's models, informed UNICEF's response, and — in six documented cases — gave humanitarian partners advance warning that the official system could not provide. This is what WDC is for.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "icon-grid",
        title: "2024 Priority Recommendations from 2023 Experience",
        cols: 2,
        items: [
          { icon: "satellite", label: "SAR Integration Priority", desc: "Integrate ESA Sentinel-1 SAR to address cloud cover limitation — single highest-impact technical investment for Central Africa operations." },
          { icon: "users", label: "Expand Reporter Networks", desc: "Scale from 205 to 400+ community reporters in existing field contexts before entering new countries." },
          { icon: "shield", label: "EAGLE Context Retraining", desc: "Mandatory local imagery retraining before EAGLE deployment in each new geographic context." },
          { icon: "network", label: "National MOU Pipeline", desc: "Formalize government MOUs before field missions, not after — reduces institutional friction and multiplies reach." },
          { icon: "book", label: "French-Language Academy", desc: "Expand Training Academy into French for DRC and Burundi learner communities — documented demand gap." },
          { icon: "trending", label: "Revenue Diversification", desc: "Begin earned revenue development in 2024 to reduce dependency on any single grant source." }
        ]
      },
      {
        type: "partners",
        title: "2023 Partners & Collaborators",
        items: ["OCHA", "UNICEF", "UNDP", "WFP", "ACTED", "IRC", "CNPCA (DRC)", "PNPRC (Burundi)", "Microsoft AI for Humanitarian Action", "Canadian Government (pilot)", "ESA (pilot arrangement)", "TechSoup Canada", "ACLED", "USGS", "NASA"]
      }
    ]
  },

  // ─── ANNUAL 2022 ──────────────────────────────────────────────────────────
  {
    id: "annual-2022",
    category: "Annual Reports",
    title: "WDC Pre-Launch: Technology Development Year 2022",
    subtitle: "Building Michael — 12 Months of AI Architecture Before the 2023 Official Launch",
    date: "December 2022",
    year: 2022,
    pages: 22,
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    description: "The year before WDC's official 2023 launch: Michael's full AI architecture built, 12 hazard models trained, and field deployment validated — creating the platform foundation for WDC's operations at launch.",
    tags: ["Michael", "Technology", "Foundation"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "cpu", value: "14", label: "Staff by Year-End" },
          { icon: "database", value: "200K+", label: "Historical Disaster Records" },
          { icon: "target", value: "81%", label: "Real-Time Test Accuracy" },
          { icon: "zap", value: "12", label: "Hazard Types Modeled" }
        ]
      },
      {
        type: "map",
        src: OSM("-180%2C-60%2C180%2C75"),
        height: 300,
        caption: "Michael's 2022 development testing coverage — global historical dataset underpinning initial model training across 40+ years of disaster events."
      },
      {
        type: "divider",
        title: "SECTION 1 — BUILDING THE FOUNDATION"
      },
      {
        type: "text",
        heading: "2022: The Year Michael Became Real",
        content: "The year before WDC's official 2023 launch — a critical technology investment period. The pre-launch team moved from a founding concept — an AI that could predict disasters before they strike — to a working system processing live satellite data, seismic feeds, and social media signals in multiple languages. Every dollar invested in 2022 was a dollar invested in the infrastructure that makes all of WDC's subsequent work possible.\n\n**The core engineering challenge of 2022** was not building AI — it was building the right AI architecture for humanitarian contexts. Early prototypes struggled with multi-hazard integration: the data types, frequencies, and failure modes for earthquakes, floods, conflicts, and disease outbreaks are radically different. A model architecture optimized for flood prediction generates noise when applied to seismic monitoring. The core engineering team went through three major architectural revisions before arriving at the modular data fusion engine that now powers Michael — a separate trained model for each hazard type, integrated by a fusion engine that scores geographic risk cells across all hazard dimensions simultaneously.\n\n**The Human-AI hybrid validation model was a deliberate design choice.** Fully automated alerting is faster but produces false positive rates of approximately 22% in testing. Evacuation fatigue — communities stopping responses to warnings after repeated false alarms — is one of the best-documented early warning system failures globally. The design choice was to invest in human review of every alert before distribution, accepting a 2–4 hour latency cost in exchange for a false positive rate reduced to 8.3% in subsequent operational use. This is the design decision that makes Michael's alerts worth receiving.\n\n**Real-time validation in Q4 2022** tested Michael against 47 events as they occurred, without model updates. Result: 38 correct advance alerts, 81% recall rate. This was the first independent confirmation that Michael worked outside the training data — the critical threshold that justified WDC's 2023 official launch and immediate field deployment strategy."
      },
      {
        type: "photo-spread",
        height: 240,
        photos: [
          { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", caption: "Michael's data fusion architecture — 14 source categories normalized and quality-checked before entering the risk scoring engine.", location: "Ottawa HQ" },
          { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", caption: "Historical validation testing against 200,000+ disaster records from EM-DAT, GDELT, ACLED, and WDC's curated database.", location: "Ottawa HQ" }
        ]
      },
      {
        type: "two-col",
        left: {
          variant: "navy",
          heading: "2022 Technical Achievements",
          content: "Three complete architectural revisions leading to current modular design. 14 source categories integrated including USGS seismic, WMO meteorological, ESA satellite, ACLED conflict. 200,000+ historical disaster records ingested for model training. 12 hazard-specific AI models trained and backtested. 81% accuracy in Q4 2022 real-time test (47 qualifying events). 12+ language NLP pipeline developed."
        },
        right: {
          variant: "blue",
          heading: "2022 Organizational Achievements",
          content: "Pre-launch team scaled from 4 to 14 people across data science, geospatial engineering, humanitarian operations, and communications (pre-launch team, ahead of WDC's official 2023 launch). Ottawa primary office operational. Data access agreements with USGS, WMO, ACLED, NASA. Technology partnerships with Microsoft (Azure credits) and Google (NLP advisory). USD 485,000 total revenue. USD 24,000 surplus carried into 2023."
        }
      },
      {
        type: "cluster-dashboard",
        title: "2022 Technology Development by Module",
        clusters: [
          { icon: "zap", name: "Data Ingestion Framework", need: 14, target: 14, needNum: "14 source types", targetNum: "14 integrated" },
          { icon: "cpu", name: "AI Models Trained (Hazard Types)", need: 12, target: 12, needNum: "12 hazard types", targetNum: "12 models complete" },
          { icon: "globe", name: "Languages NLP Coverage", need: 10, target: 8, needNum: "10 target", targetNum: "8 integrated" },
          { icon: "database", name: "Historical Records Ingested", need: 200000, target: 200000, needNum: "200K target", targetNum: "200K+ complete" },
          { icon: "target", name: "Q4 Real-Time Test Events", need: 47, target: 38, needNum: "47 events", targetNum: "38 correct (81%)" },
          { icon: "users", name: "Team Headcount Growth", need: 14, target: 14, needNum: "14 target", targetNum: "14 hired" }
        ],
        note: "WDC officially launched in 2023; 2022 was the pre-launch technical foundation year. Field operations commenced at WDC's official 2023 launch."
      },
      {
        type: "divider",
        title: "SECTION 2 — DEVELOPMENT METHODOLOGY"
      },
      {
        type: "text",
        heading: "How Michael Was Built: Three-Phase Development",
        content: "**Phase 1 — Data Architecture (Q1 2022):** The fundamental challenge was building a unified data pipeline for heterogeneous inputs. NASA's MODIS and VIIRS fire detection products operate on different temporal cadences than USGS seismic data, which differs from WMO meteorological feeds. WDC's engineering team developed a unified ingestion framework with hazard-specific adapters that normalize, timestamp, and quality-check incoming data before it enters the fusion engine. Ingestion is asynchronous, with source-specific latency targets from near-real-time (seismic: <30 seconds) to hourly aggregation.\n\n**Phase 2 — Model Training (Q2–Q3 2022):** Michael's predictive models were trained on WDC's curated historical database of 40+ years of disaster events, supplemented by EM-DAT, GDELT, ACLED, and ReliefWeb datasets. Separate models were developed for each hazard type, with ensemble approaches for multi-hazard scenarios. Initial flood model: 89% accuracy in backtesting. Earthquake predictions for events above M5.0: 82% in backtesting.\n\n**Phase 3 — Real-Time Validation (Q4 2022):** Michael was tested against events occurring between October and December 2022 without any model updates. Against 47 qualifying events, Michael issued advance alerts for 38: 81% recall rate. This validation confirmed the platform was ready for 2023 field deployment and provided the baseline against which all subsequent accuracy improvements are measured."
      },
      {
        type: "timeline",
        title: "2022 Development Timeline",
        items: [
          { year: "Q1 2022", icon: "database", title: "Data Architecture Complete", content: "Unified ingestion framework operational for 14 source categories. Hazard-specific adapters normalize and quality-check all incoming data streams." },
          { year: "Q2 2022", icon: "cpu", title: "Model Training Phase Begins", content: "12 hazard-specific AI models trained on 200,000+ historical disaster records. Flood model achieves 89% accuracy in backtesting." },
          { year: "Q3 2022", icon: "zap", title: "Multi-Hazard Fusion Engine Live", content: "Risk scoring engine operational — scoring 840,000 geographic grid cells across all 12 hazard dimensions simultaneously." },
          { year: "Sep 2022", icon: "users", title: "Team Reaches 14 People", content: "Engineering, data science, geospatial, humanitarian operations, and communications functions fully staffed (pre-launch team, ahead of WDC's official 2023 launch)." },
          { year: "Oct 2022", icon: "target", title: "Real-Time Validation Test Begins", content: "Michael tested against live events without model updates. Final result: 81% accuracy across 47 qualifying events." },
          { year: "Dec 2022", icon: "check", title: "Ready for Field Deployment", content: "Board approval granted for 2023 DRC and Burundi field missions — WDC's first operational field deployments at official launch. Financial surplus of USD 24,000 carried into 2023." }
        ]
      },
      {
        type: "table",
        title: "2022 Expenditure vs. Budget",
        headers: ["Category", "Budget (USD)", "Actual (USD)", "Variance"],
        rows: [
          ["Technology development", "280,000", "267,000", "-13,000 (under)"],
          ["Team scaling (10 new hires)", "60,000", "55,000", "-5,000 (under)"],
          ["Operations (offices, legal)", "95,000", "101,000", "+6,000 (over)"],
          ["Communications & outreach", "40,000", "38,000", "-2,000 (under)"],
          ["Total Expenditure", "475,000", "461,000", "-14,000 (under)"]
        ]
      },
      {
        type: "divider",
        title: "SECTION 3 — FINDINGS & OUTLOOK"
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding: Modular Architecture Is the Right Design for Multi-Hazard AI",
        content: "Three architectural iterations in 2022 confirmed that a single unified model for all hazard types performs significantly worse than separate hazard-specific models integrated by a fusion engine. The modular approach enables independent model improvement — flood accuracy improvements do not require retraining earthquake models. It also enables faster deployment in new geographies: adding a new country requires updating the geographic context of existing models, not rebuilding from scratch."
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding: Human Validation Reduces False Positives from 22% to Under 10%",
        content: "Raw model output in 2022 testing generated a 22% false positive rate — alerts for events that did not materialize. Human analyst review reduced this to sub-10% in all tested scenarios. The 2–4 hour latency cost of human review is acceptable given Michael's 72-hour warning windows. This finding established the Human-AI hybrid model as WDC's permanent validation architecture."
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Data Scarcity in Sub-Saharan Africa Limits Model Training Quality",
        content: "WDC's historical disaster database is significantly sparser for sub-Saharan Africa than for North America, Europe, or East Asia — reflecting the systematic underreporting of disasters in low-income countries rather than fewer disaster events. This data scarcity means models trained on the global historical database perform less well in African contexts than in data-rich regions. The solution — field-generated training data from the 2023 DRC and Burundi missions — was already planned but remained a known limitation throughout 2022."
      },
      {
        type: "bar-chart",
        title: "2022 Technical Performance Indicators",
        items: [
          { label: "Flood Model Backtesting Accuracy", value: 89, max: 100, color: "green", note: "historical dataset" },
          { label: "Earthquake Model Backtesting Accuracy", value: 82, max: 100, color: "blue", note: "M5.0+ events" },
          { label: "Q4 Real-Time Validation Recall", value: 81, max: 100, color: "blue", note: "47 events, no updates" },
          { label: "Data Ingestion Uptime", value: 97, max: 100, color: "green", note: "across 14 source streams" },
          { label: "NLP Language Coverage", value: 80, max: 100, color: "amber", note: "8 of 10 target languages" }
        ]
      },
      {
        type: "quote",
        text: "We went through three complete architectural revisions in 2022 before we had a system we were willing to put in front of communities facing real disaster risk. Getting it right mattered more than getting it fast. The 81% accuracy result in Q4 confirmed we made the right call.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "icon-grid",
        title: "2023 Priorities Defined in 2022",
        cols: 2,
        items: [
          { icon: "globe", label: "First Field Deployments", desc: "DRC and Burundi missions planned for 2023 — essential for generating African training data and proving field utility." },
          { icon: "file", label: "Crisis Atlas Launch", desc: "Weekly intelligence product fills the gap between real-time alerts and monthly forecasts — planned for January 2023." },
          { icon: "shield", label: "EAGLE Development", desc: "Automated damage assessment module to close the post-disaster information gap — development starting Q1 2023." },
          { icon: "users", label: "Community Reporter System", desc: "Crowdsourced ground truth infrastructure — the human layer that satellite data cannot replace." },
          { icon: "handshake", label: "ESA Partnership Pursuit", desc: "SAR imagery access essential for cloud-penetrating flood mapping in Central Africa — partnership discussions to begin." },
          { icon: "trending", label: "Revenue Growth to USD 900K+", desc: "Field operations require revenue scaling — Canadian Government grant application planned for Q1 2023." }
        ]
      },
      {
        type: "partners",
        title: "2022 Technology and Funding Partners",
        items: ["Microsoft AI for Humanitarian Action", "Google (NLP advisory)", "USGS Earthquake Hazards Program", "WMO", "NASA (MODIS/VIIRS)", "ACLED", "EM-DAT / CRED", "TechSoup Canada", "Canadian Technology Foundation (seed grant)", "ReliefWeb / OCHA"]
      }
    ]
  },

  // ─── ANNUAL 2021 ──────────────────────────────────────────────────────────
  {
    id: "annual-2021",
    category: "Annual Reports",
    title: "WDC Founding Research: The Case for AI-Powered Humanitarian Warning",
    subtitle: "Pre-Foundation Research Paper by Sapiens Ndatabaye, written while at OCHA (2021)",
    date: "December 2021",
    year: 2021,
    pages: 16,
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80",
    description: "The original research paper by Sapiens Ndatabaye — written while serving as a humanitarian coordinator at OCHA — that identified the early warning market failure and laid the intellectual foundation for WDC's official creation in 2023.",
    tags: ["Founding", "Vision", "Michael"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "users", value: "8", label: "Founding Team Members" },
          { icon: "globe", value: "1", label: "Office (Ottawa)" },
          { icon: "database", value: "40+", label: "Years of Disaster Data Assembled" },
          { icon: "heart", value: "2023", label: "WDC Officially Founded" }
        ]
      },
      {
        type: "map",
        src: OSM("-180%2C-60%2C180%2C75"),
        height: 300,
        caption: "WDC's founding vision: global disaster intelligence for every community, regardless of income or geography."
      },
      {
        type: "divider",
        title: "SECTION 1 — FOUNDING VISION & RATIONALE"
      },
      {
        type: "text",
        heading: "Why the World Needs the World Disaster Center",
        content: "The gap that World Disaster Center was founded to close is both simple to describe and staggering in scale: communities in wealthy countries receive days of advance warning before disasters. Communities in the world's most vulnerable countries receive hours — or nothing at all.\n\n**The evidence is unambiguous.** A resident of Tokyo receives earthquake early warnings through a national seismic network, mobile push notifications, and coordinated evacuation systems refined over decades of investment. A resident of Goma, DRC — a city on one of the world's most active volcanic systems, surrounded by armed conflict, and subject to annual flooding — receives a fraction of that protection despite facing exponentially greater risk. This is not a technological gap; the satellite data, seismic networks, and weather modeling that could protect Goma already exist. It is a translation and delivery gap: no one is turning that global data into locally actionable, linguistically accessible, institutionally trusted warnings for communities in the world's most vulnerable geographies.\n\n**The proposed answer** is Michael: an AI-powered platform that monitors all major disaster types, across all geographies, in the languages communities actually speak, at a cost structure that enables universal deployment rather than wealthy-country-only deployment. At USD 0.14 per person reached (achieved by 2024), Michael makes early warning economically viable at a scale that changes the global risk landscape.\n\n**The founding team concept** — mapped through Sapiens Ndatabaye's networks across OCHA, UNDP, and the humanitarian technology sector — was designed to bring prior experience from contexts where the gap WDC would close had personal and professional meaning. Every foundational decision was made with the communities in DRC, Sudan, Haiti, and Bangladesh explicitly in view.\n\nThis pre-foundation research paper documents the intellectual case that led to WDC's creation: what needed to be built, what decisions would need to be made, and why every subsequent year of WDC's work traces back to the clarity of purpose developed during this pre-foundation phase. WDC was officially created in 2023."
      },
      {
        type: "photo-spread",
        height: 240,
        photos: [
          { src: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?auto=format&fit=crop&w=800&q=80", caption: "The displacement crisis WDC was founded to address — communities facing compounding disasters with minimal advance warning.", location: "Eastern DRC (file photo)" },
          { src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80", caption: "Children in disaster-affected communities: WDC's early warning systems are designed around the most vulnerable, not the most connected.", location: "East Africa (file photo)" }
        ]
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "The Problem: The Early Warning Gap",
          content: "38% of global disaster deaths occur in Africa, which has <8% of operational monitoring stations. Average flood warning lead time in sub-Saharan Africa: 6–12 hours. In Europe and North America: 48–72 hours. Existing global early warning products (ECMWF, NOAA) are in English, require technical infrastructure, and cost USD 1.20–2.50 per person annually — unaffordable for organizations serving the highest-risk communities."
        },
        right: {
          variant: "navy",
          heading: "WDC's Answer: Michael",
          content: "AI-powered prediction up to 72 hours in advance. 12 hazard types. 12+ languages including Swahili, Arabic, Amharic. Offline-capable for low-bandwidth environments. Human-AI hybrid validation preventing evacuation fatigue. Cost target: USD 0.14 per person per year. Architecture designed for fragile contexts. Available free to humanitarian organizations."
        }
      },
      {
        type: "cluster-dashboard",
        title: "Pre-Foundation Year Delivery: 2021",
        clusters: [
          { icon: "users", name: "Team Members Hired", need: 10, target: 8, needNum: "10 target", targetNum: "8 hired" },
          { icon: "database", name: "Data Partnerships Signed", need: 5, target: 4, needNum: "5 target", targetNum: "4 signed" },
          { icon: "cpu", name: "First Prototype (Flood, Central Africa)", need: 1, target: 1, needNum: "1 target", targetNum: "1 delivered Sep 2021" },
          { icon: "handshake", name: "Advisory Relationships Established", need: 5, target: 6, needNum: "5 target", targetNum: "6 established" },
          { icon: "globe", name: "Office Locations", need: 1, target: 1, needNum: "1 planned", targetNum: "Ottawa operational" },
          { icon: "file", name: "Organizational Documents Finalized", need: 6, target: 6, needNum: "6 required", targetNum: "6 complete" }
        ],
        note: "2021 was the pre-foundation research and concept year. WDC was officially created in 2023. All targets were conceptual and technical setup milestones, not operational impact metrics."
      },
      {
        type: "divider",
        title: "SECTION 2 — FOUNDING YEAR ACTIVITIES"
      },
      {
        type: "text",
        heading: "What WDC Did in Its First Year",
        content: "**Concept Team:** In 2021, Sapiens Ndatabaye worked with a small concept team of four specialists in data science, geospatial analysis, and humanitarian operations. By December, the concept team had grown to eight, with additions in software engineering, communications, and field coordination. All brought prior OCHA, UNDP, or humanitarian technology experience — the nucleus of what would become WDC's founding team at the official 2023 launch.\n\n**Technology Foundation:** The first six months were devoted to defining Michael's architecture and scoping the data partnerships that would feed the platform. Preliminary data access conversations began with USGS for seismic feeds, WMO for meteorological data, ACLED for conflict event data, and NASA for satellite access. The first internal prototype — processing flood data for Central Africa — was operational by September 2021.\n\n**Data Assembly:** A historical disaster database spanning 40+ years and 200,000+ records from EM-DAT, GDELT, ACLED, ReliefWeb, and national disaster management sources was assembled and curated. This dataset forms the training foundation for all Michael models.\n\n**Advisory Relationships:** Informal advisory relationships were established with staff from OCHA, UNDP, and UNICEF. TechSoup Canada provided technology support. Initial funding discussions were opened with the Canadian development finance ecosystem.\n\n**Foundational Design Decisions Made in 2021:** The Human-AI hybrid validation model (every alert reviewed before distribution); Michael's multilingual design (not English-first); the free-to-humanitarian-community licensing model; the modular multi-hazard architecture; and the explicit commitment to field presence as the mechanism for model improvement. These decisions, made before WDC's official 2023 launch, define WDC's approach today."
      },
      {
        type: "timeline",
        title: "Founding Year: Key Moments",
        items: [
          { year: "Jan 2021", icon: "flag", title: "Research Inception", content: "Sapiens Ndatabaye, serving as a humanitarian coordinator with OCHA, begins developing the concept for an AI-powered multi-hazard early warning platform for fragile contexts. The seed of what will become WDC." },
          { year: "Mar 2021", icon: "database", title: "Data Architecture Scoped", content: "Preliminary data partnership conversations begun with USGS, WMO, and ACLED. Full data pipeline architecture designed on paper." },
          { year: "Jun 2021", icon: "cpu", title: "Michael Architecture Defined", content: "Final decision on modular, hazard-specific model architecture after evaluation of unified vs. modular approaches. Human-AI hybrid validation model formally designed. (WDC will not officially launch until 2023, but the architecture is fully designed during this pre-foundation phase.)" },
          { year: "Sep 2021", icon: "zap", title: "First Prototype Operational", content: "The first working prototype processes live flood data for Central Africa. Internal testing begins against historical DRC flood events. This pre-official-launch prototype validates the technical approach ahead of WDC's 2023 creation." },
          { year: "Nov 2021", icon: "users", title: "Core Team Concept Finalized", content: "The founding team structure is mapped: six core disciplines identified (AI/ML, geospatial, humanitarian ops, communications, data, field). Formal recruitment to begin post-launch in 2023." },
          { year: "Dec 2021", icon: "book", title: "Technology Development Plan Approved", content: "Detailed technical roadmap for 2022 platform development created. Target: fully operational Michael platform ready for field deployment at WDC's official 2023 launch." }
        ]
      },
      {
        type: "table",
        title: "2021 Pre-Foundation Technology Development Fund Summary",
        headers: ["Item", "Amount (USD)", "Notes"],
        rows: [
          ["Founding grants (2 sources)", "180,000", "Canadian technology foundation + individual donors"],
          ["Consulting revenue", "42,000", "Early advisory engagements"],
          ["Total Revenue 2021", "222,000", ""],
          ["Salaries (8 staff, partial year)", "142,000", "Includes benefits"],
          ["Technology (cloud, licenses)", "38,000", "Initial infrastructure"],
          ["Operations (legal, office, HR)", "27,000", "Pre-foundation setup costs (Canada)"],
          ["Total Expenditure 2021", "207,000", ""],
          ["Net Surplus", "15,000", "Carried to 2022 pre-launch development fund"]
        ]
      },
      {
        type: "divider",
        title: "SECTION 3 — FOUNDING COMMITMENTS"
      },
      {
        type: "callout",
        variant: "success",
        heading: "Founding Commitment: Radical Transparency on Performance",
        content: "WDC commits to publishing accuracy figures with full methodology so any qualified researcher can independently replicate or challenge them. We commit to publishing cost-per-impact metrics. We commit to acknowledging failures and what we learned from them. We believe that humanitarian organizations that avoid scrutiny are organizations that donors should scrutinize most."
      },
      {
        type: "callout",
        variant: "info",
        heading: "Founding Commitment: Free to Communities, Earned Revenue from Institutions",
        content: "Michael alerts, Crisis Atlas, and Training Academy courses are free to humanitarian organizations and communities. Earned revenue will come from premium API access for governments and commercial organizations, paid certification tracks, and advisory services. This model ensures WDC's intelligence is never withheld from a community because they cannot pay."
      },
      {
        type: "callout",
        variant: "highlight",
        heading: "The Investment Case for WDC",
        content: "Every USD 1 invested in early warning systems generates USD 10 in avoided disaster losses (World Bank, 2019). WDC's USD 0.14 cost per person protected — compared to USD 1.20–2.50 for traditional systems — means each dollar of donor investment protects 9–18x more people than conventional approaches. At projected 2026 scale of 100M+ people, WDC's annual impact cost will be approximately USD 14M — compared to USD 120–250M for equivalent traditional early warning coverage. This is not incremental improvement. This is a structural change in the economics of disaster risk reduction."
      },
      {
        type: "bar-chart",
        title: "2021 Founding Year Delivery Against Plan",
        items: [
          { label: "Team Hired vs. Target (8 of 10)", value: 80, max: 100, color: "blue", note: "2 hires moved to Q1 2022" },
          { label: "Data Partnerships (4 of 5 target)", value: 80, max: 100, color: "blue", note: "5th signed Jan 2022" },
          { label: "Prototype Delivery (on schedule)", value: 100, max: 100, color: "green", note: "September 2021" },
          { label: "Budget Execution (93% of plan)", value: 93, max: 100, color: "green", note: "USD 207K of USD 222K budget" },
          { label: "Partnership Goals (6 of 5 target)", value: 100, max: 100, color: "green", note: "Exceeded advisory target" }
        ]
      },
      {
        type: "quote",
        text: "We founded WDC because the technology to protect every community from disaster already exists — in fragments, in data centers, in academic papers. Our job is to assemble those fragments into a system that actually reaches the communities that need it most. This is year one of a long journey.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center, Ottawa, December 2021"
      },
      {
        type: "icon-grid",
        title: "What 2022 Will Build on the 2021 Foundation",
        cols: 2,
        items: [
          { icon: "cpu", label: "Full Michael Platform", desc: "Three-phase development: data architecture (Q1), model training (Q2-Q3), real-time validation (Q4)." },
          { icon: "users", label: "Team of 14", desc: "10 additional hires across engineering, data science, and field operations." },
          { icon: "database", label: "200K Historical Records", desc: "Complete disaster database ingestion and model training across all 12 hazard types." },
          { icon: "zap", label: "Live Platform Testing", desc: "Q4 2022 real-time validation against live events — the proof-of-concept threshold." },
          { icon: "handshake", label: "ESA Partnership", desc: "Begin ESA partnership discussions for Sentinel satellite data access — critical for 2023 field operations." },
          { icon: "trending", label: "Scale Revenue to USD 485K", desc: "Microsoft partnership, Canadian grant, and service revenue to fund 2022 technology investment." }
        ]
      },
      {
        type: "partners",
        title: "Founding Year Partners & Supporters",
        items: ["USGS", "WMO", "ACLED", "NASA", "TechSoup Canada", "OCHA (advisory)", "UNDP (advisory)", "UNICEF (advisory)", "Canadian Technology Foundation", "Microsoft AI for Humanitarian Action (early discussions)", "EM-DAT / CRED", "ReliefWeb"]
      }
    ]
  },

  // ─── FINANCIAL 2024 ───────────────────────────────────────────────────────
  {
    id: "financial-2024",
    category: "Financial Reports",
    title: "Financial Summary & Impact Report 2024",
    subtitle: "Responsible Stewardship of Humanitarian Resources",
    date: "December 2024",
    year: 2024,
    pages: 20,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    description: "WDC's 2024 financial summary detailing revenue sources, expenditure breakdown, cost-effectiveness metrics, and financial outlook for 2025.",
    tags: ["Finance", "Transparency", "Impact"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "trending", value: "$1.39M", label: "Total Revenue 2024" },
          { icon: "target", value: "8%", label: "Administrative Overhead" },
          { icon: "users", value: "$0.14", label: "Cost per Person Protected" },
          { icon: "check", value: "$75.5K", label: "Net Surplus to Reserves" }
        ]
      },
      {
        type: "map",
        src: OSM("-180%2C-60%2C180%2C75"),
        height: 280,
        caption: "WDC's 2024 expenditure geography — field operations across 6 countries funded from a USD 1.39M total budget."
      },
      {
        type: "divider",
        title: "SECTION 1 — FINANCIAL OVERVIEW 2024"
      },
      {
        type: "text",
        heading: "Financial Discipline in Service of Mission",
        content: "World Disaster Center operates on a fundamental conviction: every dollar entrusted by donors is a dollar that could protect a community from disaster. That conviction drives financial decisions at every level of the organization — from the 8% administrative overhead that is among the lowest in the humanitarian technology sector, to the deliberate diversification of revenue sources that prevents dependence on any single funder.\n\n**Total Revenue 2024: USD 1,387,500.** Total Expenditure 2024: USD 1,312,000. Net Surplus: USD 75,500 — carried to operational reserves. The surplus was intentional: WDC's financial policy requires a three-month operating reserve (USD 328,000 at year-end), and the 2024 surplus completed that reserve target.\n\n**The most important financial metric for donors is not overhead percentage — it is cost per impact.** WDC's cost per person protected (total expenditure divided by individuals receiving at least one Michael early warning alert in 2024) was **USD 0.14**. The humanitarian sector benchmark for traditional early warning systems is USD 1.20–2.50 per person per year. WDC's AI-driven efficiency enables a 9–18x cost advantage that is structural, not temporary: as Michael's coverage grows, the marginal cost per additional person protected approaches zero.\n\n**Revenue diversification** remains a strategic priority. No single funding source exceeded 38% of total revenue in 2024. The five-year target is a maximum single-source dependence of 30%, with earned revenue growing to 40% of total income by 2028. This diversification protects WDC's operational continuity against the grant cycle volatility that disrupts most humanitarian NGOs.\n\n**Financial statements** are prepared in accordance with Canadian non-profit accounting standards (CPA Canada Handbook Part III). An independent audit is conducted annually. Audited statements are available to institutional partners upon written request."
      },
      {
        type: "two-col",
        left: {
          variant: "navy",
          heading: "Revenue Sources 2024",
          content: "Canadian Government / IDRC: USD 527,250 (38%)\nESA Partnership: USD 305,250 (22%)\nCorporate Partnerships: USD 249,750 (18%)\nIndividual Donations: USD 124,875 (9%)\nService & Licensing: USD 110,500 (8%)\nOther Grants: USD 69,875 (5%)\n\nTotal: USD 1,387,500"
        },
        right: {
          variant: "green",
          heading: "Expenditure by Program Area 2024",
          content: "Technology (Michael, EAGLE, infrastructure): USD 551,040 (42%)\nField Operations (6 missions): USD 432,960 (33%)\nTraining Academy & Community: USD 157,440 (12%)\nOperations (3 offices): USD 104,960 (8%)\nCommunications & Advocacy: USD 65,600 (5%)\n\nTotal: USD 1,312,000"
        }
      },
      {
        type: "cluster-dashboard",
        title: "Expenditure Efficiency by Program Area",
        clusters: [
          { icon: "zap", name: "Technology (Michael Platform)", need: 42, target: 42, needNum: "42% budget", targetNum: "USD 551K" },
          { icon: "globe", name: "Field Operations (6 missions)", need: 33, target: 33, needNum: "33% budget", targetNum: "USD 433K" },
          { icon: "education", name: "Training Academy & Community", need: 12, target: 12, needNum: "12% budget", targetNum: "USD 157K" },
          { icon: "coordination", name: "Operations (3 offices)", need: 8, target: 8, needNum: "8% overhead", targetNum: "USD 105K" },
          { icon: "megaphone", name: "Communications & Advocacy", need: 5, target: 5, needNum: "5% budget", targetNum: "USD 66K" },
          { icon: "shield", name: "Reserve Fund (end of year)", need: 100, target: 100, needNum: "3-month reserve", targetNum: "USD 328K" }
        ],
        note: "8% administrative overhead is among the lowest in the humanitarian technology sector. Industry median is 15–25%."
      },
      {
        type: "divider",
        title: "SECTION 2 — COST-EFFECTIVENESS ANALYSIS"
      },
      {
        type: "text",
        heading: "What Each Dollar Achieves: WDC's Cost-Impact Metrics",
        content: "**Cost Per Alert Issued:** 2,300+ alerts issued in 2024. Technology expenditure: USD 551,040. Cost per alert: **USD 239**. Each alert reached an average of 14,200 individuals. Cost per person-alert: **USD 0.017**.\n\n**Cost Per Community Protected:** Total operational expenditure USD 1,312,000 divided by 9.4 million individuals who received at least one Michael early warning alert in 2024 = **USD 0.14 per person protected**. Sector benchmark for traditional early warning: USD 1.20–2.50. WDC advantage: **9–18x more cost-effective**.\n\n**Cost Per Field Day:** 847 field days across 6 missions at USD 432,960 field operations expenditure = **USD 511 per field day**. This includes security, logistics, accommodation, in-country staffing, and data transmission. Comparable UN agency field deployment cost: USD 850–1,200 per day. WDC advantage: **40–57% below UN benchmark**.\n\n**Cost Per Training Certificate:** 417 certificates issued at USD 157,440 Training Academy expenditure = **USD 378 per certificate** for a free-to-learner program. Commercial equivalents for humanitarian professional training: USD 800–2,500 per course.\n\n**Return on Investment for Early Warning:** The World Bank (2019) estimates that every USD 1 invested in early warning systems generates USD 10 in avoided disaster losses. At WDC's USD 0.14/person cost, USD 1 of donor investment in WDC protects approximately 7 people — generating an estimated USD 70 in avoided losses. No other early warning investment vehicle achieves this ratio."
      },
      {
        type: "table",
        title: "Revenue & Expenditure: 2022–2024 Trend",
        headers: ["Item", "2022 (USD)", "2023 (USD)", "2024 (USD)", "3yr Growth"],
        rows: [
          ["Total Revenue", "485,000", "892,000", "1,387,500", "+186%"],
          ["Total Expenditure", "461,000", "847,000", "1,312,000", "+185%"],
          ["Net Surplus", "24,000", "45,000", "75,500", "+215%"],
          ["Technology Spend", "267,000", "364,000", "551,040", "+106%"],
          ["Field Operations", "0", "262,000", "432,960", "New in 2023"],
          ["Administrative Overhead %", "22%", "11%", "8%", "-14pp improvement"],
          ["Cost per person protected", "N/A", "USD 0.47", "USD 0.14", "-70% improvement"]
        ]
      },
      {
        type: "divider",
        title: "SECTION 3 — OUTLOOK & SUSTAINABILITY"
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding: Administrative Overhead Declining as Revenue Scales",
        content: "WDC's administrative overhead percentage has declined from 22% in 2022 (pre-launch year fixed costs) to 8% in 2024 as revenue has scaled 186% while fixed costs have grown more slowly. This demonstrates the operational leverage inherent in WDC's technology-first model: the platform infrastructure that serves 9.4 million people today would, with additional revenue, serve 50 million at only marginally higher cost. The economics of scale favor continued investment in WDC."
      },
      {
        type: "callout",
        variant: "info",
        heading: "2025 Financial Projection: USD 2.1M Revenue",
        content: "Projected 2025 revenue of USD 2,100,000 (51% growth) reflects: confirmed Canadian Government grant continuation (USD 600,000), ESA partnership expansion (USD 420,000), new corporate partnerships (est. USD 300,000), Michael mobile app individual donations (proj. USD 250,000), and inaugural earned revenue from premium API access and paid certifications (proj. USD 200,000). Three-month reserve maintained throughout."
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Risk: Single-Source Dependence Remains Elevated",
        content: "Despite diversification progress, the Canadian Government/IDRC grant remains 38% of total revenue — above WDC's 30% maximum dependence target. The 2025 strategic priority is reducing this to 29% through earned revenue development and new institutional donor relationships. If the IDRC grant were discontinued without replacement, WDC would need to reduce field operations by approximately 30% while maintaining core technology and knowledge product functions. This scenario, while manageable, would meaningfully reduce impact reach."
      },
      {
        type: "bar-chart",
        title: "Revenue Diversification Progress 2024",
        items: [
          { label: "Government Grants", value: 43, max: 100, color: "blue", note: "target: reduce to 35% by 2026" },
          { label: "Corporate Partnerships", value: 18, max: 100, color: "green", note: "target: grow to 25% by 2026" },
          { label: "Individual Donations", value: 9, max: 100, color: "amber", note: "target: grow to 15% by 2026" },
          { label: "Service & Licensing (Earned)", value: 8, max: 100, color: "green", note: "target: grow to 40% by 2028" },
          { label: "Other Grants", value: 5, max: 100, color: "amber", note: "target: maintain 5-10%" }
        ]
      },
      {
        type: "quote",
        text: "Donors trust WDC with resources because we treat every dollar as a life-safety investment, not an organizational expenditure. Our 8% overhead, our USD 0.14 per person cost, and our three-month reserve are not accounting metrics — they are promises to the communities we serve.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "icon-grid",
        title: "2025 Financial Priorities",
        cols: 2,
        items: [
          { icon: "trending", label: "Launch Earned Revenue", desc: "Premium Michael API access (USD 2,500–15,000/year) and paid certification tracks targeting USD 200K in inaugural earned revenue." },
          { icon: "handshake", label: "New Institutional Donors", desc: "Pursue 3 new institutional donor relationships to reduce IDRC dependence below 30% of total revenue." },
          { icon: "shield", label: "Maintain 3-Month Reserve", desc: "Operational reserve of USD 400K+ target by end of 2025 — protecting against grant cycle delays." },
          { icon: "chart", label: "Quarterly Financial Reporting", desc: "Introduce quarterly financial dashboards for major donors, replacing annual-only reporting." },
          { icon: "globe", label: "Multi-Currency Risk Management", desc: "Formalize hedging for field operations in 6+ currencies — reduce FX exposure as field budget grows." },
          { icon: "book", label: "Impact Accounting Framework", desc: "Develop monetized impact metrics for annual reporting — translating humanitarian outcomes into financial equivalents for donor comparison." }
        ]
      },
      {
        type: "partners",
        title: "2024 Funding & Financial Partners",
        items: ["Canadian Government / IDRC", "European Space Agency (ESA)", "Microsoft AI for Humanitarian Action", "Google.org", "Infinite Future Bank", "Equity Bank", "Individual Donors (Stripe/PayPal)", "ESRI (in-kind licensing)"]
      }
    ]
  },

  // ─── FINANCIAL 2023 ───────────────────────────────────────────────────────
  {
    id: "financial-2023",
    category: "Financial Reports",
    title: "Financial Summary & Impact Report 2023",
    subtitle: "First Field Operations: Financial Accountability",
    date: "December 2023",
    year: 2023,
    pages: 20,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    description: "WDC's 2023 financial summary covering the first year of major field expenditure, grant receipts, and cost-per-impact metrics for field mission activities.",
    tags: ["Finance", "Transparency", "Field Operations"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "trending", value: "$892K", label: "Total Revenue 2023" },
          { icon: "globe", value: "$262K", label: "Field Operations Spend" },
          { icon: "target", value: "11%", label: "Administrative Overhead" },
          { icon: "check", value: "$45K", label: "Net Surplus" }
        ]
      },
      {
        type: "map",
        src: OSM("-18%2C-35%2C52%2C38", "0%2C20"),
        height: 280,
        caption: "2023 field expenditure geography: DRC (North Kivu) and Burundi (Rusizi Plain) — WDC's first two in-country operations."
      },
      {
        type: "divider",
        title: "SECTION 1 — 2023 FINANCIAL OVERVIEW"
      },
      {
        type: "text",
        heading: "First Field Year: From Technology-Only to Full Operations",
        content: "2023 marked WDC's transition from a primarily technology-focused operation to a full-spectrum humanitarian technology organization. The addition of field operations — DRC (March–June) and Burundi (July–September) — created the organization's first significant operational complexity: managing field security, local procurement, in-country partnerships, and multi-currency disbursements simultaneously with continued platform development.\n\n**Total Revenue 2023: USD 892,000** — a 84% increase over 2022's USD 485,000, driven primarily by the confirmation of the Canadian Government pilot grant (USD 320,000) and the ESA pilot arrangement (USD 142,000). Both relationships were formalized as multi-year commitments in 2024.\n\n**Total Expenditure 2023: USD 847,000** — an 84% increase over 2022, with the critical new category of field operations (USD 262,000, 31% of total) funded directly by the Canadian pilot grant. Administrative overhead declined from 22% (2022) to 11% (2023) as revenue scaled while the Ottawa office fixed costs remained relatively stable.\n\n**Net Surplus: USD 45,000** — carried to 2024 operational reserves. The surplus was intentional: WDC's financial policy targets a three-month operating reserve, which required USD 211,750 at 2023 expenditure levels. The 2023 surplus contributed to achieving that reserve target by mid-2024.\n\n**Financial review:** WDC's 2023 accounts were reviewed by an independent Canadian Chartered Professional Accountant. The review confirmed compliance with CPA Canada Handbook Part III standards. Full review letter and financial statements available to institutional partners upon written request."
      },
      {
        type: "two-col",
        left: {
          variant: "navy",
          heading: "2023 Revenue Sources",
          content: "Canadian Government (pilot grant): USD 320,000 (36%)\nCorporate Partnerships: USD 178,000 (20%)\nESA Pilot Arrangement: USD 142,000 (16%)\nIndividual Donations: USD 107,000 (12%)\nOther Grants: USD 89,000 (10%)\nService Revenue: USD 56,000 (6%)\n\nTotal: USD 892,000"
        },
        right: {
          variant: "blue",
          heading: "2023 Expenditure by Area",
          content: "Technology (Michael, EAGLE): USD 364,000 (43%)\nField Operations (DRC + Burundi): USD 262,000 (31%)\nTraining Academy: USD 85,000 (10%)\nOperations (2 offices): USD 93,000 (11%)\nCommunications: USD 43,000 (5%)\n\nTotal: USD 847,000"
        }
      },
      {
        type: "cluster-dashboard",
        title: "2023 Field Operations Cost Breakdown",
        clusters: [
          { icon: "globe", name: "DRC Mission (3 months, 4 staff)", need: 162000, target: 158000, needNum: "USD 162K budget", targetNum: "USD 158K actual" },
          { icon: "globe", name: "Burundi Mission (6 weeks, 3 staff)", need: 108000, target: 104000, needNum: "USD 108K budget", targetNum: "USD 104K actual" },
          { icon: "shield", name: "Security & Risk Management", need: 25000, target: 22000, needNum: "USD 25K budget", targetNum: "USD 22K actual" },
          { icon: "truck", name: "Logistics & Local Procurement", need: 40000, target: 38000, needNum: "USD 40K budget", targetNum: "USD 38K actual" },
          { icon: "radio", name: "Communications & Data", need: 18000, target: 16000, needNum: "USD 18K budget", targetNum: "USD 16K actual" },
          { icon: "coordination", name: "Local Partner Subgrants", need: 30000, target: 28000, needNum: "USD 30K budget", targetNum: "USD 28K actual" }
        ],
        note: "All field expenditure under budget. USD 270K total field budget; USD 262K actual spend. USD 8K returned to general reserves."
      },
      {
        type: "divider",
        title: "SECTION 2 — COST-EFFECTIVENESS"
      },
      {
        type: "text",
        heading: "2023 Cost-Effectiveness Metrics",
        content: "**Field Mission Cost per Output:**\n- DRC mission: 1,247 field reports processed; USD 158,000 expenditure = **USD 127 per validated field report**\n- Burundi mission: Warning lead time increased from 9 to 51–69 hours for 1.2M Rusizi Plain residents; USD 104,000 expenditure for six weeks of country-level early warning improvement\n- Combined field missions: 205 community reporters trained; USD 262,000 total = **USD 1,278 per trained reporter** (one-time cost; reporters continue generating intelligence value indefinitely)\n\n**Technology Efficiency:**\n- Crisis Atlas: 1,247 subscribers in 63 countries from USD 43,000 communications budget = **USD 34 per subscriber per year** for weekly global intelligence\n- EAGLE: 5 assessments at USD 364,000 technology expenditure (shared with full Michael development) — cost per assessment not separately attributed but estimated at USD 8,000–12,000 including analyst time\n\n**Overall 2023 Cost per Community Protected:**\nEstimated 1.8 million individuals in Michael's 2023 active alert coverage / USD 847,000 total expenditure = **USD 0.47 per person** — subsequently improved to USD 0.14 in 2024 through scale without proportional cost growth."
      },
      {
        type: "timeline",
        title: "2023 Financial Milestones",
        items: [
          { year: "Jan 2023", icon: "check", title: "Canadian Pilot Grant Confirmed", content: "USD 320,000 pilot grant from Canadian Government confirmed — first bilateral government funding in WDC's history." },
          { year: "Mar 2023", icon: "globe", title: "DRC Field Budget Released", content: "USD 162,000 DRC mission budget approved and disbursed through Infinite Future Bank. First significant field expenditure in WDC's history." },
          { year: "Jul 2023", icon: "globe", title: "Burundi Mission Budget Released", content: "USD 108,000 Burundi mission budget disbursed. Multi-currency management formalized (CAD, USD, BIF)." },
          { year: "Sep 2023", icon: "trending", title: "ESA Arrangement Formalized", content: "ESA pilot arrangement (USD 142,000) formalized, with multi-year partnership discussions initiated for 2024 upgrade." },
          { year: "Nov 2023", icon: "shield", title: "Independent Financial Review", content: "CPA Canada Handbook Part III compliant review completed. No material findings. Reserve fund target set at 3 months operating cost." },
          { year: "Dec 2023", icon: "check", title: "USD 45K Surplus to Reserves", content: "Year-end surplus of USD 45,000 — on track for 3-month reserve achievement by mid-2024." }
        ]
      },
      {
        type: "table",
        title: "2023 Budget vs. Actuals",
        headers: ["Category", "Budget (USD)", "Actual (USD)", "Variance (USD)", "Notes"],
        rows: [
          ["Technology", "380,000", "364,000", "-16,000", "Under — development delays Q4"],
          ["Field Operations", "270,000", "262,000", "-8,000", "Under — security reserves not needed"],
          ["Training Academy", "90,000", "85,000", "-5,000", "Under — French expansion deferred"],
          ["Operations", "95,000", "93,000", "-2,000", "On target"],
          ["Communications", "45,000", "43,000", "-2,000", "Under — one event cancelled"],
          ["Total", "880,000", "847,000", "-33,000", "3.75% under budget"]
        ]
      },
      {
        type: "divider",
        title: "SECTION 3 — FINDINGS & 2024 OUTLOOK"
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding: Field Operations Are Cost-Effective at Generating Technology Improvement",
        content: "The DRC and Burundi field missions cost USD 262,000 and generated training data that improved Michael's African flood accuracy from 84% (pre-mission baseline) to 89% (DRC mission) and 91% (Burundi Rusizi model). This accuracy improvement is valued conservatively at USD 0.50–1.50 per person in improved early warning quality across Michael's entire African coverage area — a value that exceeds the field mission cost within 12–18 months of sustained operation."
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding: Revenue Diversification on Track",
        content: "2023 saw meaningful revenue diversification: the number of distinct revenue sources grew from 3 (2022) to 6 (2023). The largest single source (Canadian Government) represents 36% of revenue — within target range. Corporate partnerships (20%) and ESA (16%) provide institutional stability. Individual donations (12%) demonstrate grassroots community support. Service revenue (6%) signals early market validation."
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: Multi-Currency Field Operations Create Financial Complexity",
        content: "Operating in DRC (USD/CDF) and Burundi (BIF) simultaneously created treasury management complexity that WDC's small finance team was not fully prepared for. Exchange rate movements cost an estimated USD 4,200 in FX losses on field disbursements. For 2024, WDC will formalize a multi-currency field operations protocol with Equity Bank and introduce weekly FX exposure monitoring."
      },
      {
        type: "bar-chart",
        title: "2023 Key Financial Ratios",
        items: [
          { label: "Program Expenditure vs. Total", value: 89, max: 100, color: "green", note: "91% of spend = direct program" },
          { label: "Revenue Growth vs. 2022", value: 84, max: 100, color: "blue", note: "+84% year-on-year" },
          { label: "Budget Utilization", value: 96, max: 100, color: "green", note: "USD 847K of USD 880K budget" },
          { label: "Reserve Fund Progress", value: 45, max: 100, color: "amber", note: "45% of 3-month reserve target" },
          { label: "Earned Revenue % (target 10% by 2026)", value: 6, max: 100, color: "amber", note: "On track" }
        ]
      },
      {
        type: "quote",
        text: "Our first field year proved that WDC can operate in the world's hardest contexts without losing financial discipline. DRC and Burundi missions came in under budget, generated irreplaceable training data, and built institutional relationships worth far more than their cost.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "icon-grid",
        title: "2024 Financial Priorities",
        cols: 2,
        items: [
          { icon: "trending", label: "Target USD 1.4M Revenue", desc: "Canadian Government multi-year confirmation + ESA full partnership + corporate pipeline targeting 56% revenue growth." },
          { icon: "shield", label: "Complete 3-Month Reserve", desc: "USD 328K reserve target — achievable from 2024 surplus on projected revenue trajectory." },
          { icon: "globe", label: "Multi-Currency Protocol", desc: "Formalize treasury management for 7-country field operation — FX loss elimination target." },
          { icon: "chart", label: "Reduce Overhead Below 10%", desc: "Fixed cost leverage as revenue scales — 8% overhead target for 2024 (achieved)." },
          { icon: "book", label: "First Full Audit (vs. Review)", desc: "Upgrade from CPA review to full independent audit as institutional donor requirements demand it." },
          { icon: "handshake", label: "Introduce Earned Revenue", desc: "First service revenue from premium Michael API access and advisory engagements in 2024." }
        ]
      },
      {
        type: "partners",
        title: "2023 Funding & Financial Partners",
        items: ["Canadian Government (IDRC pilot)", "ESA (pilot arrangement)", "Microsoft AI for Humanitarian Action", "Google.org", "Infinite Future Bank", "Equity Bank (field disbursements)", "Individual Donors (Stripe/PayPal)"]
      }
    ]
  },

  // ─── FINANCIAL 2022 ───────────────────────────────────────────────────────
  {
    id: "financial-2022",
    category: "Financial Reports",
    title: "WDC Pre-Launch Financial Summary 2022",
    subtitle: "Seed Funding & Technology Investment — The Financial Foundation for WDC's 2023 Launch",
    date: "December 2022",
    year: 2022,
    pages: 20,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    description: "WDC's 2022 pre-launch financial summary: the seed funding round and technology investment that funded Michael's development and enabled WDC's official launch in 2023.",
    tags: ["Finance", "Technology", "Foundation"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "trending", value: "$485K", label: "Total Revenue 2022" },
          { icon: "cpu", value: "58%", label: "Technology Investment Share" },
          { icon: "users", value: "10", label: "New Staff Hired" },
          { icon: "check", value: "$24K", label: "Net Surplus" }
        ]
      },
      {
        type: "map",
        src: OSM("-180%2C-60%2C180%2C75"),
        height: 260,
        caption: "2022: a technology-only year. All expenditure directed toward platform development — no field operations until 2023."
      },
      {
        type: "divider",
        title: "SECTION 1 — 2022 FINANCIAL OVERVIEW"
      },
      {
        type: "text",
        heading: "Investing in the Infrastructure That Makes Everything Else Possible",
        content: "WDC's pre-launch financial summary for 2022 — the year of technology investment before the official 2023 launch. The decision to concentrate 58% of expenditure in platform development was deliberate: Michael's accuracy, speed, and reliability in 2023 field contexts depended entirely on the quality of the engineering investment made in 2022. The returns on that investment — 85% accuracy, 99.1% uptime, 12 hazard types, 12 languages — have compounded with every subsequent year.\n\n**Total Revenue 2022: USD 485,000.** Sources: Canadian technology foundation seed grant (USD 200,000), Microsoft AI for Humanitarian Action program (USD 120,000 in Azure credits and advisory support, valued at cost), individual contributions from humanitarian sector professionals (USD 85,000), and service revenue from consulting engagements (USD 80,000).\n\n**Total Expenditure 2022: USD 461,000.** Technology development (58%, USD 267,000), covering engineering salaries, cloud infrastructure, data licensing, and external technical advisory. Operations (22%, USD 101,000) covering pre-launch legal setup, Ottawa office, and HR. Team scaling (12%, USD 55,000) covering recruitment and onboarding of 10 new staff. Communications (8%, USD 38,000).\n\n**Net Surplus: USD 24,000** — carried into 2023. This surplus was the seed of WDC's operational reserve, subsequently grown to USD 328,000 by end of 2024.\n\n**Administrative overhead at 22%** in 2022 reflects the fixed cost intensity of a pre-launch year — legal incorporation, office setup, HR systems, and the communications infrastructure needed to establish WDC's credibility with funders and partners. This figure declined to 11% in 2023 (WDC's first official year) and 8% in 2024 as revenue scaled. The declining overhead trajectory is the financial evidence of WDC's operational leverage. WDC officially launched in 2023."
      },
      {
        type: "two-col",
        left: {
          variant: "navy",
          heading: "2022 Revenue Sources",
          content: "Canadian Technology Foundation (seed grant): USD 200,000 (41%)\nMicrosoft AI for Humanitarian Action: USD 120,000 (25%, in-kind valued at cost)\nIndividual Donations: USD 85,000 (18%)\nService Revenue (consulting): USD 80,000 (16%)\n\nTotal: USD 485,000"
        },
        right: {
          variant: "blue",
          heading: "2022 Expenditure",
          content: "Technology Development: USD 267,000 (58%)\nOperations (legal, office, HR): USD 101,000 (22%)\nTeam Scaling (10 hires): USD 55,000 (12%)\nCommunications & Outreach: USD 38,000 (8%)\n\nTotal: USD 461,000\nSurplus: USD 24,000"
        }
      },
      {
        type: "cluster-dashboard",
        title: "2022 Technology Investment Breakdown",
        clusters: [
          { icon: "cpu", name: "Engineering Salaries (5 engineers)", need: 130000, target: 128000, needNum: "USD 130K budget", targetNum: "USD 128K actual" },
          { icon: "database", name: "Cloud Infrastructure (GCP)", need: 45000, target: 42000, needNum: "USD 45K budget", targetNum: "USD 42K actual" },
          { icon: "satellite", name: "Data Licensing (USGS, WMO, ACLED)", need: 55000, target: 52000, needNum: "USD 55K budget", targetNum: "USD 52K actual" },
          { icon: "search", name: "External Technical Advisory", need: 32000, target: 30000, needNum: "USD 32K budget", targetNum: "USD 30K actual" },
          { icon: "layers", name: "Development Tools & Licenses", need: 18000, target: 15000, needNum: "USD 18K budget", targetNum: "USD 15K actual" },
          { icon: "shield", name: "Security & Compliance", need: 12000, target: 10000, needNum: "USD 12K budget", targetNum: "USD 10K actual" }
        ],
        note: "All technology expenditure lines came in under budget. USD 267K actual vs. USD 292K technology budget — USD 25K to general reserve."
      },
      {
        type: "divider",
        title: "SECTION 2 — INVESTMENT RETURNS"
      },
      {
        type: "text",
        heading: "The Returns on 2022's Technology Investment",
        content: "The USD 267,000 invested in technology in 2022 generated returns that compound annually:\n\n**Year 1 Return (2022 itself):** Real-time validation accuracy of 81% across 47 events — confirming the platform was ready for field deployment. This cleared the threshold that justified the 2023 field mission budget.\n\n**Year 2 Return (2023):** DRC flood accuracy of 89%. Burundi Rusizi accuracy of 91%. Crisis Atlas subscription base of 1,247. Five EAGLE assessments used by OCHA, UNDP, WFP. Platform operational across two live field contexts.\n\n**Year 3 Return (2024):** 87% overall accuracy across 247 events. 9.4 million people in alert coverage. USD 0.14 cost per person. 99.1% uptime. ESA, Microsoft, Google, Canadian Government all formal partners. UNFCCC Top 10 Climate Innovation recognition.\n\n**The compounding logic:** Technology platform costs are largely fixed. Once Michael's architecture is built, scaling from 1.8M people covered (2023) to 9.4M (2024) required technology investment growth of 51% (USD 364K to USD 551K) while people covered grew 422%. This is the economic case for WDC: early technology investment generates exponentially growing impact at declining marginal cost."
      },
      {
        type: "timeline",
        title: "2022 Financial Calendar",
        items: [
          { year: "Jan 2022", icon: "check", title: "Seed Grant Received", content: "USD 200,000 from Canadian Technology Foundation received — first major institutional grant. Enables full engineering team hiring." },
          { year: "Feb 2022", icon: "handshake", title: "Microsoft Partnership Formalized", content: "Microsoft AI for Humanitarian Action program approved USD 120,000 in Azure cloud credits — critical for Michael's cloud infrastructure." },
          { year: "Apr 2022", icon: "users", title: "10 New Staff Onboarded", content: "USD 55,000 in recruitment and onboarding costs for 10 new team members. Team reaches 14 by September 2022." },
          { year: "Jun 2022", icon: "database", title: "Data Licensing Complete", content: "USD 52,000 in data licensing agreements signed with USGS, WMO, ACLED — complete data pipeline foundation." },
          { year: "Oct 2022", icon: "target", title: "Real-Time Validation Test", content: "47-event real-time test at no additional cost — validation methodology established, 81% accuracy confirmed." },
          { year: "Dec 2022", icon: "trending", title: "USD 24K Surplus to Reserves", content: "Year-end surplus USD 24,000 — first operational reserve. Technology investment complete, platform ready for 2023 field operations." }
        ]
      },
      {
        type: "table",
        title: "2022 vs. Plan: Financial Performance",
        headers: ["Category", "Plan (USD)", "Actual (USD)", "Variance", "Explanation"],
        rows: [
          ["Technology", "292,000", "267,000", "-25,000", "Engineering timeline slip; catch-up Q1 2023"],
          ["Operations", "98,000", "101,000", "+3,000", "Legal incorporation overrun"],
          ["Team Scaling", "60,000", "55,000", "-5,000", "2 hires moved to January 2023"],
          ["Communications", "42,000", "38,000", "-4,000", "One event/conference cancelled"],
          ["Total Expenditure", "492,000", "461,000", "-31,000", "6.3% under budget"],
          ["Total Revenue", "480,000", "485,000", "+5,000", "Service revenue above target"]
        ]
      },
      {
        type: "divider",
        title: "SECTION 3 — FOUNDATION & OUTLOOK"
      },
      {
        type: "callout",
        variant: "success",
        heading: "Finding: Upfront Technology Investment Generates Compounding Returns",
        content: "WDC's 2022 technology investment of USD 267,000 has generated measurable compounding returns: 81% accuracy in 2022 → 85% in 2023 → 87% in 2024; 0 field operations in 2022 → 2 missions in 2023 → 6 in 2024; 0 people covered in 2022 → 1.8M in 2023 → 9.4M in 2024. The technology infrastructure built in 2022 is the foundation of every subsequent year's impact."
      },
      {
        type: "callout",
        variant: "info",
        heading: "Finding: Microsoft Cloud Credits Substantially Reduce Technology Cash Costs",
        content: "Microsoft's USD 120,000 in Azure cloud credits represent 45% of WDC's 2022 technology cash expenditure equivalent — providing infrastructure that would otherwise require significant additional grant funding. This in-kind partnership model — where technology companies provide credits rather than cash — is a sustainable approach to NGO technology financing that WDC will replicate with additional technology partners in 2023–2024."
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Challenge: High Pre-Launch Overhead Requires Revenue Growth to Improve",
        content: "22% administrative overhead in 2022 reflects fixed pre-launch costs that do not scale proportionally with revenue. The path to WDC's target of <10% overhead is revenue growth, not cost cutting — the fixed cost base is already minimal. Each percentage point of revenue growth reduces overhead as a proportion of total expenditure. The 2023 outcome (11%, WDC's first official year) and 2024 outcome (8%) confirm this trajectory is on track."
      },
      {
        type: "bar-chart",
        title: "2022 Financial KPIs",
        items: [
          { label: "Technology Investment as % of Total Spend", value: 58, max: 100, color: "blue", note: "Reflects platform-first strategy" },
          { label: "Budget Utilization (93.7%)", value: 94, max: 100, color: "green", note: "USD 461K of USD 492K plan" },
          { label: "Revenue vs. Plan (101%)", value: 100, max: 100, color: "green", note: "USD 485K vs. USD 480K plan" },
          { label: "Surplus Margin (4.9%)", value: 5, max: 100, color: "amber", note: "USD 24K to reserves" },
          { label: "Grant Revenue % (66%)", value: 66, max: 100, color: "amber", note: "Target: reduce below 50% by 2026" }
        ]
      },
      {
        type: "quote",
        text: "Spending 58% of a USD 461,000 budget on technology when you have zero field operations is a bet on compounding returns. The 2023 and 2024 results show that bet was correct. Every dollar of field impact since 2023 traces back to the engineering investment made in 2022.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "icon-grid",
        title: "2022 Investment → 2023 Outcomes",
        cols: 2,
        items: [
          { icon: "cpu", label: "Michael Architecture → 85% Accuracy", desc: "2022 engineering investment validated at 85% accuracy in 2023 formal validation study." },
          { icon: "database", label: "Data Licensing → Training Data", desc: "USD 52K in data licensing produced 200K+ historical records — training foundation for all 12 hazard models." },
          { icon: "users", label: "Team Scaling → Field Capacity", desc: "10 new hires in 2022 included field coordinators deployed to DRC and Burundi in 2023." },
          { icon: "zap", label: "Cloud Infrastructure → 99.1% Uptime", desc: "GCP architecture built in 2022 delivered 99.1% uptime in 2024 across 9.4M people's coverage." },
          { icon: "handshake", label: "Microsoft Partnership → Azure Scale", desc: "Azure credits unlocked cloud compute capacity that WDC's grant budget alone could not afford." },
          { icon: "trending", label: "USD 24K Surplus → Reserve Foundation", desc: "Founding surplus built into USD 328K reserve by 2024 — organizational resilience against grant volatility." }
        ]
      },
      {
        type: "partners",
        title: "2022 Funding Partners",
        items: ["Canadian Technology Foundation", "Microsoft AI for Humanitarian Action", "Individual Donors", "TechSoup Canada", "USGS (data access)", "WMO (data access)", "ACLED (data access)", "NASA (data access)"]
      }
    ]
  },

  // ─── FIELD MISSION REPORTS ──────────────────────────────────────────────────
  {
    id: "mission-drc-2023",
    category: "Field Mission Reports",
    title: "Field Mission Report: Democratic Republic of Congo",
    subtitle: "North Kivu Flood Risk — Michael Integration & Community Reporter Network",
    date: "November 2023",
    year: 2023,
    pages: 28,
    coverImage: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&w=1400&q=80",
    description: "WDC's inaugural field mission: 147 days in North Kivu deploying Michael's flood early warning system, training 120 community reporters, and achieving 89% prediction accuracy — establishing the operational model replicated in all subsequent missions.",
    tags: ["DRC", "North Kivu", "Flood", "Community Reporters", "Michael", "OCHA"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "shield", value: "147", label: "Field Days" },
          { icon: "users", value: "120", label: "Community Reporters Trained" },
          { icon: "target", value: "89%", label: "Flood Prediction Accuracy" },
          { icon: "globe", value: "1.8M", label: "People in Alert Coverage" }
        ]
      },
      {
        type: "map",
        src: OSM("26.0%2C-6.0%2C31.0%2C3.0", "-4.3217%2C15.3222"),
        height: 300,
        caption: "WDC operational footprint: North Kivu Province, DRC. Primary areas: Goma, Beni, Butembo, and the Kivu lakefront communities most exposed to flood and volcanic risk."
      },
      {
        type: "divider",
        title: "SECTION 1 — CONTEXT & DEPLOYMENT RATIONALE"
      },
      {
        type: "text",
        heading: "Why North Kivu, Why 2023",
        content: "North Kivu is simultaneously one of the most disaster-prone and one of the most under-warned provinces on Earth. Three converging factors make it uniquely dangerous: the active volcanic complex of Nyiragongo and Nyamulagira (which destroyed 3,500 homes in Goma in May 2021), chronic flash flooding from the Virunga highlands (killing 200–500 people annually), and the ongoing M23/FARDC armed conflict that has displaced 6.9 million people — the largest internal displacement crisis in Africa.\n\nThe conventional early warning architecture in North Kivu is non-existent. METTELSAT, DRC's national meteorological service, has no functioning weather stations in the province. OCHA's early warning products for DRC rely on ECMWF global models that carry ±48 hours of temporal uncertainty and ±30km of spatial uncertainty — far too imprecise for the steep, narrow river valleys of the Kivu highlands where flood wave travel time from catchment to community can be under 90 minutes.\n\n**WDC deployed to North Kivu in March 2023 with a specific mandate**: validate Michael's performance in a complex emergency context, establish a community reporter network that could generate ground-truth data to improve model accuracy, and demonstrate that AI-powered early warning was operationally viable without functional government meteorological infrastructure. We achieved all three objectives — and documented precisely how we did it so the model can be replicated."
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "The Early Warning Gap in North Kivu",
          content: "0 functional METTELSAT stations in North Kivu. ECMWF spatial resolution: 9km (communities are 500m apart in Kivu highlands). Average warning lead time from conventional sources: 2–4 hours. Flash flood wave travel time in Kivu catchments: 45–90 minutes. Result: no actionable warning. 200–500 flood deaths per year in a province with 6+ million people."
        },
        right: {
          variant: "green",
          heading: "WDC's Michael Deployment Results",
          content: "89% flood prediction accuracy across 47 validated events. Average warning lead time delivered: 8.2 hours (vs. 2–4h baseline). 120 community reporters generating real-time ground truth. False positive rate: 9.1% (vs. 22% raw model — human validation halved error rate). Cost per person warned: USD 0.11 — 11× cheaper than any comparable system in DRC."
        }
      },
      {
        type: "divider",
        title: "SECTION 2 — FIELD OPERATIONS"
      },
      {
        type: "text",
        heading: "Building the Community Reporter Network",
        content: "The core innovation of WDC's DRC mission was the community reporter network — a distributed human sensor layer that transformed Michael's satellite and modeled data into ground-validated intelligence. 120 reporters were recruited from 38 communities across North Kivu, with selection criteria weighted toward people already serving community roles: teachers, health workers, market traders, and local government officials. Each reporter received a 3-day structured training covering: how to observe and categorize hazard indicators (river level, rainfall intensity, road condition), how to submit structured reports via SMS (for low-connectivity areas) or the Michael Mobile app, and how to receive and relay alert messages within their community.\n\nThe results exceeded expectations. Reporter retention at 6 months: 94% (2 reporters relocated due to conflict). Average report submission rate: 4.7 reports per reporter per week across all hazard types. False positive contribution: reporters flagged 23 Michael alerts as likely false — of which 21 were confirmed false positives. This human validation layer reduced the effective false positive rate from 22% (raw model) to 9.1%.\n\nCritically, the reporter network provided data types that no satellite or model can generate: road passability (critical for humanitarian logistics), community displacement status, and social tension indicators (critical in M23 conflict context). These inputs are now formally integrated into Michael's situational awareness layer for DRC."
      },
      {
        type: "cluster-dashboard",
        title: "DRC 2023 Mission Performance",
        clusters: [
          { icon: "target", name: "Flood Prediction Accuracy", need: 85, target: 89, needNum: "85% target", targetNum: "89% achieved" },
          { icon: "users", name: "Community Reporters Trained", need: 100, target: 120, needNum: "100 target", targetNum: "120 trained" },
          { icon: "shield", name: "Field Days Completed", need: 120, target: 147, needNum: "120 planned", targetNum: "147 delivered" },
          { icon: "zap", name: "Flash Alerts Issued", need: 40, target: 52, needNum: "40 projected", targetNum: "52 issued" },
          { icon: "globe", name: "Communities in Coverage", need: 30, target: 38, needNum: "30 target", targetNum: "38 communities" },
          { icon: "check", name: "Validated Events", need: 40, target: 47, needNum: "40 target", targetNum: "47 validated" }
        ],
        note: "All performance metrics independently verified through OCHA DRC field coordination records."
      },
      {
        type: "timeline",
        title: "DRC Mission Timeline 2023",
        items: [
          { year: "Mar 2023", icon: "flag", title: "Mission Launch — Goma Base Established", content: "WDC team of 6 arrives in Goma. OCHA coordination meeting held. Community reporter selection process begins across North Kivu." },
          { year: "Apr 2023", icon: "users", title: "First 60 Reporters Trained", content: "Goma and Beni cohorts complete 3-day training. First structured reports submitted via SMS. Michael's DRC-specific models activated." },
          { icon: "zap", year: "May 2023", title: "First Major Validation Event", content: "Semliki River flash flood predicted 9.4 hours in advance. 847 people evacuated in advance. Zero casualties. First independent validation of Michael in DRC." },
          { year: "Jul 2023", icon: "satellite", title: "ESA Partnership Activated", content: "Sentinel-1 SAR imagery integrated into Michael's DRC pipeline. Solves cloud cover problem for flood mapping. Spatial resolution improves from 9km to 250m." },
          { year: "Sep 2023", icon: "award", title: "UNICEF Formal Endorsement", content: "UNICEF DRC formally integrates WDC Michael alerts into its emergency preparedness protocols for North Kivu — institutional validation of the system." },
          { year: "Nov 2023", icon: "check", title: "Mission Conclusion & Handover", content: "47-event validation study complete. 89% accuracy confirmed. Reporter network transferred to local coordination (OCHA/UNICEF oversight). Full mission report filed." }
        ]
      },
      {
        type: "bar-chart",
        title: "Michael Accuracy by Hazard Type — DRC 2023",
        items: [
          { label: "Flash Flood (Kivu highlands)", value: 91, max: 100, color: "blue", note: "Best-performing hazard type — dense training data from ESA SAR" },
          { label: "River Flood (Semliki, Ulindi)", value: 89, max: 100, color: "blue" },
          { label: "Landslide (volcanic slope zones)", value: 84, max: 100, color: "amber" },
          { label: "Volcanic Activity (Nyiragongo monitoring)", value: 78, max: 100, color: "amber", note: "Limited by absence of seismic sensors — satellite-only" },
          { label: "Conflict-Induced Displacement Surge", value: 82, max: 100, color: "green", note: "First integration of ACLED conflict data with displacement prediction" }
        ]
      },
      {
        type: "quote",
        text: "North Kivu proved that AI-powered early warning works in the hardest possible environment — no meteorological infrastructure, active conflict, 6.9 million displaced, volcanic risk, and the cloud cover that defeats most satellites. If Michael works here, it works anywhere.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "DRC Mission Partners",
        items: ["OCHA DRC", "UNICEF DRC", "WFP DRC", "MONUSCO", "PNPRC (Croix-Rouge DRC)", "ESA (Sentinel SAR)", "ACTED DRC", "World Vision DRC", "ACLED", "USGS", "Airbus Defence & Space", "OpenStreetMap DRC"]
      }
    ]
  },

  {
    id: "mission-burundi-2023",
    category: "Field Mission Reports",
    title: "Field Mission Report: Burundi",
    subtitle: "Rusizi River Basin Flood Early Warning — PNPRC Integration",
    date: "October 2023",
    year: 2023,
    pages: 24,
    coverImage: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    description: "124 field days along the Rusizi River basin: WDC achieved 91% flood prediction accuracy and formally integrated Michael into Burundi's national disaster management system through the PNPRC partnership.",
    tags: ["Burundi", "Rusizi River", "Flood", "PNPRC", "Michael", "Bujumbura"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "shield", value: "124", label: "Field Days" },
          { icon: "users", value: "85", label: "Community Reporters Trained" },
          { icon: "target", value: "91%", label: "Flood Prediction Accuracy" },
          { icon: "globe", value: "1.1M", label: "People in Alert Coverage" }
        ]
      },
      {
        type: "map",
        src: OSM("28.8%2C-4.5%2C30.9%2C-2.3", "-3.3814%2C29.3615"),
        height: 280,
        caption: "WDC operational area: Rusizi River basin from Rwanda border to Lake Tanganyika, covering Bujumbura Mairie and the high-flood-risk communities of the Imbo Plain."
      },
      {
        type: "divider",
        title: "SECTION 1 — CONTEXT"
      },
      {
        type: "text",
        heading: "Burundi: The Rusizi Basin and a Country on the Edge of Climate Crisis",
        content: "Burundi is one of the world's most climate-vulnerable countries: ranked 184th of 189 in HDI, with 90% of the population dependent on rain-fed agriculture. The Rusizi River basin — connecting Lake Kivu to Lake Tanganyika along Burundi's western border — is the country's most dangerous flood corridor. In 2019, Rusizi floods killed 34 people and displaced 17,000 in a single week. In 2022, compounding rains caused flash floods across all five provinces of the Imbo Plain, with OCHA recording 8,241 households displaced.\n\nThe warning system available to PNPRC (the national Red Cross, Burundi's primary disaster response actor) before WDC's mission: a manual gauge reading at Murwi bridge, shared via telephone call, giving an average of 40 minutes' warning before downstream impact in Bujumbura. For communities on the Imbo Plain further south, no warning existed at all.\n\nWDC's Burundi mission had a clear objective: replace the single-gauge manual warning chain with Michael's full multi-input predictive system — and integrate the output formally into PNPRC's national early warning protocol. Both objectives were achieved."
      },
      {
        type: "text",
        heading: "PNPRC Integration: Making Institutional Change Stick",
        content: "The Burundi mission's most significant outcome was not the 91% accuracy statistic — it was the formal integration of Michael's output into PNPRC's early warning cascade. This required six weeks of parallel running (Michael alerts alongside the existing manual system), a joint validation protocol signed by PNPRC's Director General, and a structured handover that gave PNPRC staff ownership of the alert interpretation and dissemination process.\n\nThe integration protocol now in place: Michael issues a Red alert for Rusizi basin → automated SMS to PNPRC National Coordinator → 15-minute validation call with WDC data desk → PNPRC issues community-level alert via radio network and trained volunteers. Average time from Michael alert to community notification: 23 minutes. Previous system: 40 minutes (minimum) to a single community, with no downstream coverage.\n\nThis institutional integration model — not just deploying technology but embedding it in government and civil society decision chains — is now the standard WDC follows in every mission."
      },
      {
        type: "bar-chart",
        title: "Burundi 2023 — Accuracy by Hazard Type",
        items: [
          { label: "Rusizi River Flood (main stem)", value: 93, max: 100, color: "blue", note: "Highest accuracy achieved in 2023 — dense gauge network + ESA SAR" },
          { label: "Imbo Plain Flash Flood", value: 91, max: 100, color: "blue" },
          { label: "Landslide (highland tributaries)", value: 86, max: 100, color: "amber" },
          { label: "Lake Tanganyika Storm Surge", value: 79, max: 100, color: "amber", note: "Limited historical data — model improving quarterly" }
        ]
      },
      {
        type: "timeline",
        title: "Burundi Mission 2023 — Key Milestones",
        items: [
          { year: "Apr 2023", icon: "flag", title: "Mission Launch — Bujumbura", content: "WDC team of 4 deployed. Initial coordination with PNPRC, OCHA Burundi, and MINATTE (Ministry of Environment)." },
          { year: "May 2023", icon: "users", title: "85 Community Reporters Trained", content: "Training across 5 provinces covering all high-risk Rusizi basin communities. 38% female reporters — highest gender balance of any 2023 mission." },
          { year: "Jun 2023", icon: "zap", title: "First Rusizi Alert Validated", content: "Michael's 11.2-hour advance warning for Rusizi flood event confirmed accurate. PNPRC pre-positioned response teams. Zero casualty event in a community that had historically had 3–5 deaths per major flood." },
          { year: "Aug 2023", icon: "handshake", title: "PNPRC Formal Integration Protocol Signed", content: "Director General PNPRC signs joint protocol making Michael outputs official input to Burundi's national early warning cascade." },
          { year: "Oct 2023", icon: "check", title: "Mission Complete — 35 Events Validated", content: "91% accuracy across 35 events. Reporter network at 94% retention. Full handover to PNPRC with 6-month technical support agreement." }
        ]
      },
      {
        type: "quote",
        text: "The PNPRC team in Bujumbura now trusts Michael. That trust was built one validated alert at a time — we ran the system in parallel with their existing method for six weeks before they were willing to rely on it alone. That patience is what makes the technology stick.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "Burundi Mission Partners",
        items: ["PNPRC (Croix-Rouge Burundi)", "OCHA Burundi", "MINATTE Burundi", "UNICEF Burundi", "WFP Burundi", "ESA (Sentinel data)", "USGS", "World Vision Burundi", "ACTED Burundi"]
      }
    ]
  },

  {
    id: "mission-haiti-2024",
    category: "Field Mission Reports",
    title: "Field Mission Report: Haiti",
    subtitle: "Multi-Hazard Response — Hurricane, Flood & Security Monitoring",
    date: "September 2024",
    year: 2024,
    pages: 32,
    coverImage: "https://images.unsplash.com/photo-1566125882500-87e10f726cdc?auto=format&fit=crop&w=1400&q=80",
    description: "168 field days in Haiti's compound emergency: WDC navigated gang-controlled territory, Hurricane Beryl's direct impact, and a 5.5-million-person food security crisis — achieving 93% hurricane track accuracy and establishing the Caribbean's first community-driven multi-hazard early warning network.",
    tags: ["Haiti", "Hurricane", "Flood", "Gang Control", "Port-au-Prince", "Michael", "EAGLE"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "shield", value: "168", label: "Field Days" },
          { icon: "wind", value: "93%", label: "Hurricane Track Accuracy" },
          { icon: "users", value: "103", label: "Community Reporters Trained" },
          { icon: "globe", value: "2.4M", label: "People in Alert Coverage" }
        ]
      },
      {
        type: "map",
        src: OSM("-74.5%2C17.9%2C-71.5%2C20.1", "18.5944%2C-72.3074"),
        height: 300,
        caption: "Haiti operational coverage: Artibonite, Ouest (excluding MSS gang zones), Nord, Sud, and Grand'Anse departments — encompassing the flood, hurricane, and landslide risk corridors."
      },
      {
        type: "divider",
        title: "SECTION 1 — OPERATING IN HAITI'S COMPOUND EMERGENCY"
      },
      {
        type: "text",
        heading: "Haiti 2024: The World's Most Complex Humanitarian Environment",
        content: "Haiti in 2024 was the most operationally complex environment WDC has deployed into. The compound emergency — gang control of 80% of Port-au-Prince, 5.5 million food insecure (the largest food security crisis in the Western Hemisphere), political vacuum following President Moïse's assassination and no elected government, and the 2021 earthquake's ongoing structural impacts on housing — created conditions where every standard humanitarian operating protocol required adaptation.\n\nGang coalitions (primarily MSS — Viv Ansanm) controlled access to the largest concentration of disaster-vulnerable people in the country: Cité Soleil, Martissant, and the expanded metropolitan area holding 3.7 million people. WDC's Michael deployment was thus necessarily geographically restricted in the first quarter: we operated in Artibonite, Nord, Nord-Est, and the accessible portions of Ouest department, while coordinating remotely with partners who maintained gang-controlled zone access (primarily MSF and ACTED).\n\nThe decision to proceed with the Haiti mission despite these constraints was deliberate. Hurricane season 2024 was forecast to be above-normal (NOAA Category: Elevated). A major hurricane making landfall on Haiti without advance warning infrastructure in place would be catastrophic. Our assessment: the operational risks of deploying were lower than the humanitarian risk of not deploying."
      },
      {
        type: "callout",
        variant: "critical",
        heading: "Security Protocol: Operating Alongside Gang-Controlled Territories",
        content: "WDC implemented a three-tier security protocol for Haiti: Tier 1 (Green) — direct field access for WDC staff; Tier 2 (Amber) — community reporter network only, no WDC staff presence; Tier 3 (Red) — remote monitoring and partner relay only. 40% of our intended coverage area operated at Tier 3 throughout the mission. This is documented transparently: our coverage statistics for Haiti reflect the constraint, not a claim of full geographic access."
      },
      {
        type: "text",
        heading: "Hurricane Beryl: The First Real-Time Validation",
        content: "Hurricane Beryl (July 2024) provided the definitive validation of Michael's Caribbean hurricane capability. Beryl made landfall in Haiti as a Category 2 system with 100mph sustained winds and a storm surge of 4–6 feet along the southwestern coast. WDC issued the first actionable warning — including landfall location within 45km, timing within 4 hours, and rainfall accumulation forecast within 15% of observed — 72 hours before landfall. OCHA Haiti used this warning to pre-position response assets in Jérémie and Les Cayes.\n\nPost-event validation against NHC best-track data: WDC's track forecast error at 72 hours was 89km — compared to the official NHC 72-hour cone uncertainty of 115–150km. WDC's Haiti-specific landfall impact model (which factors in topography, settlement density, and historical vulnerability) produced impact projections that matched observed outcomes in 11 of 12 validated impact zones.\n\n**93% hurricane track accuracy** across 7 tropical systems monitored in Haiti in 2024. This is the metric that justifies the entire mission: in a country where a single hurricane can kill 2,000 people and displace 300,000, a 72-hour advance warning that reaches communities is the difference between preparedness and catastrophe."
      },
      {
        type: "bar-chart",
        title: "Haiti 2024 — Accuracy by Hazard Type",
        items: [
          { label: "Hurricane Track & Timing", value: 93, max: 100, color: "blue", note: "7 systems, avg. 72h lead time" },
          { label: "Flash Flood (Artibonite, Nord)", value: 88, max: 100, color: "blue" },
          { label: "Storm Surge (southwestern coast)", value: 85, max: 100, color: "amber" },
          { label: "Landslide (Grand'Anse mountains)", value: 81, max: 100, color: "amber" },
          { label: "Earthquake Aftershock (southern peninsula)", value: 72, max: 100, color: "amber", note: "Seismic prediction inherently limited — monitoring only" }
        ]
      },
      {
        type: "quote",
        text: "In Haiti, you are not fighting one disaster — you are fighting five simultaneously. Gangs, hunger, hurricane season, political collapse, and the traumatic aftermath of 2010 and 2021. In that context, a 72-hour hurricane warning is not just data — it is the difference between a community surviving or being swept away with no one coming for days.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "Haiti Mission Partners",
        items: ["OCHA Haiti", "MSF Haiti", "ACTED Haiti", "CARE Haiti", "WFP Haiti", "UNICEF Haiti", "NHC (National Hurricane Center)", "USGS", "ESA", "Catholic Relief Services", "World Vision Haiti", "Airbus (Pleiades imagery)"]
      }
    ]
  },

  {
    id: "mission-sudan-2024",
    category: "Field Mission Reports",
    title: "Field Mission Report: Sudan",
    subtitle: "Armed Conflict Early Warning & Displacement Tracking, SAF-RSF Crisis",
    date: "August 2024",
    year: 2024,
    pages: 30,
    coverImage: "https://images.unsplash.com/photo-1604497181015-76590d828b50?auto=format&fit=crop&w=1400&q=80",
    description: "142 field days supporting the world's largest displacement crisis: 10 million Sudanese displaced by the SAF-RSF armed conflict. WDC deployed a 100% remote-sensing approach to deliver flood and displacement early warning in a context where no ground access was possible.",
    tags: ["Sudan", "Conflict", "Displacement", "Remote Sensing", "Darfur", "UNHCR"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "shield", value: "142", label: "Field Days (Remote)" },
          { icon: "users", value: "10M", label: "Displaced People Tracked" },
          { icon: "target", value: "88%", label: "Displacement Surge Accuracy" },
          { icon: "satellite", value: "100%", label: "Remote Sensing Operations" }
        ]
      },
      {
        type: "map",
        src: OSM("24.0%2C10.0%2C38.0%2C22.0", "15.5007%2C32.5599"),
        height: 300,
        caption: "Sudan operational monitoring zones: Khartoum, North Darfur, South Darfur, West Kordofan, and the displacement corridors toward Chad, South Sudan, and Egypt — the world's largest active displacement crisis in 2024."
      },
      {
        type: "divider",
        title: "SECTION 1 — OPERATING WITHOUT GROUND ACCESS"
      },
      {
        type: "text",
        heading: "Sudan 2024: The World's Largest Displacement Crisis — No Ground Access",
        content: "The SAF-RSF armed conflict that began in April 2023 had, by the time of WDC's Sudan mission in 2024, displaced 10 million people — making Sudan the largest displacement crisis on Earth, surpassing Ukraine and Syria in absolute numbers. Khartoum, a city of 6 million, was a war zone. Darfur was inaccessible to all but a handful of humanitarian actors. South Kordofan and Blue Nile remained under conflict. The UN Security Council deadlocked on access negotiations.\n\nWDC's Sudan mission was therefore a 100% remote operation. Zero WDC staff entered Sudan. Zero community reporters were deployed. The entire operation ran from our Ottawa headquarters, using satellite imagery, ACLED conflict event data, UNHCR displacement tracking, and Michael's AI models — adapted for the first time to track not just natural disaster risk but conflict-driven displacement patterns.\n\nThis was a methodological breakthrough. WDC had previously deployed Michael only for natural hazard prediction. Sudan required us to build a conflict-displacement prediction module: using ACLED event density, Sentinel-2 population movement indicators (settlement change over time), and cross-border movement estimates from UNHCR tracking points to forecast where displacement surges would occur before they happened. The first test: predicting the July 2024 displacement wave from Khartoum's Omdurman district. We issued a 96-hour advance forecast. UNHCR activated pre-positioning protocols. Observed displacement matched our forecast within 12%."
      },
      {
        type: "callout",
        variant: "warning",
        heading: "Ethical Constraint: Conflict-Zone Data and Civilian Protection",
        content: "WDC's Sudan displacement tracking data was shared exclusively with UN agencies operating under humanitarian principles (UNHCR, OCHA, WFP, UNICEF). No data was shared with any party to the armed conflict (SAF or RSF) or with any government intelligence service. This constraint is absolute and non-negotiable — our data could not be used to harm civilians. All Sudan data is managed under WDC's Conflict Data Protocol, which is independently audited annually."
      },
      {
        type: "bar-chart",
        title: "Sudan 2024 — Remote Sensing Accuracy",
        items: [
          { label: "Displacement Surge Prediction (72h)", value: 88, max: 100, color: "blue", note: "16 displacement events predicted across 4 corridors" },
          { label: "Flood Early Warning (Nile, seasonal)", value: 86, max: 100, color: "blue" },
          { label: "Settlement Change Detection (Sentinel-2)", value: 92, max: 100, color: "green", note: "Satellite change detection — high confidence" },
          { label: "Cross-Border Movement Forecast", value: 79, max: 100, color: "amber", note: "Chad and South Sudan border points" }
        ]
      },
      {
        type: "quote",
        text: "Sudan forced us to answer a question we had never faced: can you do humanitarian early warning with no people in the field, no government cooperation, and no infrastructure? The answer is yes — but only because the technology has reached a point where satellites, AI, and conflict data can partially substitute for ground presence. Partially. The human network remains irreplaceable where it is safe to deploy.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "Sudan Mission Partners (Remote)",
        items: ["UNHCR Sudan", "OCHA Sudan", "WFP Sudan", "UNICEF Sudan", "ACLED", "ESA (Sentinel-1/2)", "USGS", "WorldPop (Oxford)", "IOM DTM Sudan", "MSF (data sharing)", "DRC (Danish Refugee Council) Sudan"]
      }
    ]
  },

  {
    id: "mission-jamaica-2024",
    category: "Field Mission Reports",
    title: "Field Mission Report: Jamaica",
    subtitle: "Caribbean Hurricane & Flash Flood Early Warning Pilot",
    date: "July 2024",
    year: 2024,
    pages: 22,
    coverImage: "https://images.unsplash.com/photo-1566125882500-87e10f726cdc?auto=format&fit=crop&w=1400&q=80",
    description: "98 field days establishing the Caribbean's first AI-powered community early warning network: WDC deployed Michael alongside Jamaica's ODPEM, trained 67 community reporters, and achieved 90% accuracy across the 2024 hurricane season — establishing the replication model for the broader Caribbean.",
    tags: ["Jamaica", "Caribbean", "Hurricane", "ODPEM", "Community Radio", "Michael"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "shield", value: "98", label: "Field Days" },
          { icon: "wind", value: "90%", label: "Hurricane Accuracy" },
          { icon: "users", value: "67", label: "Community Reporters Trained" },
          { icon: "globe", value: "780K", label: "People in Alert Coverage" }
        ]
      },
      {
        type: "map",
        src: OSM("-78.5%2C17.5%2C-76.0%2C18.6", "17.9970%2C-76.7936"),
        height: 260,
        caption: "Jamaica operational coverage: all 14 parishes, with highest-density reporter networks in St. Thomas, Portland, and St. Mary (eastern flood and hurricane landfall zones)."
      },
      {
        type: "divider",
        title: "SECTION 1 — CONTEXT & OPERATIONS"
      },
      {
        type: "text",
        heading: "Jamaica: The Caribbean Pilot That Sets the Regional Standard",
        content: "Jamaica is not in WDC's 'crisis' category — it has functional government, an established disaster management authority (ODPEM), and a functioning meteorological service. WDC chose Jamaica precisely because of this: to demonstrate that Michael adds value even alongside competent national systems, not just in their absence.\n\nThe proposition to ODPEM was straightforward: Michael's community-level resolution (250m grid cells vs. ODPEM's parish-level warnings) and AI-driven impact forecasting (which community road segments become impassable, which coastal areas face storm surge vs. inland flood) fills a gap that meteorological forecasting alone cannot. ODPEM agreed to a pilot with WDC providing Michael alerts as a supplementary layer to their existing warning cascade.\n\n90% hurricane accuracy across the 2024 season — which included Beryl's direct impact on the Caribbean — validated the proposition. Community radio integration: WDC's community reporters relayed Michael alerts directly to 23 community radio stations, reaching an estimated 340,000 listeners per major event. This is the Jamaica innovation that WDC is now replicating in Haiti and Barbados."
      },
      {
        type: "bar-chart",
        title: "Jamaica 2024 — Accuracy Metrics",
        items: [
          { label: "Hurricane Track & Impact Zone", value: 90, max: 100, color: "blue" },
          { label: "Flash Flood (Blue Mountains watershed)", value: 87, max: 100, color: "blue" },
          { label: "Storm Surge (southern coastline)", value: 88, max: 100, color: "blue" },
          { label: "Community Road Passability Forecast", value: 84, max: 100, color: "amber", note: "New metric — first deployment of logistics impact module" }
        ]
      },
      {
        type: "quote",
        text: "Jamaica showed that Michael doesn't replace national meteorological services — it completes them. ODPEM gave Jamaica's communities the forecast; Michael gave them the specific, hyper-local impact assessment that tells a farmer in St. Thomas whether her road will be passable after the storm. That combination is more powerful than either alone.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "Jamaica Mission Partners",
        items: ["ODPEM (Office of Disaster Preparedness & Emergency Management)", "Jamaica Meteorological Service", "OCHA Caribbean", "UNICEF Jamaica", "CDEMA (Caribbean Disaster Emergency Management Agency)", "NHC (National Hurricane Center)", "Community Radio Network Jamaica"]
      }
    ]
  },

  {
    id: "mission-afghanistan-2024",
    category: "Field Mission Reports",
    title: "Field Mission Report: Afghanistan",
    subtitle: "Flash Flood & Earthquake Monitoring — Remote Operations",
    date: "June 2024",
    year: 2024,
    pages: 26,
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80",
    description: "110 field days of remote-sensing-only operations in Taliban-controlled Afghanistan: WDC monitored flash flood and earthquake risk for 3.2 million people in Herat, Badghis, and Ghor provinces — working exclusively through UN partners with WFP and OCHA coordination.",
    tags: ["Afghanistan", "Flash Flood", "Earthquake", "Remote Sensing", "Herat", "WFP", "OCHA"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "satellite", value: "100%", label: "Remote Operations" },
          { icon: "shield", value: "110", label: "Field Days" },
          { icon: "target", value: "84%", label: "Flash Flood Accuracy" },
          { icon: "globe", value: "3.2M", label: "People Monitored" }
        ]
      },
      {
        type: "map",
        src: OSM("60.5%2C29.0%2C74.9%2C38.5", "34.5553%2C69.2075"),
        height: 280,
        caption: "Afghanistan monitoring zones: Herat (October 2023 earthquake recovery zone), Badghis, Ghor, and the Murghab River basin — highest flash flood risk corridors in western Afghanistan."
      },
      {
        type: "divider",
        title: "SECTION 1 — CONTEXT"
      },
      {
        type: "text",
        heading: "Afghanistan: Remote Operations in an Inaccessible Context",
        content: "Afghanistan under Taliban administration presents fundamental constraints for international humanitarian actors. WDC staff cannot operate in-country. Female staff are legally barred from humanitarian work under Taliban decree. Community reporter recruitment through WDC's standard model is not possible in most provinces. Yet the disaster risk — flash floods killing hundreds annually, the active earthquake zone including the catastrophic October 2023 Herat earthquake (6.3 magnitude, 1,400 killed) — demands early warning intelligence.\n\nWDC's approach: a 100% remote-sensing and partner-relay model, identical in structure to our Sudan operation but with different access constraints. Michael's western Afghanistan flash flood models were calibrated using USGS earthquake data, ESA Sentinel SAR imagery, and WFP Afghanistan's logistics network as the relay channel. WFP Afghanistan operates in all 34 provinces and has existing relationships with Taliban authorities for humanitarian access — their distribution network became Michael's early warning relay in inaccessible areas.\n\n84% flash flood accuracy across 22 validated events in Herat, Badghis, and Ghor provinces. In the Murghab River basin flash flood of May 2024 — 31 communities affected, 78 deaths — Michael's 14-hour advance warning reached WFP's provincial teams via our relay protocol. WFP pre-positioned emergency food stocks in Bala Murghab. Post-event assessment: WFP's pre-positioning reached 4,200 households within 6 hours of flooding, vs. 72+ hours in comparable events without advance warning."
      },
      {
        type: "bar-chart",
        title: "Afghanistan 2024 — Remote Sensing Accuracy",
        items: [
          { label: "Flash Flood (Murghab, Harirud basins)", value: 84, max: 100, color: "blue" },
          { label: "Earthquake Aftershock Monitoring (Herat zone)", value: 71, max: 100, color: "amber", note: "Monitoring only — prediction inherently limited for seismic events" },
          { label: "Settlement Damage Assessment (Sentinel-2)", value: 89, max: 100, color: "green", note: "Post-event damage mapping, not prediction" },
          { label: "Seasonal Flood Forecast (March snowmelt)", value: 82, max: 100, color: "blue" }
        ]
      },
      {
        type: "quote",
        text: "Afghanistan is the hardest country we monitor. No ground access, no community reporters, no government coordination, no women in the field. And yet the 84% accuracy we achieve remotely still saves lives — because WFP can pre-position food before a flood, even when we cannot put people in the field. Constraints change the method; they do not eliminate the obligation.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "Afghanistan Mission Partners (Remote)",
        items: ["WFP Afghanistan", "OCHA Afghanistan", "UNHCR Afghanistan", "USGS", "ESA (Sentinel-1/2)", "NCA (Norwegian Church Aid)", "ACTED Afghanistan", "WorldPop Oxford", "IOM Afghanistan DTM"]
      }
    ]
  },

  // ─── TECHNOLOGY / PRODUCT REPORTS ──────────────────────────────────────────
  {
    id: "tech-michael-2024",
    category: "Product Reports",
    title: "Michael Platform: Technical Architecture Report 2024",
    subtitle: "AI-Powered Multi-Hazard Early Warning — System Design & Performance",
    date: "November 2024",
    year: 2024,
    pages: 34,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    description: "Technical documentation of Michael's full system architecture: 12 hazard types, 840,000 geographic grid cells, 12 languages, Random Forest + LSTM ensemble models, GCP infrastructure, offline capability, and 99.1% uptime across 40+ countries.",
    tags: ["Michael", "AI", "Architecture", "Technical", "Machine Learning", "GCP"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "cpu", value: "12", label: "Hazard Types Modeled" },
          { icon: "globe", value: "840K", label: "Geographic Grid Cells" },
          { icon: "database", value: "4.7M", label: "Data Points Processed 2024" },
          { icon: "shield", value: "99.1%", label: "Platform Uptime" }
        ]
      },
      {
        type: "divider",
        title: "SECTION 1 — SYSTEM ARCHITECTURE"
      },
      {
        type: "text",
        heading: "Michael's Technical Architecture: The Full Stack",
        content: "Michael is a four-layer AI early warning platform. **Layer 1 — Data Ingestion**: Michael ingests 14 categories of real-time and near-real-time data feeds: USGS seismic feeds (1-minute latency), ECMWF ERA5 meteorological reanalysis (6-hourly), ESA Sentinel-1 SAR imagery (6–12 day revisit), NASA IMERG precipitation (30-minute global, 0.1° resolution), ACLED conflict events (12-hour delay), WMO GTS synoptic data, GDACS disaster alerts, NOAA tropical storm advisories, WorldPop population grids, OSM road network layers, Copernicus Global Land Service vegetation indices, and WDC's own community reporter submissions (real-time via API). Total data volume processed: 4.7 million data points per day at peak.\n\n**Layer 2 — Hazard Models**: Twelve independent hazard models, each trained on 10–15 years of historical event data. Model architecture: Random Forest ensemble for hazard classification (flash flood, river flood, tropical cyclone, drought, earthquake, landslide, volcanic, storm surge, wildfire, displacement, industrial hazard, epidemic trigger) combined with LSTM (Long Short-Term Memory) sequence models for temporal forecasting. The ensemble design allows Michael to produce both hazard probability scores (0–1) and expected impact estimates (area, population, severity) in a single inference pass.\n\n**Layer 3 — Alert Engine**: Thresholds are context-specific — a 70% flood probability threshold in rural Kivu triggers differently than in urban Bujumbura. The alert engine applies 847 location-specific calibration rules, updated quarterly based on field validation. False positive reduction: human-in-the-loop validation by WDC's 24/7 data desk reduces the model's raw 22% false positive rate to 8.3% for distributed alerts.\n\n**Layer 4 — Dissemination**: REST API (used by UNICEF, OCHA, WFP integrations), SMS gateway (for low-connectivity environments — 160-character structured alerts in 12 languages), Michael Mobile app (offline-capable, 2G-functional), and OCHA ReliefWeb push integration."
      },
      {
        type: "icon-grid",
        title: "12 Hazard Types Modeled by Michael",
        cols: 3,
        items: [
          { icon: "droplets", label: "Flash Flood", desc: "92% accuracy in 2024 — best-performing hazard type." },
          { icon: "waves", label: "River Flood", desc: "89% accuracy. 5–10 day forecast horizon on major river systems." },
          { icon: "wind", label: "Tropical Cyclone", desc: "91% track accuracy at 72h. Caribbean and Indian Ocean models." },
          { icon: "mountain", label: "Landslide", desc: "84% accuracy. SAR-derived soil saturation as primary predictor." },
          { icon: "thermometer", label: "Drought", desc: "Seasonal forecast: 73% accuracy at 90-day horizon." },
          { icon: "flame", label: "Wildfire", desc: "Monitoring in sub-Saharan Africa and Afghanistan." },
          { icon: "activity", label: "Earthquake", desc: "Monitoring + aftershock tracking. Prediction inherently limited." },
          { icon: "alert", label: "Storm Surge", desc: "Coastal impact modeling at 250m resolution." },
          { icon: "users", label: "Displacement Surge", desc: "88% accuracy. New in 2024 — conflict-driven displacement." },
          { icon: "database", label: "Volcanic Activity", desc: "Thermal anomaly detection via Sentinel-2 SWIR bands." },
          { icon: "shield", label: "Industrial Hazard", desc: "Chemical facility monitoring in conflict zones." },
          { icon: "heart", label: "Epidemic Trigger", desc: "Flood + population density → cholera risk index." }
        ]
      },
      {
        type: "bar-chart",
        title: "Michael 2024 — System Performance Metrics",
        items: [
          { label: "Platform Uptime (target: 99%)", value: 99, max: 100, color: "green", note: "99.1% — 7.9 hours downtime in full year" },
          { label: "Average Alert Latency (target: <5min)", value: 96, max: 100, color: "green", note: "Average 2.3 minutes from trigger to API delivery" },
          { label: "Overall Prediction Accuracy (target: 85%)", value: 87, max: 100, color: "blue" },
          { label: "False Positive Rate (target: <10%)", value: 92, max: 100, color: "green", note: "8.3% false positive rate — 92% precision" },
          { label: "Community Reporter Coverage (target: 400)", value: 93, max: 100, color: "blue", note: "417 active reporters across 6 field missions" }
        ]
      },
      {
        type: "quote",
        text: "Michael's architecture was designed with a non-negotiable constraint: it must work where the internet does not. Every design decision — from the compressed alert format to the offline-first mobile app — reflects the reality that our users in North Kivu or rural Bangladesh may have 2G connectivity on a good day.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "Technology Partners",
        items: ["Google Cloud (GCP infrastructure)", "Microsoft Azure (backup and AI training)", "ESA (Sentinel SAR/optical)", "NASA (IMERG, FIRMS)", "USGS (seismic, land data)", "ECMWF (ERA5 reanalysis)", "NOAA (tropical systems)", "WMO (GTS feeds)", "ACLED (conflict data)", "WorldPop Oxford (population grids)", "OpenStreetMap (road networks)"]
      }
    ]
  },

  {
    id: "tech-eagle-2023",
    category: "Product Reports",
    title: "EAGLE Platform: Technical Report 2023",
    subtitle: "Environmental & Geographic Assessment for Logistics Enhancement",
    date: "December 2023",
    year: 2023,
    pages: 28,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    description: "EAGLE's first full operational year: 5 formal assessments delivered in DRC, Burundi, and Haiti, achieving 92% logistics prediction accuracy and establishing the standard for AI-powered humanitarian supply chain intelligence.",
    tags: ["EAGLE", "Logistics", "SAR", "Supply Chain", "Sentinel", "ESA"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "layers", value: "5", label: "EAGLE Assessments Delivered" },
          { icon: "target", value: "92%", label: "Logistics Prediction Accuracy" },
          { icon: "satellite", value: "250m", label: "Road Analysis Resolution" },
          { icon: "truck", value: "3", label: "Countries Assessed" }
        ]
      },
      {
        type: "divider",
        title: "SECTION 1 — EAGLE TECHNICAL OVERVIEW"
      },
      {
        type: "text",
        heading: "EAGLE: The Logistics Intelligence Layer for Humanitarian Operations",
        content: "EAGLE (Environmental & Geographic Assessment for Logistics Enhancement) is WDC's second major platform — purpose-built to answer the question Michael cannot: once a disaster strikes, which routes can actually be used to reach affected communities?\n\nMichael predicts *when* and *where* disasters will occur. EAGLE predicts *what happens to infrastructure* as a result: which road segments will be flooded, which bridges will fail under the weight of heavy logistics trucks, which pre-positioning sites will remain accessible even after a Category 4 hurricane. The output is not a meteorological product — it is a logistics product, expressed in terms that humanitarian supply chain managers can directly act on.\n\nEAGLE's technical architecture: Sentinel-1 SAR imagery (6–12 day revisit, all-weather penetration) for road surface condition analysis. Sentinel-2 optical imagery for vegetation, settlement, and water body change detection. A WDC-proprietary road fragility index trained on 340 events across 12 countries: the road's construction standard, drainage design, historical failure frequency, topographic position, soil type, and current saturation level are combined into a single fragility score (0–100) that predicts flood-induced failure probability within 24 hours of peak event. At 250m resolution — the highest-resolution road fragility product available for Sub-Saharan Africa and the Caribbean.\n\n5 formal assessments delivered in 2023. All 5 used by OCHA, UNDP, or WFP for actual pre-positioning decisions. Independent validation: 92% of EAGLE's road accessibility predictions matched ground-truth assessment within 24 hours of event peak."
      },
      {
        type: "icon-grid",
        title: "EAGLE Output Products",
        cols: 2,
        items: [
          { icon: "truck", label: "Road Fragility Index", desc: "250m-resolution pre-disaster road passability scores for 40+ countries. Updated with each Sentinel-1 pass." },
          { icon: "package", label: "Pre-Positioning Site Assessment", desc: "Warehouse and staging area vulnerability mapping: flood risk, road access continuity, structural condition." },
          { icon: "layers", label: "Post-Event Route Analysis", desc: "Real-time road accessibility update within 6 hours of disaster peak — using SAR change detection." },
          { icon: "crosshair", label: "Last-Mile Access Mapping", desc: "Community-level access corridors for the final 5–20km of supply chains — the segment most frequently disrupted." }
        ]
      },
      {
        type: "quote",
        text: "EAGLE exists because humanitarian organizations lose weeks finding passable routes after a disaster — time that costs lives. Satellites can see through clouds and across 40 countries simultaneously. We built EAGLE to turn that satellite data into the answer a logistics coordinator actually needs: 'Which road can my truck use today?'",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "EAGLE Technical Partners",
        items: ["ESA (Sentinel-1/2 data access)", "Airbus Defence & Space (Pleiades high-res imagery)", "OCHA (operational integration)", "WFP (supply chain validation)", "UNDP (assessment commissioning)", "OpenStreetMap (road network baseline)", "WorldPop Oxford (population at risk)", "UN-SPIDER (space & disaster platform)"]
      }
    ]
  },

  {
    id: "tech-accuracy-2024",
    category: "Product Reports",
    title: "Michael Accuracy & Validation Study 2024",
    subtitle: "Independent Validation of 247 Disaster Events Across 40+ Countries",
    date: "October 2024",
    year: 2024,
    pages: 20,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    description: "Rigorous independent validation of Michael's predictive performance across 247 real disaster events in 2024. 87% overall accuracy, 92% flash flood accuracy, and an 8.3% false positive rate — all validated using WHO-standard blind assessment methodology.",
    tags: ["Accuracy", "Validation", "Michael", "Performance", "Methodology", "247 Events"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "check", value: "247", label: "Validated Events" },
          { icon: "target", value: "87%", label: "Overall Accuracy" },
          { icon: "droplets", value: "92%", label: "Flash Flood Accuracy" },
          { icon: "shield", value: "8.3%", label: "False Positive Rate" }
        ]
      },
      {
        type: "divider",
        title: "SECTION 1 — VALIDATION METHODOLOGY"
      },
      {
        type: "text",
        heading: "Methodology: Why and How WDC Validates Its Own Claims",
        content: "NGOs and technology companies routinely make accuracy claims about their products without rigorous validation. WDC's position is that this is unacceptable in a life-safety context. A humanitarian early warning system that claims 87% accuracy without methodology is dangerous: it builds institutional trust that, if the claim is false, will cost lives.\n\nWDC's validation methodology was developed in consultation with ECMWF and WMO, and follows WHO's standard framework for medical diagnostic test validation — adapted for geospatial predictive systems. The core principle: **all validation is prospective and blinded**. Michael's forecast for each event is logged with a timestamp at the time of issuance. The outcome assessment happens after the event, by a validation team that does not have access to the original forecast. Cross-referencing is against independent data: EM-DAT disaster records, OCHA situation reports, government disaster authority reports, and WDC's own field assessments where available.\n\n**Strict definitions**: True Positive = Michael predicted the event within the stated lead time and geographic accuracy bounds; event occurred as predicted. False Positive = Michael predicted an event that did not occur (or occurred outside the stated bounds). False Negative = Event occurred that Michael did not predict. True Negative = Michael correctly predicted no significant event. The 247 events in this study span all 12 hazard types, 40+ countries, and all four quarters of 2024."
      },
      {
        type: "table",
        title: "Michael 2024 — Accuracy by Hazard Type",
        headers: ["Hazard Type", "Events Validated", "True Positive", "False Positive", "Accuracy", "Lead Time (avg)"],
        rows: [
          ["Flash Flood", "54", "50", "5", "92%", "8.4h"],
          ["Tropical Cyclone/Hurricane", "18", "17", "2", "91%", "67.2h"],
          ["River Flood", "47", "42", "4", "89%", "38.1h"],
          ["Displacement Surge", "31", "27", "4", "88%", "96.0h"],
          ["Landslide", "28", "24", "3", "84%", "5.2h"],
          ["Drought (onset)", "22", "18", "4", "80%", "N/A (seasonal)"],
          ["Storm Surge", "19", "16", "3", "84%", "18.3h"],
          ["Earthquake (aftershock)", "14", "9", "2", "72%", "N/A (monitoring)"],
          ["Other Hazard Types", "14", "11", "3", "79%", "Variable"],
          ["**TOTAL**", "**247**", "**214**", "**30**", "**87%**", "**28.6h avg**"]
        ]
      },
      {
        type: "callout",
        variant: "info",
        heading: "Comparison with Baseline: ECMWF and NWS at 72h",
        content: "ECMWF's Ensemble Prediction System (the global gold standard for atmospheric forecasting) achieves 85–92% accuracy for large-scale meteorological events at 72-hour lead time in data-rich environments. WDC's 87% accuracy in fragile-state, data-sparse environments is a directly comparable performance — achieved without the infrastructure investment ECMWF requires. NWS achieves 88% for flash flood warnings in the continental United States at 6-hour lead time with dense gauge networks. WDC achieves 92% at 8.4-hour lead time with no gauge network."
      },
      {
        type: "quote",
        text: "87% means 13% of events were either missed or incorrectly predicted. We document those failures because they matter. Each false negative is a community that did not receive a warning it needed. Improving that number from 13% to 8% over the next three years is not a technical ambition — it is a humanitarian obligation.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      }
    ]
  },

  {
    id: "tech-nostradamus-2024",
    category: "Product Reports",
    title: "Project Nostradamus: Technical Report 2024",
    subtitle: "Long-Range Disaster Risk Forecasting — 30 to 180 Day Prediction Window",
    date: "September 2024",
    year: 2024,
    pages: 22,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    description: "Nostradamus extends WDC's prediction horizon from Michael's 72-hour window to 30–180 days, using climate pattern coupling (ENSO, IOD, MJO) to give humanitarian planners seasonal advance warning for resource pre-positioning and anticipatory financing activation.",
    tags: ["Nostradamus", "Long-Range Forecast", "ENSO", "Seasonal", "Anticipatory", "UNICEF"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "clock", value: "30–180", label: "Day Forecast Window" },
          { icon: "target", value: "71%", label: "6-Month Forecast Accuracy" },
          { icon: "globe", value: "28", label: "Countries in Pilot" },
          { icon: "zap", value: "3", label: "Climate Indices Integrated" }
        ]
      },
      {
        type: "divider",
        title: "SECTION 1 — THE CASE FOR LONG-RANGE FORECASTING"
      },
      {
        type: "text",
        heading: "Why 72 Hours Is Not Enough: The Anticipatory Finance Gap",
        content: "Michael's 72-hour alert window is excellent for operational response — evacuations, pre-positioning of emergency supplies, standby of response teams. But it is too short for the decision cycles of humanitarian planning and finance. Pre-positioning food stocks for a major flood requires 4–6 weeks of procurement and logistics lead time. Anticipatory financing mechanisms (like CERF's AFF and the Red Cross DREF) require event probability forecasts at 30+ days to trigger funding releases. Contingency planning for a drought requires a 3–6 month horizon.\n\nNostradamus was built to fill this gap. Using the three primary drivers of seasonal climate variability — ENSO (El Niño/La Niña), the Indian Ocean Dipole (IOD), and the Madden-Julian Oscillation (MJO) — Nostradamus produces probabilistic risk outlooks at 30, 60, 90, and 180-day horizons for all 28 pilot countries. The output is not a forecast in the meteorological sense — it is a risk probability distribution that humanitarian planners can use to make contingency decisions.\n\n71% accuracy at 6 months means that in 71% of Nostradamus's high-risk seasonal outlooks, a significant disaster event in the predicted category occurred within the forecast window. This is compared to a 32% climatological base rate for the same event types in the same locations — Nostradamus more than doubles the predictive signal available for humanitarian planning."
      },
      {
        type: "bar-chart",
        title: "Nostradamus 2024 — Accuracy by Forecast Horizon",
        items: [
          { label: "30-day horizon", value: 83, max: 100, color: "green", note: "Highest accuracy — approaches Michael's operational precision" },
          { label: "60-day horizon", value: 78, max: 100, color: "green" },
          { label: "90-day horizon", value: 74, max: 100, color: "blue" },
          { label: "180-day horizon", value: 71, max: 100, color: "blue", note: "vs. 32% climatological base rate" }
        ]
      },
      {
        type: "quote",
        text: "Nostradamus doesn't predict the future — it quantifies uncertainty about the future in a way that enables better decisions. When UNICEF WCARO knows in January that there is a 74% probability of above-normal rainfall in the Sahel in March–May, they can pre-position. Without Nostradamus, they wait for ECMWF's 10-day forecast in March — and they are always behind.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      }
    ]
  },

  {
    id: "tech-crisisatlas-2024",
    category: "Product Reports",
    title: "Crisis Atlas: Platform Report 2024",
    subtitle: "Humanitarian Data Visualization & Country Risk Intelligence Portal",
    date: "August 2024",
    year: 2024,
    pages: 18,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    description: "Crisis Atlas serves 1,247 subscribers across 89 organizations with country risk intelligence across 190+ countries — integrating 47 crisis indicators into an accessible portal used by OCHA, UNDP, and 12 donor governments for humanitarian planning.",
    tags: ["Crisis Atlas", "Data Portal", "Country Risk", "OCHA HDX", "Visualization", "Intelligence"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "users", value: "1,247", label: "Active Subscribers" },
          { icon: "globe", value: "190+", label: "Countries Mapped" },
          { icon: "layers", value: "47", label: "Crisis Indicators" },
          { icon: "building", value: "89", label: "Organizations Served" }
        ]
      },
      {
        type: "text",
        heading: "Crisis Atlas: Making Country Risk Legible for Decision-Makers",
        content: "Crisis Atlas is WDC's open data portal — the public face of WDC's intelligence capability. Where Michael and EAGLE produce operational products for field teams, Crisis Atlas produces strategic intelligence for headquarters-level decision-makers: humanitarian coordinators, donor country desks, UN agency planning teams, and journalists covering humanitarian crises.\n\n47 crisis indicators are maintained for 190+ countries: disaster frequency and severity (5-year rolling), conflict intensity (ACLED-derived), displacement stock and flow (UNHCR/IOM), food security phase (IPC), health system capacity, infrastructure access scores, climate vulnerability index, governance fragility (World Bank CPIA proxy), and WDC-specific indicators (Michael prediction frequency, EAGLE assessment coverage). Each indicator is updated monthly. The composite Country Risk Score — a weighted aggregate — has been validated against INFORM Risk Index and ND-GAIN Country Index, showing 0.87 and 0.91 correlation respectively.\n\nIntegration with OCHA's Humanitarian Data Exchange (HDX) makes Crisis Atlas data available to the full humanitarian community at zero cost. 12 donor governments cite Crisis Atlas data in their humanitarian funding allocation decisions."
      },
      {
        type: "bar-chart",
        title: "Crisis Atlas 2024 — Usage Metrics",
        items: [
          { label: "Monthly active users", value: 84, max: 100, color: "blue", note: "1,247 subscribers, 84% monthly active" },
          { label: "Country profiles accessed (% of 190)", value: 78, max: 100, color: "blue" },
          { label: "HDX dataset downloads (target: 50K)", value: 92, max: 100, color: "green", note: "46,200 downloads in 2024" },
          { label: "Subscriber satisfaction (target: 4.0/5)", value: 86, max: 100, color: "green", note: "4.3/5.0 average rating" }
        ]
      },
      {
        type: "quote",
        text: "Crisis Atlas is our open-access commitment made concrete. Every country risk score, every indicator, every methodology note — public, downloadable, citable. If WDC's intelligence is good enough for OCHA and donor governments, it should be good enough for a journalist in Nairobi or a PhD student in Dhaka.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      }
    ]
  },

  // ─── THEMATIC & POLICY REPORTS ──────────────────────────────────────────────
  {
    id: "thematic-ai-2024",
    category: "Thematic & Policy Reports",
    title: "AI in Humanitarian Action: WDC Thematic Report 2024",
    subtitle: "Opportunities, Risks, and the Case for Responsible Deployment in Crisis Contexts",
    date: "October 2024",
    year: 2024,
    pages: 26,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    description: "WDC's authoritative thematic analysis of AI deployment in humanitarian action: the humanitarian AI opportunity ($3.8B efficiency potential), five principles for responsible deployment, the false alarm problem, data sovereignty for the Global South, and WDC's human-AI hybrid model.",
    tags: ["AI", "Humanitarian", "Ethics", "Responsible AI", "IASC", "Data Sovereignty"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "cpu", value: "$3.8B", label: "Estimated Efficiency Potential (OCHA)" },
          { icon: "globe", value: "5", label: "Principles for Humanitarian AI" },
          { icon: "shield", value: "8.3%", label: "WDC False Positive Rate (vs. 22% raw)" },
          { icon: "users", value: "417", label: "Community Validators in WDC Network" }
        ]
      },
      {
        type: "divider",
        title: "SECTION 1 — THE OPPORTUNITY AND THE RISK"
      },
      {
        type: "text",
        heading: "AI in Humanitarian Action: The Scale of the Opportunity",
        content: "OCHA's 2023 Global Humanitarian Overview estimated that AI deployment across humanitarian operations could generate USD 3.8 billion in annual efficiency gains — through faster needs assessment, more accurate targeting, reduced logistics waste, and better early warning. The UN Secretary-General's report on AI (2023) identified humanitarian early warning as one of five priority AI applications for the Sustainable Development Goals.\n\nWDC's evidence from 6 field missions and 247 validated events shows what that efficiency looks like in practice: cost per person reached dropping from USD 1.20–2.50 (traditional early warning) to USD 0.14 (Michael); lead times increasing from 2–4 hours to 8–14 hours; geographic coverage expanding from capital cities to rural communities. The opportunity is real, it is already being realized, and it is growing.\n\nBut the risks of irresponsible AI deployment in humanitarian contexts are equally real. A false positive in a weather app is an inconvenience. A false positive in a humanitarian early warning system forces the evacuation of 50,000 people who may not comply with the next warning because they no longer trust the system. **The false alarm problem is not an engineering challenge — it is a humanitarian one.** WDC's response is the human-in-the-loop validation system that reduces our raw 22% false positive rate to 8.3% through community reporter validation. Technology alone is not the answer."
      },
      {
        type: "two-col",
        left: {
          variant: "red",
          heading: "The Risks of Irresponsible Humanitarian AI",
          content: "False alarms erode community trust — one false evacuation can reduce compliance with the next warning by 40% (research from Bangladesh, 2021). Algorithmic bias: models trained on historical data from data-rich contexts underperform in data-sparse contexts. Data sovereignty: community data collected for humanitarian AI can be repurposed for surveillance. Accountability gaps: when an AI-issued warning fails, who is responsible? Black box models prevent learning from failures."
        },
        right: {
          variant: "green",
          heading: "WDC's Responsible AI Principles",
          content: "1. Human validation before distribution — all alerts reviewed by human data desk. 2. Community data ownership — no data shared without consent and purpose limitation. 3. Explainable outputs — every alert includes a plain-language explanation of why it was issued. 4. Failure documentation — all false positives and negatives are documented publicly. 5. Local capacity transfer — AI tools transfer to local partners, not create dependency on WDC."
        }
      },
      {
        type: "quote",
        text: "Humanitarian AI done right is not about replacing human judgment — it is about giving human judgment better inputs, faster. The AI that saves lives is not the one that automates the decision. It is the one that gives the right person the right information 12 hours earlier than they would have had it otherwise.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      }
    ]
  },

  {
    id: "thematic-africa-ews-2024",
    category: "Thematic & Policy Reports",
    title: "Africa Early Warning Systems Gap Analysis 2024",
    subtitle: "Bridging the Data Desert: From Observation Networks to AI-Powered Intelligence",
    date: "July 2024",
    year: 2024,
    pages: 30,
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80",
    description: "Comprehensive gap analysis of early warning system capacity across 54 African countries: 38% of global disaster deaths, 8% of global weather stations, a USD 2.3B investment gap — and WDC's strategy for bridging it with AI.",
    tags: ["Africa", "Early Warning", "Gap Analysis", "WMO", "IGAD", "ECOWAS", "Data Desert"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "alert", value: "38%", label: "Global Disaster Deaths in Africa" },
          { icon: "activity", value: "8%", label: "Africa Share of Global Weather Stations" },
          { icon: "trending", value: "$2.3B", label: "Annual EWS Investment Gap" },
          { icon: "globe", value: "54", label: "Countries Analyzed" }
        ]
      },
      {
        type: "divider",
        title: "SECTION 1 — THE AFRICA EWS PARADOX"
      },
      {
        type: "text",
        heading: "Africa's Early Warning Paradox: Highest Risk, Lowest Capacity",
        content: "Africa accounts for 38% of global disaster deaths but operates only 8% of the world's functional weather observation stations. The WMO's 2021 State of Climate Services report found that 60% of African countries have early warning systems classified as 'limited' or 'non-existent.' Sub-Saharan Africa — home to 1.1 billion people and the world's highest concentration of climate-vulnerable communities — has fewer functioning weather radars than the state of Texas.\n\nThis is the Africa EWS paradox: the continent most exposed to climate-driven disasters is the least equipped to warn its communities. The consequences are measured in preventable deaths: the 2023 Libya floods killed 11,300 people — a tragedy preventable with a 24-hour early warning system. The 2022 South Sudan floods displaced 800,000 — a crisis where a functioning Nile basin monitoring system would have provided 72+ hours of warning. The 2021 Madagascar cyclone season killed 200 people who received no advance warning because the national meteorological service had no functioning radar.\n\nThe investment gap is quantified at USD 2.3 billion per year — the difference between Africa's current EWS investment and the level required to provide functional end-to-end early warning to all climate-vulnerable communities. Against this gap, WDC's approach is not to wait for infrastructure investment that may take decades — it is to bridge the gap with AI that works in data-sparse environments now."
      },
      {
        type: "table",
        title: "Africa EWS Capacity by Region — 2024 Assessment",
        headers: ["Region", "Countries", "% with Functional EWS", "WMO Stations per 1M pop", "WDC Coverage"],
        rows: [
          ["East Africa (IGAD)", "8", "25%", "0.8", "DRC, Burundi active; Kenya 2024"],
          ["West Africa (ECOWAS)", "15", "33%", "1.2", "West Africa pilot 2024"],
          ["Horn of Africa", "5", "20%", "0.4", "Somalia remote monitoring"],
          ["Southern Africa (SADC)", "16", "44%", "2.1", "Zimbabwe, Mozambique planned 2025"],
          ["North Africa", "6", "67%", "3.8", "Sudan remote; others monitoring"],
          ["Central Africa", "8", "13%", "0.3", "DRC active — lowest capacity globally"]
        ]
      },
      {
        type: "quote",
        text: "The Africa EWS gap is not a technical failure — it is a political and financial one. The technology exists. AI makes it cheaper and faster to deploy than ever before. What is missing is the political will to prioritize warning the communities that are dying, and the financing to scale what already works.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      }
    ]
  },

  {
    id: "strategic-plan-2024",
    category: "Thematic & Policy Reports",
    title: "WDC Strategic Plan 2024–2026",
    subtitle: "Scaling Humanitarian AI: From 40 to 100 Countries in Three Years",
    date: "January 2024",
    year: 2024,
    pages: 28,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    description: "WDC's 2024–2026 strategic plan: four pillars (Technology, Field Operations, Partnerships, Sustainability), the roadmap to 100-country coverage and 25 million people in alert, and the financial plan to reach USD 12M annual budget by 2026.",
    tags: ["Strategic Plan", "2024-2026", "Theory of Change", "Scale", "100 Countries", "Sustainability"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "globe", value: "100", label: "Country Target by 2026" },
          { icon: "users", value: "25M", label: "People in Coverage Target" },
          { icon: "trending", value: "$12M", label: "2026 Budget Target" },
          { icon: "target", value: "4", label: "Strategic Pillars" }
        ]
      },
      {
        type: "divider",
        title: "SECTION 1 — THEORY OF CHANGE"
      },
      {
        type: "text",
        heading: "Theory of Change: How WDC Reduces Disaster Mortality",
        content: "WDC's theory of change is direct and falsifiable:\n\n**IF** communities in disaster-prone, data-sparse environments receive 8–72 hours advance warning of impending hazards, in their own languages, via channels they trust and can access, **THEN** they can take protective action — evacuating, moving livestock, reinforcing structures, pre-positioning emergency supplies — that reduces the mortality, displacement, and economic loss that would otherwise result from those hazards.\n\n**IF** humanitarian partners receive the same warnings through institutional channels (OCHA, UNICEF, WFP), with sufficient lead time for operational pre-positioning, **THEN** their response is faster, cheaper, and better-targeted — reducing the cost per life saved and the time to reach the most vulnerable.\n\n**IF** national disaster management authorities integrate AI-powered early warning into their official systems (as PNPRC Burundi has done), **THEN** the system becomes sustainable beyond WDC's direct involvement — transferring capacity, not creating dependency.\n\nThe evidence base validating this theory: 247 validated events, 87% accuracy, USD 0.14 cost per person, PNPRC integration (Burundi), UNICEF protocol adoption (DRC, Kenya), and OCHA's formal use of WDC intelligence in Sudan and Haiti."
      },
      {
        type: "icon-grid",
        title: "Four Strategic Pillars 2024–2026",
        cols: 2,
        items: [
          { icon: "cpu", label: "Pillar 1: Technology", desc: "Michael to 100 countries, 95% accuracy target, Nostradamus to 50 countries, EAGLE Phase 2 with 100m resolution, Michael Mobile v3 with AI offline capability." },
          { icon: "globe", label: "Pillar 2: Field Operations", desc: "12 active field missions by 2026 (from 6 in 2024), 1,000 community reporters, field presence in all 5 African regions, Caribbean regional hub established." },
          { icon: "handshake", label: "Pillar 3: Partnerships", desc: "Formal integration in 20 national disaster management systems, UNFCCC EWIS implementation partner, CERF anticipatory action technical partner, 100 UN/NGO API subscribers." },
          { icon: "trending", label: "Pillar 4: Sustainability", desc: "Data subscription revenue to 30% of total by 2026 (from 0% in 2022), Crisis Atlas premium tier launch, government SLA partnerships, 6-month operational reserve." }
        ]
      },
      {
        type: "quote",
        text: "A strategic plan is a public commitment. By publishing this plan, WDC is accountable: 100 countries, 25 million people, USD 12 million budget by end of 2026. If we do not hit these targets, we will say so clearly and explain why. The humanitarian sector does not need more aspirational documents — it needs organizations willing to be measured.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      }
    ]
  },

  {
    id: "policy-data-2024",
    category: "Thematic & Policy Reports",
    title: "WDC Data Governance Policy 2024",
    subtitle: "Responsible Data Management for Humanitarian AI Operations",
    date: "March 2024",
    year: 2024,
    pages: 16,
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    description: "WDC's formal data governance framework: GDPR-aligned for EU partners, community consent protocols, data minimization principles, third-party data sharing restrictions, and annual independent audit — the policy framework that governs all WDC data operations.",
    tags: ["Data Governance", "GDPR", "Privacy", "Humanitarian Data", "Consent", "OCHA Data Responsibility"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "lock", value: "GDPR+", label: "Data Protection Standard" },
          { icon: "shield", value: "6", label: "Core Data Principles" },
          { icon: "check", value: "Annual", label: "Independent Audit Cycle" },
          { icon: "globe", value: "0", label: "Data Sold to Third Parties" }
        ]
      },
      {
        type: "divider",
        title: "SECTION 1 — POLICY FRAMEWORK"
      },
      {
        type: "text",
        heading: "Six Principles Governing All WDC Data Operations",
        content: "WDC's data governance framework is built on six principles derived from OCHA's Data Responsibility Guidelines, the IASC's Operational Guidance on Data Responsibility, and GDPR for EU partner compliance:\n\n**1. Purpose Limitation**: All data collected by WDC is used only for the humanitarian purpose for which it was collected. Community reporter location data is used for alert validation only — never for mapping community locations in conflict contexts. Conflict data is shared only for humanitarian protection, never with parties to armed conflict.\n\n**2. Data Minimization**: WDC collects only the data necessary for its early warning mission. Personal data collection is explicitly prohibited in all field contexts — community reporters are identified by a numeric code, not name or location. Michael's models operate on aggregated grid-cell data, not individual household data.\n\n**3. Community Consent**: All community reporter data is collected with explicit oral consent (written where literacy permits). Communities retain the right to withdraw from the reporter network at any time. Data collected from a community is shared back with that community first — alerts reach communities before they reach any institutional partner.\n\n**4. Security**: All WDC data is encrypted at rest (AES-256) and in transit (TLS 1.3). Community reporter data is stored on GCP servers in GDPR-compliant regions. Zero data is stored locally on field staff devices.\n\n**5. Accountability**: WDC publishes an annual data audit report. All data sharing agreements are public. Data breaches are reported within 72 hours to affected communities and institutional partners.\n\n**6. Sovereignty**: WDC does not claim ownership of community-sourced data. National disaster management authorities that integrate Michael retain co-ownership of the calibration data generated in their territory."
      },
      {
        type: "quote",
        text: "Data governance in humanitarian AI is not bureaucratic compliance — it is the difference between communities trusting us enough to share their observations and communities refusing because they have seen their data weaponized against them. We earn that trust one policy at a time.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      }
    ]
  },

  {
    id: "policy-gender-2024",
    category: "Thematic & Policy Reports",
    title: "WDC Gender & Inclusion Policy 2024",
    subtitle: "Integrating Gender-Responsive Early Warning Across WDC Operations",
    date: "April 2024",
    year: 2024,
    pages: 18,
    coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80",
    description: "WDC's gender and inclusion framework: the evidence base for women's disproportionate disaster vulnerability, gender-disaggregated data collection, 40% female reporter target, disability-inclusive alert design, and CEDAW/IASC gender marker compliance.",
    tags: ["Gender", "Inclusion", "Women", "Disability", "CEDAW", "IASC Gender Marker"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "users", value: "40%", label: "Female Reporter Target" },
          { icon: "heart", value: "38%", label: "Women in WDC Staff (2024)" },
          { icon: "shield", value: "IASC 2b", label: "Gender Marker Rating" },
          { icon: "check", value: "12", label: "Languages Including Gender-Responsive Alerts" }
        ]
      },
      {
        type: "text",
        heading: "The Evidence: Why Gender-Responsive Early Warning Saves More Lives",
        content: "The evidence that women face disproportionate disaster mortality is robust and consistent. The 2004 Indian Ocean Tsunami killed 70% women in some coastal communities — because women were responsible for children and elderly, were less likely to have received swimming instruction, and were less frequently included in disaster preparedness communication. The 2023 Libya floods killed women at a rate 40% higher than men in affected communities.\n\nThe mechanism is not biological — it is structural. Women in many disaster-affected contexts: receive less information (lower mobile phone ownership, lower literacy, exclusion from community meetings); have less decision-making authority to initiate evacuation (requiring male permission in some cultural contexts); bear disproportionate care responsibility that slows evacuation; are targeted for gender-based violence in displacement contexts; have lower access to early warning infrastructure (radio, mobile alerts) due to digital gender gap.\n\nWDC's gender policy addresses each of these barriers directly: female community reporters (40% target — 32% achieved in 2024) who deliver alerts through female social networks; alert content that specifies gender-specific action items (where to take children, routes to shelters with separate female sections); disability-inclusive alert design (audio alerts for the visually impaired, simplified language versions for all alerts, pictogram versions for low-literacy contexts); male-engagement programming that frames early warning and evacuation as household leadership."
      },
      {
        type: "bar-chart",
        title: "WDC Gender Inclusion Metrics 2024",
        items: [
          { label: "Female community reporters (target: 40%)", value: 80, max: 100, color: "blue", note: "32% achieved — improving from 18% in 2023" },
          { label: "Women in WDC staff (target: 40%)", value: 95, max: 100, color: "green", note: "38% — target nearly met" },
          { label: "Alerts with gender-specific content", value: 100, max: 100, color: "green", note: "100% of alerts include gender-specific action guidance" },
          { label: "Disability-accessible alert versions", value: 75, max: 100, color: "amber", note: "Audio and pictogram versions in 9 of 12 languages" }
        ]
      },
      {
        type: "quote",
        text: "An early warning system that does not reach women is not a warning system — it is a system for warning men. Closing that gap requires deliberate design at every level: who collects the data, who receives the alert, what the alert says, and who has the authority to act on it.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      }
    ]
  },

  // ─── COUNTRY SITUATION REPORTS ──────────────────────────────────────────────
  {
    id: "country-kenya-2024",
    category: "Country Reports",
    title: "Kenya Country Situation Report 2024",
    subtitle: "Drought, Flash Floods & Urban Flooding — Nairobi & Rift Valley Monitoring",
    date: "September 2024",
    year: 2024,
    pages: 20,
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80",
    description: "Kenya 2024: the long rains season caused catastrophic flooding (300+ deaths), Nairobi's informal settlements faced unprecedented urban flood risk, and WDC's Michael deployment reached 2.1 million Kenyans with 88% prediction accuracy — in partnership with KMD and the National Disaster Operations Centre.",
    tags: ["Kenya", "Flood", "Nairobi", "Rift Valley", "KMD", "NDOC", "Long Rains"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "globe", value: "2.1M", label: "People in Michael Coverage" },
          { icon: "target", value: "88%", label: "Flood Prediction Accuracy" },
          { icon: "users", value: "62", label: "Community Reporters Active" },
          { icon: "alert", value: "300+", label: "2024 Flood Deaths (National)" }
        ]
      },
      {
        type: "map",
        src: OSM("33.9%2C-4.7%2C41.9%2C5.0", "-1.2921%2C36.8219"),
        height: 280,
        caption: "Kenya monitoring zones: Nairobi (urban flood), Rift Valley (drought and flash flood cycles), Coast Province (cyclone and storm surge), and the Mt. Elgon/Western Kenya watershed."
      },
      {
        type: "divider",
        title: "SECTION 1 — 2024 KENYA DISASTER CONTEXT"
      },
      {
        type: "text",
        heading: "Kenya 2024: Long Rains Catastrophe and Michael's Response",
        content: "Kenya's 2024 long rains season (March–June) was the wettest since 1981, driven by a positive Indian Ocean Dipole (IOD) and residual La Niña moisture. The national toll: 310 confirmed deaths, 165,000 displaced, 84,000 homes damaged or destroyed. The Rift Valley — particularly Baringo, West Pokot, and Laikipia counties — bore the highest concentration of casualties. Nairobi's informal settlements, particularly Mathare, Mukuru, and Kibera, experienced unprecedented urban flooding, with the Nairobi River overtopping its banks 11 times between March and May.\n\nWDC began monitoring Kenya in January 2024, deploying Michael's East Africa models (calibrated from the DRC and Burundi missions) and recruiting 62 community reporters across Nairobi and Rift Valley. Michael's partnership with KMD (Kenya Meteorological Department) formalized in February — WDC provides hyper-local flood impact modeling as a supplementary product to KMD's forecast output, through the NDOC (National Disaster Operations Centre) alert cascade.\n\n88% flood prediction accuracy across 44 validated events in 2024. Nairobi urban flood model accuracy: 84% at 6-hour lead time — the first time any early warning system has provided community-level flood forecasting for Nairobi's informal settlements. The impact: in Mathare, community reporters received Michael alerts via SMS 7.3 hours before the May 2 flood event and coordinated a community evacuation that moved 2,400 households to higher ground. Zero casualties in the alert zone. 47 deaths in the same area in a comparable 2023 event without warning."
      },
      {
        type: "bar-chart",
        title: "Kenya 2024 — Michael Accuracy by Zone",
        items: [
          { label: "Rift Valley Flash Flood (Baringo, W. Pokot)", value: 91, max: 100, color: "blue", note: "Best performance — dense ESA SAR coverage" },
          { label: "Nairobi Urban Flood (Mathare, Mukuru)", value: 84, max: 100, color: "blue", note: "First urban flood model deployment in Nairobi" },
          { label: "Coast Flash Flood (Kilifi, Kwale)", value: 87, max: 100, color: "blue" },
          { label: "North Kenya Drought Onset (Turkana)", value: 79, max: 100, color: "amber" }
        ]
      },
      {
        type: "quote",
        text: "In Mathare on May 2nd, 2024, 2,400 families moved before the flood arrived. That happened because a community reporter received a Michael alert on his phone at 11pm, went door to door, and people trusted him enough to move at midnight. The technology works because the community network works. You cannot separate the two.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "Kenya Partners",
        items: ["KMD (Kenya Meteorological Department)", "NDOC (National Disaster Operations Centre)", "OCHA Kenya", "Kenya Red Cross", "UNICEF Kenya", "World Vision Kenya", "Nairobi City County", "USGS", "ESA (Sentinel data)", "NASA SERVIR East Africa"]
      }
    ]
  },

  {
    id: "country-rwanda-2024",
    category: "Country Reports",
    title: "Rwanda Country Situation Report 2024",
    subtitle: "Landslide & Volcanic Risk Monitoring — Western Province & Virunga Volcanos",
    date: "June 2024",
    year: 2024,
    pages: 18,
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80",
    description: "Rwanda 2024: WDC's monitoring of landslide risk in Western Province (Rubavu, Rusizi) and cross-border Nyiragongo volcanic risk, in partnership with MIDIMAR — achieving 93% landslide accuracy and covering 1.4 million people.",
    tags: ["Rwanda", "Landslide", "Volcanic", "MIDIMAR", "Nyiragongo", "Virunga", "Western Province"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "mountain", value: "93%", label: "Landslide Prediction Accuracy" },
          { icon: "globe", value: "1.4M", label: "People in Coverage" },
          { icon: "users", value: "41", label: "Community Reporters" },
          { icon: "activity", value: "2", label: "Active Volcanoes Monitored" }
        ]
      },
      {
        type: "map",
        src: OSM("28.8%2C-2.9%2C30.9%2C-1.0", "-1.9441%2C30.0619"),
        height: 260,
        caption: "Rwanda monitoring zones: Western Province (Rubavu, Rusizi, Nyamasheke) for landslide and volcanic risk; Northern Province for Virunga cross-border monitoring."
      },
      {
        type: "text",
        heading: "Rwanda: Landslide Capital of Central Africa",
        content: "Rwanda's western highlands receive 1,200–1,800mm of annual rainfall on steep volcanic soils — the combination that makes landslides Rwanda's deadliest natural hazard. The May 2023 landslides in Rubavu and Rusizi killed 131 people. The 2018 Western Province landslides killed 200. Rwanda has more landslide-related deaths per capita than any country in Central Africa.\n\nWDC began Rwanda monitoring in 2024, building on the DRC and Burundi field experience in adjacent volcanic terrain. The partnership with MIDIMAR (Ministry of Disaster Management and Refugee Affairs) was established in March 2024. Michael's landslide module for Rwanda uses three primary inputs: Sentinel-1 SAR soil moisture measurements (slope saturation is the primary landslide trigger), CHIRPS rainfall accumulation (24-hour and 72-hour totals), and a slope instability index derived from SRTM topography combined with the geological mapping of volcanic soil depth across the Kivu highlands.\n\n93% accuracy across 28 validated landslide events in Rubavu and Rusizi districts. Cross-border coordination with the DRC mission: Nyiragongo volcano (straddling the Rwanda-DRC border) is jointly monitored by WDC's Rwanda and DRC teams — the first cross-border volcanic early warning coordination in the region."
      },
      {
        type: "quote",
        text: "Rwanda has world-class governance and a government that takes disaster risk seriously. But even world-class governance cannot prevent a landslide without 24-hour advance warning of soil saturation. Michael provides that warning. MIDIMAR provides the response. Together, it works.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "Rwanda Partners",
        items: ["MIDIMAR (Ministry of Disaster Management & Refugee Affairs)", "OCHA Rwanda", "Rwanda Meteorological Agency", "UNICEF Rwanda", "ESA (Sentinel-1/2)", "USGS Volcano Hazards Program", "CGVD (Goma Volcano Observatory, DRC)", "One UN Rwanda"]
      }
    ]
  },

  {
    id: "country-bangladesh-2024",
    category: "Country Reports",
    title: "Bangladesh Country Situation Report 2024",
    subtitle: "Cyclone & Monsoon Flood Monitoring — Cox's Bazar & Brahmaputra River Basin",
    date: "August 2024",
    year: 2024,
    pages: 22,
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80",
    description: "Bangladesh 2024: WDC covers 6.8 million people including 1 million Rohingya refugees in Cox's Bazar — achieving 91% cyclone accuracy during one of the most active Bay of Bengal seasons in a decade, in partnership with BDRCS and DDM.",
    tags: ["Bangladesh", "Cyclone", "Flood", "Cox's Bazar", "Rohingya", "BDRCS", "DDM"],
    signedBy: "Sapiens Ndatabaye",
    signedTitle: "Founder & Executive Director, World Disaster Center",
    sections: [
      {
        type: "stats",
        items: [
          { icon: "globe", value: "6.8M", label: "People in Coverage" },
          { icon: "wind", value: "91%", label: "Cyclone Accuracy" },
          { icon: "users", value: "94", label: "Community Reporters (incl. 31 Rohingya)" },
          { icon: "droplets", value: "89%", label: "Monsoon Flood Accuracy" }
        ]
      },
      {
        type: "map",
        src: OSM("88.0%2C20.7%2C92.7%2C26.6", "23.6850%2C90.3563"),
        height: 280,
        caption: "Bangladesh monitoring zones: Cox's Bazar (cyclone, Rohingya refugee population), Brahmaputra-Jamuna River basin (monsoon flood), Sylhet (flash flood), Coastal Belt (storm surge and cyclone landfall zones)."
      },
      {
        type: "divider",
        title: "SECTION 1 — CONTEXT"
      },
      {
        type: "text",
        heading: "Bangladesh: Scale, Complexity, and the Rohingya Dimension",
        content: "Bangladesh is, by the metrics that matter to WDC, among the world's most important early warning deployments: 170 million people, the world's seventh-most flood-prone country, a Bay of Bengal cyclone track that brings a major system every 2–3 years, a Brahmaputra-Jamuna river system that kills dozens and displaces hundreds of thousands annually, and — in Cox's Bazar — the world's largest refugee settlement, housing 1 million Rohingya who have zero access to Bangladesh's national early warning infrastructure.\n\nWDC's Bangladesh deployment prioritized the Rohingya population for a reason that goes beyond scale: the Rohingya are stateless in Bangladesh's legal framework, do not receive government early warning alerts, and live in bamboo and tarpaulin shelters on unstable hillsides in a cyclone landfall zone. Their early warning gap is total. WDC deployed 31 Rohingya community reporters — trained through UNHCR and IOM access channels — who now receive Michael alerts in Bengali and Rohingya script and relay them to an estimated 12,000 households per reporter.\n\n91% cyclone accuracy across 6 Bay of Bengal systems in 2024, including Cyclone Remal (May 2024, Category 3, Bangladesh landfall) — where WDC's 72-hour warning was used by BDRCS to pre-position response teams and by DDM to coordinate pre-emptive evacuation of 800,000 coastal residents. Post-event assessment: mortality in the Michael-coverage zone was 34% lower than in comparable coverage zones for 2023 Cyclone Mocha."
      },
      {
        type: "bar-chart",
        title: "Bangladesh 2024 — Accuracy by Hazard Type",
        items: [
          { label: "Bay of Bengal Cyclone (track & landfall)", value: 91, max: 100, color: "blue" },
          { label: "Brahmaputra-Jamuna Monsoon Flood", value: 89, max: 100, color: "blue" },
          { label: "Storm Surge (coastal belt)", value: 87, max: 100, color: "blue" },
          { label: "Flash Flood (Sylhet, CHT)", value: 85, max: 100, color: "blue" },
          { label: "Rohingya Camp Landslide (Cox's Bazar)", value: 82, max: 100, color: "amber", note: "Constrained by micro-terrain complexity at settlement scale" }
        ]
      },
      {
        type: "quote",
        text: "One million Rohingya people in Cox's Bazar receive zero early warning from the Bangladeshi government — they are invisible to the national system because they are stateless. Michael reaches them through 31 Rohingya reporters who trusted us enough to join the network. That trust was built slowly and carefully. We will not break it.",
        attribution: "Sapiens Ndatabaye — Founder & Executive Director, World Disaster Center"
      },
      {
        type: "partners",
        title: "Bangladesh Partners",
        items: ["BDRCS (Bangladesh Red Crescent Society)", "DDM (Department of Disaster Management)", "UNHCR Bangladesh", "IOM Bangladesh", "OCHA Bangladesh", "WFP Bangladesh", "BMD (Bangladesh Meteorological Department)", "BUET (Bangladesh University of Engineering & Technology)", "ESA (Sentinel data)", "NOAA (Bay of Bengal monitoring)"]
      }
    ]
  },

];

export const CATEGORIES = [
  "All",
  "Annual Reports",
  "Financial Reports",
  "Field Mission Reports",
  "Product Reports",
  "Thematic & Policy Reports",
  "Country Reports",
  "Research & Publications",
  "Community Programs",
];

export const getCategoryColor = (category) => {
  const map = {
    "Annual Reports":           "bg-blue-100 text-blue-800",
    "Financial Reports":        "bg-green-100 text-green-700",
    "Field Mission Reports":    "bg-orange-100 text-orange-700",
    "Product Reports":          "bg-purple-100 text-purple-700",
    "Thematic & Policy Reports":"bg-rose-100 text-rose-700",
    "Country Reports":          "bg-teal-100 text-teal-700",
    "Research & Publications":  "bg-indigo-100 text-indigo-800",
    "Community Programs":       "bg-pink-100 text-pink-800",
  };
  return map[category] || "bg-gray-100 text-gray-700";
};
