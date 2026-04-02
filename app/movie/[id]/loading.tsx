export default function MovieDetailLoading() {
	return (
		<div className="min-h-screen page-shell">
			{/* Backdrop Skeleton */}
			<div className="w-full h-96 md:h-[500px] bg-white/10 animate-pulse" />

			{/* Content Skeleton */}
			<div className="relative -mt-48 md:-mt-56 z-10">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col md:flex-row gap-8 mb-12 glass-panel p-5 md:p-8">
						{/* Poster Skeleton */}
						<div className="flex-shrink-0 w-full md:w-80">
							<div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-white/15 animate-pulse" />
						</div>

						{/* Info Skeleton */}
						<div className="flex-1 pt-4 space-y-4">
							<div className="h-12 bg-white/15 rounded w-3/4 animate-pulse" />
							<div className="h-6 bg-white/15 rounded w-1/2 animate-pulse" />
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-white/15 rounded-full animate-pulse" />
								<div className="h-4 bg-white/15 rounded w-1/4 animate-pulse" />
							</div>

							<div className="space-y-2 pt-4">
								<div className="h-4 bg-white/15 rounded animate-pulse" />
								<div className="h-4 bg-white/15 rounded w-5/6 animate-pulse" />
							</div>
						</div>
					</div>

					{/* Overview Skeleton */}
					<div className="glass-panel p-6 mb-12 animate-pulse">
						<div className="h-8 bg-white/15 rounded w-1/4 mb-4" />
						<div className="space-y-2">
							<div className="h-4 bg-white/15 rounded" />
							<div className="h-4 bg-white/15 rounded" />
							<div className="h-4 bg-white/15 rounded w-5/6" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
