import { describe, expect, it } from "vitest";
import { getBackdropPath, getPosterPath } from "../lib/tmdb";

describe("tmdb image helpers", () => {
	it("returns workspace placeholder path when poster path is null", () => {
		expect(getPosterPath(null)).toBe("/placeholder.svg");
	});

	it("returns tmdb path when backdrop path exists", () => {
		expect(getBackdropPath("/abc.jpg", "w1280")).toBe("https://image.tmdb.org/t/p/w1280/abc.jpg");
	});
});
