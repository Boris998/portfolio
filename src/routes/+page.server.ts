import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import { getFeaturedProjects } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const featuredProjects = await loadQuery<SanityProject[]>(sanityClient, getFeaturedProjects);
	return { featuredProjects };
};

type SanityProject = {
	_id: string;
	title: string;
	slug: { current: string };
	role: string;
	summary: string;
};
