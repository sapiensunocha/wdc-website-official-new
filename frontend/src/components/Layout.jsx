import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import NewFooter from "./newFooter";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.worlddisastercenter.org/#organization",
      "name": "World Disaster Center",
      "alternateName": "WDC",
      "url": "https://www.worlddisastercenter.org",
      "logo": {
        "@type": "ImageObject",
        "url": "https://i.ibb.co/kJ63JTV/wdclogobg.png",
        "width": 512,
        "height": 512
      },
      "description": "World Disaster Center is an AI-powered humanitarian technology organization founded in 2023 by Sapiens Ndatabaye. WDC builds and deploys AI disaster monitoring, early warning systems, and field missions to protect vulnerable communities worldwide.",
      "foundingDate": "2023",
      "foundingLocation": { "@type": "Place", "name": "Ottawa, Ontario, Canada" },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Ottawa",
        "addressRegion": "Ontario",
        "addressCountry": "CA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "office@worlddisastercenter.org",
        "contactType": "customer support",
        "availableLanguage": ["English", "French"]
      },
      "founder": {
        "@type": "Person",
        "@id": "https://www.worlddisastercenter.org/#sapiens-ndatabaye",
        "name": "Sapiens Ndatabaye",
        "jobTitle": "Founder & Executive Director",
        "description": "Former humanitarian coordinator at UN OCHA. Founded World Disaster Center in 2023 to apply AI to disaster risk management.",
        "worksFor": { "@id": "https://www.worlddisastercenter.org/#organization" }
      },
      "knowsAbout": [
        "Disaster Risk Reduction", "Artificial Intelligence", "Early Warning Systems",
        "Humanitarian Action", "Satellite Monitoring", "Geospatial Intelligence",
        "Climate Adaptation", "Conflict Displacement", "Flood Early Warning",
        "Earthquake Monitoring", "Humanitarian Technology"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "WDC Technology Products & Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "Michael AI Platform", "description": "AI-powered real-time disaster monitoring and prediction. 89% accuracy across earthquake, flood, and conflict early warning. Monitors 190+ countries." } },
          { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "EAGLE — Early Alert Geospatial Learning Engine", "description": "AI early warning system deployed across Africa. Community-level disaster alerts and dynamic crisis heatmaps." } },
          { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "CLIMB — Community-Led Impact & Monitoring Platform", "description": "Participatory disaster monitoring integrating local knowledge with satellite data." } },
          { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "Crisis Atlas", "description": "Global disaster risk index covering 190+ countries across 12 hazard types and 48 vulnerability indicators." } },
          { "@type": "Offer", "itemOffered": { "@type": "SoftwareApplication", "name": "Nostradamus Predictive Engine", "description": "Long-range disaster forecasting using climate models and political stability indices." } }
        ]
      },
      "areaServed": "Global",
      "legalName": "World Disaster Center"
    },
    {
      "@type": "WebSite",
      "@id": "https://www.worlddisastercenter.org/#website",
      "url": "https://www.worlddisastercenter.org",
      "name": "World Disaster Center",
      "description": "AI-powered disaster risk management — monitoring, early warning, field missions, and humanitarian technology.",
      "publisher": { "@id": "https://www.worlddisastercenter.org/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.worlddisastercenter.org/reports?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ORG_JSON_LD)}</script>
      </Helmet>
      <div className="pt-[6.5rem] lg:pt-[7rem]">
        <Header />
        <main>
          <Outlet />
        </main>
        <NewFooter />
      </div>
    </>
  );
};

export default Layout;
