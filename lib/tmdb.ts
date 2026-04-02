import type { Movie, TV, MovieDetail, TVDetail, SearchResponse, Genre, GenreResponse } from "@/types/tmdb";

const TMDB_API_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface FetchOptions {
	next?: {
		revalidate?: number | false;
		tags?: string[];
	};
}

async function fetchTMDB<T>(endpoint: string, params: Record<string, string | number | boolean> = {}, options: FetchOptions = {}): Promise<T> {
	if (!API_KEY) {
		throw new Error("NEXT_PUBLIC_TMDB_API_KEY is not set");
	}

	const url = new URL(`${TMDB_API_BASE}${endpoint}`);
	url.searchParams.append("api_key", API_KEY);

	Object.entries(params).forEach(([key, value]) => {
		url.searchParams.append(key, String(value));
	});

	const response = await fetch(url.toString(), {
		...options,
		next: {
			revalidate: 3600, 
			...options.next,
		},
	});

	if (!response.ok) {
		throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
	}

	return response.json();
}

export async function searchMovies(query: string, page: number = 1, year?: number): Promise<SearchResponse<Movie>> {
	return fetchTMDB("/search/movie", {
		query,
		page,
		include_adult: false,
		...(year ? { primary_release_year: year } : {}),
	});
}

export async function searchTV(query: string, page: number = 1, year?: number): Promise<SearchResponse<TV>> {
	return fetchTMDB("/search/tv", {
		query,
		page,
		include_adult: false,
		...(year ? { first_air_date_year: year } : {}),
	});
}

export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<SearchResponse<Movie>> {
	return fetchTMDB("/discover/movie", {
		with_genres: genreId,
		page,
		sort_by: "popularity.desc",
	});
}

export async function getTVByGenre(genreId: number, page: number = 1): Promise<SearchResponse<TV>> {
	return fetchTMDB("/discover/tv", {
		with_genres: genreId,
		page,
		sort_by: "popularity.desc",
	});
}

export async function getMovieDetail(id: number): Promise<MovieDetail> {
	return fetchTMDB(`/movie/${id}`, {});
}

export async function getTVDetail(id: number): Promise<TVDetail> {
	return fetchTMDB(`/tv/${id}`, {});
}

export async function getPopularMovies(page: number = 1): Promise<SearchResponse<Movie>> {
	return fetchTMDB("/movie/popular", {
		page,
	});
}

export async function getPopularTV(page: number = 1): Promise<SearchResponse<TV>> {
	return fetchTMDB("/tv/popular", {
		page,
	});
}

export async function getTrendingMovies(): Promise<SearchResponse<Movie>> {
	return fetchTMDB("/trending/movie/week", {});
}

export async function getTrendingTV(): Promise<SearchResponse<TV>> {
	return fetchTMDB("/trending/tv/week", {});
}

export async function getMovieGenres(): Promise<GenreResponse> {
	return fetchTMDB("/genre/movie/list", {});
}

export async function getTVGenres(): Promise<GenreResponse> {
	return fetchTMDB("/genre/tv/list", {});
}

export async function discoverMovies(
	filters: {
		page?: number;
		with_genres?: string;
		vote_average_gte?: number;
		vote_average_lte?: number;
		primary_release_year?: number;
		sort_by?: string;
	} = {},
): Promise<SearchResponse<Movie>> {
	const params: Record<string, string | number | boolean> = {
		sort_by: filters.sort_by || "popularity.desc",
	};

	if (filters.page) params.page = filters.page;
	if (filters.with_genres) params.with_genres = filters.with_genres;
	if (filters.vote_average_gte) params["vote_average.gte"] = filters.vote_average_gte;
	if (filters.vote_average_lte) params["vote_average.lte"] = filters.vote_average_lte;
	if (filters.primary_release_year) params.primary_release_year = filters.primary_release_year;

	return fetchTMDB("/discover/movie", params);
}

export async function discoverTV(
	filters: {
		page?: number;
		with_genres?: string;
		vote_average_gte?: number;
		vote_average_lte?: number;
		first_air_date_year?: number;
		sort_by?: string;
	} = {},
): Promise<SearchResponse<TV>> {
	const params: Record<string, string | number | boolean> = {
		sort_by: filters.sort_by || "popularity.desc",
	};

	if (filters.page) params.page = filters.page;
	if (filters.with_genres) params.with_genres = filters.with_genres;
	if (filters.vote_average_gte) params["vote_average.gte"] = filters.vote_average_gte;
	if (filters.vote_average_lte) params["vote_average.lte"] = filters.vote_average_lte;
	if (filters.first_air_date_year) params.first_air_date_year = filters.first_air_date_year;

	return fetchTMDB("/discover/tv", params);
}

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export function getPosterPath(path: string | null, width: "w92" | "w154" | "w342" | "w500" | "w780" | "original" = "w342"): string {
	if (!path) return "/placeholder.svg";
	return `${TMDB_IMAGE_BASE}/${width}${path}`;
}

export function getBackdropPath(path: string | null, width: "w300" | "w780" | "w1280" | "original" = "w780"): string {
	if (!path) return "/placeholder.jpg";
	return `${TMDB_IMAGE_BASE}/${width}${path}`;
}
