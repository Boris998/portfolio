/**
 * Shared HDRI environment texture — loaded once, memoized.
 * Uses a plain module variable (no $state) so it works in .ts files.
 *
 * HDRI source: PolyHaven "studio_small_07" (CC0)
 * Compressed with KTX-Software: toktx --encode etc1s --clevel 4 studio-warm.ktx2 studio_small_07_2k.exr
 * Attribution → static/hdri/README.md
 */
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import type { WebGLRenderer, Texture } from 'three';
import { SRGBColorSpace } from 'three';
import { getDeviceTier } from './hooks/useDeviceTier.js';
import { browser } from '$app/environment';

let envTexture: Texture | null = null;
let loading = false;

export async function loadEnv(renderer: WebGLRenderer): Promise<void> {
	if (!browser || loading || envTexture) return;
	const tier = getDeviceTier();
	if (tier === 'low') return;

	loading = true;
	try {
		const loader = new KTX2Loader();
		loader.setTranscoderPath('/basis/');
		loader.detectSupport(renderer);
		const tex = await loader.loadAsync('/hdri/studio-warm.ktx2');
		tex.colorSpace = SRGBColorSpace;
		envTexture = tex;
	} catch {
		envTexture = null;
	} finally {
		loading = false;
	}
}

export function getEnvTexture(): Texture | null {
	return envTexture;
}
