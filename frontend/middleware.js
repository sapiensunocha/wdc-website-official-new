/**
 * Vercel Edge Middleware — Social & Search Crawler OG Tag Injection
 *
 * WhatsApp, LinkedIn, Slack, Telegram, Discord, Facebook, Twitter, and Google
 * bots read only the raw HTML — they never execute JavaScript. Since this is a
 * Vite SPA every URL returns the same index.html, so every shared link shows
 * the same "United for Change / Michael software" placeholder.
 *
 * This middleware intercepts those bot requests, fetches the real index.html,
 * strips the stale static OG tags, and injects the correct title/description/
 * image for that specific URL before returning it to the crawler.
 *
 * Real browsers are not affected (they pass straight through, load the SPA as
 * normal, and Helmet renders dynamic per-page head tags for them).
 */

// ── Bot detection ──────────────────────────────────────────────────────────
const BOTS =
  /WhatsApp|LinkedInBot|facebookexternalhit|Twitterbot|Slackbot|TelegramBot|Googlebot|bingbot|Discordbot|Applebot|redditbot|ia_archiver|AhrefsBot|SemrushBot|DuckDuckBot|PinterestBot|Snapchat|iMessage|vkShare|W3C_Validator|360Spider|Baiduspider|GPTBot|OAI-SearchBot|ClaudeBot|anthropic-ai|PerplexityBot|cohere-ai|AI2Bot|Diffbot|YouBot|Bytespider|CCBot|meta-externalagent|FacebookBot|DataForSeoBot|PetalBot|MJ12bot/i;

// ── Constants ──────────────────────────────────────────────────────────────
const SITE    = 'https://www.worlddisastercenter.org';
const LOGO    = 'https://i.ibb.co/kJ63JTV/wdclogobg.png';

// Unsplash image at ideal OG dimensions (1200×630 — LinkedIn/Facebook/WhatsApp)
const OG = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&h=630&q=80`;

// ── Per-report OG metadata ─────────────────────────────────────────────────
const REPORTS = {
  /* ── Annual Reports ─────────────────────────────────────── */
  'annual-2024': {
    t: 'WDC Annual Report 2024 | World Disaster Center',
    d: 'WDC Annual Report 2024 — field missions, technology deployments, partnerships, and impact across 12 countries.',
    i: OG('1531482615713-2afd69097998'),
  },
  'annual-2023': {
    t: 'WDC Annual Report 2023 | World Disaster Center',
    d: "WDC's first official annual report — EAGLE launch, 8-country field deployments, and technology milestones.",
    i: OG('1469571486292-0ba58a3f068b'),
  },
  'annual-2022': {
    t: 'WDC Pre-Launch Technology Report 2022 | World Disaster Center',
    d: 'Core system architecture, data pipelines, and team formation in the year before WDC\'s official 2023 launch.',
    i: OG('1517048676732-d65bc937f952'),
  },
  'annual-2021': {
    t: 'WDC Founding Research 2021 | World Disaster Center',
    d: 'Pre-foundation research paper by Sapiens Ndatabaye (OCHA) — the case for AI-powered humanitarian warning systems.',
    i: OG('1504868584819-f8e8b4b6d7e3'),
  },
  /* ── Financial Reports ──────────────────────────────────── */
  'financial-2024': {
    t: 'WDC Financial Report 2024 | World Disaster Center',
    d: "Full transparency on WDC's 2024 budget, donor contributions, grant income, and operational expenditure.",
    i: OG('1460925895917-afdab827c52f'),
  },
  'financial-2023': {
    t: 'WDC Financial Report 2023 | World Disaster Center',
    d: 'WDC inaugural financial year — seed funding, grant income, technology investment, and budget overview.',
    i: OG('1611974789855-9c2a0a7236a3'),
  },
  'financial-2022': {
    t: 'WDC Pre-Launch Financial Summary 2022 | World Disaster Center',
    d: 'Development fund allocation and pre-launch spending summary ahead of WDC\'s official 2023 launch.',
    i: OG('1579621970563-ebec7560ff3e'),
  },
  /* ── Field Missions ─────────────────────────────────────── */
  'mission-drc-2023': {
    t: 'Field Mission Report: DR Congo 2023 | World Disaster Center',
    d: 'Disaster risk mapping, community vulnerability assessments, and EAGLE system deployment in eastern DRC.',
    i: OG('1593113616828-6f22bca04804'),
  },
  'mission-burundi-2023': {
    t: 'Field Mission Report: Burundi 2023 | World Disaster Center',
    d: 'Flood early warning assessment, IDP camp conditions, and displacement tracking — Burundi 2023.',
    i: OG('1578662996442-48f60103fc96'),
  },
  'mission-haiti-2024': {
    t: 'Field Mission Report: Haiti 2024 | World Disaster Center',
    d: 'Hurricane preparedness, gang-conflict displacement, and multi-hazard risk analysis — Haiti 2024.',
    i: OG('1566125882500-87e10f726cdc'),
  },
  'mission-sudan-2024': {
    t: 'Field Mission Report: Sudan 2024 | World Disaster Center',
    d: 'Conflict-driven displacement, humanitarian access corridors, and EAGLE monitoring in active conflict zones.',
    i: OG('1604497181015-76590d828b50'),
  },
  'mission-jamaica-2024': {
    t: 'Field Mission Report: Jamaica 2024 | World Disaster Center',
    d: 'Hurricane season preparedness, coastal risk mapping, and small-island vulnerability index — Jamaica 2024.',
    i: OG('1529390079861-591de354faf5'),
  },
  'mission-afghanistan-2024': {
    t: 'Field Mission Report: Afghanistan 2024 | World Disaster Center',
    d: 'Earthquake aftermath, IDP tracking, and cascading multi-hazard risk assessment — Afghanistan 2024.',
    i: OG('1446776811953-b23d57bd21aa'),
  },
  'mission-drc-2025': {
    t: 'Field Mission Report: DR Congo 2025 | World Disaster Center',
    d: 'Follow-up deployment, EAGLE system expansion, and displacement crisis monitoring in eastern DRC.',
    i: OG('1488521787991-ed7bbaae773c'),
  },
  'mission-burundi-2025': {
    t: 'Field Mission Report: Burundi 2025 | World Disaster Center',
    d: 'Expanded flood early warning network, community training, and inter-agency coordination — Burundi 2025.',
    i: OG('1469571486292-0ba58a3f068b'),
  },
  'mission-west-africa-2024': {
    t: 'Field Mission Report: West Africa 2024 | World Disaster Center',
    d: 'Multi-country climate risk, Sahel drought monitoring, and coastal erosion mapping — West Africa 2024.',
    i: OG('1529390079861-591de354faf5'),
  },
  /* ── Technology Reports ─────────────────────────────────── */
  'tech-michael-2024': {
    t: 'Michael AI System Technical Report 2024 | World Disaster Center',
    d: 'Michael AI Platform architecture, disaster prediction accuracy, satellite integration, and real-time alert capabilities.',
    i: OG('1518186285589-2f7649de83e0'),
  },
  'tech-eagle-2023': {
    t: 'EAGLE Early Warning Platform 2023 | World Disaster Center',
    d: 'EAGLE geospatial AI system — crisis heatmaps and community-level alert deployment across 8 African countries.',
    i: OG('1446776653964-20c1d3a81b06'),
  },
  'tech-accuracy-2024': {
    t: 'Predictive Accuracy Validation Report 2024 | World Disaster Center',
    d: 'Michael Platform 2024 accuracy validation — 89% precision across earthquake, flood, and conflict early warning.',
    i: OG('1551288049-bebda4e38f71'),
  },
  'tech-nostradamus-2024': {
    t: 'Nostradamus Predictive Engine 2024 | World Disaster Center',
    d: 'Long-range disaster forecasting using climate models, political stability indices, and conflict pattern data.',
    i: OG('1526778548025-fa2f459cd5c1'),
  },
  'tech-crisisatlas-2024': {
    t: 'Crisis Atlas Global Risk Index 2024 | World Disaster Center',
    d: 'Interactive disaster risk mapping across 190+ countries, 12 hazard types, and 48 vulnerability indicators.',
    i: OG('1581091226825-a6a2a5aee158'),
  },
  /* ── Thematic & Policy ──────────────────────────────────── */
  'thematic-ai-2024': {
    t: 'AI in Humanitarian Action 2024 | World Disaster Center',
    d: "WDC's framework for responsible AI deployment in crisis zones — ethics, applications, and governance.",
    i: OG('1558494949-ef010cbdcc31'),
  },
  'thematic-africa-ews-2024': {
    t: 'State of Early Warning Systems in Africa 2024 | World Disaster Center',
    d: 'Coverage gaps, funding deficits, and technology deployment recommendations across 54 African countries.',
    i: OG('1547471080-7cc2caa01a7e'),
  },
  'strategic-plan-2024': {
    t: 'WDC Strategic Plan 2024–2026 | World Disaster Center',
    d: 'Three-year roadmap for technology deployment, field mission expansion, and partnerships across 20 target countries.',
    i: OG('1542393545-10f5cde2c810'),
  },
  'policy-data-2024': {
    t: 'WDC Data Governance Policy 2024 | World Disaster Center',
    d: 'Humanitarian data governance — privacy protection, community consent, and responsible AI data framework.',
    i: OG('1454165804606-c3d57bc86b40'),
  },
  'policy-gender-2024': {
    t: 'WDC Gender & Inclusion Policy 2024 | World Disaster Center',
    d: 'Gender-responsive disaster risk reduction, women-led community resilience, and inclusive early warning design.',
    i: OG('1573496359142-b8d87734a5a2'),
  },
  /* ── Country Reports ────────────────────────────────────── */
  'country-kenya-2024': {
    t: 'Kenya Country Report 2024 | World Disaster Center',
    d: 'Drought risk, flood mapping, ASAL vulnerability index, and EAGLE deployment status across 8 Kenyan counties.',
    i: OG('1488521787991-ed7bbaae773c'),
  },
  'country-rwanda-2024': {
    t: 'Rwanda Country Report 2024 | World Disaster Center',
    d: 'Landslide risk mapping, urban flood vulnerability, and WDC–Rwanda Meteorology Agency technology partnership.',
    i: OG('1614850523296-d8c1af93d400'),
  },
  'country-bangladesh-2024': {
    t: 'Bangladesh Country Report 2024 | World Disaster Center',
    d: 'Cyclone preparedness, coastal flooding, delta vulnerability, and CLIMB pilot assessment — Bangladesh 2024.',
    i: OG('1582213782179-e0d53f98f2ca'),
  },
  /* ── Product Reports ────────────────────────────────────── */
  'project-argus-2024': {
    t: 'Argus Satellite Monitoring System 2024 | World Disaster Center',
    d: 'Real-time disaster detection from 6 satellite feeds across 4 sensor types — Argus system report 2024.',
    i: OG('1504868584819-f8e8b4b6d7e3'),
  },
  'project-lifeline-2024': {
    t: 'Lifeline Emergency Communication System 2024 | World Disaster Center',
    d: 'Offline-first mesh communication network for field teams in communications-degraded disaster zones.',
    i: OG('1526778548025-fa2f459cd5c1'),
  },
  'project-tectra-2024': {
    t: 'Tectra Humanitarian Data Platform 2024 | World Disaster Center',
    d: 'Unified data ingestion, cleaning, and distribution system for real-time humanitarian crisis information.',
    i: OG('1460925895917-afdab827c52f'),
  },
  'project-nova7-2024': {
    t: 'Nova7 Damage Assessment Engine 2024 | World Disaster Center',
    d: 'AI-driven post-disaster impact scoring, damage classification, and recovery progress tracking.',
    i: OG('1517048676732-d65bc937f952'),
  },
  'project-michael-mobile-2025': {
    t: 'Michael Mobile Application 2025 | World Disaster Center',
    d: 'Community-facing disaster alert app with offline capability and local language support — Michael Mobile 2025.',
    i: OG('1581091226825-a6a2a5aee158'),
  },
  'project-drone-iot-2025': {
    t: 'Drone & IoT Sensor Network 2025 | World Disaster Center',
    d: 'Aerial reconnaissance and ground-level sensor mesh for real-time disaster monitoring — WDC 2025.',
    i: OG('1446776653964-20c1d3a81b06'),
  },
  /* ── EAGLE Assessments ──────────────────────────────────── */
  'eagle-drc-assessment-2023': {
    t: 'EAGLE DRC Performance Assessment 2023 | World Disaster Center',
    d: 'EAGLE early warning system evaluation across 6 DRC provinces — alert accuracy, reach, and agency adoption.',
    i: OG('1518186285589-2f7649de83e0'),
  },
  'eagle-burundi-2023': {
    t: 'EAGLE Burundi Assessment 2023 | World Disaster Center',
    d: 'Alert accuracy, community reach, and agency adoption metrics for the EAGLE flood warning system in Burundi.',
    i: OG('1446776811953-b23d57bd21aa'),
  },
  'eagle-haiti-2024': {
    t: 'EAGLE Haiti Multi-Hazard Assessment 2024 | World Disaster Center',
    d: 'Multi-hazard alert integration: hurricane, earthquake, and conflict-displacement warning testing in Haiti.',
    i: OG('1566125882500-87e10f726cdc'),
  },
  /* ── Research & Publications ────────────────────────────── */
  'research-climb-2024': {
    t: 'CLIMB Platform Research Paper 2024 | World Disaster Center',
    d: 'Participatory data collection, local knowledge integration, and community-led impact measurement research.',
    i: OG('1611974789855-9c2a0a7236a3'),
  },
  'research-michael-paper-2025': {
    t: 'Michael AI Research Paper 2025 | World Disaster Center',
    d: '"Michael: An AI-Powered Humanitarian Warning System" — peer-reviewed paper on architecture and field validation.',
    i: OG('1542393545-10f5cde2c810'),
  },
  'research-founding-2023': {
    t: 'WDC Founding Research Paper 2023 | World Disaster Center',
    d: 'The founding paper published at WDC\'s 2023 launch: "The Case for AI-Powered Humanitarian Warning Systems."',
    i: OG('1531482615713-2afd69097998'),
  },
  'book-breaking-barriers-2024': {
    t: 'Breaking Barriers — WDC Book 2024 | World Disaster Center',
    d: '"Breaking Barriers: AI, Disasters, and the Future of Humanitarian Action" by Sapiens Ndatabaye.',
    i: OG('1543002588-bfa74002ed7e'),
  },
  /* ── Community Programs ─────────────────────────────────── */
  'program-academy-2024': {
    t: 'WDC Academy Report 2024 | World Disaster Center',
    d: 'Humanitarian technology training for 500+ professionals across 22 countries — WDC Academy 2024.',
    i: OG('1522202176988-66273c2fd55f'),
  },
  'program-be-reporter-2024': {
    t: 'Be a Reporter Program 2024 | World Disaster Center',
    d: 'Citizen journalism training for crisis reporting — 1,200 trained correspondents deployed globally.',
    i: OG('1593113616828-6f22bca04804'),
  },
  'program-expert-roster-2024': {
    t: 'WDC Expert Roster 2024 | World Disaster Center',
    d: '350 vetted humanitarian and disaster risk professionals available for rapid global deployment.',
    i: OG('1469571486292-0ba58a3f068b'),
  },
  'program-titan-taskforce-2024': {
    t: 'Titan Taskforce Report 2024 | World Disaster Center',
    d: 'Rapid-response volunteer network of 180 trained specialists across 15 countries — Titan Taskforce 2024.',
    i: OG('1604497181015-76590d828b50'),
  },
  'program-30day-challenge-2025': {
    t: '30-Day Disaster Risk Reduction Challenge 2025 | World Disaster Center',
    d: 'Global public engagement campaign with 45,000 participants across 60 countries — WDC 2025.',
    i: OG('1551288049-bebda4e38f71'),
  },
  'program-africa-gap-2024': {
    t: 'Africa Early Warning Gap Analysis 2024 | World Disaster Center',
    d: 'Coverage mapping across 54 countries — identifying 31 African countries with critical EWS gaps.',
    i: OG('1547471080-7cc2caa01a7e'),
  },
  'program-united-change-2025': {
    t: 'United for Change Initiative 2025 | World Disaster Center',
    d: 'Cross-sector coalition for disaster risk governance reform in 12 target countries — WDC 2025.',
    i: OG('1517048676732-d65bc937f952'),
  },
  'program-wdc-partnerships-2024': {
    t: 'WDC Global Partnerships Report 2024 | World Disaster Center',
    d: '28 active institutional partnerships across UN agencies, governments, and technology companies.',
    i: OG('1460925895917-afdab827c52f'),
  },
};

// ── Page-level OG metadata ─────────────────────────────────────────────────
const PAGES = {
  '/': {
    t: 'World Disaster Center — AI-Powered Disaster Risk Management',
    d: 'WDC uses AI to predict, monitor, and respond to disasters worldwide. The Michael platform. The EAGLE early warning system. United for Change.',
    i: LOGO,
  },
  '/about': {
    t: 'About WDC | World Disaster Center',
    d: 'World Disaster Center was founded in 2023 by Sapiens Ndatabaye. Transforming disaster risk management through AI, technology, and field action.',
    i: LOGO,
  },
  '/about/story': {
    t: "WDC's Story | World Disaster Center",
    d: "From OCHA field experience to founding WDC — Sapiens Ndatabaye's journey building the world's first AI-native humanitarian disaster center.",
    i: LOGO,
  },
  '/about/vision': {
    t: 'Our Vision | World Disaster Center',
    d: 'A world where no community is left unprepared. AI-powered early warning for every person, every community, before the next disaster strikes.',
    i: LOGO,
  },
  '/about/mission': {
    t: 'Our Mission | World Disaster Center',
    d: 'WDC deploys AI disaster monitoring, trains humanitarian professionals, and builds early warning networks in the most vulnerable communities.',
    i: LOGO,
  },
  '/about/partners': {
    t: 'WDC Partners | World Disaster Center',
    d: 'WDC partners with UN agencies, governments, universities, and technology companies to scale disaster risk management globally.',
    i: LOGO,
  },
  '/about/partner-with-us': {
    t: 'Partner with WDC | World Disaster Center',
    d: 'Join WDC as an institutional, technology, or funding partner — together we can reach every at-risk community.',
    i: LOGO,
  },
  '/solution': {
    t: 'What We Do | World Disaster Center',
    d: 'AI-powered disaster monitoring, field missions, training programs, and early warning technology for governments and humanitarian agencies.',
    i: LOGO,
  },
  '/global-products': {
    t: 'WDC Technology Products | World Disaster Center',
    d: 'Michael AI platform, EAGLE early warning system, CLIMB community tool, Argus satellite monitoring — WDC\'s full technology suite.',
    i: LOGO,
  },
  '/impact': {
    t: 'WDC Global Impact | World Disaster Center',
    d: 'WDC deployed across 15+ countries, trained 500+ professionals, and built early warning systems reaching over 2 million people at risk.',
    i: LOGO,
  },
  '/news': {
    t: 'WDC News | World Disaster Center',
    d: 'Latest from World Disaster Center — field deployments, technology launches, partnerships, and humanitarian updates.',
    i: LOGO,
  },
  '/events': {
    t: 'WDC Events | World Disaster Center',
    d: 'Upcoming and past WDC events — conferences, training sessions, webinars, and field mission briefings.',
    i: LOGO,
  },
  '/membership': {
    t: 'Become a WDC Member | World Disaster Center',
    d: 'Join WDC — support AI-powered disaster risk reduction and access our global expert network, reports, and training programs.',
    i: LOGO,
  },
  '/donate': {
    t: 'Donate to WDC | World Disaster Center',
    d: 'Every contribution funds early warning systems, field missions, and technology that protects vulnerable communities from disasters.',
    i: LOGO,
  },
  '/careers': {
    t: 'Careers at WDC | World Disaster Center',
    d: 'Join the World Disaster Center team — technology, field operations, research, and communications roles.',
    i: LOGO,
  },
  '/contact': {
    t: 'Contact WDC | World Disaster Center',
    d: 'Get in touch — partnerships, media, research collaboration, or general inquiries. office@worlddisastercenter.org',
    i: LOGO,
  },
  '/training': {
    t: 'WDC Academy — Humanitarian Technology Training | World Disaster Center',
    d: 'Professional training in humanitarian technology, disaster risk management, and AI-powered early warning systems.',
    i: LOGO,
  },
  '/services': {
    t: 'WDC Services | World Disaster Center',
    d: 'Disaster risk assessments, early warning system deployment, crisis analytics, and humanitarian AI consulting.',
    i: LOGO,
  },
  '/reports': {
    t: 'WDC Reports & Documents | World Disaster Center',
    d: '50 official WDC publications — annual reports, field missions, financial summaries, technology docs, and policy papers. Free to read.',
    i: LOGO,
  },
  '/projects': {
    t: 'WDC Projects | World Disaster Center',
    d: 'Active and completed WDC projects — from the EAGLE early warning system to the Michael AI platform and community programs.',
    i: LOGO,
  },
  '/projects/eagle': {
    t: 'Project EAGLE | World Disaster Center',
    d: 'EAGLE — Early Alert Geospatial Learning Engine. WDC\'s AI-powered early warning system deployed across Africa.',
    i: LOGO,
  },
  '/where-we-work/africa': {
    t: 'WDC in Africa | World Disaster Center',
    d: 'WDC operations in Africa — EAGLE deployments, field missions in DRC, Burundi, Kenya, Rwanda, and Sudan.',
    i: LOGO,
  },
  '/roster': {
    t: 'WDC Global Expert Roster | World Disaster Center',
    d: 'Apply to join the WDC network of vetted humanitarian and disaster risk professionals available for rapid deployment.',
    i: LOGO,
  },
  '/request-demo': {
    t: 'Request a Demo | World Disaster Center',
    d: 'See the Michael AI platform and EAGLE early warning system in action — request a live demo for your organization.',
    i: LOGO,
  },
};

// ── Route-to-metadata resolver ─────────────────────────────────────────────
function resolveMeta(pathname) {
  // Exact page match
  if (PAGES[pathname]) {
    return { ...PAGES[pathname], url: `${SITE}${pathname}` };
  }

  // /reports/:id
  const reportId = pathname.match(/^\/reports\/(.+)$/)?.[1];
  if (reportId) {
    const r = REPORTS[reportId];
    if (r) return { t: r.t, d: r.d, i: r.i, url: `${SITE}/reports/${reportId}` };
    return {
      t: 'WDC Report | World Disaster Center',
      d: 'Official publication by World Disaster Center — free to read and download.',
      i: LOGO,
      url: `${SITE}/reports/${reportId}`,
    };
  }

  // /news/:slug
  if (pathname.startsWith('/news/')) {
    return { t: 'WDC News | World Disaster Center', d: 'Latest news from World Disaster Center — disaster updates, technology launches, and field mission reports.', i: LOGO, url: `${SITE}${pathname}` };
  }

  // /events/:slug
  if (pathname.startsWith('/events/')) {
    return { t: 'WDC Event | World Disaster Center', d: 'World Disaster Center event — conferences, training sessions, webinars, and field mission briefings.', i: LOGO, url: `${SITE}${pathname}` };
  }

  // /global-products/:slug
  if (pathname.startsWith('/global-products/')) {
    return { t: 'WDC Product | World Disaster Center', d: "WDC's AI-powered disaster monitoring and early warning technology suite.", i: LOGO, url: `${SITE}${pathname}` };
  }

  // /cases/:slug
  if (pathname.startsWith('/cases/')) {
    return { t: 'WDC Case Study | World Disaster Center', d: 'Real-world impact story from World Disaster Center field operations and technology deployment.', i: LOGO, url: `${SITE}${pathname}` };
  }

  // /blog/:id
  if (pathname.startsWith('/blog/')) {
    return { t: 'WDC Blog | World Disaster Center', d: 'Insights, analysis, and field stories from World Disaster Center.', i: LOGO, url: `${SITE}${pathname}` };
  }

  // /roster subpages
  if (pathname.startsWith('/roster')) {
    return { t: 'WDC Expert Roster | World Disaster Center', d: 'Join the global network of WDC-vetted humanitarian and disaster risk professionals.', i: LOGO, url: `${SITE}${pathname}` };
  }

  // /profile subpages (don't index private profile pages)
  if (pathname.startsWith('/profile')) {
    return { t: 'WDC Member Profile | World Disaster Center', d: 'World Disaster Center member profile.', i: LOGO, url: `${SITE}${pathname}` };
  }

  // Default fallback
  return {
    t: 'World Disaster Center — Transforming Disasters Into Opportunities',
    d: 'AI-powered disaster risk management — monitoring, early warning, field missions, and humanitarian technology for a more resilient world.',
    i: LOGO,
    url: `${SITE}${pathname}`,
  };
}

// ── HTML escape helper ─────────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Inject OG tags into the base index.html ───────────────────────────────
function buildOgBlock({ t, d, i, url }) {
  return `
    <title>${esc(t)}</title>
    <meta name="description" content="${esc(d)}" />
    <link rel="canonical" href="${esc(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${esc(t)}" />
    <meta property="og:description" content="${esc(d)}" />
    <meta property="og:image" content="${esc(i)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:site_name" content="World Disaster Center" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(t)}" />
    <meta name="twitter:description" content="${esc(d)}" />
    <meta name="twitter:image" content="${esc(i)}" />`;
}

function injectOgTags(html, meta) {
  // Strip stale static tags so we don't duplicate
  const cleaned = html
    .replace(/<title>[^<]*<\/title>/gi, '')
    .replace(/<meta\s[^>]*name="description"[^>]*>/gi, '')
    .replace(/<link\s[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\s[^>]*property="og:[^"]*"[^>]*\/?>/gi, '')
    .replace(/<meta\s[^>]*name="twitter:[^"]*"[^>]*\/?>/gi, '');

  return cleaned.replace('<head>', `<head>${buildOgBlock(meta)}`);
}

// ── Middleware config — match all HTML routes, skip static assets ──────────
export const config = {
  matcher: [
    '/((?!_vercel|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|css|js|mjs|woff|woff2|ttf|eot|map|json|txt|xml|pdf|mp4|mp3|wav)).*)',
  ],
};

// ── Main middleware handler ────────────────────────────────────────────────
export default async function middleware(request) {
  // Skip if this is our own internal index.html fetch (prevents infinite loop)
  if (request.headers.get('x-og-internal') === '1') return;

  // Only process known bot/crawler user-agents
  const ua = request.headers.get('user-agent') || '';
  if (!BOTS.test(ua)) return;

  const url = new URL(request.url);
  const meta = resolveMeta(url.pathname);

  try {
    // Fetch the static index.html from our own origin.
    // The x-og-internal header prevents this fetch from triggering the
    // middleware again (the header check above bails out immediately).
    const res = await fetch(new URL('/index.html', url.origin), {
      headers: {
        'x-og-internal': '1',
        accept: 'text/html',
      },
    });

    if (!res.ok) return; // fall through to normal serving on error

    const html = injectOgTags(await res.text(), meta);

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        // Cache 1 hour at edge, serve stale for 24 h while revalidating
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'x-og-injected': '1',
      },
    });
  } catch {
    return; // Any network error → fall through to normal SPA serving
  }
}
