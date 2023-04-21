

export default function SongDetails(props: { artist: string, album: string, genres: string[]}) {

    const { artist, album, genres } = props

    return (
        <div className=''>
            <div>
                <h2>Artist</h2>
                <p>{artist}</p>
            </div>
            <div>
                <h2>Album</h2>
                <p>{album}</p>
            </div>
        </div>
    )
}