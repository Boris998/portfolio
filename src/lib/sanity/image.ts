import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { sanityClient } from './client';

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export function getLqip(source: SanityImageSource & { metadata?: { lqip?: string } }): string | null {
	return source?.metadata?.lqip ?? null;
}
