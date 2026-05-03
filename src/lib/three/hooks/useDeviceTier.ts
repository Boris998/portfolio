import { browser } from '$app/environment';

export type DeviceTier = 'low' | 'mid' | 'high';

/**
 * Derives device quality tier from CPU cores, memory, and viewport width.
 * Server-safe (returns 'mid' during SSR).
 */
export function getDeviceTier(): DeviceTier {
	if (!browser) return 'mid';

	const cores = navigator.hardwareConcurrency ?? 4;
	// deviceMemory is not on all TS targets — access via any
	const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
	const width = window.innerWidth;

	if (cores < 4 || memory < 4 || width < 768) return 'low';
	if (cores >= 8 && memory >= 8) return 'high';
	return 'mid';
}
