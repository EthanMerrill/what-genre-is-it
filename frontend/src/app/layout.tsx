import NowPlayingFooter from '@/components/NowPlayingFooter'
import './globals.css'
import AppContextProvider from '@/context/state'
import SearchHeader from '@/components/SearchHeader'
import { SignatureFooter } from 'ethan-common-components'

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
    <>
      <AppContextProvider>
        <html lang="en">
          <body className="h-screen bg-gradient-to-t from-slate-950 to-slate-800">
            <div className='max-w-[800px] mx-auto px-5'>
              <SearchHeader />
            </div>
            {children}
            <NowPlayingFooter />
            <div className='absolute bottom-0 w-full'>
              <SignatureFooter backgroundColor='#020617' fontColor='white' />
            </div>
          </body>
        </html>
      </AppContextProvider>
    </>
  )
}
