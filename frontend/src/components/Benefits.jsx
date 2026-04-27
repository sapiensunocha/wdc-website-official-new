import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import DottedWorld from "../assets/hero/dottedWord.jpg";
import { Link } from "react-router-dom";

const Benefits = () => {
  return (
    <Section id="features" crosses>
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="What We Offer"
          tag="Benefits"
        />

        <div className="flex flex-wrap gap-6 mb-10 justify-center">
          {benefits.map((item) => (
            <Link
              to={item.url === "" ? "/" : item.url}
              className="block relative flex-grow md:basis-[45%] lg:basis-[30%] bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group"
              key={item.id}
            >
              <div className="relative z-10 flex flex-col min-h-[22rem] p-8">
                <h5 className="text-2xl font-bold mb-4 text-gray-900 transition-colors">{item.title}</h5>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{item.text}</p>
                
                <div className="flex items-center mt-auto border-t border-gray-100 pt-4">
                  <span className="font-bold uppercase tracking-wider text-xs text-gray-500 group-hover:text-black transition-colors">
                    {item?.url === "" ? "Coming soon" : `Explore ${item.title}`}
                  </span>
                  {item?.url !== "" && (
                     <div className="ml-auto opacity-50 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all">
                       <Arrow />
                     </div>
                  )}
                </div>
              </div>

              {/* Made the dotted map a very subtle, light watermark instead of dark blue */}
              <div className="absolute inset-0 opacity-[0.03] grayscale transition-opacity group-hover:opacity-[0.06] pointer-events-none">
                <img
                  src={DottedWorld}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;