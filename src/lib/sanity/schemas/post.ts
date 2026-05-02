import { defineArrayMember, defineField, defineType } from 'sanity';
import { portableTextBlocks } from './blocks';

export const post = defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title' },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.max(200)
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover image',
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
							if (parent?.asset && !alt) return 'Alt text is required when a cover image is set';
							return true;
						})
				})
			]
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: portableTextBlocks
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [defineArrayMember({ type: 'string' })],
			options: { layout: 'tags' }
		}),
		defineField({
			name: 'readTime',
			title: 'Read time (minutes)',
			type: 'number'
		})
	],
	preview: {
		select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' },
		prepare({ title, subtitle, media }) {
			return {
				title,
				subtitle: subtitle ? new Date(subtitle).toLocaleDateString('en-GB', { dateStyle: 'medium' }) : '',
				media
			};
		}
	},
	orderings: [{ title: 'Published (newest)', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }]
});
