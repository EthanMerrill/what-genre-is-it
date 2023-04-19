'use client'
import { useRouter,redirect } from 'next/navigation'
import { useEffect } from 'react';
import { NextResponse } from 'next/server';
import Link from 'next/link'
import {useRandomString} from '@/utils/utils'

const Redirect = () => {
    
    
    const state = useRandomString(16);
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT;
    const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET;
    const redirect_uri = 'http://localhost:3001'
    const scope = 'user-read-currently-playing'

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
        <div>
            <a href = {url}>Authenticate</a>
        </div>
    )
    
}

export default Redirect;