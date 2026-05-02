import type { SanityClient } from '@sanity/client';

export async function loadQuery<T>(
	client: SanityClient,
	query: string,
	params: Record<string, unknown> = {}
): Promise<T> {
	return client.fetch<T>(query, params);
}
