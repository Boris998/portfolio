<script lang="ts">
	interface Props {
		value: string;
		label: string;
		trend?: 'up' | 'down' | 'neutral';
		size?: 'sm' | 'md' | 'lg';
		bordered?: boolean;
	}

	let { value, label, trend = 'neutral', size = 'md', bordered = false }: Props = $props();

	const trendGlyph = $derived(trend === 'up' ? '↑' : trend === 'down' ? '↓' : '—');
</script>

<div
	class="metric-chip"
	class:size-sm={size === 'sm'}
	class:size-md={size === 'md'}
	class:size-lg={size === 'lg'}
	class:bordered
>
	<div class="value-row">
		<span class="value">{value}</span>
		<span class="trend" class:trend-up={trend === 'up'} class:trend-down={trend === 'down'} class:trend-neutral={trend === 'neutral'} aria-hidden="true">
			{trendGlyph}
		</span>
	</div>
	<span class="label">{label}</span>
</div>

<style>
	.metric-chip {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.metric-chip.bordered {
		border: 1px solid var(--color-hairline);
		padding: 12px 16px;
		border-radius: var(--radius);
	}

	.value-row {
		display: flex;
		align-items: baseline;
		gap: 4px;
	}

	.value {
		font-family: var(--font-display);
		font-variant-numeric: tabular-nums;
		line-height: 1.0;
		color: var(--color-text);
	}

	.trend {
		font-size: 0.5em;
		line-height: 1;
		align-self: center;
	}

	.trend-up {
		color: var(--color-accent);
	}

	.trend-down {
		color: var(--color-text-muted);
	}

	.trend-neutral {
		color: var(--color-text-subtle);
	}

	.label {
		font-family: var(--font-mono);
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-top: 4px;
	}

	/* Size variants */
	.size-sm .value {
		font-size: 24px;
	}

	.size-md .value {
		font-size: 36px;
	}

	.size-lg .value {
		font-size: 64px;
		line-height: 0.95;
	}
</style>
