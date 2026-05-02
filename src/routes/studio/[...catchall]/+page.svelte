<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;

	// Sanity Studio v3 is a React application. This dynamic import keeps React
	// entirely out of the SvelteKit SSR bundle and loads it only in the browser.
	onMount(() => {
		let unmount: (() => void) | undefined;

		Promise.all([
			import('react'),
			import('react-dom/client'),
			import('sanity'),
			import('../../../../sanity.config')
		]).then(([{ createElement }, { createRoot }, { Studio }, { default: config }]) => {
			const root = createRoot(container);
			root.render(createElement(Studio, { config }));
			unmount = () => root.unmount();
		});

		return () => unmount?.();
	});
</script>

<svelte:head>
	<title>Boris Portfolio Studio</title>
</svelte:head>

<div bind:this={container} style="height:100vh;width:100vw;"></div>
