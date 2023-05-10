import Turnstone from 'turnstone'
import turnstoneStyles from '../styles/turnstoneStyles.js'
import { useRouter } from 'next/navigation.js'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/state'

export default function Search() {

    const router = useRouter()

    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<any>([])

    const appContext = useContext(AppContext)
    const spotifyToken = appContext.spotifyToken

    const listbox = [
        {
            id: 'songs',
            name: 'Songs',
            ratio: 8,
            displayField: 'name',
            data: (query: string) =>
                fetch('https://api.spotify.com/v1/search?q=' + encodeURIComponent(query) + '&type=track&limit=5', {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + spotifyToken
                    }
                }).then(res => { return res.json() })
                    .then(data => {
                        data.tracks.items.map((item: any) => {
                            return {
                                id: item.id,
                                name: item.name,
                                artist: item.artists[0].name,
                                album: item.album.name,
                                image: item.album.images[0].url
                            }
                        })
                        return data.tracks.items
                    }),
            searchType: 'startswith'
        }
    ]

    // useEffect(() => {
    //     if (query) {
    //         fetch('https://api.spotify.com/v1/search?q=' + query + '&type=track', {
    //             method: 'GET',
    //             headers: {
    //                 "Authorization": "Bearer " + spotifyToken
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => setResults(data.tracks.items))
    //     }
    // }, [query])

    return (
        <Turnstone
            id='search'
            styles={turnstoneStyles}
            placeholder="Search for a song"
            onEnter={async (query: string) => {
                router.push('/search/' + query)
            }}
            debounceWait={250}
            listbox={listbox}
            typeahead={true}
        />
    )
}