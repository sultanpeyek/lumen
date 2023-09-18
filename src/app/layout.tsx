import './globals.css'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Lumen — NFT Collection Explorer',
  description: '...',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
