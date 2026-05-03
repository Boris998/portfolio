<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import MetricChip from '$lib/components/MetricChip.svelte';
	import GoldRule from '$lib/components/GoldRule.svelte';

	// Mock projects — no Sanity required
	const mockProjects = [
		{
			_id: 'mock-toyota',
			title: 'Toyota & Lexus — Digital Funnel',
			slug: { current: 'toyota-lexus-funnel' },
			role: 'Developer / CRO',
			startDate: '2024-03-01',
			endDate: '2024-06-30',
			summary:
				'Multivariate experiments across the Toyota and Lexus digital sales funnel using Adobe Target. Delivered measurable revenue lift through funnel rearchitecture.',
			metrics: [{ _key: 'm1', value: '+15%', label: 'online revenue, Q1', trend: 'up' as const }],
			stack: [
				{ _id: 't1', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Adobe Target' },
				{ _id: 't2', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'TypeScript' },
				{ _id: 't3', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'SCSS' },
				{ _id: 't4', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Adobe Analytics' }
			]
		},
		{
			_id: 'mock-quizzle',
			title: 'Quizzle — Real-time Multiplayer Quiz',
			slug: { current: 'quizzle' },
			role: 'Full-Stack Developer',
			startDate: '2024-03-01',
			endDate: '2025-03-31',
			summary:
				'Real-time multiplayer quiz platform. End-to-end type safety from Drizzle schemas through Zod inference into the Hono backend, with a Go-based WebSocket layer.',
			metrics: [{ _key: 'm1', value: 'Real-time', label: 'WebSocket game loop', trend: 'neutral' as const }],
			stack: [
				{ _id: 't1', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'React' },
				{ _id: 't2', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Hono' },
				{ _id: 't3', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Go' },
				{ _id: 't4', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'PostgreSQL' },
				{ _id: 't5', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'SST' }
			]
		},
		{
			_id: 'mock-valtech',
			title: 'Valtech — Org-Intelligence Platform',
			slug: { current: 'valtech-internal' },
			role: 'Lead Frontend Developer',
			startDate: '2025-03-01',
			endDate: undefined,
			summary:
				'Internal platform for organizational visibility. An interactive circular line-org visualization, dynamic salary-range comparisons, owned end-to-end from data shape to module architecture.',
			metrics: [{ _key: 'm1', value: 'Owner', label: 'end-to-end product', trend: 'neutral' as const }],
			stack: [
				{ _id: 't1', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'React' },
				{ _id: 't2', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'TypeScript' },
				{ _id: 't3', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Nivo' },
				{ _id: 't4', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'SCSS' }
			]
		},
		{
			_id: 'mock-hitachi',
			title: 'Hitachi M&B — Restaurant Platform',
			slug: { current: 'hitachi-mb' },
			role: 'Frontend Developer',
			startDate: '2025-08-01',
			endDate: undefined,
			summary:
				'Responsive React and TypeScript components for a multi-brand restaurant platform serving millions of diners. Owned the mobile UX recovery and the scroll-loading rewrite.',
			metrics: [{ _key: 'm1', value: 'Millions', label: 'monthly active diners', trend: 'neutral' as const }],
			stack: [
				{ _id: 't1', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'React' },
				{ _id: 't2', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'TypeScript' },
				{ _id: 't3', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'AEM' },
				{ _id: 't4', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Java' }
			]
		},
		{
			_id: 'mock-ds-smith',
			title: 'DS Smith — SEO & Experimentation',
			slug: { current: 'ds-smith-cro' },
			role: 'Developer / CRO',
			startDate: '2024-07-01',
			endDate: '2024-11-30',
			summary:
				'Data-driven CRO program on Optimizely. A/B tests with custom JS/CSS injections, GTM event-tracking framework, page-flicker eliminated via CMS-managed variants.',
			metrics: [{ _key: 'm1', value: 'CR↑', label: 'bounce rate↓', trend: 'up' as const }],
			stack: [
				{ _id: 't1', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Optimizely' },
				{ _id: 't2', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'TypeScript' },
				{ _id: 't3', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'GTM' }
			]
		},
		{
			_id: 'mock-wtd',
			title: 'We Talk Data & AI — Community Page',
			slug: { current: 'we-talk-data-ai' },
			role: 'Developer',
			startDate: '2023-12-01',
			endDate: '2024-04-30',
			summary:
				'Landing page for an AI/ML community in Next.js + Tailwind with Sanity as the headless CMS. Non-technical organizers publish without a developer in the loop.',
			metrics: [{ _key: 'm1', value: 'Live', label: 'shipped & running', trend: 'neutral' as const }],
			stack: [
				{ _id: 't1', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Next.js' },
				{ _id: 't2', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Tailwind' },
				{ _id: 't3', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Sanity' },
				{ _id: 't4', _type: 'techStack' as const, _createdAt: '', _updatedAt: '', _rev: '', name: 'Vercel' }
			]
		}
	];
</script>

<div class="playground">
	<header class="pg-header">
		<p class="eyebrow">PLAYGROUND</p>
		<h1 class="pg-h1">ProjectCard — mock data</h1>
		<GoldRule />
		<p class="pg-note">No Sanity connection needed. Cards use static mock data. Thumbnails are placeholder.</p>
	</header>

	<section class="section">
		<p class="section-label">Gallery variant — 3-col grid (hover to see tilt + parallax)</p>
		<div class="grid-3">
			{#each mockProjects as project, i (project._id)}
				<ProjectCard {project} variant="gallery" showMetric={true} index={i} />
			{/each}
		</div>
	</section>

	<section class="section">
		<p class="section-label">Compact variant — related projects row</p>
		<div class="grid-3">
			{#each mockProjects.slice(0, 3) as project, i (project._id)}
				<ProjectCard {project} variant="compact" showMetric={false} index={i} />
			{/each}
		</div>
	</section>

	<section class="section">
		<p class="section-label">MetricChip — all sizes + trends</p>
		<div class="chip-row">
			<MetricChip value="+15%" label="online revenue" trend="up" size="sm" />
			<MetricChip value="+15%" label="online revenue" trend="up" size="md" />
			<MetricChip value="+15%" label="online revenue" trend="up" size="lg" />
		</div>
		<div class="chip-row" style:margin-top="32px">
			<MetricChip value="-8%" label="bounce rate" trend="down" size="md" />
			<MetricChip value="Real-time" label="game loop" trend="neutral" size="md" />
			<MetricChip value="+15%" label="revenue" trend="up" size="md" bordered />
		</div>
	</section>
</div>

<style>
	.playground {
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 clamp(24px, 5vw, 96px) 128px;
	}

	.pg-header {
		padding: 120px 0 64px;
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin: 0 0 20px;
	}

	.pg-h1 {
		font-family: var(--font-display);
		font-size: 48px;
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: var(--color-text);
		margin: 0 0 24px;
	}

	.pg-note {
		font-size: 15px;
		color: var(--color-text-muted);
		margin: 20px 0 0;
		max-width: 48ch;
	}

	.section {
		margin-top: 80px;
	}

	.section-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		margin: 0 0 32px;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--color-hairline);
	}

	.grid-3 {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 32px;
	}

	@media (max-width: 1024px) {
		.grid-3 { grid-template-columns: repeat(2, 1fr); gap: 24px; }
	}

	@media (max-width: 640px) {
		.grid-3 { grid-template-columns: 1fr; gap: 24px; }
	}

	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 40px;
		align-items: flex-end;
	}
</style>
