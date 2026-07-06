'use client'

import { useState } from 'react'
import type { ToneMode } from '@/lib/emergency-intercept/copy'
import { useAuthOnboardingCopy } from '@/lib/auth-onboarding/use-auth-onboarding-copy'

interface Props {
  onComplete: (selectedMode: ToneMode | null) => void
}

export function OnboardingTonePicker({ onComplete }: Props) {
  const { onboarding: { tonePicker } } = useAuthOnboardingCopy()
  const [selected, setSelected] = useState<ToneMode | null>(null)

  const modes: ToneMode[] = ['calm', 'rational', 'auntie']

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-[26px] font-bold text-ds-text-primary">{tonePicker.heading}</h2>
        <p className="text-[14px] text-ds-text-secondary mt-2">{tonePicker.body}</p>
      </div>

      <div className="flex flex-col gap-3">
        {modes.map((mode) => {
          const info = tonePicker.modes[mode]
          const isSelected = selected === mode
          return (
            <button
              key={mode}
              onClick={() => setSelected(mode)}
              className={[
                'flex flex-col items-start gap-1 rounded-xl px-4 py-4 min-h-[44px] border-2 text-left transition-colors',
                isSelected
                  ? 'border-ds-accent bg-ds-accent/10'
                  : 'border-ds-border bg-ds-surface',
              ].join(' ')}
            >
              <span className="font-semibold text-ds-text-primary">{info.name}</span>
              <span className="text-[13px] text-ds-text-secondary">{info.description}</span>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onComplete(selected)}
        className="bg-ds-accent text-white font-semibold rounded-xl py-4 min-h-[44px] w-full"
      >
        {tonePicker.getStartedLabel}
      </button>

      <button
        onClick={() => onComplete(null)}
        className="text-ds-text-secondary text-[14px] underline"
      >
        {tonePicker.skipLabel}
      </button>
    </div>
  )
}
