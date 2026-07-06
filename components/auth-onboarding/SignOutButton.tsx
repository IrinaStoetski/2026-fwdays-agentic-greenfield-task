'use client'

import { useSignOut } from '@/lib/auth-onboarding/use-sign-out'

export function SignOutButton() {
  const signOut = useSignOut()

  return (
    <button
      onClick={signOut}
      className="text-[13px] text-ds-text-secondary underline min-h-[44px] px-2"
    >
      Sign out
    </button>
  )
}
