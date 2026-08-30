import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
// Correct relative path for your horizontal logo asset
import WDC_HORIZ_Logo from "../assets/images/WDC-HORIZ-logo.png";

// Exactly mirroring UNOCHA navigation structure
const navItems = [
  {
    title: "About Us",
    items: [
      { label: "About WDC", to: "/about" },
      { label: "Our Team", to: "/about/team" },
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
      { label: "Our Services", to: "/services" },
      { label: "Training Academy", to: "/training" },
      { label: "Reports & Documents", to: "/reports" },
      { label: "Request a Demo", to: "/request-demo" },
    ],
  },
  {
    title: "Where We Work",
    items: [
      { label: "All Regions", to: "/where-we-work" },
      { label: "Impact & Coverage", to: "/impact" },
      { label: "Africa", to: "/where-we-work/africa" },
      { label: "Americas", to: "/where-we-work/americas" },
      { label: "Asia", to: "/where-we-work/asia" },
      { label: "Europe", to: "/where-we-work/europe" },
    ],
  },
  {
    title: "News & Media",
    items: [
      { label: "Newsroom & Media", to: "/media" },
      { label: "Latest News", to: "/news" },
      { label: "Events", to: "/events" },
      { label: "Newsletter", to: "/newsletter" },
    ],
  },
  {
    title: "Get Involved",
    items: [
      { label: "Expert Roster", to: "/roster" },
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

function SignInDropdown() {
  const [open, setOpen] = useState(false);
  const ref = { current: null };

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const portals = [
    { label: "Disaster Heroes", to: "/disaster-heroes/login", desc: "Heroes member portal" },
    { label: "Expert Roster",   to: "/roster/login",          desc: "Deployment roster" },
    { label: "My Account",      to: "/signin",                desc: "General account" },
  ];

  return (
    <div className="relative" ref={(el) => (ref.current = el)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-xs font-semibold"
      >
        Sign In <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg border-t-2 border-[#009EDB] z-50 rounded-b-sm">
          {portals.map((p) => (
            <Link key={p.label} to={p.to}
              onClick={() => setOpen(false)}
              className="flex flex-col px-4 py-3 hover:bg-[#E8F5FC] transition-colors border-b border-gray-100 last:border-0">
              <span className="text-sm font-semibold text-gray-800">{p.label}</span>
              <span className="text-xs text-gray-400 mt-0.5">{p.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-lg" : "border-b border-gray-200"}`}>
      {/* ── Slim utility top bar (UNOCHA style) ── */}
      <div className="bg-[#1C2B39] text-white">
        <div className="container flex items-center justify-between py-1.5 text-xs">
          <span className="text-gray-300 tracking-wide hidden sm:block">
            World Disaster Center &mdash; Monitoring. Alerting. Protecting.
          </span>
          <div className="flex items-center gap-3">
            {/* Social follow icons */}
            {[
              { href: "https://www.linkedin.com/company/worlddisastercenter", label: "LinkedIn",
                icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { href: "https://x.com/W_D_Center", label: "X",
                icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M11.321 8.937L16.492 3.056H15.267l-4.49 5.106L7.191 3.056H3.056l5.422 7.721L3.056 16.945h1.225l4.741-5.393 3.787 5.393h4.136L11.32 8.937zm-1.678 1.908-.549-.769-4.371-6.118h1.882l3.528 4.938.549.769 4.585 6.419H13.385L9.643 10.845z"/></svg> },
              { href: "https://www.instagram.com/worlddisastercenter/", label: "Instagram",
                icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg> },
              { href: "https://www.youtube.com/@WorldDisasterCenterOffice", label: "YouTube",
                icon: <svg className="w-3.5 h-3" fill="currentColor" viewBox="0 0 16 12"><path fillRule="evenodd" d="M13.919 1.107C14.558 1.279 15.06 1.783 15.23 2.421 15.539 3.579 15.539 6 15.539 6s0 2.415-.31 3.573c-.17.638-.671 1.142-1.31 1.314C12.764 11.197 8.129 11.197 8.129 11.197s-4.633 0-5.79-.31a1.857 1.857 0 0 1-1.31-1.314C.718 8.415.718 6 .718 6S.718 3.579 1.028 2.421C1.2 1.78 1.702 1.277 2.338 1.107 3.496.797 8.129.797 8.129.797s4.635 0 5.79.31zm-3.421 4.89L6.648 8.226V3.768l3.85 2.229z"/></svg> },
            ].map(({ href, label, icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Follow WDC on ${label}`}
                className="text-gray-400 hover:text-[#009EDB] transition-colors">
                {icon}
              </a>
            ))}
            <span className="w-px h-3 bg-white/20 hidden sm:block" />
            <a href="mailto:office@worlddisastercenter.org" className="text-gray-300 hover:text-white transition-colors hidden md:block">
              office@worlddisastercenter.org
            </a>
            <SignInDropdown />
          </div>
        </div>
      </div>

      {/* ── OCHA blue accent stripe ── */}
      <div className="h-0.5 w-full bg-[#418FDE]" />

      {/* ── Main navigation bar ── */}
      <div className={`container flex items-center justify-between transition-all duration-300 ${scrolled ? "py-1.5" : "py-3"}`}>
        
        {/* ── UPDATED LOGO: Horizontal WDC Logo with Hover Effect ── */}
        <Link to="/" className="flex items-center shrink-0 transition-opacity hover:opacity-80">
          <img
            src={WDC_HORIZ_Logo}
            alt="World Disaster Center"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-8" : "h-12"}`}
          />
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
            className="bg-[#418FDE] hover:bg-[#005b9f] text-white text-sm font-bold px-5 py-2 rounded-sm transition-colors duration-200"
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