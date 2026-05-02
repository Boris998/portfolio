import { defineArrayMember, defineField, defineType } from 'sanity';

export const settings = defineType({
	name: 'settings',
	title: 'Settings',
	type: 'document',
	fields: [
		defineField({
			name: 'availability',
			title: 'Availability',
			type: 'string',
			options: {
				list: [
					{ title: 'Selectively booking', value: 'selectively-booking' },
					{ title: 'Fully booked', value: 'fully-booked' },
					{ title: 'Open', value: 'open' }
				],
				layout: 'radio'
			},
			initialValue: 'selectively-booking',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'availabilityNote',
			title: 'Availability note',
			description: 'Shown in the site header, e.g. "Selectively booking · Q3 2026"',
			type: 'string'
		}),
		defineField({
			name: 'contactEmail',
			title: 'Contact email',
			type: 'email',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'socialLinks',
			title: 'Social links',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({ name: 'platform', title: 'Platform', type: 'string', validation: (Rule) => Rule.required() }),
						defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() })
					],
					preview: {
						select: { title: 'platform', subtitle: 'url' }
					}
				})
			]
		}),
		defineField({
			name: 'resumeFile',
			title: 'Résumé (PDF)',
			type: 'file',
			options: { accept: '.pdf' }
		}),
		defineField({
			name: 'heroHeadline',
			title: 'Hero headline',
			type: 'string'
		}),
		defineField({
			name: 'heroSubheadline',
			title: 'Hero sub-headline',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'labOpeningCopy',
			title: 'Lab opening copy',
			description: 'Personalized welcome messages for /lab, keyed by UTM source (Sprint 7)',
			type: 'object',
			fields: [
				defineField({ name: 'linkedin', title: 'LinkedIn visitors', type: 'text', rows: 2 }),
				defineField({ name: 'github', title: 'GitHub visitors', type: 'text', rows: 2 }),
				defineField({ name: 'twitter', title: 'Twitter visitors', type: 'text', rows: 2 }),
				defineField({ name: 'default', title: 'Default', type: 'text', rows: 2 })
			]
		})
	],
	preview: {
		prepare() {
			return { title: 'Site settings' };
		}
	}
});
