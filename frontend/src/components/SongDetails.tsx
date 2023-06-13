import GenreChip from "./GenreChip"

export default function SongDetails(props: { artist: string, album: string, genres: string[]}) {

    const { artist, album, genres } = props
    console.log(genres)

    return (
        
        <div className='max-w-[500px]'>
            <div className="flex flex-row">
                <h1 className="text-slate-200 pr-2">Artist </h1>
                <p className="font-bold animate-fade">{artist}</p>
            </div>
            <div className="flex flex-row">
                <h1 className="text-slate-200 pr-2">Album</h1>
                <p className="font-bold animate-fade">{album}</p>
            </div>
            <div>
                <h1>Genres</h1>
                <div className=" mt-2 flex flex-row gap-2 items-center flex-wrap">
                {genres.length>0 && (genres.map((genre, index) => {
                    return (
                        <GenreChip key={index} genre={genre} index={index} />
                    )
                }))
                }
            </div>
            </div>
        </div>
        
    )
}