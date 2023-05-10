"use client"
import { useState, createContext, ReactNode, useContext } from 'react';
import FooterInfo from '@/types/footerInfo.interface';

export const AppContext = createContext(null as any);
interface AppContextProviderProps {
    children: ReactNode;
}

export default function AppContextProvider({ children }: AppContextProviderProps) {
    const [spotifyToken, setSpotifyToken] = useState<string|null>(null);
    const [spotifyUserAuthCode, setSpotifyUserAuthCode] = useState<string|null>(null);
    const [footerInfo, setFooterInfo] = useState<FooterInfo>({} as FooterInfo);

    return (
        <AppContext.Provider value={
            { 
            spotifyToken, setSpotifyToken, 
            spotifyUserAuthCode, setSpotifyUserAuthCode, 
            footerInfo, setFooterInfo
            }
        }>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}