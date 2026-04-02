"use client";

import { useState } from "react";
import { useSearchState } from "@/features/search/useSearchState";

export function SearchBar() {
	const { query, updateQuery, reset, type, updateType, year, updateYear } = useSearchState();
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className="w-full sticky top-0 z-40 backdrop-blur-xl bg-slate-950/55 border-b border-white/15">
			<div className="max-w-7xl mx-auto px-4 py-6">
				<div className="space-y-4 glass-panel p-4 md:p-5">
					
					<div className="relative">
						<div className={`flex items-center rounded-xl border transition-all duration-200 bg-white/10 ${isFocused ? "border-cyan-200 ring-2 ring-cyan-300/35" : "border-white/20"}`}>
							
							<svg className="w-5 h-5 text-cyan-100/70 ml-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>

							
							<input
								type="text"
								value={query}
								onChange={(e) => updateQuery(e.target.value)}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								placeholder="Search movies, TV shows..."
								className="flex-1 bg-transparent px-4 py-3 text-white placeholder-cyan-100/45 focus:outline-none"
							/>

							
							{query && (
								<button onClick={() => updateQuery("")} className="px-4 py-3 text-cyan-100/70 hover:text-white transition-colors" aria-label="Clear search">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							)}
						</div>
					</div>

					
					<div className="flex flex-wrap gap-2 items-center">
						
						<div className="flex gap-2">
							{(["all", "movie", "tv"] as const).map((t) => (
								<button
									key={t}
									onClick={() => updateType(t)}
									className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
										type === t ? "bg-cyan-300/20 text-cyan-100 border-cyan-200/80" : "bg-white/5 text-slate-100 border-white/20 hover:bg-white/10"
									}`}
								>
									{t === "all" ? "All" : t === "movie" ? "Movies" : "TV Shows"}
								</button>
							))}
						</div>

						<label className="ml-auto flex items-center gap-2 text-xs md:text-sm text-slate-200">
							Year
							<input
								type="number"
								min={1900}
								max={2100}
								value={year}
								onChange={(e) => updateYear(e.target.value)}
								placeholder="Any"
								className="w-24 rounded-full bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-slate-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/35"
							/>
						</label>

						
						{(query || year || type !== "all") && (
							<button onClick={reset} className="px-4 py-2 rounded-full text-sm font-semibold bg-white/5 text-slate-100 border border-white/20 hover:bg-white/10 transition-colors">
								Reset Filters
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
