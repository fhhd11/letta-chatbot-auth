import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { AgentDetailsProvider } from '@/components/ui/agent-details'
import { SidebarProvider } from '@/components/ui/sidebar'
import ContentLayout from './content-layout'
import { ReasoningMessageProvider } from '@/components/toggle-reasoning-messages'
import { DialogContextProvider } from '@/components/ui/agent-dialog'
import { AuthProvider } from '@/context/AuthContext'

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500']
})

export const metadata: Metadata = {
  title: 'Letta Chatbot with Memory Template',
  description:
    'An example chatbot application built on the Letta API, which makes each chatbot a stateful agent (agent with memory) under the hood.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${robotoMono.variable} font-mono antialiased`}
      >
        <Providers>
          <AuthProvider>
            <DialogContextProvider>
              <SidebarProvider>
                <AgentDetailsProvider>
                  <ReasoningMessageProvider>
                    <ContentLayout>{children}</ContentLayout>
                  </ReasoningMessageProvider>
                </AgentDetailsProvider>
              </SidebarProvider>
            </DialogContextProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
