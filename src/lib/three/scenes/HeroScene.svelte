<script lang="ts">
	/**
	 * Hero sculpture — single solid form, slow rotation, warm HDRI.
	 * Portals into the hero's right-column placeholder via <View dom={...}>.
	 * useTask must run inside a child of <Canvas> — so it lives in SculptureInner.
	 */
	import { View } from '@threlte/extras';
	import {
		MeshPhysicalMaterial,
		TorusKnotGeometry,
		Color,
	} from 'three';
	import { getDeviceTier } from '../hooks/useDeviceTier.js';
	import { QUALITY } from '../quality-presets.js';
	import SculptureInner from './SculptureInner.svelte';
	import { onDestroy } from 'svelte';

	interface Props {
		dom: HTMLElement | null;
		scrollProgress?: number;
		onSculptureClick?: () => void;
	}

	let { dom, scrollProgress = 0, onSculptureClick }: Props = $props();

	const tier = getDeviceTier();
	const quality = QUALITY[tier];

	const COLOR_ALABASTER = new Color(0xefe9dc);
	const COLOR_BRASS     = new Color(0xc4a76a);
	const COLOR_SHEEN     = new Color(0xcdb472);
	const COLOR_LIGHT     = new Color(0xcdb472);

	const geo = new TorusKnotGeometry(0.85, 0.28, 180, 24, 2, 3);
	const mat = new MeshPhysicalMaterial({
		color: COLOR_ALABASTER.clone(),
		metalness: 0.05,
		roughness: 0.18,
		clearcoat: quality.clearcoat,
		clearcoatRoughness: 0.05,
		sheen: 0.5,
		sheenColor: COLOR_SHEEN.clone(),
		sheenRoughness: 0.3,
		transmission: 0,
		iridescence: 0
	});

	let inView = $state(true);

	$effect(() => {
		if (!dom) return;
		const observer = new IntersectionObserver(
			([entry]) => { inView = entry.isIntersecting; },
			{ threshold: 0.1 }
		);
		observer.observe(dom);
		return () => observer.disconnect();
	});

	// Scroll-tied color shift
	$effect(() => {
		const t = Math.max(0, Math.min(1, scrollProgress));
		mat.color.lerpColors(COLOR_ALABASTER, COLOR_BRASS, t);
	});

	onDestroy(() => {
		geo.dispose();
		mat.dispose();
	});
</script>

{#if dom}
	<View {dom}>
		<!-- SculptureInner is a Canvas child — useTask works here -->
		<SculptureInner
			{geo}
			{mat}
			colorLight={COLOR_LIGHT}
			{inView}
			{onSculptureClick}
		/>
	</View>
{/if}
