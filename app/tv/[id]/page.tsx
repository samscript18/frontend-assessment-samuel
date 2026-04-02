import type { Metadata } from "next";
import { TVDetailClient } from "@/components/TVDetailClient";
import { getPosterPath, getTVDetail } from "@/lib/tmdb";

interface TVDetailPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TVDetailPageProps): Promise<Metadata> {
	try {
		const { id } = await params;
		const show = await getTVDetail(Number.parseInt(id, 10));
		const year = new Date(show.first_air_date).getFullYear();

		return {
			title: `${show.name} (${year}) - Content Explorer`,
			description: show.overview || `Discover details about ${show.name}`,
			openGraph: {
				title: show.name,
				description: show.overview || undefined,
				images: show.poster_path
					? [
							{
								url: getPosterPath(show.poster_path, "w500"),
								width: 500,
								height: 750,
							},
						]
					: [],
			},
		};
	} catch {
		return {
			title: "TV Show - Content Explorer",
			description: "View TV show details and information",
		};
	}
}

export default async function TVDetailPage({ params }: TVDetailPageProps) {
	const { id } = await params;

	return <TVDetailClient id={Number.parseInt(id, 10)} />;
}
