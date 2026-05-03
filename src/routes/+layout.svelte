<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LenisProvider from '$lib/components/LenisProvider.svelte';
	import ClientOnly from '$lib/components/ClientOnly.svelte';
	import RootCanvas from '$lib/three/Canvas.svelte';
	import { getHeroEl } from '$lib/three/heroTarget.svelte.js';
	import { page } from '$app/state';
	import { getFormActive } from '$lib/stores/formActive.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();

	type Theme = 'dark' | 'light';
	let theme = $state<Theme>('dark');

	$effect(() => {
		const stored = localStorage.getItem('theme') as Theme | null;
		if (stored === 'dark' || stored === 'light') {
			theme = stored;
		}
		document.documentElement.setAttribute('data-theme', theme);
	});

	function setTheme(next: Theme) {
		theme = next;
		localStorage.setItem('theme', next);
		document.documentElement.setAttribute('data-theme', next);
	}

	// Particle field is disabled on /lab and /work/* routes
	// page from $app/state is a plain reactive object in Svelte 5 — read directly, no $ prefix
	let showParticleField = $derived(
		!page.url.pathname.startsWith('/lab') && !page.url.pathname.startsWith('/work/')
	);

	// On /contact, fade particle field when form is focused
	let particleOpacity = $derived(
		page.url.pathname === '/contact' && getFormActive() ? 0 : 0.18
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="#main-content" class="skip-to-content">Skip to content</a>

<!-- Film grain overlay — non-negotiable atmosphere layer -->
<div class="film-grain" aria-hidden="true"></div>

<!-- Root Three.js canvas — one per app, fixed behind all content -->
<!-- particle-wrap fades to 0 when /contact form is focused -->
<div class="particle-wrap" style:opacity={particleOpacity} aria-hidden="true">
	<ClientOnly>
		<RootCanvas>
			{#if showParticleField}
				{#await import('$lib/three/scenes/ParticleField.svelte') then { default: ParticleField }}
					<ParticleField />
				{/await}
			{/if}
			{#if getHeroEl()}
				{#await import('$lib/three/scenes/HeroScene.svelte') then { default: HeroScene }}
					<HeroScene dom={getHeroEl()} />
				{/await}
			{/if}
		</RootCanvas>
	</ClientOnly>
</div>

<LenisProvider>
	<div class="layout-shell">
		<Nav settings={data.settings} />

		<main id="main-content">
			{@render children()}
		</main>

		<Footer settings={data.settings} {theme} onThemeChange={setTheme} />
	</div>
</LenisProvider>

<style>
	.skip-to-content {
		position: absolute;
		top: -100%;
		left: 1rem;
		z-index: 9999;
		padding: 0.5rem 1rem;
		background: var(--color-accent-deep);
		color: var(--color-bg);
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		text-decoration: none;
		border-radius: var(--radius);
		transition: top 120ms var(--ease-ui);
	}

	.skip-to-content:focus {
		top: 1rem;
	}

	.layout-shell {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.particle-wrap {
		transition: opacity 480ms var(--ease-ui);
	}

	.film-grain {
		position: fixed;
		inset: 0;
		z-index: 1000;
		pointer-events: none;
		opacity: 0.015;
		mix-blend-mode: multiply;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)'/%3E%3C/svg%3E");
		background-size: 200px 200px;
	}
</style>
