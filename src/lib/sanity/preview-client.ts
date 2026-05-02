import { browser } from '$app/environment';
import { SANITY_API_READ_TOKEN } from '$env/static/private';
import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

if (browser) throw new Error('preview-client must not be imported on the client');

export const previewClient = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	apiVersion: '2026-05-01',
	useCdn: false,
	token: SANITY_API_READ_TOKEN,
	perspective: 'previewDrafts'
});
