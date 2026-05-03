<script lang="ts">
	import { onMount } from 'svelte';
	import { Copy, Check } from 'lucide-svelte';

	interface Props {
		value: {
			language?: string;
			code?: string;
			filename?: string;
		};
		highlightedHtml?: string;
	}

	let { value, highlightedHtml = '' }: Props = $props();

	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout>;

	async function copyCode() {
		if (!value.code) return;
		await navigator.clipboard.writeText(value.code);
		copied = true;
		clearTimeout(copyTimer);
		copyTimer = setTimeout(() => (copied = false), 1800);
	}
</script>

<div class="code-block">
	<div class="code-header">
		{#if value.filename}
			<span class="filename">{value.filename}</span>
		{:else if value.language}
			<span class="lang">{value.language}</span>
		{/if}
		<button
			class="copy-btn"
			onclick={copyCode}
			aria-label="Copy code"
		>
			{#if copied}
				<Check size={14} />
			{:else}
				<Copy size={14} />
			{/if}
		</button>
	</div>

	{#if highlightedHtml}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html highlightedHtml}
	{:else}
		<pre class="fallback"><code>{value.code ?? ''}</code></pre>
	{/if}
</div>

<style>
	.code-block {
		position: relative;
		margin: 32px 0;
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 16px 8px 24px;
		border-bottom: 1px solid var(--color-hairline);
	}

	.lang,
	.filename {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--color-text-muted);
		letter-spacing: 0.04em;
	}

	.copy-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius-sm);
		padding: 4px 6px;
		cursor: pointer;
		color: var(--color-text-muted);
		transition: color 180ms ease, border-color 180ms ease;
	}

	.copy-btn:hover {
		color: var(--color-text);
		border-color: var(--color-text-subtle);
	}

	/* Shiki outputs a <pre> with its own background — override to match our palette */
	:global(.code-block pre) {
		margin: 0;
		padding: 24px;
		font-family: var(--font-mono);
		font-size: 14px;
		line-height: 1.6;
		background: var(--color-bg-elevated) !important;
		overflow-x: auto;
	}

	:global(.code-block code) {
		font-family: var(--font-mono);
	}

	.fallback {
		margin: 0;
		padding: 24px;
		font-family: var(--font-mono);
		font-size: 14px;
		line-height: 1.6;
		color: var(--color-text);
		overflow-x: auto;
	}
</style>
