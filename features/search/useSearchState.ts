"use client";

import { useRouter, useSearchParams as useNextSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export interface SearchState {
	query: string;
	page: number;
	genres: string;
	rating: string;
	year: string;
	type: "movie" | "tv" | "all";
}

export function useSearchState() {
	const router = useRouter();
	const searchParams = useNextSearchParams();
	const [localState, setLocalState] = useState<SearchState>({
		query: searchParams.get("q") || "",
		page: parseInt(searchParams.get("page") || "1"),
		genres: searchParams.get("genres") || "",
		rating: searchParams.get("rating") || "",
		year: searchParams.get("year") || "",
		type: (searchParams.get("type") || "all") as SearchState["type"],
	});

	const debouncedQuery = useDebounce(localState.query, 300);

	useEffect(() => {
		const params = new URLSearchParams();

		if (debouncedQuery) params.set("q", debouncedQuery);
		if (localState.page > 1) params.set("page", String(localState.page));
		if (localState.genres) params.set("genres", localState.genres);
		if (localState.rating) params.set("rating", localState.rating);
		if (localState.year) params.set("year", localState.year);
		if (localState.type !== "all") params.set("type", localState.type);

		const nextQueryString = params.toString();
		const currentQueryString = searchParams.toString();

		if (nextQueryString === currentQueryString) return;
		router.push(nextQueryString ? `?${nextQueryString}` : "/");
	}, [debouncedQuery, localState.page, localState.genres, localState.rating, localState.year, localState.type, router, searchParams]);

	const updateQuery = useCallback((query: string) => {
		setLocalState((prev) => ({ ...prev, query, page: 1 }));
	}, []);

	const updatePage = useCallback((page: number) => {
		setLocalState((prev) => ({ ...prev, page }));
	}, []);

	const updateGenres = useCallback((genres: string) => {
		setLocalState((prev) => ({ ...prev, genres, page: 1 }));
	}, []);

	const updateRating = useCallback((rating: string) => {
		setLocalState((prev) => ({ ...prev, rating, page: 1 }));
	}, []);

	const updateYear = useCallback((year: string) => {
		setLocalState((prev) => ({ ...prev, year, page: 1 }));
	}, []);

	const updateType = useCallback((type: SearchState["type"]) => {
		setLocalState((prev) => ({ ...prev, type, page: 1 }));
	}, []);

	const reset = useCallback(() => {
		setLocalState({
			query: "",
			page: 1,
			genres: "",
			rating: "",
			year: "",
			type: "all",
		});
	}, []);

	return {
		...localState,
		updateQuery,
		updatePage,
		updateGenres,
		updateRating,
		updateYear,
		updateType,
		reset,
	};
}
