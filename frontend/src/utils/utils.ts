import {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import FooterInfo from "@/types/footerInfo.interface";

export const useRandomString = (length: number) => {
	const [randomString, setRandomString] = useState("");

	useEffect(() => {
		setRandomString(Math.random().toString(36).substr(2, length));
	}, [length]);

	return randomString;
};

export const getFooterData = async (user_access_token: string) => {
	let footerInfo = {} as FooterInfo;

	const headers = {
		Authorization: "Bearer " + user_access_token,
	};
	// get song information
	const songDetails = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
		headers: headers,
	});
	const data = await songDetails.json();
	const genre = await fetch(`https://api.spotify.com/v1/artists/${data.item.artists[0].id}`, {headers: headers});
	const genreData = await genre.json();
	footerInfo = {
		title: data.item.name,
		artist: data.item.artists[0].name,
		album: data.item.album.name,
		albumArt: data.item.album.images[0].url,
		genre: genreData.genres,
	};
	return footerInfo;
};

const spotifyFetch = async (user_access_token: string, url: string) => {
	if (!user_access_token) throw new Error("Authenticate with Spotify before searching.");
	const response = await fetch(url, {headers: {Authorization: `Bearer ${user_access_token}`}});
	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
		if (response.status === 401) throw new Error("Spotify authentication expired. Please authenticate again.");
		if (response.status === 429) throw new Error("Spotify is temporarily rate-limiting requests. Please try again shortly.");
		throw new Error(data.error?.message ?? "Spotify request failed.");
	}
	return data;
};

export const getTrackData = async (user_access_token: string, trackId: string) => {
	return spotifyFetch(user_access_token, `https://api.spotify.com/v1/tracks/${encodeURIComponent(trackId)}`);
};

export const getArtistData = async (user_access_token: string, artistId: string) => {
	return spotifyFetch(user_access_token, `https://api.spotify.com/v1/artists/${encodeURIComponent(artistId)}`);
};
