import React from "react";
import QNA from "../../components/qna";
import SEOMeta from "../../components/SEOMeta";

function WhatWeOfferPage() {
  return (
    <div>
      <SEOMeta
        title="What We Offer | Disaster Intelligence, Deployment & Capacity Building"
        description="WDC offers AI disaster intelligence platforms, global expert deployment within 72 hours, free training certification, and 11 humanitarian protection campaigns across 142 countries."
        url="/about/what-we-offer"
        keywords="humanitarian services, disaster intelligence platform, expert deployment, humanitarian capacity building, NGO services, disaster response services"
      />
      <br />
      <br />
      <QNA />
    </div>
  );
}

export default WhatWeOfferPage;
