const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withBabelMinify = require("next-babel-minify")({
  removeConsole: true
});
module.exports = withCSS(withBabelMinify(withSass()));
