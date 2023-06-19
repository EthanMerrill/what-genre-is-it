"use client"

import { useContext, useEffect } from 'react'
import { AppContext } from '@/context/state'
import HomeHero from '@/components/HomeHero'

export default function Home() {

  // const [access_token, setAccessToken] = useState<string | null>(null)

  const appContext = useContext(AppContext)
  

  useEffect(() => {
    appContext.setSpotifyUserAuthCode(window.location.hash.split('&')[0].split('=')[1])
  }, [])
  
  // temp call to cloud function to get access token
    useEffect(() => {
      fetch('https://spotifyauth-zwxcnyjcja-uc.a.run.app', {
        method: 'GET',
        headers: {
          // 'Access-Control-Allow-Origin': 'testing',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Referrer-Policy': 'origin',
          'Access-Control-Allow-Origin': '*',
          'accept': '*/*',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
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
      <div className=' flex flex-row items-center justify-around max-w-6xl flex-wrap text-slate-50 w-full mx-auto'>
        <HomeHero />
      </div>
      


    </main>
  )
}

