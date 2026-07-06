'use client'

import { useAuthOnboardingCopy } from '@/lib/auth-onboarding/use-auth-onboarding-copy'

interface Props {
  onNext: () => void
}

export function OnboardingIntro({ onNext }: Props) {
  const { onboarding: { intro } } = useAuthOnboardingCopy()

  return (
    <div className="flex flex-col gap-6 text-center">
      <h2 className="text-[26px] font-bold text-ds-text-primary">{intro.heading}</h2>
      <p className="text-[16px] text-ds-text-secondary leading-relaxed">{intro.body}</p>
      <button
        onClick={onNext}
        className="bg-ds-accent text-white font-semibold rounded-xl py-4 min-h-[44px] w-full"
      >
        {intro.ctaLabel}
      </button>
    </div>
  )
}
