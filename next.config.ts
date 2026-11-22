import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	cacheComponents: false,
	partialPrefetching: false,
	reactCompiler: false,
	experimental: {
		serverActions: {
			bodySizeLimit: "8mb",
		},
	},
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ibb.co",
			},
		],
	},
};

export default nextConfig;
