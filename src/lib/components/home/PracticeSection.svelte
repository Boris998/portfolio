<script lang="ts">
	/** Practice — asymmetric 7-col prose / 5-col quiet caption. */
	import SectionHeader from '$lib/components/SectionHeader.svelte';
</script>

<section class="practice" aria-labelledby="practice-heading">
	<div class="practice-inner">
		<!-- Heading spans cols 1-9 -->
		<div class="header-span">
			<SectionHeader
				eyebrow="01 — THE PRACTICE"
				title="I write production software for a living, and I run experiments on it for the same reason a craftsman sharpens his tools."
			/>
		</div>

		<div class="practice-body">
			<!-- Prose left (cols 1-7) -->
			<div class="prose-col">
				<p>
					I write production software for a living, and I run experiments on it for the same reason
					a craftsman sharpens his tools: because the work demands it.
				</p>
				<p>
					Most engineering ends at deployment. Mine begins there. A component is finished when its
					purpose is named, its metric is measurable, and the measurement says it earns its place.
					That discipline came from three years of running A/B tests for clients whose decisions move
					real money. It stays with me on every project, whether I'm being paid for the experiments
					or not.
				</p>
				<p>
					What you'll find here is the visible part of that practice — the work that shipped, the
					writing that explains it, and the laboratory where the methodology is on display. The rest
					is between me and the codebases.
				</p>
			</div>

			<!-- Quiet right (cols 8-12) -->
			<div class="quiet-col" aria-hidden="true">
				<span class="quiet-caption">PRACTICE IS THE WORD</span>
			</div>
		</div>
	</div>
</section>

<style>
	.practice {
		padding: 12rem 0;
	}

	.practice-inner {
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 3rem;
	}

	.header-span {
		grid-column: 1 / -1;
		max-width: calc(9 / 12 * 100%);
		margin-bottom: 64px;
	}

	.practice-body {
		display: grid;
		grid-template-columns: 7fr 5fr;
		gap: 4rem;
	}

	.prose-col {
		max-width: 64ch;
	}

	.prose-col p {
		font-size: 17px;
		line-height: 1.65;
		color: var(--color-text-muted);
		margin: 0 0 1.5rem;
	}

	.prose-col p:last-child {
		margin-bottom: 0;
	}

	.quiet-col {
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
	}

	.quiet-caption {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	@media (max-width: 767px) {
		.practice {
			padding: 6rem 0;
		}

		.practice-inner {
			padding: 0 1.5rem;
		}

		.header-span {
			max-width: 100%;
			margin-bottom: 48px;
		}

		.practice-body {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.quiet-col {
			display: none;
		}
	}
</style>
