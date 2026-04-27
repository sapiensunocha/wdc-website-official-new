import React from 'react';

const WDCLogo = ({ className }) => (
  <svg viewBox="0 0 450 120" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Swirling Globe Icon */}
    <g transform="translate(10, 15)" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round">
      {/* Central Globe */}
      <circle cx="55" cy="55" r="22" fill="currentColor" stroke="none" />
      {/* S-curve negative space to mimic the continent shape */}
      <path d="M 45 35 Q 75 55 50 77" stroke="#ffffff" strokeWidth="5" />
      <path d="M 50 77 Q 40 85 45 90" stroke="#ffffff" strokeWidth="5" />

      {/* Top Ring */}
      <path d="M 22 55 C 5 25, 35 5, 85 20" />
      {/* Middle Ring */}
      <path d="M 12 75 C 20 110, 80 95, 95 65" />
      {/* Bottom Ring */}
      <path d="M 35 100 C 60 115, 85 105, 98 88" />
      {/* Left side dash */}
      <path d="M 4 58 Q 8 68 12 75" />
    </g>

    {/* WORLD DISASTER Text */}
    <text
      x="130"
      y="45"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="700"
      fontSize="30"
      letterSpacing="0.09em"
      fill="currentColor"
    >
      WORLD DISASTER
    </text>

    {/* CENTER Text */}
    <text
      x="127"
      y="102"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="68"
      letterSpacing="0.06em"
      fill="currentColor"
    >
      CENTER
    </text>
  </svg>
);

export default WDCLogo;