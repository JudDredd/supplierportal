// File: next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    FM_HOST: process.env.FM_HOST,
    FM_DATABASE: process.env.FM_DATABASE,
    FM_USERNAME: process.env.FM_USERNAME,
    FM_PASSWORD: process.env.FM_PASSWORD,
    FM_VALUE_LIST: process.env.FM_VALUE_LIST
  },
  webpack(config) {
    config.resolve.mainFields = ['module', 'main', 'browser'];
    return config;
  }
};
