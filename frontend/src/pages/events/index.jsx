import { eventItems, eventItemsSpecial } from "../../assets/data/events";
import Heading from "../../components/Heading";
import Section from "../../components/Section";
import { Link } from "react-router-dom";
import NewsLetter from "../../components/newsletter";
import { motion } from "framer-motion";
import AnimateIn from "../../components/AnimateIn";

const Events = () => {
  return (
    <>
      <Section crosses>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <Heading
              title="Upcoming Events"
              tag="World Disaster Center"
              className="mb-8"
              crosses
            />
          </AnimateIn>

          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {eventItemsSpecial.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white mb-4 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                >
                  <div
                    className="h-36 sm:h-44 md:h-52 bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="p-4">
                    <h3 className="text-xl text-content-secondary font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-4">
                      <Link
                        to={`/Events/${item.title}`}
                        state={{ item }}
                        className="inline-flex items-center px-4 py-2.5 text-white bg-primary rounded hover:bg-primary min-h-[44px]"
                      >
                        See More
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
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

export default Events;
