<script lang="ts">
	/** Gallery card variant — used on home (featured) and /work. No metric chips on this variant. */
	import type { Project, TechStack } from '$lib/sanity/types';
	import { urlFor } from '$lib/sanity/image';
	import StackChip from './StackChip.svelte';

	// Expanded project type — Sanity resolves stack[]-> at runtime
	type ExpandedProject = Omit<Project, 'stack'> & { stack?: TechStack[] };

	interface Props {
		project: ExpandedProject;
	}

	let { project }: Props = $props();

	const slug = $derived(project.slug?.current ?? '');
	const href = $derived(`/work/${slug}`);

	const visibleStack = $derived((project.stack ?? []).slice(0, 4));
	const overflowCount = $derived(Math.max(0, (project.stack?.length ?? 0) - 4));

	const dateRange = $derived(() => {
		const parts: string[] = [];
		if (project.startDate) parts.push(new Date(project.startDate).getFullYear().toString());
		if (project.endDate) parts.push(new Date(project.endDate).getFullYear().toString());
		return parts.length === 2 && parts[0] !== parts[1] ? parts.join('–') : parts[0] ?? '';
	});

	const thumbSrc = $derived(
		project.heroImage ? urlFor(project.heroImage).width(800).height(500).auto('format').url() : null
	);
</script>

<article class="project-card">
	<!-- Thumbnail links to the project — wraps the visual -->
	<a {href} class="thumbnail-link" tabindex="-1" aria-hidden="true">
		<div class="thumbnail">
			{#if thumbSrc}
				<img
					src={thumbSrc}
					alt={project.heroImage?.alt ?? project.title ?? ''}
					loading="lazy"
					decoding="async"
					width="800"
					height="500"
				/>
			{:else}
				<div class="thumbnail-placeholder"></div>
			{/if}
		</div>
	</a>

	<!-- Meta -->
	<div class="card-body">
		<p class="meta">
			{#if project.role}{project.role}{/if}
			{#if project.role && dateRange()}
				<span class="separator">·</span>
			{/if}
			{#if dateRange()}{dateRange()}{/if}
		</p>

		<a {href} class="title-link">
			<h3 class="title">{project.title}</h3>
		</a>

		{#if project.summary}
			<p class="summary">{project.summary}</p>
		{/if}

		{#if visibleStack.length > 0}
			<div class="stack-row" aria-label="Technologies used">
				{#each visibleStack as tech (tech._id)}
					<StackChip {tech} size="sm" />
				{/each}
				{#if overflowCount > 0}
					<span class="overflow-count" aria-label="{overflowCount} more technologies">
						+{overflowCount}
					</span>
				{/if}
			</div>
		{/if}
	</div>
</article>

<style>
	.project-card {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.thumbnail-link {
		display: block;
		border-radius: var(--radius);
		overflow: hidden;
	}

	.thumbnail {
		position: relative;
		aspect-ratio: 16 / 10;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid var(--color-hairline);
		transition: box-shadow 280ms var(--ease-spring);
	}

	.project-card:hover .thumbnail {
		box-shadow: inset 0 0 0 1px var(--color-accent);
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 600ms var(--ease-spring);
	}

	.project-card:hover .thumbnail img {
		transform: scale(1.02);
	}

	.thumbnail-placeholder {
		width: 100%;
		height: 100%;
		background: radial-gradient(
			ellipse at center,
			var(--color-bg-elevated) 0%,
			var(--color-bg) 100%
		);
	}

	.card-body {
		padding-top: 24px;
		display: flex;
		flex-direction: column;
	}

	.meta {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin: 0 0 8px;
	}

	.separator {
		margin: 0 0.4em;
		opacity: 0.5;
	}

	.title-link {
		text-decoration: none;
	}

	.title-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.title {
		font-family: var(--font-display);
		font-size: 32px;
		letter-spacing: -0.015em;
		line-height: 1.15;
		color: var(--color-text);
		margin: 0 0 16px;
		transition: color 280ms var(--ease-ui);
	}

	.title-link:hover .title {
		color: var(--color-text-muted);
	}

	.summary {
		font-size: 17px;
		line-height: 1.65;
		color: var(--color-text-muted);
		margin: 0 0 16px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.stack-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		align-items: center;
	}

	.overflow-count {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.04em;
		color: var(--color-text-subtle);
	}
</style>
