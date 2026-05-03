/** Shared reactive reference to the hero sculpture container element. */
const state = $state<{ el: HTMLElement | null }>({ el: null });

export function getHeroEl() { return state.el; }

export const heroTarget = {
	get el() { return state.el; },
	set(el: HTMLElement | null) { state.el = el; }
};
