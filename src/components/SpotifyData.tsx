import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { getGenre } from '@/utils/utils';
import { generateKey } from 'crypto';

const SpotifyData = (props: { access_token: string }) => {
    const [apiData, setApiData] = useState(null)
    const [currentSongId, setCurrentSongId] = useState<string | null>(null)
    const [genre, setGenre] = useState<string | null>(null)
    const { access_token } = props


    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer ' + (access_token)
        }
        if (access_token) {
            axios.get(`https://api.spotify.com/v1/artists/${currentSongId}`, { headers: headers }).then((response: AxiosResponse) => {
                setGenre(response.data.genres)
            }, (error: Error) => {
                console.log(error)
            })
        }
    }, [currentSongId, access_token])

    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer ' + (access_token)
        }
        // https://designcode.io/react-hooks-handbook-fetch-data-from-an-api
        if (access_token) {
            axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, { headers: headers })
                .then((response: AxiosResponse) => {
                    // console.log(response.data)
                    setCurrentSongId(response.data.item.artists[0].id)
                }, (error: Error) => {
                    console.log(error)
                })

        }
    }, [access_token])

    return (
        <div>
            {access_token ? <div>{genre}</div> : null}
        </div>
    )
}

export default SpotifyData