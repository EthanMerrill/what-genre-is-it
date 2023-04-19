'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import Search from '@/components/Search'
import Link from 'next/link'
import SpotifyData from '@/components/SpotifyData'
import { usePathname, useSearchParams,useParams } from 'next/navigation';
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [access_token, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    setAccessToken(window.location.hash.split('&')[0].split('=')[1])
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="flex flex-col items-center justify-center">
        <h1>What genre is this?</h1>
        <Search/>
      </div>
      <Link href='/redirect'>authenticate</Link>
      {access_token && <SpotifyData access_token = {access_token} />}
    </main>
  )
}
