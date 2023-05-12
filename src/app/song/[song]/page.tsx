"use client"

import { useContext, useState } from 'react';
import { AppContext } from '@/context/state';
import SongDetails from "@/components/SongDetails";
import AlbumArt from "@/components/AlbumArt";
import { useEffect } from "react";
import { getTrackData } from "@/utils/utils";

export default function SongPage({ params }: { params: { slug: string } }) {

    const appContext = useContext(AppContext)
    const access_token = appContext.spotifyToken
    const searchedSongId = appContext.searchedSongId
    const [trackData, setTrackData] = useState<any>(null)

    // get details of searched song
    const headers = {
        Authorization: "Bearer " + access_token,
      };
    // call spotify api to get track details
    useEffect(() => {
        getTrackData(access_token, searchedSongId)
        .then((data) => {
            setTrackData(data)
            console.log(data)
        })
    }, [access_token, searchedSongId])

    return (
        <div>
            <div className='flex flex-row items-center justify-around max-w-6xl flex-wrap text-slate-50 w-full'>
                {/* only render song details if trackData is defined */}
                {trackData && (
                    <>
                    <SongDetails
                        artist= {trackData?.artists[0].name}
                        album={trackData?.album.name}
                        genres={trackData?.genres}
                    />
                    <AlbumArt artUrl={trackData?.album?.images[0].url} />
                    </>
                )}
                
            </div>
        </div>
    )
}

