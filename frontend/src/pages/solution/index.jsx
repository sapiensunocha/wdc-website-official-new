import SEOMeta from "../../components/SEOMeta";
import CaseStudies from "../../components/CaseStudies";
import NewsGrid from "../../components/NewsGrid";

const WhatWeDo = ()=> {

    return (
        <>
            <SEOMeta
              title="What We Do | AI Disaster Intelligence & Humanitarian Response"
              description="WDC provides AI-powered disaster intelligence, early warning systems, expert deployment, and community protection across 142 countries. From prediction to protection in hours."
              url="/solution"
              keywords="AI disaster intelligence, humanitarian response, disaster risk reduction, early warning system, disaster management solutions, humanitarian technology, crisis response"
            />
            <CaseStudies /> 
            {/*<NewsGrid/>*/}
        </>
    )
}

export default WhatWeDo;