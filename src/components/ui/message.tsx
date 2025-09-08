import * as React from 'react'
import { cn } from '@/lib/utils'
import Markdown from 'react-markdown'
import { Message as MessageType } from '@ai-sdk/ui-utils'
import { ROLE_TYPE } from '@/types'
import { Copy } from 'lucide-react'

type Sender = MessageType['role']

interface MessagePillProps {
  message: string
  sender: Sender
}

const MessagePill = (props: MessagePillProps) => {
  const { message, sender } = props

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message)
  }

  if (sender === ROLE_TYPE.USER) {
    return (
      <div className="flex flex-col gap-2.5 items-end justify-start w-full max-w-sm ml-auto px-4 md:px-0 md:max-w-md animate-slide-in">
        <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse-glow border-2 border-white/20">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="glass-effect message-glow rounded-xl p-4 w-full max-w-full border border-blue-500/30 shadow-lg">
          <div className="text-white text-sm font-light font-mono tracking-wide leading-6 break-words">
            <Markdown className="prose prose-invert prose-sm max-w-none">{message}</Markdown>
          </div>
          <div className="flex justify-end mt-3">
            <button 
              onClick={copyToClipboard} 
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 group"
            >
              <Copy className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 items-start justify-start px-4 md:px-0 w-full max-w-full animate-slide-in">
      <div className="size-9 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center shrink-0 shadow-lg animate-pulse-glow">
        <img src="/Subtract.svg" alt="AI Agent" className="w-5 h-5 brightness-0 invert drop-shadow-sm" />
      </div>
      <div className="glass-effect message-glow rounded-xl p-4 w-full max-w-full md:max-w-3xl border border-purple-500/30 shadow-lg">
        <div className="text-white text-sm font-light font-mono tracking-wide leading-7 break-words">
          <Markdown className="prose prose-invert prose-sm max-w-none">{message}</Markdown>
        </div>
        <div className="flex justify-start mt-3">
          <button 
            onClick={copyToClipboard} 
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 group"
          >
            <Copy className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  )
}

export { MessagePill }
