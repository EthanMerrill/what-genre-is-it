'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import Search from '@/components/Search'
import Link from 'next/link'
import SpotifyData from '@/components/SpotifyData'
import { usePathname, useSearchParams,useParams } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const access_token = window.location.hash.split('&')[0].split('=')[1]
  console.log('ACCESS TOKEN:', access_token)

  // AQC7WglF-G-kP4o61aAN4XkqW9_hW561vrw7RarOdBGfzYB_yEx0f_yTxqptL7IG96O_r071-17mC4A2-osC1p5BRxOEB1VwZG-3X_WUx7kZCdN1QHLEcWnroY3x1bSDhWuaZzIndKyOauIwJsPuymbH-1InHOCFQ4Tx6obGDV5ggItwTIONKjeVdk7zV4DBtnR83VlxrtpbNxY6B0k9U9Qe7LUtM_gt-R2lzdVu3r4Ah82u9ehFW61lZa_UeGqk4wEI2_LeUqzQ6DYEwEokkeK8hpv2gNFjuqI-zieI54e8kWc6OFAb7XIYGkmnx1VAOVDIQdL5j-3nLA
  // AQD6S6TyP-d-4wrTeqkyabr4f4qhSZh9EgLZjbXdrgOamtNCBFIVP1Lqtg9YWZc7NEK8aJVWuU7ZVN-oXPLyqS6fIV0jJpru32gZmC852PMP5CRdJ_ft1UziYQF4UhF1Tgc2jOs0BAn6n06xfmEsuF4Au94KhMi41R8vhqyBJEQLLvQrtpaOc15NwtvxjtfGg1iF8PBzhU1beGjox9SL6trxScYwFgg0RjSrDzcuSfAk998I_oCgeodglnQogBzU0SwbkCbbqlpWMJaDPZSXwods8jWU0NcG2GzxO-5Pe4gdCm1X79YKbjQ0t8Zsn2dNxBQ6Owj-FVtFQg
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1>What genre is this?</h1>
        <Search/>
      </div>
      <Link href='/redirect'>authenticate</Link>
      {access_token && <SpotifyData access_token = {access_token} />}
    </main>
  )
}
