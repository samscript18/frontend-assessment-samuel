export function getYear(dateValue: string | undefined): string {
	if (!dateValue) return "N/A";
	return String(new Date(dateValue).getFullYear());
}

export function formatMillions(value: number): string {
	if (value <= 0) return "N/A";
	return `$${(value / 1000000).toFixed(1)}M`;
}
