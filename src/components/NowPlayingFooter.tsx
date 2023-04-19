import FooterInfo from '@/types/footerInfo.interface';
import Image from "next/image";

export default function NowPlayingFooter(props: {FooterInfo: FooterInfo}) {
    const { FooterInfo } = props
    return(
        <div className="sticky bottom-0 flex flex-row items-center justify-center w-full pr-10 py-2 rounded-t-lg drop-shadow-[-2_5px_5px_rgba(0,0,0,0.25)] h-24 bg-white">
            {FooterInfo.albumArt ? <Image width={600} height={160} src={FooterInfo.albumArt} alt="album art" className="w-24 h-24 rounded-tl-lg"/> : null}
            <div className="flex flex-col items-center justify-center">
                <p className="text-gray-800">{FooterInfo.title}</p>
                <p className="text-gray-800">{FooterInfo.artist}</p>
                </div>
                {/* tag */}
                <div className="flex flex-row  gap-3 items-center overflow-x-scroll">
                    {FooterInfo.genre && FooterInfo?.genre.map((genre, index) => {
                        return(
                            <div className="flex flex-row items-center justify-center bg-green-200 rounded-full border-solid px-2 py-1">
                            <p className="text-white" key={index}>{genre}</p>
                            </div>
                        )
                    })}
                </div>

        </div>

    )
}