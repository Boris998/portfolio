<script lang="ts">
	type Theme = 'dark' | 'light';
	let activeTheme = $state<Theme>('dark');

	function toggleTheme() {
		activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', activeTheme);
	}

	const colorTokens = [
		{ name: '--color-bg', value: 'oklch(0.18 0.005 60)', label: 'Background' },
		{ name: '--color-bg-elevated', value: 'oklch(0.22 0.005 60)', label: 'Elevated' },
		{ name: '--color-surface-paper', value: 'oklch(0.21 0.006 60)', label: 'Surface Paper' },
		{ name: '--color-text', value: 'oklch(0.94 0.004 80)', label: 'Text' },
		{ name: '--color-text-muted', value: 'oklch(0.68 0.005 60)', label: 'Text Muted' },
		{ name: '--color-text-subtle', value: 'oklch(0.52 0.004 60)', label: 'Text Subtle' },
		{ name: '--color-hairline', value: 'oklch(0.94 0.004 80 / 0.08)', label: 'Hairline' },
		{ name: '--color-accent', value: 'oklch(0.78 0.10 85)', label: 'Accent Gold' },
		{ name: '--color-accent-deep', value: 'oklch(0.62 0.12 78)', label: 'Accent Deep' }
	];

	const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192];
</script>

<svelte:head>
	<title>Style Guide — Boris Tadirov</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="style-guide">
	<!-- Theme toggle -->
	<div class="theme-toggle-bar">
		<span class="eyebrow">Style Reference</span>
		<button class="theme-toggle" onclick={toggleTheme}>
			{activeTheme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
		</button>
	</div>

	<!-- ── Page heading ── -->
	<section class="section">
		<h1 class="display-h1">
			Style Guide
			<span class="gold-rule" aria-hidden="true"></span>
		</h1>
		<p class="body-lg">
			Design reference for the heritage atelier portfolio. Not linked from navigation.
		</p>
	</section>

	<!-- ── Color tokens ── -->
	<section class="section">
		<h2 class="section-heading">Color Tokens</h2>
		<p class="eyebrow">Dark mode palette — overridden via <code>[data-theme="light"]</code></p>

		<div class="swatch-grid">
			{#each colorTokens as token (token.name)}
				<div class="swatch-card">
					<div class="swatch" style="background: var({token.name})"></div>
					<span class="swatch-label">{token.label}</span>
					<code class="swatch-var">{token.name}</code>
					<code class="swatch-value">{token.value}</code>
				</div>
			{/each}
		</div>

		<div class="contrast-grid">
			<h3 class="subsection-heading">Contrast Pairs</h3>
			<div class="contrast-pairs">
				<div
					class="contrast-pair"
					style="background: var(--color-bg); color: var(--color-text); padding: 1.5rem; border: 1px solid var(--color-hairline);"
				>
					<span class="eyebrow">Text on Background</span>
					<p>The quick brown fox — body copy sample at 17px</p>
				</div>
				<div
					class="contrast-pair"
					style="background: var(--color-accent-deep); color: var(--color-bg); padding: 1.5rem;"
				>
					<span class="eyebrow">BG on Accent Deep</span>
					<p>CTA button label — always --color-bg on --color-accent-deep</p>
				</div>
				<div
					class="contrast-pair"
					style="background: var(--color-bg-elevated); color: var(--color-text-muted); padding: 1.5rem; border: 1px solid var(--color-hairline);"
				>
					<span class="eyebrow">Muted on Elevated</span>
					<p>Secondary information at --color-text-muted</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Typography ── -->
	<section class="section">
		<h2 class="section-heading">Typography</h2>

		<div class="type-sample">
			<h1 class="display-h1">
				Heritage atelier typography
				<span class="gold-rule" aria-hidden="true"></span>
			</h1>
			<p class="type-spec">84px · Instrument Serif · letter-spacing -0.025em · line-height 0.95</p>
		</div>

		<div class="type-sample">
			<h2 class="display-h2">Precision in every detail</h2>
			<p class="type-spec">56px · Instrument Serif · letter-spacing -0.02em · line-height 1.05</p>
		</div>

		<div class="type-sample">
			<h3 class="display-h3">Enduring craft over production speed</h3>
			<p class="type-spec">36px · Instrument Serif · letter-spacing -0.015em</p>
		</div>

		<div class="type-sample">
			<h4 class="display-h4">A full-stack perspective on what ships</h4>
			<p class="type-spec">28px · Instrument Serif · letter-spacing -0.01em</p>
		</div>

		<hr class="hairline-rule" />

		<div class="type-sample">
			<p class="body-lg">
				Body large — 18px Inter Variable, line-height 1.65. Used for introductory paragraphs and
				pull quotes. The spacing between lines creates breathing room that signals quality.
			</p>
			<p class="type-spec">18px · Inter Variable · line-height 1.65</p>
		</div>

		<div class="type-sample">
			<p class="body">
				Body standard — 17px Inter Variable, tracking -0.005em. This is the primary reading rhythm
				of the site. Warm ivory on obsidian. The slight negative tracking tightens the Inter
				letterforms into something more considered.
			</p>
			<p class="type-spec">17px · Inter Variable · letter-spacing -0.005em</p>
		</div>

		<div class="type-sample">
			<p class="body-sm">
				Body small — 14px Inter Variable. Used for captions, metadata, footnotes. Maintains the same
				tracking discipline. Never drops below 12px in any context.
			</p>
			<p class="type-spec">14px · Inter Variable</p>
		</div>

		<div class="type-sample">
			<p class="eyebrow">01 — SECTION LABEL</p>
			<p class="type-spec">
				12px · JetBrains Mono Variable · uppercase · letter-spacing 0.12em — structural use only
			</p>
		</div>
	</section>

	<!-- ── Spacing scale ── -->
	<section class="section">
		<h2 class="section-heading">Spacing Scale</h2>
		<p class="eyebrow">4-step base with natural progressions</p>

		<div class="spacing-scale">
			{#each spacingScale as step (step)}
				<div class="spacing-row">
					<code class="spacing-label">{step}px</code>
					<div
						class="spacing-bar"
						style="width: {Math.min(step, 192)}px; height: 24px; background: var(--color-accent);"
					></div>
				</div>
			{/each}
		</div>
	</section>

	<!-- ── Component primitives ── -->
	<section class="section">
		<h2 class="section-heading">Component Primitives</h2>

		<!-- Buttons -->
		<div class="component-block">
			<h3 class="subsection-heading">Buttons</h3>
			<div class="component-row">
				<div class="component-sample">
					<button class="btn-primary">Primary CTA</button>
					<p class="type-spec">Default</p>
				</div>
				<div class="component-sample">
					<button class="btn-primary btn-hover-demo" data-state="hover">Primary CTA</button>
					<p class="type-spec">Hover</p>
				</div>
				<div class="component-sample">
					<button class="btn-primary" disabled>Primary CTA</button>
					<p class="type-spec">Disabled</p>
				</div>
			</div>

			<div class="component-row">
				<div class="component-sample">
					<button class="btn-secondary">Secondary</button>
					<p class="type-spec">Default</p>
				</div>
				<div class="component-sample">
					<button class="btn-secondary btn-hover-demo">Secondary</button>
					<p class="type-spec">Hover</p>
				</div>
				<div class="component-sample">
					<button class="btn-secondary" disabled>Secondary</button>
					<p class="type-spec">Disabled</p>
				</div>
			</div>

			<div class="component-row">
				<div class="component-sample">
					<button class="btn-ghost">Ghost Button</button>
					<p class="type-spec">Default</p>
				</div>
				<div class="component-sample">
					<button class="btn-ghost btn-hover-demo">Ghost Button</button>
					<p class="type-spec">Hover</p>
				</div>
			</div>
		</div>

		<!-- Stack Chip -->
		<div class="component-block">
			<h3 class="subsection-heading">Stack Chip</h3>
			<div class="component-row">
				<span class="stack-chip">React</span>
				<span class="stack-chip">SvelteKit</span>
				<span class="stack-chip">TypeScript</span>
				<span class="stack-chip">Threlte</span>
				<span class="stack-chip">Sanity</span>
			</div>
		</div>

		<!-- Metric Chip -->
		<div class="component-block">
			<h3 class="subsection-heading">Metric Chip</h3>
			<div class="component-row">
				<div class="metric-chip">
					<span class="metric-value">+15%</span>
					<span class="metric-label">revenue</span>
					<span class="metric-trend" aria-label="trending up">↑</span>
				</div>
				<div class="metric-chip">
					<span class="metric-value">−23%</span>
					<span class="metric-label">bounce rate</span>
					<span class="metric-trend metric-trend--down" aria-label="trending down">↓</span>
				</div>
				<div class="metric-chip">
					<span class="metric-value">+4.2×</span>
					<span class="metric-label">conversions</span>
					<span class="metric-trend" aria-label="trending up">↑</span>
				</div>
			</div>
		</div>

		<!-- Availability Note -->
		<div class="component-block">
			<h3 class="subsection-heading">Availability Note</h3>
			<div class="availability-note">
				<span class="availability-dot" aria-hidden="true"></span>
				<span class="availability-text">Selectively booking · Q3 2026</span>
			</div>
		</div>

		<!-- Card surface -->
		<div class="component-block">
			<h3 class="subsection-heading">Card Surface</h3>
			<div class="card-demo">
				<div class="card-surface">
					<p class="eyebrow">Case study</p>
					<h4 class="display-h4" style="margin-top: 0.5rem;">Project title goes here</h4>
					<p class="body-sm" style="color: var(--color-text-muted); margin-top: 0.5rem;">
						A brief description of the work, the challenge, and the measurable outcome. Written with
						precision, not decoration.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Rules ── -->
	<section class="section">
		<h2 class="section-heading">Rules & Dividers</h2>

		<div class="rule-demo">
			<p class="eyebrow">Hairline rule — 1px at 6–10% opacity</p>
			<hr class="hairline-rule" />
		</div>

		<div class="rule-demo">
			<p class="eyebrow">Gold rule — 1px --color-accent, sits 32px below H1 baseline</p>
			<div class="gold-rule-demo"></div>
		</div>
	</section>
</div>

<style>
	/* ── Layout ─────────────────────────────────────────────── */
	.style-guide {
		max-width: 1440px;
		margin: 0 auto;
		padding: 4rem 1.5rem 12rem;
	}

	.section {
		padding-top: 6rem;
		padding-bottom: 6rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	.section:last-child {
		border-bottom: none;
	}

	/* ── Theme toggle bar ────────────────────────────────────── */
	.theme-toggle-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	.theme-toggle {
		background: transparent;
		border: 1px solid var(--color-hairline);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 0.5rem 1rem;
		border-radius: var(--radius);
		cursor: pointer;
		transition:
			color 120ms var(--ease-ui),
			border-color 120ms var(--ease-ui);
	}

	.theme-toggle:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
	}

	/* ── Section labels ──────────────────────────────────────── */
	.section-heading {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		margin-bottom: 2rem;
	}

	.subsection-heading {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		margin-bottom: 1rem;
	}

	/* ── Display typography ──────────────────────────────────── */
	.display-h1 {
		position: relative;
		font-family: var(--font-display);
		font-size: 84px;
		font-weight: 400;
		letter-spacing: -0.025em;
		line-height: 0.95;
		color: var(--color-text);
		margin: 0 0 3rem;
		padding-bottom: 2.5rem;
	}

	.display-h2 {
		font-family: var(--font-display);
		font-size: 56px;
		font-weight: 400;
		letter-spacing: -0.02em;
		line-height: 1.05;
		color: var(--color-text);
		margin: 0;
	}

	.display-h3 {
		font-family: var(--font-display);
		font-size: 36px;
		font-weight: 400;
		letter-spacing: -0.015em;
		line-height: 1.1;
		color: var(--color-text);
		margin: 0;
	}

	.display-h4 {
		font-family: var(--font-display);
		font-size: 28px;
		font-weight: 400;
		letter-spacing: -0.01em;
		line-height: 1.2;
		color: var(--color-text);
		margin: 0;
	}

	/* ── Gold rule — sits 32px below H1 baseline ─────────────── */
	.gold-rule {
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		background: var(--color-accent);
	}

	/* ── Body typography ──────────────────────────────────────── */
	.body-lg {
		font-size: 18px;
		line-height: 1.65;
		color: var(--color-text);
		max-width: 64ch;
		margin: 0;
	}

	.body {
		font-size: 17px;
		line-height: 1.65;
		letter-spacing: -0.005em;
		color: var(--color-text);
		max-width: 64ch;
		margin: 0;
	}

	.body-sm {
		font-size: 14px;
		line-height: 1.65;
		color: var(--color-text-muted);
		max-width: 64ch;
		margin: 0;
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		display: block;
	}

	.type-spec {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--color-text-subtle);
		letter-spacing: 0.05em;
		margin-top: 0.75rem;
	}

	.type-sample {
		margin-bottom: 3rem;
	}

	/* ── Hairline rule ────────────────────────────────────────── */
	.hairline-rule {
		border: none;
		border-top: 1px solid var(--color-hairline);
		margin: 2rem 0;
	}

	/* ── Color swatches ───────────────────────────────────────── */
	.swatch-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.swatch-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.swatch {
		width: 100%;
		aspect-ratio: 1;
		border-radius: var(--radius);
		border: 1px solid var(--color-hairline);
	}

	.swatch-label {
		font-family: var(--font-sans);
		font-size: 13px;
		color: var(--color-text);
		font-weight: 500;
	}

	.swatch-var {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--color-accent);
		letter-spacing: 0.03em;
	}

	.swatch-value {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--color-text-subtle);
	}

	.contrast-grid {
		margin-top: 3rem;
	}

	.contrast-pairs {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1px;
		background: var(--color-hairline);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		overflow: hidden;
	}

	.contrast-pair p {
		margin: 0.5rem 0 0;
		font-size: 15px;
		line-height: 1.5;
	}

	/* ── Spacing scale ────────────────────────────────────────── */
	.spacing-scale {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 2rem;
	}

	.spacing-row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.spacing-label {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--color-text-subtle);
		min-width: 3rem;
		text-align: right;
	}

	.spacing-bar {
		border-radius: 2px;
		opacity: 0.7;
	}

	/* ── Component blocks ─────────────────────────────────────── */
	.component-block {
		margin-bottom: 3rem;
	}

	.component-row {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		align-items: flex-start;
	}

	.component-sample {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}

	/* ── Primary button ───────────────────────────────────────── */
	.btn-primary {
		background: var(--color-accent-deep);
		color: var(--color-bg);
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: var(--radius);
		cursor: pointer;
		transition:
			box-shadow 120ms var(--ease-ui),
			opacity 120ms var(--ease-ui);
	}

	.btn-primary:hover,
	.btn-primary.btn-hover-demo {
		box-shadow:
			0 0 0 3px var(--color-accent-deep),
			0 0 16px 2px oklch(0.62 0.12 78 / 0.3);
	}

	.btn-primary:disabled {
		opacity: 0.35;
		cursor: not-allowed;
		box-shadow: none;
	}

	/* ── Secondary button ─────────────────────────────────────── */
	.btn-secondary {
		background: transparent;
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.75rem 1.5rem;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		cursor: pointer;
		transition:
			border-color 120ms var(--ease-ui),
			color 120ms var(--ease-ui);
	}

	.btn-secondary:hover,
	.btn-secondary.btn-hover-demo {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	.btn-secondary:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	/* ── Ghost button ─────────────────────────────────────────── */
	.btn-ghost {
		background: transparent;
		color: var(--color-text);
		font-family: var(--font-sans);
		font-size: 15px;
		padding: 0.25rem 0;
		border: none;
		border-bottom: 1px solid transparent;
		border-radius: 0;
		cursor: pointer;
		transition:
			color 120ms var(--ease-ui),
			border-color 120ms var(--ease-ui);
	}

	.btn-ghost:hover,
	.btn-ghost.btn-hover-demo {
		color: var(--color-accent);
		border-bottom-color: var(--color-accent);
	}

	/* ── Stack chip ───────────────────────────────────────────── */
	.stack-chip {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		color: var(--color-text-muted);
		padding: 0.3rem 0.75rem;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		display: inline-block;
	}

	/* ── Metric chip ──────────────────────────────────────────── */
	.metric-chip {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
		padding: 0.5rem 1rem;
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
	}

	.metric-value {
		font-family: var(--font-mono);
		font-size: 16px;
		font-variant-numeric: tabular-nums;
		color: var(--color-accent);
		font-weight: 500;
	}

	.metric-label {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.metric-trend {
		font-size: 12px;
		color: var(--color-accent);
	}

	.metric-trend--down {
		color: oklch(0.65 0.15 25);
	}

	/* ── Availability note ────────────────────────────────────── */
	.availability-note {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
	}

	.availability-dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-accent);
		flex-shrink: 0;
	}

	.availability-text {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	/* ── Card surface ─────────────────────────────────────────── */
	.card-demo {
		max-width: 400px;
	}

	.card-surface {
		background: var(--color-bg-elevated);
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		padding: 2rem;
	}

	/* ── Rule demos ───────────────────────────────────────────── */
	.rule-demo {
		margin-bottom: 3rem;
	}

	.rule-demo .eyebrow {
		margin-bottom: 1rem;
	}

	.gold-rule-demo {
		height: 1px;
		background: var(--color-accent);
		width: 100%;
	}
</style>
