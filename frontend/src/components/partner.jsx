// import React from "react";
// import Section from "./Section";
// import Heading from "./Heading";

// import {
//   strategicpartner_companyLogos,
//   collaborator_companyLogos,
//   technicalsponsor_companyLogos,
//   technicalpartner_companyLogos,
//   implmentationpartner_companyLogos,
//   financialpartner_companyLogos,
// } from "../constants";

// const PartnersPage = ({ className = "" }) => {
//   return (
//     <Section crosses>
//       <div className="container">
//         {/* Page Title */}
//         <Heading
//           title="Our Partners"
//           tag="World Disaster Center"
//           className="mb-8"
//           crosses
//         />

//         {/* Main White Box */}
//         <div
//           className={`
//             bg-white py-10 px-4 sm:px-8 rounded-lg shadow-md
//             ${className}
//           `}
//         >
//           {/* Strategic Partners */}
//           <div className="mb-10 w-full">
//             <div className="bg-blue-950 w-full py-2 mb-6">
//               <h3 className="text-white text-xl font-semibold text-center">
//                 Strategic Partners
//               </h3>
//             </div>
//             <ul
//               className="
//                 grid grid-cols-2 sm:grid-cols-4
//                 gap-8
//                 place-items-center
//               "
//             >
//               {strategicpartner_companyLogos.map((logo, index) => (
//                 <li
//                   key={index}
//                   className="
//                     w-88 h-58 
//                     flex items-center justify-center
//                     transition-transform duration-300 ease-in-out
//                     hover:scale-105
//                   "
//                 >
//                   <img
//                     src={logo}
//                     alt={`strategic-partner-${index}`}
//                     className="max-w-full max-h-full object-contain"
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="bg-blue-950 w-full py-2 mb-6">
//           <h3 className="text-white text-xl font-semibold text-center">
//                     Collaborators
//                   </h3>
//                   </div>
//                   <br></br>
//         <ul className="flex flex-wrap items-center justify-center gap-6">
//           {collaborator_companyLogos.map((logo, index) => (
//             <li
//               className="flex items-center justify-center w-48 h-28"
//               key={index}
//             >
//               <img src={logo} alt={`collaborator-partner-${index}`} />
//             </li>
//           ))}
//         </ul>
//         <br></br>
//         <br></br>

//           {/* Technical Sponsors */}
//           <div className="mb-10 w-full">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//               {/* Technical Sponsors */}
//               <div>
//                 <div className="bg-blue-950 w-full py-2 mb-6">
//                   <h3 className="text-white text-xl font-semibold text-center">
//                     Technical Sponsors
//                   </h3>
//                 </div>
//                 <ul
//                   className="
//                     grid grid-cols-2 sm:grid-cols-2
//                     gap-8
//                     place-items-center
//                   "
//                 >
//                   {technicalsponsor_companyLogos.map((logo, index) => (
//                     <li
//                       key={index}
//                       className="
//                         w-48 h-28
//                         flex items-center justify-center
//                         transition-transform duration-300 ease-in-out
//                         hover:scale-105
//                       "
//                     >
//                       <img
//                         src={logo}
//                         alt={`technical-sponsor-${index}`}
//                         className="max-w-full max-h-full object-contain"
//                       />
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Technical Partners */}
//               <div>
//                 <div className="bg-blue-950 w-full py-2 mb-6">
//                   <h3 className="text-white text-xl font-semibold text-center">
//                     Technical Partner
//                   </h3>
//                 </div>
//                 <ul className="grid grid-cols-2 gap-8 place-items-center">
//   {technicalpartner_companyLogos.map((logo, index) => (
//     <li
//       key={index}
//       className={`w-48 h-28 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 ${
//         technicalpartner_companyLogos.length === 1 ? "col-span-2" : ""
//       }`}
//     >
//       <img
//         src={logo}
//         alt={`technical-partner-${index}`}
//         className="max-w-full max-h-full object-contain"
//       />
//     </li>
//   ))}
// </ul>
//               </div>
//             </div>
//           </div>

//           {/* Implementation Partners */}
//           <div className="bg-blue-950 w-full py-2 mb-6">
//           <h3 className="text-white text-xl font-semibold text-center">
//                     Implementation Partner
//                   </h3>
//                   </div>
//                   <br></br>
//         <ul className="flex flex-wrap items-center justify-center gap-6">
//           {implmentationpartner_companyLogos.map((logo, index) => (
//             <li
//               className="flex items-center justify-center w-32 h-20"
//               key={index}
//             >
//               <img src={logo} alt={`implementation-partner-${index}`} />
//             </li>
//           ))}
//         </ul>
//         <br></br>
//         <br></br>
//           {/* Financial Partners */}
//           <div>
//                 <div className="bg-blue-950 w-full py-2 mb-6">
//                   <h3 className="text-white text-xl font-semibold text-center">
//                     Financial Partner
//                   </h3>
//                 </div>
//                 <ul className="grid grid-cols-2 gap-8 place-items-center">
//   {financialpartner_companyLogos.map((logo, index) => (
//     <li
//       key={index}
//       className={`w-48 h-28 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 ${
//         technicalpartner_companyLogos.length === 1 ? "col-span-2" : ""
//       }`}
//     >
//       <img
//         src={logo}
//         alt={`financial-partner-${index}`}
//         className="max-w-full max-h-full object-contain"
//       />
//     </li>
//   ))}
// </ul>
//               </div>
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default PartnersPage;
import React from "react";
import Section from "./Section";
import Heading from "./Heading";

import {
  strategicpartner_companyLogos,
  collaborator_companyLogos,
  technicalpartner_companyLogos,
  technicalsponsor_companyLogos,
  implmentationpartner_companyLogos,
  financialpartner_companyLogos,
} from "../constants";

const PartnersPage = ({ className = "" }) => {
  const getGridClass = (logosLength) => {
    if (logosLength === 1) return "grid-cols-1 place-items-center";
    if (logosLength === 3) return "grid-cols-1 sm:grid-cols-3 place-items-center";
    if (logosLength <= 2) return "grid-cols-1 sm:grid-cols-2 place-items-center";
    return "grid-cols-2 sm:grid-cols-4 place-items-center";
  };

  return (
    <Section crosses>
      <div className="container">
        {/* Page Title */}
        <Heading
          title="Our Partners"
          tag="World Disaster Center"
          className="mb-10 text-center"
          crosses
        />

        {/* Main Content */}
        <div className={`py-12 px-6 sm:px-10 ${className}`}>
          {/* Reusable Section Component */}
          {[
            { title: "Strategic Partners", logos: strategicpartner_companyLogos },
            { title: "Collaborators", logos: collaborator_companyLogos },
            { title: "Implementation Partner", logos: implmentationpartner_companyLogos },
            { title: "Technical Sponsors", logos: technicalsponsor_companyLogos },
            { title: "Financial Partner", logos: financialpartner_companyLogos },
          ].map((section, idx) => (
            <div key={idx} className="mb-16">
              <div className="bg-primary py-4 rounded-lg shadow-md mb-8">
                <h3 className="text-white text-3xl font-semibold text-center">{section.title}</h3>
              </div>
              <ul className={`grid gap-10 ${getGridClass(section.logos.length)}`}>
                {section.logos.map((logo, index) => (
                  <li
                    key={index}
                    className="w-60 h-36 flex items-center justify-center bg-gray-100 rounded-xl shadow-md p-4 transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                  >
                    <img
                      src={logo}
                      alt={`${section.title.toLowerCase().replace(/\s/g, '-')}-${index}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
                {/* Partner With Us Section */}
                <div className="bg-white py-10 px-4 sm:px-6 rounded-lg shadow-md mt-10 text-center">
          <h2 className="text-3xl font-semibold text-primary mb-4">Partner With Us</h2>
          <p className="text-md text-gray-700 mb-2">
            World Disaster Center welcomes partnerships that align with our mission to enhance disaster preparedness, response, and recovery through cutting-edge technology and collaborative solutions.
            We work with governments, NGOs, private-sector organizations, and international bodies to build resilient communities and reduce the impact of disasters worldwide.
            Visit our <a href="/contact" className="text-primary underline hover:text-primary-dark">Contact Us</a> page to submit your request.
          </p>
        </div>

      </div>
    </Section>
  );
};

export default PartnersPage;
