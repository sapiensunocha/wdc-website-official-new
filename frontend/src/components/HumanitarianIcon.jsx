import {
  MapPin, FileText, Handshake, Megaphone, Briefcase, BarChart2,
  Satellite, Landmark, CreditCard, School, Link2, Laptop,
  ScrollText, TrendingUp, FlaskConical, Brain, Coins, Scale,
  Shield, Flag, Building2, Star, Telescope, Tent, Wheat, Sprout,
  GraduationCap, Globe, Hospital, Zap, Accessibility, Home,
  AlertTriangle, Bell, Users2, Baby, Earth, LockKeyhole,
  MonitorSmartphone,
} from "lucide-react";

const ICON_MAP = {
  "🗺️": MapPin,
  "📋": FileText,
  "🤝": Handshake,
  "📣": Megaphone,
  "💼": Briefcase,
  "📊": BarChart2,
  "📄": FileText,
  "📡": Satellite,
  "🏛️": Landmark,
  "💳": CreditCard,
  "🏫": School,
  "🔗": Link2,
  "💻": Laptop,
  "📜": ScrollText,
  "📢": Megaphone,
  "📈": TrendingUp,
  "🔬": FlaskConical,
  "🧠": Brain,
  "💰": Coins,
  "⚖️": Scale,
  "🛡️": Shield,
  "🏳️": Flag,
  "🏢": Building2,
  "⭐": Star,
  "🔭": Telescope,
  "🏕️": Tent,
  "🌾": Wheat,
  "🌱": Sprout,
  "🎓": GraduationCap,
  "🌐": Globe,
  "🏥": Hospital,
  "⚡": Zap,
  "♿": Accessibility,
  "🏘️": Home,
  "⚠️": AlertTriangle,
  "🔔": Bell,
  // Campaign identity icons
  "👩": Users2,
  "👶": Baby,
  "🏠": Home,
  "👩‍💻": MonitorSmartphone,
  "🌍": Earth,
  "🔐": LockKeyhole,
};

const HumanitarianIcon = ({ icon, size = 18, className = "", style }) => {
  const LucideIcon = ICON_MAP[icon];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={className} style={style} />;
};

export default HumanitarianIcon;
