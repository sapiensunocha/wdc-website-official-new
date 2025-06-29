// import React from "react";
// import WDCLogo from "../assets/images/wdclogobg.png";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { LinkedIn } from "@mui/icons-material";
// import { CgMail } from "react-icons/cg";
// import { MdLocationPin } from "react-icons/md";
// import Section from "./Section";
// import WDC from "../assets/images/wdcimage.png";

// function NewFooter() {
//   return (
//   <Section crosses>

//   <div className="container mx-auto px-4">
//     <div className="flex justify-between flex-wrap gap-4">

//     {/*<img src={WDC} className="h-20 w-20" alt="Brainwave" />*/}
//       <div className="mb-6 sm:mb-0">
//         <h4 className="font-bold uppercase mb-4">Get in Touch</h4>
//         <p>office@worlddisastercenter.org</p>
//         <div className="mt-4 flex items-center justify-center gap-2">
              // <a
              //   href="https://x.com/W_D_Center?t=lmR5T5UpjDbOAHGOp3PnTg&s=09"
              //   target="_blank"
              //   className="w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#33CCFF] hover:bg-gray-900"
              // >
              //   <svg
              //     xmlns="http://www.w3.org/2000/svg"
              //     width="20"
              //     height="20"
              //     viewBox="0 0 20 20"
              //     fill="none"
              //   >
              //     <g id="Social Media">
              //       <path
              //         id="Vector"
              //         d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z"
              //         fill="white"
              //       />
              //     </g>
              //   </svg>
              // </a>
              // {/* instagram */}
              // <a
              //   href="https://www.instagram.com/worlddisastercenter?igsh=MXQ1OHFzcjdhOTNnbg=="
              //   target="_blank"
              //   className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[linear-gradient(45deg,#FEE411_6.9%,#FEDB16_10.98%,#FEC125_17.77%,#FE983D_26.42%,#FE5F5E_36.5%,#FE2181_46.24%,#9000DC_85.57%)]  hover:bg-gradient-to-b from-gray-900 to-gray-900  
              //   "
              // >
              //   <svg
              //     className="w-[1.25rem] h-[1.125rem] text-white"
              //     viewBox="0 0 16 16"
              //     fill="none"
              //     xmlns="http://www.w3.org/2000/svg"
              //   >
              //     <path
              //       d="M5.63434 7.99747C5.63434 6.69062 6.6941 5.63093 8.00173 5.63093C9.30936 5.63093 10.3697 6.69062 10.3697 7.99747C10.3697 9.30431 9.30936 10.364 8.00173 10.364C6.6941 10.364 5.63434 9.30431 5.63434 7.99747ZM4.35427 7.99747C4.35427 10.0108 5.98723 11.6427 8.00173 11.6427C10.0162 11.6427 11.6492 10.0108 11.6492 7.99747C11.6492 5.98418 10.0162 4.3522 8.00173 4.3522C5.98723 4.3522 4.35427 5.98418 4.35427 7.99747ZM10.9412 4.20766C10.9411 4.37615 10.991 4.54087 11.0846 4.681C11.1783 4.82113 11.3113 4.93037 11.4671 4.99491C11.6228 5.05945 11.7942 5.07639 11.9595 5.04359C12.1249 5.01078 12.2768 4.92971 12.3961 4.81062C12.5153 4.69153 12.5966 4.53977 12.6295 4.37453C12.6625 4.2093 12.6457 4.03801 12.5812 3.88232C12.5168 3.72663 12.4076 3.59354 12.2674 3.49988C12.1273 3.40622 11.9625 3.35619 11.7939 3.35612H11.7936C11.5676 3.35623 11.3509 3.44597 11.1911 3.60563C11.0313 3.76529 10.9414 3.98182 10.9412 4.20766ZM5.132 13.7759C4.43946 13.7444 4.06304 13.6291 3.81289 13.5317C3.48125 13.4027 3.24463 13.249 2.99584 13.0007C2.74705 12.7524 2.59305 12.5161 2.46451 12.1847C2.367 11.9348 2.25164 11.5585 2.22016 10.8664C2.18572 10.1181 2.17885 9.89331 2.17885 7.99752C2.17885 6.10174 2.18629 5.87758 2.22016 5.12866C2.2517 4.43654 2.36791 4.06097 2.46451 3.81035C2.59362 3.47891 2.7474 3.24242 2.99584 2.99379C3.24428 2.74515 3.48068 2.59124 3.81289 2.46278C4.06292 2.36532 4.43946 2.25004 5.132 2.21857C5.88074 2.18416 6.10566 2.17729 8.00173 2.17729C9.89779 2.17729 10.1229 2.18472 10.8723 2.21857C11.5648 2.25009 11.9406 2.36623 12.1914 2.46278C12.5231 2.59124 12.7597 2.74549 13.0085 2.99379C13.2573 3.24208 13.4107 3.47891 13.5398 3.81035C13.6373 4.06023 13.7527 4.43654 13.7841 5.12866C13.8186 5.87758 13.8255 6.10174 13.8255 7.99752C13.8255 9.89331 13.8186 10.1175 13.7841 10.8664C13.7526 11.5585 13.6367 11.9347 13.5398 12.1847C13.4107 12.5161 13.2569 12.7526 13.0085 13.0007C12.76 13.2488 12.5231 13.4027 12.1914 13.5317C11.9414 13.6292 11.5648 13.7444 10.8723 13.7759C10.1236 13.8103 9.89865 13.8172 8.00173 13.8172C6.10481 13.8172 5.88051 13.8103 5.132 13.7759ZM5.07318 0.941429C4.31699 0.975845 3.80027 1.09568 3.34902 1.27116C2.88168 1.45239 2.48605 1.69552 2.09071 2.09C1.69537 2.48447 1.45272 2.88049 1.27139 3.34755C1.0958 3.79882 0.975892 4.31494 0.941455 5.07068C0.90645 5.82761 0.898438 6.0696 0.898438 7.99747C0.898438 9.92534 0.90645 10.1673 0.941455 10.9243C0.975892 11.68 1.0958 12.1961 1.27139 12.6474C1.45272 13.1142 1.69543 13.5106 2.09071 13.9049C2.48599 14.2992 2.88168 14.542 3.34902 14.7238C3.80113 14.8993 4.31699 15.0191 5.07318 15.0535C5.83096 15.0879 6.0727 15.0965 8.00173 15.0965C9.93075 15.0965 10.1729 15.0885 10.9303 15.0535C11.6865 15.0191 12.2029 14.8993 12.6544 14.7238C13.1215 14.542 13.5174 14.2994 13.9127 13.9049C14.3081 13.5105 14.5502 13.1142 14.7321 12.6474C14.9077 12.1961 15.0281 11.68 15.062 10.9243C15.0964 10.1668 15.1044 9.92534 15.1044 7.99747C15.1044 6.0696 15.0964 5.82761 15.062 5.07068C15.0276 4.31489 14.9077 3.79853 14.7321 3.34755C14.5502 2.88077 14.3075 2.4851 13.9127 2.09C13.518 1.69489 13.1215 1.45239 12.655 1.27116C12.2029 1.09568 11.6865 0.975277 10.9308 0.941429C10.1735 0.907013 9.93132 0.898438 8.00229 0.898438C6.07327 0.898438 5.83096 0.906445 5.07318 0.941429Z"
              //       fill="white"
              //     />
              //   </svg>
              // </a>
              // {/* facebook */}
              // <a
              //   href="https://www.facebook.com/share/UE5DJq9PdZdmejjC/?mibextid=qi2Omg"
              //   target="_blank"
              //   className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#337FFF]  hover:bg-gray-900 "
              // >
              //   <svg
              //     className="w-[1rem] h-[1rem] text-white"
              //     viewBox="0 0 8 14"
              //     fill="none"
              //     xmlns="http://www.w3.org/2000/svg"
              //   >
              //     <path
              //       d="M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z"
              //       fill="currentColor"
              //     />
              //   </svg>
              // </a>
              // {/* linkedin */}
              // <a
              //   href="https://www.linkedin.com/company/world-disaster-center/"
              //   target="_blank"
              //   className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#0084ff]  hover:bg-gray-900 "
              // >
              //   <LinkedIn />
              // </a>
              // {/* youtube */}

              // <a
              //   href="https://www.youtube.com/@WorldDisasterCenterOffice"
              //   target="_blank"
              //   className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#FF0000]  hover:bg-gray-900 "
              // >
              //   <svg
              //     className="w-[1.25rem] h-[0.875rem] text-white"
              //     viewBox="0 0 16 12"
              //     fill="none"
              //     xmlns="http://www.w3.org/2000/svg"
              //   >
              //     <path
              //       fillRule="evenodd"
              //       clipRule="evenodd"
              //       d="M13.9191 1.10651C14.558 1.27906 15.0602 1.78251 15.2299 2.42069C15.5388 3.57887 15.5388 5.99687 15.5388 5.99687C15.5388 5.99687 15.5388 8.41487 15.2299 9.57306C15.0578 10.2136 14.5556 10.7171 13.9191 10.8872C12.7638 11.1969 8.12875 11.1969 8.12875 11.1969C8.12875 11.1969 3.49603 11.1969 2.33844 10.8872C1.69952 10.7147 1.19735 10.2112 1.0276 9.57306C0.71875 8.41487 0.71875 5.99687 0.71875 5.99687C0.71875 5.99687 0.71875 3.57887 1.0276 2.42069C1.1997 1.78015 1.70188 1.27669 2.33844 1.10651C3.49603 0.796875 8.12875 0.796875 8.12875 0.796875C8.12875 0.796875 12.7638 0.796875 13.9191 1.10651ZM10.4981 5.99687L6.6481 8.22578V3.76796L10.4981 5.99687Z"
              //       fill="white"
              //     />
              //   </svg>
              // </a>




//         </div>
//       </div>
//       <div className="mb-6 sm:mb-0">
//             <h4 className="font-bold uppercase mb-4">Quick Links</h4>
//             <ul>
//               <li>
//                 <Link to="/about" className="hover:text-gray-300">
//                   Who We Are
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/solution" className="hover:text-gray-300">
//                   Tailored Solutions
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about/team" className="hover:text-gray-300">
//                   Team
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Resources */}
//           <div className="mb-6 sm:mb-0">
//             <h4 className="font-bold uppercase mb-4">Resources</h4>
//             <ul>
//               <li>
//                 <Link to="/careers" className="hover:text-gray-300">
//                   Careers
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/News" className="hover:text-gray-300">
//                   News
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:text-gray-300">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Headquarters */}
//           <div className="mb-6 sm:mb-0">
//             <h4 className="font-bold uppercase mb-4">Headquarters</h4>
//             <p className="text-sm mb-2 text-white-400">
//               1660 Madison Avenue, 10029 New York, United States
//             </p>
//             <p className="text-sm mb-2 text-white-400">
//             Wolf-Dietrich Straße 32/4/2, 5020 Salzburg, Austria
//             </p>
//             <p className="text-sm mb-2 text-white-400">
//             EIN: 33-1869013 / Steuernummer: 91 323/2005
//             </p>
//           </div>
//         </div>

//         <div className="border-t border-gray-600 mt-6 pt-4">
//       <div className="text-sm text-white">
//         <p className="mb-2">
//           © {new Date().getFullYear()}{" "}
//           <Link to="/" className="hover:text-blue-500 hover:underline">
//             World Disaster Center
//           </Link>
//           <span className="mx-2">•</span>
//           World Disaster Center is a 501(c)(3) tax-exempt organization
//           <span className="mx-2">•</span>
//           <Link to="/policy" className="hover:text-blue-500 hover:underline">
//             Privacy Policy
//           </Link>
//           <span className="mx-2">•</span>
//           <Link to="/terms-conditions" className="hover:text-blue-500 hover:underline">
//             Terms & Conditions
//           </Link>
//         </p>
//       </div>
//     </div>
//       </div>
//     </Section>
//   );
// }

// export default NewFooter;

import React from "react";
import WDCLogo from "../assets/images/wdclogobg.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LinkedIn } from "@mui/icons-material";
import { CgMail } from "react-icons/cg";
import { MdLocationPin } from "react-icons/md";
import Section from "./Section";

function NewFooter() {
  return (
    <Section crosses>
<div className="container">
        <div className="ml-10 md:ml-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 md:gap-y-8">

          {/* Logo Section */}
          <div className="md:col-span-1 mb-6">
            <img
              src={WDCLogo}
              alt="World Disaster Center Logo"
              className="h-24 w-auto"
            />
          </div>

          {/* Contact Section */}
          <div className="md:col-span-2 mb-6">
            <h4 className="font-bold uppercase mb-4">Get in Touch</h4>
            <p>office@worlddisastercenter.org</p>
            <div className="mt-4 flex items-center gap-2">
              {/* Social Media Links */}
              <a
                href="https://x.com/W_D_Center?t=lmR5T5UpjDbOAHGOp3PnTg&s=09"
                target="_blank"
                className="w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#33CCFF] hover:bg-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g id="Social Media">
                    <path
                      id="Vector"
                      d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </a>
              {/* instagram */}
              <a
                href="https://www.instagram.com/worlddisastercenter?igsh=MXQ1OHFzcjdhOTNnbg=="
                target="_blank"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[linear-gradient(45deg,#FEE411_6.9%,#FEDB16_10.98%,#FEC125_17.77%,#FE983D_26.42%,#FE5F5E_36.5%,#FE2181_46.24%,#9000DC_85.57%)]  hover:bg-gradient-to-b from-gray-900 to-gray-900  
                "
              >
                <svg
                  className="w-[1.25rem] h-[1.125rem] text-white"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.63434 7.99747C5.63434 6.69062 6.6941 5.63093 8.00173 5.63093C9.30936 5.63093 10.3697 6.69062 10.3697 7.99747C10.3697 9.30431 9.30936 10.364 8.00173 10.364C6.6941 10.364 5.63434 9.30431 5.63434 7.99747ZM4.35427 7.99747C4.35427 10.0108 5.98723 11.6427 8.00173 11.6427C10.0162 11.6427 11.6492 10.0108 11.6492 7.99747C11.6492 5.98418 10.0162 4.3522 8.00173 4.3522C5.98723 4.3522 4.35427 5.98418 4.35427 7.99747ZM10.9412 4.20766C10.9411 4.37615 10.991 4.54087 11.0846 4.681C11.1783 4.82113 11.3113 4.93037 11.4671 4.99491C11.6228 5.05945 11.7942 5.07639 11.9595 5.04359C12.1249 5.01078 12.2768 4.92971 12.3961 4.81062C12.5153 4.69153 12.5966 4.53977 12.6295 4.37453C12.6625 4.2093 12.6457 4.03801 12.5812 3.88232C12.5168 3.72663 12.4076 3.59354 12.2674 3.49988C12.1273 3.40622 11.9625 3.35619 11.7939 3.35612H11.7936C11.5676 3.35623 11.3509 3.44597 11.1911 3.60563C11.0313 3.76529 10.9414 3.98182 10.9412 4.20766ZM5.132 13.7759C4.43946 13.7444 4.06304 13.6291 3.81289 13.5317C3.48125 13.4027 3.24463 13.249 2.99584 13.0007C2.74705 12.7524 2.59305 12.5161 2.46451 12.1847C2.367 11.9348 2.25164 11.5585 2.22016 10.8664C2.18572 10.1181 2.17885 9.89331 2.17885 7.99752C2.17885 6.10174 2.18629 5.87758 2.22016 5.12866C2.2517 4.43654 2.36791 4.06097 2.46451 3.81035C2.59362 3.47891 2.7474 3.24242 2.99584 2.99379C3.24428 2.74515 3.48068 2.59124 3.81289 2.46278C4.06292 2.36532 4.43946 2.25004 5.132 2.21857C5.88074 2.18416 6.10566 2.17729 8.00173 2.17729C9.89779 2.17729 10.1229 2.18472 10.8723 2.21857C11.5648 2.25009 11.9406 2.36623 12.1914 2.46278C12.5231 2.59124 12.7597 2.74549 13.0085 2.99379C13.2573 3.24208 13.4107 3.47891 13.5398 3.81035C13.6373 4.06023 13.7527 4.43654 13.7841 5.12866C13.8186 5.87758 13.8255 6.10174 13.8255 7.99752C13.8255 9.89331 13.8186 10.1175 13.7841 10.8664C13.7526 11.5585 13.6367 11.9347 13.5398 12.1847C13.4107 12.5161 13.2569 12.7526 13.0085 13.0007C12.76 13.2488 12.5231 13.4027 12.1914 13.5317C11.9414 13.6292 11.5648 13.7444 10.8723 13.7759C10.1236 13.8103 9.89865 13.8172 8.00173 13.8172C6.10481 13.8172 5.88051 13.8103 5.132 13.7759ZM5.07318 0.941429C4.31699 0.975845 3.80027 1.09568 3.34902 1.27116C2.88168 1.45239 2.48605 1.69552 2.09071 2.09C1.69537 2.48447 1.45272 2.88049 1.27139 3.34755C1.0958 3.79882 0.975892 4.31494 0.941455 5.07068C0.90645 5.82761 0.898438 6.0696 0.898438 7.99747C0.898438 9.92534 0.90645 10.1673 0.941455 10.9243C0.975892 11.68 1.0958 12.1961 1.27139 12.6474C1.45272 13.1142 1.69543 13.5106 2.09071 13.9049C2.48599 14.2992 2.88168 14.542 3.34902 14.7238C3.80113 14.8993 4.31699 15.0191 5.07318 15.0535C5.83096 15.0879 6.0727 15.0965 8.00173 15.0965C9.93075 15.0965 10.1729 15.0885 10.9303 15.0535C11.6865 15.0191 12.2029 14.8993 12.6544 14.7238C13.1215 14.542 13.5174 14.2994 13.9127 13.9049C14.3081 13.5105 14.5502 13.1142 14.7321 12.6474C14.9077 12.1961 15.0281 11.68 15.062 10.9243C15.0964 10.1668 15.1044 9.92534 15.1044 7.99747C15.1044 6.0696 15.0964 5.82761 15.062 5.07068C15.0276 4.31489 14.9077 3.79853 14.7321 3.34755C14.5502 2.88077 14.3075 2.4851 13.9127 2.09C13.518 1.69489 13.1215 1.45239 12.655 1.27116C12.2029 1.09568 11.6865 0.975277 10.9308 0.941429C10.1735 0.907013 9.93132 0.898438 8.00229 0.898438C6.07327 0.898438 5.83096 0.906445 5.07318 0.941429Z"
                    fill="white"
                  />
                </svg>
              </a>
              {/* facebook */}
              <a
                href="https://www.facebook.com/share/UE5DJq9PdZdmejjC/?mibextid=qi2Omg"
                target="_blank"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#337FFF]  hover:bg-gray-900 "
              >
                <svg
                  className="w-[1rem] h-[1rem] text-white"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              {/* linkedin */}
              <a
                href="https://www.linkedin.com/company/world-disaster-center/"
                target="_blank"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#0084ff]  hover:bg-gray-900 "
              >
                <LinkedIn />
              </a>
              {/* youtube */}

              <a
                href="https://www.youtube.com/@WorldDisasterCenterOffice"
                target="_blank"
                className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#FF0000]  hover:bg-gray-900 "
              >
                <svg
                  className="w-[1.25rem] h-[0.875rem] text-white"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.9191 1.10651C14.558 1.27906 15.0602 1.78251 15.2299 2.42069C15.5388 3.57887 15.5388 5.99687 15.5388 5.99687C15.5388 5.99687 15.5388 8.41487 15.2299 9.57306C15.0578 10.2136 14.5556 10.7171 13.9191 10.8872C12.7638 11.1969 8.12875 11.1969 8.12875 11.1969C8.12875 11.1969 3.49603 11.1969 2.33844 10.8872C1.69952 10.7147 1.19735 10.2112 1.0276 9.57306C0.71875 8.41487 0.71875 5.99687 0.71875 5.99687C0.71875 5.99687 0.71875 3.57887 1.0276 2.42069C1.1997 1.78015 1.70188 1.27669 2.33844 1.10651C3.49603 0.796875 8.12875 0.796875 8.12875 0.796875C8.12875 0.796875 12.7638 0.796875 13.9191 1.10651ZM10.4981 5.99687L6.6481 8.22578V3.76796L10.4981 5.99687Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-1 mb-6">
            <h4 className="font-bold uppercase mb-4">Quick Links</h4>
            <ul>
              <li>
                <Link to="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about/team" className="hover:text-gray-300">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/solution" className="hover:text-gray-300">
                  Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="md:col-span-1 mb-6">
            <h4 className="font-bold uppercase mb-4">Resources</h4>
            <ul>
              <li>
                <Link to="/careers" className="hover:text-gray-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-gray-300">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Headquarters Section */}
          <div className="md:col-span-3 mb-6">
            <h4 className="font-bold uppercase mb-4">Headquarters</h4>
            <p className="text-sm mb-2 text-white-400">
              United States, EIN: 33-1869013
            </p>
            <p className="text-sm mb-2 text-white-400">
              Austria, Steuernummer: 91 323/2005
            </p>
            <p className="text-sm mb-2 text-white-400">
              Canada, CRA: 721487825 RC 0001
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-600 mt-6 pt-4">
        <div className="text-sm text-white text-center">
            <div className="flex flex-col items-center gap-2">
              <p className="flex items-center justify-center flex-wrap gap-x-2">
                © {new Date().getFullYear()}{" "}
                <Link to="/" className="hover:text-blue-500 hover:underline">
                  World Disaster Center
                </Link>
                <span>•</span>
                {/* World Disaster Center is a 501(c)(3) tax-exempt organization */}
              {/* </p> */}
              {/* <p className="flex items-center justify-center flex-wrap gap-x-2"> */}
                <Link
                  to="/policy"
                  className="hover:text-blue-500 hover:underline"
                >
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link
                  to="/terms-conditions"
                  className="hover:text-blue-500 hover:underline"
                >
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default NewFooter;
