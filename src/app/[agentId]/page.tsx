'use client'

import { Messages } from '@/components/message-area/messages'
import { MessageComposer } from '@/components/message-area/message-composer'
import { useAgentDetails } from '@/components/ui/agent-details'
import { AgentDetailDisplay } from '@/components/agent-details/agent-details-display'
import { useIsMobile } from '@/components/hooks/use-mobile'
import { useChat } from '@ai-sdk/react'
import { useAgentMessages } from '@/components/hooks/use-agent-messages'
import { useAgentIdParam } from '@/components/hooks/use-agentId-param'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { useEffect } from 'react'
import { FloatingParticles } from '@/components/ui/floating-particles'
import { useQueryClient } from '@tanstack/react-query'
import { getAgentMessagesQueryKey } from '@/components/hooks/use-agent-messages'

export default function Home() {
  const agentId = useAgentIdParam()
  const queryClient = useQueryClient()

  const { isOpen } = useAgentDetails()
  const isMobile = useIsMobile()

  if (!agentId) {
    return null
  }

  const {
    data: agentMessages,
    isLoading: agentMessagesIsLoading,
    error: agentMessagesError
  } = useAgentMessages(agentId)

  // Show toast when agent messages fail to load
  useEffect(() => {
    if (agentMessagesError) {
      toast.error(
        'Failed to load agent messages. Please check your Letta server connection.'
      )
    }
  }, [agentMessagesError])

  const { messages, input, handleInputChange, handleSubmit, status, append } =
    useChat({
      body: {
        agentId: agentId
      },
      api: `/api/agents/${agentId}/messages`,
      initialMessages: agentMessages,
      streamProtocol: 'data',
      onError: (error) => {
        console.error('error', error)
        toast.error(
          'Unable to send message. Please double check your environment setup.'
        )
      },
      onFinish: () => {
        // Обновляем кэш сообщений после успешной отправки
        queryClient.invalidateQueries({ 
          queryKey: getAgentMessagesQueryKey(agentId)
        })
        toast.success('Message sent successfully!')
      }
    })

  return (
    <div className='flex flex-row flex-1 h-0'>
      <FloatingParticles 
        particleCount={60}
        colors={['#7877c6', '#ff77c6', '#77c6ff', '#c677ff', '#77ffc6']}
      />
      {!isMobile || (isMobile && !isOpen) ? (
        <div className='relative flex flex-col flex-1 h-full min-w-0 gap-5 overflow-hidden pt-4'>
          {/* Enhanced Abstract background - fixed positioning */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 animate-float">
              <div className="w-[600px] h-[300px] bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent blur-3xl opacity-70 animate-pulse-glow"></div>
            </div>
            <div className="absolute top-3/4 right-1/4 animate-float" style={{animationDelay: '2s'}}>
              <div className="w-[400px] h-[200px] bg-gradient-to-br from-pink-900/15 via-purple-900/8 to-transparent blur-3xl opacity-60 animate-pulse-glow"></div>
            </div>
            <div className="absolute top-1/2 left-3/4 animate-float" style={{animationDelay: '4s'}}>
              <div className="w-[300px] h-[150px] bg-gradient-to-br from-blue-900/20 via-cyan-900/10 to-transparent blur-3xl opacity-50 animate-pulse-glow"></div>
            </div>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.05)_1px,_transparent_0)] bg-[length:50px_50px] opacity-30"></div>
          </div>
          
          <Messages messages={messages} status={status} append={append} />
          {!agentMessagesIsLoading && (
            <div className='relative flex flex-col'>
              <div className='absolute left-1/2 transform -translate-x-1/2 z-50'>
                <Toaster position='bottom-center' expand={true} />
              </div>
              <MessageComposer
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                input={input}
                status={status}
              />
            </div>
          )}
        </div>
      ) : null}
      <AgentDetailDisplay />
    </div>
  )
}
