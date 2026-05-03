<script lang="ts">
	/**
	 * Ambient particle field — warm-toned, low-opacity drift.
	 * Fills the root canvas viewport. No <View> — renders into the root scene.
	 * Active on /, /about, /writing*. Disabled on /lab and /work/* (handled by layout).
	 */
	import { T, useTask } from '@threlte/core';
	import { BufferGeometry, BufferAttribute, AdditiveBlending, ShaderMaterial } from 'three';
	import { getDeviceTier } from '../hooks/useDeviceTier.js';
	import { QUALITY } from '../quality-presets.js';
	import { onDestroy } from 'svelte';

	const tier = getDeviceTier();
	const particleCount = QUALITY[tier].particleCount;

	// --- geometry: spread across visible screen space ---
	// Root canvas default camera: fov=75, z=5.
	// Visible half-height at z=0: tan(37.5°)*5 ≈ 3.83. Use z=-1 (slightly behind origin).
	// Spread particles wider than the viewport so edges feel populated.
	const positions = new Float32Array(particleCount * 3);
	for (let i = 0; i < particleCount; i++) {
		// x: ±6 (wider than visible ±5 at fov75/z5)
		positions[i * 3]     = (Math.random() - 0.5) * 12;
		// y: ±4.5
		positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
		// z: shallow depth variation so particles feel volumetric
		positions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1;
	}

	const geo = new BufferGeometry();
	geo.setAttribute('position', new BufferAttribute(positions, 3));

	// Store original positions for the drift shader
	geo.setAttribute('aBasePosition', new BufferAttribute(positions.slice(), 3));

	const mat = new ShaderMaterial({
		uniforms: { uTime: { value: 0 } },
		vertexShader: /* glsl */ `
			attribute vec3 aBasePosition;
			uniform float uTime;

			float hash(vec3 p) {
				p = fract(p * 0.3183099 + 0.1);
				p *= 17.0;
				return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
			}

			float noise(vec3 x) {
				vec3 i = floor(x);
				vec3 f = fract(x);
				f = f * f * (3.0 - 2.0 * f);
				return mix(
					mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x),
						mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
					mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
						mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z);
			}

			void main() {
				vec3 pos = aBasePosition;
				float t = uTime * 0.12;
				// Drift within ±0.15 of home position
				pos.x += (noise(aBasePosition * 2.0 + vec3(t, 0.0, 0.0)) - 0.5) * 0.30;
				pos.y += (noise(aBasePosition * 2.0 + vec3(0.0, t, 0.0)) - 0.5) * 0.30;

				vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
				// Size in pixels: bigger base, scaled by distance
				gl_PointSize = max(1.0, 45.0 / -mvPos.z);
				gl_Position = projectionMatrix * mvPos;
			}
		`,
		fragmentShader: /* glsl */ `
			void main() {
				vec2 uv = gl_PointCoord - 0.5;
				float d = length(uv);
				// Soft circular falloff
				float alpha = smoothstep(0.5, 0.05, d);
				// Warm off-white core, faint amber edge
				vec3 color = mix(vec3(0.965, 0.940, 0.880), vec3(1.0, 0.82, 0.55), d * 0.6);
				gl_FragColor = vec4(color, alpha * 0.22);
			}
		`,
		blending: AdditiveBlending,
		depthWrite: false,
		transparent: true
	});

	useTask((delta) => {
		mat.uniforms.uTime.value += delta;
	});

	onDestroy(() => {
		geo.dispose();
		mat.dispose();
	});
</script>

<T.Points geometry={geo} material={mat} />
