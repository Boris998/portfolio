<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	interface Props {
		value: {
			asset?: { asset?: { _ref: string; _type: 'reference' }; _type: 'image'; [key: string]: unknown };
			alt?: string;
			caption?: string;
			_breakout?: boolean;
		};
	}

	let { value }: Props = $props();

	let open = $state(false);

	const imgSrc = $derived(value.asset ? urlFor(value.asset).width(900).auto('format').url() : null);
	const imgSrcFull = $derived(value.asset ? urlFor(value.asset).width(1800).auto('format').url() : null);
</script>

{#if imgSrc}
	<figure class="pt-image" class:breakout={value._breakout}>
		<button
			class="img-btn"
			onclick={() => (open = true)}
			aria-label="Expand image{value.alt ? `: ${value.alt}` : ''}"
			style:cursor="zoom-in"
		>
			<img
				src={imgSrc}
				alt={value.alt ?? ''}
				loading="lazy"
				decoding="async"
				class="img"
			/>
		</button>
		{#if value.caption}
			<figcaption class="caption">{value.caption}</figcaption>
		{/if}
	</figure>

	<Dialog.Root bind:open>
		<Dialog.Portal>
			<Dialog.Overlay />
			<Dialog.Content class="img-dialog-content">
				<Dialog.Title class="sr-only">{value.alt ?? 'Full size image'}</Dialog.Title>
				{#if imgSrcFull}
					<img src={imgSrcFull} alt={value.alt ?? ''} class="dialog-img" />
				{/if}
				<Dialog.Close class="dialog-close-btn">Close</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
{/if}

<style>
	.pt-image {
		margin: 40px 0;
	}

	.breakout {
		margin-left: calc(-1 * var(--body-inset, 0px));
		margin-right: calc(-1 * var(--body-inset, 0px));
		width: calc(100% + 2 * var(--body-inset, 0px));
	}

	.img-btn {
		display: block;
		width: 100%;
		padding: 0;
		background: none;
		border: none;
		border-radius: var(--radius);
		overflow: hidden;
	}

	.img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: var(--radius);
		border: 1px solid var(--color-hairline);
		transition: opacity 200ms ease;
	}

	.img-btn:hover .img {
		opacity: 0.92;
	}

	.caption {
		font-family: var(--font-mono);
		font-size: 12px;
		font-style: italic;
		color: var(--color-text-muted);
		margin-top: 10px;
		letter-spacing: 0.02em;
	}

	:global(.img-dialog-content) {
		max-width: min(90vw, 1200px);
		background: var(--color-bg);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		padding: 16px;
	}

	.dialog-img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: var(--radius-sm);
	}

	:global(.dialog-close-btn) {
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
</style>
