import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const distRoot = join(root, "dist");
const htmlPath = join(distRoot, "index.html");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(htmlPath), "dist/index.html is missing");
assert(
  !existsSync(join(distRoot, "continuity-web.html")),
  "dist/continuity-web.html should not be kept as a second live entrypoint",
);

const html = readFileSync(htmlPath, "utf8");
const requiredAssets = [
  "assets/continuity-web-shield-logo.png",
  "assets/continuity-web-hero.png",
  "assets/continuity-web-failure-mode.png",
  "assets/continuity-web-manifest.png",
  "assets/continuity-web-quarantine.png",
  "assets/continuity-web-governance.png",
  "assets/continuity-web-federation.png",
];
const requiredDocuments = [
  "continuity_web_concept_brief.pdf",
  "continuity_web_report.pdf",
];

for (const asset of requiredAssets) {
  assert(html.includes(asset), `${asset} is not referenced`);
  assert(existsSync(join(distRoot, asset)), `${asset} is missing`);
}

for (const documentPath of requiredDocuments) {
  assert(html.includes(`href="${documentPath}"`), `${documentPath} is not linked`);
  assert(existsSync(join(distRoot, documentPath)), `${documentPath} is missing`);
}

const requiredCopy = [
  "Fork authority. Prune compromise.",
  "When valid commands stop proving legitimacy",
  "The speed of capture exceeds the speed of governance",
  "A successor epoch starts from a signed manifest",
  "Commit non-negotiable floors",
  "Core terms vs. preference terms.",
  "Import evidence. Do not import command.",
  "AI capability passports: scope, duration, binding",
  "No single actor gets to declare the new web",
  "Authoritarianism becomes legible, not impossible",
  "Recognition is voluntary. Hierarchy is emergent.",
  "Privacy is the security property",
  "Continuity Web does not replace incident response",
  "What success actually looks like:",
  "Governance specification",
  "The agora was always the destination.",
];

for (const text of requiredCopy) {
  assert(html.includes(text), `Missing copy: ${text}`);
}

const imageCount = (html.match(/<img\b/g) || []).length;
assert(imageCount >= 6, `Expected at least 6 explanatory images, found ${imageCount}`);

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

const localTargets = [
  ...html.matchAll(/\b(?:href|src)="([^"#][^"]*)"/g),
]
  .map((match) => match[1])
  .filter((target) => !/^[a-z][a-z0-9+.-]*:/i.test(target));

for (const target of localTargets) {
  assert(!target.startsWith("/"), `${target} should be relative for portable static upload`);
  assert(existsSync(join(distRoot, target)), `${target} is referenced but missing from dist`);
}

const shieldPng = readFileSync(join(distRoot, "assets", "continuity-web-shield-logo.png"));
assert(
  shieldPng[25] === 6,
  "Shield logo PNG should be RGBA so it can render with a transparent background",
);
assert(
  html.includes('class="hero-visual-wide visual-frame"'),
  "Hero graphic should use a wide, legible layout rather than a small side thumbnail",
);
assert(
  html.includes('<section class="hero">\n        <div class="shell shell-wide">'),
  "Hero should use the wide shell so it aligns with the main explanatory sections",
);
assert(
  html.includes('id="failure">\n        <div class="shell shell-wide">'),
  "Failure section should use the wide shell so its diagram spacing matches the later explanatory sections",
);
assert(
  html.includes('class="shell shell-wide manifest-grid"'),
  "Manifest section should use a wider shell so the detailed graphic is large enough to read",
);
assert(
  html.includes('id="quarantine">\n        <div class="shell shell-wide">'),
  "Quarantine section should use the wide shell so the detailed graphic remains legible",
);
assert(
  html.includes('class="detail-showcase"'),
  "Detailed graphic sections should use a full-width showcase layout rather than a cramped side rail",
);
assert(
  html.includes('class="governance-showcase"'),
  "Governance graphic should use a full-width showcase layout rather than a cramped side rail",
);
assert(
  html.includes('id="governance">\n        <div class="shell shell-wide">'),
  "Governance section should use the wide shell so the detailed graphic remains legible",
);
assert(
  html.includes('<a href="#federation">Federation</a>'),
  "Navigation should include the new federation section",
);
assert(
  html.includes('id="federation"'),
  "Federation section should be inserted before the closer",
);
assert(
  html.includes('id="federation">\n        <div class="shell shell-wide">'),
  "Federation section should use the wide shell so it aligns with the other numbered sections",
);
assert(
  html.includes('src="assets/continuity-web-federation.png"'),
  "Federation section should include a dedicated explanatory graphic",
);
assert(
  html.indexOf('id="governance"') < html.indexOf('id="federation"') &&
    html.indexOf('id="federation"') < html.indexOf('class="closer"'),
  "Federation section should sit between governance and the closer",
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
assert(
  html.includes("scroll-margin-top: 92px"),
  "Hash-linked sections should clear the sticky header instead of rendering clipped",
);
assert(
  html.includes("text-wrap: balance"),
  "Headlines should use balanced wrapping so short statements do not orphan awkwardly",
);
assert(
  html.includes("max-width: 880px"),
  "Hero headline should be wide enough to avoid a weak three-line desktop wrap",
);

console.log("continuity-web html checks passed");
