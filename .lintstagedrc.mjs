export default {
	// When schema files change, regenerate Sanity types.
	// Return a fixed command (ignore filenames) so typegen runs once on the whole schema.
	'src/lib/sanity/schemas/**/*.ts': () => 'bun run sanity:types'
};
