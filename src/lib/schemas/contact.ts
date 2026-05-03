import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().min(2, 'Please share your name'),
	email: z.string().email('Please share a valid email'),
	company: z.string().max(120).optional(),
	bringsYouHere: z.enum(['hiring', 'client', 'collaboration', 'hi'], {
		required_error: 'Please pick one'
	}),
	message: z.string().min(20, 'Tell me a bit more').max(2000, 'A bit too much'),
	website: z.string().max(0).optional()
});

export type ContactSchema = z.infer<typeof contactSchema>;
