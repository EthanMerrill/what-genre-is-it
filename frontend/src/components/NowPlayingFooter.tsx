"use client"

import { AppContext } from '@/context/state';
import FooterInfo from '@/types/footerInfo.interface';
import Image from "next/image";
import { use, useContext, useState, useEffect } from 'react';
import { getFooterData } from '@/utils/utils';
import Link from 'next/link'
import AuthenticateButton from './AuthenticateButton';
import GenreChip from './GenreChip';

export default function NowPlayingFooter() {

    const appContext = useContext(AppContext)

    const [currentSongId, setCurrentSongId] = useState<string | null>(null)
    const [FooterInfo, setFooterInfo] = useState<FooterInfo | null>(null);
    // retrieve access token from context
    const user_access_token = appContext.spotifyUserAuthCode
    // get now playing song

    useEffect(() => {
        if (user_access_token) {
            const footer = getFooterData(user_access_token)
            footer.then((data) => {
                setFooterInfo(data)
            })
        }
    }, [user_access_token])

    if (!user_access_token) {
        // if no access token, authenticate with spotify
        return (
            <div className="fixed bottom-0 w-full">
                <div className='flex flex-row items-center justify-betwen w-full pr-10 py-2 rounded-t-lg drop-shadow-[-2_5px_5px_rgba(0,0,0,0.25)] h-24 bg-white max-w-[800px] mx-auto'>
                    <div className='w-full'>
                        <p className='px-auto w-full text-center py-2 text-sm text-slate-700'>To view the genre of what you are currently listening to: </p>
                        <AuthenticateButton />
                    </div>
                </div>
            </div >
        )
    } else if (!FooterInfo) {
        // if no song is playing return null
        return (
            null
        )
    } else {
        return (
            <div className="fixed bottom-0 w-full">
                <div className='flex flex-row items-center justify-betwen w-full pr-10 py-2 rounded-t-lg drop-shadow-[-2_5px_5px_rgba(0,0,0,0.25)] h-24 bg-white max-w-[800px] mx-auto'>
                {FooterInfo.albumArt ? <Image width={600} height={600} src={FooterInfo.albumArt} alt="album art" className="w-24 h-24 rounded-tl-lg" /> : null}
                <div className="px-3 text-slate-600 ">
                    <p className="text-gray-800">{FooterInfo.title}</p>
                    <p className="text-gray-800">{FooterInfo.artist}</p>
                </div>
                {/* tag */}
                <div className="flex flex-row gap-2 items-center flex-wrap">
                    {FooterInfo.genre && FooterInfo?.genre.map((genre, index) => {
                        return (
                            <GenreChip key={index} genre={genre} index={index} size={1} />
                        )
                    })}
                </div>
            </div>
            </div >

        )
    }
}