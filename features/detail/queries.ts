import { useQuery } from "@tanstack/react-query";
import { getMovieDetail, getTVDetail } from "@/lib/tmdb";

export function useMovieDetailQuery(id: number) {
	return useQuery({
		queryKey: ["movie-detail", id],
		queryFn: () => getMovieDetail(id),
		enabled: Number.isFinite(id) && id > 0,
	});
}

export function useTVDetailQuery(id: number) {
	return useQuery({
		queryKey: ["tv-detail", id],
		queryFn: () => getTVDetail(id),
		enabled: Number.isFinite(id) && id > 0,
	});
}
