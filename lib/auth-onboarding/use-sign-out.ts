'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/auth'

export function useSignOut() {
  const router = useRouter()
  const clearAuth = useAuthStore((s) => s.clearAuth)

  return async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    clearAuth()
    router.push('/auth/sign-in')
  }
}
