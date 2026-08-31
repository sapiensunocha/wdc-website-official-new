import { motion } from "framer-motion";
import WDCLogo from "../assets/images/wdclogobg.png";
import { Link } from "react-router-dom";
import { LinkedIn } from "@mui/icons-material";
import AnimateIn from "./AnimateIn";

const footerColumns = [
  {
    heading: "About Us",
    links: [
      { label: "About WDC", to: "/about" },
      { label: "Our Team", to: "/about/team" },
      { label: "Our Mission", to: "/about/mission" },
      { label: "Our Values", to: "/about/values" },
      { label: "Our Partners", to: "/about/partners" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    heading: "What We Do",
    links: [
      { label: "Tailored Solutions", to: "/solution" },
      { label: "Global Products", to: "/global-products" },
      { label: "Request a Demo", to: "/request-demo" },
      { label: "Membership", to: "/membership" },
    ],
  },
  {
    heading: "News & Media",
    links: [
      { label: "Newsroom & Media", to: "/media" },
      { label: "Latest News", to: "/news" },
      { label: "Events", to: "/events" },
      { label: "Newsletter", to: "/newsletter" },
    ],
  },
  {
    heading: "Intelligence",
    links: [
      { label: "Chat with Michael", to: "/michael-chat" },
      { label: "Disasters Tracker", to: "/trackers/disasters" },
      { label: "Aid Tracker", to: "/trackers/aid" },
      { label: "Climate Tracker", to: "/trackers/climate" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "WDC Shop", to: "/shop" },
      { label: "Campaigns", to: "/campaigns" },
      { label: "Donate", to: "/donate" },
      { label: "Become a Member", to: "/membership" },
      { label: "Partner With Us", to: "/partnerWithUs" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

function NewFooter() {
  return (
    <footer className="bg-[#1C2B39] text-white">
      {/* OCHA blue top stripe */}
      <div className="h-1 w-full bg-[#009EDB]" />

      <div className="container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">

          {/* Brand — spans 2 columns */}
          <AnimateIn variant="fadeUp" className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <motion.img
                src={WDCLogo}
                alt="World Disaster Center"
                className="h-14 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="leading-tight">
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-400">World Disaster</p>
                <p className="text-lg font-bold tracking-widest text-white">CENTER</p>
              </div>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed">
              Coordinating global disaster monitoring, early warning systems,
              and humanitarian response for a safer world.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                {
                  href: "https://x.com/W_D_Center?t=lmR5T5UpjDbOAHGOp3PnTg&s=09",
                  label: "X",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/company/worlddisastercenter",
                  label: "LinkedIn",
                  icon: <LinkedIn style={{ fontSize: 15 }} />,
                },
                {
                  href: "https://www.facebook.com/share/UE5DJq9PdZdmejjC/?mibextid=qi2Omg",
                  label: "Facebook",
                  icon: (
                    <svg className="w-3 h-3" viewBox="0 0 8 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.instagram.com/worlddisastercenter?igsh=MXQ1OHFzcjdhOTNnbg==",
                  label: "Instagram",
                  icon: (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.youtube.com/@WorldDisasterCenterOffice",
                  label: "YouTube",
                  icon: (
                    <svg className="w-3.5 h-3" viewBox="0 0 16 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.9191 1.10651C14.558 1.27906 15.0602 1.78251 15.2299 2.42069C15.5388 3.57887 15.5388 5.99687 15.5388 5.99687C15.5388 5.99687 15.5388 8.41487 15.2299 9.57306C15.0578 10.2136 14.5556 10.7171 13.9191 10.8872C12.7638 11.1969 8.12875 11.1969 8.12875 11.1969C8.12875 11.1969 3.49603 11.1969 2.33844 10.8872C1.69952 10.7147 1.19735 10.2112 1.0276 9.57306C0.71875 8.41487 0.71875 5.99687 0.71875 5.99687C0.71875 5.99687 0.71875 3.57887 1.0276 2.42069C1.1997 1.78015 1.70188 1.27669 2.33844 1.10651C3.49603 0.796875 8.12875 0.796875 8.12875 0.796875C8.12875 0.796875 12.7638 0.796875 13.9191 1.10651ZM10.4981 5.99687L6.6481 8.22578V3.76796L10.4981 5.99687Z" />
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#009EDB] flex items-center justify-center text-white transition-colors duration-200"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            <div className="pt-1">
              <motion.a
                href="https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#009EDB] hover:bg-[#0072BC] text-white text-sm font-bold px-6 py-2.5 rounded transition-colors duration-200"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Donate Now
              </motion.a>
            </div>
          </AnimateIn>

          {/* Link columns */}
          {footerColumns.map((col, colIndex) => (
            <AnimateIn key={col.heading} variant="fadeUp" delay={0.1 + colIndex * 0.08}>
              <div>
                <h5 className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gray-400 mb-5 pb-2 border-b border-white/10">
                  {col.heading}
                </h5>
                <ul className="space-y-2.5">
                  {col.links.map(({ label, to }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Office addresses */}
        <AnimateIn variant="fadeUp" delay={0.2}>
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { country: "United States", address: "1660 Madison Ave, New York 10029", reg: "EIN: 33-1869013" },
              { country: "Austria", address: "Wolf-Dietrich-Straße 32/4/2, 5020 Salzburg", reg: "Steuernummer: 91 323/2005" },
              { country: "Canada", address: "586 Prince Albert St, Ottawa ON K1K1Y6", reg: "CRA: 721487825 RC 0001" },
            ].map(({ country, address, reg }) => (
              <div key={country} className="flex gap-3">
                <div className="w-0.5 bg-[#009EDB] shrink-0 rounded-full" />
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">{country}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{address}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{reg}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              World Disaster Center
            </Link>
            {" "}· A 501(c)(3) tax-exempt organization
          </p>
          <div className="flex items-center gap-5">
            <Link to="/policy" className="hover:text-gray-300 transition-colors uppercase tracking-wider text-[10px]">
              Privacy Notice
            </Link>
            <Link to="/terms-conditions" className="hover:text-gray-300 transition-colors uppercase tracking-wider text-[10px]">
              Terms of Use
            </Link>
            <a
              href="mailto:office@worlddisastercenter.org"
              className="hover:text-gray-300 transition-colors"
            >
              office@worlddisastercenter.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default NewFooter;
