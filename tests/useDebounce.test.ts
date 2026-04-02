import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "../hooks/useDebounce";

describe("useDebounce", () => {
	it("delays value updates until debounce duration elapses", () => {
		vi.useFakeTimers();

		const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
			initialProps: { value: "batman", delay: 300 },
		});

		expect(result.current).toBe("batman");

		rerender({ value: "dune", delay: 300 });
		expect(result.current).toBe("batman");

		act(() => {
			vi.advanceTimersByTime(299);
		});
		expect(result.current).toBe("batman");

		act(() => {
			vi.advanceTimersByTime(1);
		});
		expect(result.current).toBe("dune");

		vi.useRealTimers();
	});
});
