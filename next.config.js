/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/redirect',
  //       destination: `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT}&scope=user-read-currently-playing%20user-read-recently-played&redirect_uri=http://localhost:3000/&response_type=code&state=123`,
  //       permanent: false
  //     }
  //   ];
  // }
}

module.exports = nextConfig
