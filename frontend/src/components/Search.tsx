"use client";
import {useRouter} from "next/navigation";
import React, {useContext} from "react";
import {AppContext} from "@/context/state";
import Image from "next/image";
import SearchAutocomplete from "./SearchAutocomplete";

// Custom Item component for rendering each search result
const SearchResultItem = ({item}: {item: any}) => {
	const appContext = useContext(AppContext);
	const setSearchedSongId = appContext.setSearchedSongId;

	return (
		<div id={item.id} className="bg-gray-800 rounded-md flex hover:bg-gray-700 mx-1 my-2 px-1" onClick={() => setSearchedSongId(item.id)}>
			{item.album?.images?.[0]?.url && <Image className="rounded-l-md" alt={`cover art for ${item.album.name}`} src={item.album.images[0].url} width={50} height={50} />}
			<p className="text-white text-md my-auto mx-4">
				{item.name} | {item.artists?.[0]?.name}
			</p>
		</div>
	);
};

export default function Search() {
	const router = useRouter();

	const appContext = useContext(AppContext);
	const spotifyToken = appContext.spotifyToken;
	const setSearchedSongId = appContext.setSearchedSongId;

	return (
		<SearchAutocomplete
			spotifyToken={spotifyToken}
			placeholder="Search for a song"
			onEnter={(query: string) => {
				router.push("/song/" + query.replaceAll(" ", "-"));
			}}
			onSelect={(item: any) => {
				if (item) {
					setSearchedSongId(item.id);
					router.push("/song/" + item.name.replaceAll(" ", "-"));
				}
			}}
			ItemComponent={SearchResultItem}
		/>
	);
}
