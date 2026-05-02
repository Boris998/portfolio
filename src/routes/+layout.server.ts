import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import { getSettings } from '$lib/sanity/queries';
import type { Settings } from '$lib/sanity/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const settings = await loadQuery<Settings>(sanityClient, getSettings);
	return { settings };
};
