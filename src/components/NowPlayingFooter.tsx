"use client"

import { AppContext } from '@/context/state';
import FooterInfo from '@/types/footerInfo.interface';
import Image from "next/image";
import { use, useContext, useState, useEffect} from 'react';
import { getFooterData } from '@/utils/utils';
import Link from 'next/link'

export default function NowPlayingFooter() {

    const appContext = useContext(AppContext)
    
    const [currentSongId, setCurrentSongId] = useState<string | null>(null)
    const [FooterInfo, setFooterInfo] = useState<FooterInfo|null>(null);
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
            <div className="sticky bottom-0 flex flex-row items-center justify-betwen w-full pr-10 py-2 rounded-t-lg drop-shadow-[-2_5px_5px_rgba(0,0,0,0.25)] h-24 bg-white max-w-[800px] mx-auto">
                <div className="flex align-baseline align-items-baseline bg-green-800 rounded-full border-solid px-4 py-1 h-8 text-sm">
                    <p className="text-white h-5 w-fit whitespace-nowrap ">
                    <Link href='/redirect'>
                        Authenticate with Spotify
                        </Link>
                        </p>
                </div>
            </div >
        )
    } else if(!FooterInfo) {
        // if no song is playing return null
        return (
            null
        )
    } else {
        return (
            <div className="sticky bottom-0 flex flex-row items-center justify-betwen w-full pr-10 py-2 rounded-t-lg drop-shadow-[-2_5px_5px_rgba(0,0,0,0.25)] h-24 bg-white max-w-[800px] mx-auto">
                {FooterInfo.albumArt ? <Image width={600} height={600} src={FooterInfo.albumArt} alt="album art" className="w-24 h-24 rounded-tl-lg" /> : null}
                <div className="px-3 text-slate-600 ">
                    <p className="text-gray-800">{FooterInfo.title}</p>
                    <p className="text-gray-800">{FooterInfo.artist}</p>
                </div>
                {/* tag */}
                <div className="flex flex-row  gap-2 items-center flex-wrap">
                    {FooterInfo.genre && FooterInfo?.genre.map((genre, index) => {
                        return (
                            <div key={index} className="flex align-baseline align-items-baseline bg-green-800 rounded-full border-solid px-4 py-1 h-8 text-sm">
                                <p className="text-white h-5 w-fit whitespace-nowrap align-baseline">{genre}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}