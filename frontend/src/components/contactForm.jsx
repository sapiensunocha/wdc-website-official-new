import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import client from "../api/client";

const offices = [
  {
    name: "Austria Office",
    note: "Non-profit registered in Vienna · ZVR: 1671774845 · Steuernummer: 91 323/2005",
    address: "Wolf-Dietrich-Straße 32/4/2, 5020 Salzburg",
    phone: "(+43) 6603984436",
  },
  {
    name: "United States Office",
    note: "501(c)(3) non-profit · EIN: 33-1869013",
    address: "1660 Madison Avenue, 10029 New York",
    phone: "(+1) 7185212743",
  },
  {
    name: "Canada Office",
    note: "Non-profit organization · CRA: 721487825 RC 0001",
    address: "586 Prince Albert St, Ottawa, ON K1K1Y6",
    phone: "(+1) 8195130872",
  },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [pending, setPending] = useState(false);
  const form = useRef();

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error("All fields are required!");
      return false;
    }
    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setPending(true);
    client
      .post("/api/contact/create", formData)
      .then((res) => {
        setPending(false);
        if (res.data.success) {
          toast.success(res.data.message);
          setFormData({ firstName: "", lastName: "", email: "", message: "" });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setPending(false);
        toast.error(err.response?.data?.message || "Something went wrong.");
      });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 bg-white">
      {/* Left: Office locations */}
      <div className="w-full lg:w-2/5 bg-surface-subtle border-r border-gray-200 p-8 lg:p-12">
        <div className="h-1 w-12 bg-primary mb-6" />
        <h2 className="text-2xl font-bold text-content-primary mb-8">Our Offices</h2>
        <div className="space-y-8">
          {offices.map((office) => (
            <div key={office.name}>
              <h3 className="font-bold text-content-primary mb-1">{office.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{office.note}</p>
              <div className="space-y-1.5 text-sm text-content-secondary">
                <p className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-primary mt-0.5 shrink-0" />
                  {office.address}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-primary shrink-0" />
                  {office.phone}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-primary shrink-0" />
                  <a
                    href="mailto:office@worlddisastercenter.org"
                    className="text-primary hover:underline"
                  >
                    office@worlddisastercenter.org
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-3/5 p-8 lg:p-12">
        <div className="h-1 w-12 bg-primary mb-6" />
        <h2 className="text-2xl font-bold text-content-primary mb-8">Send Us a Message</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-content-secondary mb-1.5">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                name="first_name"
                type="text"
                placeholder="First Name"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-content-secondary mb-1.5">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                name="last_name"
                type="text"
                placeholder="Last Name"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-content-secondary mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              name="from_email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-content-secondary mb-1.5">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              name="message"
              rows="6"
              placeholder="Your Message"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={pending}
              className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded transition-colors duration-200 disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
