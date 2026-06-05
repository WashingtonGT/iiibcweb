<!-- INTERNAL: HTML conversion spec for IIIBC non-profit module web pages. Not a delivered page. -->

# Module Page — HTML Conversion Spec

Convert one source module markdown (`/training/non-profit/module-N-*.md`) into a styled HTML page at
`/home/bgao/ai-success/web/non-profit/module-N-<slug>.html`. **Preserve ALL substantive content** — every table,
callout, code/ASCII block, list, exercise, answer key, template, knowledge-check Q&A, and source. This is a faithful
conversion, not a summary.

All styling comes from `training.css` (already created). You mostly emit semantic HTML; the stylesheet handles looks.

## Required page skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Module N: <Title> — IIIBC Non-Profit AI Training</title>
  <meta name="description" content="<one-line purpose>">
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="training.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>

<header class="nav"><div class="container nav__inner">
  <a class="nav__logo" href="../non-profit-training.html"><img src="../assets/logo.svg" alt="IIIBC — Beyond Cognition" width="140" height="24"></a>
  <nav class="nav__links">
    <a href="../non-profit-training.html">All Modules</a>
    <a href="../non-profilt-assessment.html">Assessment</a>
    <a href="../index.html">IIIBC</a>
  </nav>
</div></header>

<header class="page-header"><div class="container">
  <div class="page-header__eyebrow">IIIBC Non-Profit AI Training · Module N</div>
  <h1><Title></h1>
  <p class="page-header__purpose"><the &gt; one-line purpose from the md></p>
  <div class="page-header__badges">
    <span class="badge badge--level">Level: <level></span>
    <span class="badge badge--section">Assessment §N — <section name></span>
    <span class="badge badge--audience"><primary audience></span>
  </div>
</div></header>

<main id="main" class="container"><div class="module-layout">

  <!-- LEFT: sticky in-page TOC, one link per ## section -->
  <aside class="toc"><div class="toc__title">On this page</div><ul>
    <li><a href="#glance">At a Glance</a></li>
    <li><a href="#why">Why This Module Exists</a></li>
    <li><a href="#objectives">Learning Objectives</a></li>
    ... one <li><a href="#id">…</a></li> per ## heading ...
  </ul></aside>

  <!-- RIGHT: the converted content -->
  <div class="module-content">

    <!-- "At a Glance" becomes a definition-list card, NOT a table -->
    <section id="glance">
      <div class="glance">
        <div class="glance__head">At a Glance</div>
        <dl>
          <dt>Module</dt><dd>…</dd>
          <dt>Maps to assessment section</dt><dd>…</dd>
          ... every row from the md's At a Glance table ...
        </dl>
      </div>
    </section>

    <section id="why"><h2>Why This Module Exists</h2> … </section>
    <section id="objectives"><h2>Learning Objectives</h2> <ol>…</ol></section>
    ... one <section id="…"> per remaining ## heading, in order ...

  </div>
</div>

  <!-- prev/next within main.container but outside module-layout is fine; place at end of module-content -->
  <nav class="module-foot-nav">
    <a class="prev" href="<prev module file or ../non-profit-training.html>"><span class="dir">← Previous</span><span class="ttl">…</span></a>
    <a class="next" href="<next module file or ../non-profit-training.html>"><span class="dir">Next →</span><span class="ttl">…</span></a>
  </nav>
</main>

<footer class="footer"><div class="container">
  <div class="footer__top">
    <div>
      <img src="../assets/logo-white.svg" alt="IIIBC — Beyond Cognition" width="150" height="24">
      <p class="footer__tag"><strong>Beyond Cognition. Built for Business.</strong><br>AI training that amplifies your mission — not your risk.</p>
      <p class="footer__pillars">INTELLIGENT · INNOVATION · INTERCONNECT</p>
    </div>
    <div class="footer__links">
      <a href="../non-profit-training.html">All Modules</a>
      <a href="../non-profilt-assessment.html">Readiness Assessment</a>
      <a href="mailto:contact@iiibc.com">contact@iiibc.com</a>
    </div>
  </div>
  <div class="footer__bottom">
    <span>© 2026 IIIBC — AI Strategy Institute. All rights reserved.</span>
    <span class="mono">Module N · Non-Profit Training Kit v1.0</span>
  </div>
</div></footer>
</body>
</html>
```

## Markdown → HTML mapping rules

- `## Heading` → `<section id="kebab-id"><h2>Heading</h2> … </section>`. Give each section a short stable id (why, objectives, agenda, content, exercises, templates, knowledge-check, facilitator, scorecard, sources). The TOC links to these ids.
- `### Sub` → `<h3>`, `#### ` → `<h4>`.
- Markdown tables → real `<table><thead><tr><th>…</th></tr></thead><tbody>…</tbody></table>` (the CSS styles them automatically inside `.module-content`). Do not add classes.
- **The "At a Glance" table is the ONE exception** → render as the `.glance` definition-list card shown above (not a table).
- Bullet lists → `<ul><li>…</li></ul>`; numbered lists → `<ol><li>…</li></ol>` (objectives, agendas-as-lists, steps).
- **Blockquote callouts** — map by their bold label to a styled div:
  - `> **SIGNAL:** …` → `<div class="callout callout--signal"><span class="callout__label">Signal</span><p>…</p></div>`
  - `> **NOISE:** …` → `callout--noise` / label "Noise"
  - `> **PRACTITIONER NOTE:** …` → `callout--practitioner` / label "Practitioner note"
  - `> **SAFEGUARD:** …` → `callout--safeguard` / label "Safeguard"
  - `> *Research note …*` or other plain `>` quotes → `<div class="callout callout--note"><span class="callout__label">Note</span><p>…</p></div>`
- Fenced code blocks / ASCII diagrams / templates (``` … ```) → `<pre><code>…</code></pre>`. **HTML-escape** `<`, `>`, `&` inside. Preserve whitespace exactly.
- Inline `code` → `<code>…</code>`. Inline **bold**/*italic* → `<strong>`/`<em>`.
- Links `[t](u)` → `<a href="u">t</a>`. Keep relative md links pointing to sensible web targets (e.g., the assessment → `../non-profilt-assessment.html`; sibling modules → their html file; the plan → leave as a labeled link to `#`/note if no web equivalent — prefer linking to `../non-profit-training.html`).
- Knowledge-check answer keys: keep them visible (a `<h3>Answer key</h3>` + list/paragraph is fine).
- The md footer line → omit (the page `<footer>` replaces it).

## Module file → slug → prev/next map

| N | source md | output html | prev | next |
|---|-----------|-------------|------|------|
| 1 | module-1-mission-leadership-board.md | module-1-mission-leadership-board.html | ../non-profit-training.html | module-2-data-foundations-governance.html |
| 2 | module-2-data-foundations-governance.md | module-2-data-foundations-governance.html | module-1-mission-leadership-board.html | module-3-ai-toolkit-safe-tools.html |
| 3 | module-3-ai-toolkit-safe-tools.md | module-3-ai-toolkit-safe-tools.html | module-2-data-foundations-governance.html | module-4-ai-fluency-4d-champions.html |
| 4 | module-4-ai-fluency-4d-champions.md | module-4-ai-fluency-4d-champions.html | module-3-ai-toolkit-safe-tools.html | module-5-funding-mission-roi.html |
| 5 | module-5-funding-mission-roi.md | module-5-funding-mission-roi.html | module-4-ai-fluency-4d-champions.html | module-6-fundraising-donor-trust.html |
| 6 | module-6-fundraising-donor-trust.md | module-6-fundraising-donor-trust.html | module-5-funding-mission-roi.html | module-7-responsible-ai-beneficiary-safeguards.html |
| 7 | module-7-responsible-ai-beneficiary-safeguards.md | module-7-responsible-ai-beneficiary-safeguards.html | module-6-fundraising-donor-trust.html | module-8-ai-grant-lifecycle.html |
| 8 | module-8-ai-grant-lifecycle.md | module-8-ai-grant-lifecycle.html | module-7-responsible-ai-beneficiary-safeguards.html | ../non-profit-training.html |
