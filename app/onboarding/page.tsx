'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingIntro } from '@/components/auth-onboarding/OnboardingIntro'
import { OnboardingSteppValue } from '@/components/auth-onboarding/OnboardingSteppValue'
import { OnboardingTonePicker } from '@/components/auth-onboarding/OnboardingTonePicker'
import { createClient } from '@/lib/supabase/client'
import { useToneEngineStore } from '@/store/tone-engine'
import type { ToneMode } from '@/lib/emergency-intercept/copy'

type Step = 'intro' | 'stepp-value' | 'tone-picker'

const STEPS: Step[] = ['intro', 'stepp-value', 'tone-picker']

export default function OnboardingPage() {
  const router = useRouter()
  const setToneMode = useToneEngineStore((s) => s.setToneMode)
  const [stepIndex, setStepIndex] = useState(0)

  function advance() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  }

  async function handleComplete(selectedMode: ToneMode | null) {
    if (selectedMode) {
      setToneMode(selectedMode)
    }

    const supabase = createClient()
    await supabase.auth.updateUser({ data: { hasCompletedOnboarding: true } })

    router.push('/')
  }

  const step = STEPS[stepIndex]

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-ds-surface px-6">
      <div className="w-full max-w-sm py-12">
        <div className="flex gap-2 justify-center mb-10">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={[
                'h-1.5 rounded-full transition-all',
                i <= stepIndex ? 'bg-ds-accent w-6' : 'bg-ds-border w-4',
              ].join(' ')}
            />
          ))}
        </div>

        {step === 'intro' && <OnboardingIntro onNext={advance} />}
        {step === 'stepp-value' && <OnboardingSteppValue onNext={advance} />}
        {step === 'tone-picker' && <OnboardingTonePicker onComplete={handleComplete} />}
      </div>
    </div>
  )
}
