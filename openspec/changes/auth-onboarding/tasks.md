## 1. Supabase Setup and Dependencies

- [x] 1.1 Install `@supabase/supabase-js` and `@supabase/ssr` packages
- [x] 1.2 Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env var stubs to `.env.local.example` and validate them in `next.config.ts`
- [x] 1.3 Create `lib/supabase/client.ts` (browser client using `createBrowserClient`) and `lib/supabase/server.ts` (server client using `createServerClient` with cookie handlers)

## 2. Zustand Auth Slice

- [x] 2.1 Create `store/auth.ts` with `{ user, session, isLoading }` state and `setAuth`, `clearAuth` actions
- [x] 2.2 Create `components/AuthProvider.tsx` client component that calls `supabase.auth.getSession()` on mount and listens to `onAuthStateChange` to hydrate the store
- [x] 2.3 Mount `<AuthProvider>` in `app/layout.tsx`

## 3. Route Protection Middleware

- [x] 3.1 Create `middleware.ts` at project root that refreshes the Supabase session on every request and redirects unauthenticated users from protected routes to `/auth/sign-in`
- [x] 3.2 Configure the middleware matcher to protect `/` and `/onboarding` while allowing `/auth/*` and static assets through

## 4. Auth Pages

- [x] 4.1 Create `app/auth/sign-up/page.tsx` with email/password form, client-side validation (min 8-char password), and Supabase `signUp` call
- [x] 4.2 Create `app/auth/sign-in/page.tsx` with email/password form and Supabase `signInWithPassword` call
- [x] 4.3 Create `app/auth/layout.tsx` to provide a centred, unauthenticated shell layout for auth pages (no STOP button needed here — auth layout should exclude the global StopButton)
- [x] 4.4 After successful sign-up, redirect to `/onboarding`; after successful sign-in, check `user.user_metadata.hasCompletedOnboarding` and redirect to `/onboarding` or `/`

## 5. Copy Helpers

- [x] 5.1 Create `lib/auth-onboarding/copy.ts` with tone-aware strings for sign-in errors, sign-up errors, and onboarding step headings/body/CTA text for all three ToneModes
- [x] 5.2 Create `lib/auth-onboarding/use-auth-onboarding-copy.ts` hook that reads `activeToneMode` from the tone-engine store and returns the resolved copy object

## 6. Onboarding Flow

- [x] 6.1 Create `app/onboarding/page.tsx` as a client component that manages step index in local state (steps: intro, stepp-value-prop, tone-picker)
- [x] 6.2 Build `components/auth-onboarding/OnboardingIntro.tsx` — step 1 screen with app intro copy and a "Next" button
- [x] 6.3 Build `components/auth-onboarding/OnboardingSteppValue.tsx` — step 2 screen explaining the STEPP reflection loop with a "Next" button
- [x] 6.4 Build `components/auth-onboarding/OnboardingTonePicker.tsx` — step 3 screen with three selectable tone cards (calm / rational / high-impact) and "Get Started" / "Skip" buttons
- [x] 6.5 On "Get Started" or "Skip": set `activeToneMode` in the tone-engine store, call `supabase.auth.updateUser({ data: { hasCompletedOnboarding: true } })`, and redirect to `/`

## 7. Sign-out

- [x] 7.1 Create `lib/auth-onboarding/use-sign-out.ts` hook that calls `supabase.auth.signOut()`, clears the auth store, and pushes to `/auth/sign-in`
- [x] 7.2 Expose a sign-out button in the dashboard header (minimal — just a labelled icon or text link) using the hook

## 8. Tests

- [x] 8.1 Write unit tests in `__tests__/auth-onboarding/copy.test.ts` verifying all three tone modes return correct strings and no `!` appears in `calm` mode
- [x] 8.2 Write unit tests in `__tests__/auth-onboarding/auth-store.test.ts` verifying `setAuth` and `clearAuth` mutations on the Zustand slice
- [x] 8.3 Write unit tests in `__tests__/auth-onboarding/onboarding-flow.test.ts` verifying step progression, skip behaviour, and the `hasCompletedOnboarding` update call
