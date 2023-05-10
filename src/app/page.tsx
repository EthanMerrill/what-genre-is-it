'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import Search from '@/components/Search'
import Link from 'next/link'
import SpotifyData from '@/components/SpotifyData'
import { usePathname, useSearchParams, useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react'
import NowPlayingFooter from '@/components/NowPlayingFooter'
import AlbumArt from '@/components/AlbumArt'
import SongDetails from '@/components/SongDetails'
import { AppContext } from '@/context/state'
import axios, { AxiosResponse } from 'axios';
import FooterInfo from '@/types/footerInfo.interface';


export default function Home() {

  const [access_token, setAccessToken] = useState<string | null>(null)

  const appContext = useContext(AppContext)
  

  useEffect(() => {
    appContext.setSpotifyUserAuthCode(window.location.hash.split('&')[0].split('=')[1])
    setAccessToken(window.location.hash.split('&')[0].split('=')[1])
  }, [])

  
    // temp call to cloud function to get access token
    useEffect(() => {
      fetch('https://spotifyauth-zwxcnyjcja-uc.a.run.app', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(data => {appContext.setSpotifyToken(data.body.access_token)
        })
        
    }, [])

  return (
    <main  className="flex min-h-max flex-col items-center justify-between w-full">
      <div className="flex flex-col items-center justify-center">
        <h1>What genre is this?</h1>
        <Search />
      </div>
      <div className='flex flex-row items-center justify-around max-w-6xl flex-wrap text-slate-50 w-full'>
        <SongDetails
          artist='The Weeknd'
          album='Blinding Lights'
          genres={['pop', 'r&b', 'hip-hop']}
        />
        <AlbumArt artUrl='https://i.scdn.co/image/ab67616d0000b273f4a62582de18a4e4e071812c' />
      </div>
      


    </main>
  )
}
