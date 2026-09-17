import React from 'react'
import SEOMeta from "../../components/SEOMeta";
import OurMission from '../../components/OurMission'

function MissionPage() {
    return (
        <div>
            <SEOMeta
              title="Our Mission | Ending Preventable Disaster Deaths Worldwide"
              description="WDC's mission is to redefine global disaster management using AI and collective human intelligence — empowering communities worldwide with tools for preemptive action, effective response, and sustainable recovery."
              url="/about/mission"
              keywords="humanitarian mission, disaster prevention mission, WDC mission, disaster risk reduction, humanitarian organization mission"
            />
            <br/>
            <br/>
            <OurMission/>
        </div>
    )
}

export default MissionPage
