import { describe, it, expect } from 'vitest'
import { AUTH_ONBOARDING_COPY } from '../../lib/auth-onboarding/copy'

describe('AUTH_ONBOARDING_COPY', () => {
  it('returns copy for all three tone modes', () => {
    expect(AUTH_ONBOARDING_COPY.calm).toBeDefined()
    expect(AUTH_ONBOARDING_COPY.rational).toBeDefined()
    expect(AUTH_ONBOARDING_COPY.auntie).toBeDefined()
  })

  it('calm copy contains no exclamation marks (BC-BRAND-01)', () => {
    const allText = JSON.stringify(AUTH_ONBOARDING_COPY.calm)
    expect(allText).not.toContain('!')
  })

  it('auntie copy contains at least one exclamation mark (BC-BRAND-01)', () => {
    const allText = JSON.stringify(AUTH_ONBOARDING_COPY.auntie)
    expect(allText).toContain('!')
  })

  it('all modes provide required sign-in keys', () => {
    for (const mode of ['calm', 'rational', 'auntie'] as const) {
      const c = AUTH_ONBOARDING_COPY[mode].signIn
      expect(c.heading).toBeTruthy()
      expect(c.errorInvalidCredentials).toBeTruthy()
      expect(c.errorGeneric).toBeTruthy()
    }
  })

  it('all modes provide required sign-up keys', () => {
    for (const mode of ['calm', 'rational', 'auntie'] as const) {
      const c = AUTH_ONBOARDING_COPY[mode].signUp
      expect(c.heading).toBeTruthy()
      expect(c.errorEmailTaken).toBeTruthy()
      expect(c.errorPasswordTooShort).toBeTruthy()
    }
  })

  it('all modes provide required onboarding step copy', () => {
    for (const mode of ['calm', 'rational', 'auntie'] as const) {
      const { intro, steppValue, tonePicker } = AUTH_ONBOARDING_COPY[mode].onboarding
      expect(intro.heading).toBeTruthy()
      expect(intro.ctaLabel).toBeTruthy()
      expect(steppValue.heading).toBeTruthy()
      expect(tonePicker.getStartedLabel).toBeTruthy()
      expect(tonePicker.skipLabel).toBeTruthy()
    }
  })

  it('tone picker provides copy for all three modes', () => {
    for (const mode of ['calm', 'rational', 'auntie'] as const) {
      const { modes } = AUTH_ONBOARDING_COPY[mode].onboarding.tonePicker
      expect(modes.calm.name).toBeTruthy()
      expect(modes.rational.name).toBeTruthy()
      expect(modes.auntie.name).toBeTruthy()
    }
  })
})
