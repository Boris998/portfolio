import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import {
	getFeaturedProjects,
	getSettings,
	getTestimonials,
	getAllTechStacks
} from '$lib/sanity/queries';
import type { Project, Settings, Testimonial, TechStack } from '$lib/sanity/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const [featuredProjects, settings, testimonials, techStacks] = await Promise.all([
			loadQuery<Project[]>(sanityClient, getFeaturedProjects),
			loadQuery<Settings>(sanityClient, getSettings),
			loadQuery<Testimonial[]>(sanityClient, getTestimonials, { featured: true }),
			loadQuery<TechStack[]>(sanityClient, getAllTechStacks)
		]);
		return { featuredProjects, settings, testimonials, techStacks };
	} catch {
		return { featuredProjects: [], settings: null, testimonials: [], techStacks: [] };
	}
};
