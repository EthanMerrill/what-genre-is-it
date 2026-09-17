"use client";

import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/context/state";
import SongDetails from "@/components/SongDetails";
import AlbumArt from "@/components/AlbumArt";
import {getTrackData, getArtistData} from "@/utils/utils";

export default function SongPage({params}: {params: Promise<{song: string}>}) {
	const appContext = useContext(AppContext);
	const access_token = appContext.spotifyToken;
	const [trackData, setTrackData] = useState<any>(null);
	const [genres, setGenres] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [trackId, setTrackId] = useState<string | null>(appContext.searchedSongId);

	useEffect(() => {
		params.then(({song}) => setTrackId(song));
	}, [params]);

	useEffect(() => {
		if (!access_token || !trackId) return;
		setError(null);
		getTrackData(access_token, trackId)
			.then((data) => setTrackData(data))
			.catch((caughtError) => setError(caughtError instanceof Error ? caughtError.message : "Unable to load this song."));
	}, [access_token, trackId]);

	useEffect(() => {
		if (!access_token || !trackData?.artists?.[0]?.id) return;
		getArtistData(access_token, trackData.artists[0].id)
			.then((data: any) => setGenres(data.genres ?? []))
			.catch((caughtError) => setError(caughtError instanceof Error ? caughtError.message : "Unable to load the artist genre."));
	}, [access_token, trackData]);

	return (
		<div className="h-[70%] w-full">
			<div className="my-auto flex flex-row h-full items-center justify-around max-w-6xl flex-wrap text-slate-50 mx-auto">
				{error && <p className="px-5 text-center text-red-300">{error}</p>}
				{!access_token && <p className="px-5 text-center text-slate-300">Authenticate with Spotify to view song details.</p>}
				{trackData && (
					<>
						<SongDetails song={trackData.name} artist={trackData.artists?.[0]?.name ?? "Unknown artist"} album={trackData.album?.name ?? "Unknown album"} genres={genres} />
						{trackData.album?.images?.[0]?.url && <AlbumArt artUrl={trackData.album.images[0].url} />}
					</>
				)}
			</div>
		</div>
	);
}
