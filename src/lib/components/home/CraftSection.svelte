<script lang="ts">
	/** Craft — typographic compendium of skills, grouped by category. NOT a card grid. */
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import type { TechStack } from '$lib/sanity/types';

	interface Props {
		techStacks: TechStack[];
	}

	let { techStacks }: Props = $props();

	type Category = TechStack['category'];

	const categoryLabels: Record<NonNullable<Category>, string> = {
		frontend: 'Frontend',
		backend: 'Backend',
		db: 'Database',
		infra: 'Infra',
		tooling: 'Tooling',
		lang: 'Languages'
	};

	const order: NonNullable<Category>[] = ['frontend', 'backend', 'db', 'infra', 'tooling', 'lang'];

	const grouped = $derived(() => {
		const map = new Map<NonNullable<Category>, TechStack[]>();
		for (const cat of order) map.set(cat, []);
		for (const tech of techStacks) {
			if (tech.category) {
				map.get(tech.category)?.push(tech);
			}
		}
		return order
			.map((cat) => ({ cat, label: categoryLabels[cat], techs: map.get(cat) ?? [] }))
			.filter((g) => g.techs.length > 0);
	});
</script>

<section class="craft" aria-labelledby="craft-heading">
	<div class="craft-inner">
		<SectionHeader eyebrow="03 — CRAFT" title="What I reach for." />

		<div class="craft-body">
			{#each grouped() as group (group.cat)}
				<div class="tech-group">
					<p class="category-label">{group.label}</p>
					<p class="tech-row" aria-label="{group.label} technologies">
						{#each group.techs as tech, i (tech._id)}
							<span class="tech-name">{tech.name}</span><!--
							-->{#if i < group.techs.length - 1}<span class="sep" aria-hidden="true"> · </span>{/if}
						{/each}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.craft {
		padding: 12rem 0;
	}

	.craft-inner {
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 3rem;
	}

	.craft-body {
		margin-top: 64px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem 4rem;
	}

	.tech-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.category-label {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin: 0;
	}

	.tech-row {
		margin: 0;
		line-height: 1.6;
	}

	.tech-name {
		font-family: var(--font-display);
		font-size: 24px;
		color: var(--color-text);
		position: relative;
		cursor: default;
		transition: color 280ms var(--ease-ui);
	}

	.tech-name::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-accent);
		transition: width 280ms var(--ease-ui);
	}

	.tech-name:hover::after {
		width: 100%;
	}

	.sep {
		font-family: var(--font-display);
		font-size: 24px;
		color: var(--color-text-subtle);
		user-select: none;
	}

	@media (max-width: 767px) {
		.craft {
			padding: 6rem 0;
		}

		.craft-inner {
			padding: 0 1.5rem;
		}

		.craft-body {
			grid-template-columns: 1fr;
			gap: 2rem;
			margin-top: 48px;
		}

		.tech-name,
		.sep {
			font-size: 20px;
		}
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		.craft-body {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
