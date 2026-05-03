import { createHighlighter, type Highlighter } from 'shiki';

let highlighter: Highlighter | null = null;

export async function getHighlighter(): Promise<Highlighter> {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ['github-dark-default'],
			langs: ['typescript', 'javascript', 'svelte', 'html', 'css', 'shellscript', 'sql', 'go', 'java', 'json']
		});
	}
	return highlighter;
}

export async function highlight(code: string, lang: string): Promise<string> {
	const h = await getHighlighter();
	const validLang = h.getLoadedLanguages().includes(lang as never) ? lang : 'text';
	return h.codeToHtml(code, {
		lang: validLang,
		theme: 'github-dark-default',
		transformers: []
	});
}
