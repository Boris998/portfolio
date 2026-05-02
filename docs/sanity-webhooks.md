# Sanity Webhooks — Sprint 9 Setup

Wire Sanity content changes to a Vercel deploy so published edits go live automatically.

## 1. Create a Vercel deploy hook

1. Open the Vercel project dashboard → Settings → Git → Deploy Hooks
2. Name: `sanity-publish`, branch: `main`
3. Copy the generated URL (format: `https://api.vercel.com/v1/integrations/deploy/...`)

## 2. Create the Sanity webhook

1. Sanity dashboard → API → Webhooks → **Create webhook**
2. Fill in:
   - **Name**: `Vercel deploy on publish`
   - **URL**: paste the Vercel deploy hook URL
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type in ["project","testimonial","post","settings","experiment"]`
   - **Projection**: leave blank (full document is fine)
   - **HTTP method**: POST
   - **Secret**: generate a secret, save it in Vercel env as `SANITY_WEBHOOK_SECRET` (validate in a future SvelteKit API route if needed)
3. Save and test with **Send test notification**

## Notes

- The `/studio` route is excluded from the sitemap and disallowed in `robots.txt`
  (robots.txt is generated in Sprint 9 — add `Disallow: /studio` to the generator)
- ISR / revalidation is not configured yet; a full rebuild is triggered on each webhook
- If rebuild time becomes a problem in Sprint 9, consider on-demand ISR via a `+server.ts` route that validates the Sanity webhook HMAC signature
