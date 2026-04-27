import React from "react";

const OurValues = () => {
  return (
    <>
      <section className="bg-gray-2 pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="grid gap-6 justify-center sm:grid-cols-1 lg:grid-cols-3">
            <SingleCard
              image="https://img.freepik.com/free-photo/global-connections-background-social-media-banner_53876-108500.jpg?t=st=1718806487~exp=1718810087~hmac=43c2a14c69c3bd5820b0f161ad65691361648901c4b98fe978984836b5b8fa94&w=1380"
              CardTitle="Global Reach and Accessibility"
              titleHref="/#"
              btnHref="/#"
              CardDescription="Extend the reach of our innovative disaster management solutions to every corner of the globe, particularly focusing on undeserved regions. We aim to ensure that no community is left vulnerable or unprepared, fostering a universally inclusive approach to disaster resilience."
              Button={null}
            />
            <SingleCard
              image="https://img.freepik.com/free-photo/rpa-concept-with-blurry-hand-touching-screen_23-2149311914.jpg?t=st=1718806571~exp=1718810171~hmac=81225e0777cd80f1ced16762c7155bd8d73bfb992390f53b0fc45d0024a2d68d&w=1380"
              CardTitle="Integration of Cutting-Edge Technology"
              CardDescription="Pioneer the integration of advanced technologies, such as artificial intelligence, big data analytics, and satellite imagery, into practical disaster management strategies. By doing so, we strive to enhance the precision of disaster forecasts, the effectiveness of responses, and the efficiency of recovery efforts."
              Button={null}
            />
            <SingleCard
              image="https://img.freepik.com/free-photo/entrepreneurs-meeting-office_23-2148898688.jpg?t=st=1718806694~exp=1718810294~hmac=8705cb152a8738c6571d723e5841ba1d89bf23af9a18f7dca8cec58898275c5a&w=1380"
              CardTitle="Empowerment Through Education and Training"
              CardDescription="Equip individuals and communities with the training and resources needed to not only survive disasters but to thrive in their aftermath. Our educational programs focus on building local capacities, enhancing self-sufficiency, and promoting sustainable practices that contribute to long-term resilience."
              Button={null}
            />
            <SingleCard
              image="https://img.freepik.com/free-photo/business-concept-with-team-close-up_23-2149151159.jpg?t=st=1718806778~exp=1718810378~hmac=18fcc61f1d39f3762ec32aca8bc298bdb0f24982e322dbdcd5415a8f2be40c33&w=1380"
              CardTitle="Collaborative Innovation"
              CardDescription=" Foster a collaborative ecosystem that brings together the best minds from technology, academia, humanitarian sectors, and local governments. This network will innovate on scalable solutions that address both immediate disaster response needs and long-term recovery plans."
              Button={null}
            />
            <SingleCard
              image="https://img.freepik.com/free-photo/business-leader-reading-checking-agreement-text_74855-1147.jpg?t=st=1718806841~exp=1718810441~hmac=2e836bf2fb03976721f834cd8c9eb58b584534a434630579fb6c1b93049cb7c3&w=1380"
              CardTitle="Advocacy for Proactive Policies"
              CardDescription=" Influence global policies and frameworks that support proactive disaster risk reduction, climate change adaptation, and resilient infrastructural development. We advocate for policies that prioritize human safety, environmental sustainability, and economic stability, ensuring that disaster risk management is integrated into all aspects of global and national development strategies."
              Button={null}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default OurValues;

const SingleCard = ({
  image,
  Button,
  CardDescription,
  CardTitle,
  titleHref,
  btnHref,
}) => {
  return (
    <>
      {/*  */}
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <img src={image} alt="" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              href={titleHref ? titleHref : "/#"}
              style={{ color: "#00004b" }}
              className="mb-4 block text-xl font-semibold text-content-primary hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color text-gray-900">
            {CardDescription}
          </p>

          {Button && (
            <a
              href={btnHref ? btnHref : "#"}
              className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
            >
              {Button}
            </a>
          )}
        </div>
      </div>
      {/*  */}
    </>
  );
};
