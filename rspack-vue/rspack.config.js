const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('@rspack/cli').Configuration} */
const config = {
  mode: "development",
  context: __dirname,
  entry: {
    main: "./src/main.js",
  },
  stats: false,
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    open: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: "./loader.js",
      // },
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
