# Human Input Needed

The app runs fully without any of these. External credentials only enhance features — they do not block the core drill/auth/stats experience.

## Stripe (optional — for real payment processing)

Without Stripe keys, clicking "Upgrade" grants a local 14-day Pro preview automatically so the whole app is fully testable.

Required env vars when you're ready to accept payments:
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...   # $7.99/month price ID
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...    # $59/year price ID
```

Setup steps:
1. Create a Stripe account at https://stripe.com
2. Create one Product called "EarKit Pro"
3. Add two prices: $7.99/month recurring and $59/year recurring
4. Copy the price IDs into the env vars above
5. Set up a webhook pointing to `https://yourdomain.com/api/webhooks/stripe` with events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
6. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`

## Resend (optional — for transactional email)

Without Resend, emails are skipped silently (logged to console). Auth and drills work without email.

Required env vars:
```
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@yourdomain.com
```

Setup steps:
1. Create a Resend account at https://resend.com
2. Verify your sending domain
3. Create an API key
4. Set `EMAIL_FROM` to a verified sender address

## Google OAuth (optional — for one-click sign-in)

Currently the app uses email + password auth as the zero-config baseline. Google sign-in button is shown as disabled in the UI until credentials are provided.

Required env vars:
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

To enable:
1. Create a project in Google Cloud Console
2. Enable the Google+ API
3. Create OAuth 2.0 credentials with redirect URI: `https://yourdomain.com/api/auth/callback/google`
4. Add the credentials to `.env.local`
5. Add `GoogleProvider` to `src/lib/auth.ts`

## Production AUTH_SECRET

For production, generate a secure secret:
```bash
openssl rand -base64 32
```
Set this as `AUTH_SECRET` in your deployment environment. A default is baked into the Dockerfile for zero-config local testing only.

## NEXTAUTH_URL (required for correct auth redirects in production)

Set this to your app's public URL so NextAuth can construct correct callback URLs:
```
NEXTAUTH_URL=https://yourdomain.com
```
The Dockerfile CMD will automatically derive this from `NEXT_PUBLIC_APP_URL` if `NEXTAUTH_URL` is not explicitly set, so setting `NEXT_PUBLIC_APP_URL` in your deployment env is sufficient.
