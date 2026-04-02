import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getYear } from "@/features/detail/formatters";
import { getBackdropPath, getPosterPath, getTVDetail } from "@/lib/tmdb";

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
	const show = await getTVDetail(Number.parseInt(id, 10));

	const backdropUrl = getBackdropPath(show.backdrop_path, "w1280");
	const posterUrl = getPosterPath(show.poster_path, "w500");
	const startYear = getYear(show.first_air_date);

	return (
		<div className="min-h-screen page-shell pb-16">
			<section className="relative h-[36vh] min-h-70 md:h-[52vh] overflow-hidden">
				<Image src={backdropUrl} alt={show.name} fill priority className="object-cover" sizes="100vw" />
				<div className="absolute inset-0 bg-linear-to-b from-slate-950/10 via-slate-950/55 to-slate-950" />
			</section>

			<main className="max-w-7xl mx-auto px-4 -mt-16 md:-mt-24 relative z-10">
				<nav aria-label="Breadcrumb" className="glass-panel px-4 py-3 mb-6 text-sm text-slate-200/85">
					<ol className="flex items-center gap-2">
						<li>
							<Link href="/" className="hover:text-white transition-colors">
								Explore
							</Link>
						</li>
						<li>/</li>
						<li>
							<Link href="/?type=tv" className="hover:text-white transition-colors">
								TV Shows
							</Link>
						</li>
						<li>/</li>
						<li className="text-white truncate">{show.name}</li>
					</ol>
				</nav>

				<section className="glass-panel p-5 md:p-8">
					<div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-8">
						<div className="relative aspect-2/3 rounded-2xl overflow-hidden border border-white/20">
							<Image src={posterUrl} alt={show.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 280px" />
						</div>

						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-cyan-100/80 mb-2">TV Detail</p>
							<h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{show.name}</h1>
							<p className="text-slate-100/80 mt-2">
								{startYear} · {show.number_of_seasons} season{show.number_of_seasons !== 1 ? "s" : ""} · {show.number_of_episodes} episodes
							</p>

							<div className="mt-5 flex flex-wrap gap-3">
								<div className="pill-btn">Rating {show.vote_average.toFixed(1)}</div>
								<div className="pill-btn">Votes {show.vote_count.toLocaleString()}</div>
								<div className="pill-btn">Language {show.original_language.toUpperCase()}</div>
							</div>

							{show.genres.length > 0 && (
								<div className="mt-6 flex flex-wrap gap-2">
									{show.genres.map((genre) => (
										<span key={genre.id} className="px-3 py-1 rounded-full text-xs font-semibold border border-white/20 bg-white/10 text-slate-100">
											{genre.name}
										</span>
									))}
								</div>
							)}

							<div className="mt-6">
								<h2 className="text-lg font-bold text-white mb-2">Overview</h2>
								<p className="text-slate-100/85 leading-relaxed">{show.overview || "No overview available for this series."}</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
