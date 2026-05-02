import { defineArrayMember, defineField, defineType } from 'sanity';

export const imageWithCaption = defineType({
	name: 'imageWithCaption',
	title: 'Image',
	type: 'object',
	fields: [
		defineField({
			name: 'asset',
			title: 'Image',
			type: 'image',
			options: { hotspot: true },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'alt',
			title: 'Alt text',
			type: 'string',
			validation: (Rule) =>
				Rule.custom((alt, context) => {
					const parent = context.parent as { asset?: unknown } | undefined;
					if (parent?.asset && !alt) return 'Alt text is required when an image is set';
					return true;
				})
		}),
		defineField({
			name: 'caption',
			title: 'Caption',
			type: 'string'
		})
	],
	preview: {
		select: { title: 'alt', media: 'asset' },
		prepare({ title, media }) {
			return { title: title || 'Image', media };
		}
	}
});

export const codeBlock = defineType({
	name: 'codeBlock',
	title: 'Code',
	type: 'object',
	fields: [
		defineField({
			name: 'language',
			title: 'Language',
			type: 'string',
			options: {
				list: [
					{ title: 'TypeScript', value: 'typescript' },
					{ title: 'JavaScript', value: 'javascript' },
					{ title: 'Svelte', value: 'svelte' },
					{ title: 'HTML', value: 'html' },
					{ title: 'CSS', value: 'css' },
					{ title: 'Shell', value: 'shell' },
					{ title: 'SQL', value: 'sql' },
					{ title: 'Go', value: 'go' },
					{ title: 'Java', value: 'java' },
					{ title: 'JSON', value: 'json' }
				]
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'code',
			title: 'Code',
			type: 'text',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'filename',
			title: 'Filename',
			type: 'string'
		})
	],
	preview: {
		select: { title: 'filename', subtitle: 'language' },
		prepare({ title, subtitle }) {
			return { title: title || 'Code block', subtitle };
		}
	}
});

export const callout = defineType({
	name: 'callout',
	title: 'Callout',
	type: 'object',
	fields: [
		defineField({
			name: 'variant',
			title: 'Variant',
			type: 'string',
			options: {
				list: [
					{ title: 'Info', value: 'info' },
					{ title: 'Warning', value: 'warn' },
					{ title: 'Success', value: 'success' }
				],
				layout: 'radio'
			},
			initialValue: 'info',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'text',
			validation: (Rule) => Rule.required()
		})
	],
	preview: {
		select: { title: 'body', subtitle: 'variant' },
		prepare({ title, subtitle }) {
			return { title: title?.slice(0, 60) || 'Callout', subtitle };
		}
	}
});

export const metricGrid = defineType({
	name: 'metricGrid',
	title: 'Metric grid',
	type: 'object',
	fields: [
		defineField({
			name: 'metrics',
			title: 'Metrics',
			type: 'array',
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
					]
				})
			],
			validation: (Rule) => Rule.required().min(1)
		})
	]
});

export const pullQuote = defineType({
	name: 'pullQuote',
	title: 'Pull quote',
	type: 'object',
	fields: [
		defineField({
			name: 'quote',
			title: 'Quote',
			type: 'text',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'attribution',
			title: 'Attribution',
			type: 'string'
		})
	],
	preview: {
		select: { title: 'quote', subtitle: 'attribution' },
		prepare({ title, subtitle }) {
			return { title: `"${title?.slice(0, 60)}"`, subtitle };
		}
	}
});

export const beforeAfter = defineType({
	name: 'beforeAfter',
	title: 'Before / After',
	type: 'object',
	fields: [
		defineField({ name: 'beforeLabel', title: 'Before label', type: 'string', initialValue: 'Before' }),
		defineField({ name: 'afterLabel', title: 'After label', type: 'string', initialValue: 'After' }),
		defineField({
			name: 'beforeContent',
			title: 'Before content',
			type: 'image',
			options: { hotspot: true }
		}),
		defineField({
			name: 'afterContent',
			title: 'After content',
			type: 'image',
			options: { hotspot: true }
		})
	],
	preview: {
		select: { title: 'beforeLabel', subtitle: 'afterLabel' },
		prepare({ title, subtitle }) {
			return { title: `${title} → ${subtitle}` };
		}
	}
});

export const portableTextBlocks = [
	defineArrayMember({ type: 'block' }),
	defineArrayMember({ type: 'imageWithCaption' }),
	defineArrayMember({ type: 'codeBlock' }),
	defineArrayMember({ type: 'callout' }),
	defineArrayMember({ type: 'metricGrid' }),
	defineArrayMember({ type: 'pullQuote' }),
	defineArrayMember({ type: 'beforeAfter' })
];
