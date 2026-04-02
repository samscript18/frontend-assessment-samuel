"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen page-shell flex items-center justify-center px-4">
			<div className="text-center max-w-md glass-panel p-7 md:p-9">
				<div className="mb-6">
					<svg className="mx-auto h-16 w-16 text-rose-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>

				<h2 className="text-3xl font-bold text-white mb-2">Something went wrong!</h2>
				<p className="text-slate-100/80 mb-8">{error.message || "An unexpected error occurred. Please try again."}</p>

				<div className="flex gap-4 justify-center">
					<button onClick={reset} className="pill-btn">
						Try again
					</button>
					<Link href="/" className="pill-btn">
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
}
