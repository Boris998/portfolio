/**
 * Idempotent seed script — uses createOrReplace so it's safe to re-run.
 * Run with: bun scripts/sanity-seed.ts
 *
 * Requires env vars: PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 * Load from .env: bun --env-file=.env scripts/sanity-seed.ts
 */

import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error('PUBLIC_SANITY_PROJECT_ID is not set');
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is not set');

const client = createClient({
	projectId,
	dataset,
	apiVersion: '2026-05-01',
	token,
	useCdn: false
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function slug(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

function techRef(name: string) {
	return { _type: 'reference', _ref: `tech-${slug(name)}`, _key: slug(name) };
}

// ── Tech stack ────────────────────────────────────────────────────────────────

type TechEntry = {
	name: string;
	category: 'frontend' | 'backend' | 'db' | 'infra' | 'tooling' | 'lang';
	yearsUsed: number;
	proficiency: 'learning' | 'working' | 'fluent' | 'expert';
};

const techStackEntries: TechEntry[] = [
	// Frontend
	{ name: 'React', category: 'frontend', yearsUsed: 3, proficiency: 'expert' },
	{ name: 'Next.js', category: 'frontend', yearsUsed: 2, proficiency: 'fluent' },
	{ name: 'SvelteKit', category: 'frontend', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'Svelte', category: 'frontend', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'Solid', category: 'frontend', yearsUsed: 1, proficiency: 'working' },
	{ name: 'jQuery', category: 'frontend', yearsUsed: 2, proficiency: 'fluent' },
	{ name: 'Tailwind', category: 'frontend', yearsUsed: 2, proficiency: 'expert' },
	{ name: 'shadcn-svelte', category: 'frontend', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'shadcn/ui', category: 'frontend', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'SCSS', category: 'frontend', yearsUsed: 3, proficiency: 'expert' },
	{ name: 'Zustand', category: 'frontend', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Redux', category: 'frontend', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Nivo', category: 'frontend', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Axios', category: 'frontend', yearsUsed: 2, proficiency: 'fluent' },
	// Backend
	{ name: 'Node.js', category: 'backend', yearsUsed: 3, proficiency: 'expert' },
	{ name: 'Bun', category: 'backend', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'Hono', category: 'backend', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'Express', category: 'backend', yearsUsed: 2, proficiency: 'fluent' },
	// Database
	{ name: 'PostgreSQL', category: 'db', yearsUsed: 2, proficiency: 'fluent' },
	{ name: 'SQLite', category: 'db', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Drizzle ORM', category: 'db', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'Prisma', category: 'db', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Supabase', category: 'db', yearsUsed: 1, proficiency: 'working' },
	// Infra
	{ name: 'Cloudflare', category: 'infra', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Vercel', category: 'infra', yearsUsed: 2, proficiency: 'fluent' },
	{ name: 'Netlify', category: 'infra', yearsUsed: 1, proficiency: 'working' },
	{ name: 'SST', category: 'infra', yearsUsed: 1, proficiency: 'working' },
	// Tooling
	{ name: 'Vite', category: 'tooling', yearsUsed: 2, proficiency: 'fluent' },
	{ name: 'Vitest', category: 'tooling', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Sanity', category: 'tooling', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'PostHog', category: 'tooling', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Adobe Target', category: 'tooling', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'Adobe Analytics', category: 'tooling', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'AEM', category: 'tooling', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Optimizely', category: 'tooling', yearsUsed: 1, proficiency: 'fluent' },
	{ name: 'GTM', category: 'tooling', yearsUsed: 2, proficiency: 'fluent' },
	{ name: 'Sentry', category: 'tooling', yearsUsed: 1, proficiency: 'working' },
	// Lang
	{ name: 'TypeScript', category: 'lang', yearsUsed: 3, proficiency: 'expert' },
	{ name: 'JavaScript', category: 'lang', yearsUsed: 4, proficiency: 'expert' },
	{ name: 'Java', category: 'lang', yearsUsed: 1, proficiency: 'working' },
	{ name: 'Go', category: 'lang', yearsUsed: 1, proficiency: 'working' },
	{ name: 'C++', category: 'lang', yearsUsed: 1, proficiency: 'learning' },
	{ name: 'Python', category: 'lang', yearsUsed: 1, proficiency: 'working' }
];

// Warn if we exceed ~30 entries (spec says to flag this)
if (techStackEntries.length > 30) {
	console.warn(`⚠  Tech stack has ${techStackEntries.length} entries — masterplan recommends ≤ 30. Review before continuing.`);
}

// ── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
	const tx = client.transaction();

	// Settings singleton
	tx.createOrReplace({
		_id: 'settings',
		_type: 'settings',
		availability: 'selectively-booking',
		availabilityNote: 'Selectively booking · Q3 2026',
		contactEmail: 'boris@borishristov.com',
		socialLinks: [
			{ _key: 'github', platform: 'GitHub', url: 'https://github.com/[boris-handle]' },
			{ _key: 'linkedin', platform: 'LinkedIn', url: 'https://linkedin.com/in/...' }
		],
		heroHeadline:
			'Full-stack developer and CRO specialist who builds things of enduring value — and proves it.',
		heroSubheadline:
			'Three years of production work in React, SvelteKit, and Node — and a quieter discipline of measurement and iteration that runs underneath all of it.',
		labOpeningCopy: {
			linkedin:
				'Welcome — most LinkedIn visitors come asking whether the methodology is real. The page below is the answer.',
			github:
				'Welcome — for engineers, the implementation notes are linked at the bottom of each experiment.',
			twitter:
				'Welcome — pinned tweet visitors usually want the inconclusive results. They\'re below, with the rest.',
			default: 'Welcome to the Lab. What follows is a working demonstration of conversion methodology.'
		}
	});

	// Tech stack
	for (const entry of techStackEntries) {
		const id = `tech-${slug(entry.name)}`;
		tx.createOrReplace({
			_id: id,
			_type: 'techStack',
			name: entry.name,
			slug: { _type: 'slug', current: slug(entry.name) },
			category: entry.category,
			yearsUsed: entry.yearsUsed,
			proficiency: entry.proficiency
		});
	}

	// Projects
	const projects: ({ _id: string; _type: string } & Record<string, unknown>)[] = [
		{
			_id: 'project-hitachi-mb',
			_type: 'project',
			title: 'Hitachi M&B — Restaurant Platform',
			slug: { _type: 'slug', current: 'hitachi-mb' },
			role: 'Frontend Developer',
			client: 'Hitachi',
			startDate: '2025-08-01',
			endDate: null,
			featured: true,
			order: 1,
			summary:
				'Responsive React and TypeScript components for a multi-brand restaurant platform serving millions of diners. Owned the mobile UX recovery and the scroll-loading rewrite. Integrated with AEM via Java Sling Models.',
			stack: [
				techRef('React'),
				techRef('TypeScript'),
				techRef('AEM'),
				techRef('Java'),
				techRef('SCSS')
			],
			metrics: [
				{ _key: 'm1', value: 'Millions', label: 'monthly active diners', trend: 'neutral' }
			],
			body: [
				{
					_type: 'block',
					_key: 'placeholder',
					style: 'normal',
					children: [
						{
							_type: 'span',
							_key: 'span1',
							text: 'Full case study coming soon. Boris will edit this in Studio.',
							marks: []
						}
					],
					markDefs: []
				}
			]
		},
		{
			_id: 'project-valtech-internal',
			_type: 'project',
			title: 'Valtech — Internal Org-Intelligence',
			slug: { _type: 'slug', current: 'valtech-internal' },
			role: 'Lead Frontend Developer',
			client: 'Valtech',
			startDate: '2025-03-01',
			endDate: null,
			featured: true,
			order: 2,
			summary:
				'Lead developer on Valtech\'s internal platform for organizational visibility. An interactive circular line-org visualization, dynamic salary-range comparisons, owned end-to-end from data shape to module architecture.',
			stack: [
				techRef('React'),
				techRef('TypeScript'),
				techRef('Nivo'),
				techRef('SCSS'),
				techRef('Axios')
			],
			metrics: [
				{ _key: 'm1', value: 'Owner', label: 'end-to-end product', trend: 'neutral' }
			],
			body: [
				{
					_type: 'block',
					_key: 'placeholder',
					style: 'normal',
					children: [
						{
							_type: 'span',
							_key: 'span1',
							text: 'Full case study coming soon. Boris will edit this in Studio.',
							marks: []
						}
					],
					markDefs: []
				}
			]
		},
		{
			_id: 'project-quizzle',
			_type: 'project',
			title: 'Quizzle — Real-time Multiplayer',
			slug: { _type: 'slug', current: 'quizzle' },
			role: 'Full-Stack Developer',
			client: 'Independent (team of 4)',
			startDate: '2024-03-01',
			endDate: '2025-03-31',
			featured: true,
			order: 3,
			summary:
				'A real-time multiplayer quiz platform built with a team of four. End-to-end type safety from Drizzle schemas through Zod inference into the Hono backend, with a Go-based WebSocket layer for the live game loop and SST for serverless deployment.',
			stack: [
				techRef('React'),
				techRef('shadcn/ui'),
				techRef('Zustand'),
				techRef('Hono'),
				techRef('Drizzle ORM'),
				techRef('Go'),
				techRef('SST'),
				techRef('PostgreSQL')
			],
			metrics: [
				{ _key: 'm1', value: 'Real-time', label: 'team of 4', trend: 'neutral' }
			],
			body: [
				{
					_type: 'block',
					_key: 'placeholder',
					style: 'normal',
					children: [
						{
							_type: 'span',
							_key: 'span1',
							text: 'Full case study coming soon. Boris will edit this in Studio.',
							marks: []
						}
					],
					markDefs: []
				}
			]
		},
		{
			_id: 'project-toyota-lexus',
			_type: 'project',
			title: 'Toyota & Lexus — Digital Funnel Optimization',
			slug: { _type: 'slug', current: 'toyota-lexus-funnel' },
			role: 'Developer / CRO',
			client: 'Toyota & Lexus',
			startDate: '2024-03-01',
			endDate: '2024-06-30',
			featured: false,
			order: 4,
			summary:
				'Multivariate experiments across the Toyota and Lexus digital sales funnel using Adobe Target. Custom JS/CSS injections, deep KPI analysis in Adobe Analytics. Delivered measurable revenue lift through funnel rearchitecture.',
			stack: [
				techRef('Adobe Target'),
				techRef('Adobe Analytics'),
				techRef('TypeScript'),
				techRef('SCSS')
			],
			metrics: [
				{ _key: 'm1', value: '+15%', label: 'online revenue, Q1', trend: 'up' }
			],
			body: []
		},
		{
			_id: 'project-ds-smith',
			_type: 'project',
			title: 'DS Smith — SEO & Experimentation Program',
			slug: { _type: 'slug', current: 'ds-smith-cro' },
			role: 'Developer / CRO',
			client: 'DS Smith',
			startDate: '2024-07-01',
			endDate: '2024-11-30',
			featured: false,
			order: 5,
			summary:
				'Data-driven CRO program on Optimizely. A/B tests with custom JS/CSS injections to improve CR, CTR, and RPV while reducing bounce rate. Robust GTM event-tracking framework, page-flicker eliminated via CMS-managed variants.',
			stack: [
				techRef('Optimizely'),
				techRef('TypeScript'),
				techRef('GTM')
			],
			metrics: [
				{ _key: 'm1', value: 'CR↑', label: 'bounce rate↓', trend: 'up' }
			],
			body: []
		},
		{
			_id: 'project-we-talk-data',
			_type: 'project',
			title: 'We Talk Data & AI — Community Landing Page',
			slug: { _type: 'slug', current: 'we-talk-data-ai' },
			role: 'Developer',
			client: 'We Talk Data & AI',
			startDate: '2023-12-01',
			endDate: '2024-04-30',
			featured: false,
			order: 6,
			summary:
				'Landing page for an AI/ML community in Next.js + Tailwind with Sanity as the headless CMS, deployed on Vercel for continuous delivery. A flexible content model lets non-technical organizers publish without a developer in the loop.',
			stack: [
				techRef('Next.js'),
				techRef('Tailwind'),
				techRef('Sanity'),
				techRef('Redux'),
				techRef('Vercel')
			],
			metrics: [
				{ _key: 'm1', value: 'Live', label: 'shipped', trend: 'neutral' }
			],
			body: []
		}
	];

	for (const project of projects) {
		tx.createOrReplace(project);
	}

	// Testimonial
	tx.createOrReplace({
		_id: 'testimonial-placeholder',
		_type: 'testimonial',
		quote:
			'Boris does the rare thing — he takes engineering ownership of outcomes, not just deliverables. The kind of person you want on a project where the metric on the wall has to actually move.',
		author: '[Placeholder Name]',
		authorRole: '[Placeholder Role]',
		authorCompany: '[Placeholder]',
		featured: true
	});

	await tx.commit({ visibility: 'sync' });

	console.log(`
✓ Seed complete
  Settings singleton:     1
  Tech stack entries:     ${techStackEntries.length}
  Projects:               ${projects.length} (3 featured, 3 unfeatured)
  Testimonials:           1 (placeholder — replace via Studio before launch)
`);
}

seed().catch((err) => {
	console.error('Seed failed:', err);
	process.exit(1);
});
