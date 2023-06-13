import Turnstone from 'turnstone'
import turnstoneStyles from '@/styles/turnstoneStyles.js'
import { useRouter } from 'next/navigation.js'
import { use, useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/state'
import Image from 'next/image'
import Link from 'next/link'


// Custom Item component
const Item = (props: any) => {
    const appContext = useContext(AppContext)
    const setSearchedSongId = appContext.setSearchedSongId

    const {
        item
    } = props
    return (
            <div id={item.id} className='bg-gray-800 rounded-md flex hover:bg-gray-700 mx-1 my-2'>
                <Image className='rounded-l-md' alt={`cover art for ${item.album.name}`} src={item.album.images[0].url} width={50} height={50} />
                <p className='text-white text-md my-auto mx-4'>{item.name} | {item.artists[0].name}</p>
            </div>
    )
}


const listbox = (spotifyToken: string) => [
    {
        // id: 'songs',
        // name: 'Songs',
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

export default function Search() {

    const router = useRouter()

    const [query, setQuery] = useState<string>('')
    const [results, setResults] = useState<any>([])

    const appContext = useContext(AppContext)
    const spotifyToken = appContext.spotifyToken
    const setSearchedSongId = appContext.setSearchedSongId

    return (
        <Turnstone
            id='search'
            styles={turnstoneStyles}
            placeholder="Search for a song"
            onEnter={async (query: string) => {
                router.push('/song/' + query.replaceAll(' ', '-'))
            }}
            // onChange={async (query: string) => {
            //     setQuery(query)
            // }}
            onSelect={async (query: any) => {
                if(query) {
                setSearchedSongId(query?.id)
                router.push('/song/' + query?.name.replaceAll(' ', '-'))
                }
            }}
            debounceWait={250}
            listbox={listbox(spotifyToken)}
            typeahead={true}
            Item={Item}
        />
    )
}