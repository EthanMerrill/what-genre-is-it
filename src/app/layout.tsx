import './globals.css'
import AppContextProvider from '@/context/state'

export const metadata = {
  title: 'What Genre Is This?',
  description: 'Find out the genres of your favorite songs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppContextProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AppContextProvider>
  )
}
