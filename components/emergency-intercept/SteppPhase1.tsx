'use client'

import { useEmergencyInterceptStore, type Emotion } from '@/store/emergency-intercept'
import { useWizardCopy } from '@/lib/emergency-intercept/use-wizard-copy'

interface Props {
  onNext: () => void
}

export function SteppPhase1({ onNext }: Props) {
  const copy = useWizardCopy()
  const phase1Answer = useEmergencyInterceptStore((s) => s.phase1Answer)
  const setPhase1Answer = useEmergencyInterceptStore((s) => s.setPhase1Answer)

  return (
    <div className="flex flex-col flex-1 px-6 py-8 gap-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">{copy.phase1.heading}</h1>
        <p className="text-sm text-gray-500">{copy.phase1.subheading}</p>
      </div>

      <ul className="flex flex-col gap-3" role="radiogroup" aria-label={copy.phase1.heading}>
        {copy.phase1.options.map((opt) => {
          const selected = phase1Answer === opt.value
          return (
            <li key={opt.value}>
              <button
                role="radio"
                aria-checked={selected}
                onClick={() => setPhase1Answer(opt.value as Emotion)}
                className={`
                  w-full text-left px-5 py-4 rounded-2xl border-2 font-medium text-base
                  transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
                  ${
                    selected
                      ? 'border-red-600 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                  }
                `}
              >
                {opt.label}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-auto">
        <button
          onClick={onNext}
          disabled={!phase1Answer}
          aria-disabled={!phase1Answer}
          className="
            w-full py-4 rounded-2xl bg-red-700 text-white font-bold text-base
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-red-800 active:bg-red-900
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
            transition-colors duration-150
          "
        >
          {copy.phase1.nextLabel}
        </button>
      </div>
    </div>
  )
}
