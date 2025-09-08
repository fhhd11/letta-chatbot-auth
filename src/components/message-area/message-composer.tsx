'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import { ArrowUpIcon } from 'lucide-react'
import type { UseChatHelpers } from '@ai-sdk/react'
import { TEXTBOX_PLACEHOLDER } from '@/app/lib/labels'

interface MessageComposerProps {
  handleSubmit: UseChatHelpers['handleSubmit']
  handleInputChange: UseChatHelpers['handleInputChange']
  input: UseChatHelpers['input']
  status: UseChatHelpers['status']
}

export function MessageComposer(props: MessageComposerProps) {
  const { handleSubmit, handleInputChange, input, status } = props

  const parentRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)


  useEffect(() => { // Adjust the height of the textarea based on its content
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight > 500 ? '500px' : textarea.scrollHeight + 'px';
    }
  }, [input]);

  return (
    <div className='flex min-w-0 flex-col justify-end relative z-10'>
      {/* Background blur effect - centered and responsive */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/30 to-transparent blur-md pointer-events-none" />
      

      {/* Chat input */}
      <div className='relative mx-auto flex w-full max-w-md px-3 pb-6 md:max-w-2xl lg:max-w-3xl'>
        <div className="glass-effect rounded-2xl p-4 md:p-5 w-full flex items-center gap-3 relative z-20 shadow-xl border border-purple-500/30 message-glow animate-slide-in">
          <form data-id='message-input' onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
            <textarea
              name='message'
              ref={textAreaRef}
              value={input}
              placeholder="Введите сообщение..."
              onChange={handleInputChange}
              className="appearance-none focus:outline-none flex w-full min-h-6 max-h-32 resize-none border-none bg-transparent text-sm text-white font-mono font-normal tracking-wide placeholder:text-white/50 transition-colors focus:placeholder:text-white/30"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type='submit'
              className='flex h-10 w-10 items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 p-0 border-0 rounded-xl shrink-0 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 shadow-lg'
              disabled={status === 'submitted'}
              variant="ghost"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {status === 'submitted' ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 25 25" fill="none" className="w-5 h-5">
                    <path d="M5 12L20 12M20 12L13 5M20 12L13 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
