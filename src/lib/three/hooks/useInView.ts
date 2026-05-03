/**
 * Returns a plain object whose `inView` boolean updates via IntersectionObserver.
 * Written without $state so it can live in a .ts file and be called from .svelte files.
 * The caller is responsible for reading `inView` inside a reactive context ($derived / $effect).
 */
export function useInView(
	getElement: () => HTMLElement | null,
	options?: IntersectionObserverInit
): { inView: boolean } {
	const state = { inView: false };

	let observer: IntersectionObserver | null = null;

	function connect() {
		const el = getElement();
		if (!el) return;
		observer = new IntersectionObserver(([entry]) => {
			state.inView = entry.isIntersecting;
		}, options);
		observer.observe(el);
	}

	function disconnect() {
		observer?.disconnect();
		observer = null;
	}

	// Connect immediately if element is already available, otherwise caller
	// should call connect() after the element mounts.
	connect();

	return Object.assign(state, { connect, disconnect });
}
