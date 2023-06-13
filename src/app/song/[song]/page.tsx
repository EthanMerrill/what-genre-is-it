"use client"

import { useContext, useState } from 'react';
import { AppContext } from '@/context/state';
import SongDetails from "@/components/SongDetails";
import AlbumArt from "@/components/AlbumArt";
import { useEffect } from "react";
import { getTrackData, getArtistData} from "@/utils/utils";

export default function SongPage({ params }: { params: { slug: string } }) {

    const appContext = useContext(AppContext)
    const access_token = appContext.spotifyToken
    const searchedSongId = appContext.searchedSongId
    const [trackData, setTrackData] = useState<any>(null)
    const [genres, setGenres] = useState<string[]>([])

    // get details of searched song
    const headers = {
        Authorization: "Bearer " + access_token,
      };
    // call spotify api to get track details
    useEffect(() => {
        getTrackData(access_token, searchedSongId)
        .then((data) => {
            setTrackData(data)
        })
    }, [access_token, searchedSongId])

    // call spotify api to get genre details
    useEffect(() => {
        if (trackData) {
            getArtistData(access_token, trackData?.artists[0].id)
            .then((data:any) => {
                setGenres(data.genres)
            })
        }
    }, [access_token, trackData])

    return (
        <div className='h-[70%] w-full'>
            <div className='my-auto flex flex-row h-full items-center justify-around max-w-6xl flex-wrap text-slate-50 mx-auto'>
                {/* only render song details if trackData is defined */}
                {trackData && (
                    <>
                    <SongDetails
                        artist= {trackData?.artists[0].name}
                        album={trackData?.album.name}
                        genres={genres}
                    />
                    <AlbumArt artUrl={trackData?.album?.images[0].url} />
                    </>
                )}
                
            </div>
        </div>
    )
}

