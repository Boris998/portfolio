import { error } from '@sveltejs/kit';
import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import { getProjectBySlug, getAllProjects } from '$lib/sanity/queries';
import type { GetProjectBySlugResult, GetAllProjectsResult } from '$lib/sanity/types';
import { highlight } from '$lib/shiki';
import type { PageServerLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	try {
		const projects = await loadQuery<GetAllProjectsResult>(sanityClient, getAllProjects);
		return (projects ?? [])
			.filter((p) => p.slug?.current)
			.map((p) => ({ slug: p.slug!.current! }));
	} catch {
		return [];
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const result = await loadQuery<GetProjectBySlugResult>(sanityClient, getProjectBySlug, {
		slug: params.slug
	});

	if (!result?.project) {
		throw error(404, `Project "${params.slug}" not found`);
	}

	// Pre-highlight all code blocks server-side
	const highlightedCode: Record<string, string> = {};
	const body = result.project.body ?? [];
	for (const block of body) {
		if (
			block &&
			typeof block === 'object' &&
			'_type' in block &&
			block._type === 'codeBlock' &&
			'_key' in block &&
			'code' in block &&
			typeof block.code === 'string' &&
			block.code
		) {
			const lang = ('language' in block && typeof block.language === 'string')
				? block.language
				: 'text';
			const key = '_key' in block && typeof block._key === 'string' ? block._key : '';
			if (key) {
				highlightedCode[key] = await highlight(block.code, lang);
			}
		}
	}

	return {
		project: result.project,
		related: result.related ?? [],
		highlightedCode
	};
};
