"use client";

import { Movie, TV } from "@/types/tmdb";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
	content: (Movie | TV)[];
	type: "movie" | "tv" | "all";
	isLoading?: boolean;
}

export function MovieGrid({ content, type, isLoading }: MovieGridProps) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
				{Array.from({ length: 20 }).map((_, i) => (
					<div key={i} className="h-96 glass-panel animate-pulse" />
				))}
			</div>
		);
	}

	if (content.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-96">
				<div className="text-center glass-panel p-8 max-w-md">
					<svg className="mx-auto h-12 w-12 text-cyan-100/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16m10-16v16M7 4h10m-10 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-2" />
					</svg>
					<h3 className="mt-4 text-lg font-semibold text-white">No results found</h3>
					<p className="mt-2 text-slate-200/75">Try adjusting your search or filters</p>
				</div>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
			{content.map((item, index) => (
				<MovieCard key={item.id} content={item} type={type} index={index} />
			))}
		</div>
	);
}
