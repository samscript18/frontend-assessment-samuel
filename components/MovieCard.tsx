"use client";

import Link from "next/link";
import Image from "next/image";
import { Movie, TV } from "@/types/tmdb";
import { getPosterPath } from "@/lib/tmdb";

interface MovieCardProps {
	content: Movie | TV;
	type: "movie" | "tv" | "all";
	index?: number;
}

function isMovie(content: Movie | TV): content is Movie {
	return "title" in content;
}

export function MovieCard({ content, type, index = 0 }: MovieCardProps) {
	const isMovieContent = isMovie(content);
	const routeType = type === "all" ? content.media_type || (isMovieContent ? "movie" : "tv") : type;
	const title = isMovieContent ? content.title : content.name;
	const releaseDate = isMovieContent ? content.release_date : content.first_air_date;
	const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
	const posterUrl = getPosterPath(content.poster_path, "w342");
	const language = (content.original_language || "n/a").toUpperCase();

	const shouldEagerLoad = index < 8;

	return (
		<Link href={`/${routeType}/${content.id}`}>
			<article className="group cursor-pointer h-full flex flex-col rounded-2xl overflow-hidden glass-panel hover:bg-white/12 transition duration-300 hover:-translate-y-1">
				
				<div className="relative w-full aspect-2/3 overflow-hidden bg-slate-800/60">
					<Image
						src={posterUrl}
						alt={title}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						loading={shouldEagerLoad ? "eager" : "lazy"}
						priority={shouldEagerLoad}
					/>
					
					<div className="absolute top-3 right-3 bg-cyan-200/90 text-slate-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-300/20">
						{content.vote_average.toFixed(1)}
					</div>
				</div>

				
				<div className="flex-1 p-4 flex flex-col justify-between">
					<div>
						<h3 className="font-semibold text-white line-clamp-2 text-sm md:text-base mb-2">{title}</h3>
						<div className="flex items-center gap-2 mb-3 text-[11px] md:text-xs uppercase tracking-wide text-cyan-100/75">
							<span>{year}</span>
							<span>•</span>
							<span>{language}</span>
							<span>•</span>
							<span>{routeType === "movie" ? "Movie" : "TV"}</span>
						</div>
					</div>

					
					<p className="text-xs text-slate-100/85 line-clamp-3">{content.overview || "No description available"}</p>
				</div>

				
				<div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-white/5 group-hover:from-black/25 transition-colors duration-300 pointer-events-none" />
			</article>
		</Link>
	);
}
