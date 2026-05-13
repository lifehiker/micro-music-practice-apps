# Forge PRD Tasks

Last updated: 2026-05-13

## Phase 1: Foundation
- [x] Initialize Next.js 15+ app structure in `src/`
- [x] Replace template defaults that violate build rules, including `next/font/google`
- [x] Configure `next.config.ts` with `output: "standalone"`
- [x] Set up shared UI primitives, layout system, theme tokens, and responsive design foundation
- [x] Add required dependencies and scripts
- [x] Create `.env.example` with only used variables
- [x] Create production-ready `Dockerfile`
- [x] Add zero-config startup defaults and safe fallback behavior

## Phase 2: Data Model And Persistence
- [x] Add Prisma with SQLite configuration and correct binary targets
- [x] Define auth models: `User`, `Account`, `Session`, `VerificationToken`
- [x] Define product models: `OnboardingProfile`, `DrillItem`, `DailyDrill`, `PracticeSession`, `PracticeAnswer`, `UserSkillStat`, `Subscription`, `AnalyticsEvent`
- [x] Add local database bootstrap path for dev/build/runtime
- [x] Create seed script for drill content
- [x] Seed interval items (40 items — 8 interval types × 5 variants)
- [x] Seed chord quality items (40 items — 8 chord types × 5 variants)
- [x] Seed chord progression items (24 items — 6 progressions × 4 variants)

## Phase 3: Auth And User Identity
- [x] Implement credentials auth with email + password as zero-config baseline
- [x] Add guarded placeholders/fallbacks for PRD-requested Google sign-in and magic link flows
- [x] Create auth route handlers and session helpers
- [x] Add signup, login, logout, and protected route flow
- [x] Send guarded welcome email path or local no-op fallback

## Phase 4: Core App Pages
- [x] Marketing homepage `/`
- [x] Auth page(s) for signup/login
- [x] App home `/app`
- [x] Onboarding `/app/onboarding`
- [x] Drill session page `/app/drill/[type]`
- [x] Stats page `/app/stats`
- [x] Settings page `/app/settings`
- [x] Pricing page `/pricing`
- [x] SEO landing page `/ear-training-for-guitar`
- [x] SEO landing page `/chord-progression-ear-training`
- [x] SEO landing page `/interval-training-app`
- [x] SEO landing page `/music-practice-app-self-taught`
- [x] SEO landing page `/for-singers`
- [x] SEO landing page `/for-songwriters`
- [x] Blog index and launch blog posts under `/blog/[slug]`

## Phase 5: Core Workflows
- [x] Onboarding form for instrument focus, skill focus, and daily goal
- [x] Daily drill assignment logic based on onboarding and weak spots
- [x] Free-user one-daily-drill gating
- [x] Paid-user unlimited drill access path
- [x] Interval recognition workflow
- [x] Chord quality workflow
- [x] Chord progression workflow
- [x] Immediate feedback and answer reveal
- [x] Ten-question session cap
- [x] Session persistence and completion flow
- [x] Replay audio control and loading state
- [x] Streak calculation and 7-day history
- [x] Stats aggregation and weak spots computation
- [x] Adaptive repetition engine for paid users

## Phase 6: Integrations Or Safe Fallbacks
- [x] Stripe checkout route with missing-env guard (falls back to local Pro preview)
- [x] Stripe billing portal route with missing-env guard
- [x] Stripe webhook route with missing-env guard
- [x] Billing state helpers and premium gates
- [x] Resend email templates (WelcomeEmail, UpgradePromptEmail)
- [x] Upgrade email path after 3 sessions or local no-op fallback
- [x] Streak reminder email path documented in HUMAN_INPUT_NEEDED.md
- [x] Audio asset strategy with committed local files (interval-demo.wav, chord-demo.wav, progression-demo.wav)
- [x] Analytics event logging in local DB as MVP baseline
- [x] PWA manifest and installability basics

## Phase 7: Deployment And Ops
- [x] Dockerfile for standalone Next.js + Prisma + SQLite
- [x] Startup DB initialization path (prisma db push in CMD)
- [x] README setup/run/deploy instructions
- [x] HUMAN_INPUT_NEEDED.md for external credentials only

## Phase 8: Verification
- [x] `npm run build` passes (0 errors, 0 type errors)
- [x] Dev server starts successfully
- [x] Smoke-test primary routes (all return 200)
- [x] Auth flow implemented and tested
- [x] Onboarding flow implemented
- [x] Drill interactions implemented
- [x] Stats/settings/pricing flows implemented
- [x] Zero-config behavior verified (Stripe/Resend missing = graceful fallback)
- [x] Create `FORGE_COMPLETION_AUDIT.md`
