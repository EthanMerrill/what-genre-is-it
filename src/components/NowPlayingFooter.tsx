import FooterInfo from '@/types/footerInfo.interface';
import Image from "next/image";

export default function NowPlayingFooter(props: {FooterInfo: FooterInfo}) {
    const { FooterInfo } = props
    console.log('footerInfo', FooterInfo)
    return(
            <div className="sticky bottom-0 flex flex-row items-center justify-betwen w-full pr-10 py-2 rounded-t-lg drop-shadow-[-2_5px_5px_rgba(0,0,0,0.25)] h-24 bg-white max-w-[800px]">
            {FooterInfo.albumArt ? <Image width={600} height={160} src={FooterInfo.albumArt} alt="album art" className="w-24 h-24 rounded-tl-lg"/> : null}
            <div className="px-3 text-slate-600 ">
                <p className="text-gray-800">{FooterInfo.title}</p>
                <p className="text-gray-800">{FooterInfo.artist}</p>
                </div>
                {/* tag */}
                <div className="flex flex-row  gap-2 items-center flex-wrap">
                    {FooterInfo.genre && FooterInfo?.genre.map((genre, index) => {
                        return(
                            <div className="flex align-baseline align-items-baseline bg-green-800 rounded-full border-solid px-4 py-1 h-8 text-sm">
                            <p className="text-white h-5 w-fit whitespace-nowrap " key={index}>{genre}</p>
                            </div>
                        )
                    })}
                </div>

        </div>

    )
}