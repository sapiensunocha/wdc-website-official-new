import React from 'react'
import SEOMeta from "../../components/SEOMeta";
import OurVision from '../../components/OurVision'

function VisionPage() {
    return (
        <div>
            <SEOMeta
              title="Our Vision | A Safer World for Every Community"
              description="WDC envisions a world where every community, regardless of location or socioeconomic status, is equipped with the knowledge, tools, and capabilities to manage disasters effectively."
              url="/about/vision"
              keywords="humanitarian vision, WDC vision, disaster resilience, community protection, global disaster management"
            />
            <br/>
            <br/>
            <OurVision/>
        </div>
    )
}

export default VisionPage
