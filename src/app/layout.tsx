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
      <body>
        <div className="px-4 pb-10">
          <div className="max-w-screen-xl mx-auto space-y-6">
            <h1 className="my-10 text-4xl font-bold text-center">
              Lumen — NFT Collection Explorer
            </h1>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
