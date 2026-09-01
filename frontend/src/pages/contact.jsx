import React from "react";
import ContactForm from "../components/contactForm";
import Section from "../components/Section";
import Heading from "../components/Heading";
import AnimateIn from "../components/AnimateIn";
import SEOMeta from "../components/SEOMeta";

function ContactPage() {
  return (
    <>
      <SEOMeta
        title="Contact Us — World Disaster Center"
        description="Get in touch with the World Disaster Center. Reach our team for partnerships, media enquiries, expert deployment, or general questions."
        image="https://images.unsplash.com/photo-1594841343391-97ac1b9a950e?auto=format&fit=crop&w=1200&h=630&q=80"
        url="/contact"
      />
    <Section crosses>
        <div className="container">
          <AnimateIn variant="fadeUp">
            <Heading
              title="Contact Us"
              text={`Whether you're interested in collaborating with the World Disaster Center, have questions about our work, or wish to share feedback on our website, please don't hesitate to get in touch with us through phone, email, or the form below.`}
              tag="We would love to hear from you"
              className="mb-8"
              crosses
            />
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.15}>
            <ContactForm />
          </AnimateIn>
        </div>
    </Section>
    </>
  );
}

export default ContactPage;
