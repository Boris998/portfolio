<script lang="ts">
	/** Horizontal 1px accent rule beneath headings. */
	interface Props {
		width?: string;
		marginTop?: number;
	}

	let { width = '32px', marginTop = 32 }: Props = $props();
</script>

<span
	class="gold-rule"
	aria-hidden="true"
	style:width
	style:margin-top="{marginTop}px"
></span>

<style>
	.gold-rule {
		display: block;
		height: 1px;
		background: var(--color-accent);
	}
</style>
