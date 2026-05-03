<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let mounted = $state(false);

	$effect(() => {
		mounted = true;
	});
</script>

{#if mounted}
	{@render children()}
{/if}
