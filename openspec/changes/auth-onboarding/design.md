## Context

The app currently renders the dashboard (`app/page.tsx`) with no authentication gate — anyone with the URL can access all data. There is no Supabase client, no session state, and no onboarding entry point. The `tone-engine` Zustand store already persists `activeToneMode` to localStorage, which the onboarding flow will write into at mode-selection time.

The stack mandates Supabase for auth (TC-STACK-04) and Next.js App Router with the `app/` directory. The Next.js version in use is **16**, which uses `middleware.ts` at the project root for edge route protection and async server components for session reads.

## Goals / Non-Goals

**Goals:**
- Add Supabase email/password sign-up and sign-in.
- Gate the dashboard and all future authenticated routes so unauthenticated users land on sign-in.
- Deliver a first-visit onboarding flow (app intro → STEPP value prop → Tone Mode picker) that runs once after first sign-up and never again.
- Expose the current user's session (user ID, email) from a Zustand `auth` slice so other capabilities can read it without prop-drilling.
- All onboarding copy is tone-aware once the user picks a mode (defaults to `calm`).

**Non-Goals:**
- OAuth / social login — email/password only for MVP.
- Password reset or email verification flows beyond Supabase defaults.
- Account deletion or profile management.
- Server-side data fetching for reflection history (owned by future capabilities).
- Supabase Row Level Security policy authoring (DB admin concern, not frontend).

## Decisions

### D1 — `@supabase/ssr` with cookie-based sessions

Use `@supabase/ssr` (the official Next.js integration package) rather than `@supabase/supabase-js` directly. This package handles cookie serialization and hydration correctly for both Server Components and the Edge Runtime used by middleware. Alternatively, storing tokens in localStorage would break SSR and require client-only reads — unacceptable for route protection.

### D2 — Middleware for route protection

Place a `middleware.ts` at the project root (Next.js 16 standard location) that refreshes the Supabase session on every request and redirects unauthenticated requests to `/auth/sign-in`. Protected matcher covers `/`, `/onboarding`, and any future authenticated routes. Public matcher explicitly allows `/auth/*`.

Alternative considered: per-page `redirect()` in server components. Rejected — duplicates logic across every page and is error-prone as the route tree grows.

### D3 — Onboarding as a separate route group `(onboarding)`

The multi-step onboarding lives at `/onboarding` as a dedicated route. A `hasCompletedOnboarding` boolean persisted in Supabase user metadata (`user.user_metadata`) gates re-entry. After sign-up, middleware (or a redirect in the sign-up handler) sends first-time users to `/onboarding`; returning users go straight to `/`.

Alternative considered: A client-side modal overlay on the dashboard. Rejected — harder to test, route-skippable, and couples dashboard load with onboarding state.

### D4 — Zustand `auth` slice for client-side session

A `store/auth.ts` slice holds `{ user, session, isLoading }` and is hydrated in a `<AuthProvider>` client component mounted in `app/layout.tsx`. This makes the user ID available synchronously to other Zustand stores (e.g., `progress-logging`) without threading it through React props.

### D5 — Onboarding step state is ephemeral (no persistence)

Onboarding step index lives in local React state — not Zustand, not localStorage. If the user refreshes mid-flow, they restart from step 1. The flow is short (3 steps) and single-session, so persistence adds complexity without meaningful benefit.

## Risks / Trade-offs

- **Supabase env vars missing** → App renders a clear config error in development. In production, middleware will fail to create a client and crash — mitigated by validating `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` at build time via `next.config.ts`.
- **Cookie-based sessions vs. PWA offline** → Session cookies are unavailable offline. The dashboard and emergency-intercept should degrade gracefully (read cached data) when offline. The `offline-pwa` capability owns this contract; auth just needs to not hard-crash when the Supabase client is unreachable.
- **First-visit detection via user metadata** → `user.user_metadata.hasCompletedOnboarding` requires a Supabase `updateUser` call after onboarding completes. If this call fails (network), the user sees onboarding again on next login — a minor annoyance, not data loss. Acceptable for MVP.
- **`@supabase/ssr` package version** → Must be installed alongside `@supabase/supabase-js`; version mismatch causes subtle auth bugs. Pin both in `package.json`.

## Open Questions

- Should the Tone Mode picker in onboarding require a selection, or can the user skip and default to `calm`? Assuming skip-to-default is allowed for now.
- Do we need email confirmation enabled in the Supabase project, or should it be disabled for faster MVP testing? Recommend disabling for development; note in README.
