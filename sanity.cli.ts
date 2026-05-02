import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
	api: {
		projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
		dataset: process.env.PUBLIC_SANITY_DATASET ?? 'production'
	},
	typegen: {
		generates: 'src/lib/sanity/types.ts',
		configPath: './sanity.config.ts'
	}
});
