'use client'

import { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/state'
import HomeHero from '@/components/HomeHero'

export default function Home() {

  const [access_token, setAccessToken] = useState<string | null>(null)

  const appContext = useContext(AppContext)
  

  useEffect(() => {
    appContext.setSpotifyUserAuthCode(window.location.hash.split('&')[0].split('=')[1])
    setAccessToken(window.location.hash.split('&')[0].split('=')[1])
  }, [])
  
  const redirectURI  = (process.env.NEXT_PUBLIC_REDIRECT_URI ? process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI:'') as string;
  
  // temp call to cloud function to get access token
    useEffect(() => {
      fetch('https://spotifyauth-zwxcnyjcja-uc.a.run.app', {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': redirectURI,
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(data => {appContext.setSpotifyToken(data.body.access_token)
        })
        
    }, [])

  return (
    <main >
      <div className="flex flex-col items-center justify-center">
      </div>
      <div className=' flex flex-row items-center justify-around max-w-6xl flex-wrap text-slate-50 w-full'>
        <HomeHero />
      </div>
      


    </main>
  )
}
