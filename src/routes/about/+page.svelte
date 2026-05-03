<script lang="ts">
	import GoldRule from '$lib/components/GoldRule.svelte';
	import type { PageData } from './$types';
	import type { TechStack } from '$lib/sanity/types';

	let { data }: { data: PageData } = $props();

	const settings = $derived(data.settings);
	const techStacks = $derived(data.techStacks ?? []);

	type Category = NonNullable<TechStack['category']>;

	const categoryLabels: Record<Category, string> = {
		frontend: 'Frontend',
		backend: 'Backend',
		db: 'Database',
		infra: 'Infra',
		tooling: 'Tooling',
		lang: 'Languages'
	};

	const categoryOrder: Category[] = ['frontend', 'backend', 'db', 'infra', 'tooling', 'lang'];

	const grouped = $derived(() => {
		const map = new Map<Category, TechStack[]>();
		for (const cat of categoryOrder) map.set(cat, []);
		for (const tech of techStacks) {
			if (tech.category) map.get(tech.category)?.push(tech);
		}
		return categoryOrder
			.map((cat) => ({ cat, label: categoryLabels[cat], techs: map.get(cat) ?? [] }))
			.filter((g) => g.techs.length > 0);
	});

	const experience = [
		{
			period: '2025 — present',
			company: 'Valtech',
			role: 'Lead Frontend Developer',
			stack: ['React', 'TypeScript', 'Nivo', 'SCSS'],
			description:
				'Internal platform for organizational visibility at a global digital consultancy. Interactive circular org visualization, dynamic salary-range comparisons — owned end-to-end from data shape to module architecture.'
		},
		{
			period: '2025 — present',
			company: 'Hitachi M&B',
			role: 'Frontend Developer',
			stack: ['React', 'TypeScript', 'AEM', 'SCSS'],
			description:
				'Responsive components for a multi-brand restaurant platform serving millions of diners monthly. Owned the mobile UX recovery and the scroll-loading rewrite that eliminated layout shifts.'
		},
		{
			period: '2024 — 2025',
			company: 'Quizzle',
			role: 'Full-Stack Developer',
			stack: ['React', 'Hono', 'Go', 'PostgreSQL', 'SST'],
			description:
				'Real-time multiplayer quiz platform built with a team of four. End-to-end type safety from Drizzle schemas through Zod inference into the Hono backend, with a Go-based WebSocket layer for the live game loop.'
		},
		{
			period: '2024',
			company: 'DS Smith',
			role: 'Developer / CRO',
			stack: ['Optimizely', 'TypeScript', 'GTM'],
			description:
				'Data-driven CRO program on Optimizely. A/B tests with custom JS/CSS injections, a robust GTM event-tracking framework, page-flicker eliminated via CMS-managed variants.'
		},
		{
			period: '2024',
			company: 'Toyota & Lexus',
			role: 'Developer / CRO',
			stack: ['Adobe Target', 'TypeScript', 'Adobe Analytics', 'SCSS'],
			description:
				'Multivariate experiments across the Toyota and Lexus digital sales funnel using Adobe Target. Delivered measurable revenue lift through funnel rearchitecture and KPI analysis.'
		},
		{
			period: '2023 — 2024',
			company: 'We Talk Data & AI',
			role: 'Developer',
			stack: ['Next.js', 'Tailwind', 'Sanity', 'Vercel'],
			description:
				'Landing page for an AI/ML community in Skopje. Non-technical organizers publish content without a developer in the loop — the CMS setup was the product.'
		}
	];

	const languages = [
		{ name: 'Macedonian', bars: 4, label: 'native' },
		{ name: 'English', bars: 4, label: 'native level' },
		{ name: 'Bulgarian', bars: 3, label: 'advanced' },
		{ name: 'Serbian', bars: 3, label: 'advanced' },
		{ name: 'German', bars: 1, label: 'beginner' }
	];
</script>

<svelte:head>
	<title>About — Boris</title>
	<meta
		name="description"
		content="Full-stack developer and CRO specialist based in Skopje. Three years of production code at Toyota, Hitachi, Valtech, and others."
	/>
	<meta property="og:title" content="About — Boris" />
	<meta
		property="og:description"
		content="Full-stack developer and CRO specialist based in Skopje."
	/>
	<meta property="og:type" content="profile" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="About — Boris" />
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "ProfilePage",
			"mainEntity": {
				"@type": "Person",
				"name": "Boris Tadirov",
				"jobTitle": "Full-Stack Developer & CRO Specialist",
				"workLocation": { "@type": "Place", "name": "Skopje, North Macedonia" },
				"alumniOf": {
					"@type": "CollegeOrUniversity",
					"name": "Ss. Cyril and Methodius University in Skopje"
				},
				"knowsAbout": ["Frontend Development", "CRO", "SvelteKit", "React", "TypeScript", "PostHog", "Adobe Target"]
			}
		})}
	</script>
</svelte:head>

<!-- ─── Hero ────────────────────────────────────────────────── -->
<section class="about-hero" aria-labelledby="about-h1">
	<div class="container">
		<div class="hero-grid">
			<div class="hero-left">
				<p class="eyebrow">ABOUT</p>
				<h1 id="about-h1" class="hero-h1">Boris. A practice in considered software.</h1>
				<GoldRule width="48px" marginTop={32} />
				<p class="hero-sub">
					Full-stack developer and CRO specialist. Skopje. Three years shipping production code
					that earns its place.
				</p>
			</div>

			<aside class="identity-card" aria-label="Identity summary">
				<dl class="identity-list">
					<div class="identity-row">
						<dt>BASED IN</dt>
						<dd>Skopje, North Macedonia</dd>
					</div>
					<div class="identity-row">
						<dt>EDUCATION</dt>
						<dd>UKIM, BSc Computer Science, 2025</dd>
					</div>
					<div class="identity-row">
						<dt>CURRENT</dt>
						<dd>Valtech (Lead Frontend) · Hitachi (Frontend)</dd>
					</div>
					<div class="identity-row">
						<dt>LANGUAGES</dt>
						<dd>Macedonian / English / Bulgarian / Serbian / German (learning)</dd>
					</div>
					{#if settings?.availabilityNote}
						<div class="identity-row">
							<dt>AVAILABILITY</dt>
							<dd>{settings.availabilityNote}</dd>
						</div>
					{/if}
				</dl>
			</aside>
		</div>
	</div>
</section>

<!-- ─── Practice prose ──────────────────────────────────────── -->
<section class="prose-section" aria-label="Practice">
	<div class="container">
		<div class="prose-col">
			<p>
				I write production software for a living, and I run experiments on it for the same reason a
				craftsman sharpens his tools — because the standard of the work demands it. The portfolio
				you're reading is itself an experiment: what does a developer's personal site look like when
				it's built with the same care as client work?
			</p>
			<p>
				Most engineering ends at deployment. Mine starts there. Shipping is table stakes; what
				follows is the discipline of measuring, interpreting, and improving. CRO taught me that no
				interface is finished until someone has used it under real conditions and the data has
				something to say.
			</p>
			<p>
				I started in CRO. Adobe Target. Optimizely. The kind of work where you write a JS injection
				on a Tuesday and on Friday someone tells you the conversion rate moved 0.6%. That feedback
				loop teaches you to think about software as something with measurable outcomes — and once
				you've thought about software that way, you can't think about it any other way.
			</p>
			<p>
				These days the work is more often React or SvelteKit, sometimes Node or Go on the backend.
				The instrumentation is PostHog instead of Adobe. The fundamentals didn't change. Build the
				thing well. Measure it. Improve it. Don't ship and forget.
			</p>
			<p>
				What you'll find here is the visible part of that practice — the work that shipped, the
				writing that explains it, and the laboratory where the methodology is on display. The rest is
				between me and the codebases. If you're considering working together, the <a href="/contact"
					>contact page</a
				> is one click.
			</p>
		</div>
	</div>
</section>

<!-- ─── Experience timeline ─────────────────────────────────── -->
<section class="timeline-section" aria-labelledby="timeline-heading">
	<div class="container">
		<p class="eyebrow">EXPERIENCE · 2023 — PRESENT</p>
		<h2 id="timeline-heading" class="section-h2">What I've been doing.</h2>
		<GoldRule width="48px" marginTop={24} />

		<ol class="timeline-list">
			{#each experience as entry (entry.company + entry.period)}
				<li class="timeline-entry">
					<div class="entry-period">{entry.period}</div>
					<div class="entry-body">
						<p class="entry-company">{entry.company}</p>
						<p class="entry-role">{entry.role}</p>
						<div class="entry-stack" aria-label="Technologies">
							{#each entry.stack as tech, i}
								<span class="stack-chip">{tech}</span>{#if i < entry.stack.length - 1}<span
										class="stack-sep" aria-hidden="true"> · </span>{/if}
							{/each}
						</div>
						<p class="entry-desc">{entry.description}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ─── Skills compendium ───────────────────────────────────── -->
{#if grouped().length > 0}
	<section class="skills-section" aria-labelledby="skills-heading">
		<div class="container">
			<p class="eyebrow">CRAFT</p>
			<h2 id="skills-heading" class="section-h2">What I reach for.</h2>
			<GoldRule width="48px" marginTop={24} />

			<div class="craft-body">
				{#each grouped() as group (group.cat)}
					<div class="tech-group">
						<p class="category-label">{group.label}</p>
						<p class="tech-row">
							{#each group.techs as tech, i (tech._id)}
								<span class="tech-name" title={tech.yearsUsed ? `${tech.yearsUsed}yr` : undefined}>
									{tech.name}
								</span><!--
								-->{#if i < group.techs.length - 1}<span class="sep" aria-hidden="true"> · </span>{/if}
							{/each}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- ─── Languages ───────────────────────────────────────────── -->
<section class="lang-section" aria-labelledby="lang-heading">
	<div class="container">
		<p class="eyebrow">LANGUAGES</p>
		<h2 id="lang-heading" class="section-h2">Five spoken, one currently learning.</h2>

		<ul class="lang-list">
			{#each languages as lang}
				<li class="lang-entry">
					<p class="lang-name">{lang.name}</p>
					<div class="lang-bars" role="img" aria-label="{lang.label} proficiency">
						{#each { length: 4 } as _, i}
							<span
								class="lang-bar"
								class:lang-bar--filled={i < lang.bars}
								class:lang-bar--native={lang.bars === 4 && i < lang.bars}
								class:lang-bar--advanced={lang.bars === 3 && i < lang.bars}
							></span>
						{/each}
					</div>
					<p class="lang-caption">{lang.label}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ─── Education ───────────────────────────────────────────── -->
<section class="edu-section" aria-labelledby="edu-heading">
	<div class="container">
		<div class="edu-col">
			<p class="eyebrow" id="edu-heading">EDUCATION</p>
			<p class="edu-school">Ss. Cyril and Methodius University in Skopje (UKIM)</p>
			<p class="edu-degree">Bachelor's Degree, Computer Science · 2025</p>
		</div>
	</div>
</section>

<!-- ─── Elsewhere ───────────────────────────────────────────── -->
{#if settings?.socialLinks && settings.socialLinks.length > 0}
	<section class="elsewhere-section" aria-labelledby="elsewhere-heading">
		<div class="container">
			<p class="eyebrow">ELSEWHERE</p>
			<h2 id="elsewhere-heading" class="section-h2-sm">Where else to find me.</h2>

			<ul class="elsewhere-grid">
				{#each settings.socialLinks as link (link._key)}
					<li class="elsewhere-tile">
						<a href={link.url} target="_blank" rel="noopener noreferrer" class="elsewhere-link">
							<span class="elsewhere-platform">{link.platform}</span>
							<span class="elsewhere-label">{link.url?.replace(/^https?:\/\//, '')}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

<!-- ─── Resume CTA ───────────────────────────────────────────── -->
{#if settings?.resumeFile}
	<section class="resume-section" aria-label="Download résumé">
		<div class="container">
			<div class="resume-col">
				<a
					href={settings.resumeFile?.asset?._ref ? `https://cdn.sanity.io/files/${settings.resumeFile.asset._ref}` : '#'}
					download
					class="resume-btn"
					onclick={() => {
						/* TODO: track('resume_downloaded') — wire in Sprint 6 */
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="7 10 12 15 17 10" />
						<line x1="12" y1="15" x2="12" y2="3" />
					</svg>
					Download résumé (PDF)
				</a>
			</div>
		</div>
	</section>
{/if}

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 clamp(24px, 5vw, 80px);
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-bottom: 24px;
	}

	/* ── Hero ─────────────────────────────────────────── */
	.about-hero {
		padding-top: 192px;
		padding-bottom: 192px;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 40px;
		align-items: start;
	}

	.hero-left {
		grid-column: 1 / 8;
	}

	@media (max-width: 768px) {
		.hero-left {
			grid-column: 1 / -1;
		}
	}

	.hero-h1 {
		font-family: var(--font-display);
		font-size: clamp(42px, 6vw, 72px);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: -0.025em;
		color: var(--color-text);
		margin-bottom: 0;
	}

	.hero-sub {
		font-size: 22px;
		line-height: 1.5;
		color: var(--color-text);
		max-width: 42ch;
		margin-top: 32px;
	}

	.identity-card {
		grid-column: 8 / 13;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		padding: 32px;
		background: transparent;
	}

	@media (max-width: 768px) {
		.identity-card {
			grid-column: 1 / -1;
		}
	}

	.identity-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.identity-row dt {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-bottom: 4px;
	}

	.identity-row dd {
		font-size: 14px;
		color: var(--color-text);
		margin: 0;
	}

	/* ── Prose ─────────────────────────────────────────── */
	.prose-section {
		padding-top: 96px;
		padding-bottom: 96px;
		border-top: 1px solid var(--color-hairline);
	}

	.prose-col {
		grid-column: 3 / 10;
		max-width: 64ch;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.prose-col p {
		font-size: 17px;
		line-height: 1.7;
		color: var(--color-text-muted);
	}

	.prose-col a {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	/* ── Timeline ──────────────────────────────────────── */
	.timeline-section {
		padding-top: 128px;
		padding-bottom: 128px;
		border-top: 1px solid var(--color-hairline);
	}

	.section-h2 {
		font-family: var(--font-display);
		font-size: clamp(28px, 3.5vw, 40px);
		font-weight: 400;
		line-height: 1.2;
		letter-spacing: -0.015em;
		color: var(--color-text);
		margin-bottom: 0;
	}

	.timeline-list {
		list-style: none;
		padding: 0;
		margin: 64px 0 0;
	}

	.timeline-entry {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 40px;
		padding: 48px 0;
		border-top: 1px solid var(--color-hairline);
	}

	.timeline-entry:last-child {
		border-bottom: 1px solid var(--color-hairline);
	}

	.entry-period {
		grid-column: 1 / 3;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		padding-top: 6px;
	}

	@media (max-width: 768px) {
		.entry-period {
			grid-column: 1 / -1;
		}
	}

	.entry-body {
		grid-column: 3 / 10;
	}

	@media (max-width: 768px) {
		.entry-body {
			grid-column: 1 / -1;
		}
	}

	.entry-company {
		font-family: var(--font-display);
		font-size: 28px;
		font-weight: 400;
		line-height: 1.2;
		letter-spacing: -0.015em;
		color: var(--color-text);
		margin-bottom: 2px;
	}

	.entry-role {
		font-size: 15px;
		color: var(--color-text-muted);
		margin-bottom: 16px;
	}

	.entry-stack {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--color-text-subtle);
		margin-bottom: 16px;
	}

	.stack-chip {
		letter-spacing: 0.04em;
	}

	.entry-desc {
		font-size: 17px;
		line-height: 1.65;
		color: var(--color-text-muted);
		max-width: 60ch;
	}

	/* ── Skills ────────────────────────────────────────── */
	.skills-section {
		padding-top: 96px;
		padding-bottom: 96px;
		border-top: 1px solid var(--color-hairline);
	}

	.craft-body {
		margin-top: 64px;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.tech-group {
		display: grid;
		grid-template-columns: 160px 1fr;
		gap: 24px;
		padding: 20px 0;
		border-bottom: 1px solid var(--color-hairline);
	}

	.tech-group:first-child {
		border-top: 1px solid var(--color-hairline);
	}

	.category-label {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		padding-top: 2px;
	}

	.tech-row {
		font-size: 17px;
		color: var(--color-text);
		line-height: 1.6;
	}

	.tech-name {
		cursor: default;
	}

	.tech-name[title]:hover {
		color: var(--color-accent);
	}

	.sep {
		color: var(--color-text-subtle);
	}

	/* ── Languages ─────────────────────────────────────── */
	.lang-section {
		padding-top: 96px;
		padding-bottom: 96px;
		border-top: 1px solid var(--color-hairline);
	}

	.section-h2-sm {
		font-family: var(--font-display);
		font-size: clamp(22px, 2.5vw, 28px);
		font-weight: 400;
		color: var(--color-text);
		margin-bottom: 0;
	}

	.lang-list {
		list-style: none;
		padding: 0;
		margin-top: 64px;
		display: flex;
		flex-wrap: wrap;
		gap: 48px;
	}

	.lang-entry {
		display: flex;
		flex-direction: column;
		gap: 12px;
		min-width: 120px;
	}

	.lang-name {
		font-family: var(--font-display);
		font-size: 24px;
		font-weight: 400;
		color: var(--color-text);
	}

	.lang-bars {
		display: flex;
		gap: 6px;
	}

	.lang-bar {
		display: block;
		width: 32px;
		height: 8px;
		background: var(--color-hairline);
		border-radius: 2px;
	}

	.lang-bar--filled.lang-bar--native {
		background: color-mix(in oklch, var(--color-accent) 60%, transparent);
	}

	.lang-bar--filled.lang-bar--advanced {
		background: color-mix(in oklch, var(--color-text) 80%, transparent);
	}

	.lang-bar--filled:not(.lang-bar--native):not(.lang-bar--advanced) {
		background: var(--color-text-muted);
	}

	.lang-caption {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--color-text-subtle);
		letter-spacing: 0.06em;
	}

	/* ── Education ─────────────────────────────────────── */
	.edu-section {
		padding-top: 64px;
		padding-bottom: 64px;
		border-top: 1px solid var(--color-hairline);
	}

	.edu-col {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
	}

	.edu-school {
		font-family: var(--font-display);
		font-size: 24px;
		font-weight: 400;
		color: var(--color-text);
		margin-bottom: 8px;
	}

	.edu-degree {
		font-size: 16px;
		color: var(--color-text-muted);
	}

	/* ── Elsewhere ─────────────────────────────────────── */
	.elsewhere-section {
		padding-top: 96px;
		padding-bottom: 96px;
		border-top: 1px solid var(--color-hairline);
	}

	.elsewhere-grid {
		list-style: none;
		padding: 0;
		margin-top: 32px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: var(--color-hairline);
	}

	@media (max-width: 640px) {
		.elsewhere-grid {
			grid-template-columns: 1fr;
		}
	}

	.elsewhere-tile {
		background: var(--color-bg);
		padding: 32px;
	}

	.elsewhere-link {
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-decoration: none;
		color: inherit;
	}

	.elsewhere-platform {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.elsewhere-label {
		font-family: var(--font-display);
		font-size: 20px;
		color: var(--color-text);
		transition: color 200ms var(--ease-ui);
	}

	.elsewhere-link:hover .elsewhere-label {
		color: var(--color-accent);
	}

	/* ── Resume ────────────────────────────────────────── */
	.resume-section {
		padding-top: 96px;
		padding-bottom: 96px;
		border-top: 1px solid var(--color-hairline);
	}

	.resume-col {
		display: flex;
		justify-content: center;
	}

	.resume-btn {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 14px 28px;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.06em;
		color: var(--color-text);
		text-decoration: none;
		transition:
			border-color 200ms var(--ease-ui),
			color 200ms var(--ease-ui);
	}

	.resume-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}
</style>
