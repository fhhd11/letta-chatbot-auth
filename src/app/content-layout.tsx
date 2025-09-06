'use client'

import { ChatHeader } from '@/components/chat-header'
import { useAgents } from '@/components/hooks/use-agents'
import { SidebarArea } from '@/components/sidebar-area/sidebar-area'
import { useEffect } from 'react'
import { useAgentContext } from './[agentId]/context/agent-context'
import { useAuth } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'

export default function ContentLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const pathname = usePathname()
  const { data } = useAgents()
  const { agentId, setAgentId } = useAgentContext()

  // For authenticated users in chat, set the agent ID to their personal agent
  const { user } = useAuth()
  useEffect(() => {
    if (isAuthenticated && user?.letta_agent_id && !agentId && pathname === '/chat') {
      setAgentId(user.letta_agent_id)
    } else if (data?.[0]?.id && !agentId && isAuthenticated) {
      // Fallback to first agent if available
      setAgentId(data[0].id)
    }
  }, [data, agentId, isAuthenticated, user, pathname, setAgentId])

  // For login/register pages, render without sidebar
  const isAuthPage = pathname === '/login' || pathname === '/register'
  
  if (isAuthPage || !isAuthenticated) {
    return <>{children}</>
  }

  return (
    <>
      <main className='relative flex h-dvh w-dvw flex-col overflow-hidden'>
        <div className='flex border-b border-border p-2.5 gap-3 w-full'>
          <ChatHeader />
        </div>
        {children}
      </main>
    </>
  )
}
