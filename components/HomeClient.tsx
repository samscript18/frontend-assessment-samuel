"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { MovieGrid } from "@/components/MovieGrid";
import { PaginationControls } from "@/components/PaginationControls";
import { SearchBar } from "@/components/SearchBar";
import { useListingQuery } from "@/features/listing/queries";
import { MAX_PAGE, normalizePage, normalizeType, normalizeYear, type ListingType } from "@/features/listing/server";

interface HomeClientProps {
	initialQuery: string;
	initialPage: number;
	initialType: ListingType;
	initialYear?: number;
}

export function HomeClient({ initialQuery, initialPage, initialType, initialYear }: HomeClientProps) {
	const searchParams = useSearchParams();

	const query = useMemo(() => {
		const value = searchParams.get("q");
		return value ? value.trim() : initialQuery;
	}, [initialQuery, searchParams]);

	const page = useMemo(() => normalizePage(searchParams.get("page") ?? String(initialPage)), [initialPage, searchParams]);
	const type = useMemo(() => normalizeType(searchParams.get("type") ?? initialType), [initialType, searchParams]);
	const year = useMemo(() => normalizeYear(searchParams.get("year") ?? (initialYear ? String(initialYear) : undefined)), [initialYear, searchParams]);

	const { data: listing, isLoading, isError, error } = useListingQuery({ query, page, type, year });

	const totalPages = Math.max(1, Math.min(MAX_PAGE, listing?.totalPages ?? 1));
	const totalResults = listing?.totalResults ?? 0;

	return (
		<div className="min-h-screen page-shell">
			<SearchBar key={`${query}-${type}-${year ?? "all"}-${page}`} />
			<main className="max-w-7xl mx-auto px-4 pb-16 pt-6 md:pt-10">
				<section className="glass-panel p-5 md:p-7 mb-7 md:mb-10 reveal-fade">
					<p className="text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-200/80 mb-2">Content Explorer</p>
					<h1 className="text-3xl md:text-5xl font-black leading-tight text-white">
						{query ? `Results for \"${query}\"` : type === "movie" ? "Popular Movies" : type === "tv" ? "Popular TV Series" : "Trending Movies + TV"}
					</h1>
					<p className="text-slate-200/80 mt-3 text-sm md:text-base">
						{totalResults.toLocaleString()} results · Page {page} of {totalPages.toLocaleString()}
						{year ? ` · Year ${year}` : ""}
					</p>
				</section>

				{isError ? (
					<div className="glass-panel p-6 text-center text-slate-100 mb-8">
						<p className="text-lg font-semibold text-white">Unable to load titles right now.</p>
						<p className="text-sm text-slate-200/80 mt-2">{error instanceof Error ? error.message : "Please try again in a moment."}</p>
					</div>
				) : null}

				<MovieGrid content={listing?.items ?? []} type={type} isLoading={isLoading && !listing} />

				<PaginationControls currentPage={page} totalPages={totalPages} query={query} type={type} year={year} />
			</main>
		</div>
	);
}
