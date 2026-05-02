<script lang="ts">
	import Lenis from 'lenis';
	import { onMount } from 'svelte';

	let { children }: { children?: import('svelte').Snippet } = $props();

	onMount(() => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;

		const lenis = new Lenis({
			lerp: 0.08,
			smoothWheel: true,
			syncTouch: false
		});

		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}
		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	});
</script>

{@render children?.()}
