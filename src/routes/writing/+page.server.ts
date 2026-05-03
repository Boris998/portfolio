import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import { getAllPosts } from '$lib/sanity/queries';
import type { Post } from '$lib/sanity/types';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	try {
		const posts = await loadQuery<Post[]>(sanityClient, getAllPosts);
		return { posts: posts ?? [] };
	} catch {
		return { posts: [] };
	}
};
