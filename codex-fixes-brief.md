# Codex Fixes Brief: Continuity Web HTML Polish

## Target file

`dist/index.html` on the `codex/add-continuity-web-graphics` branch.
Worktree path: `/Users/light/.codex/worktrees/7c6e/Continuity Web/dist/index.html`

**Do not change:** images, image paths, design language, color tokens, fonts, the hero headline, or the overall section sequence.

**Do change:** the specific issues listed below. Each is paired with exact replacement code.

---

## Fix 01 — §01 has a duplicate note

The §01 (failure mode) note grid currently contains four notes. Notes 2 and 4 say the same thing twice (machine-speed delegation outpacing human response). Remove note 2 entirely and keep note 4. Then reorder so the remaining three notes flow logically.

**Find this block (around lines 738–755):**

```html
<div class="notes note-grid" aria-label="Failure mode details">
  <article class="note">
    <h3>Reachability is not legitimacy</h3>
    <p>Packets may route, domains may resolve, and services may answer while the right to command is no longer knowable.</p>
  </article>
  <article class="note">
    <h3>Machine-speed delegation changes the clock</h3>
    <p>AI systems can act through normal channels faster than human operators can interpret, revoke, or coordinate.</p>
  </article>
  <article class="note">
    <h3>The missing primitive is succession</h3>
    <p>Backups restore state. Continuity Web asks which authority is admissible after a contaminated epoch.</p>
  </article>
  <article class="note">
    <h3>The speed of capture exceeds the speed of governance</h3>
    <p>AI systems can act through delegation chains faster than human operators can interpret, revoke, or coordinate a response. The protocol addresses this mismatch structurally, not through faster humans.</p>
  </article>
</div>
```

**Replace with:**

```html
<div class="notes note-grid" aria-label="Failure mode details">
  <article class="note">
    <h3>Reachability is not legitimacy</h3>
    <p>Packets may route, domains may resolve, and services may answer while the right to command is no longer knowable.</p>
  </article>
  <article class="note">
    <h3>The speed of capture exceeds the speed of governance</h3>
    <p>AI systems act through delegation chains faster than human operators can interpret, revoke, or coordinate. The protocol addresses this mismatch structurally — not through faster humans.</p>
  </article>
  <article class="note">
    <h3>The missing primitive is succession</h3>
    <p>Backups restore state. Continuity Web asks which authority is admissible after a contaminated epoch.</p>
  </article>
</div>
```

This drops the count to 3 notes, restoring the clean 3-column grid behavior from the original design.

---

## Fix 02 — Manifest item 05 needs a new opener

Item 05 currently opens with `Core terms vs. preference terms.` which redundantly redefines the distinction already covered in item 04. Item 05 is meant to land the political *consequence* of the mechanism in item 04 — that coercion cannot be silent. Keep the item, rewrite the opener.

**Find this block (around lines 793–796):**

```html
<div>
  <b>05</b>
  <p><strong>Core terms vs. preference terms.</strong> Core terms are committed in the manifest, a guarantee, not a promise. Preference terms can flex within declared bounds. This means a government or upstream epoch cannot silently extract concessions from a downstream one.</p>
</div>
```

**Replace with:**

```html
<div>
  <b>05</b>
  <p><strong>Coercion cannot be silent</strong> A government or upstream epoch cannot quietly extract concessions from a downstream one. Every change to a core term is forensically visible the instant it occurs — turning what would otherwise be invisible pressure into a permanent, contestable record.</p>
</div>
```

This drops the redundant redefinition and lands the consequence cleanly. Note: no period after the bold opener — match the pattern of items 01–04.

---

## Fix 03 — Manifest-grid alignment with a 5-item list

Now that the manifest list has 5 items, the text column is significantly taller than the image, but `.manifest-grid` uses `align-items: center`. The image floats centered while the list extends above and below it, causing visual mismatch.

**Find this rule (around line 378):**

```css
.manifest-grid {
  display: grid;
  grid-template-columns: minmax(320px, 0.42fr) minmax(0, 1.18fr);
  gap: 56px;
  align-items: center;
}
```

**Replace with:**

```css
.manifest-grid {
  display: grid;
  grid-template-columns: minmax(320px, 0.42fr) minmax(0, 1.18fr);
  gap: 56px;
  align-items: start;
}
```

Single token change. The image will align to the top of the column, matching the list's visual start. If this leaves too much empty space below the image, also add `position: sticky; top: 92px;` to the `.manifest-grid figure` so the image stays in view as the user scrolls the list. (Optional — try `align-items: start` alone first.)

---

## Fix 04 — Federation `.quote-band` is structurally malformed

The federation section nests a `.quote-band` *inside* `federation-showcase`, missing the `.shell` wrapper that the original quote-band pattern relies on. The borders and grid layout will not behave as intended. Extract it as its own `<section>` between governance and federation, mirroring the existing pull-quote section pattern around line 760.

**Find this block (around lines 933–941):**

```html
<div class="quote-band">
  <p>Privacy is the security property, not its opposite.</p>
  <span>
    Proving admissibility to an upstream epoch uses a zero-knowledge
    proof. The verifier learns only "compliant." Device inventory, agent
    identity, residents, and transaction history never leave the prover.
    The asymmetry is verifiable to allies, opaque to adversaries.
  </span>
</div>
```

**Delete it from inside `federation-showcase`** and **insert this new section between the governance section closing tag and the federation section opening tag** (around line 897, before `<section class="section alt" id="federation">`):

```html
<section class="section">
  <div class="shell quote-band">
    <p>Privacy is the security property — not its opposite.</p>
    <span>
      Proving admissibility to an upstream epoch uses a zero-knowledge
      proof. The verifier learns only "compliant." Device inventory, agent
      identity, residents, and transaction history never leave the prover.
      The asymmetry is verifiable to allies, opaque to adversaries.
    </span>
  </div>
</section>
```

This matches the existing pull-quote pattern from earlier in the page (the "Continuity Web does not replace incident response" band) and ensures the borders, padding, and grid columns render correctly.

Note the comma → em-dash change in the headline ("Privacy is the security property — not its opposite.") for stronger rhythm.

---

## Fix 05 — Unify `.notes` grid behavior across showcases

Currently the federation showcase falls under `.note-grid`'s `auto-fit, minmax(240px, 1fr)` rule, while quarantine and governance use a fixed `repeat(3, ...)`. With three notes in the federation section, this should match its peers.

**Find this rule (around lines 464–467):**

```css
.detail-showcase .notes,
.governance-showcase .notes {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
```

**Replace with:**

```css
.detail-showcase .notes,
.governance-showcase .notes,
.federation-showcase .notes {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
```

Then remove the `note-grid` class from the federation notes div so it uses the showcase rule directly.

**Find (around line 919):**

```html
<div class="notes note-grid" aria-label="Federated epoch details">
```

**Replace with:**

```html
<div class="notes" aria-label="Federated epoch details">
```

§01 keeps `.note-grid` because it now has 3 notes after Fix 01 and the auto-fit rule still produces the right result.

---

## Fix 06 — Closer hierarchy needs kickers and consistent punctuation

The closer currently stacks four content blocks with no visual rhythm: the consortium grid, the success block (with a colon-ending h3), the priority grid, and the coda. Add kickers, fix punctuation, and unify hierarchy.

**Find the entire closer section content (around lines 946–1012)** and **replace the inner content with:**

```html
<section class="closer">
  <div class="shell">
    <div class="closer-grid">
      <div>
        <div class="section-kicker">Consortium target</div>
        <h2>Build the minimum credible succession demo.</h2>
        <p>
          The first program should not replace the internet. It should prove
          succession for a bounded community: a software ecosystem, university
          network, emergency-response consortium, or critical-infrastructure
          simulation.
        </p>
      </div>
      <a class="button" href="continuity_web_report.pdf">Open the technical report</a>
    </div>

    <div class="closer-block">
      <div class="section-kicker">Success criterion</div>
      <h3>What success actually looks like</h3>
      <p>
        Success is not adoption. Adoption is downstream. Success is whether,
        in a worked scenario where a federal authority issues a surveillance
        mandate to an ISP, the ISP epoch's policy delta is detectable by the
        home epochs that recognize it, those home epochs can re-route through
        alternative recognition paths, and the mandate becomes part of the
        public forensic record without being visible to the federal authority
        itself. Coercion attempted. Coercion detected. Coercion routed around.
        Coercion entered into the permanent record.
      </p>
    </div>

    <div class="closer-block">
      <div class="section-kicker">Build path</div>
      <h3>Four priorities</h3>
      <div class="priority-grid" aria-label="Build priorities">
        <div class="priority">
          <b>01</b>
          <strong>Governance specification</strong>
          <span>Quorum composition, validator selection, removal procedures, and capture resistance over time. The cryptography is solid. The governance layer is where real fragility lives.</span>
        </div>
        <div class="priority">
          <b>02</b>
          <strong>Worked adversarial scenarios</strong>
          <span>Federal coercion of an ISP epoch, manifest delta detection, and cross-epoch revocation. Working through these reveals where resistance is real versus assumed.</span>
        </div>
        <div class="priority">
          <b>03</b>
          <strong>Consumer prototype</strong>
          <span>The home epoch with AI capability passports — declared terms for your network, scoped authorization for AI agents, no perpetual access.</span>
        </div>
        <div class="priority">
          <b>04</b>
          <strong>Bounded community pilots</strong>
          <span>A university network, an ISP, or a mesh cooperative — small enough that governance is real, large enough to prove federation between two pilot epochs.</span>
        </div>
      </div>
    </div>

    <div class="closer-block coda-block">
      <div class="section-kicker">What falls out</div>
      <p class="coda">
        Continuity Web was designed to solve an AI safety problem. But the
        properties it produces — voluntary recognition, declared policies,
        private verification, forensic permanence, no architecturally
        privileged root — are also the properties the counter-economic
        tradition has wanted, and never had, for fifty years.
      </p>
      <p class="coda">
        Every generation got the vision right and hit the same wall: trust
        does not scale between strangers without institutions, and every
        institution is eventually captured. The agora was always the
        destination. This is finally the infrastructure.
      </p>
    </div>

    <footer class="footer">
      Continuity Web is a proposed open research program for recoverable
      legitimacy under catastrophic cyber compromise.
    </footer>
  </div>
</section>
```

Key changes in this block:
- Added `Success criterion` kicker before the h3, removed the colon from the h3
- Added `Build path` kicker and `Four priorities` h3 above the priority grid
- Added `What falls out` kicker before the coda
- Split the wall-of-text coda into two breathing paragraphs
- Added em-dashes in the coda for proper rhythm
- Wrapped each major block in `.closer-block` for consistent spacing

---

## Fix 07 — Closer kicker styling needs to work on dark background

The existing `.section-kicker` uses `color: var(--amber)` which works fine on the dark closer background, but the new closer-block kickers may need extra spacing. Add this rule.

**Find the closer block rules (around lines 522–530)** and **replace with:**

```css
.closer-block {
  margin-top: 56px;
}

.closer-block .section-kicker {
  color: var(--amber-2);
  margin-bottom: 12px;
}

.closer-block h3 {
  color: var(--paper);
  font-size: clamp(22px, 2.4vw, 28px);
  line-height: 1.15;
  letter-spacing: 0;
}

.closer-block p {
  margin-top: 18px;
}

.coda {
  max-width: 720px;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(244, 239, 227, 0.78);
}

.coda + .coda {
  margin-top: 18px;
}

.coda-block {
  border-top: 1px solid rgba(244, 239, 227, 0.16);
  padding-top: 36px;
}
```

This replaces the existing `.closer-block`, `.closer-block h3`, and `.coda` rules. The kicker color shifts to `--amber-2` (lighter) for better contrast on the dark navy background.

---

## Fix 08 — Priority grid needs a tablet breakpoint

Currently `.priority-grid` jumps from 4-column directly to 1-column at the 980px breakpoint. Tablets get a long vertical scroll. Add a 2-column intermediate.

**Find this rule inside the `@media (max-width: 980px)` block (around lines 609–614):**

```css
.detail-showcase .notes,
.governance-showcase .notes,
.federation-showcase .notes,
.priority-grid {
  grid-template-columns: 1fr;
}
```

**Replace with:**

```css
.detail-showcase .notes,
.governance-showcase .notes,
.federation-showcase .notes {
  grid-template-columns: 1fr;
}

.priority-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

Then **inside the `@media (max-width: 640px)` block (around lines 634–637)**, add `.priority-grid` to the existing 1-column rule:

```css
.hero-proof,
.modes,
.priority-grid {
  grid-template-columns: 1fr;
}
```

---

## Fix 09 — Hero proof tiles overstretch on shell-wide

The hero now uses `.shell shell-wide` (1780px max), but `.hero-proof` is `repeat(3, ...)` so each tile becomes ~590px wide with only ~150px of text content — a lot of empty space. Constrain the proof grid back to the standard shell width while keeping the visual frame wide.

**Find the `.hero-proof` rule (around lines 203–210):**

```css
.hero-proof {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin-top: 26px;
  border: 1px solid rgba(21, 23, 24, 0.14);
  background: rgba(21, 23, 24, 0.12);
}
```

**Replace with:**

```css
.hero-proof {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin-top: 26px;
  max-width: 1180px;
  border: 1px solid rgba(21, 23, 24, 0.14);
  background: rgba(21, 23, 24, 0.12);
}
```

Single addition: `max-width: 1180px;` keeps the proof tiles at standard shell width even when their parent uses shell-wide.

---

## Verification checklist

After applying all fixes, confirm:

- [ ] §01 has exactly 3 notes (no machine-speed duplication)
- [ ] Manifest item 05 opens with "Coercion cannot be silent" (no period after bold opener)
- [ ] Manifest image aligns with the top of the manifest list, not centered
- [ ] The "Privacy is the security property" quote band sits as its own section between governance and federation, with the proper `.shell` wrapper
- [ ] Federation section's three notes render in a 3-column grid matching governance and quarantine
- [ ] Closer has four kickers: Consortium target / Success criterion / Build path / What falls out
- [ ] H3 in closer ("What success actually looks like") has no trailing colon
- [ ] Priority grid renders 4-col on desktop, 2-col on tablet (640–980px), 1-col on phone
- [ ] Hero proof tiles do not exceed 1180px width even when hero is shell-wide
- [ ] Coda is two paragraphs with em-dashes, not one wall of text

## What was kept (do not touch)

- Hero headline: "Fork authority. Prune compromise." stays as-is
- All image assets and paths
- Color palette (paper / navy / amber / cyan tokens)
- Font stack
- Section ordering: hero → failure → quote → manifest → quarantine → governance → privacy quote (new) → federation → closer
- The 6-mode degradation grid in governance
- Manifest list at 5 items (not 4)
