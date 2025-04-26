/** File: next.config.js */
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FM_HOST: process.env.FM_HOST,
    FM_DATABASE: process.env.FM_DATABASE,
    FM_USERNAME: process.env.FM_USERNAME,
    FM_PASSWORD: process.env.FM_PASSWORD,
    FM_VALUE_LIST: process.env.FM_VALUE_LIST
  },
  webpack: (config) => {
    // Prioritize the ES module entry for lucide-react to avoid CJS icon resolution errors
    config.resolve.mainFields = ['module', 'main', 'browser'];
    config.resolve.extensions.push('.mjs');
    return config;
  }
};

module.exports = nextConfig;


/** File: .env.local (update this with your credentials) */
FM_HOST=https://portal.axleevents.com
FM_DATABASE=Axle Events
FM_USERNAME=Admin
FM_PASSWORD=oy!)MHuGgnj.Kf
FM_VALUE_LIST=SupplierRoles
