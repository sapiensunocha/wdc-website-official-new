import { Router, Request, Response } from "express";

const router = Router();

const IDEALIST_LISTINGS_KEY = process.env.IDEALIST_LISTINGS_KEY || "";
const IDEALIST_POSTING_KEY  = process.env.IDEALIST_POSTING_KEY  || "a9e6cac61d000130eb47f4545a778316";
const WDC_ORG_ID            = "059fab99846344a385266ced93563c9f";

// GET /api/idealist/jobs — returns WDC's active job listings from Idealist
router.get("/jobs", async (_req: Request, res: Response) => {
  try {
    const key = IDEALIST_LISTINGS_KEY || IDEALIST_POSTING_KEY;
    const basicAuth = Buffer.from(`${key}:`).toString("base64");

    const response = await fetch(
      "https://www.idealist.org/api/v1/listings/jobs",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );

    if (!response.ok) {
      // Listings API key not yet granted — return empty so frontend uses fallback
      return res.json({ jobs: [], source: "fallback", status: response.status });
    }

    const data: any = await response.json();
    const allJobs: any[] = data.jobs ?? [];

    // Filter to WDC's org only
    const wdcJobs = allJobs.filter(
      (j: any) => j.orgId === WDC_ORG_ID || j.org_id === WDC_ORG_ID
    );

    // If orgId filter returned nothing, we may need to fetch individual job details.
    // Return what we have from the index page; frontend can display them.
    return res.json({ jobs: wdcJobs, source: "idealist", total: wdcJobs.length });
  } catch (err: any) {
    return res.json({ jobs: [], source: "error", message: err.message });
  }
});

export default router;
