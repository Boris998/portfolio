import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import { getSettings, getAllTechStacks } from '$lib/sanity/queries';
import type { Settings, TechStack } from '$lib/sanity/types';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	try {
		const [settings, techStacks] = await Promise.all([
			loadQuery<Settings>(sanityClient, getSettings),
			loadQuery<TechStack[]>(sanityClient, getAllTechStacks)
		]);
		return { settings, techStacks: techStacks ?? [] };
	} catch {
		return { settings: null, techStacks: [] };
	}
};
