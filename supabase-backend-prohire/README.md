
# ProHire — Supabase Backend Package

This package adds a production-grade Supabase backend for a **hiring & staffing platform**.

## What you get

- SQL schema & RLS policies
- Auth trigger to auto-create profiles
- Full-text search for jobs
- Edge Functions:
  - `create-application` — safe application creation
  - `notify-message` — example outbound webhook
  - `sync-webhook` — generic inbound webhook to audit logs
- TypeScript client helpers

## Setup (15 minutes)

1. **Create a Supabase project** and install the CLI.
2. Copy the `supabase/` folder into your repo root. Then run:

   ```bash
   supabase link --project-ref YOUR_REF
   supabase db push
   ```

3. **Deploy functions**

   ```bash
   supabase functions deploy create-application
   supabase functions deploy notify-message
   supabase functions deploy sync-webhook
   ```

4. **Set env**

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - For functions:
     - `SUPABASE_URL`, `SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY` (for `notify-message` and `sync-webhook`)
     - `NOTIFY_WEBHOOK_URL` (optional)

5. **Wire the client**

   Add `src/lib/supabaseClient.ts` and `src/lib/services.ts` to your app and import where needed.

## Realtime suggestions

- Enable Realtime on `messages` and `applications` tables.
- Add a Realtime Webhook to `messages` → POST to your `notify-message` function URL.

## Security notes

- All tables have RLS enabled.
- Company membership gates writes to jobs, applications, and interviews.
- Admins are recognized via `profiles.role = 'admin'`.

## Evolving the model

- Add payments, KYC, or ATS integrations in separate schemas.
- If your app needs marketplace fees or escrow, consider a `contracts` table and a payments provider webhook to `sync-webhook`.
