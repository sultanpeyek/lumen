import Footer from '@/components/common/footer'
import './globals.css'
import type {Metadata} from 'next'
import AnimatedBackgroundGradient from '@/components/common/animated-background-gradient'
import {CONFIG} from '@/config/site'

export const metadata: Metadata = CONFIG.metadata

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body className="flex flex-col min-h-screen">
        <div className="flex-auto max-w-full w-full pb-10">
          <AnimatedBackgroundGradient className="h-2 flex-none" />
          <div className="container space-y-6">{children}</div>
        </div>
        <div className="-top-1 relative">
          <AnimatedBackgroundGradient className="h-2" />
          <Footer />
        </div>
      </body>
    </html>
  )
}
