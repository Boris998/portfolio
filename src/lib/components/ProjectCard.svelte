<script lang="ts">
	/**
	 * ProjectCard — /work index + related projects bottom of case study.
	 * Gallery variant: 3D tilt, parallax layers, metric chip overlay.
	 * Compact variant: no tilt, no metric chip, used in /work/[slug] related section.
	 * Home page uses ProjectCardGallery.svelte (no metric chips, no tilt).
	 */
	import type { TechStack } from '$lib/sanity/types';
	import { urlFor } from '$lib/sanity/image';
	import StackChip from './StackChip.svelte';
	import MetricChip from './MetricChip.svelte';
	import { onMount } from 'svelte';

	type ExpandedProject = {
		_id: string;
		title?: string;
		slug?: { current?: string };
		summary?: string;
		heroImage?: {
			asset?: { _ref: string; _type: 'reference' };
			alt?: string;
			_type: 'image';
			[key: string]: unknown;
		};
		metrics?: Array<{ value?: string; label?: string; trend?: 'up' | 'down' | 'neutral'; _key: string }>;
		stack?: TechStack[];
		role?: string;
		startDate?: string;
		endDate?: string;
	};

	interface Props {
		project: ExpandedProject;
		variant?: 'gallery' | 'compact';
		showMetric?: boolean;
		index?: number;
	}

	let { project, variant = 'gallery', showMetric = true, index = 0 }: Props = $props();

	const slug = $derived(project.slug?.current ?? '');
	const href = $derived(`/work/${slug}`);
	const isGallery = $derived(variant === 'gallery');

	const visibleStack = $derived((project.stack ?? []).slice(0, 4));
	const overflowCount = $derived(Math.max(0, (project.stack?.length ?? 0) - 4));

	const firstMetric = $derived(project.metrics?.[0]);
	const hasMetric = $derived(showMetric && !!firstMetric);

	const dateRange = $derived((): string => {
		const s = project.startDate ? new Date(project.startDate).getFullYear() : null;
		const e = project.endDate ? new Date(project.endDate).getFullYear() : null;
		if (s && e && s !== e) return `${s}–${e}`;
		if (s && !e) return `${s} — Present`;
		return s?.toString() ?? '';
	});

	const thumbSrc = $derived(
		project.heroImage
			? urlFor(project.heroImage).width(isGallery ? 1200 : 800).height(isGallery ? 750 : 450).fit('crop').auto('format').url()
			: null
	);
	const thumbSrc2x = $derived(
		project.heroImage
			? urlFor(project.heroImage).width(isGallery ? 2400 : 1600).height(isGallery ? 1500 : 900).fit('crop').auto('format').url()
			: null
	);

	// Tilt state
	let cardEl = $state<HTMLDivElement | undefined>();
	let tiltStyle = $state('');
	let isHovered = $state(false);
	let prefersReducedMotion = $state(false);
	let isCoarsePointer = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mq.matches;
		const coarseMq = window.matchMedia('(pointer: coarse)');
		isCoarsePointer = coarseMq.matches;
	});

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseMove(e: MouseEvent) {
		if (!cardEl || !isGallery || prefersReducedMotion || isCoarsePointer) return;
		const rect = cardEl.getBoundingClientRect();
		const normX = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
		const normY = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
		const rotateY = normX * 6;
		const rotateX = -normY * 6;
		tiltStyle = `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
	}

	function handleMouseLeave() {
		isHovered = false;
		tiltStyle = '';
	}

	const ariaLabel = $derived(
		hasMetric && firstMetric
			? `${project.title ?? ''}, ${firstMetric.value} ${firstMetric.label}`
			: (project.title ?? '')
	);
</script>

<a
	{href}
	class="project-card"
	class:gallery={isGallery}
	class:compact={!isGallery}
	class:hovered={isHovered}
	aria-label={ariaLabel}
	onmouseenter={handleMouseEnter}
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
>
	<div
		bind:this={cardEl}
		class="card-inner"
		style:transform={tiltStyle}
		style:transition={isHovered ? 'none' : 'transform 600ms cubic-bezier(0.32, 0.72, 0, 1)'}
		style:will-change={isHovered ? 'transform' : 'auto'}
	>
		<!-- Thumbnail -->
		<div class="thumbnail" style:transform={isHovered && isGallery && !prefersReducedMotion && !isCoarsePointer ? 'translateZ(2px)' : ''}>
			{#if thumbSrc}
				<img
					src={thumbSrc}
					srcset={thumbSrc2x ? `${thumbSrc} 1x, ${thumbSrc2x} 2x` : undefined}
					alt={project.heroImage?.alt ?? project.title ?? ''}
					loading={index === 0 ? 'eager' : 'lazy'}
					fetchpriority={index === 0 ? 'high' : 'auto'}
					decoding="async"
					width={isGallery ? 1200 : 800}
					height={isGallery ? 750 : 450}
					class="thumb-img"
				/>
			{:else}
				<div class="thumb-placeholder" aria-hidden="true"></div>
			{/if}

			<!-- Metric chip overlay — gallery variant only, never on home -->
			{#if hasMetric && firstMetric && isGallery}
				<div
					class="metric-overlay"
					style:transform={isHovered && !prefersReducedMotion && !isCoarsePointer ? 'translateZ(16px)' : ''}
				>
					<MetricChip
						value={firstMetric.value ?? ''}
						label={firstMetric.label ?? ''}
						trend={firstMetric.trend ?? 'neutral'}
						size="sm"
						bordered
					/>
				</div>
			{/if}
		</div>

		<!-- Card body -->
		<div class="card-body">
			{#if project.role || dateRange()}
				<p class="meta">
					{#if project.role}{project.role}{/if}
					{#if project.role && dateRange()}<span class="sep" aria-hidden="true">·</span>{/if}
					{#if dateRange()}{dateRange()}{/if}
				</p>
			{/if}

			<h3 class="title">{project.title}</h3>

			{#if project.summary}
				<p class="summary">{project.summary}</p>
			{/if}

			{#if visibleStack.length > 0}
				<div
					class="stack-row"
					aria-label="Technologies used"
					style:transform={isHovered && isGallery && !prefersReducedMotion && !isCoarsePointer ? 'translateZ(8px)' : ''}
				>
					{#each visibleStack as tech (tech._id)}
						<StackChip {tech} size="sm" />
					{/each}
					{#if overflowCount > 0}
						<span class="overflow" aria-label="{overflowCount} more technologies">
							+{overflowCount}
						</span>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</a>

<style>
	.project-card {
		display: block;
		text-decoration: none;
		color: inherit;
		border-radius: var(--radius);
		transform-style: preserve-3d;
	}

	.project-card:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: var(--radius);
	}

	.card-inner {
		display: flex;
		flex-direction: column;
		transform-style: preserve-3d;
		transform-origin: center center;
	}

	.thumbnail {
		position: relative;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid var(--color-hairline);
		transform-style: preserve-3d;
		transition: box-shadow 600ms cubic-bezier(0.32, 0.72, 0, 1);
	}

	.gallery .thumbnail {
		aspect-ratio: 16 / 10;
	}

	.compact .thumbnail {
		aspect-ratio: 16 / 9;
	}

	.thumb-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 600ms cubic-bezier(0.32, 0.72, 0, 1);
	}

	.hovered .thumb-img {
		transform: scale(1.02);
	}

	.hovered.gallery .thumbnail {
		box-shadow: 0 0 32px oklch(0.78 0.10 85 / 0.12);
	}

	/* Touch device tap feedback — scale only, no tilt */
	@media (pointer: coarse) {
		.project-card:active .card-inner {
			transform: scale(1.015);
		}
	}

	/* Reduced motion — opacity fade + scale */
	@media (prefers-reduced-motion: reduce) {
		.project-card {
			transition: opacity 300ms ease;
		}
		.project-card:hover {
			opacity: 0.85;
		}
		.hovered .card-inner {
			transform: scale(1.015) !important;
			transition: transform 300ms ease !important;
		}
	}

	.thumb-placeholder {
		width: 100%;
		height: 100%;
		aspect-ratio: 16 / 10;
		background: var(--color-bg-elevated);
	}

	.metric-overlay {
		position: absolute;
		top: 12px;
		right: 12px;
		background: oklch(0.22 0.005 60 / 0.9);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius-sm);
		transform-style: preserve-3d;
		transition: transform 600ms cubic-bezier(0.32, 0.72, 0, 1);
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

	.sep {
		margin: 0 0.4em;
		opacity: 0.5;
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

	.compact .title {
		font-size: 24px;
	}

	.project-card:hover .title {
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
		transform-style: preserve-3d;
		transition: transform 600ms cubic-bezier(0.32, 0.72, 0, 1);
	}

	.overflow {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.04em;
		color: var(--color-text-subtle);
	}
</style>
