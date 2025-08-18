import { newsItems, newsItemsSpecial } from "../../assets/data/news";
import Heading from "../../components/Heading";
import Section from "../../components/Section";
import { Link } from "react-router-dom";
import NewsLetter from "../../components/newsletter";

const News = () => {
  return (
    <>
      <Section crosses>
        <div className="container">
          <Heading
            title="Latest News"
            tag="World Disaster Center"
            className="mb-8"
            crosses
          />

          <div className="container">
            {/* Updated grid to be responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItemsSpecial.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white mb-4 rounded-lg shadow-md overflow-hidden`}
                >
                  <div
                    className="h-52 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="p-4">
                    <h3 className="text-xl text-n-4 font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <Link
                      to={`/News/${item.title}`}
                      state={{ item }}
                      className="inline-block mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      See More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="container">
          <NewsLetter />
        </div>
      </Section>
    </>
  );
};

export default News;
