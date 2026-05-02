<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LenisProvider from '$lib/components/LenisProvider.svelte';
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
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a href="#main-content" class="skip-to-content">Skip to content</a>

<!-- Film grain overlay — non-negotiable atmosphere layer -->
<div class="film-grain" aria-hidden="true"></div>

<LenisProvider>
	<Nav settings={data.settings} />

	<main id="main-content">
		{@render children()}
	</main>

	<Footer settings={data.settings} {theme} onThemeChange={setTheme} />
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
