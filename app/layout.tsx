import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
});

const syne = Syne({
	subsets: ["latin"],
	variable: "--font-syne",
});

export const metadata: Metadata = {
	title: "CineTrace - Discover Movies & TV Shows",
	description: "Explore thousands of movies and TV shows with ratings, descriptions, and detailed information powered by TMDB.",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "#0f172a" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${spaceGrotesk.variable} ${syne.variable} font-sans antialiased bg-background text-foreground`}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
