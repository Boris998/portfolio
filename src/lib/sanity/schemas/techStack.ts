import { defineField, defineType } from 'sanity';

export const techStack = defineType({
	name: 'techStack',
	title: 'Tech stack',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'name' },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Frontend', value: 'frontend' },
					{ title: 'Backend', value: 'backend' },
					{ title: 'Database', value: 'db' },
					{ title: 'Infrastructure', value: 'infra' },
					{ title: 'Tooling', value: 'tooling' },
					{ title: 'Language', value: 'lang' }
				]
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'icon',
			title: 'Icon',
			description: 'Upload an SVG/image, or enter a Lucide icon name as fallback',
			type: 'image',
			options: { hotspot: false }
		}),
		defineField({
			name: 'iconName',
			title: 'Icon name (Lucide fallback)',
			type: 'string',
			description: 'Used when no image icon is uploaded'
		}),
		defineField({
			name: 'yearsUsed',
			title: 'Years used',
			type: 'number'
		}),
		defineField({
			name: 'proficiency',
			title: 'Proficiency',
			type: 'string',
			options: {
				list: [
					{ title: 'Learning', value: 'learning' },
					{ title: 'Working', value: 'working' },
					{ title: 'Fluent', value: 'fluent' },
					{ title: 'Expert', value: 'expert' }
				],
				layout: 'radio'
			}
		})
	],
	preview: {
		select: { title: 'name', subtitle: 'category', media: 'icon' },
		prepare({ title, subtitle, media }) {
			return { title, subtitle, media };
		}
	},
	orderings: [
		{ title: 'Category', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }] },
		{ title: 'Name', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }
	]
});
