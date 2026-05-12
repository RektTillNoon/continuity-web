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
  "assets/continuity-web-mvp-demo.png",
];
const requiredDocuments = [
  "continuity_web_concept_brief.pdf",
  "continuity_web_report.pdf",
];
const githubUrl = "https://github.com/RektTillNoon/continuity-web";

for (const asset of requiredAssets) {
  assert(html.includes(asset), `${asset} is not referenced`);
  assert(existsSync(join(distRoot, asset)), `${asset} is missing`);
}

for (const documentPath of requiredDocuments) {
  assert(html.includes(`href="${documentPath}"`), `${documentPath} is not linked`);
  assert(existsSync(join(distRoot, documentPath)), `${documentPath} is missing`);
}

const requiredCopy = [
  "Continuity Web",
  "Failure mode",
  "Succession manifest",
  "Quarantine bridge",
  "Governance stamp",
  "Federation graph",
  "Continuity Web does not replace incident response",
  "forkable package registry",
  "MVP demonstration",
  "Governance specification",
  "The demo is narrow on purpose",
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
  html.includes('class="exhibit-caption"'),
  "Explanatory graphic sections should use concise captions instead of duplicated note grids",
);
assert(
  html.includes('src="assets/continuity-web-shield-logo.png"'),
  "Header logo should use the canonical shield logo image",
);
assert(
  html.includes('<link rel="icon" type="image/png" href="assets/cw-logo-solid.png">'),
  "Site should use the solid shield logo as its favicon",
);
assert(
  html.includes('<div class="shell shell-wide nav" aria-label="Primary navigation">'),
  "Header brand should align with the wide graphics shell",
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
  html.includes('<section class="hero">\n        <div class="shell shell-wide">'),
  "Hero should use the wide shell so it aligns with the main explanatory sections",
);
assert(
  html.includes('id="failure">\n        <div class="shell shell-wide">'),
  "Failure section should use the wide shell so its diagram spacing matches the later explanatory sections",
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
  "Hero graphic should stay in the hero and appear before proof cards",
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
assert(
  html.includes("--page-gutter: clamp("),
  "Page should use a shared responsive gutter instead of per-section edge spacing",
);
assert(
  html.includes("calc(100% - var(--page-gutter) - var(--page-gutter))"),
  "Shell widths should reserve the shared gutter on both viewport edges",
);
assert(
  html.includes(".shell-wide {\n        width: min(1780px, calc(100% - var(--page-gutter) - var(--page-gutter)));"),
  "Wide sections should use the same shared gutter as standard sections",
);
assert(
  html.includes("--copy-measure: 1180px"),
  "Copy-bearing blocks should share the standard reading measure from the closer section",
);
assert(
  html.includes("max-width: var(--copy-measure);"),
  "Copy-bearing blocks should be inset within wide graphic sections",
);
assert(
  html.includes(".hero-intro,\n      .quote-band,\n      .exhibit-caption,\n      .modes"),
  "Hero, captions, and other copy groups should use the shared copy inset",
);
assert(
  !html.includes(".hero-intro,\n      .section-header,\n      .quote-band"),
  "Section headers should align with wide graphic edges, not the narrower copy inset",
);
assert(
  !html.includes('class="notes'),
  "Graphic sections should not keep duplicated note grids below text-heavy graphics",
);
assert(
  !html.includes(".notes") && !html.includes(".note "),
  "Dead note-grid CSS should be removed with the note-grid markup",
);
assert(
  !html.includes('class="manifest-list"'),
  "Manifest section should not duplicate the manifest graphic with a second HTML list",
);
assert(
  !html.includes("surveillance mandate"),
  "Consortium target should not center the surveillance-mitigation scenario",
);
assert(
  html.includes("successor registry"),
  "Consortium target should still reference the successor registry success condition",
);
assert(
  html.includes(".button.report"),
  "Dark closer CTA should use a dedicated visible report button variant",
);
assert(
  html.includes('<a class="button report" href="continuity_web_report.pdf">Open the technical report</a>'),
  "Technical report CTA should use the report button variant",
);
assert(
  html.includes(`href="${githubUrl}"`),
  "Site should link to the public GitHub repository",
);
assert(
  html.includes(`href="${githubUrl}" target="_blank" rel="noopener noreferrer"`),
  "External GitHub link should open safely in a new tab",
);
assert(
  html.includes('>GitHub</a>'),
  "GitHub repository link should be presented as a concise button label",
);
assert(
  html.includes('class="closer-panel"'),
  "Consortium target should use a designed editorial panel",
);
assert(
  html.includes('src="assets/continuity-web-mvp-demo.png"'),
  "Consortium target should include the MVP demonstration graphic",
);
assert(
  html.includes('class="closer-visual visual-frame"'),
  "Consortium target graphic should use the framed visual treatment",
);
assert(
  html.includes("grid-auto-flow: dense"),
  "Consortium target proof grid should be dense and gapless",
);
assert(
  !html.includes('<div class="priority">\n                <b>'),
  "Consortium target cards should not use cheap numbered labels",
);
assert(
  html.includes("background: rgba(11, 18, 19, 0.86);"),
  "Consortium target cards should use the dark section palette instead of flat gray panels",
);
assert(
  !html.includes("linear-gradient(180deg, rgba(244, 239, 227, 0.105), rgba(244, 239, 227, 0.055))"),
  "Consortium target cards should not use gray translucent fills",
);
assert(
  !html.includes("Continuity Web becomes concrete when a bounded software community"),
  "Consortium target should not keep the verbose explanatory opener",
);
assert(
  /security-lab\s+consortium/.test(html),
  "Consortium target should keep the paper-grounded security-lab consortium target",
);
assert(
  !html.includes("Quorum composition, validator selection, removal procedures"),
  "Consortium target cards should use terse workstream copy",
);
assert(
  html.includes("font-size: clamp(34px, 4vw, 58px);"),
  "Consortium target headline should use a restrained title scale",
);
assert(
  !html.includes("Red team compromises the update channel."),
  "Consortium target should let the MVP graphic carry the detailed scenario",
);
assert(
  !html.includes("font-size: clamp(42px, 6vw, 92px);"),
  "Consortium target headline should not use oversized hero scale",
);

console.log("continuity-web html checks passed");
