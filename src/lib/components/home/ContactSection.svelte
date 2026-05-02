<script lang="ts">
	/** Contact — asymmetric 6-col content / 6-col sign-off. */
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Settings } from '$lib/sanity/types';

	interface Props {
		settings?: Settings | null;
	}

	let { settings }: Props = $props();

	const email = $derived(settings?.contactEmail ?? 'btadirov16@gmail.com');
</script>

<section class="contact" id="contact" aria-labelledby="contact-heading">
	<div class="contact-inner">
		<!-- Left: content (cols 1-7) -->
		<div class="contact-content">
			<SectionHeader eyebrow="04 — GET IN TOUCH" title="Let's discuss the work." />

			<p class="contact-sub">
				I take on a small number of engagements each quarter — usually one significant build,
				occasionally a CRO program for a team that already ships well.
			</p>

			<Button
				href="mailto:{email}"
				class="cta-primary"
				aria-label="Begin a conversation via email"
			>
				Begin a conversation
			</Button>

			<p class="contact-stubs" aria-label="Contact options">
				<span class="stub">Copy email</span>
				<span class="stub-sep">·</span>
				<span class="stub">Book 20-min call</span>
			</p>
		</div>

		<!-- Right: sign-off (cols 8-12) -->
		<div class="sign-off" aria-hidden="true">
			<span class="sign-off-monogram">B.</span>
			<p class="sign-off-text">BORIS / SKOPJE / 2026</p>
		</div>
	</div>
</section>

<style>
	.contact {
		padding: 16rem 0;
	}

	.contact-inner {
		display: grid;
		grid-template-columns: 7fr 5fr;
		gap: 4rem;
		align-items: center;
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 3rem;
	}

	.contact-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.contact-sub {
		font-size: 17px;
		line-height: 1.65;
		color: var(--color-text-muted);
		max-width: 60ch;
		margin: 32px 0 48px;
	}

	.contact-content :global(.cta-primary) {
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

	.contact-content :global(.cta-primary:hover) {
		box-shadow: 0 0 24px oklch(0.78 0.10 85 / 0.18);
	}

	.contact-stubs {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-top: 24px;
		display: flex;
		gap: 0.5em;
	}

	.stub-sep {
		color: var(--color-text-subtle);
	}

	/* Sign-off column */
	.sign-off {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.sign-off-monogram {
		font-family: var(--font-display);
		font-size: 64px;
		color: var(--color-text-subtle);
		line-height: 1;
	}

	.sign-off-text {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		margin: 0;
	}

	@media (max-width: 767px) {
		.contact {
			padding: 8rem 0;
		}

		.contact-inner {
			grid-template-columns: 1fr;
			padding: 0 1.5rem;
			gap: 3rem;
		}

		.sign-off {
			display: none;
		}
	}
</style>
