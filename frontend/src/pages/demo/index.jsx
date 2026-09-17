import React from "react";
import RequestDemo from "../../components/requestDemo";
import SEOMeta from "../../components/SEOMeta";

function DemoPage() {
  return (
    <div>
      <SEOMeta
        title="Request a Demo | WDC Disaster Intelligence Platform"
        description="Request a live demo of WDC's disaster intelligence tools — MICHAEL AI, EAGLE satellite assessment, Crisis Atlas dashboard, and Global Expert Roster. For governments, NGOs, and UN agencies."
        url="/request-demo"
        keywords="disaster intelligence demo, MICHAEL AI demo, early warning system demo, humanitarian technology demo, NGO technology platform"
      />
      <br />
      <RequestDemo />
    </div>
  );
}

export default DemoPage;
