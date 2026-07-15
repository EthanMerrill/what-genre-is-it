"use client";

import {useContext, useEffect} from "react";
import {AppContext} from "@/context/state";
import HomeHero from "@/components/HomeHero";
import {GoogleAnalytics} from "@next/third-parties/google";

export default function Home() {
	const appContext = useContext(AppContext);

	useEffect(() => {
		// Extract authorization code from URL query params (PKCE flow)
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const state = urlParams.get("state");
		const error = urlParams.get("error");

		if (error) {
			console.error("Spotify auth error:", error);
			return;
		}

		if (code) {
			const codeVerifier = sessionStorage.getItem("spotify_code_verifier");
			if (!codeVerifier) {
				console.error("No code verifier found in sessionStorage");
				return;
			}

			const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT as string;
			const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string;

			// Exchange authorization code for access token
			const body = new URLSearchParams({
				grant_type: "authorization_code",
				code: code,
				redirect_uri: redirect_uri,
				client_id: client_id,
				code_verifier: codeVerifier,
			});

			fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: body.toString(),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.access_token) {
						appContext.setSpotifyUserAuthCode(data.access_token);
						appContext.setSpotifyToken(data.access_token);
						// Clean up the URL and sessionStorage
						sessionStorage.removeItem("spotify_code_verifier");
						window.history.replaceState({}, document.title, window.location.pathname);
					} else {
						console.error("Token exchange failed:", data);
					}
				})
				.catch((err) => {
					console.error("Token exchange error:", err);
				});
		}
	}, []);

	return (
		<>
			<main>
				<div className="flex flex-col items-center justify-center"></div>
				<div className=" flex flex-row items-center justify-around max-w-6xl flex-wrap text-slate-50 w-full mx-auto">
					<HomeHero />
				</div>
			</main>
			<GoogleAnalytics gaId="G-7G8Q6W9FGH" />
		</>
	);
}
