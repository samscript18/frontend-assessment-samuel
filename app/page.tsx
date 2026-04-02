import { HomeClient } from "@/components/HomeClient";
import { normalizePage, normalizeType, normalizeYear } from "@/features/listing/server";

interface HomePageProps {
	searchParams: Promise<{
		q?: string;
		page?: string;
		type?: string;
		year?: string;
	}>;
}

export default async function Home({ searchParams }: HomePageProps) {
	const params = await searchParams;
	const query = params.q?.trim() || "";
	const page = normalizePage(params.page);
	const type = normalizeType(params.type);
	const year = normalizeYear(params.year);

	return <HomeClient initialQuery={query} initialPage={page} initialType={type} initialYear={year} />;
}
