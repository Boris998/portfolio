<script lang="ts">
	/** Hero — asymmetric 60/40 split, availability note, H1, GoldRule, subheadline, CTAs, 3D sculpture. */
	import GoldRule from '$lib/components/GoldRule.svelte';
	import AvailabilityNote from '$lib/components/AvailabilityNote.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { reducedMotion } from '$lib/three/hooks/useReducedMotion.js';
	import { heroTarget } from '$lib/three/heroTarget.svelte.js';
	import type { Settings } from '$lib/sanity/types';

	interface Props {
		settings?: Settings | null;
	}

	let { settings }: Props = $props();

	const headline = $derived(settings?.heroHeadline ?? 'Building things of enduring value.');
	const subheadline = $derived(settings?.heroSubheadline ?? 'Full-stack developer and CRO specialist. Three years of production work and a quieter discipline of measurement that runs underneath all of it.');

	// Sculpture container — registered into heroTarget so the Canvas-resident HeroScene can read it
	let sculptureContainer = $state<HTMLElement | null>(null);
	$effect(() => {
		heroTarget.set(sculptureContainer);
		return () => heroTarget.set(null);
	});

	// Reduced-motion: read from store reactively
	let isReducedMotion = $state(false);
	$effect(() => {
		const unsub = reducedMotion.subscribe((v) => { isReducedMotion = v; });
		return unsub;
	});
</script>

<section class="hero" aria-labelledby="hero-heading">
	<div class="hero-inner">
		<!-- Left: content (cols 1-7) -->
		<div class="hero-content">
			<AvailabilityNote
				availability={settings?.availability}
				availabilityNote={settings?.availabilityNote}
			/>

			<h1 id="hero-heading" class="hero-h1">
				{headline}
			</h1>

			<GoldRule width="56px" marginTop={32} />

			<p class="hero-sub">{subheadline}</p>

			<div id="hero-ctas" class="cta-row">
				<Button
					href="/work"
					class="cta-primary"
					aria-label="See selected work"
				>
					See selected work →
				</Button>
				<a href="/about" class="cta-ghost">About the practice</a>
			</div>

			<p class="caption" aria-hidden="true">3+ YEARS · FULL-STACK · CRO · SKOPJE</p>
		</div>

		<!-- Right: 3D sculpture (cols 8-12) -->
		<div class="hero-sculpture-col">
			<!-- Skip link for keyboard users — visible on focus only -->
			<a href="#hero-ctas" class="skip-sculpture" aria-label="Skip 3D scene">Skip 3D scene</a>

			<!-- Visually-hidden description for screen readers -->
			<span class="sr-only">
				A 3D sculptural form, rendered in warm studio lighting and rotating slowly. The form embodies the studio's commitment to considered software.
			</span>

			<!-- The View target — HeroScene (in the root Canvas) portals into this div -->
			<div
				bind:this={sculptureContainer}
				class="hero-placeholder"
				aria-hidden="true"
			>
				{#if isReducedMotion}
					<img
						src="/fallbacks/hero-sculpture.jpg"
						alt="A warm-toned sculptural form in studio light"
						class="fallback-img"
					/>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		padding: 16rem 0;
	}

	.hero-inner {
		display: grid;
		grid-template-columns: 7fr 5fr;
		gap: 4rem;
		align-items: center;
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 3rem;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.hero-h1 {
		font-family: var(--font-display);
		font-size: 84px;
		letter-spacing: -0.025em;
		line-height: 0.95;
		color: var(--color-text);
		max-width: 18ch;
		text-wrap: balance;
		margin: 32px 0 0;
	}

	.hero-sub {
		font-size: 18px;
		line-height: 1.55;
		color: var(--color-text-muted);
		max-width: 42ch;
		margin: 32px 0 0;
	}

	.cta-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 48px;
	}

	/* Override shadcn Button for the primary CTA */
	.cta-row :global(.cta-primary) {
		background: var(--color-accent-deep);
		color: var(--color-bg);
		font-size: 14px;
		font-weight: 500;
		padding: 14px 28px;
		border-radius: var(--radius);
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		transition: box-shadow 280ms var(--ease-spring);
		border: none;
	}

	.cta-row :global(.cta-primary:hover) {
		box-shadow: 0 0 24px oklch(0.78 0.10 85 / 0.18);
	}

	.cta-ghost {
		font-size: 14px;
		color: var(--color-text-muted);
		text-decoration: none;
		position: relative;
		padding-bottom: 2px;
		transition: color 280ms var(--ease-ui);
	}

	.cta-ghost::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-accent);
		transition: width 280ms var(--ease-ui);
	}

	.cta-ghost:hover {
		color: var(--color-text);
	}

	.cta-ghost:hover::after {
		width: 100%;
	}

	.cta-ghost:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 4px;
		border-radius: 2px;
	}

	.caption {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		margin-top: 64px;
	}

	/* Sculpture column wrapper */
	.hero-sculpture-col {
		position: relative;
	}

	/* Skip link — visible only when focused */
	.skip-sculpture {
		position: absolute;
		top: -100%;
		left: 0;
		z-index: 10;
		padding: 0.4rem 0.8rem;
		background: var(--color-accent-deep);
		color: var(--color-bg);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		text-decoration: none;
		border-radius: var(--radius);
		transition: top 120ms var(--ease-ui);
	}

	.skip-sculpture:focus {
		top: 0.5rem;
	}

	/* Screen-reader only */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	/* 3D sculpture container — stable dimensions, no layout shift */
	.hero-placeholder {
		aspect-ratio: 4 / 5;
		background: radial-gradient(ellipse at center, var(--color-bg-elevated) 0%, var(--color-bg) 100%);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		position: relative;
		overflow: hidden;
	}

	.fallback-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius);
	}

	@media (max-width: 767px) {
		.hero {
			padding: 8rem 0;
		}

		.hero-inner {
			grid-template-columns: 1fr;
			padding: 0 1.5rem;
			gap: 3rem;
		}

		.hero-h1 {
			font-size: 48px;
			letter-spacing: -0.02em;
			line-height: 0.98;
		}

		.hero-placeholder {
			aspect-ratio: 16 / 9;
		}
	}
</style>
