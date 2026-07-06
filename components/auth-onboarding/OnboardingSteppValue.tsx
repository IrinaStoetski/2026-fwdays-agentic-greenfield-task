'use client'

import { useAuthOnboardingCopy } from '@/lib/auth-onboarding/use-auth-onboarding-copy'

interface Props {
  onNext: () => void
}

export function OnboardingSteppValue({ onNext }: Props) {
  const { onboarding: { steppValue } } = useAuthOnboardingCopy()

  return (
    <div className="flex flex-col gap-6 text-center">
      <h2 className="text-[26px] font-bold text-ds-text-primary">{steppValue.heading}</h2>
      <p className="text-[16px] text-ds-text-secondary leading-relaxed">{steppValue.body}</p>
      <button
        onClick={onNext}
        className="bg-ds-accent text-white font-semibold rounded-xl py-4 min-h-[44px] w-full"
      >
        {steppValue.ctaLabel}
      </button>
    </div>
  )
}
