import React, { useState } from "react";
import Section from "../../components/Section";
import Heading from "../../components/Heading";

// Modal Component
function Modal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Coming Soon</h2>
        <p className="text-gray-600 mb-6">We're working hard to bring this feature to you. Stay tuned!</p>
        <button
          onClick={onClose}
          className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary-dark"
        >
          Close
        </button>
      </div>
    </div>
  );
}

const membershipData = {
  professionals: {
    title: "Experts & Disaster Specialists",
    description: `For disaster experts, engineers, GIS/Remote sensing analyst, policy advisors, medical professionals, etc.`,
    benefits: [
        "Annual Membership: $20/year or 10 hours of pro bono service.",
        "Receive newsletters.",
        "Provide expertise in disaster phases (Preparedness, Response, Recovery).",
        "Lead virtual or in-person training sessions.",
        "Join a global network of disaster professionals.",
        "Featured in WDC’s 'Experts Hub'.",
        "Priority access to WDC conferences, workshops, and webinars.",
        "Eligible for project-based disaster management roles.",
    ],
  },
  locals: {
    title: "Locals & Community Members",
    description: `For individuals living in disaster-prone areas or interested in capacity-building.`,
    benefits: [
      "Annual Membership: Fee is free or minimal (based on region).",
      "Participate in local training, crowdsourcing tasks, and resilience initiatives.",
      "Receive free or discounted training from professionals.",
      "Connect with experts and peers for mentorship opportunities.",
      "Earn certificates for completing training programs.",
      "Invitations to local workshops and events.",
      "Eligible for paid crowdsourcing tasks (e.g., local condition reporting).",
    ],
  },
  NGOS: {
    title: "Non-Governmental Organizations",
    description: `For NGOs, humanitarian organizations, and community-based organizations.`,
    benefits: [
      "Annual Membership: Fee varies by organization size and focus area.",
      "Receive exclusive newsletters and updates.",
      "Collaborate with global teams to implement disaster strategies.",
      "Participate in workshops and training by WDC experts.",
      "Expand networks with similar organizations worldwide.",
      "Feature on the WDC partners' page.",
      "Special invitations to WDC-led global events.",
      "Access funding opportunities for joint projects.",
    ],
  },
};

function MembershipPage() {
  const [activeTab, setActiveTab] = useState(""); // No active tab by default
  const [clickedTab, setClickedTab] = useState(""); // Tracks clicked button for animation
  const [showModal, setShowModal] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setClickedTab(tab); // Trigger animation
    setTimeout(() => setClickedTab(""), 1000); // Reset animation after it plays once
  };

  const currentData = membershipData[activeTab];

  return (
    <Section className="overflow-hidden" id="membership">
      <div className="container flex flex-col justify-center items-center">
        {/* Heading */}
        <Heading
          tag="Join our membership"
          title="Become a WDC Member"
          text="Join a network of individuals and organizations working to strengthen global disaster resilience efforts. WDC membership is open to professionals and community members worldwide who are committed to ending disaster impacts globally."
        />

        {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => handleTabChange("professionals")}
          className={
            `px-6 py-4 sm:py-6 rounded-lg border-4 border-primary-dark font-semibold text-center ${
            activeTab === "professionals" ? "bg-primary border-4 border-white text-white" : "bg-gray-200 text-gray-700"  
            } ${clickedTab === "professionals" ? "animate-bounce" : ""}`}
        >
            <span className="block text-3xl font-bold">Professionals</span>
            <hr 
              className={`h-px my-6 border-0 ${
              activeTab === "professionals" ? "bg-white" : "bg-black"
              }`}
            ></hr>
            <span className="block mt-2 text-sm font-normal">
              As a Professional Member, you'll have the opportunity to contribute to global disaster preparedness, response, and recovery efforts.
            </span>
        </button>

        <button
          onClick={() => handleTabChange("locals")}
          className={`px-6 py-4 sm:py-6 rounded-lg border-4 border-primary-dark font-semibold text-center ${
            activeTab === "locals" ? "bg-primary border-4 border-white text-white" : "bg-gray-200 text-gray-700"
          } ${clickedTab === "locals" ? "animate-bounce" : ""}`}
        >
          <span className="block text-3xl font-bold">Locals</span>
          <hr
              className={`h-px my-6 border-0 ${
              activeTab === "locals" ? "bg-white" : "bg-black"
              }`}
            ></hr>
          <span className="block mt-2 text-sm font-normal">
            As a Local Member, you’ll be able to get training, take part in paid tasks and join WDC’s community-driven efforts to improve readiness and response locally
          </span>
        </button>

        <button
          onClick={() => handleTabChange("NGOS")}
          className={`px-6 py-4 sm:py-6 rounded-lg border-4 border-primary-dark font-semibold text-center ${
            activeTab === "NGOS" ? "bg-primary border-4 border-white text-white" : "bg-gray-200 text-gray-700"
          } ${clickedTab === "NGOS" ? "animate-bounce" : ""}`}
        >
          <span className="block text-3xl font-bold">NGOs</span>
          <hr
              className={`h-px my-6 border-0 ${
              activeTab === "NGOS" ? "bg-white" : "bg-black"
              }`}
            ></hr>
          <span className="block mt-2 text-sm font-normal">
          As an NGO member, you'll collaborate with WDC to enhance disaster preparedness, mitigation, and recovery strategies in disaster-prone regions.
          </span>
        </button>
      </div>


        {/* Membership Details */}
        {currentData && (
          // <div className="relative rounded-3xl mt-10 bg-white p-6 ring-1 shadow-2xl ring-gray-900/10 sm:p-10 transition-opacity duration-500 ease-in-out opacity-100">
          <div className="relative mt-10 bg-white p-6 ring-1 shadow-2xl ring-gray-900/10 sm:p-10 rounded-3xl w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-primary text-center break-words">
              {currentData.title}
            </h2>
            <p className="mt-2 text-1xl italic text-gray-600 text-center">
              {currentData.description}
            </p>

            {/* Benefits Section */}
            <div className="mt-10 space-y-3">
            <th className="mt-3 text-4xl text-gray-700 font-semibold">
                      Benefits
                    </th>
              {currentData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 text-primary">
                    {/* Checkmark icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-gray-600 break-words">{benefit}</p>
                </div>
              ))}
            </div>


            {/* Apply Button */}
            <div className="mt-8 flex justify-center">
              <button
                // className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary-dark"
                className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary-dark flex items-center space-x-2"
                onClick={() => setShowModal(true)}
              >
              
                Apply Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"  
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Show Modal */}
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </Section>
  );
}

export default MembershipPage;
