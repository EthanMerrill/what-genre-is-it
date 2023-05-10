"use client"
import { useState, createContext, ReactNode, useContext } from 'react';


export const AppContext = createContext(null as any);
interface AppContextProviderProps {
    children: ReactNode;
}

export default function AppContextProvider( {children}:AppContextProviderProps) {
    const [spotifyToken, setSpotifyToken] = useState<string>('');
    const [spotifyUserAuthCode, setSpotifyUserAuthCode] = useState<string>('');

    return (
        <AppContext.Provider value={{spotifyToken, setSpotifyToken, spotifyUserAuthCode, setSpotifyUserAuthCode}}>
           {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}