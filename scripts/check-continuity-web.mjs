import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const htmlPath = join(root, "dist", "continuity-web.html");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(htmlPath), "dist/continuity-web.html is missing");

const html = readFileSync(htmlPath, "utf8");
const requiredAssets = [
  "assets/continuity-web-shield-logo.png",
  "assets/continuity-web-hero.png",
  "assets/continuity-web-failure-mode.png",
  "assets/continuity-web-manifest.png",
  "assets/continuity-web-quarantine.png",
  "assets/continuity-web-governance.png",
];

for (const asset of requiredAssets) {
  assert(html.includes(asset), `${asset} is not referenced`);
  assert(existsSync(join(root, "dist", asset)), `${asset} is missing`);
}

const requiredCopy = [
  "Fork authority, not the internet",
  "When valid commands stop proving legitimacy",
  "A successor epoch starts from a signed manifest",
  "Import evidence. Do not import command.",
  "No single actor gets to declare the new web",
  "Continuity Web does not replace incident response",
];

for (const text of requiredCopy) {
  assert(html.includes(text), `Missing copy: ${text}`);
}

const imageCount = (html.match(/<img\b/g) || []).length;
assert(imageCount >= 5, `Expected at least 5 explanatory images, found ${imageCount}`);

const altCount = (html.match(/alt="/g) || []).length;
assert(altCount >= imageCount, "Every image should have alt text");

assert(
  html.includes('class="explain-stack"'),
  "Explanatory graphic sections should use the non-overlapping explain-stack layout",
);
assert(
  html.includes('class="notes note-grid"'),
  "Explanatory notes should sit below graphics in a note-grid",
);
assert(
  html.includes('src="assets/continuity-web-shield-logo.png"'),
  "Header logo should use the canonical shield logo image",
);
assert(
  html.includes('alt="Continuity Web logo"'),
  "Generated logo image should have clear alt text",
);

const shieldPng = readFileSync(join(root, "dist", "assets", "continuity-web-shield-logo.png"));
assert(
  shieldPng[25] === 6,
  "Shield logo PNG should be RGBA so it can render with a transparent background",
);
assert(
  html.includes('class="hero-visual-wide visual-frame"'),
  "Hero graphic should use a wide, legible layout rather than a small side thumbnail",
);
assert(
  html.indexOf('class="hero-visual-wide visual-frame"') < html.indexOf('class="hero-proof"'),
  "Hero graphic should appear before proof cards so it is visible sooner",
);
assert(
  !html.includes('class="graphic-logo-overlay"'),
  "Hero graphic should be regenerated without a logo overlay or stale embedded mark",
);
assert(
  !html.includes("graphic-logo-overlay"),
  "No graphic should cover stale embedded marks with an overlay",
);

console.log("continuity-web html checks passed");
