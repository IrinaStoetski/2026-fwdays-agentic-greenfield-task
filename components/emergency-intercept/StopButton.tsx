'use client'

import { useEmergencyInterceptStore } from '@/store/emergency-intercept'

// Fixed high-contrast red STOP button anchored to the bottom of every viewport.
// Background: #B91C1C (red-700) on white text yields a contrast ratio of ~5.9:1 — WCAG AA pass.
export function StopButton() {
  const openModal = useEmergencyInterceptStore((s) => s.openModal)

  return (
    <button
      onClick={openModal}
      aria-label="Emergency stop — open reflection wizard"
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        bg-red-700 hover:bg-red-800 active:bg-red-900
        text-white font-bold text-xl tracking-widest
        px-10 py-4 rounded-full shadow-xl
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-400
      "
    >
      STOP
    </button>
  )
}
