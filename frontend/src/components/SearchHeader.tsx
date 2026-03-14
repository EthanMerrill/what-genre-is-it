"use client";
import dynamic from "next/dynamic";

const Search = dynamic(() => import("./Search"), {ssr: false});

export default function SearchHeader() {
	return (
		<div className="w-full">
			<div className="w-2/3 mx-auto my-4 lg:w-full">
				<Search />
			</div>
		</div>
	);
}
