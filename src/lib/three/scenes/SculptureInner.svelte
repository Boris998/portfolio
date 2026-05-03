<script lang="ts">
	/**
	 * Inner scene content — must be a child of <Canvas> (via <View>) so that
	 * useTask can access the Threlte scheduler context.
	 */
	import { T, useTask } from '@threlte/core';
	import type { TorusKnotGeometry, MeshPhysicalMaterial, Color } from 'three';
	import { PerspectiveCamera, Mesh } from 'three';

	interface Props {
		geo: TorusKnotGeometry;
		mat: MeshPhysicalMaterial;
		colorLight: Color;
		inView: boolean;
		onSculptureClick?: () => void;
	}

	let { geo, mat, colorLight, inView, onSculptureClick }: Props = $props();

	let meshRef: Mesh | undefined;
	let cameraRef: PerspectiveCamera | undefined;
	let mouseX = 0;
	let mouseY = 0;
	let camX = 0;
	let camY = 0;

	$effect(() => {
		const onMove = (e: MouseEvent) => {
			mouseX = e.clientX / window.innerWidth;
			mouseY = e.clientY / window.innerHeight;
		};
		window.addEventListener('mousemove', onMove, { passive: true });
		return () => window.removeEventListener('mousemove', onMove);
	});

	// useTask runs inside Canvas context — valid here
	useTask(() => {
		if (!inView) return;
		if (meshRef) meshRef.rotation.y += 0.0008;
		if (cameraRef) {
			const tx = (mouseX - 0.5) * 0.16;
			const ty = -(mouseY - 0.5) * 0.16;
			camX += (tx - camX) * 0.05;
			camY += (ty - camY) * 0.05;
			cameraRef.position.x = camX;
			cameraRef.position.y = camY;
		}
	});
</script>

<T.PerspectiveCamera
	oncreate={(ref) => {
		cameraRef = ref;
		ref.position.set(0, 0, 4);
		ref.lookAt(0, 0, 0);
	}}
	makeDefault
	fov={35}
/>

<T.AmbientLight intensity={0.6} />
<T.DirectionalLight color={colorLight} intensity={1.2} position={[-2, 2, 2]} />

<T.Mesh
	oncreate={(ref) => {
		meshRef = ref;
		ref.rotation.x = 0.3;
	}}
	{geo}
	{mat}
	onclick={onSculptureClick}
/>
