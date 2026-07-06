'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuthOnboardingCopy } from '@/lib/auth-onboarding/use-auth-onboarding-copy'

export default function SignUpPage() {
  const router = useRouter()
  const copy = useAuthOnboardingCopy()
  const c = copy.signUp
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError(c.errorPasswordTooShort)
      return
    }

    setPending(true)
    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({ email, password })

      if (authError) {
        if (authError.message.toLowerCase().includes('already registered') ||
            authError.message.toLowerCase().includes('already exists')) {
          setError(c.errorEmailTaken)
        } else {
          setError(c.errorGeneric)
        }
        return
      }

      router.push('/onboarding')
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
          autoComplete="new-password"
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
        <Link href="/auth/sign-in" className="text-ds-accent underline">{c.switchLinkLabel}</Link>
      </p>
    </form>
  )
}
