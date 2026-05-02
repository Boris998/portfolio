<script lang="ts">
	/** Lab whisper — single italic line, restraint is the feature. */
	import WhisperLink from '$lib/components/WhisperLink.svelte';
</script>

<section class="lab-whisper" aria-label="Visit the Lab">
	<div class="whisper-inner">
		<p class="whisper-text">
			<span class="muted">Curious about proof? — </span><WhisperLink href="/lab">Visit the Lab.</WhisperLink>
		</p>
	</div>
</section>

<style>
	.lab-whisper {
		padding: 8rem 0;
	}

	.whisper-inner {
		max-width: 1440px;
		margin: 0 auto;
		padding: 0 3rem;
		display: flex;
		justify-content: center;
	}

	.whisper-text {
		font-family: var(--font-display);
		font-size: 32px;
		font-style: italic;
		line-height: 1.3;
		text-align: center;
		max-width: 48ch;
		margin: 0;
	}

	.muted {
		color: var(--color-text-muted);
	}

	@media (max-width: 767px) {
		.lab-whisper {
			padding: 4rem 0;
		}

		.whisper-inner {
			padding: 0 1.5rem;
		}

		.whisper-text {
			font-size: 24px;
		}
	}
</style>
