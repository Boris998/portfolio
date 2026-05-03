# HDRI Assets

## studio-warm.ktx2

**Source:** PolyHaven — `studio_small_07` (or equivalent warm golden-hour studio)
**License:** CC0 (public domain) — https://polyhaven.com/license
**Download:** https://polyhaven.com/a/studio_small_07

### How to produce studio-warm.ktx2

1. Download the 2K EXR from PolyHaven:
   ```
   curl -O https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/2k/studio_small_07_2k.exr
   ```

2. Convert to KTX2 with Basis Universal (target < 300KB):
   ```
   toktx --encode etc1s --clevel 4 --qlevel 128 \
         studio-warm.ktx2 studio_small_07_2k.exr
   ```
   Install KTX-Software: https://github.com/KhronosGroup/KTX-Software/releases

3. Copy the result here:
   ```
   cp studio-warm.ktx2 static/hdri/studio-warm.ktx2
   ```

4. Also copy the Basis transcoder WASM to `static/basis/`:
   ```
   cp node_modules/three/examples/jsm/libs/basis/ static/basis/ -r
   ```
   The KTX2Loader in `src/lib/three/env.ts` looks for the transcoder at `/basis/`.

### Fallback

Until this file is present, the hero scene runs without an environment map (directional warm light only). The sculpture still renders correctly — the HDRI just adds richer reflections.
