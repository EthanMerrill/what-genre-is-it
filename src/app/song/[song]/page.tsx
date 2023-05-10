"use client"
import SpotifyData from "@/components/SpotifyData"
import NowPlayingFooter from "@/components/NowPlayingFooter"
import { useContext } from 'react';
import { AppContext } from '@/context/state';

export default function SongPage(){

    const appContext = useContext(AppContext)
    const access_token = appContext.spotifyToken

    return (
        <div>
            <SpotifyData access_token={access_token} />
            <NowPlayingFooter/>
        </div>
    )
}