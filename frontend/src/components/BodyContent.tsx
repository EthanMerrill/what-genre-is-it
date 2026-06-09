"use client";
import NowPlayingFooter from "@/components/NowPlayingFooter";
import AppContextProvider from "@/context/state";
import SearchHeader from "@/components/SearchHeader";
import {SignatureFooter} from "ethan-common-components";

export default function BodyContent({children}: {children: React.ReactNode}) {
	return (
		<AppContextProvider>
			<body className="h-screen bg-gradient-to-t from-slate-950 to-slate-800">
				<div className="max-w-[800px] mx-auto px-5">
					<SearchHeader />
				</div>
				{children}
				<NowPlayingFooter />
				<div className="absolute bottom-0 w-full z-[-10]">
					<SignatureFooter backgroundColor="#020617" fontColor="white" />
				</div>
			</body>
		</AppContextProvider>
	);
}
