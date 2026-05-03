import { browser } from '$app/environment';
import { writable } from 'svelte/store';

/** Reactive store reflecting `prefers-reduced-motion: reduce`. Server-safe (false during SSR). */
function createReducedMotionStore() {
	const { subscribe, set } = writable(false);

	if (browser) {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		set(mq.matches);
		const handler = (e: MediaQueryListEvent) => set(e.matches);
		mq.addEventListener('change', handler);
	}

	return { subscribe };
}

export const reducedMotion = createReducedMotionStore();
