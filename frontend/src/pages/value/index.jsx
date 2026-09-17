import React from 'react'
import OurValues from '../../components/ourValues'
import SEOMeta from '../../components/SEOMeta'

function OurValuePage() {
    return (
        <div>
            <SEOMeta
                title="Our Values | Humanity, Integrity, Innovation, Inclusion, Impact"
                description="WDC's five core values drive every decision: Humanity, Integrity, Innovation, Inclusion, and Impact. These principles guide our work protecting vulnerable communities across 142 countries."
                url="/about/values"
                keywords="humanitarian values, WDC values, humanitarian principles, NGO values, disaster organization principles"
            />
            <br/>
            <br/>
            <OurValues/>
        </div>
    )
}

export default OurValuePage
