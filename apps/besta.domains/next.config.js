const webpack = require("webpack");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
  build: {
    env: {
      NPM_ONLY_PRODUCTION: 1
    }
  },
  target: "serverless",
  webpack: (config) => {
    config.plugins.push(new webpack.DefinePlugin({ "global.GENTLY": false }));
    return config;
  }
});

// # Analyze is done on build when env var is set
// ANALYZE=true yarn build
// When enabled two HTML files (client.html and server.html) will be outputted to <distDir>/analyze/. One will be for the server bundle, one for the browser bundle.

// Usage with next-compose-plugins
//   From version 2.0.0 of next-compose-plugins you need to call bundle-analyzer in this way to work
//
// const withPlugins = require('next-compose-plugins')
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
//
// module.exports = withPlugins([
//   [withBundleAnalyzer],
//   // your other plugins here
// ])
