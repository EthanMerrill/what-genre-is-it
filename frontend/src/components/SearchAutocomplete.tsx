"use client";
import React, {useState, useEffect, useRef, useCallback} from "react";
import Image from "next/image";

interface SearchAutocompleteProps {
	spotifyToken: string;
	onSelect: (item: any) => void;
	onEnter: (query: string) => void;
	placeholder?: string;
	ItemComponent?: React.ComponentType<any>;
}

interface TrackItem {
	id: string;
	name: string;
	artists: {name: string}[];
	album: {
		name: string;
		images: {url: string}[];
	};
}

export default function SearchAutocomplete({spotifyToken, onSelect, onEnter, placeholder = "Search for a song", ItemComponent}: SearchAutocompleteProps) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<TrackItem[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const debounceRef = useRef<NodeJS.Timeout | null>(null);

	// Fetch results with debounce
	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		if (query.length < 2) {
			setResults([]);
			setIsOpen(false);
			return;
		}

		debounceRef.current = setTimeout(async () => {
			try {
				const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
					headers: {Authorization: `Bearer ${spotifyToken}`},
				});
				const data = await res.json();
				setResults(data.tracks?.items || []);
				setIsOpen(true);
				setHighlightedIndex(-1);
			} catch {
				setResults([]);
			}
		}, 250);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [query, spotifyToken]);

	// Close on outside click
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (inputRef.current && !inputRef.current.contains(e.target as Node) && listRef.current && !listRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1));
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setHighlightedIndex((prev) => Math.max(prev - 1, 0));
			} else if (e.key === "Enter") {
				e.preventDefault();
				if (highlightedIndex >= 0 && results[highlightedIndex]) {
					handleSelect(results[highlightedIndex]);
				} else if (query.trim()) {
					onEnter(query.trim());
					setIsOpen(false);
				}
			} else if (e.key === "Escape") {
				setIsOpen(false);
			}
		},
		[highlightedIndex, results, query, onEnter],
	);

	const handleSelect = (item: TrackItem) => {
		if (onSelect) onSelect(item);
		setQuery("");
		setResults([]);
		setIsOpen(false);
	};

	const DefaultItem = ({item}: {item: TrackItem}) => (
		<div className="bg-gray-800 rounded-md flex hover:bg-gray-700 mx-1 my-2 px-1 cursor-pointer">
			{item.album?.images?.[0]?.url && <Image className="rounded-l-md" alt={`cover art for ${item.album.name}`} src={item.album.images[0].url} width={50} height={50} />}
			<p className="text-white text-md my-auto mx-4">
				{item.name} | {item.artists?.[0]?.name}
			</p>
		</div>
	);

	return (
		<div className="relative w-full">
			<input
				ref={inputRef}
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				onFocus={() => results.length > 0 && setIsOpen(true)}
				placeholder={placeholder}
				className="mx-1 px-2 w-full h-12 border py-2 pl-10 pr-9 text-xl outline-none rounded-full text-slate-700 dark:text-slate-50 dark:bg-gray-800 placeholder-slate-400"
			/>
			{isOpen && results.length > 0 && (
				<div ref={listRef} className="bg-gray-900 rounded-md w-full my-4 py-4 absolute z-50">
					{results.map((item, index) => (
						<div
							key={item.id}
							onMouseEnter={() => setHighlightedIndex(index)}
							onClick={() => handleSelect(item)}
							className={
								index === highlightedIndex
									? "cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-slate-700 rounded bg-blue-50 dark:text-slate-300 dark:bg-gray-800"
									: "my-2 cursor-pointer p-1.5 text-lg overflow-ellipsis overflow-hidden text-slate-700 dark:text-slate-50 rounded hover:bg-blue-50 dark:hover:bg-gray-800"
							}>
							{ItemComponent ? <ItemComponent item={item} /> : <DefaultItem item={item} />}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
