<script lang="ts">
	/**
	 * Renders project.body portable-text with custom components.
	 * Code blocks are pre-highlighted server-side via Shiki and passed as highlightedCode map.
	 */
	import { PortableText } from '@portabletext/svelte';
	import PTImage from './PTImage.svelte';
	import PTCode from './PTCode.svelte';
	import PTCallout from './PTCallout.svelte';
	import PTMetricGrid from './PTMetricGrid.svelte';
	import PTPullQuote from './PTPullQuote.svelte';
	import PTBeforeAfter from './PTBeforeAfter.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type AnyBlock = any;

	interface Props {
		body: AnyBlock[];
		highlightedCode?: Record<string, string>;
	}

	let { body, highlightedCode = {} }: Props = $props();

	const components = {
		types: {
			imageWithCaption: PTImage,
			codeBlock: PTCode,
			callout: PTCallout,
			metricGrid: PTMetricGrid,
			pullQuote: PTPullQuote,
			beforeAfter: PTBeforeAfter
		}
	};

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]/g, '');
	}
</script>

<div class="pt-body">
	<PortableText
		value={body}
		{components}
	/>
</div>

<style>
	.pt-body {
		/* Typography for the reading column */
		font-family: var(--font-sans);
		font-size: 17px;
		line-height: 1.65;
		color: var(--color-text);
	}

	/* Headings inside portable text */
	:global(.pt-body h2),
	:global(.pt-body h3),
	:global(.pt-body h4) {
		font-family: var(--font-display);
		color: var(--color-text);
		position: relative;
	}

	:global(.pt-body h2) {
		font-size: 32px;
		letter-spacing: -0.015em;
		line-height: 1.2;
		margin: 56px 0 20px;
	}

	:global(.pt-body h3) {
		font-size: 24px;
		letter-spacing: -0.01em;
		line-height: 1.25;
		margin: 40px 0 16px;
	}

	:global(.pt-body h4) {
		font-size: 18px;
		line-height: 1.3;
		margin: 32px 0 12px;
	}

	/* Anchor link on headings */
	:global(.pt-body .heading-anchor) {
		position: absolute;
		left: -24px;
		top: 50%;
		transform: translateY(-50%);
		font-family: var(--font-mono);
		font-size: 14px;
		color: var(--color-text-subtle);
		text-decoration: none;
		opacity: 0;
		transition: opacity 180ms ease;
		padding: 0 4px;
	}

	:global(.pt-body h2:hover .heading-anchor),
	:global(.pt-body h3:hover .heading-anchor),
	:global(.pt-body h4:hover .heading-anchor) {
		opacity: 1;
	}

	:global(.pt-body p) {
		margin: 0 0 24px;
	}

	:global(.pt-body ul),
	:global(.pt-body ol) {
		margin: 0 0 24px;
		padding-left: 24px;
	}

	:global(.pt-body li) {
		margin-bottom: 8px;
		line-height: 1.65;
	}

	:global(.pt-body strong) {
		color: var(--color-text);
		font-weight: 600;
	}

	:global(.pt-body em) {
		font-style: italic;
	}

	:global(.pt-body a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		transition: color 180ms ease;
	}

	:global(.pt-body a:hover) {
		color: var(--color-text);
	}

	:global(.pt-body blockquote) {
		border-left: 1px solid var(--color-hairline);
		padding-left: 24px;
		margin: 32px 0;
		color: var(--color-text-muted);
		font-style: italic;
	}
</style>
