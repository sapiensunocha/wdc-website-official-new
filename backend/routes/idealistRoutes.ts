import { Router, Request, Response } from "express";

const router = Router();

const WDC_ORG_PAGE = "https://www.idealist.org/en/nonprofit/059fab99846344a385266ced93563c9f-world-disaster-center-new-york";

// Simple in-memory cache: refresh every 6 hours
let cache: { jobs: any[]; fetchedAt: number } | null = null;
const CACHE_TTL = 6 * 60 * 60 * 1000;

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/").replace(/–/g, "–")
    .replace(/—/g, "—").replace(/’/g, "'").replace(/“/g, '"').replace(/”/g, '"');
}

function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function cleanTitle(title: string): string {
  return decodeHtmlEntities(title)
    .replace(/\s*[-–]\s*Volunteer Opportunity\s*$/i, "")
    .replace(/\s*\|\s*Idealist\s*$/i, "")
    .trim();
}

async function scrapeWdcJobs(): Promise<any[]> {
  // 1. Fetch org page to get all volop IDs
  const orgRes = await fetch(WDC_ORG_PAGE, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; WDC-Website/1.0)" },
  });
  if (!orgRes.ok) throw new Error(`Org page fetch failed: ${orgRes.status}`);
  const orgHtml = await orgRes.text();

  const idMatches = [...orgHtml.matchAll(/volunteer-opportunity\/([a-f0-9]{32})/g)];
  const ids = [...new Set(idMatches.map(m => m[1]))];
  if (ids.length === 0) throw new Error("No volop IDs found on org page");

  // 2. For each ID, extract title + description from the public volop page
  const jobs: any[] = [];
  for (const id of ids) {
    const url = `https://www.idealist.org/en/volunteer-opportunity/${id}`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; WDC-Website/1.0)" },
      });
      if (!res.ok) continue;
      const html = await res.text();

      // og:title is the most reliable title source
      const ogTitle  = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/)?.[1] ?? "";
      const metaDesc = html.match(/<meta[^>]+name="description"[^>]+content="([^"]{20,500})"/)?.[1] ?? "";
      const locType  = html.match(/"locationType"\s*:\s*"([^"]+)"/)?.[1] ?? "REMOTE";
      const commit   = html.match(/"commitment"\s*:\s*"([^"]+)"/)?.[1] ?? "";

      jobs.push({
        id,
        title:          cleanTitle(ogTitle) || "WDC Volunteer Position",
        description:    stripHtml(metaDesc).slice(0, 300),
        location:       "Remote",
        locationType:   locType.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
        commitment:     commit.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
        applicationUrl: url,
        type:           "Volunteer",
      });

      await new Promise(r => setTimeout(r, 300)); // politeness delay
    } catch { /* skip failed volop */ }
  }
  return jobs;
}

// GET /api/idealist/jobs
router.get("/jobs", async (_req: Request, res: Response) => {
  try {
    const now = Date.now();
    if (cache && now - cache.fetchedAt < CACHE_TTL) {
      return res.json({ jobs: cache.jobs, source: "idealist", cached: true });
    }
    const jobs = await scrapeWdcJobs();
    cache = { jobs, fetchedAt: now };
    return res.json({ jobs, source: "idealist", total: jobs.length });
  } catch (err: any) {
    // Return cache if available even if stale
    if (cache) return res.json({ jobs: cache.jobs, source: "idealist_cached", cached: true });
    return res.json({ jobs: [], source: "error", message: err.message });
  }
});

export default router;
