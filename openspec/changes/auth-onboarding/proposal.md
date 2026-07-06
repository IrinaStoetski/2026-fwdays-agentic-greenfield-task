## Why

The app currently has no authentication layer — any user can access the dashboard and reflection history without identifying themselves. Without auth, personal reflection data cannot be stored securely across devices or isolated per user, violating BC-PRIVACY-01 and blocking FR-ONB-02. First-time users also land cold with no introduction to the app's value or the three Tone Modes (FR-ONB-01), which risks abandonment before they understand the core loop.

## What Changes

- Introduce Supabase authentication (sign-up and sign-in) with secure session management.
- Add a guided first-visit onboarding flow that introduces the app's purpose, the STEPP reflection loop, and lets users pick their Tone Mode before reaching the dashboard.
- Protect the dashboard route — unauthenticated visitors are redirected to sign-in.
- Store the authenticated user's session in Zustand so other capabilities can read it.
- All onboarding copy is tone-aware once a Tone Mode is selected (defaults to `calm` before selection).

## Capabilities

### New Capabilities
- `auth-onboarding`: Supabase sign-up / sign-in screens, first-visit guided onboarding flow (app intro → STEPP value prop → Tone Mode picker), protected route middleware, and Zustand auth slice.

### Modified Capabilities

## Impact

- **New files**: `app/auth/` route group with sign-in and sign-up pages, `app/onboarding/` multi-step flow, `store/auth.ts` Zustand slice, `lib/auth/` hooks and helpers, `middleware.ts` for route protection.
- **Depends on**: `tone-engine` (onboarding copy is tone-adaptive after mode selection).
- **Read by**: `dashboard` (redirects here when unauthenticated), `progress-logging` (user ID for data isolation).
- **External service**: Supabase project with `@supabase/supabase-js` and `@supabase/ssr`.
- **No breaking changes** to existing components — dashboard and emergency-intercept remain functional; middleware guards them transparently.
