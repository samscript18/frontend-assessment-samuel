export default function HomeLoading() {
	return (
		<div className="min-h-screen page-shell px-4 py-8">
			<div className="max-w-7xl mx-auto">
				<div className="glass-panel p-6 mb-8 animate-pulse">
					<div className="h-4 w-32 rounded bg-white/15 mb-3" />
					<div className="h-10 w-2/3 rounded bg-white/15 mb-2" />
					<div className="h-4 w-1/3 rounded bg-white/15" />
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
					{Array.from({ length: 20 }).map((_, index) => (
						<div key={index} className="h-96 glass-panel animate-pulse" />
					))}
				</div>
			</div>
		</div>
	);
}
