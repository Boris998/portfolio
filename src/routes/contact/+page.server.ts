import { superValidate, message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema, type ContactSchema } from '$lib/schemas/contact';
import { Resend } from 'resend';
import { RESEND_API_KEY, CONTACT_EMAIL } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';
import type { ZodObjectType } from 'sveltekit-superforms/adapters';

// Zod v3 ZodObject satisfies ZodObjectType at runtime; cast to satisfy TS constraint
const schema = zod(contactSchema as unknown as ZodObjectType);

const resend = new Resend(RESEND_API_KEY);

const submissions = new Map<string, number[]>();
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

function rateLimited(ip: string): boolean {
	const now = Date.now();
	const times = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
	if (times.length >= LIMIT) return true;
	submissions.set(ip, [...times, now]);
	return false;
}

export const load: PageServerLoad = async () => {
	const form = await superValidate(schema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) return fail(400, { form });

		const data = form.data as ContactSchema;

		if (data.website) {
			return message(form, 'Submitted');
		}

		const ip = getClientAddress();
		if (rateLimited(ip)) {
			return fail(429, { form });
		}

		try {
			await resend.emails.send({
				from: 'Boris Portfolio <onboarding@resend.dev>',
				to: [CONTACT_EMAIL || 'btadirov16@gmail.com'],
				replyTo: data.email,
				subject: `Portfolio inquiry — ${data.name} (${data.bringsYouHere})`,
				text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || '—'}\nBrings them: ${data.bringsYouHere}\n\n${data.message}`
			});
			return message(form, 'Sent. Reply within 24h on weekdays.');
		} catch {
			return fail(500, { form });
		}
	}
};
