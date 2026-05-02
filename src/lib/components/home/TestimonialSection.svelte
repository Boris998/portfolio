<script lang="ts">
	/** Testimonial — asymmetric quote + attribution. Returns null if no testimonial. */
	import type { Testimonial } from '$lib/sanity/types';

	interface Props {
		testimonials: Testimonial[];
	}

	let { testimonials }: Props = $props();

	const testimonial = $derived(testimonials[0] ?? null);
</script>

{#if testimonial}
	<section class="testimonial" aria-label="Client testimonial">
		<div class="testimonial-inner">
			<div class="quote-col">
				<span class="opening-mark" aria-hidden="true">&#x201F;</span>
				<blockquote class="quote">
					<p>{testimonial.quote}</p>
					<footer class="attribution">
						<cite class="author-name">{testimonial.author}</cite>
						{#if testimonial.authorRole || testimonial.authorCompany}
							<p class="author-meta">
								{#if testimonial.authorRole}{testimonial.authorRole}{/if}
								{#if testimonial.authorRole && testimonial.authorCompany} · {/if}
								{#if testimonial.authorCompany}{testimonial.authorCompany}{/if}
							</p>
						{/if}
					</footer>
				</blockquote>
			</div>

			<div class="attribution-col" aria-hidden="true">
				<!-- intentionally empty — asymmetric weight -->
			</div>
		</div>
	</section>
{/if}

<style>
	.testimonial {
		padding: 12rem 0;
	}

	.testimonial-inner {
		display: grid;
		grid-template-columns: 8fr 4fr;
		gap: 4rem;
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 3rem;
	}

	.quote-col {
		position: relative;
	}

	.opening-mark {
		font-family: var(--font-display);
		font-size: 96px;
		line-height: 1;
		color: var(--color-text-subtle);
		display: block;
		margin-bottom: -0.3em;
		user-select: none;
	}

	.quote {
		margin: 0;
	}

	.quote p {
		font-family: var(--font-display);
		font-size: 32px;
		line-height: 1.3;
		color: var(--color-text);
		margin: 0 0 32px;
	}

	.attribution {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.author-name {
		font-size: 16px;
		font-style: normal;
		color: var(--color-text);
	}

	.author-meta {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin: 0;
	}

	.attribution-col {
		min-height: 1px;
	}

	@media (max-width: 767px) {
		.testimonial {
			padding: 6rem 0;
		}

		.testimonial-inner {
			grid-template-columns: 1fr;
			padding: 0 1.5rem;
			gap: 0;
		}

		.attribution-col {
			display: none;
		}

		.opening-mark {
			font-size: 64px;
		}

		.quote p {
			font-size: 24px;
		}
	}
</style>
