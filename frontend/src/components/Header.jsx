import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Menu, X, Search } from "lucide-react";
import PropTypes from "prop-types";
// Correct relative path for your horizontal logo asset
import WDC_HORIZ_Logo from "../assets/images/WDC-HORIZ-logo.png";

// Exactly mirroring UNOCHA navigation structure
const navItems = [
  {
    title: "About Us",
    items: [
      { label: "About WDC", to: "/about" },
      { label: "Our Mission", to: "/about/mission" },
      { label: "Our Values", to: "/about/values" },
      { label: "Our Partners", to: "/about/partners" },
    ],
  },
  {
    title: "What We Do",
    items: [
      { label: "Tailored Solutions", to: "/solution" },
      { label: "Global Products", to: "/global-products" },
      { label: "Request a Demo", to: "/request-demo" },
    ],
  },
  {
    title: "Where We Work",
    items: [
      { label: "Impact & Coverage", to: "/impact" },
      { label: "Africa", to: "/where-we-work/africa" },
    ],
  },
  {
    title: "News & Media",
    items: [
      { label: "Latest News", to: "/news" },
      { label: "Events", to: "/events" },
      { label: "Newsletter", to: "/newsletter" },
    ],
  },
  {
    title: "Get Involved",
    items: [
      { label: "Membership", to: "/membership" },
      { label: "Donate", href: "https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE" },
      { label: "Partner With Us", to: "/partnerWithUs" },
      { label: "Careers", to: "/careers" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

function NavDropdown({ title, items, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useState(() => {
    const el = { current: null };
    return el;
  })[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref]);

  return (
    <div className="relative" ref={(el) => (ref.current = el)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-0.5 px-3 py-2 text-sm font-semibold rounded-sm transition-colors ${
          open ? "text-[#418FDE] bg-[#E8F5FC]" : "text-gray-700 hover:text-[#418FDE] hover:bg-[#E8F5FC]"
        }`}
      >
        {title}
        {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-56 bg-white shadow-lg border-t-2 border-[#418FDE] z-50 animate-fade-in">
          <ul>
            {items.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-700 hover:bg-[#E8F5FC] hover:text-[#418FDE] transition-colors"
                    onClick={() => { setOpen(false); onClose && onClose(); }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#418FDE] shrink-0" />
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.to}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-700 hover:bg-[#E8F5FC] hover:text-[#418FDE] transition-colors"
                    onClick={() => { setOpen(false); onClose && onClose(); }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#418FDE] shrink-0" />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Added PropTypes validation for NavDropdown
NavDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
  onClose: PropTypes.func,
};

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-md" : "border-b border-gray-200"}`}>
      {/* ── Slim utility top bar (UNOCHA style) ── */}
      <div className="bg-[#1C2B39] text-white">
        <div className="container flex items-center justify-between py-1.5 text-xs">
          <span className="text-gray-300 tracking-wide">
            World Disaster Center &mdash; Monitoring. Alerting. Protecting.
          </span>
          <div className="flex items-center gap-4">
            <a href="mailto:office@worlddisastercenter.org" className="text-gray-300 hover:text-white transition-colors hidden sm:block">
              office@worlddisastercenter.org
            </a>
            <Link to="/signin" className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* ── OCHA blue accent stripe ── */}
      <div className="h-0.5 w-full bg-[#418FDE]" />

      {/* ── Main navigation bar ── */}
      <div className="container flex items-center justify-between py-3">
        
        {/* ── UPDATED LOGO: Horizontal WDC Logo with Hover Effect ── */}
        <Link to="/" className="flex items-center shrink-0 transition-opacity hover:opacity-80">
          <img src={WDC_HORIZ_Logo} alt="World Disaster Center" className="w-auto h-12" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <Link
            to="/"
            className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#418FDE] hover:bg-[#E8F5FC] rounded-sm transition-colors"
          >
            Home
          </Link>
          {navItems.map((item) => (
            <NavDropdown key={item.title} title={item.title} items={item.items} />
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-[#418FDE] hover:bg-[#E8F5FC] rounded-sm transition-colors" aria-label="Search">
            <Search size={18} />
          </button>
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE"
            target="_blank"
            rel="noreferrer"
            className="bg-[#418FDE] hover:bg-[#005b9f] text-white text-sm font-bold px-5 py-2 rounded-sm transition-colors duration-200 ml-1"
          >
            Donate
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-auto p-2 text-gray-700 hover:text-[#418FDE]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[75vh] overflow-y-auto">
          <div className="container py-3 flex flex-col">
            <Link
              to="/"
              className="px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-[#E8F5FC] hover:text-[#418FDE] rounded-sm"
            >
              Home
            </Link>

            {navItems.map((group) => (
              <div key={group.title}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === group.title ? null : group.title)}
                  className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-[#E8F5FC] hover:text-[#418FDE] rounded-sm"
                >
                  {group.title}
                  {mobileExpanded === group.title ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                </button>
                {mobileExpanded === group.title && (
                  <div className="bg-gray-50 border-l-2 border-[#418FDE] ml-4">
                    {group.items.map((item) =>
                      item.href ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#418FDE] transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="block px-5 py-2.5 text-sm text-gray-600 hover:text-[#418FDE] transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 px-4">
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=XXS7D6VJDM2YE"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center bg-[#418FDE] hover:bg-[#005b9f] text-white text-sm font-bold py-2.5 rounded-sm transition-colors"
              >
                Donate
              </a>
              <Link
                to="/membership"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center border border-[#418FDE] text-[#418FDE] hover:bg-[#E8F5FC] text-sm font-bold py-2.5 rounded-sm transition-colors"
              >
                Membership
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;