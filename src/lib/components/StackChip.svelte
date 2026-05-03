<script lang="ts">
	/** Compact tech stack chip — home page display only, no metrics. */
	import type { TechStack } from '$lib/sanity/types';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	interface Props {
		tech: TechStack;
		size?: 'sm' | 'md';
	}

	let { tech, size = 'md' }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<span class="stack-chip" class:size-sm={size === 'sm'}>
				{tech.name}
			</span>
		</Tooltip.Trigger>
		{#if tech.yearsUsed}
			<Tooltip.Content>
				<p>{tech.yearsUsed} {tech.yearsUsed === 1 ? 'year' : 'years'}</p>
			</Tooltip.Content>
		{/if}
	</Tooltip.Root>
</Tooltip.Provider>

<style>
	.stack-chip {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 14px;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.04em;
		padding: 4px 10px;
		border: 1px solid var(--color-hairline);
		border-radius: 0.375rem;
		color: var(--color-text-muted);
		white-space: nowrap;
		line-height: 1.4;
		transition: border-color 200ms var(--ease-ui);
	}

	.size-sm {
		font-size: 12px;
		padding: 3px 8px;
		border-radius: 0.25rem;
	}
</style>
