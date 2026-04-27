import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const DropdownItem = ({ title, routings, setOpenNavigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={popupRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className={`inline-flex items-center gap-0.5 px-3 py-2 text-sm font-semibold rounded transition-colors ${
          isOpen
            ? "text-primary bg-primary-muted"
            : "text-gray-700 hover:text-primary hover:bg-primary-muted"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        {isOpen ? (
          <ExpandLess fontSize="small" />
        ) : (
          <ExpandMore fontSize="small" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute left-0 z-50 mt-1 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/10 animate-fade-in"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Blue top accent */}
          <div className="h-0.5 w-full bg-primary rounded-t-md" />
          <div className="py-2">
            {Object.entries(routings).map(([item, path], index) => (
              <Link
                key={index}
                to={path}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-muted hover:text-primary transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  setOpenNavigation && setOpenNavigation(false);
                }}
                role="menuitem"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
