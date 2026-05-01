# Boris Tadirov — Portfolio

Heritage atelier portfolio. Quiet, considered, built to last.

## Stack

- **SvelteKit 2 + Svelte 5** (runes only — `$state`, `$derived`, `$effect`, `$props`)
- **TypeScript** everywhere
- **Tailwind CSS v4** — CSS `@theme` blocks, no `tailwind.config`
- **shadcn-svelte** — custom-themed to the luxury palette
- **Threlte 8** (`@threlte/core` + `@threlte/extras`)
- **Sanity v3** — CMS, Studio at `/studio`
- **PostHog** — EU cloud analytics
- **Sentry** — error tracking
- **Bun** — package manager and runtime
- **Vercel** — deployment

## Local development

```bash
bun install
bun dev
```

## Environment variables

Copy `.env.example` to `.env` and fill in the values.

## Documentation

See [`docs/masterplan.md`](docs/masterplan.md) for the full project spec and sprint plan.

## Sprints

Each sprint is one session. Progress is tracked in [`docs/masterplan-prompts.md`](docs/masterplan-prompts.md).
