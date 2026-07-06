import type { ToneMode } from '@/lib/emergency-intercept/copy'

export interface AuthOnboardingCopy {
  signIn: {
    heading: string
    emailLabel: string
    passwordLabel: string
    submitLabel: string
    switchLabel: string
    switchLinkLabel: string
    errorInvalidCredentials: string
    errorGeneric: string
  }
  signUp: {
    heading: string
    emailLabel: string
    passwordLabel: string
    submitLabel: string
    switchLabel: string
    switchLinkLabel: string
    errorEmailTaken: string
    errorPasswordTooShort: string
    errorGeneric: string
  }
  onboarding: {
    intro: {
      heading: string
      body: string
      ctaLabel: string
    }
    steppValue: {
      heading: string
      body: string
      ctaLabel: string
    }
    tonePicker: {
      heading: string
      body: string
      getStartedLabel: string
      skipLabel: string
      modes: {
        calm: { name: string; description: string }
        rational: { name: string; description: string }
        auntie: { name: string; description: string }
      }
    }
  }
}

// ── Calm (Zen Sanctuary) — no exclamation marks ──────────────────────────────
const calm: AuthOnboardingCopy = {
  signIn: {
    heading: 'Welcome back',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    submitLabel: 'Sign in',
    switchLabel: 'New here',
    switchLinkLabel: 'Create an account',
    errorInvalidCredentials: 'Your email or password does not match our records. Please try again.',
    errorGeneric: 'Something went wrong. Please try again in a moment.',
  },
  signUp: {
    heading: 'Create your account',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    submitLabel: 'Get started',
    switchLabel: 'Already have an account',
    switchLinkLabel: 'Sign in',
    errorEmailTaken: 'An account with this email already exists. Try signing in instead.',
    errorPasswordTooShort: 'Your password needs to be at least 8 characters.',
    errorGeneric: 'Something went wrong. Please try again in a moment.',
  },
  onboarding: {
    intro: {
      heading: 'Welcome to Bye Binge',
      body: 'This is a quiet space for you. When a binge urge feels overwhelming, this app helps you pause, reflect, and find your way through — gently and without judgement.',
      ctaLabel: 'Continue',
    },
    steppValue: {
      heading: 'The STEPP reflection',
      body: 'When you press STOP, you walk through a short guided reflection — Situation, Thought, Emotion, Physical sensations, Performance. Each step builds self-awareness, one breath at a time.',
      ctaLabel: 'Continue',
    },
    tonePicker: {
      heading: 'Choose your voice',
      body: 'You can change this any time in settings.',
      getStartedLabel: 'Get started',
      skipLabel: 'Skip for now',
      modes: {
        calm: { name: 'Zen Sanctuary', description: 'Soft, warm, and non-judgmental' },
        rational: { name: 'Blueprint', description: 'Clinical, data-driven, analytical' },
        auntie: { name: 'Indian Auntie', description: 'Fierce, protective tough love' },
      },
    },
  },
}

// ── Rational (The Blueprint) ─────────────────────────────────────────────────
const rational: AuthOnboardingCopy = {
  signIn: {
    heading: 'Access your account',
    emailLabel: 'Email address',
    passwordLabel: 'Password',
    submitLabel: 'Sign in',
    switchLabel: 'No account yet',
    switchLinkLabel: 'Register',
    errorInvalidCredentials: 'Authentication failed. Verify your credentials and try again.',
    errorGeneric: 'An unexpected error occurred. Retry in a moment.',
  },
  signUp: {
    heading: 'Create an account',
    emailLabel: 'Email address',
    passwordLabel: 'Password',
    submitLabel: 'Register',
    switchLabel: 'Already registered',
    switchLinkLabel: 'Sign in',
    errorEmailTaken: 'This email is already registered. Use sign-in instead.',
    errorPasswordTooShort: 'Password must be at least 8 characters.',
    errorGeneric: 'An unexpected error occurred. Retry in a moment.',
  },
  onboarding: {
    intro: {
      heading: 'Bye Binge: System overview',
      body: 'This application functions as a behavioral interrupt and data-logging system. When a binge urge is detected, it initiates a structured reflection sequence designed to recalibrate your response pattern before the urge reaches critical threshold.',
      ctaLabel: 'Next',
    },
    steppValue: {
      heading: 'The STEPP framework',
      body: 'STEPP (Situation, Thought, Emotion, Physical, Performance) is a structured self-assessment protocol. Each completed reflection logs a behavioral data point, building an accurate map of your trigger patterns over time.',
      ctaLabel: 'Next',
    },
    tonePicker: {
      heading: 'Select communication mode',
      body: 'This setting can be changed at any time.',
      getStartedLabel: 'Confirm selection',
      skipLabel: 'Use default',
      modes: {
        calm: { name: 'Zen Sanctuary', description: 'Warm, non-judgmental framing' },
        rational: { name: 'Blueprint', description: 'Analytical, data-driven language' },
        auntie: { name: 'Indian Auntie', description: 'High-intensity direct feedback' },
      },
    },
  },
}

// ── Auntie (Indian Auntie — High-Impact) ─────────────────────────────────────
const auntie: AuthOnboardingCopy = {
  signIn: {
    heading: 'Back again! Good.',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    submitLabel: 'Sign in!',
    switchLabel: 'New here',
    switchLinkLabel: 'Make your account now!',
    errorInvalidCredentials: 'Haiyaa! That email or password is wrong! Check and try again!',
    errorGeneric: 'Something went wrong! Try again, do not give up!',
  },
  signUp: {
    heading: 'Join us right now!',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    submitLabel: 'Create my account!',
    switchLabel: 'Already have an account',
    switchLinkLabel: 'Sign in!',
    errorEmailTaken: 'Beta, this email is already taken! Sign in instead!',
    errorPasswordTooShort: 'Your password needs at least 8 characters! Make it strong!',
    errorGeneric: 'Something went wrong! Do not give up — try again!',
  },
  onboarding: {
    intro: {
      heading: 'Welcome to Bye Binge!',
      body: 'Listen to me! This app is here to protect you from yourself! When you feel that urge coming, you press STOP and we walk through it together! No running away, no hiding — we face it head on!',
      ctaLabel: 'Yes, let us do this!',
    },
    steppValue: {
      heading: 'The STEPP reflection!',
      body: 'S is Situation, T is Thought, E is Emotion, P is Physical sensations, P is Performance! Every time you finish the reflection instead of bingeing, I am so proud of you! It takes courage and I know you have it!',
      ctaLabel: 'I understand!',
    },
    tonePicker: {
      heading: 'Choose how I talk to you!',
      body: 'You can change this any time in settings!',
      getStartedLabel: 'This is my voice!',
      skipLabel: 'I will decide later',
      modes: {
        calm: { name: 'Zen Sanctuary', description: 'Soft, gentle, no pressure' },
        rational: { name: 'Blueprint', description: 'Data and logic, very serious' },
        auntie: { name: 'Indian Auntie', description: 'Tough love — my recommendation!' },
      },
    },
  },
}

export const AUTH_ONBOARDING_COPY: Record<ToneMode, AuthOnboardingCopy> = { calm, rational, auntie }
