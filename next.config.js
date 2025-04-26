/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FILEMAKER_API_URL: process.env.FILEMAKER_API_URL,
    FILEMAKER_API_TOKEN: process.env.FILEMAKER_API_TOKEN
  },
  webpack: (config) => {
    // Prefer ESM 'module' field and support .mjs extensions for lucide-react
    config.resolve.mainFields = ['browser', 'module', 'main'];
    config.resolve.extensions.push('.mjs');
    return config;
  }
};

module.exports = nextConfig;
