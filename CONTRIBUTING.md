# Contributing

## Commit convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add work case study card component
fix: correct gold rule baseline alignment
chore: update dependencies
docs: update sprint 2 prompt
```

Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`.

## Sprint rule

One sprint per session. Each sprint prompt lives in `docs/masterplan-prompts.md`.
Do not mix sprint work — complete the current sprint fully before starting the next.

## Code rules

- Svelte 5 runes only — no `$:`, no `export let`, no `on:click` as prop
- TypeScript strict, zero `any`
- All colours via CSS custom properties — never hex/rgb literals in component files
- No gradient buttons, no glassmorphism, no `rounded-full` CTAs
- Mono font (`--font-mono`) for labels and code only — never body prose
