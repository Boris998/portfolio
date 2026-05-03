<script lang="ts">
	import { urlFor } from '$lib/sanity/image';

	interface ContentImage {
		asset?: { _ref: string; _type: 'reference'; [key: string]: unknown };
		_type: 'image';
		[key: string]: unknown;
	}

	interface Props {
		value: {
			beforeLabel?: string;
			afterLabel?: string;
			beforeContent?: ContentImage;
			afterContent?: ContentImage;
		};
	}

	let { value }: Props = $props();

	const beforeSrc = $derived(value.beforeContent ? urlFor(value.beforeContent).width(800).auto('format').url() : null);
	const afterSrc = $derived(value.afterContent ? urlFor(value.afterContent).width(800).auto('format').url() : null);
</script>

<div class="before-after">
	<div class="side">
		<span class="ba-label">{value.beforeLabel ?? 'Before'}</span>
		{#if beforeSrc}
			<img src={beforeSrc} alt={value.beforeLabel ?? 'Before'} loading="lazy" class="ba-img" />
		{/if}
	</div>
	<div class="divider" aria-hidden="true"></div>
	<div class="side">
		<span class="ba-label">{value.afterLabel ?? 'After'}</span>
		{#if afterSrc}
			<img src={afterSrc} alt={value.afterLabel ?? 'After'} loading="lazy" class="ba-img" />
		{/if}
	</div>
</div>

<style>
	.before-after {
		display: grid;
		grid-template-columns: 1fr 1px 1fr;
		gap: 0 24px;
		margin: 40px 0;
		align-items: start;
	}

	.side {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.ba-label {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.ba-img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-hairline);
	}

	.divider {
		background: var(--color-hairline);
		height: 100%;
		min-height: 40px;
	}

	@media (max-width: 640px) {
		.before-after {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1px auto;
			gap: 24px 0;
		}

		.divider {
			height: 1px;
			width: 100%;
		}
	}
</style>
