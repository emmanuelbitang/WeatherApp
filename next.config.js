/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  apiKey: process.env.API_KEY,
  token: process.env.TOKEN,
};

module.exports = nextConfig;
