import Footer from '@/components/common/footer'
import './globals.css'
import type {Metadata} from 'next'
import AnimatedBackgroundGradient from '@/components/common/animated-background-gradient'

export const metadata: Metadata = {
  title: 'Lumen — NFT Collection Explorer',
  description: '...',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body className="flex flex-col min-h-screen">
        <AnimatedBackgroundGradient className="h-2" />
        <div className="flex-1 max-w-full w-full pb-10">
          <div className="container space-y-6">{children}</div>
        </div>
        <AnimatedBackgroundGradient className="h-2" />
        <Footer />
      </body>
    </html>
  )
}
