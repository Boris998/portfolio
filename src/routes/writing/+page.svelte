<script lang="ts">
	import GoldRule from '$lib/components/GoldRule.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const posts = $derived(data.posts ?? []);

	function formatDate(iso: string | undefined): string {
		if (!iso) return '';
		const d = new Date(iso);
		return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
	}
</script>

<svelte:head>
	<title>Writing — Boris</title>
	<meta name="description" content="Occasional essays on building and optimizing software." />
	<meta property="og:title" content="Writing — Boris" />
	<meta property="og:description" content="Occasional essays on building and optimizing software." />
	<link rel="alternate" type="application/rss+xml" title="Boris — Writing" href="/writing/rss.xml" />
</svelte:head>

<!-- ─── Hero ────────────────────────────────────────────────── -->
<section class="writing-hero">
	<div class="container">
		<p class="eyebrow">WRITING</p>
		<h1 class="hero-h1">Notes on building and optimizing.</h1>
		<GoldRule width="48px" marginTop={32} />
		<p class="hero-sub">Occasional essays. Mostly about the boring parts.</p>
	</div>
</section>

<!-- ─── Posts / empty state ─────────────────────────────────── -->
<section class="posts-section" aria-label="Writing index">
	<div class="container">
		{#if posts.length === 0}
			<div class="empty-state">
				<p class="empty-text">No notes yet. In the meantime —</p>
				<a href="/work" class="empty-link">see the work →</a>
				<hr class="empty-rule" aria-hidden="true" />
			</div>
		{:else}
			<ol class="post-list">
				{#each posts as post (post._id)}
					<li class="post-entry">
						<a href="/writing/{post.slug?.current}" class="post-link">
							<span class="post-date">{formatDate(post.publishedAt)}</span>
							<span class="post-body">
								<span class="post-title">{post.title}</span>
								{#if post.excerpt}
									<span class="post-excerpt">{post.excerpt}</span>
								{/if}
								{#if post.tags && post.tags.length > 0}
									<span class="post-tags" aria-label="Tags">
										{post.tags.join(' · ')}
									</span>
								{/if}
							</span>
							{#if post.readTime}
								<span class="post-readtime">{post.readTime} MIN</span>
							{/if}
						</a>
					</li>
				{/each}
			</ol>
		{/if}
	</div>
</section>

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
	.writing-hero {
		padding-top: 128px;
		padding-bottom: 96px;
	}

	.hero-h1 {
		font-family: var(--font-display);
		font-size: clamp(38px, 5.5vw, 64px);
		font-weight: 400;
		line-height: 1.05;
		letter-spacing: -0.02em;
		color: var(--color-text);
		margin-bottom: 0;
	}

	.hero-sub {
		font-size: 18px;
		color: var(--color-text-muted);
		margin-top: 32px;
	}

	/* ── Empty state ───────────────────────────────────── */
	.posts-section {
		border-top: 1px solid var(--color-hairline);
		padding-top: 64px;
		padding-bottom: 128px;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 640px;
		margin: 0 auto;
		text-align: center;
		padding: 64px 0;
	}

	.empty-text {
		font-size: 18px;
		color: var(--color-text-muted);
	}

	.empty-link {
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.06em;
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.empty-rule {
		border: none;
		border-top: 1px solid var(--color-hairline);
		margin-top: 32px;
	}

	/* ── Post list ─────────────────────────────────────── */
	.post-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.post-entry {
		border-top: 1px solid var(--color-hairline);
		position: relative;
	}

	.post-entry:last-child {
		border-bottom: 1px solid var(--color-hairline);
	}

	.post-link {
		display: grid;
		grid-template-columns: 120px 1fr auto;
		gap: 32px;
		padding: 48px 0;
		text-decoration: none;
		color: inherit;
		position: relative;
	}

	.post-link::before {
		content: '';
		position: absolute;
		left: -4px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--color-accent);
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 280ms var(--ease-out-quint);
	}

	.post-entry:hover .post-link::before {
		transform: scaleY(1);
	}

	@media (max-width: 640px) {
		.post-link {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}

	.post-date {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
		padding-top: 6px;
		align-self: start;
	}

	.post-body {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.post-title {
		font-family: var(--font-display);
		font-size: 32px;
		font-weight: 400;
		line-height: 1.2;
		color: var(--color-text);
		transition: color 200ms var(--ease-ui);
	}

	.post-entry:hover .post-title {
		color: var(--color-accent);
	}

	.post-excerpt {
		font-size: 17px;
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.post-tags {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.06em;
		color: var(--color-text-subtle);
	}

	.post-readtime {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		color: var(--color-text-subtle);
		align-self: start;
		padding-top: 6px;
		text-align: right;
	}
</style>
