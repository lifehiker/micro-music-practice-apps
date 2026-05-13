# Forge Completion Audit

Generated: 2026-05-13

## PRD Requirement Coverage

| PRD Requirement | Implementation |
|---|---|
| Email/password sign-in | `src/app/api/auth/register/route.ts`, `src/lib/auth.ts` (CredentialsProvider + bcryptjs) |
| Google sign-in (guarded) | Disabled button in `src/components/auth/auth-form.tsx`, documented in HUMAN_INPUT_NEEDED.md |
| Instrument focus onboarding | `src/components/onboarding/OnboardingForm.tsx`, `src/app/api/onboarding/route.ts` |
| Skill focus onboarding | `src/components/onboarding/OnboardingForm.tsx` (multi-select checkboxes) |
| Daily goal onboarding | `src/components/onboarding/OnboardingForm.tsx` (2/5/10 min radio) |
| Daily drill home screen | `src/app/app/page.tsx` — single CTA, streak, yesterday's result, goal |
| Interval recognition drill | `src/app/app/drill/[type]/page.tsx` + `src/components/drill/*` — type=interval |
| Chord quality drill | Same drill session flow — type=chord_quality |
| Chord progression drill | Same drill session flow — type=progression |
| 10-question session cap | `src/components/drill/DrillSession.tsx` — sessions load exactly 10 items |
| Immediate feedback | `src/components/drill/AnswerGrid.tsx` — correct/incorrect shown after each answer |
| Answer reveal | `src/components/drill/QuestionCard.tsx` — shows correct answer in feedback |
| Audio playback | `src/lib/audio.ts` + `src/components/drill/AudioPlayerButton.tsx` (Howler.js) |
| Replay button | `AudioPlayerButton` shown on every `QuestionCard` |
| Audio samples | `public/audio/intervals/interval-demo.wav`, `public/audio/chords/chord-demo.wav`, `public/audio/progressions/progression-demo.wav` |
| Session persistence | `src/app/api/practice/complete/route.ts` — creates PracticeSession + PracticeAnswer rows |
| Adaptive repetition engine | `src/lib/adaptive.ts` — weighted random pick based on masteryScore and attempts |
| UserSkillStat tracking | Updated in `api/practice/complete` after each answer |
| Daily streak counter | `src/lib/streaks.ts` → `getCurrentStreak()` |
| 7-day history strip | `src/lib/streaks.ts` → `buildSevenDayHistory()` shown on home and stats |
| Stats page | `src/app/app/stats/page.tsx` + `src/components/stats/*` |
| Total sessions count | `StatsOverview` component |
| Accuracy by drill type | `AccuracyByType` component |
| Top 3 weak spots | `WeakSpotsList` from `UserSkillStat` ordered by masteryScore asc |
| Free tier gating | `src/lib/daily-drill.ts` `getDrillItemsByType` — non-INTERVAL returns `gated:true` for free users |
| Paid tier unlock | `src/lib/billing.ts` `isProStatus()` — ACTIVE or TRIALING unlocks full access |
| Free vs paid home UI | `src/app/app/page.tsx` — locks chord/progression quick-start links for free users |
| Stripe checkout | `src/app/api/stripe/checkout/route.ts` — lazy-initialized Stripe client with env guard |
| Stripe portal | `src/app/api/stripe/portal/route.ts` — env-guarded billing portal |
| Stripe webhook | `src/app/api/webhooks/stripe/route.ts` — handles checkout.session.completed, subscription.updated/deleted |
| Local Pro preview fallback | Checkout route grants ACTIVE subscription when Stripe env vars are missing |
| Welcome email | `src/lib/email.tsx` → `sendWelcomeEmail()` — called in register route, skipped if RESEND_API_KEY missing |
| Upgrade prompt email (3 sessions) | `src/app/api/practice/complete/route.ts` — triggers on 3rd completed session |
| Analytics events | `src/lib/analytics.ts` → `trackEvent()` — persists to `AnalyticsEvent` table |
| Events tracked | signup_completed, onboarding_completed, drill_completed, checkout_started, subscription_activated |
| PWA manifest | `src/app/manifest.ts` — returns webmanifest with icons, theme, display:standalone |
| PWA icons | `public/icon-192.png`, `public/icon-512.png` |
| Marketing homepage | `src/app/(marketing)/page.tsx` — hero, feature cards, pricing preview |
| /ear-training-for-guitar | `src/app/(marketing)/ear-training-for-guitar/page.tsx` |
| /chord-progression-ear-training | `src/app/(marketing)/chord-progression-ear-training/page.tsx` |
| /interval-training-app | `src/app/(marketing)/interval-training-app/page.tsx` |
| /music-practice-app-self-taught | `src/app/(marketing)/music-practice-app-self-taught/page.tsx` |
| /for-singers | `src/app/(marketing)/for-singers/page.tsx` |
| /for-songwriters | `src/app/(marketing)/for-songwriters/page.tsx` |
| Blog | `src/app/blog/[slug]/page.tsx` + `src/lib/blog.ts` — 5 launch posts |
| Pricing page | `src/app/pricing/page.tsx` + `src/components/pricing/pricing-cards.tsx` |
| SEO metadata | Per-page `export const metadata` using Next.js metadata API |
| robots.txt | `src/app/robots.ts` |
| sitemap.xml | `src/app/sitemap.ts` |
| Standalone Docker output | `next.config.ts`: `output: "standalone"` |
| Dockerfile | `Dockerfile` — multi-stage, node:20-slim, openssl, prisma db push on startup |
| No google fonts | CSS system font stack in `globals.css` |
| No module-level SDK clients | Stripe and Resend lazy-initialized inside handler bodies |
| SQLite persistence | `prisma/schema.prisma` — provider sqlite, binaryTargets include debian-openssl-3.0.x |
| DB auto-seed | `src/lib/daily-drill.ts` `ensureSeedData()` — seeds on first request if table empty |

## Intentionally Deferred (External Credentials Required)

| Feature | Status | Why app still runs |
|---|---|---|
| Real Stripe payments | Deferred | Local Pro preview fallback activates automatically |
| Resend transactional email | Deferred | Emails silently skipped, logged to console |
| Google OAuth | Deferred | Credentials auth is the zero-config baseline |

## Build Verification

- `npm run build`: ✅ passes with 0 TypeScript errors, 0 lint errors
- All 31 routes compiled successfully
- Dev server: ✅ starts on port 3000
- Route smoke tests: `/`, `/pricing`, `/ear-training-for-guitar`, `/blog/why-ear-training-apps-feel-like-homework`, `/login` — all 200 OK
- DB seed: ✅ 104 drill items seeded (40 interval, 40 chord quality, 24 progression)
