<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { contactSchema } from '$lib/schemas/contact';
	import type { ContactSchema } from '$lib/schemas/contact';
	import GoldRule from '$lib/components/GoldRule.svelte';
	import { setFormActive } from '$lib/stores/formActive.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { form, errors, enhance, submitting, message } = superForm<ContactSchema>(data.form as any, {
		validators: zodClient(contactSchema as any),
		delayMs: 300,
		resetForm: false
	});

	const bringsOptions = [
		{ value: 'hiring', label: 'Hiring for a role' },
		{ value: 'client', label: 'Client work / engagement' },
		{ value: 'collaboration', label: 'Collaboration / open-source' },
		{ value: 'hi', label: 'Saying hi' }
	];

	let textareaEl = $state<HTMLTextAreaElement | null>(null);
	let copyToast = $state(false);

	function autogrow() {
		if (!textareaEl) return;
		textareaEl.style.height = 'auto';
		textareaEl.style.height = textareaEl.scrollHeight + 'px';
	}

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText('btadirov16@gmail.com');
			copyToast = true;
			setTimeout(() => (copyToast = false), 2000);
		} catch {
			// clipboard unavailable
		}
	}

	function onFocus() {
		setFormActive(true);
	}

	function onBlur() {
		setFormActive(false);
	}

	const sent = $derived($message?.startsWith('Sent'));
	const rateLimited = $derived($message === undefined && !$submitting);
</script>

<svelte:head>
	<title>Contact — Boris</title>
	<meta name="description" content="Reach out about a project, an engagement, or just to talk." />
	<meta property="og:title" content="Contact — Boris" />
	<meta property="og:description" content="Reach out about a project, an engagement, or just to talk." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<!-- ─── Hero ────────────────────────────────────────────────── -->
<section class="contact-hero">
	<div class="container">
		<div class="hero-left">
			<p class="eyebrow">CONTACT</p>
			<h1 class="hero-h1">Let's discuss the work.</h1>
			<GoldRule width="48px" marginTop={32} />
			<p class="hero-sub">
				I take on a small number of engagements each quarter. Tell me what you're building.
			</p>
		</div>
	</div>
</section>

<!-- ─── Form + alternatives ─────────────────────────────────── -->
<section class="form-section">
	<div class="container">
		<div class="form-grid">

			<!-- Left: form -->
			<div class="form-col">
				{#if sent}
					<div class="success-state" aria-live="polite">
						<p class="success-heading">Sent.</p>
						<p class="success-body">I'll reply within 24 hours on weekdays. — B.</p>
						<button
							class="reset-link"
							onclick={() => {
								$form.name = '';
								$form.email = '';
								$form.company = '';
								$form.bringsYouHere = undefined as never;
								$form.message = '';
								$message = undefined as never;
							}}
						>Send another →</button>
					</div>
				{:else}
					<form method="POST" use:enhance class="contact-form">
						<!-- Honeypot -->
						<div class="sr-only" aria-hidden="true">
							<label for="website">Website</label>
							<input
								id="website"
								name="website"
								bind:value={$form.website}
								tabindex="-1"
								autocomplete="off"
							/>
						</div>

						<div class="field">
							<label class="field-label" for="name">Name</label>
							<input
								id="name"
								name="name"
								type="text"
								autocomplete="name"
								bind:value={$form.name}
								class="field-input"
								class:field-input--error={$errors.name}
								onfocus={onFocus}
								onblur={onBlur}
							/>
							{#if $errors.name}
								<p class="field-error" role="alert"><span class="error-mark" aria-hidden="true">›</span> {($errors.name as string[])[0]}</p>
							{/if}
						</div>

						<div class="field">
							<label class="field-label" for="email">Email</label>
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								bind:value={$form.email}
								class="field-input"
								class:field-input--error={$errors.email}
								onfocus={onFocus}
								onblur={onBlur}
							/>
							{#if $errors.email}
								<p class="field-error" role="alert"><span class="error-mark" aria-hidden="true">›</span> {($errors.email as string[])[0]}</p>
							{/if}
						</div>

						<div class="field">
							<label class="field-label" for="company">Company <span class="optional">(optional)</span></label>
							<input
								id="company"
								name="company"
								type="text"
								autocomplete="organization"
								bind:value={$form.company}
								class="field-input"
								onfocus={onFocus}
								onblur={onBlur}
							/>
						</div>

						<div class="field">
							<label class="field-label" for="bringsYouHere">What brings you here?</label>
							<select
								id="bringsYouHere"
								name="bringsYouHere"
								bind:value={$form.bringsYouHere}
								class="field-select"
								class:field-input--error={$errors.bringsYouHere}
								onfocus={onFocus}
								onblur={onBlur}
							>
								<option value="" disabled selected>Select one</option>
								{#each bringsOptions as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
							{#if $errors.bringsYouHere}
								<p class="field-error" role="alert"><span class="error-mark" aria-hidden="true">›</span> {($errors.bringsYouHere as string[])[0]}</p>
							{/if}
						</div>

						<div class="field">
							<label class="field-label" for="message">Message</label>
							<textarea
								id="message"
								name="message"
								bind:value={$form.message}
								bind:this={textareaEl}
								class="field-textarea"
								class:field-input--error={$errors.message}
								rows="5"
								oninput={autogrow}
								onfocus={onFocus}
								onblur={onBlur}
							></textarea>
							{#if $errors.message}
								<p class="field-error" role="alert"><span class="error-mark" aria-hidden="true">›</span> {($errors.message as string[])[0]}</p>
							{/if}
						</div>

						<button
							type="submit"
							class="submit-btn"
							class:submit-btn--sending={$submitting}
							disabled={$submitting}
						>
							{$submitting ? 'Sending...' : 'Send message →'}
						</button>
					</form>
				{/if}
			</div>

			<!-- Right: alternatives -->
			<aside class="alternatives-col">
				<p class="alt-heading">OR REACH ME DIRECTLY</p>

				<ul class="alt-list">
					<li class="alt-item">
						<span class="alt-label">EMAIL</span>
						<div class="alt-value-row">
							<a href="mailto:btadirov16@gmail.com" class="alt-link">btadirov16@gmail.com</a>
							<button class="copy-btn" onclick={copyEmail} aria-label="Copy email address" title="Copy">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
								</svg>
							</button>
							{#if copyToast}
								<span class="copy-toast" aria-live="polite">Copied</span>
							{/if}
						</div>
					</li>

					<li class="alt-item">
						<span class="alt-label">GITHUB</span>
						<a href="https://github.com/boristadirov" target="_blank" rel="noopener noreferrer" class="alt-link">github.com/boristadirov</a>
					</li>

					<li class="alt-item">
						<span class="alt-label">LINKEDIN</span>
						<a href="https://linkedin.com/in/boristadirov" target="_blank" rel="noopener noreferrer" class="alt-link">linkedin.com/in/boristadirov</a>
					</li>
				</ul>

				<p class="alt-response">Response time: usually same day, weekdays.</p>
			</aside>
		</div>
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
	.contact-hero {
		padding-top: 128px;
		padding-bottom: 64px;
	}

	.hero-left {
		max-width: 680px;
	}

	.hero-h1 {
		font-family: var(--font-display);
		font-size: clamp(36px, 5vw, 56px);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: -0.025em;
		color: var(--color-text);
		margin-bottom: 0;
	}

	.hero-sub {
		font-size: 18px;
		line-height: 1.6;
		color: var(--color-text-muted);
		max-width: 52ch;
		margin-top: 32px;
	}

	/* ── Form section ──────────────────────────────────── */
	.form-section {
		padding-top: 64px;
		padding-bottom: 128px;
		border-top: 1px solid var(--color-hairline);
	}

	.form-grid {
		display: grid;
		grid-template-columns: 7fr 4fr;
		gap: 80px;
		align-items: start;
	}

	@media (max-width: 900px) {
		.form-grid {
			grid-template-columns: 1fr;
			gap: 64px;
		}
	}

	/* ── Form ──────────────────────────────────────────── */
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field-label {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.optional {
		font-family: var(--font-sans);
		font-size: 11px;
		text-transform: none;
		letter-spacing: 0;
		color: var(--color-text-subtle);
	}

	.field-input,
	.field-select,
	.field-textarea {
		width: 100%;
		background: transparent;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius);
		padding: 12px 16px;
		font-family: var(--font-sans);
		font-size: 16px;
		color: var(--color-text);
		transition: border-color 180ms var(--ease-ui);
		outline: none;
	}

	.field-input:focus,
	.field-select:focus,
	.field-textarea:focus {
		border-color: color-mix(in oklch, var(--color-accent) 60%, transparent);
	}

	.field-select {
		appearance: none;
		cursor: pointer;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 14px center;
		padding-right: 36px;
	}

	.field-textarea {
		resize: none;
		min-height: 120px;
		overflow: hidden;
	}

	.field-input--error {
		border-color: color-mix(in oklch, var(--color-accent) 50%, transparent);
	}

	.field-error {
		font-size: 14px;
		color: var(--color-text-muted);
		display: flex;
		align-items: baseline;
		gap: 6px;
	}

	.error-mark {
		color: var(--color-accent);
		font-size: 16px;
		line-height: 1;
	}

	.submit-btn {
		align-self: flex-start;
		padding: 14px 32px;
		background: var(--color-accent-deep);
		color: var(--color-bg);
		border: none;
		border-radius: var(--radius);
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.08em;
		cursor: pointer;
		transition: opacity 180ms var(--ease-ui);
	}

	.submit-btn:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	.submit-btn--sending {
		animation: gold-pulse 1s ease-in-out infinite;
	}

	@keyframes gold-pulse {
		0%, 100% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--color-accent) 30%, transparent); }
		50% { box-shadow: 0 0 0 4px color-mix(in oklch, var(--color-accent) 10%, transparent); }
	}

	@media (max-width: 640px) {
		.submit-btn {
			align-self: stretch;
			text-align: center;
		}
	}

	/* ── Success state ─────────────────────────────────── */
	.success-state {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 48px 0;
	}

	.success-heading {
		font-family: var(--font-display);
		font-size: 32px;
		font-weight: 400;
		color: var(--color-text);
	}

	.success-body {
		font-size: 17px;
		color: var(--color-text-muted);
	}

	.reset-link {
		align-self: flex-start;
		background: none;
		border: none;
		padding: 0;
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.06em;
		color: var(--color-accent);
		cursor: pointer;
		text-decoration: underline;
		text-underline-offset: 3px;
		margin-top: 16px;
	}

	/* ── Alternatives ──────────────────────────────────── */
	.alternatives-col {
		position: sticky;
		top: 120px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.alt-heading {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.alt-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.alt-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.alt-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
	}

	.alt-value-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.alt-link {
		font-size: 15px;
		color: var(--color-text);
		text-decoration: none;
		transition: color 160ms var(--ease-ui);
	}

	.alt-link:hover {
		color: var(--color-accent);
	}

	.copy-btn {
		background: none;
		border: none;
		padding: 4px;
		color: var(--color-text-subtle);
		cursor: pointer;
		display: flex;
		align-items: center;
		transition: color 160ms var(--ease-ui);
	}

	.copy-btn:hover {
		color: var(--color-accent);
	}

	.copy-toast {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		color: var(--color-accent);
	}

	.alt-response {
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--color-text-subtle);
	}

	/* ── Accessibility ─────────────────────────────────── */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
