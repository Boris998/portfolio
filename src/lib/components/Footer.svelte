<script lang="ts">
	/** Site footer — 3-col sitemap/connect/meta, theme toggle, deploy timestamp. */
	import type { Settings } from '$lib/sanity/types';

	interface Props {
		settings?: Settings | null;
		theme?: 'dark' | 'light';
		onThemeChange?: (t: 'dark' | 'light') => void;
	}

	let { settings, theme = 'dark', onThemeChange }: Props = $props();

	// Formatted deploy timestamp
	const deployTimestamp = $derived(() => {
		try {
			return new Date(__DEPLOY_TIMESTAMP__).toLocaleDateString('en-GB', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});
		} catch {
			return __DEPLOY_TIMESTAMP__;
		}
	});

	const socialLinks = $derived(settings?.socialLinks ?? []);
	const githubUrl = $derived(socialLinks.find((l) => l.platform?.toLowerCase() === 'github')?.url ?? 'https://github.com/btadirov');
	const linkedinUrl = $derived(socialLinks.find((l) => l.platform?.toLowerCase() === 'linkedin')?.url ?? 'https://linkedin.com/in/btadirov');
	const email = $derived(settings?.contactEmail ?? 'btadirov16@gmail.com');

	function toggleTheme() {
		onThemeChange?.(theme === 'dark' ? 'light' : 'dark');
	}
</script>

<footer class="footer">
	<div class="footer-inner">
		<div class="footer-cols">
			<!-- Sitemap -->
			<nav class="col" aria-label="Site map">
				<p class="col-label">Sitemap</p>
				<ul role="list">
					{#each [['/', 'Home'], ['/work', 'Work'], ['/about', 'About'], ['/lab', 'Lab'], ['/writing', 'Writing'], ['/uses', 'Uses'], ['#contact', 'Contact']] as [href, label] (href)}
						<li><a {href} class="footer-link">{label}</a></li>
					{/each}
				</ul>
			</nav>

			<!-- Connect -->
			<div class="col">
				<p class="col-label">Connect</p>
				<ul role="list">
					<li>
						<a href={githubUrl} class="footer-link" target="_blank" rel="noopener noreferrer">
							GitHub
						</a>
					</li>
					<li>
						<a href={linkedinUrl} class="footer-link" target="_blank" rel="noopener noreferrer">
							LinkedIn
						</a>
					</li>
					<li>
						<a href="mailto:{email}" class="footer-link">
							{email}
						</a>
					</li>
				</ul>
			</div>

			<!-- Meta -->
			<div class="col col-meta">
				<p class="col-label">Meta</p>
				<p class="meta-copy">
					Made in Skopje. Built in SvelteKit, with Threlte and Sanity. Last deployed {deployTimestamp()}. The source is on
					<a href={githubUrl} class="footer-link inline" target="_blank" rel="noopener noreferrer">GitHub</a>
					— issues welcomed; pull requests warmly received.
				</p>
			</div>
		</div>

		<!-- Bottom row -->
		<div class="footer-bottom">
			<span class="monogram" aria-label="Boris Tadirov">B.</span>
			<div class="footer-bottom-right">
				<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle color theme">
					Theme: {theme}
				</button>
				<span class="copyright">© 2026</span>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding: 8rem 0;
		border-top: 1px solid var(--color-hairline);
	}

	.footer-inner {
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 3rem;
	}

	.footer-cols {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
		margin-bottom: 4rem;
	}

	.col-label {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		margin: 0 0 1rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.footer-link {
		font-size: 14px;
		color: var(--color-text-muted);
		text-decoration: none;
		transition: color 120ms var(--ease-ui);
	}

	.footer-link:hover {
		color: var(--color-text);
	}

	.footer-link:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.footer-link.inline {
		display: inline;
	}

	.meta-copy {
		font-size: 14px;
		line-height: 1.65;
		color: var(--color-text-muted);
		margin: 0;
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 2rem;
		border-top: 1px solid var(--color-hairline);
	}

	.monogram {
		font-family: var(--font-display);
		font-size: 24px;
		color: var(--color-text);
		line-height: 1;
	}

	.footer-bottom-right {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.theme-toggle {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: color 120ms var(--ease-ui);
	}

	.theme-toggle:hover {
		color: var(--color-text);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 4px;
	}

	.copyright {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	@media (max-width: 767px) {
		.footer {
			padding: 4rem 0;
		}

		.footer-inner {
			padding: 0 1.5rem;
		}

		.footer-cols {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
