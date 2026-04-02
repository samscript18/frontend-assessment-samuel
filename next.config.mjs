const nextConfig = {
	typescript: {
		ignoreBuildErrors: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				pathname: "/t/p/**",
			},
		],
	},

	cacheComponents: true,

	serverExternalPackages: [],

	experimental: {
	},

	headers: async () => {
		if (process.env.NODE_ENV === "development") return [];

		return [
			{
				source: "/_next/static/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/api/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, s-maxage=3600, stale-while-revalidate=86400",
					},
				],
			},
		];
	},
};

export default nextConfig;
