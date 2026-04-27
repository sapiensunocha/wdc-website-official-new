import React, { useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "./Button";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(localStorage.getItem("cookieConsent"));

  const handleAccept = () => {
    setShowBanner(false);
    // Save the user's consent in localStorage 
    localStorage.setItem("cookieConsent", "true");
  };

  const handleDismiss = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="  fixed z-10 bottom-0 left-0 w-full bg-primary-dark text-white py-4 flex items-center justify-center px-4">
        <div className="container flex">
           <p className="text-center ">
                    We use cookies to provide you with the best possible experience on our website.
                    By continuing to browse, you agree to our use of cookies. For more information,
                    review our <a href="/privacy-policy" className="underline text-white">Privacy Policy</a>.
            </p>
      <Button
        variant="contained"
        onClick={handleAccept}
        white
      >
        Accept
      </Button>
      <IconButton color="inherit" onClick={handleDismiss} className="ml-2">
        <CloseIcon />
      </IconButton>
      </div>

    </div>
  );
};

export default CookieConsent;