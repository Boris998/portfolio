/** Quality presets per device tier — single source of truth for all 3D components. */

export const QUALITY = {
	high: {
		dpr: () => Math.min(window.devicePixelRatio, 2),
		particleCount: 8000,
		clearcoat: 1.0,
		useHDRI: true
	},
	mid: {
		dpr: () => Math.min(window.devicePixelRatio, 1.5),
		particleCount: 8000,
		clearcoat: 1.0,
		useHDRI: true
	},
	low: {
		dpr: () => 1,
		particleCount: 6000,
		clearcoat: 0.5,
		useHDRI: false // procedural warm env on low-tier / mobile
	}
} as const;
