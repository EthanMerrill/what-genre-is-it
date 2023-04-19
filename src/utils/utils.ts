import {useMemo} from "react";
import axios from "axios";


export const useRandomString = (length: number) => {
  const randomString = useMemo(() => {
    return Math.random().toString(36).substr(2, length);
  }, [length]);

  return randomString;
};

export const getGenre = (accessToken: string, id: string) => {
   const data = axios.get(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            },
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    return data;
}