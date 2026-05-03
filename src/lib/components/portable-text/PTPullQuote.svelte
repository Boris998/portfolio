<script lang="ts">
	interface Props {
		value: {
			quote?: string;
			attribution?: string;
		};
	}

	let { value }: Props = $props();
</script>

<blockquote class="pull-quote">
	<p class="quote">{value.quote ?? ''}</p>
	{#if value.attribution}
		<footer class="attribution">— {value.attribution}</footer>
	{/if}
</blockquote>

<style>
	.pull-quote {
		margin: 48px 0;
		padding-left: 36px;
		border-left: 1px solid var(--color-accent);
		position: relative;
	}

	.quote {
		font-family: var(--font-display);
		font-size: 32px;
		line-height: 1.3;
		color: var(--color-text);
		margin: 0;
	}

	.attribution {
		margin-top: 12px;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}
</style>
