'use client'

import { useToneEngineStore } from '@/store/tone-engine'
import { AUTH_ONBOARDING_COPY, type AuthOnboardingCopy } from './copy'

export function useAuthOnboardingCopy(): AuthOnboardingCopy {
  const mode = useToneEngineStore((s) => s.activeToneMode) ?? 'calm'
  return AUTH_ONBOARDING_COPY[mode]
}
