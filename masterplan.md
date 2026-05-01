# Boris — Portfolio Masterplan

_A strategic blueprint for a SvelteKit + Threlte + Sanity portfolio that wears expertise like a heritage atelier — and proves it on a dedicated /lab page._

**Version 2.0 — Luxury Repositioning.** This document supersedes earlier versions in tone, palette, hero direction, and home-page flow. Architectural commitments (rendering strategy, Three.js architecture, Sanity topology, performance budgets) are unchanged.

---

## 0. How to Use This Document

This plan is consumed in two passes:

1. **Design pass:** Sections 1–6 and 8–10 drive look, feel, and structure.
2. **Build pass:** Sections 3, 7, 9, 11–16 drive implementation. Section 16 is the sprint execution order.

Treat every section as modular. You can pull individual sections into focused Claude conversations without losing context.

A companion document, `portfolio-claude-code-prompts.md`, contains the sprint-by-sprint prompts. Both files travel together.

---

## 1. Strategic Positioning — The "Why"

### 1.1 The Repositioning

Earlier iterations of this plan staked Boris's identity on the **dev + CRO duality** — a portfolio that ran A/B tests on itself and announced its enterprise clients (Toyota, Lexus, Hitachi, Valtech) prominently. That positioning is technically true but rhetorically loud. It sells.

The refined positioning is quieter and more confident. The site presents Boris as a **maker of things of enduring value** — measured, considered, technically rigorous — and contains the entire experimentation layer behind a single elegant door labeled `/lab`. Visitors who care about CRO will find every receipt they need there. Visitors who just want to see craft will leave the home page with an impression of composure, not a sales pitch.

This is not a downgrade of the CRO claim. It's a structural argument that **anyone who runs experiments to this level of discipline doesn't need to advertise it on the door.**

### 1.2 Positioning Statement

> _Boris builds things of enduring value, and proves it._
>
> _A full-stack developer and CRO specialist whose work demonstrates the patience, precision, and measurability that distinguish craft from production._

### 1.3 Audience Hierarchy (revised for the new positioning)

The home page must satisfy these audiences in this order. Earlier audiences who have moved down the funnel to `/lab`, `/work`, or `/about` will find what they need there.

| Priority | Audience                                         | Home Page First Impression                   | Where They Find Proof                                                          |
| -------- | ------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------ |
| 1        | Founders, agency leads, design-conscious clients | "This person has taste and substance"        | Home → /work for portfolio depth                                               |
| 2        | Engineering managers and senior engineers        | "Considered, technically modern, well-built" | Home → /work/[slug] for case-study depth                                       |
| 3        | Technical recruiters                             | "Senior. Worth a longer look."               | Home → /lab for client names + measurable outcomes; /about for résumé/timeline |
| 4        | Fellow developers                                | "This is genuinely well-made"                | Home (3D, performance, type) → /uses, /writing                                 |

The implication: the home page does **not** carry recruiter-scanning duty. That work happens on `/lab` and `/about`, which are one click away. The trade is intentional — short-term scannability for long-term distinction.

### 1.4 Brand Voice

- **Composed, not performative.** "Builds things of enduring value" beats "I ship and measure."
- **Confident, never anxious.** Never explain what you do; demonstrate it.
- **Specific, never abstract.** Name the technology, name the outcome — but only when relevant.
- **Dry humor allowed in microcopy and footer.** Earned levity, not constant levity.
- **Avoid marketing verbs.** No "transforms", "leverages", "drives results", "10x", "revolutionizes."

The voice is the voice of a master craftsman explaining a process to a peer — not an agency pitching to a client.

---

## 2. Tech Stack — Validated Choices

The stack remains: **SvelteKit + shadcn-svelte + Tailwind + Sanity + Threlte**. The reasoning below is unchanged from prior iterations because the choices are aesthetic-agnostic and serve the new direction equally well.

### 2.1 SvelteKit (framework)

The most important framework choice in the project. Boris's CV is React-heavy; choosing SvelteKit signals discernment and precision. Smaller bundles than any mainstream meta-framework — pairs cleanly with the heavier 3D scenes called for in §7. Built-in SSR, file-based routing, and form actions remove integration friction with Sanity.

Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`) are mandatory throughout. No legacy `$:` reactive statements; no `export let`. The codebase reads modern.

**Watch for:** shadcn-svelte is a community port of shadcn/ui. Coverage is high but not 100%. Validate component availability before locking design. Threlte 8 is the Svelte equivalent of react-three-fiber and is the right choice for §7.

### 2.2 shadcn-svelte + Tailwind (design system)

Unopinionated, accessible primitives that you fully own. Tailwind handles everything else. Add `tailwind-merge`, `clsx`, `@tailwindcss/typography` for the long-form prose surfaces.

Custom-themed for the luxury palette in §5 — shadcn's defaults are too generic for this direction. Expect to override the base color tokens entirely.

### 2.3 Sanity (CMS)

Projects, case studies, blog posts, testimonials, and experiment metadata all live as Sanity documents. This separates content from code, supports drafts and versioning, and gives Boris a clean editing experience for ongoing updates.

Studio embedded at `/studio`, route-code-split — zero bundle cost for non-author visitors. Single deploy, single domain.

### 2.4 Three.js / Threlte (the creative layer)

Where the portfolio becomes irreplaceable. Plan in depth in §7. Architecturally: a single root `<Canvas>` in `+layout.svelte`, with each scene declaring a `<View>` portal — one renderer, one HDRI, one frameloop, predictable performance.

### 2.5 Stack Additions

| Purpose           | Library                                                       |
| ----------------- | ------------------------------------------------------------- |
| Smooth scroll     | **Lenis** (the canonical choice — friction tuned to 0.08–0.1) |
| Form & validation | **Superforms + Zod**                                          |
| Analytics & flags | **PostHog** (EU cloud for data residency)                     |
| Errors & perf     | **Sentry**                                                    |
| Email             | **Resend**                                                    |
| Icons             | **Lucide Svelte**                                             |
| Image             | Sanity image pipeline + `@sanity/image-url`                   |
| Hosting           | **Vercel** (adapter-vercel; ISR support for /lab)             |

---

## 3. Information Architecture

### 3.1 Sitemap

```
/                           Home — quiet, considered, identity-forward
/about                      Background, approach, philosophy
/work                       All projects index (Sanity-driven)
/work/[slug]                Project case study (long-form, gallery-style)
/writing                    Notes / essays index
/writing/[slug]             Individual post
/lab                        ★ The experimentation salon — live A/B tests, enterprise clients, CRO methodology
/playground                 Interactive code demos and snippets
/uses                       Tools, editor, hardware
/contact                    Contact form + direct channels
/studio (auth-gated)        Sanity Studio
/404                        Custom 3D 404 scene
```

`/lab` is now a first-class route with its own gravitational pull on the site. It is the destination of the CRO meta-layer. Every visitor who lands on the home page is gently invited toward it via a single understated cue (§3.4).

### 3.2 Primary Navigation

A single thin top bar, no backdrop blur (we don't want the look of frosted glass — see §5.5 forbidden patterns). Scroll-up reveal, scroll-down hide. Items in the order they appear:

`Work · About · Lab · Writing · Contact`

Left side: a small monogram `B.` in the display serif, a discreet gold rule beneath it on hover. Right side: a single understated availability indicator pulled from Sanity (e.g., "Selectively booking · Q3 2026"), no theme toggle on the home page (single canonical mode — see §5.4), and a Contact link that becomes a soft-edged button only on `/contact` and `/work/[slug]` pages.

On mobile: a small "Menu" word link (not a hamburger icon — too template-feeling) → full-bleed overlay with oversized type, an ambient sculptural element, and the availability line at the bottom in mono.

### 3.3 Home Page Section Flow (the considered path)

The home page is a slow read. It does not sell, raise objections, or prove credentials. Its job is to communicate identity and craft, then offer a single understated path to deeper proof.

| #   | Section                | Purpose                                                         | Visual Weight         |
| --- | ---------------------- | --------------------------------------------------------------- | --------------------- |
| 1   | **Hero**               | Establish identity. Demonstrate craft via the sculpture.        | LOUD                  |
| 2   | **Practice**           | Boris's discipline in his own words. Short, considered prose.   | MEDIUM                |
| 3   | **Selected Work**      | Three projects, gallery-presented. Outcome-focused captions.    | LOUD                  |
| 4   | **Craft / Skills**     | A typographic compendium of proficiency. Quietly authoritative. | QUIET                 |
| 5   | **Whisper to the Lab** | One sentence in gold ink: "Curious about proof? Visit the Lab." | QUIET (intentionally) |
| 6   | **Testimonial**        | A single voice. Not a carousel.                                 | MEDIUM                |
| 7   | **Contact**            | Generous, calm, single primary path.                            | LOUD                  |
| 8   | **Footer**             | Final composure. Last-deployed timestamp, sitemap, source.      | QUIET                 |

What is **not** on the home page (intentional removals from prior versions):

- ❌ Proof bar of enterprise client logos (moved to `/lab`)
- ❌ "The CRO Angle" editorial section explaining duality (moved to `/lab` as the page's premise)
- ❌ Live Experiment widget showing on-page A/B variants (moved to `/lab`)
- ❌ "Choose your path" persona selector (eliminated entirely — too clever, breaks calm)
- ❌ Process diagram (moved to `/about`)
- ❌ Inline feedback widgets ("Useful? 👍 👎") (eliminated — wrong tone for home)

### 3.4 The /lab Page (the experimentation salon)

`/lab` is where the entire CRO meta-layer lives. The page is structured like a private research folio — warm-paper backgrounds, gold-accented data tables, monospace typography for numerical surfaces. It is **the** destination for any visitor who arrived asking "does he actually do CRO?"

Page sections, in order:

1. **Premise.** A short, controlled introduction: this site is a working demonstration of conversion methodology. Below the fold, the page shows live experiments, referrer-aware copy, the "two competing sculptures" 3D piece, and a credibility panel of enterprise clients (Toyota, Lexus, Hitachi, Valtech, DS Smith) presented as facts, not as boasts.
2. **The two competing sculptures (3D).** Two sculptural forms — one in marble, one in brass — render side by side, each tied to a live PostHog feature flag. As traffic flows through the experiment, the sculptures shift weight and color in real time. This is the project's signature 3D piece.
3. **Currently running experiments.** Cards displaying name, hypothesis, variant A/B, sample size, conversion rates, p-value, sparkline of sample-size growth. Each card is a quiet folio entry, not a marketing card.
4. **Concluded experiments.** Including at least one publicly visible inconclusive or losing result — the honest signal that the methodology is real.
5. **Methodology.** A short prose section describing the tooling (PostHog, server-side flag evaluation, no flash-of-wrong-variant), the privacy posture (what's tracked, what isn't), and the limitations (sample sizes are small on a personal site, results are published anyway).
6. **Enterprise credibility panel.** Toyota, Lexus, Hitachi, Valtech, DS Smith — set in understated serif graphite on ivory, each with a one-line attribution of role and outcome. Facts, presented calmly.
7. **CTA.** "Want this rigor on your product? — [Get in touch]"

Render strategy: SSR with 5-minute edge cache (PostHog stats change continuously; cache prevents API hammering — see §2.4 of the prompts companion document).

---

## 4. Copywriting Drafts

### 4.1 Hero

The hero copy needs to do two things simultaneously: communicate identity and demonstrate composure. Earlier punchier drafts ("I build web apps. Then I test them until they convert.") are retired — they're too declarative for the new tone.

**Recommended headline:**

> Full-stack developer and CRO specialist who builds things of enduring value — and proves it.

**Optional alternative if the recommended one feels too long:**

> A practice in considered software.

**Subheadline:**

> Three years of production work in React, SvelteKit, and Node — and a quieter discipline of measurement and iteration that runs underneath all of it.

**Primary CTA:**

> See selected work →

**Secondary CTA:**

> About the practice

Pair with a single sculptural Three.js scene — see §7.1.

### 4.2 Practice section (replaces "About" lead-in on home)

> I write production software for a living, and I run experiments on it for the same reason a craftsman sharpens his tools: because the work demands it.
>
> Most engineering ends at deployment. Mine begins there. A component is finished when its purpose is named, its metric is measurable, and the measurement says it earns its place. That discipline came from three years of running A/B tests for clients whose decisions move real money. It stays with me on every project, whether I'm being paid for the experiments or not.
>
> What you'll find here is the visible part of that practice — the work that shipped, the writing that explains it, and the laboratory where the methodology is on display. The rest is between me and the codebases.

### 4.3 Selected Work section copy

Eyebrow: `01 — SELECTED WORK`
Heading: `Three projects, three different kinds of hard.`
Lede: 1-2 lines, in the new voice — no metric chips on the homepage cards (those move to `/lab` and `/work/[slug]`).

Project cards on the home page use **outcome-focused captions** rather than metric badges. The metric badges still exist on `/work/[slug]` and on `/lab`, but the home page captions read like gallery placards:

**Hitachi M&B — Restaurant Platform** | _Frontend Developer, 2025 — present_

> Responsive React and TypeScript components for a multi-brand restaurant platform serving millions of diners. Owned the mobile UX recovery and the scroll-loading rewrite. Integrated with AEM via Java Sling Models.

**Valtech — Internal Org-Intelligence** | _Lead Frontend, 2025 — present_

> Lead developer on Valtech's internal platform for organizational visibility. An interactive circular line-org visualization, dynamic salary-range comparisons, owned end-to-end from data shape to module architecture.

**Quizzle — Real-time Multiplayer** | _Full-Stack, 2024 — 2025_

> A real-time multiplayer quiz platform built with a team of four. End-to-end type safety from Drizzle schemas through Zod inference into the Hono backend, with a Go-based WebSocket layer for the live game loop and SST for serverless deployment.

The Toyota/Lexus and DS Smith projects move from the homepage selection to `/lab` and `/work` respectively, since their primary value is the measurable-outcome proof — exactly the kind of evidence that belongs in the lab.

### 4.4 Whisper to the Lab

A single line, set on its own with generous whitespace. The only place gold ink appears as text on the home page (an intentional accent moment — see §5.5).

> _Curious about proof?_ — Visit the Lab.

The "Visit the Lab" portion is the link, gold-foiled on hover, otherwise the same color as body text.

### 4.5 Testimonial

Single quote, displayed large, no carousel, no dot pagination. If only one strong testimonial exists, that is the design. Faking five mediocre ones is worse than one excellent one.

### 4.6 Contact CTA

Eyebrow: `07 — GET IN TOUCH`
Heading: `Let's discuss the work.`
Sub: `I take on a small number of engagements each quarter — usually one significant build, occasionally a CRO program for a team that already ships well.`

Primary: `Begin a conversation`
Secondary row (in mono): `Copy email · Book 20-min call`

### 4.7 Footer

> Made in Skopje. Built in SvelteKit, with Threlte and Sanity. Last deployed `<timestamp>`. The source is on GitHub — issues welcomed; pull requests warmly received.

### 4.8 CTA Microcopy Bank (revised for the new tone)

For buttons and inline links throughout the site:

- `See selected work →`
- `Read the full case study`
- `About the practice`
- `Begin a conversation`
- `Visit the Lab`
- `Copy email`
- `Book 20-min call`
- `Download résumé`

Removed (too punchy / wrong voice): `Get in touch fast`, `Start a project`, `Hire me for similar work`, `Talk data and AI with me`.

---

## 5. Visual Design Direction (refined for luxury)

### 5.1 Core Aesthetic

**A heritage atelier.** Reference points: the digital surfaces of Aman, Loro Piana, Hermès Maison; editorially: _Apartamento_, _Cabana_, _The Gentlewoman_; in software: Linear's restraint and Notion's older identity, never their newer ones; Rauno Freiberg's portfolio for craft; Brittany Chiang for clarity but not for color.

The site wears luxury without shouting. Every surface feels considered, substantial, and calm. Generous whitespace as the foundational element. Typography handled with extreme precision. Materials and textures present but never dominant.

### 5.2 Palette

The palette is **warm-neutral with a single gold accent**. There are no competing saturated colors. Earlier "electric green" tokens are retired entirely.

Tokens in OKLCH for perceptual uniformity:

| Token             | Dark Mode (default)                                                        | Light Mode                                         |
| ----------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| `--bg`            | `oklch(0.18 0.005 60)` (deep obsidian, faint warm tone — never pure black) | `oklch(0.97 0.008 80)` (warm ivory)                |
| `--bg-elevated`   | `oklch(0.22 0.005 60)`                                                     | `oklch(1.0 0 0)`                                   |
| `--surface-paper` | `oklch(0.21 0.006 60)`                                                     | `oklch(0.95 0.012 80)` (warm linen — used on /lab) |
| `--text`          | `oklch(0.94 0.004 80)` (soft ivory, never pure white)                      | `oklch(0.22 0.005 60)`                             |
| `--text-muted`    | `oklch(0.68 0.005 60)` (warm slate)                                        | `oklch(0.48 0.008 60)`                             |
| `--text-subtle`   | `oklch(0.52 0.004 60)`                                                     | `oklch(0.62 0.005 60)`                             |
| `--hairline`      | `oklch(0.94 0.004 80 / 0.08)`                                              | `oklch(0.22 0.005 60 / 0.10)`                      |
| `--accent`        | `oklch(0.78 0.10 85)` (champagne gold)                                     | `oklch(0.68 0.12 80)` (deeper gold)                |
| `--accent-deep`   | `oklch(0.62 0.12 78)` (24k gold leaf, used sparingly)                      | `oklch(0.55 0.14 75)`                              |

Notes:

- Dark mode is the canonical experience. Light mode exists but is not the showcase.
- Backgrounds are never pure black — always carry a faint warm tone (chroma 0.005–0.008 around hue 60).
- The accent gold has TWO values: a brighter "champagne" for type and rules, a deeper "leaf" for solid CTAs. Used in combination they create a sense of depth without ever introducing a second hue.

### 5.3 Typography

**Display:** PP Editorial New (preferred) or Instrument Serif (free fallback). Treat with extreme precision. Used at 84px on H1 (desktop), letter-spacing -0.025em, line-height 0.95. Never below 28px — at small sizes the serif loses its character.

**Body & UI:** Inter Variable. Tight tracking on body (-0.005em). Body text at 17px / 1.65 line-height — slightly larger and more spacious than the editorial-technical previous version, in service of the calmer reading rhythm.

**Mono / Detail:** JetBrains Mono Variable. Used **structurally only** — for eyebrow labels (uppercase, 12px, 0.12em letter-spacing), for numerical data (tabular-nums always), for timestamps, for stack chips. Never as decorative element. Never for body prose.

A discreet 1px gold rule (0.5px effective, scaled) sits beneath every H1, 32px below the baseline. Not optional — it is part of the typography system.

### 5.4 Materials & Texture (implemented with restraint)

- **Subtle paper fibre** on `/lab` and on case-study reading surfaces — implemented as a low-opacity SVG noise overlay, 1.5–2% opacity, multiply blend mode. Never a heavy raster image.
- **Honed marble suggestion** on the hero sculpture (Three.js material, not a CSS surface).
- **Brushed brass suggestion** on accent UI moments — the hover state of the primary CTA, the gold rule beneath H1s. Implemented via subtle CSS gradients on the gold (a 2-stop gradient within `--accent` itself, ~5% lightness variation).
- **Venetian plaster** never frosted glass. If a surface appears semi-translucent, it draws on warmth and texture — never on the cool, clinical look of glassmorphism.

### 5.5 Forbidden Patterns (hard rules)

These are not stylistic preferences. They cheapen the surface and break the atmosphere. Refuse them throughout the build:

- ❌ Gradient buttons of any kind — solid fills only
- ❌ Glassmorphism / frosted-glass overlays
- ❌ Backdrop-blur on the navigation (kept it in earlier drafts; retired now)
- ❌ Neumorphism, harsh drop shadows, default-browser focus blues
- ❌ Oversaturated neons (electric green, magenta, electric blue) — anywhere
- ❌ Gold used as background fill or as text fill (gold is accent only — rules, hover states, small marks)
- ❌ Inter for display type (paying for a serif; use it)
- ❌ Rounded-full pill primary CTAs
- ❌ Icon-in-circle feature visuals
- ❌ Auto-playing looping video backgrounds
- ❌ Purple-to-pink gradients anywhere, ever
- ❌ Emoji as decorative layout elements (one in microcopy is fine)
- ❌ The word "transforms" in body copy

### 5.6 Spatial System

- 12-column grid, 1440px max-width desktop, 1.5rem gutters.
- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192` (added 192 for the new looser rhythm).
- Section vertical padding: **192px desktop** standard, **256px** for the loudest sections (hero, contact). On mobile: 96px standard, 128px loud.
- Radius: `--radius: 0.5rem` (slightly tighter than shadcn default — feels more architectural).
- Hairlines (1px at 6–10% opacity in `--hairline`) separate every major section. Never gaps alone.
- Prose columns capped at 64ch (slightly tighter than the previous 68ch — heritage editorial reading width).

### 5.7 Motion Language

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for entrances (slow-eased, weighty out-quint). `cubic-bezier(0.32, 0.72, 0, 1)` for springs. `cubic-bezier(0.4, 0, 0.2, 1)` for UI reactions.
- **Duration:** 120ms (hover), 280ms (UI state), 480ms (section beats), 800ms (hero reveal). The new direction asks for slightly slower motion than the previous editorial-technical brief — motion suggests mass, not snap.
- **Stagger:** 60ms between siblings (was 40ms), max 5 in a chain.
- **Scroll** via Lenis, friction 0.08 — the "polished stone sliding" sensation.
- **Hover bloom:** primary CTAs gain a soft gold halo on hover (a `box-shadow` of `0 0 24px oklch(0.78 0.10 85 / 0.18)`), never a harsh color shift.
- Reduced-motion: all entrance motion drops to opacity-only fade. Custom cursor disabled. Particle field replaced by a static noise gradient.

---

## 6. Component Inventory

shadcn-svelte components used: `Button`, `Card`, `Badge`, `Avatar`, `Dialog`, `Sheet`, `Tabs`, `Separator`, `Tooltip`, `Toast`, `Accordion`, `ScrollArea`, `DropdownMenu`, `NavigationMenu`, `Input`, `Textarea`, `Label`, `Form`, `Select`, `Popover`. Custom-themed for the luxury palette — shadcn defaults are too generic.

Custom components built for this project:

1. `<MetricChip value="+15%" label="revenue" trend="up" />` — appears on `/work/[slug]` and `/lab` only. Not on the home page.
2. `<StackChip tech="React" />` — small mono pill, optional tooltip showing years used.
3. `<ProjectCard variant="gallery" | "compact" />` — gallery variant for home and /work; compact for related projects.
4. `<ExperimentCard />` — used only on `/lab`. Folio-styled, mono-heavy.
5. `<SectionHeader eyebrow title lede />` — editorial-style headers with the gold rule beneath.
6. `<GoldRule width="auto" | "32px">` — the discreet horizontal accent line.
7. `<TerminalBlock />` — code/output box with copy button.
8. `<ThreeView>` — wrapper around Threlte's `<View>` portal that handles intersection-pause and reduced-motion fallback.
9. `<MagneticTarget>` — a Svelte action for the gentle gold-glow hover on primary CTAs.
10. `<AvailabilityNote>` — the calm availability indicator in the nav, content driven by Sanity settings.
11. `<WhisperLink>` — the gold-ink link style used exclusively for the home-page lab whisper.
12. `<ScrambleText>` — the character-decode effect, used only on section eyebrows on the home page (sparingly).

---

## 7. Three.js Creative Direction (refined for the new aesthetic)

The 3D layer is split deliberately: the home page carries **one** sculptural piece that communicates craft; the `/lab` page carries the more conceptual **two-sculptures** A/B test piece. Every other 3D moment from prior versions is reconsidered against the calmer direction.

### 7.1 Hero Scene — "The Sculpture" (home page)

A **single** abstract sculpture occupying the right portion of the hero, slowly rotating, lit warmly. No second variant on the home page — that idea moves to `/lab` (§7.2).

**Form:** an extruded monogram "B." as a sculptural object, or alternately a slowly rotating torus-knot of generous proportions. Solid form, not glass — translucent glass-iridescent looks read as 2020 and as cheap. The form is **carved**: it suggests alabaster, polished brass, or cast bronze depending on the lighting moment.

**Material:** `MeshPhysicalMaterial` with low transmission (0–0.15, optional), high clearcoat (1.0), low roughness (0.18), subtle subsurface tint (warm ivory base, faint amber). Two material treatments alternate with very slow scroll progression — alabaster (lighter, matter) at the top of the hero, brass (warmer, more reflective) deeper into the scroll. Iridescence retired entirely (too "tech").

**Environment:** a custom warm HDRI (compressed to KTX2, <300KB) with golden-hour studio lighting. The sculpture's reflections carry the gold accent palette without ever introducing the gold as a separate color element.

**Motion:** a very slow idle rotation, one full revolution per ~80 seconds. Mouse parallax affects the camera (not the mesh) at low magnitude — bounded to ±2° pitch/yaw. The motion should be perceptible only when the visitor pauses to watch.

**Why this works:** the sculpture is an embodiment of "considered software." It does not announce; it reveals on attention. It is the visual anchor of the new positioning.

### 7.2 The Two Competing Sculptures — `/lab` only

The "two competing sculptures" concept survives but moves to where it belongs: the laboratory. On `/lab`, two sculptural forms render side-by-side — one rendered in **honed marble** (cool, matte, crystalline), one in **polished brass** (warm, reflective, soft). Each is bound to one variant of an active PostHog feature flag. As traffic flows through the experiment, the sculptures' relative scales and material properties shift — the "winning" sculpture is rendered larger and with slightly more vivid material reflectance. A live counter beneath both, in mono, displays current sample sizes and conversion rates.

This is the project's signature 3D piece. It is also the single place where the CRO meta-layer becomes visually legible — physically beautiful evidence that the methodology is real and ongoing.

**Tech notes:** declared as a `<View>` portal in the root canvas, lazy-loaded when `/lab` is visited. Uses the same shared HDRI as the home sculpture. PostHog flag values are read server-side at request time (cached 5 min) and passed as props into the scene.

### 7.3 Ambient Background — Particle Field (refined)

The particle field from earlier versions survives but is **dramatically restrained** for the new aesthetic. It is now:

- ~8,000 particles (down from 50,000) — the previous count read as effortful
- Warm-toned (off-white with faint amber, opacity 18%)
- Drifts gently, no shape-shifting between sections (the earlier "forms a bar chart, then a funnel" idea is retired — too literal, breaks the calm)
- Implemented as a single ambient scene tied to no narrative — pure atmosphere
- Disabled entirely on `/lab` and `/work/[slug]` (those pages have their own surface treatments)

If this still feels like too much after Sprint 3, drop the particle field entirely and fall back to a single fixed-position SVG noise layer at 1.5% opacity. The noise layer is non-negotiable; the particles are.

### 7.4 Project Card 3D Tilt — Gentler

Project cards on `/work` and the home page carry a **very subtle** 3D tilt on hover — max ±3° (down from earlier ±4°), 600ms spring back. The internal parallax layers (thumbnail middle plane, chips forward) are retained but the magnitude is halved. Pure CSS `transform: perspective()`, no WebGL. Falls back to a quiet scale on touch.

### 7.5 Custom Cursor — Reconsidered

The previous "heatmap cursor" idea (an analytics-themed cursor trail) is **retired** for the new direction. It was clever in the editorial-technical version; in the heritage atelier version it reads as performative.

The replacement: a near-invisible custom cursor — a small filled dot, 6px, in `--text` color at 70% opacity. Over interactive elements, it grows gently to 14px and shifts to gold (`--accent`). No trail. No labels. No flourish. Disabled on touch devices. Disabled under reduced-motion.

If even this minimal cursor feels too much during Sprint 8, drop it. The default OS cursor against a well-typed page is more dignified than a clever cursor that misses by 5°.

### 7.6 Section Transitions — Soft Lifts

The earlier "shader curtain dissolve" between sections is retired. The new transition is a soft fade-and-lift: `opacity 0→1` and `transform translateY(16px)→0` over 480ms with the slow-eased curve from §5.7. Triggered by IntersectionObserver. Stagger 60ms between siblings.

### 7.7 404 Page Scene

A single sculptural form — the same monogram from §7.1 — appears in a state of quiet dissolution: slowly disassembling into floating shards that drift apart. Cursor proximity gently disturbs them. They reassemble after ~4 seconds of idle.

Copy: `This page failed its A/B test.` (the dry humor from the original survives — it suits the lab-aware tone.)
Sub: `Let's route you somewhere that converted.`
CTAs: `← Home` (primary), `See selected work` (secondary).
Mono footer: `Status: 404 · Experiment concluded · Sample size: 1`

### 7.8 Performance Discipline (unchanged budgets)

- Total JS gzipped on home: <400KB
- First 3D scene (sculpture + env): <250KB
- Lazy-load every 3D scene below the fold via dynamic import
- IntersectionObserver pauses canvases off-screen
- Draco compression on any glTF
- KTX2 on all environment maps
- DPR cap: `Math.min(devicePixelRatio, 2)`, mobile capped at 1.5
- Mobile: particle field disabled; HDRI replaced with a procedural warm-color env

### 7.9 Reduced-Motion Fallback Matrix

| Feature               | Default                    | `prefers-reduced-motion: reduce`          |
| --------------------- | -------------------------- | ----------------------------------------- |
| Hero sculpture        | Full motion + parallax     | Static screenshot, no rotation            |
| Two sculptures (/lab) | Full motion + live data    | Static screenshot, mono-text data overlay |
| Particle field        | Drift at 18% opacity       | Replaced by static noise gradient         |
| Section transitions   | Fade + lift                | Opacity-only fade                         |
| Custom cursor         | On (desktop, fine pointer) | Off                                       |
| Card tilt             | ±3° on hover               | Subtle scale 1.015                        |
| Project gallery hover | Parallax depth             | Static                                    |

---

## 8. CRO Meta-Integration — The /lab Layer

All experimentation logic lives on `/lab`. The home page is fully static. This separation is non-negotiable in the new direction — earlier ideas of running A/B tests on the homepage hero are explicitly retired.

### 8.1 Live Experiments

The signature feature. PostHog Experiments power 2–4 live tests at any time. Each test:

- Has a Sanity `experiment` document storing display metadata (name, hypothesis, variant descriptions, status)
- Has a corresponding PostHog feature flag with 50/50 distribution
- Is evaluated server-side via `posthog-node` to avoid flash-of-wrong-variant
- Is rendered on `/lab` with live sample sizes, conversion rates, p-values, and a sparkline of sample-size growth over time

The `/lab` page is **the only place** these experiments are visible. The home page does not run any A/B tests on its visible content. (Internal feature flags for nav layout, etc. are permitted but invisible.)

### 8.2 Referrer-Aware Personalization (refined to /lab only)

The earlier "different hero subheadline depending on referrer" idea is retired for the home page (the home page is fully static, no personalization). On `/lab`, however, a single line of opening copy varies by referrer — written with the politesse of a research director, never crass:

| Referrer     | Opening line                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| LinkedIn     | "Welcome — most LinkedIn visitors come asking whether the methodology is real. The page below is the answer." |
| GitHub       | "Welcome — for engineers, the implementation notes are linked at the bottom of each experiment."              |
| Twitter/X    | "Welcome — pinned tweet visitors usually want the inconclusive results. They're below, with the rest."        |
| Direct/other | "Welcome to the Lab. What follows is a working demonstration of conversion methodology."                      |

Implemented in `hooks.server.ts` reading the `Referer` header. A small dismissible note at the top: "_Reading from LinkedIn — show default opening?_" with a discreet link to revert.

### 8.3 Public Methodology

`/lab` includes a full methodology section — a quietly written explanation of what's tracked, why, and what isn't. This is itself a CRO artifact: clients evaluating Boris will recognize it as the kind of documentation a serious practitioner produces.

### 8.4 Inline micro-experiments — RETIRED on home, allowed on /lab and /work/[slug]

The earlier "👍 👎 useful?" widget at the bottom of project cards is retired from the homepage. It survives in two places only:

- The bottom of each `/work/[slug]` case study: a single quiet question — "_Was this case study useful?_" with two tiny mono links — _Yes / Not really_ — feeding a PostHog event.
- The bottom of `/lab`: a similar quiet prompt for feedback on the lab itself.

Tone is critical: these are research instruments, not engagement bait. No emoji, no "did this help you?" agency-speak.

### 8.5 Choose-Your-Path Persona Selector — RETIRED entirely

The home-page persona selector ("What brings you here?" with Hiring/Curious dev/Client work options) is **retired**. It was the right idea for the editorial-technical positioning. It is the wrong idea for the heritage-atelier positioning — too explicit, breaks the calm, treats the visitor as a funnel input.

The replacement: nothing. The site trusts the visitor to navigate. `/lab` is one click away for those who want CRO proof. `/about` is one click away for those who want résumé scannability. The home page does not interrogate.

---

## 9. Sanity Schema Design

Schema designs from earlier versions remain valid with one addition (an `experiment.variant` `material` enum field for the two-sculptures piece on /lab) and one removal (homepage doesn't reference experiments anymore, so `settings.heroVariantA`/`heroVariantB` are no longer needed).

### 9.1 `project` (document)

```
title            string (required)
slug             slug (required, auto from title)
role             string
client           string
startDate        date
endDate          date | null  (null = present)
featured         boolean
heroImage        image with required alt text
gallery          array<image with alt>
stack            array<reference → techStack>
summary          text (used on home cards — 2-3 sentences in the new voice)
body             portable text (long-form case study)
metrics          array<{ value, label, trend: "up"|"down"|"neutral" }>
links            array<{ label, url, type: "live"|"github"|"case-study"|"nda" }>
order            number
```

### 9.2 `techStack` (document)

```
name             string
slug             slug
category         "frontend" | "backend" | "db" | "infra" | "tooling" | "lang"
icon             image | svg string
yearsUsed        number
proficiency      "learning" | "working" | "fluent" | "expert"
```

### 9.3 `testimonial` (document)

```
quote            text
author           string
authorRole       string
authorCompany    string
authorAvatar     image
featured         boolean
relatedProject   reference → project
```

### 9.4 `post` (document)

```
title, slug, excerpt, coverImage, publishedAt, body (portable text), tags, readTime
```

### 9.5 `settings` (singleton)

```
availability        "selectively-booking" | "fully-booked" | "open"
availabilityNote    string (e.g., "Selectively booking · Q3 2026")
contactEmail        email
socialLinks         array<{ platform, url }>
resumeFile          file
heroHeadline        string  (single canonical headline — no A/B variant on home)
heroSubheadline     string
labOpeningCopy      object<referrer → string>  (the /lab personalization map)
```

### 9.6 `experiment` (document) — surfaces on /lab

```
name             string
hypothesis       text
variantA         { label, screenshot, copy, material: "marble" | "brass" | "alabaster" | "bronze" }
variantB         { label, screenshot, copy, material: ... }
metric           string
metricEvent      string  (the PostHog event name being measured)
postHogFlagKey   string  (the flag identifier — for server-side evaluation)
status           "running" | "concluded" | "inconclusive"
startDate        date
endDate          date
winner           "A" | "B" | "none"
sampleSize       number  (cached from PostHog, refreshed on rebuild)
summary          text  (the "what we learned" line for concluded experiments)
```

The `material` field on each variant drives the 3D rendering of the two sculptures piece on `/lab`.

---

## 10. Motion & Interaction Design System

Reframed for the new direction. Earlier motion language ("expo-out, snap to position") is replaced with a slower, weightier vocabulary.

### 10.1 Motion Principles

1. **Every motion has a reason.** If you can't name it in a sentence, cut it.
2. **Mass over snap.** Easing curves suggest weight (slow-eased out-quint), never spring-snappy bounce.
3. **Hover blooms, never shifts.** Color changes are gentle; gold halos appear from within rather than fade in from outside.
4. **Stagger reveals.** 60ms between siblings, max 5 in a chain.
5. **Reduced-motion is a complete experience, not a degraded one.**

### 10.2 Page Transitions

SvelteKit's `onNavigate` with a 320ms fade + 8px y-shift. No dramatic wipes. Page transitions are barely perceptible — they exist to soften route boundaries, not to entertain.

### 10.3 Scroll Behavior

Lenis, friction 0.08, disabled on touch (native momentum is more comfortable on iOS). The "polished stone sliding" sensation.

### 10.4 Interaction Affordances

Every interactive element has hover, focus-visible, and active states. Focus-visible is a 2px outline in `--accent` with 2px offset — never a default browser blue, never an inset shadow.

---

## 11. SEO & Semantic HTML Strategy

Unchanged from earlier versions — the new direction does not change the technical SEO posture. Highlights:

- Well-structured `<head>` on every page (title ≤60 chars, meta description ≤155 chars, OG, Twitter, canonical)
- JSON-LD: `Person` on home, `CreativeWork` on /work/[slug], `Article` on /writing/[slug], `BreadcrumbList` on subpages
- One `h1` per page, hierarchical h2–h4
- Image alt text required by Sanity validation
- Static-generate /work, /work/[slug], /writing, /writing/[slug], /uses, /404, and home
- /lab uses ISR with 5-minute edge cache
- sitemap.xml + robots.txt generated at build
- Sanity webhook → Vercel deploy hook on content updates
- Per-page OG images via Satori + Resvg

---

## 12. Analytics & Experimentation Infrastructure

Unchanged: PostHog (events, flags, experiments — EU cloud), Sentry (errors and perf), Web Vitals piped to PostHog.

### 12.1 Event Taxonomy

Discriminated union in `$lib/analytics/events.ts`:

```ts
type AppEvent =
	| { name: 'page_view'; props: { path: string } }
	| { name: 'nav_clicked'; props: { to: string } }
	| { name: 'hero_cta_clicked'; props: { label: string } } // no `variant` — home is static
	| { name: 'project_card_viewed'; props: { slug: string } }
	| { name: 'project_card_opened'; props: { slug: string } }
	| { name: 'lab_visited'; props: { from: string } } // funnel signal
	| { name: 'experiment_vote_cast'; props: { experiment_id: string; variant: string } }
	| { name: 'experiment_card_expanded'; props: { experiment_id: string } }
	| { name: 'contact_cta_clicked'; props: { location: string } }
	| { name: 'contact_form_submitted'; props: { source: string } }
	| { name: 'email_copied'; props: Record<string, never> }
	| { name: 'resume_downloaded'; props: Record<string, never> }
	| { name: 'three_scene_visible'; props: { scene_id: string } }
	| { name: 'three_scene_interacted'; props: { scene_id: string; kind: string } }
	| {
			name: 'web_vital_lcp' | 'web_vital_inp' | 'web_vital_cls';
			props: { value: number; rating: string };
	  };
```

The `lab_visited` event is the new key funnel signal — it tells you which home-page section drove the visitor toward `/lab`. The `from` prop captures the referrer context (which CTA, which whisper link, which nav item).

---

## 13. Accessibility

Unchanged: WCAG 2.2 AA. Color contrast ≥4.5:1 for body, ≥3:1 for large text — verify the gold accent meets this on both modes (the deeper `--accent-deep` value is for solid CTA text, where contrast matters most). All 3D scenes have static fallback for reduced-motion and skip links above them. Focus rings visible everywhere. axe-core in CI.

---

## 14. Performance Targets (unchanged)

| Metric                           | Target              |
| -------------------------------- | ------------------- |
| LCP                              | < 2.0s on 4G mobile |
| INP                              | < 200ms             |
| CLS                              | < 0.05              |
| TTFB                             | < 400ms             |
| JS payload (home, gzipped)       | < 400KB             |
| Lighthouse Performance (desktop) | ≥ 95                |
| Lighthouse Performance (mobile)  | ≥ 85                |

---

## 15. Deployment & Ops (unchanged)

- Hosting: Vercel with adapter-vercel
- Sanity Studio embedded at /studio in the same app
- Domain on a clean .dev or .me TLD
- CI: GitHub Actions runs lint, check, test, build, Lighthouse CI, Playwright + axe
- Monitoring: Sentry + PostHog + UptimeRobot
- Sanity webhook → Vercel deploy hook on content publish

---

## 16. Development Roadmap (sprint plan, refined)

Ten focused sprints. Each is one Claude Code session — do not span sprints across sessions.

### Sprint 0 — Foundation

Repo, Sanity project, PostHog project, Sentry project. SvelteKit scaffold. Tailwind v4. shadcn-svelte init. Custom-themed for the luxury palette. Self-hosted fonts (PP Editorial New or Instrument Serif, Inter, JetBrains Mono). Color tokens from §5.2. CI green. `/style-guide` route demonstrating tokens.

### Sprint 1 — Content Layer

Sanity schemas from §9. Studio embedded at /studio with grouped desk structure. Generated TypeScript types. GROQ queries centralized. Seed script populates 6 projects, settings singleton, tech stack entries, one testimonial.

### Sprint 2 — Home Page (no 3D yet)

All sections from §3.3 with real content. Asymmetric layouts where §5.6 specifies. Generous spacing (192px standard section padding). Gold rule beneath every H1. Hairline dividers between sections. Mono eyebrows (uppercase, 0.12em letter-spacing). Whisper-to-Lab link in gold.

### Sprint 3 — Three.js (Hero Sculpture + Particle Field)

Single root canvas in +layout.svelte. <View> portal pattern. Hero sculpture (§7.1) with warm HDRI, slow rotation. Restrained particle field (§7.3, 8K particles, warm-toned). Dynamic imports. IntersectionObserver pause. Reduced-motion fallback images baked.

### Sprint 4 — Project Cards & /work pages

ProjectCard with gentler tilt (§7.4). MetricChip and StackChip components (used on /work, not home). /work index with filter bar. /work/[slug] case study layout — full-bleed hero, 64ch reading column, sticky metadata card, big metric display, portable-text serializers (image, code with Shiki, callout, metricGrid, pullQuote, beforeAfter).

### Sprint 5 — About, Contact, Writing, Uses

/about with timeline, languages, education, "elsewhere" social section. /contact with Superforms + Zod + Resend, asymmetric layout, calendly embed below the fold. /writing index + slug pages with reading progress bar and TOC. /uses as a quietly-styled list.

### Sprint 6 — Analytics & Tracking

PostHog (EU cloud). Typed track() helper from §12.1. Consent banner (small, dismissible — never full-screen). Sentry client + server. Web Vitals piped to PostHog. PostHog feature flag client (server-side and client-side).

### Sprint 7 — The /lab Page (signature feature)

This is the longest sprint. It is also the project's centerpiece. Build /lab with:

- Premise section
- The two competing sculptures 3D scene (§7.2) — second canvas, lazy-loaded, server-side flag values
- Currently running experiments cards with live PostHog data (5-min edge cache via ISR)
- Concluded experiments section including at least one inconclusive case
- Methodology section
- Enterprise credibility panel (Toyota, Lexus, Hitachi, Valtech, DS Smith)
- Referrer-aware opening line (§8.2)

If this sprint stretches, split into 7A (page structure + experiment cards) and 7B (3D + referrer + credibility panel).

### Sprint 8 — Polish & Micro-interactions

Custom cursor (subtle dot, gold over interactive — §7.5). Scramble text on home eyebrows only. Soft-lift section transitions. 404 scene. Real reduced-motion fallback images. Loading states (Sanity LQIP blur-up). Error boundaries. Copy polish pass against §4. Full a11y audit (axe-core 0 violations on every route).

### Sprint 9 — Performance & Launch

Bundle analysis. Image pipeline (Sanity srcset + LQIP). Font subsetting + preload. SEO meta verification. Per-page OG images. Sitemap. robots.txt with /studio disallowed. Redirects (/cv → /resume.pdf, etc.). Vercel env vars. DNS + SSL. Sanity → Vercel webhook. Cross-browser test (Safari, Chrome, Firefox, Edge). First experiment live in PostHog at launch.

---

## 17. Risk Register

Concerns that could derail the build, in priority order:

1. **The "luxurious calm" reads as "unfinished" instead of "considered."** This is the central risk of the new positioning. If the spacing is too generous and the content too sparse, visitors will think the site is a work in progress. Mitigation: Sprint 2's Design Quality Gate must include explicit checks for visual density on the home page — every section should feel intentional and complete, not awaiting more content.

2. **Threlte 8 + Svelte 5 compatibility on the day of build.** The combination has been stable for a year but specific `<View>` features may regress. Sprint 0 must confirm with a hello-world before Sprint 3 commits.

3. **Performance with two heavy 3D scenes (home sculpture + /lab two-sculptures).** Two scenes in two routes. If `/lab` is slow, the project's signature feature is undermined. Mitigation: aggressive code-splitting, separate dynamic imports, KTX2 environment shared via store between both scenes.

4. **Gold accent meeting WCAG AA.** Gold on dark obsidian is a contrast minefield. The `--accent-deep` token (oklch 0.62) is the value used for solid CTA text; verify ≥4.5:1 against `--bg-elevated` in CI.

5. **Recruiters bouncing from the home page because they don't see "Toyota."** This is the deliberate trade of the new positioning. It is acceptable in the long run but should be monitored. Mitigation: ensure /lab is visibly linked from the home page (the whisper) and from the nav. After 60 days post-launch, review traffic data: if /lab CTR from home is <8%, consider strengthening the whisper.

6. **Real A/B tests with low traffic produce statistically meaningless data.** Same risk as before. Mitigation: be transparent on /lab — show "n=87, not yet significant" with the same dignity as a winning test.

7. **Sanity over-engineering.** Resist adding fields. Ship with the schemas in §9 and evolve.

8. **Updating becomes painful, so updates stop happening.** Every piece of copy that might plausibly change in the next year lives in Sanity.

---

## 18. Success Metrics

After 90 days live:

- ≥ 3 qualified inbound inquiries through the contact form
- ≥ 1 hire or contract offer attributable to the site
- ≥ 5 published experiments on /lab (mix of wins, losses, inconclusives)
- /lab CTR from home: ≥ 8% of home-page visitors click through
- Home page Lighthouse: ≥ 95 desktop, ≥ 85 mobile
- Bounce rate on /work/[slug]: < 55%
- At least one piece of unsolicited inbound commentary from a developer Boris respects, about the craft of the site

---

## Appendix A — Design Quality Gate (encoded as a recurring sprint check)

This is the new addition to the masterplan — a checklist that runs against every sprint's output. Earlier versions kept this in the prompts companion document; the new direction makes design discipline a strategic concern, so it lives here.

**Token discipline:**

- All colors reference CSS custom properties from §5.2, not hardcoded values
- All spacing uses the §5.6 scale — no arbitrary values
- Radius is consistently `var(--radius)` (0.5rem) throughout
- Display serif used **only** for headings ≥28px
- Mono used **only** structurally — labels, metrics, code, timestamps
- Gold used a maximum of **4 times per viewport** (slightly more permissive than the editorial green's 3, owing to gold's heritage subtlety) — and never as a background fill or text fill

**Typography:**

- H1 letter-spacing -0.025em, line-height 0.95
- A 1px gold rule sits beneath every H1, 32px below baseline
- Body line-height 1.65, 17px size
- Mono labels uppercase, 0.12em letter-spacing
- Numerals in metric/data contexts are `font-variant-numeric: tabular-nums`

**Spatial:**

- Desktop sections: 192px standard, 256px loud
- Mobile sections: 96px standard, 128px loud
- Hairline dividers (1px at 6–10% opacity in `--hairline`) between every section
- Prose columns ≤ 64ch
- Hero, Practice, Selected Work, Testimonial, Contact sections asymmetric (not centered)

**Atmosphere:**

- Background carries faint warm tone (never pure black, never pure white)
- Subtle film-grain SVG noise overlay at 1.5% opacity present
- No glassmorphism anywhere
- No backdrop-blur on nav

**Motion:**

- Easing curves from §5.7 only (slow-eased out-quint, springs)
- No layout properties animated
- Reduced-motion fallbacks tested and present
- Hover blooms (gold halo), never harsh color shifts

**Forbidden patterns absent:**

- No gradient buttons, no glassmorphism, no rounded-full CTAs
- No icons-in-circles as feature visuals
- No oversaturated colors anywhere
- No purple-pink gradients
- No "transforms" or "leverages" in body copy

**Code:**

- Every component has a JSDoc header
- No `any` types
- Svelte 5 runes only (`$state`, `$derived`, `$effect`, `$props`)
- No client-side Sanity calls
- Every user-facing interaction fires a typed `track()` event

**Performance:**

- Route within bundle budget
- Lighthouse ≥ 95 desktop, ≥ 85 mobile
- LCP < 2s, INP < 200ms, CLS < 0.05

**Accessibility:**

- axe-core: 0 violations
- Keyboard navigation works end-to-end
- Every 3D scene has aria-label and a skip link
- Focus rings visible (2px `--accent`, 2px offset)
- Color contrast ≥ 4.5:1 body, ≥ 3:1 large text

**The Opulence Check (the single most important calibration):**

- On a 10-point scale, visual noise should rate ≤ 2 (calm, restrained)
- On a 10-point scale, warmth should rate ≥ 8 (welcoming, considered)
- If either value is wrong, the design has drifted — recover before continuing

---

## Appendix B — Recovery from Design Drift

If at any point during the build the work begins to feel **gaudy, ornamental, or marketing-loud**, the recovery protocol is:

1. Stop the current sprint.
2. Re-read §1.2 (Positioning Statement), §5.1 (Core Aesthetic), and §5.5 (Forbidden Patterns).
3. Identify the specific design choice that broke the calm. Common culprits: a gradient that crept in, a button that became a pill, an emoji that became decorative, a section that became centered when it should be asymmetric, a gold element that became a fill instead of an accent.
4. Revert that single choice.
5. Run the Design Quality Gate from Appendix A.
6. Resume the sprint.

The atmosphere is more important than any individual feature. A site that feels right with one fewer feature is more valuable than a site that feels wrong with one more.

---

_End of masterplan. This is a living document; update when decisions change. The point isn't to follow the plan — it's to remember what was decided and why._
