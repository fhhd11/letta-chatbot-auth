import { AgentDetailsTrigger } from './ui/agent-details'
import { useAgentContext } from '@/app/[agentId]/context/agent-context'
import { useAgents } from './hooks/use-agents'
import { SkeletonLoadBlock } from './ui/skeleton-load-block'
import { ReasoningMessageSwitch } from './toggle-reasoning-messages'
import { LoaderCircle, User, LogOut } from 'lucide-react'
import { useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export const ChatHeader = () => {
  const { agentId } = useAgentContext()
  const { data: agentData, isLoading } = useAgents()
  const { user, logout } = useAuth()

  const selectedAgent = useMemo(() => {
    if (!agentData) return null

    if (agentData.length === 0) return null

    return agentData.find((a: { id: string }) => a.id === agentId)
  }, [agentData, agentId])

  return (
    <>
      <div className='flex-1 overflow-hidden'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-2 w-1/2 overflow-hidden'>
            <div className='w-full overflow-hidden'>
              {isLoading ? (
                <SkeletonLoadBlock className='w-[10em] h-[1em]' />
              ) : (
                <div className='text-l font-bold truncate'>
                  {selectedAgent?.name || 'Personal Agent'}
                </div>
              )}
            </div>
          </div>
          <div className='flex items-center gap-2'>
            {isLoading ? (
              <LoaderCircle
                className='w-max h-full px-2 animate-spin'
                size={17}
              />
            ) : (
              <div className='flex flex-row gap-1'>
                <ReasoningMessageSwitch data-id={'reasoning-message-switch'}/>
                <AgentDetailsTrigger data-id={'agent-details-trigger'} isLoading={isLoading} />
              </div>
            )}
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}
