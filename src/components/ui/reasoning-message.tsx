import * as React from 'react'

interface ReasoningMessageProps {
  message: string
  isEnabled: boolean
}

const ReasoningMessageBlock = (props: ReasoningMessageProps) => {
  const { message, isEnabled } = props

  return (
    <div
      className={`flex items-start gap-4 mb-6 px-4 md:px-0 animate-slide-in ${!isEnabled && 'hidden'}`}
    >
      <div className="bg-gradient-to-b from-yellow-500/60 via-orange-500/40 to-transparent h-20 w-[2px] shrink-0 mt-1 rounded-full shadow-sm animate-pulse-glow" />
      <div className="glass-effect rounded-lg p-3 border border-yellow-500/20 shadow-md max-w-full md:max-w-md">
        <div className="text-xs text-yellow-100/80 font-light font-mono tracking-wide leading-5 break-words">
          <span className="text-yellow-300 font-medium">\ud83e\udde0 Reasoning: </span>
          {message}
        </div>
      </div>
    </div>
  )
}

export { ReasoningMessageBlock }
