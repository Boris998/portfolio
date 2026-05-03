<script lang="ts">
	import MetricChip from '$lib/components/MetricChip.svelte';

	interface Props {
		value: {
			metrics?: Array<{
				value?: string;
				label?: string;
				trend?: 'up' | 'down' | 'neutral';
				_key: string;
			}>;
		};
	}

	let { value }: Props = $props();
</script>

{#if value.metrics && value.metrics.length > 0}
	<div class="metric-grid">
		{#each value.metrics as metric (metric._key)}
			<MetricChip
				value={metric.value ?? ''}
				label={metric.label ?? ''}
				trend={metric.trend ?? 'neutral'}
				size="md"
			/>
		{/each}
	</div>
{/if}

<style>
	.metric-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 32px;
		margin: 40px 0;
	}

	@media (max-width: 640px) {
		.metric-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 24px;
		}
	}
</style>
