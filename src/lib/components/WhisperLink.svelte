<script lang="ts">
	/** Inline anchor that gains a gold underline on hover — used once on the home page. */
	interface Props {
		href: string;
		children?: import('svelte').Snippet;
	}

	let { href, children }: Props = $props();
</script>

<a {href} class="whisper-link">
	{@render children?.()}
</a>

<style>
	.whisper-link {
		color: var(--color-text);
		text-decoration: none;
		position: relative;
		transition: color 280ms var(--ease-out-quint);
	}

	.whisper-link::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-accent);
		transition: width 280ms var(--ease-out-quint);
	}

	.whisper-link:hover {
		color: var(--color-accent);
	}

	.whisper-link:hover::after {
		width: 100%;
	}

	.whisper-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
		border-radius: 2px;
	}
</style>
