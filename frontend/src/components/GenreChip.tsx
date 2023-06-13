
export default function GenreChip(props: { genre: string, index: number, size?: number }) {
    const { genre, index, size } = props
    // write a case statement


    switch (size) {
        case 1:
            return (
                <div className="w-fit">
                    <div key={index} className="flex align-items-baseline bg-green-800 rounded-full w-fit border-solid px-2 h-4 text-sm">
                        <p className="text-white text-xs my-auto w-fit whitespace-nowrap align-baseline">{genre}</p>
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="w-fit">
                    <div key={index} className="flex align-items-baseline bg-green-800 rounded-full w-fit border-solid px-4 h-7 text-sm">
                        <p className="text-white my-auto w-fit whitespace-nowrap align-baseline">{genre}</p>
                    </div>
                </div>
            )
        default:
            return (
                <div className="w-fit">
                    <div key={index} className="flex align-items-baseline bg-green-800 rounded-full w-fit border-solid px-4 h-7 text-sm">
                        <p className="text-white my-auto w-fit whitespace-nowrap align-baseline">{genre}</p>
                    </div>
                </div>
            )
    }


}