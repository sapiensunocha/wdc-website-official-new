import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { RefreshCw, TrendingUp, TrendingDown, ExternalLink, Database } from "lucide-react";

// ─── Data source config per campaign ──────────────────────────────────────────
const CONFIG = {
  "protect-women": {
    source:      "worldbank",
    indicator:   "SH.STA.MMRT",
    label:       "Maternal Mortality Ratio",
    unit:        "per 100,000 births",
    description: "Countries with highest maternal mortality — where women most need protection",
    direction:   "higher-worse",
    format:      v => v.toLocaleString(),
    sourceLabel: "World Bank / WHO 2023",
    sourceUrl:   "https://data.worldbank.org/indicator/SH.STA.MMRT",
  },
  "protect-children": {
    source:      "worldbank",
    indicator:   "SH.DYN.MORT",
    label:       "Under-5 Mortality Rate",
    unit:        "per 1,000 live births",
    description: "Countries where children face the greatest mortality risk",
    direction:   "higher-worse",
    format:      v => v.toFixed(1),
    sourceLabel: "World Bank / UNICEF 2023",
    sourceUrl:   "https://data.worldbank.org/indicator/SH.DYN.MORT",
  },
  "home-for-everyone": {
    source:      "unhcr",
    metric:      "idps",
    label:       "Internally Displaced Persons",
    unit:        "people",
    description: "Countries with most people forcibly displaced within their own borders",
    direction:   "higher-worse",
    format:      v => v >= 1e6 ? (v / 1e6).toFixed(1) + "M" : (v / 1e3).toFixed(0) + "K",
    sourceLabel: "UNHCR 2023",
    sourceUrl:   "https://www.unhcr.org/refugee-statistics",
  },
  "girls-in-tech": {
    source:      "worldbank",
    indicator:   "IT.NET.USER.ZS",
    label:       "Digital Exclusion Gap",
    unit:        "% of population offline",
    description: "Countries where girls face the greatest digital exclusion and connectivity barrier",
    direction:   "higher-worse",
    invert:      true,   // 100 - value = % offline
    format:      v => v.toFixed(1) + "%",
    sourceLabel: "World Bank / ITU 2023",
    sourceUrl:   "https://data.worldbank.org/indicator/IT.NET.USER.ZS",
  },
  "climate-protect": {
    source:      "worldbank",
    indicator:   "EN.ATM.CO2E.PC",
    label:       "CO₂ Emissions Per Capita",
    unit:        "metric tons",
    description: "Countries driving highest per-capita emissions — creating climate vulnerability for others",
    direction:   "higher-worse",
    format:      v => v.toFixed(1) + " t",
    sourceLabel: "World Bank / IEA 2022",
    sourceUrl:   "https://data.worldbank.org/indicator/EN.ATM.CO2E.PC",
  },
  "protect-disabilities": {
    source:      "worldbank",
    indicator:   "SH.XPD.CHEX.PC.CD",
    label:       "Health Expenditure Per Capita",
    unit:        "USD",
    description: "Countries with lowest healthcare investment — disability support most at risk",
    direction:   "lower-worse",  // lowest = worst
    format:      v => "$" + Math.round(v).toLocaleString(),
    sourceLabel: "World Bank / WHO 2022",
    sourceUrl:   "https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD",
  },
  "safe-communities": {
    source:      "worldbank",
    indicator:   "VC.IHR.PSRC.P5",
    label:       "Intentional Homicide Rate",
    unit:        "per 100,000 people",
    description: "Countries with highest rates of violent crime and insecurity",
    direction:   "higher-worse",
    format:      v => v.toFixed(1),
    sourceLabel: "World Bank / UNODC 2022",
    sourceUrl:   "https://data.worldbank.org/indicator/VC.IHR.PSRC.P5",
  },
  "reproductive-health-safety": {
    source:      "worldbank",
    indicator:   "SP.UWT.TFRT",
    label:       "Adolescent Fertility Rate",
    unit:        "births per 1,000 girls (15–19)",
    description: "Countries where adolescent girls face the highest reproductive health risks",
    direction:   "higher-worse",
    format:      v => v.toFixed(1),
    sourceLabel: "World Bank / WHO 2023",
    sourceUrl:   "https://data.worldbank.org/indicator/SP.UWT.TFRT",
  },
  "food-security": {
    source:      "worldbank",
    indicator:   "SN.ITK.DEFC.ZS",
    label:       "Prevalence of Undernourishment",
    unit:        "% of population",
    description: "Countries with highest rates of hunger and chronic food insecurity",
    direction:   "higher-worse",
    format:      v => v.toFixed(1) + "%",
    sourceLabel: "World Bank / FAO 2022",
    sourceUrl:   "https://data.worldbank.org/indicator/SN.ITK.DEFC.ZS",
  },
  "digital-safety": {
    source:      "worldbank",
    indicator:   "IT.NET.USER.ZS",
    label:       "Internet Penetration",
    unit:        "% of population online",
    description: "Countries with highest digital exposure — greatest online safety risk surface",
    direction:   "higher-worse",
    format:      v => v.toFixed(1) + "%",
    sourceLabel: "World Bank / ITU 2023",
    sourceUrl:   "https://data.worldbank.org/indicator/IT.NET.USER.ZS",
  },
  "refugee-displaced-protection": {
    source:      "unhcr",
    metric:      "refugees",
    label:       "Refugees & Asylum Seekers Hosted",
    unit:        "people",
    description: "Countries hosting the most refugees and displaced persons",
    direction:   "higher-worse",
    format:      v => v >= 1e6 ? (v / 1e6).toFixed(1) + "M" : (v / 1e3).toFixed(0) + "K",
    sourceLabel: "UNHCR Global Trends 2023",
    sourceUrl:   "https://www.unhcr.org/refugee-statistics",
  },
};

// ─── Country flag from ISO2 ────────────────────────────────────────────────────
const flag = iso2 => {
  if (!iso2 || iso2.length !== 2) return "🌍";
  try {
    return String.fromCodePoint(
      iso2.toUpperCase().charCodeAt(0) + 0x1F1A5,
      iso2.toUpperCase().charCodeAt(1) + 0x1F1A5,
    );
  } catch { return "🌍"; }
};

// ─── World Bank fetcher ────────────────────────────────────────────────────────
async function fetchWorldBank(indicator, invert = false) {
  const url = `https://api.worldbank.org/v2/country/all/indicator/${indicator}?format=json&mrv=1&mrnev=1&per_page=300`;
  const res = await fetch(url);
  const d   = await res.json();
  const raw = (d[1] || []).filter(x =>
    x.countryiso3code?.length === 3 &&
    x.country?.id?.length === 2 &&
    x.value !== null && x.value !== undefined,
  );
  return raw.map(x => ({
    iso2:    x.country.id,
    name:    x.country.value,
    value:   invert ? (100 - x.value) : x.value,
    rawValue: x.value,
    year:    x.date,
  }));
}

// ─── UNHCR fetcher ─────────────────────────────────────────────────────────────
async function fetchUNHCR(metric) {
  const url = "https://api.unhcr.org/population/v1/population/?yearFrom=2023&yearTo=2023&limit=300&coa_all=true";
  const res = await fetch(url);
  const d   = await res.json();

  // ISO3→ISO2 minimal lookup for top displaced countries
  const ISO3_TO_2 = {
    AFG:"AF",SDN:"SD",SYR:"SY",COL:"CO",COD:"CD",YEM:"YE",SOM:"SO",IRN:"IR",
    UKR:"UA",NGA:"NG",ETH:"ET",BGD:"BD",PAK:"PK",TUR:"TR",LBN:"LB",JOR:"JO",
    TZA:"TZ",KEN:"KE",UGA:"UG",CMR:"CM",CAF:"CF",TCD:"TD",MOZ:"MZ",MLI:"ML",
    BFA:"BF",NER:"NE",MMR:"MM",IRQ:"IQ",LBY:"LY",MRT:"MR",MDG:"MG",ZMB:"ZM",
    ZWE:"ZW",RWA:"RW",SSD:"SS",GHA:"GH",SEN:"SN",CIV:"CI",GIN:"GN",TGO:"TG",
    HND:"HN",GTM:"GT",HTI:"HT",VEN:"VE",EGY:"EG",MAR:"MA",TUN:"TN",DZA:"DZ",
    IND:"IN",IDN:"ID",PHL:"PH",VNM:"VN",KHM:"KH",NPL:"NP",LKA:"LK",THA:"TH",
    MYS:"MY",RUS:"RU",UZB:"UZ",TJK:"TJ",AGO:"AO",COG:"CG",SLE:"SL",LBR:"LR",
    GMB:"GM",MWI:"MW",GNB:"GW",BDI:"BI",COM:"KM",DJI:"DJ",ERI:"ER",BEN:"BJ",
    MEX:"MX",BRA:"BR",PER:"PE",BOL:"BO",ECU:"EC",CUB:"CU",DOM:"DO",NIC:"NI",
    SLV:"SV",PAN:"PA",DEU:"DE",FRA:"FR",SWE:"SE",NOR:"NO",USA:"US",GBR:"GB",
    CAN:"CA",AUS:"AU",NZL:"NZ",CHN:"CN",ZAF:"ZA",ARG:"AR",CHL:"CL",URY:"UY",
    AZE:"AZ",ARM:"AM",GEO:"GE",MDA:"MD",BLR:"BY",KGZ:"KG",TKM:"TM",MNG:"MN",
    PRT:"PT",ESP:"ES",ITA:"IT",POL:"PL",CZE:"CZ",SVK:"SK",HUN:"HU",ROU:"RO",
    BGR:"BG",HRV:"HR",SRB:"RS",BIH:"BA",MKD:"MK",ALB:"AL",KOS:"XK",MNE:"ME",
    SVN:"SI",EST:"EE",LVA:"LV",LTU:"LT",FIN:"FI",DNK:"DK",NLD:"NL",BEL:"BE",
    CHE:"CH",AUT:"AT",GRC:"GR",CYP:"CY",MLT:"MT",ISL:"IS",IRL:"IE",LUX:"LU",
    MKD:"MK",ISR:"IL",PSE:"PS",SAU:"SA",ARE:"AE",QAT:"QA",KWT:"KW",BHR:"BH",
    OMN:"OM",GEO:"GE",KAZ:"KZ",AFR:"--",
  };

  return (d.items || [])
    .filter(x => x.coa_iso && x.coa_iso.length === 3)
    .map(x => {
      const val = Number(x[metric]) || 0;
      return {
        iso2: ISO3_TO_2[x.coa_iso] || "",
        iso3: x.coa_iso,
        name: x.coa_name,
        value: val,
        rawValue: val,
        year: "2023",
      };
    })
    .filter(x => x.value > 0);
}

// ─── Bar row ───────────────────────────────────────────────────────────────────
function CountryRow({ item, rank, max, cfg, accentColor, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const pct    = Math.min(100, (item.value / max) * 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 15) * 0.03 }}
      className="grid grid-cols-[28px_28px_1fr_auto] items-center gap-2 py-2 border-b border-white/5 last:border-0"
    >
      {/* Rank */}
      <span className="text-[10px] font-black text-gray-600 text-right">#{rank}</span>
      {/* Flag */}
      <span className="text-lg leading-none">{flag(item.iso2)}</span>
      {/* Bar + country name */}
      <div className="min-w-0">
        <p className="text-xs text-white font-medium truncate leading-none mb-1">{item.name}</p>
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : { width: 0 }}
            transition={{ duration: 0.9, delay: (index % 15) * 0.04, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
      {/* Value */}
      <span className="text-xs font-black shrink-0 tabular-nums" style={{ color: accentColor }}>
        {cfg.format(item.value)}
      </span>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function CampaignDataIndex({ slug, accentColor = "#009EDB", topN = 20 }) {
  const cfg = CONFIG[slug];
  const [countries, setCountries] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [lastFetch, setLast]      = useState(null);
  const [error,     setError]     = useState(null);

  const load = useCallback(async () => {
    if (!cfg) return;
    setLoading(true);
    setError(null);
    try {
      let data = [];
      if (cfg.source === "worldbank") {
        data = await fetchWorldBank(cfg.indicator, cfg.invert || false);
      } else if (cfg.source === "unhcr") {
        data = await fetchUNHCR(cfg.metric);
      }

      // Sort
      if (cfg.direction === "lower-worse") {
        data.sort((a, b) => a.value - b.value);
      } else {
        data.sort((a, b) => b.value - a.value);
      }

      setCountries(data.slice(0, topN));
      setLast(new Date());
    } catch (e) {
      setError("Could not load indicator data.");
    } finally {
      setLoading(false);
    }
  }, [slug, topN]);

  useEffect(() => { load(); }, [load]);

  if (!cfg) return null;

  const max = countries[0]?.value || 1;

  return (
    <div className="bg-[#0a1628] border border-white/8 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/8">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex items-center gap-2">
            <Database size={13} style={{ color: accentColor }} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentColor }}>
              Live Data Index
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lastFetch && (
              <span className="text-[9px] text-gray-600">
                {lastFetch.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <button onClick={load} disabled={loading}
              className="text-gray-600 hover:text-gray-300 transition-colors disabled:opacity-40">
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <h3 className="text-base font-black text-white mb-0.5">{cfg.label}</h3>
        <p className="text-xs text-gray-500 leading-snug">{cfg.description}</p>

        {/* Stats row */}
        {!loading && countries.length > 0 && (
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              {cfg.direction === "higher-worse"
                ? <TrendingUp size={12} className="text-red-400" />
                : <TrendingDown size={12} className="text-red-400" />}
              <span className="text-[10px] text-gray-500">
                {cfg.direction === "higher-worse" ? "Worst" : "Least covered"}: {" "}
                <strong className="text-white">{countries[0]?.name}</strong>
                {" "}({cfg.format(countries[0]?.value)})
              </span>
            </div>
            <div className="ml-auto flex items-center gap-1 text-[9px] text-gray-700">
              <a href={cfg.sourceUrl} target="_blank" rel="noopener noreferrer"
                className="hover:text-gray-400 flex items-center gap-0.5 transition-colors">
                {cfg.sourceLabel} <ExternalLink size={8} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* List body */}
      <div className="px-5 py-3 max-h-[520px] overflow-y-auto scrollbar-thin">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw size={20} className="animate-spin" style={{ color: accentColor }} />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-gray-600 text-xs">{error}</div>
        ) : (
          <div>
            {/* Unit header */}
            <div className="grid grid-cols-[28px_28px_1fr_auto] gap-2 mb-1">
              <span />
              <span />
              <span className="text-[9px] text-gray-600 uppercase tracking-wider">Country</span>
              <span className="text-[9px] text-gray-600 uppercase tracking-wider">{cfg.unit}</span>
            </div>
            {countries.map((c, i) => (
              <CountryRow
                key={c.iso2 || c.name}
                item={c}
                rank={i + 1}
                max={max}
                cfg={cfg}
                accentColor={accentColor}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-[9px] text-gray-700">
          {cfg.sourceLabel} · Top {topN} countries by {cfg.direction === "higher-worse" ? "highest" : "lowest"} values
        </span>
        <a href={cfg.sourceUrl} target="_blank" rel="noopener noreferrer"
          className="text-[9px] text-[#009EDB] hover:underline flex items-center gap-0.5">
          Full dataset <ExternalLink size={8} />
        </a>
      </div>
    </div>
  );
}

// ─── Also export config so CampaignDetail can build a live map ─────────────────
export { CONFIG as CAMPAIGN_DATA_CONFIG, fetchWorldBank, fetchUNHCR };
