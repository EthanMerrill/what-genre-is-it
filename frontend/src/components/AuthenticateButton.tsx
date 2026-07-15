"use client";
import Link from "next/link";
import {useRandomString} from "@/utils/utils";
import {useEffect, useState} from "react";

// Generate a PKCE code verifier (cryptographically random URL-safe string)
const generateCodeVerifier = (length: number): string => {
	const array = new Uint8Array(length);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => String.fromCharCode(byte % 256))
		.join("")
		.replace(/[^a-zA-Z0-9\-._~]/g, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"[Math.floor(Math.random() * 66)])
		.slice(0, length);
};

// SHA-256 hash and base64url encode (PKCE code challenge)
const generateCodeChallenge = async (verifier: string): Promise<string> => {
	const encoder = new TextEncoder();
	const data = encoder.encode(verifier);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return btoa(String.fromCharCode(...new Uint8Array(digest)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
};

const AuthenticateButton = () => {
	const state = useRandomString(16);
	const [codeChallenge, setCodeChallenge] = useState<string | null>(null);
	const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT as string;
	const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI as string;
	const scope = encodeURIComponent("user-read-currently-playing user-read-recently-played");

	useEffect(() => {
		const codeVerifier = generateCodeVerifier(64);
		sessionStorage.setItem("spotify_code_verifier", codeVerifier);
		generateCodeChallenge(codeVerifier).then(setCodeChallenge);
	}, []);

	var url = "https://accounts.spotify.com/authorize";
	url += "?response_type=code";
	url += "&client_id=" + client_id;
	url += "&scope=" + scope;
	url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
	url += "&state=" + encodeURIComponent(state);
	if (codeChallenge) {
		url += "&code_challenge_method=S256";
		url += "&code_challenge=" + encodeURIComponent(codeChallenge);
	}

	return (
		<div className="flex align-baseline align-items-baseline rounded-lg border-2 border-slate-600 px-4 py-1 h-8 text-sm w-[200px] mx-auto">
			{state && codeChallenge ? (
				<Link href={url}>
					<p className="font-medium h-5 w-fit whitespace-nowrap text-slate-600">Authenticate with Spotify</p>
				</Link>
			) : (
				<p className="font-medium h-5 w-fit whitespace-nowrap text-slate-600">Authenticate with Spotify</p>
			)}
		</div>
	);
};

export default AuthenticateButton;
