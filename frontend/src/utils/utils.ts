import {useMemo} from "react";
import axios, {AxiosResponse} from "axios";
import FooterInfo from "@/types/footerInfo.interface";

export const useRandomString = (length: number) => {
  const randomString = useMemo(() => {
    return Math.random().toString(36).substr(2, length);
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
  })
  const data = await songDetails.json();
  const genre = await fetch(`https://api.spotify.com/v1/artists/${data.item.artists[0].id}`, { headers: headers });
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

export const getTrackData = async (user_access_token: string, trackId:string) => {
  const headers = {
    Authorization: "Bearer " + user_access_token,
  };
  // get song information
  const songDetails = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: headers,
  })
  const data = await songDetails.json();
  return data;
}

export const getArtistData = async (user_access_token: string, artistId:string) => {
  const headers = {
    Authorization: "Bearer " + user_access_token,
  };
  // get song information
  const genre = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, { headers: headers });
  const genreData = await genre.json();
  return genreData;
}
