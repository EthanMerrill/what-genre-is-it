import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import FooterInfo from '@/types/footerInfo.interface';
import NowPlayingFooter from './NowPlayingFooter';

const SpotifyData = (props: { access_token: string }) => {
    const [apiData, setApiData] = useState(null)
    const [currentSongId, setCurrentSongId] = useState<string | null>(null)
    const [genre, setGenre] = useState<string | null>(null)
    const { access_token } = props
    const [footerInfo, setFooterInfo] = useState<FooterInfo>({
        title: '',
        artist: '',
        album: '',
        albumArt: '',
        genre: []
    })

    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer ' + (access_token)
        }
        if (access_token) {
            axios.get(`https://api.spotify.com/v1/artists/${currentSongId}`, { headers: headers }).then((response: AxiosResponse) => {
                setFooterInfo({
                    title: footerInfo.title,
                    artist: footerInfo.artist,
                    album: footerInfo.album,
                    albumArt: footerInfo.albumArt,
                    genre: response.data.genres
                })
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
                    setFooterInfo({
                        title: response.data.item.name,
                        artist: response.data.item.artists[0].name,
                        album: response.data.item.album.name,
                        albumArt: response.data.item.album.images[0].url,
                        genre: []
                    })
                    setCurrentSongId(response.data.item.artists[0].id)
                }, (error: Error) => {
                    console.log(error)
                })

        }
    }, [access_token])

    return (
        <div className='w-full'>
        </div>
    )
}

export default SpotifyData