const rspack = require("@rspack/core");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const AutoImport = require("unplugin-auto-import/rspack");

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: "./src/main.js",
  },
  plugins: [
    AutoImport({
      imports: ["vue"],
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    // new rspack.HtmlRspackPlugin({
    //   template: "./index.html",
    // }),
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
    ],
  },
};
module.exports = config;
