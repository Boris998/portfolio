import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import { getPostBySlug, getAllPosts } from '$lib/sanity/queries';
import type { Post } from '$lib/sanity/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	try {
		const posts = await loadQuery<Post[]>(sanityClient, getAllPosts);
		return (posts ?? [])
			.filter((p) => p.slug?.current)
			.map((p) => ({ slug: p.slug!.current! }));
	} catch {
		return [];
	}
};

export const load: PageServerLoad = async ({ params }) => {
	try {
		const [post, allPosts] = await Promise.all([
			loadQuery<Post>(sanityClient, getPostBySlug, { slug: params.slug }),
			loadQuery<Post[]>(sanityClient, getAllPosts)
		]);

		if (!post) error(404, 'Post not found');

		const related = (allPosts ?? [])
			.filter((p) => p.slug?.current !== params.slug)
			.slice(0, 3);

		return { post, related };
	} catch (e) {
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(404, 'Post not found');
	}
};
