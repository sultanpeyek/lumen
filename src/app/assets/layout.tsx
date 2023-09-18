export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="px-4">
      <div className="max-w-screen-xl mx-auto space-y-6">
        <div>{children}</div>
      </div>
    </div>
  )
}
