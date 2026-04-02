import { discoverMovies, discoverTV, getPopularMovies, getPopularTV, searchMovies, searchTV } from "@/lib/tmdb";
import type { Movie, TV } from "@/types/tmdb";

export type ListingType = "movie" | "tv" | "all";
export type ListingItem = Movie | TV;

export interface ListingResult {
	items: ListingItem[];
	totalPages: number;
	totalResults: number;
}

export const MAX_PAGE = 500;

export function normalizeType(type: string | undefined): ListingType {
	if (type === "movie" || type === "tv" || type === "all") return type;
	return "all";
}

export function normalizePage(page: string | undefined): number {
	const parsed = Number.parseInt(page || "1", 10);
	if (Number.isNaN(parsed) || parsed < 1) return 1;
	return Math.min(parsed, MAX_PAGE);
}

export function normalizeYear(year: string | undefined): number | undefined {
	if (!year) return undefined;
	const parsed = Number.parseInt(year, 10);
	if (Number.isNaN(parsed) || parsed < 1900 || parsed > 2100) return undefined;
	return parsed;
}

export async function getListingResult({ query, page, type, year }: { query: string; page: number; type: ListingType; year?: number }): Promise<ListingResult> {
	if (type === "movie") {
		const response = query ? await searchMovies(query, page, year) : await discoverMovies({ page, primary_release_year: year });

		return {
			items: response.results,
			totalPages: response.total_pages,
			totalResults: response.total_results,
		};
	}

	if (type === "tv") {
		const response = query ? await searchTV(query, page, year) : await discoverTV({ page, first_air_date_year: year });

		return {
			items: response.results,
			totalPages: response.total_pages,
			totalResults: response.total_results,
		};
	}

	const [moviesResponse, tvResponse] = query ? await Promise.all([searchMovies(query, page, year), searchTV(query, page, year)]) : await Promise.all([getPopularMovies(page), getPopularTV(page)]);

	const combined = [...moviesResponse.results.map((movie) => ({ ...movie, media_type: "movie" as const })), ...tvResponse.results.map((show) => ({ ...show, media_type: "tv" as const }))]
		.sort((a, b) => b.popularity - a.popularity)
		.slice(0, 20);

	return {
		items: combined,
		totalPages: Math.min(MAX_PAGE, Math.max(moviesResponse.total_pages, tvResponse.total_pages)),
		totalResults: moviesResponse.total_results + tvResponse.total_results,
	};
}
