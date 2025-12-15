/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "crests.football-data.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.scorebat.com" },
      { protocol: "https", hostname: "img.uefa.com" }
    ],
  },
};

export default nextConfig;

