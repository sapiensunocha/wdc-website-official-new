import React from "react";
import ContactForm from "../components/contactForm";
import Section from "../components/Section";
import Heading from "../components/Heading";
import AnimateIn from "../components/AnimateIn";

function ContactPage() {
  return (
    <>
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
