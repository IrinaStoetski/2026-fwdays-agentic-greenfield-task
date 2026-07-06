import { describe, it, expect, beforeEach } from 'vitest'
import type { Session, User } from '@supabase/supabase-js'
import { useAuthStore } from '../../store/auth'

const mockUser = { id: 'user-123', email: 'test@example.com' } as User
const mockSession = { access_token: 'tok', user: mockUser } as Session

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, session: null, isLoading: true })
  })

  it('starts with null user and session and isLoading true', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.session).toBeNull()
    expect(state.isLoading).toBe(true)
  })

  it('setAuth updates user, session, and sets isLoading false', () => {
    useAuthStore.getState().setAuth(mockUser, mockSession)
    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.session).toEqual(mockSession)
    expect(state.isLoading).toBe(false)
  })

  it('clearAuth resets user and session to null and sets isLoading false', () => {
    useAuthStore.getState().setAuth(mockUser, mockSession)
    useAuthStore.getState().clearAuth()
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.session).toBeNull()
    expect(state.isLoading).toBe(false)
  })

  it('setAuth with null user/session keeps isLoading false', () => {
    useAuthStore.getState().setAuth(null, null)
    expect(useAuthStore.getState().isLoading).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
  })
})
