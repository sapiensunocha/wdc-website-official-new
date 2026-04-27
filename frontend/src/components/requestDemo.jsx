import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa"; 
import { MdPeople } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function RequestDemo() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [pending, setPending] = useState(false);
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();
    setPending(true);
    // toast.success("hello");
    // return
    // console.log("working")
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((result) => {
        setPending(false);
        toast.success(
          "Michael app Request sent, we will send a Demo to your email after review",
          { theme: "dark" }
        );
        setEmail("");
        setName("");
        setOrganization("");
        navigate("/");
      })
      .catch((err) => {
        // console.log(err)
        setPending(false);
        toast.error(err.text);
      });
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
              
              <span className="text-red-600">Michael</span> Demo Request{" "}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">
              Michael monitors various types of disasters
              worldwide including earthquakes, hurricanes, floods,
              wildfires, and industrial accidents. It aggregates data from
              multiple sources such as satellite imagery, weather stations,
              seismic sensors, and social media feeds to provide real-time
              alerts and advanced analytics.
            </p>
            <form ref={form} onSubmit={sendEmail}>
              <div
                className=" items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0 gap-2"
                style={{ display: "grid" }}
              >
                <div className="relative w-full">
                  <label
                    htmlFor="name"
                    className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Full Name
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <FaUser className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your full name"
                    type="text"
                    id="name"
                    name="from_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="relative w-full">
                  <label
                    htmlFor="organization"
                    className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Organization
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <MdPeople className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-00 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Organization name (Optional)"
                    type="text"
                    id="organization"
                    name="from_organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>

                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Email address
                  </label>

                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    className="block  p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    name="from_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={pending}
                    className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border border-primary cursor-pointer bg-primary sm:rounded-none sm:rounded-r-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {pending ? " Submiting..." : "Submit"}
                  </button>
                </div>
              </div>
              {/* <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
                We care about the protection of your data.{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read our Privacy Policy
                </a>
                .
              </div> */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RequestDemo;
