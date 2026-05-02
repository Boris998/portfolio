<script lang="ts">
	/** Eyebrow + display-serif title + GoldRule + optional lede paragraph. */
	import GoldRule from './GoldRule.svelte';

	interface Props {
		eyebrow: string;
		title: string;
		lede?: string;
		align?: 'left' | 'right';
	}

	let { eyebrow, title, lede, align = 'left' }: Props = $props();
</script>

<header class="section-header" class:align-right={align === 'right'}>
	<p class="eyebrow">{eyebrow}</p>
	<h2 class="title">{title}</h2>
	<GoldRule width="32px" marginTop={32} />
	{#if lede}
		<p class="lede">{lede}</p>
	{/if}
</header>

<style>
	.section-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.align-right {
		align-items: flex-end;
		text-align: right;
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin: 0 0 16px;
	}

	.title {
		font-family: var(--font-display);
		font-size: clamp(36px, 4vw, 56px);
		letter-spacing: -0.02em;
		line-height: 1.0;
		color: var(--color-text);
		margin: 0;
	}

	.lede {
		font-size: 18px;
		line-height: 1.55;
		color: var(--color-text-muted);
		max-width: 52ch;
		margin: 32px 0 0;
	}
</style>
