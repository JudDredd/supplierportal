/** File: next.config.js */
/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    FM_HOST: process.env.FM_HOST,
    FM_DATABASE: process.env.FM_DATABASE,
    FM_USERNAME: process.env.FM_USERNAME,
    FM_PASSWORD: process.env.FM_PASSWORD,
    FM_VALUE_LIST: process.env.FM_VALUE_LIST
  },
  webpack: (config) => {
    // Alias lucide-react to the ESM build to avoid missing CJS icon modules
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'lucide-react': require.resolve('lucide-react/dist/esm/lucide-react.js')
    };
    // Ensure .mjs files and module fields are resolved
    config.resolve.extensions.push('.mjs');
    config.resolve.mainFields = ['module', 'main', 'browser'];
    return config;
  }
};

module.exports = nextConfig;


/** File: .env.local (no changes needed here) */
FM_HOST=https://portal.axleevents.com
FM_DATABASE=Axle Events
FM_USERNAME=Admin
FM_PASSWORD=oy!)MHuGgnj.Kf
FM_VALUE_LIST=SupplierRoles
