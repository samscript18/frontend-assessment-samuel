import Link from "next/link";

interface PaginationControlsProps {
	currentPage: number;
	totalPages: number;
	query: string;
	type: "movie" | "tv" | "all";
	year?: number;
}

function getHref({ page, query, type, year }: { page: number; query: string; type: "movie" | "tv" | "all"; year?: number }): string {
	const params = new URLSearchParams();

	if (query) params.set("q", query);
	if (page > 1) params.set("page", String(page));
	if (type !== "all") params.set("type", type);
	if (year) params.set("year", String(year));

	const search = params.toString();
	return search ? `/?${search}` : "/";
}

export function PaginationControls({ currentPage, totalPages, query, type, year }: PaginationControlsProps) {
	if (totalPages <= 1) return null;

	const prevPage = Math.max(1, currentPage - 1);
	const nextPage = Math.min(totalPages, currentPage + 1);
	const start = Math.max(1, currentPage - 1);
	const end = Math.min(totalPages, currentPage + 1);
	const visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

	return (
		<nav className="mt-10 flex items-center justify-between gap-3 glass-panel p-3 md:p-4" aria-label="Pagination">
			<Link href={getHref({ page: prevPage, query, type, year })} aria-disabled={currentPage === 1} className={`pill-btn ${currentPage === 1 ? "pointer-events-none opacity-40" : ""}`}>
				Previous
			</Link>

			<div className="flex items-center gap-2">
				{visiblePages.map((page) => (
					<Link
						key={page}
						href={getHref({ page, query, type, year })}
						className={`h-10 min-w-10 px-3 grid place-items-center rounded-full border text-sm font-semibold transition ${
							page === currentPage ? "bg-cyan-300/25 border-cyan-200 text-cyan-100" : "bg-white/5 border-white/20 text-slate-100 hover:bg-white/10"
						}`}
					>
						{page}
					</Link>
				))}
			</div>

			<Link href={getHref({ page: nextPage, query, type, year })} aria-disabled={currentPage === totalPages} className={`pill-btn ${currentPage === totalPages ? "pointer-events-none opacity-40" : ""}`}>
				Next
			</Link>
		</nav>
	);
}
