#!/usr/bin/env bun
/**
 * Bakes a single ambient particle cloud distribution to static/particle-targets/ambient-cloud.bin.
 * Run once: bun scripts/bake-particle-targets.ts
 *
 * Distribution: soft 3D ellipsoid (1.6w × 1.0h × 0.6d) with edge falloff via rejection sampling.
 * Particles cluster more densely near the center.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const TOTAL_PARTICLES = 8000;
const OUT_DIR = join(import.meta.dir, '../static/particle-targets');
const OUT_FILE = join(OUT_DIR, 'ambient-cloud.bin');

const HALF_X = 1.6 / 2;
const HALF_Y = 1.0 / 2;
const HALF_Z = 0.6 / 2;

const positions = new Float32Array(TOTAL_PARTICLES * 3);
let accepted = 0;

while (accepted < TOTAL_PARTICLES) {
	const x = (Math.random() * 2 - 1) * HALF_X;
	const y = (Math.random() * 2 - 1) * HALF_Y;
	const z = (Math.random() * 2 - 1) * HALF_Z;

	// Ellipsoid equation: (x/rx)^2 + (y/ry)^2 + (z/rz)^2 <= 1
	const ellipsoid = (x / HALF_X) ** 2 + (y / HALF_Y) ** 2 + (z / HALF_Z) ** 2;
	if (ellipsoid > 1) continue;

	// Edge falloff: accept with probability based on distance from center
	// Particles cluster near center (lower ellipsoid value = higher accept chance)
	const acceptProb = Math.pow(1 - ellipsoid * 0.7, 1.5);
	if (Math.random() > acceptProb) continue;

	positions[accepted * 3] = x;
	positions[accepted * 3 + 1] = y;
	positions[accepted * 3 + 2] = z;
	accepted++;
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, Buffer.from(positions.buffer));

const kb = (positions.byteLength / 1024).toFixed(1);
console.log(`✓ Baked ${TOTAL_PARTICLES} particles → ${OUT_FILE} (${kb} KB)`);
