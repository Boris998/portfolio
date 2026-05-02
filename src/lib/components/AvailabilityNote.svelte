<script lang="ts">
	/** Mono availability indicator — used in Nav and Hero. */
	interface Props {
		availability?: 'selectively-booking' | 'fully-booked' | 'open' | null;
		availabilityNote?: string | null;
	}

	let { availability, availabilityNote }: Props = $props();

	const isAvailable = $derived(availability === 'open' || availability === 'selectively-booking');
	const label = $derived(availabilityNote ?? (availability === 'open' ? 'Open to work' : availability === 'selectively-booking' ? 'Selectively booking' : 'Fully booked'));
</script>

{#if availability}
	<span class="availability-note" class:available={isAvailable}>
		<span class="dot" aria-hidden="true">●</span>
		{label}
	</span>
{/if}

<style>
	.availability-note {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-subtle);
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	.dot {
		font-size: 8px;
		color: var(--color-text-subtle);
	}

	.available .dot {
		color: var(--color-accent);
	}

	.available {
		color: var(--color-text-muted);
	}
</style>
