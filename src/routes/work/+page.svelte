<script lang="ts">
	import type { PageData } from './$types';
	import type { GetAllProjectsResult } from '$lib/sanity/types';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import GoldRule from '$lib/components/GoldRule.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	let { data }: { data: PageData } = $props();

	type Project = GetAllProjectsResult[number];

	const FRONTEND_NAMES = ['react', 'svelte', 'vue', 'angular', 'next', 'nuxt', 'solid', 'qwik', 'astro'];
	const BACKEND_NAMES = ['node', 'bun', 'deno', 'express', 'fastify', 'hono', 'go', 'python', 'rails', 'java', 'spring', 'nest', 'postgres', 'mysql', 'mongo', 'redis', 'supabase', 'prisma', 'drizzle'];
	const CRO_NAMES = ['adobe target', 'optimizely', 'posthog', 'vwo', 'google optimize', 'launchdarkly', 'growthbook'];
	const DATAVIZ_NAMES = ['nivo', 'd3', 'chart.js', 'recharts', 'visx', 'echarts', 'observable'];

	function stackNames(p: Project): string[] {
		return (p.stack ?? []).map((t) => (t.name ?? '').toLowerCase());
	}

	function isFrontend(p: Project): boolean {
		const names = stackNames(p);
		return FRONTEND_NAMES.some((n) => names.some((s) => s.includes(n)));
	}

	function isBackend(p: Project): boolean {
		const names = stackNames(p);
		return BACKEND_NAMES.some((n) => names.some((s) => s.includes(n)));
	}

	function isFullStack(p: Project): boolean {
		return isFrontend(p) && isBackend(p);
	}

	function isCRO(p: Project): boolean {
		const names = stackNames(p);
		const hasTool = CRO_NAMES.some((n) => names.some((s) => s.includes(n)));
		const hasUpMetric = (p.metrics ?? []).some((m) => m.trend === 'up');
		return hasTool || hasUpMetric;
	}

	function isDataViz(p: Project): boolean {
		const names = stackNames(p);
		return DATAVIZ_NAMES.some((n) => names.some((s) => s.includes(n)));
	}

	type Category = 'all' | 'frontend' | 'fullstack' | 'cro' | 'dataviz';
	let activeCategory = $state<Category>('all');

	const allProjects: Project[] = $derived(data.projects ?? []);

	const filteredProjects = $derived((): Project[] => {
		if (activeCategory === 'all') return allProjects;
		return allProjects.filter((p) => {
			if (activeCategory === 'frontend') return isFrontend(p) && !isFullStack(p);
			if (activeCategory === 'fullstack') return isFullStack(p);
			if (activeCategory === 'cro') return isCRO(p);
			if (activeCategory === 'dataviz') return isDataViz(p);
			return true;
		});
	});

	const ongoingCount = $derived(allProjects.filter((p) => !p.endDate).length);
	const displayCount = $derived(filteredProjects().length);

	const tabs: { id: Category; label: string }[] = [
		{ id: 'all', label: 'All' },
		{ id: 'frontend', label: 'Frontend' },
		{ id: 'fullstack', label: 'Full-Stack' },
		{ id: 'cro', label: 'CRO' },
		{ id: 'dataviz', label: 'Data Viz' }
	];
</script>

<svelte:head>
	<title>Work — Boris</title>
	<meta name="description" content="Selected projects in React, SvelteKit, and Node — full-stack engineering with measurable outcomes." />
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{ "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
				{ "@type": "ListItem", "position": 2, "name": "Work", "item": "/work" }
			]
		})}
	</script>
</svelte:head>

<div class="work-page">
	<!-- Page hero -->
	<header class="page-hero">
		<p class="eyebrow">ALL WORK</p>
		<h1 class="page-h1">Selected projects,<br />recent to less recent.</h1>
		<GoldRule />
		<p class="lede">The full archive. Filter by capability.</p>
	</header>

	<!-- Sticky filter bar -->
	<div class="filter-bar">
		<Tabs.Root value={activeCategory} onValueChange={(v) => (activeCategory = v as Category)}>
			<Tabs.List class="tabs-list">
				{#each tabs as tab (tab.id)}
					<Tabs.Trigger value={tab.id} class="tab-trigger">
						{tab.label}
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
		</Tabs.Root>
	</div>

	<!-- Grid header -->
	<div class="grid-header">
		<span class="project-count">
			{displayCount} project{displayCount !== 1 ? 's' : ''}{activeCategory === 'all' ? ` · ${ongoingCount} ongoing` : ''}
		</span>
	</div>

	<!-- Project grid -->
	{#if filteredProjects().length > 0}
		<div class="project-grid">
			{#each filteredProjects() as project, i (project._id)}
				<ProjectCard project={{ ...project, stack: project.stack ?? undefined }} variant="gallery" showMetric={true} index={i} />
			{/each}
		</div>
	{:else}
		<div class="empty-state">
			<p class="empty-text">No projects match this filter yet.</p>
			<button class="reset-link" onclick={() => (activeCategory = 'all')}>
				Reset filter →
			</button>
		</div>
	{/if}
</div>

<style>
	.work-page {
		padding: 0 var(--page-x, clamp(24px, 5vw, 96px));
		max-width: 1440px;
		margin: 0 auto;
	}

	.page-hero {
		padding: 192px 0 96px;
	}

	@media (max-width: 768px) {
		.page-hero {
			padding: 96px 0 64px;
		}
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin: 0 0 24px;
	}

	.page-h1 {
		font-family: var(--font-display);
		font-size: clamp(40px, 5vw, 64px);
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: var(--color-text);
		margin: 0 0 32px;
	}

	.lede {
		font-size: 18px;
		line-height: 1.55;
		color: var(--color-text-muted);
		max-width: 52ch;
		margin: 24px 0 0;
	}

	/* Sticky filter bar */
	.filter-bar {
		position: sticky;
		top: 72px;
		z-index: 40;
		background: var(--color-bg);
		padding: 12px 0;
		border-bottom: 1px solid var(--color-hairline);
		margin-bottom: 64px;
	}

	:global(.tabs-list) {
		display: flex;
		gap: 0;
		background: transparent !important;
		border: none;
		padding: 0;
		height: auto;
	}

	:global(.tab-trigger) {
		font-family: var(--font-mono) !important;
		font-size: 12px !important;
		letter-spacing: 0.08em !important;
		text-transform: uppercase !important;
		color: var(--color-text-muted) !important;
		background: transparent !important;
		border: none !important;
		border-radius: 0 !important;
		padding: 8px 16px !important;
		position: relative;
		cursor: pointer;
		transition: color 200ms ease !important;
	}

	:global(.tab-trigger:hover) {
		color: var(--color-text) !important;
	}

	:global(.tab-trigger[data-state="active"]) {
		color: var(--color-accent) !important;
	}

	:global(.tab-trigger[data-state="active"])::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 16px;
		right: 16px;
		height: 1px;
		background: var(--color-accent);
	}

	/* Grid header */
	.grid-header {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 32px;
	}

	.project-count {
		font-family: var(--font-mono);
		font-size: 12px;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	/* Project grid */
	.project-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 32px;
		margin-bottom: 128px;
	}

	@media (max-width: 1024px) {
		.project-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 24px;
		}
	}

	@media (max-width: 640px) {
		.project-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}

	/* Empty state */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 96px 0;
	}

	.empty-text {
		font-size: 18px;
		color: var(--color-text-muted);
		text-align: center;
	}

	.reset-link {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
		background: none;
		border: none;
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 3px;
		transition: color 180ms ease;
	}

	.reset-link:hover {
		color: var(--color-text);
	}
</style>
