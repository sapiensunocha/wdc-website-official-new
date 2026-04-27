import { useParams, Navigate } from "react-router-dom";
import Section from "./Section";
import Heading from "./Heading";
import { caseStudies } from "../assets/data/case_stadies";
import RequestDemo from "./requestDemo";
import PICTURE from "../assets/images/Michael_picture.jpeg";

const CaseDetail = () => {
  const { caseName } = useParams();
  const caseStudy = caseStudies.find((item) => item.title === caseName);

  if (!caseStudy) {
    return <Navigate to="/404" />;
  }

  return (
    <Section crosses>
      <div className="container">
        <Heading
          title={caseName}
          tag={`Case study`}
          text={caseStudy.description}
        />
        <div className="mt-4 flex justify-center">
          <a
            href= {caseStudy.link} // Replace with your specific URL
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary"
          >
            Try Now
          </a>
        </div>
      </div>

      {/* Embedded SlideShare Presentation */}
      <div className="flex justify-center items-center w-full mt-8">
        <iframe
          src= {caseStudy.slideShow}
          className="w-full max-w-screen-xl h-[480px] md:h-[720px] rounded-lg shadow-lg"
          frameBorder="0"
          allowFullScreen
        >
          This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> presentation, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.
        </iframe>
      </div>

      {/* Optional: Image and embedded iframe */}
      {/* <div className="flex flex-col md:flex-row w-full p-8 gap-4">
        <img
          className="w-full md:w-2/5 h-auto rounded-2xl"
          src={PICTURE}
          alt="Michael Picture"
        />
        <div className="w-full md:w-3/5">
          <iframe
            src="https://www.slideshare.net/slideshow/embed_code/key/4CANGsyqn4SmlV?hostedIn=slideshare&page=upload"
            className="w-full h-[320px] md:h-[480px] rounded-2xl shadow-md"
            frameBorder="0"
            allowFullScreen
          >
            This is an embedded <a target="_blank" href="https://office.com">Microsoft Office</a> presentation, powered by <a target="_blank" href="https://office.com/webapps">Office</a>.
          </iframe>
        </div>
      </div> */}

      {caseName == "Michael" ? <RequestDemo /> : null}
    </Section>
  );
};

export default CaseDetail;
