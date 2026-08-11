#!/usr/bin/env node
/**
 * WDC PDF Generator — saves to frontend/public/pdfs/
 * Run: node scripts/generate-pdfs.js   (from project root)
 * Requires: dev server on http://localhost:5174
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:5174";
const OUT_DIR  = path.join(__dirname, "../frontend/public/pdfs");

const REPORT_IDS = [
  // Annual & Financial
  "annual-2024","annual-2023","annual-2022","annual-2021",
  "financial-2024","financial-2023","financial-2022",
  // Field Missions
  "mission-drc-2023","mission-burundi-2023","mission-haiti-2024",
  "mission-sudan-2024","mission-jamaica-2024","mission-afghanistan-2024",
  "mission-drc-2025","mission-burundi-2025","mission-west-africa-2024",
  // Technology
  "tech-michael-2024","tech-eagle-2023","tech-accuracy-2024",
  "tech-nostradamus-2024","tech-crisisatlas-2024",
  // Thematic / Policy / Strategic
  "thematic-ai-2024","thematic-africa-ews-2024",
  "strategic-plan-2024","policy-data-2024","policy-gender-2024",
  // Country Briefings
  "country-kenya-2024","country-rwanda-2024","country-bangladesh-2024",
  // Project Reports
  "project-argus-2024","project-lifeline-2024","project-tectra-2024",
  "project-nova7-2024","project-michael-mobile-2025","project-drone-iot-2025",
  // EAGLE
  "eagle-drc-assessment-2023","eagle-burundi-2023","eagle-haiti-2024",
  // Research & Publications
  "research-climb-2024","research-michael-paper-2025",
  "research-founding-2023","book-breaking-barriers-2024",
  // Programs & Community
  "program-academy-2024","program-be-reporter-2024",
  "program-expert-roster-2024","program-titan-taskforce-2024",
  "program-30day-challenge-2025","program-africa-gap-2024",
  "program-united-change-2025","program-wdc-partnerships-2024",
];

async function waitForRender(page) {
  await page.waitForSelector(".ocha-cover", { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => new Promise((resolve) => {
    const imgs = Array.from(document.querySelectorAll("img"));
    if (imgs.every((i) => i.complete)) return resolve();
    let pending = imgs.filter((i) => !i.complete).length;
    if (!pending) return resolve();
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", () => { if (--pending === 0) resolve(); });
        img.addEventListener("error", () => { if (--pending === 0) resolve(); });
      }
    });
    setTimeout(resolve, 8000);
  }));
  await new Promise((r) => setTimeout(r, 600));
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Skip already-generated PDFs
  const existing = new Set(
    fs.readdirSync(OUT_DIR)
      .filter((f) => f.endsWith(".pdf"))
      .map((f) => f.replace(".pdf", ""))
  );
  const toGenerate = REPORT_IDS.filter((id) => !existing.has(id));

  console.log(`✅ Already done: ${existing.size}  |  🔄 Generating: ${toGenerate.length}`);
  if (!toGenerate.length) { console.log("All PDFs already generated!"); process.exit(0); }

  console.log("🚀 Launching headless Chrome...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage","--disable-web-security"],
  });

  const failed = [];

  for (const id of toGenerate) {
    const outFile = path.join(OUT_DIR, `${id}.pdf`);
    const num = REPORT_IDS.indexOf(id) + 1;
    process.stdout.write(`  [${num}/${REPORT_IDS.length}] ${id} ... `);

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.emulateMediaType("print");
      await page.goto(`${BASE_URL}/reports/${id}`, { waitUntil: "networkidle0", timeout: 30000 });
      await waitForRender(page);

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: "1.5cm", right: "1.5cm", bottom: "2cm", left: "1.5cm" },
        timeout: 30000,
      });

      fs.writeFileSync(outFile, pdf);
      await page.close();
      console.log(`✅ ${Math.round(pdf.length / 1024)} KB`);
    } catch (err) {
      console.log(`❌ ${err.message.slice(0, 80)}`);
      failed.push(id);
    }
  }

  await browser.close();

  const total = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".pdf")).length;
  console.log(`\n─────────────────────────────────────`);
  console.log(`Total PDFs in public/pdfs/: ${total}`);
  if (failed.length) console.log("Failed:", failed.join(", "));
  console.log(`\nDeploy with: vercel --prod`);
})();
