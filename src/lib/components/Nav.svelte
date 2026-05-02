<script lang="ts">
	/** Site navigation — scroll-reveal, monogram, mobile word-menu overlay, availability note. */
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import AvailabilityNote from './AvailabilityNote.svelte';
	import GoldRule from './GoldRule.svelte';
	import type { Settings } from '$lib/sanity/types';

	interface Props {
		settings?: Settings | null;
	}

	let { settings }: Props = $props();

	const navLinks = [
		{ href: '/work', label: 'Work' },
		{ href: '/about', label: 'About' },
		{ href: '/lab', label: 'Lab' },
		{ href: '/writing', label: 'Writing' },
		{ href: '#contact', label: 'Contact' }
	];

	let scrolled = $state(false);
	let hidden = $state(false);
	let mobileOpen = $state(false);
	let lastY = $state(0);

	onMount(() => {
		function onScroll() {
			const y = window.scrollY;
			scrolled = y > 8;
			hidden = y > lastY && y > 80;
			lastY = y;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function openMenu() {
		mobileOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeMenu() {
		mobileOpen = false;
		document.body.style.overflow = '';
	}

	function handleOverlayKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeMenu();
	}

	// Trap focus in overlay
	let overlayRef: HTMLDivElement | undefined = $state();
	$effect(() => {
		if (mobileOpen && overlayRef) {
			const focusable = overlayRef.querySelectorAll<HTMLElement>(
				'a[href], button, [tabindex]:not([tabindex="-1"])'
			);
			focusable[0]?.focus();
		}
	});
</script>

<nav
	aria-label="Main navigation"
	class="nav"
	class:scrolled
	class:hidden
>
	<div class="nav-inner">
		<!-- Monogram -->
		<a href="/" class="monogram" aria-label="Boris — home">
			<span class="monogram-text">B.</span>
			<GoldRule width="12px" marginTop={4} />
		</a>

		<!-- Desktop links -->
		<ul class="nav-links" role="list">
			{#each navLinks as link (link.href)}
				<li>
					<a
						href={link.href}
						class="nav-link"
						aria-current={$page.url.pathname === link.href ? 'page' : undefined}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Right: availability + mobile trigger -->
		<div class="nav-right">
			<div class="availability-desktop">
				<AvailabilityNote
					availability={settings?.availability}
					availabilityNote={settings?.availabilityNote}
				/>
			</div>
			<button class="menu-trigger" aria-label="Open navigation menu" onclick={openMenu}>
				Menu
			</button>
		</div>
	</div>
</nav>

<!-- Mobile overlay -->
{#if mobileOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="mobile-overlay"
		role="dialog"
		aria-modal="true"
		aria-label="Navigation menu"
		tabindex="-1"
		bind:this={overlayRef}
		onkeydown={handleOverlayKeydown}
	>
		<button class="overlay-close" onclick={closeMenu} aria-label="Close navigation menu">
			Close
		</button>

		<nav aria-label="Mobile navigation">
			<ul class="overlay-links" role="list">
				{#each navLinks as link (link.href)}
					<li>
						<a href={link.href} class="overlay-link" onclick={closeMenu}>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="overlay-bottom">
			<AvailabilityNote
				availability={settings?.availability}
				availabilityNote={settings?.availabilityNote}
			/>
		</div>
	</div>
{/if}

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 100;
		height: 72px;
		background: var(--color-bg);
		border-bottom: 1px solid transparent;
		transform: translateY(0);
		transition:
			transform 280ms var(--ease-ui),
			border-color 280ms var(--ease-ui);
	}

	.nav.scrolled {
		border-bottom-color: var(--color-hairline);
	}

	.nav.hidden {
		transform: translateY(-100%);
	}

	.nav-inner {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0;
		height: 100%;
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 3rem;
	}

	/* Monogram */
	.monogram {
		text-decoration: none;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.monogram-text {
		font-family: var(--font-display);
		font-size: 24px;
		color: var(--color-text);
		line-height: 1;
	}

	/* Hide the gold rule by default, show on hover via opacity */
	.monogram :global(.gold-rule) {
		opacity: 0;
		transition: opacity 280ms var(--ease-ui);
	}

	.monogram:hover :global(.gold-rule) {
		opacity: 1;
	}

	/* Desktop nav links */
	.nav-links {
		display: flex;
		justify-content: center;
		gap: 2rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-link {
		font-size: 14px;
		font-weight: 500;
		color: var(--color-text-muted);
		text-decoration: none;
		position: relative;
		padding-bottom: 2px;
		transition: color 280ms var(--ease-ui);
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 1px;
		background: var(--color-accent);
		transition: width 280ms var(--ease-ui);
	}

	.nav-link:hover,
	.nav-link[aria-current='page'] {
		color: var(--color-text);
	}

	.nav-link:hover::after,
	.nav-link[aria-current='page']::after {
		width: 100%;
	}

	.nav-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 4px;
		border-radius: 2px;
	}

	/* Right column */
	.nav-right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.availability-desktop {
		display: block;
	}

	.menu-trigger {
		display: none;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: color 120ms var(--ease-ui);
	}

	.menu-trigger:hover {
		color: var(--color-text);
	}

	.menu-trigger:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 4px;
	}

	/* Mobile overlay */
	.mobile-overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: var(--color-bg);
		display: flex;
		flex-direction: column;
		padding: 2rem;
		animation: overlay-in 480ms var(--ease-out-quint) forwards;
	}

	@keyframes overlay-in {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.overlay-close {
		align-self: flex-end;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin-bottom: 3rem;
		transition: color 120ms var(--ease-ui);
	}

	.overlay-close:hover {
		color: var(--color-text);
	}

	.overlay-close:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 4px;
	}

	.overlay-links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
	}

	.overlay-link {
		font-family: var(--font-display);
		font-size: 48px;
		color: var(--color-text);
		text-decoration: none;
		transition: color 120ms var(--ease-ui);
		line-height: 1.2;
	}

	.overlay-link:hover {
		color: var(--color-text-muted);
	}

	.overlay-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 4px;
	}

	.overlay-bottom {
		padding-top: 2rem;
		border-top: 1px solid var(--color-hairline);
	}

	/* Responsive */
	@media (max-width: 767px) {
		.nav-inner {
			padding: 0 1.5rem;
		}

		.nav-links {
			display: none;
		}

		.availability-desktop {
			display: none;
		}

		.menu-trigger {
			display: block;
		}
	}

	@media (min-width: 768px) {
		.mobile-overlay {
			display: none;
		}
	}
</style>
