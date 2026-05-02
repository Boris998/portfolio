import { defineArrayMember, defineField, defineType } from 'sanity';

export const testimonial = defineType({
	name: 'testimonial',
	title: 'Testimonial',
	type: 'document',
	fields: [
		defineField({
			name: 'quote',
			title: 'Quote',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required().max(500)
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'authorRole',
			title: 'Author role',
			type: 'string'
		}),
		defineField({
			name: 'authorCompany',
			title: 'Author company',
			type: 'string'
		}),
		defineField({
			name: 'authorAvatar',
			title: 'Author avatar',
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
							if (parent?.asset && !alt) return 'Alt text is required when an avatar is set';
							return true;
						})
				})
			]
		}),
		defineField({
			name: 'featured',
			title: 'Featured',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'relatedProject',
			title: 'Related project',
			type: 'reference',
			to: [{ type: 'project' }]
		})
	],
	preview: {
		select: { title: 'author', subtitle: 'authorCompany', media: 'authorAvatar' },
		prepare({ title, subtitle, media }) {
			return { title, subtitle, media };
		}
	}
});
