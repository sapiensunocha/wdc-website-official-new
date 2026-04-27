import Section from "./Section";
import Heading from "./Heading";
import { check } from "../assets";
import { brainwaveServices } from "../constants";
import World from "../assets/services/world.png";
// import Strengths from "../assets/services/strengths.png";
import corevalues from "../assets/services/corevalues.jpg";
import img1 from "../assets/services/img1.png";
import img2 from "../assets/services/img2.png";
import img3 from "../assets/services/img3.png";
import img4 from "../assets/services/img4.png";

import Generating from "./Generating";

const Services = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center p-8">
        <div className="text-4xl font-bold text-center ">
          Our Strengths
        </div>
        <div className="container mx-auto py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
    {/* Column 1 */}
    <div className="flex flex-col items-center">
      <img
        src={img1}// Replace with your image path
        alt="Innovates for People"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-bold mb-2">Innovates for People</h3>
      <p className="text-sm text-content-secondary">
        We place people at the heart of every solution, developing tools and insights that are simple, actionable, and transformative.
      </p>
    </div>
    {/* Column 2 */}
    <div className="flex flex-col items-center">
      <img
        src={img2} // Replace with your image path
        alt="Connects the World"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-bold mb-2">Connects the World</h3>
      <p className="text-sm text-content-secondary">
      Our global network spans governments, NGOs, businesses, and individuals, ensuring that we leverage existing expertise & resources.
      </p>
      <br></br>
    </div>
    {/* Column 3 */}
    <div className="flex flex-col items-center">
      <img
        src={img3} // Replace with your image path
        alt="Operates in Real Time"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-bold mb-2">Operates in Real Time</h3>
      <p className="text-sm text-content-secondary">
        From global systems to local communities, we provide real-time alerts, advice, and data to mitigate disaster impacts effectively.
      </p>
    </div>
    {/* Column 4 */}
    <div className="flex flex-col items-center">
      <img
        src={img4} // Replace with your image path
        alt="Is Inclusive"
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-bold mb-2">Is Inclusive</h3>
      <p className="text-sm text-content-secondary">
        We are a diverse, collaborative hub, uniting people from all backgrounds, ages, and expertise to create holistic solutions.
      </p>
    </div>
  </div>
</div>
        {/* <div>
          <img 
            src= {Strengths}
            alt = "strengths"
            className=""
          />
        </div> */}
<div className="text-4xl font-bold text-center text-content-primary py-16">
  Our Values
</div>

<div className="w-full px-4">
  <div
    className="
      grid
      grid-cols-1        /* Single column on mobile */
      min-[460px]:grid-cols-2     /* Two columns on small screens and above */
      lg:grid-cols-3     /* Three columns on large screens and above */

      /* Control horizontal and vertical spacing separately */
      gap-x-0            /* No horizontal gap */
      gap-y-6            /* Spacing of 6 between rows */
      
      place-items-center
    "
  >
    {[
      { title: "Action-Oriented", description: "We take immediate action to save lives, knowing that every moment counts." },
      { title: "Collaboration Based", description: "We build strong partnerships to deliver swift and impactful solutions." },
      { title: "Tech-Driven", description: "We use cutting-edge technologies like AI and real-time data to improve disaster governance." },
      { title: "Inclusive", description: "We ensure disaster responses meet the needs of all, with a focus on marginalized groups." },
      { title: "Real-Time", description: "We provide real-time alerts and insights to empower effective decision-making and risk mitigation." },
      { title: "Worldwide", description: "Our global efforts unite organizations and individuals to build a more resilient and sustainable world." }
    ].map((value, index) => (
      <div 
        key={index}
        className="
          group
          flex
          flex-col
          items-center
          justify-center
          text-center
          text-white
          font-bold
          border-4
          border-primary-light
          rounded-full
          cursor-pointer
          transition-all
          duration-300
          ease-in-out
          hover:bg-primary
          hover:border-transparent
          hover:text-white

          /* Circle sizing at different breakpoints */
          w-36 h-36
          sm:w-40 sm:h-40
          lg:w-44 lg:h-44
          xl:w-48 xl:h-48
        "
      >
        <div className="relative w-full h-full flex justify-center items-center p-2">
          {/* Title hides on hover */}
          <span className="z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
            {/* Smaller, responsive text sizes for the title */}
            <span className="text-[10px] sm:text-xs md:text-sm">
              {value.title}
            </span>
          </span>

          {/* Description appears on hover */}
          <div
            className="
              absolute
              inset-0
              flex
              justify-center
              items-center
              bg-primary
              bg-opacity-90
              rounded-full
              p-2
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
              ease-in-out
            "
          >
            {/* Smaller, responsive text sizes for the description */}
            <span className="text-[9px] sm:text-xs md:text-sm font-normal">
              {value.description}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

<br></br>
<br></br>


     </div>
  );
};

export default Services;
