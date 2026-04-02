import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
	...nextVitals,
	{
		ignores: ["components/ui/**", ".next/**"],
	},
	{
		files: ["tests/**/*.{ts,tsx}"],
		rules: {
			"@next/next/no-img-element": "off",
		},
	},
];

export default config;
