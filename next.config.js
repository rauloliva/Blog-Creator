const { withGoogleFonts } = require("nextjs-google-fonts");

module.exports = withGoogleFonts({
  googleFonts: {
    fonts: ["https://fonts.googleapis.com/icon?family=Material+Icons"],
  },
  images: {
    domains: ["img.icons8.com"],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
});
