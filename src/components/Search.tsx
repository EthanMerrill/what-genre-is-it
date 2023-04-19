import Turnstone from 'turnstone'
import turnstoneStyles from '../styles/turnstoneStyles.js'
import { useRouter } from 'next/navigation.js'

export default function Search() {

    const router = useRouter()

    return (
        <Turnstone
            id='search'
            styles={turnstoneStyles}
            placeholder="Search for a song"
            onEnter={async (query:string) => {
                router.push('/search/' + query)
            }}
        />
    ) 
}