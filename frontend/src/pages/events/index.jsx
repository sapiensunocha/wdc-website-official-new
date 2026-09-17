import { eventItemsUpcoming, eventItemsPast } from "../../assets/data/events";
import SEOMeta from "../../components/SEOMeta";
import Heading from "../../components/Heading";
import Section from "../../components/Section";
import { Link } from "react-router-dom";
import NewsLetter from "../../components/newsletter";
import { motion } from "framer-motion";
import AnimateIn from "../../components/AnimateIn";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function EventCard({ item, index, upcoming }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.13)" }}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
      style={{ border: upcoming ? "2px solid #009EDB" : "1px solid #e5e7eb" }}
    >
      {/* Image */}
      <div
        className="h-44 sm:h-52 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        {upcoming && (
          <span
            className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
            style={{ background: "#009EDB", color: "#fff", letterSpacing: "0.1em" }}
          >
            Upcoming
          </span>
        )}
        {!upcoming && (
          <span
            className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
            style={{ background: "rgba(0,0,0,0.55)", color: "#fff", letterSpacing: "0.08em" }}
          >
            Past Event
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-lg font-bold mb-2 leading-snug"
          style={{ color: "#001129" }}
        >
          {item.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
          {item.description}
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-auto">
          <Link
            to={`/Events/${item.title}`}
            state={{ item }}
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-lg text-white min-h-[42px]"
            style={{ background: upcoming ? "#009EDB" : "#001129" }}
          >
            {upcoming ? "View Details →" : "See More →"}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

const Events = () => {
  return (
    <>
      <SEOMeta
        title="Humanitarian Events, Conferences & Summits"
        description="WDC events, conferences, and summits on disaster risk reduction, AI early warning, climate resilience, and humanitarian response — across 142 countries. Upcoming and past events."
        url="/events"
        keywords="humanitarian events, disaster management conference, DRR summit, climate resilience event, NGO conference, humanitarian summit, early warning conference, WDC events"
      />
      {/* ── UPCOMING ── */}
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

          {eventItemsUpcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {eventItemsUpcoming.map((item, i) => (
                <EventCard key={i} item={item} index={i} upcoming />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-12">No upcoming events scheduled. Check back soon.</p>
          )}

          {/* ── DIVIDER ── */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gray-200" />
            <span
              className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: "#F5F5F7", color: "#6b7280", letterSpacing: "0.12em" }}
            >
              Past Events
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── PAST ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {eventItemsPast.map((item, i) => (
              <EventCard key={i} item={item} index={i} upcoming={false} />
            ))}
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
