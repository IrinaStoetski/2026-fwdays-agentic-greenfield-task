import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('../../lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      updateUser: vi.fn().mockResolvedValue({}),
    },
  }),
}))

vi.mock('../../store/tone-engine', () => ({
  useToneEngineStore: vi.fn(),
}))

vi.mock('../../lib/auth-onboarding/use-auth-onboarding-copy', () => ({
  useAuthOnboardingCopy: () => ({
    onboarding: {
      intro: { heading: 'Welcome', body: 'Body text', ctaLabel: 'Continue' },
      steppValue: { heading: 'STEPP', body: 'Body text', ctaLabel: 'Continue' },
      tonePicker: {
        heading: 'Pick tone',
        body: 'Subtitle',
        getStartedLabel: 'Get started',
        skipLabel: 'Skip',
        modes: {
          calm: { name: 'Zen', description: 'Calm desc' },
          rational: { name: 'Blueprint', description: 'Rational desc' },
          auntie: { name: 'Auntie', description: 'Auntie desc' },
        },
      },
    },
  }),
}))

import { useToneEngineStore } from '../../store/tone-engine'
import { OnboardingIntro } from '../../components/auth-onboarding/OnboardingIntro'
import { OnboardingSteppValue } from '../../components/auth-onboarding/OnboardingSteppValue'
import { OnboardingTonePicker } from '../../components/auth-onboarding/OnboardingTonePicker'

const mockStore = useToneEngineStore as unknown as ReturnType<typeof vi.fn>

describe('OnboardingIntro', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders heading and calls onNext when button is clicked', () => {
    const onNext = vi.fn()
    render(React.createElement(OnboardingIntro, { onNext }))
    expect(screen.getByText('Welcome')).toBeTruthy()
    fireEvent.click(screen.getByText('Continue'))
    expect(onNext).toHaveBeenCalledOnce()
  })
})

describe('OnboardingSteppValue', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders heading and calls onNext when button is clicked', () => {
    const onNext = vi.fn()
    render(React.createElement(OnboardingSteppValue, { onNext }))
    expect(screen.getByText('STEPP')).toBeTruthy()
    fireEvent.click(screen.getByText('Continue'))
    expect(onNext).toHaveBeenCalledOnce()
  })
})

describe('OnboardingTonePicker', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders all three mode cards', () => {
    render(React.createElement(OnboardingTonePicker, { onComplete: vi.fn() }))
    expect(screen.getByText('Zen')).toBeTruthy()
    expect(screen.getByText('Blueprint')).toBeTruthy()
    expect(screen.getByText('Auntie')).toBeTruthy()
  })

  it('calls onComplete with null when Skip is clicked', () => {
    const onComplete = vi.fn()
    render(React.createElement(OnboardingTonePicker, { onComplete }))
    fireEvent.click(screen.getByText('Skip'))
    expect(onComplete).toHaveBeenCalledWith(null)
  })

  it('calls onComplete with selected mode when Get Started is clicked', () => {
    const onComplete = vi.fn()
    render(React.createElement(OnboardingTonePicker, { onComplete }))
    fireEvent.click(screen.getByText('Zen'))
    fireEvent.click(screen.getByText('Get started'))
    expect(onComplete).toHaveBeenCalledWith('calm')
  })

  it('calls onComplete with null when no mode selected and Get Started clicked', () => {
    const onComplete = vi.fn()
    render(React.createElement(OnboardingTonePicker, { onComplete }))
    fireEvent.click(screen.getByText('Get started'))
    expect(onComplete).toHaveBeenCalledWith(null)
  })
})
