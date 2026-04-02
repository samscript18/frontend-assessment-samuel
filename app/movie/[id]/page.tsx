import type { Metadata } from "next";
import { MovieDetailClient } from "@/components/MovieDetailClient";
import { getMovieDetail, getPosterPath } from "@/lib/tmdb";

interface MovieDetailPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MovieDetailPageProps): Promise<Metadata> {
	try {
		const { id } = await params;
		const movie = await getMovieDetail(Number.parseInt(id, 10));

		return {
			title: `${movie.title} (${new Date(movie.release_date).getFullYear()}) - Content Explorer`,
			description: movie.overview || `Discover details about ${movie.title}`,
			openGraph: {
				title: movie.title,
				description: movie.overview || undefined,
				images: movie.poster_path
					? [
							{
								url: getPosterPath(movie.poster_path, "w500"),
								width: 500,
								height: 750,
							},
						]
					: [],
			},
		};
	} catch {
		return {
			title: "Movie - Content Explorer",
			description: "View movie details and information",
		};
	}
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
	const { id } = await params;

	return <MovieDetailClient id={Number.parseInt(id, 10)} />;
}
