import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import PaypalComponent from "../../components/paypal";
import DonationSteps from "../../components/DonationSteps";
import DonationSection from "../../components/donationSection";

export default function DonorsPage() {
  const [email, setEmail] = useState();
  const [pending, setPending] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setPending(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((result) => {
        setPending(false);
        toast.success("Message sent", { theme: "dark" });
        setEmail("");
      })
      .catch((err) => {
        // console.log(err)
        setPending(false);
        toast.error(err.text);
      });
  };

  return (
    <>
    <DonationSection/>
    </>
  );
  
}
