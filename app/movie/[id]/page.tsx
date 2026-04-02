import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatMillions, getYear } from "@/features/detail/formatters";
import { getBackdropPath, getMovieDetail, getPosterPath } from "@/lib/tmdb";

interface MovieDetailPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MovieDetailPageProps): Promise<Metadata> {
	try {
		const { id } = await params;
		const movie = await getMovieDetail(Number.parseInt(id, 10));

		return {
			title: `${movie.title} (${new Date(movie.release_date).getFullYear()}) - Content Explorer`,
			description: movie.overview || `Discover details about ${movie.title}`,
			openGraph: {
				title: movie.title,
				description: movie.overview || undefined,
				images: movie.poster_path
					? [
							{
								url: getPosterPath(movie.poster_path, "w500"),
								width: 500,
								height: 750,
							},
						]
					: [],
			},
		};
	} catch {
		return {
			title: "Movie - Content Explorer",
			description: "View movie details and information",
		};
	}
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
	const { id } = await params;
	const movie = await getMovieDetail(Number.parseInt(id, 10));

	const backdropUrl = getBackdropPath(movie.backdrop_path, "w1280");
	const posterUrl = getPosterPath(movie.poster_path, "w500");
	const releaseYear = getYear(movie.release_date);

	return (
		<div className="min-h-screen page-shell pb-16">
			<section className="relative h-[36vh] min-h-70 md:h-[52vh] overflow-hidden">
				<Image src={backdropUrl} alt={movie.title} fill priority className="object-cover" sizes="100vw" />
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
							<Link href="/?type=movie" className="hover:text-white transition-colors">
								Movies
							</Link>
						</li>
						<li>/</li>
						<li className="text-white truncate">{movie.title}</li>
					</ol>
				</nav>

				<section className="glass-panel p-5 md:p-8">
					<div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-8">
						<div className="relative aspect-2/3 rounded-2xl overflow-hidden border border-white/20">
							<Image src={posterUrl} alt={movie.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 280px" />
						</div>

						<div>
							<p className="text-xs uppercase tracking-[0.3em] text-cyan-100/80 mb-2">Movie Detail</p>
							<h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{movie.title}</h1>
							<p className="text-slate-100/80 mt-2">
								{releaseYear} · {movie.runtime ? `${movie.runtime} min` : "Runtime N/A"} · {movie.original_language.toUpperCase()}
							</p>

							<div className="mt-5 flex flex-wrap gap-3">
								<div className="pill-btn">Rating {movie.vote_average.toFixed(1)}</div>
								<div className="pill-btn">Votes {movie.vote_count.toLocaleString()}</div>
								<div className="pill-btn">Budget {formatMillions(movie.budget)}</div>
								<div className="pill-btn">Revenue {formatMillions(movie.revenue)}</div>
							</div>

							{movie.tagline && <p className="mt-5 text-cyan-100 italic">&quot;{movie.tagline}&quot;</p>}

							{movie.genres.length > 0 && (
								<div className="mt-6 flex flex-wrap gap-2">
									{movie.genres.map((genre) => (
										<span key={genre.id} className="px-3 py-1 rounded-full text-xs font-semibold border border-white/20 bg-white/10 text-slate-100">
											{genre.name}
										</span>
									))}
								</div>
							)}

							<div className="mt-6">
								<h2 className="text-lg font-bold text-white mb-2">Overview</h2>
								<p className="text-slate-100/85 leading-relaxed">{movie.overview || "No overview available for this movie."}</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
