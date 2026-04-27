const VALUES = [
  {
    image: "https://img.freepik.com/free-photo/global-connections-background-social-media-banner_53876-108500.jpg?t=st=1718806487~exp=1718810087~hmac=43c2a14c69c3bd5820b0f161ad65691361648901c4b98fe978984836b5b8fa94&w=1380",
    title: "Global Reach and Accessibility",
    description: "Extend the reach of our innovative disaster management solutions to every corner of the globe, particularly focusing on underserved regions. We aim to ensure that no community is left vulnerable or unprepared, fostering a universally inclusive approach to disaster resilience.",
  },
  {
    image: "https://img.freepik.com/free-photo/rpa-concept-with-blurry-hand-touching-screen_23-2149311914.jpg?t=st=1718806571~exp=1718810171~hmac=81225e0777cd80f1ced16762c7155bd8d73bfb992390f53b0fc45d0024a2d68d&w=1380",
    title: "Integration of Cutting-Edge Technology",
    description: "Pioneer the integration of advanced technologies — AI, big data analytics, and satellite imagery — into practical disaster management strategies. By doing so, we strive to enhance the precision of disaster forecasts, the effectiveness of responses, and the efficiency of recovery efforts.",
  },
  {
    image: "https://img.freepik.com/free-photo/entrepreneurs-meeting-office_23-2148898688.jpg?t=st=1718806694~exp=1718810294~hmac=8705cb152a8738c6571d723e5841ba1d89bf23af9a18f7dca8cec58898275c5a&w=1380",
    title: "Empowerment Through Education and Training",
    description: "Equip individuals and communities with the training and resources needed to not only survive disasters but to thrive in their aftermath. Our educational programs focus on building local capacities, enhancing self-sufficiency, and promoting sustainable practices that contribute to long-term resilience.",
  },
  {
    image: "https://img.freepik.com/free-photo/business-concept-with-team-close-up_23-2149151159.jpg?t=st=1718806778~exp=1718810378~hmac=18fcc61f1d39f3762ec32aca8bc298bdb0f24982e322dbdcd5415a8f2be40c33&w=1380",
    title: "Collaborative Innovation",
    description: "Foster a collaborative ecosystem that brings together the best minds from technology, academia, humanitarian sectors, and local governments. This network will innovate on scalable solutions that address both immediate disaster response needs and long-term recovery plans.",
  },
  {
    image: "https://img.freepik.com/free-photo/business-leader-reading-checking-agreement-text_74855-1147.jpg?t=st=1718806841~exp=1718810441~hmac=2e836bf2fb03976721f834cd8c9eb58b584534a434630579fb6c1b93049cb7c3&w=1380",
    title: "Advocacy for Proactive Policies",
    description: "Influence global policies and frameworks that support proactive disaster risk reduction, climate change adaptation, and resilient infrastructural development. We advocate for policies that prioritize human safety, environmental sustainability, and economic stability.",
  },
];

const OurValues = () => {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container">
        <p className="tagline text-primary mb-2">What Guides Us</p>
        <h2 className="text-3xl font-bold text-content-primary mb-10 sm:text-4xl">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-lg font-bold text-content-primary leading-snug">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-content-secondary">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
