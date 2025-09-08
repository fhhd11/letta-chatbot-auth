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
  const { user, logout } = useAuth()

  return (
    <div className='flex items-center justify-end w-full'>
      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="glass-effect border border-purple-500/30 rounded-lg hover:border-purple-500/50">
            <User className="h-4 w-4 mr-2" />
            <span className="text-sm text-white">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 glass-effect border border-purple-500/30 bg-black/80">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-white">{user?.name}</p>
              <p className="text-xs leading-none text-white/70">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/20" />
          <DropdownMenuItem onClick={logout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
