// Crisis cases are submitted by verified organizations and WDC field teams.
// This file exports an empty array — all real cases come from the backend API.
// See /api/disaster-heroes/cases

export const CRISIS_CASES = [];

export const HERO_BADGES = [
  { id: "first_spark",   label: "First Spark",    icon: "✨", desc: "Made your first sponsorship",           color: "#F59E0B", condition: "1 active sponsorship" },
  { id: "shield_bearer", label: "Shield Bearer",  icon: "🛡️", desc: "Supported a case for 3 months",         color: "#3B82F6", condition: "3 consecutive months" },
  { id: "rescue_angel",  label: "Rescue Angel",   icon: "🕊️", desc: "Sponsored 3 different cases",           color: "#8B5CF6", condition: "3 total cases" },
  { id: "guardian",      label: "Guardian",       icon: "🏛️", desc: "6 months of continuous support",        color: "#10B981", condition: "6 consecutive months" },
  { id: "steadfast",     label: "Steadfast",      icon: "⚓",  desc: "Supported a case through full goal",    color: "#006FEE", condition: "Case goal completed" },
  { id: "legendary",     label: "Legendary",      icon: "🌟", desc: "One year of consistent giving",         color: "#F97316", condition: "12 consecutive months" },
  { id: "lifesaver",     label: "Lifesaver",      icon: "❤️", desc: "Sponsored 10+ people or families",     color: "#EF4444", condition: "10 total sponsorships" },
];
