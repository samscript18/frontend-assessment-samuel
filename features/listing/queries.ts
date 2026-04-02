import { useQuery } from "@tanstack/react-query";
import { getListingResult, type ListingType } from "@/features/listing/server";

interface UseListingQueryInput {
	query: string;
	page: number;
	type: ListingType;
	year?: number;
}

export function useListingQuery({ query, page, type, year }: UseListingQueryInput) {
	return useQuery({
		queryKey: ["listing", { query, page, type, year: year ?? null }],
		queryFn: () => getListingResult({ query, page, type, year }),
		placeholderData: (previousData) => previousData,
	});
}
