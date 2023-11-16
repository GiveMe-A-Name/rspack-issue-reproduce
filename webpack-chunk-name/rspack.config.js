/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    index: "./src/main.jsx",
  },
  output: {
    filename: "static/js/[name].[contenthash:8].js",
    chunkFilename: "static/js/async/[name].[contenthash:8].js",
    publicPath: "/",
    pathinfo: false,
    hashFunction: "xxhash64",
    webassemblyModuleFilename: "static/wasm/[hash].module.wasm",
    cssFilename: "static/css/[name].[contenthash:8].css",
    cssChunkFilename: "static/css/async/[name].[contenthash:8].css",
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
    ],
  },
};
