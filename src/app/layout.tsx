import NowPlayingFooter from '@/components/NowPlayingFooter'
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
        <body className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-t from-slate-950 to-slate-800">
          {children}
          <NowPlayingFooter />
        </body>
        
      </html>
    </AppContextProvider>
  )
}
