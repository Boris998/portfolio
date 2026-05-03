<script lang="ts">
	/**
	 * Case study layout — magazine-essay feel.
	 * Particle field disabled on all /work/* routes (see +layout.svelte).
	 * TODO Sprint 9: Replace hero image OG with Satori-rendered branded OG image.
	 */
	import type { PageData } from './$types';
	import { urlFor } from '$lib/sanity/image';
	import GoldRule from '$lib/components/GoldRule.svelte';
	import MetricChip from '$lib/components/MetricChip.svelte';
	import StackChip from '$lib/components/StackChip.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import PortableTextBody from '$lib/components/portable-text/PortableTextBody.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Link2, GitBranch, FileText, ExternalLink } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const project = $derived(data.project!);
	const related = $derived(data.related ?? []);
	const highlightedCode = $derived(data.highlightedCode ?? {});

	const heroImageSrc = $derived(
		project.heroImage
			? urlFor(project.heroImage).width(2400).height(1350).fit('crop').auto('format').url()
			: null
	);
	const heroImageSrc2x = $derived(
		project.heroImage
			? urlFor(project.heroImage).width(4800).height(2700).fit('crop').auto('format').url()
			: null
	);
	const ogImageSrc = $derived(
		project.heroImage
			? urlFor(project.heroImage).width(1200).height(630).fit('crop').auto('format').url()
			: null
	);

	const firstMetric = $derived(project.metrics?.[0]);

	const dateLabel = $derived((): string => {
		const fmt = (d: string) =>
			new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
		if (project.startDate && project.endDate) {
			return `${fmt(project.startDate)} — ${fmt(project.endDate)}`;
		}
		if (project.startDate) return `${fmt(project.startDate)} — Present`;
		return '';
	});

	const eyebrow = $derived(
		[project.role?.toUpperCase(), dateLabel()].filter(Boolean).join(' · ')
	);

	const summary155 = $derived((project.summary ?? '').slice(0, 155));

	// Gallery: only show if 3+ images
	const galleryImages = $derived((project.gallery ?? []).length >= 3 ? project.gallery ?? [] : []);
	let galleryDialogOpen = $state(false);
	let galleryDialogSrc = $state('');
	let galleryDialogAlt = $state('');

	function openGallery(img: typeof galleryImages[number]) {
		galleryDialogSrc = urlFor(img).width(1800).auto('format').url();
		galleryDialogAlt = img.alt ?? '';
		galleryDialogOpen = true;
	}

	// Contextual body intro: first blocks up to first heading
	const contextBlocks = $derived((): unknown[] => {
		const body = project.body ?? [];
		const cutoff = body.findIndex(
			(b) =>
				b &&
				typeof b === 'object' &&
				'_type' in b &&
				b._type === 'block' &&
				'style' in b &&
				typeof b.style === 'string' &&
				b.style.startsWith('h')
		);
		return cutoff > 0 ? body.slice(0, cutoff) : body.slice(0, 3);
	});

	// Canonical URL — approximate; server rendering has no window.location
	const canonicalPath = $derived(`/work/${project.slug?.current ?? ''}`);
</script>

<svelte:head>
	<title>{project.title} — Work — Boris</title>
	<meta name="description" content={summary155} />
	<link rel="canonical" href={canonicalPath} />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{project.title} — Work — Boris" />
	<meta property="og:description" content={summary155} />
	{#if ogImageSrc}
		<meta property="og:image" content={ogImageSrc} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{project.title} — Work — Boris" />
	<meta name="twitter:description" content={summary155} />
	{#if ogImageSrc}
		<meta name="twitter:image" content={ogImageSrc} />
	{/if}

	<!-- JSON-LD: CreativeWork -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "CreativeWork",
			"name": project.title,
			"description": summary155,
			"author": { "@type": "Person", "name": "Boris Tadirov" },
			"datePublished": project.startDate,
			"image": ogImageSrc
		})}
	</script>

	<!-- JSON-LD: Breadcrumb -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{ "@type": "ListItem", "position": 1, "name": "Home", "item": "/" },
				{ "@type": "ListItem", "position": 2, "name": "Work", "item": "/work" },
				{ "@type": "ListItem", "position": 3, "name": project.title, "item": canonicalPath }
			]
		})}
	</script>
</svelte:head>

<article class="case-study">

	<!-- 1. Breadcrumb -->
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<a href="/" class="bc-link">Home</a>
		<span class="bc-sep" aria-hidden="true">/</span>
		<a href="/work" class="bc-link">Work</a>
		<span class="bc-sep" aria-hidden="true">/</span>
		<span class="bc-current">{project.title}</span>
	</nav>

	<!-- 2. Hero — asymmetric -->
	<div class="hero-grid">
		<div class="hero-left">
			{#if eyebrow}
				<p class="hero-eyebrow">{eyebrow}</p>
			{/if}
			<h1 class="hero-h1">{project.title}</h1>
			<GoldRule />
			{#if project.summary}
				<p class="hero-summary">{project.summary}</p>
			{/if}
			{#if (project.stack ?? []).length > 0}
				<div class="hero-stack" aria-label="Technologies used">
					{#each project.stack ?? [] as tech (tech._id)}
						<StackChip {tech} size="sm" />
					{/each}
				</div>
			{/if}
			{#if (project.links ?? []).length > 0}
				<div class="hero-links" aria-label="Project links">
					{#each project.links ?? [] as link (link._key)}
						{#if link.type === 'nda'}
							<span class="nda-badge">Under NDA</span>
						{:else if link.url}
							<a href={link.url} class="hero-link" target="_blank" rel="noopener noreferrer">
								{#if link.type === 'live'}
									<Link2 size={12} />
									Live site
								{:else if link.type === 'github'}
									<GitBranch size={12} />
									Source
								{:else if link.type === 'case-study'}
									<FileText size={12} />
									Case study
								{:else}
									<ExternalLink size={12} />
									{link.label ?? 'Link'}
								{/if}
							</a>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<div class="hero-right" aria-label="Key metric">
			{#if firstMetric}
				<MetricChip
					value={firstMetric.value ?? ''}
					label={firstMetric.label ?? ''}
					trend={firstMetric.trend ?? 'neutral'}
					size="lg"
				/>
			{/if}
		</div>
	</div>

	<!-- 3. Hero image — full-bleed -->
	{#if heroImageSrc}
		<div class="hero-image-wrap">
			<img
				src={heroImageSrc}
				srcset={heroImageSrc2x ? `${heroImageSrc} 1x, ${heroImageSrc2x} 2x` : undefined}
				alt={project.heroImage?.alt ?? project.title ?? ''}
				width="2400"
				height="1350"
				fetchpriority="high"
				decoding="sync"
				class="hero-image"
			/>
		</div>
	{/if}

	<!-- 4. Two-column context + sticky metadata -->
	<div class="context-grid">
		<div class="context-left">
			<p class="section-eyebrow">CONTEXT</p>
			<h2 class="context-h2">What we were solving.</h2>
			{#if contextBlocks().length > 0}
				<PortableTextBody body={contextBlocks()} {highlightedCode} />
			{/if}
		</div>

		<aside class="metadata-card" aria-label="Project metadata">
			{#if project.client}
				<div class="meta-item">
					<span class="meta-label">CLIENT</span>
					<span class="meta-value">{project.client}</span>
				</div>
			{/if}
			{#if dateLabel()}
				<div class="meta-item">
					<span class="meta-label">DURATION</span>
					<span class="meta-value">{dateLabel()}</span>
				</div>
			{/if}
			{#if project.role}
				<div class="meta-item">
					<span class="meta-label">ROLE</span>
					<span class="meta-value">{project.role}</span>
				</div>
			{/if}
		</aside>
	</div>

	<!-- Divider -->
	<div class="section-rule" aria-hidden="true"></div>

	<!-- 5. Long-form body -->
	{#if (project.body ?? []).length > 0}
		<div class="body-section">
			<div class="body-column">
				<PortableTextBody body={project.body ?? []} {highlightedCode} />
			</div>
		</div>
	{/if}

	<!-- Divider -->
	<div class="section-rule" aria-hidden="true"></div>

	<!-- 6. Outcomes -->
	{#if (project.metrics ?? []).length > 0}
		<section class="outcomes-section" aria-labelledby="outcomes-heading">
			<div class="outcomes-inner">
				<p class="section-eyebrow">OUTCOMES</p>
				<h2 id="outcomes-heading" class="outcomes-h2">What it earned its place doing.</h2>
				<GoldRule />
				<div class="outcomes-grid">
					{#each project.metrics ?? [] as metric (metric._key)}
						<MetricChip
							value={metric.value ?? ''}
							label={metric.label ?? ''}
							trend={metric.trend ?? 'neutral'}
							size="md"
							bordered
						/>
					{/each}
				</div>
				{#if project.summary}
					<p class="outcomes-prose">{project.summary}</p>
				{/if}
			</div>
		</section>
	{/if}

	<!-- 7. Gallery -->
	{#if galleryImages.length > 0}
		<div class="section-rule" aria-hidden="true"></div>
		<section class="gallery-section" aria-label="Project gallery">
			<div class="gallery-grid">
				{#each galleryImages as img (img._key)}
					{@const src = urlFor(img).width(900).height(675).fit('crop').auto('format').url()}
					<button
						class="gallery-item"
						onclick={() => openGallery(img)}
						aria-label="View full size: {img.alt ?? 'gallery image'}"
						style:cursor="zoom-in"
					>
						<img
							{src}
							alt={img.alt ?? ''}
							loading="lazy"
							decoding="async"
							width="900"
							height="675"
							class="gallery-img"
						/>
					</button>
				{/each}
			</div>

			<Dialog.Root bind:open={galleryDialogOpen}>
				<Dialog.Portal>
					<Dialog.Overlay />
					<Dialog.Content class="gallery-dialog">
						<Dialog.Title class="sr-only">{galleryDialogAlt || 'Gallery image'}</Dialog.Title>
						<img src={galleryDialogSrc} alt={galleryDialogAlt} class="gallery-dialog-img" />
						<Dialog.Close class="gallery-dialog-close">Close</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</section>
	{/if}

	<!-- 8. Hire-me CTA -->
	<div class="section-rule" aria-hidden="true"></div>
	<section class="cta-section" aria-labelledby="cta-heading">
		<p class="section-eyebrow">WANT SIMILAR WORK?</p>
		<h2 id="cta-heading" class="cta-h2">Let's discuss the next one.</h2>
		<Button href="/contact" variant="default" class="cta-btn">Begin a conversation</Button>
	</section>

	<!-- 9. Related projects -->
	{#if related.length > 0}
		<div class="section-rule" aria-hidden="true"></div>
		<section class="related-section" aria-labelledby="related-heading">
			<p class="section-eyebrow">RELATED WORK</p>
			<div class="related-grid">
				{#each related.slice(0, 3) as rel, i (rel.slug?.current ?? i)}
					<ProjectCard
						project={{
							_id: rel.slug?.current ?? String(i),
							title: rel.title ?? undefined,
							slug: rel.slug ?? undefined,
							summary: rel.summary ?? undefined,
							heroImage: rel.heroImage ?? undefined,
							role: rel.role ?? undefined,
							endDate: rel.endDate ?? undefined
						}}
						variant="compact"
						showMetric={false}
						index={i}
					/>
				{/each}
			</div>
		</section>
	{/if}

</article>

<style>
	.case-study {
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 var(--page-x, clamp(24px, 5vw, 96px));
	}

	/* ── Breadcrumb ── */
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 32px 0;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--color-text-muted);
	}

	.bc-link {
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 180ms ease;
	}

	.bc-link:hover {
		color: var(--color-text);
	}

	.bc-sep {
		color: var(--color-text-subtle);
	}

	.bc-current {
		color: var(--color-text-subtle);
	}

	/* ── Hero grid ── */
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr minmax(0, 240px);
		gap: 64px;
		align-items: center;
		padding: 128px 0 64px;
	}

	@media (max-width: 900px) {
		.hero-grid {
			grid-template-columns: 1fr;
			gap: 48px;
			padding: 80px 0 48px;
		}
	}

	.hero-eyebrow {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin: 0 0 32px;
	}

	.hero-h1 {
		font-family: var(--font-display);
		font-size: clamp(40px, 5vw, 64px);
		letter-spacing: -0.025em;
		line-height: 1.0;
		color: var(--color-text);
		margin: 0 0 28px;
		max-width: 18ch;
	}

	.hero-summary {
		font-size: 22px;
		line-height: 1.4;
		color: var(--color-text);
		max-width: 42ch;
		margin: 24px 0 32px;
	}

	.hero-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 32px;
	}

	.hero-links {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: center;
	}

	.hero-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.06em;
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 180ms ease;
	}

	.hero-link:hover {
		color: var(--color-text);
	}

	.nda-badge {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius-sm);
		padding: 3px 10px;
	}

	.hero-right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	/* ── Hero image ── */
	.hero-image-wrap {
		margin: 0 calc(-1 * var(--page-x, clamp(24px, 5vw, 96px)));
	}

	.hero-image {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		display: block;
		border-radius: var(--radius);
		border: 1px solid var(--color-hairline);
	}

	/* ── Context + metadata ── */
	.context-grid {
		display: grid;
		grid-template-columns: 1fr minmax(0, 320px);
		gap: 64px;
		padding: 128px 0;
		align-items: start;
	}

	@media (max-width: 900px) {
		.context-grid {
			grid-template-columns: 1fr;
			gap: 48px;
			padding: 64px 0;
		}
	}

	.section-eyebrow {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin: 0 0 20px;
	}

	.context-h2 {
		font-family: var(--font-display);
		font-size: 28px;
		letter-spacing: -0.01em;
		line-height: 1.2;
		color: var(--color-text);
		margin: 0 0 24px;
	}

	.metadata-card {
		position: sticky;
		top: 128px;
		background: var(--color-surface-paper);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		padding: 32px;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 24px 0;
		border-bottom: 1px solid var(--color-hairline);
	}

	.meta-item:first-child {
		padding-top: 0;
	}

	.meta-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.meta-label {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.meta-value {
		font-size: 16px;
		line-height: 1.4;
		color: var(--color-text);
	}

	/* ── Section rule ── */
	.section-rule {
		height: 1px;
		background: var(--color-hairline);
		margin: 0;
	}

	/* ── Long-form body ── */
	.body-section {
		padding: 96px 0;
		background: var(--color-surface-paper);
		margin: 0 calc(-1 * var(--page-x, clamp(24px, 5vw, 96px)));
		padding-left: var(--page-x, clamp(24px, 5vw, 96px));
		padding-right: var(--page-x, clamp(24px, 5vw, 96px));
	}

	.body-column {
		max-width: 64ch;
		margin: 0 auto;
	}

	/* ── Outcomes ── */
	.outcomes-section {
		background: var(--color-bg-elevated);
		margin: 0 calc(-1 * var(--page-x, clamp(24px, 5vw, 96px)));
		padding: 128px var(--page-x, clamp(24px, 5vw, 96px));
		border-top: 1px solid var(--color-hairline);
		border-bottom: 1px solid var(--color-hairline);
	}

	.outcomes-inner {
		max-width: 1248px;
		margin: 0 auto;
	}

	.outcomes-h2 {
		font-family: var(--font-display);
		font-size: clamp(32px, 4vw, 56px);
		letter-spacing: -0.02em;
		line-height: 1.1;
		color: var(--color-text);
		margin: 0 0 28px;
	}

	.outcomes-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 32px;
		margin: 64px 0 32px;
	}

	@media (max-width: 640px) {
		.outcomes-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 24px;
		}
	}

	.outcomes-prose {
		font-size: 17px;
		line-height: 1.65;
		color: var(--color-text);
		max-width: 64ch;
		margin: 32px 0 0;
	}

	/* ── Gallery ── */
	.gallery-section {
		padding: 96px 0;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	@media (max-width: 900px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.gallery-grid {
			grid-template-columns: 1fr;
		}
	}

	.gallery-item {
		display: block;
		padding: 0;
		background: none;
		border: none;
		border-radius: var(--radius);
		overflow: hidden;
	}

	.gallery-img {
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		display: block;
		border-radius: var(--radius);
		border: 1px solid var(--color-hairline);
		transition: transform 600ms var(--ease-spring), opacity 200ms ease;
	}

	.gallery-item:hover .gallery-img {
		transform: scale(1.02);
	}

	:global(.gallery-dialog) {
		max-width: min(90vw, 1200px) !important;
		background: var(--color-bg) !important;
		border: 1px solid var(--color-hairline) !important;
		border-radius: var(--radius) !important;
		padding: 16px !important;
	}

	.gallery-dialog-img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: var(--radius-sm);
	}

	:global(.gallery-dialog-close) {
		position: absolute;
		top: 12px;
		right: 12px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--color-text-muted);
		background: none;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius-sm);
		padding: 4px 10px;
		cursor: pointer;
	}

	/* ── CTA ── */
	.cta-section {
		padding: 128px 0;
		text-align: center;
		max-width: 600px;
		margin: 0 auto;
	}

	.cta-h2 {
		font-family: var(--font-display);
		font-size: 40px;
		letter-spacing: -0.02em;
		line-height: 1.15;
		color: var(--color-text);
		margin: 0 0 40px;
	}

	:global(.cta-btn) {
		font-family: var(--font-mono) !important;
		font-size: 12px !important;
		letter-spacing: 0.08em !important;
		text-transform: uppercase !important;
	}

	/* ── Related ── */
	.related-section {
		padding: 96px 0 128px;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 32px;
		margin-top: 32px;
	}

	@media (max-width: 900px) {
		.related-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 24px;
		}
	}

	@media (max-width: 640px) {
		.related-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}
</style>
