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
    // Alias specific CJS paths to ESM builds for lucide-react
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'lucide-react': require.resolve('lucide-react/dist/esm/lucide-react.js'),
      'lucide-react/dist/cjs/lucide-react.js': require.resolve('lucide-react/dist/esm/lucide-react.js'),
      'lucide-react/dist/cjs/icons/phone': require.resolve('lucide-react/dist/esm/icons/phone.js'),
      'lucide-react/dist/cjs/icons/message-circle': require.resolve('lucide-react/dist/esm/icons/message-circle.js')
    };
    // Support .mjs extensions and prefer ESM entry points
    config.resolve.extensions.push('.mjs');
    config.resolve.mainFields = ['module', 'main', 'browser'];
    return config;
  }
};

module.exports = {
  webpack(config) {
    config.resolve.mainFields = ['module', 'main', 'browser'];
    return config;
  },
};

