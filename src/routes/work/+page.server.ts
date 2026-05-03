import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import { getAllProjects } from '$lib/sanity/queries';
import type { GetAllProjectsResult } from '$lib/sanity/types';
import type { PageServerLoad } from './$types';

export const prerender = true;

// Dev-only mock data — shown when Sanity returns nothing (no credentials / empty dataset)
const MOCK_PROJECTS: GetAllProjectsResult = [
	{
		_id: 'mock-toyota', _type: 'project', _createdAt: '', _updatedAt: '', _rev: '',
		title: 'Toyota & Lexus — Digital Funnel',
		slug: { _type: 'slug', current: 'toyota-lexus-funnel' },
		role: 'Developer / CRO', client: 'Toyota & Lexus',
		startDate: '2024-03-01', endDate: '2024-06-30',
		featured: false, order: 4,
		summary: 'Multivariate experiments across the Toyota and Lexus digital sales funnel using Adobe Target. Delivered measurable revenue lift through funnel rearchitecture and KPI analysis.',
		metrics: [{ _key: 'm1', value: '+15%', label: 'online revenue, Q1', trend: 'up' }],
		stack: [
			{ _id: 't1', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Adobe Target', category: 'tooling', proficiency: 'fluent', yearsUsed: 1 },
			{ _id: 't2', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'TypeScript', category: 'lang', proficiency: 'expert', yearsUsed: 3 },
			{ _id: 't3', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'SCSS', category: 'frontend', proficiency: 'expert', yearsUsed: 3 },
			{ _id: 't4', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Adobe Analytics', category: 'tooling', proficiency: 'fluent', yearsUsed: 1 },
		],
		links: [{ _key: 'l1', type: 'nda', label: 'Under NDA', url: undefined }],
	},
	{
		_id: 'mock-valtech', _type: 'project', _createdAt: '', _updatedAt: '', _rev: '',
		title: 'Valtech — Org-Intelligence Platform',
		slug: { _type: 'slug', current: 'valtech-internal' },
		role: 'Lead Frontend Developer', client: 'Valtech',
		startDate: '2025-03-01', endDate: undefined,
		featured: true, order: 2,
		summary: 'Internal platform for organizational visibility. Interactive circular line-org visualization, dynamic salary-range comparisons — owned end-to-end from data shape to module architecture.',
		metrics: [{ _key: 'm1', value: 'Owner', label: 'end-to-end product', trend: 'neutral' }],
		stack: [
			{ _id: 't1', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'React', category: 'frontend', proficiency: 'expert', yearsUsed: 3 },
			{ _id: 't2', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'TypeScript', category: 'lang', proficiency: 'expert', yearsUsed: 3 },
			{ _id: 't3', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Nivo', category: 'frontend', proficiency: 'working', yearsUsed: 1 },
			{ _id: 't4', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'SCSS', category: 'frontend', proficiency: 'expert', yearsUsed: 3 },
			{ _id: 't5', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Axios', category: 'frontend', proficiency: 'fluent', yearsUsed: 2 },
		],
		links: [],
	},
	{
		_id: 'mock-quizzle', _type: 'project', _createdAt: '', _updatedAt: '', _rev: '',
		title: 'Quizzle — Real-time Multiplayer Quiz',
		slug: { _type: 'slug', current: 'quizzle' },
		role: 'Full-Stack Developer', client: 'Independent (team of 4)',
		startDate: '2024-03-01', endDate: '2025-03-31',
		featured: true, order: 3,
		summary: 'Real-time multiplayer quiz platform. End-to-end type safety from Drizzle schemas through Zod inference into the Hono backend, with a Go-based WebSocket layer for the live game loop.',
		metrics: [{ _key: 'm1', value: 'Real-time', label: 'WebSocket game loop', trend: 'neutral' }],
		stack: [
			{ _id: 't1', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'React', category: 'frontend', proficiency: 'expert', yearsUsed: 3 },
			{ _id: 't2', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Hono', category: 'backend', proficiency: 'fluent', yearsUsed: 1 },
			{ _id: 't3', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Go', category: 'lang', proficiency: 'working', yearsUsed: 1 },
			{ _id: 't4', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'PostgreSQL', category: 'db', proficiency: 'fluent', yearsUsed: 2 },
			{ _id: 't5', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'SST', category: 'infra', proficiency: 'working', yearsUsed: 1 },
		],
		links: [{ _key: 'l1', type: 'github', label: 'Source', url: 'https://github.com' }],
	},
	{
		_id: 'mock-hitachi', _type: 'project', _createdAt: '', _updatedAt: '', _rev: '',
		title: 'Hitachi M&B — Restaurant Platform',
		slug: { _type: 'slug', current: 'hitachi-mb' },
		role: 'Frontend Developer', client: 'Hitachi',
		startDate: '2025-08-01', endDate: undefined,
		featured: true, order: 1,
		summary: 'Responsive React and TypeScript components for a multi-brand restaurant platform serving millions of diners. Owned the mobile UX recovery and the scroll-loading rewrite.',
		metrics: [{ _key: 'm1', value: 'Millions', label: 'monthly active diners', trend: 'neutral' }],
		stack: [
			{ _id: 't1', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'React', category: 'frontend', proficiency: 'expert', yearsUsed: 3 },
			{ _id: 't2', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'TypeScript', category: 'lang', proficiency: 'expert', yearsUsed: 3 },
			{ _id: 't3', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'AEM', category: 'tooling', proficiency: 'working', yearsUsed: 1 },
			{ _id: 't4', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Java', category: 'lang', proficiency: 'working', yearsUsed: 1 },
			{ _id: 't5', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'SCSS', category: 'frontend', proficiency: 'expert', yearsUsed: 3 },
		],
		links: [],
	},
	{
		_id: 'mock-ds-smith', _type: 'project', _createdAt: '', _updatedAt: '', _rev: '',
		title: 'DS Smith — SEO & Experimentation',
		slug: { _type: 'slug', current: 'ds-smith-cro' },
		role: 'Developer / CRO', client: 'DS Smith',
		startDate: '2024-07-01', endDate: '2024-11-30',
		featured: false, order: 5,
		summary: 'Data-driven CRO program on Optimizely. A/B tests with custom JS/CSS injections, robust GTM event-tracking framework, page-flicker eliminated via CMS-managed variants.',
		metrics: [{ _key: 'm1', value: 'CR↑', label: 'bounce rate↓', trend: 'up' }],
		stack: [
			{ _id: 't1', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Optimizely', category: 'tooling', proficiency: 'fluent', yearsUsed: 1 },
			{ _id: 't2', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'TypeScript', category: 'lang', proficiency: 'expert', yearsUsed: 3 },
			{ _id: 't3', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'GTM', category: 'tooling', proficiency: 'fluent', yearsUsed: 2 },
		],
		links: [],
	},
	{
		_id: 'mock-wtd', _type: 'project', _createdAt: '', _updatedAt: '', _rev: '',
		title: 'We Talk Data & AI — Community Page',
		slug: { _type: 'slug', current: 'we-talk-data-ai' },
		role: 'Developer', client: 'We Talk Data & AI',
		startDate: '2023-12-01', endDate: '2024-04-30',
		featured: false, order: 6,
		summary: 'Landing page for an AI/ML community in Next.js + Tailwind with Sanity as the headless CMS. Non-technical organizers publish without a developer in the loop.',
		metrics: [{ _key: 'm1', value: 'Live', label: 'shipped & running', trend: 'neutral' }],
		stack: [
			{ _id: 't1', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Next.js', category: 'frontend', proficiency: 'fluent', yearsUsed: 2 },
			{ _id: 't2', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Tailwind', category: 'frontend', proficiency: 'expert', yearsUsed: 2 },
			{ _id: 't3', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Sanity', category: 'tooling', proficiency: 'fluent', yearsUsed: 1 },
			{ _id: 't4', _type: 'techStack', _createdAt: '', _updatedAt: '', _rev: '', name: 'Vercel', category: 'infra', proficiency: 'fluent', yearsUsed: 2 },
		],
		links: [{ _key: 'l1', type: 'live', label: 'Live site', url: 'https://example.com' }],
	},
];

export const load: PageServerLoad = async () => {
	try {
		const projects = await loadQuery<GetAllProjectsResult>(sanityClient, getAllProjects);
		if (projects && projects.length > 0) return { projects };
	} catch {
		// fall through to mock
	}
	return { projects: MOCK_PROJECTS };
};
