/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
			},
		],
	},
	transpilePackages: ["ethan-common-components"],
	serverExternalPackages: ["firebase", "@google-cloud/secret-manager"],
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
