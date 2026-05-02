import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/lib/sanity/schemas';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
	name: 'boris-portfolio',
	title: 'Boris Portfolio Studio',
	projectId,
	dataset,

	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						// Settings singleton — pinned at top
						S.listItem()
							.title('Settings')
							.id('settings')
							.child(S.document().schemaType('settings').documentId('settings')),

						S.divider(),

						// Content group
						S.listItem()
							.title('Content')
							.child(
								S.list()
									.title('Content')
									.items([
										S.documentTypeListItem('project').title('Projects'),
										S.documentTypeListItem('testimonial').title('Testimonials'),
										S.documentTypeListItem('post').title('Posts')
									])
							),

						// Taxonomy group
						S.listItem()
							.title('Taxonomy')
							.child(
								S.list()
									.title('Taxonomy')
									.items([S.documentTypeListItem('techStack').title('Tech Stack')])
							),

						// Experiments group
						S.listItem()
							.title('Experiments')
							.child(
								S.list()
									.title('Experiments')
									.items([S.documentTypeListItem('experiment').title('Experiments')])
							)
					])
		}),
		visionTool()
	],

	schema: {
		types: schemaTypes
	}
});
