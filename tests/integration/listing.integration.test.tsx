import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchBar } from "../../components/SearchBar";
import { MovieGrid } from "../../components/MovieGrid";

const navMock = vi.hoisted(() => ({
	push: vi.fn(),
	searchParams: new URLSearchParams(""),
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({ push: navMock.push }),
	useSearchParams: () => navMock.searchParams,
}));

vi.mock("next/image", () => ({
	// eslint-disable-next-line @next/next/no-img-element
	default: (props: Record<string, unknown>) => <img alt={String(props.alt || "image")} src={String(props.src || "")} />,
}));

vi.mock("next/link", () => ({
	default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
		<a href={href} {...rest}>
			{children}
		</a>
	),
}));

describe("integration: listing flow", () => {
	beforeEach(() => {
		navMock.push.mockReset();
		navMock.searchParams = new URLSearchParams("");
	});

	it("syncs search + filters to URL query params after debounce", () => {
		vi.useFakeTimers();
		render(<SearchBar />);

		fireEvent.change(screen.getByPlaceholderText("Search movies, TV shows..."), {
			target: { value: "dune" },
		});
		fireEvent.change(screen.getByPlaceholderText("Any"), {
			target: { value: "2021" },
		});
		fireEvent.click(screen.getByRole("button", { name: "Movies" }));

		act(() => {
			vi.advanceTimersByTime(300);
		});

		const calls = navMock.push.mock.calls.map((call) => String(call[0]));
		const lastCall = calls[calls.length - 1] || "";

		expect(lastCall).toContain("q=dune");
		expect(lastCall).toContain("year=2021");
		expect(lastCall).toContain("type=movie");
		vi.useRealTimers();
	});

	it("renders mixed listing cards with correct movie and tv detail routes", () => {
		render(
			<MovieGrid
				type="all"
				content={[
					{
						id: 1,
						title: "Inception",
						poster_path: null,
						backdrop_path: null,
						overview: "A dream heist.",
						release_date: "2010-07-16",
						vote_average: 8.8,
						vote_count: 100,
						popularity: 10,
						genre_ids: [1],
						original_language: "en",
						media_type: "movie",
					},
					{
						id: 2,
						name: "Dark",
						poster_path: null,
						backdrop_path: null,
						overview: "Time mystery.",
						first_air_date: "2017-12-01",
						vote_average: 8.7,
						vote_count: 80,
						popularity: 9,
						genre_ids: [2],
						original_language: "de",
						media_type: "tv",
					},
				]}
			/>,
		);

		expect(screen.getByRole("link", { name: /inception/i })).toHaveAttribute("href", "/movie/1");
		expect(screen.getByRole("link", { name: /dark/i })).toHaveAttribute("href", "/tv/2");
	});
});
