<script lang="ts">
	import { Info, AlertTriangle, CheckCircle2 } from 'lucide-svelte';

	interface Props {
		value: {
			variant?: 'info' | 'warn' | 'success';
			body?: string;
		};
	}

	let { value }: Props = $props();

	const iconMap = {
		info: Info,
		warn: AlertTriangle,
		success: CheckCircle2
	} as const;

	const Icon = $derived(iconMap[value.variant ?? 'info']);
</script>

<aside class="callout" class:warn={value.variant === 'warn'} class:success={value.variant === 'success'}>
	<span class="icon" aria-hidden="true">
		<Icon size={16} />
	</span>
	<p class="body">{value.body ?? ''}</p>
</aside>

<style>
	.callout {
		display: flex;
		gap: 16px;
		align-items: flex-start;
		padding: 16px 24px;
		border-left: 1px solid var(--color-hairline);
		margin: 28px 0;
		color: var(--color-text-muted);
	}

	.icon {
		flex-shrink: 0;
		margin-top: 2px;
		color: var(--color-text-muted);
	}

	.body {
		font-size: 16px;
		line-height: 1.6;
		margin: 0;
		color: var(--color-text-muted);
	}
</style>
