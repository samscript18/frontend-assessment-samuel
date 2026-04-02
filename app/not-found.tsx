import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen page-shell flex items-center justify-center px-4">
			<div className="text-center max-w-md glass-panel p-7 md:p-9">
				<div className="mb-6">
					<h1 className="text-8xl font-black text-cyan-200 mb-4">404</h1>
					<svg className="mx-auto h-16 w-16 text-slate-200/75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16m10-16v16M7 4h10m-10 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-2" />
					</svg>
				</div>

				<h2 className="text-3xl font-bold text-white mb-2">Not Found</h2>
				<p className="text-slate-100/80 mb-8">The content you&apos;re looking for doesn&apos;t exist or has been removed.</p>

				<Link href="/" className="inline-flex items-center gap-2 pill-btn">
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					Back to Home
				</Link>
			</div>
		</div>
	);
}
