import { defineArrayMember, defineField, defineType } from 'sanity';

const variantFields = [
	defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
	defineField({
		name: 'screenshot',
		title: 'Screenshot',
		type: 'image',
		options: { hotspot: true },
		fields: [
			defineField({
				name: 'alt',
				title: 'Alt text',
				type: 'string',
				validation: (Rule) =>
					Rule.custom((alt, context) => {
						const parent = context.parent as { asset?: unknown } | undefined;
						if (parent?.asset && !alt) return 'Alt text is required when a screenshot is set';
						return true;
					})
			})
		]
	}),
	defineField({ name: 'copy', title: 'Copy', type: 'text', rows: 3 }),
	defineField({
		name: 'material',
		title: 'Material',
		description: 'Visual material metaphor for this variant (Sprint 3)',
		type: 'string',
		options: {
			list: [
				{ title: 'Marble', value: 'marble' },
				{ title: 'Brass', value: 'brass' },
				{ title: 'Alabaster', value: 'alabaster' },
				{ title: 'Bronze', value: 'bronze' }
			],
			layout: 'radio'
		}
	})
];

export const experiment = defineType({
	name: 'experiment',
	title: 'Experiment',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'hypothesis',
			title: 'Hypothesis',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'variantA',
			title: 'Variant A',
			type: 'object',
			fields: variantFields
		}),
		defineField({
			name: 'variantB',
			title: 'Variant B',
			type: 'object',
			fields: variantFields
		}),
		defineField({
			name: 'metric',
			title: 'Metric (human-readable)',
			description: 'e.g. "Click-through on \'Begin a conversation\'"',
			type: 'string'
		}),
		defineField({
			name: 'metricEvent',
			title: 'PostHog event name',
			description: 'e.g. "contact_cta_clicked"',
			type: 'string'
		}),
		defineField({
			name: 'postHogFlagKey',
			title: 'PostHog flag key',
			description: 'The feature flag identifier used for server-side evaluation',
			type: 'string'
		}),
		defineField({
			name: 'status',
			title: 'Status',
			type: 'string',
			options: {
				list: [
					{ title: 'Running', value: 'running' },
					{ title: 'Concluded', value: 'concluded' },
					{ title: 'Inconclusive', value: 'inconclusive' }
				],
				layout: 'radio'
			},
			initialValue: 'running',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'startDate',
			title: 'Start date',
			type: 'date',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'endDate',
			title: 'End date',
			description: 'Set only when the experiment is concluded',
			type: 'date'
		}),
		defineField({
			name: 'winner',
			title: 'Winner',
			description: 'Set only when concluded',
			type: 'string',
			options: {
				list: [
					{ title: 'Variant A', value: 'A' },
					{ title: 'Variant B', value: 'B' },
					{ title: 'No winner', value: 'none' }
				],
				layout: 'radio'
			}
		}),
		defineField({
			name: 'sampleSize',
			title: 'Sample size',
			description: 'Cached from PostHog, refreshed on rebuild',
			type: 'number'
		}),
		defineField({
			name: 'summary',
			title: 'Summary',
			description: 'The "what we learned" line — shown on concluded experiments',
			type: 'text',
			rows: 3
		})
	],
	preview: {
		select: { title: 'name', subtitle: 'status' },
		prepare({ title, subtitle }) {
			return { title, subtitle };
		}
	},
	orderings: [{ title: 'Start date (newest)', name: 'startDesc', by: [{ field: 'startDate', direction: 'desc' }] }]
});
