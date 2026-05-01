# Boris Portfolio — Claude Code Sprint Prompt Suite

A self-contained playbook of ten sprint prompts, derived from the Boris Portfolio Masterplan v2.0. Each sprint prompt below is intended to be pasted directly into a fresh Claude Code session. Each is self-contained — the Claude Code agent does not need access to the masterplan because all relevant context, tokens, constraints, and forbidden patterns are embedded.

Use one sprint per session. Do not span sprints across sessions.

---

## Sprint 0 — Foundation

````
You are pair-programming with Boris on a luxury portfolio site. This sprint establishes the foundation that every later sprint inherits. Get the primitives right.

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
Stand up a SvelteKit 2 + Svelte 5 + Tailwind v4 + shadcn-svelte + Threlte 8 + Sanity + PostHog + Sentry repo with luxury color tokens, self-hosted typography, and a working /style-guide route — all CI-green.

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT (this is the project's atmosphere)
═══════════════════════════════════════════════════════
The site is a heritage atelier — quiet, considered, warm-neutral with a single gold accent. Reference points: Aman, Loro Piana, Hermès Maison; Linear's restraint; Rauno Freiberg's craft. The site does not sell. It welcomes into a practice.

POSITIONING (§1.2): "Boris builds things of enduring value, and proves it. A full-stack developer and CRO specialist whose work demonstrates the patience, precision, and measurability that distinguish craft from production."

STACK (LOCKED — do not substitute):
- SvelteKit 2, Svelte 5 with runes ($state, $derived, $effect, $props) — never legacy $: or export let
- TypeScript everywhere; zero plain .js files in src/
- Tailwind CSS v4 (via @tailwindcss/vite plugin, no tailwind.config — use CSS @theme blocks)
- shadcn-svelte (custom-themed for the luxury palette)
- Threlte 8 + @threlte/extras
- Sanity v3 (Studio embedded at /studio in Sprint 1)
- PostHog (EU cloud — eu.i.posthog.com)
- Sentry
- Lenis (added Sprint 2)
- Superforms + Zod (Sprint 5)
- Resend (Sprint 5)
- Bun 1.3.10+ (latest stable)
- Vercel (adapter-vercel)

COLOR TOKENS (OKLCH — paste into src/app.css verbatim under @theme):
--bg              : oklch(0.18 0.005 60)         /* deep obsidian, faint warm tone, never pure black */
--bg-elevated     : oklch(0.22 0.005 60)
--surface-paper   : oklch(0.21 0.006 60)         /* warm linen — used on /lab in Sprint 7 */
--text            : oklch(0.94 0.004 80)         /* soft ivory, never pure white */
--text-muted      : oklch(0.68 0.005 60)
--text-subtle     : oklch(0.52 0.004 60)
--hairline        : oklch(0.94 0.004 80 / 0.08)
--accent          : oklch(0.78 0.10 85)          /* champagne gold — for type, rules, hover */
--accent-deep     : oklch(0.62 0.12 78)          /* 24k gold leaf — for solid CTA fills */

Light mode tokens (configured via [data-theme="light"]):
--bg              : oklch(0.97 0.008 80)         /* warm ivory */
--bg-elevated     : oklch(1.0 0 0)
--surface-paper   : oklch(0.95 0.012 80)
--text            : oklch(0.22 0.005 60)
--text-muted      : oklch(0.48 0.008 60)
--text-subtle     : oklch(0.62 0.005 60)
--hairline        : oklch(0.22 0.005 60 / 0.10)
--accent          : oklch(0.68 0.12 80)
--accent-deep     : oklch(0.55 0.14 75)

TYPOGRAPHY:
- Display: PP Editorial New (preferred) or Instrument Serif (free fallback). Used at 84px H1 desktop, letter-spacing -0.025em, line-height 0.95. NEVER below 28px.
- Body: Inter Variable. 17px / 1.65 line-height. Tracking -0.005em.
- Mono: JetBrains Mono Variable. STRUCTURAL ONLY — eyebrow labels (uppercase, 12px, 0.12em letter-spacing), numerical data (always tabular-nums), timestamps, stack chips. NEVER body prose. NEVER decorative.
- A 1px gold rule sits 32px below every H1 baseline. NOT optional.

MOTION (§5.7) — paste exactly:
- Easing entrances: cubic-bezier(0.22, 1, 0.36, 1)   /* slow-eased out-quint */
- Springs:          cubic-bezier(0.32, 0.72, 0, 1)
- UI reactions:     cubic-bezier(0.4, 0, 0.2, 1)
- Durations: 120ms (hover), 280ms (UI state), 480ms (section beats), 800ms (hero reveal)
- Stagger 60ms between siblings, max 5 in a chain
- Hover blooms (gold halo via box-shadow), never harsh color shifts
- No layout properties animated. Transform, opacity, filter only.

SPATIAL SYSTEM:
- 12-column grid, 1440px max-width desktop, 1.5rem gutters
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192
- Section vertical padding: 192px desktop standard, 256px loud sections
- Mobile: 96px standard, 128px loud
- Radius: --radius: 0.5rem (slightly tighter than shadcn default — feels architectural)
- Hairlines (1px at 6–10% opacity in --hairline) between every section
- Prose columns ≤64ch

FORBIDDEN PATTERNS (§5.5 — refuse these even if asked):
❌ Gradient buttons of any kind (solid fills only)
❌ Glassmorphism / frosted-glass overlays / backdrop-blur on nav
❌ Neumorphism, harsh drop shadows, default-browser focus blues
❌ Oversaturated neons (electric green, magenta, electric blue)
❌ Gold as background fill or as text fill (accent only — rules, hover, small marks)
❌ Inter for display type
❌ Rounded-full pill primary CTAs
❌ Icon-in-circle feature visuals
❌ Auto-playing looping video backgrounds
❌ Purple-to-pink gradients anywhere, ever
❌ Emoji as decorative layout elements
❌ The word "transforms" in body copy

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
Confirm before starting:
1. Empty git repository at the working directory (or only README/.gitignore)
2. Bun 1.3.3+ installed (run `bun --version`)
3. Git installed and configured
4. GitHub repo created and remote configured
5. Vercel account ready (deferred connection until Sprint 9, but verify)
6. You have or will create accounts at: Sanity, PostHog (EU), Sentry — but actual project creation deferred to Sprints 1

If ANY are not confirmed, stop and report.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

1. SCAFFOLD
  - Run: bun create svelte@latest . — pick "Skeleton project" + TypeScript + ESLint + Prettier + Vitest + Playwright
  - Verify Svelte 5 + SvelteKit 2 are latest. If older, upgrade explicitly: `bun add -D svelte@latest @sveltejs/kit@latest`
  - Install: `bun add -D @sveltejs/adapter-vercel`
  - Configure svelte.config.js: import adapterVercel from '@sveltejs/adapter-vercel', set `kit.adapter`, set `kit.alias` for $lib

2. STYLING FOUNDATION (Tailwind v4)
   - `bun add -D tailwindcss @tailwindcss/vite @tailwindcss/typography`
   - Add @tailwindcss/vite plugin to vite.config.ts
   - Create src/app.css with the structure:
     ```
     @import "tailwindcss";
     @plugin "@tailwindcss/typography";

     @theme {
       --color-bg: oklch(0.18 0.005 60);
       --color-bg-elevated: oklch(0.22 0.005 60);
       --color-surface-paper: oklch(0.21 0.006 60);
       --color-text: oklch(0.94 0.004 80);
       --color-text-muted: oklch(0.68 0.005 60);
       --color-text-subtle: oklch(0.52 0.004 60);
       --color-hairline: oklch(0.94 0.004 80 / 0.08);
       --color-accent: oklch(0.78 0.10 85);
       --color-accent-deep: oklch(0.62 0.12 78);

       --radius: 0.5rem;

       --font-display: 'Instrument Serif', 'PP Editorial New', serif;
       --font-sans: 'Inter Variable', system-ui, sans-serif;
       --font-mono: 'JetBrains Mono Variable', monospace;

       --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
       --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
       --ease-ui: cubic-bezier(0.4, 0, 0.2, 1);
     }

     [data-theme="light"] {
       /* light mode token overrides (paste from EMBEDDED CONTEXT) */
     }

     @layer base {
       html { scroll-behavior: auto; } /* Lenis takes over in Sprint 2 */
       body {
         background: var(--color-bg);
         color: var(--color-text);
         font-family: var(--font-sans);
         font-size: 17px;
         line-height: 1.65;
         letter-spacing: -0.005em;
         -webkit-font-smoothing: antialiased;
         text-rendering: optimizeLegibility;
       }
       ::selection { background: var(--color-accent); color: var(--color-bg); }
       :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
     }
     ```
   - Add the film-grain SVG noise overlay as a fixed-position pseudo-element on body, 1.5% opacity, multiply blend, behind all content but above background. Use an inline SVG feTurbulence (baseFrequency ~0.85). This is non-negotiable.

3. SHADCN-SVELTE INIT
   - Run: `bunx shadcn-svelte@latest init`— style: default, base color: zinc, CSS variables: yes
   - When the init writes its CSS variables, manually merge / override so OUR tokens win. Do not let shadcn's default color tokens persist.
   - Install components for use across sprints: `bunx shadcn-svelte@latest add button card badge separator dropdown-menu sheet tooltip input textarea label dialog navigation-menu tabs accordion scroll-area select popover`
   - For each shadcn component: open the generated file, replace any hardcoded colors with our tokens (text-text, bg-bg-elevated, border-hairline, etc.). If a component uses a gradient or rounded-full by default, fix it.

4. TYPOGRAPHY (self-hosted)
   - `bun add @fontsource-variable/inter @fontsource-variable/jetbrains-mono`
   - For Instrument Serif: `bun add @fontsource/instrument-serif` (it is not variable, but acceptable as fallback if PP Editorial New is unavailable)
   - In src/app.css, after the @theme block, import:
     @import '@fontsource-variable/inter';
     @import '@fontsource-variable/jetbrains-mono';
     @import '@fontsource/instrument-serif/400.css';
   - In src/app.html, preload the display font weight used in H1:
     <link rel="preload" href="/fonts/instrument-serif-400.woff2" as="font" type="font/woff2" crossorigin>
     (Path may vary by package — verify and adjust.)
   - Verify all faces use font-display: swap. Override @fontsource defaults if needed via @font-face.

5. ROUTES (placeholders)
   Create empty routes per §3.1, each rendering only an <h1>{routeName}</h1>:
   - src/routes/+page.svelte (home)
   - src/routes/about/+page.svelte
   - src/routes/work/+page.svelte
   - src/routes/work/[slug]/+page.svelte
   - src/routes/writing/+page.svelte
   - src/routes/writing/[slug]/+page.svelte
   - src/routes/lab/+page.svelte
   - src/routes/playground/+page.svelte
   - src/routes/uses/+page.svelte
   - src/routes/contact/+page.svelte

6. ROOT LAYOUT (src/routes/+layout.svelte)
   - <html lang="en" data-theme="dark">
   - Skip-to-content link (visible on focus)
   - Theme provider: a small Svelte 5 store using $state + localStorage persistence; default dark; supports "dark" | "light". Sets data-theme on html element.
   - Stub <Nav /> and <Footer /> components in src/lib/components/Nav.svelte and Footer.svelte (just rendered names for now — Sprint 2 builds them properly)
   - Film grain overlay rendered here as a fixed-position element

7. HOOKS
   - src/hooks.server.ts:
     * Set security headers via the handle hook: Content-Security-Policy (allow self, Sanity *.sanity.io, PostHog eu.i.posthog.com, Sentry *.sentry.io, Resend api.resend.com), Referrer-Policy: strict-origin-when-cross-origin, X-Frame-Options: DENY (except /studio path), Permissions-Policy
   - src/hooks.client.ts: empty for now, Sprint 6 adds Sentry/PostHog inits

8. LIBRARY DEPENDENCIES (install now, use later)
   - `bun add threlte @threlte/extras three`
   - `bun add -D @types/three`
   - `bun add posthog-js posthog-node`
   - `bun add @sentry/sveltekit`
   - `bun add lucide-svelte`
   - `bun add @sanity/client @sanity/image-url`
   - `bun add -D @sanity/codegen`
   - DO NOT install Lenis yet — Sprint 2 wraps the layout

9. DIRECTORY SKELETON
   Create with .gitkeep where empty:
   src/lib/components/ui/        (shadcn destination, populated)
   src/lib/components/home/      (Sprint 2)
   src/lib/sanity/               (Sprint 1)
   src/lib/three/                (Sprint 3)
   src/lib/three/scenes/         (Sprint 3)
   src/lib/three/hooks/          (Sprint 3)
   src/lib/analytics/            (Sprint 6)
   src/lib/schemas/              (Sprint 5)
   src/lib/types/                (shared domain types)
   src/lib/utils/                (pure utilities)
   static/fonts/                 (any manually-added font files)
   static/fallbacks/             (Sprint 8 — reduced-motion screenshots)
   static/hdri/                  (Sprint 3 — KTX2 environment maps)
   docs/                         (masterplan and prompt playbook)
   scripts/                      (Sprint 1 — sanity-seed.ts)

10. /STYLE-GUIDE ROUTE (the design verification surface)
    Create src/routes/style-guide/+page.svelte. It must NOT be linked from nav and must NOT appear in sitemap.

    Content (long-scrolling reference page):
    a) Heading: "Style Guide" in display serif 84px with the gold rule beneath
    b) Color section: each token rendered as a 120x120 swatch with its name and OKLCH value. Show contrast ratios for text-on-bg pairings (compute and display). Show both dark and light mode versions side by side via the data-theme switcher.
    c) Typography section:
       - H1 (84px) with "Heritage atelier typography" sample, with the 1px gold rule beneath
       - H2 (56px), H3 (36px), H4 (28px) with samples
       - Body lg (18px), body (17px), body-sm (14px) with sample sentences
       - Mono labels: "01 — SECTION LABEL" uppercase 12px 0.12em
       - Display serif sample at 84px showing the actual letter-spacing of -0.025em and line-height of 0.95 visually
    d) Spacing section: visualize the scale (4/8/12/16/24/32/48/64/96/128/192) as labeled bars
    e) Component primitives, EACH IN ALL STATES (default / hover / focus-visible / active / disabled where applicable):
       - Primary Button (solid --accent-deep fill, --bg text)
       - Secondary Button (1px --hairline border, --text)
       - Ghost Button (--text only, gold underline on hover)
       - StackChip (mono "React" with subtle border)
       - MetricChip ("+15%" / "revenue" with up-trend indicator)
       - AvailabilityNote ("Selectively booking · Q3 2026")
       - Card surface (--bg-elevated with 1px inset border at 8% opacity)
    f) Hairline rule examples
    g) Gold rule example (the H1 underline)
    h) Theme toggle at top: dark / light side-by-side preview

    NO illustrations. NO 3D. NO hero text. This is a reference document.

11. CI (.github/workflows/ci.yml)
    - On every PR and push to main: bun install → bun run check → bun run lint → bun run build → bun test → bunx playwright install --with-deps && bunx playwright test
    - Add Lighthouse CI: install @lhci/cli, configure lighthouserc.json with budgets:
      * performance ≥ 95 desktop, ≥ 85 mobile
      * total JS ≤ 400KB on /
      * LCP < 2s, INP < 200ms, CLS < 0.05
    - Stub the Lighthouse step to fail PR on budget violations

12. HYGIENEVerify: `bun run check`, `bun run lint`, `bun run build`, `bun test`, `bunx playwright test` all green
    - Prettier config with prettier-plugin-svelte (bun add -D prettier prettier-plugin-svelte)
    - ESLint with eslint-plugin-svelte (bun add -D eslint eslint-plugin-svelte)
    - .editorconfig
    - README.md: stack summary, local dev (`bun install && bun dev`), link to docs/portfolio-masterplan.md
    - CONTRIBUTING.md: Conventional Commits expectation, sprint-per-session rule
    - .env.example with all expected env vars even if unused yet:
      PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN
      PUBLIC_POSTHOG_KEY, POSTHOG_PERSONAL_API_KEY
      PUBLIC_SENTRY_DSN, SENTRY_AUTH_TOKEN
      RESEND_API_KEY, PUBLIC_SITE_URL

13. INITIAL COMMIT
    - Verify: `bun run check`, `bun run lint`, `bun run build`, `bun test`, `bunx playwright test` all green
    - Commit with conventional message: `chore: scaffold SvelteKit + shadcn-svelte + Threlte foundation with luxury tokens`

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════
Run before closing the sprint. /style-guide must demonstrate:

Token discipline:
✓ Every color is a CSS custom property reference, never a hex/rgb literal
✓ Radius is exactly var(--radius) (0.5rem) on every card/button — no rounded-full anywhere
✓ Spacing scale visible and consistent

Typography:
✓ H1 at exactly 84px desktop, letter-spacing -0.025em, line-height 0.95 — verify by inspecting computed style
✓ The 1px gold rule sits 32px below the H1 baseline — pixel-measure it
✓ Mono only used for labels and code snippets, never for sample prose
✓ Body line-height is 1.65, body size is 17px

Atmosphere:
✓ Background is NOT pure black — verify pixel-pick: should be oklch(0.18 0.005 60), faintly warm
✓ Text is NOT pure white — verify pixel-pick: should be oklch(0.94 0.004 80), soft ivory
✓ Film grain SVG noise overlay is visible but subtle — toggling it off reveals a flatter feel
✓ No backdrop-blur anywhere on the page
✓ No gradient anywhere except optionally on the gold accent itself (5% lightness 2-stop)

Forbidden patterns absent:
✓ Zero gradient buttons (all solid fills)
✓ Zero glassmorphism
✓ Zero rounded-full pills used as primary CTAs
✓ Inter not used for any heading ≥28px (display serif only)
✓ No purple-pink, no electric green anywhere

Code:
✓ No legacy Svelte syntax ($:, export let, on:click as prop)
✓ Every Svelte component uses runes if it has state
✓ TypeScript strict, no `any`

Performance:
✓ Empty home page: total JS ≤ 100KB gzipped (we have headroom; using <50% of the 400KB budget at this stage is healthy)
✓ Lighthouse on / ≥ 95 desktop

Accessibility:
✓ Skip-to-content link present and styled when focused
✓ Focus-visible ring is 2px var(--color-accent) with 2px offset

THE OPULENCE CHECK (do this last):
✓ On a 10-point scale, visual noise on /style-guide rates ≤ 2 (calm, restrained — not a spreadsheet of colored squares)
✓ On a 10-point scale, warmth rates ≥ 8 (the page feels warm; if it feels clinical or cool, the background tone is wrong)

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask before continuing if any of these occur:
- Tailwind v4 cannot be installed alongside shadcn-svelte without errors (a known friction zone). If the conflict is non-trivial, propose downgrading to Tailwind v3.4 latest and ask before doing so.
- Threlte 8 is incompatible with the installed Svelte 5 version. Do not downgrade Svelte. Investigate Threlte version pinning and ask.
- Instrument Serif cannot be self-hosted cleanly. Propose Fraunces as a capable fallback and ask before using PP Editorial New (which is paid).
- Any shadcn component contains a gradient, rounded-full default, or pure white/black token that resists override. Stop, document the deviation, and ask whether to write a custom replacement.
- The film grain overlay at 1.5% causes any visible performance hit. Stop and ask before adjusting.
- Setting up CI Lighthouse with budgets exceeds 30 minutes due to environmental issues. Stop and ask whether to defer the budget gate to Sprint 9.

═══════════════════════════════════════════════════════
RECOVERY PROMPT (paste this if Sprint 0 outcome drifts)
═══════════════════════════════════════════════════════
"This output has drifted from the heritage-atelier atmosphere. Re-anchor to the masterplan:
§1.2 — 'Boris builds things of enduring value, and proves it.'
§5.1 — 'A heritage atelier. Calm, considered, never shouting.'
§5.5 — Forbidden patterns: gradient buttons, glassmorphism, rounded-full CTAs, gold as fill, oversaturated colors.

Identify the SINGLE design element that breaks the calm (a gradient that crept in, a button radius that became full, a token mapped wrong, a font fallback that's louder than the serif). Revert it. Run the Design Quality Gate. Then resume."

═══════════════════════════════════════════════════════
HANDOFF NOTE TO SPRINT 1
═══════════════════════════════════════════════════════
Sprint 1 expects to inherit:
- A green CI run on main
- A working /style-guide route with all design tokens visible
- Empty placeholder routes for /, /about, /work, /work/[slug], /writing, /writing/[slug], /lab, /playground, /uses, /contact
- The Sanity client SDK installed (@sanity/client, @sanity/image-url, @sanity/codegen) but not yet connected to a project
- src/lib/sanity/ directory created and empty
- A README.md and CONTRIBUTING.md in place
- A .env.example with PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN listed but not populated

Report at the end of this sprint:
- Repo tree (truncated to 2 levels deep)
- bun build output (note total bundle size)
- Lighthouse score for / (empty home page baseline)
- Screenshot of /style-guide in dark mode
- Any version pins forced and why
````

---

## Sprint 1 — Content Layer

```
You are pair-programming with Boris on a luxury portfolio site. Sprint 0 established the foundation. This sprint stands up the content layer — Sanity Studio, schemas, queries, and seed data — so every later sprint can pull real content.

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
Deploy the Sanity Studio embedded at /studio, implement six schemas, generate TypeScript types, centralize GROQ queries, seed six real projects with the masterplan's exact copy, and prove the pipe by rendering project titles on /work.

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT
═══════════════════════════════════════════════════════
Site atmosphere: heritage atelier. Warm-neutral, single gold accent. Reference: Aman, Loro Piana, Linear's restraint.

POSITIONING: "Boris builds things of enduring value, and proves it. A full-stack developer and CRO specialist whose work demonstrates the patience, precision, and measurability that distinguish craft from production."

STACK (locked):
- SvelteKit 2, Svelte 5 runes only, TypeScript strict, bun
- Sanity v3 (Studio embedded at /studio)
- shadcn-svelte custom-themed
- Threlte 8 (used in Sprint 3+)
- Tailwind v4

ARCHITECTURAL COMMITMENTS:
- One PUBLIC read client (CDN-backed) at $lib/sanity/client.ts
- One server-only PREVIEW client (token-gated) for drafts
- Never client-side Sanity calls
- All GROQ queries centralized in $lib/sanity/queries.ts
- Types auto-generated via @sanity/codegen, committed to $lib/sanity/types.ts
- Pre-commit hook regenerates types on schema changes
- /studio is excluded from prerender, robots-disallowed, not in sitemap

COLOR TOKENS in use (paste only what's needed, the rest are inherited from app.css):
--accent           : oklch(0.78 0.10 85)   /* champagne gold */
--accent-deep      : oklch(0.62 0.12 78)   /* gold leaf */
--bg               : oklch(0.18 0.005 60)  /* warm obsidian */
--text             : oklch(0.94 0.004 80)  /* soft ivory */
--text-muted       : oklch(0.68 0.005 60)
--hairline         : oklch(0.94 0.004 80 / 0.08)
--surface-paper    : oklch(0.21 0.006 60)  /* warm linen */

FORBIDDEN PATTERNS (still apply):
❌ Gradient buttons, glassmorphism, backdrop-blur on nav
❌ Pure black or pure white anywhere
❌ Rounded-full pills as primary CTAs
❌ Inter for display
❌ Any client-side Sanity call
❌ Hardcoded copy that should live in Sanity

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
1. Sprint 0 complete and merged: `bun build` is green on main
2. The /style-guide route renders with all tokens correct
3. Sanity account ready (you will run `bunx sanity@latest init` in step 1)
4. .env.example exists with PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN listed
5. The Sanity SDK packages are already installed (@sanity/client, @sanity/image-url, @sanity/codegen)
6. The directories src/lib/sanity/ and scripts/ exist (empty)

If any are missing, stop and report.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

1. INITIALIZE SANITY PROJECT
   - Run: `bunx sanity@latest init --env --create-project "Boris Portfolio" --dataset production`
   - Configure CORS origins in the Sanity dashboard: http://localhost:5173 and the planned production URL
   - Save in .env (NOT committed): PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET=production, SANITY_API_READ_TOKEN (viewer), SANITY_API_WRITE_TOKEN (for seed only — remove after Sprint 1)
   - Update .env.example with placeholder values

2. EMBED THE STUDIO at /studio
   - Create src/routes/studio/[...catchall]/+page.svelte that mounts <Studio> from sanity package
   - Configure svelte.config.js or +page.ts: set `export const prerender = false` for /studio routes
   - Add @sanity/vision plugin for in-Studio GROQ playground
   - Studio title: "Boris Portfolio Studio"
   - Configure the desk structure — left rail organization:
     * "Settings" singleton, pinned at top
     * "Content" group: Projects, Testimonials, Posts
     * "Taxonomy" group: Tech Stack
     * "Experiments" group: Experiments
   - Robots: ensure /studio is in robots.txt disallow (Sprint 9 generates the file; document this expectation now in a TODO file)

3. SCHEMAS — implement EXACTLY per spec below in src/lib/sanity/schemas/

   a) project.ts:
      - title: string, required, validated min 2 chars
      - slug: slug, required, source = title, max 96 chars
      - role: string (e.g., "Full-Stack Developer")
      - client: string
      - startDate: date, required
      - endDate: date | null (null = present)
      - featured: boolean, default false
      - heroImage: image, required, alt text REQUIRED via custom validation rule
      - gallery: array of images, each with required alt text
      - stack: array of references → techStack
      - summary: text, max 280 chars (for home cards)
      - body: array of blocks (portable text), with custom block types: image, code, callout, metricGrid, pullQuote, beforeAfter (define in step 4)
      - metrics: array of objects { value: string, label: string, trend: "up" | "down" | "neutral" }
      - links: array of objects { label: string, url: url, type: "live" | "github" | "case-study" | "nda" }
      - order: number (manual ordering, default 0)
      Group fields in Studio UI: Content / Meta / Links

   b) techStack.ts:
      - name: string, required (e.g., "React")
      - slug: slug, source = name
      - category: enum string — "frontend" | "backend" | "db" | "infra" | "tooling" | "lang", required
      - icon: image OR svg-string (a custom field accepting either)
      - yearsUsed: number
      - proficiency: enum — "learning" | "working" | "fluent" | "expert"

   c) testimonial.ts:
      - quote: text, required, max 500 chars
      - author: string, required
      - authorRole: string
      - authorCompany: string
      - authorAvatar: image (alt text required)
      - featured: boolean, default false
      - relatedProject: reference → project (optional)

   d) post.ts:
      - title: string, required
      - slug: slug, source = title
      - excerpt: text, max 200 chars
      - coverImage: image (alt required)
      - publishedAt: datetime, required
      - body: portable text (same custom blocks as project.body)
      - tags: array of strings
      - readTime: number (computed at edit time or via a custom input — for now, manual)

   e) settings.ts (singleton):
      - availability: enum — "selectively-booking" | "fully-booked" | "open"
      - availabilityNote: string (e.g., "Selectively booking · Q3 2026")
      - contactEmail: email, required
      - socialLinks: array of { platform: string, url: url }
      - resumeFile: file (PDF)
      - heroHeadline: string (single canonical — NO A/B variants on home)
      - heroSubheadline: string
      - labOpeningCopy: object — { linkedin: string, github: string, twitter: string, default: string } — used Sprint 7 for /lab personalization
      Configure as singleton: cannot be deleted or duplicated, pinned to top of Studio

   f) experiment.ts:
      - name: string, required
      - hypothesis: text, required
      - variantA: object — { label: string, screenshot: image, copy: text, material: enum "marble" | "brass" | "alabaster" | "bronze" }
      - variantB: object — same shape as variantA
      - metric: string (human-readable, e.g., "Click-through on 'Begin a conversation'")
      - metricEvent: string (PostHog event name, e.g., "contact_cta_clicked")
      - postHogFlagKey: string (the PostHog flag identifier — for server-side eval in Sprint 7)
      - status: enum — "running" | "concluded" | "inconclusive"
      - startDate: date, required
      - endDate: date (optional, only set when concluded)
      - winner: enum — "A" | "B" | "none" (used only when concluded)
      - sampleSize: number (cached from PostHog, refreshed on rebuild)
      - summary: text (the "what we learned" line for concluded experiments)

   All schemas use defineType / defineField / defineArrayMember from sanity. No `any`. Field groups in Studio UI for clarity. Required-image alt validation: write a custom validation rule that fails if the asset is set but `alt` is missing.

4. PORTABLE TEXT CUSTOM BLOCKS
   Define these as object types referenced from the body array in project and post:
   - imageWithCaption: { asset, alt, caption }
   - codeBlock: { language: string, code: text, filename: string optional }
   - callout: { variant: "info" | "warn" | "success", body: text }
   - metricGrid: { metrics: array of { value, label, trend } }
   - pullQuote: { quote: text, attribution: string optional }
   - beforeAfter: { beforeLabel: string, afterLabel: string, beforeContent: text or image, afterContent: text or image }

5. SANITY CLIENTS
   - src/lib/sanity/client.ts: createClient with useCdn: true, apiVersion pinned to today's ISO date (e.g., "2026-04-30"), perspective: "published". Imports PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET from $env/static/public.
   - src/lib/sanity/preview-client.ts: server-only — `import { SANITY_API_READ_TOKEN } from '$env/static/private'`. createClient with useCdn: false, token, perspective: "previewDrafts". Add a top-of-file guard: `if (browser) throw new Error('preview-client must not be imported on the client')`.
   - src/lib/sanity/image.ts: build an imageBuilder with @sanity/image-url. Export a typed `urlFor(source)` returning the builder. Add a typed helper `getLqip(source)` that pulls metadata.lqip if asset has it.

6. TYPE GENERATION
   - Create sanity-typegen.json at repo root pointing at src/lib/sanity/schemas/ and outputting to src/lib/sanity/types.ts
   - Add to package.json scripts: `"sanity:types": "sanity-codegen generate"`
   - Run once, commit src/lib/sanity/types.ts
   - Add Husky + lint-staged: `bunx husky-init && bun install`
   - Configure .husky/pre-commit to run `bun run sanity:types` if any file in src/lib/sanity/schemas/ changed (use lint-staged glob filter)

7. GROQ QUERIES — src/lib/sanity/queries.ts
   Use tagged template literals via the `groq` helper from @sanity/client. Each query exported as a named const. Add type aliases for query results (manually mapping from generated types until Sanity codegen v2 type resolution is reliable):

   - getFeaturedProjects: `*[_type == "project" && featured == true] | order(order asc, endDate desc)[0...3] { ..., stack[]-> }`
   - getAllProjects: `*[_type == "project"] | order(coalesce(endDate, now()) desc) { ..., stack[]-> }`
   - getProjectBySlug: takes slug param. Returns full project including body, plus a "related" array: `*[_type == "project" && slug.current != $slug] | order(endDate desc)[0...3]`
   - getSettings: `*[_type == "settings"][0]`
   - getActiveExperiments: `*[_type == "experiment" && status == "running"] | order(startDate desc)`
   - getConcludedExperiments: `*[_type == "experiment" && status in ["concluded","inconclusive"]] | order(endDate desc)`
   - getAllPosts: `*[_type == "post"] | order(publishedAt desc) { title, slug, excerpt, coverImage, publishedAt, readTime, tags }`
   - getPostBySlug: takes slug, returns full post
   - getTestimonials: takes optional { featured: boolean } filter

8. LOAD HELPER — src/lib/sanity/load.ts
   Export `loadQuery<T>(client, query, params)` that runs the query and returns typed T data. Used by every +page.server.ts.

9. SEED SCRIPT — scripts/sanity-seed.ts
   Idempotent (uses createOrReplace by _id). Inserts:

   a) Settings singleton (_id: "settings"):
      - availability: "selectively-booking"
      - availabilityNote: "Selectively booking · Q3 2026"
      - contactEmail: (placeholder until Boris provides real one — use "boris@borishristov.com" as placeholder)
      - socialLinks: array with { platform: "GitHub", url: "https://github.com/[boris-handle]" }, { platform: "LinkedIn", url: "https://linkedin.com/in/..." } — placeholders Boris fills in via Studio
      - heroHeadline: "Full-stack developer and CRO specialist who builds things of enduring value — and proves it."
      - heroSubheadline: "Three years of production work in React, SvelteKit, and Node — and a quieter discipline of measurement and iteration that runs underneath all of it."
      - labOpeningCopy: {
          linkedin: "Welcome — most LinkedIn visitors come asking whether the methodology is real. The page below is the answer.",
          github: "Welcome — for engineers, the implementation notes are linked at the bottom of each experiment.",
          twitter: "Welcome — pinned tweet visitors usually want the inconclusive results. They're below, with the rest.",
          default: "Welcome to the Lab. What follows is a working demonstration of conversion methodology."
        }

   b) Tech stack entries (one document per technology, slug-cased _id):
      Frontend: React, Next.js, SvelteKit, Svelte, Solid, jQuery, Tailwind, shadcn-svelte
      Backend: Node.js, Bun, Hono, Express
      Database: PostgreSQL, SQLite, Drizzle ORM, Prisma, Supabase
      Infra: Cloudflare, Vercel, Netlify, SST
      Tooling: Vite, Vitest, Sanity, PostHog, Adobe Target, Adobe Analytics, AEM, Optimizely, GTM, Sentry
      Lang: TypeScript, JavaScript, Java, Go, C++, Python
      For each: name, slug, category, yearsUsed (estimate sensibly), proficiency. Icon can be omitted for now or use a Lucide icon name as a fallback string.

   c) Six projects (use these EXACT summaries — they are the masterplan voice):

      Project 1 — Hitachi M&B (FEATURED):
      - title: "Hitachi M&B — Restaurant Platform"
      - slug: "hitachi-mb"
      - role: "Frontend Developer"
      - client: "Hitachi"
      - startDate: 2025-08-01, endDate: null
      - featured: true, order: 1
      - summary: "Responsive React and TypeScript components for a multi-brand restaurant platform serving millions of diners. Owned the mobile UX recovery and the scroll-loading rewrite. Integrated with AEM via Java Sling Models."
      - stack references: React, TypeScript, AEM, Java (add as tech stack), SCSS (add)
      - metrics: [{ value: "Millions", label: "monthly active diners", trend: "neutral" }]
      - body: a placeholder portable text block — Boris will edit in Studio

      Project 2 — Valtech Internal (FEATURED):
      - title: "Valtech — Internal Org-Intelligence"
      - slug: "valtech-internal"
      - role: "Lead Frontend Developer"
      - client: "Valtech"
      - startDate: 2025-03-01, endDate: null
      - featured: true, order: 2
      - summary: "Lead developer on Valtech's internal platform for organizational visibility. An interactive circular line-org visualization, dynamic salary-range comparisons, owned end-to-end from data shape to module architecture."
      - stack: React, TypeScript, Nivo (add as tech stack), SCSS, Axios (add)
      - metrics: [{ value: "Owner", label: "end-to-end product", trend: "neutral" }]

      Project 3 — Quizzle (FEATURED):
      - title: "Quizzle — Real-time Multiplayer"
      - slug: "quizzle"
      - role: "Full-Stack Developer"
      - client: "Independent (team of 4)"
      - startDate: 2024-03-01, endDate: 2025-03-31
      - featured: true, order: 3
      - summary: "A real-time multiplayer quiz platform built with a team of four. End-to-end type safety from Drizzle schemas through Zod inference into the Hono backend, with a Go-based WebSocket layer for the live game loop and SST for serverless deployment."
      - stack: React, shadcn (use shadcn-svelte tech stack? — note: this was React shadcn-ui, distinct from shadcn-svelte. Add a separate "shadcn/ui" tech stack entry), Zustand (add), Hono, Drizzle ORM, Go (add), SST, PostgreSQL
      - metrics: [{ value: "Real-time", label: "team of 4", trend: "neutral" }]

      Project 4 — Toyota & Lexus (NOT featured on home; appears on /work and /lab):
      - title: "Toyota & Lexus — Digital Funnel Optimization"
      - slug: "toyota-lexus-funnel"
      - role: "Developer / CRO"
      - client: "Toyota & Lexus"
      - startDate: 2024-03-01, endDate: 2024-06-30
      - featured: false, order: 4
      - summary: "Multivariate experiments across the Toyota and Lexus digital sales funnel using Adobe Target. Custom JS/CSS injections, deep KPI analysis in Adobe Analytics. Delivered measurable revenue lift through funnel rearchitecture."
      - stack: Adobe Target, Adobe Analytics, TypeScript, SCSS
      - metrics: [{ value: "+15%", label: "online revenue, Q1", trend: "up" }]

      Project 5 — DS Smith (NOT featured on home):
      - title: "DS Smith — SEO & Experimentation Program"
      - slug: "ds-smith-cro"
      - role: "Developer / CRO"
      - client: "DS Smith"
      - startDate: 2024-07-01, endDate: 2024-11-30
      - featured: false, order: 5
      - summary: "Data-driven CRO program on Optimizely. A/B tests with custom JS/CSS injections to improve CR, CTR, and RPV while reducing bounce rate. Robust GTM event-tracking framework, page-flicker eliminated via CMS-managed variants."
      - stack: Optimizely CMS, Optimizely Experience, TypeScript, GTM
      - metrics: [{ value: "CR↑", label: "bounce rate↓", trend: "up" }]

      Project 6 — We Talk Data & AI (NOT featured on home):
      - title: "We Talk Data & AI — Community Landing Page"
      - slug: "we-talk-data-ai"
      - role: "Developer"
      - client: "We Talk Data & AI"
      - startDate: 2023-12-01, endDate: 2024-04-30
      - featured: false, order: 6
      - summary: "Landing page for an AI/ML community in Next.js + Tailwind with Sanity as the headless CMS, deployed on Vercel for continuous delivery. A flexible content model lets non-technical organizers publish without a developer in the loop."
      - stack: Next.js, Tailwind, Sanity, Redux (add), Vercel
      - metrics: [{ value: "Live", label: "shipped", trend: "neutral" }]

   d) One placeholder testimonial:
      - quote: "Boris does the rare thing — he takes engineering ownership of outcomes, not just deliverables. The kind of person you want on a project where the metric on the wall has to actually move."
      - author: "[Placeholder Name]"
      - authorRole: "[Placeholder Role]"
      - authorCompany: "[Placeholder]"
      - featured: true
      Boris will replace with real attribution via Studio before launch.

   Print a final summary: how many projects, tech stack entries, testimonials inserted.

10. WIRE BASIC RENDERING (proves the pipe end to end)
    a) src/routes/+page.server.ts: load getFeaturedProjects via loadQuery. Pass `featuredProjects` to data.
    b) src/routes/+page.svelte: under the existing <h1>, add a plain unstyled list of featured project titles. Just enough to confirm Sanity → SvelteKit data flow works. Real design comes Sprint 2.
    c) src/routes/work/+page.server.ts: load getAllProjects.
    d) src/routes/work/+page.svelte: render each project's title + role + slug as a plain <ul>. No design yet.

11. WEBHOOK DOCUMENTATION (don't create yet)
    Create docs/sanity-webhooks.md with these instructions for Sprint 9:
    - Vercel: create a deploy hook for the production branch
    - Sanity: dashboard → API → Webhooks → Create
    - Filter: `_type in ["project","testimonial","post","settings","experiment"]`
    - URL: paste the Vercel deploy hook
    - Trigger: create, update, delete
    - HTTP method: POST

12. COMMIT
    - Verify: `bun run check`, `bun run build` are green
    - Verify: visiting /studio in dev mode loads the Studio with the desk structure
    - Verify: visiting /work in dev mode shows the 6 project titles
    - Commit: `feat(content): Sanity schemas, embedded Studio, GROQ layer, seed data`

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════

Studio UX:
✓ Studio left rail is grouped (Settings pinned, Content / Taxonomy / Experiments groups)
✓ A new Project edit form shows field groups (Content / Meta / Links) — not a flat list of 15 fields
✓ Slug auto-generates on title blur
✓ Required image alt text shows a validation error when missing
✓ Settings is a singleton — cannot be duplicated or deleted

Schema discipline:
✓ Every required field has a validation rule
✓ All enums are explicit string lists, not arbitrary input
✓ No `any` types in schemas
✓ Generated types in src/lib/sanity/types.ts compile cleanly

Code:
✓ Never a client-side Sanity import — verify by grepping src/routes/**/*.svelte for "@sanity/client"
✓ All queries are in $lib/sanity/queries.ts, not inlined in routes
✓ Svelte 5 runes only (no $: or export let)

Atmosphere (still — even at content layer):
✓ /work renders project titles with the inherited body styles (Inter 17px / 1.65) — text should already feel warm and considered, not raw browser default
✓ Background remains warm-obsidian (oklch 0.18 0.005 60), not pure black

Performance:
✓ bun build still green
✓ /work and / Lighthouse still ≥ 95

THE OPULENCE CHECK:
✓ Visiting /studio: visual noise rates ≤ 3/10 (Sanity's UI is what it is, but the desk structure should feel organized, not chaotic)
✓ Boris's Studio editing experience feels like a tool a craftsman would use, not a CMS form — fields are labeled clearly, groups are sensible, validation is helpful

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask if:
- A field in a schema cannot be queried cleanly via GROQ for any of the queries listed (e.g., a reference resolution that creates an N+1 problem)
- @sanity/codegen produces broken TypeScript output (a known intermittent issue across versions)
- Embedding the Studio at /studio conflicts with the SvelteKit prerender defaults — if so, configure `export const prerender = false` for the /studio route and report
- The seed script encounters a "document already exists" error not handled by createOrReplace
- You realize the masterplan summary copy for a project doesn't match the voice (composed, not punchy) — flag and propose a rewrite
- Any tech stack entry has a name collision (e.g., we accidentally add two "shadcn" entries) — propose renaming and ask
- The list of tech stack entries balloons past ~30 — that's a sign of over-engineering; ask before continuing
- A schema requires a feature available only in @sanity/types v3+ but not in the installed version

═══════════════════════════════════════════════════════
RECOVERY PROMPT
═══════════════════════════════════════════════════════
"This output has drifted. Re-anchor to the masterplan:
§1.2 — 'Boris builds things of enduring value, and proves it.'
§5.1 — 'A heritage atelier. Calm, considered, never shouting.'
§5.5 — Forbidden patterns.

The Sanity layer must serve a luxury site, not generic CMS. Schemas should feel disciplined (no over-fielding), Studio should feel organized, copy should match the composed voice.

If schemas have grown beyond §9, prune. If a field could live in code instead of Sanity, move it. Run the Design Quality Gate. Resume."

═══════════════════════════════════════════════════════
HANDOFF NOTE TO SPRINT 2
═══════════════════════════════════════════════════════
Sprint 2 expects to inherit:
- A working Sanity Studio at /studio in dev with all six schemas deployed
- A populated production dataset: settings singleton, ~30 tech stack entries, 6 projects (3 featured), 1 testimonial
- Generated TypeScript types in src/lib/sanity/types.ts
- All GROQ queries defined in $lib/sanity/queries.ts
- A loadQuery helper available
- /work renders 6 project titles in plain text from real data
- / renders 3 featured project titles in plain text from real data
- Husky pre-commit hook regenerates Sanity types

Report at sprint end:
- Screenshot of /studio with a project edit open
- Output of `node scripts/sanity-seed.ts` (or equivalent)
- bun build output
- Confirmation that /studio is excluded from prerender
- Diff summary of src/lib/sanity/types.ts
```

---

## Sprint 2 — Home Page (No 3D Yet)

```
You are pair-programming with Boris on a luxury portfolio site. Sprints 0 and 1 established the foundation and content layer. This sprint builds the entire home page with real content and final design — minus the 3D scenes, which are placeholders awaiting Sprint 3.

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
Build the home page with all eight sections from §3.3 — final layout, final type, final copy, final spacing — looking 95% like the launched version, with 3D scenes as styled placeholders for Sprint 3 to slot into.

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT
═══════════════════════════════════════════════════════
Site atmosphere: heritage atelier. The home page is a slow read. It does not sell, raise objections, or prove credentials. Its job is to communicate identity and craft, then offer ONE understated path to deeper proof on /lab.

POSITIONING: "Boris builds things of enduring value, and proves it."

ARCHITECTURAL COMMITMENTS:
- Home page is FULLY STATIC. No personalization. No A/B tests visible.
- No enterprise client logos on home (Toyota / Lexus / Hitachi / Valtech go on /lab in Sprint 7)
- No Live Experiment widget on home (moved to /lab)
- No "Choose your path" persona selector (retired entirely)
- No inline feedback widgets on home
- One whisper-link to /lab as the only CRO surfacing

STACK & TOKENS (paste verbatim):
- SvelteKit 2, Svelte 5 runes, TypeScript strict
- Tailwind v4 utility classes (use --color-accent, --color-text, --color-bg, etc. through Tailwind tokens like text-text, bg-bg-elevated, border-hairline)
- shadcn-svelte primitives where useful (Button, Card)
- Lenis smooth scroll (NEW — install in this sprint)

COLOR TOKENS:
--bg              : oklch(0.18 0.005 60)
--bg-elevated     : oklch(0.22 0.005 60)
--surface-paper   : oklch(0.21 0.006 60)
--text            : oklch(0.94 0.004 80)
--text-muted      : oklch(0.68 0.005 60)
--text-subtle     : oklch(0.52 0.004 60)
--hairline        : oklch(0.94 0.004 80 / 0.08)
--accent          : oklch(0.78 0.10 85)   /* champagne — for type, rules, hover */
--accent-deep     : oklch(0.62 0.12 78)   /* leaf — for solid CTA fills */

TYPOGRAPHY (precise values):
- H1 desktop: font-display, 84px, letter-spacing -0.025em, line-height 0.95
- H1 mobile: 48px, tracking -0.02em, line-height 0.98
- H2: 56px desktop / 36px mobile, -0.02em, 1.0 line-height
- H3: 36px desktop / 28px mobile, -0.015em, 1.1 line-height
- Body: Inter 17px / 1.65 line-height, tracking -0.005em
- Mono labels: JetBrains Mono uppercase, 12px, 0.12em letter-spacing
- Mono numerical/chip: 14px, 0.04em, tabular-nums always

GOLD RULE BENEATH H1: a 1px wide, 32px-long element in --accent, positioned 32px below the H1 baseline. NOT optional. Use a custom <GoldRule /> component.

MOTION:
- Easing entrances: cubic-bezier(0.22, 1, 0.36, 1)
- Springs: cubic-bezier(0.32, 0.72, 0, 1)
- UI: cubic-bezier(0.4, 0, 0.2, 1)
- Durations: 120ms hover, 280ms UI, 480ms section beats, 800ms hero reveal
- Stagger 60ms between siblings, max 5 in a chain
- Hover blooms (gold halo box-shadow), no harsh shifts
- No layout properties animated — transform / opacity / filter only

SPATIAL SYSTEM:
- 12-col grid, 1440 max-width desktop
- Section padding: py-[192px] desktop / py-24 mobile (96px) STANDARD
- Section padding: py-[256px] desktop / py-32 mobile (128px) for HERO + CONTACT (loud sections)
- Prose max-width: 64ch
- Hairline divider (1px var(--hairline)) between every section
- Gutters: px-6 mobile, px-8 tablet, px-12 desktop

ASYMMETRY MANDATE (§5.6):
- HERO: asymmetric (60/40 split, content left, sculpture placeholder right)
- PRACTICE: asymmetric (7-col prose left, 5-col empty right with mono caption)
- SELECTED WORK: 3-col grid is OK (gallery rhythm — not centered)
- TESTIMONIAL: asymmetric (7-col quote left, 5-col empty right)
- CONTACT: asymmetric (6-col content left, 6-col sign-off right)

These are NOT centered. Centering them is a forbidden default.

FORBIDDEN PATTERNS:
❌ Gradient buttons, glassmorphism, backdrop-blur on nav
❌ Pure black or white anywhere
❌ Rounded-full pills as primary CTAs (use --radius 0.5rem consistently)
❌ Inter for display
❌ Icons in circles as feature visuals
❌ Auto-playing videos
❌ Emoji as decorative layout elements
❌ The word "transforms" in body copy
❌ Logos of Toyota/Lexus/Hitachi/Valtech on this page (those are /lab content)
❌ Any A/B variant logic on this page
❌ "Choose your path" / persona selectors

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
1. Sprints 0 and 1 merged. CI green.
2. /studio loads with seeded content
3. /work renders 6 project titles in plain text from Sanity
4. / renders 3 featured project titles in plain text from Sanity
5. /style-guide demonstrates correct tokens visually
6. Tailwind v4 + shadcn-svelte working without conflict
7. Color tokens applied via @theme block in src/app.css
8. Self-hosted fonts loading (verify by visiting /style-guide and inspecting Network tab)

If any are missing, stop and report.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

1. INSTALL LENIS
   - `bun add lenis`
   - Create src/lib/components/LenisProvider.svelte:
     * Initialize Lenis with friction 0.08, smoothWheel: true, smoothTouch: false (touch uses native momentum)
     * Use $effect to attach RAF loop
     * Disable on prefers-reduced-motion
   - Wrap {@render children?()} in src/routes/+layout.svelte with <LenisProvider>

2. SHARED COMPONENTS — create in src/lib/components/

   a) GoldRule.svelte
      - Props: width = "32px" | "auto", marginTop = number (default 32)
      - Renders a 1px tall element with background var(--color-accent), specified width
      - Default style: display block

   b) SectionHeader.svelte
      - Props: eyebrow (string, e.g., "01 — SELECTED WORK"), title (string), lede (optional string), align ("left" | "right" — default left)
      - Eyebrow rendered in mono uppercase 12px 0.12em letter-spacing, color text-muted
      - Title in display serif H2 (56px desktop, 36px mobile, -0.02em, line-height 1.0)
      - GoldRule beneath title (32px below baseline, 32px wide)
      - Lede in body 18px text-muted, max-w-[52ch], 32px below the gold rule

   c) WhisperLink.svelte
      - Props: href, children (snippet)
      - Renders inline. Default color: var(--color-text). On hover: color var(--color-accent), with a 1px gold underline that animates from 0% to 100% width over 280ms ease cubic-bezier(0.22, 1, 0.36, 1).
      - This is the ONLY gold-text element on the home page (used once, for the lab whisper).

   d) AvailabilityNote.svelte
      - Reads availability + availabilityNote from Sanity settings (passed in as prop)
      - Renders mono uppercase 12px, prefixed by a small dot (●). Dot color follows availability: --accent for "selectively-booking" or "open", --text-subtle for "fully-booked".

   e) StackChip.svelte (used on home only for compact display — NO metric chips on home)
      - Props: tech (techStack reference), size ("sm" | "md")
      - Renders mono 14px, padding 4px 10px, 1px border var(--hairline), border-radius 0.375rem (slightly tighter than --radius for proportionality)
      - Optional tooltip on hover (use shadcn Tooltip) showing yearsUsed if present

   f) ProjectCardGallery.svelte (gallery variant for home + /work)
      - Props: project (typed Project), variant = "gallery"
      - Layout:
        * Thumbnail (aspect 16/10), border-radius var(--radius), 1px inset hairline border
        * 24px below thumbnail: role + dates in mono 12px text-muted
        * 8px below: project title in display serif 32px, line-height 1.15, tracking -0.015em
        * 16px below: summary, body 17px text-muted, max 3 lines (line-clamp-3)
        * 16px below: stack chips row (first 4 chips, +N more if overflow)
      - NO metric chip on this variant (those are /work/[slug] and /lab only — Sprint 4)
      - Hover: subtle lift (translateY -2px), 1px gold halo via box-shadow inset, 600ms spring back. Image inside thumbnail gains scale(1.02). All transforms only.
      - Focus-visible: 2px gold ring, 2px offset
      - Click → navigate to /work/{slug}

3. NAV — src/lib/components/Nav.svelte
   - Sticky top, height 72px, background var(--color-bg) with NO backdrop-blur
   - Hairline 1px border-bottom in var(--color-hairline) only when scrolled
   - Scroll behavior: hide on scroll-down (translateY -100%), reveal on scroll-up. Animate with translateY transform, 280ms cubic-bezier(0.4, 0, 0.2, 1).
   - Layout: 12-col grid
     * Left: monogram "B." in display serif 24px (cols 1-2). On hover: GoldRule appears 4px below the dot, 12px wide, animated in 280ms.
     * Center: nav links — Work · About · Lab · Writing · Contact (cols 5-9). 14px Inter medium. text-muted default, on hover text-text + a 1px gold underline that grows from 0% to 100%, 280ms.
     * Right: AvailabilityNote (cols 10-12). NO theme toggle on nav (theme toggle deferred to footer).
   - Mobile: replaces nav links with a small word-link "Menu" (NOT a hamburger icon — too template-feeling). Tapping it opens a full-bleed overlay:
     * Background var(--color-bg)
     * Oversized type: nav items in display serif 48px, vertical stack
     * Bottom of overlay: AvailabilityNote in mono
     * Close: a small "Close" word-link top-right
     * Overlay enter: opacity + translateY, 480ms

4. FOOTER — src/lib/components/Footer.svelte
   - py-32 (128px) padding
   - 3-col grid desktop (cols 1-4: sitemap; 5-8: connect; 9-12: meta), stacked on mobile
   - Sitemap col: links to / · Work · About · Lab · Writing · Uses · Contact, each 14px text-muted, hover text-text
   - Connect col: GitHub, LinkedIn, Email (with copy button — Sprint 5 wires the Clipboard API)
   - Meta col: copy from §4.7 verbatim:
     "Made in Skopje. Built in SvelteKit, with Threlte and Sanity. Last deployed [DEPLOY_TIMESTAMP]. The source is on GitHub — issues welcomed; pull requests warmly received."
     - Replace [DEPLOY_TIMESTAMP] at build time via a Vite define or via a build-time generated module that exports new Date().toISOString()
   - Bottom row: 1px var(--hairline) divider, then a row with monogram left and "© 2026" mono right
   - Theme toggle lives here (small word-link "Theme: dark" → cycles dark/light) — quietly placed, not nav-prominent

5. HOME PAGE — src/routes/+page.server.ts
   - load: getFeaturedProjects (top 3), getSettings, getTestimonials({ featured: true }), getAllTechStacks for the Skills section (write a getAllTechStacks query in $lib/sanity/queries.ts ordered by category then proficiency desc)

6. HOME PAGE SECTIONS — create in src/lib/components/home/, then compose in src/routes/+page.svelte

   ───── SECTION 1: HeroSection.svelte (LOUD, py-[256px] desktop) ─────
   Asymmetric 60/40 split.
   Left (cols 1-7):
   - AvailabilityNote at top (mono, with dot)
   - 32px below: H1 — settings.heroHeadline. 84px display serif, -0.025em, line-height 0.95, max-w-[18ch] for line breaks. Use white-space: balance.
   - GoldRule width 56px, marginTop 32px below H1 baseline
   - 32px below the rule: subheadline — settings.heroSubheadline. 18px Inter, line-height 1.55, color text-muted, max-w-[42ch].
   - 48px below subheadline: CTA row (gap 16px):
     * Primary: <Button> variant solid (--accent-deep fill, --bg text), 14px Inter medium, padding 14px 28px, --radius 0.5rem. Text: "See selected work →". On hover: subtle gold halo via box-shadow 0 0 24px oklch(0.78 0.10 85 / 0.18). 280ms spring.
     * Secondary: ghost, 14px text-muted, gold underline on hover. Text: "About the practice"
   - 64px below CTAs: small mono caption "3+ YEARS · FULL-STACK · CRO · SKOPJE" — text-subtle, uppercase, 12px, 0.12em
   Right (cols 8-12):
   - A styled placeholder for the 3D sculpture. Aspect ratio 1:1 or 4:5. Background a subtle radial gradient (oklch 0.22 0.005 60 → oklch 0.18 0.005 60), 1px var(--hairline) border, --radius. Centered inside: mono caption "[ HERO SCULPTURE — Sprint 3 ]" in text-subtle.
   - This placeholder MUST be sized as the final 3D mount will be, so Sprint 3 can drop in <View> with no layout shift.

   ───── SECTION 2: PracticeSection.svelte (MEDIUM, py-[192px] desktop) ─────
   Asymmetric.
   - SectionHeader — eyebrow "OI — THE PRACTICE", title "I write production software for a living, and I run experiments on it for the same reason a craftsman sharpens his tools." (display serif H2 56px), no lede. Title spans cols 1-9.
   - 64px below the gold rule: prose body in cols 1-7, max-w-[64ch]. Three paragraphs from §4.2 verbatim:
     "I write production software for a living, and I run experiments on it for the same reason a craftsman sharpens his tools: because the work demands it."
     "Most engineering ends at deployment. Mine begins there. A component is finished when its purpose is named, its metric is measurable, and the measurement says it earns its place. That discipline came from three years of running A/B tests for clients whose decisions move real money. It stays with me on every project, whether I'm being paid for the experiments or not."
     "What you'll find here is the visible part of that practice — the work that shipped, the writing that explains it, and the laboratory where the methodology is on display. The rest is between me and the codebases."
   - Right column (cols 8-12): quietly empty. Optionally a single mono caption at the top right: "PRACTICE IS THE WORD". 12px text-subtle.

   ───── SECTION 3: SelectedWorkSection.svelte (LOUD, py-[256px] desktop) ─────
   - SectionHeader — eyebrow "02 — SELECTED WORK", title "Three projects, three different kinds of hard.", lede: "Pulled from a longer list. The full archive is on the work page."
   - 96px below the lede: 3-col grid (cols 1-12, 3 equal), gap-12 (48px). Render 3 ProjectCardGallery instances from data.featuredProjects.
   - Mobile: 1-col stack, gap-8 (32px)
   - 64px below grid: a quiet right-aligned link "See all work →" using ghost style. Wraps to bottom on mobile.

   ───── SECTION 4: CraftSection.svelte (QUIET, py-[192px] desktop) ─────
   - SectionHeader — eyebrow "03 — CRAFT", title "What I reach for.", no lede.
   - 64px below the rule: a typographic compendium of skills. NOT a card grid. NOT chips floating in space.
   - Layout: cols 1-12 desktop, broken into 6 category groups. Each group:
     * Mono category label, uppercase 12px text-muted (e.g., "FRONTEND")
     * A horizontal flex-wrap row of tech names — display serif 24px, color text. Each tech rendered as a span with a tiny "·" separator between (custom CSS: span:not(:last-child)::after { content: " · "; color: var(--color-text-subtle); margin: 0 0.5em }).
     * Hover state on a single tech name: gentle gold underline (1px gold rule beneath, 280ms).
   - Categories: Frontend, Backend, Database, Infra, Tooling, Languages
   - Pull data from getAllTechStacks. Group client-side by category.

   ───── SECTION 5: LabWhisperSection.svelte (QUIET, py-[128px] desktop, INTENTIONAL) ─────
   - NO eyebrow. NO heading.
   - Single line, centered horizontally, max-w-[48ch], display serif 32px italic-faux (or italic if the font supports it):
     "Curious about proof? — <WhisperLink href='/lab'>Visit the Lab.</WhisperLink>"
   - The "Curious about proof? —" portion in text-muted. The WhisperLink portion in text (default) becoming gold on hover.
   - Hairlines above and below this section (full width of the container, var(--hairline)) — 96px above and below.
   - Generous whitespace. THIS SECTION'S POWER COMES FROM ITS RESTRAINT.

   ───── SECTION 6: TestimonialSection.svelte (MEDIUM, py-[192px] desktop) ─────
   Asymmetric.
   - cols 1-8 quote area, cols 9-12 attribution
   - Large opening quote-mark ‟ (left double quote U+201F or visual equivalent) in display serif 96px, color text-subtle, positioned as a design element above the quote
   - Quote in display serif 32px (24px mobile), line-height 1.3, color text. From data.testimonials[0].quote
   - 32px below quote: attribution line — author name in body 16px text, role + company in mono 12px text-muted on a second line
   - NO carousel, NO dot pagination
   - If no testimonial exists, the section returns null — do not render an empty state

   ───── SECTION 7: ContactSection.svelte (LOUD, py-[256px] desktop) ─────
   Asymmetric.
   - SectionHeader spans cols 1-7 — eyebrow "04 — GET IN TOUCH", title "Let's discuss the work.", no lede on the header itself
   - 32px below the rule: sub-paragraph in body 17px text-muted, cols 1-7, max-w-[60ch]:
     "I take on a small number of engagements each quarter — usually one significant build, occasionally a CRO program for a team that already ships well."
   - 48px below the sub: Primary CTA — solid <Button> "Begin a conversation". Same styling as hero primary.
   - 24px below: secondary row in mono 12px text-muted: "Copy email · Book 20-min call". These are just visual stubs in this sprint — Sprint 5 wires Clipboard API and Calendly.
   - Right column (cols 8-12): a quiet mono "sign-off" — "BORIS / SKOPJE / 2026" in 12px text-subtle, vertically centered to the section. Optionally a small monogram "B." in display serif 64px above it.

   ───── SECTION 8: Footer (already built in step 4) ─────

7. HAIRLINE DIVIDERS BETWEEN SECTIONS
   Render a 1px var(--hairline) full-width div between every adjacent section. Sections themselves have NO bottom border — the divider is its own element. Spacing: hairline sits exactly at the boundary, with section padding flowing on either side.

8. SEO — src/routes/+page.svelte
   In a <svelte:head>:
   - <title>Boris — Full-stack developer & CRO specialist</title>
   - <meta name="description" content="Three years of production work in React, SvelteKit, and Node — and a quieter discipline of measurement and iteration that runs underneath all of it.">
   - <link rel="canonical" href={`${PUBLIC_SITE_URL}/`}>
   - Open Graph: og:title, og:description, og:type=website, og:image (use a static /og-default.png placeholder for now — Sprint 9 generates real OG)
   - Twitter card: summary_large_image
   - JSON-LD: Person schema. Inject as a <script type="application/ld+json">. Pull name, jobTitle, url, sameAs (from settings.socialLinks) from Sanity settings.

9. RESPONSIVE
   - Test at 390px, 430px, 768px, 1024px, 1280px, 1440px
   - No horizontal scroll at any width
   - H1 reflows from 84px to 48px below 768px breakpoint
   - Section padding reduces from 192/256 to 96/128 below 768px
   - Three-col project grid → 1-col stack below 768px

10. ACCESSIBILITY (axe-core run via Playwright)
    - Add a Playwright test: visit / and run axe-core, fail on any violation
    - Skip-to-content link works (Tab focus)
    - Keyboard navigation: every link, every button, the menu overlay all reachable
    - Focus-visible ring is 2px var(--color-accent) with 2px offset everywhere
    - Image alt text inherited from Sanity (verify via inspect)

11. COMMIT
    - Verify: bun run check, bun run build, bun test, bunx playwright test all green
    - Commit: `feat(home): luxury home page — all sections, real content, 3D placeholders`

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════

Token discipline:
✓ Every color uses a token (text-text, bg-bg, border-hairline, text-accent, etc.). Search for hex values — should return only inside @theme block.
✓ All spacing uses scale values (4/8/12/16/24/32/48/64/96/128/192). No arbitrary px values outside.
✓ Radius is var(--radius) consistently. No rounded-full anywhere.

Typography discipline:
✓ H1 computed style: font-size 84px, letter-spacing -0.025em, line-height 0.95
✓ GoldRule sits 32px below every H1's baseline — measure on /
✓ Body line-height 1.65, body size 17px — verify in DevTools
✓ Mono used ONLY for: eyebrow labels, the "B." monogram, AvailabilityNote, the sign-off in contact section, footer mono. NEVER for prose paragraphs.

Spatial discipline:
✓ Section padding: hero and contact use 256px desktop; practice/work/craft/testimonial use 192px desktop; lab whisper uses 128px desktop
✓ Mobile padding is 96px / 128px / 32px proportionally
✓ Hairline 1px dividers present between every section
✓ Hero, Practice, Testimonial, Contact are asymmetric (not centered) — verify visually
✓ Selected Work uses the 3-col gallery rhythm (also not centered)
✓ Prose columns visibly ≤ 64ch

Atmosphere:
✓ Background warm-obsidian, never pure black — pixel-pick to confirm oklch 0.18 0.005 60
✓ Text soft-ivory, never pure white — pixel-pick to confirm oklch 0.94 0.004 80
✓ Film grain visible (toggle off to confirm noticeable difference)
✓ No backdrop-blur on nav
✓ No gradients except optionally on the gold itself (5% lightness 2-stop)
✓ Gold appears: hero primary CTA fill, hero monogram on hover, GoldRule beneath every H1, the WhisperLink hover state, focus rings. Count: ≤ 4 instances per viewport on average. ZERO instances where gold is a background or text fill (besides the WhisperLink hover state, which is allowed).

Forbidden patterns absent:
✓ No gradient buttons
✓ No glassmorphism
✓ No backdrop-blur on nav
✓ No rounded-full pill CTAs
✓ No icons-in-circles as feature visuals
✓ No purple-pink gradients
✓ No emoji as decorative element
✓ No enterprise client logos (Toyota / Lexus / Hitachi / Valtech)
✓ No A/B test variant visible
✓ No "What brings you here?" persona selector
✓ No inline 👍 👎 feedback widget
✓ No Live Experiment split-screen widget

Voice:
✓ Hero copy is the §4.1 recommended headline word-for-word
✓ Practice section copy is §4.2 verbatim
✓ Whisper to Lab is "Curious about proof? — Visit the Lab." word-for-word
✓ Contact section copy is §4.6 verbatim
✓ Footer is §4.7 verbatim with [DEPLOY_TIMESTAMP] interpolated

Code:
✓ Svelte 5 runes only ($state, $derived, $effect, $props)
✓ No client-side Sanity calls
✓ TypeScript no `any`
✓ Every section component has a JSDoc header

Performance:
✓ Lighthouse on / ≥ 95 desktop, ≥ 85 mobile
✓ Total JS gzipped on / ≤ 200KB (we have headroom — Sprint 3 adds 3D)
✓ LCP < 2s, INP < 200ms, CLS < 0.05
✓ No layout shift when fonts load (verify by reloading with cache disabled)

Accessibility:
✓ axe-core: 0 violations on /
✓ Keyboard tab order is logical
✓ Skip-to-content link works
✓ Mobile menu overlay traps focus and returns focus on close

THE OPULENCE CHECK:
✓ Visual noise on / rates ≤ 2 / 10 (calm, restrained — if a recruiter says "is this finished?", that's drift toward "unfinished" not toward "considered" — increase content density via type weight or hairline accents, NOT by adding sections)
✓ Warmth rates ≥ 8 / 10 (the page should feel welcoming and considered; if it feels clinical, the warm tone in --bg is missing or the film grain is off)

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask if:
- A section has been instinctively centered when the spec says asymmetric. Stop, redesign asymmetrically.
- The home page contains an enterprise client name or logo (Toyota / Lexus / Hitachi / Valtech). Remove immediately and ask why it appeared.
- Any A/B variant logic, persona selector, or feedback widget is being built into the home page. Remove and confirm those belong only on /lab (Sprint 7).
- Gold is being used as a background fill or as text fill anywhere except the WhisperLink hover state. Remove and ask.
- A gradient is creeping in (button, background, divider, anything). Remove.
- The hero subheadline or the practice prose drifts from the masterplan voice (composed, never punchy). Stop and ask before deviating.
- Three.js code is being introduced. Stop — Sprint 3 owns 3D. The hero placeholder is just a styled div.
- Lighthouse on / drops below 95 desktop. Investigate before proceeding (likely a font loading or LCP issue).
- The CraftSection is rendering tech as a card grid instead of a typographic list with separators. Stop and rebuild as the typographic compendium spec.
- Any code uses Svelte 4 syntax ($:, export let, on:click as prop). Stop and refactor.

═══════════════════════════════════════════════════════
RECOVERY PROMPT
═══════════════════════════════════════════════════════
"This output has drifted from the heritage atelier. Re-anchor:
§1.2 — Boris builds things of enduring value, and proves it.
§5.1 — Calm, considered, never shouting. The site does not sell.
§5.5 — Forbidden patterns: gradient buttons, glassmorphism, backdrop-blur on nav, rounded-full CTAs, gold as fill, oversaturated colors, enterprise logos on home, A/B variants on home.

Identify the single design choice that broke the calm: a section that became centered, a button that became a pill, a gradient that crept in, a logo that surfaced when it should be /lab content, an emoji that became decorative, a persona selector that returned. Revert it. Run the Design Quality Gate. Resume."

═══════════════════════════════════════════════════════
HANDOFF NOTE TO SPRINT 3
═══════════════════════════════════════════════════════
Sprint 3 expects to inherit:
- A complete home page at /, with all 8 sections rendered using real Sanity content
- A styled placeholder div in the hero's right column where the 3D sculpture will mount, sized exactly as the final scene needs (aspect ratio and dimensions match)
- A LenisProvider working in dev (verify smooth scroll feel)
- All shared components: GoldRule, SectionHeader, WhisperLink, AvailabilityNote, StackChip, ProjectCardGallery, Nav, Footer
- Lighthouse on / ≥ 95 desktop / ≥ 85 mobile
- Total JS gzipped on / ≤ 200KB (headroom for Sprint 3's 3D)
- axe-core: 0 violations on /
- Sanity types still aligned (no schema changes this sprint)

Report at sprint end:
- Screenshot of / in dark mode at 1440px and 390px
- Lighthouse summary for /
- Bundle size on /
- axe-core report
- Design self-review: which section feels strongest, which weakest, what you'd push back on
```

---

## Sprint 3 — Three.js (Hero Sculpture + Particle Field)

```
You are pair-programming with Boris on a luxury portfolio site. Sprint 2 built a complete home page with 3D placeholders. This sprint replaces the hero placeholder with a real sculpture, adds a restrained ambient particle field, and locks in the <View> pattern that all later 3D will inherit.

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
Mount one root <Canvas> in +layout.svelte. Implement the hero sculpture (single warm-toned form, slow rotation, warm HDRI). Add an ambient 8K-particle field. Ensure both stay within performance budget on desktop AND mobile, with reduced-motion fallback images baked in.

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT
═══════════════════════════════════════════════════════
The 3D layer is the sculptural anchor of "considered software." It does not announce; it reveals on attention. Earlier glass-iridescent torus-knot ideas are RETIRED (read as 2020 / cheap-tech).

The home sculpture is SOLID, not glass — it suggests alabaster, polished brass, or cast bronze. Not iridescent, not transparent.

The two-competing-sculptures concept is for /lab (Sprint 7), NOT here. The home page has ONE sculpture only.

ARCHITECTURAL COMMITMENT (non-negotiable): one root <Canvas> in +layout.svelte. Each scene declares a <View> from @threlte/extras that portals into the root canvas's viewport. Benefits: one renderer, one HDRI loaded once, one frameloop, predictable Safari context behavior (Safari has a 16-context limit).

STACK:
- Threlte 8 + @threlte/extras (already installed Sprint 0)
- three.js (already installed)
- Svelte 5 runes everywhere

COLOR TOKENS (used for fallbacks, gradients, ambient hues):
--bg              : oklch(0.18 0.005 60)
--bg-elevated     : oklch(0.22 0.005 60)
--text            : oklch(0.94 0.004 80)
--accent          : oklch(0.78 0.10 85)
--accent-deep     : oklch(0.62 0.12 78)

PERFORMANCE BUDGET (§14):
- Total JS gzipped on /: ≤ 400KB
- First 3D scene (sculpture + env): ≤ 250KB compressed
- HDRI: ≤ 300KB after KTX2 compression
- DPR cap: Math.min(devicePixelRatio, 2), mobile capped at 1.5
- Mobile: particle count cut to 6K, HDRI replaced with procedural warm env

REDUCED-MOTION MATRIX (§7.9):
| Hero sculpture | Static screenshot, no rotation |
| Particle field | Replaced with static noise gradient |
| Section transitions | Opacity-only fade |
| Custom cursor | Off |

FORBIDDEN PATTERNS:
❌ Glass / transmission > 0.15 (the new direction is solid forms)
❌ Iridescence (retired — too tech)
❌ Multiple <Canvas> elements (one root, View portals only)
❌ Loading any 3D code synchronously on initial route — must be dynamic import
❌ Particle counts above 8K on desktop, 6K on mobile (signals effort, breaks calm)
❌ Shape-shifting particles (the "cloud → bar chart → funnel" idea is retired)
❌ Fog/atmospheric effects that reduce contrast on the surrounding text

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
1. Sprint 2 merged. Home page complete with 3D placeholder in hero
2. The hero placeholder has stable dimensions (aspect ratio set, won't shift when 3D mounts)
3. Threlte 8 + @threlte/extras + three already installed (Sprint 0)
4. /style-guide demonstrates correct tokens
5. Lighthouse on / is ≥ 95 desktop pre-3D
6. CI is green
7. The static/hdri/ and static/fallbacks/ directories exist (Sprint 0 created them)
8. Mobile testing capability available (real device or Chrome DevTools throttling)

If any are missing, stop and report.

ALSO: before writing any Three.js, run a one-file hello-world Threlte 8 scene to confirm Svelte 5 + Threlte 8 compatibility. If <View> from @threlte/extras does NOT work as expected (it should portal a sub-scene into a parent canvas's viewport), STOP and ask whether to fall back to multiple canvases. Do not proceed past the hello-world without confirmation.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

PART A — INFRASTRUCTURE

1. THREE-HOOKS — src/lib/three/hooks/

   a) useReducedMotion.ts
      - Returns a Svelte 5 store (writable boolean) reflecting window.matchMedia('(prefers-reduced-motion: reduce)').matches
      - Updates live on media query change
      - Server-safe (returns false during SSR)

   b) useInView.ts
      - Function: takes an HTMLElement reference and IntersectionObserver options
      - Returns a $state-backed boolean
      - Cleans up the observer in $effect cleanup

   c) useDeviceTier.ts
      - Returns "low" | "mid" | "high" based on:
        * navigator.hardwareConcurrency
        * navigator.deviceMemory if available
        * window.innerWidth (mobile heuristic)
      - "low": <4 cores OR <4GB memory OR width <768px → mobile-quality settings
      - "high": ≥8 cores AND ≥8GB → max quality
      - "mid": everything else
      - Server-safe (returns "mid" during SSR)

2. ROOT CANVAS — src/lib/three/Canvas.svelte
   - Wraps @threlte/core <Canvas>
   - Render mode: "on-demand" (frameloop only ticks when invalidated)
   - dpr: $derived from useDeviceTier — "high": Math.min(window.devicePixelRatio, 2), "mid": Math.min(window.devicePixelRatio, 1.5), "low": 1
   - colorManagement: true
   - toneMapping: ACESFilmicToneMapping (from three)
   - Position: fixed, inset: 0, z-index: -1, pointer-events: none (individual <View>s opt-in to pointer events)
   - Wrapped in a {#if browser} guard using $app/environment
   - Reads useReducedMotion: if true, render nothing (canvas absent)

3. CLIENT-ONLY WRAPPER — src/lib/components/ClientOnly.svelte
   - Renders children only after mount via a $state mounted = $state(false) and $effect that sets to true on mount
   - Used to prevent SSR hydration mismatch on canvas

4. HDRI LOADER — src/lib/three/env.ts
   - Exports a $state-backed Texture or null
   - On first call, loads /hdri/studio-warm.ktx2 via Three's KTXLoader (from three/examples)
   - Memoized — subsequent imports return the same texture
   - The HDRI must be:
     * Warm golden-hour studio lighting
     * Compressed to KTX2 with Basis Universal
     * <300KB after compression
     * Source: pick a free studio HDRI from PolyHaven (e.g., "studio_small_07" or similar warm one), download EXR, convert to KTX2 using `basisu` CLI or KTX-Software toolkit
     * Save to static/hdri/studio-warm.ktx2
   - Document the source HDRI in static/hdri/README.md (license attribution)

5. WIRE THE CANVAS INTO LAYOUT — src/routes/+layout.svelte
   - Inside <ClientOnly>, mount the root <Canvas>
   - This canvas covers the entire viewport, fixed-positioned, behind all content
   - Pass the loaded HDRI as a prop or via a context so child <View>s can access it

PART B — HERO SCENE (§7.1)

6. HEROSCENE — src/lib/three/scenes/HeroScene.svelte

   Concept: a single sculptural form, slowly rotating, lit warmly. Suggests alabaster (top of hero) shifting toward brass (deeper into scroll).

   Structure:
   - Declares a <View> from @threlte/extras with `track={...}` pointing at a DOM element passed in as prop (the hero's right-column placeholder div)
   - Inside the View:
     * Camera: PerspectiveCamera, fov 35, position [0, 0, 4], looking at origin
     * The sculpture: a TorusKnotGeometry with parameters (radius=0.85, tube=0.28, tubularSegments=180, radialSegments=24, p=2, q=3) OR an extruded "B." monogram (more distinctive, but heavier — start with torus knot, propose monogram as Sprint 8 polish if time permits)
     * Material: MeshPhysicalMaterial:
       - color: oklch(0.94 0.004 80) converted to sRGB (warm ivory base — DO compute the conversion correctly; OKLCH is not directly assignable to three's Color)
       - metalness: 0.05
       - roughness: 0.18
       - clearcoat: 1.0
       - clearcoatRoughness: 0.05
       - sheen: 0.5
       - sheenColor: a very faint gold tint (oklch 0.78 0.05 85 → sRGB)
       - sheenRoughness: 0.3
       - transmission: 0 to 0.15 (set to 0 by default — solid form)
       - iridescence: 0 (RETIRED)
     * Environment: applied from the shared HDRI loaded in step 4 (use Threlte's <Environment> from @threlte/extras, pass the texture)
     * Subtle ambient lighting addition: a warm directional light at intensity 0.3, color oklch(0.78 0.10 85), positioned upper-front-left

   Behavior:
   - Idle rotation: rotation.y increments by 0.0008 radians per frame (one full revolution per ~80 seconds at 60fps). Use a Threlte useTask or $effect tied to render loop.
   - Mouse parallax (camera, not mesh): track mouse position globally in client. Lerp camera.position.x by 0.0001 * (mouse.x - 0.5), bounded to ±0.08. Same for camera.position.y. Subtle. Easing 0.05 lerp per frame.
   - Scroll-tied material shift: bind material.color to Lenis scroll progress IN THE HERO ONLY (when in view). At top of hero, color is alabaster (warm ivory). As scroll progresses through hero, color lerps toward brass (oklch 0.72 0.08 85). Use a $derived from scroll position.
   - Click: call an exported callback prop onSculptureClick (Sprint 6 wires it to track('three_scene_interacted'))

   Performance:
   - Use a single instanced material reused (not recreated per frame)
   - Geometry created once, frozen
   - useTask returns a cleanup; ensure no leaks
   - Material gets disposed on unmount

7. WIRE INTO HOME — update src/lib/components/home/HeroSection.svelte
   - The placeholder div in the right column gets a bind:this={sculptureContainer}
   - Wrap <HeroScene track={sculptureContainer} /> in:
     * {#if browser && !reducedMotion}
        - {#await import('$lib/three/scenes/HeroScene.svelte') then { default: HeroScene }}
            <HeroScene track={sculptureContainer} />
          {/await}
     * {:else}
        - <img src="/fallbacks/hero-sculpture.jpg" alt="A warm-toned sculptural form, slowly rotating in studio light" class="size-full object-cover rounded-[var(--radius)]" />
   - Above the canvas region: an aria-hidden skip-link "Skip 3D scene" that jumps focus to the CTAs (visible only when focused)
   - Add a visually-hidden <span class="sr-only">A 3D sculptural form, rendered in warm studio lighting and rotating slowly. The form embodies the studio's commitment to considered software.</span>

PART C — AMBIENT PARTICLE FIELD (§7.3 — restrained)

8. PARTICLE-TARGETS BAKING SCRIPT — scripts/bake-particle-targets.ts

   Although the new direction RETIRED shape-shifting (no bar chart / funnel / lattice morphing), we still want a single ambient distribution baked at build time so the field has structured warm noise rather than uniform random.

   - Run-once script generating a single Float32Array of 24,000 floats (8000 particles × 3 axes)
   - Distribution: a soft 3D ellipsoid (1.6 wide × 1.0 tall × 0.6 deep) with edge falloff via rejection sampling — particles cluster more densely near the center
   - Save to static/particle-targets/ambient-cloud.bin
   - Print summary: total particles, file size

9. PARTICLEFIELD — src/lib/three/scenes/ParticleField.svelte

   Concept: a single ambient drift, warm-toned, low-opacity. NO shape-shifting. NO scroll-tied transitions. Pure atmosphere.

   Structure:
   - Loads /particle-targets/ambient-cloud.bin via fetch() in $effect, parses to Float32Array
   - Creates a BufferGeometry with the loaded positions
   - Material: ShaderMaterial (custom):
     * Vertex shader: passes through position with very subtle Perlin-based drift driven by uTime — particles wobble within a small radius, never escape their home position by more than ~0.05 units
     * Fragment shader: smooth circular point with soft alpha falloff (smoothstep on length(gl_PointCoord))
     * Color: warm off-white (oklch 0.94 0.05 80 → sRGB) with faint amber edge tint
     * Opacity: 0.18 (matches §7.3)
     * Blending: AdditiveBlending
     * depthWrite: false
   - Renders as Points
   - Particle count: $derived from useDeviceTier — high/mid: 8000, low: 6000
   - DOES NOT have a <View> pinned to a specific element. Instead it occupies the full root canvas viewport behind everything (uses orthographic-feeling perspective at z = -3).
   - On /lab and /work/[slug] routes: the particle field is DISABLED. Implement via a route-aware store: reads $page.url.pathname; mounts the particle field only on /, /about, /writing*.

10. WIRE INTO LAYOUT — src/routes/+layout.svelte
    - Inside <ClientOnly>, after the <Canvas>, conditionally lazy-load <ParticleField /> based on the route store
    - Wrap in {#await} for dynamic import
    - On reduced-motion: render a static SVG noise gradient instead (a fixed-position div with the existing film-grain noise but at higher opacity ~3%, layered over a faint warm radial gradient)

PART D — PERFORMANCE & FALLBACKS

11. BAKE REDUCED-MOTION FALLBACK IMAGES
    - Run the dev server with the hero scene on
    - Take a screenshot of the sculpture at the "alabaster" rotation midpoint (centered, no parallax)
    - Save as static/fallbacks/hero-sculpture.jpg, 1600×1600 (or matching aspect of hero placeholder), JPEG quality 80, target ≤80KB
    - Take a second screenshot for the brass-toned variant (deeper-scroll material) → static/fallbacks/hero-sculpture-brass.jpg (used optionally for darker-mode fallback)
    - Write a short README at static/fallbacks/README.md explaining how these were generated and noting that they should be re-baked any time the hero scene material changes substantially

12. INTERSECTION-BASED PAUSE
    - In HeroScene, useInView the track element. When out of view, set a $state pause boolean and stop the rotation/parallax updates (still render last frame, but don't tick the frameloop). Re-enable on re-entry.
    - This prevents wasted GPU when the visitor scrolls past the hero.

13. MOBILE ADAPTATIONS
    - On useDeviceTier === "low" or width < 768px:
      * HDRI replaced with a procedural warm color env (use Three's RoomEnvironment OR a manually-tinted scene background) — saves the KTX2 loading entirely
      * Particle field count: 6000
      * DPR: 1.5
      * Material clearcoat: 0.5 (lower clearcoat = cheaper shader)
    - Document these in src/lib/three/quality-presets.ts, exported as constants

14. BUNDLE ANALYSIS
    - Run bun add -D vite-bundle-visualizer or @rollup/plugin-visualizer to produce a treemap
    - Identify:
      * Three.js core size in the home chunk
      * Threlte size
      * Hero scene chunk size (should be a separate dynamic chunk)
      * Particle field chunk size (separate)
    - Verify:
      * Total / JS gzipped ≤ 400KB
      * Hero scene chunk ≤ 200KB
      * Particle field chunk ≤ 50KB
    - If over budget: first compress HDRI more aggressively, second drop sheen from material, third drop the procedural drift in the particle shader

15. CROSS-BROWSER TEST
    - Safari macOS (latest): verify the sculpture renders, no WebGL errors in console
    - Safari iOS (real device or simulator): verify mobile adaptations kick in (look at canvas size and console FPS)
    - Chrome: verify
    - Firefox: verify
    - On any browser failing, log the issue and ask before proceeding

16. COMMIT
    - Verify bun run check, bun run build, bun test, bunx playwright test all green
    - Commit: `feat(3d): single root canvas, hero sculpture, restrained particle field with View portal pattern`

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════

3D craft:
✓ Hero sculpture is SOLID (transmission ≤ 0.15) — no glass-iridescent look anywhere
✓ Material is alabaster/brass-like, not "tech glass"
✓ HDRI is warm and produces gold-tone reflections; the sculpture's reflections bring gold without ever introducing gold as a literal color element
✓ Idle rotation is one full revolution per ~80 seconds (slow — perceptible only on attention, never distracting)
✓ Mouse parallax magnitude is ≤ ±0.08 units on camera position — visitor must look closely to detect

Architecture:
✓ Exactly ONE <Canvas> in the entire app (in +layout.svelte). Verify by grepping for "Canvas" in src/.
✓ Every scene uses <View> from @threlte/extras to portal into the root canvas
✓ HDRI is loaded once via the shared env store, not re-loaded per scene
✓ All 3D code is dynamically imported (await import('$lib/three/scenes/...')), not in the initial bundle

Atmosphere:
✓ Particle field opacity is 0.18 — visible only as ambient warmth, never as decoration
✓ Particle field count is 8000 desktop / 6000 mobile — never higher
✓ Particle field DOES NOT shape-shift across scroll (no bar chart / funnel transitions — those are retired)
✓ Particle field is absent on /lab and /work/[slug] routes
✓ The hero sculpture's color shifts from alabaster (top of hero) to brass (deeper) — verify by scrolling and observing

Performance:
✓ Total / JS gzipped ≤ 400KB
✓ Hero scene chunk (separate from main) ≤ 200KB
✓ HDRI ≤ 300KB after KTX2
✓ Lighthouse on / ≥ 95 desktop, ≥ 85 mobile
✓ LCP < 2s, INP < 200ms, CLS < 0.05
✓ When the hero is off-screen, the canvas frameloop stops ticking (verify via Chrome DevTools Performance tab — RAF should idle)
✓ Mobile (Chrome DevTools 4× CPU throttle, Slow 3G): page renders, sculpture loads after hydration, no jank during scroll

Reduced-motion:
✓ Setting prefers-reduced-motion: reduce in DevTools and reloading: hero shows static fallback IMG, no canvas mounted
✓ Particle field replaced by a static noise gradient
✓ The static fallback image is a real, considered image — not a gray rectangle

Forbidden patterns absent:
✓ No iridescence on the sculpture
✓ No glass / transmission > 0.15
✓ Never more than one canvas
✓ No 3D code in the synchronous initial bundle (verify via Network tab: hero scene loads after document parse)
✓ No fog / atmospheric haze that reduces text contrast around the sculpture

Code:
✓ Every Three component uses Svelte 5 runes
✓ TypeScript strict, no `any`
✓ Materials and geometries are disposed on unmount
✓ Every 3D component has a JSDoc header

Accessibility:
✓ Skip-link before the canvas works
✓ Visually hidden description of the sculpture is present and meaningful
✓ Reduced-motion fallback has alt text
✓ Canvas does not steal keyboard focus
✓ axe-core: 0 violations on /

THE OPULENCE CHECK:
✓ The sculpture feels CRAFTED, not generated. Material reads as substance.
✓ Visual noise on /: ≤ 2 / 10 (the sculpture should feel inevitable, not added)
✓ Warmth: ≥ 8 / 10 (the warm HDRI must come through; if the page feels cooler than Sprint 2, the HDRI is wrong color temp)
✓ When the visitor pauses on the hero, the slow rotation rewards attention. When they scroll past, the sculpture is invisible.

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask if:
- The hello-world Threlte 8 + Svelte 5 test fails. Do NOT downgrade Svelte. Investigate Threlte version pin.
- @threlte/extras' <View> does not portal correctly. Stop — multiple canvases is the fallback but it's a substantial architecture deviation, must be approved.
- Total JS gzipped on / exceeds 400KB after Sprint 3's additions. Stop, identify the largest chunks, and propose what to drop (particles first, then HDRI procedural fallback).
- The HDRI cannot be compressed below 300KB without visible quality loss. Propose using a procedural warm environment (RoomEnvironment + manual tinting) and ask.
- The sculpture material starts looking glass-y, iridescent, or "tech." Stop — that's drift toward the retired aesthetic. Re-anchor to alabaster/brass solidity.
- Particle count exceeds 8K, or particles begin shape-shifting between sections. The new direction is RESTRAINED — stop and revert.
- Reduced-motion fallback is a gray rectangle instead of a baked screenshot. Stop and bake the real screenshot.
- Mobile FPS drops below 30 with the hero + particles active. Stop and tier down mobile quality further.
- A second <Canvas> is being introduced anywhere. Stop — the architecture is one root canvas with View portals.
- Safari iOS shows WebGL errors that aren't a 30-minute fix. Stop and ask whether to disable 3D entirely on iOS Safari (acceptable degradation — the static fallback is dignified).

═══════════════════════════════════════════════════════
RECOVERY PROMPT
═══════════════════════════════════════════════════════
"This 3D output has drifted from heritage atelier to tech-demo. Re-anchor:
§1.2 — Boris builds things of enduring value, and proves it.
§5.1 — Calm, considered, never shouting.
§5.5 — Forbidden: glassmorphism, oversaturated colors, iridescence.
§7.1 — The sculpture is SOLID — alabaster or brass, not glass. Slow rotation. Warm HDRI. Material reveals on attention.

Identify the drift: did the material become iridescent? Did transmission climb above 0.15? Did the rotation speed up? Did particle count balloon? Did a second canvas appear? Revert it. Run the Design Quality Gate. Resume."

═══════════════════════════════════════════════════════
HANDOFF NOTE TO SPRINT 4
═══════════════════════════════════════════════════════
Sprint 4 expects to inherit:
- A single root <Canvas> in +layout.svelte working in dev
- The hero sculpture rendering on / via <View>, with slow rotation, warm HDRI, no iridescence
- An ambient particle field active on /, /about, /writing — disabled on /lab and /work/[slug]
- All 3D dynamically imported (separate chunks)
- Reduced-motion fallback images baked at static/fallbacks/hero-sculpture.jpg
- Lighthouse on / ≥ 95 desktop / ≥ 85 mobile, total JS ≤ 400KB
- src/lib/three/Canvas.svelte, scenes/HeroScene.svelte, scenes/ParticleField.svelte, hooks/useInView.ts, hooks/useReducedMotion.ts, hooks/useDeviceTier.ts, env.ts all in place
- The KTX2-compressed HDRI at static/hdri/studio-warm.ktx2 with attribution README

Report at sprint end:
- Lighthouse summary for /
- Bundle treemap screenshot
- Screenshots: hero with sculpture in alabaster state, hero with sculpture in brass state, hero with reduced-motion fallback active
- Confirmation of mobile FPS and Safari iOS behavior
- Bundle sizes for the hero scene and particle field chunks
```

---

## Sprint 4 — Project Cards & /work Pages

```
You are pair-programming with Boris on a luxury portfolio site. Sprints 0-3 established foundation, content, the home page, and the hero 3D. This sprint builds the highest-density component on the site (the project card with metric chip) and the long-form case study layout. Get this right once, reused everywhere.

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
Build the polished ProjectCard with gentle 3D tilt and parallax layers. Build /work index with category filtering. Build /work/[slug] case study layout — full-bleed hero, 64ch reading column, sticky metadata, portable-text serializers (image, code via Shiki, callout, metricGrid, pullQuote, beforeAfter). All slugs prerendered.

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT
═══════════════════════════════════════════════════════
The project card is the only place where MetricChip and StackChip appear in their full visual form. On the home page (Sprint 2) we use the gallery variant WITHOUT metric chips — those are reserved for /work and /work/[slug] where they have room to breathe.

The case study reads like an essay, not a product page. Long prose. 64ch column. Generous metric displays. The long-form should feel like Apartamento or Cabana magazine — image breaks, quiet pull-quotes, hairline callouts.

POSITIONING: "Boris builds things of enduring value, and proves it."

ARCHITECTURAL COMMITMENTS:
- /work and /work/[slug] are PRERENDERED at build (config.prerender = true; entries = all slugs from Sanity)
- Particle field is DISABLED on /work/[slug] (per Sprint 3)
- All Sanity calls server-side only

STACK:
- SvelteKit 2, Svelte 5 runes, TypeScript strict
- shadcn-svelte: Tabs (for filter bar)
- @portabletext/svelte for body rendering
- Shiki (NEW — install in this sprint) for code syntax highlighting

COLOR TOKENS:
--bg              : oklch(0.18 0.005 60)
--bg-elevated     : oklch(0.22 0.005 60)
--surface-paper   : oklch(0.21 0.006 60)   /* warm linen — used in case study reading bg */
--text            : oklch(0.94 0.004 80)
--text-muted      : oklch(0.68 0.005 60)
--text-subtle     : oklch(0.52 0.004 60)
--hairline        : oklch(0.94 0.004 80 / 0.08)
--accent          : oklch(0.78 0.10 85)
--accent-deep     : oklch(0.62 0.12 78)

TYPOGRAPHY (case study specific):
- Case study H1: 64px display serif (smaller than home hero), -0.025em, line-height 1.0
- BIG METRIC: 120px display serif with mono "label / context" beneath
- Body in case study: Inter 17px / 1.65 line-height, color text (not text-muted — this is content)
- Pull-quote: 32px display serif, line-height 1.3, with a 1px gold rule on the left edge (4px from text)
- Code: JetBrains Mono 14px, line-height 1.6, colorized via Shiki dark theme
- Mono labels in metadata card: 12px uppercase 0.12em

MOTION:
- Tilt magnitude: max ±3° (down from previous ±4°)
- Spring back: 600ms cubic-bezier(0.32, 0.72, 0, 1)
- Parallax: stack chips translate-z 5px on hover, metric chip translate-z 10px

FORBIDDEN PATTERNS:
❌ No metric chip on home gallery cards (those stayed clean in Sprint 2)
❌ No tilt > 3°
❌ No "View Project →" CTA on the card itself (whole card is the link)
❌ No "Read More" buttons on case studies (visitors keep scrolling or click prev/next)
❌ No related projects beyond 3 (more = noise)
❌ No social-share buttons on /work/[slug] (defer to /writing/[slug] in Sprint 5 if needed)
❌ No floating action buttons / sticky CTAs

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
1. Sprints 0-3 merged. CI green. Home page complete with hero 3D.
2. Sanity has 6 seeded projects, 3 featured
3. /work currently renders 6 project titles in plain text (Sprint 1 stub)
4. ProjectCardGallery.svelte exists from Sprint 2 (gallery variant, no metric chip)
5. shadcn-svelte Tabs component installed (Sprint 0)
6. Sanity image pipeline (urlFor helper) available

If any are missing, stop and report.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

PART A — CORE COMPONENTS

1. METRICCHIP — src/lib/components/MetricChip.svelte
   Props (Svelte 5 $props):
   - value: string (e.g., "+15%")
   - label: string (e.g., "revenue")
   - trend: "up" | "down" | "neutral"
   - size: "sm" | "md" | "lg" (default md)

   Visual structure:
   - Inline-flex with vertical alignment baseline
   - Value in display serif:
     * sm: 24px line-height 1.0
     * md: 36px line-height 1.0
     * lg: 64px line-height 0.95
   - Trend indicator (8x8px) immediately right of value:
     * up: a small ↑ glyph in --accent
     * down: ↓ in --text-muted (NOT in red — we don't have a red token; "down" is read as "honest", not "alarming")
     * neutral: — (em dash) in --text-subtle
   - Label in mono uppercase 12px 0.12em letter-spacing, color --text-muted, on a new line beneath value (4px gap)
   - tabular-nums on value
   - Background: transparent
   - Border: 1px var(--hairline) optional via prop `bordered: boolean`
   - Padding when bordered: 12px 16px

   Use cases:
   - lg variant: Hero of /work/[slug] (the BIG metric display)
   - md variant: Outcome grid on /work/[slug]
   - sm variant: ProjectCardWithMetric on /work index (card overlay)
   - NEVER on home page

2. STACKCHIP — src/lib/components/StackChip.svelte (refine the Sprint 2 version)
   Already exists from Sprint 2. Verify and extend:
   - Props: tech (techStack reference resolved), size: "sm" | "md"
   - Optional yearsUsed shown in tooltip on hover (use shadcn Tooltip)
   - Optional icon (small SVG from techStack.icon)
   - Mono 14px, padding 4px 10px, 1px var(--hairline) border, border-radius 0.375rem

3. PROJECTCARD — src/lib/components/ProjectCard.svelte
   This is the work-page version with metric chip. Builds on the gallery variant.

   Props:
   - project: Project (typed)
   - variant: "gallery" | "compact" (compact = related-projects bottom of case study)
   - showMetric: boolean (default true; home gallery passes false — but home uses ProjectCardGallery, not this)

   Layout (gallery variant):
   - Wrapping <a href="/work/{project.slug.current}"> as the entire card
   - Outer div: position relative, will-change transform on hover (turns on at hover-start, off at hover-end)
   - Top: thumbnail (aspect 16/10):
     * <img> from urlFor(project.heroImage).width(1200).fit('crop').auto('format')
     * srcset for 1x/2x
     * loading="lazy" if not first card on /work
     * fetchpriority="high" on first card if above-the-fold
     * border-radius var(--radius)
     * 1px inset var(--hairline) border
   - Metric chip overlay (when project.metrics.length > 0 AND showMetric):
     * Position: absolute top-3 right-3 (12px each)
     * Use first metric in project.metrics
     * Pass to <MetricChip size="sm" bordered>
     * Background: var(--bg-elevated) at 90% opacity behind the chip via a wrapping div with subtle border
   - 24px below thumbnail: role + dates row, mono 12px text-muted
   - 8px below: project title, display serif 32px, line-height 1.15, tracking -0.015em, color text
   - 16px below: summary, body 17px text-muted, max 3 lines, line-clamp-3
   - 16px below: stack chips row — first 4 chips, "+N more" as a span if overflow

   Interaction (3D tilt):
   - On mouseenter, attach mousemove listener
   - Compute tilt:
     * normX = (mouse.x - rect.center.x) / rect.width  // -0.5 to 0.5
     * normY = (mouse.y - rect.center.y) / rect.height
     * rotateY = normX * 6 (max ±3° at edge × damping)
     * rotateX = -normY * 6
   - Apply via transform: perspective(1200px) rotateY(...) rotateX(...) — keep card centered with transform-origin center
   - Inner parallax:
     * Stack chips: transform: translateZ(8px)
     * Metric chip: transform: translateZ(16px)
     * Thumbnail: transform: translateZ(2px)
   - On mouseleave, transition all back to identity over 600ms cubic-bezier(0.32, 0.72, 0, 1)
   - On hover: card gains a subtle 0 0 32px oklch(0.78 0.10 85 / 0.12) gold halo via box-shadow
   - Image inside thumbnail: scale 1.02 on hover, 600ms

   Touch behavior:
   - Touch devices (pointer: coarse): no tilt. Just a scale(1.015) on tap.

   Reduced-motion:
   - No tilt. No parallax. Just opacity-fade + scale 1.015 on hover.

   Focus-visible:
   - 2px gold ring, 2px offset on the outer <a>

   Variants:
   - "compact" (related-projects bottom of case study):
     * Smaller everything — 24px title, 16/9 thumbnail aspect, no parallax, no metric chip
     * Used at the bottom of /work/[slug]

4. SCROLL-LINKED METRIC ANIMATION (subtle)
   When ProjectCard enters viewport (IntersectionObserver), animate the MetricChip's value with a number count-up over 800ms (cubic-bezier 0.22, 1, 0.36, 1) — but ONLY if the value is parseable as a number-prefixed string (e.g., "+15%" → animates 0 → 15 with the "%" stable). For non-numeric metrics ("Real-time", "Owner"), no animation, just fade in.

PART B — /WORK INDEX

5. /work LOAD — src/routes/work/+page.server.ts
   - load: getAllProjects + getAllTechStacks
   - export const prerender = true

6. /work PAGE — src/routes/work/+page.svelte

   Hero (py-[192px] desktop):
   - Eyebrow: "ALL WORK"
   - H1: "Selected projects, recent to less recent." (display serif 64px)
   - GoldRule beneath
   - Lede in body 18px text-muted, max-w-[52ch]: "The full archive. Filter by capability."

   Filter bar (sticky just below the page header on scroll):
   - Use shadcn-svelte Tabs
   - Categories: All · Frontend · Full-Stack · CRO · Data Viz
   - Mapping logic: a project belongs to "Frontend" if its stack contains React/Svelte/Vue; "Full-Stack" if it has both frontend and backend; "CRO" if it has Adobe Target/Optimizely/PostHog or has metrics with trend "up"; "Data Viz" if it has Nivo/D3/Chart.js
   - Active tab: text accent, 1px gold underline beneath
   - Inactive: text-muted, no underline
   - Filter changes the visible projects via $derived $state — no route change, no reload

   Grid:
   - 64px below filter bar
   - 3-col grid desktop (gap 32px), 2-col tablet (gap 24px), 1-col mobile (gap 24px)
   - Projects sorted by recency: order by coalesce(endDate, now()) desc
   - Render <ProjectCard variant="gallery" showMetric={true} /> for each

   Empty state (if filter matches 0):
   - Body text 18px text-muted, centered: "No projects match this filter yet."
   - Below: a quiet ghost link "Reset filter →" that resets to "All"

   Counter caption (top-right of grid header):
   - mono 12px text-muted: "{N} projects · {M} ongoing" — recompute on filter change

7. /work SEO
   - <title>Work — Boris</title>
   - <meta description>Selected projects in React, SvelteKit, and Node — full-stack engineering with measurable outcomes.</meta>
   - JSON-LD: BreadcrumbList (Home → Work)

PART C — /WORK/[SLUG] CASE STUDY

8. /work/[slug] LOAD — src/routes/work/[slug]/+page.server.ts
   - load: getProjectBySlug(params.slug)
   - If !project: throw error(404)
   - Load related: 3 most recent projects excluding current
   - export const prerender = true
   - Configure entries function: read all project slugs from Sanity at build, return as entries

9. /work/[slug] PAGE — src/routes/work/[slug]/+page.svelte

   Layout: 12-col grid

   ───── 1. Breadcrumb (full-width, py-8 top) ─────
   - "Work / [project title]" in mono 12px text-muted
   - "/" separator in text-subtle

   ───── 2. Hero (asymmetric, cols 1-12 desktop, py-[128px] top, py-[64px] bottom) ─────
   Left side (cols 1-8):
   - Eyebrow: role + dates in mono ("FRONTEND DEVELOPER · 2025 — PRESENT")
   - 32px below: H1 — project.title, display serif 64px, line-height 1.0, tracking -0.025em, max-w-[18ch]
   - GoldRule beneath
   - 24px below: subtitle / 1-line summary, body 22px text, line-height 1.4, max-w-[42ch]
   - 32px below: stack chips row (all chips, wrap)
   - 32px below: external links row (mono 12px)
     * If links has type "live": 🔗 Live site (small lucide icon Link2 instead of emoji)
     * If type "github": <GitHub icon> Source
     * If type "case-study": <FileText icon> Case study
     * If type "nda": "Under NDA" badge in text-muted with 1px hairline border
     * Each link 12px, gap 16px between

   Right side (cols 9-12):
   - The BIG METRIC display (only if project has at least one metric):
     * <MetricChip size="lg" /> with the FIRST metric
     * Vertically centered to the hero
     * If no metrics, leave the column empty (asymmetric whitespace is fine)

   ───── 3. Hero Image (full-bleed, py-0) ─────
   - cols 1-12, full grid width
   - <img> from urlFor(project.heroImage).width(2400).fit('crop').auto('format')
   - srcset for 1x/2x
   - aspect-ratio 16/9, object-cover
   - border-radius var(--radius)
   - 1px inset var(--hairline) border
   - Loading: priority high (above-the-fold)

   ───── 4. Two-column context (py-[128px] desktop, py-[64px] mobile) ─────
   Left (cols 1-7): "Context" section
   - Eyebrow: "CONTEXT"
   - Title in display serif 28px: "What we were solving."
   - Below: 2-3 paragraphs of context prose. For now, render the first portable-text block(s) of project.body up to first heading. (We'll let Boris write proper "context" intro paragraphs in Studio.)

   Right (cols 8-12): Sticky metadata card
   - Position: sticky, top-32 (128px from top to clear the page nav)
   - Background: var(--surface-paper)
   - Padding: 32px
   - 1px var(--hairline) border, --radius
   - Content:
     * "CLIENT" mono 12px text-muted → project.client (body 16px text)
     * "DURATION" → human-formatted dates (e.g., "Mar 2025 — Present")
     * "ROLE" → project.role
     * "TEAM SIZE" → if available in client field or a future field; otherwise omit
     * Each label/value pair stacked vertically with 24px between pairs

   ───── 5. Long-form body (cols 3-9, max-w-[64ch], py-[96px]) ─────
   - Render project.body via <PortableText> from @portabletext/svelte
   - Custom components map (define in src/lib/components/portable-text/):

     a) image (imageWithCaption block):
        - <img> with urlFor sized at intrinsic width
        - Below: caption in mono 12px text-muted, italic
        - Can break out of the 64ch column to full-bleed if `_breakout: true` on the block (custom field)
        - On click (hover-cursor "expand"): opens shadcn Dialog with full-resolution image

     b) code (codeBlock):
        - Pre-process at build time via Shiki (use rehype-shiki or shiki directly):
          * `bun add shiki @shikijs/rehype` (or shiki standalone if rehype not needed)
          * Use the "github-dark-default" theme, OR a custom theme tuned to match our --bg-elevated and --accent
        - Render the syntax-highlighted HTML inside a <pre> with language indicator top-right (mono 12px text-muted) and a copy button (Lucide Copy icon)
        - Background: var(--bg-elevated)
        - Padding: 24px
        - Border: 1px var(--hairline)
        - --radius
        - line-height 1.6, mono 14px

     c) callout:
        - 1px var(--hairline) left border (4px from content)
        - Padding: 16px 24px
        - Variant icon (lucide): Info / AlertTriangle / CheckCircle2 — color based on variant in --text-muted
        - Body text in body 16px text-muted

     d) metricGrid:
        - 3-col grid (2-col mobile)
        - Each metric rendered as <MetricChip size="md" />
        - gap 32px

     e) pullQuote:
        - Display serif 32px, line-height 1.3, text
        - 1px gold rule on left edge (--accent), 4px from text
        - Padding-left 32px
        - Optional attribution below in mono 12px text-muted

     f) beforeAfter:
        - 2-col grid (1-col mobile, stacked)
        - Each side has a mono label ("BEFORE" / "AFTER" — uppercase 12px text-muted) above the content (text or image)
        - 1px var(--hairline) divider between (vertical on desktop, horizontal on mobile)

   - Headings inside the body get anchor links: a small "#" in --text-subtle, opacity 0 by default, opacity 1 on heading hover

   ───── 6. Outcome section (full-width cols 1-12, py-[128px]) ─────
   - Background: var(--bg-elevated)
   - Hairlines top and bottom
   - Inside: cols 1-12
   - Eyebrow: "OUTCOMES"
   - H2: "What it earned its place doing." (display serif 56px)
   - GoldRule
   - 64px below: grid of all project.metrics as <MetricChip size="md" bordered> — 3-col desktop, 2-col mobile
   - 32px below: a 1-paragraph closing prose summary (body 17px text, max-w-[64ch])

   ───── 7. Gallery (optional, cols 1-12, py-[96px]) ─────
   - Only render if project.gallery has 3+ images
   - 3-up grid desktop, 2-up tablet, 1-up mobile
   - Each image: aspect-ratio 4/3, click-to-expand via shadcn Dialog showing full size
   - Hover: 1.02 scale, 600ms

   ───── 8. Prev/Next nav (cols 1-12, py-[96px]) ─────
   - 2-col split
   - Left: ← Previous project — display serif 24px title + role mono
   - Right: Next project → — same
   - Compute: order by endDate desc, find current index, prev/next from there
   - On hover: 1px gold underline animates
   - 1px var(--hairline) divider between

   ───── 9. Hire-me CTA (cols 4-9, centered horizontally, py-[128px]) ─────
   - Eyebrow: "WANT SIMILAR WORK?"
   - H2: "Let's discuss the next one." (display serif 40px)
   - Primary <Button>: "Begin a conversation" → /contact

   ───── 10. Related projects (cols 1-12, py-[96px]) ─────
   - Eyebrow: "RELATED WORK"
   - 32px below: 3-col grid of <ProjectCard variant="compact">

10. SEO PER /work/[slug]
    - Per-page <title>: "{project.title} — Work — Boris"
    - <meta description>: project.summary (truncated to 155 chars)
    - <link canonical>
    - Open Graph: og:type=article, og:title, og:description, og:image (use project.heroImage URL via urlFor at 1200x630)
    - Twitter card: summary_large_image
    - JSON-LD: CreativeWork schema with author (Boris from settings), datePublished, name, description, image
    - JSON-LD: BreadcrumbList (Home → Work → Title)

11. PER-SLUG OG IMAGE GENERATION (defer real implementation to Sprint 9)
    For now: just use the project's hero image directly as the OG. Sprint 9 generates a Satori-rendered branded OG.
    Document in src/routes/work/[slug]/+page.svelte a TODO referencing Sprint 9.

12. SITEMAP UPDATE
    Add to docs/seo-todos.md (created if absent): "Sprint 9: include all /work/[slug] routes in sitemap.xml". The actual sitemap generation happens Sprint 9.

13. COMMIT
    - Verify bun run check, bun run build, bun test, bunx playwright test all green
    - Verify all 6 projects build as static pages
    - Verify /work renders with filter working
    - Verify /work/toyota-lexus-funnel renders the case study layout end-to-end
    - Commit: `feat(work): ProjectCard with tilt, /work index with filtering, /work/[slug] case study layout with portable-text`

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════

ProjectCard:
✓ Tilt magnitude is exactly ±3° max (verify via DevTools transform inspection at hover edges)
✓ Spring-back duration is 600ms with cubic-bezier(0.32, 0.72, 0, 1)
✓ Inner parallax: thumbnail 2px, chips 8px, metric chip 16px translateZ
✓ Touch devices show no tilt — only scale(1.015)
✓ Reduced-motion shows no tilt — only opacity fade + scale
✓ Metric chip count-up animation only on numeric values, never on string-only metrics
✓ Card-as-link works for keyboard (Enter activates), focus-visible ring is 2px gold

/work index:
✓ Filter bar uses shadcn Tabs styled with gold underline on active
✓ Sticky filter bar respects nav height (top: 72px or whatever final nav height is)
✓ Empty state present and quiet, not loud
✓ Counter caption is mono and tabular-nums
✓ Grid is 3-col desktop with 32px gap
✓ Projects sorted recency-first, ongoing-first

Case study /work/[slug]:
✓ H1 is 64px (smaller than home hero's 84px), -0.025em, line-height 1.0
✓ BIG METRIC display is 120px display serif, vertically centered to hero on right
✓ Reading column is exactly 64ch max — verify by inspecting CSS computed style on a body paragraph
✓ Sticky metadata card stays put on scroll within its parent — no overlap with footer
✓ Hairlines between every major case-study section
✓ Hero image is full-bleed (cols 1-12), with --radius and 1px hairline border
✓ Outcome section background is var(--bg-elevated) — visibly slightly lighter than --bg
✓ Code blocks use Shiki dark theme that harmonizes with our palette (no purple-pink syntax tokens — if Shiki defaults clash, use a custom theme)
✓ Pull-quotes have a gold left rule (1px var(--accent) at 4px from text)
✓ Before/after blocks use mono BEFORE/AFTER labels uppercase 12px
✓ Anchor links on headings are subtle (#, opacity 0 default, 1 on hover)
✓ Prev/next nav is 2-col with hairline between

MetricChip:
✓ Tabular-nums on value (verify visually with consecutive metrics — digits align)
✓ Trend up uses --accent (gold ↑), down uses text-muted (no red), neutral uses text-subtle —
✓ Label is mono uppercase 12px 0.12em
✓ "lg" variant: 64px value (used in case study hero)

StackChip:
✓ Mono 14px, padding 4px 10px, 1px hairline border, slightly tighter radius (0.375rem)
✓ Tooltip on hover shows yearsUsed if present (no broken tooltip if absent)

Atmosphere:
✓ Particle field is DISABLED on /work/[slug] (verify by inspecting +layout — should not mount on this route)
✓ Background remains warm-obsidian throughout, but reading surface (case-study body) might use --surface-paper for the long-form prose section — verify warmth is consistent
✓ The film grain noise overlay is still present on these routes
✓ No glassmorphism, no backdrop-blur

Forbidden patterns absent:
✓ No "View Project →" CTA on cards (whole card is the link)
✓ No "Read More" buttons in case studies
✓ No social-share buttons on /work/[slug]
✓ No floating action buttons
✓ No related-projects beyond 3
✓ No gradient buttons, no rounded-full pills

Code:
✓ Svelte 5 runes throughout
✓ Svelte 5 actions for the tilt logic
✓ Portable text serializers all in src/lib/components/portable-text/
✓ Shiki configured with a dark theme that respects palette
✓ TypeScript strict, no `any`

Performance:
✓ Lighthouse on /work ≥ 95 desktop
✓ Lighthouse on /work/toyota-lexus-funnel ≥ 95 desktop
✓ All 6 project slugs build as static pages (verify .svelte-kit/output)
✓ Hero image LCP < 2s
✓ Image srcset prevents over-fetching on smaller viewports

Accessibility:
✓ axe-core: 0 violations on /work and /work/[slug]
✓ Each project link has a descriptive aria-label including title and metric
✓ Sticky metadata card has aria-label
✓ Heading hierarchy: one h1, h2 for sections, h3 inside body — no skips
✓ Code blocks: copy button has aria-label "Copy code"

THE OPULENCE CHECK:
✓ Visual noise on /work: ≤ 2 / 10 (a gallery rhythm, not a card jungle)
✓ Visual noise on /work/[slug]: ≤ 2 / 10 (reads like a magazine spread)
✓ Warmth on both: ≥ 8 / 10 (case study reading surface should feel even warmer than home if --surface-paper is used)
✓ The BIG METRIC on case study hero feels EARNED, not loud — its size is justified by the prose preceding/following it

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask if:
- A MetricChip appears on the home page's gallery cards. Remove and verify Sprint 2's variant is preserved.
- The card tilt magnitude exceeds ±3° at any cursor position. Reduce.
- The case-study reading column exceeds 64ch. Tighten.
- The case-study hero H1 hits 84px (matching home hero). Reduce to 64px (case study should not compete visually with home).
- Shiki produces purple/pink syntax tokens. Customize the theme.
- A related-projects strip shows 4+ cards. Truncate to 3.
- A "Read More" button appears anywhere. Remove (visitors keep scrolling).
- A social-share strip is added to /work/[slug]. Remove (defer to /writing in Sprint 5).
- Particle field appears on /work/[slug]. Disable per Sprint 3 contract.
- /work or /work/[slug] is rendered SSR instead of prerendered. Configure prerender = true and the entries function.
- A "Floating Contact" or sticky CTA bar appears. Remove.
- Any gradient creeps in. Remove.

═══════════════════════════════════════════════════════
RECOVERY PROMPT
═══════════════════════════════════════════════════════
"This work output has drifted toward generic-portfolio territory. Re-anchor:
§1.2 — Boris builds things of enduring value, and proves it.
§5.1 — The case study reads like a magazine essay, not a product page.
§5.5 — Forbidden: gradient buttons, floating CTAs, glassmorphism, backdrop-blur.
§7.4 — Card tilt is GENTLER. Max ±3°.

Identify the drift: did the metric chip surface on home? Did 'Read More' return? Did the card tilt go too aggressive? Did Shiki bring purple tokens? Did social-share buttons appear? Revert. Run the Design Quality Gate. Resume."

═══════════════════════════════════════════════════════
HANDOFF NOTE TO SPRINT 5
═══════════════════════════════════════════════════════
Sprint 5 expects to inherit:
- A working ProjectCard component (gallery + compact variants) with gentle tilt and parallax
- /work index with category filtering, sorted recency-first
- /work/[slug] with full case-study layout, all 6 slugs prerendered as static pages
- Portable text serializers for image, code (Shiki), callout, metricGrid, pullQuote, beforeAfter — all in src/lib/components/portable-text/
- Shiki configured with a dark theme harmonizing with the palette
- MetricChip and StackChip components — used on /work/[slug], /work, and /lab (Sprint 7), NOT on home
- All Lighthouse scores ≥ 95 desktop on /work and /work/[slug]

Report at sprint end:
- Screenshot of /work index with filter active
- Screenshot of /work/toyota-lexus-funnel full case study (multiple screenshots if needed)
- Lighthouse summary for both routes
- Confirmation that all 6 slugs prerender at build
- A brief design self-review of the case-study layout — does the BIG METRIC feel earned?
```

---

## Sprint 5 — About, Contact, Writing, Uses

```
You are pair-programming with Boris on a luxury portfolio site. Sprints 0-4 established foundation, content, home page, hero 3D, and /work. This sprint completes the supporting pages: /about (the deeper bio), /contact (the conversion point), /writing (future-proof), /uses (a quiet list).

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
Build /about with timeline and language proficiency. Build /contact with Superforms+Zod+Resend, frictionless 5-field form, asymmetric layout. Build /writing index + slug template ready for future posts. Build /uses as a quiet list of tools.

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT
═══════════════════════════════════════════════════════
/about is where the duality narrative is laid out at length. Visitors here are seriously considering reaching out — treat with care, no fluff.

/contact is the conversion point. The form must be FRICTIONLESS: 5 fields max, inline validation, clear success state, multiple alternative channels visible WITHOUT scrolling.

/writing is empty for v1 launch. The page must work cleanly with 0 posts (empty state) and gracefully scale when posts are added.

/uses is the dev-community tradition — a list of tools the developer reaches for. Keep it quietly authoritative.

POSITIONING: "Boris builds things of enduring value, and proves it."

ARCHITECTURAL COMMITMENTS:
- /about, /writing, /writing/[slug], /uses are PRERENDERED at build
- /contact is SSR (form action handles POST)
- Particle field stays active on /about, /writing, /uses (per Sprint 3); off on /contact during form interaction (subtle — fades out when form is focused)
- Email delivery via Resend
- Honeypot + simple in-memory rate limiting (3 submissions per IP per hour)

STACK:
- SvelteKit 2, Svelte 5 runes
- Superforms + Zod (already installed Sprint 0)
- Resend (NEW — install in this sprint)
- shadcn-svelte: Form, Input, Textarea, Label, Select, Toast (for success feedback)
- @portabletext/svelte for /writing/[slug] body

COLOR TOKENS in use:
--bg              : oklch(0.18 0.005 60)
--bg-elevated     : oklch(0.22 0.005 60)
--surface-paper   : oklch(0.21 0.006 60)
--text            : oklch(0.94 0.004 80)
--text-muted      : oklch(0.68 0.005 60)
--text-subtle     : oklch(0.52 0.004 60)
--hairline        : oklch(0.94 0.004 80 / 0.08)
--accent          : oklch(0.78 0.10 85)
--accent-deep     : oklch(0.62 0.12 78)

TYPOGRAPHY:
- /about hero H1: 72px display serif (slightly smaller than home — about is identity-forward but quieter)
- /contact hero H1: 56px (very calm — the form is the focus)
- /writing index hero H1: 64px
- /writing/[slug] H1: 56px (essay-like)
- Reading column on /writing/[slug]: 64ch
- All other typography per established system

FORBIDDEN PATTERNS:
❌ Multi-step contact forms
❌ More than 5 fields on /contact (+1 honeypot is fine)
❌ "Live chat" widgets
❌ "I'll get back to you within 24 hours!" exclamation marks
❌ Carousel of testimonials anywhere
❌ Newsletter sign-up on /writing (defer to v2 if at all)
❌ "Reading time: 5 min ☕" with cute coffee emoji
❌ Avatar circles on /about (use the timeline approach instead)
❌ Gradient buttons, glassmorphism, all the usual

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
1. Sprints 0-4 merged. CI green.
2. Sanity has settings singleton with availabilityNote, contactEmail, socialLinks, resumeFile (file may be a placeholder for now)
3. Resend account ready (will configure RESEND_API_KEY in this sprint)
4. shadcn-svelte Form, Toast components installed (Sprint 0)
5. Superforms + Zod installed (Sprint 0)
6. /work and /work/[slug] working

If any are missing, stop and report.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

PART A — /ABOUT

1. /about LOAD — src/routes/about/+page.server.ts
   - Load: getSettings, getAllTechStacks
   - export const prerender = true

2. /about PAGE — src/routes/about/+page.svelte

   ───── Hero (asymmetric, py-[192px]) ─────
   Left (cols 1-7):
   - Eyebrow: "ABOUT"
   - H1: "Boris. A practice in considered software." (display serif 72px, -0.025em, 0.95)
   - GoldRule
   - 32px below: subtitle in body 22px text, max-w-[42ch]: "Full-stack developer and CRO specialist. Skopje. Three years shipping production code that earns its place."
   Right (cols 8-12):
   - "Identity card" — a quietly styled mono block with vertical rhythm 16px between each line:
     * "BASED IN" → "Skopje, North Macedonia"
     * "EDUCATION" → "UKIM, BSc Computer Science, 2025"
     * "CURRENT" → "Valtech (Lead Frontend) · Hitachi (Frontend)"
     * "LANGUAGES" → "Macedonian / English / Bulgarian / Serbian / German (learning)"
     * "AVAILABILITY" → uses settings.availabilityNote
   - Each label in mono 12px text-muted, value in body 14px text
   - Border: 1px var(--hairline), padding 32px, border-radius var(--radius), background transparent

   ───── Practice prose (cols 3-9, max-w-[64ch], py-[96px]) ─────
   - Use the §4.2 prose verbatim (already on home — but here we add 2-3 more paragraphs that go deeper):
     * Para 1 (same as home): "I write production software for a living, and I run experiments on it for the same reason a craftsman sharpens his tools..."
     * Para 2 (same as home): "Most engineering ends at deployment..."
     * Para 3 (NEW): "I started in CRO. Adobe Target. Optimizely. The kind of work where you write a JS injection on a Tuesday and on Friday someone tells you the conversion rate moved 0.6%. That feedback loop teaches you to think about software as something with measurable outcomes — and once you've thought about software that way, you can't think about it any other way."
     * Para 4 (NEW): "These days the work is more often React or SvelteKit, sometimes Node or Go on the backend. The instrumentation is PostHog instead of Adobe. The fundamentals didn't change. Build the thing well. Measure it. Improve it. Don't ship and forget."
     * Para 5 (same as home, slightly extended): "What you'll find here is the visible part of that practice — the work that shipped, the writing that explains it, and the laboratory where the methodology is on display. The rest is between me and the codebases. If you're considering working together, the contact page is one click."

   ───── Timeline (full-width, py-[128px]) ─────
   - Eyebrow: "EXPERIENCE · 2023 — PRESENT"
   - H2: "What I've been doing." (display serif 40px)
   - GoldRule
   - 64px below: vertical timeline list. Each entry is 12-col grid:
     * Cols 1-2: Date range in mono uppercase 12px text-muted (sticky-feeling — visually anchored left)
     * Cols 3-9: Company + role in display serif 28px, line-height 1.2, tracking -0.015em
       Followed by stack chips row (mono small)
       Followed by 1-paragraph description in body 17px text-muted, max-w-[60ch]
     * Cols 10-12: empty (asymmetry)
   - Hairline 1px var(--hairline) divider between entries
   - Entries (most recent first):
     * 2025 — present · Valtech, Lead Frontend Developer (description from §4.3 Valtech)
     * 2025 — present · Hitachi M&B, Frontend Developer (description)
     * 2024 — 2025 · Quizzle, Full-Stack Developer (description)
     * 2024 · DS Smith, Developer / CRO (description)
     * 2024 · Toyota & Lexus, Developer / CRO (description)
     * 2023 — 2024 · We Talk Data & AI, Developer (description)

   ───── Skills compendium (full-width, py-[96px]) ─────
   - Reuse the CraftSection layout from home (Sprint 2): 6 categories, typographic list with separators
   - Pull from getAllTechStacks
   - Optional addition here: tooltip on hover shows yearsUsed (the home skipped this for visual restraint; about can show)

   ───── Languages (full-width, py-[96px]) ─────
   - Eyebrow: "LANGUAGES"
   - H2: "Five spoken, one currently learning."
   - 64px below: horizontal list, each language entry:
     * Language name in display serif 24px
     * 4 small horizontal bars (8px tall, 32px wide each) with proficiency level filled — bars filled in --accent at low opacity (60%) for native, --text at 80% for advanced, --text-muted for beginner
     * Mono caption 12px text-subtle: "native" / "native level" / "advanced" / "beginner"
   - Entries: Macedonian (4 bars / native), English (4 bars / native level), Bulgarian (3 bars / advanced), Serbian (3 bars / advanced), German (1 bar / beginner)
   - NO emoji flags. NO colored bars by language. Calm.

   ───── Education (cols 4-9, py-[64px]) ─────
   - Eyebrow: "EDUCATION"
   - Single entry: "Ss. Cyril and Methodius University in Skopje (UKIM)" in display serif 24px
   - "Bachelor's Degree, Computer Science · 2025" in body 16px text-muted

   ───── Elsewhere (full-width, py-[96px]) ─────
   - Eyebrow: "ELSEWHERE"
   - H2: "Where else to find me." (display serif 32px)
   - 32px below: 3-col grid (1-col mobile)
   - Each tile: platform name in mono 12px text-muted on top, link in display serif 24px below, hover shows the URL in body 14px text-subtle
   - Pulls from settings.socialLinks

   ───── Resume CTA (cols 4-9, py-[96px]) ─────
   - Centered horizontally in container
   - "Download résumé (PDF)" — secondary <Button> with a small Download icon (lucide)
   - Below in mono 12px text-subtle: "Updated [last updated date from Sanity asset metadata, if exposed; otherwise omit]"
   - Click → fires track('resume_downloaded') (stub if Sprint 6 hasn't yet wired track — leave a TODO)

3. /about SEO
   - <title>About — Boris</title>
   - <meta description>Full-stack developer and CRO specialist based in Skopje. Three years of production code at Toyota, Hitachi, Valtech, and others.</meta>
   - JSON-LD: ProfilePage / Person extended with knowsAbout (skills), alumniOf, workLocation
   - Open Graph + Twitter card

PART B — /CONTACT

4. ZOD SCHEMA — src/lib/schemas/contact.ts
```

import { z } from 'zod';
export const contactSchema = z.object({
name: z.string().min(2, 'Please share your name'),
email: z.string().email('Please share a valid email'),
company: z.string().max(120).optional(),
bringsYouHere: z.enum(['hiring', 'client', 'collaboration', 'hi'], {
required_error: 'Please pick one'
}),
message: z.string().min(20, 'Tell me a bit more').max(2000, 'A bit too much'),
// honeypot: must be empty
website: z.string().max(0).optional()
});
export type ContactSchema = z.infer<typeof contactSchema>;

```

5. /contact LOAD + ACTION — src/routes/contact/+page.server.ts
```

import { superValidate, message, fail } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema } from '$lib/schemas/contact';
   import { Resend } from 'resend';
   import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

// simple in-memory rate limit
const submissions = new Map<string, number[]>();
const LIMIT = 3, WINDOW_MS = 60 _ 60 _ 1000;
function rateLimited(ip: string): boolean { ... }

export const load = async () => {
const form = await superValidate(zod(contactSchema));
return { form };
};

export const actions = {
default: async ({ request, getClientAddress }) => {
const form = await superValidate(request, zod(contactSchema));
if (!form.valid) return fail(400, { form });
if (form.data.website) return message(form, 'Submitted'); // honeypot — silently accept
const ip = getClientAddress();
if (rateLimited(ip)) return fail(429, { form, message: 'Too many recent submissions. Please email directly.' });

       try {
         await resend.emails.send({
           from: 'Boris Portfolio <noreply@[domain]>',
           to: ['[boris-email-from-sanity-or-env]'],
           reply_to: form.data.email,
           subject: `Portfolio inquiry — ${form.data.name} (${form.data.bringsYouHere})`,
           text: `Name: ${form.data.name}\nEmail: ${form.data.email}\nCompany: ${form.data.company || '—'}\nBrings them: ${form.data.bringsYouHere}\n\n${form.data.message}`
         });
         return message(form, 'Sent. Reply within 24h on weekdays.');
       } catch (e) {
         return fail(500, { form, message: 'Could not send. Please email directly.' });
       }
     }

};

```

6. /contact PAGE — src/routes/contact/+page.svelte

Asymmetric layout:

───── Hero (cols 1-12, py-[128px] top, py-[64px] bottom) ─────
Cols 1-7:
- Eyebrow: "CONTACT"
- H1: "Let's discuss the work." (display serif 56px, -0.025em, 0.95)
- GoldRule
- 32px below: subtitle, body 18px text-muted, max-w-[52ch]:
  "I take on a small number of engagements each quarter. Tell me what you're building."

───── Form + alternatives (cols 1-12, py-[64px]) ─────
Cols 1-7 (form):
- Use Superforms with the schema and shadcn-svelte Form components
- Fields, in order, with vertical rhythm 32px between:
  * "Name" Input
  * "Email" Input
  * "Company (optional)" Input
  * "What brings you here?" Select with 4 options:
    - "Hiring for a role"
    - "Client work / engagement"
    - "Collaboration / open-source"
    - "Saying hi"
  * "Message" Textarea (auto-grow on input via $effect listening to input event, min-height 120px)
  * Hidden Input name="website" (honeypot — visually hidden via tailwind sr-only + tabindex=-1 + aria-hidden)
- Each field has Label + Input/Textarea/Select + helper-text/error message
- Inline validation: errors appear below the field in body 14px in --text-muted (we don't have a red token; "errors" are read as friction-corrections, not alarms — they appear with a small left ">" mark in --accent)
- Submit button: primary <Button> "Send message →", full-width on mobile, auto on desktop
- On form submitting: button shows a subtle 1px gold pulse animation + label changes to "Sending..."

Cols 8-12 (alternatives — sticky on desktop):
- "OR REACH ME DIRECTLY" mono uppercase 12px text-muted
- 24px below: list, each item with mono label + value:
  * Email with a small Copy icon (Lucide). Clicking copies via Clipboard API + shows a 2-second toast "Copied" via shadcn Toast.
  * GitHub link
  * LinkedIn link
  * "Book 20-min intro call" link → opens Calendly inline (lazy-loaded iframe, below-the-fold to avoid loading on initial render — use intersection observer to mount when scrolled near)
- 32px below: small mono caption text-subtle: "Response time: usually same day, weekdays."

Success state (replace form on $page.form?.message containing "Sent"):
- Replace form with a centered block:
  * Display serif 32px "Sent."
  * Body 17px text-muted: "I'll reply within 24 hours on weekdays. — B."
  * 32px below: ghost link "Send another →" (resets form)

Error state (general):
- Toast at top: "Something went wrong. Try emailing directly: [email]"
- Form preserves all field values

Particle field fade:
- Add a $state focusedForm boolean
- When any form field gains focus, dispatch an event to a writable store $formActive
- In +layout.svelte, when $formActive is true on /contact, fade the particle field opacity to 0 over 480ms (and back to 0.18 when blurred)
- This is a subtle gesture: the work of writing a message gets a moment of cleared atmosphere

7. /contact SEO
- <title>Contact — Boris</title>
- <meta description>Reach out about a project, an engagement, or just to talk.</meta>
- NO JSON-LD (contact pages don't need it)
- Open Graph

PART C — /WRITING

8. /writing INDEX LOAD — src/routes/writing/+page.server.ts
- Load: getAllPosts
- export const prerender = true

9. /writing INDEX PAGE — src/routes/writing/+page.svelte

Hero (py-[128px]):
- Eyebrow: "WRITING"
- H1: "Notes on building and optimizing." (display serif 64px)
- GoldRule
- Sub: "Occasional essays. Mostly about the boring parts."

Empty state (when posts.length === 0):
- 64px below sub: a quietly styled block in cols 4-9
- Body 18px text-muted: "No notes yet. In the meantime —"
- Below: ghost link "see the work →" → /work
- Hairline below

Populated state (posts.length > 0):
- 64px below sub: list (NOT a grid — essays read as a list)
- Each post entry, full-width cols 1-12, padding-y-12 (48px):
  * Cols 1-2: published date in mono 12px text-muted (e.g., "OCT 2026")
  * Cols 3-9: Title in display serif 32px line-height 1.2, then excerpt body 17px text-muted on a new line, then tags row in mono 12px text-subtle
  * Cols 10-12: read time mono 12px text-subtle right-aligned (e.g., "5 MIN")
- Hairline divider between entries
- Click anywhere on the row → /writing/[slug]
- Hover state: 1px gold left-rule appears 4px from text (translate-x animated in 280ms)

10. /writing/[slug] LOAD — src/routes/writing/[slug]/+page.server.ts
 - Load: getPostBySlug(params.slug)
 - 404 if not found
 - Load related: 3 most recent posts excluding current
 - export const prerender = true with entries function

11. /writing/[slug] PAGE — src/routes/writing/[slug]/+page.svelte

 Reading progress indicator:
 - Position: fixed top-0 left-0 right-0
 - Height: 2px (HAIRLINE — not a chunky bar)
 - Background: var(--accent)
 - Width: $derived from scrollY / (documentHeight - viewportHeight)
 - Use a $effect with a scroll listener (passive)

 Hero (cols 3-9, py-[128px], reading width):
 - Eyebrow: tag(s) in mono uppercase 12px text-muted, comma-separated
 - H1: post.title (display serif 56px, -0.025em, 1.0)
 - GoldRule
 - Meta row in mono 12px text-muted: published date · readTime min
 - Cover image (if present) full-bleed cols 1-12, with caption below in mono italic 12px

 Body (cols 3-9, max-w-[64ch], py-[96px]):
 - Render post.body via PortableText with the same custom serializers from Sprint 4 (image, code, callout, metricGrid, pullQuote, beforeAfter)

 Table of contents (sticky on desktop, cols 1-2):
 - Auto-generated from H2/H3 in body
 - Each item: mono 12px text-muted, hover text, current section gets a 1px gold left-rule
 - Smooth-scroll on click (Lenis handles)
 - Hidden on mobile

 Share row at bottom (cols 3-9, py-[64px]):
 - "Share — " in mono 12px text-muted
 - Buttons: "Copy link" (Clipboard API + toast), "Share on X" (opens twitter intent URL), "Share on LinkedIn" (LinkedIn share URL)
 - Each button: ghost style, gold underline on hover
 - NO Facebook. NO Reddit.

 Related posts (cols 1-12, py-[96px]):
 - Eyebrow: "RELATED NOTES"
 - 3-col grid of compact post cards: each shows mono date, title display serif 24px, excerpt 14px text-muted

12. /writing RSS FEED — src/routes/writing/rss.xml/+server.ts
 - Generate at build (export const prerender = true on the +server.ts)
 - Standard RSS 2.0
 - Pulls from getAllPosts
 - Documented in robots.txt as /writing/rss.xml

PART D — /USES

13. /uses LOAD — src/routes/uses/+page.server.ts
 - Mostly static content, but consider loading from Sanity later — for now hardcode in the .svelte file
 - export const prerender = true

14. /uses PAGE — src/routes/uses/+page.svelte
 - Hero: eyebrow "USES", H1 "What I reach for, day to day." (display serif 48px), GoldRule, sub "Hardware, editor, terminal, services. Updated when something changes."
 - Body (cols 3-9, max-w-[64ch]):
   Sections, each with mono uppercase eyebrow + body content:
   * "EDITOR & TERMINAL" — VS Code with [extensions], iTerm2 / Ghostty, fish shell
   * "HARDWARE" — laptop model, external monitor, keyboard, mouse, headphones
   * "SERVICES I USE" — Vercel, Sanity, PostHog, Sentry, Resend, Linear, GitHub, Cloudflare
   * "TOOLS I REACH FOR" — pnpm, Bun (occasionally), tldraw, Figma, Lenis (this very site), Threlte
   * "AI" — Claude (specifically Claude Code for shipping), occasional ChatGPT for image gen
   * "BOOKS RECENTLY" — 2-3 book titles in italic
 - Each section separated by hairline
 - Body in body 17px text, with brief 1-2 sentence explanation per item
 - This page is INTENTIONALLY UNDESIGNED — it's a list. The aesthetic comes from typography and rhythm, not layout flourish.

15. /uses SEO basic meta only

16. NAV LINK CHECK
 Verify the Nav component (Sprint 2) renders Lab in nav. Lab is now visible — though the page is a stub until Sprint 7 (just "/lab" placeholder route). That's fine for now.

17. COMMIT
 Verify bun run check, bun run build, bun test all green
 Verify a real test email sends successfully via Resend (use a test address in the .env, send to that address).
 Commit: `feat(supporting): /about, /contact (Resend wired), /writing index+slug (empty state), /uses`

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════

/about:
✓ H1 is 72px (not 84px home, not 56px contact — about is medium-loud)
✓ Identity card on right is mono-labeled, structured, NOT a styled card with gradient/shadow
✓ Timeline entries use the 12-col layout with sticky-feeling date column on left
✓ Hairline dividers between timeline entries
✓ Skills compendium reuses the typographic-list pattern from home
✓ Language proficiency bars are TONAL (—accent low-opacity for native, text muted for advanced) — never colored by language
✓ NO avatar circles for Boris
✓ Resume download button is secondary style, not loud

/contact:
✓ Form has exactly 5 fields + 1 honeypot. No more.
✓ H1 is 56px — calm, not loud
✓ Asymmetric layout: form left (cols 1-7), alternatives right (cols 8-12)
✓ Submit button is primary style with subtle gold pulse on submitting
✓ Success state replaces the form completely (not a banner above it)
✓ Particle field fades to 0 when any form field is focused — verify by clicking a field and observing
✓ Honeypot field is invisible to users but accepts a "website" value
✓ Real test email sends successfully via Resend (verify by inspecting received message)
✓ NO multi-step form. NO live chat. NO carousel.
✓ Calendly embed is lazy-loaded (verify by inspecting Network tab)

/writing:
✓ Empty state is confident: "No notes yet. — see the work →" — not apologetic
✓ List layout (when populated), not card grid
✓ Hairline dividers between entries
✓ Hover state: gold left-rule animates in
✓ Reading progress bar is 2px (hairline), gold, fixed top
✓ TOC on desktop only, hidden mobile
✓ Share row: only Copy link / X / LinkedIn — no Facebook, no Reddit
✓ NO "Reading time: 5 min ☕" — just "5 MIN" in mono
✓ NO newsletter signup

/uses:
✓ Single column reading layout
✓ Mono section eyebrows
✓ Hairline between sections
✓ Body 17px prose with brief explanations — readable, not list-of-items-with-no-context

Voice:
✓ /about prose extension (paragraphs 3-5) reads in the composed voice — verify against §1.4 brand voice
✓ /contact subheadline is calm, not "Ready to take your business to the next level?"
✓ /writing empty state is confident: "No notes yet."
✓ /uses descriptions are 1-2 sentences max each — no fluff

Atmosphere:
✓ Particle field active on /about, /writing, /uses (per Sprint 3 contract)
✓ Particle field fades on /contact form focus
✓ Background warm-obsidian throughout
✓ No gradients, no glassmorphism

Forbidden patterns absent:
✓ No multi-step form
✓ No "Live chat" widget
✓ No newsletter signup
✓ No avatar circles
✓ No emoji as design (single emoji in microcopy is fine if needed)
✓ No carousel
✓ No "I'll reply within 24h!" with exclamation

Code:
✓ Superforms wired correctly with Zod adapter
✓ Resend integration works (test email received)
✓ Rate limiting works (4th submission in an hour returns 429)
✓ Honeypot trap works (silent accept on filled honeypot)
✓ Svelte 5 runes throughout
✓ TypeScript strict, no `any`

Performance:
✓ Lighthouse on /about ≥ 95 desktop
✓ Lighthouse on /contact ≥ 95 desktop (form action is fast)
✓ Lighthouse on /writing ≥ 95 desktop (empty state)
✓ Lighthouse on /uses ≥ 95 desktop
✓ Calendly iframe lazy-loaded — verify Network tab

Accessibility:
✓ axe-core: 0 violations on all four routes
✓ Form fields have proper Label associations
✓ Validation errors are announced via aria-live (Superforms handles this)
✓ Honeypot field has aria-hidden=true and tabindex=-1
✓ Success state announces via aria-live polite

THE OPULENCE CHECK:
✓ /about visual noise ≤ 2 / 10 (a long read, not a feature-card jungle)
✓ /contact visual noise ≤ 1 / 10 (calm — the form is the only visible UI)
✓ /writing empty state ≤ 1 / 10 (very quiet — almost no UI)
✓ /uses ≤ 1 / 10 (just text)
✓ Warmth on all four ≥ 8 / 10

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask if:
- The contact form has more than 5 fields (excluding honeypot). Trim.
- A multi-step form is being designed. Don't.
- Live chat or chatbot UI appears. Remove.
- /writing index uses card grid instead of list. Convert to list.
- /writing empty state apologizes ("Sorry, no posts yet!"). Rewrite confidently.
- /about adds an avatar circle. Remove.
- A newsletter signup appears anywhere. Remove.
- Resend test email fails to deliver. Investigate (likely DNS / SPF if domain used; for now use Resend's testing domain).
- Particle field stays at full opacity on /contact form focus. Verify the fade trigger.
- The reading progress bar exceeds 2px. Reduce.
- Form validation messages use red color (we don't have a red token). Use --text-muted or --accent instead.
- Calendly iframe loads on initial render. Lazy-load it.
- /uses descriptions get longer than 2 sentences each. Trim.

═══════════════════════════════════════════════════════
RECOVERY PROMPT
═══════════════════════════════════════════════════════
"This output has drifted toward generic-developer-blog or template-portfolio. Re-anchor:
§1.2 — Boris builds things of enduring value, and proves it.
§5.1 — Calm. Considered. Never shouting.
§5.5 — No gradient buttons, no glassmorphism, no emoji as design.
§1.4 — Composed voice, not performative. No exclamation marks. No 'Ready to...'.

Identify the drift: did /contact get a multi-step UI? Did /writing turn into a card grid? Did emoji creep into reading-time labels? Did the /about timeline get avatar circles? Revert. Run the Design Quality Gate. Resume."

═══════════════════════════════════════════════════════
HANDOFF NOTE TO SPRINT 6
═══════════════════════════════════════════════════════
Sprint 6 expects to inherit:
- Working /about, /contact, /writing, /uses pages
- /contact form with Superforms + Zod + Resend, sending real email
- Rate limiting and honeypot in place
- /writing index + slug template ready (empty state)
- RSS feed at /writing/rss.xml generated at build
- Particle field fade on /contact form focus working
- Sanity types still aligned

Report at sprint end:
- Screenshots: /about, /contact (with validation error state), /writing (empty), /uses
- Test email delivery confirmation (header snippet)
- Rate-limit test result (4th submission returns 429)
- Honeypot test result (filled honeypot returns silent success)
- Lighthouse scores for all four routes
```

---

# Boris Portfolio — Claude Code Sprint Prompt Suite (Sprints 6-9)

_Continuation. Use alongside the Sprints 0-5 document._

---

## Sprint 6 — Analytics & Tracking

````
You are pair-programming with Boris on a luxury portfolio site. Sprints 0-5 built foundation, content, home, hero 3D, /work, and the supporting pages. This sprint wires analytics — typed event dispatcher, consent banner, PostHog, Sentry, Web Vitals — without compromising the calm atmosphere.

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
Wire PostHog (EU cloud) + Sentry, build a typed track() helper with discriminated-union event names, install a small dismissible consent banner (no full-screen modal), pipe Web Vitals to PostHog, prepare PostHog feature flag client for Sprint 7's /lab — all without polluting the visual atmosphere.

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT
═══════════════════════════════════════════════════════
Analytics is INFRASTRUCTURE. It must be invisible when working. The consent banner is the ONLY visible analytics surface, and it must not feel like an interruption.

POSITIONING: "Boris builds things of enduring value, and proves it."

ARCHITECTURAL COMMITMENTS:
- PostHog EU cloud (eu.i.posthog.com) for data residency
- Server-side flag evaluation via posthog-node (used Sprint 7 for /lab)
- Client-side event capture via posthog-js
- Consent-required: NO tracking fires until consent
- Event types are a TypeScript discriminated union — typed track() helper enforces correctness
- Sentry on both client and server with sourcemap upload
- Web Vitals (LCP, INP, CLS) piped to PostHog as events

STACK:
- posthog-js (already installed Sprint 0)
- posthog-node (already installed Sprint 0)
- @sentry/sveltekit (already installed Sprint 0)
- web-vitals (NEW — install in this sprint)

COLOR TOKENS (for the consent banner only):
--bg-elevated     : oklch(0.22 0.005 60)
--text            : oklch(0.94 0.004 80)
--text-muted      : oklch(0.68 0.005 60)
--hairline        : oklch(0.94 0.004 80 / 0.08)
--accent-deep     : oklch(0.62 0.12 78)

CONSENT BANNER UX:
- NOT a full-width sticky bar (too nagging)
- NOT a full-screen modal (too aggressive)
- A small dismissible card anchored bottom-right (24px from edges desktop, full-width minus 24px mobile)
- Maximum 360px wide desktop
- 2 buttons: "Accept" (primary --accent-deep), "Decline" (ghost)
- Copy: "I use PostHog (EU-hosted) to understand what's useful. No ads, no third parties. Okay?"
- Animation in: opacity + translateY(16px → 0) over 480ms cubic-bezier(0.22, 1, 0.36, 1) — appears 1200ms after first paint (so it doesn't compete with hero)
- Animation out: same in reverse, 320ms
- Once decided (accept or decline): the small "Analytics: on/off" indicator lives in the footer (Sprint 5 footer) — clicking it reopens the banner

EVENT TAXONOMY (§12.1) — paste verbatim into events.ts:

type AppEvent =
  | { name: 'page_view'; props: { path: string } }
  | { name: 'nav_clicked'; props: { to: string } }
  | { name: 'hero_cta_clicked'; props: { label: string } }
  | { name: 'project_card_viewed'; props: { slug: string } }
  | { name: 'project_card_opened'; props: { slug: string } }
  | { name: 'lab_visited'; props: { from: string } }
  | { name: 'experiment_vote_cast'; props: { experiment_id: string; variant: string } }
  | { name: 'experiment_card_expanded'; props: { experiment_id: string } }
  | { name: 'contact_cta_clicked'; props: { location: string } }
  | { name: 'contact_form_submitted'; props: { source: string } }
  | { name: 'email_copied'; props: Record<string, never> }
  | { name: 'resume_downloaded'; props: Record<string, never> }
  | { name: 'three_scene_visible'; props: { scene_id: string } }
  | { name: 'three_scene_interacted'; props: { scene_id: string; kind: string } }
  | { name: 'web_vital_lcp'; props: { value: number; rating: string } }
  | { name: 'web_vital_inp'; props: { value: number; rating: string } }
  | { name: 'web_vital_cls'; props: { value: number; rating: string } };

The `lab_visited` event is the key funnel signal — tells you which home-page surface drove the visitor toward /lab.

FORBIDDEN PATTERNS:
❌ Full-screen consent modals
❌ "We value your privacy 🍪" banners with cookie emoji
❌ Tracking that fires before consent
❌ Untyped tracking calls (track('whatever_string', { random: 'props' }))
❌ Any third-party script other than PostHog and Sentry
❌ Auto-recording of sessions in v1
❌ Heatmap / DOM mutation tracking (v1 = events only)

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
1. Sprints 0-5 merged. CI green.
2. /contact form working (Sprint 5)
3. Hero scene mounted (Sprint 3) with click handler stub
4. Project cards present on / and /work with handler stubs
5. .env.example lists PUBLIC_POSTHOG_KEY, POSTHOG_PERSONAL_API_KEY, PUBLIC_SENTRY_DSN, SENTRY_AUTH_TOKEN
6. PostHog EU project created in dashboard, project key copied
7. Sentry SvelteKit project created, DSN copied

If any are missing — especially the manual PostHog and Sentry project creation — stop and report.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

PART A — POSTHOG SETUP

1. ENVIRONMENT VARIABLES
   - Confirm in .env (locally): PUBLIC_POSTHOG_KEY, POSTHOG_PERSONAL_API_KEY
   - Confirm .env.example documents both with placeholder values
   - PUBLIC_POSTHOG_KEY is the project API key (safe in client bundle)
   - POSTHOG_PERSONAL_API_KEY is server-only (used Sprint 7 for /lab experiment results API)

2. POSTHOG CLIENT — src/lib/analytics/posthog.ts
   - Export `initPostHog()`: initializes posthog-js with:
     * api_host: 'https://eu.i.posthog.com'
     * capture_pageview: false (we capture manually for SPA nav)
     * autocapture: false (explicit only — never auto-capture clicks)
     * persistence: 'localStorage+cookie'
     * respect_dnt: true
     * opt_out_capturing_by_default: true (blocks all events until grantConsent)
     * disable_session_recording: true (defer to v2)
     * loaded callback sets a module-scoped `initialized` flag
   - Export `grantConsent()`: calls posthog.opt_in_capturing(), sets a `consented` $state-backed store true, persists to localStorage as 'ph-consent' = 'accepted'
   - Export `revokeConsent()`: calls posthog.opt_out_capturing(), sets store false, persists 'ph-consent' = 'declined'
   - Export `getConsentState(): 'accepted' | 'declined' | 'pending'` — reads localStorage on call
   - Export the `consented` store as readonly
   - Server-safe: every browser-only function checks `if (!browser) return`

3. POSTHOG SERVER CLIENT — src/lib/analytics/posthog-server.ts
   - Server-only — guard with `import { browser } from '$app/environment'; if (browser) throw new Error('posthog-server must not run in browser')` at top of file
   - Imports POSTHOG_PERSONAL_API_KEY and PUBLIC_POSTHOG_KEY from $env/static
   - Exports `getPostHogServer()`: lazy-initializes a posthog-node client with EU host
   - Exports `getServerFlag(flagKey: string, distinctId: string): Promise<boolean | string>` — used Sprint 7 for /lab. Wraps posthog-node's getFeatureFlag with error handling (returns false on failure rather than throwing).
   - Exports `shutdownPostHog()`: graceful shutdown for hooks.server.ts cleanup

PART B — TYPED TRACK() HELPER

4. EVENT TYPES — src/lib/analytics/events.ts
   - Paste the AppEvent discriminated union from EMBEDDED CONTEXT verbatim
   - Export a helper type: `type EventName<E extends AppEvent> = E['name']`
   - Export `type EventProps<N extends AppEvent['name']> = Extract<AppEvent, { name: N }>['props']`

5. TRACK DISPATCHER — src/lib/analytics/track.ts
   - Export `track<N extends AppEvent['name']>(name: N, props: EventProps<N>): void`
   - Behavior:
     * If !browser: no-op
     * If !initialized: buffer the event in a module-scoped queue array. Flush on next initPostHog completion.
     * If consented === false (declined): silently no-op
     * If consented === true: call posthog.capture(name, props)
     * If consented === 'pending' (banner not yet decided): buffer same as not-initialized
   - On grantConsent: flush the buffer in order
   - On revokeConsent: clear the buffer (don't send retroactively)
   - This single function is the ONLY way events leave the app. Search the codebase: any direct posthog.capture() call outside this file is a bug.

PART C — CONSENT BANNER

6. CONSENT BANNER COMPONENT — src/lib/components/ConsentBanner.svelte
   Layout:
   - position: fixed, bottom: 24px, right: 24px desktop / inset 24px both sides mobile
   - max-w-[360px], w-full mobile
   - Background: var(--bg-elevated)
   - 1px var(--hairline) border
   - border-radius var(--radius)
   - padding 24px
   - z-index: 50
   - Internal layout:
     * Mono uppercase 12px text-muted label "ANALYTICS"
     * 16px below: body 15px text, leading-relaxed:
       "I use PostHog (EU-hosted) to understand what's useful. No ads, no third parties. Okay?"
     * 24px below: 2-button row, gap 12px
       - Primary "Accept" (--accent-deep solid, 12px 20px padding, body 14px)
       - Ghost "Decline" (text-muted, hover text)
   Behavior:
   - Reads getConsentState() on mount
   - If 'pending': renders with delayed entrance (1200ms after mount, opacity + translateY transition)
   - If 'accepted' or 'declined': does not render
   - On Accept click: grantConsent(), animate out, dispatch a 'consent-decided' event for any listeners (e.g., the footer indicator)
   - On Decline click: same but revokeConsent()
   - No close (X) button — the only ways out are Accept or Decline (no escape hatch — but the footer "Analytics: off" link allows reopening)

7. FOOTER ANALYTICS INDICATOR
   - Update Footer.svelte (Sprint 2) to add a small mono link in the meta column:
     "Analytics: {state}" where state is 'on' / 'off' / 'pending'
     * 'on': text-muted, dot prefix var(--accent)
     * 'off': text-subtle, dot prefix var(--text-subtle)
     * 'pending': hidden until decided
   - Click reopens the consent banner (sets consent state back to 'pending' via a store mutation, which makes ConsentBanner re-render)

8. MOUNT CONSENT BANNER
   - In src/routes/+layout.svelte, after the main content but before the LenisProvider close, mount <ConsentBanner />
   - Ensure it's in the focus order (visible Tab navigation)

PART D — INITIALIZE ON CLIENT

9. CLIENT INITIALIZATION — src/hooks.client.ts
   - Import initPostHog from $lib/analytics/posthog
   - Call initPostHog() at top of file (will no-op until consent)
   - On document ready: read getConsentState() — if 'accepted', call grantConsent() to opt back in for returning visitors

10. PAGE_VIEW EVENTS
    - In +layout.svelte, use the afterNavigate hook from $app/navigation
    - On every navigation: track('page_view', { path: $page.url.pathname })
    - Including the initial load (use onMount + afterNavigate combination)

PART E — WIRE EXISTING INTERACTIONS

11. NAV CLICKS — Nav.svelte (Sprint 2)
    - Each nav link onclick: track('nav_clicked', { to: href })

12. HERO CTAs — HeroSection.svelte (Sprint 2)
    - Primary "See selected work →": track('hero_cta_clicked', { label: 'see-selected-work' })
    - Secondary "About the practice": track('hero_cta_clicked', { label: 'about-the-practice' })

13. PROJECT CARDS — ProjectCard.svelte (Sprint 4) and ProjectCardGallery.svelte (Sprint 2)
    - Use IntersectionObserver (threshold 0.5, fire once per session per slug — track in a Set):
      track('project_card_viewed', { slug })
    - On click (before navigation):
      track('project_card_opened', { slug })
    - Both card variants get this treatment

14. WHISPER LINK / LAB NAV — both go to /lab
    - WhisperLink.svelte (Sprint 2) on click: track('lab_visited', { from: 'home-whisper' })
    - Nav "Lab" link on click: track('lab_visited', { from: 'nav' })
    - This sprint sets the wiring; Sprint 7 builds the destination

15. CONTACT CTAs
    - In ContactSection.svelte (home, Sprint 2) "Begin a conversation" click: track('contact_cta_clicked', { location: 'home' })
    - On /work/[slug] hire-me CTA click (Sprint 4): track('contact_cta_clicked', { location: 'project-detail' })
    - Nav "Contact" click: track('contact_cta_clicked', { location: 'nav' })

16. CONTACT FORM SUBMISSION
    - In src/routes/contact/+page.server.ts (Sprint 5), after successful Resend send, capture server-side via posthog-server:
      ```
      const ph = getPostHogServer();
      ph.capture({
        distinctId: cookies.get('ph_distinct_id') ?? 'anonymous',
        event: 'contact_form_submitted',
        properties: { source: form.data.bringsYouHere }
      });
      ```
    - Ensure posthog-server flushes before the action returns (await ph.shutdown() or capture's flushing — refer to posthog-node docs)

17. EMAIL COPIED — wherever the email copy button exists (footer, /contact)
    - Click: track('email_copied', {})

18. RESUME DOWNLOAD — /about download button (Sprint 5)
    - Click: track('resume_downloaded', {})

19. HERO 3D INTERACTIONS — HeroScene.svelte (Sprint 3)
    - On scene visible (IntersectionObserver via the track ref): track('three_scene_visible', { scene_id: 'hero-sculpture' })
    - On click of the sculpture: track('three_scene_interacted', { scene_id: 'hero-sculpture', kind: 'click' })

PART F — WEB VITALS

20. INSTALL
    - `bun add web-vitals`

21. VITALS CAPTURE — src/lib/analytics/vitals.ts
    - import { onLCP, onINP, onCLS } from 'web-vitals'
    - Export `initWebVitals()`:
      onLCP(({ value, rating }) => track('web_vital_lcp', { value, rating }))
      onINP(({ value, rating }) => track('web_vital_inp', { value, rating }))
      onCLS(({ value, rating }) => track('web_vital_cls', { value, rating }))
    - Server-safe (browser-only)

22. INVOKE VITALS
    - In hooks.client.ts after initPostHog(), call initWebVitals()
    - Vitals will fire after consent (track() respects consent state)

PART G — SENTRY

23. SENTRY CLIENT — extend src/hooks.client.ts
    - import * as Sentry from '@sentry/sveltekit'
    - Sentry.init({
        dsn: PUBLIC_SENTRY_DSN,
        tracesSampleRate: 0.1, // 10% of traces for perf
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0
      })
    - Export the Sentry handleError handler

24. SENTRY SERVER — src/hooks.server.ts
    - Sentry.init({ dsn: PUBLIC_SENTRY_DSN, tracesSampleRate: 0.1 })
    - Sequence the existing handle hook with Sentry.sentryHandle() via SvelteKit's `sequence()` from @sveltejs/kit/hooks
    - Export the Sentry handleError handler

25. SOURCEMAP UPLOAD — vite.config.ts
    - Add @sentry/vite-plugin: bun add -D @sentry/vite-plugin
    - Configure with org, project, authToken from SENTRY_AUTH_TOKEN env var (build-time only)
    - silent: process.env.NODE_ENV !== 'production' (don't spam logs in dev)

26. USER CONTEXT
    - In hooks.client.ts: when posthog initializes and assigns a distinctId, call Sentry.setUser({ id: distinctId })
    - When consent is revoked: Sentry.setUser(null)

PART H — FEATURE FLAG CLIENT (preparation for Sprint 7)

27. FLAG STORE — src/lib/analytics/flags.ts
    - Export `useFlag(flagName: string)`: returns a Svelte readable store of the flag's current value
    - Implementation:
      * Initial value: false (until PostHog responds)
      * On mount: posthog.onFeatureFlags(...) callback updates the store
      * Cleanup: PostHog handles its own listeners
    - Export `getServerFlag(flagName: string, distinctId: string)`: re-export from posthog-server for use in +layout.server.ts (Sprint 7)
    - Document: server-side flag eval is preferred for above-the-fold content (no flash of wrong variant). Client-side flag eval is fine for below-the-fold or non-critical UI.

PART I — TEST AND VERIFY

28. MANUAL TEST FLOW
    - Clear localStorage
    - Visit / — verify consent banner appears after ~1200ms, no PostHog requests yet
    - Open Network tab. Click "Decline". Verify no calls to *.posthog.com
    - Refresh, accept this time. Verify a /capture/ POST hits eu.i.posthog.com
    - In PostHog dashboard, see live events appear (page_view, hero_cta_clicked when clicking hero CTA, etc.)
    - Trigger a deliberate error in dev (uncomment a `throw new Error('test')` somewhere ephemeral) and verify it appears in Sentry with sourcemap context

29. COMMIT
    - bun run check, bun run build, bun test all green
    - Commit: `feat(analytics): typed track() helper, consent banner, PostHog EU + Sentry, web vitals, flag store`

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════

Consent banner:
✓ Appears bottom-right, max 360px wide, NOT a full-width sticky bar, NOT a modal
✓ Animation in: opacity + translateY 16px → 0 over 480ms with cubic-bezier(0.22, 1, 0.36, 1)
✓ Delayed entrance: ~1200ms after first paint (so it doesn't compete with hero)
✓ Copy is exactly: "I use PostHog (EU-hosted) to understand what's useful. No ads, no third parties. Okay?"
✓ Buttons: Accept (primary --accent-deep), Decline (ghost text-muted)
✓ NO cookie emoji 🍪
✓ NO "We value your privacy" boilerplate
✓ NO close (X) button — Accept/Decline are the only paths

Footer indicator:
✓ "Analytics: on" / "Analytics: off" rendered in mono 12px in the footer
✓ Dot prefix uses --accent for on, --text-subtle for off
✓ Click reopens the banner

Tracking discipline:
✓ Search the codebase: posthog.capture() calls outside src/lib/analytics/ should be ZERO
✓ Every interaction wired in steps 11-19 fires the correct event with correct props
✓ Untyped event names cause TypeScript errors (test by passing a string not in AppEvent — should fail compile)
✓ track() called before consent buffers events; flushes on consent grant
✓ track() after decline silently no-ops

Privacy:
✓ DNT respected (set Do Not Track in browser, verify no events fire even after Accept)
✓ EU host confirmed in Network tab (eu.i.posthog.com, not us.i.posthog.com)
✓ No session recording, no autocapture, no heatmap

Atmosphere (still — even with banner present):
✓ Banner does not steal focus from hero or content
✓ Banner does not animate in immediately (the 1200ms delay matters)
✓ Banner background is --bg-elevated, NOT a gradient, NOT glassmorphism
✓ Banner border is hairline (1px var(--hairline))

Performance:
✓ posthog-js loads asynchronously (verify Network waterfall — should not block first paint)
✓ Lighthouse on / still ≥ 95 desktop (consent banner adds minimal weight)
✓ Total bundle delta ≤ 40KB gzipped from this sprint's additions (PostHog + Sentry + web-vitals)

Code:
✓ Svelte 5 runes throughout
✓ TypeScript strict, no `any`
✓ All event types in events.ts, single source of truth
✓ posthog-server has the browser-guard at top
✓ Source maps uploaded to Sentry on build (verify in Sentry release)

Accessibility:
✓ Consent banner reachable via Tab
✓ Buttons have proper roles and labels
✓ Banner has aria-live="polite" so screen readers announce it gracefully (after the entrance delay)
✓ Footer indicator is a button with aria-label "Reopen analytics consent dialog"

Forbidden patterns absent:
✓ No third-party scripts beyond PostHog and Sentry
✓ No autocapture, no session recording, no heatmap recording
✓ No tracking before consent
✓ No gradient on the consent banner
✓ No emoji in consent copy

THE OPULENCE CHECK:
✓ Visual noise on / with banner present: ≤ 3 / 10 (banner adds slight presence; should not feel intrusive)
✓ Visual noise on / after decision (banner gone): ≤ 2 / 10 (back to baseline)
✓ Warmth: ≥ 8 / 10 — banner uses warm tokens, no cold modal feel

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask if:
- PostHog's EU domain has changed since 2025 (verify eu.i.posthog.com responds; otherwise check current docs)
- Sentry's @sentry/sveltekit setup requires config changes not reflected here (check version-current docs)
- A consent banner is being designed full-width or full-screen. Stop, redesign per spec.
- A cookie emoji 🍪 appears in the banner copy. Remove.
- Any direct posthog.capture() call appears outside src/lib/analytics/. Refactor through track().
- An untyped track call (string event name not in the union) is being added. Add to AppEvent first.
- Web Vitals fire before consent. They must respect track() which respects consent.
- A second consent banner library is being suggested (cookie-consent-react / etc.). We don't need it; ours is 60 lines.
- Session replay or heatmap features are being enabled. Defer to v2.
- The consent banner appears INSTANTLY on first paint. Add the 1200ms delay.

═══════════════════════════════════════════════════════
RECOVERY PROMPT
═══════════════════════════════════════════════════════
"This output has drifted toward generic SaaS analytics implementation. Re-anchor:
§1.2 — Boris builds things of enduring value, and proves it.
§5.1 — Calm, considered. Even infrastructure should feel composed.
§5.5 — Forbidden: emoji as design, full-screen modals, glassmorphism, third-party scripts beyond PostHog/Sentry.

Identify the drift: did the banner become a full-width bar? Did a cookie emoji appear? Did session recording sneak in? Did track() calls bypass the typed dispatcher? Revert. Run the Design Quality Gate. Resume."

═══════════════════════════════════════════════════════
HANDOFF NOTE TO SPRINT 7
═══════════════════════════════════════════════════════
Sprint 7 expects to inherit:
- A typed track() helper at $lib/analytics/track.ts with discriminated-union event types
- posthog-js initialized client-side, opt-in only, EU-hosted
- posthog-node available server-side via $lib/analytics/posthog-server.ts
- A useFlag() store and getServerFlag() helper for /lab variant rendering
- Sentry capturing both client and server errors with sourcemaps
- Web Vitals piped to PostHog
- Consent banner working with footer indicator
- All key interactions wired (page_view, nav_clicked, hero_cta_clicked, project_card_viewed/opened, lab_visited, contact_cta_clicked, contact_form_submitted, email_copied, resume_downloaded, three_scene_visible/interacted)

Report at sprint end:
- Screenshot of the consent banner (in dark mode)
- Screenshot of PostHog dashboard showing live events from a manual session
- Screenshot of Sentry dashboard showing a captured test error with sourcemap context
- Confirmation of zero PostHog network calls when consent is declined
- Bundle size delta for /
- Lighthouse on /
````

---

## Sprint 7 — The /lab Page (Signature Feature)

```
You are pair-programming with Boris on a luxury portfolio site. Sprints 0-6 built foundation, content, home, hero 3D, /work, supporting pages, and analytics infrastructure. THIS sprint builds the project's centerpiece: /lab — the experimentation salon. This is the destination of every CRO claim on the site.

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
Build /lab as a research salon: a premise section, the two competing sculptures 3D scene, live experiment cards with PostHog data, concluded experiments (including at least one inconclusive), methodology section, enterprise credibility panel (Toyota / Lexus / Hitachi / Valtech / DS Smith), referrer-aware opening line. ISR with 5-minute edge cache.

THIS SPRINT IS THE LONGEST. If it stretches past one session, split into 7A (page structure + premise + experiment cards + concluded + methodology + credibility + referrer logic) and 7B (the two-sculptures 3D scene). Use the split prompts in PART J at the bottom.

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT
═══════════════════════════════════════════════════════
/lab is the ONLY place on the site where:
- Live A/B tests are visible
- Enterprise client names appear (Toyota, Lexus, Hitachi, Valtech, DS Smith)
- The "two competing sculptures" 3D piece renders
- Referrer-aware copy appears
- Inline feedback widgets exist

The page reads like a private research folio — warm-paper backgrounds (--surface-paper), gold-accented data tables, monospace typography for numerical surfaces. NOT a marketing page. NOT a feature dashboard.

POSITIONING: "Boris builds things of enduring value, and proves it."

The /lab page IS the proof. Treat it like a Maison's invitation-only inner salon.

ARCHITECTURAL COMMITMENTS:
- /lab is SSR with ISR, 5-minute edge cache via `export const config = { isr: { expiration: 300 } }`
- Server-side flag evaluation for the two-sculptures (no flash of wrong variant)
- Particle field is DISABLED on /lab (per Sprint 3 contract)
- A separate <View> portal for the two-sculptures scene, sharing the same root canvas
- Enterprise credibility panel uses --surface-paper (warm linen background)
- Referrer detection in hooks.server.ts, passes refSource to layout

STACK:
- SvelteKit 2, Svelte 5 runes, TypeScript strict
- Threlte 8 + @threlte/extras (Sprint 3's setup)
- PostHog server-side (Sprint 6's posthog-server)
- Sanity (Sprint 1's experiment schema)

COLOR TOKENS in use:
--bg              : oklch(0.18 0.005 60)
--bg-elevated     : oklch(0.22 0.005 60)
--surface-paper   : oklch(0.21 0.006 60)   /* warm linen — used heavily on /lab */
--text            : oklch(0.94 0.004 80)
--text-muted      : oklch(0.68 0.005 60)
--text-subtle     : oklch(0.52 0.004 60)
--hairline        : oklch(0.94 0.004 80 / 0.08)
--accent          : oklch(0.78 0.10 85)   /* champagne gold — for rules, p<0.05 highlights */
--accent-deep     : oklch(0.62 0.12 78)

TYPOGRAPHY (lab-specific):
- Hero H1: 64px display serif (smaller than home — lab is research-tone, not loud)
- Section H2s: 40px display serif
- Experiment card title: 24px display serif
- Numerical data: JetBrains Mono 14px tabular-nums
- "n=" labels: mono 12px uppercase 0.12em text-muted
- p-values, conversion rates: mono 14px tabular-nums

REFERRER-AWARE OPENING (from Sanity settings.labOpeningCopy):
{
  linkedin: "Welcome — most LinkedIn visitors come asking whether the methodology is real. The page below is the answer.",
  github: "Welcome — for engineers, the implementation notes are linked at the bottom of each experiment.",
  twitter: "Welcome — pinned tweet visitors usually want the inconclusive results. They're below, with the rest.",
  default: "Welcome to the Lab. What follows is a working demonstration of conversion methodology."
}

ENTERPRISE CREDIBILITY PANEL CONTENT:
- Toyota & Lexus: "+15% online revenue lift, Q1 2024. Multivariate experiments via Adobe Target across the digital sales funnel."
- Hitachi M&B: "Frontend engineering on a multi-brand restaurant platform serving millions of diners."
- Valtech: "Lead frontend on internal organizational-intelligence platform — circular line-org visualization, salary-range comparisons."
- DS Smith: "Data-driven CRO program on Optimizely. Improved CR, CTR, and RPV; reduced bounce rate."

These are FACTS, presented in serif graphite on linen. Never as boasts.

FORBIDDEN PATTERNS:
❌ Glassmorphism cards
❌ "Powered by PostHog" badges
❌ Carousels of any kind
❌ Pie charts (use sparklines / bars only)
❌ "Hire me!" CTA in the middle of the page (one calm CTA at the end)
❌ Logos of Toyota/Lexus/Hitachi/Valtech as IMAGES (use serif graphite TEXT — facts not boasts)
❌ Confetti or success animations on winning variants
❌ Red/green color coding for win/loss (we don't have those tokens — use --accent for "significant", --text-muted for "n.s.", --text-subtle for "inconclusive")
❌ "Sample size growing!" optimistic copy
❌ Particle field on this page

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
1. Sprints 0-6 merged. CI green.
2. PostHog has at least 2 feature flags created in dashboard with corresponding experiment configs:
   * Recommended: "lab-sculpture-test" (a 50/50 flag for the two-sculptures piece) and "contact-cta-copy-test" (a 50/50 flag for the home Contact CTA copy — this becomes the first home-page experiment whose results show on /lab even though variants don't visibly affect home in this sprint)
3. Sanity has experiment documents for those PostHog flags (created via Studio):
   * 1 running with status="running"
   * 1 concluded with status="concluded" (winner set)
   * 1 inconclusive with status="inconclusive"
4. POSTHOG_PERSONAL_API_KEY env var configured (Sprint 6)
5. Hero scene works (Sprint 3) — proves the <View> pattern
6. settings.labOpeningCopy populated in Sanity (Sprint 1 seed)

If PostHog experiments / Sanity docs aren't yet set up: stop and walk Boris through creating them in dashboards before starting code. The page cannot be tested otherwise.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

PART A — REFERRER DETECTION

1. UPDATE hooks.server.ts
   - In the handle hook, on every request:
     * Read the Referer header
     * Classify into: 'linkedin' | 'github' | 'twitter' | 'direct' | 'other'
       - linkedin: hostname ends in linkedin.com
       - github: hostname ends in github.com or github.io
       - twitter: hostname ends in twitter.com or x.com or t.co
       - direct: no Referer header
       - other: anything else
     * If a 'ref-source' cookie does NOT exist, set it with the classified value (httpOnly false so client can read for the dismissible badge, secure: true, sameSite: 'lax', maxAge: 60 days)
     * Read the cookie back into event.locals.refSource for downstream load functions
   - If a 'ref-suppress' cookie is present (set to 'true' when user dismisses the personalized opening), event.locals.refSource = 'default' regardless

2. ROOT LAYOUT TYPING — src/routes/+layout.server.ts
   - In the load function, return refSource from event.locals
   - Update src/app.d.ts to type Locals.refSource

PART B — /LAB ROUTE INFRASTRUCTURE

3. /lab LOAD — src/routes/lab/+page.server.ts
   - export const config = { isr: { expiration: 300 } }
   - Load:
     * settings (for labOpeningCopy)
     * activeExperiments (Sanity getActiveExperiments)
     * concludedExperiments (Sanity getConcludedExperiments)
     * For each running experiment, fetch live stats from PostHog API (see step 4)
     * refSource from parent layout
   - Return: { settings, activeExperiments, concludedExperiments, experimentStats, refSource }

4. POSTHOG STATS FETCHER — src/lib/analytics/experiment-stats.ts (server-only)
   - Guard: throw if browser
   - Export `getExperimentStats(flagKey: string)`: calls PostHog's /api/projects/:project_id/experiments/:experiment_id endpoint via authenticated fetch
   - Returns: { sampleSize, variantA: { count, conversionRate }, variantB: { count, conversionRate }, pValue, status }
   - On API failure (rate limit, network): returns null. Page renders with "stats unavailable" gracefully.
   - Cache results in module-scoped Map keyed by flagKey, TTL 5 minutes (matches ISR cadence)
   - Document: real PostHog API schema may have shifted; verify with a manual curl before parsing. If the schema has changed, log the actual response shape and adjust.

PART C — /LAB PAGE STRUCTURE

5. /lab PAGE — src/routes/lab/+page.svelte
   Layout: 12-col grid. NO particle field (Sprint 3 contract). Background remains --bg.

   ───── 1. PREMISE (asymmetric, py-[192px]) ─────
   Cols 1-7:
   - Eyebrow: "THE LAB"
   - H1 (display serif 64px, -0.025em, 0.95): "A working demonstration of conversion methodology."
   - GoldRule (32px wide, 32px below baseline)
   - 32px below: referrer-aware opening line (body 22px text, max-w-[52ch]):
     * Read settings.labOpeningCopy[refSource] with fallback to .default
     * Render the line with markdown-style emphasis if settings provides bold/italic
   - 24px below: small dismissible badge (only if refSource !== 'default'):
     * Mono 12px text-subtle: "Reading from {refSource} — show default opening?" with "show default" as a ghost link
     * On click: set 'ref-suppress' cookie, soft-reload (or just patch the displayed text via $state)
   - 64px below opening: introductory body 17px text-muted, max-w-[60ch]:
     "This site runs live A/B tests. The methodology, the sample sizes, the wins and losses are below — including the inconclusive ones. The page itself is also experimental: a piece of practice on display. Take what's useful."
   Cols 8-12:
   - Empty whitespace (the asymmetric breath)
   - Optional: a small mono caption top-right "EST. 2026" or similar quiet mark

   ───── 2. THE TWO SCULPTURES (full-width, py-[160px]) ─────
   See PART D below.

   ───── 3. CURRENTLY RUNNING (full-width, py-[160px]) ─────
   - Eyebrow: "01 — RUNNING NOW"
   - H2: "What's live right now."
   - GoldRule
   - 64px below: experiment cards. Layout: 2-up grid desktop (cols 1-6 / 7-12), 1-col mobile, gap-12 (48px).
   - Render <ExperimentCard /> for each activeExperiments entry. See PART E.

   ───── 4. CONCLUDED (full-width, py-[160px]) ─────
   - Background: --surface-paper (warm linen) — visually distinguishes from the rest of the page
   - Hairlines top and bottom (full width)
   - Inside (cols 1-12, max-w-[1200px] centered):
     * Eyebrow: "02 — CONCLUDED"
     * H2: "Wins, losses, and the inconclusive."
     * GoldRule
     * 32px below: prose 18px text-muted, max-w-[60ch]:
       "Tests end. Some win, some lose, some refuse to commit. All are published — including the ones that didn't move the needle. The discipline includes the discomfort of being wrong on the record."
     * 64px below: list of <ExperimentCard variant="concluded" /> stacked vertically (NOT a grid — list rhythm, hairlines between)

   ───── 5. METHODOLOGY (cols 3-9, py-[160px], max-w-[64ch]) ─────
   - Eyebrow: "03 — METHODOLOGY"
   - H2: "How this works."
   - GoldRule
   - 64px below: prose body 17px text. Three subsections separated by hairline + 32px padding each:
     * "TOOLING" mono uppercase 12px text-muted, then body:
       "PostHog Experiments power every test. Feature flags are evaluated server-side via posthog-node, so visitors never see a flash of the wrong variant. Events are emitted client-side under explicit consent. Stats refresh every five minutes via on-demand revalidation."
     * "PRIVACY" mono label, then body:
       "Tracked events are listed in the consent banner. No third-party scripts. No session recording. EU-hosted (eu.i.posthog.com). Decline at any time from the footer."
     * "LIMITATIONS" mono label, then body:
       "Personal-site traffic is small. Most tests reach significance slowly or not at all. Inconclusive results are published with the same dignity as conclusive ones — small samples are honest data, not failures."

   ───── 6. ENTERPRISE CREDIBILITY (full-width, py-[160px]) ─────
   - Background: --surface-paper continued (or a slightly different warm shade — match the concluded section)
   - Eyebrow: "04 — ENTERPRISE PRACTICE"
   - H2: "Where this discipline came from."
   - GoldRule
   - 32px below: prose body 17px text-muted, max-w-[60ch]:
     "Three years of CRO and full-stack work for clients whose decisions move real money. The work below was the apprenticeship for the methodology on display above."
   - 64px below: 4-row list, each row a 12-col grid:
     * Cols 1-3: Client name in display serif 28px text (NOT a logo image — TEXT)
     * Cols 4-12: One-line attribution in body 17px text-muted
     * Hairline divider between rows
   - Rows (in this order):
     * Toyota & Lexus → "+15% online revenue lift, Q1 2024. Multivariate experiments via Adobe Target across the digital sales funnel."
     * Hitachi M&B → "Frontend engineering on a multi-brand restaurant platform serving millions of diners."
     * Valtech → "Lead frontend on internal organizational-intelligence platform — circular line-org visualization, salary-range comparisons."
     * DS Smith → "Data-driven CRO program on Optimizely. Improved CR, CTR, and RPV; reduced bounce rate."
   - Small mono caption at the bottom in text-subtle: "Detailed case studies on the work page."

   ───── 7. INLINE FEEDBACK (cols 4-9, py-[96px]) ─────
   - Centered horizontally
   - Mono 12px text-muted: "WAS THIS LAB USEFUL?"
   - 16px below: two ghost-link buttons inline
     * "Yes" → fires track('experiment_vote_cast', { experiment_id: 'lab-feedback', variant: 'yes' }), persists in localStorage
     * "Not really" → same, variant: 'no'
   - After click, replaces with mono "Thanks. Logged." in text-subtle

   ───── 8. CTA (cols 4-9, py-[160px]) ─────
   - Eyebrow: "05 — CONSIDERING WORKING TOGETHER?"
   - H2 (display serif 40px): "Let's discuss the work."
   - 32px below: primary <Button> "Begin a conversation" → /contact
   - On click: track('contact_cta_clicked', { location: 'lab' })

PART D — THE TWO SCULPTURES (3D scene)

6. CHOOSE THE EXPERIMENT TO BIND
   - The two-sculptures piece is bound to ONE ongoing PostHog flag for visualization purposes
   - Recommended: tie it to a flag named "lab-sculpture-test" with two variants:
     * Variant A: "marble" (Sanity experiment.variantA.material = "marble")
     * Variant B: "brass" (variantB.material = "brass")
   - The flag is purely visual — clicking either sculpture is the conversion event
   - Boris configures this flag in PostHog before sprint; the Sanity experiment doc references it via postHogFlagKey

7. SERVER-SIDE FLAG EVAL — extend src/routes/lab/+page.server.ts
   - For the bound flag, evaluate server-side via getServerFlag(flagKey, distinctId)
   - distinctId source: read 'ph_distinct_id' cookie if present; otherwise generate a UUID and set the cookie (httpOnly false, sameSite lax, maxAge 365 days)
   - Pass `assignedVariant: 'A' | 'B'` to the page

8. TWO SCULPTURES SCENE — src/lib/three/scenes/TwoSculptures.svelte
   Concept: two sculptural forms side by side, one in marble (cool, matte), one in brass (warm, reflective). The "winning" variant (if data shows one) is rendered slightly larger and with stronger material reflectance.

   Structure:
   - Declares a <View> from @threlte/extras with track={...} pointing at a DOM element
   - Inside the View:
     * Camera: PerspectiveCamera, fov 35, position [0, 0, 5], looking at origin
     * Two TorusKnotGeometries (or extruded letterforms — use torus knots for now), positioned at [-1.4, 0, 0] (Variant A — marble) and [1.4, 0, 0] (Variant B — brass)
     * Materials:
       - MARBLE (Variant A): MeshPhysicalMaterial — color oklch(0.92 0.005 80) → sRGB, roughness 0.6, metalness 0.0, clearcoat 0.4, clearcoatRoughness 0.3, sheen 0.3, sheenColor a faint cool tint. Subtle subsurface look.
       - BRASS (Variant B): MeshPhysicalMaterial — color oklch(0.78 0.10 85) → sRGB (the gold token!), roughness 0.25, metalness 0.85, clearcoat 0.7, clearcoatRoughness 0.1
     * Shared HDRI from Sprint 3's env store
     * Slow idle rotation per sculpture (different speeds, ~70-90s per revolution)
     * Visual emphasis on the winning variant (passed in as prop):
       - If winningVariant === 'A': scale Variant A to 1.08, Variant B to 0.94
       - If winningVariant === 'B': inverse
       - If null (no winner / inconclusive): both scale 1.0
       - Lerp scales over 1200ms on prop change
     * Sample-size data binding: a uniform `uSampleProgress` (0 → 1) drives subtle material highlights — at low sample size both materials are slightly desaturated; as sample size grows the colors come to fullness. This is poetry, but legible.

   Behavior:
   - Click on either sculpture: fires track('experiment_vote_cast', { experiment_id: flagKey, variant: 'A' | 'B' })
   - On click, the clicked sculpture also pulses scale 1.0 → 1.05 → 1.0 over 320ms (cubic-bezier spring)

   Performance:
   - Heavy materials — verify scene chunk stays ≤ 200KB
   - Pause via IntersectionObserver when not visible
   - Reduced-motion fallback: a static screenshot at static/fallbacks/two-sculptures.jpg (bake during this sprint)

9. WIRE INTO /lab — in the +page.svelte premise section, BELOW the premise and BEFORE the Currently Running:
   - A full-width container, py-[160px] (160px vertical padding)
   - Container background: a very subtle warm radial gradient (oklch 0.20 0.005 60 center → oklch 0.18 0.005 60 edges)
   - Inside (cols 1-12, max-w-[1100px] centered):
     * Eyebrow: "FEATURED EXPERIMENT"
     * H2 (display serif 36px): "{Sanity experiment.name}"
     * Small mono caption: hypothesis text
     * 64px below: a sized container (aspect 16/9) with bind:this for the <View> track
     * Mount <TwoSculptures track={containerRef} winningVariant={...} sampleSize={...} />
     * 32px below the canvas: a mono data row centered:
       "n={sampleSize} · A: {convA}% · B: {convB}% · {sigText}"
       where sigText is "p<0.01" or "p<0.05" (in --accent) or "p={pValue}, n.s." (in --text-muted)
     * Small disclosure: "● You are seeing variant {assignedVariant}" in mono 12px with --accent dot
   - Reduced-motion: render the static fallback image with the data row beneath

PART E — EXPERIMENT CARD COMPONENT

10. EXPERIMENT CARD — src/lib/components/ExperimentCard.svelte
    Two variants: "running" and "concluded". Same component, prop-controlled.

    Props:
    - experiment: Experiment (typed from Sanity)
    - stats: { sampleSize, variantA, variantB, pValue } | null (null on API failure)
    - variant: "running" | "concluded"
    - assignedVariant: 'A' | 'B' | null (only relevant for running)

    Layout:
    - Background: --surface-paper (warm linen)
    - Border: 1px var(--hairline)
    - Padding: 32px
    - --radius
    - Internal vertical rhythm:
      * Header row: experiment.name in display serif 24px (cols 1-9), startDate in mono 12px text-muted (cols 10-12, right-aligned)
      * GoldRule below name (24px wide, 16px below)
      * 24px below rule: hypothesis in body 16px text-muted, max-w-[60ch]
      * 32px below: variant preview row — 2-col split:
        - Variant A label (mono 12px text-muted "VARIANT A · {variantA.label}"), screenshot thumb (aspect 4/3, --radius), copy snippet body 14px text
        - Variant B same
        - On hover any variant: small "expand" cursor (Sprint 8 wires this)
      * 32px below: stats row in mono 14px tabular-nums:
        - For running:
          "n={sampleSize}  ·  CR A: {convA}%  ·  CR B: {convB}%  ·  Δ {delta}  ·  {sigText}"
          where sigText is colored: --accent for p<0.05, --text-muted for n.s.
        - For concluded:
          "n={sampleSize} (final)  ·  Winner: {winnerLabel}  ·  {pValueText}"
          OR if status === 'inconclusive': "n={sampleSize}  ·  Inconclusive  ·  No significant difference"
      * 16px below: sparkline showing sample-size growth over time
        - Implementation: a simple inline SVG path
        - 1.5px stroke, --text-subtle color
        - Width: 100% of card, height 32px
        - Data: simulate from startDate to today with reasonable growth curve, OR pull from PostHog if API supports historical sampling
      * For concluded: 24px below stats, "WHAT WE LEARNED" mono label, then summary text in body 15px text in --text (this is content, not muted)
      * For running with assignedVariant: a quiet line at the bottom: "● You're seeing variant {assignedVariant}" mono 12px with --accent dot
    - On stats === null: replace stats row with mono "Stats temporarily unavailable" in --text-subtle. Card still renders cleanly.

    Hover:
    - Subtle 1px gold halo via box-shadow (0 0 24px oklch(0.78 0.10 85 / 0.10))
    - 280ms cubic-bezier(0.22, 1, 0.36, 1)
    - NO tilt (these are folio cards, not project cards)

    On expansion (the screenshot thumb click):
    - Opens shadcn Dialog with full-resolution screenshot + caption
    - Fires track('experiment_card_expanded', { experiment_id: experiment.postHogFlagKey })

PART F — INTEGRATION TESTING

11. CREATE SANITY EXPERIMENT DOCS (if not already done in pre-flight)
    - In Studio, create 3 experiment documents:
      a) Running: name "Lab Sculpture Selection", postHogFlagKey "lab-sculpture-test", status "running", variantA { label: "Marble", material: "marble" }, variantB { label: "Brass", material: "brass" }, hypothesis "Visitors prefer warmer materials in interactive sculpture", metric "Sculpture click-through", metricEvent "experiment_vote_cast"
      b) Concluded: name "Contact CTA Copy", postHogFlagKey "contact-cta-copy-test", status "concluded", winner "B", summary "Variant B (Begin a conversation) outperformed Variant A (Get in touch) by 22% with p=0.03 over n=420 sessions."
      c) Inconclusive: name "Hero Image Treatment", postHogFlagKey "hero-image-test", status "inconclusive", summary "Both variants performed within margin of error after 60 days. Could be a real null result, or the sample is too small. Logged either way."
    - Each variant gets a placeholder screenshot (a solid colored 800x600 image with the variant label rendered in display serif)

12. CONFIGURE POSTHOG FLAGS
    - In PostHog dashboard, create matching feature flags for the running experiment
    - 50/50 distribution
    - Linked to the corresponding experiment configurations
    - Verify that getServerFlag returns 'A' or 'B' deterministically per distinctId

PART G — SEO

13. /lab SEO
    - <title>The Lab — Boris</title>
    - <meta description>Live A/B tests, methodology, and the enterprise practice it came from. A working demonstration of conversion discipline.</meta>
    - <link canonical>
    - Open Graph: og:title, og:description, og:type=website
    - JSON-LD: WebPage with potentialAction and a custom about: "Conversion Rate Optimization methodology"
    - JSON-LD: BreadcrumbList (Home → The Lab)

PART H — ROBOTS

14. /lab in robots.txt
    - Allow indexing (Sprint 9 generates robots.txt — document this expectation in docs/seo-todos.md)
    - The page is meant to be discoverable — it's the proof artifact

PART I — TEST AND COMMIT

15. END-TO-END TEST
    - Visit /lab in dev. Expected:
      * Premise renders with default opening (no Referer header in dev — refSource = 'direct' or 'default')
      * Set Referer manually via DevTools Network conditions or curl — verify each refSource shows the right opening
      * Two sculptures render: marble on left, brass on right
      * Click marble or brass — see PostHog event fire
      * Currently Running shows your "lab-sculpture-test" experiment with live data (or "stats unavailable" if PostHog API hasn't accumulated data)
      * Concluded section shows "Contact CTA Copy" (with winner) and "Hero Image Treatment" (inconclusive)
      * Methodology section reads cleanly
      * Enterprise credibility panel shows 4 entries in serif graphite on linen
      * Inline feedback widget appears
      * Final CTA links to /contact
    - axe-core run: 0 violations
    - Lighthouse on /lab: ≥ 90 desktop (slightly lower target than other routes — SSR + 3D scene + data fetch is heaviest combo)

16. COMMIT
    - bun run check, bun run build, bun test all green
    - Commit: `feat(lab): premise, two sculptures 3D, experiment cards with PostHog data, methodology, enterprise credibility, referrer-aware opening`

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════

Premise:
✓ H1 is 64px (not 84px home — lab is research-tone)
✓ Referrer-aware opening renders the correct text for each refSource (manually test all 4)
✓ Dismissible badge appears only when refSource !== 'default'
✓ The 'ref-suppress' cookie path works

Two sculptures 3D:
✓ Marble material is matte, cool, NOT metallic — verify roughness 0.6, metalness 0
✓ Brass material is warm, reflective, slight metallic — verify roughness 0.25, metalness 0.85
✓ The two materials READ AS DIFFERENT MATERIALS visually, not just different colors
✓ Idle rotation slow (~70-90s per revolution per sculpture, different speeds)
✓ Click on either sculpture fires experiment_vote_cast in PostHog (verify in dashboard)
✓ Reduced-motion fallback image baked at static/fallbacks/two-sculptures.jpg
✓ Scene chunk ≤ 200KB gzipped

Experiment cards:
✓ Background --surface-paper (warm linen), distinct from page background
✓ stats data renders correctly when PostHog API is available
✓ Graceful "Stats temporarily unavailable" when API fails — card still readable
✓ Sparkline is hairline (1.5px), --text-subtle color, full card width
✓ All numerical data uses tabular-nums (verify by inspecting consecutive cards — digits align)
✓ Significance indicator: --accent for p<0.05, --text-muted for n.s., never red/green

Concluded experiments:
✓ Section background is --surface-paper (visually distinguishes)
✓ At least ONE inconclusive experiment is visibly published — this is the signature honesty
✓ Inconclusive cards are styled with the SAME dignity as winning ones — no shame indicators
✓ "What we learned" summary text is in --text color (content), not muted

Enterprise credibility:
✓ Client names rendered as TEXT in display serif graphite, NOT as logos/images
✓ Background --surface-paper (warm linen)
✓ One-line attributions in body 17px text-muted
✓ Hairline dividers between rows
✓ Reads as "facts presented calmly", NOT as "logos shouted"
✓ Toyota, Lexus, Hitachi, Valtech, DS Smith all present (in this order or similar)
✓ NO carousel, NO grid of logos

Methodology:
✓ Three subsections: Tooling, Privacy, Limitations
✓ Each has a mono uppercase 12px label, prose 17px text below
✓ Hairlines + 32px padding between subsections
✓ Reading column ≤ 64ch
✓ Tone is research-director — calm, informative, never apologetic

Inline feedback:
✓ NO emoji thumbs (👍 👎)
✓ Mono prompt "WAS THIS LAB USEFUL?"
✓ Two ghost-link buttons "Yes" / "Not really"
✓ Confirmation message "Thanks. Logged." in mono after click
✓ Persists in localStorage so it doesn't ask again

Atmosphere:
✓ Particle field is OFF on /lab (verify by inspecting +layout.svelte route store)
✓ Background warm-obsidian (--bg) for premise / running / methodology / feedback / CTA sections
✓ --surface-paper for concluded section AND enterprise credibility section
✓ The visual distinction between bg and surface-paper sections is subtle but perceptible (toggle off and on if you can to confirm)
✓ NO glassmorphism, NO backdrop-blur, NO gradient buttons

Forbidden patterns absent:
✓ No "Powered by PostHog" badge
✓ No carousel of any kind
✓ No pie charts (sparklines and bars only)
✓ No mid-page "Hire me!" interruption
✓ No logos as images for enterprise credibility
✓ No confetti / success animations on winners
✓ No red/green for significance — --accent / --text-muted / --text-subtle only
✓ No "Sample size growing!" copy
✓ No particle field on /lab

Code:
✓ Server-side flag eval for the two-sculptures: verify no flash of wrong variant on hard reload
✓ ISR config in place (export const config = { isr: { expiration: 300 } })
✓ Stats fetch caches in module memory (5 min TTL)
✓ Svelte 5 runes throughout
✓ TypeScript strict, no `any`

Performance:
✓ Lighthouse on /lab ≥ 90 desktop (relaxed from 95 — SSR + 3D + data is heavy)
✓ Lighthouse on /lab ≥ 80 mobile
✓ Total / route JS ≤ 450KB gzipped (slightly above home's budget — accept the cost since this is the signature page)
✓ TTFB ≤ 600ms (PostHog API is the biggest variable; cache is hit on second request)
✓ LCP < 2.5s

Accessibility:
✓ axe-core: 0 violations on /lab
✓ Two-sculptures scene has aria-label and skip-link
✓ Experiment cards are keyboard navigable; expansion dialogs trap focus
✓ Sparklines have aria-label describing the trend ("Sample size growing from 0 to 247 over 30 days")
✓ Stats data is announced via aria-live polite when it loads

THE OPULENCE CHECK:
✓ Visual noise on /lab: ≤ 3 / 10 (slightly higher than home because data density is higher — but the discipline of typography, hairlines, and warm tones keeps it calm)
✓ Warmth: ≥ 9 / 10 (the linen sections push warmth higher than the rest of the site — that's intentional, the lab is the warmest place)
✓ The page reads as a private salon, not a marketing analytics dashboard
✓ Inconclusive experiments are published with the same visual weight as wins — that's the project's thesis made manifest

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask if:
- PostHog Experiments API schema differs from expectations. Run a manual curl against /api/projects/:id/experiments first; if the shape is different, document the actual response and adjust experiment-stats.ts.
- Server-side flag eval adds >100ms TTFB. If yes: ask whether to defer to client-side with a skeleton (some flash of wrong variant accepted in exchange for faster TTFB).
- The two-sculptures scene chunk exceeds 200KB. Identify why (likely material textures or geometry), tier down (drop one of the materials' clearcoat, simplify geometry).
- Any enterprise client appears as a logo IMAGE rather than text. Stop and convert to display serif text.
- A carousel of any kind is being designed. Convert to a list or stack.
- The two-sculptures scene goes glass/iridescent (drift toward retired aesthetic). Re-anchor to solid materials.
- An inconclusive experiment is being hidden or styled as "failure." Restore equal dignity.
- "Powered by PostHog" or any tooling badge appears. Remove.
- The methodology section gets pie charts or fancy data viz. Replace with prose + minimal sparklines.
- Particle field accidentally renders on /lab. Disable per the route store.
- Lighthouse on /lab drops below 85 desktop. Investigate (likely the 3D scene; tier down mobile, ensure desktop is ≥ 90).
- The referrer cookie path doesn't work. Test with manual curl --header "Referer: https://linkedin.com/foo" to verify.

═══════════════════════════════════════════════════════
RECOVERY PROMPT
═══════════════════════════════════════════════════════
"This /lab output has drifted toward marketing-analytics-dashboard or product-page territory. Re-anchor:
§1.2 — Boris builds things of enduring value, and proves it.
§3.4 — /lab is a private research folio. Warm-paper backgrounds, gold-accented data tables. NOT a marketing page.
§5.5 — Forbidden: glassmorphism, carousels, pie charts, logos-as-images, red/green significance, mid-page CTA interruptions.
§8.1 — Inconclusive results published with the same dignity as wins. That's the discipline.

Identify the drift: did logos return as images? Did a carousel sneak in? Did red/green color coding appear for significance? Did inconclusives get hidden? Did the two sculptures go glass/iridescent? Did a 'Powered by' badge surface? Revert. Run the Design Quality Gate. Resume."

═══════════════════════════════════════════════════════
HANDOFF NOTE TO SPRINT 8
═══════════════════════════════════════════════════════
Sprint 8 expects to inherit:
- A fully working /lab page rendering at SSR with 5-minute ISR
- The two sculptures 3D scene rendering via <View> portal
- Server-side flag evaluation working (no flash)
- Live PostHog stats integrated with graceful fallback on API failure
- Sanity experiments visible: at least 1 running, 1 concluded, 1 inconclusive
- Referrer-aware opening line working for all 4 categories
- Enterprise credibility panel rendering as text on linen
- Inline feedback widget firing experiment_vote_cast
- Sparklines rendered as inline SVG, not chart libraries
- Reduced-motion fallback image at static/fallbacks/two-sculptures.jpg

Report at sprint end:
- Screenshots: /lab from each refSource (linkedin, github, twitter, default)
- Screenshot: the two-sculptures scene
- Screenshot: experiment cards with real or simulated data
- Screenshot: concluded section with the inconclusive entry visible
- PostHog dashboard showing experiment_vote_cast events from manual testing
- Lighthouse on /lab desktop and mobile
- Bundle size for /lab route

═══════════════════════════════════════════════════════
PART J — IF SPLITTING INTO 7A AND 7B
═══════════════════════════════════════════════════════

If the sprint feels too long, split:

Sprint 7A — page structure + cards + referrer + credibility + methodology
Use Tasks 1-5, 10-13 (skipping 6-9 which are the 3D)
The two-sculptures is replaced with a styled placeholder (similar to Sprint 2's hero placeholder) until 7B
Report at end of 7A: same as above MINUS the 3D scene confirmation

Sprint 7B — the two sculptures 3D
Pre-flight: 7A merged
Use Tasks 6-9 (and the fallback image baking)
The placeholder from 7A gets replaced with the real <TwoSculptures> mount
Report at end of 7B: 3D scene confirmation + bundle size delta
```

---

## Sprint 8 — Polish & Micro-interactions

```
You are pair-programming with Boris on a luxury portfolio site. Sprints 0-7 built the entire functional site — including the signature /lab page. This sprint is the final polish: micro-interactions, loading states, error boundaries, real reduced-motion fallbacks, copy polish, and a complete a11y audit.

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
The details that separate "good" from "remembered." Subtle custom cursor. Sparing scramble text. Soft-lift section transitions. 404 page with sculpture-shatter scene. Real baked reduced-motion fallback images. Loading and error states everywhere they're needed. Complete a11y audit (axe-core: 0 across all routes).

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT
═══════════════════════════════════════════════════════
Every micro-interaction must serve the heritage atelier atmosphere. Resist the urge to add effects for their own sake. The masterplan retired the original "heatmap cursor" idea explicitly because it was performative — the new direction is a near-invisible cursor.

POSITIONING: "Boris builds things of enduring value, and proves it."

ARCHITECTURAL COMMITMENTS:
- Every scene's reduced-motion fallback is a REAL baked screenshot, not a placeholder
- Loading skeletons use shadcn-svelte Skeleton with our tokens
- Error boundaries route to a sculptural error page, not a stack trace
- axe-core passes on every route in CI

STACK:
- Svelte 5 runes
- @threlte/extras for the 404 scene (uses the same root canvas)
- shadcn-svelte Skeleton
- The existing track() helper from Sprint 6

COLOR TOKENS in use:
--bg, --bg-elevated, --surface-paper, --text, --text-muted, --text-subtle, --hairline, --accent, --accent-deep

CUSTOM CURSOR (refined per §7.5 — the heatmap cursor is RETIRED):
- A SMALL filled dot, 6px diameter, in --text color at 70% opacity
- Over interactive elements: grows to 14px and shifts to --accent
- NO trail. NO labels. NO flourish.
- Disabled on touch devices (pointer: coarse media query)
- Disabled on prefers-reduced-motion
- If it ever feels too much, drop it entirely. The default OS cursor against a well-typed page is dignified.

SCRAMBLE TEXT — SPARING USE ONLY:
- Used ONLY on home page section eyebrows (max ~5 instances on home)
- NOT on /work, /work/[slug], /lab, /about, /contact, /writing, /uses
- Effect: characters decode from random to final over 600ms, stagger 20ms per char
- Reduced-motion: just fades in

SECTION TRANSITIONS:
- Soft lift: opacity 0→1 + transform translateY(16px → 0)
- Duration 480ms, cubic-bezier(0.22, 1, 0.36, 1)
- Triggered on IntersectionObserver entry (threshold 0.15)
- Stagger 60ms between sibling reveals
- One transition per route load — once entered, sections don't re-animate on scroll back

FORBIDDEN PATTERNS:
❌ Cursor labels on hover (e.g., "view", "click", "copy") — RETIRED
❌ Cursor trails — RETIRED
❌ Scramble text on more than 5 home eyebrows
❌ Scramble text anywhere outside home
❌ Confetti / particle bursts on form success
❌ Rainbow loading spinners
❌ "Loading..." text on skeletons (use the skeleton shape only)
❌ Stack traces shown to users on error
❌ "Oops! Something went wrong 😬" copy

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
1. Sprints 0-7 merged. CI green.
2. /lab fully working with the two sculptures
3. Hero scene fallback at static/fallbacks/hero-sculpture.jpg exists (Sprint 3 placeholder)
4. Two sculptures fallback at static/fallbacks/two-sculptures.jpg exists (Sprint 7)
5. axe-core in Playwright is configured (Sprint 0 setup)

If any are missing, stop and report.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

PART A — CUSTOM CURSOR (refined, near-invisible)

1. CURSOR COMPONENT — src/lib/components/Cursor.svelte
   Behavior:
   - Mounts only if matchMedia('(pointer: fine)').matches AND !prefers-reduced-motion
   - Hides system cursor on <html>: `cursor: none`
   - position: fixed, top: 0, left: 0, pointer-events: none, z-index: 9999
   - A single absolutely-positioned <div>:
     * Default: 6px circle, background var(--text), opacity 0.7
     * Over interactive elements (a, button, [role=button], input, textarea, select, [data-cursor]): 14px circle, background var(--accent), opacity 0.85
     * Transition all properties 200ms cubic-bezier(0.4, 0, 0.2, 1)
   - On pointermove: update transform: translate(x - 3px, y - 3px) (centered on cursor position)
   - Throttle pointermove with requestAnimationFrame
   - Detect interactive elements: bind a single document-level pointermove listener that checks event.target.closest('a, button, [role=button], [data-cursor]')
   - On document mouseleave: hide; on mouseenter: show
   - Cleanup on unmount restores `cursor: auto`

2. MOUNT
   - In src/routes/+layout.svelte after content, mount <Cursor />
   - Server-safe via {#if browser}

3. EARLY-EXIT IF UNCOMFORTABLE
   - During this sprint, if the cursor at any point feels distracting or causes performance issues, REMOVE IT. Default OS cursor is dignified.
   - Decision criterion: if a colleague viewing the site mentions the cursor (positively OR negatively) within the first 30 seconds, it's too much.

PART B — SCRAMBLE TEXT (SPARING)

4. SCRAMBLE TEXT COMPONENT — src/lib/components/ScrambleText.svelte
   Props:
   - text: string
   - trigger: "inview" | "mount" (default "inview")
   - charset: string (default "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_")
   - duration: number (default 600)
   - stagger: number (default 20)

   Behavior:
   - On trigger:
     * Each character of text reveals on a stagger
     * Before reveal, that position cycles random characters from charset every 60ms
     * After its stagger time elapses, locks to the final char
   - "inview" uses IntersectionObserver, fires once
   - "mount" fires on $effect mount
   - Reduced-motion: fades in over 320ms, no scrambling

5. WIRE INTO HOME EYEBROWS ONLY
   - On / (home), wrap the eyebrow text of these sections in <ScrambleText>:
     * HeroSection (the AvailabilityNote text — ONLY the "AVAILABLE FOR WORK" portion)
     * PracticeSection eyebrow ("01 — THE PRACTICE")
     * SelectedWorkSection eyebrow ("02 — SELECTED WORK")
     * CraftSection eyebrow ("03 — CRAFT")
     * ContactSection eyebrow ("04 — GET IN TOUCH")
   - Total: 5 instances on home. NO others elsewhere on the site.
   - Each fires when section enters viewport, just once per session

PART C — SECTION TRANSITIONS

6. SECTION REVEAL ACTION — src/lib/actions/reveal.ts
   - Svelte 5 action: `use:reveal={{ stagger: number }}`
   - On mount, sets initial state opacity 0, translateY 16px (via inline style)
   - Creates IntersectionObserver with threshold 0.15, rootMargin 0px
   - On entry: applies the transition over 480ms cubic-bezier(0.22, 1, 0.36, 1) — animate opacity to 1, translateY to 0
   - If the use:reveal target has children with [data-reveal-child], applies stagger (60ms × index) to each child's transition-delay
   - Once entered, observer disconnects (no re-trigger on scroll back)
   - Reduced-motion: skips translateY, only fades; duration shortened to 240ms

7. APPLY TO MAJOR SECTIONS
   - Add use:reveal to every section element on /, /about, /work, /work/[slug], /writing, /writing/[slug], /uses, /lab, /contact
   - For sections with sibling elements that should stagger (e.g., FeaturedWork's 3 cards), add data-reveal-child to each card
   - Test on each route: scrolling reveals each section once, no jankiness

PART D — 404 PAGE

8. 404 SCENE — src/lib/three/scenes/ShatterMonogram.svelte
   Concept: a sculptural "B." monogram in alabaster — same material treatment as the hero sculpture — slowly disassembling into floating shards. Cursor proximity disturbs them. They reassemble after 4 seconds of idle.

   Implementation:
   - Geometry: an extruded "B." letterform. Use TextGeometry from three or three-bmfont-text — OR the simpler approach: a ring of small cubes/tetrahedra in a "B" formation (each shard is one cube, ~80 shards total)
   - Each shard has:
     * A "home" position (the assembled state)
     * A "scattered" position (random offset within ±0.6 units, generated once)
     * A current position lerped between home and scattered based on a per-shard scatter value (0 = home, 1 = scattered)
   - Scatter logic:
     * Track mouse 3D position (project from screen)
     * For each shard: compute distance from cursor to shard.home; if < 1.0 unit, shard.scatter += 0.05/frame (max 1)
     * Idle decay: every frame, all shards' scatter -= 0.005 (slowly returns home)
     * When idle > 4s, all shards quickly lerp to scatter = 0
   - Material: same alabaster as hero sculpture
   - Slow rotation of the entire group (~120s per revolution)

9. /404 PAGE — src/routes/+error.svelte
   - This file handles all SvelteKit errors (404, 500, etc.) — discriminate by $page.status
   - Layout (full viewport, centered):
     * Top: small mono breadcrumb "ERROR · {status}"
     * Middle: the <ShatterMonogram /> scene in a sized container (800×800px or aspect 1:1)
     * Below scene: H1 (display serif 56px): "This page failed its A/B test."
     * 16px below: subtitle (body 18px text-muted): "Let's route you somewhere that converted."
     * 32px below: 2-button row
       - Primary "← Home" → /
       - Secondary "See selected work" → /work
     * 64px below buttons: mono caption text-subtle:
       "Status: {status} · Experiment concluded · Sample size: 1"
   - On 500 errors: keep the same scene; subtitle changes to "The server is having a moment. Reload, or try one of these:"
   - Sentry capture (already wired Sprint 6 via handleError)

PART E — REAL REDUCED-MOTION FALLBACK IMAGES

10. BAKE PROCESS — manual or scripted
    - In dev with the hero scene rendering, capture a high-quality screenshot at the alabaster mid-rotation state
    - Save as static/fallbacks/hero-sculpture.jpg, ~1600×1600 (matches hero placeholder aspect), JPEG quality 80, target ≤80KB
    - Repeat for the two-sculptures scene (capture both visible) → static/fallbacks/two-sculptures.jpg, ~1920×1080, ≤120KB
    - Repeat for the shatter monogram in its assembled state → static/fallbacks/shatter-monogram.jpg, ≤80KB
    - Optional: a second hero variant in brass tone → static/fallbacks/hero-sculpture-brass.jpg
    - Update the fallback components in HeroSection.svelte (Sprint 3) and /lab (Sprint 7) and /404 (this sprint) to point at the real images
    - Document the bake process in static/fallbacks/README.md — when materials change in 3D code, re-bake

11. VERIFY
    - In DevTools → Rendering → Emulate CSS prefers-reduced-motion: reduce
    - Reload /, /lab, /404
    - Each should show its real baked image, NO canvas mounted, layout unchanged
    - Each fallback image has descriptive alt text:
      * hero-sculpture.jpg: "A warm-toned alabaster sculptural form, slowly rotating in studio light"
      * two-sculptures.jpg: "Two sculptural forms side by side: marble on the left, brass on the right"
      * shatter-monogram.jpg: "A sculptural 'B.' monogram in a state of quiet dissolution"

PART F — LOADING STATES

12. SKELETONS WHERE NEEDED
    - /lab during stats fetch (the experiment cards' stats row): show shadcn Skeleton bars matching the stats line dimensions
    - Image loading (Sanity images on /work, /work/[slug], /writing/[slug], /lab): use Sanity's LQIP base64 blur placeholder. Implementation:
      * Helper getLqip(source) (Sprint 1) returns the LQIP base64 string
      * In <img>, set background-image to the LQIP, blurred via filter
      * On load (use Image.decode() promise), transition the background to nothing
      * 480ms fade
    - Form submissions (/contact): button shows a subtle gold pulse animation on submitting (already wired Sprint 5)
    - Page transitions (route changes): SvelteKit's afterNavigate fires reveal animations naturally; no extra loading skeleton needed

13. SKELETON STYLING
    - Background: var(--bg-elevated)
    - Subtle pulse animation: opacity 0.5 → 0.8 → 0.5 over 1.6s (cubic-bezier 0.4, 0, 0.2, 1)
    - 1px var(--hairline) outline (suggests "this will be a card" without committing)
    - --radius
    - NO "Loading..." text. NO spinning indicators. The shape is the indicator.

PART G — ERROR BOUNDARIES

14. SVELTEKIT +error.svelte (already created in PART D for 404)
    Already handles all errors. Ensure:
    - 404: shatter monogram, "failed its A/B test" copy
    - 500+: shatter monogram, "server is having a moment" copy
    - Errors are captured by Sentry (handleError from Sprint 6 ensures this)
    - User context attached (PostHog distinctId via handleError extension)

15. RESEND FAILURE FALLBACK ON /CONTACT
    - Already wired Sprint 5 — verify the friendly "Could not send. Please email directly: [email]" message renders when Resend errors
    - The error message includes the boris@ email pulled from settings.contactEmail

16. POSTHOG STATS API FAILURE ON /LAB
    - Already wired Sprint 7 — verify experiment cards render with "Stats temporarily unavailable" mono caption when the API call fails
    - Card layout, hypothesis, summary, sparkline absence all degrade gracefully

PART H — COPY POLISH

17. FULL READ-THROUGH
    - Read every visible string on every route
    - Cross-reference with §4 of the masterplan (copy drafts) and the brand voice in §1.4
    - Check microcopy on buttons against the §4.4 microcopy bank:
      * Primary CTAs: "See selected work →", "Begin a conversation", "Start a project" (no — REMOVED), "About the practice"
      * Secondary: "Read the full case study", "Visit the Lab", "Copy email", "Book 20-min call"
      * NEVER: "Submit", "Click here", "Learn more", "Get in touch fast", "Hire me!"
    - Check error messages: no exclamation marks, no "Oops!", no "Something went wrong 😬"
    - Check loading text: no "Loading..." (skeleton-only)
    - Check empty states: confident, not apologetic ("No notes yet." not "Sorry, no posts!")

18. FOOTER TIMESTAMP
    - Verify the footer's "Last deployed [TIMESTAMP]" interpolates the real build time
    - If using Vite define, verify it updates per build

19. SETTINGS-DRIVEN COPY
    - Verify availabilityNote pulls from Sanity (change in Studio, redeploy or hot-reload, see update)

PART I — ACCESSIBILITY AUDIT

20. AXE-CORE ON EVERY ROUTE (Playwright)
    - Add a Playwright spec: tests/a11y.spec.ts
    - Iterate: ['/', '/about', '/work', '/work/toyota-lexus-funnel', '/writing', '/uses', '/lab', '/contact']
    - For each: page.goto(route), inject axe-core, run axe.run, assert violations.length === 0
    - Configure axe rules: WCAG 2.2 AA, exclude best-practice rules that don't apply

21. KEYBOARD AUDIT (manual)
    - Tab through every route:
      * Skip-to-content link works
      * Every interactive element reachable
      * Focus ring visible (2px var(--accent), 2px offset)
      * No focus traps (except in the contact form during submission, which is intentional)
      * Escape closes any open Dialog/Sheet/Toast
    - Document any deviation in docs/a11y-notes.md

22. SCREEN READER SPOT CHECK (VoiceOver on macOS, or NVDA on Windows)
    - Home: headings announced in order, sculpture has aria-label, skip-link works
    - /work/[slug]: case study reads as an article; landmarks present
    - /contact: form labels and errors announce correctly
    - /lab: experiment cards announce as articles, sparklines have descriptive aria-labels

23. CONTRAST VERIFICATION
    - Verify --text on --bg meets 4.5:1 (test with a browser DevTools accessibility panel)
    - Verify --text-muted on --bg meets 4.5:1 (this is most likely to fail — it's intentionally muted)
    - Verify --accent on --bg-elevated meets 4.5:1 for text use (button labels)
    - If --accent on --bg-elevated fails: bump --accent-deep slightly lighter (e.g., oklch 0.65 instead of 0.62) for the text-on-button case ONLY; keep the rule/halo accent at 0.78 for atmosphere

PART J — COMMIT

24. FINAL VERIFICATION
    - bun check, bun build, bun test, bun exec playwright test (including a11y) all green
    - Lighthouse on every route: ≥ 95 desktop / ≥ 85 mobile (except /lab which is ≥ 90 / ≥ 80)
    - Bundle sizes: home ≤ 400KB, /work ≤ 350KB, /work/[slug] ≤ 350KB, /about ≤ 300KB, /contact ≤ 250KB, /writing ≤ 250KB, /lab ≤ 450KB, /uses ≤ 200KB

25. COMMIT
    - `feat(polish): cursor, scramble eyebrows, section reveals, 404 shatter scene, real fallbacks, loading + error states, full a11y pass`

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════

Cursor:
✓ Cursor is 6px default, 14px on hover, NEVER labels or trails
✓ Disabled on touch devices (verify by inspecting on mobile)
✓ Disabled under reduced-motion
✓ If it feels distracting at any point: removed entirely (acceptable)

Scramble text:
✓ Used ONLY on 5 home page eyebrows. Search the codebase: any <ScrambleText> outside /+page.svelte should be a deliberate call-out.
✓ Effect is perceptible but not distracting
✓ Reduced-motion shows simple fade-in instead

Section transitions:
✓ Every major section reveals once on scroll-in
✓ Stagger 60ms between siblings (visible on FeaturedWork's 3 cards)
✓ Once revealed, no re-animation
✓ Reduced-motion: no translateY, opacity-only, 240ms

404 page:
✓ Shatter monogram scene renders via the same root canvas
✓ Reduced-motion fallback shows the baked screenshot
✓ Copy is exactly: "This page failed its A/B test." / "Let's route you somewhere that converted." / "Status: 404 · Experiment concluded · Sample size: 1"
✓ NO "Oops!", NO emoji, NO friendly mascot

Reduced-motion fallbacks:
✓ All baked images are real screenshots, not placeholder rectangles
✓ Each has descriptive alt text
✓ File sizes within target (≤80KB hero, ≤120KB two sculptures, ≤80KB shatter)
✓ Toggling prefers-reduced-motion in DevTools shows the static images everywhere applicable

Loading states:
✓ Skeletons use shadcn Skeleton with our tokens
✓ NO "Loading..." text anywhere
✓ Sanity images blur up from LQIP, transition 480ms
✓ Form submission shows subtle gold pulse on submit button

Error states:
✓ /404 and /500 both route to +error.svelte with shatter scene
✓ Resend failure on /contact shows friendly fallback with email
✓ PostHog API failure on /lab shows "Stats temporarily unavailable" — cards still readable
✓ Sentry captures all errors with sourcemap context

Copy polish:
✓ No "Submit", no "Click here", no "Learn more"
✓ No exclamation marks in error messages
✓ No emoji in error or loading copy
✓ Empty states confident, not apologetic
✓ Footer timestamp interpolates correctly
✓ All copy aligns with §1.4 brand voice

Accessibility:
✓ axe-core: 0 violations on every route in CI
✓ Keyboard tab order logical on every route
✓ Skip-to-content link works
✓ Focus ring visible everywhere
✓ All 3D scenes have aria-label and skip-link
✓ Form fields have proper Label associations and error announcements
✓ Color contrast verified ≥ 4.5:1 for text, 3:1 for large text
✓ Screen reader spot check passes on /, /work/[slug], /contact, /lab

Forbidden patterns absent:
✓ No cursor labels (e.g., "view", "click")
✓ No cursor trails
✓ No scramble text outside home
✓ No "Loading..." text
✓ No emoji in error states
✓ No stack traces shown
✓ No confetti / particles on success
✓ No rainbow spinners
✓ No 5+ scramble eyebrows on home

Code:
✓ Svelte 5 runes throughout
✓ TypeScript strict
✓ All actions cleaned up properly (observers disconnected, listeners removed)
✓ No memory leaks in 3D scenes (geometries/materials disposed on unmount)

THE OPULENCE CHECK:
✓ Visual noise across all routes: ≤ 2 / 10 (polish should reduce noise, not add it)
✓ Warmth: ≥ 8 / 10 throughout (still)
✓ The cursor, transitions, and scramble effects feel inevitable when present — like they were always part of the design
✓ When reduced-motion is active, the experience is COMPLETE, not degraded — the static images are dignified

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask if:
- The cursor adds visible performance cost (test FPS in Chrome DevTools Performance tab; if frame drops > 5%, remove)
- Scramble text is being applied to more than 5 home eyebrows. Trim.
- Scramble text is creeping onto other routes. Remove.
- A cursor label or trail is being added back. Remove.
- The 404 shatter scene pushes the /404 route past 250KB. Tier down (fewer shards).
- A "Loading..." text is being added to a skeleton. Remove.
- A friendly mascot or emoji appears in error copy. Remove.
- axe-core violations appear on any route — these MUST be fixed before sprint close.
- Color contrast fails for --text-muted on --bg below 4.5:1. Bump --text-muted lightness slightly (preserve the warm tone — change L only, not C or H).
- A baked fallback image looks like a placeholder rectangle. Re-bake.

═══════════════════════════════════════════════════════
RECOVERY PROMPT
═══════════════════════════════════════════════════════
"This polish output has drifted toward decorative effects rather than considered details. Re-anchor:
§1.2 — Boris builds things of enduring value, and proves it.
§5.7 — Every motion has a reason. If you can't name it in a sentence, cut it.
§7.5 — Cursor is a small dot. NO labels. NO trails.
§7.6 — Section transitions are SOFT — fade + 16px lift, 480ms. NEVER curtain dissolves or shader wipes.

Identify the drift: did cursor labels return? Did scramble text spread off home? Did a confetti animation appear on form success? Did a friendly emoji creep into an error state? Revert. Run the Design Quality Gate. Resume."

═══════════════════════════════════════════════════════
HANDOFF NOTE TO SPRINT 9
═══════════════════════════════════════════════════════
Sprint 9 expects to inherit:
- A complete site with polished micro-interactions and full a11y compliance
- Custom cursor working OR removed (either is acceptable — document the decision)
- Section reveals on every route
- 404 page with shatter scene
- Real baked reduced-motion fallback images for every 3D scene
- Loading skeletons where appropriate (image LQIP, /lab stats)
- Error boundaries routing to +error.svelte gracefully
- Copy polish complete — every visible string aligned with §4 and §1.4
- axe-core: 0 violations across every route in CI
- Color contrast verified

Report at sprint end:
- Screen recording of cursor + transitions on /
- Screenshots: /404, reduced-motion / and /lab, /contact with Resend failure state, /lab with PostHog failure state
- axe-core CI run output (all routes)
- Lighthouse summary for every route (desktop + mobile)
- Final bundle sizes per route
```

---

## Sprint 9 — Performance & Launch

````
You are pair-programming with Boris on a luxury portfolio site. Sprints 0-8 produced a feature-complete, polished, a11y-clean portfolio. This sprint ships it. Performance discipline. SEO finalization. DNS, SSL, monitoring. First experiment live in PostHog at launch.

═══════════════════════════════════════════════════════
SPRINT GOAL
═══════════════════════════════════════════════════════
Bundle analysis and trim. Image pipeline finalized. Font subsetting and preload. Per-page OG images via Satori. Sitemap + robots. Redirects. Vercel env vars. DNS + SSL. Sanity → Vercel webhook. Cross-browser sweep. Launch with at least one live experiment in PostHog.

═══════════════════════════════════════════════════════
EMBEDDED CONTEXT
═══════════════════════════════════════════════════════
Launch day is not new features. It's elimination of bugs, regressions, waste, and rough edges. Assume a technical audience will read the page source. Optimize accordingly.

POSITIONING: "Boris builds things of enduring value, and proves it."

ARCHITECTURAL COMMITMENTS:
- Every prerendered route ships as static HTML at build
- /lab uses ISR (5-min cache)
- /studio is excluded from sitemap and robots-disallowed
- Per-page OG images generated via Satori + Resvg at build (or on-demand for /lab)
- Sanity → Vercel deploy hook on content publish

STACK additions for this sprint:
- @vercel/og (uses Satori under the hood) for OG image generation
- vite-bundle-visualizer (or @rollup/plugin-visualizer)
- @lhci/cli (already configured Sprint 0)

PERFORMANCE BUDGETS (final, non-negotiable):
- LCP: < 2.0s on 4G mobile
- INP: < 200ms
- CLS: < 0.05
- TTFB: < 400ms (except /lab which is < 600ms due to PostHog API)
- JS gzipped on /: ≤ 400KB
- Lighthouse: ≥ 95 desktop / ≥ 85 mobile (except /lab: ≥ 90 / ≥ 80)

FORBIDDEN PATTERNS at launch:
❌ Console errors or warnings on any route
❌ 404s on internal links (verify with a link checker)
❌ Mixed-content warnings (HTTP assets on HTTPS pages)
❌ External scripts beyond PostHog (eu.i.posthog.com) and Sentry (*.sentry.io)
❌ Sourcemaps exposed in production (must be uploaded to Sentry, then served as private)
❌ /studio in sitemap.xml or robots-allow
❌ "Coming soon" placeholders anywhere
❌ Dev-only debug components rendering in production

═══════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST
═══════════════════════════════════════════════════════
1. Sprints 0-8 merged. CI green.
2. Site visually complete on staging or local
3. Sanity dataset has finalized content (Boris has reviewed all copy in Studio)
4. PostHog has at least one running experiment configured
5. Sentry project ready
6. Vercel account connected to repo
7. Domain purchased and DNS access ready (Boris's responsibility — confirm)
8. resend.com domain verified (DKIM, SPF) for the production email sender — check before sprint
9. Resume PDF uploaded to Sanity settings.resumeFile (placeholder if Boris hasn't finalized)

If any are missing, stop and report. DNS access and Sanity content are the most likely blockers.

═══════════════════════════════════════════════════════
EXPLICIT STEP-BY-STEP TASKS
═══════════════════════════════════════════════════════

PART A — BUNDLE ANALYSIS & OPTIMIZATION

1. INSTALL VISUALIZER
   - `bun add -D vite-bundle-visualizer
   - Add script: `"analyze": "vite-bundle-visualizer"`
   - Run `bun run analyze`

2. AUDIT
   - Identify the top 5 largest chunks per route
   - For each, ask:
     * Is it loaded synchronously when it could be deferred?
     * Is there a tree-shaking opportunity?
     * Is there a lighter alternative?
   - Likely targets:
     * three.js core: verify it's only loaded when a 3D scene mounts (dynamic import)
     * @sentry/sveltekit: check if the full client SDK is needed; consider lite version if available
     * shadcn-svelte components: ensure unused ones aren't bundled (verify by importing only what's used)

3. CODE-SPLIT FURTHER
   - The Threlte/three chunk should be its own asset, loaded only on routes that mount a scene
   - ParticleField is its own dynamic chunk
   - HeroScene is its own dynamic chunk
   - TwoSculptures is its own dynamic chunk
   - ShatterMonogram is its own dynamic chunk
   - Verify each is split via Network tab on first paint

4. ROUTE-LEVEL TARGETS
   - /: ≤ 400KB gzipped total JS
   - /about: ≤ 250KB
   - /work: ≤ 300KB
   - /work/[slug]: ≤ 350KB (includes Shiki)
   - /writing: ≤ 200KB
   - /writing/[slug]: ≤ 300KB
   - /lab: ≤ 450KB (highest — has the heaviest 3D + data)
   - /contact: ≤ 250KB
   - /uses: ≤ 150KB
   - /404: ≤ 300KB

PART B — IMAGE PIPELINE

5. SANITY IMAGE FINAL TUNING
   - Every <img> from Sanity uses urlFor with:
     * `?auto=format` (Sanity serves WebP / AVIF when supported)
     * Appropriate widths for srcset (e.g., 800, 1200, 1600, 2400)
     * Quality 80 by default, 75 for below-fold
   - Above-the-fold images: fetchpriority="high", loading="eager"
   - Below-the-fold: loading="lazy"
   - Every image has LQIP base64 blur placeholder via getLqip helper (Sprint 1)

6. KTX2 HDRI
   - Verify static/hdri/studio-warm.ktx2 is ≤ 300KB
   - If above, re-compress with stricter Basis settings
   - Document attribution in static/hdri/README.md

7. STATIC FALLBACK IMAGES
   - Verify static/fallbacks/*.jpg are properly compressed:
     * hero-sculpture.jpg ≤ 80KB
     * two-sculptures.jpg ≤ 120KB
     * shatter-monogram.jpg ≤ 80KB

8. FAVICON SUITE
   - Generate from a single 512×512 source (use realfavicongenerator.net or similar):
     * favicon.ico (multi-resolution: 16, 32, 48)
     * favicon.svg (preferred for modern browsers — a clean monogram "B." in --accent on transparent)
     * apple-touch-icon.png (180×180)
     * android-chrome-192x192.png, android-chrome-512x512.png
     * site.webmanifest with name, short_name, theme_color (--bg), background_color (--bg)
   - Place in /static/
   - Reference all in src/app.html via appropriate <link> tags

PART C — FONT OPTIMIZATION

9. SUBSET LATIN ONLY
   - @fontsource-variable/inter and @fontsource-variable/jetbrains-mono support Latin subset by default; verify by inspecting the .woff2 files served (should be the latin subset, not the full file)
   - For Instrument Serif (or PP Editorial New if used): ensure only the Latin subset is loaded

10. FONT-DISPLAY: SWAP
    - Verify all @font-face declarations use font-display: swap (override @fontsource defaults if needed via custom @font-face in src/app.css)

11. PRELOAD CRITICAL FONTS
    - In src/app.html, preload only the display-font weight used in H1 (or H2 if H1 is rare):
      <link rel="preload" href="/fonts/instrument-serif-regular.woff2" as="font" type="font/woff2" crossorigin>
    - Inter and JetBrains Mono load on demand (no preload — they're not LCP-critical)

PART D — SEO META AND OG IMAGES

12. PER-ROUTE META AUDIT
    - Verify every route has:
      * <title> (≤ 60 chars)
      * <meta description> (≤ 155 chars)
      * <link rel="canonical">
      * Open Graph: og:title, og:description, og:image, og:type, og:url
      * Twitter card: twitter:card="summary_large_image", twitter:title, twitter:description, twitter:image
    - Use a small `<SEO />` Svelte component to centralize this
    - Test with metatags.io (paste production URL after launch)

13. JSON-LD SCHEMAS
    - Home: Person (use settings.contactEmail, sameAs from socialLinks, knowsAbout from skills)
    - /about: ProfilePage extending Person
    - /work/[slug]: CreativeWork with author, datePublished, image, description
    - /writing/[slug]: Article with author, datePublished, image, headline, articleBody (truncated)
    - /lab: WebPage with about: "Conversion Rate Optimization methodology"
    - All subpages: BreadcrumbList
    - Validate with Google's Rich Results Test (paste production URL after launch)

14. PER-PAGE OG IMAGE GENERATION
    - Install: `bun add @vercel/og`
    - Create src/routes/api/og/[type]/[slug]/+server.ts
      * type ∈ ['default', 'work', 'writing']
      * For 'default': render site-wide OG (monogram, headline, "Boris — Skopje")
      * For 'work/{slug}': render with project title, primary metric, monogram
      * For 'writing/{slug}': render with post title, date, monogram
    - Design (1200×630):
      * Background: --bg with subtle gold gradient corner accent
      * Top-left: monogram "B." in display serif 64px in --text
      * Center: title in display serif 56px line-height 1.1, max 3 lines
      * Bottom-left for /work: metric in display serif 96px (e.g., "+15%") with mono label
      * Bottom-right: a 1px gold rule and "BORIS — SKOPJE" mono uppercase 14px
    - Use Satori with Inter and Instrument Serif (Satori needs font files passed as arrays of arraybuffers)
    - Cache headers: max-age 604800 (1 week)
    - Update each route's og:image meta to point at the appropriate API endpoint
    - For /lab and /contact: use the default OG (no per-page generation needed)

15. STATIC FALLBACK OG
    - Save a high-quality static OG at /static/og-default.png as a backup
    - Used if the dynamic OG endpoint ever fails

PART E — SITEMAP, ROBOTS, FEEDS

16. SITEMAP — src/routes/sitemap.xml/+server.ts
    - export const prerender = true
    - Generate a sitemap including:
      * All static routes: /, /about, /work, /writing, /uses, /lab, /contact (NOT /404, NOT /studio, NOT /style-guide)
      * All /work/[slug] from Sanity getAllProjects
      * All /writing/[slug] from Sanity getAllPosts
    - Include lastmod dates from Sanity _updatedAt

17. ROBOTS — src/routes/robots.txt/+server.ts
    - export const prerender = true
    - Content:
      ```
      User-agent: *
      Allow: /
      Disallow: /studio
      Disallow: /api/
      Disallow: /style-guide

      Sitemap: {PUBLIC_SITE_URL}/sitemap.xml
      ```

18. RSS FEED
    - Already created Sprint 5 at /writing/rss.xml/+server.ts
    - Verify it generates valid RSS 2.0 (paste output into a validator)
    - Link from /writing index page in <head>: <link rel="alternate" type="application/rss+xml" href="/writing/rss.xml">

PART F — REDIRECTS

19. REDIRECTS in svelte.config.js or hooks.server.ts
    - /resume → /resume.pdf (serves Sanity settings.resumeFile)
    - /cv → /resume.pdf
    - Trailing-slash normalization: SvelteKit's adapter handles this; verify in production (e.g., /work/ → /work)
    - www → apex: configured at DNS or Vercel level

20. RESUME PDF SERVING
    - Create src/routes/resume.pdf/+server.ts that fetches the Sanity settings.resumeFile asset URL and proxies it (or 302-redirects to the Sanity asset URL directly)
    - Set Content-Disposition header: 'inline; filename="boris-cv.pdf"'

PART G — VERCEL ENV VARS

21. CONFIGURE PRODUCTION ENV (in Vercel dashboard, NOT .env)
    - PUBLIC_SANITY_PROJECT_ID
    - PUBLIC_SANITY_DATASET = "production"
    - SANITY_API_READ_TOKEN (viewer token — NOT the write token used in seed)
    - PUBLIC_POSTHOG_KEY
    - POSTHOG_PERSONAL_API_KEY
    - PUBLIC_SENTRY_DSN
    - SENTRY_AUTH_TOKEN (build-time secret for sourcemap upload)
    - RESEND_API_KEY
    - PUBLIC_SITE_URL = "https://boris.example.dev" (final domain)
    - For Preview environments (PR deploys): set the same values, plus PUBLIC_SITE_URL pointing at the Vercel-generated preview URL

22. ENV VAR DOCUMENTATION
    - Update README.md with a table of all env vars, their source, and whether public/private/build-time

PART H — DNS, SSL, DOMAIN

23. CUSTOM DOMAIN
    - In Vercel: add custom domain (apex + www)
    - Add A or ALIAS record at DNS host pointing to Vercel
    - Add CNAME for www → apex (or vice versa, depending on DNS provider)
    - Wait for SSL provisioning (usually < 5 min)
    - Verify https://[domain] loads with valid certificate

24. WWW REDIRECT
    - In Vercel domain settings, set www to redirect to apex (or vice versa, Boris's preference)

PART I — SANITY → VERCEL WEBHOOK

25. CREATE WEBHOOK
    - Vercel: settings → Git → create "Deploy Hook" for the production branch, copy URL
    - Sanity dashboard: API → Webhooks → Create
    - Filter: `_type in ["project","testimonial","post","settings","experiment"]`
    - URL: paste Vercel deploy hook
    - Trigger: create, update, delete
    - HTTP method: POST
    - Test: edit a project in Studio and publish; verify Vercel triggers a build

PART J — MONITORING

26. SENTRY ALERTS
    - In Sentry dashboard:
      * Alert: error rate > 1/min for any route → email Boris
      * Alert: P95 server response time > 1s → email Boris
      * Alert: any new error type (first occurrence) → email

27. POSTHOG DASHBOARDS
    - Build (in PostHog UI):
      * Conversion funnel: page_view (/) → hero_cta_clicked → project_card_opened → contact_cta_clicked → contact_form_submitted
      * Per-experiment results dashboards
      * Web Vitals trend (LCP, INP, CLS over time)
      * Daily unique visitors
      * Top pages
      * Top referrers (truncated for privacy)

28. UPTIME MONITORING
    - UptimeRobot (free tier): ping the home page every 5 min, alert via email/Slack on downtime > 2 min

PART K — CROSS-BROWSER VERIFICATION

29. MANUAL TEST MATRIX
    - Safari macOS (latest, latest -1)
    - Safari iOS (latest, on real device or simulator)
    - Chrome (latest)
    - Firefox (latest)
    - Edge (latest)
    - Per browser, verify on production URL:
      * Home loads, hero sculpture renders (or static fallback on iOS Safari if WebGL is degraded)
      * /work loads, filter works, all 6 cards render
      * /work/[slug] loads, hero image loads, BIG METRIC renders, body prose renders, code blocks render
      * /about loads, timeline renders
      * /contact loads, form submits successfully (test with a real submission, verify email received)
      * /writing loads
      * /lab loads, two sculptures render or fallback, experiment cards render
      * Console: zero errors or warnings on every page

30. DOCUMENT ANY KNOWN LIMITATIONS
    - In docs/launch-known-issues.md: list any browser-specific quirks acceptable at launch (e.g., "iOS Safari shows static hero fallback due to WebGL context limits — acceptable degradation")

PART L — FIRST EXPERIMENT LIVE

31. CONFIRM AT LEAST ONE RUNNING EXPERIMENT
    - In PostHog: verify "lab-sculpture-test" (or whichever flag drives the two-sculptures piece) is set to ACTIVE, not DRAFT
    - Verify in Sanity: the corresponding experiment doc has status="running"
    - Visit production /lab: verify the experiment card renders with "n=0, just launched · not yet significant" cleanly

32. COMMUNICATE TRACKING TRANSPARENTLY
    - The /lab methodology section already explains tracking
    - The consent banner explains it briefly
    - Verify both render correctly on production

PART M — FINAL CHECKS

33. PRODUCTION SMOKE TEST
    - With production URL live:
      * All routes return 200 (verify with: bun run build && bun run preview)
      * /studio returns Sanity Studio (verify with Boris's Sanity login)
      * /sitemap.xml returns valid XML with all expected URLs
      * /robots.txt returns expected content
      * /resume → /resume.pdf works (or 302s correctly)
      * og:image for / loads as a real image
      * og:image for /work/toyota-lexus-funnel loads with the +15% metric
      * Form submission on /contact delivers email to Boris's inbox
      * Sentry test error captures (deliberately trigger one and verify in dashboard)
      * PostHog events fire (after consent) and appear in dashboard

34. POST-LAUNCH COMMUNICATION
    - DRAFT (do not send yet) launch posts:
      * Twitter/X: short announcement linking /lab specifically (the differentiator)
      * LinkedIn: longer-form, mentioning the dev + CRO duality
      * Personal network: email or DM
    - Boris reviews and sends after the smoke test passes

35. TAG AND DEPLOY
    - git tag -a v1.0.0 -m "Portfolio launch"
    - git push origin v1.0.0
    - Verify production deploy is on the tagged commit

═══════════════════════════════════════════════════════
DESIGN QUALITY GATE (this sprint's scope)
═══════════════════════════════════════════════════════

Performance:
✓ Lighthouse desktop ≥ 95 on /, /about, /work, /work/[slug], /writing, /uses, /contact
✓ Lighthouse desktop ≥ 90 on /lab
✓ Lighthouse mobile ≥ 85 on all (≥ 80 on /lab)
✓ LCP < 2s, INP < 200ms, CLS < 0.05 across all routes
✓ Bundle sizes within budget per route (PART A targets)
✓ Three.js, Threlte, scenes all in separate dynamic chunks (verify Network tab)

Image pipeline:
✓ Every Sanity image uses urlFor with auto=format and srcset
✓ LQIP blur on every above-the-fold image
✓ HDRI ≤ 300KB
✓ Static fallbacks within target sizes
✓ Favicon suite complete: .ico, .svg, apple-touch-icon, android, webmanifest

Fonts:
✓ All faces font-display: swap
✓ Latin subset only
✓ Display font preloaded; body and mono load on demand
✓ No FOIT (test on Slow 3G with cache disabled)

SEO:
✓ Every route has title, description, canonical, OG, Twitter card
✓ JSON-LD validates on Google Rich Results Test
✓ Sitemap includes all expected routes, NO /studio, NO /style-guide, NO /api
✓ robots.txt disallows /studio, /api, /style-guide
✓ Per-page OG images render correctly for /work/[slug] and /writing/[slug]
✓ Default OG renders for /, /about, /lab, /contact, /writing, /uses

Redirects:
✓ /resume → /resume.pdf works
✓ /cv → /resume.pdf works
✓ Trailing-slash normalization (verify /work/ → /work)
✓ www → apex (or apex → www, whichever Boris chose)

Vercel:
✓ All env vars set in production AND preview environments
✓ Custom domain configured with valid SSL
✓ Sanity webhook triggers builds on content publish

Monitoring:
✓ Sentry alerts configured
✓ PostHog dashboards built
✓ UptimeRobot pinging

Cross-browser:
✓ Zero console errors or warnings on production in Safari (macOS + iOS), Chrome, Firefox, Edge
✓ All routes render correctly in all 5 browsers
✓ Form submission works in all 5
✓ Known limitations documented

Launch artifact:
✓ At least one running experiment in PostHog at launch
✓ /lab on production renders that experiment cleanly with "n=0, just launched"
✓ Footer timestamp shows the launch deploy time
✓ /404 works (test by visiting a nonexistent path)

Forbidden patterns absent:
✓ No console errors / warnings anywhere in production
✓ No 404s on internal links (run a link checker over the live site)
✓ No mixed-content warnings
✓ No third-party scripts beyond PostHog (eu.i.posthog.com) and Sentry
✓ No exposed sourcemaps in production
✓ No "Coming soon" placeholders
✓ No /studio in sitemap or robots-allow
✓ No dev components rendering in production

THE OPULENCE CHECK (final, pre-launch):
✓ Visit production URL fresh. First impression: composed, considered, calm — NOT "tech demo," NOT "agency template."
✓ Visual noise on / : ≤ 2 / 10
✓ Warmth on / : ≥ 8 / 10
✓ The site reads as one cohesive practice across every route
✓ The /lab page makes the methodology claim believable
✓ Boris would be comfortable sharing this with any client at any tier

═══════════════════════════════════════════════════════
STOP-AND-ASK CONDITIONS
═══════════════════════════════════════════════════════
Pause and ask if:
- Any Lighthouse score is below budget. Investigate before launch — don't ship a regression.
- DNS propagation is slow (>30 min). Check DNS provider's TTL and ask before assuming launch is delayed.
- SSL fails to provision within 30 min of DNS change. Verify DNS records.
- Resend domain isn't verified for the production sender. Do not launch /contact form until DKIM/SPF are valid.
- The Sanity webhook causes a deploy loop (a build that mutates Sanity, triggering another build). Disable webhook temporarily and investigate.
- Per-page OG generation has cold-start performance issues. Cache aggressively or pre-generate at build instead.
- Any route has console errors in production that didn't appear in dev. Investigate before launch.
- /studio appears in sitemap or is allowed in robots. Fix immediately.
- A "Coming soon" placeholder is on any visible page. Either ship the feature or remove the page.
- The first experiment in PostHog isn't actually live (still in DRAFT). Activate before announcing.

═══════════════════════════════════════════════════════
RECOVERY PROMPT
═══════════════════════════════════════════════════════
"This launch checklist is incomplete. Re-anchor:
§14 — Performance budgets are not negotiable.
§15 — Deployment ops include monitoring, webhook, DNS, SSL, env vars.
§18 — Launch metrics include /lab CTR ≥ 8% from home, ≥ 1 inbound inquiry within 90 days.

Identify the missing link: missing env var? Missing OG image? Console error in production? Missing webhook? /studio leaking into sitemap? Sentry not capturing? PostHog experiment in DRAFT? Verify each item in the Design Quality Gate. Do not tag v1.0.0 until ALL pass."

═══════════════════════════════════════════════════════
HANDOFF NOTE — POST-LAUNCH
═══════════════════════════════════════════════════════
After launch, the site enters maintenance mode. Expect Boris to:
- Monitor PostHog and Sentry daily for the first week, weekly thereafter
- Run a new experiment every 2 weeks (configured in PostHog + matching Sanity doc)
- Add a new case study every month (publish via Studio, webhook triggers rebuild)
- Add a /writing post when the impulse strikes
- Review /lab CTR from home weekly — if below 8% after 60 days, strengthen the whisper

The repo at v1.0.0 is the canonical launch artifact. Future changes go through PRs with the same CI gates.

Report at sprint end:
- Production URL
- Final Lighthouse summary for every route (desktop + mobile)
- Final bundle size breakdown per route
- Screenshots: every major route on production
- Confirmation: SSL valid, sitemap valid, robots correct, OG images render, form delivers email, Sentry captures, PostHog receives events, first experiment live
- Tag v1.0.0 pushed
- Any known issues documented in docs/launch-known-issues.md
- Boris's launch-day checklist for sharing the announcement
````

---

_End of Sprints 6-9. Combined with the earlier document (Sprints 0-5), this completes the ten-sprint Claude Code prompt suite for the Boris Portfolio project._
