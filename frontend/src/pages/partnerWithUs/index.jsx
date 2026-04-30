import { useRef, useState } from "react";
import { toast } from "react-toastify";
import client from "../../api/client";

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors";
const labelClass = "block text-sm font-semibold text-content-secondary mb-1.5";

export default function PartnerWithUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organizationName: "",
    organizationWebsite: "",
    partnershipInterests: "",
    message: "",
  });
  const [pending, setPending] = useState(false);
  const form = useRef();

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.organizationName ||
      !formData.partnershipInterests
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setPending(true);
    client
      .post("/api/organization/create", formData)
      .then((res) => {
        setPending(false);
        if (res.data.success) {
          toast.success(res.data.message);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            organizationName: "",
            organizationWebsite: "",
            partnershipInterests: "",
            message: "",
          });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setPending(false);
        toast.error(err.message || "Something went wrong.");
      });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-xs font-black uppercase tracking-widest bg-white/20 text-white rounded mb-4">
            Partnership
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Partner With WDC</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Join our global network of governments, NGOs, academic institutions, and private sector leaders working together to build a more disaster-resilient world.
          </p>
        </div>
      </div>

      {/* Why partner */}
      <div className="bg-surface-subtle py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-content-primary text-center mb-10">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌍",
                title: "Global Network",
                desc: "Access to a worldwide ecosystem of disaster management professionals, policymakers, and humanitarian organizations across 60+ countries.",
              },
              {
                icon: "📡",
                title: "Cutting-Edge Technology",
                desc: "Co-develop AI-powered early warning systems, real-time monitoring dashboards, and data platforms built for humanitarian impact.",
              },
              {
                icon: "📚",
                title: "Joint Training & Capacity",
                desc: "Design and deliver training programs that strengthen disaster preparedness at national, regional, and community levels.",
              },
              {
                icon: "🔬",
                title: "Research & Innovation",
                desc: "Collaborate on applied research, publications, and pilots that advance the field of disaster risk reduction.",
              },
              {
                icon: "🤝",
                title: "Shared Advocacy",
                desc: "Amplify your voice in global policy arenas including the UN, African Union, and regional platforms.",
              },
              {
                icon: "📈",
                title: "Visibility & Impact",
                desc: "Be featured in WDC reports, events, and media as a recognized leader in disaster resilience.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded border border-gray-200 p-6 flex flex-col gap-3">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-bold text-content-primary">{item.title}</h3>
                <p className="text-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner types */}
      <div className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-content-primary text-center mb-2">Who Can Partner With Us?</h2>
          <p className="text-center text-content-secondary mb-10">We welcome organizations from all sectors committed to saving lives and building resilience.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Governments & Ministries", "UN Agencies", "International NGOs", "Academic Institutions", "Private Sector & Tech", "Media & Communications", "Faith-Based Organizations", "Community Networks"].map((t) => (
              <div key={t} className="border border-primary/30 rounded px-4 py-3 text-center text-sm font-semibold text-primary bg-primary-muted">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact note */}
      <div className="bg-surface-subtle py-8 px-4 text-center">
        <p className="text-content-secondary text-sm mb-1">Prefer to reach us directly? Send an email to:</p>
        <a href="mailto:office@worlddisastercenter.org" className="text-primary font-bold text-base hover:underline">
          office@worlddisastercenter.org
        </a>
      </div>

      {/* Form */}
      <div className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-primary" />
          <div className="p-8 lg:p-12">
            <div className="h-1 w-10 bg-primary mb-6" />
            <h1 className="text-2xl font-bold text-content-primary mb-2">Start the Conversation</h1>
            <p className="text-sm text-content-secondary mb-8">
              Fill in the form below and our partnerships team will get back to you within 3 business days.
            </p>

            <form ref={form} onSubmit={submitForm} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    name="from_email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    name="company"
                    type="text"
                    placeholder="Your Organization"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Organization Website</label>
                  <input
                    value={formData.organizationWebsite}
                    onChange={(e) => setFormData({ ...formData, organizationWebsite: e.target.value })}
                    name="website"
                    type="text"
                    placeholder="https://yourorg.org"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Partnership Interests <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formData.partnershipInterests}
                    onChange={(e) => setFormData({ ...formData, partnershipInterests: e.target.value })}
                    name="interests"
                    type="text"
                    placeholder="How you want to collaborate"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  name="message"
                  rows="5"
                  placeholder="Tell us about your organization and goals"
                  className={`${inputClass} resize-none`}
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
      </div>
      </div>
    </div>
  );
}
