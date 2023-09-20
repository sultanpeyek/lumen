import Footer from '@/components/common/footer'
import './globals.css'
import type {Metadata} from 'next'

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
        <div className="bg-primary w-full h-1" />
        <div className="flex-1 px-4 pt-4 pb-10 max-w-full w-full">
          <div className="container space-y-6">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  )
}
