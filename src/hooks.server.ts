import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const path = event.url.pathname;
	const isStudio = path.startsWith('/studio');

	response.headers.set(
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://*.sentry.io https://eu.i.posthog.com",
			"style-src 'self' 'unsafe-inline'",
			"font-src 'self' data:",
			"img-src 'self' data: blob: https://*.sanity.io https://cdn.sanity.io",
			"connect-src 'self' https://*.sanity.io https://eu.i.posthog.com https://*.sentry.io https://api.resend.com",
			"frame-src 'self' https://*.sanity.io",
			"media-src 'self' blob: https://*.sanity.io"
		].join('; ')
	);

	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=()'
	);

	if (!isStudio) {
		response.headers.set('X-Frame-Options', 'DENY');
	}

	return response;
};
