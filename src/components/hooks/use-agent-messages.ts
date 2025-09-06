import { useQuery } from '@tanstack/react-query'

export const getAgentMessagesQueryKey = (agentId: string) => [
  'agentMessages',
  agentId
]

export function useAgentMessages(agentId: string) {
  return useQuery({
    queryKey: getAgentMessagesQueryKey(agentId),
    queryFn: async () => {
      const token = localStorage.getItem('letta_access_token')
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`/api/agents/${agentId}/messages`, {
        headers
      })
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    enabled: !!agentId
  })
}
