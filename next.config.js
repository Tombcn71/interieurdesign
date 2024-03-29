/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: { appDir: true },

  images: {
    domains: [
      "upcdn.io",
      "replicate.delivery",
      "pbxt.replicate.delivery",
      "lh3.googleusercontent.com",
      "scontent-atl3-2.xx.fbcdn.net",
      "platform-lookaside.fbsbx.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/Nutlope/roomGPT",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/room-GPT",
        permanent: false,
      },
    ];
  },
};
