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
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`/api/agents/${agentId}/messages?t=${Date.now()}`, {
        headers,
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    enabled: !!agentId,
    staleTime: 0, // Данные сразу считаются устаревшими
    gcTime: 0, // Не кэшируем данные в памяти
    refetchOnMount: 'always', // Всегда перезапрашиваем при монтировании
    refetchOnWindowFocus: true, // Обновляем при фокусе окна
    refetchInterval: 30000 // Автоматически обновляем каждые 30 секунд
  })
}
