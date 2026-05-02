import { defineArrayMember, defineField, defineType } from 'sanity';
import { portableTextBlocks } from './blocks';

export const project = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'meta', title: 'Meta' },
		{ name: 'links', title: 'Links' }
	],
	fields: [
		// ── Content group ──────────────────────────────────────────────
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required().min(2)
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			group: 'content',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'summary',
			title: 'Summary',
			description: 'One-paragraph teaser shown on home and /work cards (max 280 chars)',
			type: 'text',
			rows: 3,
			group: 'content',
			validation: (Rule) => Rule.max(280)
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero image',
			type: 'image',
			group: 'content',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alt text',
					type: 'string',
					validation: (Rule) => Rule.required()
				})
			],
			validation: (Rule) =>
				Rule.custom((image: { asset?: unknown; alt?: string } | undefined) => {
					if (!image?.asset) return 'Hero image is required';
					if (!image.alt) return 'Alt text is required';
					return true;
				})
		}),
		defineField({
			name: 'gallery',
			title: 'Gallery',
			type: 'array',
			group: 'content',
			of: [
				defineArrayMember({
					type: 'image',
					options: { hotspot: true },
					fields: [
						defineField({
							name: 'alt',
							title: 'Alt text',
							type: 'string',
							validation: (Rule) => Rule.required()
						})
					]
				})
			]
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			group: 'content',
			of: portableTextBlocks
		}),
		defineField({
			name: 'metrics',
			title: 'Metrics',
			type: 'array',
			group: 'content',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({
							name: 'trend',
							title: 'Trend',
							type: 'string',
							options: {
								list: [
									{ title: 'Up', value: 'up' },
									{ title: 'Down', value: 'down' },
									{ title: 'Neutral', value: 'neutral' }
								],
								layout: 'radio'
							},
							initialValue: 'neutral'
						})
					],
					preview: {
						select: { title: 'value', subtitle: 'label' }
					}
				})
			]
		}),
		defineField({
			name: 'stack',
			title: 'Tech stack',
			type: 'array',
			group: 'content',
			of: [defineArrayMember({ type: 'reference', to: [{ type: 'techStack' }] })]
		}),

		// ── Meta group ─────────────────────────────────────────────────
		defineField({
			name: 'role',
			title: 'Role',
			type: 'string',
			group: 'meta'
		}),
		defineField({
			name: 'client',
			title: 'Client',
			type: 'string',
			group: 'meta'
		}),
		defineField({
			name: 'startDate',
			title: 'Start date',
			type: 'date',
			group: 'meta',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'endDate',
			title: 'End date',
			description: 'Leave blank if ongoing',
			type: 'date',
			group: 'meta'
		}),
		defineField({
			name: 'featured',
			title: 'Featured on home',
			type: 'boolean',
			group: 'meta',
			initialValue: false
		}),
		defineField({
			name: 'order',
			title: 'Display order',
			type: 'number',
			group: 'meta',
			initialValue: 0
		}),

		// ── Links group ────────────────────────────────────────────────
		defineField({
			name: 'links',
			title: 'Links',
			type: 'array',
			group: 'links',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
						defineField({
							name: 'type',
							title: 'Type',
							type: 'string',
							options: {
								list: [
									{ title: 'Live', value: 'live' },
									{ title: 'GitHub', value: 'github' },
									{ title: 'Case study', value: 'case-study' },
									{ title: 'NDA', value: 'nda' }
								]
							},
							validation: (Rule) => Rule.required()
						})
					],
					preview: {
						select: { title: 'label', subtitle: 'type' }
					}
				})
			]
		})
	],
	preview: {
		select: { title: 'title', subtitle: 'role', media: 'heroImage' },
		prepare({ title, subtitle, media }) {
			return { title, subtitle, media };
		}
	}
});
