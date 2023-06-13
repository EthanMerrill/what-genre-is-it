
export default function GenreChip(props: { genre: string, index: number, size?: number }) {
    const { genre, index } = props

    return (
        <div className="w-fit">
            <div key={index} className="flex align-items-baseline bg-green-800 rounded-full w-fit border-solid px-4 h-7 text-sm">
                <p className="text-white my-auto w-fit whitespace-nowrap align-baseline">{genre}</p>
            </div>
        </div>
    )
}