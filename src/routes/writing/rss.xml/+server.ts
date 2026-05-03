import { sanityClient } from '$lib/sanity/client';
import { loadQuery } from '$lib/sanity/load';
import { getAllPosts } from '$lib/sanity/queries';
import type { Post } from '$lib/sanity/types';
import { PUBLIC_SITE_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	let posts: Post[] = [];

	try {
		posts = (await loadQuery<Post[]>(sanityClient, getAllPosts)) ?? [];
	} catch {
		// serve empty feed if Sanity unavailable at build time
	}

	const siteUrl = PUBLIC_SITE_URL || 'https://boris.dev';

	const items = posts
		.map((post) => {
			const url = `${siteUrl}/writing/${post.slug?.current ?? ''}`;
			const pubDate = post.publishedAt
				? new Date(post.publishedAt).toUTCString()
				: new Date().toUTCString();
			return `
		<item>
			<title><![CDATA[${post.title ?? ''}]]></title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${pubDate}</pubDate>
			${post.excerpt ? `<description><![CDATA[${post.excerpt}]]></description>` : ''}
		</item>`.trim();
		})
		.join('\n\t');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Boris — Writing</title>
		<link>${siteUrl}/writing</link>
		<description>Occasional essays on building and optimizing software.</description>
		<language>en-us</language>
		<atom:link href="${siteUrl}/writing/rss.xml" rel="self" type="application/rss+xml" />
		${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
