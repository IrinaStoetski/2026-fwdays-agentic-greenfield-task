'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/auth'

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth } = useAuthStore()

  useEffect(() => {
    if (!supabaseConfigured) {
      setAuth(null, null)
      return
    }

    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session?.user ?? null, session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session?.user ?? null, session)
    })

    return () => subscription.unsubscribe()
  }, [setAuth])

  return <>{children}</>
}
