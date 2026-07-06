## ADDED Requirements

### Requirement: Sign-up with email and password
The system SHALL allow new users to create an account using an email address and password via Supabase authentication. On successful sign-up, the user SHALL be redirected to the onboarding flow.

#### Scenario: Successful sign-up
- **WHEN** a user submits a valid email and password on the sign-up screen
- **THEN** Supabase creates an account, a session is established, and the user is redirected to `/onboarding`

#### Scenario: Sign-up with already-registered email
- **WHEN** a user submits an email that already has an account
- **THEN** the sign-up form displays a tone-aware error message and the user remains on the sign-up screen

#### Scenario: Sign-up with invalid password
- **WHEN** a user submits a password shorter than 8 characters
- **THEN** the form displays an inline validation error before making a network request

### Requirement: Sign-in with email and password
The system SHALL allow returning users to sign in using their registered email and password. On successful sign-in, authenticated users with completed onboarding SHALL be redirected to the dashboard (`/`); first-time users SHALL be redirected to `/onboarding`.

#### Scenario: Successful sign-in — returning user
- **WHEN** a returning user with `hasCompletedOnboarding: true` submits valid credentials
- **THEN** the session is established and the user is redirected to `/`

#### Scenario: Successful sign-in — first-time user
- **WHEN** a user with `hasCompletedOnboarding: false` (or unset) submits valid credentials
- **THEN** the session is established and the user is redirected to `/onboarding`

#### Scenario: Sign-in with wrong credentials
- **WHEN** a user submits an unrecognized email or incorrect password
- **THEN** the sign-in form displays a tone-aware error message and the user remains on the sign-in screen

### Requirement: Authenticated route protection
The system SHALL redirect unauthenticated users who attempt to access protected routes (`/`, `/onboarding`) to `/auth/sign-in`. Authenticated users accessing `/auth/sign-in` or `/auth/sign-up` SHALL be redirected to `/`.

#### Scenario: Unauthenticated access to dashboard
- **WHEN** a visitor without a valid session navigates to `/`
- **THEN** the middleware redirects them to `/auth/sign-in`

#### Scenario: Authenticated access to sign-in page
- **WHEN** a signed-in user navigates to `/auth/sign-in`
- **THEN** the middleware redirects them to `/`

### Requirement: Guided onboarding flow
The system SHALL present first-time users with a three-step onboarding flow after sign-up: (1) app introduction, (2) STEPP reflection loop value proposition, (3) Tone Mode selection. Users MAY skip the Tone Mode selection step, defaulting to `calm`.

#### Scenario: First-time user completes onboarding
- **WHEN** a new user progresses through all three onboarding steps and taps "Get Started"
- **THEN** `activeToneMode` is set in the `tone-engine` store, `hasCompletedOnboarding` is saved to Supabase user metadata, and the user is redirected to `/`

#### Scenario: User skips Tone Mode selection
- **WHEN** a user taps "Skip" on the Tone Mode picker step
- **THEN** `activeToneMode` remains `calm`, onboarding is marked complete, and the user is redirected to `/`

#### Scenario: Returning user bypasses onboarding
- **WHEN** a signed-in user with `hasCompletedOnboarding: true` navigates to `/onboarding`
- **THEN** the middleware redirects them to `/`

### Requirement: Tone-aware onboarding copy
All user-facing strings in the onboarding flow SHALL be resolved from the active `ToneMode` via the copy helpers in `lib/auth-onboarding/copy.ts`. Before the user selects a Tone Mode, copy SHALL default to `calm`.

#### Scenario: Copy before mode selection
- **WHEN** the onboarding flow renders steps 1 and 2 (before mode is chosen)
- **THEN** all strings are rendered in the `calm` tone variant with no exclamation marks

#### Scenario: Copy after mode selection
- **WHEN** the user selects `high-impact` on step 3 and proceeds
- **THEN** subsequent UI (including the confirmation message before redirect) renders in the `high-impact` tone variant

### Requirement: Zustand auth slice
The system SHALL expose a `store/auth.ts` Zustand slice containing `{ user, session, isLoading }` that is hydrated from the active Supabase session. Other capabilities SHALL read the current user's ID from this slice without calling Supabase directly.

#### Scenario: Session available on load
- **WHEN** the app mounts with a valid Supabase session in cookies
- **THEN** `store/auth.ts` resolves `user` and `session` within the initial render cycle and `isLoading` transitions to `false`

#### Scenario: No session on load
- **WHEN** the app mounts with no active session
- **THEN** `store/auth.ts` sets `user: null`, `session: null`, `isLoading: false`, and middleware handles the redirect

### Requirement: Sign-out
The system SHALL provide a sign-out action that clears the Supabase session and redirects the user to `/auth/sign-in`.

#### Scenario: User signs out
- **WHEN** a user triggers the sign-out action
- **THEN** the Supabase session is invalidated, the auth Zustand slice is reset, and the user is redirected to `/auth/sign-in`
