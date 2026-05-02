<script lang="ts">
	/** Selected Work — 3-col gallery grid, 3 featured projects. */
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import ProjectCardGallery from '$lib/components/ProjectCardGallery.svelte';
	import type { Project, TechStack } from '$lib/sanity/types';

	type ExpandedProject = Omit<Project, 'stack'> & { stack?: TechStack[] };

	interface Props {
		projects: ExpandedProject[];
	}

	let { projects }: Props = $props();
</script>

<section class="selected-work" aria-labelledby="work-heading">
	<div class="work-inner">
		<SectionHeader
			eyebrow="02 — SELECTED WORK"
			title="Three projects, three different kinds of hard."
			lede="Pulled from a longer list. The full archive is on the work page."
		/>

		<div class="project-grid">
			{#each projects as project (project._id)}
				<ProjectCardGallery {project} />
			{/each}
		</div>

		<div class="see-all-row">
			<a href="/work" class="see-all-link" aria-label="See all work">See all work →</a>
		</div>
	</div>
</section>

<style>
	.selected-work {
		padding: 16rem 0;
	}

	.work-inner {
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 3rem;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
		margin-top: 96px;
	}

	.see-all-row {
		display: flex;
		justify-content: flex-end;
		margin-top: 64px;
	}

	.see-all-link {
		font-size: 14px;
		color: var(--color-text-muted);
		text-decoration: none;
		position: relative;
		padding-bottom: 2px;
		transition: color 280ms var(--ease-ui);
	}

	.see-all-link::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-accent);
		transition: width 280ms var(--ease-ui);
	}

	.see-all-link:hover {
		color: var(--color-text);
	}

	.see-all-link:hover::after {
		width: 100%;
	}

	.see-all-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 4px;
		border-radius: 2px;
	}

	@media (max-width: 767px) {
		.selected-work {
			padding: 6rem 0;
		}

		.work-inner {
			padding: 0 1.5rem;
		}

		.project-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
			margin-top: 48px;
		}

		.see-all-row {
			justify-content: flex-start;
			margin-top: 2rem;
		}
	}
</style>
