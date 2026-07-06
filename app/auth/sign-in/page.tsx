'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuthOnboardingCopy } from '@/lib/auth-onboarding/use-auth-onboarding-copy'

export default function SignInPage() {
  const router = useRouter()
  const copy = useAuthOnboardingCopy()
  const c = copy.signIn
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)

    try {
      const supabase = createClient()
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

      if (authError) {
        setError(c.errorInvalidCredentials)
        return
      }

      const hasCompletedOnboarding = data.user?.user_metadata?.hasCompletedOnboarding
      router.push(hasCompletedOnboarding ? '/' : '/onboarding')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-[22px] font-semibold text-ds-text-primary">{c.heading}</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-[14px] text-ds-text-secondary">{c.emailLabel}</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-ds-border rounded-lg px-3 py-3 text-[16px] bg-ds-surface text-ds-text-primary focus:outline-none focus:ring-2 focus:ring-ds-accent min-h-[44px]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-[14px] text-ds-text-secondary">{c.passwordLabel}</label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-ds-border rounded-lg px-3 py-3 text-[16px] bg-ds-surface text-ds-text-primary focus:outline-none focus:ring-2 focus:ring-ds-accent min-h-[44px]"
        />
      </div>

      {error && (
        <p role="alert" className="text-[14px] text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-ds-accent text-white font-semibold rounded-lg py-3 min-h-[44px] disabled:opacity-60"
      >
        {pending ? '…' : c.submitLabel}
      </button>

      <p className="text-[14px] text-ds-text-secondary text-center">
        {c.switchLabel}{' '}
        <Link href="/auth/sign-up" className="text-ds-accent underline">{c.switchLinkLabel}</Link>
      </p>
    </form>
  )
}
