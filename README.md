# Continuity Web

Continuity Web is a proposed trust-succession architecture for preserving
legitimate digital authority under catastrophic cyber compromise, including
rogue-AI scenarios where identity providers, update channels, cloud control
planes, routing authorities, and institutional operators may no longer be
reliable sources of command.

The central claim is narrow: the system does not fork the physical internet. It
forks authority. Old infrastructure may remain reachable and useful as data, but
it should not automatically retain the power to authenticate, update, govern,
delegate, or command a successor network.

## Repository Layout

```text
src/
  continuity_web_report.tex          Full technical report source
  continuity_web_concept_brief.tex   Short concept brief source

dist/
  index.html                         Standalone web presentation entrypoint
  continuity_web_report.pdf          Published report PDF
  continuity_web_concept_brief.pdf   Published concept brief PDF

images/
  Supporting presentation and brief images
```

The canonical editable sources are in `src/`. The current published PDFs are in
`dist/`.

## Static Site Upload

The deployable mini site lives in `dist/`. Upload the contents of `dist/` as one
static folder. The root page is `index.html`, and the CTA links intentionally use
relative paths:

```text
continuity_web_concept_brief.pdf
continuity_web_report.pdf
```

Those PDFs must stay beside `index.html` in the uploaded folder so the links work
from the eventual here.now URL.

## Build

This repository expects a LaTeX distribution with `latexmk`.

```sh
make
```

To clean generated LaTeX artifacts:

```sh
make clean
```

## Rights

The documents, images, and other non-code materials in this repository are
licensed under the Creative Commons Attribution 4.0 International License
(CC BY 4.0). You may share and adapt the material with attribution. See
`LICENSE.md`.

This repository is intended to support open standards discussion and related
institutional work. Contributions intended for IETF, DINRA, or similar standards
bodies may also be subject to those bodies' contribution rules and IPR policies.
