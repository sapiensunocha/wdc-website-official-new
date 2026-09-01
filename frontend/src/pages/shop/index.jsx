import { useState } from "react";
import { motion } from "framer-motion";
import SEOMeta from "../../components/SEOMeta";
import { Link } from "react-router-dom";
import { ShoppingBag, Package, ExternalLink, Tag, Star, Shield, Truck, Heart, ArrowRight, BookOpen, Globe, Zap, Shirt, Coffee, FileText, Map, Cpu } from "lucide-react";
import AnimateIn from "../../components/AnimateIn";
import WDCLogo from "../../assets/images/wdclogobg.png";

const SKYHOL_BASE = "https://skyhol.com"; // Skyhol marketplace base URL

const categories = [
  { id: "all",      label: "All Products" },
  { id: "apparel",  label: "Apparel" },
  { id: "gear",     label: "Field Gear" },
  { id: "digital",  label: "Digital" },
  { id: "awareness",label: "Awareness" },
];

const products = [
  // ── Apparel ──────────────────────────────────────────────────────────────
  {
    id: "wdc-tshirt-navy",
    category: "apparel",
    name: "WDC Classic T-Shirt",
    subtitle: "Navy Blue · WDC Logo Front",
    price: 25,
    badge: "Bestseller",
    badgeColor: "bg-amber-100 text-amber-700",
    stars: 4.9,
    reviews: 124,
    description: "100% organic cotton. WDC logo embroidered on chest, 'World Disaster Center' print on back. Available S–XXL.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tag: "APPAREL",
    icon: <Shirt size={56} strokeWidth={1.2} />,
  },
  {
    id: "wdc-hoodie",
    category: "apparel",
    name: "WDC Field Hoodie",
    subtitle: "Dark Navy · Embroidered Logo",
    price: 55,
    badge: null,
    stars: 4.8,
    reviews: 67,
    description: "Heavyweight 320gsm fleece. 'Disaster Response' back print. Two zip pockets. WDC logo on left chest.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tag: "APPAREL",
    icon: <Shirt size={56} strokeWidth={1.2} />,
  },
  {
    id: "wdc-polo",
    category: "apparel",
    name: "WDC Polo Shirt",
    subtitle: "OCHA Blue · Piqué Cotton",
    price: 35,
    badge: "New",
    badgeColor: "bg-blue-100 text-blue-700",
    stars: 4.7,
    reviews: 43,
    description: "Professional piqué polo in WDC signature OCHA blue. WDC logo embroidered on chest. Perfect for events and field visits.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tag: "APPAREL",
    icon: <Shirt size={56} strokeWidth={1.2} />,
  },
  {
    id: "wdc-cap",
    category: "apparel",
    name: "WDC Field Cap",
    subtitle: "Navy · Adjustable",
    price: 20,
    badge: null,
    stars: 4.8,
    reviews: 89,
    description: "Structured 6-panel cap with WDC embroidered logo. Adjustable strap. UV protection rating UPF 30+.",
    sizes: ["One Size"],
    tag: "APPAREL",
    icon: <Tag size={52} strokeWidth={1.2} />,
  },
  {
    id: "wdc-vest",
    category: "apparel",
    name: "WDC High-Vis Field Vest",
    subtitle: "Orange/Navy · OCHA Standard",
    price: 45,
    badge: "Field Use",
    badgeColor: "bg-orange-100 text-orange-700",
    stars: 4.9,
    reviews: 38,
    description: "OCHA-standard high-visibility vest. 'WORLD DISASTER CENTER' printed front and back. Multiple pockets. For field deployments.",
    sizes: ["S/M", "L/XL", "XXL"],
    tag: "APPAREL",
    icon: <Shield size={52} strokeWidth={1.2} />,
  },
  // ── Field Gear ────────────────────────────────────────────────────────────
  {
    id: "wdc-mug",
    category: "gear",
    name: "WDC Stainless Steel Mug",
    subtitle: "500ml · Double-wall insulated",
    price: 22,
    badge: "Popular",
    badgeColor: "bg-green-100 text-green-700",
    stars: 4.9,
    reviews: 201,
    description: "Double-wall vacuum insulated. Hot 12h / Cold 24h. WDC logo laser-engraved. BPA-free. Leakproof lid.",
    sizes: ["500ml"],
    tag: "GEAR",
    icon: <Coffee size={52} strokeWidth={1.2} />,
  },
  {
    id: "wdc-tote",
    category: "gear",
    name: "WDC Tote Bag",
    subtitle: "OCHA Blue · Heavy Canvas",
    price: 18,
    badge: null,
    stars: 4.7,
    reviews: 156,
    description: "Heavy-duty canvas tote. 15L capacity. WDC logo screen-printed. 'Preparedness Saves Lives' on reverse. Reinforced handles.",
    sizes: ["One Size"],
    tag: "GEAR",
    icon: <ShoppingBag size={52} strokeWidth={1.2} />,
  },
  {
    id: "wdc-notebook",
    category: "gear",
    name: "WDC Field Notebook",
    subtitle: "A5 · Hardcover · 200 pages",
    price: 14,
    badge: null,
    stars: 4.6,
    reviews: 88,
    description: "Hardcover A5 notebook. 200 pages dotted grid. WDC logo embossed cover. Elastic strap, back pocket, ribbon bookmark.",
    sizes: ["A5"],
    tag: "GEAR",
    icon: <BookOpen size={52} strokeWidth={1.2} />,
  },
  {
    id: "wdc-emergency-kit",
    category: "gear",
    name: "WDC Preparedness Kit",
    subtitle: "72-hour emergency kit",
    price: 89,
    badge: "Recommended",
    badgeColor: "bg-red-100 text-red-700",
    stars: 4.9,
    reviews: 52,
    description: "WDC-branded 72-hour emergency preparedness kit. First aid, LED torch, emergency blanket, whistle, water purification tablets, WDC prep guide. IFRC-aligned contents.",
    sizes: ["Standard"],
    tag: "GEAR",
    icon: <Package size={52} strokeWidth={1.2} />,
  },
  {
    id: "wdc-sticker-pack",
    category: "gear",
    name: "WDC Sticker Pack",
    subtitle: "8 stickers · Waterproof vinyl",
    price: 8,
    badge: null,
    stars: 4.8,
    reviews: 312,
    description: "8 waterproof vinyl stickers. WDC logo, Michael AI logo, Disaster Heroes badge, 'Preparedness Saves Lives', globe maps, and more.",
    sizes: ["One Size"],
    tag: "GEAR",
    icon: <Tag size={52} strokeWidth={1.2} />,
  },
  // ── Digital ───────────────────────────────────────────────────────────────
  {
    id: "wdc-annual-report",
    category: "digital",
    name: "WDC Annual Report 2024",
    subtitle: "PDF · Free download",
    price: 0,
    badge: "Free",
    badgeColor: "bg-gray-100 text-gray-700",
    stars: 5.0,
    reviews: 478,
    description: "Full 2024 annual report: missions in DRC & Burundi, Michael deployments, partnerships, financials, and WDC's 2025–2026 strategy.",
    tag: "DIGITAL",
    icon: <FileText size={52} strokeWidth={1.2} />,
  },
  {
    id: "wdc-prep-guide",
    category: "digital",
    name: "Household Preparedness Guide",
    subtitle: "PDF · 48 pages",
    price: 10,
    badge: "Digital",
    badgeColor: "bg-purple-100 text-purple-700",
    stars: 4.8,
    reviews: 134,
    description: "WDC's comprehensive household disaster preparedness guide. 48 pages covering floods, earthquakes, disease outbreaks, evacuation plans, and 72-hour kit checklist. Available in English, French, Spanish.",
    tag: "DIGITAL",
    icon: <FileText size={52} strokeWidth={1.2} />,
  },
  {
    id: "michael-api",
    category: "digital",
    name: "Michael API Access",
    subtitle: "Developer · Contact for pricing",
    price: null,
    badge: "Enterprise",
    badgeColor: "bg-[#009EDB]/10 text-[#009EDB]",
    stars: 4.9,
    reviews: 18,
    description: "API access to Michael's disaster intelligence platform. Real-time alerts, risk scoring, country profiles, epidemic models, and AI chat agents. Contact WDC for pricing and terms.",
    tag: "DIGITAL",
    icon: <Cpu size={52} strokeWidth={1.2} />,
  },
  // ── Awareness ─────────────────────────────────────────────────────────────
  {
    id: "wdc-poster",
    category: "awareness",
    name: "WDC Awareness Poster",
    subtitle: "A2 · 'Disasters Know No Borders'",
    price: 12,
    badge: null,
    stars: 4.7,
    reviews: 67,
    description: "Premium A2 print on recycled paper. WDC's flagship 'Disasters Know No Borders' design with world map and impact statistics. Perfect for offices, schools, and community centers.",
    tag: "AWARENESS",
    icon: <Map size={52} strokeWidth={1.2} />,
  },
  {
    id: "wdc-wallmap",
    category: "awareness",
    name: "WDC World Impact Map",
    subtitle: "A1 · Framed · 2025 Edition",
    price: 35,
    badge: "2025 Edition",
    badgeColor: "bg-indigo-100 text-indigo-700",
    stars: 4.9,
    reviews: 29,
    description: "Large-format A1 wall map showing all WDC operations, partner locations, and Michael coverage zones. Updated annually. Ships flat in protective tube.",
    tag: "AWARENESS",
    icon: <Globe size={52} strokeWidth={1.2} />,
  },
];

const revenueStreams = [
  {
    icon: <Heart size={20} className="text-[#009EDB]" />,
    title: "Individual Donations",
    desc: "One-time and recurring gifts via PayPal, credit card, wire, or check. Monthly sustainers are the backbone of WDC operations.",
    amount: "Any amount",
    cta: "Donate Now",
    link: "/donate",
  },
  {
    icon: <Globe size={20} className="text-[#009EDB]" />,
    title: "Institutional Grants",
    desc: "Grants from UN agencies, EU funds, government bilateral aid, and international foundations support field missions and research.",
    amount: "$10k – $5M+",
    cta: "Partner With Us",
    link: "/roster",
  },
  {
    icon: <ShoppingBag size={20} className="text-[#009EDB]" />,
    title: "WDC Shop",
    desc: "Branded merchandise, field gear, digital reports, and awareness products sold via Skyhol marketplace. All profits fund programs.",
    amount: "$5 – $89",
    cta: "Shop Now",
    link: "#top",
  },
  {
    icon: <Zap size={20} className="text-[#009EDB]" />,
    title: "Michael API / Technology Licensing",
    desc: "Organizations and governments license Michael's disaster intelligence platform, API access, and custom dashboards for their operations.",
    amount: "Contact for pricing",
    cta: "Request Access",
    link: "/request-demo",
  },
  {
    icon: <BookOpen size={20} className="text-[#009EDB]" />,
    title: "Training & Capacity Building",
    desc: "WDC delivers disaster risk reduction training, certification programs, and capacity-building workshops for agencies and communities.",
    amount: "$500 – $15k",
    cta: "Learn More",
    link: "/training",
  },
  {
    icon: <Star size={20} className="text-[#009EDB]" />,
    title: "WDC Membership",
    desc: "Individual, organizational, and enterprise memberships provide exclusive access to data, reports, training discounts, and WDC network.",
    amount: "From $25/year",
    cta: "Join",
    link: "/membership",
  },
];

function ProductCard({ product, onBuy }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col"
    >
      {/* Product icon area */}
      <div className="bg-white border-b border-gray-100 h-44 flex items-center justify-center relative">
        <div className="text-gray-200">
          {product.icon}
        </div>
        {product.badge && (
          <span className={`absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${product.badgeColor || "bg-amber-100 text-amber-700"}`}>
            {product.badge}
          </span>
        )}
        <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest text-gray-400 bg-white/80 px-2 py-0.5 rounded">
          {product.tag}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-bold text-[#1C2B39] text-base leading-snug">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{product.subtitle}</p>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1,2,3,4,5].map(n => (
              <Star key={n} size={11} className={n <= Math.floor(product.stars) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed flex-1">{product.description}</p>

        {/* Size selector */}
        {product.sizes && product.sizes.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`text-xs px-2.5 py-1 rounded border font-medium transition-colors ${selectedSize === s ? "border-[#009EDB] bg-[#009EDB]/10 text-[#009EDB]" : "border-gray-200 text-gray-500 hover:border-gray-400"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            {product.price === 0 ? (
              <span className="text-lg font-black text-green-600">FREE</span>
            ) : product.price === null ? (
              <span className="text-sm font-bold text-[#009EDB]">Contact us</span>
            ) : (
              <span className="text-lg font-black text-[#1C2B39]">${product.price}</span>
            )}
          </div>
          {product.id === "michael-api" ? (
            <Link
              to="/request-demo"
              className="inline-flex items-center gap-1.5 bg-[#009EDB] hover:bg-[#0072BC] text-white text-xs font-bold px-4 py-2 rounded transition-colors"
            >
              Request Access <ArrowRight size={12} />
            </Link>
          ) : product.id === "wdc-annual-report" ? (
            <Link
              to="/reports"
              className="inline-flex items-center gap-1.5 bg-[#1C2B39] hover:bg-[#009EDB] text-white text-xs font-bold px-4 py-2 rounded transition-colors"
            >
              Download <ArrowRight size={12} />
            </Link>
          ) : (
            <a
              href={SKYHOL_BASE}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#009EDB] hover:bg-[#0072BC] text-white text-xs font-bold px-4 py-2 rounded transition-colors"
            >
              Buy on Skyhol <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white" id="top">
      <SEOMeta
        title="WDC Shop — Support the Mission"
        description="Shop WDC merchandise and support humanitarian disaster response. Every purchase helps fund WDC's early warning systems and field missions."
        url="/shop"
      />

      {/* Hero */}
      <section className="bg-[#1C2B39] text-white py-20">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag size={16} className="text-[#009EDB]" />
              <p className="text-[#009EDB] uppercase tracking-widest text-xs font-black">WDC Store</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl">
              Shop WDC
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-8">
              Every purchase supports WDC's global disaster monitoring, early warning systems, and humanitarian response operations. Products sold via Skyhol marketplace.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Shield size={13} className="text-[#009EDB]" /> 100% proceeds fund programs</span>
              <span className="flex items-center gap-1.5"><Truck size={13} className="text-[#009EDB]" /> Ships worldwide via Skyhol</span>
              <span className="flex items-center gap-1.5"><Package size={13} className="text-[#009EDB]" /> Secure checkout</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Category tabs */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container sm:px-2">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#009EDB] text-white"
                    : "text-gray-500 hover:text-[#009EDB] hover:bg-[#009EDB]/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
            <a
              href={SKYHOL_BASE}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 ml-auto flex items-center gap-1.5 text-xs font-bold text-[#009EDB] hover:underline"
            >
              View all on Skyhol <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <section className="py-16">
        <div className="container sm:px-2">
          <div className="flex items-center justify-between mb-8">
            <AnimateIn variant="fadeUp">
              <p className="text-sm text-gray-500">
                Showing <span className="font-bold text-[#1C2B39]">{filtered.length}</span> products
              </p>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <AnimateIn key={product.id} variant="fadeUp" delay={i * 0.05}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Skyhol integration banner */}
      <section className="py-10 bg-gray-50 border-y border-gray-200">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1C2B39] flex items-center justify-center">
                  <ShoppingBag size={22} className="text-[#009EDB]" />
                </div>
                <div>
                  <p className="font-bold text-[#1C2B39]">WDC products are sold on Skyhol</p>
                  <p className="text-sm text-gray-500">Fast, secure delivery worldwide. Browse full catalog on Skyhol marketplace.</p>
                </div>
              </div>
              <a
                href={SKYHOL_BASE}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-[#1C2B39] hover:bg-[#009EDB] text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors"
              >
                Open Skyhol Store <ExternalLink size={14} />
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Revenue model — How WDC Gets Funded */}
      <section className="py-20 bg-white">
        <div className="container sm:px-2">
          <AnimateIn variant="fadeUp">
            <div className="h-1 w-12 bg-[#009EDB] mb-4" />
            <p className="text-[#009EDB] text-xs font-black uppercase tracking-widest mb-2">Financial Transparency</p>
            <h2 className="text-3xl font-bold text-[#1C2B39] mb-3">How WDC Gets Funded</h2>
            <p className="text-gray-500 text-sm max-w-2xl mb-10">
              WDC is a 501(c)(3) tax-exempt nonprofit organization (EIN: 33-1869013). Our funding comes from six primary sources, all of which directly support our mission of disaster monitoring and humanitarian response.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {revenueStreams.map((stream, i) => (
              <AnimateIn key={i} variant="fadeUp" delay={i * 0.07}>
                <div className="border border-gray-200 rounded-xl p-6 hover:border-[#009EDB]/40 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-[#009EDB]/10 rounded-lg flex items-center justify-center shrink-0">
                      {stream.icon}
                    </div>
                    <h3 className="font-bold text-[#1C2B39] text-sm leading-snug">{stream.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{stream.desc}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs font-black text-[#009EDB]">{stream.amount}</span>
                    <Link
                      to={stream.link}
                      className="text-xs font-bold text-[#1C2B39] hover:text-[#009EDB] flex items-center gap-1 transition-colors"
                    >
                      {stream.cta} <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Tax info box */}
          <AnimateIn variant="fadeUp" delay={0.3}>
            <div className="mt-10 bg-[#1C2B39] rounded-xl p-8 flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-10 h-10 bg-[#009EDB]/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Shield size={18} className="text-[#009EDB]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-2">Tax-Deductible Donations</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  WDC is registered as a 501(c)(3) organization in the United States (EIN: 33-1869013), a registered charity in Canada (CRA: 721487825 RC 0001), and an NGO in Austria (Steuernummer: 91 323/2005). All qualifying donations are tax-deductible to the extent permitted by law.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/donate"
                    className="inline-flex items-center gap-1.5 bg-[#009EDB] hover:bg-[#0072BC] text-white text-sm font-bold px-5 py-2 rounded transition-colors"
                  >
                    Donate Now <ArrowRight size={13} />
                  </Link>
                  <a
                    href="mailto:office@worlddisastercenter.org"
                    className="inline-flex items-center gap-1.5 border border-white/20 text-white text-sm font-bold px-5 py-2 rounded hover:border-[#009EDB] transition-colors"
                  >
                    Financial Inquiries
                  </a>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="container sm:px-2 text-center">
          <AnimateIn variant="fadeUp">
            <img src={WDCLogo} alt="WDC" className="h-12 w-auto mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold text-[#1C2B39] mb-3">Every Purchase Makes a Difference</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto mb-6">
              100% of WDC Shop profits fund disaster monitoring, early warning systems, and field missions that protect vulnerable communities worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={SKYHOL_BASE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#009EDB] hover:bg-[#0072BC] text-white font-bold px-7 py-3 rounded text-sm transition-colors"
              >
                Shop on Skyhol <ExternalLink size={14} />
              </a>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 border border-[#1C2B39] text-[#1C2B39] font-bold px-7 py-3 rounded text-sm hover:bg-[#1C2B39] hover:text-white transition-colors"
              >
                Donate Directly <ArrowRight size={14} />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
  );
}
