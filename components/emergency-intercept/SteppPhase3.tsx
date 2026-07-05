'use client'

import { useEmergencyInterceptStore } from '@/store/emergency-intercept'
import { useWizardCopy } from '@/lib/emergency-intercept/use-wizard-copy'

interface Props {
  onSubmit: () => void
  onBack: () => void
}

export function SteppPhase3({ onSubmit, onBack }: Props) {
  const copy = useWizardCopy()
  const phase3Answers = useEmergencyInterceptStore((s) => s.phase3Answers)
  const setPhase3Answers = useEmergencyInterceptStore((s) => s.setPhase3Answers)

  function toggle(value: string) {
    setPhase3Answers(
      phase3Answers.includes(value)
        ? phase3Answers.filter((v) => v !== value)
        : [...phase3Answers, value]
    )
  }

  return (
    <div className="flex flex-col flex-1 px-6 py-8 gap-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">{copy.phase3.heading}</h1>
        <p className="text-sm text-gray-500">{copy.phase3.subheading}</p>
      </div>

      <ul className="flex flex-col gap-2" role="group" aria-label={copy.phase3.heading}>
        {copy.phase3.options.map((opt) => {
          const checked = phase3Answers.includes(opt.value)
          return (
            <li key={opt.value}>
              <button
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggle(opt.value)}
                className={`
                  w-full text-left px-5 py-3 rounded-xl border-2 font-medium text-sm
                  flex items-center gap-3 transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
                  ${
                    checked
                      ? opt.isCoping
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-orange-500 bg-orange-50 text-orange-800'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                  }
                `}
              >
                <span
                  aria-hidden="true"
                  className={`
                    w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center text-xs
                    ${
                      checked
                        ? opt.isCoping
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-orange-500 bg-orange-500 text-white'
                        : 'border-gray-400'
                    }
                  `}
                >
                  {checked ? '✓' : ''}
                </span>
                {opt.label}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="mt-auto flex gap-3">
        <button
          onClick={onBack}
          className="
            flex-1 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-bold text-base
            hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
            transition-colors duration-150
          "
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="
            flex-1 py-4 rounded-2xl bg-red-700 text-white font-bold text-base
            hover:bg-red-800 active:bg-red-900
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
            transition-colors duration-150
          "
        >
          {copy.phase3.submitLabel}
        </button>
      </div>
    </div>
  )
}
