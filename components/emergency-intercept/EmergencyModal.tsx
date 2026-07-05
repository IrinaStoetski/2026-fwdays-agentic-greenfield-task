'use client'

import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useEmergencyInterceptStore } from '@/store/emergency-intercept'
import { useExitGuard } from '@/lib/emergency-intercept/use-exit-guard'
import { useWizardCopy } from '@/lib/emergency-intercept/use-wizard-copy'

// Code-split — modal shell mounts synchronously; wizard content loads lazily.
const SteppWizard = lazy(() =>
  import('./SteppWizard').then((m) => ({ default: m.SteppWizard }))
)

export function EmergencyModal() {
  const isOpen = useEmergencyInterceptStore((s) => s.isEmergencyModalOpen)
  const closeModal = useEmergencyInterceptStore((s) => s.closeModal)
  const { isWizardInProgress } = useExitGuard()
  const copy = useWizardCopy()
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // Focus trap: cycle Tab within modal when open
  useEffect(() => {
    if (!isOpen) return

    firstFocusableRef.current?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleCloseRequest()
        return
      }
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'))

      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isWizardInProgress])

  // Mark background inert when modal is open.
  // Target #main-content only — setting inert on body would make the modal itself inert too.
  useEffect(() => {
    const main = document.getElementById('main-content')
    if (!main) return
    if (isOpen) {
      main.setAttribute('inert', '')
    } else {
      main.removeAttribute('inert')
    }
  }, [isOpen])

  function handleCloseRequest() {
    if (isWizardInProgress) {
      setShowExitConfirm(true)
    } else {
      closeModal()
    }
  }

  function handleConfirmExit() {
    setShowExitConfirm(false)
    closeModal()
  }

  function handleCancelExit() {
    setShowExitConfirm(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={copy.modalTitle}
      ref={modalRef}
      // Pre-mounted; visibility toggled via CSS — not conditional render (D2)
      style={{
        display: isOpen ? 'flex' : 'none',
        // iOS Safari 100dvh fallback
        height: '100dvh',
      }}
      className="
        fixed inset-0 z-[100]
        flex-col bg-white overflow-y-auto
      "
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-200">
        <span className="text-sm font-semibold text-red-700 uppercase tracking-widest">
          {copy.modalTitle}
        </span>
        <button
          ref={firstFocusableRef}
          onClick={handleCloseRequest}
          aria-label="Close reflection wizard"
          className="
            p-2 rounded-full text-gray-500 hover:text-gray-800
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
          "
        >
          ✕
        </button>
      </div>

      {/* Wizard content — lazy-loaded after first open */}
      <div className="flex-1 flex flex-col">
        <Suspense fallback={null}>
          <SteppWizard />
        </Suspense>
      </div>

      {/* Inline exit confirmation overlay */}
      {showExitConfirm && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="exit-heading"
          className="
            absolute inset-0 z-10 flex items-center justify-center
            bg-black/60 px-6
          "
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 id="exit-heading" className="text-lg font-bold text-gray-900 mb-2">
              {copy.exitConfirm.heading}
            </h2>
            <p className="text-sm text-gray-600 mb-6">{copy.exitConfirm.body}</p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmExit}
                className="
                  flex-1 py-3 rounded-xl bg-red-700 text-white font-semibold text-sm
                  hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400
                "
              >
                {copy.exitConfirm.confirmLabel}
              </button>
              <button
                onClick={handleCancelExit}
                className="
                  flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm
                  hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
                "
              >
                {copy.exitConfirm.cancelLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
