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
    <div className="min-h-screen bg-surface-subtle py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-primary" />
          <div className="p-8 lg:p-12">
            <div className="h-1 w-10 bg-primary mb-6" />
            <h1 className="text-2xl font-bold text-content-primary mb-2">Partner With WDC</h1>
            <p className="text-sm text-content-secondary mb-8">
              Join our global network and collaborate to strengthen disaster resilience worldwide.
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
  );
}
