'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Messages } from '@/components/message-area/messages';
import { MessageComposer } from '@/components/message-area/message-composer';
import { useAgentDetails } from '@/components/ui/agent-details';
import { AgentDetailDisplay } from '@/components/agent-details/agent-details-display';
import { useIsMobile } from '@/components/hooks/use-mobile';
import { useChat } from '@ai-sdk/react';
import { useAgentMessages } from '@/components/hooks/use-agent-messages';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export default function ChatPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { isOpen } = useAgentDetails();
  const isMobile = useIsMobile();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated || !user) {
    return null;
  }

  const agentId = user.letta_agent_id;

  if (!agentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Agent Not Ready</h2>
          <p className="text-muted-foreground">Your personal agent is being set up. Please try again in a moment.</p>
        </div>
      </div>
    );
  }

  const {
    data: agentMessages,
    isLoading: agentMessagesIsLoading,
    error: agentMessagesError
  } = useAgentMessages(agentId);

  // Show toast when agent messages fail to load
  useEffect(() => {
    if (agentMessagesError) {
      toast.error(
        'Не удалось загрузить сообщения агента. Пожалуйста, проверьте подключение к серверу.'
      );
    }
  }, [agentMessagesError]);

  const { messages, input, handleInputChange, handleSubmit, status, append } =
    useChat({
      body: {
        agentId: agentId
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('letta_access_token') || ''}`
      },
      api: `/api/agents/${agentId}/messages`,
      initialMessages: agentMessages,
      streamProtocol: 'data',
      onError: (error) => {
        console.error('error', error);
        toast.error(
          'Unable to send message. Please double check your environment setup.'
        );
      },
      onFinish: () => {
        toast.success('Message sent successfully!');
      }
    });

  return (
    <div className='flex flex-row flex-1 h-0'>
      {!isMobile || (isMobile && !isOpen) ? (
        <div className='relative flex flex-col flex-1 h-full min-w-0 gap-5 overflow-hidden bg-background pt-4'>
          <Messages messages={messages} status={status} append={append} />
          {!agentMessagesIsLoading && (
            <div className='relative flex flex-col'>
              <div className='absolute left-1/2 transform -translate-x-1/2'>
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
  );
}