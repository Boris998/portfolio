<script lang="ts">
	/** Hero — asymmetric 60/40 split, availability note, H1, GoldRule, subheadline, CTAs, 3D placeholder. */
	import GoldRule from '$lib/components/GoldRule.svelte';
	import AvailabilityNote from '$lib/components/AvailabilityNote.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Settings } from '$lib/sanity/types';

	interface Props {
		settings?: Settings | null;
	}

	let { settings }: Props = $props();

	const headline = $derived(settings?.heroHeadline ?? 'Building things of enduring value.');
	const subheadline = $derived(settings?.heroSubheadline ?? 'Full-stack developer and CRO specialist. Three years of production work and a quieter discipline of measurement that runs underneath all of it.');
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

			<div class="cta-row">
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

		<!-- Right: 3D sculpture placeholder (cols 8-12) -->
		<div class="hero-placeholder" aria-hidden="true">
			<span class="placeholder-label">[ HERO SCULPTURE — Sprint 3 ]</span>
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

	/* 3D placeholder */
	.hero-placeholder {
		aspect-ratio: 4 / 5;
		background: radial-gradient(ellipse at center, var(--color-bg-elevated) 0%, var(--color-bg) 100%);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.placeholder-label {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		text-align: center;
		padding: 1rem;
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
