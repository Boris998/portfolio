<script lang="ts">
	/**
	 * Root canvas — one per app, fixed behind all content.
	 * Render mode: on-demand (frameloop only ticks when invalidated).
	 * Must only be mounted client-side (wrap in ClientOnly or {#if browser}).
	 */
	import { browser } from '$app/environment';
	import { Canvas as ThrelteCanvas } from '@threlte/core';
	import { ACESFilmicToneMapping } from 'three';
	import { getDeviceTier } from './hooks/useDeviceTier.js';
	import { reducedMotion } from './hooks/useReducedMotion.js';
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();

	const tier = getDeviceTier();
	const dprMap = { high: Math.min(window.devicePixelRatio, 2), mid: Math.min(window.devicePixelRatio, 1.5), low: 1 };
	const dpr = dprMap[tier];

	let isReducedMotion = $state(false);
	$effect(() => {
		const unsub = reducedMotion.subscribe((v) => { isReducedMotion = v; });
		return unsub;
	});
</script>

{#if browser && !isReducedMotion}
	<div
		style="position:fixed;inset:0;z-index:-1;pointer-events:none;width:100%;height:100%;background:oklch(0.18 0.009 65);"
		aria-hidden="true"
	>
		<ThrelteCanvas
			renderMode="always"
			{dpr}
			colorManagementEnabled={true}
			toneMapping={ACESFilmicToneMapping}
		>
			{#if children}
				{@render children()}
			{/if}
		</ThrelteCanvas>
	</div>
{/if}
