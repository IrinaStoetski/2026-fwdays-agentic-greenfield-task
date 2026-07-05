'use client'

import { useEmergencyInterceptStore } from '@/store/emergency-intercept'
import { useWizardCopy } from '@/lib/emergency-intercept/use-wizard-copy'
import { FALLBACK_STORIES } from '@/lib/emergency-intercept/fallback-stories'
import { WIZARD_COPY } from '@/lib/emergency-intercept/copy'

interface Story {
  id: string
  text: string
  attribution?: string
}

// progress-logging store is not yet built — use this accessor once it ships.
// For now, a zero-story stub is used so the fallback path always fires in MVP.
function useUserStories(): Story[] {
  try {
    const useProgressStore = require('@/store/progress-logging')?.useProgressStore
    return useProgressStore?.((s: { stories: Story[] }) => s.stories) ?? []
  } catch {
    return []
  }
}

function pickStory(userStories: Story[]): Story {
  const pool = userStories.length > 0 ? userStories : FALLBACK_STORIES
  // Deterministic: pick by current day-of-month index so it "rotates" daily.
  const idx = new Date().getDate() % pool.length
  return pool[idx]
}

interface Props {
  onDone: () => void
}

export function GroundingSummary({ onDone }: Props) {
  const copy = useWizardCopy()
  const phase1Answer = useEmergencyInterceptStore((s) => s.phase1Answer)
  const userStories = useUserStories()
  const story = pickStory(userStories)

  // Build a brief emotion label for the inline summary
  const emotionLabel = phase1Answer
    ? WIZARD_COPY.calm.phase1.options.find((o) => o.value === phase1Answer)?.label ?? ''
    : ''

  return (
    <div className="flex flex-col flex-1 px-6 py-8 gap-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">{copy.summary.heading}</h1>
        <p className="text-base text-gray-600">{copy.summary.subheading}</p>
        {emotionLabel && (
          <p className="text-sm text-gray-400">
            You identified feeling: <span className="font-semibold text-gray-600">{emotionLabel}</span>
          </p>
        )}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          {copy.summary.storySectionLabel}
        </p>
        <p className="text-sm text-gray-700 leading-relaxed italic">"{story.text}"</p>
        {story.attribution && (
          <p className="text-xs text-gray-400 mt-2">— {story.attribution}</p>
        )}
      </div>

      <div className="mt-auto">
        <button
          onClick={onDone}
          className="
            w-full py-4 rounded-2xl bg-red-700 text-white font-bold text-base
            hover:bg-red-800 active:bg-red-900
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
            transition-colors duration-150
          "
        >
          {copy.summary.doneLabel}
        </button>
      </div>
    </div>
  )
}
