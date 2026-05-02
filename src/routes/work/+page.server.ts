import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import { getAllProjects } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const projects = await loadQuery<SanityProject[]>(sanityClient, getAllProjects);
		return { projects };
	} catch {
		return { projects: [] };
	}
};

type SanityProject = {
	_id: string;
	title: string;
	slug: { current: string };
	role: string;
	summary: string;
	featured: boolean;
};
