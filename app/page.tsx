import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { PaginationControls } from "@/components/PaginationControls";
import { getListingResult, MAX_PAGE, normalizePage, normalizeType, normalizeYear } from "@/features/listing/server";

interface HomePageProps {
	searchParams: Promise<{
		q?: string;
		page?: string;
		type?: string;
		year?: string;
	}>;
}

export default async function Home({ searchParams }: HomePageProps) {
	const params = await searchParams;
	const query = params.q?.trim() || "";
	const page = normalizePage(params.page);
	const type = normalizeType(params.type);
	const year = normalizeYear(params.year);

	const listing = await getListingResult({ query, page, type, year });

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
						{listing.totalResults.toLocaleString()} results · Page {page} of {Math.max(1, Math.min(MAX_PAGE, listing.totalPages)).toLocaleString()}
						{year ? ` · Year ${year}` : ""}
					</p>
				</section>

				<MovieGrid content={listing.items} type={type} isLoading={false} />

				<PaginationControls currentPage={page} totalPages={Math.max(1, Math.min(MAX_PAGE, listing.totalPages))} query={query} type={type} year={year} />
			</main>
		</div>
	);
}
