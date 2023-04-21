import Image from "next/image"

export default function AlbumArt(props: {artUrl: string}) {
    const { artUrl } = props

    return(
        <div>
            <Image
                src={artUrl}
                alt="album art"
                width={600}
                height={600}
                className='w-[300px] h-[300px] drop-shadow-3xl rounded-md'
            />
        </div>
    )
}