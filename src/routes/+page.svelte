<script lang="ts">
	import { env } from '$env/dynamic/public';
	import type { PageData } from './$types';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import PracticeSection from '$lib/components/home/PracticeSection.svelte';
	import SelectedWorkSection from '$lib/components/home/SelectedWorkSection.svelte';
	import CraftSection from '$lib/components/home/CraftSection.svelte';
	import LabWhisperSection from '$lib/components/home/LabWhisperSection.svelte';
	import TestimonialSection from '$lib/components/home/TestimonialSection.svelte';
	import ContactSection from '$lib/components/home/ContactSection.svelte';
	import type { Project, TechStack } from '$lib/sanity/types';

	let { data }: { data: PageData } = $props();

	const siteUrl = $derived(env.PUBLIC_SITE_URL ?? 'https://boris.dev');

	// Build JSON-LD Person schema
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Boris Tadirov',
		jobTitle: 'Full-stack Developer & CRO Specialist',
		url: siteUrl,
		sameAs: (data.settings?.socialLinks ?? []).map((l) => l.url).filter(Boolean)
	});

	// Queries expand stack[]-> at runtime; cast to the expanded shape
	type ExpandedProject = Omit<Project, 'stack'> & { stack?: TechStack[] };
	const featuredProjects = $derived(data.featuredProjects as ExpandedProject[]);
</script>

<svelte:head>
	<title>Boris — Full-stack developer &amp; CRO specialist</title>
	<meta
		name="description"
		content="Three years of production work in React, SvelteKit, and Node — and a quieter discipline of measurement and iteration that runs underneath all of it."
	/>
	<link rel="canonical" href="{siteUrl}/" />

	<!-- Open Graph -->
	<meta property="og:title" content="Boris — Full-stack developer & CRO specialist" />
	<meta
		property="og:description"
		content="Three years of production work in React, SvelteKit, and Node — and a quieter discipline of measurement and iteration that runs underneath all of it."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{siteUrl}/og-default.png" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Boris — Full-stack developer & CRO specialist" />
	<meta
		name="twitter:description"
		content="Three years of production work in React, SvelteKit, and Node — and a quieter discipline of measurement and iteration that runs underneath all of it."
	/>
	<meta name="twitter:image" content="{siteUrl}/og-default.png" />

	<!-- JSON-LD -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<HeroSection settings={data.settings} />

<div class="hairline" role="separator" aria-hidden="true"></div>

<PracticeSection />

<div class="hairline" role="separator" aria-hidden="true"></div>

<SelectedWorkSection projects={featuredProjects} />

<div class="hairline" role="separator" aria-hidden="true"></div>

<CraftSection techStacks={data.techStacks} />

<div class="hairline" role="separator" aria-hidden="true"></div>

<LabWhisperSection />

<div class="hairline" role="separator" aria-hidden="true"></div>

{#if data.testimonials.length > 0}
	<TestimonialSection testimonials={data.testimonials} />
	<div class="hairline" role="separator" aria-hidden="true"></div>
{/if}

<ContactSection settings={data.settings} />

<style>
	.hairline {
		width: 100%;
		height: 1px;
		background: var(--color-hairline);
	}
</style>
