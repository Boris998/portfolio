<script lang="ts">
	import GoldRule from '$lib/components/GoldRule.svelte';
</script>

<svelte:head>
	<title>Uses — Boris</title>
	<meta name="description" content="Hardware, editor, terminal, and services Boris reaches for day to day." />
</svelte:head>

<!-- ─── Hero ────────────────────────────────────────────────── -->
<section class="uses-hero">
	<div class="container">
		<p class="eyebrow">USES</p>
		<h1 class="hero-h1">What I reach for, day to day.</h1>
		<GoldRule width="48px" marginTop={32} />
		<p class="hero-sub">Hardware, editor, terminal, services. Updated when something changes.</p>
	</div>
</section>

<!-- ─── Content ─────────────────────────────────────────────── -->
<div class="uses-body">
	<div class="container">
		<div class="uses-col">

			<section class="uses-section" aria-labelledby="editor-heading">
				<h2 id="editor-heading" class="section-eyebrow">EDITOR &amp; TERMINAL</h2>
				<ul class="uses-list">
					<li>
						<span class="item-name">VS Code</span>
						<p class="item-desc">My primary editor. Prettier, ESLint, Svelte for VS Code, and GitLens are the only extensions that have stayed longer than a month.</p>
					</li>
					<li>
						<span class="item-name">Ghostty</span>
						<p class="item-desc">GPU-accelerated terminal. Fast to open, zero friction. Replaced iTerm2 and didn't look back.</p>
					</li>
					<li>
						<span class="item-name">fish shell</span>
						<p class="item-desc">Autosuggestions out of the box. I've used zsh and bash; fish is the only one I've never wanted to swap out.</p>
					</li>
				</ul>
			</section>

			<hr class="section-rule" aria-hidden="true" />

			<section class="uses-section" aria-labelledby="hardware-heading">
				<h2 id="hardware-heading" class="section-eyebrow">HARDWARE</h2>
				<ul class="uses-list">
					<li>
						<span class="item-name">MacBook Pro 14" M3</span>
						<p class="item-desc">Does everything I need without complaint. The battery life is the only laptop battery I've stopped thinking about.</p>
					</li>
					<li>
						<span class="item-name">LG 27" 4K display</span>
						<p class="item-desc">One external monitor, side by side with the laptop. Two screens is plenty; three is theatre.</p>
					</li>
					<li>
						<span class="item-name">Keychron K2 (Brown switches)</span>
						<p class="item-desc">Mechanical without being loud. Compact enough that the mouse isn't three feet away.</p>
					</li>
					<li>
						<span class="item-name">Sony WH-1000XM5</span>
						<p class="item-desc">ANC for the deep-work sessions. They're still the quietest pair I've worn.</p>
					</li>
				</ul>
			</section>

			<hr class="section-rule" aria-hidden="true" />

			<section class="uses-section" aria-labelledby="services-heading">
				<h2 id="services-heading" class="section-eyebrow">SERVICES I USE</h2>
				<ul class="uses-list">
					<li>
						<span class="item-name">Vercel</span>
						<p class="item-desc">Deploys in seconds, preview URLs on every PR. The default for anything SvelteKit or Next.</p>
					</li>
					<li>
						<span class="item-name">Sanity</span>
						<p class="item-desc">Structured content with a real query language. This site runs on it.</p>
					</li>
					<li>
						<span class="item-name">PostHog</span>
						<p class="item-desc">Product analytics and feature flags. The EU cloud means the data stays in Europe.</p>
					</li>
					<li>
						<span class="item-name">Resend</span>
						<p class="item-desc">Transactional email that works on the first try. The contact form on this site uses it.</p>
					</li>
					<li>
						<span class="item-name">GitHub</span>
						<p class="item-desc">Code, CI, and project planning. I've tried Linear; I keep coming back here for solo work.</p>
					</li>
					<li>
						<span class="item-name">Cloudflare</span>
						<p class="item-desc">DNS and edge caching. Set it up once and stop thinking about it.</p>
					</li>
				</ul>
			</section>

			<hr class="section-rule" aria-hidden="true" />

			<section class="uses-section" aria-labelledby="tools-heading">
				<h2 id="tools-heading" class="section-eyebrow">TOOLS I REACH FOR</h2>
				<ul class="uses-list">
					<li>
						<span class="item-name">pnpm</span>
						<p class="item-desc">Faster installs, smaller node_modules. The default for every new project.</p>
					</li>
					<li>
						<span class="item-name">Figma</span>
						<p class="item-desc">Component specs and quick layout checks before I write the markup.</p>
					</li>
					<li>
						<span class="item-name">Lenis</span>
						<p class="item-desc">Smooth scroll that doesn't fight the browser. This site uses it — the difference is subtle and correct.</p>
					</li>
					<li>
						<span class="item-name">Threlte</span>
						<p class="item-desc">Three.js with Svelte's component model. The particle field and hero sculpture on this site are Threlte.</p>
					</li>
				</ul>
			</section>

			<hr class="section-rule" aria-hidden="true" />

			<section class="uses-section" aria-labelledby="ai-heading">
				<h2 id="ai-heading" class="section-eyebrow">AI</h2>
				<ul class="uses-list">
					<li>
						<span class="item-name">Claude Code</span>
						<p class="item-desc">The tool I use for the majority of implementation work. Not a copilot; more like a capable pair who reads the whole codebase before commenting.</p>
					</li>
					<li>
						<span class="item-name">ChatGPT</span>
						<p class="item-desc">Occasionally, for image generation. Nothing else has come close for that specific use.</p>
					</li>
				</ul>
			</section>

			<hr class="section-rule" aria-hidden="true" />

			<section class="uses-section" aria-labelledby="books-heading">
				<h2 id="books-heading" class="section-eyebrow">BOOKS RECENTLY</h2>
				<ul class="uses-list">
					<li>
						<span class="item-name"><em>The Pragmatic Programmer</em></span>
						<p class="item-desc">Still the most practical book about the craft, twenty years later.</p>
					</li>
					<li>
						<span class="item-name"><em>Staff Engineer</em> — Will Larson</span>
						<p class="item-desc">On what engineering leadership looks like beyond the management track.</p>
					</li>
					<li>
						<span class="item-name"><em>Obviously Awesome</em> — April Dunford</span>
						<p class="item-desc">Positioning. The framework transfers cleanly from product to personal brand.</p>
					</li>
				</ul>
			</section>

		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 clamp(24px, 5vw, 80px);
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-bottom: 24px;
	}

	/* ── Hero ─────────────────────────────────────────── */
	.uses-hero {
		padding-top: 128px;
		padding-bottom: 96px;
	}

	.hero-h1 {
		font-family: var(--font-display);
		font-size: clamp(32px, 4vw, 48px);
		font-weight: 400;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--color-text);
		margin-bottom: 0;
	}

	.hero-sub {
		font-size: 17px;
		color: var(--color-text-muted);
		margin-top: 32px;
	}

	/* ── Body ─────────────────────────────────────────── */
	.uses-body {
		border-top: 1px solid var(--color-hairline);
		padding-top: 64px;
		padding-bottom: 128px;
	}

	.uses-col {
		max-width: 64ch;
	}

	/* ── Section ───────────────────────────────────────── */
	.uses-section {
		padding: 48px 0;
	}

	.section-eyebrow {
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-bottom: 32px;
	}

	.section-rule {
		border: none;
		border-top: 1px solid var(--color-hairline);
		margin: 0;
	}

	/* ── List ──────────────────────────────────────────── */
	.uses-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.item-name {
		display: block;
		font-size: 17px;
		color: var(--color-text);
		font-weight: 500;
		margin-bottom: 4px;
	}

	.item-desc {
		font-size: 17px;
		line-height: 1.65;
		color: var(--color-text-muted);
	}
</style>
