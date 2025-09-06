'use client'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'

export const USE_AGENTS_KEY = ['agents']

export function useAgents() {
  const { user, isAuthenticated } = useAuth()

  return useQuery({
    queryKey: USE_AGENTS_KEY,
    retry: 0,
    enabled: isAuthenticated && !!user?.letta_agent_id,
    queryFn: async () => {
      // For the new system, we return the user's personal agent
      if (user?.letta_agent_id) {
        return [{
          id: user.letta_agent_id,
          name: `${user.name}'s Personal Agent`,
          updatedAt: new Date().toISOString()
        }]
      }

      // Fallback to original API for development/legacy mode
      const token = localStorage.getItem('letta_access_token')
      const headers: HeadersInit = {}
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch('/api/agents', { headers })
      if (!response.ok) {
        throw new Error('Failed to fetch agents')
      }
      return response.json()
    }
  })
}
