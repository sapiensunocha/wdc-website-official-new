import { Helmet } from "react-helmet-async";

const SITE_URL  = "https://www.worlddisastercenter.org";
const SITE_NAME = "World Disaster Center";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1594841343391-97ac1b9a950e?auto=format&fit=crop&w=1200&h=630&q=80";
const DEFAULT_DESC  = "World Disaster Center uses AI to monitor disasters, deploy experts, and protect vulnerable communities through early warning systems and field missions across 142 countries and 6 continents.";

/**
 * Drop-in SEO + Open Graph component for every page.
 *
 * Props:
 *   title        — Page title (appended with " — World Disaster Center")
 *   description  — Page description (160 chars ideal)
 *   image        — Absolute URL to a 1200×630 image (falls back to default)
 *   url          — Path like "/campaigns/protect-women" (prepended with site URL)
 *   type         — og:type, default "website"
 *   noindex      — Set true for auth/dashboard pages
 *   keywords     — Optional comma-separated keywords string
 */
const SEOMeta = ({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url = "/",
  type = "website",
  noindex = false,
  keywords = "",
}) => {
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — Monitoring. Alerting. Protecting.`;
  const fullUrl  = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const ogImage  = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="World Disaster Center" />
      {!noindex && <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* ── Open Graph ── */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={fullUrl} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"   content={fullTitle} />
      <meta property="og:locale"      content="en_US" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
      <meta name="twitter:image:alt"   content={fullTitle} />
    </Helmet>
  );
};

export default SEOMeta;
