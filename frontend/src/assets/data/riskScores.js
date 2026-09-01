/**
 * WDC PROTECT — Campaign-Specific Risk Indices (Static Dataset)
 *
 * Each of the 11 campaigns has an INDEPENDENT index derived from
 * campaign-specific indicators. These are NOT generic INFORM scores.
 *
 * ─── INDEX METHODOLOGIES ────────────────────────────────────────────────────
 *
 * [0] PROTECT-WOMEN — Women's Protection Risk Index
 *   Drivers: Gender Inequality Index (UNDP), maternal mortality ratio (WHO),
 *   GBV/femicide prevalence (UNODC), women's legal rights (World Bank),
 *   conflict targeting women (ACLED), female labour exclusion.
 *   High = Afghanistan (GII 0.655, no legal rights, conflict), Niger, Chad, Somalia
 *
 * [1] PROTECT-CHILDREN — Child Vulnerability Risk Index
 *   Drivers: Under-5 mortality rate (UNICEF/WHO), child wasting & stunting
 *   (UNICEF), child marriage rates (UNICEF), child labour (ILO), out-of-school
 *   children (UNESCO), child recruitment in conflict (UN MRM).
 *   High = Niger (under-5 MR 213/1000), Chad 114, Sierra Leone 109, Mali 100
 *
 * [2] HOME-FOR-EVERYONE — Displacement & Housing Risk Index
 *   Drivers: UNHCR total displaced (refugees + IDPs) per population,
 *   housing destruction / infrastructure deficit, slum population %,
 *   displacement duration, forced eviction rates.
 *   High = Syria (6.6M refugees), Afghanistan (7.4M), South Sudan (2.3M + IDPs)
 *
 * [3] GIRLS-IN-TECH — Digital Gender Exclusion Risk Index
 *   Drivers: Female vs male internet access GAP (ITU), girls' secondary
 *   completion gap vs boys (UNESCO), female STEM enrolment gap, digital
 *   literacy gender disparity, legal barriers to women's economic participation.
 *   High = Niger (female literacy 11%), Afghanistan (internet gender gap 72%)
 *   Note: measures GENDER GAP, not absolute poverty — Rwanda scores medium
 *   despite low overall access because its gender gap is narrower.
 *
 * [4] CLIMATE-PROTECT — Climate Crisis Risk Index
 *   Drivers: ND-GAIN Climate Vulnerability Index, GDACS historical exposure
 *   (cyclone/flood/drought events 2000–2025), sea-level rise vulnerability
 *   (IPCC), climate displacement (IDMC), adaptation capacity deficit.
 *   High = Bangladesh (most vulnerable delta), Pacific SIDS (existential SLR),
 *   Sahel (drought + heat), Mozambique (cyclone corridor)
 *
 * [5] PROTECT-DISABILITIES — Disability Inclusion Risk Index
 *   Drivers: Universal Health Coverage index (WHO), conflict-caused disability
 *   rate, disability inclusion in DRR laws (UNDRR), poverty-disability
 *   intersection, access to rehabilitation, disability data availability.
 *   High = active conflict zones + lowest UHC scores
 *
 * [6] SAFE-COMMUNITIES — Community Safety Risk Index
 *   Drivers: ACLED conflict events per capita 2024, intentional homicide rate
 *   (UNODC), political stability index (World Bank), post-disaster crime,
 *   GBV in public spaces (UNDOC), presence of organised crime networks.
 *   High = active warzones + high-homicide Latin American countries
 *   Note: El Salvador/Jamaica/Honduras/Trinidad score HIGH for homicide;
 *   Syria/Yemen/DRC score HIGH for armed conflict — different root causes.
 *
 * [7] REPRODUCTIVE-HEALTH-SAFETY — Reproductive Health Risk Index
 *   Drivers: Maternal mortality ratio (WHO 2023), skilled birth attendance %
 *   (UNICEF), contraceptive prevalence (UNFPA), adolescent birth rate,
 *   obstetric fistula burden, unmet need for family planning.
 *   High = Chad (1140/100k MMR - world's highest), Sierra Leone (1033),
 *   Nigeria (1047), South Sudan (789), CAR (829), Somalia (829)
 *
 * [8] FOOD-SECURITY — Food Security Risk Index
 *   Drivers: IPC Phase 3+ acute food insecurity population (WFP/OCHA),
 *   Global Hunger Index score (IFPRI), drought frequency index, conflict-food
 *   nexus intensity (FAO), undernourishment prevalence (FAO SOFI).
 *   High = Somalia (IPC5 famine), Yemen, South Sudan (chronic crisis)
 *
 * [9] DIGITAL-SAFETY — Digital Safety Risk Index
 *   Drivers: Freedom House internet freedom score (inverted), government
 *   surveillance/censorship index, cybercrime governance quality (ITU),
 *   targeting of digital journalists/activists (CPJ/RSF), disinformation
 *   ecosystem in conflict, internet shutdown frequency (Netblocks/OONI).
 *   High = authoritarian internet control (China, North Korea, Russia, Iran)
 *   AND conflict zones where digital infrastructure is weaponised (Syria, Myanmar)
 *   NOTE: This is about SAFETY online, not access — measures governance & rights.
 *
 * [10] REFUGEE-DISPLACED-PROTECTION — Refugee & Displacement Protection Index
 *   Drivers: UNHCR refugee production (outflows) per capita, IDP numbers
 *   (IDMC), statelessness burden, asylum system quality (protection space),
 *   risk of refoulement, durable solutions access (voluntary return, local
 *   integration, resettlement).
 *   High = Afghanistan (7.4M refugees), Syria (6.6M), Venezuela (7.3M)
 *
 * ─── DATA SOURCES ────────────────────────────────────────────────────────────
 *   - UNDP Gender Inequality Index 2023
 *   - WHO Global Health Observatory 2023/2024
 *   - UNICEF State of the World's Children 2024
 *   - UNHCR Global Trends 2024
 *   - IDMC Global Report on Internal Displacement 2024
 *   - UNODC Global Study on Homicide 2023
 *   - WFP/OCHA IPC Global Acute Food Security 2024
 *   - ND-GAIN Country Index 2023
 *   - Freedom House Freedom on the Net 2024
 *   - ITU Digital Development Dashboard 2024
 *   - ACLED Conflict Index 2024
 *   - World Bank Poverty & Equity / UHC Data
 *   - UNDRR Sendai Framework Monitor 2024
 *   - WDC MICHAEL AI field intelligence
 */

// Campaign slug order — index 0–10
export const CAMPAIGN_SLUGS = [
  "protect-women",              // 0  W
  "protect-children",           // 1  Ch
  "home-for-everyone",          // 2  H
  "girls-in-tech",              // 3  GT
  "climate-protect",            // 4  Cl
  "protect-disabilities",       // 5  D
  "safe-communities",           // 6  SC
  "reproductive-health-safety", // 7  RH
  "food-security",              // 8  FS
  "digital-safety",             // 9  DS
  "refugee-displaced-protection", // 10 R
];

// scores index:   W   Ch   H   GT  Cl   D   SC  RH  FS  DS   R
//                 0    1   2    3   4    5   6    7   8   9   10

export const COUNTRY_RISK_SCORES = {
  // ── East / Horn of Africa ────────────────────────────────────────────────────
  // Women's high for GBV+legal exclusion; Children high for under-5 MR;
  // Climate varies (Somalia/ET=drought-high, Rwanda=lower); DS=internet freedom
  SO: { name:"Somalia",            scores:[10,10, 9,10, 9,10,10,10,10, 8,10] },
  SS: { name:"South Sudan",        scores:[10,10,10, 9, 8,10,10,10,10, 7,10] },
  ET: { name:"Ethiopia",           scores:[ 8, 8, 7, 8, 8, 8, 7, 8, 9, 8, 8] },
  ER: { name:"Eritrea",            scores:[ 8, 7, 7, 8, 5, 7, 6, 8, 7,10, 7] },
  DJ: { name:"Djibouti",           scores:[ 7, 6, 5, 7, 6, 6, 5, 7, 6, 6, 5] },
  KE: { name:"Kenya",              scores:[ 6, 6, 5, 5, 7, 6, 6, 6, 6, 5, 5] },
  UG: { name:"Uganda",             scores:[ 7, 7, 5, 6, 6, 7, 6, 7, 6, 6, 6] },
  TZ: { name:"Tanzania",           scores:[ 7, 7, 5, 6, 6, 7, 5, 7, 6, 5, 5] },
  RW: { name:"Rwanda",             scores:[ 5, 6, 4, 4, 5, 5, 4, 6, 5, 5, 5] },
  BI: { name:"Burundi",            scores:[ 8, 8, 7, 8, 6, 8, 7, 8, 8, 7, 7] },
  KM: { name:"Comoros",            scores:[ 6, 6, 4, 7, 6, 6, 5, 6, 5, 6, 4] },

  // ── Central Africa ───────────────────────────────────────────────────────────
  // DRC: displacement=10 (5.7M IDPs), SC=10 (warzone), RH=9 (MMR 473)
  // CAR: SC=10 (warzone), RH=10 (MMR 829), Cl=6 (landlocked, less hazard exposure)
  // Chad: RH=10 (MMR 1140 — world's highest), Children=10 (under-5 MR 114)
  CD: { name:"DR Congo",           scores:[ 9, 9,10, 9, 7,10,10, 9,10, 7,10] },
  CF: { name:"Cent. African Rep.", scores:[10, 9, 8, 9, 6,10,10,10,10, 7, 9] },
  TD: { name:"Chad",               scores:[ 9,10, 8, 9, 8, 9, 8,10, 9, 7, 9] },
  CM: { name:"Cameroon",           scores:[ 7, 8, 7, 7, 6, 8, 7, 9, 7, 6, 7] },
  CG: { name:"Congo",              scores:[ 6, 6, 5, 7, 5, 6, 5, 7, 6, 6, 5] },
  GA: { name:"Gabon",              scores:[ 5, 5, 3, 5, 4, 5, 4, 5, 4, 5, 3] },
  GQ: { name:"Equatorial Guinea",  scores:[ 6, 5, 3, 7, 4, 5, 5, 6, 4, 7, 3] },
  ST: { name:"São Tomé & Príncipe",scores:[ 4, 4, 3, 5, 5, 4, 3, 5, 4, 3, 3] },

  // ── West Africa ──────────────────────────────────────────────────────────────
  // Niger: Women=10 (GII 0.713 - world's worst), Children=10 (under-5 MR 213)
  // Nigeria: RH=10 (1047/100k MMR — 1 in 100 lifetime risk of maternal death)
  // Sierra Leone: RH=10 (1033/100k MMR), Children=10 (109/1000 under-5 MR)
  // SC: Burkina Faso/Mali/Niger=9 (active jihadist insurgency)
  ML: { name:"Mali",               scores:[ 9, 9, 8, 9, 8, 9, 9, 9, 9, 7, 8] },
  NE: { name:"Niger",              scores:[10,10, 8,10, 9, 9, 8, 9,10, 7, 8] },
  BF: { name:"Burkina Faso",       scores:[ 8, 9, 8, 8, 8, 9, 9, 8, 9, 7, 8] },
  NG: { name:"Nigeria",            scores:[ 8, 9, 7, 7, 7, 8, 8,10, 9, 6, 7] },
  GW: { name:"Guinea-Bissau",      scores:[ 9, 9, 6, 9, 7, 8, 7, 8, 8, 7, 7] },
  SL: { name:"Sierra Leone",       scores:[ 8,10, 6, 8, 7, 8, 6,10, 8, 6, 6] },
  LR: { name:"Liberia",            scores:[ 8, 8, 6, 8, 6, 8, 6, 8, 7, 6, 6] },
  GN: { name:"Guinea",             scores:[ 9, 9, 6, 9, 7, 8, 7, 9, 7, 7, 7] },
  GM: { name:"Gambia",             scores:[ 7, 8, 5, 7, 6, 7, 5, 7, 6, 6, 5] },
  MR: { name:"Mauritania",         scores:[ 8, 7, 6, 8, 7, 8, 6, 8, 7, 7, 6] },
  SN: { name:"Senegal",            scores:[ 6, 6, 5, 7, 6, 6, 5, 6, 5, 5, 5] },
  TG: { name:"Togo",               scores:[ 6, 7, 5, 7, 6, 6, 5, 7, 6, 6, 5] },
  BJ: { name:"Benin",              scores:[ 7, 8, 5, 7, 6, 7, 6, 8, 6, 6, 5] },
  CI: { name:"Côte d'Ivoire",      scores:[ 6, 7, 5, 7, 6, 6, 6, 7, 6, 5, 6] },
  GH: { name:"Ghana",              scores:[ 5, 5, 4, 6, 6, 5, 5, 5, 5, 5, 4] },
  CV: { name:"Cape Verde",         scores:[ 4, 4, 3, 5, 6, 4, 3, 4, 4, 3, 3] },

  // ── Southern Africa ──────────────────────────────────────────────────────────
  // Mozambique: Cl=9 (cyclone corridor, Idai/Kenneth/Freddy), SC=6, W=7
  // ZA: SC=8 (homicide rate 45/100k — among world's highest), W=7 (GBV crisis)
  // ZW: DS=7 (government internet shutdowns during elections)
  MZ: { name:"Mozambique",         scores:[ 7, 7, 6, 7, 9, 7, 6, 7, 7, 5, 6] },
  MG: { name:"Madagascar",         scores:[ 7, 7, 5, 7, 8, 7, 5, 7, 8, 5, 4] },
  ZW: { name:"Zimbabwe",           scores:[ 7, 7, 6, 6, 7, 7, 5, 7, 7, 8, 6] },
  ZM: { name:"Zambia",             scores:[ 6, 7, 5, 6, 6, 6, 5, 7, 6, 5, 5] },
  MW: { name:"Malawi",             scores:[ 7, 8, 5, 7, 7, 7, 5, 8, 7, 5, 5] },
  AO: { name:"Angola",             scores:[ 7, 6, 5, 7, 6, 6, 5, 7, 6, 6, 5] },
  NA: { name:"Namibia",            scores:[ 5, 5, 4, 5, 5, 5, 4, 5, 4, 4, 4] },
  BW: { name:"Botswana",           scores:[ 4, 4, 3, 4, 5, 4, 4, 4, 4, 4, 3] },
  ZA: { name:"South Africa",       scores:[ 7, 5, 6, 4, 6, 5, 8, 5, 5, 5, 4] },
  LS: { name:"Lesotho",            scores:[ 7, 6, 5, 6, 6, 7, 5, 7, 6, 5, 4] },
  SZ: { name:"Eswatini",           scores:[ 6, 6, 5, 6, 5, 7, 5, 6, 5, 5, 3] },
  MU: { name:"Mauritius",          scores:[ 3, 3, 2, 3, 4, 3, 3, 3, 2, 3, 2] },
  SC: { name:"Seychelles",         scores:[ 3, 2, 2, 3, 4, 3, 3, 2, 2, 3, 2] },

  // ── North Africa ─────────────────────────────────────────────────────────────
  // Sudan: all elevated due to 2023 civil war; DS=8 (internet blackouts)
  // Libya: H=8 (displacement from civil conflict), SC=8 (militia violence)
  // Egypt: DS=8 (internet censorship, activist targeting), W=6 (GBV but improving laws)
  SD: { name:"Sudan",              scores:[ 9, 8, 9, 8, 7, 9, 9, 8, 9, 8, 9] },
  EG: { name:"Egypt",              scores:[ 6, 5, 4, 6, 5, 5, 4, 5, 4, 8, 4] },
  LY: { name:"Libya",              scores:[ 8, 6, 8, 7, 4, 7, 8, 6, 6, 8, 8] },
  DZ: { name:"Algeria",            scores:[ 6, 4, 4, 5, 4, 5, 4, 4, 4, 7, 3] },
  TN: { name:"Tunisia",            scores:[ 5, 4, 3, 5, 4, 4, 3, 4, 3, 6, 3] },
  MA: { name:"Morocco",            scores:[ 5, 4, 4, 5, 5, 4, 3, 4, 4, 5, 4] },
  EH: { name:"Western Sahara",     scores:[ 7, 6, 7, 7, 4, 7, 6, 6, 6, 6, 7] },

  // ── Middle East ──────────────────────────────────────────────────────────────
  // Yemen: all 9-10 — ongoing conflict, MMR 385, 21M food insecure, 4.5M displaced
  // Syria: H=10 (6.6M refugees - world's largest refugee crisis), SC=10 (war)
  // Palestine/Gaza: SC=9, H=9 (displacement from IDF operations), FS=9
  // Iran: DS=9 (state surveillance, internet filtering, protests suppression)
  // Saudi Arabia: W=6 (guardianship system, despite 2019 reforms), DS=7 (censorship)
  // Gulf states: generally low except DS for surveillance and W for labour/kafala
  YE: { name:"Yemen",              scores:[ 9, 9, 9, 8, 7, 9,10, 9,10, 8, 9] },
  SY: { name:"Syria",              scores:[ 8, 8,10, 8, 5, 9,10, 8, 9, 9,10] },
  IQ: { name:"Iraq",               scores:[ 7, 7, 7, 7, 6, 7, 8, 7, 7, 7, 7] },
  PS: { name:"Palestine",          scores:[ 8, 8, 9, 6, 5, 8, 9, 8, 9, 7, 9] },
  LB: { name:"Lebanon",            scores:[ 6, 6, 7, 5, 5, 6, 6, 6, 8, 7, 8] },
  JO: { name:"Jordan",             scores:[ 5, 5, 4, 5, 4, 5, 4, 4, 4, 6, 5] },
  IL: { name:"Israel",             scores:[ 3, 2, 3, 2, 3, 2, 5, 2, 2, 4, 4] },
  SA: { name:"Saudi Arabia",       scores:[ 6, 3, 2, 4, 3, 3, 3, 2, 2, 7, 2] },
  AE: { name:"UAE",                scores:[ 4, 2, 1, 3, 3, 2, 2, 2, 1, 7, 2] },
  QA: { name:"Qatar",              scores:[ 4, 2, 1, 3, 3, 2, 2, 2, 1, 6, 2] },
  KW: { name:"Kuwait",             scores:[ 5, 2, 2, 3, 3, 2, 2, 2, 1, 6, 2] },
  BH: { name:"Bahrain",            scores:[ 5, 2, 2, 3, 3, 2, 3, 2, 1, 7, 2] },
  OM: { name:"Oman",               scores:[ 6, 3, 2, 4, 4, 3, 2, 2, 2, 6, 2] },
  IR: { name:"Iran",               scores:[ 7, 4, 5, 6, 5, 5, 6, 3, 5, 9, 5] },
  TR: { name:"Turkey",             scores:[ 5, 3, 3, 4, 5, 4, 5, 3, 3, 7, 6] },

  // ── South Asia ───────────────────────────────────────────────────────────────
  // Afghanistan: W=10 (Taliban banned girls from education, closed women's ministries)
  //              GT=10 (largest female internet access gap globally at 72%)
  //              R=10 (7.4M refugees — largest per capita refugee production)
  // Pakistan: W=8 (honour killings, limited legal protection), Cl=8 (GLOF risk)
  // Bangladesh: Cl=10 (most climate-vulnerable delta globally — ND-GAIN rank 12)
  // Maldives: Cl=10 (SLR existential threat — 80% land below 1m)
  AF: { name:"Afghanistan",        scores:[10, 9, 9,10, 8, 9, 9,10,10, 8,10] },
  PK: { name:"Pakistan",           scores:[ 8, 7, 7, 8, 8, 7, 7, 7, 7, 7, 7] },
  IN: { name:"India",              scores:[ 6, 6, 5, 5, 7, 5, 5, 5, 5, 6, 5] },
  BD: { name:"Bangladesh",         scores:[ 7, 7, 6, 7,10, 6, 5, 6, 6, 7, 5] },
  NP: { name:"Nepal",              scores:[ 6, 6, 5, 6, 7, 6, 4, 6, 5, 5, 5] },
  BT: { name:"Bhutan",             scores:[ 4, 4, 3, 4, 6, 4, 2, 4, 4, 5, 3] },
  LK: { name:"Sri Lanka",          scores:[ 4, 4, 4, 4, 6, 5, 4, 4, 4, 5, 4] },
  MV: { name:"Maldives",           scores:[ 5, 3, 3, 4,10, 3, 3, 3, 4, 5, 3] },

  // ── Southeast Asia ───────────────────────────────────────────────────────────
  // Myanmar: H=9 (1.1M+ Rohingya refugees + 2M IDPs), SC=9 (military coup + war),
  //          DS=9 (internet shutdowns, military surveillance), R=9
  // Philippines: Cl=9 (most cyclone-affected country globally), SC=6 (drug war)
  // Vietnam: Cl=8 (Mekong delta + SLR), DS=6 (Party control of internet)
  // Thailand: DS=5 (lèse-majesté web censorship)
  // Malaysia/Singapore: low across most indices, DS=4-5 for some censorship
  MM: { name:"Myanmar",            scores:[ 8, 8, 9, 8, 8, 8, 9, 8, 7, 9, 9] },
  TH: { name:"Thailand",           scores:[ 4, 3, 3, 3, 6, 4, 4, 3, 3, 6, 4] },
  KH: { name:"Cambodia",           scores:[ 5, 6, 4, 6, 7, 6, 4, 5, 5, 7, 4] },
  LA: { name:"Laos",               scores:[ 6, 6, 4, 6, 7, 6, 3, 6, 5, 7, 3] },
  VN: { name:"Vietnam",            scores:[ 4, 4, 3, 4, 8, 5, 3, 4, 4, 7, 3] },
  PH: { name:"Philippines",        scores:[ 6, 5, 5, 3, 9, 5, 6, 5, 5, 5, 4] },
  ID: { name:"Indonesia",          scores:[ 5, 5, 4, 4, 7, 5, 4, 5, 5, 5, 4] },
  MY: { name:"Malaysia",           scores:[ 4, 3, 2, 3, 5, 3, 3, 3, 2, 5, 4] },
  SG: { name:"Singapore",          scores:[ 2, 1, 1, 1, 3, 2, 1, 1, 1, 3, 1] },
  BN: { name:"Brunei",             scores:[ 4, 2, 1, 3, 4, 2, 2, 2, 1, 5, 1] },
  TL: { name:"Timor-Leste",        scores:[ 7, 7, 5, 7, 7, 7, 5, 7, 6, 6, 4] },

  // ── East Asia ────────────────────────────────────────────────────────────────
  // China: DS=10 (Great Firewall, mass surveillance, social credit — highest score)
  // North Korea: FS=8 (recurring food shortages, famine risk), DS=10 (no public internet),
  //              W=8 (state-controlled but labour exploitation, trafficking)
  // Japan/Korea/Taiwan: among lowest vulnerability globally
  CN: { name:"China",              scores:[ 4, 3, 3, 3, 5, 4, 3, 2, 3,10, 3] },
  JP: { name:"Japan",              scores:[ 2, 1, 1, 1, 4, 1, 1, 1, 1, 2, 1] },
  KR: { name:"South Korea",        scores:[ 3, 1, 2, 2, 3, 2, 1, 1, 1, 3, 1] },
  KP: { name:"North Korea",        scores:[ 8, 7, 6, 8, 4, 7, 7, 7, 8,10, 5] },
  MN: { name:"Mongolia",           scores:[ 5, 4, 4, 4, 6, 4, 3, 4, 4, 5, 2] },
  TW: { name:"Taiwan",             scores:[ 2, 1, 1, 1, 4, 1, 1, 1, 1, 3, 1] },
  HK: { name:"Hong Kong",          scores:[ 2, 1, 2, 1, 3, 1, 1, 1, 1, 6, 1] },
  MO: { name:"Macau",              scores:[ 2, 1, 2, 1, 3, 1, 1, 1, 1, 4, 1] },

  // ── Central Asia ─────────────────────────────────────────────────────────────
  // Uzbekistan/Tajikistan: W elevated for FGM rates, honour violence, labour migration
  // Turkmenistan: DS=9 (one of world's most closed internet environments)
  // All have moderate climate exposure (water stress, glacial retreat)
  KZ: { name:"Kazakhstan",         scores:[ 4, 3, 2, 3, 5, 4, 3, 3, 3, 6, 2] },
  UZ: { name:"Uzbekistan",         scores:[ 6, 4, 3, 5, 6, 5, 4, 4, 4, 8, 3] },
  KG: { name:"Kyrgyzstan",         scores:[ 6, 5, 4, 5, 6, 5, 5, 5, 5, 7, 3] },
  TJ: { name:"Tajikistan",         scores:[ 7, 5, 4, 6, 6, 5, 5, 5, 6, 7, 3] },
  TM: { name:"Turkmenistan",       scores:[ 6, 4, 3, 6, 5, 4, 4, 3, 4, 9, 2] },

  // ── Europe — Conflict / Post-Conflict ─────────────────────────────────────────
  // Ukraine: H=8 (8M+ displaced), SC=8 (active war), D=7 (war-caused disabilities)
  // Russia: DS=9 (state media, blocking, activist persecution post-2022)
  // Belarus: DS=9 (Lukashenko's internet crackdowns), SC=5 (authoritarian violence)
  // Turkey already in Middle East section above
  RU: { name:"Russia",             scores:[ 4, 2, 2, 2, 4, 3, 4, 2, 2, 9, 3] },
  UA: { name:"Ukraine",            scores:[ 5, 4, 8, 2, 4, 7, 8, 3, 5, 6, 8] },
  BY: { name:"Belarus",            scores:[ 4, 2, 2, 2, 3, 3, 4, 2, 2, 9, 2] },
  MD: { name:"Moldova",            scores:[ 5, 3, 3, 2, 4, 4, 3, 3, 3, 5, 4] },
  GE: { name:"Georgia",            scores:[ 4, 3, 3, 2, 5, 3, 3, 3, 3, 5, 3] },
  AM: { name:"Armenia",            scores:[ 4, 3, 3, 3, 5, 3, 4, 2, 3, 5, 4] },
  AZ: { name:"Azerbaijan",         scores:[ 5, 3, 3, 4, 5, 4, 4, 3, 3, 7, 3] },
  AL: { name:"Albania",            scores:[ 4, 3, 3, 3, 4, 3, 3, 3, 3, 4, 3] },
  ME: { name:"Montenegro",         scores:[ 3, 2, 2, 2, 4, 3, 3, 2, 2, 3, 3] },
  RS: { name:"Serbia",             scores:[ 3, 2, 2, 2, 4, 3, 3, 2, 2, 4, 3] },
  XK: { name:"Kosovo",             scores:[ 4, 3, 3, 3, 4, 3, 4, 3, 3, 4, 4] },
  BA: { name:"Bosnia",             scores:[ 4, 3, 3, 3, 4, 3, 3, 3, 3, 4, 4] },
  MK: { name:"North Macedonia",    scores:[ 4, 3, 3, 3, 4, 3, 3, 3, 3, 4, 3] },
  BG: { name:"Bulgaria",           scores:[ 3, 2, 2, 2, 3, 2, 3, 2, 2, 3, 3] },
  RO: { name:"Romania",            scores:[ 3, 3, 2, 2, 3, 2, 2, 2, 2, 3, 3] },
  HR: { name:"Croatia",            scores:[ 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2] },
  HU: { name:"Hungary",            scores:[ 2, 2, 2, 2, 3, 2, 2, 2, 2, 4, 2] },
  SK: { name:"Slovakia",           scores:[ 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2] },
  CZ: { name:"Czechia",            scores:[ 2, 1, 2, 1, 2, 2, 2, 1, 1, 2, 2] },
  PL: { name:"Poland",             scores:[ 2, 2, 2, 1, 3, 2, 2, 2, 2, 3, 3] },
  EE: { name:"Estonia",            scores:[ 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2] },
  LV: { name:"Latvia",             scores:[ 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2] },
  LT: { name:"Lithuania",          scores:[ 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2] },
  SI: { name:"Slovenia",           scores:[ 2, 1, 1, 1, 3, 2, 1, 1, 1, 2, 2] },
  AT: { name:"Austria",            scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2] },
  CH: { name:"Switzerland",        scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2] },
  DE: { name:"Germany",            scores:[ 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2] },
  FR: { name:"France",             scores:[ 2, 1, 2, 1, 3, 1, 2, 1, 1, 2, 2] },
  GB: { name:"United Kingdom",     scores:[ 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2] },
  IE: { name:"Ireland",            scores:[ 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2] },
  NL: { name:"Netherlands",        scores:[ 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 2] },
  BE: { name:"Belgium",            scores:[ 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2] },
  LU: { name:"Luxembourg",         scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1] },
  ES: { name:"Spain",              scores:[ 2, 1, 2, 1, 4, 1, 1, 1, 1, 2, 2] },
  PT: { name:"Portugal",           scores:[ 2, 1, 2, 1, 4, 1, 1, 1, 1, 2, 2] },
  IT: { name:"Italy",              scores:[ 2, 1, 2, 2, 4, 1, 2, 1, 1, 2, 2] },
  GR: { name:"Greece",             scores:[ 2, 2, 2, 2, 4, 2, 2, 1, 2, 2, 4] },
  CY: { name:"Cyprus",             scores:[ 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 4] },
  MT: { name:"Malta",              scores:[ 2, 1, 2, 1, 4, 1, 2, 1, 1, 2, 3] },
  SE: { name:"Sweden",             scores:[ 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2] },
  NO: { name:"Norway",             scores:[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2] },
  DK: { name:"Denmark",            scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2] },
  FI: { name:"Finland",            scores:[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2] },
  IS: { name:"Iceland",            scores:[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  LI: { name:"Liechtenstein",      scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1] },
  SM: { name:"San Marino",         scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1] },
  MC: { name:"Monaco",             scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1] },
  AD: { name:"Andorra",            scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1] },
  VA: { name:"Vatican City",       scores:[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

  // ── Americas — North ─────────────────────────────────────────────────────────
  // US: SC=4 (gun violence, mass shootings), W=3 (reproductive rights restrictions)
  // Mexico: SC=8 (cartel violence, 38k+ homicides/yr), W=7 (femicide crisis)
  US: { name:"United States",      scores:[ 3, 2, 2, 1, 3, 2, 4, 3, 2, 3, 2] },
  CA: { name:"Canada",             scores:[ 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 2] },
  MX: { name:"Mexico",             scores:[ 7, 4, 4, 4, 6, 4, 8, 4, 4, 6, 5] },

  // ── Americas — Central ───────────────────────────────────────────────────────
  // Honduras/El Salvador/Guatemala: SC=8-9 (among world's highest homicide rates)
  // Nicaragua: DS=8 (Ortega government internet surveillance and censorship)
  GT: { name:"Guatemala",          scores:[ 7, 7, 5, 6, 7, 6, 8, 6, 6, 5, 6] },
  BZ: { name:"Belize",             scores:[ 5, 4, 3, 4, 6, 4, 6, 4, 4, 4, 3] },
  HN: { name:"Honduras",           scores:[ 7, 6, 5, 5, 7, 6, 9, 6, 5, 6, 6] },
  SV: { name:"El Salvador",        scores:[ 7, 5, 4, 5, 7, 5, 9, 5, 5, 5, 5] },
  NI: { name:"Nicaragua",          scores:[ 6, 6, 5, 5, 7, 5, 7, 5, 5, 8, 5] },
  CR: { name:"Costa Rica",         scores:[ 3, 2, 2, 2, 4, 2, 3, 2, 2, 3, 2] },
  PA: { name:"Panama",             scores:[ 4, 3, 3, 3, 5, 3, 4, 3, 3, 4, 3] },

  // ── Caribbean ────────────────────────────────────────────────────────────────
  // Haiti: all elevated — 8M in acute food crisis, SC=9 (gang control of Port-au-Prince)
  // Jamaica: SC=9 (homicide rate 50+/100k), low for most other indices
  // Cuba: FS=6 (food shortages), DS=9 (state internet control), H=4 (housing access)
  // Trinidad: SC=7 (gang violence, organised crime)
  HT: { name:"Haiti",              scores:[ 8, 8, 8, 8, 7, 8, 9, 8, 9, 6, 7] },
  CU: { name:"Cuba",               scores:[ 5, 3, 4, 4, 5, 3, 4, 2, 6, 9, 3] },
  DO: { name:"Dominican Republic", scores:[ 6, 4, 4, 4, 6, 4, 5, 4, 4, 5, 4] },
  JM: { name:"Jamaica",            scores:[ 5, 4, 4, 4, 6, 4, 9, 4, 4, 5, 3] },
  TT: { name:"Trinidad & Tobago",  scores:[ 5, 3, 3, 3, 5, 3, 7, 3, 3, 4, 3] },
  BS: { name:"Bahamas",            scores:[ 3, 2, 3, 3, 7, 2, 4, 2, 2, 3, 2] },
  LC: { name:"Saint Lucia",        scores:[ 4, 3, 3, 3, 6, 3, 4, 3, 3, 3, 2] },
  VC: { name:"St. Vincent",        scores:[ 4, 3, 3, 3, 7, 3, 4, 3, 3, 3, 2] },
  GD: { name:"Grenada",            scores:[ 4, 3, 3, 3, 6, 3, 4, 3, 3, 3, 2] },
  BB: { name:"Barbados",           scores:[ 3, 2, 2, 2, 5, 2, 3, 2, 2, 3, 2] },
  DM: { name:"Dominica",           scores:[ 4, 3, 3, 3, 7, 3, 3, 3, 3, 3, 2] },
  AG: { name:"Antigua & Barbuda",  scores:[ 3, 2, 2, 2, 5, 2, 3, 2, 2, 3, 2] },
  KN: { name:"St. Kitts & Nevis",  scores:[ 3, 2, 2, 2, 5, 2, 3, 2, 2, 3, 2] },

  // ── South America ────────────────────────────────────────────────────────────
  // Venezuela: R=9 (7.3M diaspora — largest displacement in Western Hemisphere),
  //            FS=8 (economic collapse + food shortages), DS=8 (Maduro digital repression)
  // Colombia: H=6 (7.7M IDPs — largest IDP crisis in Americas), SC=7 (FARC remnants + urban)
  // Brazil: SC=8 (50k+ homicides/yr, favela violence), W=6 (femicide), Cl=7 (Amazon flooding)
  // Chile/Uruguay: among most stable in region
  VE: { name:"Venezuela",          scores:[ 6, 6, 7, 5, 5, 6, 8, 5, 8, 8, 9] },
  CO: { name:"Colombia",           scores:[ 6, 5, 6, 4, 6, 5, 7, 5, 5, 5, 7] },
  EC: { name:"Ecuador",            scores:[ 5, 4, 3, 4, 6, 4, 7, 4, 4, 5, 4] },
  PE: { name:"Peru",               scores:[ 6, 4, 4, 5, 7, 4, 5, 5, 4, 5, 4] },
  BO: { name:"Bolivia",            scores:[ 7, 6, 5, 6, 7, 5, 5, 6, 5, 4, 4] },
  PY: { name:"Paraguay",           scores:[ 6, 5, 4, 5, 5, 5, 5, 5, 4, 4, 3] },
  AR: { name:"Argentina",          scores:[ 4, 3, 3, 2, 4, 3, 4, 3, 3, 4, 3] },
  CL: { name:"Chile",              scores:[ 3, 2, 2, 2, 4, 2, 4, 2, 2, 3, 3] },
  UY: { name:"Uruguay",            scores:[ 2, 2, 2, 2, 4, 2, 3, 2, 2, 3, 2] },
  BR: { name:"Brazil",             scores:[ 6, 5, 5, 3, 7, 4, 8, 4, 4, 5, 4] },
  GY: { name:"Guyana",             scores:[ 5, 4, 3, 4, 5, 4, 5, 4, 4, 4, 3] },
  SR: { name:"Suriname",           scores:[ 5, 4, 3, 4, 5, 4, 4, 4, 4, 4, 3] },

  // ── Australia & New Zealand ───────────────────────────────────────────────────
  // AU: Cl=4 (extreme fire/drought/flood exposure — but very high adaptation capacity)
  //     H=2 (severe housing affordability crisis in cities, no displacement)
  // NZ: Cl=3 (earthquake/volcanic risk, flood exposure, high adaptation)
  AU: { name:"Australia",          scores:[ 1, 1, 2, 1, 4, 1, 2, 1, 1, 2, 2] },
  NZ: { name:"New Zealand",        scores:[ 1, 1, 2, 1, 3, 1, 2, 1, 1, 1, 1] },

  // ── Pacific Islands ───────────────────────────────────────────────────────────
  // Pacific SIDS: Cl=8-10 (SLR existential threat for Kiribati, Tuvalu, Marshall Is.)
  // PNG: W=9 (high GBV rates, sorcery accusations), Children=7, SC=7 (tribal conflict)
  // Philippines already in SE Asia above
  PG: { name:"Papua New Guinea",   scores:[ 9, 7, 5, 8, 7, 7, 7, 7, 6, 6, 4] },
  SB: { name:"Solomon Islands",    scores:[ 7, 6, 4, 7, 8, 6, 5, 6, 5, 5, 3] },
  VU: { name:"Vanuatu",            scores:[ 7, 6, 4, 7, 9, 6, 4, 6, 5, 5, 3] },
  FJ: { name:"Fiji",               scores:[ 6, 4, 3, 5, 8, 4, 4, 4, 4, 4, 3] },
  TO: { name:"Tonga",              scores:[ 5, 4, 3, 5, 8, 4, 3, 4, 4, 4, 2] },
  WS: { name:"Samoa",              scores:[ 5, 4, 3, 5, 8, 4, 3, 4, 4, 4, 2] },
  KI: { name:"Kiribati",           scores:[ 6, 5, 3, 6,10, 5, 3, 5, 5, 5, 4] },
  TV: { name:"Tuvalu",             scores:[ 4, 4, 3, 5,10, 4, 2, 4, 4, 4, 3] },
  NR: { name:"Nauru",              scores:[ 4, 4, 3, 4, 8, 4, 3, 4, 4, 4, 2] },
  PW: { name:"Palau",              scores:[ 3, 3, 2, 4, 6, 3, 2, 3, 3, 3, 2] },
  FM: { name:"Micronesia",         scores:[ 5, 5, 3, 5, 8, 5, 3, 5, 5, 5, 3] },
  MH: { name:"Marshall Islands",   scores:[ 5, 5, 3, 5,10, 5, 3, 5, 5, 5, 4] },

  // ── European & Pacific Territories ────────────────────────────────────────────
  GL: { name:"Greenland",          scores:[ 3, 3, 2, 2, 2, 2, 3, 2, 2, 2, 1] },
  FO: { name:"Faroe Islands",      scores:[ 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1] },
  SJ: { name:"Svalbard",           scores:[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  GI: { name:"Gibraltar",          scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1] },
  IM: { name:"Isle of Man",        scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1] },
  JE: { name:"Jersey",             scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1] },
  GG: { name:"Guernsey",           scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1] },
  AX: { name:"Åland Islands",      scores:[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },

  // ── French Overseas Territories ───────────────────────────────────────────────
  // Mayotte: elevated due to migration/statelessness + poverty
  RE: { name:"Réunion",            scores:[ 3, 2, 2, 2, 4, 2, 3, 2, 2, 2, 2] },
  YT: { name:"Mayotte",            scores:[ 6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5] },
  GP: { name:"Guadeloupe",         scores:[ 3, 2, 2, 2, 5, 2, 3, 2, 2, 3, 2] },
  MQ: { name:"Martinique",         scores:[ 3, 2, 2, 2, 5, 2, 3, 2, 2, 3, 2] },
  GF: { name:"French Guiana",      scores:[ 4, 3, 3, 3, 5, 3, 4, 3, 3, 3, 3] },
  PM: { name:"St. Pierre & Miq.",  scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1] },
  BL: { name:"St. Barthélemy",     scores:[ 2, 1, 1, 1, 4, 1, 2, 1, 1, 2, 1] },
  MF: { name:"St. Martin",         scores:[ 3, 2, 2, 2, 5, 2, 3, 2, 2, 2, 2] },
  TF: { name:"Fr. Southern Terr.", scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1] },

  // ── British Overseas Territories ──────────────────────────────────────────────
  SH: { name:"Saint Helena",       scores:[ 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 1] },
  FK: { name:"Falkland Islands",   scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1] },
  GS: { name:"South Georgia",      scores:[ 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1] },
  BM: { name:"Bermuda",            scores:[ 2, 1, 1, 1, 3, 1, 2, 1, 1, 2, 1] },

  // ── Pacific / Indian Ocean Territories ────────────────────────────────────────
  MO: { name:"Macau",              scores:[ 2, 1, 2, 1, 3, 1, 1, 1, 1, 4, 1] },
  CX: { name:"Christmas Island",   scores:[ 2, 1, 1, 2, 3, 1, 1, 1, 1, 2, 2] },
  CC: { name:"Cocos Islands",      scores:[ 2, 1, 1, 2, 3, 1, 1, 1, 1, 2, 1] },
  NF: { name:"Norfolk Island",     scores:[ 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1] },
  NC: { name:"New Caledonia",      scores:[ 2, 2, 2, 2, 5, 2, 2, 2, 2, 3, 2] },
  PF: { name:"French Polynesia",   scores:[ 2, 2, 2, 2, 5, 2, 2, 2, 2, 3, 2] },
  WF: { name:"Wallis & Futuna",    scores:[ 4, 4, 3, 4, 6, 4, 2, 4, 4, 4, 2] },
  AS: { name:"American Samoa",     scores:[ 3, 2, 2, 2, 5, 2, 2, 2, 2, 3, 2] },
  GU: { name:"Guam",               scores:[ 2, 2, 2, 2, 5, 2, 3, 2, 2, 2, 2] },
  PR: { name:"Puerto Rico",        scores:[ 4, 3, 3, 2, 5, 3, 4, 3, 3, 3, 2] },
  VI: { name:"US Virgin Islands",  scores:[ 3, 2, 3, 2, 5, 2, 3, 2, 2, 3, 2] },
  CK: { name:"Cook Islands",       scores:[ 3, 3, 2, 3, 6, 3, 2, 3, 3, 3, 2] },
  NU: { name:"Niue",               scores:[ 3, 3, 2, 3, 6, 3, 2, 3, 3, 3, 2] },

  // ── Other Territories & Small States ─────────────────────────────────────────
  AW: { name:"Aruba",              scores:[ 2, 2, 2, 2, 4, 2, 3, 2, 2, 3, 2] },
  CW: { name:"Curaçao",            scores:[ 3, 2, 2, 2, 4, 2, 3, 2, 2, 3, 2] },
  SX: { name:"Sint Maarten",       scores:[ 3, 2, 3, 2, 5, 2, 3, 2, 2, 3, 2] },
  TC: { name:"Turks & Caicos",     scores:[ 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2] },
  KY: { name:"Cayman Islands",     scores:[ 2, 1, 1, 1, 4, 1, 2, 1, 1, 2, 1] },
  VG: { name:"British Virgin Is.", scores:[ 2, 1, 2, 1, 5, 1, 2, 1, 1, 2, 1] },
  AI: { name:"Anguilla",           scores:[ 2, 1, 2, 1, 5, 1, 2, 1, 1, 2, 1] },
  MS: { name:"Montserrat",         scores:[ 3, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2] },
};

/**
 * Returns a { ISO2: score } map for a given campaign slug.
 * Used directly by CampaignWorldMap — no API calls required.
 */
export function getCampaignScores(slug) {
  const idx = CAMPAIGN_SLUGS.indexOf(slug);
  if (idx === -1) return {};
  const result = {};
  for (const [iso2, { scores }] of Object.entries(COUNTRY_RISK_SCORES)) {
    result[iso2] = scores[idx];
  }
  return result;
}

/** Metadata for the map label + source line per campaign */
export const CAMPAIGN_MAP_META = {
  "protect-women": {
    label: "Women's Protection Risk Index",
    src: "UNDP GII · WHO MMR · UNODC GBV · WB Women's Legal Rights · ACLED",
  },
  "protect-children": {
    label: "Child Vulnerability Risk Index",
    src: "UNICEF Under-5 Mortality · Child Marriage · ILO Child Labour · UNESCO",
  },
  "home-for-everyone": {
    label: "Displacement & Housing Risk Index",
    src: "UNHCR Global Trends 2024 · IDMC · World Bank Slum Population",
  },
  "girls-in-tech": {
    label: "Digital Gender Exclusion Risk Index",
    src: "ITU Gender Digital Divide · UNESCO Girls' Education · UNDP GII",
  },
  "climate-protect": {
    label: "Climate Crisis Risk Index",
    src: "ND-GAIN Country Index · GDACS · IDMC Climate Displacement · IPCC SLR",
  },
  "protect-disabilities": {
    label: "Disability Inclusion Risk Index",
    src: "WHO UHC Index · UNDRR Sendai Monitor · ACLED · World Bank Poverty",
  },
  "safe-communities": {
    label: "Community Safety Risk Index",
    src: "ACLED 2024 · UNODC Homicide · World Bank Political Stability · CPJ",
  },
  "reproductive-health-safety": {
    label: "Reproductive Health Risk Index",
    src: "WHO Maternal Mortality 2023 · UNICEF Skilled Birth · UNFPA · WHO",
  },
  "food-security": {
    label: "Food Security Risk Index",
    src: "WFP/OCHA IPC Phase 3+ · IFPRI Global Hunger Index · FAO SOFI 2024",
  },
  "digital-safety": {
    label: "Digital Safety Risk Index",
    src: "Freedom House FOTN 2024 · ITU Cyber Governance · RSF · Netblocks",
  },
  "refugee-displaced-protection": {
    label: "Refugee & Displacement Protection Index",
    src: "UNHCR Global Trends 2024 · IDMC · Statelessness · Asylum Quality",
  },
};
