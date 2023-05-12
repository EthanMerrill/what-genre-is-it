'use client'
import { useRouter,redirect } from 'next/navigation'
import { useEffect } from 'react';
import { NextResponse } from 'next/server';
import Link from 'next/link'
import {useRandomString} from '@/utils/utils'

const AuthenticateButton = () => {
    
    
    const state = useRandomString(16);
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT;
    const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET;
    const redirect_uri = 'http://localhost:3001'
    const scope = encodeURIComponent('user-read-currently-playing user-read-recently-played')

    console.log(`
        client_id: ${client_id}
        client_secret: ${client_secret}
        redirect_uri: ${redirect_uri}
        scope: ${scope}
        `)

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + client_id;
        url += '&scope=' + scope;
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

    var stateKey = 'spotify_auth_state';
    localStorage.setItem(stateKey, state);

    return (
        <div className="flex align-baseline align-items-baseline  rounded-lg border-2 border-slate-600 px-4 py-1 h-8 text-sm w-[200px] mx-auto">
        <p className="text-slate-600 font-medium h-5 w-fit whitespace-nowrap ">
            <Link href={url}>
                Authenticate with Spotify
            </Link>
        </p>
    </div>
    )
    
}

export default AuthenticateButton;