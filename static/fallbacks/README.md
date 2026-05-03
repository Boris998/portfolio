# Reduced-Motion Fallback Images

These images are shown instead of the live 3D scene when the visitor has
`prefers-reduced-motion: reduce` enabled, or when the browser cannot run WebGL.

## hero-sculpture.jpg

A screenshot of the hero sculpture at the alabaster material state (scroll top,
warm ivory color, centered rotation midpoint, no parallax offset).

**Dimensions:** 1600×2000px (matching the 4:5 aspect ratio of the hero placeholder)
**Format:** JPEG quality 80
**Target size:** ≤ 80KB

### How to re-bake

1. Start the dev server: `bun dev`
2. Navigate to `/` — the sculpture should be visible in the hero right column
3. Open DevTools → Rendering → Emulate CSS media feature: `prefers-reduced-motion: no-preference`
4. Scroll to the top of the page so `scrollProgress ≈ 0` (alabaster color state)
5. Take a screenshot of the `.hero-placeholder` element (right-click → Capture node screenshot in Chrome)
6. Export as JPEG quality 80 at 1600×2000px
7. Save here as `hero-sculpture.jpg`

**Re-bake whenever** the hero scene material, geometry, or lighting changes substantially.

## hero-sculpture-brass.jpg

Same process, but scroll the page until the sculpture is mid-hero
(`scrollProgress ≈ 0.6`) to capture the brass-toned variant. Used optionally
as a darker-mode fallback in future sprints.
