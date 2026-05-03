<script lang="ts">
	import GoldRule from '$lib/components/GoldRule.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const post = $derived(data.post);
	const related = $derived(data.related ?? []);

	let scrollY = $state(0);
	let docHeight = $state(0);
	let winHeight = $state(0);

	const readProgress = $derived(
		docHeight > winHeight ? Math.min(1, scrollY / (docHeight - winHeight)) : 0
	);

	$effect(() => {
		function onScroll() {
			scrollY = window.scrollY;
			docHeight = document.documentElement.scrollHeight;
			winHeight = window.innerHeight;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	function formatDate(iso: string | undefined): string {
		if (!iso) return '';
		return new Date(iso).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	let copyToast = $state(false);

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			copyToast = true;
			setTimeout(() => (copyToast = false), 2000);
		} catch {
			// clipboard unavailable
		}
	}

	function shareX() {
		const url = encodeURIComponent(window.location.href);
		const text = encodeURIComponent(post?.title ?? '');
		window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener');
	}

	function shareLinkedIn() {
		const url = encodeURIComponent(window.location.href);
		window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener');
	}
</script>

<svelte:head>
	<title>{post?.title ?? 'Writing'} — Boris</title>
	<meta name="description" content={post?.excerpt ?? ''} />
	<meta property="og:title" content={post?.title ?? ''} />
	<meta property="og:description" content={post?.excerpt ?? ''} />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<!-- Reading progress bar — 2px hairline, fixed top -->
<div
	class="progress-bar"
	role="progressbar"
	aria-valuenow={Math.round(readProgress * 100)}
	aria-valuemin={0}
	aria-valuemax={100}
	aria-label="Reading progress"
	style:width="{readProgress * 100}%"
></div>

<article>
	<!-- ─── Hero ───────────────────────────────────────── -->
	<header class="post-hero">
		<div class="container">
			<div class="hero-col">
				{#if post?.tags && post.tags.length > 0}
					<p class="eyebrow">{post.tags.map((t) => t.toUpperCase()).join(', ')}</p>
				{/if}
				<h1 class="hero-h1">{post?.title}</h1>
				<GoldRule width="48px" marginTop={24} />
				<p class="post-meta">
					{formatDate(post?.publishedAt)}
					{#if post?.readTime}
						· {post.readTime} min
					{/if}
				</p>
			</div>
		</div>
	</header>

	<!-- ─── Body ───────────────────────────────────────── -->
	<div class="post-body-section">
		<div class="container post-layout">
			<!-- TOC — desktop only, hidden mobile -->
			<aside class="toc-col" aria-label="Table of contents">
				<p class="toc-label">Contents</p>
				<p class="toc-empty">—</p>
			</aside>

			<!-- Body -->
			<div class="prose-col">
				{#if post?.body}
					{#await import('@portabletext/svelte') then { PortableText }}
						<div class="prose">
							<PortableText value={post.body} />
						</div>
					{/await}
				{/if}

				<!-- Share row -->
				<div class="share-row" aria-label="Share this post">
					<span class="share-label">Share —</span>
					<button class="share-btn" onclick={copyLink}>
						{#if copyToast}Copied{:else}Copy link{/if}
					</button>
					<button class="share-btn" onclick={shareX}>Share on X</button>
					<button class="share-btn" onclick={shareLinkedIn}>Share on LinkedIn</button>
				</div>
			</div>
		</div>
	</div>
</article>

<!-- ─── Related posts ────────────────────────────────────────── -->
{#if related.length > 0}
	<section class="related-section" aria-labelledby="related-heading">
		<div class="container">
			<p class="eyebrow" id="related-heading">RELATED NOTES</p>
			<ul class="related-grid">
				{#each related as rel (rel._id)}
					<li class="related-card">
						<a href="/writing/{rel.slug?.current}" class="related-link">
							<span class="related-date">
								{new Date(rel.publishedAt ?? '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
							</span>
							<span class="related-title">{rel.title}</span>
							{#if rel.excerpt}
								<span class="related-excerpt">{rel.excerpt}</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

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
		margin-bottom: 16px;
	}

	/* ── Progress bar ──────────────────────────────────── */
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 2px;
		background: var(--color-accent);
		z-index: 999;
		transition: width 80ms linear;
		pointer-events: none;
	}

	/* ── Hero ─────────────────────────────────────────── */
	.post-hero {
		padding-top: 128px;
		padding-bottom: 96px;
	}

	.hero-col {
		max-width: 64ch;
		margin: 0 auto;
	}

	.hero-h1 {
		font-family: var(--font-display);
		font-size: clamp(32px, 4vw, 56px);
		font-weight: 400;
		line-height: 1.0;
		letter-spacing: -0.025em;
		color: var(--color-text);
		margin-bottom: 0;
	}

	.post-meta {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.06em;
		color: var(--color-text-muted);
		margin-top: 16px;
	}

	/* ── Body layout ───────────────────────────────────── */
	.post-body-section {
		border-top: 1px solid var(--color-hairline);
		padding-top: 96px;
		padding-bottom: 96px;
	}

	.post-layout {
		display: grid;
		grid-template-columns: 160px 1fr;
		gap: 64px;
		align-items: start;
	}

	@media (max-width: 900px) {
		.post-layout {
			grid-template-columns: 1fr;
		}

		.toc-col {
			display: none;
		}
	}

	/* ── TOC ───────────────────────────────────────────── */
	.toc-col {
		position: sticky;
		top: 120px;
	}

	.toc-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		margin-bottom: 12px;
	}

	.toc-empty {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--color-text-subtle);
	}

	/* ── Prose ─────────────────────────────────────────── */
	.prose-col {
		max-width: 64ch;
	}

	.prose :global(p) {
		font-size: 17px;
		line-height: 1.75;
		color: var(--color-text-muted);
		margin-bottom: 24px;
	}

	.prose :global(h2) {
		font-family: var(--font-display);
		font-size: 28px;
		font-weight: 400;
		color: var(--color-text);
		margin-top: 56px;
		margin-bottom: 24px;
	}

	.prose :global(h3) {
		font-family: var(--font-display);
		font-size: 22px;
		font-weight: 400;
		color: var(--color-text);
		margin-top: 40px;
		margin-bottom: 16px;
	}

	.prose :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.prose :global(blockquote) {
		border-left: 2px solid var(--color-accent);
		padding-left: 24px;
		margin-left: 0;
		color: var(--color-text-muted);
		font-style: italic;
	}

	/* ── Share row ─────────────────────────────────────── */
	.share-row {
		display: flex;
		align-items: center;
		gap: 20px;
		padding-top: 64px;
		border-top: 1px solid var(--color-hairline);
		margin-top: 64px;
		flex-wrap: wrap;
	}

	.share-label {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.share-btn {
		background: none;
		border: none;
		padding: 0;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.06em;
		color: var(--color-text);
		cursor: pointer;
		position: relative;
		transition: color 160ms var(--ease-ui);
	}

	.share-btn::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -2px;
		height: 1px;
		background: var(--color-accent);
		transform: scaleX(0);
		transition: transform 200ms var(--ease-out-quint);
	}

	.share-btn:hover {
		color: var(--color-accent);
	}

	.share-btn:hover::after {
		transform: scaleX(1);
	}

	/* ── Related ───────────────────────────────────────── */
	.related-section {
		border-top: 1px solid var(--color-hairline);
		padding-top: 96px;
		padding-bottom: 96px;
	}

	.related-grid {
		list-style: none;
		padding: 0;
		margin-top: 32px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 40px;
	}

	@media (max-width: 768px) {
		.related-grid {
			grid-template-columns: 1fr;
		}
	}

	.related-card {
		border-top: 1px solid var(--color-hairline);
		padding-top: 24px;
	}

	.related-link {
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-decoration: none;
		color: inherit;
	}

	.related-date {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		color: var(--color-text-subtle);
	}

	.related-title {
		font-family: var(--font-display);
		font-size: 24px;
		font-weight: 400;
		color: var(--color-text);
		line-height: 1.2;
		transition: color 160ms var(--ease-ui);
	}

	.related-link:hover .related-title {
		color: var(--color-accent);
	}

	.related-excerpt {
		font-size: 14px;
		color: var(--color-text-muted);
		line-height: 1.5;
	}
</style>
